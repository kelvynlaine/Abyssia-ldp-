import { useEffect, useRef, useState } from 'react';
import { Play, Pause, Volume2, VolumeX, RotateCcw, ArrowRight } from 'lucide-react';

/**
 * Film de présentation, façon keynote.
 *
 * Trois contraintes dictent ce composant :
 *  - la lecture démarre seule quand la section entre à l'écran, et s'arrête
 *    quand on la quitte (un observateur d'intersection, pas un minuteur) ;
 *  - les navigateurs n'autorisent la lecture automatique que sans le son :
 *    la vidéo démarre donc muette, avec un bouton pour rétablir la bande son ;
 *  - rien n'est téléchargé tant que la section reste loin de l'écran
 *    (preload="none" + source posée au dernier moment), pour ne pas peser sur
 *    l'affichage initial de la page.
 */
const LABELS = {
  fr: {
    microBadge: 'Film de présentation · 31 s',
    title: "Abyssia en trente secondes",
    subtitle: "Le chat, les révisions, le focus : un aperçu de l'application avant de l'installer.",
    play: 'Lancer la vidéo', pause: 'Mettre en pause', replay: 'Revoir',
    sound: 'Activer le son', mute: 'Couper le son', cta: "Télécharger l'application",
  },
  en: {
    microBadge: 'Product film · 31 s',
    title: 'Abyssia in thirty seconds',
    subtitle: 'Chat, revision, focus: a look at the app before you install it.',
    play: 'Play the video', pause: 'Pause', replay: 'Watch again',
    sound: 'Turn the sound on', mute: 'Mute', cta: 'Download the app',
  },
  es: {
    microBadge: 'Vídeo de presentación · 31 s',
    title: 'Abyssia en treinta segundos',
    subtitle: 'Chat, repaso, concentración: un vistazo a la app antes de instalarla.',
    play: 'Reproducir el vídeo', pause: 'Pausar', replay: 'Volver a ver',
    sound: 'Activar el sonido', mute: 'Silenciar', cta: 'Descargar la aplicación',
  },
  zh: {
    microBadge: '产品短片 · 31 秒',
    title: '三十秒看懂 Abyssia',
    subtitle: '聊天、复习、专注：安装前先看看这款应用。',
    play: '播放视频', pause: '暂停', replay: '重新播放',
    sound: '开启声音', mute: '静音', cta: '下载应用',
  },
  it: {
    microBadge: 'Video di presentazione · 31 s',
    title: 'Abyssia in trenta secondi',
    subtitle: "Chat, ripasso, concentrazione: uno sguardo all'app prima di installarla.",
    play: 'Riproduci il video', pause: 'Metti in pausa', replay: 'Rivedi',
    sound: 'Attiva l’audio', mute: 'Disattiva l’audio', cta: "Scarica l'applicazione",
  },
  ru: {
    microBadge: 'Ролик о продукте · 31 с',
    title: 'Abyssia за тридцать секунд',
    subtitle: 'Чат, повторение, концентрация — взгляд на приложение до установки.',
    play: 'Воспроизвести', pause: 'Пауза', replay: 'Смотреть снова',
    sound: 'Включить звук', mute: 'Выключить звук', cta: 'Скачать приложение',
  },
  uk: {
    microBadge: 'Ролик про продукт · 31 с',
    title: 'Abyssia за тридцять секунд',
    subtitle: 'Чат, повторення, концентрація — погляд на застосунок до встановлення.',
    play: 'Відтворити', pause: 'Пауза', replay: 'Дивитися знову',
    sound: 'Увімкнути звук', mute: 'Вимкнути звук', cta: 'Завантажити застосунок',
  },
};

const SOURCE_MOBILE = '/video/keynote-720.mp4';
const SOURCE_DESKTOP = '/video/keynote-1080.mp4';

export default function KeynoteVideo({ lang = 'fr', ctaHref = '#appstore' }) {
  const videoRef = useRef(null);
  const sectionRef = useRef(null);
  const [enLecture, setEnLecture] = useState(false);
  const [muet, setMuet] = useState(true);
  const [terminee, setTerminee] = useState(false);

  const labels = LABELS[lang] || LABELS.fr;

  // Pose la source au moment où la section approche, puis lance la lecture
  // dès qu'elle est réellement visible. Une personne qui a demandé moins
  // d'animations garde la main : on charge, mais on ne démarre pas.
  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video) return undefined;

    // matchMedia manque dans certains environnements (rendu hors navigateur,
    // navigateurs anciens) : sans garde, toute la page tomberait.
    const media = (requete) =>
      typeof window.matchMedia === 'function' ? window.matchMedia(requete).matches : false;
    const mouvementReduit = media('(prefers-reduced-motion: reduce)');

    const charger = () => {
      if (video.dataset.chargee) return;
      // Largeur réelle de la fenêtre : matchMedia suit mal les viewports
      // émulés, et c'est cette largeur qui détermine la taille d'affichage.
      video.src = window.innerWidth <= 768 ? SOURCE_MOBILE : SOURCE_DESKTOP;
      video.dataset.chargee = 'oui';
    };

    // Demander la lecture pendant que la source se charge encore se solde par
    // un rejet ; on réessaie alors une fois la vidéo prête.
    const demarrer = () => {
      const promesse = video.play();
      if (promesse) {
        promesse.catch(() => {
          video.addEventListener('canplay', () => { video.play().catch(() => {}); }, { once: true });
        });
      }
    };

    if (typeof IntersectionObserver !== 'function') return undefined;

    const observateur = new IntersectionObserver(
      ([entree]) => {
        if (entree.isIntersecting) {
          charger();
          if (!mouvementReduit && !terminee) demarrer();
        } else if (!video.paused) {
          video.pause();
        }
      },
      { threshold: 0.45 },
    );

    observateur.observe(section);
    return () => observateur.disconnect();
  }, [terminee]);

  const basculerLecture = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      if (terminee) {
        video.currentTime = 0;
        setTerminee(false);
      }
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  };

  const basculerSon = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuet(video.muted);
  };

  const IconeLecture = terminee ? RotateCcw : enLecture ? Pause : Play;
  const libelleLecture = terminee ? labels.replay : enLecture ? labels.pause : labels.play;

  return (
    <section id="video" ref={sectionRef} className="space-y-10 scroll-mt-20">

      <div className="text-center max-w-2xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/15 border border-violet-500/20 text-xs font-semibold text-violet-300">
          {labels.microBadge}
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">{labels.title}</h2>
        <p className="text-sm sm:text-base text-slate-400">{labels.subtitle}</p>
      </div>

      <div className="relative max-w-5xl mx-auto">
        {/* Lueur d'ambiance, purement décorative */}
        <div className="absolute -inset-6 sm:-inset-10 rounded-[3rem] bg-gradient-to-br from-violet-600/20 via-fuchsia-500/10 to-sky-500/20 blur-3xl pointer-events-none" />

        <div className="relative rounded-[1.5rem] sm:rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl bg-black">
          <video
            ref={videoRef}
            poster="/video/keynote-poster.webp"
            muted
            playsInline
            preload="none"
            width="1920"
            height="1080"
            aria-label={labels.title}
            onClick={basculerLecture}
            onPlay={() => { setEnLecture(true); setTerminee(false); }}
            onPause={() => setEnLecture(false)}
            onEnded={() => { setEnLecture(false); setTerminee(true); }}
            className="w-full h-auto aspect-video object-cover cursor-pointer"
          />

          {/* Commandes : lisibles au pouce sur mobile, discrètes sur grand écran */}
          <div className="absolute bottom-0 inset-x-0 flex items-center justify-between gap-3 p-3 sm:p-4 bg-gradient-to-t from-black/70 to-transparent">
            <button
              type="button"
              onClick={basculerLecture}
              aria-label={libelleLecture}
              className="size-11 flex items-center justify-center rounded-full bg-white/10 border border-white/15 backdrop-blur-md text-white hover:bg-white/20 transition-colors cursor-pointer"
            >
              <IconeLecture size={18} />
            </button>

            <button
              type="button"
              onClick={basculerSon}
              aria-label={muet ? labels.sound : labels.mute}
              className="inline-flex items-center gap-2 h-11 px-4 rounded-full bg-white/10 border border-white/15 backdrop-blur-md text-white text-xs font-bold hover:bg-white/20 transition-colors cursor-pointer"
            >
              {muet ? <VolumeX size={16} /> : <Volume2 size={16} />}
              <span className="hidden sm:inline">{muet ? labels.sound : labels.mute}</span>
            </button>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <a
          href={ctaHref}
          className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl font-bold text-white gradient-button shadow-xl shadow-pink-500/15 text-sm sm:text-base"
        >
          {labels.cta}
          <ArrowRight size={16} />
        </a>
      </div>

    </section>
  );
}
