// api/slack_alert.js
export default async function handler(req, res) {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method Not Allowed" });
    }
  
    const { fullName, email, phone, domain, duration, timestamp, college, department, reason } = req.body;
  
    const SLACK_WEBHOOK_URL = "https://hooks.slack.com/services/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";
  
    try {
      const slackRes = await fetch(SLACK_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: `🎓 *New Internship Application Received src->pages->api->alert*`,
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
        }),
      });
  
      res.status(200).json({ ok: true });
    } catch (error) {
      console.error("Slack webhook failed:", error);
      res.status(500).json({ error: "Failed to send Slack message" });
    }
  }
  