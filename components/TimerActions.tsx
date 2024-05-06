import React, { useEffect } from "react";
import { Pause, Play } from "lucide-react";

import { Button } from "@/components/ui/button";
import useTimerStore, { Time } from "@/store/useTimeStore";

export const TimerActions = () => {
  const { seconds, isRunning, addTime, startTimer, pauseTimer, resetTimer } =
    useTimerStore();

  const handleAddMinute = () => {
    pauseTimer();
    addTime(60);
  };

  useEffect(() => {
    if (seconds >= 1500) {
      pauseTimer();
    }
  }, [seconds, pauseTimer]);

  return (
    <div className="flex-1 flex justify-between place-items-center">
      <Button
        variant="ghost"
        className="text-lg font-normal"
        onClick={handleAddMinute}
        disabled={seconds > Time.MaxSeconds - 60}
      >
        +1:00
      </Button>
      {isRunning ? (
        <Button size="icon" variant="outline" onClick={pauseTimer}>
          <Pause />
        </Button>
      ) : (
        <Button
          size="icon"
          variant="outline"
          onClick={startTimer}
          disabled={seconds === 0}
        >
          <Play />
        </Button>
      )}
      <Button
        variant="ghost"
        className="text-lg font-normal"
        onClick={resetTimer}
        disabled={seconds === 1500}
      >
        Reset
      </Button>
    </div>
  );
};
