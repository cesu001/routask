import type { Meta, StoryObj } from "@storybook/react";
import ProgressColumn from "../components/ProgressColumn";

const meta: Meta<typeof ProgressColumn> = {
  title: "Components/ProgressColumn",
  component: ProgressColumn,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "這個組件代表任務看板中的一列，顯示特定進度狀態的任務。使用者可以將任務卡片拖放到這裡以更改其進度狀態。",
      },
      story: {
        inline: false,
        iframeHeight: 600,
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: "300px", height: "500px" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ProgressColumn>;

export const Default: Story = {
  args: {
    column: { id: "NOT_STARTED", title: "Not Started" },
    tasks: [],
    onCardClick: (task) => {
      alert(`Clicked on task: ${task.title}`);
    },
  },
};
