import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

const MOCKUP_CATEGORIES = {
  fr: [
    {
      title: "Tableau de Bord",
      tag: "IA Hub",
      description: "Votre centre de pilotage intelligent unifié avec vos scores et tâches prioritaires.",
      images: [
        "/mockups/WhatsApp Image 2026-05-24 at 00.26.59.jpeg",
        "/mockups/WhatsApp Image 2026-05-24 at 00.26.59 (1).jpeg",
        "/mockups/WhatsApp Image 2026-05-24 at 00.26.59 (2).jpeg"
      ]
    },
    {
      title: "Gestion de Tâches",
      tag: "Tâches IA",
      description: "Génération automatique et découpage de vos tâches par l'intelligence artificielle.",
      images: [
        "/mockups/WhatsApp Image 2026-05-24 at 00.27.00.jpeg",
        "/mockups/WhatsApp Image 2026-05-24 at 00.27.00 (1).jpeg",
        "/mockups/WhatsApp Image 2026-05-24 at 00.27.00 (2).jpeg",
        "/mockups/WhatsApp Image 2026-05-24 at 00.27.00 (3).jpeg"
      ]
    },
    {
      title: "Suivi d'Habitudes",
      tag: "Routines",
      description: "Tracker d'habitudes intelligent avec séries de jours parfaits et rappels.",
      images: [
        "/mockups/WhatsApp Image 2026-05-24 at 00.27.01.jpeg",
        "/mockups/WhatsApp Image 2026-05-24 at 00.27.01 (1).jpeg",
        "/mockups/WhatsApp Image 2026-05-24 at 00.27.01 (2).jpeg",
        "/mockups/WhatsApp Image 2026-05-24 at 00.27.01 (3).jpeg"
      ]
    },
    {
      title: "Chronomètre Focus",
      tag: "Pomodoro",
      description: "Chronomètre Pomodoro optimisé avec musiques d'ambiance et sessions de focus.",
      images: [
        "/mockups/WhatsApp Image 2026-05-24 at 00.27.02.jpeg",
        "/mockups/WhatsApp Image 2026-05-24 at 00.27.02 (1).jpeg",
        "/mockups/WhatsApp Image 2026-05-24 at 00.27.02 (2).jpeg",
        "/mockups/WhatsApp Image 2026-05-24 at 00.27.02 (3).jpeg"
      ]
    },
    {
      title: "Rapports & Analyses",
      tag: "IA Analytics",
      description: "Statistiques avancées, bilans de performance cognitive et plannings optimisés.",
      images: [
        "/mockups/WhatsApp Image 2026-05-24 at 00.27.03.jpeg",
        "/mockups/WhatsApp Image 2026-05-24 at 00.27.03 (1).jpeg",
        "/mockups/WhatsApp Image 2026-05-24 at 00.27.03 (2).jpeg",
        "/mockups/WhatsApp Image 2026-05-24 at 00.27.03 (3).jpeg"
      ]
    },
    {
      title: "Défis & Progression",
      tag: "Objectifs",
      description: "Planification et complétion d'objectifs majeurs avec suivi de votre motivation.",
      images: [
        "/mockups/WhatsApp Image 2026-05-24 at 00.27.04.jpeg",
        "/mockups/WhatsApp Image 2026-05-24 at 00.27.04 (1).jpeg",
        "/mockups/WhatsApp Image 2026-05-24 at 00.27.04 (2).jpeg",
        "/mockups/WhatsApp Image 2026-05-24 at 00.27.04 (3).jpeg"
      ]
    },
    {
      title: "Récompenses & EXP",
      tag: "Gamification",
      description: "Système de boutique de récompenses virtuelles pour encourager la constance.",
      images: [
        "/mockups/WhatsApp Image 2026-05-24 at 00.27.05.jpeg",
        "/mockups/WhatsApp Image 2026-05-24 at 00.27.05 (1).jpeg",
        "/mockups/WhatsApp Image 2026-05-24 at 00.27.05 (2).jpeg",
        "/mockups/WhatsApp Image 2026-05-24 at 00.27.05 (3).jpeg"
      ]
    },
    {
      title: "Profil & Premium",
      tag: "Compte",
      description: "Paramètres, synchronisation sécurisée et options de personnalisation premium.",
      images: [
        "/mockups/WhatsApp Image 2026-05-24 at 00.27.06.jpeg",
        "/mockups/WhatsApp Image 2026-05-24 at 00.27.06 (1).jpeg",
        "/mockups/WhatsApp Image 2026-05-24 at 00.27.06 (2).jpeg"
      ]
    }
  ],
  en: [
    {
      title: "Dashboard",
      tag: "AI Hub",
      description: "Your unified smart control center with scores and high priority tasks.",
      images: [
        "/mockups/WhatsApp Image 2026-05-24 at 00.26.59.jpeg",
        "/mockups/WhatsApp Image 2026-05-24 at 00.26.59 (1).jpeg",
        "/mockups/WhatsApp Image 2026-05-24 at 00.26.59 (2).jpeg"
      ]
    },
    {
      title: "Task Management",
      tag: "AI Tasks",
      description: "Automatic generation and breakdown of your tasks by artificial intelligence.",
      images: [
        "/mockups/WhatsApp Image 2026-05-24 at 00.27.00.jpeg",
        "/mockups/WhatsApp Image 2026-05-24 at 00.27.00 (1).jpeg",
        "/mockups/WhatsApp Image 2026-05-24 at 00.27.00 (2).jpeg",
        "/mockups/WhatsApp Image 2026-05-24 at 00.27.00 (3).jpeg"
      ]
    },
    {
      title: "Habit Tracking",
      tag: "Routines",
      description: "Smart habit tracker with perfect day streaks and reminders.",
      images: [
        "/mockups/WhatsApp Image 2026-05-24 at 00.27.01.jpeg",
        "/mockups/WhatsApp Image 2026-05-24 at 00.27.01 (1).jpeg",
        "/mockups/WhatsApp Image 2026-05-24 at 00.27.01 (2).jpeg",
        "/mockups/WhatsApp Image 2026-05-24 at 00.27.01 (3).jpeg"
      ]
    },
    {
      title: "Focus Timer",
      tag: "Pomodoro",
      description: "Optimized Pomodoro timer with ambient music and focus sessions.",
      images: [
        "/mockups/WhatsApp Image 2026-05-24 at 00.27.02.jpeg",
        "/mockups/WhatsApp Image 2026-05-24 at 00.27.02 (1).jpeg",
        "/mockups/WhatsApp Image 2026-05-24 at 00.27.02 (2).jpeg",
        "/mockups/WhatsApp Image 2026-05-24 at 00.27.02 (3).jpeg"
      ]
    },
    {
      title: "Reports & Analytics",
      tag: "AI Analytics",
      description: "Advanced statistics, cognitive performance reviews, and optimized schedules.",
      images: [
        "/mockups/WhatsApp Image 2026-05-24 at 00.27.03.jpeg",
        "/mockups/WhatsApp Image 2026-05-24 at 00.27.03 (1).jpeg",
        "/mockups/WhatsApp Image 2026-05-24 at 00.27.03 (2).jpeg",
        "/mockups/WhatsApp Image 2026-05-24 at 00.27.03 (3).jpeg"
      ]
    },
    {
      title: "Challenges & Progress",
      tag: "Goals",
      description: "Planning and completion of major milestones with motivation tracking.",
      images: [
        "/mockups/WhatsApp Image 2026-05-24 at 00.27.04.jpeg",
        "/mockups/WhatsApp Image 2026-05-24 at 00.27.04 (1).jpeg",
        "/mockups/WhatsApp Image 2026-05-24 at 00.27.04 (2).jpeg",
        "/mockups/WhatsApp Image 2026-05-24 at 00.27.04 (3).jpeg"
      ]
    },
    {
      title: "Rewards & EXP",
      tag: "Gamification",
      description: "Virtual rewards shop system to encourage consistency.",
      images: [
        "/mockups/WhatsApp Image 2026-05-24 at 00.27.05.jpeg",
        "/mockups/WhatsApp Image 2026-05-24 at 00.27.05 (1).jpeg",
        "/mockups/WhatsApp Image 2026-05-24 at 00.27.05 (2).jpeg",
        "/mockups/WhatsApp Image 2026-05-24 at 00.27.05 (3).jpeg"
      ]
    },
    {
      title: "Profile & Premium",
      tag: "Account",
      description: "Settings, secure synchronization, and premium customization options.",
      images: [
        "/mockups/WhatsApp Image 2026-05-24 at 00.27.06.jpeg",
        "/mockups/WhatsApp Image 2026-05-24 at 00.27.06 (1).jpeg",
        "/mockups/WhatsApp Image 2026-05-24 at 00.27.06 (2).jpeg"
      ]
    }
  ],
  es: [
    {
      title: "Tablero",
      tag: "IA Hub",
      description: "Su centro de control inteligente unificado con puntuaciones y tareas prioritarias.",
      images: [
        "/mockups/WhatsApp Image 2026-05-24 at 00.26.59.jpeg",
        "/mockups/WhatsApp Image 2026-05-24 at 00.26.59 (1).jpeg",
        "/mockups/WhatsApp Image 2026-05-24 at 00.26.59 (2).jpeg"
      ]
    },
    {
      title: "Gestión de Tareas",
      tag: "Tareas IA",
      description: "Generación automática y desglose de sus tareas por la inteligencia artificial.",
      images: [
        "/mockups/WhatsApp Image 2026-05-24 at 00.27.00.jpeg",
        "/mockups/WhatsApp Image 2026-05-24 at 00.27.00 (1).jpeg",
        "/mockups/WhatsApp Image 2026-05-24 at 00.27.00 (2).jpeg",
        "/mockups/WhatsApp Image 2026-05-24 at 00.27.00 (3).jpeg"
      ]
    },
    {
      title: "Seguimiento de Hábitos",
      tag: "Rutinas",
      description: "Seguimiento inteligente de hábitos con rachas de días perfectos y recordatorios.",
      images: [
        "/mockups/WhatsApp Image 2026-05-24 at 00.27.01.jpeg",
        "/mockups/WhatsApp Image 2026-05-24 at 00.27.01 (1).jpeg",
        "/mockups/WhatsApp Image 2026-05-24 at 00.27.01 (2).jpeg",
        "/mockups/WhatsApp Image 2026-05-24 at 00.27.01 (3).jpeg"
      ]
    },
    {
      title: "Temporizador de Enfoque",
      tag: "Pomodoro",
      description: "Temporizador Pomodoro optimizado con música ambiental y sesiones de enfoque.",
      images: [
        "/mockups/WhatsApp Image 2026-05-24 at 00.27.02.jpeg",
        "/mockups/WhatsApp Image 2026-05-24 at 00.27.02 (1).jpeg",
        "/mockups/WhatsApp Image 2026-05-24 at 00.27.02 (2).jpeg",
        "/mockups/WhatsApp Image 2026-05-24 at 00.27.02 (3).jpeg"
      ]
    },
    {
      title: "Informes y Análisis",
      tag: "Análisis IA",
      description: "Estadísticas avanzadas, revisiones de rendimiento cognitivo y horarios optimizados.",
      images: [
        "/mockups/WhatsApp Image 2026-05-24 at 00.27.03.jpeg",
        "/mockups/WhatsApp Image 2026-05-24 at 00.27.03 (1).jpeg",
        "/mockups/WhatsApp Image 2026-05-24 at 00.27.03 (2).jpeg",
        "/mockups/WhatsApp Image 2026-05-24 at 00.27.03 (3).jpeg"
      ]
    },
    {
      title: "Desafíos y Progreso",
      tag: "Metas",
      description: "Planificación y cumplimiento de hitos importantes con seguimiento de la motivación.",
      images: [
        "/mockups/WhatsApp Image 2026-05-24 at 00.27.04.jpeg",
        "/mockups/WhatsApp Image 2026-05-24 at 00.27.04 (1).jpeg",
        "/mockups/WhatsApp Image 2026-05-24 at 00.27.04 (2).jpeg",
        "/mockups/WhatsApp Image 2026-05-24 at 00.27.04 (3).jpeg"
      ]
    },
    {
      title: "Premios y EXP",
      tag: "Gamificación",
      description: "Sistema de tienda de recompensas virtuales para fomentar la constancia.",
      images: [
        "/mockups/WhatsApp Image 2026-05-24 at 00.27.05.jpeg",
        "/mockups/WhatsApp Image 2026-05-24 at 00.27.05 (1).jpeg",
        "/mockups/WhatsApp Image 2026-05-24 at 00.27.05 (2).jpeg",
        "/mockups/WhatsApp Image 2026-05-24 at 00.27.05 (3).jpeg"
      ]
    },
    {
      title: "Perfil y Premium",
      tag: "Cuenta",
      description: "Configuración, sincronización segura y opciones de personalización premium.",
      images: [
        "/mockups/WhatsApp Image 2026-05-24 at 00.27.06.jpeg",
        "/mockups/WhatsApp Image 2026-05-24 at 00.27.06 (1).jpeg",
        "/mockups/WhatsApp Image 2026-05-24 at 00.27.06 (2).jpeg"
      ]
    }
  ],
  zh: [
    {
      title: "仪表板",
      tag: "AI 中心",
      description: "统一的智能控制中心，包含您的分数和优先任务。",
      images: [
        "/mockups/WhatsApp Image 2026-05-24 at 00.26.59.jpeg",
        "/mockups/WhatsApp Image 2026-05-24 at 00.26.59 (1).jpeg",
        "/mockups/WhatsApp Image 2026-05-24 at 00.26.59 (2).jpeg"
      ]
    },
    {
      title: "任务管理",
      tag: "AI 任务",
      description: "通过人工智能自动生成和分解您的任务。",
      images: [
        "/mockups/WhatsApp Image 2026-05-24 at 00.27.00.jpeg",
        "/mockups/WhatsApp Image 2026-05-24 at 00.27.00 (1).jpeg",
        "/mockups/WhatsApp Image 2026-05-24 at 00.27.00 (2).jpeg",
        "/mockups/WhatsApp Image 2026-05-24 at 00.27.00 (3).jpeg"
      ]
    },
    {
      title: "习惯跟踪",
      tag: "常规",
      description: "智能习惯跟踪器，包含完美天数连击和提醒。",
      images: [
        "/mockups/WhatsApp Image 2026-05-24 at 00.27.01.jpeg",
        "/mockups/WhatsApp Image 2026-05-24 at 00.27.01 (1).jpeg",
        "/mockups/WhatsApp Image 2026-05-24 at 00.27.01 (2).jpeg",
        "/mockups/WhatsApp Image 2026-05-24 at 00.27.01 (3).jpeg"
      ]
    },
    {
      title: "专注计时器",
      tag: "番茄钟",
      description: "优化的番茄钟计时器，包含背景音乐和专注会话。",
      images: [
        "/mockups/WhatsApp Image 2026-05-24 at 00.27.02.jpeg",
        "/mockups/WhatsApp Image 2026-05-24 at 00.27.02 (1).jpeg",
        "/mockups/WhatsApp Image 2026-05-24 at 00.27.02 (2).jpeg",
        "/mockups/WhatsApp Image 2026-05-24 at 00.27.02 (3).jpeg"
      ]
    },
    {
      title: "报告与分析",
      tag: "AI 分析",
      description: "高级数据统计、认知表现评估和优化排程。",
      images: [
        "/mockups/WhatsApp Image 2026-05-24 at 00.27.03.jpeg",
        "/mockups/WhatsApp Image 2026-05-24 at 00.27.03 (1).jpeg",
        "/mockups/WhatsApp Image 2026-05-24 at 00.27.03 (2).jpeg",
        "/mockups/WhatsApp Image 2026-05-24 at 00.27.03 (3).jpeg"
      ]
    },
    {
      title: "挑战与进度",
      tag: "目标",
      description: "规划和完成重大里程碑并进行动力跟踪。",
      images: [
        "/mockups/WhatsApp Image 2026-05-24 at 00.27.04.jpeg",
        "/mockups/WhatsApp Image 2026-05-24 at 00.27.04 (1).jpeg",
        "/mockups/WhatsApp Image 2026-05-24 at 00.27.04 (2).jpeg",
        "/mockups/WhatsApp Image 2026-05-24 at 00.27.04 (3).jpeg"
      ]
    },
    {
      title: "奖励与 EXP",
      tag: "游戏化",
      description: "虚拟奖励商店系统，鼓励保持一致性。",
      images: [
        "/mockups/WhatsApp Image 2026-05-24 at 00.27.05.jpeg",
        "/mockups/WhatsApp Image 2026-05-24 at 00.27.05 (1).jpeg",
        "/mockups/WhatsApp Image 2026-05-24 at 00.27.05 (2).jpeg",
        "/mockups/WhatsApp Image 2026-05-24 at 00.27.05 (3).jpeg"
      ]
    },
    {
      title: "个人资料与高级版",
      tag: "账户",
      description: "设置、安全同步和高级自定义选项。",
      images: [
        "/mockups/WhatsApp Image 2026-05-24 at 00.27.06.jpeg",
        "/mockups/WhatsApp Image 2026-05-24 at 00.27.06 (1).jpeg",
        "/mockups/WhatsApp Image 2026-05-24 at 00.27.06 (2).jpeg"
      ]
    }
  ],
  it: [
    {
      title: "Bacheca",
      tag: "IA Hub",
      description: "Il tuo centro di controllo intelligente unificato con punteggi e compiti prioritari.",
      images: [
        "/mockups/WhatsApp Image 2026-05-24 at 00.26.59.jpeg",
        "/mockups/WhatsApp Image 2026-05-24 at 00.26.59 (1).jpeg",
        "/mockups/WhatsApp Image 2026-05-24 at 00.26.59 (2).jpeg"
      ]
    },
    {
      title: "Gestione Attività",
      tag: "Attività IA",
      description: "Generazione automatica e suddivisione delle attività da parte dell'intelligenza artificiale.",
      images: [
        "/mockups/WhatsApp Image 2026-05-24 at 00.27.00.jpeg",
        "/mockups/WhatsApp Image 2026-05-24 at 00.27.00 (1).jpeg",
        "/mockups/WhatsApp Image 2026-05-24 at 00.27.00 (2).jpeg",
        "/mockups/WhatsApp Image 2026-05-24 at 00.27.00 (3).jpeg"
      ]
    },
    {
      title: "Tracker Abitudini",
      tag: "Routine",
      description: "Tracker intelligente delle abitudini con serie di giorni perfetti e promemoria.",
      images: [
        "/mockups/WhatsApp Image 2026-05-24 at 00.27.01.jpeg",
        "/mockups/WhatsApp Image 2026-05-24 at 00.27.01 (1).jpeg",
        "/mockups/WhatsApp Image 2026-05-24 at 00.27.01 (2).jpeg",
        "/mockups/WhatsApp Image 2026-05-24 at 00.27.01 (3).jpeg"
      ]
    },
    {
      title: "Timer Focus",
      tag: "Pomodoro",
      description: "Timer Pomodoro ottimizzato con musica ambientale e sessioni di focus.",
      images: [
        "/mockups/WhatsApp Image 2026-05-24 at 00.27.02.jpeg",
        "/mockups/WhatsApp Image 2026-05-24 at 00.27.02 (1).jpeg",
        "/mockups/WhatsApp Image 2026-05-24 at 00.27.02 (2).jpeg",
        "/mockups/WhatsApp Image 2026-05-24 at 00.27.02 (3).jpeg"
      ]
    },
    {
      title: "Rapporti & Analisi",
      tag: "IA Analytics",
      description: "Statistiche avanzate, valutazioni delle prestazioni cognitive e programmi ottimizzati.",
      images: [
        "/mockups/WhatsApp Image 2026-05-24 at 00.27.03.jpeg",
        "/mockups/WhatsApp Image 2026-05-24 at 00.27.03 (1).jpeg",
        "/mockups/WhatsApp Image 2026-05-24 at 00.27.03 (2).jpeg",
        "/mockups/WhatsApp Image 2026-05-24 at 00.27.03 (3).jpeg"
      ]
    },
    {
      title: "Sfide & Progressi",
      tag: "Obiettivi",
      description: "Pianificazione e completamento di traguardi importanti con tracciamento della motivazione.",
      images: [
        "/mockups/WhatsApp Image 2026-05-24 at 00.27.04.jpeg",
        "/mockups/WhatsApp Image 2026-05-24 at 00.27.04 (1).jpeg",
        "/mockups/WhatsApp Image 2026-05-24 at 00.27.04 (2).jpeg",
        "/mockups/WhatsApp Image 2026-05-24 at 00.27.04 (3).jpeg"
      ]
    },
    {
      title: "Premi & EXP",
      tag: "Gamification",
      description: "Sistema di negozio di premi virtuali per incoraggiare la costanza.",
      images: [
        "/mockups/WhatsApp Image 2026-05-24 at 00.27.05.jpeg",
        "/mockups/WhatsApp Image 2026-05-24 at 00.27.05 (1).jpeg",
        "/mockups/WhatsApp Image 2026-05-24 at 00.27.05 (2).jpeg",
        "/mockups/WhatsApp Image 2026-05-24 at 00.27.05 (3).jpeg"
      ]
    },
    {
      title: "Profilo & Premium",
      tag: "Account",
      description: "Impostazioni, sincronizzazione sicura e opzioni di personalizzazione premium.",
      images: [
        "/mockups/WhatsApp Image 2026-05-24 at 00.27.06.jpeg",
        "/mockups/WhatsApp Image 2026-05-24 at 00.27.06 (1).jpeg",
        "/mockups/WhatsApp Image 2026-05-24 at 00.27.06 (2).jpeg"
      ]
    }
  ],
  ru: [
    {
      title: "Панель управления",
      tag: "ИИ Хаб",
      description: "Ваш единый интеллектуальный центр управления с оценками и приоритетными задачами.",
      images: [
        "/mockups/WhatsApp Image 2026-05-24 at 00.26.59.jpeg",
        "/mockups/WhatsApp Image 2026-05-24 at 00.26.59 (1).jpeg",
        "/mockups/WhatsApp Image 2026-05-24 at 00.26.59 (2).jpeg"
      ]
    },
    {
      title: "Управление задачами",
      tag: "ИИ Задачи",
      description: "Автоматическая генерация и разбивка ваших задач с помощью искусственного интеллекта.",
      images: [
        "/mockups/WhatsApp Image 2026-05-24 at 00.27.00.jpeg",
        "/mockups/WhatsApp Image 2026-05-24 at 00.27.00 (1).jpeg",
        "/mockups/WhatsApp Image 2026-05-24 at 00.27.00 (2).jpeg",
        "/mockups/WhatsApp Image 2026-05-24 at 00.27.00 (3).jpeg"
      ]
    },
    {
      title: "Отслеживание привычек",
      tag: "Рутины",
      description: "Умный трекер привычек с сериями идеальных дней и напоминаниями.",
      images: [
        "/mockups/WhatsApp Image 2026-05-24 at 00.27.01.jpeg",
        "/mockups/WhatsApp Image 2026-05-24 at 00.27.01 (1).jpeg",
        "/mockups/WhatsApp Image 2026-05-24 at 00.27.01 (2).jpeg",
        "/mockups/WhatsApp Image 2026-05-24 at 00.27.01 (3).jpeg"
      ]
    },
    {
      title: "Таймер фокуса",
      tag: "Pomodoro",
      description: "Оптимизированный таймер Pomodoro с фоновой музыкой и сессиями концентрации.",
      images: [
        "/mockups/WhatsApp Image 2026-05-24 at 00.27.02.jpeg",
        "/mockups/WhatsApp Image 2026-05-24 at 00.27.02 (1).jpeg",
        "/mockups/WhatsApp Image 2026-05-24 at 00.27.02 (2).jpeg",
        "/mockups/WhatsApp Image 2026-05-24 at 00.27.02 (3).jpeg"
      ]
    },
    {
      title: "Отчеты и аналитика",
      tag: "ИИ Аналитика",
      description: "Расширенная статистика, обзоры когнитивной эффективности и оптимизированные расписания.",
      images: [
        "/mockups/WhatsApp Image 2026-05-24 at 00.27.03.jpeg",
        "/mockups/WhatsApp Image 2026-05-24 at 00.27.03 (1).jpeg",
        "/mockups/WhatsApp Image 2026-05-24 at 00.27.03 (2).jpeg",
        "/mockups/WhatsApp Image 2026-05-24 at 00.27.03 (3).jpeg"
      ]
    },
    {
      title: "Испытания и прогресс",
      tag: "Цели",
      description: "Планирование и завершение ключевых этапов с отслеживанием мотивации.",
      images: [
        "/mockups/WhatsApp Image 2026-05-24 at 00.27.04.jpeg",
        "/mockups/WhatsApp Image 2026-05-24 at 00.27.04 (1).jpeg",
        "/mockups/WhatsApp Image 2026-05-24 at 00.27.04 (2).jpeg",
        "/mockups/WhatsApp Image 2026-05-24 at 00.27.04 (3).jpeg"
      ]
    },
    {
      title: "Награды и EXP",
      tag: "Геймификация",
      description: "Система магазина виртуальных наград для поощрения постоянства.",
      images: [
        "/mockups/WhatsApp Image 2026-05-24 at 00.27.05.jpeg",
        "/mockups/WhatsApp Image 2026-05-24 at 00.27.05 (1).jpeg",
        "/mockups/WhatsApp Image 2026-05-24 at 00.27.05 (2).jpeg",
        "/mockups/WhatsApp Image 2026-05-24 at 00.27.05 (3).jpeg"
      ]
    },
    {
      title: "Профиль и Премиум",
      tag: "Аккаунт",
      description: "Настройки, безопасная синхронизация и премиум-опции персонализации.",
      images: [
        "/mockups/WhatsApp Image 2026-05-24 at 00.27.06.jpeg",
        "/mockups/WhatsApp Image 2026-05-24 at 00.27.06 (1).jpeg",
        "/mockups/WhatsApp Image 2026-05-24 at 00.27.06 (2).jpeg"
      ]
    }
  ],
  uk: [
    {
      title: "Панель управління",
      tag: "ШІ Хаб",
      description: "Ваш єдиний інтелектуальний центр керування з оцінками та пріоритетними завданнями.",
      images: [
        "/mockups/WhatsApp Image 2026-05-24 at 00.26.59.jpeg",
        "/mockups/WhatsApp Image 2026-05-24 at 00.26.59 (1).jpeg",
        "/mockups/WhatsApp Image 2026-05-24 at 00.26.59 (2).jpeg"
      ]
    },
    {
      title: "Керування завданнями",
      tag: "ШІ Завдання",
      description: "Автоматичне створення та розбивка ваших завдань за допомогою штучного інтелекту.",
      images: [
        "/mockups/WhatsApp Image 2026-05-24 at 00.27.00.jpeg",
        "/mockups/WhatsApp Image 2026-05-24 at 00.27.00 (1).jpeg",
        "/mockups/WhatsApp Image 2026-05-24 at 00.27.00 (2).jpeg",
        "/mockups/WhatsApp Image 2026-05-24 at 00.27.00 (3).jpeg"
      ]
    },
    {
      title: "Відстеження звичок",
      tag: "Рутини",
      description: "Розумний трекер звичок із серіями ідеальних днів та нагадуваннями.",
      images: [
        "/mockups/WhatsApp Image 2026-05-24 at 00.27.01.jpeg",
        "/mockups/WhatsApp Image 2026-05-24 at 00.27.01 (1).jpeg",
        "/mockups/WhatsApp Image 2026-05-24 at 00.27.01 (2).jpeg",
        "/mockups/WhatsApp Image 2026-05-24 at 00.27.01 (3).jpeg"
      ]
    },
    {
      title: "Таймер фокусу",
      tag: "Pomodoro",
      description: "Оптимізований таймер Pomodoro з фоновою музикою та сесіями концентрації.",
      images: [
        "/mockups/WhatsApp Image 2026-05-24 at 00.27.02.jpeg",
        "/mockups/WhatsApp Image 2026-05-24 at 00.27.02 (1).jpeg",
        "/mockups/WhatsApp Image 2026-05-24 at 00.27.02 (2).jpeg",
        "/mockups/WhatsApp Image 2026-05-24 at 00.27.02 (3).jpeg"
      ]
    },
    {
      title: "Звіти та аналітика",
      tag: "ШІ Аналітика",
      description: "Розширена статистика, огляди когнітивної ефективності та оптимізовані розклади.",
      images: [
        "/mockups/WhatsApp Image 2026-05-24 at 00.27.03.jpeg",
        "/mockups/WhatsApp Image 2026-05-24 at 00.27.03 (1).jpeg",
        "/mockups/WhatsApp Image 2026-05-24 at 00.27.03 (2).jpeg",
        "/mockups/WhatsApp Image 2026-05-24 at 00.27.03 (3).jpeg"
      ]
    },
    {
      title: "Випробування та прогрес",
      tag: "Цілі",
      description: "Планування та завершення ключових етапів з відстеженням мотивації.",
      images: [
        "/mockups/WhatsApp Image 2026-05-24 at 00.27.04.jpeg",
        "/mockups/WhatsApp Image 2026-05-24 at 00.27.04 (1).jpeg",
        "/mockups/WhatsApp Image 2026-05-24 at 00.27.04 (2).jpeg",
        "/mockups/WhatsApp Image 2026-05-24 at 00.27.04 (3).jpeg"
      ]
    },
    {
      title: "Нагороди та EXP",
      tag: "Гейміфікація",
      description: "Система магазину віртуальних нагород для заохочення постійності.",
      images: [
        "/mockups/WhatsApp Image 2026-05-24 at 00.27.05.jpeg",
        "/mockups/WhatsApp Image 2026-05-24 at 00.27.05 (1).jpeg",
        "/mockups/WhatsApp Image 2026-05-24 at 00.27.05 (2).jpeg",
        "/mockups/WhatsApp Image 2026-05-24 at 00.27.05 (3).jpeg"
      ]
    },
    {
      title: "Профіль та Преміум",
      tag: "Акаунт",
      description: "Налаштування, безпечна синхронізація та преміум-опції персоналізації.",
      images: [
        "/mockups/WhatsApp Image 2026-05-24 at 00.27.06.jpeg",
        "/mockups/WhatsApp Image 2026-05-24 at 00.27.06 (1).jpeg",
        "/mockups/WhatsApp Image 2026-05-24 at 00.27.06 (2).jpeg"
      ]
    }
  ]
};

const CONTROLS = {
  fr: { prev: "Mockup précédent", next: "Mockup suivant" },
  en: { prev: "Previous mockup", next: "Next mockup" },
  es: { prev: "Mockup anterior", next: "Mockup siguiente" },
  zh: { prev: "上一个模型", next: "下一个模型" },
  it: { prev: "Mockup precedente", next: "Mockup successivo" },
  ru: { prev: "Предыдущий макет", next: "Следующий макет" },
  uk: { prev: "Попередній макет", next: "Наступний макет" }
};

export default function AppMockupShowcase({ lang = 'fr' }) {
  const [catIndex, setCatIndex] = useState(0);
  const [imgIndex, setImgIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const categories = MOCKUP_CATEGORIES[lang] || MOCKUP_CATEGORIES.fr;
  const labels = CONTROLS[lang] || CONTROLS.fr;

  const activeCategory = categories[catIndex];
  const activeImage = activeCategory.images[imgIndex];

  useEffect(() => {
    if (isHovered) return;

    const interval = setInterval(() => {
      const currentCategory = categories[catIndex];
      if (imgIndex < currentCategory.images.length - 1) {
        // Go to next image in same category
        setImgIndex(imgIndex + 1);
      } else {
        // Go to next category
        const nextCat = (catIndex + 1) % categories.length;
        setCatIndex(nextCat);
        setImgIndex(0);
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [isHovered, catIndex, imgIndex, categories]);

  const handleNext = () => {
    const currentCategory = categories[catIndex];
    if (imgIndex < currentCategory.images.length - 1) {
      setImgIndex(imgIndex + 1);
    } else {
      const nextCat = (catIndex + 1) % categories.length;
      setCatIndex(nextCat);
      setImgIndex(0);
    }
  };

  const handlePrev = () => {
    if (imgIndex > 0) {
      setImgIndex(imgIndex - 1);
    } else {
      const prevCat = (catIndex - 1 + categories.length) % categories.length;
      setCatIndex(prevCat);
      setImgIndex(categories[prevCat].images.length - 1);
    }
  };

  return (
    <div 
      className="relative max-w-[280px] sm:max-w-[290px] w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Glow behind phone */}
      <div className={`absolute -inset-4 rounded-[40px] opacity-25 blur-xl pointer-events-none transition-all duration-700 ${
        catIndex % 3 === 0 ? 'bg-violet-600' : catIndex % 3 === 1 ? 'bg-pink-500' : 'bg-cyan-400'
      }`} />

      {/* Smartphone Shell */}
      <div className="relative bg-slate-950 border-[6px] border-slate-900 rounded-[38px] overflow-hidden aspect-[9/19] w-full shadow-2xl flex flex-col transition-all duration-300">
        
        {/* Top Speaker Notch */}
        <div className="absolute top-0 inset-x-0 h-4 bg-slate-900 flex justify-center items-center z-20">
          <div className="w-16 h-2.5 bg-black rounded-full" />
        </div>

        {/* Screenshot display with smooth fade-in */}
        <div className="relative flex-1 bg-slate-950 overflow-hidden flex items-center justify-center">
          <img 
            src={activeImage} 
            alt={`${activeCategory.title} View ${imgIndex + 1}`}
            className="w-full h-full object-cover transition-all duration-500 pointer-events-none"
          />
        </div>

        {/* Bottom Home Indicator */}
        <div className="absolute bottom-1 inset-x-0 flex justify-center z-20">
          <div className="w-24 h-1 bg-white/40 rounded-full" />
        </div>

        {/* Next / Prev overlay controls */}
        <button 
          onClick={handlePrev}
          aria-label={labels.prev}
          className="absolute left-2.5 top-1/2 -translate-y-1/2 size-9 flex items-center justify-center rounded-full bg-black/60 border border-white/5 text-slate-300 hover:text-white hover:bg-black/80 transition-all duration-300 z-20 cursor-pointer"
        >
          <ChevronLeft size={18} />
        </button>
        <button 
          onClick={handleNext}
          aria-label={labels.next}
          className="absolute right-2.5 top-1/2 -translate-y-1/2 size-9 flex items-center justify-center rounded-full bg-black/60 border border-white/5 text-slate-300 hover:text-white hover:bg-black/80 transition-all duration-300 z-20 cursor-pointer"
        >
          <ChevronRight size={18} />
        </button>

        {/* Tag indicator inside the screen bottom */}
        <div className="absolute bottom-6 left-4 bg-black/65 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10 flex items-center gap-1 z-10 select-none">
          <Sparkles size={11} className="text-pink-400 animate-pulse" />
          <span className="text-[9px] font-black tracking-widest text-slate-200 uppercase">{activeCategory.tag}</span>
        </div>

        {/* Screen Inner View Indicator Dots */}
        <div className="absolute bottom-6 right-4 flex gap-1 z-10 bg-black/40 backdrop-blur-sm px-2 py-1.5 rounded-full">
          {activeCategory.images.map((_, idx) => (
            <div 
              key={idx}
              className={`size-1.5 rounded-full transition-all duration-300 ${
                idx === imgIndex ? 'bg-white scale-120' : 'bg-white/40'
              }`}
            />
          ))}
        </div>

      </div>
    </div>
  );
}
