import type { Meta, StoryObj } from "@storybook/react";
import SidebarProgress from "../components/SidebarProgress";
import { within, userEvent } from "@storybook/test";
import { useTaskStore } from "../store";

const meta: Meta<typeof SidebarProgress> = {
  title: "Components/SidebarProgress",
  component: SidebarProgress,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "這是側邊欄中用於篩選任務進度的部分。使用者可以點擊標題旁的箭頭圖示來展開或收起進度選項，並且可以選擇不同的進度（未開始、進行中、已完成）來篩選任務列表。",
      },
      story: {
        inline: false,
        iframeHeight: 400,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof SidebarProgress>;

export const Default: Story = {
  decorators: [
    (Story) => {
      useTaskStore.setState({
        selectedProgress: [],
        selectProgress: () => {},
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
        selectedProgress: ["in progress"],
        selectProgress: (progress) => {
          useTaskStore.setState((state) => ({
            selectedProgress: state.selectedProgress.includes(progress)
              ? state.selectedProgress.filter((p) => p !== progress)
              : [...state.selectedProgress, progress],
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
      name: "Toggle Progress",
    });
    await userEvent.click(toggleButton);
  },
};
