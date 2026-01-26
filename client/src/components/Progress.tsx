import { useCallback, useMemo, useState } from "react";
import ProgressColumn from "./ProgressColumn";
import type { ColumnProps, Task } from "../../types";
import { useFilteredTasks } from "../hooks/useFilteredTasks";
import {
  DndContext,
  useSensors,
  useSensor,
  type DragEndEvent,
  PointerSensor,
  type DragStartEvent,
  rectIntersection,
  DragOverlay,
} from "@dnd-kit/core";
import { useTaskStore } from "../store";
import { FaSortAmountDown, FaSortAmountUp } from "react-icons/fa";

const COLUMNS: ColumnProps[] = [
  { id: "NOT_STARTED", title: "Not Started" },
  { id: "IN_PROGRESS", title: "In Progress" },
  { id: "COMPLETED", title: "Completed" },
];

const Progress = () => {
  const filteredTasks = useFilteredTasks("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const processedTasks = useMemo(() => {
    const sorted = [...filteredTasks].sort((a, b) => {
      const dateA = a.date || "";
      const dateB = b.date || "";
      return sortOrder === "asc"
        ? dateA.localeCompare(dateB)
        : dateB.localeCompare(dateA);
    });
    return sorted;
  }, [filteredTasks, sortOrder]);
  const setEditingTask = useTaskStore((state) => state.setEditingTask);
  const editTask = useTaskStore((state) => state.editTask);
  const setSuccessMsg = useTaskStore((state) => state.setSuccessMsg);
  const setErrorTaskMsg = useTaskStore((state) => state.setErrorTaskMsg);
  const handleProgressCardClick = useCallback(
    (task: Task) => {
      setEditingTask(task);
    },
    [setEditingTask]
  );
  const tasksByProgress = useMemo(() => {
    return processedTasks.reduce((acc: { [key: string]: Task[] }, task) => {
      if (task.progress) {
        const progressKey = task.progress;
        if (!acc[progressKey]) {
          acc[progressKey] = [];
        }
        acc[progressKey].push(task);
      }
      return acc;
    }, {});
  }, [processedTasks]);
  const [activeID, setActiveID] = useState<string | null>(null);
  const sensor = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    })
  );
  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    setActiveID(active.id as string);
  };
  const activeTask = useMemo(() => {
    return filteredTasks.find((t) => t._id === activeID);
  }, [filteredTasks, activeID]);
  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveID(null);
    if (!over) return;
    const taskID = active.id as string;
    const newProgressID = over.id as string;
    const taskToUpdate = filteredTasks.find((t) => t._id === taskID);
    const progressMapping: Record<string, Task["progress"]> = {
      NOT_STARTED: "not started",
      IN_PROGRESS: "in progress",
      COMPLETED: "completed",
    };
    const formattedProgress = progressMapping[newProgressID];
    if (taskToUpdate && taskToUpdate.progress !== formattedProgress) {
      try {
        let response = await editTask({
          ...taskToUpdate,
          progress: formattedProgress,
        });
        setSuccessMsg(response.message);
        setTimeout(() => {
          setSuccessMsg(null);
        }, 3000);
      } catch (e) {
        console.log(e);
        setTimeout(() => {
          setErrorTaskMsg(null);
        }, 3000);
      }
    }
  };
  return (
    <div className="h-full flex flex-col p-4 gap-2">
      <button
        onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
        className="min-w-[156px] w-1/8 flex items-center gap-4 px-4 py-2 bg-neutral-900 text-teal-600 border-2 border-neutral-600 rounded-lg hover:bg-neutral-800 hover:border-teal-600 transition-colors"
      >
        {sortOrder === "asc" ? (
          <>
            <FaSortAmountUp />
            Old to New
          </>
        ) : (
          <>
            <FaSortAmountDown />
            New to Old
          </>
        )}
      </button>
      <div className="flex-1 overflow-y-auto lg:overflow-hidden h-full grid grid-cols-1 lg:grid-cols-3 gap-3">
        <DndContext
          sensors={sensor}
          collisionDetection={rectIntersection}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          {COLUMNS.map((column) => {
            return (
              <ProgressColumn
                key={column.id}
                column={column}
                tasks={tasksByProgress[column.title.toLowerCase()] || []}
                onCardClick={handleProgressCardClick}
              />
            );
          })}
          <DragOverlay dropAnimation={null}>
            {activeID && activeTask ? (
              <div className="cursor-grab rounded-lg bg-neutral-950 p-4 rotate-3 scale-105 shadow-sm hover:shadow-md">
                <h3 className="text-teal-600 font-semibold text-lg">
                  {activeTask.title}
                </h3>
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>
      </div>
    </div>
  );
};

export default Progress;
