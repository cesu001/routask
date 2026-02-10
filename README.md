# **Routask-行事曆與任務管理系統**
### Routask 是一個MERN Full Stack專案。本專案透過Zustand全域狀態管理，實現了會員系統、任務管理等功能在前端與後端、資料庫的資料即時同步。
### 展示影片連結：https://reurl.cc/NNWLrq
## **技術架構**
  ### **前端(Frontend)**
  * **React & Vite:** 利用Vite的熱更新(HMR)特性提升開發效率。
  * **Zustand:** 輕量、直覺的狀態管理，實現管理全域的會員與任務狀態。
  * **Tailwind CSS:** 快速設定樣式以及響應式網頁設計(RWD)。
  * **date-fns:** 處理複雜的日期加減與格式化，確保日曆邏輯的穩定性。
  * **@dnd-kit/core:** 實現Progress View的任務抓取、拖曳。
  ### **後端(Backend)**
  * **Node.js & Express:** 建立RESTful API、處理跨源資源共享(CORS)。
  * **MongoDB & Mongoose:** 使用非關聯式資料庫儲存會員資料、任務資訊，並透過model與資料庫互動。
  * **Passport.js (JWT Strategy)：** 建立使用者的身份驗證，並透過jwt token存取後端路由。
  * **Joi:** 建立Validation檢查傳入資料格式是否與資料庫要求相符。
## **功能清單**
### **會員系統：** 
  * 帳號註冊、登入、登出
  * 修改會員資料、修改密碼
  * 忘記密碼重設
### **任務管理：** 
  * 新增任務、刪除任務、封存任務
  * 編輯任務之標題、日期、時間、進度、優先度、所屬行事曆、地點、備註、是否為循環任務、循環間隔
### **任務篩選：**
  * 透過任務管理頁面左側的行事曆、進度、優先度進行任務篩選
  * 顯示已封存之任務
  * 行事曆可自由新增、修改、刪除(所屬任務也會跟著刪除)
### **任務檢視：**
  * 清單模式：列出所有任務，可透過篩選、標題查詢、依時間排序來顯示相符條件之任務
  * 月曆模式：顯示每日所包含的任務，可透過篩選顯示相符條件之任務
  * 進度模式：依各進度顯示處在該進度的任務，可透過篩選、依時間排序顯示相符條件之任務，並透過拖曳來改變任務進度
  * 三種檢視模式下皆可點選任務進行編輯
## **專案結構**
```
├── client/              # React
│   ├── src/
│   │   ├── components/  # UI 組件
│   │   ├── hooks/       # 自定義 Hook (例如 useBodyScrollLock)
│   │   ├── services/    # Axios API 封裝
│   │   ├── store.tsx    # Zustand 狀態中心
│   │   ├── types.ts     # TypeScript 型別定義
│   │   └── App.tsx      # 全域路由設定
└── server/              # Node.js (Express)
    ├── config/          # Passport 策略設定
    ├── models/          # Mongoose 資料模型
    ├── routes/          # API 路由拆解
    ├── validation.js    # Joi 表單驗證
    └── index.js         # 後端進入點 (連接 MongoDB 與初始化伺服器)
```
## **本地安裝與運行**
  1. Install mongodb-community.
  2. Change file name .env.example -> .env or create .env file in client folder.
  3. Fill yout ip and server port in VITE_API_URL in .env file in client folder.
  4. Change file name .env.example -> .env or create .env file in server folder.
  4. Fill yout ip and client port in CLIENT_ORIGIN in .env file in server folder.
  6. Start mongodb-community.
  7. Command: ```npm install``` in server folder.
  8. Command: ```npm install``` in client folder.
  9. Command: ```node index.js``` in server folder.
  10. Command: ```npm run dev``` in client folder.
  11. Go http://localhost:5173 or http://yourIP:yourPort in browser.
