import React, { useEffect, useState } from "react";
import { ImCross } from "react-icons/im";
import ReactDOM from "react-dom";
import { type TaskModalProps, type Priority, type Progress } from "../../types";
import { useTaskStore } from "../store";
import { useBodyScrollLock } from "../hooks/useBodyScrollLock";

const ANIMATION_DURATION = 500;
const UNMOUNT_DELAY = ANIMATION_DURATION + 50;

const TaskModal: React.FC<TaskModalProps> = ({
  currentTask,
  isModalOpen,
  toggleModal,
}) => {
  const setSuccessMsg = useTaskStore((state) => state.setSuccessMsg);
  const setErrorTaskMsg = useTaskStore((state) => state.setErrorTaskMsg);
  const calendars = useTaskStore((state) => state.calendars);
  const addTask = useTaskStore((state) => state.addTask);
  const editTask = useTaskStore((state) => state.editTask);
  const archiveTask = useTaskStore((state) => state.archiveTask);
  const deleteTask = useTaskStore((state) => state.deleteTask);
  const isNewTask = currentTask?._id === "new" || currentTask === null;
  const modalTitle = isNewTask ? "New Task" : "Edit Task";
  const [formTitle, setFormTitle] = useState(currentTask?.title || "");
  const [formCalendar, setFormCalendar] = useState(currentTask?.calendar || "");
  const [formPriority, setFormPriority] = useState<Priority>(
    currentTask?.priority || "low"
  );
  const [formProgress, setFormProgress] = useState<Progress>(
    currentTask?.progress || "not started"
  );
  // (e.g., '2025-12-06T13:22:19.000Z')
  const initialDate = currentTask?.date ? new Date(currentTask.date) : null;
  // (e.g., '2025-12-06')
  const initialDateStr = initialDate
    ? initialDate.toISOString().split("T")[0]
    : "";
  // (e.g., '13:22')
  const initialTimeStr = initialDate
    ? initialDate.toTimeString().split(" ")[0].substring(0, 5)
    : "";
  const [formDateStr, setFormDateStr] = useState(initialDateStr);
  const [formTimeStr, setFormTimeStr] = useState(initialTimeStr);
  const [formCycle, setFormCycle] = useState(currentTask?.cycle || false);
  const [formCycleInterval, setFormCycleInterval] = useState(
    currentTask?.cycleInterval || 0
  );
  const [formLocation, setFormLocation] = useState(currentTask?.location || "");
  const [formNotes, setFormNotes] = useState(currentTask?.notes || "");
  const handleSave = async () => {
    if (!formTitle) {
      setErrorTaskMsg("Title is required.");
      return;
    } else if (!formCalendar) {
      setErrorTaskMsg("Calendar is required.");
      return;
    } else if (!formDateStr || !formTimeStr) {
      setErrorTaskMsg("Date and Time are required.");
      return;
    }
    const localDateTime = new Date(`${formDateStr}T${formTimeStr}`);
    const taskData = {
      title: formTitle,
      calendar: formCalendar,
      priority: formPriority,
      progress: formProgress,
      date: localDateTime.toISOString(),
      cycle: formCycle,
      cycleInterval: formCycleInterval,
      location: formLocation,
      notes: formNotes,
    };
    try {
      if (isNewTask) {
        let response = await addTask(taskData);
        setSuccessMsg(response.message);
        toggleModal();
        setTimeout(() => {
          setSuccessMsg(null);
        }, 3000);
      } else {
        if (!currentTask?._id) {
          console.log("Missing task ID for update");
          return;
        }
        let response = await editTask({
          ...taskData,
          _id: currentTask!._id,
        });
        setSuccessMsg(response.message);
        toggleModal();
        setTimeout(() => {
          setSuccessMsg(null);
        }, 3000);
      }
    } catch (e) {
      console.log(e);
      setTimeout(() => {
        setErrorTaskMsg(null);
      }, 3000);
    }
  };
  const handleDone = async () => {
    if (isNewTask || !currentTask?._id) return;
    try {
      if (!formCycle) {
        let response = await archiveTask(currentTask._id);
        setSuccessMsg(response.message);
        toggleModal();
        setTimeout(() => {
          setSuccessMsg(null);
        }, 3000);
      } else {
        const baseDate = currentTask.date
          ? new Date(currentTask.date)
          : new Date();
        const nextOccurrence = new Date(baseDate);
        nextOccurrence.setDate(
          nextOccurrence.getDate() + (formCycleInterval || 1)
        );
        const updatedData = {
          title: formTitle,
          calendar: formCalendar,
          priority: formPriority,
          progress: formProgress,
          date: nextOccurrence.toISOString(),
          cycle: formCycle,
          cycleInterval: formCycleInterval,
          location: formLocation,
          notes: formNotes,
        };
        let response = await editTask({
          ...updatedData,
          _id: currentTask._id,
        });
        setSuccessMsg(response.message);
        toggleModal();
        setTimeout(() => {
          setSuccessMsg(null);
        }, 3000);
      }
    } catch (e) {
      console.log(e);
    }
  };
  const handleDelete = async () => {
    if (isNewTask) return;
    try {
      let response = await deleteTask(currentTask!._id);
      setSuccessMsg(response.message);
      toggleModal();
    } catch (e) {
      console.log(e);
    }
    setTimeout(() => {
      setSuccessMsg(null);
    }, 3000);
  };
  useEffect(() => {
    if (currentTask && currentTask.date) {
      const taskDate = new Date(currentTask.date);
      const yyyy = taskDate.getFullYear();
      const mm = String(taskDate.getMonth() + 1).padStart(2, "0");
      const dd = String(taskDate.getDate()).padStart(2, "0");
      const localDate = `${yyyy}-${mm}-${dd}`;
      const hh = String(taskDate.getHours()).padStart(2, "0");
      const min = String(taskDate.getMinutes()).padStart(2, "0");
      const localTime = `${hh}:${min}`;
      setFormTitle(currentTask?.title || "");
      setFormCalendar(currentTask?.calendar || "");
      setFormPriority(currentTask?.priority || "");
      setFormProgress(currentTask?.progress || "");
      setFormDateStr(localDate);
      setFormTimeStr(localTime);
      setFormCycle(currentTask?.cycle || false);
      setFormCycleInterval(currentTask?.cycleInterval || 0);
      setFormLocation(currentTask?.location || "");
      setFormNotes(currentTask?.notes || "");
    } else {
      setFormTitle("");
      setFormCalendar("");
      setFormPriority("low");
      setFormProgress("not started");
      setFormDateStr("");
      setFormTimeStr("");
      setFormCycle(false);
      setFormCycleInterval(0);
      setFormLocation("");
      setFormNotes("");
    }
  }, [currentTask]);
  useBodyScrollLock(isModalOpen);
  // Animation and mounting logic
  const [shouldRender, setShouldRender] = useState(isModalOpen);
  const [isFullyOpen, setIsFullyOpen] = useState(isModalOpen);
  useEffect(() => {
    let timeout: NodeJS.Timeout | undefined;
    if (isModalOpen) {
      setShouldRender(true);
      setTimeout(() => setIsFullyOpen(true), 50);
    } else {
      setIsFullyOpen(false);
      timeout = setTimeout(() => setShouldRender(false), UNMOUNT_DELAY);
    }
    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [isModalOpen]);
  if (!shouldRender) {
    return null;
  }
  const modalRoot = document.getElementById("modal-root");
  if (!modalRoot) return null;
  return ReactDOM.createPortal(
    <>
      <div
        className={`fixed inset-0  z-45 transition-opacity duration-500
        ${isFullyOpen ? "opacity-100 bg-black/50" : "opacity-0"}
        `}
        onClick={toggleModal}
      />
      <div
        className={`fixed z-50 top-0 right-0 w-full lg:w-1/3 h-full bg-neutral-900 shadow-2xl
        transform transition-transform duration-500 ease-in-out transform-gpu 
        ${isFullyOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="p-6 text-white h-full flex flex-col">
          <div className="flex justify-between items-center border-b pb-4 mb-6 border-teal-600">
            <h2 className="text-3xl font-bold text-teal-400">{modalTitle}</h2>
            <button
              onClick={toggleModal}
              className="text-white hover:text-red-500 transition-colors"
            >
              <ImCross size={20} />
            </button>
          </div>
          <div className="flex-grow space-y-4 overflow-y-auto pr-2 custom-scrollbar">
            {/* title */}
            <div className="border-2 rounded-xl px-4 py-2">
              <label className="text-xs text-gray-400 block">Title</label>
              <input
                value={formTitle}
                onChange={(e) => setFormTitle(e.target.value)}
                type="text"
                placeholder="Task Name"
                className="bg-transparent outline-none w-full text-lg"
                name="title"
              />
            </div>
            {/* calendar */}
            <div className="border-2 rounded-xl px-4 py-2">
              <label className="text-xs text-gray-400 block">Calendar</label>
              <select
                value={formCalendar}
                onChange={(e) => setFormCalendar(e.target.value)}
                className="bg-transparent outline-none w-full text-lg"
              >
                {!formCalendar && (
                  <option value="" disabled>
                    Select Calendar
                  </option>
                )}
                {calendars.map((calendar) => (
                  <option key={calendar._id} value={calendar._id}>
                    {calendar.title}
                  </option>
                ))}
              </select>
            </div>
            {/* date & time */}
            <div className="flex gap-4">
              <div className="flex-1 border-2 rounded-xl px-4 py-2">
                <label className="text-xs text-gray-400 block">Date</label>
                <input
                  value={formDateStr}
                  onChange={(e) => setFormDateStr(e.target.value)}
                  type="date"
                  className="bg-transparent outline-none w-full text-lg"
                />
              </div>
              <div className="flex-1 border-2 rounded-xl px-4 py-2">
                <label className="text-xs text-gray-400 block">Time</label>
                <input
                  value={formTimeStr}
                  onChange={(e) => setFormTimeStr(e.target.value)}
                  type="time"
                  className="bg-transparent outline-none w-full text-lg"
                />
              </div>
            </div>
            {/* priority & progress */}
            <div className="flex gap-4">
              <div className="flex-1 border-2 rounded-xl px-4 py-2">
                <label className="text-xs text-gray-400 block">Priority</label>
                <select
                  value={formPriority}
                  onChange={(e) => setFormPriority(e.target.value as Priority)}
                  className="bg-transparent outline-none w-full text-lg"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              <div className="flex-1 border-2 rounded-xl px-4 py-2">
                <label className="text-xs text-gray-400 block">Progress</label>
                <select
                  value={formProgress}
                  onChange={(e) => setFormProgress(e.target.value as Progress)}
                  className="bg-transparent outline-none w-full text-lg"
                >
                  <option value="not started">Not Started</option>
                  <option value="in progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </div>
            {/* cycle */}
            <div className="flex items-center gap-4 border-2 rounded-xl px-4 py-2">
              <label htmlFor="cycle-toggle" className="flex-1 text-lg">
                Repeat Task?
              </label>
              <input
                id="cycle-toggle"
                type="checkbox"
                checked={formCycle}
                onChange={(e) => setFormCycle(e.target.checked)}
                className="h-5 w-5 text-teal-600 rounded"
              />
            </div>
            {formCycle && (
              <div className="border-2 rounded-xl px-4 py-2">
                <label className="text-xs text-gray-400 block">
                  Repeat Every (Days)
                </label>
                <input
                  value={formCycleInterval}
                  onChange={(e) =>
                    setFormCycleInterval(parseInt(e.target.value) || 0)
                  }
                  type="number"
                  min="1"
                  placeholder="e.g., 7 days"
                  className="bg-transparent outline-none w-full text-lg"
                />
              </div>
            )}
            {/* location */}
            <div className="border-2 rounded-xl px-4 py-2">
              <label className="text-xs text-gray-400 block">Location</label>
              <input
                value={formLocation}
                onChange={(e) => setFormLocation(e.target.value)}
                type="text"
                placeholder="e.g., Office, Home"
                className="bg-transparent outline-none w-full text-lg"
              />
            </div>
            {/* notes */}
            <div className="border-2 rounded-xl px-4 py-2 h-40">
              <label className="text-xs text-gray-400 block">Notes</label>
              <textarea
                value={formNotes}
                onChange={(e) => setFormNotes(e.target.value)}
                placeholder="Add details or context..."
                className="bg-transparent outline-none w-full h-full resize-none text-lg"
              />
            </div>
            {/* save btn */}
            <div className="mt-4 border-t pt-4 border-teal-600">
              <button
                onClick={handleSave}
                className="w-full px-6 py-3 bg-teal-600 rounded-xl text-white font-bold text-xl hover:bg-teal-700 transition-colors"
              >
                {modalTitle === "New Task" ? "Create Task" : "Save Changes"}
              </button>
            </div>
            {/* done & delete btn */}
            {isNewTask ? null : (
              <div className="mt-2 pt-1 flex justify-between gap-4">
                <button
                  onClick={handleDone}
                  className="flex-1 px-6 py-3 bg-blue-400 rounded-xl text-white font-bold text-xl hover:bg-blue-500 transition-colors"
                >
                  Done
                </button>
                <button
                  onClick={handleDelete}
                  className="flex-1 px-6 py-3 bg-red-400 rounded-xl text-white font-bold text-xl hover:bg-red-500 transition-colors"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>,
    modalRoot
  );
};

export default TaskModal;
