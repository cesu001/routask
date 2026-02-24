import type { Meta, StoryObj } from "@storybook/react";
import Nav from "../components/Nav";
import { MemoryRouter } from "react-router-dom";
import { useAuthStore } from "../store";
import { useEffect } from "react";

const meta: Meta<typeof Nav> = {
  title: "Components/Nav",
  component: Nav,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "這是一個導航欄組件，用於網站的主要導航。這個故事展示了Nav組件在不同用戶狀態下的行為。LoggedOut故事模擬了未登錄用戶的情況，而LoggedIn故事模擬了已登錄用戶的情況。通過這些故事，我們可以確保Nav在不同狀態下正確顯示相應的導航選項。Docs顯示的樣式為行動裝置版，桌面版見Canvas。",
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
        <div style={{ minHeight: "500px" }}>
          <Story />
        </div>
      </MemoryRouter>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Nav>;
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
