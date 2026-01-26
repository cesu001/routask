import { create } from "zustand";
import AuthService from "./services/auth.service";
import ProfileService from "./services/profile.service";
import TaskService from "./services/task.service";
import {
  type Calendar,
  type SortOrder,
  type TaskStore,
  type AddTaskProps,
} from "../types";

type UserProps = {
  _id: string;
  email: string;
  fName: string;
  lName: string;
};

type fetchUserProps = {
  message: string;
  user: {
    fName: string;
    lName: string;
  };
};

type UpdateUserProps = {
  _id: string;
  fName: string;
  lName: string;
};

type ChangePasswordProps = {
  _id: string;
  oldPassword: string;
  newPassword: string;
};

type CurrentUserProps = {
  message: string;
  token: string;
  user: UserProps;
};

type ResetPasswordProps = {
  message: string;
};

type FetchResetPwdProps = { _id: string; token: string };

type ResFetchResetPwdProps = {
  message: string;
  email: string;
};
type ResetPwdProps = { newPassword: string } & FetchResetPwdProps;

type AuthStore = {
  currentUser: CurrentUserProps | null;
  successMessage: string | null;
  setSuccessMessage: (message: string | null) => void;
  errorMessage: string | null;
  setErrorMessage: (message: string | null) => void;
  register: (data: RegisterData) => Promise<void>;
  login: (data: LoginData) => Promise<void>;
  logout: () => void;
  fetchUserData: (_id: string) => Promise<fetchUserProps>;
  updateUserData: ({
    _id,
    fName,
    lName,
  }: UpdateUserProps) => Promise<fetchUserProps>;
  changePassword: ({
    _id,
    oldPassword,
    newPassword,
  }: ChangePasswordProps) => Promise<fetchUserProps>;
  forgotPassword: (email: string) => Promise<ResetPasswordProps>;
  fetchResetPwd: ({
    _id,
    token,
  }: FetchResetPwdProps) => Promise<ResFetchResetPwdProps>;
  resetPassword: ({
    _id,
    token,
    newPassword,
  }: ResetPwdProps) => Promise<ResetPasswordProps>;
};

type RegisterData = {
  fName: string;
  lName: string;
  email: string;
  password: string;
};

type LoginData = {
  email: string;
  password: string;
};
export const useAuthStore = create<AuthStore>((set) => ({
  currentUser: null,
  successMessage: null,
  setSuccessMessage: (message) => {
    set({ successMessage: message });
  },
  errorMessage: null,
  setErrorMessage: (message) => {
    set({ errorMessage: message });
  },
  register: async ({ fName, lName, email, password }: RegisterData) => {
    try {
      await AuthService.register({
        fName,
        lName,
        email,
        password,
      });
      set({ errorMessage: null });
      set({ successMessage: "Registration successful! Please log in." });
    } catch (err: any) {
      set({ errorMessage: err.response.data });
      throw err;
    }
  },
  login: async ({ email, password }: LoginData) => {
    try {
      let response = await AuthService.login({ email, password });
      // console.log(response);
      localStorage.setItem("user", JSON.stringify(response.data));
      set({ currentUser: AuthService.getCurrentUser() });
      set({ errorMessage: null });
    } catch (err: any) {
      set({ errorMessage: err.response.data });
      throw err;
    }
  },
  logout: () => {
    try {
      AuthService.logout();
      set({ currentUser: null });
    } catch (err: any) {
      set({ errorMessage: err.response.data });
      throw err;
    }
  },
  fetchUserData: async (_id: string) => {
    try {
      let response = await ProfileService.fetchUserData(_id);
      return response.data;
    } catch (err: any) {
      set({ errorMessage: err.response.data });
      throw err;
    }
  },
  updateUserData: async ({ _id, fName, lName }: UpdateUserProps) => {
    try {
      let response = await ProfileService.updateUserData({ _id, fName, lName });
      return response.data;
    } catch (err: any) {
      set({ errorMessage: err.response.data });
      throw err;
    }
  },
  changePassword: async ({
    _id,
    oldPassword,
    newPassword,
  }: ChangePasswordProps) => {
    try {
      let response = await ProfileService.changePassword({
        _id,
        oldPassword,
        newPassword,
      });
      return response.data;
    } catch (err: any) {
      set({ errorMessage: err.response.data });
      throw err;
    }
  },
  forgotPassword: async (email: string) => {
    try {
      let response = await AuthService.forgotPassword(email);
      return response.data;
    } catch (err: any) {
      set({ errorMessage: err.response.data });
      throw err;
    }
  },
  fetchResetPwd: async ({ _id, token }: FetchResetPwdProps) => {
    try {
      let response = await AuthService.fetchResetPwd({ _id, token });
      return response.data;
    } catch (err: any) {
      set({ errorMessage: err.response.data });
      throw err;
    }
  },
  resetPassword: async ({ _id, token, newPassword }: ResetPwdProps) => {
    try {
      let response = await AuthService.resetPassword({
        _id,
        token,
        newPassword,
      });
      return response.data;
    } catch (err: any) {
      set({ errorMessage: err.response.data });
      throw err;
    }
  },
}));

export const useTaskStore = create<TaskStore>((set) => ({
  successMsg: null,
  errorTaskMsg: null,
  calendars: [],
  calendarSortOrder: "none",
  selectedCalendarIDs: [],
  selectCalendar: (calendarID) =>
    set((state) => ({
      selectedCalendarIDs: state.selectedCalendarIDs.includes(calendarID)
        ? state.selectedCalendarIDs.filter((id) => id !== calendarID)
        : [...state.selectedCalendarIDs, calendarID],
    })),
  selectedProgress: [],
  selectProgress: (progress) =>
    set((state) => ({
      selectedProgress: state.selectedProgress.includes(progress)
        ? state.selectedProgress.filter((p) => p !== progress)
        : [...state.selectedProgress, progress],
    })),
  selectedPriority: [],
  selectPriority: (priority) =>
    set((state) => ({
      selectedPriority: state.selectedPriority.includes(priority)
        ? state.selectedPriority.filter((p) => p !== priority)
        : [...state.selectedPriority, priority],
    })),
  showArchived: false,
  setShowArchived: (val) => {
    set({ showArchived: val });
  },
  tasks: [],
  editingTask: null,
  setEditingTask: (task) => {
    set({ editingTask: task });
  },
  setCalendars: (calendars: Calendar[]) => {
    set({ calendars });
  },
  toggleCalendarSortOrder: () => {
    set((state) => {
      let newOrder: SortOrder;
      if (state.calendarSortOrder === "none") {
        newOrder = "asc";
      } else if (state.calendarSortOrder === "asc") {
        newOrder = "desc";
      } else {
        newOrder = "asc";
      }
      return { calendarSortOrder: newOrder };
    });
  },
  setSuccessMsg: (message: string | null) => {
    set({ successMsg: message });
  },
  setErrorTaskMsg: (message: string | null) => {
    set({ errorTaskMsg: message });
  },
  fetchCalendarData: async (_id: string) => {
    try {
      let response = await TaskService.fetchCalendarData(_id);
      if (response.data.calendars) {
        set({ calendars: response.data.calendars });
      } else {
        set({ calendars: [] });
      }
      return response.data;
    } catch (err: any) {
      set({ errorTaskMsg: err.response.data });
      throw err;
    }
  },
  addCalendar: async (title: string) => {
    try {
      let response = await TaskService.addCalendar(title);
      const newCalendar = response.data.savedCalendar;
      set((state) => ({ calendars: [...state.calendars, newCalendar] }));
      return response.data;
    } catch (err: any) {
      set({ errorTaskMsg: err.response.data });
      throw err;
    }
  },
  editCalendar: async (_id: string, editCTitle: string) => {
    try {
      let response = await TaskService.editCalendar(_id, editCTitle);
      set((state) => ({
        calendars: state.calendars.map((c) =>
          c._id === _id ? { ...c, title: editCTitle } : c,
        ),
      }));
      return response.data;
    } catch (err: any) {
      set({ errorTaskMsg: err.response.data });
      throw err;
    }
  },
  deleteCalendar: async (_id: string) => {
    try {
      let response = await TaskService.deleteCalendar(_id);
      set((state) => ({
        calendars: state.calendars.filter((c) => c._id !== _id),
        tasks: state.tasks.filter((t) => t.calendar !== _id),
      }));
      return response.data;
    } catch (err: any) {
      set({ errorTaskMsg: err.response.data });
      throw err;
    }
  },
  // tasks related functions
  fetchTasks: async () => {
    try {
      let response = await TaskService.fetchTasks();
      if (response.data.tasks) {
        set({ tasks: response.data.tasks });
      } else {
        set({ tasks: [] });
      }
      return response.data;
    } catch (err: any) {
      set({ errorTaskMsg: err.response.data });
      throw err;
    }
  },
  addTask: async ({
    title,
    calendar,
    priority,
    progress,
    date,
    cycle,
    cycleInterval,
    location,
    notes,
  }: AddTaskProps) => {
    try {
      let response = await TaskService.addTask({
        title,
        calendar,
        priority,
        progress,
        date,
        cycle,
        cycleInterval,
        location,
        notes,
      });
      const newTask = response.data.savedTask;
      set((state) => ({ tasks: [...state.tasks, newTask] }));
      return response.data;
    } catch (err: any) {
      set({ errorTaskMsg: err.response.data });
      throw err;
    }
  },
  editTask: async ({
    _id,
    title,
    calendar,
    priority,
    progress,
    date,
    cycle,
    cycleInterval,
    location,
    notes,
  }: AddTaskProps & { _id: string }) => {
    try {
      let response = await TaskService.editTask({
        _id,
        title,
        calendar,
        priority,
        progress,
        date,
        cycle,
        cycleInterval,
        location,
        notes,
      });
      const updatedTask = response.data.updatedTask;
      set((state) => ({
        tasks: state.tasks.map((t) => (t._id === _id ? updatedTask : t)),
      }));
      return response.data;
    } catch (err: any) {
      set({ errorTaskMsg: err.response.data });
      throw err;
    }
  },
  archiveTask: async (_id: string) => {
    try {
      let response = await TaskService.archiveTask(_id);
      const updatedTask = response.data.updatedTask;
      set((state) => ({
        tasks: state.tasks.map((t) => (t._id === _id ? updatedTask : t)),
      }));
      return response.data;
    } catch (err: any) {
      set({ errorTaskMsg: err.response.data });
      throw err;
    }
  },
  deleteTask: async (_id: string) => {
    try {
      let response = await TaskService.deleteTask(_id);
      set((state) => ({
        tasks: state.tasks.filter((t) => t._id !== _id),
      }));
      return response.data;
    } catch (err: any) {
      set({ errorTaskMsg: err.response.data });
      throw err;
    }
  },
}));
