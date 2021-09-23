import { useState, useEffect } from "react";

const useCountDownTimer = (seconds: number) => {
  // initialize timeLeft with the seconds prop
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [timesUp, setTimesUp] = useState<boolean>(true);

  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  const [stoped, setStoped] = useState<boolean>(false);

  useEffect(() => {
    // exit early when we reach 0
    if (!timeLeft) {
      setTimesUp(true);
      return;
    }

    // save intervalId to clear the interval when the
    // component re-renders
    const intervalId = setInterval(() => {
      if (!stoped) {
        setTimeLeft(timeLeft - 1);
      } else {
        clearInterval(intervalId);
      }
    }, 1000);

    setIntervalId(intervalId);

    // clear interval on re-render to avoid memory leaks
    return () => clearInterval(intervalId);
    // add timeLeft as a dependency to re-rerun the effect
    // when we update it
  }, [timeLeft, stoped]);

  const startRestartCountDown = (): void => {
    setStoped(false);
    setTimesUp(false);
    setTimeLeft(seconds);
  };

  const stopCountDown = (): void => {
    setStoped(true);
    if (intervalId) {
      clearInterval(intervalId);
    }
  };

  return { timeLeft, timesUp, startRestartCountDown, stopCountDown };
};

export default useCountDownTimer;
