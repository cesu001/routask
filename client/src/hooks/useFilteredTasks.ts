import { useMemo } from "react";
import { useTaskStore } from "../store";

export const useFilteredTasks = (searchQuery: string = "") => {
  const showArchived = useTaskStore((state) => state.showArchived);
  const tasks = useTaskStore((state) => state.tasks);
  const selectedCalendarIDs = useTaskStore(
    (state) => state.selectedCalendarIDs
  );
  const selectedProgress = useTaskStore((state) => state.selectedProgress);
  const selectedPriority = useTaskStore((state) => state.selectedPriority);
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      if (task.archived !== showArchived) return false;
      const matchCalendar =
        selectedCalendarIDs.length === 0 ||
        selectedCalendarIDs.includes(task.calendar);
      const matchProgress =
        selectedProgress.length === 0 ||
        selectedProgress.includes(task.progress.toLowerCase());
      const matchPriority =
        selectedPriority.length === 0 ||
        selectedPriority.includes(task.priority.toLowerCase());
      const matchSearch = task.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      return matchCalendar && matchProgress && matchPriority && matchSearch;
    });
  }, [
    tasks,
    selectedCalendarIDs,
    selectedProgress,
    selectedPriority,
    searchQuery,
    showArchived,
  ]);
  return filteredTasks;
};
