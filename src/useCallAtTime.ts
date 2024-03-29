import { useEffect } from "react";

const useScheduledTask = (
  targetHour: number,
  taskFunction: () => void
) => {
  useEffect(() => {
    let intervalId: number;

    const getLastRunTime = () => {
      const storedTime = localStorage.getItem("lastRunTime");
      return storedTime ? new Date(storedTime) : null;
    };

    const setLastRunTime = () => {
      const now = new Date();
      localStorage.setItem("lastRunTime", now.toISOString());
    };

    const calculateNextRun = () => {
      const now = new Date();
      const nextHour = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        targetHour,
        0,
        0,
        0
      );

      if (now.getHours() >= targetHour) {
        // If the current time is after or equal to the target hour, schedule for the next day
        nextHour.setDate(nextHour.getDate() + 1);
      }

      return nextHour.getTime() - now.getTime();
    };

    const runAndReschedule = () => {
      // Calculate milliseconds until the next scheduled hour
      const nextRunDelay = calculateNextRun();

      // Clear existing interval and set a new one with the recalculated delay
      clearInterval(intervalId);
      intervalId = setInterval(runAndReschedule, nextRunDelay);
    };

    function initialExcute() {
      console.log("i'm runningggggggg");
      const lastRunTime = getLastRunTime();
      const now = new Date();
      if (
        !lastRunTime ||
        (now.getHours() >= targetHour &&
          lastRunTime.getDate() !== now.getDate())
      ) {
        // If it's the first run or it's a new day after the target hour, run the taskFunction immediately
        taskFunction();
        setLastRunTime();
      }
    }
    // Initial scheduling
    initialExcute();
    const initialDelay = calculateNextRun();
    intervalId = setInterval(runAndReschedule, initialDelay);

    // Clear interval on unmount
    return () => clearInterval(intervalId);
  }, [targetHour, taskFunction]);

  return null;
};

export default useScheduledTask;
