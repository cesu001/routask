import { useState, useMemo } from "react";
import LogoutButton from "./LogoutButton";
import DigitalClock from "./DigitalClock";
import { useAuthStore, useTaskStore } from "../store";
import { FaPlus } from "react-icons/fa";
import TaskModal from "./TaskModal";
import TaskList from "./TaskList";
import EventCalendar from "./EventCalendar";
import Progress from "./Progress";

const TaskMain = () => {
  const currentUser = useAuthStore((state) => {
    return state.currentUser;
  });
  const tasks = useTaskStore((state) => {
    return state.tasks;
  });
  const editingTask = useTaskStore((state) => {
    return state.editingTask;
  });
  const setEditingTask = useTaskStore((state) => {
    return state.setEditingTask;
  });

  const [isTaskListOpen, setIsTaskListOpen] = useState(true);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isProgressOpen, setIsProgressOpen] = useState(false);
  const isModalOpen = editingTask !== null;
  const toggleModal = () => {
    setEditingTask(null);
  };
  const handleNewTask = () => {
    setEditingTask({
      _id: "new",
      owner: currentUser?.user._id || "",
      title: "",
      calendar: "",
      priority: "low",
      progress: "not started",
      date: "",
      cycle: false,
      cycleInterval: 0,
      location: "",
      notes: "",
      archived: false,
    });
  };
  const toggleTaskList = () => {
    setIsTaskListOpen(true);
    setIsCalendarOpen(false);
    setIsProgressOpen(false);
  };
  const toggleCalendar = () => {
    setIsCalendarOpen(true);
    setIsTaskListOpen(false);
    setIsProgressOpen(false);
  };
  const toggleProgress = () => {
    setIsProgressOpen(true);
    setIsTaskListOpen(false);
    setIsCalendarOpen(false);
  };
  const todayTaskCount = useMemo(() => {
    const today = new Date().toISOString().split("T")[0];
    return tasks.filter(
      (t) => t.date && t.date.startsWith(today) && t.archived !== true
    ).length;
  }, [tasks]);
  return (
    <div className="w-full h-screen flex flex-col">
      <TaskModal
        currentTask={editingTask}
        isModalOpen={isModalOpen}
        toggleModal={toggleModal}
      />
      <LogoutButton />
      <h1 className="text-5xl font-bold m-5 text-center lg:text-left">
        Hi, {currentUser?.user.fName} !
      </h1>
      <DigitalClock />
      <div className="mx-5 my-3 text-2xl font-semibold text-center sm:text-left">
        <span>You have {todayTaskCount} tasks today.</span>
      </div>
      <button
        onClick={handleNewTask}
        className="w-[156px] self-center lg:self-start mx-5 my-3 px-4 py-2 rounded-xl border-2 font-semibold text-xl hover:bg-teal-600 hover:text-white hover:cursor-pointer transition-colors duration-300"
      >
        <FaPlus className="inline mb-1 mr-2" />
        New Task
      </button>
      <section className="flex flex-1 flex-col min-h-0">
        <div className="flex justify-center sm:justify-start gap-10 m-2 text-xl font-medium text-black border-b-2 border-gray-400">
          <button
            onClick={toggleTaskList}
            className={`px-4 py-2 ${
              isTaskListOpen ? "border-b-3 border-teal-600" : "text-gray-600"
            }`}
          >
            Task List
          </button>
          <button
            onClick={toggleCalendar}
            className={`px-4 py-2 ${
              isCalendarOpen
                ? "border-b-3 border-teal-600 shadow-black"
                : "text-gray-600"
            }`}
          >
            Event Calendar
          </button>
          <button
            onClick={toggleProgress}
            className={`px-4 py-2 ${
              isProgressOpen ? "border-b-3 border-teal-600" : "text-gray-600"
            }`}
          >
            Progress
          </button>
        </div>
        <div className="flex-1 bg-neutral-700 overflow-y-auto">
          {isTaskListOpen && <TaskList />}
          {isCalendarOpen && <EventCalendar />}
          {isProgressOpen && <Progress />}
        </div>
      </section>
    </div>
  );
};

export default TaskMain;
