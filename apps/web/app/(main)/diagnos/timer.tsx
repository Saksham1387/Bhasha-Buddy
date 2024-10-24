import React, { useState, useEffect } from 'react';

const TimerComponent = () => {
  const [secondsLeft, setSecondsLeft] = useState(10); // Start from 10 seconds

  // Countdown logic
  useEffect(() => {
    // Only set up the interval if secondsLeft > 0
    if (secondsLeft > 0) {
      const interval = setInterval(() => {
        setSecondsLeft((prevSeconds) => prevSeconds - 1);
      }, 1000); // Decrease every second

      // Cleanup interval on component unmount or when countdown finishes
      return () => clearInterval(interval);
    }
  }, [secondsLeft]);

  // Format the remaining time
  //@ts-ignore
  const formatTime = (seconds) => {
    return `0:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div>
      <div className="mt-4 text-lg font-bold text-neutral-500 ml-[20px]">
        Time Left: {formatTime(secondsLeft)}
      </div>
    </div>
  );
};

export default TimerComponent;
