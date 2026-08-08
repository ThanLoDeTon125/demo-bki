import { useEffect, useRef, useState } from "react";
import { Play, RotateCcw, Music, Music as MusicOff, Flower2, Thermometer } from "lucide-react";
import type { TeaRitualResultPayload } from "../data/ritiFarmContent";
import ProductHeader from "./ProductHeader";

function formatTime(totalSeconds: number): string {
  const m = Math.floor(totalSeconds / 60)
    .toString()
    .padStart(2, "0");
  const s = Math.floor(totalSeconds % 60)
    .toString()
    .padStart(2, "0");
  return `${m} : ${s}`;
}

export default function TeaRitualDisplay({ product, brewing, recipes }: TeaRitualResultPayload) {
  const [secondsLeft, setSecondsLeft] = useState(brewing.durationSeconds);
  const [isRunning, setIsRunning] = useState(false);
  const [musicOn, setMusicOn] = useState(false);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isRunning) return;

    intervalRef.current = window.setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          setIsRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
    };
  }, [isRunning]);

  const progress = 1 - secondsLeft / brewing.durationSeconds;
  const isDone = secondsLeft === 0;

  const handleStart = () => {
    if (isDone) setSecondsLeft(brewing.durationSeconds);
    setIsRunning(true);
  };

  const handleReset = () => {
    setIsRunning(false);
    setSecondsLeft(brewing.durationSeconds);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-white px-6 py-14">
      <div className="mx-auto max-w-4xl">
        <ProductHeader product={product} accentClassName="text-amber-700" />

        {/* Widget đếm giờ ủ trà */}
        <div className="animate-fade-in-up mx-auto max-w-md rounded-3xl border border-amber-200 bg-white p-8 text-center shadow-xl shadow-amber-100">
          <p className="mb-4 text-xs font-semibold uppercase tracking-wide text-amber-600">
            Bộ đếm giờ ủ trà
          </p>

          <div className="mb-4 flex items-center justify-center gap-6 text-sm text-slate-600">
            <span className="flex items-center gap-1.5">
              <Flower2 className="h-4 w-4 text-amber-500" />
              {brewing.flowerAmount}
            </span>
            <span className="flex items-center gap-1.5">
              <Thermometer className="h-4 w-4 text-amber-500" />
              {brewing.water}
            </span>
          </div>

          <div className="relative mx-auto mb-6 flex h-44 w-44 items-center justify-center">
            <svg className="absolute h-full w-full -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="44" fill="none" stroke="#fef3c7" strokeWidth="8" />
              <circle
                cx="50"
                cy="50"
                r="44"
                fill="none"
                stroke="#d97706"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={2 * Math.PI * 44}
                strokeDashoffset={2 * Math.PI * 44 * (1 - progress)}
                style={{ transition: "stroke-dashoffset 1s linear" }}
              />
            </svg>
            <span className="font-mono text-3xl font-bold text-amber-700">
              {formatTime(secondsLeft)}
            </span>
          </div>

          <div className="flex items-center justify-center gap-3">
            <button
              onClick={handleStart}
              disabled={isRunning}
              className={[
                "flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white shadow-md transition",
                isRunning ? "cursor-not-allowed bg-amber-300" : "bg-amber-600 hover:bg-amber-700",
              ].join(" ")}
            >
              <Play className="h-4 w-4" />
              {isDone ? "Ủ lại" : "Bắt đầu ủ trà"}
            </button>
            <button
              onClick={handleReset}
              className="flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
            >
              <RotateCcw className="h-4 w-4" />
              Đặt lại
            </button>
          </div>

          <button
            onClick={() => setMusicOn((v) => !v)}
            className="mt-5 inline-flex items-center gap-2 text-xs font-medium text-slate-400 transition hover:text-amber-600"
          >
            {musicOn ? <Music className="h-3.5 w-3.5" /> : <MusicOff className="h-3.5 w-3.5" />}
            {musicOn ? "Đang bật nhạc thiền tĩnh tâm" : "Bật nhạc thiền tĩnh tâm"}
          </button>
        </div>

        {/* Công thức pha trà */}
        <div className="mt-12">
          <h2 className="mb-4 text-center text-lg font-bold text-slate-900">
            4 cách pha trà cúc chuẩn vị cho ngày se lạnh 🌼☕
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {recipes.map((recipe) => (
              <div
                key={recipe.title}
                className="animate-fade-in-up rounded-2xl border border-amber-100 bg-white p-5 shadow-sm"
              >
                <p className="mb-1 font-bold text-slate-900">
                  {recipe.emoji} {recipe.title}
                </p>
                <p className="text-sm text-slate-600">
                  <span className="font-medium text-slate-800">Nguyên liệu: </span>
                  {recipe.ingredients}
                </p>
                <p className="mt-1 text-sm text-slate-600">
                  <span className="font-medium text-slate-800">Cách pha: </span>
                  {recipe.steps}
                </p>
                <p className="mt-2 rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-700">
                  💡 {recipe.tip}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
