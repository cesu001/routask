import { useState, useEffect, useMemo } from "react";
const DigitalClock = () => {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  const { dateStr, timeStr, meridian } = useMemo(() => {
    const Y = time.getFullYear();
    const M = (time.getMonth() + 1).toString().padStart(2, "0");
    const D = time.getDate().toString().padStart(2, "0");
    const hrs = time.getHours();
    const min = time.getMinutes().toString().padStart(2, "0");
    const sec = time.getSeconds().toString().padStart(2, "0");
    return {
      dateStr: `${Y}-${M}-${D}`,
      timeStr: `${(hrs % 12 || 12).toString().padStart(2, "0")}:${min}:${sec}`,
      meridian: hrs >= 12 ? "PM" : "AM",
    };
  }, [time]);

  return (
    <div className="mx-1 text-3xl font-semibold flex flex-wrap justify-center sm:justify-start md:justify-start">
      <div className="px-4 py-2">{dateStr}</div>
      <div className="flex tabular-nums">
        <div className="px-4 py-2 w-[132px]">{timeStr}</div>
        <div className="px-4 py-2">{meridian}</div>
      </div>
    </div>
  );
};

export default DigitalClock;
