import { useChat } from "@ai-sdk/react";
import { useState, useRef, useEffect } from "react";

export default function ChatBot() {
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  // 初始化 useChat 並對準後端 API
  const { messages, sendMessage, isLoading } = useChat({
    api: "http://localhost:8080/api/chat",
  });

  // 自動捲動到底部
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="flex flex-col w-full max-w-md h-[600px] border border-gray-200 rounded-2xl shadow-2xl bg-white mx-auto overflow-hidden mt-10">
      {/* Header */}
      <div className="bg-indigo-600 p-4 text-white font-bold">
        RouTask AI 助手
      </div>

      {/* 訊息顯示區 */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50"
      >
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                m.role === "user"
                  ? "bg-indigo-500 text-white"
                  : "bg-white border text-gray-800"
              }`}
            >
              {/* 解析 v4+ 的 parts 格式 */}
              {m.parts?.map((part, i) => {
                if (part.type === "text") return <p key={i}>{part.text}</p>;
                return null;
              })}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="text-xs text-gray-400 italic">AI 正在思考中...</div>
        )}
      </div>

      {/* 輸入框區 */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!input.trim()) return;
          sendMessage({ text: input }); // 發送訊息
          setInput(""); // 清空
        }}
        className="p-4 border-t bg-white flex gap-2"
      >
        <input
          className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={input}
          placeholder="問問 RouTask..."
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          disabled={isLoading}
          className="bg-indigo-600 text-white px-4 py-2 rounded-full text-sm font-medium disabled:bg-gray-300 transition-colors"
        >
          發送
        </button>
      </form>
    </div>
  );
}
