import React, { useState, useEffect } from 'react';
import { Check, Flame, Award, Sparkles } from 'lucide-react';

const LABELS = {
  fr: {
    title: "Suivi d'Habitudes Intelligent",
    subtitle: "Recommandations personnalisées par l'IA",
    level: "NIVEAU 4",
    perfect: "Série parfaite hebdomadaire accomplie ! Recommandations IA mises à jour (+50 EXP).",
    note: "* Cliquez sur les jours de la semaine pour simuler votre routine et augmenter vos séries !",
    days: ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"],
    categories: {
      Mental: "Mental",
      Focus: "Focus",
      Santé: "Santé",
      Apprendre: "Apprendre"
    },
    habits: [
      { id: 1, name: "Méditer avec l'assistant IA", category: "Mental", streak: 5, days: [true, true, true, true, true, false, false] },
      { id: 2, name: "Séance Pomodoro de 25 min", category: "Focus", streak: 12, days: [true, true, true, true, true, true, false] },
      { id: 3, name: "Boire 2L d'eau pure", category: "Santé", streak: 8, days: [true, true, true, true, false, false, false] },
      { id: 4, name: "Lecture constructive (15 p.)", category: "Apprendre", streak: 3, days: [true, true, true, false, false, false, false] }
    ]
  },
  en: {
    title: "Smart Habit Tracker",
    subtitle: "Personalized recommendations by AI",
    level: "LEVEL 4",
    perfect: "Weekly perfect streak achieved! AI Recommendations updated (+50 EXP).",
    note: "* Click on weekdays to simulate your routine and increase your streaks!",
    days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    categories: {
      Mental: "Mental",
      Focus: "Focus",
      Santé: "Health",
      Apprendre: "Learn"
    },
    habits: [
      { id: 1, name: "Meditate with AI assistant", category: "Mental", streak: 5, days: [true, true, true, true, true, false, false] },
      { id: 2, name: "25 min Pomodoro session", category: "Focus", streak: 12, days: [true, true, true, true, true, true, false] },
      { id: 3, name: "Drink 2L pure water", category: "Santé", streak: 8, days: [true, true, true, true, false, false, false] },
      { id: 4, name: "Constructive reading (15 p.)", category: "Apprendre", streak: 3, days: [true, true, true, false, false, false, false] }
    ]
  },
  es: {
    title: "Seguimiento de Hábitos Inteligente",
    subtitle: "Recomendaciones personalizadas por la IA",
    level: "NIVEL 4",
    perfect: "¡Racha perfecta semanal completada! Recomendaciones de IA actualizadas (+50 EXP).",
    note: "* ¡Haga clic en los días de la semana para simular su rutina y aumentar sus rachas!",
    days: ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"],
    categories: {
      Mental: "Mental",
      Focus: "Enfoque",
      Santé: "Salud",
      Apprendre: "Aprender"
    },
    habits: [
      { id: 1, name: "Meditar con el asistente de IA", category: "Mental", streak: 5, days: [true, true, true, true, true, false, false] },
      { id: 2, name: "Sesión de Pomodoro de 25 min", category: "Focus", streak: 12, days: [true, true, true, true, true, true, false] },
      { id: 3, name: "Beber 2L de agua pura", category: "Santé", streak: 8, days: [true, true, true, true, false, false, false] },
      { id: 4, name: "Lectura constructiva (15 p.)", category: "Apprendre", streak: 3, days: [true, true, true, false, false, false, false] }
    ]
  },
  zh: {
    title: "智能习惯跟踪",
    subtitle: "由人工智能提供的个性化推荐",
    level: "等级 4",
    perfect: "达成每周完美连击！已更新人工智能推荐（+50 EXP）。",
    note: "* 点击工作日以模拟您的日常活动并增加连击！",
    days: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
    categories: {
      Mental: "心理",
      Focus: "专注",
      Santé: "健康",
      Apprendre: "学习"
    },
    habits: [
      { id: 1, name: "使用AI助手冥想", category: "Mental", streak: 5, days: [true, true, true, true, true, false, false] },
      { id: 2, name: "25分钟番茄钟会话", category: "Focus", streak: 12, days: [true, true, true, true, true, true, false] },
      { id: 3, name: "饮用2升纯净水", category: "Santé", streak: 8, days: [true, true, true, true, false, false, false] },
      { id: 4, name: "建设性阅读（15页）", category: "Apprendre", streak: 3, days: [true, true, true, false, false, false, false] }
    ]
  },
  it: {
    title: "Tracker di Abitudini Intelligente",
    subtitle: "Raccomandazioni personalizzate dall'IA",
    level: "LIVELLO 4",
    perfect: "Serie perfetta settimanale completata! Raccomandazioni IA aggiornate (+50 EXP).",
    note: "* Clicca sui giorni della settimana per simulare la tua routine e aumentare le tue serie!",
    days: ["Lun", "Mar", "Mer", "Gio", "Ven", "Sab", "Dom"],
    categories: {
      Mental: "Mentale",
      Focus: "Focus",
      Santé: "Salute",
      Apprendre: "Imparare"
    },
    habits: [
      { id: 1, name: "Meditare con l'assistente IA", category: "Mental", streak: 5, days: [true, true, true, true, true, false, false] },
      { id: 2, name: "Sessione Pomodoro di 25 min", category: "Focus", streak: 12, days: [true, true, true, true, true, true, false] },
      { id: 3, name: "Bere 2L di acqua pura", category: "Santé", streak: 8, days: [true, true, true, true, false, false, false] },
      { id: 4, name: "Lettura costruttiva (15 p.)", category: "Apprendre", streak: 3, days: [true, true, true, false, false, false, false] }
    ]
  },
  ru: {
    title: "Умный трекер привычек",
    subtitle: "Персональные рекомендации от ИИ",
    level: "УРОВЕНЬ 4",
    perfect: "Недельная серия выполнена! Рекомендации ИИ обновлены (+50 EXP).",
    note: "* Нажимайте на дни недели, чтобы симулировать рутину и увеличивать серии!",
    days: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"],
    categories: {
      Mental: "Ментальное",
      Focus: "Фокус",
      Santé: "Здоровье",
      Apprendre: "Обучение"
    },
    habits: [
      { id: 1, name: "Медитировать с ИИ-помощником", category: "Mental", streak: 5, days: [true, true, true, true, true, false, false] },
      { id: 2, name: "25-минутная сессия Pomodoro", category: "Focus", streak: 12, days: [true, true, true, true, true, true, false] },
      { id: 3, name: "Пить 2 л чистой воды", category: "Santé", streak: 8, days: [true, true, true, true, false, false, false] },
      { id: 4, name: "Полезное чтение (15 стр.)", category: "Apprendre", streak: 3, days: [true, true, true, false, false, false, false] }
    ]
  },
  uk: {
    title: "Розумний трекер звичок",
    subtitle: "Персоналізовані рекомендації від ШІ",
    level: "РІВЕНЬ 4",
    perfect: "Тижнева ідеальна серія виконана! Рекомендації ШІ оновлено (+50 EXP).",
    note: "* Натискайте на дні тижня, щоб симулювати рутину та збільшувати серії!",
    days: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Нд"],
    categories: {
      Mental: "Ментальні",
      Focus: "Фокус",
      Santé: "Здоров'я",
      Apprendre: "Навчання"
    },
    habits: [
      { id: 1, name: "Медітувати з ШІ-помічником", category: "Mental", streak: 5, days: [true, true, true, true, true, false, false] },
      { id: 2, name: "25-хвилинна сесія Pomodoro", category: "Focus", streak: 12, days: [true, true, true, true, true, true, false] },
      { id: 3, name: "Пити 2 л чистої води", category: "Santé", streak: 8, days: [true, true, true, true, false, false, false] },
      { id: 4, name: "Корисне читання (15 стор.)", category: "Apprendre", streak: 3, days: [true, true, true, false, false, false, false] }
    ]
  }
};

export default function HabitTrackerDemo({ lang = 'fr' }) {
  const labels = LABELS[lang] || LABELS.fr;
  const [habits, setHabits] = useState(labels.habits);

  // Sync state if language changes
  useEffect(() => {
    setHabits(labels.habits);
  }, [lang]);

  const toggleDay = (habitId, dayIndex) => {
    setHabits(habits.map(habit => {
      if (habit.id === habitId) {
        const newDays = [...habit.days];
        newDays[dayIndex] = !newDays[dayIndex];
        
        let newStreak = habit.streak;
        const wasChecked = habit.days[dayIndex];
        
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
            {labels.title}
          </h3>
          <p className="text-xs text-slate-400">{labels.subtitle}</p>
        </div>
        <div className="bg-violet-500/15 border border-violet-500/30 rounded-lg px-2.5 py-1 flex items-center gap-1">
          <Flame size={14} className="text-violet-400 animate-bounce" />
          <span className="text-[11px] font-black text-violet-300">{labels.level}</span>
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
                    {labels.categories[habit.category] || habit.category}
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
                {labels.days.map((day, idx) => {
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
                  {labels.perfect}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Tiny live note */}
      <p className="text-[10px] text-slate-500 text-center mt-5 select-none italic">
        {labels.note}
      </p>
    </div>
  );
}
