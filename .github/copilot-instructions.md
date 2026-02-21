**專案開發指引（copilot-instructions）**

- **專案概覽**: 本專案前端使用 Vite + React + TypeScript（位於 [client/](client/)），後端為 Node.js/Express（位於 [server/](server/)）。前端主要檔案與目錄包括 [client/src/](client/src/)、元件在 [client/src/components/](client/src/components/)、共用型別在 [client/types.ts](client/types.ts)、全域狀態在 [client/src/store.tsx](client/src/store.tsx)。後端路由、模型、驗證分別在 [server/routes/](server/routes/)、[server/models/](server/models/)、[server/validation.js](server/validation.js)。

- **快速啟動**
	- 前端:
```
	cd client
	npm install
	npm run dev
```
	- 後端:
```
	cd server
	npm install
	npm start
```
	- 建議：在前端使用環境變數（例如 `VITE_API_URL`）設定 API 端點。

- **檔案與命名慣例**
	- 元件檔名使用 PascalCase 並放在 [client/src/components/](client/src/components/)，例如 `TaskCard.tsx`。
	- hook 放在 [client/src/hooks/](client/src/hooks/) 並以 `use` 開頭，例如 `useFilteredTasks.ts`。
	- 服務層放在 [client/src/services/](client/src/services/)，每個外部 API 類型功能獨立檔案（`auth.service.tsx`、`task.service.tsx`）。
	- 後端路由使用資源命名且放在 [server/routes/](server/routes/)；模型放在 [server/models/](server/models/)。
	- TypeScript 型別集中在 [client/types.ts](client/types.ts)。

- **程式風格**
	- React：使用 Functional Components + Hooks。
	- 命名：Component 和 types 用 PascalCase；函式與變數用 camelCase。
	- 使用明確回傳型別與 interface/type，避免使用 `any`。

- **狀態管理**
	- 專案已有 `store.tsx`，請把共用狀態與 action 集中管理並保持純函式更新。

- **API 與錯誤處理**
	- 透過 [client/src/services/*](client/src/services/) 封裝所有 HTTP 呼叫，回傳乾淨資料並統一處理錯誤（throw 或回傳標準錯誤物件）。
	- 後端 route 應在輸入驗證（見 [server/validation.js](server/validation.js)）後再操作模型。

- **新增功能流程（建議）**
	1. 在前端建立元件於 [client/src/components/](client/src/components/)（遵守命名與樣式）。
	2. 若有共享邏輯，新增 hook 至 [client/src/hooks/](client/src/hooks/)。
	3. 若需 API，新增 service 函式於 [client/src/services/](client/src/services/)。
	4. 後端新增 route（[server/routes/](server/routes/)）與模型（[server/models/](server/models/)），並更新驗證規則。
	5. 若影響全域狀態，更新 [client/src/store.tsx](client/src/store.tsx)。
	6. 本地手動測試並提交 PR，描述變更與測試步驟。

- **測試與品質**
	- 建議導入 Jest + React Testing Library，覆蓋關鍵邏輯（hooks、services）。
	- 在 CI 中執行 lint、type-check 與測試。

- **提交與 PR 流程**
	- 每次功能或修正使用獨立分支，PR 範圍小且有描述、重現步驟與測試說明。

- **文件與範本**
	- 新增元件時採用最小範本：prop 型別 -> 元件 -> 單一責任 -> 對外暴露。
	- 更新 [README.md](README.md) 加入啟動與部署步驟。

- **安全與環境**
	- 後端敏感設定使用環境變數（不要提交到 repo）。
	- 認證 token 建議使用 HttpOnly cookie 或安全地存在 client。

- **本地開發便利性（建議）**
	- 在 `client/` 加入 `.env.example`，標記 `VITE_API_URL` 等變數。
	- 在 `client/package.json` 加入 `dev`, `build`, `lint` 等 scripts（若尚未有）。

- **語言與格式**
	- 註解與文件以繁體中文（zh-tw）為主，程式識別字詞保留英文。

- **接下來**: 若需要，我可以將此文件調整為更嚴格的規範（lint 規則、PR 模板、CI 設定），或新增測試範例。

