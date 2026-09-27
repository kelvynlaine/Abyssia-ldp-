import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, X, Maximize2 } from 'lucide-react';
import { SCREENS, SCREEN_LABELS, GALLERY_LABELS, GALLERY_CONTROLS } from '../config/screens';

/**
 * Galerie des dix captures officielles de l'App Store.
 *
 * Les captures portent un titre incrusté en petits caractères : en miniature
 * sur deux colonnes, il devient illisible sur téléphone. D'où deux affichages :
 *  - mobile et tablette : un ruban que l'on fait glisser, chaque écran occupant
 *    les trois quarts de la largeur ;
 *  - grand écran : une grille de cinq colonnes.
 * Un appui sur une capture l'ouvre en grand, pour lire les détails.
 */
export default function MockupGallery({ lang = 'fr' }) {
  const labels = SCREEN_LABELS[lang] || SCREEN_LABELS.fr;
  const texts = GALLERY_LABELS[lang] || GALLERY_LABELS.fr;
  const controls = GALLERY_CONTROLS[lang] || GALLERY_CONTROLS.fr;

  const rubanRef = useRef(null);
  const dialogueRef = useRef(null);
  const [actif, setActif] = useState(0);       // position dans le ruban mobile
  const [agrandi, setAgrandi] = useState(null); // index ouvert en grand, ou null

  // Déduit l'écran centré à partir du défilement horizontal du ruban.
  const surDefilement = () => {
    const ruban = rubanRef.current;
    if (!ruban || !ruban.firstElementChild) return;
    const pas = ruban.firstElementChild.getBoundingClientRect().width + 16;
    setActif(Math.min(SCREENS.length - 1, Math.max(0, Math.round(ruban.scrollLeft / pas))));
  };

  const allerA = (index) => {
    const ruban = rubanRef.current;
    const carte = ruban && ruban.children[index];
    if (carte) carte.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  };

  const ouvrir = (index) => {
    setAgrandi(index);
    const dialogue = dialogueRef.current;
    if (dialogue && typeof dialogue.showModal === 'function' && !dialogue.open) {
      dialogue.showModal();
    }
  };

  const fermer = () => {
    const dialogue = dialogueRef.current;
    if (dialogue && dialogue.open) dialogue.close();
  };

  const surFermeture = () => setAgrandi(null);

  // Bloque le défilement de la page tant que la vue agrandie est ouverte.
  const ouvert = agrandi !== null;
  useEffect(() => {
    if (!ouvert) return undefined;
    const racine = document.documentElement;
    const precedent = racine.style.overflow;
    racine.style.overflow = 'hidden';
    return () => { racine.style.overflow = precedent; };
  }, [ouvert]);

  const decaler = (pas) => setAgrandi((i) => (i + pas + SCREENS.length) % SCREENS.length);

  const surTouche = (evenement) => {
    if (evenement.key === 'ArrowRight') decaler(1);
    if (evenement.key === 'ArrowLeft') decaler(-1);
  };

  const ecranAgrandi = agrandi === null ? null : SCREENS[agrandi];

  return (
    <section id="captures" className="space-y-10 sm:space-y-12 scroll-mt-20">

      <div className="text-center max-w-2xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/15 border border-sky-500/20 text-xs font-semibold text-sky-300">
          {texts.microBadge}
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">{texts.title}</h2>
        <p className="text-sm sm:text-base text-slate-400">{texts.subtitle}</p>
      </div>

      {/* Ruban (mobile, tablette) qui devient grille (grand écran). Le ruban
          déborde jusqu'aux bords de l'écran pour suggérer qu'on peut glisser. */}
      <div className="-mx-4 sm:-mx-6 lg:mx-0">
        <ul
          ref={rubanRef}
          onScroll={surDefilement}
          className="flex lg:grid lg:grid-cols-5 gap-4 lg:gap-6 overflow-x-auto lg:overflow-visible snap-x snap-mandatory px-[12vw] sm:px-[30vw] lg:px-0 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {SCREENS.map((screen, index) => {
            const label = labels[screen.key];
            return (
              <li key={screen.key} className="snap-center shrink-0 w-[76vw] max-w-[320px] sm:w-[40vw] lg:w-auto lg:max-w-none">
                <figure className="space-y-3">
                  <button
                    type="button"
                    onClick={() => ouvrir(index)}
                    aria-label={`${controls.open} : ${label.title}`}
                    className="group relative block w-full rounded-[1.5rem] overflow-hidden border border-white/10 bg-slate-950 shadow-xl transition-transform duration-300 lg:hover:-translate-y-1 cursor-zoom-in focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-400"
                  >
                    <img
                      src={screen.file}
                      alt={label.title}
                      width="620"
                      height="1347"
                      loading="lazy"
                      decoding="async"
                      className="w-full h-auto"
                    />
                    <span className="absolute top-3 right-3 size-9 flex items-center justify-center rounded-full bg-black/55 border border-white/15 text-white opacity-80 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity">
                      <Maximize2 size={15} />
                    </span>
                  </button>
                  <figcaption className="space-y-1 px-1 text-center lg:text-left">
                    <p className="text-sm font-bold text-white leading-snug">{label.title}</p>
                    <p className="text-xs text-slate-400 leading-relaxed">{label.desc}</p>
                  </figcaption>
                </figure>
              </li>
            );
          })}
        </ul>

        {/* Repères de position, seulement là où l'on glisse */}
        <div className="lg:hidden mt-5 space-y-3 text-center">
          <div className="flex justify-center gap-1.5">
            {SCREENS.map((screen, index) => (
              <button
                key={screen.key}
                type="button"
                onClick={() => allerA(index)}
                aria-label={labels[screen.key].title}
                aria-current={index === actif}
                className="p-2 -m-1 cursor-pointer"
              >
                <span className={`block h-1.5 rounded-full transition-all duration-300 ${index === actif ? 'w-5 bg-white' : 'w-1.5 bg-white/30'}`} />
              </button>
            ))}
          </div>
          <p className="text-xs text-slate-500">{controls.swipe}</p>
        </div>
      </div>

      {/* Vue agrandie : <dialog> natif, qui gère Échap et le focus */}
      <dialog
        ref={dialogueRef}
        onClose={surFermeture}
        onKeyDown={surTouche}
        onClick={(evenement) => { if (evenement.target === dialogueRef.current) fermer(); }}
        aria-label={ecranAgrandi ? labels[ecranAgrandi.key].title : texts.title}
        className="m-auto w-full h-full max-w-none max-h-none bg-transparent p-0 backdrop:bg-black/85 backdrop:backdrop-blur-sm"
      >
        {ecranAgrandi && (
          <div
            className="w-full h-full flex flex-col items-center justify-center gap-4 p-4 sm:p-8"
            onClick={(evenement) => { if (evenement.target === evenement.currentTarget) fermer(); }}
          >
            <button
              type="button"
              onClick={fermer}
              aria-label={controls.close}
              className="absolute top-4 right-4 size-11 flex items-center justify-center rounded-full bg-white/10 border border-white/15 text-white hover:bg-white/20 transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>

            <img
              src={ecranAgrandi.file}
              alt={labels[ecranAgrandi.key].title}
              width="620"
              height="1347"
              className="max-h-[calc(100dvh-9rem)] w-auto max-w-full rounded-[1.5rem] border border-white/10 shadow-2xl"
            />

            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => decaler(-1)}
                aria-label={controls.prev}
                className="size-11 flex items-center justify-center rounded-full bg-white/10 border border-white/15 text-white hover:bg-white/20 transition-colors cursor-pointer"
              >
                <ChevronLeft size={20} />
              </button>
              <div className="text-center min-w-[10rem]">
                <p className="text-sm font-bold text-white">{labels[ecranAgrandi.key].title}</p>
                <p className="text-xs text-slate-400">{agrandi + 1} / {SCREENS.length}</p>
              </div>
              <button
                type="button"
                onClick={() => decaler(1)}
                aria-label={controls.next}
                className="size-11 flex items-center justify-center rounded-full bg-white/10 border border-white/15 text-white hover:bg-white/20 transition-colors cursor-pointer"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        )}
      </dialog>

    </section>
  );
}
