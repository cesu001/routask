import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useTaskStore } from "../store";
import type { Task } from "../../types";
import {
  FaAngleLeft,
  FaAngleRight,
  FaSearch,
  FaSortAmountDown,
  FaSortAmountUp,
} from "react-icons/fa";
import { useFilteredTasks } from "../hooks/useFilteredTasks";
import TaskCard from "./TaskCard";

const TaskList = () => {
  const calendars = useTaskStore((state) => state.calendars);
  const setEditingTask = useTaskStore((state) => state.setEditingTask);
  const showArchived = useTaskStore((state) => state.showArchived);
  const handleTaskClick = useCallback(
    (task: Task) => {
      setEditingTask(task);
    },
    [setEditingTask]
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const filteredTasks = useFilteredTasks(searchQuery);
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
  const tasksPerPage = 9;
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const totalPages = Math.ceil(processedTasks.length / tasksPerPage);
  const currentTasks = processedTasks.slice(indexOfFirstTask, indexOfLastTask);
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };
  const calendarMap = React.useMemo(() => {
    return new Map(calendars.map((calendar) => [calendar._id, calendar.title]));
  }, [calendars]);
  useEffect(() => {
    setCurrentPage(1);
  }, [showArchived]);
  return (
    <div className="mt-2 flex flex-col h-full bg-neutral-700">
      <div className="flex flex-wrap m-1 px-2 pb-3 gap-4 items-center min-w-[200px] border-b-2 border-teal-600">
        <div className="relative rounded-xl text-neutral-400">
          <FaSearch
            size={20}
            className="absolute left-2 top-1/2 -translate-y-1/2"
          />
          <input
            type="text"
            value={searchQuery}
            placeholder="Search tasks..."
            onChange={handleSearchChange}
            className="w-full rounded-lg text-white bg-neutral-900 border-neutral-600 border-2 pl-8 py-2 pr-4 text-lg focus:outline-none focus:border-teal-600"
          />
        </div>
        <button
          onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
          className="flex items-center gap-2 px-4 py-2 bg-neutral-900 text-teal-600 border-2 border-neutral-600 rounded-lg hover:bg-neutral-800 hover:border-teal-600 transition-colors"
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
      </div>
      <div className="flex-1 overflow-y-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 p-3 content-start">
          {currentTasks.length === 0 && (
            <div className="col-span-full flex justify-center items-center px-8 py-4">
              <span className="text-2xl font-bold text-white">
                Add some new tasks!
              </span>
            </div>
          )}
          {currentTasks.map((task) => {
            return (
              <TaskCard
                key={task._id}
                task={task}
                calendarTitle={calendarMap.get(task.calendar) || "No Calendar"}
                onClick={handleTaskClick}
              />
            );
          })}
        </div>
      </div>
      {currentTasks.length !== 0 && (
        <div className="flex flex-none justify-center items-center gap-3 p-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="p-2 rounded hover:bg-neutral-600 disabled:opacity-30 disabled:cursor-not-allowed text-white"
          >
            <FaAngleLeft size={24} />
          </button>
          <div className="flex gap-2 overflow-x-auto">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
              (number) => (
                <button
                  key={number}
                  onClick={() => paginate(number)}
                  className={`
              px-3 py-1 rounded font-medium transition-colors 
              ${
                currentPage === number
                  ? "bg-teal-600 text-white"
                  : "text-neutral-400 hover:bg-neutral-600"
              }`}
                >
                  {number}
                </button>
              )
            )}
          </div>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="p-2 rounded hover:bg-neutral-600 disabled:opacity-30 disabled:cursor-not-allowed text-white"
          >
            <FaAngleRight size={24} />
          </button>
        </div>
      )}
    </div>
  );
};

export default React.memo(TaskList);
