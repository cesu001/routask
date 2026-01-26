import React, { useState, useMemo } from "react";
import {
  format,
  isToday,
  startOfMonth,
  subMonths,
  addMonths,
  startOfWeek,
  addDays,
  isSameMonth,
} from "date-fns";
import { FaCaretLeft, FaCaretRight } from "react-icons/fa";
import { useFilteredTasks } from "../hooks/useFilteredTasks";
import type { Task } from "../../types";
import EventCalendarDay from "./EventCalendarDay";
import EventCalendarModal from "./EventCalendarModal";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const EventCalendar = () => {
  const filteredTasks = useFilteredTasks("");
  const [dayOpen, setDayOpen] = useState<Date | null>(null);
  const isCModalOpen = dayOpen !== null;
  const toggleCModal = () => {
    setDayOpen(null);
  };
  const [viewDate, setViewDate] = useState(new Date());
  const handlePrevMonth = () => {
    setViewDate(subMonths(viewDate, 1));
  };
  const handleNextMonth = () => {
    setViewDate(addMonths(viewDate, 1));
  };

  const firstDayOfMonth = startOfMonth(viewDate);
  const calendarStart = startOfWeek(firstDayOfMonth);
  const calendarDays = Array.from({ length: 42 }).map((_, i) =>
    addDays(calendarStart, i)
  );
  const tasksByDate = useMemo(() => {
    return filteredTasks.reduce((acc: { [key: string]: Task[] }, task) => {
      if (task.date) {
        const dateKey = format(new Date(task.date), "yyyy-MM-dd");
        if (!acc[dateKey]) {
          acc[dateKey] = [];
        }
        acc[dateKey].push(task);
      }
      return acc;
    }, {});
  }, [filteredTasks]);
  const modalDateKey = dayOpen ? format(dayOpen, "yyyy-MM-dd") : "";
  const selectedTasks = tasksByDate[modalDateKey] || [];
  return (
    <div className="h-full overflow-hidden p-5 flex flex-col">
      <EventCalendarModal
        dayOpen={dayOpen}
        isCModalOpen={isCModalOpen}
        toggleCModal={toggleCModal}
        selectedTasks={selectedTasks}
      />
      <div className="grid grid-cols-3 items-center gap-3">
        <div className="flex justify-end">
          <button
            onClick={handlePrevMonth}
            className="p-2 hover:scale-110 hover:text-neutral-200 transition-all duration-200"
          >
            <FaCaretLeft size={24} />
          </button>
        </div>
        <h2 className="text-2xl font-bold text-center">
          {format(viewDate, "MMMM yyyy")}
        </h2>
        <div className="flex justify-start">
          <button
            onClick={handleNextMonth}
            className="p-2 hover:scale-110 hover:text-neutral-200 transition-all duration-200"
          >
            <FaCaretRight size={24} />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-7 grid-rows-[auto_repeat(6,1fr)] gap-1 flex-1 min-h-0">
        {WEEKDAYS.map((day) => {
          return (
            <div key={day} className="font-bold text-center">
              {day}
            </div>
          );
        })}
        {calendarDays.map((day) => {
          const dateKey = format(day, "yyyy-MM-dd");
          const dayTasks = tasksByDate[dateKey] || [];
          return (
            <EventCalendarDay
              key={day.toISOString()}
              day={day}
              isCurrentMonth={isSameMonth(day, viewDate)}
              isTodayDate={isToday(day)}
              dayTasks={dayTasks}
              onClick={() => setDayOpen(day)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default EventCalendar;
