import type { Meta, StoryObj } from "@storybook/react";
import indexOverview from "../components/indexOverview";

const meta: Meta<typeof indexOverview> = {
  title: "Components/IndexOverview",
  component: indexOverview,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "這是一個首頁概覽組件，展示了網站的主要功能和特點。這個故事展示了indexOverview組件在不同屏幕尺寸下的行為。Docs顯示的樣式為行動裝置版，桌面版見Canvas。",
      },
      story: {
        inline: false,
        iframeHeight: 500,
      },
    },
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof indexOverview>;
export const Default: Story = {};
