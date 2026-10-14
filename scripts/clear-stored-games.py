#!/usr/bin/env python3
"""Clear every Bidmaster room in DynamoDB and refresh the CloudFront cache.

The site itself never deletes a room. This script is the operator step used
before the actual deployment, so practice games do not remain.

Without --yes it only reports what it would clear. Pass --yes to delete the
rooms and invalidate the CloudFront distribution.
"""

from __future__ import annotations

import argparse
import json
import subprocess
import sys
import time

REGION = "ap-south-1"
STACK = "Bidmaster"


def aws(args: list[str], *, regional: bool = True) -> dict:
    command = ["aws", *args, "--output", "json"]
    if regional:
        command.extend(["--region", REGION])
    result = subprocess.run(command, capture_output=True, text=True)
    if result.returncode != 0:
        detail = (result.stderr or result.stdout or "").strip()
        raise SystemExit(detail or f"aws {' '.join(args)} failed")
    if not result.stdout.strip():
        return {}
    return json.loads(result.stdout)


def stack_resources() -> list[dict]:
    summaries: list[dict] = []
    token: str | None = None
    while True:
        args = [
            "cloudformation",
            "list-stack-resources",
            "--stack-name",
            STACK,
            "--no-paginate",
        ]
        if token:
            args.extend(["--starting-token", token])
        page = aws(args)
        summaries.extend(page.get("StackResourceSummaries", []))
        token = page.get("NextToken")
        if not token:
            return summaries


def physical_ids(resources: list[dict], resource_type: str) -> list[str]:
    found: list[str] = []
    for resource in resources:
        if resource.get("ResourceType") != resource_type:
            continue
        if resource.get("ResourceStatus") == "DELETE_COMPLETE":
            continue
        physical_id = resource.get("PhysicalResourceId")
        if physical_id:
            found.append(physical_id)
    return found


def scan_rooms(table_name: str) -> list[dict]:
    keys: list[dict] = []
    start: dict | None = None
    while True:
        args = [
            "dynamodb",
            "scan",
            "--table-name",
            table_name,
            "--projection-expression",
            "roomId",
            "--no-paginate",
        ]
        if start:
            args.extend(["--exclusive-start-key", json.dumps(start)])
        page = aws(args)
        keys.extend(item["roomId"] for item in page.get("Items", []) if "roomId" in item)
        start = page.get("LastEvaluatedKey")
        if not start:
            return keys


def delete_rooms(table_name: str, keys: list[dict]) -> int:
    deleted = 0
    for offset in range(0, len(keys), 25):
        pending = {
            table_name: [
                {"DeleteRequest": {"Key": {"roomId": room_id}}}
                for room_id in keys[offset : offset + 25]
            ]
        }
        while pending.get(table_name):
            response = aws(
                [
                    "dynamodb",
                    "batch-write-item",
                    "--request-items",
                    json.dumps(pending),
                ]
            )
            unprocessed = response.get("UnprocessedItems") or {}
            sent = len(pending[table_name])
            left = len(unprocessed.get(table_name, []))
            deleted += sent - left
            pending = unprocessed
            if pending.get(table_name):
                time.sleep(1)
    return deleted


def invalidate_site(distribution_id: str) -> str:
    response = aws(
        [
            "cloudfront",
            "create-invalidation",
            "--distribution-id",
            distribution_id,
            "--paths",
            "/*",
        ],
        regional=False,
    )
    return response["Invalidation"]["Id"]


def main() -> None:
    parser = argparse.ArgumentParser(
        description="Delete every stored Bidmaster room and refresh CloudFront."
    )
    parser.add_argument(
        "--yes",
        action="store_true",
        help="Delete the rooms and invalidate CloudFront. Omit this to preview only.",
    )
    args = parser.parse_args()

    resources = stack_resources()
    tables = physical_ids(resources, "AWS::DynamoDB::Table")
    distributions = physical_ids(resources, "AWS::CloudFront::Distribution")
    if len(tables) != 1 or len(distributions) != 1:
        raise SystemExit(
            f"Expected one rooms table and one CloudFront distribution in {STACK}. "
            f"Found tables={tables} distributions={distributions}."
        )

    table_name, distribution_id = tables[0], distributions[0]
    keys = scan_rooms(table_name)
    print(f"Stack: {STACK} ({REGION})")
    print(f"Rooms table: {table_name}")
    print(f"Stored rooms: {len(keys)}")
    print(f"CloudFront distribution: {distribution_id}")

    if not args.yes:
        print("Preview only. Run again with --yes to delete these rooms and refresh the site cache.")
        return

    deleted = delete_rooms(table_name, keys)
    invalidation_id = invalidate_site(distribution_id)
    print(f"Deleted rooms: {deleted}")
    print(f"CloudFront invalidation: {invalidation_id}")


if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        sys.exit(130)
