import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { SCREENS, ACCENT_GLOW, SCREEN_LABELS, CAROUSEL_LABELS } from '../config/screens';

/**
 * Carrousel du héros : fait défiler les captures officielles de l'App Store.
 * Les images portent déjà leur mise en scène, aucune coque n'est ajoutée.
 */
export default function AppScreenCarousel({ lang = 'fr' }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const labels = SCREEN_LABELS[lang] || SCREEN_LABELS.fr;
  const controls = CAROUSEL_LABELS[lang] || CAROUSEL_LABELS.fr;
  const screen = SCREENS[index];
  const label = labels[screen.key];

  useEffect(() => {
    if (paused) return undefined;
    const timer = setInterval(() => setIndex((i) => (i + 1) % SCREENS.length), 4500);
    return () => clearInterval(timer);
  }, [paused]);

  const go = (step) => setIndex((i) => (i + step + SCREENS.length) % SCREENS.length);

  return (
    <div
      className="relative w-full max-w-[300px]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className={`absolute -inset-6 rounded-[48px] blur-2xl opacity-30 pointer-events-none transition-colors duration-700 ${ACCENT_GLOW[screen.accent]}`} />

      <div className="relative rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl bg-slate-950 aspect-[620/1347]">
        {SCREENS.map((item, i) => (
          <img
            key={item.key}
            src={item.file}
            alt={labels[item.key].title}
            width="620"
            height="1347"
            loading={i === 0 ? 'eager' : 'lazy'}
            fetchPriority={i === 0 ? 'high' : 'auto'}
            decoding="async"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${i === index ? 'opacity-100' : 'opacity-0'}`}
          />
        ))}

        <button
          type="button"
          onClick={() => go(-1)}
          aria-label={controls.prev}
          className="absolute left-2 top-1/2 -translate-y-1/2 size-11 flex items-center justify-center rounded-full bg-black/55 border border-white/10 text-slate-200 hover:text-white hover:bg-black/80 transition-colors cursor-pointer"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          type="button"
          onClick={() => go(1)}
          aria-label={controls.next}
          className="absolute right-2 top-1/2 -translate-y-1/2 size-11 flex items-center justify-center rounded-full bg-black/55 border border-white/10 text-slate-200 hover:text-white hover:bg-black/80 transition-colors cursor-pointer"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      {/* Légende + position */}
      <div className="mt-4 text-center space-y-2">
        <p className="text-sm font-bold text-white">{label.title}</p>
        <p className="text-xs text-slate-400 leading-relaxed">{label.desc}</p>
        <div className="flex justify-center gap-1.5 pt-1">
          {SCREENS.map((item, i) => (
            <span
              key={item.key}
              className={`h-1.5 rounded-full transition-all duration-300 ${i === index ? 'w-5 bg-white' : 'w-1.5 bg-white/30'}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
