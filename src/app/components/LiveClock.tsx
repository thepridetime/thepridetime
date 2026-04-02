import { useState, useEffect } from "react";

function getDayName(d: Date) {
  return ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][d.getDay()];
}
function getMonthName(d: Date) {
  return ["January","February","March","April","May","June","July","August","September","October","November","December"][d.getMonth()];
}

export function useLiveDateTime() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  const day = getDayName(now);
  const month = getMonthName(now);
  const date = now.getDate();
  const year = now.getFullYear();
  const hours = now.getHours();
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const seconds = now.getSeconds().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  const h12 = (hours % 12 || 12).toString().padStart(2, "0");
  return {
    fullDate: `${day}, ${month} ${date}, ${year}`,
    time: `${h12}:${minutes}:${seconds} ${ampm}`,
    timeShort: `${h12}:${minutes} ${ampm}`,
    utcTime: now.toISOString().substring(11, 16) + " UTC",
    est: now.toLocaleTimeString("en-US", { timeZone: "America/New_York", hour: "2-digit", minute: "2-digit", second: "2-digit" }),
    gmt: now.toLocaleTimeString("en-GB", { timeZone: "Europe/London", hour: "2-digit", minute: "2-digit" }),
    ist: now.toLocaleTimeString("en-IN", { timeZone: "Asia/Kolkata", hour: "2-digit", minute: "2-digit" }),
    tky: now.toLocaleTimeString("ja-JP", { timeZone: "Asia/Tokyo", hour: "2-digit", minute: "2-digit" }),
    now,
  };
}

export function LiveClock({ className = "" }: { className?: string }) {
  const { fullDate, time } = useLiveDateTime();
  return (
    <span className={className}>
      {fullDate} &nbsp;|&nbsp; {time}
    </span>
  );
}
