import type { Meta, StoryObj } from "@storybook/react";
import EventCalendar from "../components/EventCalendar";
import { useTaskStore } from "../store";

const meta: Meta<typeof EventCalendar> = {
  title: "Components/EventCalendar",
  component: EventCalendar,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "EventCalendar 是一個日曆組件，顯示當月的日期和相關任務。使用者可以通過點擊日期來查看該日期的任務詳情。日曆會根據使用者的任務數據進行渲染，並且提供了切換月份的功能。",
      },
      story: {
        inline: false,
        iframeHeight: 600,
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
        ],
        tasks: [
          {
            _id: "task-id-123",
            owner: "mock-id-123",
            title: "Task 1",
            calendar: "calendar-id-123",
            priority: "medium",
            progress: "in progress",
            date: new Date().toISOString(),
            cycle: false,
            cycleInterval: 0,
            location: "",
            notes: "",
            archived: false,
          },
        ],
      });
      return (
        <div
          style={{
            height: "100vh",
            width: "100vw",
            backgroundColor: "#f0f0f0",
          }}
        >
          <div id="cmodal-root"></div>
          <Story />
        </div>
      );
    },
  ],
};

export default meta;
type Story = StoryObj<typeof EventCalendar>;

export const Default: Story = {};
