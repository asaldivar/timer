import { Time } from "@/store/useTimeStore";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function padTime(time: string | number) {
  return String(time).padStart(2, "0");
}

export function secondsToDegrees(seconds: number) {
  const totalSecondsInMinutes = Time.MaxSeconds;
  const proportion = seconds / totalSecondsInMinutes;
  const degrees = proportion * 360;
  return degrees;
}

export function degreesToSeconds(degrees: number) {
  const totalSecondsIn25Minutes = Time.MaxSeconds;
  const proportion = degrees / 360;
  const seconds = proportion * totalSecondsIn25Minutes;
  return Math.floor(seconds);
}

export function secondsToMinutesAndSeconds(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = Math.floor(totalSeconds % 60);
  return { minutes, seconds };
}
