import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { useTaskStore } from "../store";

const SidebarProgress = () => {
  const selectedProgress = useTaskStore((state) => state.selectedProgress);
  const selectProgress = useTaskStore((state) => state.selectProgress);
  const [isProgressOpen, setIsProgressOpen] = useState(false);
  const toggleProgress = () => {
    setIsProgressOpen(!isProgressOpen);
  };
  const getBtnClass = (isActive: boolean) =>
    `px-4 py-2 font-semibold text-lg rounded hover:cursor-pointer hover:scale-105 hover:border-b-2   transition-all ease-in-out duration-200 w-full text-left
    ${
      isActive
        ? "border-b-2 border-teal-600 text-teal-400"
        : "text-white hover:text-teal-400"
    }
  `;
  return (
    <>
      <div className="mt-4 text-white text-2xl font-semibold border-b-2 border-teal-600 px-4 py-2 flex justify-between">
        <h2>Progress</h2>
        <button
          onClick={toggleProgress}
          className={`${
            isProgressOpen ? "transform rotate-180" : "transform rotate-0"
          } self-center  transition-transform duration-300`}
        >
          <IoIosArrowDown />
        </button>
      </div>
      <div
        className={`mt-2 text-white text-lg font-medium px-4 transition-all ease-in-out duration-200 overflow-hidden ${
          isProgressOpen
            ? "max-h-60 opacity-100 py-2"
            : "max-h-0 opacity-0 py-0"
        }`}
      >
        {["Not Started", "In Progress", "Completed"].map((progress) => (
          <button
            key={progress}
            onClick={() => selectProgress(progress.toLowerCase())}
            className={getBtnClass(
              selectedProgress.includes(progress.toLowerCase())
            )}
          >
            {progress}
          </button>
        ))}
      </div>
    </>
  );
};

export default SidebarProgress;
