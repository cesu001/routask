import React, { useEffect, useState, useCallback } from "react";
import ReactDOM from "react-dom";
import { format } from "date-fns";
import { type EventCalendarModalProps, type Task } from "../../types";
import { ImCross } from "react-icons/im";
import TaskCard from "./TaskCard";
import { useTaskStore } from "../store";
import { useBodyScrollLock } from "../hooks/useBodyScrollLock";

const ANIMATION_DURATION = 500;
const UNMOUNT_DELAY = ANIMATION_DURATION + 50;

const EventCalendarModal: React.FC<
  EventCalendarModalProps & { selectedTasks: Task[] }
> = ({ dayOpen, isCModalOpen, toggleCModal, selectedTasks }) => {
  const calendars = useTaskStore((state) => state.calendars);
  const setEditingTask = useTaskStore((state) => state.setEditingTask);
  const handleTaskClick = useCallback(
    (task: Task) => {
      setEditingTask(task);
    },
    [setEditingTask]
  );
  const modalDate = dayOpen ? format(dayOpen, "MMM do") : "No Date";
  const calendarMap = React.useMemo(() => {
    return new Map(calendars.map((calendar) => [calendar._id, calendar.title]));
  }, [calendars]);
  const [shouldRender, setShouldRender] = useState(isCModalOpen);
  const [isFullyOpen, setIsFullyOpen] = useState(isCModalOpen);
  useEffect(() => {
    let timeout: NodeJS.Timeout | undefined;
    if (isCModalOpen) {
      setShouldRender(true);
      setTimeout(() => {
        setIsFullyOpen(true);
      }, 50);
    } else {
      setIsFullyOpen(false);
      timeout = setTimeout(() => {
        setShouldRender(false);
      }, UNMOUNT_DELAY);
    }
    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [isCModalOpen]);
  useBodyScrollLock(isCModalOpen);
  if (!shouldRender) {
    return null;
  }
  const cmodal = document.getElementById("cmodal-root");
  if (!cmodal) return null;
  return ReactDOM.createPortal(
    <div
      className={`z-40 fixed top-0 right-0 w-full lg:w-1/3 h-screen bg-neutral-900 shadow-2xl transform transition-transform duration-500 ease-in-out transform-gpu ${
        isFullyOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="p-6 text-white h-full flex flex-col">
        <div className="flex justify-between items-center border-b pb-4 mb-6 border-teal-600">
          <h2 className="text-3xl font-bold text-teal-400">{modalDate}</h2>
          <button
            onClick={toggleCModal}
            className="text-white hover:text-red-500 transition-colors"
          >
            <ImCross size={20} />
          </button>
        </div>
        <div className="flex-grow space-y-4 overflow-y-auto overflow-x-hidden pr-2">
          {selectedTasks.length === 0 && (
            <div className="font-bold text-2xl ">No Task Found!</div>
          )}
          {selectedTasks.length > 0 &&
            selectedTasks.map((task) => {
              return (
                <TaskCard
                  key={task._id}
                  task={task}
                  calendarTitle={
                    calendarMap.get(task.calendar) || "No Calendar"
                  }
                  onClick={handleTaskClick}
                />
              );
            })}
        </div>
      </div>
    </div>,
    cmodal
  );
};

export default EventCalendarModal;
