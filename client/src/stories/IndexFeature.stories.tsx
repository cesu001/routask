import type { Meta, StoryObj } from "@storybook/react";
import IndexFeature from "../components/IndexFeature";

const meta: Meta<typeof IndexFeature> = {
  title: "Components/IndexFeature",
  component: IndexFeature,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "這是一個首頁功能展示組件，展示了網站的主要功能和特點。這個故事展示了IndexFeature組件在不同屏幕尺寸下的行為。Docs顯示的樣式為行動裝置版，桌面版見Canvas。",
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
type Story = StoryObj<typeof IndexFeature>;
export const Default: Story = {};
