import type { Meta, StoryObj } from "@storybook/react";
import NavLinks from "../components/NavLinks";
import { MemoryRouter } from "react-router-dom";
import { useAuthStore } from "../store";
import { useEffect } from "react";

const meta: Meta<typeof NavLinks> = {
  title: "Components/NavLinks",
  component: NavLinks,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "這是一個導航連結組件，用於導航欄中的連結。這個故事展示了NavLinks組件在不同用戶狀態下的行為。LoggedOut故事模擬了未登錄用戶的情況，而LoggedIn故事模擬了已登錄用戶的情況。通過這些故事，我們可以確保NavLinks在不同狀態下正確顯示相應的導航選項。",
      },
      story:{
        inline:false,
      }
    },
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
type Story = StoryObj<typeof NavLinks>;

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
