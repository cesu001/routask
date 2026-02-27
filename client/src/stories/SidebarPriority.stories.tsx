import type { Meta, StoryObj } from "@storybook/react";
import SidebarPriority from "../components/SidebarPriority";
import { within, userEvent } from "@storybook/test";
import { useTaskStore } from "../store";

const meta: Meta<typeof SidebarPriority> = {
  title: "Components/SidebarPriority",
  component: SidebarPriority,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "這是側邊欄中用於篩選任務優先級的部分。使用者可以點擊標題旁的箭頭圖示來展開或收起優先級選項，並且可以選擇不同的優先級（低、中、高）來篩選任務列表。",
      },
      story: {
        inline: false,
        iframeHeight: 400,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof SidebarPriority>;

export const Default: Story = {
  decorators: [
    (Story) => {
      useTaskStore.setState({
        selectedPriority: [],
        selectPriority: () => {},
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
        selectedPriority: ["high"],
        selectPriority: (priority) => {
          useTaskStore.setState((state) => ({
            selectedPriority: state.selectedPriority.includes(priority)
              ? state.selectedPriority.filter((p) => p !== priority)
              : [...state.selectedPriority, priority],
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
    const toggleBtn = canvas.getByRole("button", { name: "Toggle Priority" });
    await userEvent.click(toggleBtn);
  },
};
