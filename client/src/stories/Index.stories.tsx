import type { Meta, StoryObj } from "@storybook/react";
import Index from "../components/Index";
import { MemoryRouter } from "react-router-dom";
import { useEffect } from "react";
import { useAuthStore } from "../store";

const meta: Meta<typeof Index> = {
  title: "Pages/Index",
  component: Index,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "這是一個首頁組件，包含導航欄、主要內容、概覽、功能介紹和頁腳。Docs顯示的樣式為行動裝置版，桌面版見Canvas。",
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
type Story = StoryObj<typeof Index>;
export const LoggedOut: Story = {
  decorators: [
    (Story) => {
      useEffect(() => {
        useAuthStore.setState({ currentUser: null });
      }, []);
      return <Story />;
    },
  ],
};
export const LoggedIn: Story = {
  decorators: [
    (Story) => {
      useEffect(() => {
        useAuthStore.setState({
          currentUser: {
            token: "fake-token",
            user: {
              _id: "1",
              email: "user@example.com",
              fName: "John",
              lName: "Doe",
            },
            message: "User logged in",
          },
        });
      }, []);
      return <Story />;
    },
  ],
};
