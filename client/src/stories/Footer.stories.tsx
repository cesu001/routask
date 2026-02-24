import type { Meta, StoryObj } from "@storybook/react";
import Footer from "../components/Footer";
import { MemoryRouter } from "react-router-dom";

const meta: Meta<typeof Footer> = {
  title: "Components/Footer",
  component: Footer,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "這是一個頁腳組件，用於顯示版權信息和其他相關連結。",
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
type Story = StoryObj<typeof Footer>;

export const Default: Story = {};
