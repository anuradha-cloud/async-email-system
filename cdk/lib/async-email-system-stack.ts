import * as cdk from "aws-cdk-lib";
import * as sqs from "aws-cdk-lib/aws-sqs";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as eventSources from "aws-cdk-lib/aws-lambda-event-sources";
import * as iam from "aws-cdk-lib/aws-iam";

export class AsyncEmailSystemStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const emailQueue = new sqs.Queue(this, "EmailQueue", {
      queueName: "EmailQueue",
    });

    const emailProcessorLambda = new lambda.Function(
      this,
      "EmailProcessorLambda",
      {
        functionName: "EmailProcessor",
        runtime: lambda.Runtime.NODEJS_22_X,
        handler: "emailProcessor.handler",
        code: lambda.Code.fromAsset("../lambda"),
        environment: {
          SENDER_EMAIL: "test@qoredms.com",
          SQS_QUEUE_URL: emailQueue.queueUrl
        },
      }
    );

    emailProcessorLambda.addEventSource(
      new eventSources.SqsEventSource(emailQueue)
    );

    // Add SES permissions to Lambda role
    emailProcessorLambda.addToRolePolicy(
      new iam.PolicyStatement({
        actions: ["ses:SendEmail", "ses:SendRawEmail"],
        resources: ["*"], 
      })
    );
  }
}
