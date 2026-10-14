import * as path from "path";
import * as cdk from "aws-cdk-lib";
import * as cr from "aws-cdk-lib/custom-resources";
import * as apigwv2 from "aws-cdk-lib/aws-apigatewayv2";
import * as integrations from "aws-cdk-lib/aws-apigatewayv2-integrations";
import * as cloudfront from "aws-cdk-lib/aws-cloudfront";
import * as origins from "aws-cdk-lib/aws-cloudfront-origins";
import * as dynamodb from "aws-cdk-lib/aws-dynamodb";
import * as iam from "aws-cdk-lib/aws-iam";
import * as iot from "aws-cdk-lib/aws-iot";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as s3deploy from "aws-cdk-lib/aws-s3-deployment";
import { Construct } from "constructs";

export class BidmasterStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: cdk.StackProps) {
    super(scope, id, props);

    cdk.Tags.of(this).add("Project", "bidmaster");
    cdk.Tags.of(this).add("ManagedBy", "cdk");

    const rooms = new dynamodb.Table(this, "Rooms", {
      partitionKey: { name: "roomId", type: dynamodb.AttributeType.STRING },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      removalPolicy: cdk.RemovalPolicy.RETAIN,
    });
    cdk.Tags.of(rooms).add("Name", "bidmaster-rooms");

    const describeEndpoint = new cr.AwsCustomResource(this, "DescribeIotEndpoint", {
      onCreate: {
        service: "Iot",
        action: "describeEndpoint",
        parameters: { endpointType: "iot:Data-ATS" },
        physicalResourceId: cr.PhysicalResourceId.fromResponse("endpointAddress"),
        region: "ap-south-1",
      },
      installLatestAwsSdk: false,
      policy: cr.AwsCustomResourcePolicy.fromSdkCalls({
        resources: cr.AwsCustomResourcePolicy.ANY_RESOURCE,
      }),
    });
    const iotEndpoint = describeEndpoint.getResponseField("endpointAddress");

    const apiFunction = new lambda.Function(this, "Api", {
      runtime: lambda.Runtime.PYTHON_3_12,
      handler: "handler.handler",
      code: lambda.Code.fromAsset(path.join(__dirname, "../../functions/api")),
      timeout: cdk.Duration.seconds(10),
      environment: {
        ROOMS_TABLE: rooms.tableName,
        IOT_ENDPOINT: iotEndpoint,
      },
    });
    cdk.Tags.of(apiFunction).add("Name", "bidmaster-api");
    rooms.grantReadWriteData(apiFunction);
    apiFunction.addToRolePolicy(
      new iam.PolicyStatement({
        actions: ["iot:Publish"],
        resources: [`arn:aws:iot:${this.region}:${this.account}:topic/bidmaster/room/*`],
      }),
    );

    const authorizerFunction = new lambda.Function(this, "IotAuthorizer", {
      runtime: lambda.Runtime.PYTHON_3_12,
      handler: "handler.handler",
      code: lambda.Code.fromAsset(path.join(__dirname, "../../functions/authorizer")),
      timeout: cdk.Duration.seconds(5),
      environment: {
        ROOMS_TABLE: rooms.tableName,
      },
    });
    cdk.Tags.of(authorizerFunction).add("Name", "bidmaster-iot-authorizer");
    rooms.grantReadData(authorizerFunction);
    authorizerFunction.addPermission("IoTInvoke", {
      principal: new iam.ServicePrincipal("iot.amazonaws.com"),
      sourceArn: `arn:aws:iot:${this.region}:${this.account}:authorizer/bidmaster-player`,
    });
    new iot.CfnAuthorizer(this, "PlayerAuthorizer", {
      authorizerName: "bidmaster-player",
      authorizerFunctionArn: authorizerFunction.functionArn,
      signingDisabled: true,
      status: "ACTIVE",
    });

    const httpApi = new apigwv2.HttpApi(this, "HttpApi", {
      corsPreflight: {
        allowOrigins: ["*"],
        allowMethods: [apigwv2.CorsHttpMethod.ANY],
        allowHeaders: ["content-type"],
      },
    });
    cdk.Tags.of(httpApi).add("Name", "bidmaster-http-api");
    const apiIntegration = new integrations.HttpLambdaIntegration("Api", apiFunction);
    httpApi.addRoutes({
      path: "/api/health",
      methods: [apigwv2.HttpMethod.GET],
      integration: apiIntegration,
    });
    httpApi.addRoutes({
      path: "/api/matches",
      methods: [apigwv2.HttpMethod.GET],
      integration: apiIntegration,
    });
    httpApi.addRoutes({
      path: "/api/rooms",
      methods: [apigwv2.HttpMethod.POST],
      integration: apiIntegration,
    });
    httpApi.addRoutes({
      path: "/api/rooms/{roomId}",
      methods: [apigwv2.HttpMethod.GET],
      integration: apiIntegration,
    });
    httpApi.addRoutes({
      path: "/api/rooms/{roomId}/join",
      methods: [apigwv2.HttpMethod.POST],
      integration: apiIntegration,
    });
    httpApi.addRoutes({
      path: "/api/rooms/{roomId}/leave",
      methods: [apigwv2.HttpMethod.POST],
      integration: apiIntegration,
    });
    httpApi.addRoutes({
      path: "/api/rooms/{roomId}/start",
      methods: [apigwv2.HttpMethod.POST],
      integration: apiIntegration,
    });
    httpApi.addRoutes({
      path: "/api/rooms/{roomId}/play",
      methods: [apigwv2.HttpMethod.POST],
      integration: apiIntegration,
    });
    httpApi.addRoutes({
      path: "/api/rooms/{roomId}/result",
      methods: [apigwv2.HttpMethod.POST],
      integration: apiIntegration,
    });
    httpApi.addRoutes({
      path: "/api/rooms/{roomId}/bid",
      methods: [apigwv2.HttpMethod.POST],
      integration: apiIntegration,
    });
    httpApi.addRoutes({
      path: "/api/rooms/{roomId}/trump",
      methods: [apigwv2.HttpMethod.POST],
      integration: apiIntegration,
    });

    const siteBucket = new s3.Bucket(this, "Site", {
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      encryption: s3.BucketEncryption.S3_MANAGED,
      enforceSSL: true,
    });
    cdk.Tags.of(siteBucket).add("Name", "bidmaster-site");

    const spaRewrite = new cloudfront.Function(this, "SpaRewrite", {
      code: cloudfront.FunctionCode.fromInline(`function handler(event) {
  var request = event.request;
  if (!request.uri.includes(".")) {
    request.uri = "/index.html";
  }
  return request;
}`),
    });
    cdk.Tags.of(spaRewrite).add("Name", "bidmaster-spa-rewrite");

    const distribution = new cloudfront.Distribution(this, "FrontDoor", {
      priceClass: cloudfront.PriceClass.PRICE_CLASS_ALL,
      defaultRootObject: "index.html",
      defaultBehavior: {
        origin: origins.S3BucketOrigin.withOriginAccessControl(siteBucket),
        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        functionAssociations: [
          {
            function: spaRewrite,
            eventType: cloudfront.FunctionEventType.VIEWER_REQUEST,
          },
        ],
      },
      additionalBehaviors: {
        "/api/*": {
          origin: new origins.HttpOrigin(
            `${httpApi.apiId}.execute-api.${this.region}.amazonaws.com`,
          ),
          viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
          allowedMethods: cloudfront.AllowedMethods.ALLOW_ALL,
          cachePolicy: cloudfront.CachePolicy.CACHING_DISABLED,
          originRequestPolicy: cloudfront.OriginRequestPolicy.ALL_VIEWER_EXCEPT_HOST_HEADER,
        },
      },
    });
    cdk.Tags.of(distribution).add("Name", "bidmaster-cloudfront");

    new s3deploy.BucketDeployment(this, "SiteFiles", {
      sources: [s3deploy.Source.asset(path.join(__dirname, "../../web/dist"))],
      destinationBucket: siteBucket,
      distribution,
      distributionPaths: ["/*"],
    });

    new cdk.CfnOutput(this, "SiteUrl", {
      value: `https://${distribution.distributionDomainName}`,
    });
    new cdk.CfnOutput(this, "IotEndpoint", {
      value: iotEndpoint,
    });
  }
}
