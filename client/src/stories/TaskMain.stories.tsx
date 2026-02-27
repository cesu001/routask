import type { Meta, StoryObj } from "@storybook/react";
import TaskMain from "../components/TaskMain";
import { MemoryRouter } from "react-router-dom";
import { useAuthStore, useTaskStore } from "../store";

const meta: Meta<typeof TaskMain> = {
  title: "Components/TaskMain",
  component: TaskMain,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "這是任務管理的主要內容區域，顯示了使用者的任務列表和相關資訊。使用者可以在這裡查看、編輯和管理他們的任務，並且可以根據不同的篩選條件（如優先級、進度、日曆等）來組織和查看任務。Docs顯示的樣式為行動裝置版，桌面版見Canvas。",
      },
      story: {
        inline: false,
        iframeHeight: 800,
      },
    },
  },
  decorators: [
    (Story) => (
      <MemoryRouter>
        <div id="modal-root"></div>
        <div id="cmodal-root"></div>
        <Story />
      </MemoryRouter>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof TaskMain>;

export const Default: Story = {
  decorators: [
    (Story) => {
      useAuthStore.setState({
        currentUser: {
          message: "User data fetched successfully.",
          token: "mock-token-123",
          user: {
            _id: "mock-id-123",
            email: "john.doe@example.com",
            fName: "John",
            lName: "Doe",
          },
        },
      });
      useTaskStore.setState({
        tasks: [
          {
            _id: "task-id-123",
            owner: "mock-id-123",
            title: "Finish project report",
            calendar: "calendar-id-123",
            priority: "high",
            progress: "in progress",
            date: "2026-03-31",
            cycle: false,
            cycleInterval: 0,
            location: "Office",
            notes: "Report is due by the end of the month.",
            archived: false,
          },
        ],
      });
      return <Story />;
    },
  ],
};
