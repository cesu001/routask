import React from "react";
import type { TaskCardProps } from "../../types";

const TaskCard: React.FC<TaskCardProps> = ({
  task,
  calendarTitle,
  onClick,
}) => {
  const localDate = new Date(task.date);
  const year = localDate.getFullYear();
  const month = String(localDate.getMonth() + 1).padStart(2, "0");
  const day = String(localDate.getDate()).padStart(2, "0");
  const localDateStr = `${year}-${month}-${day}`;
  const hours = String(localDate.getHours()).padStart(2, "0");
  const minutes = String(localDate.getMinutes()).padStart(2, "0");
  const localTimeStr = `${hours}:${minutes}`;
  const priorityColorMap = {
    high: "text-red-500",
    medium: "text-yellow-500",
    low: "text-emerald-500",
  };
  const priorityColor =
    priorityColorMap[
      task.priority?.toLowerCase() as keyof typeof priorityColorMap
    ];
  return (
    <div
      onClick={() => onClick(task)}
      className="card-pop-in h-fit px-5 py-3 flex flex-col rounded-xl bg-neutral-900 shadow-lg border-2 border-neutral-500 cursor-pointer hover:border-teal-400 hover:scale-105 transition-all duration-200"
    >
      {/* title & calendar */}
      <div className="flex justify-between items-center text-xl font-medium text-teal-600 border-b-2 border-b-teal-600 mb-3 pb-2">
        <div>{task.title}</div>
        <div className="w-1/3 border-1 rounded-xl text-neutral-200 border-neutral-200 px-3 py-1 overflow-hidden">
          {calendarTitle}
        </div>
      </div>
      {/* date & time */}
      <div className="flex justify-between items-center text-neutral-200 border-neutral-200 gap-2 mb-2">
        <div className="w-1/2 border-1 rounded-xl px-3 py-1 overflow-hidden">
          <label className="font-light text-xs block">Date</label>
          <input
            type="date"
            value={localDateStr}
            disabled
            className="font-normal text-lg"
          />
        </div>
        <div className="w-1/2 border-1 rounded-xl px-3 py-1 overflow-hidden">
          <label className="font-light text-xs block">Time</label>
          <input
            type="time"
            value={localTimeStr}
            disabled
            className="font-normal text-lg"
          />
        </div>
      </div>
      {/* priority & progress */}
      <div className="flex justify-between items-center text-neutral-200 border-neutral-200 gap-2 mb-2">
        <div className="w-1/2 border-1 rounded-xl px-3 py-1 overflow-hidden">
          <label className="font-light text-xs block">Priority</label>
          <input
            type="text"
            value={task.priority}
            disabled
            className={`font-normal text-lg capitalize ${priorityColor}`}
          />
        </div>
        <div className="w-1/2 border-1 rounded-xl px-3 py-1 overflow-hidden">
          <label className="font-light text-xs block">Progress</label>
          <input
            type="text"
            value={task.progress}
            disabled
            className="font-normal text-lg capitalize"
          />
        </div>
      </div>
    </div>
  );
};

export default React.memo(TaskCard);
