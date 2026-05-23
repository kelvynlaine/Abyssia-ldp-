import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Sparkles, Smartphone, Eye, LayoutGrid } from 'lucide-react';

const MOCKUP_CATEGORIES = [
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
];

export default function AppMockupShowcase() {
  const [catIndex, setCatIndex] = useState(0);
  const [imgIndex, setImgIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const activeCategory = MOCKUP_CATEGORIES[catIndex];
  const activeImage = activeCategory.images[imgIndex];

  useEffect(() => {
    if (isHovered) return;

    const interval = setInterval(() => {
      const currentCategory = MOCKUP_CATEGORIES[catIndex];
      if (imgIndex < currentCategory.images.length - 1) {
        // Go to next image in same category
        setImgIndex(imgIndex + 1);
      } else {
        // Go to next category
        const nextCat = (catIndex + 1) % MOCKUP_CATEGORIES.length;
        setCatIndex(nextCat);
        setImgIndex(0);
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [isHovered, catIndex, imgIndex]);

  const handleNext = () => {
    const currentCategory = MOCKUP_CATEGORIES[catIndex];
    if (imgIndex < currentCategory.images.length - 1) {
      setImgIndex(imgIndex + 1);
    } else {
      const nextCat = (catIndex + 1) % MOCKUP_CATEGORIES.length;
      setCatIndex(nextCat);
      setImgIndex(0);
    }
  };

  const handlePrev = () => {
    if (imgIndex > 0) {
      setImgIndex(imgIndex - 1);
    } else {
      const prevCat = (catIndex - 1 + MOCKUP_CATEGORIES.length) % MOCKUP_CATEGORIES.length;
      setCatIndex(prevCat);
      setImgIndex(MOCKUP_CATEGORIES[prevCat].images.length - 1);
    }
  };

  const selectCategory = (index) => {
    setCatIndex(index);
    setImgIndex(0);
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
          aria-label="Mockup précédent"
          className="absolute left-2.5 top-1/2 -translate-y-1/2 size-9 flex items-center justify-center rounded-full bg-black/60 border border-white/5 text-slate-300 hover:text-white hover:bg-black/80 transition-all duration-300 z-20 cursor-pointer"
        >
          <ChevronLeft size={18} />
        </button>
        <button 
          onClick={handleNext}
          aria-label="Mockup suivant"
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
