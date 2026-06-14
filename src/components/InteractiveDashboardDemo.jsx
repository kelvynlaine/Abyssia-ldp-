import React, { useState, useEffect } from 'react';
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

const LABELS = {
  fr: {
    headerTitle: "Abyss IA - Centre d'Analyses",
    headerSubtitle: "Tableau de bord de progression interactif",
    tabStats: "Statistiques",
    tabHabits: "Défis & EXP",
    chartTitle: "Heures de Focus cette semaine",
    chartSubtitle: "+15% vs Moyenne",
    detailPrefix: "Détails du ",
    aiBadge: "Recommandation IA",
    aiRecText: "Votre attention culmine à 15h. Prévoyez vos sessions de focus à cette heure pour maximiser l'attention.",
    totalFocus: "Temps focalisé total",
    dailyStreaks: "Séries quotidiennes",
    levelTitle: "NIVEAU ACTUEL",
    levelNames: ["Savant du Focus", "Maître de la Productivité"],
    progressSub: "Plus que {exp} EXP pour passer au Niveau 5",
    progressMax: "Niveau Max Démo !",
    dailyChallenges: "Défis quotidiens de l'IA",
    toastTitle: "NIVEAU SUPÉRIEUR ACCUMULÉ !",
    toastSub: "Félicitations, vous êtes passé Niveau 5 !",
    toastDesc: "Votre assistant IA Abyss a mis à jour vos défis et votre vitesse de recharge cognitive.",
    toastClose: "Fermer",
    note: "* Essayez le widget ! Sélectionnez des jours ou cochez des objectifs pour simuler la gamification.",
    suffixHours: "Heures",
    suffixDays: "Jours",
    weeklyData: [
      { day: "L", hrs: 4, label: "Lundi", details: "Début de semaine calme. 4 heures concentrées, principalement sur les tâches de routine." },
      { day: "M", hrs: 6, label: "Mardi", details: "Excellente régularité. 6 heures de focus. Session Pomodoro intense en fin d'après-midi." },
      { day: "M", hrs: 5, label: "Mercredi", details: "Planification de milieu de semaine. 5 heures. Session IA d'optimisation des objectifs." },
      { day: "J", hrs: 7, label: "Jeudi", details: "Pic d'attention optimal ! 7 heures. Utilisation maximale du créneau recommandé par l'IA (14h-16h30)." },
      { day: "V", hrs: 8, label: "Vendredi", details: "Productivité maximale ! 8 heures. Déblocage du succès hebdomadaire 'Productivité Élite'." },
      { day: "S", hrs: 3, label: "Samedi", details: "Journée de repos actif. 3 heures. Routine matinale complétée, détente l'après-midi." },
      { day: "D", hrs: 2, label: "Dimanche", details: "Préparation et planification. 2 heures. Revue hebdomadaire et ajustements de l'IA." }
    ],
    habits: [
      { id: 1, text: "Activer le focus Pomodoro Abyss IA", exp: 150, checked: false },
      { id: 2, text: "Compléter 3 tâches prioritaires", exp: 200, checked: false },
      { id: 3, text: "Faire 15 minutes de méditation cognitive", exp: 100, checked: false }
    ]
  },
  en: {
    headerTitle: "Abyss IA - Analytics Center",
    headerSubtitle: "Interactive progress dashboard",
    tabStats: "Statistics",
    tabHabits: "Challenges & EXP",
    chartTitle: "Focus Hours this week",
    chartSubtitle: "+15% vs Average",
    detailPrefix: "Details of ",
    aiBadge: "AI Recommendation",
    aiRecText: "Your focus peaks at 3:00 PM. Schedule your core tasks at this time to maximize concentration.",
    totalFocus: "Total Focus Time",
    dailyStreaks: "Daily Streaks",
    levelTitle: "CURRENT LEVEL",
    levelNames: ["Focus Scholar", "Absolute Productivity Master"],
    progressSub: "Only {exp} EXP left to reach Level 5",
    progressMax: "Demo Max Level reached!",
    dailyChallenges: "Daily AI Challenges",
    toastTitle: "LEVEL UP ACCUMULATED!",
    toastSub: "Congratulations, you reached Level 5!",
    toastDesc: "Your Abyss IA assistant has updated your challenges and cognitive recharge speeds.",
    toastClose: "Close",
    note: "* Try the widget! Select days or check off habits to simulate gamification.",
    suffixHours: "Hours",
    suffixDays: "Days",
    weeklyData: [
      { day: "M", hrs: 4, label: "Monday", details: "Calm start of the week. 4 hours focused, mostly on administrative tasks." },
      { day: "T", hrs: 6, label: "Tuesday", details: "Excellent consistency. 6 hours focused. Intensive Pomodoro session in late afternoon." },
      { day: "W", hrs: 5, label: "Wednesday", details: "Midweek planning. 5 hours. AI goals optimization session." },
      { day: "T", hrs: 7, label: "Thursday", details: "Optimal focus peak! 7 hours. Maximum use of the slot recommended by the AI (2-4:30 PM)." },
      { day: "F", hrs: 8, label: "Friday", details: "Maximum productivity! 8 hours. Unlocked 'Elite Productivity' weekly badge." },
      { day: "S", hrs: 3, label: "Saturday", details: "Active recovery. 3 hours. Morning routine completed, relaxation in afternoon." },
      { day: "S", hrs: 2, label: "Sunday", details: "Weekly review and planning. 2 hours. Review and AI routine adjustments." }
    ],
    habits: [
      { id: 1, text: "Activate Abyss IA Pomodoro focus", exp: 150, checked: false },
      { id: 2, text: "Complete 3 high priority tasks", exp: 200, checked: false },
      { id: 3, text: "Do 15 minutes of cognitive meditation", exp: 100, checked: false }
    ]
  },
  es: {
    headerTitle: "Abyss IA - Centro de Análisis",
    headerSubtitle: "Panel de progreso interactivo",
    tabStats: "Estadísticas",
    tabHabits: "Desafíos y EXP",
    chartTitle: "Horas de Enfoque esta semana",
    chartSubtitle: "+15% vs Promedio",
    detailPrefix: "Detalles del ",
    aiBadge: "Recomendación IA",
    aiRecText: "Su atención alcanza su punto máximo a las 15:00. Programe sus tareas clave en este horario para maximizar el enfoque.",
    totalFocus: "Tiempo total de enfoque",
    dailyStreaks: "Rachas diarias",
    levelTitle: "NIVEL ACTUAL",
    levelNames: ["Erudito del Enfoque", "Maestro Absoluto de Productividad"],
    progressSub: "Faltan {exp} EXP para llegar al Nivel 5",
    progressMax: "¡Nivel Máximo Demo!",
    dailyChallenges: "Desafíos diarios de IA",
    toastTitle: "¡NIVEL SUPERIOR ACUMULADO!",
    toastSub: "¡Felicidades, ha subido al Nivel 5!",
    toastDesc: "Su asistente Abyss IA ha actualizado sus desafíos y la velocidad de recarga cognitiva.",
    toastClose: "Cerrar",
    note: "* ¡Pruebe el widget! Seleccione días o marque metas para simular la gamificación.",
    suffixHours: "Horas",
    suffixDays: "Días",
    weeklyData: [
      { day: "L", hrs: 4, label: "Lunes", details: "Inicio de semana tranquilo. 4 horas enfocado, principalmente en tareas rutinarias." },
      { day: "M", hrs: 6, label: "Martes", details: "Excelente consistencia. 6 horas. Sesión Pomodoro intensa al final de la tarde." },
      { day: "M", hrs: 5, label: "Miércoles", details: "Planificación de mitad de semana. 5 horas. Sesión de optimización de objetivos por IA." },
      { day: "J", hrs: 7, label: "Jueves", details: "¡Pico de atención óptimo! 7 horas. Máximo uso del horario recomendado por IA (14h-16h30)." },
      { day: "V", hrs: 8, label: "Viernes", details: "¡Productividad máxima! 8 horas. Desbloqueo de insignia 'Productividad Élite'." },
      { day: "S", hrs: 3, label: "Sábado", details: "Recuperación activa. 3 horas. Rutina matutina completada, descanso por la tarde." },
      { day: "D", hrs: 2, label: "Domingo", details: "Revisión semanal y planificación. 2 horas. Ajustes de rutina por la IA." }
    ],
    habits: [
      { id: 1, text: "Activar el foco Pomodoro Abyss IA", exp: 150, checked: false },
      { id: 2, text: "Completar 3 tareas prioritarias", exp: 200, checked: false },
      { id: 3, text: "Hacer 15 minutos de meditación cognitiva", exp: 100, checked: false }
    ]
  },
  zh: {
    headerTitle: "Abyss IA - 分析中心",
    headerSubtitle: "交互式进度仪表板",
    tabStats: "数据统计",
    tabHabits: "挑战与 EXP",
    chartTitle: "本周专注时长",
    chartSubtitle: "比平均水平高出 15%",
    detailPrefix: "详情：",
    aiBadge: "人工智能建议",
    aiRecText: "您的注意力在下午 3:00 达到峰值。请在此时间安排您的核心任务，以最大程度地集中注意力。",
    totalFocus: "总专注时间",
    dailyStreaks: "每日连击",
    levelTitle: "当前等级",
    levelNames: ["专注学者", "绝对效率大师"],
    progressSub: "还需 {exp} EXP 即可升至 5 级",
    progressMax: "达到演示最高等级！",
    dailyChallenges: "每日人工智能挑战",
    toastTitle: "获得等级提升！",
    toastSub: "恭喜，您已升至 5 级！",
    toastDesc: "您的 Abyss IA 助手已更新您的挑战和认知恢复速度。",
    toastClose: "关闭",
    note: "* 试试这个小组件！选择日期或勾选习惯以模拟游戏化体验。",
    suffixHours: "小时",
    suffixDays: "天",
    weeklyData: [
      { day: "一", hrs: 4, label: "周一", details: "周一开始较为平静。专注了 4 小时，主要处理常规任务。" },
      { day: "二", hrs: 6, label: "周二", details: "极佳的稳定性。专注了 6 小时。傍晚进行了高强度的番茄钟会话。" },
      { day: "三", hrs: 5, label: "周三", details: "周中规划。专注了 5 小时。人工智能目标优化会话。" },
      { day: "四", hrs: 7, label: "周四", details: "最佳注意力峰值！专注了 7 小时。最大化利用了人工智能推荐的时段（下午 2 点至 4:30）。" },
      { day: "五", hrs: 8, label: "周五", details: "效率最大化！专注了 8 小时。解锁了“精英效率”每周徽章。" },
      { day: "六", hrs: 3, label: "周六", details: "积极恢复。专注了 3 小时。完成早间常规，下午放松。" },
      { day: "日", hrs: 2, label: "周日", details: "周度回顾与规划。专注了 2 小时。回顾并由人工智能进行常规调整。" }
    ],
    habits: [
      { id: 1, text: "激活 Abyss IA 番茄专注钟", exp: 150, checked: false },
      { id: 2, text: "完成 3 项高优先级任务", exp: 200, checked: false },
      { id: 3, text: "进行 15 分钟认知冥想", exp: 100, checked: false }
    ]
  },
  it: {
    headerTitle: "Abyss IA - Centro Analisi",
    headerSubtitle: "Dashboard di progressione interattiva",
    tabStats: "Statistiche",
    tabHabits: "Sfide & EXP",
    chartTitle: "Ore di Focus questa settimana",
    chartSubtitle: "+15% vs Media",
    detailPrefix: "Dettagli di ",
    aiBadge: "Raccomandazione IA",
    aiRecText: "La tua concentrazione raggiunge il picco alle 15:00. Pianifica le tue sessioni di focus a quest'ora per massimizzare l'attenzione.",
    totalFocus: "Tempo totale di focus",
    dailyStreaks: "Serie quotidiane",
    levelTitle: "LIVELLO ATTUALE",
    levelNames: ["Studioso del Focus", "Maestro della Produttività"],
    progressSub: "Ancora {exp} EXP per passare al Livello 5",
    progressMax: "Livello Max Demo raggiunto!",
    dailyChallenges: "Sfide quotidiane dell'IA",
    toastTitle: "LIVELLO AGGIUNTIVO RAGGIUNTO!",
    toastSub: "Congratulazioni, sei passato al Livello 5!",
    toastDesc: "Il tuo assistente IA Abyss ha aggiornato le tue sfide e la tua velocità di ricarica cognitiva.",
    toastClose: "Chiudi",
    note: "* Prova il widget! Seleziona i giorni o spunta gli obiettivi per simulare la gamification.",
    suffixHours: "Ore",
    suffixDays: "Giorni",
    weeklyData: [
      { day: "L", hrs: 4, label: "Lunedì", details: "Inizio settimana tranquillo. 4 ore concentrate, principalmente su compiti di routine." },
      { day: "M", hrs: 6, label: "Martedì", details: "Ottima regolarità. 6 ore di focus. Sessione Pomodoro intensa nel tardo pomeriggio." },
      { day: "M", hrs: 5, label: "Mercoledì", details: "Pianificazione a metà settimana. 5 ore. Sessione IA di ottimizzazione degli obiettivi." },
      { day: "G", hrs: 7, label: "Giovedì", details: "Picco di attenzione ottimale! 7 ore. Massimo utilizzo dello slot consigliato dall'IA (14:00-16:30)." },
      { day: "V", hrs: 8, label: "Venerdì", details: "Massima produttività! 8 ore. Sbloccato il badge settimanale 'Produttività Elite'." },
      { day: "S", hrs: 3, label: "Sabato", details: "Giorno di riposo attivo. 3 ore. Routine mattutina completata, relax nel pomeriggio." },
      { day: "D", hrs: 2, label: "Domenica", details: "Preparazione e pianificazione. 2 ore. Revisione settimanale e modifiche dell'IA." }
    ],
    habits: [
      { id: 1, text: "Attiva il focus Pomodoro Abyss IA", exp: 150, checked: false },
      { id: 2, text: "Completa 3 compiti prioritari", exp: 200, checked: false },
      { id: 3, text: "Fai 15 minuti di meditazione cognitiva", exp: 100, checked: false }
    ]
  },
  ru: {
    headerTitle: "Abyss IA - Центр аналитики",
    headerSubtitle: "Интерактивная панель прогресса",
    tabStats: "Статистика",
    tabHabits: "Испытания и EXP",
    chartTitle: "Часы фокуса на этой неделе",
    chartSubtitle: "+15% к среднему",
    detailPrefix: "Детали: ",
    aiBadge: "Рекомендация ИИ",
    aiRecText: "Ваша концентрация достигает пика в 15:00. Планируйте фокус-сессии на это время для максимальной эффективности.",
    totalFocus: "Всего времени фокуса",
    dailyStreaks: "Ежедневные серии",
    levelTitle: "ТЕКУЩИЙ УРОВЕНЬ",
    levelNames: ["Ученик фокуса", "Мастер продуктивности"],
    progressSub: "Осталось {exp} EXP до уровня 5",
    progressMax: "Максимальный уровень демо!",
    dailyChallenges: "Ежедневные испытания ИИ",
    toastTitle: "НОВЫЙ УРОВЕНЬ ДОСТИГНУТ!",
    toastSub: "Поздравляем, вы достигли 5-го уровня!",
    toastDesc: "Ваш ИИ-ассистент Abyss обновил ваши испытания и скорость когнитивной перезарядки.",
    toastClose: "Закрыть",
    note: "* Попробуйте виджет! Выбирайте дни недели или отмечайте задачи для симуляции геймификации.",
    suffixHours: "ч.",
    suffixDays: "дн.",
    weeklyData: [
      { day: "П", hrs: 4, label: "Понедельник", details: "Спокойное начало недели. 4 часа концентрации, в основном на рутинных задачах." },
      { day: "В", hrs: 6, label: "Вторник", details: "Отличная регулярность. 6 часов фокуса. Интенсивная сессия Pomodoro в конце дня." },
      { day: "С", hrs: 5, label: "Среда", details: "Планирование в середине недели. 5 часов. ИИ-сессия оптимизации целей." },
      { day: "Ч", hrs: 7, label: "Четверг", details: "Оптимальный пик концентрации! 7 часов. Максимальное использование рекомендованного ИИ времени (14:00-16:30)." },
      { day: "П", hrs: 8, label: "Пятница", details: "Максимальная продуктивность! 8 часов. Разблокировано еженедельное достижение 'Элитная продуктивность'." },
      { day: "С", hrs: 3, label: "Суббота", details: "Активный отдых. 3 часа. Утренняя рутина завершена, отдых во второй половине дня." },
      { day: "В", hrs: 2, label: "Воскресенье", details: "Подготовка и планирование. 2 часа. Еженедельный обзор и корректировки ИИ." }
    ],
    habits: [
      { id: 1, text: "Активировать фокус Pomodoro Abyss IA", exp: 150, checked: false },
      { id: 2, text: "Выполнить 3 приоритетные задачи", exp: 200, checked: false },
      { id: 3, text: "Сделать 15-минутную когнитивную медитацию", exp: 100, checked: false }
    ]
  },
  uk: {
    headerTitle: "Abyss IA - Центр аналітики",
    headerSubtitle: "Інтерактивна панель прогресу",
    tabStats: "Статистика",
    tabHabits: "Випробування та EXP",
    chartTitle: "Години фокусу цього тижня",
    chartSubtitle: "+15% до середнього",
    detailPrefix: "Деталі: ",
    aiBadge: "Рекомендація ШІ",
    aiRecText: "Ваша концентрація досягає піку о 15:00. Плануйте сесії фокусу на цей час для максимальної ефективності.",
    totalFocus: "Всього часу фокусу",
    dailyStreaks: "Щоденні серії",
    levelTitle: "ПОТОЧНИЙ РІВЕНЬ",
    levelNames: ["Учень фокусу", "Майстер продуктивності"],
    progressSub: "Залишилося {exp} EXP до рівня 5",
    progressMax: "Максимальний рівень демо!",
    dailyChallenges: "Щоденні випробування ШІ",
    toastTitle: "НОВИЙ РІВЕНЬ ДОСЯГНУТО!",
    toastSub: "Вітаємо, ви досягли 5-го рівня!",
    toastDesc: "Ваш ШІ-асистент Abyss оновив ваші випробування та швидкість когнітивного відновлення.",
    toastClose: "Закрити",
    note: "* Спробуйте віджет! Вибирайте дні тижня або відзначайте цілі для симуляції гейміфікації.",
    suffixHours: "год.",
    suffixDays: "дн.",
    weeklyData: [
      { day: "П", hrs: 4, label: "Понеділок", details: "Спокійний початок тижня. 4 години концентрації, переважно на рутинних завданнях." },
      { day: "В", hrs: 6, label: "Вівторок", details: "Відмінна регулярність. 6 годин фокусу. Інтенсивна сесія Pomodoro наприкінці дня." },
      { day: "С", hrs: 5, label: "Середа", details: "Планування в середині тижня. 5 годин. ШІ-сесія оптимізації цілей." },
      { day: "Ч", hrs: 7, label: "Четвер", details: "Оптимальний пик концентрації! 7 годин. Максимальне використання рекомендованого ШІ часу (14:00-16:30)." },
      { day: "П", hrs: 8, label: "П'ятниця", details: "Максимальна продуктивність! 8 годин. Розблоковано щотижневе досягнення 'Елітна продуктивність'." },
      { day: "С", hrs: 3, label: "Субота", details: "Активний відпочинок. 3 години. Ранкову рутину завершено, відпочинок у другій половині дня." },
      { day: "Н", hrs: 2, label: "Неділя", details: "Підготовка та планування. 2 години. Щотижневий огляд та коригування ШІ." }
    ],
    habits: [
      { id: 1, text: "Активувати фокус Pomodoro Abyss IA", exp: 150, checked: false },
      { id: 2, text: "Виконати 3 пріоритетні завдання", exp: 200, checked: false },
      { id: 3, text: "Зробити 15-хвилинну когнітивну медитацію", exp: 100, checked: false }
    ]
  }
};

export default function InteractiveDashboardDemo({ lang = 'fr' }) {
  const labels = LABELS[lang] || LABELS.fr;

  const [activeTab, setActiveTab] = useState('stats'); // 'stats' | 'habits'
  const [selectedDayIdx, setSelectedDayIdx] = useState(4); // Friday
  const [habits, setHabits] = useState(labels.habits);
  const [currentExp, setCurrentExp] = useState(720);
  const [level, setLevel] = useState(4);
  const [showLevelUpToast, setShowLevelUpToast] = useState(false);

  // Sync state when language changes
  useEffect(() => {
    setHabits(labels.habits);
  }, [lang]);

  const selectedDay = labels.weeklyData[selectedDayIdx] || labels.weeklyData[0];

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
          newExp = 1000; // Cap
        }

        setCurrentExp(newExp);
        setLevel(newLevel);
        
        return { ...habit, checked: nextChecked };
      }
      return habit;
    }));
  };

  const totalWeeklyHours = labels.weeklyData.reduce((sum, item) => sum + item.hrs, 0);

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
          <h4 className="text-xl font-black text-white text-center">{labels.toastTitle}</h4>
          <p className="text-sm text-pink-400 font-bold mb-2 animate-pulse">{labels.toastSub}</p>
          <p className="text-xs text-slate-400 text-center max-w-xs leading-relaxed">
            {labels.toastDesc}
          </p>
          <button 
            onClick={() => setShowLevelUpToast(false)}
            className="mt-4 px-4 py-1.5 bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-bold text-white rounded-lg transition-all duration-300"
          >
            {labels.toastClose}
          </button>
        </div>
      )}

      {/* Widget Header & Navigation Tabs */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pb-5 border-b border-white/5 mb-5">
        <div>
          <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-1.5">
            <Sparkles size={16} className="text-pink-500 animate-pulse" />
            {labels.headerTitle}
          </h3>
          <p className="text-xs text-slate-500 font-medium">{labels.headerSubtitle}</p>
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
            {labels.tabStats}
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
            {labels.tabHabits}
          </button>
        </div>
      </div>

      {/* TAB CONTENT: STATS */}
      {activeTab === 'stats' && (
        <div className="space-y-5 animate-fade-in">
          {/* Main Chart Card */}
          <div className="bg-black/30 border border-white/5 rounded-2xl p-4">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] uppercase tracking-wider font-extrabold text-slate-500">{labels.chartTitle}</span>
              <span className="text-[11px] font-bold text-violet-400 bg-violet-500/10 px-2 py-0.5 rounded-full flex items-center gap-1">
                <TrendingUp size={10} /> {labels.chartSubtitle}
              </span>
            </div>

            {/* Simulated Bar Chart */}
            <div className="flex items-end justify-between gap-2.5 h-36 pt-2 pb-2 border-b border-white/5">
              {labels.weeklyData.map((item, idx) => {
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

            {/* Daily detail pane */}
            <div className="pt-3 min-h-[4rem] transition-all duration-300">
              <span className="text-[9px] uppercase tracking-wider font-extrabold text-pink-400 block mb-0.5">
                {labels.detailPrefix}{selectedDay.label}
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
                <span className="text-[9px] uppercase tracking-widest font-black text-cyan-400">{labels.aiBadge}</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                {labels.aiRecText}
              </p>
            </div>

            {/* Quick summary totals */}
            <div className="bg-black/30 border border-white/5 rounded-2xl p-4 flex flex-col justify-between">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>{labels.totalFocus}</span>
                <span className="font-extrabold text-white flex items-center gap-1">
                  <Flame size={12} className="text-pink-500 fill-current animate-pulse" />
                  {totalWeeklyHours} {labels.suffixHours}
                </span>
              </div>
              <div className="h-px bg-white/5 my-2" />
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>{labels.dailyStreaks}</span>
                <span className="font-extrabold text-pink-400 flex items-center gap-1">
                  <Flame size={12} className="fill-current text-pink-500" />
                  15 {labels.suffixDays}
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
                  <span className="text-[9px] uppercase tracking-wider font-extrabold text-slate-500 block">{labels.levelTitle}</span>
                  <span className="text-xs font-black text-white">
                    {level === 4 ? labels.levelNames[0] : labels.levelNames[1]}
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
              <span>{labels.suffixHours} {level}</span>
              {level === 4 ? (
                <span>{labels.progressSub.replace("{exp}", 1000 - currentExp)}</span>
              ) : (
                <span className="text-yellow-400 font-bold flex items-center gap-1">
                  <Star size={10} className="fill-current" /> {labels.progressMax}
                </span>
              )}
            </div>
          </div>

          {/* Interactive challenges checklist */}
          <div className="space-y-2.5">
            <span className="text-[10px] uppercase tracking-wider font-extrabold text-slate-500 block">{labels.dailyChallenges}</span>
            
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
        {labels.note}
      </p>

    </div>
  );
}
