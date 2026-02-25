import type { Meta, StoryObj } from "@storybook/react";
import ResetPasswordNew from "../components/ResetPasswordNew";
import { MemoryRouter, Routes } from "react-router-dom";
import { useAuthStore } from "../store";
import { Route } from "react-router-dom";

const meta: Meta<typeof ResetPasswordNew> = {
  title: "Pages/ResetPasswordNew",
  component: ResetPasswordNew,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "這是重置密碼頁面，包含輸入新密碼和確認新密碼的表單以及提交按鈕。當用戶訪問此頁面時，會根據URL中的_id和token參數驗證重置密碼的請求。如果驗證成功，用戶可以輸入新密碼並提交表單來完成密碼重置過程。頁面還會顯示相應的錯誤消息或成功消息，以指導用戶完成操作。Docs顯示的樣式為行動裝置版，桌面版見Canvas。",
      },
      story: {
        inline: false,
        iframeHeight: 800,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ResetPasswordNew>;

export const ValidToken: Story = {
  decorators: [
    (Story) => {
      useAuthStore.setState({
        errorMessage: null,
        fetchResetPwd: async () => ({
          email: "test-user@example.com",
          message: "Token is valid.",
        }),
        resetPassword: async () => ({
          message: "Password has been successfully reset!",
        }),
      });

      return (
        <MemoryRouter
          initialEntries={["/reset-password/mock-id-123/mock-token-abc"]}
        >
          <Routes>
            <Route path="/reset-password/:_id/:token" element={<Story />} />
          </Routes>
        </MemoryRouter>
      );
    },
  ],
};
export const InvalidToken: Story = {
  decorators: [
    (Story) => {
      useAuthStore.setState({
        errorMessage: "Invalid or expired token.",
        fetchResetPwd: async () => {
          throw new Error("Invalid or expired token.");
        },
        resetPassword: async () => {
          throw new Error("Invalid or expired token.");
        },
      });

      return (
        <MemoryRouter
          initialEntries={["/reset-password/mock-id-123/invalid-token-xyz"]}
        >
          <Routes>
            <Route path="/reset-password/:_id/:token" element={<Story />} />
          </Routes>
        </MemoryRouter>
      );
    },
  ],
};
