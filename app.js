const { App } = require("@slack/bolt");
require("dotenv").config();

// Slack App 초기화
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
});

app.command("/worktime", async ({ command, ack, say }) => {
  await ack();
  const [worked, require] = command.text.split(" ").map(Number);
  const remaining = require - worked;
  // 53.3 - 40.2 = 13.1
  const hours = Math.floor(remaining);
  // 13.1 => 13
  const minutes = Math.round((remaining - hours) * 60);
  // 0.1 * 60 = 6
  await say(`남은 근무 시간은 ${hours}시간 ${minutes}분 입니다.`);
});

(async () => {
  await app.start(process.env.PORT || 3000);
  console.log("Slack bot is running");
})();
