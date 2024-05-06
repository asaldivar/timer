"use client";

import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { padTime, secondsToMinutesAndSeconds } from "@/lib/utils";
import useTimerStore from "@/store/useTimeStore";
import { Check } from "lucide-react";

export function Toaster() {
  const { toasts } = useToast();
  const { seconds: storeSeconds, resetTimer, isComplete } = useTimerStore();
  const { minutes, seconds } = secondsToMinutesAndSeconds(storeSeconds);

  const description = `${padTime(minutes)}:${padTime(seconds)}`;

  return (
    <ToastProvider duration={Infinity}>
      {toasts.map(function ({ id, title, action, ...props }) {
        return (
          <Toast key={id} {...props}>
            <div className="grid gap-1">
              {title && (
                <ToastTitle
                  className={isComplete ? "text-green-400" : "#000000"}
                >
                  {title}
                </ToastTitle>
              )}
              {isComplete ? (
                <Check
                  size={20}
                  color="#4ade80"
                  className="animate-fade-in justify-self-center"
                />
              ) : (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose onClick={resetTimer} />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}
