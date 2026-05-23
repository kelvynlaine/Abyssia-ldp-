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
  FileText
} from 'lucide-react';

import PomodoroDemo from './components/PomodoroDemo';
import HabitTrackerDemo from './components/HabitTrackerDemo';
import AppMockupShowcase from './components/AppMockupShowcase';
import InteractiveDashboardDemo from './components/InteractiveDashboardDemo';
import { INSTALL_DEEPLINK_URL, SUPPORT_DISCORD_URL, BRAND_EMAIL, SUPPORT_EMAIL, SUPPORT_PHONE } from './config/deeplink';


export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);

  const faqData = [
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
  ];

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
            <a href="#features" className="text-sm font-semibold text-slate-300 hover:text-white transition-all duration-300">Fonctionnalités</a>
            <a href="#demo" className="text-sm font-semibold text-slate-300 hover:text-white transition-all duration-300">Démonstrations</a>
            <a href="#faq" className="text-sm font-semibold text-slate-300 hover:text-white transition-all duration-300">FAQ</a>
            <a href="#contact" className="text-sm font-semibold text-slate-300 hover:text-white transition-all duration-300">Contact</a>
          </nav>

          {/* CTA header button - Desktop */}
          <div className="hidden md:flex items-center gap-3">
            <a 
              href={INSTALL_DEEPLINK_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white gradient-button shadow-lg shadow-pink-500/10 cursor-pointer"
            >
              <Smartphone size={14} />
              Installer l'App
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
        <div className="md:hidden fixed inset-x-0 top-16 bg-[#07080d]/95 backdrop-blur-2xl border-b border-white/10 z-30 py-6 px-4 animate-in fade-in-0 slide-in-from-top-4 duration-300">
          <nav className="flex flex-col gap-4 text-center">
            <a 
              href="#features" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-sm font-semibold text-slate-300 hover:text-white py-2 border-b border-white/5"
            >
              Fonctionnalités
            </a>
            <a 
              href="#demo" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-sm font-semibold text-slate-300 hover:text-white py-2 border-b border-white/5"
            >
              Démonstrations
            </a>
            <a 
              href="#faq" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-sm font-semibold text-slate-300 hover:text-white py-2 border-b border-white/5"
            >
              FAQ
            </a>
            <a 
              href="#contact" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-sm font-semibold text-slate-300 hover:text-white py-2 border-b border-white/5"
            >
              Contact
            </a>
            <a 
              href={INSTALL_DEEPLINK_URL}
              target="_blank"
              rel="noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold text-white gradient-button mt-4 shadow-lg"
            >
              <Smartphone size={16} />
              Installer l'Application
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
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-slate-300">
                <span className="flex size-2 rounded-full bg-pink-500 animate-ping" />
                Assistant Personnel IA Révolutionnaire
              </div>

              {/* Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight sm:leading-none tracking-tight text-white">
                Visez l'excellence avec <br />
                <span className="gradient-text">Abyss IA</span>
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg text-slate-400 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
                Découvrez Abyss IA, votre application de productivité intelligente tout-en-un. Gérez vos tâches quotidiennes, optimisez votre temps avec le Pomodoro intelligent et suivez vos habitudes pour pulvériser tous vos objectifs.
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
                  Installer l'application
                  <ArrowRight size={16} />
                </a>
                <a 
                  href="#demo" 
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-bold bg-white/5 border border-white/10 hover:bg-white/10 text-slate-300 hover:text-white transition-all duration-300 text-base"
                >
                  Découvrir la démo interactive
                </a>
              </div>

              {/* Trust Badge */}
              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-400">
                <div className="flex items-center gap-1.5">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => <Star key={i} size={14} className="fill-current" />)}
                  </div>
                  <span>Meilleure App IA 2024</span>
                </div>
                <div className="h-4 w-px bg-white/10 hidden sm:block" />
                <div className="flex items-center gap-1.5">
                  <ShieldCheck size={16} className="text-emerald-400" />
                  <span>Google Play Protect Certifié</span>
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
                Essayez l'Expérience <span className="gradient-text">Abyss IA</span> en Direct
              </h2>
              <p className="text-sm sm:text-base text-slate-400">
                Découvrez la fluidité de nos outils avec ces composants de démonstration interactifs en temps réel.
              </p>
            </div>

            {/* Side-by-side Demos */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              
              {/* Pomodoro Demo Panel */}
              <div id="pomodoro" className="lg:col-span-5 flex flex-col justify-center">
                <PomodoroDemo />
              </div>

              {/* Habit Tracker Demo Panel */}
              <div id="habits" className="lg:col-span-7 flex flex-col justify-center">
                <HabitTrackerDemo />
              </div>

            </div>

          </section>

          {/* 4. Features Grid */}
          <section id="features" className="space-y-12 scroll-mt-20">
            
            {/* Header */}
            <div className="text-center max-w-2xl mx-auto space-y-4">
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                Propulsé par <span className="gradient-text">L'Intelligence Artificielle</span>
              </h2>
              <p className="text-sm sm:text-base text-slate-400">
                Abyss IA intègre des fonctionnalités révolutionnaires conçues pour maximiser votre temps de travail et éliminer la procrastination.
              </p>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              
              {/* Feature 1 */}
              <div className="glass-card rounded-2xl p-6 flex flex-col space-y-4">
                <div className="size-11 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400">
                  <Brain size={22} className="animate-pulse" />
                </div>
                <h3 className="text-lg font-bold text-white">Gestion Intelligente des Tâches</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  L'assistant IA d'Abyss analyse vos tâches et crée automatiquement des sous-tâches gérables, estime la durée et priorise intelligemment selon vos objectifs SMART.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="glass-card rounded-2xl p-6 flex flex-col space-y-4">
                <div className="size-11 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400">
                  <Zap size={22} className="animate-bounce" />
                </div>
                <h3 className="text-lg font-bold text-white">Contrôle Anti-Procrastination</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Un système de gamification engageant avec des EXP, des niveaux et un assistant personnel IA qui vous envoie des encouragements motivants au moment exact où vous en avez besoin.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="glass-card rounded-2xl p-6 flex flex-col space-y-4">
                <div className="size-11 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                  <BarChart3 size={22} />
                </div>
                <h3 className="text-lg font-bold text-white">Analyses Statistiques Avancées</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  L'analyse de productivité IA identifie vos pics de performance cognitifs quotidiens et vous fournit des rapports hebdomadaires détaillés avec des insights actionnables.
                </p>
              </div>

              {/* Feature 4 */}
              <div className="glass-card rounded-2xl p-6 flex flex-col space-y-4">
                <div className="size-11 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <ShieldCheck size={22} />
                </div>
                <h3 className="text-lg font-bold text-white">Chiffrement & Sécurité Globale</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Vos données personnelles, plannings et conversations sont chiffrés de bout en bout. Nous respectons à 100% votre vie privée et ne revendons aucune information.
                </p>
              </div>

              {/* Feature 5 */}
              <div className="glass-card rounded-2xl p-6 flex flex-col space-y-4">
                <div className="size-11 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400">
                  <Users size={22} />
                </div>
                <h3 className="text-lg font-bold text-white">Communauté Discord Active</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Rejoignez des milliers d'étudiants, d'entrepreneurs et de passionnés sur notre serveur Discord pour poser vos questions, échanger des astuces et progresser ensemble.
                </p>
              </div>

              {/* Feature 6 */}
              <div className="glass-card rounded-2xl p-6 flex flex-col space-y-4 justify-between border-dashed border-white/20 bg-transparent hover:border-pink-500/30 transition-all duration-300">
                <div className="space-y-4">
                  <div className="size-11 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400">
                    <Sparkles size={22} />
                  </div>
                  <h3 className="text-lg font-bold text-white">Nouveautés en Avant-Première</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    Notre équipe travaille chaque jour sur de nouvelles extensions intelligentes. Rejoignez nos canaux pour voter pour les prochaines fonctionnalités !
                  </p>
                </div>
                <a
                  href={INSTALL_DEEPLINK_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full mt-4 flex items-center justify-center gap-2 py-3 rounded-xl border border-white/10 hover:border-pink-500/30 text-xs font-bold text-slate-300 hover:text-white transition-all duration-300 bg-white/5"
                >
                  Installer Abyss IA
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
                    Séries d'Habitudes & Rapports
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight">
                    Suivez Votre Progression <br /> Avec Des Statistiques Claires
                  </h2>
                  <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
                    Notre tracker d'habitudes avec IA analyse vos routines hebdomadaires et vous propose des insights pertinents pour anticiper les baisses de régime et optimiser vos pics d'attention.
                  </p>
                  <ul className="space-y-3.5 pt-2">
                    {[
                      "Recommandations de routines durables",
                      "Détection intelligente des baisses de rythme",
                      "Planification adaptative de sessions Pomodoro",
                      "EXP bonus pour la complétion des objectifs"
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
                  <InteractiveDashboardDemo />
                </div>

              </div>
            </div>
          </section>

          {/* 6. Extensive FAQ Section */}
          <section id="faq" className="space-y-12 scroll-mt-20">
            
            {/* Header */}
            <div className="text-center max-w-2xl mx-auto space-y-4">
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                Vos Questions, <span className="gradient-text">Nos Réponses</span>
              </h2>
              <p className="text-sm sm:text-base text-slate-400">
                Tout ce que vous devez savoir sur notre assistant IA de productivité.
              </p>
            </div>

            {/* Accordion List */}
            <div className="max-w-3xl mx-auto space-y-3.5">
              {faqData.map((faq, index) => {
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
                Optimisez Votre Temps Dès <span className="gradient-text">Aujourd'hui</span>
              </h2>
              <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
                Téléchargez dès maintenant l'application Abyss IA et intégrez la puissance de l'intelligence artificielle au service de votre réussite.
              </p>
              
              <div className="pt-2">
                <a
                  href={INSTALL_DEEPLINK_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-10 py-4.5 rounded-2xl font-bold text-white gradient-button shadow-xl shadow-pink-500/20 text-base cursor-pointer"
                >
                  <Smartphone size={18} />
                  Installer l'application mobile
                  <ArrowRight size={18} />
                </a>
              </div>

              <div className="flex justify-center items-center gap-4 text-xs text-slate-500">
                <span className="flex items-center gap-1">
                  <ShieldCheck size={14} className="text-emerald-400" />
                  Google Play Protect Certifié
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
                Support & Assistance
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                Un Problème ? <span className="gradient-text">Contactez-nous</span>
              </h2>
              <p className="text-sm sm:text-base text-slate-400">
                Notre équipe est à votre entière disposition pour résoudre vos soucis techniques ou répondre à vos suggestions.
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
                  <h3 className="text-lg font-bold text-white">Par E-mail</h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    Envoyez-nous un e-mail à tout moment. Nous répondons généralement en moins de 24 heures aux demandes d'assistance technique ou de suggestions pour l'application.
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
                  <h3 className="text-lg font-bold text-white">Par Téléphone</h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    Besoin d'une réponse directe ? Notre support par téléphone est joignable du lundi au vendredi de 9h à 18h pour toute urgence technique.
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
                L'assistant de productivité intelligent nouvelle génération. Notre écosystème intègre des trackers d'habitudes, des outils Pomodoro et de l'intelligence artificielle pour maximiser votre temps et éliminer la procrastination.
              </p>
              {/* Dynamic Newsletter Simulation */}
              <div className="pt-2">
                <form className="flex gap-2 max-w-xs mx-auto md:mx-0" onSubmit={(e) => e.preventDefault()}>
                  <input 
                    type="email" 
                    placeholder="Votre email..." 
                    className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-pink-500 transition-all duration-300 w-full"
                  />
                  <button className="bg-white/5 border border-white/10 hover:bg-white/10 text-xs px-3 rounded-lg text-white font-bold transition-all duration-300">
                    S'abonner
                  </button>
                </form>
                <p className="text-[10px] text-slate-600 mt-1.5 text-center md:text-left">Inscrivez-vous à nos newsletters pour recevoir nos astuces de productivité.</p>
              </div>
            </div>

            {/* Column 2 - Product quick links */}
            <div className="lg:col-span-2 text-center md:text-left space-y-3.5">
              <h4 className="text-xs font-black text-white uppercase tracking-wider">Produit</h4>
              <ul className="space-y-2 text-xs">
                <li><a href="#features" className="hover:text-white transition-colors duration-300">Fonctionnalités</a></li>
                <li><a href="#pomodoro" className="hover:text-white transition-colors duration-300">Chronomètre Focus</a></li>
                <li><a href="#habits" className="hover:text-white transition-colors duration-300">Suivi d'Habitudes</a></li>
                <li><a href="#demo" className="hover:text-white transition-colors duration-300">Démo Interactive</a></li>
              </ul>
            </div>

            {/* Column 3 - Community links */}
            <div className="lg:col-span-3 text-center md:text-left space-y-3.5">
              <h4 className="text-xs font-black text-white uppercase tracking-wider">Communauté</h4>
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
                <li><a href="#" className="hover:text-white transition-colors duration-300">Guide de Productivité</a></li>
              </ul>
            </div>

            {/* Column 4 - Support & Legal info */}
            <div className="lg:col-span-3 text-center md:text-left space-y-3.5">
              <h4 className="text-xs font-black text-white uppercase tracking-wider">Contact & Support</h4>
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
                    <span>Mentions Légales</span>
                  </a>
                </li>
              </ul>
              {/* Play Store Certification icon */}
              <div className="pt-2 flex justify-center md:justify-start">
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/5 border border-emerald-500/10 text-[10px] text-emerald-400 font-bold">
                  <ShieldCheck size={14} />
                  <span>Google Play Protect Activé</span>
                </div>
              </div>
            </div>

          </div>

          {/* Bottom row copyrights */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center text-[10px] text-slate-500">
            <div className="space-y-1">
              <p>© {new Date().getFullYear()} Abyss IA. Tous droits réservés.</p>
              <p className="text-[9px] text-slate-600">Application IA productivité France - Système de concentration et d'habitudes intelligent.</p>
            </div>
            <div className="flex gap-4">
              <a href="#" className="hover:text-slate-300 transition-colors duration-300">Conditions Générales</a>
              <a href="#" className="hover:text-slate-300 transition-colors duration-300">Données Personnelles</a>
              <a href="#" className="hover:text-slate-300 transition-colors duration-300">Cookies</a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
