import { SCREENS, SCREEN_LABELS, GALLERY_LABELS } from '../config/screens';

/**
 * Galerie complète : les dix captures officielles de l'App Store, en grille.
 * Le carrousel du héros n'en montre qu'une à la fois ; cette section les
 * présente toutes, dans l'ordre du parcours dans l'application.
 */
export default function MockupGallery({ lang = 'fr' }) {
  const labels = SCREEN_LABELS[lang] || SCREEN_LABELS.fr;
  const texts = GALLERY_LABELS[lang] || GALLERY_LABELS.fr;

  return (
    <section id="captures" className="space-y-12 scroll-mt-20">

      <div className="text-center max-w-2xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/15 border border-sky-500/20 text-xs font-semibold text-sky-300">
          {texts.microBadge}
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">{texts.title}</h2>
        <p className="text-sm sm:text-base text-slate-400">{texts.subtitle}</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 sm:gap-6">
        {SCREENS.map((screen) => {
          const label = labels[screen.key];
          return (
            <figure key={screen.key} className="space-y-3">
              <div className="rounded-[1.5rem] overflow-hidden border border-white/10 bg-slate-950 shadow-xl transition-transform duration-300 hover:-translate-y-1">
                <img
                  src={screen.file}
                  alt={label.title}
                  width="620"
                  height="1347"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-auto"
                />
              </div>
              <figcaption className="space-y-1 px-0.5">
                <p className="text-sm font-bold text-white leading-snug">{label.title}</p>
                <p className="text-xs text-slate-400 leading-relaxed">{label.desc}</p>
              </figcaption>
            </figure>
          );
        })}
      </div>

    </section>
  );
}
