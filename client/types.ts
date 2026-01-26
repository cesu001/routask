export type Calendar = {
  _id: string;
  title: string;
  owner: string;
  tasks: string[];
};

export type FetchCalendarProps = {
  message: string;
  calendars: Calendar[];
};

export type AddCalendarRes = {
  message: string;
  savedCalendar: Calendar;
};
export type EditCalendarRes = {
  message: string;
  updatedCalendar: Calendar;
};

export type DeleteCalendarRes = {
  message: string;
};

export type SortOrder = "none" | "asc" | "desc";

export type TaskModalProps = {
  isModalOpen: boolean;
  toggleModal: () => void;
  currentTask: Task | null;
};

export type Task = {
  _id: string;
  owner: string;
  title: string;
  calendar: string;
  priority: Priority;
  progress: Progress;
  date: string;
  cycle: boolean;
  cycleInterval: number;
  location: string;
  notes: string;
  archived: boolean;
};
export type Priority = "low" | "medium" | "high";
export type Progress = "not started" | "in progress" | "completed";
export type AddTaskProps = {
  title: string;
  calendar: string;
  priority: "low" | "medium" | "high";
  progress: "not started" | "in progress" | "completed";
  date: string;
  cycle: boolean;
  cycleInterval: number;
  location: string;
  notes: string;
};
export type FetchTaskProps = {
  message: string;
  tasks: Task[];
};
export type AddTaskRes = {
  message: string;
  savedTask: Task;
};
export type EditTaskRes = {
  message: string;
  updatedTask: Task;
};
export type DeleteTaskRes = {
  message: string;
};
export type TaskCardProps = {
  task: Task;
  calendarTitle: string;
  onClick: (task: Task) => void;
};
export type EventCalendarDayProps = {
  day: Date;
  isCurrentMonth: boolean;
  isTodayDate: boolean;
  dayTasks: Task[];
  onClick: () => void;
};

export type EventCalendarModalProps = {
  dayOpen: Date | null;
  isCModalOpen: boolean;
  toggleCModal: () => void;
};

export type ColumnProps = {
  id: string;
  title: string;
};

export type ProgressColumnProps = {
  column: ColumnProps;
  tasks: Task[];
  onCardClick: (task: Task) => void;
};

export type TaskStore = {
  successMsg: string | null;
  errorTaskMsg: string | null;
  calendars: Calendar[];
  calendarSortOrder: SortOrder;
  selectedCalendarIDs: string[];
  selectCalendar: (calendarId: string) => void;
  selectedProgress: string[];
  selectProgress: (progress: string) => void;
  selectedPriority: string[];
  selectPriority: (priority: string) => void;
  showArchived: boolean;
  setShowArchived: (val: boolean) => void;
  tasks: Task[];
  editingTask: Task | null;
  setEditingTask: (task: Task | null) => void;
  setCalendars: (calendars: Calendar[]) => void;
  toggleCalendarSortOrder: () => void;
  setSuccessMsg: (message: string | null) => void;
  setErrorTaskMsg: (message: string | null) => void;
  fetchCalendarData: (_id: string) => Promise<FetchCalendarProps>;
  addCalendar: (title: string) => Promise<AddCalendarRes>;
  editCalendar: (_id: string, editCTitle: string) => Promise<EditCalendarRes>;
  deleteCalendar: (_id: string) => Promise<DeleteCalendarRes>;
  fetchTasks: () => Promise<FetchTaskProps>;
  addTask: ({
    title,
    calendar,
    priority,
    progress,
    date,
    cycle,
    cycleInterval,
    location,
    notes,
  }: AddTaskProps) => Promise<AddTaskRes>;
  editTask: ({
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
  }: AddTaskProps & { _id: string }) => Promise<EditTaskRes>;
  archiveTask: (_id: string) => Promise<EditTaskRes>;
  deleteTask: (_id: string) => Promise<DeleteTaskRes>;
};
