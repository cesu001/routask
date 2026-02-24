import type { Meta, StoryObj } from "@storybook/react";
import LogoutButton from "../components/LogoutButton";

const meta: Meta<typeof LogoutButton> = {
  title: "Components/LogoutButton",
  component: LogoutButton,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "這是一個登出按鈕組件，用於用戶登出操作。",
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ position: "relative", width: "100%" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof LogoutButton>;

export const Default: Story = {};
