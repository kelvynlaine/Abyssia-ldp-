import { MOCKUP_CATEGORIES } from './AppMockupShowcase';

/**
 * Galerie complète des captures de l'application.
 *
 * Le carrousel du haut (AppMockupShowcase) n'affiche qu'une capture à la fois :
 * cette section montre l'intégralité des écrans, groupés par fonctionnalité.
 */
const LABELS = {
  fr: {
    microBadge: "Captures de l'application",
    title: "Tous les écrans d'Abyss IA",
    subtitle: "Chaque fonctionnalité en images, directement depuis l'application.",
  },
  en: {
    microBadge: 'App screenshots',
    title: 'Every screen of Abyss IA',
    subtitle: 'Each feature in pictures, straight from the app.',
  },
  es: {
    microBadge: 'Capturas de la aplicación',
    title: 'Todas las pantallas de Abyss IA',
    subtitle: 'Cada función en imágenes, directamente desde la aplicación.',
  },
  zh: {
    microBadge: '应用截图',
    title: 'Abyss IA 的全部界面',
    subtitle: '每项功能的实际截图，直接来自应用。',
  },
  it: {
    microBadge: "Schermate dell'applicazione",
    title: 'Tutte le schermate di Abyss IA',
    subtitle: "Ogni funzione in immagini, direttamente dall'applicazione.",
  },
  ru: {
    microBadge: 'Скриншоты приложения',
    title: 'Все экраны Abyss IA',
    subtitle: 'Каждая функция в изображениях, прямо из приложения.',
  },
  uk: {
    microBadge: 'Знімки застосунку',
    title: 'Усі екрани Abyss IA',
    subtitle: 'Кожна функція в зображеннях, просто із застосунку.',
  },
};

export default function MockupGallery({ lang = 'fr' }) {
  const categories = MOCKUP_CATEGORIES[lang] || MOCKUP_CATEGORIES.fr;
  const labels = LABELS[lang] || LABELS.fr;

  return (
    <section id="captures" className="space-y-12 scroll-mt-20">

      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/15 border border-sky-500/20 text-xs font-semibold text-sky-300">
          {labels.microBadge}
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          {labels.title}
        </h2>
        <p className="text-sm sm:text-base text-slate-400">
          {labels.subtitle}
        </p>
      </div>

      {/* Une rangée par fonctionnalité */}
      <div className="space-y-10">
        {categories.map((category) => (
          <div key={category.title} className="space-y-4">
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <h3 className="text-lg sm:text-xl font-bold text-white">{category.title}</h3>
              <span className="text-[10px] font-black tracking-widest text-pink-400 uppercase">
                {category.tag}
              </span>
            </div>
            <p className="text-sm text-slate-400 max-w-2xl">{category.description}</p>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
              {category.images.map((image, index) => (
                <div
                  key={image}
                  className="relative rounded-[1.75rem] border-[5px] border-slate-900 bg-slate-950 overflow-hidden aspect-[9/19] shadow-xl transition-transform duration-300 hover:-translate-y-1"
                >
                  <img
                    src={image}
                    alt={`${category.title} — ${index + 1}`}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}
