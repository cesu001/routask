import type { Meta, StoryObj } from "@storybook/react";
import TaskList from "../components/TaskList";
import { useTaskStore } from "../store";
import { use } from "chai";

const meta: Meta<typeof TaskList> = {
  title: "Components/TaskList",
  component: TaskList,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "這是任務列表組件，負責顯示使用者的任務。它包含了搜尋、排序和分頁功能，讓使用者可以更方便地管理和瀏覽他們的任務。Docs顯示的樣式為行動裝置版，桌面版見Canvas。",
      },
      story: {
        inline: false,
        iframeHeight: 800,
      },
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
            tasks: [],
          },
          {
            _id: "calendar-id-456",
            title: "Personal",
            owner: "mock-id-123",
            tasks: [],
          },
        ],
        tasks: [
          {
            _id: "task-id-123",
            owner: "mock-id-123",
            title: "Finish project report",
            calendar: "calendar-id-123",
            priority: "high",
            progress: "in progress",
            date: "2024-07-01T12:00:00Z",
            cycle: false,
            cycleInterval: 0,
            location: "Office",
            notes: "Report is due next week.",
            archived: false,
          },
          {
            _id: "task-id-456",
            owner: "mock-id-123",
            title: "Buy groceries",
            calendar: "calendar-id-456",
            priority: "medium",
            progress: "not started",
            date: "2024-07-02T18:00:00Z",
            cycle: false,
            cycleInterval: 0,
            location: "Supermarket",
            notes: "Need to buy milk, eggs, and bread.",
            archived: false,
          },
        ],
      });
      return (
        <div style={{ height: "50vh" }}>
          <Story />
        </div>
      );
    },
  ],
};

export default meta;
type Story = StoryObj<typeof TaskList>;

export const Default: Story = {};
