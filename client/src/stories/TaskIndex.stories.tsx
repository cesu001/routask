import type { Meta, StoryObj } from "@storybook/react";
import TaskIndex from "../components/TaskIndex";
import { MemoryRouter } from "react-router-dom";
import { useAuthStore, useTaskStore } from "../store";
import type { Task, Calendar } from "../../types";

const meta: Meta<typeof TaskIndex> = {
  title: "Pages/TaskIndex",
  component: TaskIndex,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "這是任務管理的主要頁面，使用者可以在這裡查看和管理他們的任務。頁面包含一個側邊欄和一個主要內容區域，側邊欄提供了篩選選項，而主要內容區域則顯示了使用者的任務列表和相關資訊。Docs顯示的樣式為行動裝置版，桌面版見Canvas。",
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
        <div id="modal-root"></div>
        <div id="cmodal-root"></div>
        <Story />
      </MemoryRouter>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof TaskIndex>;

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
      });
      const mockCalendars: Calendar[] = [
        {
          _id: "calendar-id-123",
          title: "Work",
          owner: "mock-id-123",
          tasks: [],
        },
        {
          _id: "calendar-id-124",
          title: "Personal",
          owner: "mock-id-123",
          tasks: [],
        },
      ];
      const mockTasks: Task[] = [
        {
          _id: "task-id-123",
          owner: "mock-id-123",
          title: "Sample Task",
          calendar: "calendar-id-123",
          priority: "high",
          progress: "in progress",
          date: "2026-02-25T10:00:00.000Z",
          cycle: false,
          cycleInterval: 0,
          location: "Office",
          notes: "This is a sample task.",
          archived: false,
        },
        {
          _id: "task-id-124",
          owner: "mock-id-123",
          title: "Sample Task 2",
          calendar: "calendar-id-123",
          priority: "medium",
          progress: "not started",
          date: "2026-02-26T10:00:00.000Z",
          cycle: true,
          cycleInterval: 3,
          location: "Home",
          notes: "This is a sample task.",
          archived: false,
        },
        {
          _id: "task-id-125",
          owner: "mock-id-123",
          title: "Sample Task 3",
          calendar: "calendar-id-124",
          priority: "low",
          progress: "completed",
          date: "2026-02-23T10:00:00.000Z",
          cycle: false,
          cycleInterval: 0,
          location: "Home",
          notes: "This is a sample task.",
          archived: false,
        },
        {
          _id: "task-id-126",
          owner: "mock-id-123",
          title: "Sample Task 4",
          calendar: "calendar-id-123",
          priority: "low",
          progress: "completed",
          date: "2026-02-20T10:00:00.000Z",
          cycle: false,
          cycleInterval: 0,
          location: "Home",
          notes: "This is a sample task.",
          archived: true,
        },
      ];
      useTaskStore.setState({
        calendars: mockCalendars,
        tasks: mockTasks,
        fetchCalendarData: async () => {
          return {
            message: "Calendar data fetched successfully.",
            calendars: mockCalendars,
          };
        },
        addCalendar: async (title: string) => {
          const newCalendar: Calendar = {
            _id: `calendar-id-${Date.now()}`,
            title,
            owner:
              useAuthStore.getState().currentUser?.user._id || "mock-id-123",
            tasks: [],
          };
          useTaskStore.setState((state) => ({
            calendars: [...state.calendars, newCalendar],
          }));
          return {
            message: "Calendar added successfully.",
            savedCalendar: newCalendar,
          };
        },
        editCalendar: async (id: string, title: string) => {
          useTaskStore.setState((state) => ({
            calendars: state.calendars.map((c) =>
              c._id === id ? { ...c, title } : c,
            ),
          }));
          return {
            message: "Calendar edited successfully.",
            updatedCalendar: {
              _id: id,
              title,
              owner:
                useAuthStore.getState().currentUser?.user._id || "mock-id-123",
              tasks: [],
            },
          };
        },
        deleteCalendar: async (id: string) => {
          useTaskStore.setState((state) => ({
            calendars: state.calendars.filter((c) => c._id !== id),
            tasks: state.tasks.filter((t) => t.calendar !== id),
          }));
          return {
            message: "Calendar deleted successfully.",
          };
        },
        fetchTasks: async () => {
          return {
            message: "Tasks fetched successfully.",
            tasks: mockTasks,
          };
        },
        addTask: async (data) => {
          const newTask: Task = {
            ...data,
            _id: `mock-task-${Date.now()}`,
            owner: "mock-id-123",
            archived: false,
          };
          useTaskStore.setState((state) => ({
            tasks: [...state.tasks, newTask],
          }));
          return {
            message: "Task added successfully!",
            savedTask: newTask,
          };
        },
        editTask: async (data) => {
          let updatedTask: Task | null = null;
          useTaskStore.setState((state) => {
            const existingTask = state.tasks.find((t) => t._id === data._id);
            updatedTask = { ...existingTask, ...data } as Task;
            return {
              tasks: state.tasks.map((t) =>
                t._id === data._id ? updatedTask! : t,
              ),
            };
          });
          return {
            message: "Task updated successfully!",
            updatedTask: updatedTask!,
          };
        },
        archiveTask: async (_id) => {
          let updatedTask: Task | null = null;
          useTaskStore.setState((state) => {
            const existingTask = state.tasks.find((t) => t._id === _id);
            updatedTask = { ...existingTask, archived: true } as Task;
            return {
              tasks: state.tasks.map((t) => (t._id === _id ? updatedTask! : t)),
            };
          });
          return {
            message: "Task archived successfully!",
            updatedTask: updatedTask!,
          };
        },
        deleteTask: async (_id) => {
          useTaskStore.setState((state) => ({
            tasks: state.tasks.filter((t) => t._id !== _id),
          }));
          return {
            message: "Task deleted successfully!",
          };
        },
      });

      return <Story />;
    },
  ],
};
