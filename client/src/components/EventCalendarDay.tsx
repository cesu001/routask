import React from "react";
import { format } from "date-fns";
import { BsThreeDots } from "react-icons/bs";
import { type Priority, type EventCalendarDayProps } from "../../types";
const PRIORITY_STYLES: Record<Priority, string> = {
  high: "border-red-600 text-red-600",
  medium: "border-yellow-400 text-yellow-400",
  low: "border-green-600 text-green-600",
};
const EventCalendarDay: React.FC<EventCalendarDayProps> = ({
  day,
  isCurrentMonth,
  isTodayDate,
  dayTasks,
  onClick,
}) => {
  const dayTasksLength = dayTasks.length;
  return (
    <div
      onClick={onClick}
      className={`flex flex-col gap-1 rounded-md border text-center min-h-0 shadow-lg cursor-pointer hover:scale-105 transition-all duration-200 ease-in-out
            ${
              isTodayDate
                ? "bg-blue-300/80 border-teal-600 text-neutral-900"
                : isCurrentMonth
                ? "bg-neutral-800 border-teal-600 text-white hover:bg-teal-400"
                : "bg-neutral-800/50 border-neutral-600/80 text-neutral-500"
            }
            `}
    >
      <span>{format(day, "d")}</span>
      <div className="overflow-hidden flex flex-col gap-1 flex-1">
        {dayTasks.slice(0, 2).map((task) => {
          const priorityKey = (task.priority?.toLowerCase() ||
            "low") as Priority;
          const priorityStyle =
            PRIORITY_STYLES[priorityKey] || "border-teal-400 text-white";
          return (
            <div
              key={task._id}
              className={`text-[10px] leading-tight bg-neutral-700/50 rounded px-1 py-0.5 truncate text-left border-l-2 ${priorityStyle}`}
            >
              {task.title}
            </div>
          );
        })}
      </div>
      {dayTasksLength > 2 && (
        <div className="w-full rounded-b-md flex justify-center mt-auto bg-neutral-800/50">
          <BsThreeDots size={12} />
        </div>
      )}
    </div>
  );
};

export default React.memo(EventCalendarDay);
