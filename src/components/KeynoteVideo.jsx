import { useEffect, useRef, useState } from 'react';
import { Play, Pause, Volume2, VolumeX, RotateCcw, ArrowRight, Maximize } from 'lucide-react';

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
    microBadge: 'Film de présentation · 1 min',
    title: "Abyssia en une minute",
    subtitle: "Un plan de révision, quatre techniques qui marchent et tous les outils au même endroit : l'application en une minute.",
    play: 'Lancer la vidéo', pause: 'Mettre en pause', replay: 'Revoir',
    sound: 'Activer le son', mute: 'Couper le son', fullscreen: 'Plein écran', cta: "Télécharger l'application",
  },
  en: {
    microBadge: 'Product film · 1 min · in French',
    title: 'Abyssia in one minute',
    subtitle: 'A revision plan, four techniques that work and every tool in one place: the app in one minute.',
    play: 'Play the video', pause: 'Pause', replay: 'Watch again',
    sound: 'Turn the sound on', mute: 'Mute', fullscreen: 'Full screen', cta: 'Download the app',
  },
  es: {
    microBadge: 'Vídeo de presentación · 1 min · en francés',
    title: 'Abyssia en un minuto',
    subtitle: 'Un plan de repaso, cuatro técnicas que funcionan y todas las herramientas en un mismo lugar: la app en un minuto.',
    play: 'Reproducir el vídeo', pause: 'Pausar', replay: 'Volver a ver',
    sound: 'Activar el sonido', mute: 'Silenciar', fullscreen: 'Pantalla completa', cta: 'Descargar la aplicación',
  },
  zh: {
    microBadge: '产品短片 · 1 分钟 · 法语',
    title: '一分钟看懂 Abyssia',
    subtitle: '复习计划、四种有效方法、所有工具集于一处：一分钟了解这款应用。',
    play: '播放视频', pause: '暂停', replay: '重新播放',
    sound: '开启声音', mute: '静音', fullscreen: '全屏', cta: '下载应用',
  },
  it: {
    microBadge: 'Video di presentazione · 1 min · in francese',
    title: 'Abyssia in un minuto',
    subtitle: "Un piano di ripasso, quattro tecniche che funzionano e tutti gli strumenti in un unico posto: l'app in un minuto.",
    play: 'Riproduci il video', pause: 'Metti in pausa', replay: 'Rivedi',
    sound: 'Attiva l’audio', mute: 'Disattiva l’audio', fullscreen: 'Schermo intero', cta: "Scarica l'applicazione",
  },
  ru: {
    microBadge: 'Ролик о продукте · 1 мин · на французском',
    title: 'Abyssia за одну минуту',
    subtitle: 'План повторения, четыре рабочие техники и все инструменты в одном месте — приложение за минуту.',
    play: 'Воспроизвести', pause: 'Пауза', replay: 'Смотреть снова',
    sound: 'Включить звук', mute: 'Выключить звук', fullscreen: 'Во весь экран', cta: 'Скачать приложение',
  },
  uk: {
    microBadge: 'Ролик про продукт · 1 хв · французькою',
    title: 'Abyssia за одну хвилину',
    subtitle: 'План повторення, чотири дієві техніки й усі інструменти в одному місці — застосунок за хвилину.',
    play: 'Відтворити', pause: 'Пауза', replay: 'Дивитися знову',
    sound: 'Увімкнути звук', mute: 'Вимкнути звук', fullscreen: 'На весь екран', cta: 'Завантажити застосунок',
  },
};

const SOURCE_MOBILE = '/video/film-720.mp4';
const SOURCE_DESKTOP = '/video/film-1080.mp4';

export default function KeynoteVideo({ lang = 'fr', ctaHref = '#appstore' }) {
  const videoRef = useRef(null);
  const sectionRef = useRef(null);
  const [enLecture, setEnLecture] = useState(false);
  const [muet, setMuet] = useState(true);
  const [terminee, setTerminee] = useState(false);
  const [pleinEcran, setPleinEcran] = useState(false);

  const labels = LABELS[lang] || LABELS.fr;

  // Pose la source au moment où la section approche, puis lance la lecture
  // dès qu'elle est réellement visible. Une personne qui a demandé moins
  // d'animations garde la main : on charge, mais on ne démarre pas.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;

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

    // On observe la vidéo elle-même, pas la section, et on se déclenche dès
    // qu'elle entre dans la bande centrale de l'écran. Un seuil en pourcentage
    // de visibilité ne marcherait pas sur les fenêtres courtes : un élément
    // plus haut que l'écran n'atteint jamais le seuil.
    const observateur = new IntersectionObserver(
      ([entree]) => {
        if (entree.isIntersecting) {
          charger();
          if (!mouvementReduit && !terminee) demarrer();
        } else if (!video.paused && document.fullscreenElement !== video) {
          video.pause();
        }
      },
      { rootMargin: '-15% 0px -15% 0px', threshold: 0 },
    );

    observateur.observe(video);
    return () => observateur.disconnect();
  }, [terminee]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;
    const surChangement = () => setPleinEcran(document.fullscreenElement === video);
    const entreeIos = () => setPleinEcran(true);
    const sortieIos = () => setPleinEcran(false);
    document.addEventListener('fullscreenchange', surChangement);
    video.addEventListener('webkitbeginfullscreen', entreeIos);
    video.addEventListener('webkitendfullscreen', sortieIos);
    return () => {
      document.removeEventListener('fullscreenchange', surChangement);
      video.removeEventListener('webkitbeginfullscreen', entreeIos);
      video.removeEventListener('webkitendfullscreen', sortieIos);
    };
  }, []);

  // Passer en plein écran est un geste explicite : on rétablit le son et on
  // lance la lecture. L'iPhone n'accepte le plein écran que sur la vidéo, via
  // son lecteur natif (webkitEnterFullscreen) ; les autres navigateurs
  // passent par l'API standard.
  const ouvrirPleinEcran = () => {
    const video = videoRef.current;
    if (!video) return;
    if (!video.src) video.src = window.innerWidth <= 768 ? SOURCE_MOBILE : SOURCE_DESKTOP;
    video.dataset.chargee = 'oui';
    video.muted = false;
    setMuet(false);
    if (terminee) {
      video.currentTime = 0;
      setTerminee(false);
    }
    video.play().catch(() => {});
    if (typeof video.requestFullscreen === 'function') {
      video.requestFullscreen().catch(() => {});
    } else if (typeof video.webkitEnterFullscreen === 'function') {
      video.webkitEnterFullscreen();
    } else if (typeof video.webkitRequestFullscreen === 'function') {
      video.webkitRequestFullscreen();
    }
  };

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
            poster="/video/film-poster.webp"
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
            onDoubleClick={ouvrirPleinEcran}
            controls={pleinEcran}
            className="w-full h-auto aspect-video cursor-pointer"
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

            <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={basculerSon}
              aria-label={muet ? labels.sound : labels.mute}
              className="inline-flex items-center gap-2 h-11 px-4 rounded-full bg-white/10 border border-white/15 backdrop-blur-md text-white text-xs font-bold hover:bg-white/20 transition-colors cursor-pointer"
            >
              {muet ? <VolumeX size={16} /> : <Volume2 size={16} />}
              <span className="hidden sm:inline">{muet ? labels.sound : labels.mute}</span>
            </button>

            <button
              type="button"
              onClick={ouvrirPleinEcran}
              aria-label={labels.fullscreen}
              title={labels.fullscreen}
              className="size-11 flex items-center justify-center rounded-full bg-white/10 border border-white/15 backdrop-blur-md text-white hover:bg-white/20 transition-colors cursor-pointer"
            >
              <Maximize size={17} />
            </button>
            </div>
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
