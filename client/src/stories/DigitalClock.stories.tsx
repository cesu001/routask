import type { Meta, StoryObj } from "@storybook/react";
import DigitalClock from "../components/DigitalClock";

const meta: Meta<typeof DigitalClock> = {
  title: "Components/DigitalClock",
  component: DigitalClock,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "這是一個顯示當前日期和時間的數字時鐘組件。日期格式為 `YYYY-MM-DD`，時間格式為 `hh:mm:ss AM/PM`。時間會每秒更新一次，適用於需要實時顯示時間的場景。",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof DigitalClock>;

export const Default: Story = {};
