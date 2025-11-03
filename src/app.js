const express = require("express");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ status: "API is running" });
});

app.post("/enqueue-email", (req, res) => {
  const { to, subject, message } = req.body;

  console.log("Received payload:", { to, subject, message });

  res.json({ message: "Request accepted — email will be queued later" });
});

app.listen(3000, () => console.log("Server running on port 3000"));
