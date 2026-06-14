import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Flame, Coffee, Moon } from 'lucide-react';

const LABELS = {
  fr: {
    work: "Focus Work",
    break: "Pause Récup",
    workTitle: "Temps de travail",
    breakTitle: "Pause détente",
    note: "* Essayez le chronomètre ! Ce composant est 100% interactif."
  },
  en: {
    work: "Focus Work",
    break: "Rest Break",
    workTitle: "Work time",
    breakTitle: "Rest time",
    note: "* Try the timer! This component is 100% interactive."
  },
  es: {
    work: "Focus Trabajo",
    break: "Descanso Corto",
    workTitle: "Tiempo de trabajo",
    breakTitle: "Tiempo de descanso",
    note: "* ¡Pruebe el cronómetro! Este componente es 100% interactivo."
  },
  zh: {
    work: "专注工作",
    break: "休息放松",
    workTitle: "工作时间",
    breakTitle: "休息时间",
    note: "* 试试计时器！此组件是100%互动的。"
  },
  it: {
    work: "Lavoro Focalizzato",
    break: "Pausa Recupero",
    workTitle: "Tempo di lavoro",
    breakTitle: "Tempo di pausa",
    note: "* Prova il timer! Questo componente è al 100% interattivo."
  },
  ru: {
    work: "Фокус-работа",
    break: "Перерыв",
    workTitle: "Время работы",
    breakTitle: "Время отдыха",
    note: "* Попробуйте таймер! Этот компонент полностью интерактивен."
  },
  uk: {
    work: "Фокус-робота",
    break: "Перерва",
    workTitle: "Час роботи",
    breakTitle: "Час відпочинку",
    note: "* Спробуйте таймер! Цей компонент повністю інтерактивний."
  }
};

export default function PomodoroDemo({ lang = 'fr' }) {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState('work'); // 'work' or 'break'

  const labels = LABELS[lang] || LABELS.fr;

  useEffect(() => {
    let interval = null;

    if (isActive) {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            // Timer finished! Toggle mode
            if (mode === 'work') {
              setMode('break');
              setMinutes(5);
            } else {
              setMode('work');
              setMinutes(25);
            }
            setIsActive(false);
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive, minutes, seconds, mode]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    if (mode === 'work') {
      setMinutes(25);
    } else {
      setMinutes(5);
    }
    setSeconds(0);
  };

  const setTimerMode = (newMode) => {
    setIsActive(false);
    setMode(newMode);
    setMinutes(newMode === 'work' ? 25 : 5);
    setSeconds(0);
  };

  const progress = mode === 'work' 
    ? ((25 * 60 - (minutes * 60 + seconds)) / (25 * 60)) * 100
    : ((5 * 60 - (minutes * 60 + seconds)) / (5 * 60)) * 100;

  return (
    <div className="glass-card rounded-2xl p-6 sm:p-8 flex flex-col items-center justify-center max-w-sm w-full mx-auto relative overflow-hidden">
      {/* Decorative background glow */}
      <div className={`absolute -inset-10 opacity-10 blur-3xl pointer-events-none transition-all duration-700 ${
        mode === 'work' ? 'bg-violet-600' : 'bg-cyan-500'
      }`} />

      {/* Header buttons */}
      <div className="flex gap-2 mb-6 z-10">
        <button
          onClick={() => setTimerMode('work')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 ${
            mode === 'work'
              ? 'bg-violet-500/20 text-violet-300 border border-violet-500/40'
              : 'bg-white/5 text-slate-400 border border-transparent hover:bg-white/10'
          }`}
        >
          <Flame size={14} className={mode === 'work' ? 'animate-pulse text-violet-400' : ''} />
          {labels.work}
        </button>
        <button
          onClick={() => setTimerMode('break')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 ${
            mode === 'break'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
              : 'bg-white/5 text-slate-400 border border-transparent hover:bg-white/10'
          }`}
        >
          <Coffee size={14} className={mode === 'break' ? 'animate-bounce text-cyan-400' : ''} />
          {labels.break}
        </button>
      </div>

      {/* Circular Progress & Display */}
      <div className="relative size-48 sm:size-52 flex items-center justify-center mb-6 z-10">
        {/* Outer Ring Circle */}
        <svg className="absolute inset-0 size-full -rotate-90">
          <circle
            cx="50%"
            cy="50%"
            r="44%"
            className="stroke-slate-800 fill-none"
            strokeWidth="6"
          />
          <circle
            cx="50%"
            cy="50%"
            r="44%"
            className={`fill-none transition-all duration-1000 ${
              mode === 'work' ? 'stroke-violet-500' : 'stroke-cyan-400'
            }`}
            strokeWidth="6"
            strokeDasharray="276"
            strokeDashoffset={276 - (276 * progress) / 100}
            strokeLinecap="round"
          />
        </svg>

        {/* Counter UI */}
        <div className="flex flex-col items-center">
          <span className="text-4xl sm:text-5xl font-black font-mono tracking-wider tabular-nums text-white">
            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
          </span>
          <span className="text-[10px] tracking-widest uppercase font-bold text-slate-400 mt-2">
            {mode === 'work' ? labels.workTitle : labels.breakTitle}
          </span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-4 z-10">
        <button
          onClick={resetTimer}
          aria-label="Réinitialiser"
          className="size-11 flex items-center justify-center rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 text-slate-300 hover:text-white transition-all duration-300"
        >
          <RotateCcw size={18} />
        </button>

        <button
          onClick={toggleTimer}
          aria-label={isActive ? 'Pause' : 'Play'}
          className={`size-14 flex items-center justify-center rounded-full shadow-lg transition-all duration-300 scale-100 hover:scale-105 ${
            mode === 'work'
              ? 'bg-gradient-to-r from-violet-600 to-pink-500 hover:shadow-violet-500/20 text-white'
              : 'bg-gradient-to-r from-cyan-500 to-emerald-500 hover:shadow-cyan-500/20 text-white'
          }`}
        >
          {isActive ? <Pause size={24} className="fill-current" /> : <Play size={24} className="fill-current translate-x-0.5" />}
        </button>

        <div className="size-11 flex items-center justify-center rounded-full bg-white/5 border border-transparent text-slate-500">
          <Moon size={18} />
        </div>
      </div>

      {/* Tiny live note */}
      <p className="text-[10px] text-slate-500 text-center mt-6 select-none italic">
        {labels.note}
      </p>
    </div>
  );
}
