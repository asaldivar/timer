import { Timer } from "@/components/Timer";
import { Toaster } from "@/components/ui/toaster";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-6 p-24 text-center">
      <div className="grid gap-3">
        <h3 className="text-4xl font-bold">Pomodoro Timer</h3>
        <p className="max-w-lg text-gray-500">
          Harness the power of 25-minute focused work intervals and let
          distractions fade away as you experience heightened focus and achieve
          your goals with ease.
        </p>
      </div>
      <Timer />
      <Toaster />
    </main>
  );
}
