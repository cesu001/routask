import type { Meta, StoryObj } from "@storybook/react";
import Sidebar from "../components/Sidebar";
import { MemoryRouter } from "react-router-dom";
import { useTaskStore } from "../store";
import { within, userEvent } from "@storybook/test";

const meta: Meta<typeof Sidebar> = {
  title: "Components/Sidebar",
  component: Sidebar,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "這是任務管理頁面中的側邊欄，包含了日曆、進度、優先度等篩選選項。使用者可以在這裡查看他們的日曆，並且可以點擊標題旁的箭頭圖示來展開或收起日曆選項。每個日曆旁邊都有一個編輯以及刪除圖示，使用者可以點擊它們來編輯、刪除對應的日曆。Docs顯示的樣式為行動裝置版，桌面版見Canvas。(canvas中的行動裝置版顯示失效)",
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
        showArchived: false,
        setShowArchived: (val) => useTaskStore.setState({ showArchived: val }),
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
        selectedCalendarIDs: [],
        selectedProgress: [],
        selectedPriority: [],
      });
      return (
        <MemoryRouter>
          <div className="w-64">
            <Story />
          </div>
        </MemoryRouter>
      );
    },
  ],
};

export default meta;
type Story = StoryObj<typeof Sidebar>;

export const MobileOpen: Story = {
  args: {
    isOpen: true,
    onClose: () => console.log("Close button clicked!"),
  },
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
};

export const Desktop: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
  },
};

export const AllExpanded: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const calendarBtn = canvas.getByRole("button", { name: "Toggle Calendar" });
    const progressBtn = canvas.getByRole("button", { name: "Toggle Progress" });
    const priorityBtn = canvas.getByRole("button", { name: "Toggle Priority" });

    await userEvent.click(calendarBtn);
    await userEvent.click(progressBtn);
    await userEvent.click(priorityBtn);
  },
};
