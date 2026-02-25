import type { Meta, StoryObj } from "@storybook/react";
import Register from "../components/Register";
import { MemoryRouter } from "react-router-dom";

const meta: Meta<typeof Register> = {
  title: "Pages/Register",
  component: Register,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "這是一個註冊組件，提供用戶註冊功能。Docs顯示的樣式為行動裝置版，桌面版見Canvas。",
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
type Story = StoryObj<typeof Register>;

export const Default: Story = {};
