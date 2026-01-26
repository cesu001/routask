import { IoIosArrowDown, IoMdTrash } from "react-icons/io";
import React, { useMemo, useState } from "react";
import { FaPlus, FaSave } from "react-icons/fa";
import { useTaskStore } from "../store";
import { ImCross } from "react-icons/im";
import { IoPencil } from "react-icons/io5";
import { type Calendar } from "../../types";
import { IoMdSwap } from "react-icons/io";
import { FaAngleUp, FaAngleDown } from "react-icons/fa";

const SidebarCalendar = () => {
  const calendars = useTaskStore((state) => {
    return state.calendars;
  });
  const calendarSortOrder = useTaskStore((state) => {
    return state.calendarSortOrder;
  });
  const toggleCalendarSortOrder = useTaskStore((state) => {
    return state.toggleCalendarSortOrder;
  });
  const setSuccessMsg = useTaskStore((state) => {
    return state.setSuccessMsg;
  });
  const addCalendar = useTaskStore((state) => {
    return state.addCalendar;
  });
  const editCalendar = useTaskStore((state) => {
    return state.editCalendar;
  });
  const deleteCalendar = useTaskStore((state) => {
    return state.deleteCalendar;
  });
  const selectedCalendarIDs = useTaskStore(
    (state) => state.selectedCalendarIDs
  );
  const selectCalendar = useTaskStore((state) => state.selectCalendar);

  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isAddCalendarOpen, setIsAddCalendarOpen] = useState(false);
  const [cTitle, setCTitle] = useState("");
  const [editingCalendarId, setEditingCalendarId] = useState<string | null>(
    null
  );
  const [editCTitle, setEditCTitle] = useState("");
  const toggleCalendar = () => {
    setIsCalendarOpen(!isCalendarOpen);
  };
  const toggleAddCalendar = () => {
    setIsAddCalendarOpen(!isAddCalendarOpen);
  };
  const handleCTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCTitle(e.target.value);
  };
  const handleEditCTitleClick = (calendar: Calendar) => {
    if (editingCalendarId === calendar._id) {
      setEditingCalendarId(null);
    } else {
      setEditingCalendarId(calendar._id);
      setEditCTitle(calendar.title);
    }
  };
  const handleEditCTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditCTitle(e.target.value);
  };
  // add calendar
  const handleAddCalendar = async () => {
    if (!cTitle) {
      alert("Please check your calendar title.");
      return;
    }
    setSuccessMsg(null);
    try {
      let response = await addCalendar(cTitle);
      setSuccessMsg(response.message);
    } catch (e) {
      console.log(e);
    } finally {
      setCTitle("");
    }
    setTimeout(() => {
      setSuccessMsg(null);
    }, 3000);
  };
  // edit calendar
  const handleSaveEditCalendar = async (c_id: string) => {
    if (!editCTitle) {
      alert("Please check your calendar title.");
      return;
    }
    setSuccessMsg(null);
    try {
      let response = await editCalendar(c_id, editCTitle);
      setSuccessMsg(response.message);
      setEditingCalendarId(null);
    } catch (e) {
      console.log(e);
    } finally {
      setEditCTitle("");
    }
    setTimeout(() => {
      setSuccessMsg(null);
    }, 3000);
  };
  // delete calendar
  const handleDeleteCalendar = async (c_id: string) => {
    if (!window.confirm("Are you sure you want to delete this calendar ?")) {
      return;
    }
    try {
      let response = await deleteCalendar(c_id);
      setSuccessMsg(response.message);
    } catch (e) {
      console.log(e);
    }
    setTimeout(() => {
      setSuccessMsg(null);
    }, 3000);
  };
  // sort calendars
  const sortedCalendars = useMemo(() => {
    if (calendarSortOrder === "none") {
      return calendars;
    }
    const sorted = [...calendars].sort((a, b) => {
      const titleA = a.title.toLowerCase();
      const titleB = b.title.toLowerCase();
      if (titleA < titleB) {
        return calendarSortOrder === "asc" ? -1 : 1;
      }
      if (titleA > titleB) {
        return calendarSortOrder === "asc" ? 1 : -1;
      }
      return 0;
    });
    return sorted;
  }, [calendars, calendarSortOrder]);
  return (
    <>
      <div className="mt-10 text-white text-2xl font-semibold border-b-2 border-teal-600 px-4 py-2 flex justify-between">
        <h2>Calendars</h2>
        <button
          onClick={toggleCalendar}
          className={`${
            isCalendarOpen ? "transform rotate-180" : "transform rotate-0"
          } self-center  transition-transform duration-300`}
        >
          <IoIosArrowDown />
        </button>
      </div>

      <div
        className={`mt-2 w-full flex flex-col justify-start items-center text-white text-lg font-medium px-4 transition-all ease-in-out duration-200 ${
          isCalendarOpen
            ? "max-h-[1000px] opacity-100 py-2"
            : "max-h-0 opacity-0 overflow-hidden py-0"
        }`}
      >
        <div className="self-start flex items-center justify-between w-full mb-2">
          <span>Sort by</span>
          <button
            onClick={toggleCalendarSortOrder}
            className="w-20 px-2 py-1 bg-gray-500 text-sm font-normal rounded self-start"
          >
            {calendarSortOrder === "none" && (
              <span className="w-full flex items-center space-x-1">
                <span>Default</span>
                <IoMdSwap size={14} />
              </span>
            )}
            {calendarSortOrder === "asc" && (
              <span className="w-full flex justify-between items-center ">
                <span>(A-Z)</span>
                <FaAngleDown size={14} />
              </span>
            )}
            {calendarSortOrder === "desc" && (
              <span className="w-full flex justify-between items-center ">
                <span>(Z-A)</span>
                <FaAngleUp size={14} />
              </span>
            )}
          </button>
        </div>
        {calendars.length === 0 && !isAddCalendarOpen && (
          <div className="text-gray-400 w-full flex flex-col justify-center items-center space-y-2">
            <p>Calendar not found.</p>
            <p>Add a new one !</p>
          </div>
        )}
        {sortedCalendars.map((calendar) => (
          <div
            key={calendar._id}
            onClick={() => selectCalendar(calendar._id)}
            className="my-1 w-full flex justify-between group relative"
          >
            {editingCalendarId === calendar._id ? (
              <div className="flex-grow mr-2 px-2 py-2">
                <input
                  value={editCTitle}
                  onChange={handleEditCTitleChange}
                  name="editCTitle"
                  className="w-3/5 bg-white text-black rounded p-1 text-lg font-semibold"
                />
              </div>
            ) : (
              <button
                className={`px-4 py-2 font-semibold text-lg rounded hover:cursor-pointer hover:scale-105 hover:border-b-2 border-teal-600 hover:text-teal-400 transition-all ease-in-out duration-200 w-full text-left
                  ${
                    selectedCalendarIDs.includes(calendar._id)
                      ? "border-b-2 text-teal-400"
                      : "text-white"
                  }
                  `}
              >
                {calendar.title}
              </button>
            )}
            <div className="absolute top-1/2 -translate-y-1/2 right-1 flex justify-around items-center space-x-3 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-opacity ease-in-out duration-200">
              {editingCalendarId === calendar._id ? (
                <button
                  onClick={() => handleSaveEditCalendar(calendar._id)}
                  className="transition-all ease-in-out duration-200 hover:scale-120 hover:text-blue-600"
                >
                  <FaSave />
                </button>
              ) : (
                <button
                  onClick={() => handleEditCTitleClick(calendar)}
                  className="transition-all ease-in-out duration-200 hover:scale-120 hover:text-teal-600"
                >
                  <IoPencil size={18} />
                </button>
              )}
              {editingCalendarId === calendar._id ? (
                <button
                  onClick={() => handleEditCTitleClick(calendar)}
                  className="transition-all ease-in-out duration-200 hover:scale-120 hover:text-red-600"
                >
                  <ImCross size={16} />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => handleDeleteCalendar(calendar._id)}
                  className="transition-all ease-in-out duration-200 hover:scale-120 hover:text-red-600"
                >
                  <IoMdTrash size={18} />
                </button>
              )}
            </div>
          </div>
        ))}
        {isAddCalendarOpen && (
          <div className="mt-5 flex justify-between items-center">
            <div className="w-3/4">
              <input
                onChange={handleCTitleChange}
                type="text"
                name="cTitle"
                value={cTitle}
                className="bg-white w-full border-2 border-gray-400 text-black rounded"
              />
            </div>
            <button
              onClick={handleAddCalendar}
              className="text-lg ml-2 px-1 rounded bg-gray-300 text-black hover:scale-110 hover:cursor-pointer hover:bg-teal-600
              hover:text-white transition-all ease-in-out duration-200"
            >
              Add
            </button>
          </div>
        )}
        <button
          onClick={toggleAddCalendar}
          className={`mt-4 p-2 rounded bg-gray-300 text-black hover:scale-110 hover:cursor-pointer ${
            isAddCalendarOpen ? "hover:bg-red-600" : "hover:bg-teal-600"
          } hover:text-white transition-all ease-in-out duration-200`}
        >
          {isAddCalendarOpen ? <ImCross size={16} /> : <FaPlus size={16} />}
        </button>
      </div>
    </>
  );
};

export default React.memo(SidebarCalendar);
