import type { Meta, StoryObj } from "@storybook/react";
import Login from "../components/Login";
import { MemoryRouter } from "react-router-dom";

const meta: Meta<typeof Login> = {
  title: "Pages/Login",
  component: Login,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "這是一個登入組件，提供用戶登入功能。這個故事展示了Login組件在不同屏幕尺寸下的行為。Docs顯示的樣式為行動裝置版，桌面版見Canvas。",
      },
      story: {
        inline: false,
        iframeHeight: 800,
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
type Story = StoryObj<typeof Login>;
export const Default: Story = {};
