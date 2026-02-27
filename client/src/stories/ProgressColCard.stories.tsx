import type { Meta, StoryObj } from "@storybook/react";
import ProgressColCard from "../components/ProgressColCard";
import { useTaskStore } from "../store";

const meta: Meta<typeof ProgressColCard> = {
  title: "Components/ProgressColCard",
  component: ProgressColCard,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "這是一個用於顯示任務進度的卡片組件，通常用於任務管理頁面中的進度欄。每個卡片代表一個任務，顯示任務的標題、截止日期和優先級等資訊。",
      },
    },
    story: {
      inline: false,
      iframeHeight: 200,
    },
  },
  decorators: [
    (Story) => {
      useTaskStore.setState({
        calendars: [
          {
            _id: "calendar-id-123",
            title: "Work",
            owner: "mock-id-123",
            tasks: ["task-id-123"],
          },
        ],
      });
      return (
        <div style={{ width: "300px", margin: "20px" }}>
          <Story />
        </div>
      );
    },
  ],
};
export default meta;
type Story = StoryObj<typeof ProgressColCard>;

export const Default: Story = {
  args: {
    task: {
      _id: "task-id-123",
      owner: "mock-id-123",
      title: "Finish project report",
      calendar: "calendar-id-123",
      priority: "high",
      progress: "in progress",
      date: "2024-07-01T17:00:00Z",
      cycle: false,
      cycleInterval: 0,
      location: "Office",
      notes: "Need to include the latest sales data.",
      archived: false,
    },
    onClick: (task) => alert(`Clicked on task: ${task.title}`),
  },
};
