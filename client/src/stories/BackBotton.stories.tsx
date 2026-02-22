import type { Meta, StoryObj } from "@storybook/react";
import BackButton from "../components/BackButton";
import { MemoryRouter } from "react-router-dom";

const meta: Meta<typeof BackButton> = {
  title: "Components/BackButton",
  component: BackButton,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "這是一個帶有左箭頭圖示的全域返回按鈕。內部已封裝 `react-router-dom` 的跳轉邏輯，點擊後會固定導向專案首頁 (`/`)。適用於獨立頁面的左上角導覽。",
      },
    },
  },
  decorators: [(story) => <MemoryRouter>{story()}</MemoryRouter>],
};

export default meta;
type Story = StoryObj<typeof BackButton>;

export const Default: Story = {};
