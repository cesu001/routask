import Footer from "./Footer";
import Sidebar from "./Sidebar";
import TaskMain from "./TaskMain";
import { useAuthStore, useTaskStore } from "../store";
import { useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { FaBars } from "react-icons/fa";
import { useBodyScrollLock } from "../hooks/useBodyScrollLock";

const TaskIndex = () => {
  const currentUser = useAuthStore((state) => state.currentUser);
  const successMessage = useAuthStore((state) => state.successMessage);
  const setSuccessMessage = useAuthStore((state) => state.setSuccessMessage);
  const successMessageToggle = () => {
    setSuccessMessage(null);
    if (successMessage === "You have been logged out.") {
      navigate("/");
    }
  };
  const successMsg = useTaskStore((state) => state.successMsg);
  const errorTaskMsg = useTaskStore((state) => state.errorTaskMsg);
  const setErrorTaskMsg = useTaskStore((state) => state.setErrorTaskMsg);
  const fetchCalendarData = useTaskStore((state) => state.fetchCalendarData);
  const fetchTasks = useTaskStore((state) => state.fetchTasks);
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const handleSidebarClose = useCallback(() => {
    setIsSidebarOpen(false);
  }, [setIsSidebarOpen]);
  useEffect(() => {
    if (currentUser) {
      fetchCalendarData(currentUser?.user._id)
        .then((data) => {
          console.log(data.message);
        })
        .catch((e) => {
          console.log(e);
        });
      fetchTasks()
        .then((data) => {
          console.log(data.message);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [currentUser, fetchCalendarData, fetchTasks]);
  useEffect(() => {
    if (errorTaskMsg) {
      const timer = setTimeout(() => {
        setErrorTaskMsg(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [errorTaskMsg, setErrorTaskMsg]);
  useBodyScrollLock(isSidebarOpen);
  return (
    <div className="relative overflow-hidden">
      {!currentUser && !successMessage && (
        <div
          style={{ backgroundColor: "rgba(0,0,0,0.7)" }}
          className="fixed inset-0 flex justify-center items-center z-10"
        >
          <div className="w-128 bg-white p-10 rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-bold mb-4">
              You need to be logged in to view this page.
            </h2>
            <button
              onClick={() => navigate("/login")}
              className="mt-4 px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-400"
            >
              Go to login page.
            </button>
          </div>
        </div>
      )}
      {successMsg && (
        <div className="fixed top-5 left-1/2 transform -translate-x-1/2 z-10 p-4 bg-teal-600 text-white rounded-lg shadow-xl flex items-center transition-opacity duration-300">
          <span>{successMsg}</span>
        </div>
      )}
      {errorTaskMsg && (
        <div className="fixed top-5 left-1/2 transform -translate-x-1/2 z-10 p-4 bg-red-600 text-white rounded-lg shadow-xl flex items-center transition-opacity duration-300">
          <span>{errorTaskMsg}</span>
        </div>
      )}
      {successMessage && (
        <div
          style={{ backgroundColor: "rgba(0,0,0,0.7)" }}
          className="fixed inset-0 flex justify-center items-center z-60"
        >
          <div className="w-128 bg-white p-10 rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-bold mb-4">{successMessage}</h2>
            <button
              onClick={successMessageToggle}
              className="mt-4 px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-400"
            >
              OK
            </button>
          </div>
        </div>
      )}
      <div className="lg:hidden absolute top-0 left-0 p-2 z-20">
        <button
          className="p-2 border-2 border-neutral-600 rounded-lg shadow-md hover:scale-105 hover:border-teal-600 transition-all duration-200"
          onClick={() => setIsSidebarOpen(true)}
        >
          <FaBars size={24} />
        </button>
      </div>
      <div className="flex w-screen h-screen overflow-hidden">
        <Sidebar isOpen={isSidebarOpen} onClose={handleSidebarClose} />
        <div className="flex-1">
          <TaskMain />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default TaskIndex;
