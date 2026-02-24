import type { Meta, StoryObj } from "@storybook/react";
import IndexMain from "../components/IndexMain";
import { MemoryRouter } from "react-router-dom";

const meta: Meta<typeof IndexMain> = {
  title: "Components/IndexMain",
  component: IndexMain,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "這是一個首頁主視覺組件，展示了網站的主要信息和引導用戶註冊或登錄。這個故事展示了IndexMain組件在不同屏幕尺寸下的行為。Docs顯示的樣式為行動裝置版，桌面版見Canvas。",
      },
      story: {
        inline: false,
        iframeHeight: 500,
      },
    },
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof IndexMain>;
export const Default: Story = {};
