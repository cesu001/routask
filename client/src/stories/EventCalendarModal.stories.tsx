import type { Meta, StoryObj } from "@storybook/react";
import EventCalendarModal from "../components/EventCalendarModal";
import { useTaskStore } from "../store";

const meta: Meta<typeof EventCalendarModal> = {
  title: "Components/EventCalendarModal",
  component: EventCalendarModal,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "這是一個用於顯示特定日期任務的模態框組件。當使用者點擊日曆上的某一天時，這個模態框會彈出，顯示該日期的任務列表。使用者可以在這裡查看任務的詳細資訊，並且點擊任務卡片以進行編輯。Docs顯示的樣式為行動裝置版，桌面版見Canvas。",
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
        ],
      });
      if (!document.getElementById("cmodal-root")) {
        const modalRoot = document.createElement("div");
        modalRoot.setAttribute("id", "cmodal-root");
        document.body.appendChild(modalRoot);
      }
      return <Story />;
    },
  ],
};

export default meta;
type Story = StoryObj<typeof EventCalendarModal>;

export const Default: Story = {
  args: {
    dayOpen: new Date(),
    isCModalOpen: true,
    toggleCModal: () => alert("Modal closed!"),
    selectedTasks: [
      {
        _id: "task-id-123",
        owner: "mock-id-123",
        title: "Finish report",
        calendar: "calendar-id-123",
        priority: "high",
        progress: "in progress",
        date: new Date().toISOString(),
        cycle: false,
        cycleInterval: 0,
        location: "Office",
        notes: "Need to finish the quarterly report by end of day.",
        archived: false,
      },
    ],
  },
};
