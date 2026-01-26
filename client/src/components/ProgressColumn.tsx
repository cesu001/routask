import React from "react";
import type { ProgressColumnProps } from "../../types";
import ProgressColCard from "./ProgressColCard";
import { useDroppable } from "@dnd-kit/core";

const ProgressColumn: React.FC<ProgressColumnProps> = ({
  column,
  tasks,
  onCardClick,
}) => {
  const { setNodeRef, isOver } = useDroppable({
    id: column.id,
  });
  return (
    <div
      className={`w-full lg:h-full lg:max-h-none min-h-[300px] max-h-[500px] p-4 flex flex-col rounded-lg transition-colors duration-300 ${
        isOver ? "bg-neutral-700 border-2 border-teal-600" : "bg-neutral-800"
      }`}
    >
      <h2 className="font-bold text-2xl text-white text-center mb-2 flex-shrink-0">
        {column.title}
      </h2>
      <div
        ref={setNodeRef}
        className="flex-1 overflow-y-auto space-y-2 p-2 custom-scrollbar"
      >
        {tasks.length > 0 ? (
          tasks.map((task) => {
            return (
              <ProgressColCard
                key={task._id}
                task={task}
                onClick={onCardClick}
              />
            );
          })
        ) : (
          <div className="h-20 border-2 border-dashed border-neutral-700 rounded-lg flex items-center justify-center text-neutral-600">
            Drop tasks here
          </div>
        )}
      </div>
    </div>
  );
};

export default ProgressColumn;
