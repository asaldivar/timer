import { create } from "zustand";

export enum Time {
  MinSeconds = 0,
  MaxSeconds = 1500,
  IntervalSeconds = 1000,
}

interface TimerStore {
  seconds: number;
  isRunning: boolean;
  isComplete: boolean;
  timerIntervalId: NodeJS.Timeout | null;

  setTime: (seconds: number) => void;
  addTime: (secondsToAdd: number) => void;
  startTimer: () => void;
  pauseTimer: () => void;
  resetTimer: () => void;
}

const useTimerStore = create<TimerStore>((set, get) => ({
  seconds: Time.MaxSeconds,
  isRunning: false,
  isComplete: false,
  timerIntervalId: null,

  setTime: (seconds: number) => set({ seconds, isComplete: false }),

  addTime: secondsToAdd => {
    const totalSeconds = get().seconds + secondsToAdd;
    const seconds =
      totalSeconds >= Time.MaxSeconds ? Time.MaxSeconds : totalSeconds;
    set({ seconds, isComplete: false });
  },

  startTimer: () => {
    set({ isRunning: true, isComplete: false });
    const timerIntervalId = setInterval(() => {
      set(state => {
        const seconds = state.seconds - 1;
        if (seconds === Time.MinSeconds) {
          state.pauseTimer();
          return { seconds, isComplete: true };
        } else {
          return { seconds };
        }
      });
    }, Time.IntervalSeconds);
    set({ timerIntervalId });
  },

  pauseTimer: () => {
    const timeIntervalId = get().timerIntervalId;
    if (timeIntervalId) {
      clearInterval(timeIntervalId);
    }
    set({ isRunning: false });
  },

  resetTimer: () => {
    const timeIntervalId = get().timerIntervalId;
    if (timeIntervalId) {
      clearInterval(timeIntervalId);
    }
    set({ seconds: Time.MaxSeconds, isRunning: false, isComplete: false });
  },
}));

export default useTimerStore;
