## Async Email Processing System  
Tech Stack: **AWS SQS + Lambda + SES + CDK + GitHub Actions (OIDC)**

This project implements an async email processing workflow using AWS cloud services.

---

### Workflow

1. Application/API pushes email details to **SQS**
2. **Lambda** automatically triggers when message arrives
3. Lambda reads message and calls **SES**
4. **SES** sends the email to the recipient

---

### Local Testing

#### Start app locally
```bash
npm run dev
```

#### Trigger using Postman
**POST** `http://localhost:3000/enqueue-email`

Request Body:
```json
{
  "to": "anuradha@tecofize.com",
  "subject": "Testing SES Email",
  "message": "Hello from SES with sqs and lambda via github action"
}
```

---

### CI/CD Deployment (GitHub OIDC)

Deployment is automated.  
Just push code to branch **`v1`** and GitHub Actions will:

- Authenticate to AWS with **OIDC**
- Install dependencies
- Run **CDK deploy** automatically

No manual `cdk deploy` required.

---

### Key Components

| Service | Purpose |
|--------|--------|
| **SQS** | Queue for email requests |
| **Lambda** | Processes queue messages |
| **SES** | Sends email |
| **CDK** | Provisions AWS services |
| **GitHub Actions (OIDC)** | Secure CI/CD deployment |

---

### ✅ Notes

- SES sandbox allows only verified `From` emails/domains
- Changing the sender email requires:
  - Updating environment variable
  - Redeploying (auto via GitHub Actions)

---

End of README.
