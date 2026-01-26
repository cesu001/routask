import { useState, useRef, useEffect } from "react";
import feature1 from "../assets/taskList.png";
import feature2 from "../assets/taskCalendar.png";
import feature3 from "../assets/taskProgress.png";

const IndexFeature = () => {
  const [isVisible1, setIsVisible1] = useState(false);
  const [isVisible2, setIsVisible2] = useState(false);
  const [isVisible3, setIsVisible3] = useState(false);
  const domRef1 = useRef<HTMLDivElement>(null);
  const domRef2 = useRef<HTMLDivElement>(null);
  const domRef3 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target === domRef1.current) {
              setIsVisible1(true);
            }
            if (entry.target === domRef2.current) {
              setTimeout(() => setIsVisible2(true), 250);
            }
            if (entry.target === domRef3.current) {
              setTimeout(() => setIsVisible3(true), 500);
            }
          } else {
            if (entry.target === domRef3.current) {
              setIsVisible3(false);
            }
            if (entry.target === domRef2.current) {
              setTimeout(() => setIsVisible2(false), 250);
            }
            if (entry.target === domRef1.current) {
              setTimeout(() => setIsVisible1(false), 500);
            }
          }
        });
      },
      {
        threshold: 0.01,
        rootMargin: "5% 0px -3% 0px",
      },
    );
    if (domRef1.current) observer.observe(domRef1.current);
    if (domRef2.current) observer.observe(domRef2.current);
    if (domRef3.current) observer.observe(domRef3.current);
    return () => observer.disconnect();
  }, []);
  return (
    <div
      className="relative bg-neutral-900 min-h-[90vh] p-10 grid grid-cols-1 lg:grid-cols-3 gap-3"
      id="feature"
    >
      <div
        className="absolute inset-0 z-0 opacity-10 bg-white"
        style={{ clipPath: "polygon(0 25%, 100% 75%, 100% 50%, 0 75%)" }}
      />

      <div
        ref={domRef1}
        className={`flex flex-col p-5 gap-15 text-neutral-200 bg-neutral-800/30 border-2 border-teal-600 rounded-xl shadow-lg
          transform transition-all duration-700 ease-in-out
          ${
            isVisible1
              ? "translate-y-0 opacity-100"
              : "translate-y-20 opacity-0"
          }`}
      >
        <div className="w-full rounded-lg shadow-md overflow-hidden hover:scale-105 transition-transform duration-500">
          <img src={feature1} alt="" className="w-full h-auto object-contain" />
        </div>
        <h2 className="text-center text-4xl font-bold mt-6 mb-2">Task List</h2>
        <p className="text-2xl text-center flex-grow px-2 py-1 font-semibold max-w-[350px] mx-auto leading-relaxed">
          Check your tasks in a simple and organized way.
        </p>
        <div className="text-neutral-400 text-lg font-medium flex flex-col mt-6 pt-6 pl-6 border-t-2 border-neutral-400 space-y-2">
          <p>- Click cards to view details.</p>
          <p>- Edit tasks directly from the list.</p>
        </div>
      </div>
      <div
        ref={domRef2}
        className={`flex flex-col p-5 gap-15 text-neutral-200 bg-neutral-800/30 border-2 border-teal-600 rounded-xl shadow-lg
          transform transition-all duration-700 ease-in-out
          ${
            isVisible2
              ? "translate-y-0 opacity-100"
              : "translate-y-20 opacity-0"
          }`}
      >
        <div className="w-full rounded-lg shadow-md overflow-hidden hover:scale-105 transition-transform duration-500">
          <img
            src={feature2}
            alt="feature2"
            className="w-full h-auto object-contain"
          />
        </div>
        <h2 className="text-center text-4xl font-bold mt-6 mb-2">Calendar</h2>
        <p className="text-2xl text-center flex-grow px-2 py-1 font-semibold max-w-[350px] mx-auto leading-relaxed">
          Visualize your tasks and deadlines on a calendar view.
        </p>
        <div className="text-neutral-400 text-lg font-medium flex flex-col mt-6 pt-6 pl-6 border-t-2 border-neutral-400 space-y-2">
          <p>- Click days to view task list of the day.</p>
          <p>- Fine works with filters on sidebar.</p>
        </div>
      </div>
      <div
        ref={domRef3}
        className={`flex flex-col p-5 gap-15 text-neutral-200 bg-neutral-800/30 border-2 border-teal-600 rounded-xl shadow-lg
          transform transition-all duration-700 ease-in-out
          ${
            isVisible3
              ? "translate-y-0 opacity-100"
              : "translate-y-20 opacity-0"
          }`}
      >
        <div className="w-full rounded-lg shadow-md overflow-hidden hover:scale-105 transition-transform duration-500">
          <img
            src={feature3}
            alt="feature3"
            className="w-full h-auto object-contain"
          />
        </div>
        <h2 className="text-center text-4xl font-bold mt-6 mb-2">Progress</h2>
        <p className="text-2xl text-center flex-grow px-2 py-1 font-semibold max-w-[350px] mx-auto leading-relaxed">
          Track your progress and see how much you've accomplished.
        </p>
        <div className="text-neutral-400 text-lg font-medium flex flex-col mt-6 pt-6 pl-6 border-t-2 border-neutral-400 space-y-2">
          <p>- View your progress visually.</p>
          <p>- Drag and drop tasks to update their status.</p>
        </div>
      </div>
    </div>
  );
};

export default IndexFeature;
