#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
import { BidmasterStack } from "../lib/bidmaster-stack";

const app = new cdk.App();

new BidmasterStack(app, "Bidmaster", {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: "ap-south-1",
  },
});
