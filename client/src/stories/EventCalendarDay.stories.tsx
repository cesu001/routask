import type { Meta, StoryObj } from "@storybook/react";
import EventCalendarDay from "../components/EventCalendarDay";

const meta: Meta<typeof EventCalendarDay> = {
  title: "Components/EventCalendarDay",
  component: EventCalendarDay,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "這個組件代表日曆中的一天，顯示該天的日期和相關任務。它根據當前月份、是否為今天以及任務的優先級來調整樣式。當有多於兩個任務時，會顯示一個省略號圖標，提示用戶有更多任務。",
      },
      story: {
        inline: false,
        iframeHeight: 100,
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: "100px", height: "100px" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof EventCalendarDay>;

export const TodayWithTasks: Story = {
  args: {
    day: new Date(),
    isCurrentMonth: true,
    isTodayDate: true,
    dayTasks: [
      {
        _id: "1",
        owner: "user1",
        title: "Task 1",
        calendar: "calendar1",
        priority: "high",
        progress: "not started",
        date: new Date().toISOString(),
        cycle: false,
        cycleInterval: 0,
        location: "Office",
        notes: "This is a high priority task.",
        archived: false,
      },
    ],
    onClick: () => alert("Day clicked!"),
  },
};

export const TodayWithoutTasks: Story = {
  args: {
    day: new Date(),
    isCurrentMonth: true,
    isTodayDate: true,
    dayTasks: [],
    onClick: () => alert("Day clicked!"),
  },
};
export const NotTodayWithTasks: Story = {
  args: {
    day: new Date(),
    isCurrentMonth: true,
    isTodayDate: false,
    dayTasks: [
      {
        _id: "1",
        owner: "user1",
        title: "Task 1",
        calendar: "calendar1",
        priority: "high",
        progress: "not started",
        date: new Date().toISOString(),
        cycle: false,
        cycleInterval: 0,
        location: "Office",
        notes: "This is a high priority task.",
        archived: false,
      },
    ],
    onClick: () => alert("Day clicked!"),
  },
};

export const NotTodayWithoutTasks: Story = {
  args: {
    day: new Date(),
    isCurrentMonth: true,
    isTodayDate: false,
    dayTasks: [],
    onClick: () => alert("Day clicked!"),
  },
};
