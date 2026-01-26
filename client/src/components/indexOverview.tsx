import { useEffect, useRef, useState } from "react";
import overview1 from "../assets/taskIndex.png";
import overview2 from "../assets/taskRWD.png";

const indexOverview = () => {
  const [isVisible1, setIsVisible1] = useState(false);
  const [isVisible2, setIsVisible2] = useState(false);

  const domRef1 = useRef<HTMLDivElement>(null);
  const domRef2 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === domRef1.current) {
            setIsVisible1(entry.isIntersecting);
          }
          if (entry.target === domRef2.current) {
            setIsVisible2(entry.isIntersecting);
          }
        });
      },
      {
        threshold: 0.05,
        rootMargin: "5% 0px -5% 0px",
      },
    );

    if (domRef1.current) observer.observe(domRef1.current);
    if (domRef2.current) observer.observe(domRef2.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      className="relative bg-neutral-700 text-2xl/loose tracking-wide text-neutral-200 min-h-[110vh] flex flex-col justify-around items-center gap-20 p-5 overflow-hidden"
      id="overview"
    >
      <div
        className="absolute inset-0 z-1 pointer-events-none"
        style={{
          clipPath: "ellipse(110% 108% at 10% -50%)",
          backgroundColor: "#404040",
          height: "120%",
        }}
      />
      <div
        className="absolute inset-0 z-0 opacity-10 pointer-events-none"
        style={{
          clipPath: "ellipse(110% 109% at 16% -50%)",
          backgroundColor: "white",
          height: "120%",
        }}
      />
      <div
        ref={domRef1}
        className="z-10 my-5 flex flex-wrap lg:flex-nowrap justify-around gap-10 w-full max-w-6xl"
      >
        <div
          className={`w-full lg:w-2/3 aspect-video mx-auto border-y-[8px] border-x-[8px] border-neutral-800 rounded-md shadow-2xl  overflow-hidden transition-all duration-700 ease-in-out transform 
          ${
            isVisible1
              ? "translate-x-0 opacity-100"
              : "-translate-x-32 opacity-0"
          }`}
        >
          <img
            src={overview1}
            alt="overview1"
            className="w-full h-full object-cover"
          />
        </div>
        <div
          className={`w-full lg:flex-1 flex flex-col justify-center text-center text-xl lg:text-3xl transition-all duration-700 delay-100 ease-in-out transform 
          ${
            isVisible1
              ? "translate-x-0 opacity-100"
              : "translate-x-32 opacity-0"
          }`}
        >
          <p>
            Manage your tasks <span className="text-teal-600">efficiently</span>
          </p>
          <p>with our intuitive task management.</p>
        </div>
      </div>
      <div
        ref={domRef2}
        className="z-10 flex flex-wrap-reverse lg:flex-nowrap justify-around items-center gap-10 w-full max-w-6xl"
      >
        <div
          className={`w-full lg:flex-1 flex flex-col justify-center text-center text-xl lg:text-3xl transition-all duration-700 delay-100 ease-in-out transform 
          ${
            isVisible2
              ? "translate-x-0 opacity-100"
              : "-translate-x-32 opacity-0"
          }`}
        >
          <p>Access your tasks anytime, anywhere</p>
          <p>
            with our <span className="text-teal-600">responsive design.</span>
          </p>
        </div>
        <div
          className={`w-full lg:w-1/3 max-w-[300px] mx-auto border-y-[12px] border-x-[8px] border-neutral-800 rounded-[2rem] shadow-2xl overflow-hidden transition-all duration-700 ease-in-out transform
          ${
            isVisible2
              ? "translate-x-0 opacity-100"
              : "translate-x-32 opacity-0"
          }`}
        >
          <img
            src={overview2}
            alt="overview2"
            className="w-full h-auto object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default indexOverview;
