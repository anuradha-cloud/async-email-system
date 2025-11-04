Async Email Processing System (AWS SQS + Lambda + SES + CDK + GitHub Actions OIDC)

 - Flow :
Application/API pushes email details to SQS
Lambda listens to SQS events
Lambda reads message and calls SES
SES sends the email

 - For testing :
Locally -> npm run dev
Trigger Api via postman -> http://localhost:3000/enqueue-email
 {
  "to": "anuradha@tecofize.com",
  "subject": "Testing SES Email",
  "message": "Hello from SES with sqs and lambda via github action"
 }
Automate testing -> Push your code to branch v1.
Workflow automatically runs:
Authenticates to AWS via OIDC
Installs dependencies
Deploys CDK stack 