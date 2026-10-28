import { useState } from 'react';
import { 
  Sparkles, 
  Zap, 
  GraduationCap,
  NotebookPen,
  Timer,
  ArrowRight, 
  CheckCircle2, 
  ChevronDown, 
  Smartphone,
  MessageSquare,
  Menu,
  X,
  Mail,
  Phone,
  ExternalLink,
  Shield,
  Globe,
  Check
} from 'lucide-react';

import PomodoroDemo from './components/PomodoroDemo';
import HabitTrackerDemo from './components/HabitTrackerDemo';
import AppScreenCarousel from './components/AppScreenCarousel';
import MockupGallery from './components/MockupGallery';
import KeynoteVideo from './components/KeynoteVideo';
import AndroidBetaForm from './components/AndroidBetaForm';
import { FAQ_DATA } from './config/faq';
import { HALLOWEEN } from './components/halloweenTrailer';
import InteractiveDashboardDemo from './components/InteractiveDashboardDemo';
import WhatsNew from './components/WhatsNew';
import { TRANSLATIONS } from './config/translations';
import { WHATS_NEW } from './config/whatsnew';
import { APP_STORE_URL, SUPPORT_DISCORD_URL, SUPPORT_EMAIL, SUPPORT_PHONE } from './config/deeplink';

export default function App() {
  const [lang, setLang] = useState('fr');
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);

  const t = TRANSLATIONS[lang] || TRANSLATIONS.fr;
  const whatsNewLabel = (WHATS_NEW[lang] || WHATS_NEW.fr).microBadge;

  const faqData = FAQ_DATA;



  const currentFaqData = faqData[lang] || faqData.fr;

  return (
    <div className="gradient-bg min-h-screen text-slate-100 flex flex-col font-sans select-none w-full overflow-x-hidden">
      
      {/* 1. Header / Navigation */}
      <header className="fixed top-0 inset-x-0 h-16 glass-nav z-40 transition-all duration-300">
        <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 flex items-center justify-between">
          
          {/* Logo brand */}
          <a href="#" className="flex items-center gap-2.5 group">
            <img 
              src="/logo-abyssia.png" 
              alt="Abyssia Logo" 
              className="size-9 rounded-xl border border-white/20 group-hover:scale-105 transition-all duration-300 animate-glow"
            />
            <span className="text-xl font-black tracking-tight text-white font-heading">
              Abyss<span className="text-pink-500">ia</span>
            </span>
          </a>

          {/* Nav links - Desktop */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-semibold text-slate-300 hover:text-white transition-all duration-300">{t.nav.features}</a>
            {/* Masqué entre md et lg : avec cinq liens, l'en-tête déborde en dessous de 1024 px. */}
            <a href="#nouveautes" className="hidden lg:inline text-sm font-semibold text-slate-300 hover:text-white transition-all duration-300">{whatsNewLabel}</a>
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
                  <div className="absolute right-0 mt-2 w-36 bg-[#07080d]/95 backdrop-blur-md border border-white/10 rounded-xl p-1.5 shadow-2xl z-50 animate-fade-in flex flex-col gap-1">
                    {[
                      { code: 'fr', label: '🇫🇷 Français' },
                      { code: 'en', label: '🇬🇧 English' },
                      { code: 'es', label: '🇪🇸 Español' },
                      { code: 'zh', label: '🇨🇳 中文' },
                      { code: 'it', label: '🇮🇹 Italiano' },
                      { code: 'ru', label: '🇷🇺 Русский' },
                      { code: 'uk', label: '🇺🇦 Українська' }
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

            {/* Install Button -> section de choix du store */}
            <a
              href="#appstore"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white gradient-button shadow-lg shadow-pink-500/10 cursor-pointer"
            >
              <Smartphone size={14} />
              {t.nav.install}
            </a>
          </div>

          {/* Hamburger Menu Toggle - Mobile */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden size-11 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-white transition-all duration-300 focus:outline-none"
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
              href="#nouveautes" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-sm font-semibold text-slate-300 hover:text-white py-2 border-b border-white/5"
            >
              {whatsNewLabel}
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
            <div className="flex flex-wrap justify-center gap-2 py-3 border-b border-white/5">
              {[
                { code: 'fr', label: '🇫🇷 FR' },
                { code: 'en', label: '🇬🇧 EN' },
                { code: 'es', label: '🇪🇸 ES' },
                { code: 'zh', label: '🇨🇳 中文' },
                { code: 'it', label: '🇮🇹 IT' },
                { code: 'ru', label: '🇷🇺 RU' },
                { code: 'uk', label: '🇺🇦 UK' }
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
              href="#appstore"
              onClick={() => setIsMobileMenuOpen(false)}
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
                <span className="gradient-text">Abyssia</span>
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg text-slate-400 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
                {t.hero.subtitle}
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <a
                  href="#appstore"
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
                  <Sparkles size={15} className="text-violet-400" />
                  <span>{t.hero.trustBadge1}</span>
                </div>
                <div className="h-4 w-px bg-white/10 hidden sm:block" />
                <div className="flex items-center gap-1.5">
                  <Smartphone size={16} className="text-emerald-400" />
                  <span>{t.hero.trustBadge2}</span>
                </div>
              </div>

            </div>

            {/* Right Mockup Display */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end w-full">
              <AppScreenCarousel lang={lang} />
            </div>

          </section>

          {/* 2.4 Bande-annonce Halloween (saisonnière, à retirer après le 2 novembre) */}
          <KeynoteVideo lang={lang} variante={HALLOWEEN} />

          {/* 2.5 Film de présentation (juste après le héros) */}
          <KeynoteVideo lang={lang} />

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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              
              {/* Feature 1 */}
              <div className="glass-card rounded-2xl p-5 sm:p-6 flex flex-col space-y-3 sm:space-y-4">
                <div className="size-11 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400">
                  <MessageSquare size={22} className="animate-pulse" />
                </div>
                <h3 className="text-lg font-bold text-white">{t.features.feat1Title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {t.features.feat1Desc}
                </p>
              </div>

              {/* Feature 2 */}
              <div className="glass-card rounded-2xl p-5 sm:p-6 flex flex-col space-y-3 sm:space-y-4">
                <div className="size-11 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400">
                  <GraduationCap size={22} />
                </div>
                <h3 className="text-lg font-bold text-white">{t.features.feat2Title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {t.features.feat2Desc}
                </p>
              </div>

              {/* Feature 3 */}
              <div className="glass-card rounded-2xl p-5 sm:p-6 flex flex-col space-y-3 sm:space-y-4">
                <div className="size-11 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                  <Zap size={22} />
                </div>
                <h3 className="text-lg font-bold text-white">{t.features.feat3Title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {t.features.feat3Desc}
                </p>
              </div>

              {/* Feature 4 */}
              <div className="glass-card rounded-2xl p-5 sm:p-6 flex flex-col space-y-3 sm:space-y-4">
                <div className="size-11 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <NotebookPen size={22} />
                </div>
                <h3 className="text-lg font-bold text-white">{t.features.feat4Title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {t.features.feat4Desc}
                </p>
              </div>

              {/* Feature 5 */}
              <div className="glass-card rounded-2xl p-5 sm:p-6 flex flex-col space-y-3 sm:space-y-4">
                <div className="size-11 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400">
                  <Timer size={22} />
                </div>
                <h3 className="text-lg font-bold text-white">{t.features.feat5Title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {t.features.feat5Desc}
                </p>
              </div>

              {/* Feature 6 */}
              <div className="glass-card rounded-2xl p-5 sm:p-6 flex flex-col space-y-3 sm:space-y-4 justify-between border-dashed border-white/20 bg-transparent hover:border-pink-500/30 transition-all duration-300">
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
                  href="#appstore"
                  className="w-full mt-4 flex items-center justify-center gap-2 py-3 rounded-xl border border-white/10 hover:border-pink-500/30 text-xs font-bold text-slate-300 hover:text-white transition-all duration-300 bg-white/5"
                >
                  {t.nav.install}
                  <ArrowRight size={14} />
                </a>
              </div>

            </div>

          </section>

          {/* 4.5 Nouveautés de l'application */}
          <WhatsNew lang={lang} />

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

          {/* 5.5 Galerie complète des captures de l'application */}
          <MockupGallery lang={lang} />

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
                    <h3 className="m-0">
                    <button
                      type="button"
                      aria-expanded={isActive}
                      onClick={() => setActiveFaq(isActive ? null : index)}
                      className="w-full flex items-center justify-between p-5 text-left text-white font-bold text-sm sm:text-base gap-4"
                    >
                      <span>{faq.question}</span>
                      <ChevronDown 
                        size={18} 
                        className={`text-slate-400 transition-transform duration-300 ${isActive ? 'rotate-180 text-pink-400' : ''}`} 
                      />
                    </button>
                    </h3>
                    
                    <div 
                      className={`overflow-hidden transition-all duration-300 ${
                        isActive ? 'max-h-[600px] border-t border-white/5' : 'max-h-0'
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

          {/* 6.5 App Store Section */}
          <section id="appstore" className="relative scroll-mt-20">
            <div className="glass-card rounded-[2.5rem] p-8 sm:p-12 relative overflow-hidden border border-white/10">
              {/* Decorative glow */}
              <div className="absolute -top-10 -left-10 w-72 h-72 bg-sky-500/10 rounded-full blur-[110px] pointer-events-none" />
              <div className="absolute -bottom-10 -right-10 w-72 h-72 bg-violet-600/10 rounded-full blur-[110px] pointer-events-none" />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">

                {/* Left - Text content */}
                <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-slate-200">
                    {/* Apple logo */}
                    <svg viewBox="0 0 384 512" width="12" height="12" fill="currentColor" aria-hidden="true">
                      <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
                    </svg>
                    {/* Google Play logo */}
                    <svg viewBox="0 0 24 24" width="12" height="12" aria-hidden="true">
                      <path fill="#00A0FF" d="M.614 2.454v19.03L10.15 12 .614 2.454z" />
                      <path fill="#00E676" d="M1.337.924a1.86 1.86 0 0 0-.633.483l10.846 10.784 3.16-3.14L1.337.924z" />
                      <path fill="#FFCE00" d="M22.018 13.298l-3.919 2.218-3.515-3.493 3.543-3.521 3.891 2.202c1.302.771 1.302 2.052 0 2.594z" />
                      <path fill="#FF3A44" d="M1.36 23.077l13.373-7.575-3.19-3.17L.72 23.11c.196.19.42.34.64.44z" />
                    </svg>
                    {t.appstore.microBadge}
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight">
                    {t.appstore.title}
                  </h2>
                  <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-xl mx-auto lg:mx-0">
                    {t.appstore.subtitle}
                  </p>

                  {/* Bullets */}
                  <ul className="space-y-3 pt-1 inline-block text-left">
                    {[t.appstore.bullet1, t.appstore.bullet2, t.appstore.bullet3].map(item => (
                      <li key={item} className="flex items-center gap-2.5 text-sm text-slate-300">
                        <CheckCircle2 size={16} className="text-sky-400 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Store badges (App Store + Google Play) */}
                  <div className="pt-4 flex flex-wrap justify-center lg:justify-start gap-3">
                    {/* App Store badge */}
                    <a
                      href={APP_STORE_URL}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={t.appstore.cta}
                      className="group inline-flex items-center gap-3 pl-4 pr-6 py-3 rounded-2xl bg-black border border-white/15 hover:border-white/40 hover:-translate-y-0.5 shadow-xl transition-all duration-300"
                    >
                      <svg viewBox="0 0 384 512" width="26" height="26" fill="currentColor" className="text-white shrink-0" aria-hidden="true">
                        <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
                      </svg>
                      <span className="flex flex-col leading-none text-left">
                        <span className="text-[10px] text-slate-300 font-medium">{t.appstore.badgeTop}</span>
                        <span className="text-lg font-bold text-white -mt-0.5 tracking-tight">App Store</span>
                      </span>
                    </a>

                    {/* Google Play badge */}
                    <a
                      href="#beta-android"
                      aria-label={t.appstore.ctaPlay}
                      className="group inline-flex items-center gap-3 pl-4 pr-6 py-3 rounded-2xl bg-black border border-white/15 hover:border-white/40 hover:-translate-y-0.5 shadow-xl transition-all duration-300"
                    >
                      <svg viewBox="0 0 24 24" width="24" height="24" className="shrink-0" aria-hidden="true">
                        <path fill="#00A0FF" d="M.614 2.454v19.03L10.15 12 .614 2.454z" />
                        <path fill="#00E676" d="M1.337.924a1.86 1.86 0 0 0-.633.483l10.846 10.784 3.16-3.14L1.337.924z" />
                        <path fill="#FFCE00" d="M22.018 13.298l-3.919 2.218-3.515-3.493 3.543-3.521 3.891 2.202c1.302.771 1.302 2.052 0 2.594z" />
                        <path fill="#FF3A44" d="M1.36 23.077l13.373-7.575-3.19-3.17L.72 23.11c.196.19.42.34.64.44z" />
                      </svg>
                      <span className="flex flex-col leading-none text-left">
                        <span className="text-[10px] text-slate-300 font-medium">{t.appstore.badgeTopPlay}</span>
                        <span className="text-lg font-bold text-white -mt-0.5 tracking-tight">Google Play</span>
                      </span>
                    </a>
                  </div>

                  {/* Test fermé Android : le badge Google Play mène ici */}
                  <AndroidBetaForm lang={lang} />
                </div>

                {/* Right - Visual */}
                <div className="lg:col-span-5 flex justify-center">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-sky-500/20 to-violet-600/20 blur-3xl rounded-full" />
                    <div className="relative size-44 sm:size-52 rounded-[2rem] bg-gradient-to-br from-[#0a0c14] to-[#15101f] border border-white/10 flex items-center justify-center shadow-2xl">
                      <img
                        src="/logo-abyssia.png"
                        alt="Abyssia"
                        className="size-28 sm:size-32 rounded-[1.5rem] border border-white/10 shadow-lg animate-glow"
                      />
                    </div>
                  </div>
                </div>

              </div>
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
                 lang === 'es' ? <>Optimice su tiempo <span className="gradient-text">hoy mismo</span></> :
                 lang === 'zh' ? <>从今天起 <span className="gradient-text">优化您的时间</span></> :
                 lang === 'it' ? <>Ottimizza il tuo tempo <span className="gradient-text">oggi stesso</span></> :
                 lang === 'ru' ? <>Оптимизируйте свое время <span className="gradient-text">уже сегодня</span></> :
                 <>Оптимізуйте свій час <span className="gradient-text">уже сьогодні</span></>}
              </h2>
              <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
                {lang === 'fr' ? "Téléchargez dès maintenant l'application Abyssia et intégrez la puissance de l'intelligence artificielle au service de votre réussite." :
                 lang === 'en' ? "Download the Abyssia app now and integrate the power of artificial intelligence to support your success." :
                 lang === 'es' ? "Descargue la aplicación Abyssia ahora e integre el poder de la inteligencia artificial al servicio de su éxito." :
                 lang === 'zh' ? "立即下载 Abyssia 应用程序，融入人工智能的力量，为您的成功提供助力。" :
                 lang === 'it' ? "Scarica subito l'app Abyssia e integra la potenza dell'intelligenza artificiale per supportare il tuo successo." :
                 lang === 'ru' ? "Скачайте приложение Abyssia прямо сейчас и используйте всю мощь искусственного интеллекта для достижения успеха." :
                 "Завантажте додаток Abyssia прямо зараз та інтегруйте силу штучного інтелекту для вашого успіху."}
              </p>
              
              <div className="pt-2">
                <a
                  href="#appstore"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-10 py-4.5 rounded-2xl font-bold text-white gradient-button shadow-xl shadow-pink-500/20 text-base cursor-pointer"
                >
                  <Smartphone size={18} />
                  {t.hero.ctaInstall}
                  <ArrowRight size={18} />
                </a>
              </div>

              <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2 text-xs text-slate-500">
                <span className="flex items-center gap-1">
                  <Smartphone size={14} className="text-emerald-400" />
                  {t.hero.trustBadge2}
                </span>
                <span className="h-3 w-px bg-white/10 hidden sm:block" />
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
                  src="/logo-abyssia.png" 
                  alt="Abyssia Logo" 
                  className="size-7 rounded-lg border border-white/10 shadow-md"
                />
                <span className="text-lg font-black text-white tracking-tight font-heading">
                  Abyss<span className="text-pink-500">ia</span>
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
                    <span>{t.footer.officialDiscord}</span>
                    <ExternalLink size={10} className="text-slate-600" />
                  </a>
                </li>
                <li><a href="/guides/" className="hover:text-white transition-colors duration-300">{t.footer.guides}</a></li>
                <li><a href="/a-propos.html" className="hover:text-white transition-colors duration-300">{t.footer.about}</a></li>
                <li><a href={APP_STORE_URL} target="_blank" rel="noreferrer" className="hover:text-white transition-colors duration-300">App Store</a></li>
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
                  <a href="/privacy.html" className="inline-flex items-center gap-1.5 hover:text-white transition-colors duration-300">
                    <Shield size={13} />
                    <span>{t.footer.legal}</span>
                  </a>
                </li>
                <li><a href="/terms.html" className="hover:text-white transition-colors duration-300">{t.footer.terms}</a></li>
              </ul>
              {/* Store availability badge */}
              <div className="pt-2 flex justify-center md:justify-start">
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/5 border border-emerald-500/10 text-[10px] text-emerald-400 font-bold">
                  <Smartphone size={14} />
                  <span>{t.hero.trustBadge2}</span>
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
              <a href="/privacy.html" className="hover:text-slate-300 transition-colors duration-300">{t.footer.legal}</a>
              <a href="/terms.html" className="hover:text-slate-300 transition-colors duration-300">{t.footer.cgu}</a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
