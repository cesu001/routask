import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { useTaskStore } from "../store";

const SidebarPriority = () => {
  const selectedPriority = useTaskStore((state) => state.selectedPriority);
  const selectPriority = useTaskStore((state) => state.selectPriority);
  const [isPriorityOpen, setIsPriorityOpen] = useState(false);
  const togglePriority = () => {
    setIsPriorityOpen(!isPriorityOpen);
  };
  const getBtnClass = (isActive: boolean) =>
    `flex justify-between items-center px-4 py-2 font-semibold text-lg rounded hover:cursor-pointer hover:scale-105 hover:border-b-2   transition-all ease-in-out duration-200 w-full text-left
    ${
      isActive
        ? "border-b-2 border-teal-600 text-teal-400"
        : "text-white hover:text-teal-400"
    }
  `;
  return (
    <>
      <div className="mt-4 text-white text-2xl font-semibold border-b-2 border-teal-600 px-4 py-2 flex justify-between">
        <h2>Priority</h2>
        <button
          onClick={togglePriority}
          className={`${
            isPriorityOpen ? "transform rotate-180" : "transform rotate-0"
          } self-center  transition-transform duration-300`}
        >
          <IoIosArrowDown />
        </button>
      </div>
      <div
        className={`mt-2 text-white text-lg font-medium px-4 transition-all ease-in-out duration-200 overflow-hidden ${
          isPriorityOpen
            ? "max-h-60 opacity-100 py-2"
            : "max-h-0 opacity-0 py-0"
        }`}
      >
        {[
          { label: "Low", color: "bg-green-600" },
          { label: "Medium", color: "bg-yellow-400" },
          { label: "High", color: "bg-red-600" },
        ].map((p) => (
          <button
            key={p.label}
            onClick={() => selectPriority(p.label.toLowerCase())}
            className={getBtnClass(
              selectedPriority.includes(p.label.toLowerCase())
            )}
          >
            {p.label}
            <div className={`${p.color} w-5 h-5 rounded-full`}></div>
          </button>
        ))}
      </div>
    </>
  );
};

export default SidebarPriority;
