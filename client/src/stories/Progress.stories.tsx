import type { Meta, StoryObj } from "@storybook/react";
import Progress from "../components/Progress";
import { useTaskStore } from "../store";

const meta: Meta<typeof Progress> = {
  title: "Components/Progress",
  component: Progress,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "這是任務進度組件，負責顯示任務的當前進度狀態。它根據任務的進度屬性來渲染不同的樣式和顏色，以便使用者能夠快速識別任務的狀態。",
      },
    },
  },
  decorators: [
    (Story) => {
      useTaskStore.setState({
        calendars: [
          {
            _id: "calendar-1",
            title: "Work",
            owner: "user-1",
            tasks: [],
          },
        ],
        tasks: [
          {
            _id: "task-1",
            owner: "user-1",
            title: "Task 1",
            progress: "not started",
            calendar: "calendar-1",
            priority: "low",
            date: "2024-06-01",
            cycle: false,
            cycleInterval: 0,
            location: "",
            notes: "",
            archived: false,
          },
          {
            _id: "task-2",
            owner: "user-1",
            title: "Task 2",
            progress: "in progress",
            calendar: "calendar-1",
            priority: "medium",
            date: "2024-06-01",
            cycle: false,
            cycleInterval: 0,
            location: "",
            notes: "",
            archived: false,
          },
          {
            _id: "task-3",
            owner: "user-1",
            title: "Task 3",
            progress: "completed",
            calendar: "calendar-1",
            priority: "high",
            date: "2024-06-01",
            cycle: false,
            cycleInterval: 0,
            location: "",
            notes: "",
            archived: false,
          },
        ],
      });
      return (
        <div>
          <Story />
        </div>
      );
    },
  ],
};
export default meta;
type Story = StoryObj<typeof Progress>;

export const NotStarted: Story = {};
