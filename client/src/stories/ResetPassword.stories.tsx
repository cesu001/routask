import type { Meta, StoryObj } from "@storybook/react";
import ResetPassword from "../components/ResetPassword";
import { MemoryRouter } from "react-router-dom";

const meta: Meta<typeof ResetPassword> = {
  title: "Pages/ResetPassword",
  component: ResetPassword,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "這是一個重設密碼組件，提供用戶重設密碼的功能，用戶需要輸入註冊時的信箱並去接收重設密碼的郵件。Docs顯示的樣式為行動裝置版，桌面版見Canvas。",
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
type Story = StoryObj<typeof ResetPassword>;

export const Default: Story = {};
