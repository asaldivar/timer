"use client";

import { useEffect, useState } from "react";
import { Check } from "lucide-react";
import CircularSlider from "@fseehawer/react-circular-slider";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TimerInput } from "@/components/TimerInput";
import { TimerActions } from "@/components/TimerActions";
import { useToast } from "@/components/ui/use-toast";
import useTimerStore from "@/store/useTimeStore";
import { degreesToSeconds, secondsToDegrees } from "@/lib/utils";

export function Timer() {
  const { seconds, isRunning, pauseTimer, setTime, isComplete, resetTimer } =
    useTimerStore();
  const [degrees, setDegrees] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const { toast, dismiss } = useToast();

  useEffect(() => {
    const degrees = secondsToDegrees(seconds);
    setDegrees(degrees);
  }, [seconds]);

  const handleDialogChange = (isOpen: boolean) => {
    if (!isOpen && isRunning) {
      toast({
        title: "Timer",
        className:
          "top-0 right-0 flex fixed md:top-4 md:right-4 w-min p-8 text-center",
      });
    } else {
      dismiss();
    }
  };

  const handleRadialChange = (degrees: number) => {
    if (isDragging) {
      pauseTimer();
      const totalSeconds = degreesToSeconds(degrees);
      setTime(totalSeconds);
    }
  };

  return (
    <Dialog onOpenChange={handleDialogChange}>
      <DialogTrigger asChild>
        <Button size="lg" variant="outline" className="border-black">
          Focus
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="mb-4">
          <DialogTitle className="text-center">Pomodoro Timer</DialogTitle>
          <DialogDescription className="text-center">
            25 minute timer for optimal focus
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-center">
          <CircularSlider
            max={360}
            renderLabelValue={
              isComplete ? (
                <Check
                  size={64}
                  color="#4ade80"
                  className="animate-fade-in absolute z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                />
              ) : (
                <TimerInput className="absolute z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
              )
            }
            onChange={handleRadialChange}
            isDragging={setIsDragging}
            progressColorFrom="black"
            trackColor={isComplete ? "#4ade80" : "#eeeeee"}
            progressColorTo={isComplete ? "#4ade80" : "#000000"}
            knobColor={isComplete ? "#4ade80" : "#000000"}
            dataIndex={degrees}
          />
        </div>
        <DialogFooter>
          <TimerActions />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
