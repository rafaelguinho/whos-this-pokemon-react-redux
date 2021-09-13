import { useState, useEffect } from "react";

const useCountDownTimer = (seconds: number) => {
  // initialize timeLeft with the seconds prop
  const [timeLeft, setTimeLeft] = useState<number>(seconds);
  const [timesUp, setTimesUp] = useState<boolean>(false);

  useEffect(() => {
    // exit early when we reach 0
    if (!timeLeft) {
      setTimesUp(true);
      return;
    }

    // save intervalId to clear the interval when the
    // component re-renders
    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    // clear interval on re-render to avoid memory leaks
    return () => clearInterval(intervalId);
    // add timeLeft as a dependency to re-rerun the effect
    // when we update it
  }, [timeLeft]);

  const restartCountDown = (): void => {
    setTimesUp(false);
    setTimeLeft(seconds);
  };

  return { timeLeft, timesUp, restartCountDown };
};

export default useCountDownTimer;
