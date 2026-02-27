import type { Meta, StoryObj } from "@storybook/react";
import SidebarCalendar from "../components/SidebarCalendar";
import { within, userEvent } from "@storybook/test";
import { useTaskStore } from "../store";

const meta: Meta<typeof SidebarCalendar> = {
  title: "Components/SidebarCalendar",
  component: SidebarCalendar,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "這是側邊欄中用於顯示和管理日曆的部分。使用者可以在這裡查看他們的日曆列表，並且可以點擊標題旁的箭頭圖示來展開或收起日曆選項。每個日曆旁邊都有一個編輯以及刪除圖示，使用者可以點擊它們來編輯、刪除對應的日曆。",
      },
      story: {
        inline: false,
        iframeHeight: 400,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof SidebarCalendar>;

export const Default: Story = {
  decorators: [
    (Story) => {
      useTaskStore.setState({
        calendars: [
          {
            _id: "calendar-id-123",
            title: "default",
            owner: "mock-id-123",
            tasks: [],
          },
          {
            _id: "calendar-id-456",
            title: "default2",
            owner: "mock-id-123",
            tasks: [],
          },
        ],
      });
      return (
        <div className="w-64 bg-neutral-800 p-4">
          <Story />
        </div>
      );
    },
  ],
};

export const Opened: Story = {
  decorators: [
    (Story) => {
      useTaskStore.setState({
        calendars: [
          {
            _id: "calendar-id-123",
            title: "default",
            owner: "mock-id-123",
            tasks: [],
          },
          {
            _id: "calendar-id-456",
            title: "default2",
            owner: "mock-id-123",
            tasks: [],
          },
        ],
        selectCalendar: (calendarID) => {
          useTaskStore.setState((state) => ({
            selectedCalendarIDs: state.selectedCalendarIDs.includes(calendarID)
              ? state.selectedCalendarIDs.filter((id) => id !== calendarID)
              : [...state.selectedCalendarIDs, calendarID],
          }));
        },
      });
      return (
        <div className="w-64 bg-neutral-800 p-4">
          <Story />
        </div>
      );
    },
  ],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const toggleButton = canvas.getByRole("button", {
      name: "Toggle Calendar",
    });
    await userEvent.click(toggleButton);
  },
};
