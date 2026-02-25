import type { Meta, StoryObj } from "@storybook/react";
import Profile from "../components/Profile";
import { MemoryRouter } from "react-router-dom";
import { useAuthStore } from "../store";

const meta: Meta<typeof Profile> = {
  title: "Pages/Profile",
  component: Profile,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "這是用於修改使用者個人資料以及密碼的頁面，使用者可以在這裡更新他們的姓名、電子郵件地址以及密碼。Docs顯示的樣式為行動裝置版，桌面版見Canvas。",
      },
      story: {
        inline: false,
        iframeHeight: 800,
      },
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
type Story = StoryObj<typeof Profile>;

export const LoggedIn: Story = {
  decorators: [
    (Story) => {
      useAuthStore.setState({
        currentUser: {
          message: "User data fetched successfully.",
          token: "mock-token-123",
          user: {
            _id: "mock-id-123",
            email: "john.doe@example.com",
            fName: "John",
            lName: "Doe",
          },
        },
        fetchUserData: async () => {
          const currentState = useAuthStore.getState();
          return {
            message: "User data fetched successfully.",
            user: {
              fName: currentState.currentUser?.user.fName || "John",
              lName: currentState.currentUser?.user.lName || "Doe",
            },
          };
        },
        updateUserData: async (data) => {
          useAuthStore.setState((state) => ({
            currentUser: state.currentUser
              ? {
                  ...state.currentUser,
                  user: {
                    ...state.currentUser.user,
                    fName: data.fName,
                    lName: data.lName,
                  },
                }
              : null,
          }));
          return {
            message: "Profile updated successfully!",
            user: {
              fName: data.fName,
              lName: data.lName,
            },
          };
        },
        changePassword: async () => ({
          message: "Password changed successfully! Please login again.",
          user: { fName: "John", lName: "Doe" },
        }),
      });
      return <Story />;
    },
  ],
};
