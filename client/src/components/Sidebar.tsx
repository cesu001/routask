import Logo from "../assets/routask-high-resolution-logo-transparent.png";
import { Link } from "react-router-dom";
import SidebarCalendar from "./SidebarCalendar";
import SidebarProgress from "./SidebarProgress";
import SidebarPriority from "./SidebarPriority";
import { useTaskStore } from "../store";
import { FaArchive, FaInbox, FaTimes } from "react-icons/fa";

const Sidebar: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  const showArchived = useTaskStore((state) => state.showArchived);
  const setShowArchived = useTaskStore((state) => state.setShowArchived);
  return (
    <div
      className={`w-screen h-screen bg-gray-950 px-4 py-2 flex flex-col overflow-y-auto lg:w-64 lg:static lg:translate-x-0
      fixed top-0 left-0 z-50 transform transition-transform duration-500 ease-in-out
      ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}
    >
      <div className="lg:hidden fixed top-0 right-0">
        <button
          onClick={onClose}
          className="p-4 text-white hover:text-red-500 transition-colors duration-200"
        >
          <FaTimes size={24} />
        </button>
      </div>
      <div className="mt-5 flex justify-center">
        <Link to="/">
          <img src={Logo} alt="logo" className="h-12" />
        </Link>
      </div>
      <div className="flex-1">
        {/* calendar */}
        <SidebarCalendar />
        {/* progress */}
        <SidebarProgress />
        {/* priority */}
        <SidebarPriority />
      </div>
      <div className="border-t-2 border-neutral-400 mt-5 pt-2 flex justify-center items-center">
        <button
          onClick={() => setShowArchived(!showArchived)}
          className={`flex justify-center items-center gap-2 rounded-lg px-4 py-2 text-xl font-semibold hover:cursor-pointer hover:scale-105 transition-all ease-in-out duration-200
          ${
            showArchived
              ? "bg-neutral-500 border-2 border-teal-600 text-teal-400"
              : "bg-neutral-600 text-neutral-400 hover:bg-neutral-500 hover:border-2 hover:border-teal-600 hover:text-teal-400"
          }  
          `}
        >
          {showArchived ? <FaInbox /> : <FaArchive />}
          {showArchived ? "View Active" : "Archived"}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
