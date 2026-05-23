import React, { useState } from 'react';
import { 
  BarChart3, 
  Brain, 
  CheckCircle2, 
  Flame, 
  Star, 
  Zap, 
  Check, 
  Award, 
  TrendingUp, 
  Sparkles 
} from 'lucide-react';

const WEEKLY_DATA = [
  { day: "L", hrs: 4, label: "Lundi", details: "Début de semaine calme. 4 heures concentrées, principalement sur les tâches de routine." },
  { day: "M", hrs: 6, label: "Mardi", details: "Excellente régularité. 6 heures de focus. Session Pomodoro intense en fin d'après-midi." },
  { day: "M", hrs: 5, label: "Mercredi", details: "Planification de milieu de semaine. 5 heures. Session IA d'optimisation des objectifs." },
  { day: "J", hrs: 7, label: "Jeudi", details: "Pic d'attention optimal ! 7 heures. Utilisation maximale du créneau recommandé par l'IA (14h-16h30)." },
  { day: "V", hrs: 8, label: "Vendredi", details: "Productivité maximale ! 8 heures. Déblocage du succès hebdomadaire 'Productivité Élite'." },
  { day: "S", hrs: 3, label: "Samedi", details: "Journée de repos actif. 3 heures. Routine matinale complétée, détente l'après-midi." },
  { day: "D", hrs: 2, label: "Dimanche", details: "Préparation et planification. 2 heures. Revue hebdomadaire et ajustements de l'IA." }
];

const INITIAL_HABITS = [
  { id: 1, text: "Activer le focus Pomodoro Abyss IA", exp: 150, checked: false },
  { id: 2, text: "Compléter 3 tâches prioritaires", exp: 200, checked: false },
  { id: 3, text: "Faire 15 minutes de méditation cognitive", exp: 100, checked: false }
];

export default function InteractiveDashboardDemo() {
  const [activeTab, setActiveTab] = useState('stats'); // 'stats' | 'habits'
  const [selectedDayIdx, setSelectedDayIdx] = useState(4); // Default to Friday (Vendredi, index 4)
  const [habits, setHabits] = useState(INITIAL_HABITS);
  const [currentExp, setCurrentExp] = useState(720); // Out of 1000 for Level 4
  const [level, setLevel] = useState(4);
  const [showLevelUpToast, setShowLevelUpToast] = useState(false);

  const selectedDay = WEEKLY_DATA[selectedDayIdx];

  const handleToggleHabit = (id) => {
    setHabits(habits.map(habit => {
      if (habit.id === id) {
        const nextChecked = !habit.checked;
        const expDiff = nextChecked ? habit.exp : -habit.exp;
        
        let newExp = currentExp + expDiff;
        let newLevel = level;
        
        if (newExp >= 1000 && level === 4) {
          newLevel = 5;
          newExp = newExp - 1000;
          setShowLevelUpToast(true);
          setTimeout(() => setShowLevelUpToast(false), 4000);
        } else if (newExp < 0 && level === 5) {
          newLevel = 4;
          newExp = 1000 + newExp;
        } else if (newExp < 0) {
          newExp = 0;
        } else if (newExp >= 1000 && level === 5) {
          newExp = 1000; // Cap for demo
        }

        setCurrentExp(newExp);
        setLevel(newLevel);
        
        return { ...habit, checked: nextChecked };
      }
      return habit;
    }));
  };

  const totalWeeklyHours = WEEKLY_DATA.reduce((sum, item) => sum + item.hrs, 0);

  return (
    <div className="w-full flex flex-col bg-black/40 border border-white/10 rounded-3xl p-5 sm:p-6 shadow-2xl relative overflow-hidden transition-all duration-300 hover:border-pink-500/20 backdrop-blur-md">
      
      {/* Background glow effects */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-pink-500/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Level Up Banner Overlay */}
      {showLevelUpToast && (
        <div className="absolute inset-0 bg-black/90 z-20 flex flex-col items-center justify-center p-4 animate-fade-in">
          <div className="size-16 rounded-full bg-gradient-to-r from-pink-500 to-violet-600 flex items-center justify-center shadow-[0_0_20px_rgba(236,72,153,0.5)] animate-bounce mb-3">
            <Award size={32} className="text-white" />
          </div>
          <h4 className="text-xl font-black text-white text-center">NIVEAU SUPÉRIEUR ACCUMULÉ !</h4>
          <p className="text-sm text-pink-400 font-bold mb-2 animate-pulse">Félicitations, vous êtes passé Niveau 5 !</p>
          <p className="text-xs text-slate-400 text-center max-w-xs leading-relaxed">
            Votre assistant IA Abyss a mis à jour vos défis et votre vitesse de recharge cognitive.
          </p>
          <button 
            onClick={() => setShowLevelUpToast(false)}
            className="mt-4 px-4 py-1.5 bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-bold text-white rounded-lg transition-all duration-300"
          >
            Fermer
          </button>
        </div>
      )}

      {/* Widget Header & Navigation Tabs */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pb-5 border-b border-white/5 mb-5">
        <div>
          <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-1.5">
            <Sparkles size={16} className="text-pink-500 animate-pulse" />
            Abyss IA - Centre d'Analyses
          </h3>
          <p className="text-xs text-slate-500 font-medium">Tableau de bord de progression interactif</p>
        </div>
        
        {/* Navigation Tabs */}
        <div className="flex bg-slate-900/60 p-1 rounded-xl border border-white/5 self-start sm:self-auto">
          <button
            onClick={() => setActiveTab('stats')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-300 ${
              activeTab === 'stats'
                ? 'bg-gradient-to-r from-pink-500/20 to-violet-500/20 text-white border border-pink-500/30'
                : 'text-slate-400 hover:text-slate-200 border border-transparent'
            }`}
          >
            <BarChart3 size={14} />
            Statistiques
          </button>
          <button
            onClick={() => setActiveTab('habits')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-300 ${
              activeTab === 'habits'
                ? 'bg-gradient-to-r from-pink-500/20 to-violet-500/20 text-white border border-pink-500/30'
                : 'text-slate-400 hover:text-slate-200 border border-transparent'
            }`}
          >
            <CheckCircle2 size={14} />
            Défis & EXP
          </button>
        </div>
      </div>

      {/* TAB CONTENT: STATS */}
      {activeTab === 'stats' && (
        <div className="space-y-5 animate-fade-in">
          {/* Main Chart Card */}
          <div className="bg-black/30 border border-white/5 rounded-2xl p-4">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] uppercase tracking-wider font-extrabold text-slate-500">Heures de Focus cette semaine</span>
              <span className="text-[11px] font-bold text-violet-400 bg-violet-500/10 px-2 py-0.5 rounded-full flex items-center gap-1">
                <TrendingUp size={10} /> +15% vs Moyenne
              </span>
            </div>

            {/* Simulated Bar Chart */}
            <div className="flex items-end justify-between gap-2.5 h-36 pt-2 pb-2 border-b border-white/5">
              {WEEKLY_DATA.map((item, idx) => {
                const isSelected = selectedDayIdx === idx;
                const percent = (item.hrs / 8) * 100 + "%";
                return (
                  <button 
                    key={idx} 
                    onClick={() => setSelectedDayIdx(idx)}
                    className="flex-1 flex flex-col items-center gap-2 group/bar focus:outline-none"
                  >
                    <span className={`text-[10px] font-mono font-bold transition-all duration-300 ${
                      isSelected ? 'text-pink-400 scale-110' : 'text-slate-500 group-hover/bar:text-slate-300'
                    }`}>
                      {item.hrs}h
                    </span>
                    <div className="w-full bg-slate-900/60 rounded-lg h-24 flex items-end overflow-hidden border border-white/5">
                      <div 
                        style={{ height: percent }} 
                        className={`w-full rounded-t-md transition-all duration-500 ${
                          isSelected 
                            ? 'bg-gradient-to-t from-pink-500 to-violet-600 shadow-[0_0_12px_rgba(236,72,153,0.4)]' 
                            : 'bg-slate-700 group-hover/bar:bg-slate-600'
                        }`} 
                      />
                    </div>
                    <span className={`text-xs font-black transition-colors ${
                      isSelected ? 'text-pink-400' : 'text-slate-500 group-hover/bar:text-slate-300'
                    }`}>{item.day}</span>
                  </button>
                );
              })}
            </div>

            {/* Daily detail pane updating on selectedDay state */}
            <div className="pt-3 min-h-[4rem] transition-all duration-300">
              <span className="text-[9px] uppercase tracking-wider font-extrabold text-pink-400 block mb-0.5">
                Détails du {selectedDay.label}
              </span>
              <p className="text-xs text-slate-300 leading-relaxed italic">
                "{selectedDay.details}"
              </p>
            </div>
          </div>

          {/* AI Insights & Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* AI Recommendation */}
            <div className="bg-gradient-to-br from-cyan-500/5 to-emerald-500/5 border border-cyan-500/10 rounded-2xl p-4 flex flex-col gap-2 relative overflow-hidden group hover:border-cyan-400/30 transition-all duration-300">
              <div className="absolute top-0 right-0 w-16 h-16 bg-cyan-500/5 rounded-full blur-xl pointer-events-none" />
              <div className="flex items-center gap-1.5">
                <Brain size={14} className="text-cyan-400" />
                <span className="text-[9px] uppercase tracking-widest font-black text-cyan-400">Recommandation IA</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Votre attention culmine à <strong className="text-white">15h</strong>. Prévoyez vos sessions de focus à cette heure pour maximiser l'attention.
              </p>
            </div>

            {/* Quick summary totals */}
            <div className="bg-black/30 border border-white/5 rounded-2xl p-4 flex flex-col justify-between">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Temps focalisé total</span>
                <span className="font-extrabold text-white flex items-center gap-1">
                  <Flame size={12} className="text-pink-500 fill-current animate-pulse" />
                  {totalWeeklyHours} Heures
                </span>
              </div>
              <div className="h-px bg-white/5 my-2" />
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Séries quotidiennes</span>
                <span className="font-extrabold text-pink-400 flex items-center gap-1">
                  <Flame size={12} className="fill-current text-pink-500" />
                  15 Jours
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: HABITS */}
      {activeTab === 'habits' && (
        <div className="space-y-5 animate-fade-in">
          
          {/* Level Progress bar card */}
          <div className="bg-black/30 border border-white/5 rounded-2xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="size-8 rounded-xl bg-violet-600/10 border border-violet-500/20 flex items-center justify-center text-violet-400 font-extrabold text-sm shadow-inner">
                  {level}
                </div>
                <div>
                  <span className="text-[9px] uppercase tracking-wider font-extrabold text-slate-500 block">NIVEAU ACTUEL</span>
                  <span className="text-xs font-black text-white">
                    {level === 4 ? "Savant du Focus" : "Maître Absolu de la Productivité"}
                  </span>
                </div>
              </div>
              <span className="text-xs font-black text-violet-400">{currentExp} / 1000 EXP</span>
            </div>

            {/* EXP bar */}
            <div className="w-full bg-slate-900/80 h-2.5 rounded-full overflow-hidden p-[1px] border border-white/5">
              <div 
                style={{ width: `${(currentExp / 1000) * 100}%` }}
                className="bg-gradient-to-r from-violet-600 via-pink-500 to-yellow-400 h-full rounded-full transition-all duration-700 shadow-[0_0_8px_rgba(236,72,153,0.3)]" 
              />
            </div>
            <div className="flex justify-between items-center text-[10px] text-slate-500 font-medium">
              <span>Niveau {level}</span>
              {level === 4 ? (
                <span>Plus que {1000 - currentExp} EXP pour passer au Niveau 5</span>
              ) : (
                <span className="text-yellow-400 font-bold flex items-center gap-1">
                  <Star size={10} className="fill-current" /> Niveau Max Démo !
                </span>
              )}
            </div>
          </div>

          {/* Interactive challenges checklist */}
          <div className="space-y-2.5">
            <span className="text-[10px] uppercase tracking-wider font-extrabold text-slate-500 block">Défis quotidiens de l'IA</span>
            
            {habits.map((habit) => (
              <button
                key={habit.id}
                onClick={() => handleToggleHabit(habit.id)}
                className={`w-full flex items-center justify-between p-3.5 rounded-xl border text-left transition-all duration-300 focus:outline-none ${
                  habit.checked 
                    ? 'bg-violet-950/20 border-violet-500/30 text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]' 
                    : 'bg-white/3 border-white/5 hover:border-white/10 text-slate-300 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3 pr-2">
                  <div className={`size-5 rounded-lg flex items-center justify-center border transition-all duration-300 ${
                    habit.checked 
                      ? 'bg-gradient-to-br from-pink-500 to-violet-500 border-transparent text-white' 
                      : 'bg-transparent border-slate-700'
                  }`}>
                    {habit.checked ? <Check size={12} strokeWidth={4} /> : null}
                  </div>
                  <span className={`text-xs font-semibold ${habit.checked ? 'line-through text-slate-500' : ''}`}>
                    {habit.text}
                  </span>
                </div>
                
                <span className={`text-[10px] font-black shrink-0 px-2 py-0.5 rounded-md transition-all duration-300 ${
                  habit.checked 
                    ? 'bg-slate-800 text-slate-400' 
                    : 'bg-pink-500/10 text-pink-400 border border-pink-500/20 group-hover:bg-pink-500/20'
                }`}>
                  +{habit.exp} EXP
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Footer tiny notice */}
      <p className="text-[10px] text-slate-500 text-center mt-5 italic select-none">
        * Essayez le widget ! {activeTab === 'stats' ? 'Sélectionnez des jours' : 'Cochez des objectifs'} pour simuler la gamification d'Abyss IA.
      </p>

    </div>
  );
}
