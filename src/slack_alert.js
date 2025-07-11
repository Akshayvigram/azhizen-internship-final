import express from "express";
import cors from "cors";
import axios from "axios";

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());

const SLACK_WEBHOOK_URL = process.env.SLACK_WEBHOOK_URL;; 

app.post("/slack-alert", async (req, res) => {
  const { fullName, email, phone, domain, duration, timestamp, college, department, reason } = req.body;

  try {
    await axios.post(SLACK_WEBHOOK_URL, {
      text: `🎓 *New Internship Application Received*`,
      attachments: [
        {
          color: "#36a64f",
          fields: [
            { title: "Name", value: fullName, short: true },
            { title: "Email", value: email, short: true },
            { title: "Phone", value: phone, short: true },
            { title: "Domain", value: domain, short: true },
            { title: "Duration", value: duration, short: true },
            { title: "Timestamp", value: timestamp, short: true },
            { title: "College", value: college, short: true },
            { title: "Department", value: department, short: true },
            { title: "Reason", value: reason, short: false }
          ]
        }
      ]
    });

    res.status(200).send({ ok: true });
  } catch (error) {
    console.error("Slack error", error);
    res.status(500).send({ error: "Failed to send Slack alert" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Slack alert server running on ${PORT}`));
