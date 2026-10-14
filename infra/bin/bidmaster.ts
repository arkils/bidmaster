#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
import * as acm from "aws-cdk-lib/aws-certificatemanager";
import { BidmasterStack } from "../lib/bidmaster-stack";

const app = new cdk.App();
const account = process.env.CDK_DEFAULT_ACCOUNT;
const domainName = "bidmaster.arkil.in";

const certificateStack = new cdk.Stack(app, "BidmasterCert", {
  env: { account, region: "us-east-1" },
  crossRegionReferences: true,
});
cdk.Tags.of(certificateStack).add("Project", "bidmaster");
cdk.Tags.of(certificateStack).add("ManagedBy", "cdk");

const certificate = new acm.Certificate(certificateStack, "SiteCertificate", {
  domainName,
  certificateName: "bidmaster-arkil-in",
  validation: acm.CertificateValidation.fromDns(),
});
cdk.Tags.of(certificate).add("Name", "bidmaster-site-certificate");

new BidmasterStack(app, "Bidmaster", {
  env: { account, region: "ap-south-1" },
  crossRegionReferences: true,
  domainName,
  certificate,
});
