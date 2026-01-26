import React from "react";
import type { Task } from "../../types";
import { useDraggable } from "@dnd-kit/core";
import type { Priority } from "../../types";
import { format } from "date-fns";
const PRIORITY_STYLES: Record<Priority, string> = {
  high: "text-red-600",
  medium: "text-yellow-400",
  low: "text-green-600",
};
const ProgressColCard: React.FC<
  { task: Task } & { onClick: (task: Task) => void }
> = ({ task, onClick }) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: task._id,
  });
  const style = { opacity: isDragging ? 0.2 : 1 };
  const priorityKey = (task.priority?.toLowerCase() || "low") as Priority;
  const priorityStyle =
    PRIORITY_STYLES[priorityKey] || "border-teal-400 text-white";
  return (
    <div
      ref={setNodeRef}
      className="group cursor-grab rounded-lg bg-neutral-950 p-4 shadow-sm hover:shadow-md border border-transparent hover:bg-neutral-900 hover:border-teal-400 transition-all duration-200"
      style={style}
    >
      <div
        {...listeners}
        {...attributes}
        onClick={(e) => {
          e.stopPropagation();
          onClick(task);
        }}
      >
        <h3
          className={`font-semibold text-lg border-b-2 border-teal-600 group-hover:text-teal-400 group-hover:border-teal-400 transition-all duration-200 ${priorityStyle} pb-2 mb-2`}
        >
          {task.title}
        </h3>
        <div className="flex justify-between items-center text-[10px] text-neutral-500 font-mono group-hover:text-white transition-all duration-200">
          <span>
            {task.date
              ? format(new Date(task.date), "yyyy-MM-dd HH:mm")
              : "No Date"}
          </span>
          <span className="uppercase px-1 border border-neutral-700 rounded">
            {priorityKey}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProgressColCard;
