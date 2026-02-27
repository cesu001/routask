import type { Meta, StoryObj } from "@storybook/react";
import TaskCard from "../components/TaskCard";

const meta: Meta<typeof TaskCard> = {
  title: "Components/TaskCard",
  component: TaskCard,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "這是一個任務卡片組件，用於在任務列表中顯示單個任務的詳細資訊。卡片包含任務的標題、截止日期、優先級、進度等資訊，並且可以根據任務的狀態顯示不同的樣式。",
      },
      story: {
        inline: false,
        iframeHeight: 300,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof TaskCard>;

export const Default: Story = {
  args: {
    task: {
      _id: "task-id-123",
      owner: "mock-id-123",
      title: "Finish the project report",
      calendar: "calendar-id-123",
      priority: "high",
      progress: "in progress",
      date: new Date().toISOString(),
      cycle: false,
      cycleInterval: 0,
      location: "Office",
      notes: "Need to include the latest sales data.",
      archived: false,
    },
    onClick: () => alert("Task modal opened!"),
    calendarTitle: "Work",
  },
};
