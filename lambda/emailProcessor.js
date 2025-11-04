const { SESClient, SendEmailCommand } = require("@aws-sdk/client-ses");

const ses = new SESClient({ region: process.env.AWS_REGION });

exports.handler = async (event) => {
  for (const record of event.Records) {
    const body = JSON.parse(record.body);
    const { to, subject, message } = body;

    const params = {
      Source: process.env.SENDER_EMAIL,
      Destination: {
        ToAddresses: [to],
      },
      Message: {
        Subject: { Data: subject },
        Body: { Text: { Data: message } },
      },
    };

    try {
      await ses.send(new SendEmailCommand(params));
      console.log(`SES Email sent → ${to}`);
    } catch (err) {
      console.error("Error sending SES email:", err);
    }
  }
};
