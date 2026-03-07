const router = require("express").Router();
const dotenv = require("dotenv");
dotenv.config();
const { google } = require("@ai-sdk/google");
const { streamText } = require("ai");

router.post("/api/chat", async (req, res) => {
  const { messages } = req.body;
  const result = await streamText({
    model: google("gemini-1.5-flash"), // 或是 gemini-2.0-flash
    messages,
    // 你可以在這裡加入 System Prompt，讓 AI 知道它是 RouTask 助理
    system: "你是一位 RouTask 專案的智能助手，負責協助使用者管理日程與任務。",
  });

  // 將串流直接導向 response
  result.pipeDataStreamToResponse(res);
});

module.exports = router;
