import { useState, useEffect, useContext } from "react";
import { GlobalContext } from ".";

const TimeDisplay = ({ timezone }) => {
  const { time, setTime } = useContext(GlobalContext);

  useEffect(() => {
    const updateTime = () => {
      setTime(
        new Intl.DateTimeFormat("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
          timeZone: timezone,
        }).format(new Date())
      );
    };

    updateTime(); // Run immediately
    const interval = setInterval(updateTime, 1000); // Run every second

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [timezone]);

  return <span>{time}</span>; // Display the formatted time
};

export default TimeDisplay;
