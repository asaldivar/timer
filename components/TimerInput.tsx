"use client";

import React from "react";

import { cn, padTime, secondsToMinutesAndSeconds } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import useTimerStore, { Time } from "@/store/useTimeStore";

enum TimerInputs {
  MinMinutes = 0,
  MaxMinutes = 25,
  MinSeconds = 0,
  MaxSeconds = 59,
}

interface IDialogTimerInputProps {
  className?: string;
}

export const TimerInput: React.FC<IDialogTimerInputProps> = ({ className }) => {
  const { seconds: s, setTime, pauseTimer } = useTimerStore();
  const { minutes, seconds } = secondsToMinutesAndSeconds(s);

  const handleMinutesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newMinutes = parseInt(event.target.value ? event.target.value : "0");
    if (String(newMinutes).length > 2) return;

    if (newMinutes >= TimerInputs.MaxMinutes) {
      setTime(Time.MaxSeconds);
    } else {
      const { seconds } = secondsToMinutesAndSeconds(s);
      const minutesInSeconds = newMinutes * 60;
      setTime(minutesInSeconds + seconds);
    }
  };

  const handleSecondsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSeconds = parseInt(event.target.value ? event.target.value : "0");
    const { minutes } = secondsToMinutesAndSeconds(s);
    const minutesInSeconds = minutes * 60;

    if (String(newSeconds).length > 2) return;
    if (minutes === TimerInputs.MaxMinutes) {
      return setTime(Time.MaxSeconds);
    }
    if (newSeconds >= TimerInputs.MaxSeconds) {
      setTime(minutesInSeconds + TimerInputs.MaxSeconds);
    } else {
      setTime(minutesInSeconds + newSeconds);
    }
  };

  const handleBlur = () => {
    pauseTimer();
  };

  return (
    <div className={cn("flex place-items-center gap-1", className)}>
      <Input
        className="text-5xl	w-min p-0 text-center border-0 focus-visible:ring-transparent"
        type="number"
        id="minutes"
        name="minutes"
        min={TimerInputs.MinMinutes}
        max={TimerInputs.MaxMinutes}
        value={padTime(minutes)}
        onChange={handleMinutesChange}
        onFocus={handleBlur}
      />
      <span className="align-middle text-2xl">:</span>
      <Input
        className="text-5xl	w-min p-0 text-center border-0 focus-visible:ring-transparent"
        type="number"
        id="seconds"
        name="seconds"
        min={TimerInputs.MinSeconds}
        max={TimerInputs.MaxSeconds}
        value={padTime(seconds)}
        onChange={handleSecondsChange}
        onFocus={handleBlur}
      />
    </div>
  );
};
