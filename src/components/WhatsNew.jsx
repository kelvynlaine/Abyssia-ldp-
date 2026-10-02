import { ArrowRight, BellRing, LogIn, MessagesSquare, Moon, Palette, Share2, Sigma, TextSelect } from 'lucide-react';
import { PREMIUM_ICONS, WHATS_NEW, WHATS_NEW_ITEMS } from '../config/whatsnew';

/**
 * Section « Nouveautés » : deux grandes cartes (nouveau logo et saison
 * d'Halloween, icônes premium) puis les autres améliorations. Chaque élément
 * affiche la version qui l'apporte, pour ne pas présenter comme disponible ce
 * qui n'est pas encore sur les stores.
 */

const ICONS = {
  share: Share2,
  selection: TextSelect,
  bell: BellRing,
  forum: MessagesSquare,
  math: Sigma,
  login: LogIn,
};

// Classes écrites en entier : Tailwind ne détecte pas les noms construits.
const ACCENTS = {
  pink: 'bg-pink-500/10 border-pink-500/20 text-pink-400',
  violet: 'bg-violet-500/10 border-violet-500/20 text-violet-400',
  emerald: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400',
  sky: 'bg-sky-500/10 border-sky-500/20 text-sky-400',
  cyan: 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400',
  orange: 'bg-orange-500/10 border-orange-500/20 text-orange-400',
};

const TAG_STYLES = {
  '4.1.1': 'bg-emerald-500/10 border-emerald-500/25 text-emerald-300',
  '4.1.2': 'bg-sky-500/10 border-sky-500/25 text-sky-300',
  next: 'bg-pink-500/10 border-pink-500/25 text-pink-300',
};

function Tag({ tag, texts }) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full border text-[11px] font-semibold whitespace-nowrap ${TAG_STYLES[tag]}`}>
      {texts.tags[tag]}
    </span>
  );
}

export default function WhatsNew({ lang = 'fr' }) {
  const texts = WHATS_NEW[lang] || WHATS_NEW.fr;

  return (
    <section id="nouveautes" className="space-y-10 sm:space-y-12 scroll-mt-20">

      <div className="text-center max-w-2xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/15 border border-pink-500/20 text-xs font-semibold text-pink-300">
          {texts.microBadge}
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">{texts.title}</h2>
        <p className="text-sm sm:text-base text-slate-400">{texts.subtitle}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">

        {/* Nouveau logo + saison d'Halloween */}
        <article className="glass-card rounded-[2rem] p-5 sm:p-7 flex flex-col gap-6 relative overflow-hidden">
          <div className="absolute -top-16 -right-16 size-56 rounded-full bg-orange-500/10 blur-[80px] pointer-events-none" />
          <div className="flex items-center justify-center gap-4 sm:gap-6 py-2">
            <figure className="flex flex-col items-center gap-2.5">
              <img
                src="/nouveautes/logo.webp"
                alt="Abyssia"
                width="384"
                height="384"
                loading="lazy"
                decoding="async"
                className="size-24 sm:size-28 drop-shadow-[0_0_24px_rgba(56,189,248,0.35)]"
              />
              <figcaption className="text-xs font-semibold text-slate-300">{texts.logo.normal}</figcaption>
            </figure>
            <ArrowRight size={20} className="text-slate-500 shrink-0" aria-hidden="true" />
            <figure className="flex flex-col items-center gap-2.5">
              <img
                src="/nouveautes/logo-halloween.webp"
                alt="Abyssia Halloween"
                width="384"
                height="384"
                loading="lazy"
                decoding="async"
                className="size-24 sm:size-28 drop-shadow-[0_0_24px_rgba(249,115,22,0.4)]"
              />
              <figcaption className="inline-flex items-center gap-1 text-xs font-semibold text-orange-300">
                <Moon size={12} aria-hidden="true" />
                {texts.logo.halloween}
              </figcaption>
            </figure>
          </div>
          <div className="space-y-3">
            <Tag tag="next" texts={texts} />
            <h3 className="text-lg sm:text-xl font-bold text-white">{texts.logo.title}</h3>
            <p className="text-sm text-slate-400 leading-relaxed">{texts.logo.desc}</p>
          </div>
        </article>

        {/* Icônes premium */}
        <article className="glass-card rounded-[2rem] p-5 sm:p-7 flex flex-col gap-6 relative overflow-hidden">
          <div className="absolute -top-16 -left-16 size-56 rounded-full bg-violet-600/10 blur-[80px] pointer-events-none" />
          <ul className="grid grid-cols-3 sm:grid-cols-6 gap-3 sm:gap-2 py-2">
            {PREMIUM_ICONS.map((key) => (
              <li key={key} className="flex flex-col items-center gap-2">
                <img
                  src={`/nouveautes/icone-${key}.webp`}
                  alt={texts.icons.names[key]}
                  width="160"
                  height="160"
                  loading="lazy"
                  decoding="async"
                  className="size-16 sm:size-[4.25rem]"
                />
                <span className="text-[11px] font-medium text-slate-400">{texts.icons.names[key]}</span>
              </li>
            ))}
          </ul>
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Tag tag="next" texts={texts} />
              <Palette size={16} className="text-violet-400" aria-hidden="true" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-white">{texts.icons.title}</h3>
            <p className="text-sm text-slate-400 leading-relaxed">{texts.icons.desc}</p>
          </div>
        </article>
      </div>

      {/* Autres améliorations */}
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {WHATS_NEW_ITEMS.map(({ key, tag, icon, accent }) => {
          const Icon = ICONS[icon];
          const item = texts.items[key];
          return (
            <li key={key} className="glass-card rounded-2xl p-5 sm:p-6 flex flex-col gap-3">
              <div className="flex items-center justify-between gap-3">
                <div className={`size-10 rounded-xl border flex items-center justify-center ${ACCENTS[accent]}`}>
                  <Icon size={20} aria-hidden="true" />
                </div>
                <Tag tag={tag} texts={texts} />
              </div>
              <h3 className="text-base font-bold text-white">{item.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
            </li>
          );
        })}
      </ul>

    </section>
  );
}
