import React, { useState } from 'react';
import { Check, CheckCircle2, Flame, Award, Plus, Sparkles } from 'lucide-react';

const INITIAL_HABITS = [
  { id: 1, name: "Méditer avec l'assistant IA", category: "Mental", streak: 5, days: [true, true, true, true, true, false, false] },
  { id: 2, name: "Séance Pomodoro de 25 min", category: "Focus", streak: 12, days: [true, true, true, true, true, true, false] },
  { id: 3, name: "Boire 2L d'eau pure", category: "Santé", streak: 8, days: [true, true, true, true, false, false, false] },
  { id: 4, name: "Lecture constructive (15 p.)", category: "Apprendre", streak: 3, days: [true, true, true, false, false, false, false] }
];

const DAYS_OF_WEEK = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];

export default function HabitTrackerDemo() {
  const [habits, setHabits] = useState(INITIAL_HABITS);

  const toggleDay = (habitId, dayIndex) => {
    setHabits(habits.map(habit => {
      if (habit.id === habitId) {
        const newDays = [...habit.days];
        newDays[dayIndex] = !newDays[dayIndex];
        
        // Calculate new streak
        let newStreak = habit.streak;
        const wasChecked = habit.days[dayIndex];
        
        // If checked now, add 1. If unchecked, subtract 1 (clamp to 0)
        if (!wasChecked) {
          newStreak += 1;
        } else {
          newStreak = Math.max(0, newStreak - 1);
        }

        return { ...habit, days: newDays, streak: newStreak };
      }
      return habit;
    }));
  };

  return (
    <div className="glass-card rounded-2xl p-5 sm:p-6 w-full max-w-lg mx-auto relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-1.5">
            <Award size={18} className="text-pink-400 animate-pulse" />
            Suivi d'Habitudes Intelligent
          </h3>
          <p className="text-xs text-slate-400">Recommandations personnalisées par l'IA</p>
        </div>
        <div className="bg-violet-500/15 border border-violet-500/30 rounded-lg px-2.5 py-1 flex items-center gap-1">
          <Flame size={14} className="text-violet-400 animate-bounce" />
          <span className="text-[11px] font-black text-violet-300">NIVEAU 4</span>
        </div>
      </div>

      {/* Habits list */}
      <div className="space-y-4">
        {habits.map(habit => {
          const completedDaysCount = habit.days.filter(Boolean).length;
          const isFullyCompleted = completedDaysCount === 7;

          return (
            <div 
              key={habit.id} 
              className={`p-3.5 rounded-xl transition-all duration-300 ${
                isFullyCompleted 
                  ? 'bg-violet-950/20 border border-violet-500/30' 
                  : 'bg-white/5 border border-white/5 hover:border-white/10'
              }`}
            >
              {/* Habit details */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    habit.category === 'Focus' ? 'bg-cyan-500/20 text-cyan-300' :
                    habit.category === 'Mental' ? 'bg-violet-500/20 text-violet-300' :
                    habit.category === 'Santé' ? 'bg-emerald-500/20 text-emerald-300' :
                    'bg-pink-500/20 text-pink-300'
                  }`}>
                    {habit.category}
                  </span>
                  <h4 className="text-xs sm:text-sm font-semibold text-slate-200">{habit.name}</h4>
                </div>
                
                <div className="flex items-center gap-1 text-pink-400">
                  <Flame size={14} className="fill-current text-pink-500 animate-pulse" />
                  <span className="text-xs font-black">{habit.streak}j</span>
                </div>
              </div>

              {/* Weekly checkmarks grid */}
              <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
                {DAYS_OF_WEEK.map((day, idx) => {
                  const isChecked = habit.days[idx];
                  return (
                    <button
                      key={day}
                      onClick={() => toggleDay(habit.id, idx)}
                      aria-label={`Marquer ${day} comme accompli`}
                      className={`flex flex-col items-center py-2 rounded-lg border transition-all duration-300 select-none ${
                        isChecked
                          ? 'bg-gradient-to-br from-violet-600 to-pink-500 border-transparent text-white shadow-md'
                          : 'bg-black/20 border-white/5 hover:border-white/15 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <span className="text-[9px] uppercase font-bold tracking-tight mb-1 select-none">{day}</span>
                      <div className={`size-5 rounded-full flex items-center justify-center border transition-all duration-300 ${
                        isChecked 
                          ? 'bg-white/20 border-transparent' 
                          : 'bg-transparent border-slate-700'
                      }`}>
                        {isChecked && <Check size={10} strokeWidth={4} />}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Sparkles / Streak encouragement */}
              {isFullyCompleted && (
                <div className="flex items-center gap-1 text-[10px] text-pink-400 font-bold mt-2.5 animate-pulse">
                  <Sparkles size={12} />
                  Série parfaite hebdomadaire accomplie ! Recommandations IA mises à jour (+50 EXP).
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Tiny live note */}
      <p className="text-[10px] text-slate-500 text-center mt-5 select-none italic">
        * Cliquez sur les jours de la semaine pour simuler votre routine et augmenter vos séries !
      </p>
    </div>
  );
}
