const express = require("express");
const app = express();
const { SQSClient, SendMessageCommand } = require("@aws-sdk/client-sqs");
require("dotenv").config();

const sqs = new SQSClient({ region: process.env.AWS_REGION });

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ status: "API is running" });
});

app.post("/enqueue-email", async (req, res) => {
  const { to, subject, message } = req.body;
  console.log(to, subject, message);
  const payload = {
    to,
    subject,
    message
  };

  try {
    const command = new SendMessageCommand({
      QueueUrl: process.env.SQS_QUEUE_URL,
      MessageBody: JSON.stringify(payload),
    });

    await sqs.send(command);

    res.json({ message: "Email request queued successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to queue email" });
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));
