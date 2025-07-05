import express from "express";
import cors from "cors";
import axios from "axios";

const app = express();
app.use(cors());
app.use(express.json());

const SLACK_WEBHOOK_URL = "https://hooks.slack.com/services/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"; 

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
