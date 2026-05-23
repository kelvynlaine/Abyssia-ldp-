import React, { useState } from 'react';
import { 
  Sparkles, 
  Flame, 
  Brain, 
  Zap, 
  BarChart3, 
  ShieldCheck, 
  Users, 
  ArrowRight, 
  CheckCircle2, 
  ChevronDown, 
  Smartphone,
  Star,
  MessageSquare,
  Menu,
  X,
  Mail,
  Phone,
  ExternalLink,
  Shield,
  FileText,
  Globe,
  Check
} from 'lucide-react';

import PomodoroDemo from './components/PomodoroDemo';
import HabitTrackerDemo from './components/HabitTrackerDemo';
import AppMockupShowcase from './components/AppMockupShowcase';
import InteractiveDashboardDemo from './components/InteractiveDashboardDemo';
import { TRANSLATIONS } from './config/translations';
import { INSTALL_DEEPLINK_URL, SUPPORT_DISCORD_URL, SUPPORT_EMAIL, SUPPORT_PHONE } from './config/deeplink';

export default function App() {
  const [lang, setLang] = useState('fr');
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);



  const t = TRANSLATIONS[lang] || TRANSLATIONS.fr;

  const faqData = {
    fr: [
      {
        question: "Qu'est-ce qu'Abyss IA et comment fonctionne cet assistant IA personnel ?",
        answer: "Abyss IA est un assistant intelligent premium propulsé par l'IA générative pour personnaliser votre expérience de productivité. Il combine la gestion intelligente de tâches, le suivi d'habitudes et la technique Pomodoro optimisée pour vous aider à atteindre vos objectifs SMART plus rapidement, en apprenant continuellement de vos patterns d'utilisation."
      },
      {
        question: "Comment utiliser Abyss IA efficacement pour améliorer ma productivité ?",
        answer: "Pour maximiser votre productivité, commencez par définir vos objectifs SMART dans l'application. Utilisez notre tracker d'habitudes avec IA pour développer des routines durables et lancez notre chronomètre Pomodoro pour des sessions de travail focalisées. L'analyse de productivité IA identifiera ensuite vos moments les plus performants pour vous suggérer des plannings optimaux."
      },
      {
        question: "Comment développer de bonnes habitudes avec le tracker d'habitudes Abyss IA ?",
        answer: "Notre tracker d'habitudes avec IA analyse vos patterns comportementaux et vous propose des recommandations personnalisées IA pour créer des routines durables. L'application détecte également vos obstacles potentiels (ex: fatigue, retards cumulés) et ajuste automatiquement vos objectifs quotidiens pour maximiser vos chances de réussite."
      },
      {
        question: "Abyss IA vs autres applications de productivité - Quelle est la différence ?",
        answer: "Abyss IA se distingue comme meilleure application IA 2024 grâce à son écosystème tout-en-un. Au lieu d'avoir un outil pour vos tâches, un autre pour vos habitudes, et un troisième pour le Pomodoro, notre solution unifie l'ensemble grâce à un assistant intelligent qui fait le pont entre vos tâches quotidiennes et votre santé cognitive."
      },
      {
        question: "Comment arrêter la procrastination avec l'assistant IA d'Abyss IA ?",
        answer: "Notre application utilise plusieurs techniques éprouvées amplifiées par l'IA. La technique Pomodoro découpe vos tâches en sessions gérables, la gamification rend le travail engageant, et l'assistant IA personnel vous envoie des encouragements motivants personnalisés. De plus, l'analyse comportementale identifie vos déclencheurs de procrastination pour vous aider à les surmonter."
      },
      {
        question: "Comment installer Abyss IA sur mon appareil Android ?",
        answer: "Vous pouvez installer l'application en cliquant sur n'importe quel bouton 'Installer l'application' de notre site. Vous serez alors redirigé directement vers notre page officielle de test Google Play Store, garantissant un téléchargement et une installation 100% sécurisés et certifiés par Google Play Protect."
      },
      {
        question: "Quels sont les prérequis système pour cette application IA productivité ?",
        answer: "L'application Abyss IA est extrêmement légère et fonctionne sur n'importe quel appareil Android équipé d'Android 8.0 ou supérieur, avec un minimum de 50 Mo d'espace de stockage disponible. Notre logiciel IA est optimisé pour être extrêmement économe en batterie."
      },
      {
        question: "Mes données sont-elles sécurisées dans cette solution IA pour la productivité ?",
        answer: "Absolument. Vos requêtes et données personnelles sont chiffrées de bout en bout et nous ne revendons aucune information à des tiers. La confidentialité est notre priorité absolue. Toutes les analyses de productivité IA sont effectuées de manière sécurisée et respectueuse de votre vie privée."
      }
    ],
    en: [
      {
        question: "What is Abyss IA and how does this personal AI assistant work?",
        answer: "Abyss IA is a premium smart assistant powered by generative AI to customize your productivity experience. It combines intelligent task management, habit tracking, and optimized Pomodoro techniques to help you achieve your SMART goals faster, continuously learning from your usage patterns."
      },
      {
        question: "How to use Abyss IA effectively to improve my productivity?",
        answer: "To maximize your productivity, start by setting your SMART goals in the application. Use our AI-powered habit tracker to build sustainable routines and launch our Pomodoro timer for focused work sessions. The AI productivity analysis will then identify your peak performance moments to suggest optimal schedules."
      },
      {
        question: "How to develop good habits with the Abyss IA habit tracker?",
        answer: "Our AI-powered habit tracker analyzes your behavioral patterns and provides personalized AI recommendations to create sustainable routines. The app also detects your potential obstacles (e.g., fatigue, cumulative delays) and automatically adjusts your daily goals to maximize your chances of success."
      },
      {
        question: "Abyss IA vs other productivity apps - What is the difference?",
        answer: "Abyss IA stands out as the best 2024 AI application thanks to its all-in-one ecosystem. Instead of having one tool for your tasks, another for your habits, and a third for Pomodoro, our solution unifies everything through a smart assistant that bridges the gap between your daily tasks and your cognitive health."
      },
      {
        question: "How to stop procrastinating with the Abyss IA assistant?",
        answer: "Our app uses several proven techniques amplified by AI. The Pomodoro technique cuts your tasks into manageable sessions, gamification makes work engaging, and the personal AI assistant sends you customized motivational encouragement. Additionally, behavioral analysis identifies your procrastination triggers to help you overcome them."
      },
      {
        question: "How to install Abyss IA on my Android device?",
        answer: "You can install the app by clicking any 'Install App' button on our site. You will be redirected directly to our official Google Play Store testing page, guaranteeing a 100% secure download and installation certified by Google Play Protect."
      },
      {
        question: "What are the system requirements for this productivity AI app?",
        answer: "The Abyss IA app is extremely lightweight and works on any Android device running Android 8.0 or higher, with a minimum of 50 MB of available storage space. Our AI software is optimized to be extremely battery-efficient."
      },
      {
        question: "Is my data secure in this productivity AI solution?",
        answer: "Absolutely. Your queries and personal data are end-to-end encrypted and we do not sell any information to third parties. Privacy is our top priority. All AI productivity analyses are performed securely and with respect for your privacy."
      }
    ],
    es: [
      {
        question: "¿Qué es Abyss IA y cómo funciona este asistente personal de IA?",
        answer: "Abyss IA es un asistente inteligente premium impulsado por IA generativa para personalizar su experiencia de productividad. Combina la gestión inteligente de tareas, el seguimiento de hábitos y la técnica Pomodoro optimizada para ayudarle a alcanzar sus objetivos SMART más rápido, aprendiendo continuamente de sus patrones de uso."
      },
      {
        question: "¿Cómo usar Abyss IA de manera efectiva para mejorar mi productividad?",
        answer: "Para maximizar su productividad, comience por definir sus objetivos SMART en la aplicación. Utilice nuestro rastreador de hábitos con IA para desarrollar rutinas sostenibles y active nuestro temporizador Pomodoro para sesiones de trabajo enfocadas. El análisis de productividad de IA identificará sus momentos de mayor rendimiento para sugerir horarios óptimos."
      },
      {
        question: "¿Cómo desarrollar buenos hábitos con el rastreador de hábitos de Abyss IA?",
        answer: "Nuestro rastreador de hábitos con IA analiza sus patrones de comportamiento y ofrece recomendaciones personalizadas de IA para crear rutinas sostenibles. La aplicación también detecta sus obstáculos potenciales (por ejemplo, fatiga, retrasos acumulados) y ajusta automáticamente sus objetivos diarios para maximizar sus posibilidades de éxito."
      },
      {
        question: "Abyss IA vs otras aplicaciones de productividad - ¿Cuál es la diferencia?",
        answer: "Abyss IA se destaca como la mejor aplicación de IA de 2024 gracias a su ecosistema todo en uno. En lugar de tener una herramienta para sus tareas, otra para sus hábitos y una tercera para Pomodoro, nuestra solución unifica todo a través de un asistente inteligente que une sus tareas diarias y su salud cognitiva."
      },
      {
        question: "¿Cómo dejar de procrastinar con el asistente de Abyss IA?",
        answer: "Nuestra aplicación utiliza varias técnicas probadas amplificadas por IA. La técnica Pomodoro divide sus tareas en sesiones manejables, la gamificación hace que el trabajo sea atractivo y el asistente de IA personal le envía mensajes motivacionales personalizados. Además, el análisis de comportamiento identifica sus desencadenantes de procrastinación para ayudarle a deponerlos."
      },
      {
        question: "¿Cómo instalar Abyss IA en mi dispositivo Android?",
        answer: "Puede instalar la aplicación haciendo clic en cualquier botón 'Instalar App' de nuestro sitio. Se le redirigirá directamente a nuestra página oficial de pruebas de Google Play Store, lo que garantiza una descarga e instalación 100% seguras y certificadas por Google Play Protect."
      },
      {
        question: "¿Cuáles son los requisitos del sistema para esta aplicación de IA de productividad?",
        answer: "La aplicación Abyss IA es extremadamente ligera y funciona en cualquier dispositivo Android con Android 8.0 o superior, con un mínimo de 50 MB de espacio de almacenamiento disponible. Nuestro software de IA está optimizado para ser muy eficiente en el consumo de batería."
      },
      {
        question: "¿Están seguros mis datos en esta solución de IA de productividad?",
        answer: "Absolutamente. Sus consultas y datos personales están cifrados de extremo a extremo y no vendemos ninguna información a terceros. La privacidad es nuestra máxima prioridad. Todos los análisis de productividad de IA se realizan de forma segura y respetando su privacidad."
      }
    ]
  };



  const currentFaqData = faqData[lang] || faqData.fr;

  return (
    <div className="gradient-bg min-h-screen text-slate-100 flex flex-col font-sans select-none w-full overflow-x-hidden">
      
      {/* 1. Header / Navigation */}
      <header className="fixed top-0 inset-x-0 h-16 glass-nav z-40 transition-all duration-300">
        <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 flex items-center justify-between">
          
          {/* Logo brand */}
          <a href="#" className="flex items-center gap-2.5 group">
            <img 
              src="/logo.png" 
              alt="Abyss IA Logo" 
              className="size-9 rounded-xl border border-white/20 group-hover:scale-105 transition-all duration-300 animate-glow"
            />
            <span className="text-xl font-black tracking-tight text-white font-heading">
              Abyss <span className="text-pink-500">IA</span>
            </span>
          </a>

          {/* Nav links - Desktop */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-semibold text-slate-300 hover:text-white transition-all duration-300">{t.nav.features}</a>
            <a href="#demo" className="text-sm font-semibold text-slate-300 hover:text-white transition-all duration-300">{t.nav.demos}</a>
            <a href="#faq" className="text-sm font-semibold text-slate-300 hover:text-white transition-all duration-300">{t.nav.faq}</a>
            <a href="#contact" className="text-sm font-semibold text-slate-300 hover:text-white transition-all duration-300">{t.nav.contact}</a>
          </nav>

          {/* CTA & Language selector - Desktop */}
          <div className="hidden md:flex items-center gap-4">
            {/* Language Selector Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 hover:border-pink-500/30 text-xs font-bold text-slate-300 hover:text-white transition-all duration-300 focus:outline-none"
              >
                <Globe size={14} className="text-pink-500 animate-pulse" />
                <span>{lang.toUpperCase()}</span>
                <ChevronDown size={12} className={`transition-transform duration-300 ${isLangDropdownOpen ? 'rotate-180 text-pink-400' : ''}`} />
              </button>
              
              {isLangDropdownOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setIsLangDropdownOpen(false)} />
                  <div className="absolute right-0 mt-2 w-32 bg-[#07080d]/95 backdrop-blur-md border border-white/10 rounded-xl p-1.5 shadow-2xl z-50 animate-fade-in flex flex-col gap-1">
                    {[
                      { code: 'fr', label: '🇫🇷 Français' },
                      { code: 'en', label: '🇬🇧 English' },
                      { code: 'es', label: '🇪🇸 Español' }
                    ].map((item) => (
                      <button
                        key={item.code}
                        onClick={() => {
                          setLang(item.code);
                          setIsLangDropdownOpen(false);
                        }}
                        className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all duration-300 flex items-center justify-between ${
                          lang === item.code 
                            ? 'bg-gradient-to-r from-pink-500/10 to-violet-500/10 text-pink-400 border border-pink-500/20' 
                            : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
                        }`}
                      >
                        <span>{item.label}</span>
                        {lang === item.code && <Check size={12} strokeWidth={3} className="text-pink-500" />}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Install Button */}
            <a 
              href={INSTALL_DEEPLINK_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white gradient-button shadow-lg shadow-pink-500/10 cursor-pointer"
            >
              <Smartphone size={14} />
              {t.nav.install}
            </a>
          </div>

          {/* Hamburger Menu Toggle - Mobile */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-white transition-all duration-300 focus:outline-none"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-16 bg-[#07080d]/95 backdrop-blur-2xl border-b border-white/10 z-30 py-6 px-4 animate-in fade-in-0 slide-in-from-top-4 duration-300 select-none">
          <nav className="flex flex-col gap-4 text-center">
            <a 
              href="#features" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-sm font-semibold text-slate-300 hover:text-white py-2 border-b border-white/5"
            >
              {t.nav.features}
            </a>
            <a 
              href="#demo" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-sm font-semibold text-slate-300 hover:text-white py-2 border-b border-white/5"
            >
              {t.nav.demos}
            </a>
            <a 
              href="#faq" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-sm font-semibold text-slate-300 hover:text-white py-2 border-b border-white/5"
            >
              {t.nav.faq}
            </a>
            <a 
              href="#contact" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-sm font-semibold text-slate-300 hover:text-white py-2 border-b border-white/5"
            >
              {t.nav.contact}
            </a>

            {/* Language Toggle Selector - Mobile */}
            <div className="flex justify-center gap-2 py-3 border-b border-white/5">
              {[
                { code: 'fr', label: '🇫🇷 FR' },
                { code: 'en', label: '🇬🇧 EN' },
                { code: 'es', label: '🇪🇸 ES' }
              ].map((item) => (
                <button
                  key={item.code}
                  onClick={() => {
                    setLang(item.code);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all duration-300 ${
                    lang === item.code 
                      ? 'bg-gradient-to-r from-pink-500/10 to-violet-500/10 text-pink-400 border-pink-500/20 shadow-md' 
                      : 'bg-black/20 border-white/5 text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <a 
              href={INSTALL_DEEPLINK_URL}
              target="_blank"
              rel="noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold text-white gradient-button mt-2 shadow-lg"
            >
              <Smartphone size={16} />
              {t.nav.install}
            </a>
          </nav>
        </div>
      )}

      {/* Main content body */}
      <main className="flex-1 pt-24 sm:pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-24 sm:space-y-32">
          
          {/* 2. Hero Section */}
          <section className="relative grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Background glowing blobs */}
            <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 size-72 rounded-full bg-violet-600/10 blur-[100px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 size-72 rounded-full bg-pink-500/10 blur-[100px] pointer-events-none" />

            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-center lg:text-left">
              
              {/* Premium micro badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-slate-300 animate-fade-in">
                <span className="flex size-2 rounded-full bg-pink-500 animate-ping" />
                {t.hero.microBadge}
              </div>

              {/* Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight sm:leading-none tracking-tight text-white">
                {t.hero.headline} <br />
                <span className="gradient-text">Abyss IA</span>
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg text-slate-400 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
                {t.hero.subtitle}
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <a
                  href={INSTALL_DEEPLINK_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-bold text-white gradient-button shadow-xl shadow-pink-500/15 cursor-pointer text-base"
                >
                  <Smartphone size={18} />
                  {t.hero.ctaInstall}
                  <ArrowRight size={16} />
                </a>
                <a 
                  href="#demo" 
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-bold bg-white/5 border border-white/10 hover:bg-white/10 text-slate-300 hover:text-white transition-all duration-300 text-base"
                >
                  {t.hero.ctaDemo}
                </a>
              </div>

              {/* Trust Badge */}
              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-400">
                <div className="flex items-center gap-1.5">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => <Star key={i} size={14} className="fill-current" />)}
                  </div>
                  <span>{t.hero.trustBadge1}</span>
                </div>
                <div className="h-4 w-px bg-white/10 hidden sm:block" />
                <div className="flex items-center gap-1.5">
                  <ShieldCheck size={16} className="text-emerald-400" />
                  <span>{t.hero.trustBadge2}</span>
                </div>
              </div>

            </div>

            {/* Right Mockup Display */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end w-full">
              <AppMockupShowcase />
            </div>

          </section>

          {/* 3. Interactive Demos Segment (Pomodoro & Habits) */}
          <section id="demo" className="space-y-10 sm:space-y-12 scroll-mt-20">
            
            {/* Header section */}
            <div className="text-center max-w-2xl mx-auto space-y-4">
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                {t.demos.sectionTitle}
              </h2>
              <p className="text-sm sm:text-base text-slate-400">
                {t.demos.sectionSubtitle}
              </p>
            </div>

            {/* Side-by-side Demos */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              
              {/* Pomodoro Demo Panel */}
              <div id="pomodoro" className="lg:col-span-5 flex flex-col justify-center">
                <PomodoroDemo lang={lang} />
              </div>

              {/* Habit Tracker Demo Panel */}
              <div id="habits" className="lg:col-span-7 flex flex-col justify-center">
                <HabitTrackerDemo lang={lang} />
              </div>

            </div>

          </section>

          {/* 4. Features Grid */}
          <section id="features" className="space-y-12 scroll-mt-20">
            
            {/* Header */}
            <div className="text-center max-w-2xl mx-auto space-y-4">
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                {t.features.sectionTitle}
              </h2>
              <p className="text-sm sm:text-base text-slate-400">
                {t.features.sectionSubtitle}
              </p>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              
              {/* Feature 1 */}
              <div className="glass-card rounded-2xl p-6 flex flex-col space-y-4">
                <div className="size-11 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400">
                  <Brain size={22} className="animate-pulse" />
                </div>
                <h3 className="text-lg font-bold text-white">{t.features.feat1Title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {t.features.feat1Desc}
                </p>
              </div>

              {/* Feature 2 */}
              <div className="glass-card rounded-2xl p-6 flex flex-col space-y-4">
                <div className="size-11 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400">
                  <Zap size={22} className="animate-bounce" />
                </div>
                <h3 className="text-lg font-bold text-white">{t.features.feat2Title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {t.features.feat2Desc}
                </p>
              </div>

              {/* Feature 3 */}
              <div className="glass-card rounded-2xl p-6 flex flex-col space-y-4">
                <div className="size-11 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                  <BarChart3 size={22} />
                </div>
                <h3 className="text-lg font-bold text-white">{t.features.feat3Title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {t.features.feat3Desc}
                </p>
              </div>

              {/* Feature 4 */}
              <div className="glass-card rounded-2xl p-6 flex flex-col space-y-4">
                <div className="size-11 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <ShieldCheck size={22} />
                </div>
                <h3 className="text-lg font-bold text-white">{t.features.feat4Title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {t.features.feat4Desc}
                </p>
              </div>

              {/* Feature 5 */}
              <div className="glass-card rounded-2xl p-6 flex flex-col space-y-4">
                <div className="size-11 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400">
                  <Users size={22} />
                </div>
                <h3 className="text-lg font-bold text-white">{t.features.feat5Title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {t.features.feat5Desc}
                </p>
              </div>

              {/* Feature 6 */}
              <div className="glass-card rounded-2xl p-6 flex flex-col space-y-4 justify-between border-dashed border-white/20 bg-transparent hover:border-pink-500/30 transition-all duration-300">
                <div className="space-y-4">
                  <div className="size-11 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400">
                    <Sparkles size={22} />
                  </div>
                  <h3 className="text-lg font-bold text-white">{t.features.feat6Title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    {t.features.feat6Desc}
                  </p>
                </div>
                <a
                  href={INSTALL_DEEPLINK_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full mt-4 flex items-center justify-center gap-2 py-3 rounded-xl border border-white/10 hover:border-pink-500/30 text-xs font-bold text-slate-300 hover:text-white transition-all duration-300 bg-white/5"
                >
                  {t.nav.install}
                  <ArrowRight size={14} />
                </a>
              </div>

            </div>

          </section>

          {/* 5. Dashboard Preview Mockups Section */}
          <section className="space-y-12">
            <div className="glass-card rounded-[2.5rem] p-6 sm:p-10 lg:p-12 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-violet-600/10 rounded-full blur-[100px] pointer-events-none" />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                
                {/* Left Columns - Text content */}
                <div className="lg:col-span-5 space-y-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/15 border border-violet-500/20 text-xs font-semibold text-violet-300">
                    {t.dashboard.microBadge}
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight">
                    {t.dashboard.title}
                  </h2>
                  <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
                    {t.dashboard.subtitle}
                  </p>
                  <ul className="space-y-3.5 pt-2">
                    {[
                      t.dashboard.bullet1,
                      t.dashboard.bullet2,
                      t.dashboard.bullet3,
                      t.dashboard.bullet4
                    ].map(item => (
                      <li key={item} className="flex items-center gap-2.5 text-sm text-slate-300">
                        <CheckCircle2 size={16} className="text-pink-500 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Right Columns - Premium Interactive React Dashboard Widget */}
                <div className="lg:col-span-7 flex flex-col items-stretch justify-center w-full">
                  <InteractiveDashboardDemo lang={lang} />
                </div>

              </div>
            </div>
          </section>

          {/* 6. Extensive FAQ Section */}
          <section id="faq" className="space-y-12 scroll-mt-20">
            
            {/* Header */}
            <div className="text-center max-w-2xl mx-auto space-y-4">
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                {t.faq.sectionTitle}
              </h2>
              <p className="text-sm sm:text-base text-slate-400">
                {t.faq.sectionSubtitle}
              </p>
            </div>

            {/* Accordion List */}
            <div className="max-w-3xl mx-auto space-y-3.5">
              {currentFaqData.map((faq, index) => {
                const isActive = activeFaq === index;
                return (
                  <div 
                    key={index} 
                    className={`rounded-2xl transition-all duration-300 ${
                      isActive 
                        ? 'bg-white/5 border border-pink-500/20' 
                        : 'bg-white/3 border border-white/5 hover:border-white/10'
                    }`}
                  >
                    <button
                      onClick={() => setActiveFaq(isActive ? null : index)}
                      className="w-full flex items-center justify-between p-5 text-left text-white font-bold text-sm sm:text-base gap-4"
                    >
                      <span>{faq.question}</span>
                      <ChevronDown 
                        size={18} 
                        className={`text-slate-400 transition-transform duration-300 ${isActive ? 'rotate-180 text-pink-400' : ''}`} 
                      />
                    </button>
                    
                    <div 
                      className={`overflow-hidden transition-all duration-300 ${
                        isActive ? 'max-h-[300px] border-t border-white/5' : 'max-h-0'
                      }`}
                    >
                      <p className="p-5 text-xs sm:text-sm text-slate-400 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

          </section>

          {/* 7. Bottom Installation CTA Section */}
          <section className="relative">
            {/* Glowing background */}
            <div className="absolute inset-0 bg-gradient-to-r from-violet-600/20 to-pink-500/20 blur-[120px] rounded-[2.5rem] pointer-events-none" />

            <div className="glass-card rounded-[2.5rem] p-8 sm:p-12 text-center space-y-6 sm:space-y-8 max-w-4xl mx-auto border border-pink-500/20 relative z-10">
              <div className="inline-flex items-center justify-center size-14 rounded-full bg-pink-500/10 text-pink-400 border border-pink-500/20 animate-glow">
                <Sparkles size={28} />
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
                {lang === 'fr' ? <>Optimisez Votre Temps Dès <span className="gradient-text">Aujourd'hui</span></> : 
                 lang === 'en' ? <>Optimize Your Time <span className="gradient-text">Today</span></> :
                 <>Optimice su tiempo <span className="gradient-text">hoy mismo</span></>}
              </h2>
              <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
                {lang === 'fr' ? "Téléchargez dès maintenant l'application Abyss IA et intégrez la puissance de l'intelligence artificielle au service de votre réussite." :
                 lang === 'en' ? "Download the Abyss IA app now and integrate the power of artificial intelligence to support your success." :
                 "Descargue la aplicación Abyss IA ahora e integre el poder de la inteligencia artificial al servicio de su éxito."}
              </p>
              
              <div className="pt-2">
                <a
                  href={INSTALL_DEEPLINK_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-10 py-4.5 rounded-2xl font-bold text-white gradient-button shadow-xl shadow-pink-500/20 text-base cursor-pointer"
                >
                  <Smartphone size={18} />
                  {t.hero.ctaInstall}
                  <ArrowRight size={18} />
                </a>
              </div>

              <div className="flex justify-center items-center gap-4 text-xs text-slate-500">
                <span className="flex items-center gap-1">
                  <ShieldCheck size={14} className="text-emerald-400" />
                  {t.hero.trustBadge2}
                </span>
                <span className="h-3 w-px bg-white/10" />
                <span>Version 1.0.4 - Premium</span>
              </div>
            </div>
          </section>

          {/* 8. Contact & Support Section */}
          <section id="contact" className="space-y-12 scroll-mt-20">
            <div className="text-center max-w-2xl mx-auto space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/15 border border-violet-500/20 text-xs font-semibold text-violet-300">
                {t.contact.microBadge}
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                {t.contact.sectionTitle}
              </h2>
              <p className="text-sm sm:text-base text-slate-400">
                {t.contact.sectionSubtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Contact Card 1: Email */}
              <div className="glass-card rounded-2xl p-6 sm:p-8 flex flex-col justify-between items-start space-y-6 relative overflow-hidden group hover:border-pink-500/30 transition-all duration-300">
                <div className="absolute top-0 right-0 w-24 h-24 bg-pink-500/5 rounded-full blur-2xl pointer-events-none" />
                <div className="space-y-4">
                  <div className="size-12 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400 group-hover:scale-105 transition-all duration-300">
                    <Mail size={24} />
                  </div>
                  <h3 className="text-lg font-bold text-white">{t.contact.emailTitle}</h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    {t.contact.emailDesc}
                  </p>
                </div>
                <a 
                  href={`mailto:${SUPPORT_EMAIL}`} 
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-white/10 hover:border-pink-500/30 text-xs font-bold text-slate-300 hover:text-white transition-all duration-300 bg-white/5 w-full justify-center"
                >
                  {SUPPORT_EMAIL}
                  <ArrowRight size={14} />
                </a>
              </div>

              {/* Contact Card 2: Phone */}
              <div className="glass-card rounded-2xl p-6 sm:p-8 flex flex-col justify-between items-start space-y-6 relative overflow-hidden group hover:border-violet-500/30 transition-all duration-300">
                <div className="absolute top-0 right-0 w-24 h-24 bg-violet-600/5 rounded-full blur-2xl pointer-events-none" />
                <div className="space-y-4">
                  <div className="size-12 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400 group-hover:scale-105 transition-all duration-300">
                    <Phone size={24} />
                  </div>
                  <h3 className="text-lg font-bold text-white">{t.contact.phoneTitle}</h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    {t.contact.phoneDesc}
                  </p>
                </div>
                <a 
                  href={`tel:${SUPPORT_PHONE.replace(/\s/g, '')}`} 
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-white/10 hover:border-violet-500/30 text-xs font-bold text-slate-300 hover:text-white transition-all duration-300 bg-white/5 w-full justify-center"
                >
                  {SUPPORT_PHONE}
                  <ArrowRight size={14} />
                </a>
              </div>
            </div>
          </section>

        </div>
      </main>

      {/* 9. Super Professional Multi-Column Footer */}
      <footer className="bg-[#05060b] border-t border-white/5 pt-16 pb-8 relative z-10 text-slate-400 select-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 pb-12 border-b border-white/5">
            
            {/* Column 1 - Brand Info */}
            <div className="lg:col-span-4 space-y-4 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2.5">
                <img 
                  src="/logo.png" 
                  alt="Abyss IA Logo" 
                  className="size-7 rounded-lg border border-white/10 shadow-md"
                />
                <span className="text-lg font-black text-white tracking-tight font-heading">
                  Abyss <span className="text-pink-500">IA</span>
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed max-w-sm mx-auto md:mx-0">
                {t.footer.brandDesc}
              </p>
            </div>

            {/* Column 2 - Product quick links */}
            <div className="lg:col-span-2 text-center md:text-left space-y-3.5">
              <h4 className="text-xs font-black text-white uppercase tracking-wider">{t.footer.colProduct}</h4>
              <ul className="space-y-2 text-xs">
                <li><a href="#features" className="hover:text-white transition-colors duration-300">{t.nav.features}</a></li>
                <li><a href="#pomodoro" className="hover:text-white transition-colors duration-300">{t.nav.demos} (Pomodoro)</a></li>
                <li><a href="#habits" className="hover:text-white transition-colors duration-300">{t.nav.demos} (Habit Tracker)</a></li>
              </ul>
            </div>

            {/* Column 3 - Community links */}
            <div className="lg:col-span-3 text-center md:text-left space-y-3.5">
              <h4 className="text-xs font-black text-white uppercase tracking-wider">{t.footer.colCommunity}</h4>
              <ul className="space-y-2 text-xs">
                <li>
                  <a 
                    href={SUPPORT_DISCORD_URL} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="inline-flex items-center gap-1 hover:text-white transition-colors duration-300"
                  >
                    <MessageSquare size={13} />
                    <span>Discord Officiel</span>
                    <ExternalLink size={10} className="text-slate-600" />
                  </a>
                </li>
                <li><a href="#" className="hover:text-white transition-colors duration-300">Twitter / X</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-300">Blog Abyss IA</a></li>
              </ul>
            </div>

            {/* Column 4 - Support & Legal info */}
            <div className="lg:col-span-3 text-center md:text-left space-y-3.5">
              <h4 className="text-xs font-black text-white uppercase tracking-wider">{t.footer.colSupport}</h4>
              <ul className="space-y-2 text-xs">
                <li>
                  <a href={`mailto:${SUPPORT_EMAIL}`} className="inline-flex items-center gap-1.5 hover:text-white transition-colors duration-300">
                    <Mail size={13} />
                    <span>{SUPPORT_EMAIL}</span>
                  </a>
                </li>
                <li>
                  <a href={`tel:${SUPPORT_PHONE.replace(/\s/g, '')}`} className="inline-flex items-center gap-1.5 hover:text-white transition-colors duration-300">
                    <Phone size={13} />
                    <span>{SUPPORT_PHONE}</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="inline-flex items-center gap-1.5 hover:text-white transition-colors duration-300">
                    <Shield size={13} />
                    <span>{t.footer.legal}</span>
                  </a>
                </li>
              </ul>
              {/* Play Store Certification icon */}
              <div className="pt-2 flex justify-center md:justify-start">
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/5 border border-emerald-500/10 text-[10px] text-emerald-400 font-bold">
                  <ShieldCheck size={14} />
                  <span>Google Play Protect Certifié</span>
                </div>
              </div>
            </div>

          </div>

          {/* Bottom row copyrights */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center text-[10px] text-slate-500">
            <div className="space-y-1">
              <p>© {new Date().getFullYear()} {t.footer.copyright}</p>
              <p className="text-[9px] text-slate-600">{t.footer.subNote}</p>
            </div>
            <div className="flex gap-4">
              <a href="#" className="hover:text-slate-300 transition-colors duration-300">{t.footer.legal}</a>
              <a href="#" className="hover:text-slate-300 transition-colors duration-300">{t.footer.cgu}</a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
