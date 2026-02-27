import type { Meta, StoryObj } from "@storybook/react";
import TaskModal from "../components/TaskModal";
import { useTaskStore } from "../store";

const meta: Meta<typeof TaskModal> = {
  title: "Components/TaskModal",
  component: TaskModal,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "這是新增或編輯任務的視窗，當使用者點擊新增任務或任務卡片時會彈出。視窗包含了任務的詳細資訊和編輯選項，使用者可以在這裡查看和修改任務的標題、日期、優先級、進度、週期、地點和備註等資訊。Docs顯示的樣式為行動裝置版，桌面版見Canvas。",
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
      if (!document.getElementById("modal-root")) {
        const modalRoot = document.createElement("div");
        modalRoot.setAttribute("id", "modal-root");
        document.body.appendChild(modalRoot);
      }
      return <Story />;
    },
  ],
};
export default meta;
type Story = StoryObj<typeof TaskModal>;

export const AddNewTask: Story = {
  args: {
    currentTask: {
      _id: "new",
      owner: "",
      title: "",
      calendar: "",
      priority: "low",
      progress: "not started",
      date: "",
      cycle: false,
      cycleInterval: 0,
      location: "",
      notes: "",
      archived: false,
    },
    isModalOpen: true,
    toggleModal: () => alert("Modal closed!"),
  },
};

export const EditTask: Story = {
  args: {
    currentTask: {
      _id: "task-id-123",
      owner: "mock-id-123",
      title: "Finish the project report",
      calendar: "calendar-id-123",
      priority: "high",
      progress: "in progress",
      date: new Date().toString(),
      cycle: false,
      cycleInterval: 0,
      location: "Office",
      notes: "Need to include the latest sales data.",
      archived: false,
    },
    isModalOpen: true,
    toggleModal: () => alert("Modal closed!"),
  },
};
