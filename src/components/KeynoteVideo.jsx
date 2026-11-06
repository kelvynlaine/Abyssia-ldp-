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
    microBadge: 'Bande-annonce 4.2 · 30 s',
    title: "Abyssia 4.2 en 30 secondes",
    subtitle: "Ton PDF devient des fiches et un QCM, plus traduction, chat IA et séries. Tout ce qui change dans la 4.2.",
    play: 'Lancer la vidéo', pause: 'Mettre en pause', replay: 'Revoir',
    sound: 'Activer le son', mute: 'Couper le son', fullscreen: 'Plein écran', cta: 'Installer gratuitement',
  },
  en: {
    microBadge: '4.2 trailer · 30 s · in French',
    title: 'Abyssia 4.2 in 30 seconds',
    subtitle: 'Your PDF becomes flashcards and a quiz, plus translation, AI chat and streaks. Everything new in 4.2.',
    play: 'Play the video', pause: 'Pause', replay: 'Watch again',
    sound: 'Turn the sound on', mute: 'Mute', fullscreen: 'Full screen', cta: 'Install for free',
  },
  es: {
    microBadge: 'Tráiler 4.2 · 30 s · en francés',
    title: 'Abyssia 4.2 en 30 segundos',
    subtitle: 'Tu PDF se convierte en fichas y un test, además de traducción, chat con IA y rachas. Todo lo nuevo de la 4.2.',
    play: 'Reproducir el vídeo', pause: 'Pausar', replay: 'Volver a ver',
    sound: 'Activar el sonido', mute: 'Silenciar', fullscreen: 'Pantalla completa', cta: 'Instalar gratis',
  },
  zh: {
    microBadge: '4.2 预告片 · 30 秒 · 法语',
    title: '30 秒看懂 Abyssia 4.2',
    subtitle: 'PDF 变成复习卡片和测验，另有翻译、AI 对话和连续打卡。4.2 的全部更新。',
    play: '播放视频', pause: '暂停', replay: '重新播放',
    sound: '开启声音', mute: '静音', fullscreen: '全屏', cta: '免费安装',
  },
  it: {
    microBadge: 'Trailer 4.2 · 30 s · in francese',
    title: 'Abyssia 4.2 in 30 secondi',
    subtitle: "Il tuo PDF diventa schede e un quiz, più traduzione, chat IA e serie. Tutte le novità della 4.2.",
    play: 'Riproduci il video', pause: 'Metti in pausa', replay: 'Rivedi',
    sound: 'Attiva l’audio', mute: 'Disattiva l’audio', fullscreen: 'Schermo intero', cta: 'Installa gratis',
  },
  ru: {
    microBadge: 'Трейлер 4.2 · 30 с · на французском',
    title: 'Abyssia 4.2 за 30 секунд',
    subtitle: 'Твой PDF превращается в карточки и тест, плюс перевод, ИИ-чат и серии. Всё новое в 4.2.',
    play: 'Воспроизвести', pause: 'Пауза', replay: 'Смотреть снова',
    sound: 'Включить звук', mute: 'Выключить звук', fullscreen: 'Во весь экран', cta: 'Установить бесплатно',
  },
  uk: {
    microBadge: 'Трейлер 4.2 · 30 с · французькою',
    title: 'Abyssia 4.2 за 30 секунд',
    subtitle: 'Твій PDF стає картками й тестом, а ще переклад, ШІ-чат і серії. Усе нове у 4.2.',
    play: 'Відтворити', pause: 'Пауза', replay: 'Дивитися знову',
    sound: 'Увімкнути звук', mute: 'Вимкнути звук', fullscreen: 'На весь екран', cta: 'Встановити безкоштовно',
  },
};

const FILM = { mobile: '/video/film42-720.mp4', desktop: '/video/film42-1080.mp4', poster: '/video/film42-poster.webp' };

const BADGE = 'bg-violet-500/15 border-violet-500/20 text-violet-300';
const GLOW = 'from-violet-600/20 via-fuchsia-500/10 to-sky-500/20';

export default function KeynoteVideo({ lang = 'fr', ctaHref = '#appstore', variante = null }) {
  const { id = 'video', mobile, desktop, poster, badgeClass = BADGE, glowClass = GLOW, textes } = { ...FILM, ...variante };
  const videoRef = useRef(null);
  const sectionRef = useRef(null);
  const [enLecture, setEnLecture] = useState(false);
  const [muet, setMuet] = useState(true);
  const [terminee, setTerminee] = useState(false);
  const [pleinEcran, setPleinEcran] = useState(false);

  const labels = { ...(LABELS[lang] || LABELS.fr), ...(textes && (textes[lang] || textes.fr)) };

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
      video.src = window.innerWidth <= 768 ? mobile : desktop;
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
  }, [terminee, mobile, desktop]);

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
    if (!video.src) video.src = window.innerWidth <= 768 ? mobile : desktop;
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
    <section id={id} ref={sectionRef} className="space-y-10 scroll-mt-20">

      <div className="text-center max-w-2xl mx-auto space-y-4">
        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-semibold ${badgeClass}`}>
          {labels.microBadge}
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">{labels.title}</h2>
        <p className="text-sm sm:text-base text-slate-400">{labels.subtitle}</p>
      </div>

      <div className="relative max-w-5xl mx-auto">
        {/* Lueur d'ambiance, purement décorative */}
        <div className={`absolute -inset-6 sm:-inset-10 rounded-[3rem] bg-gradient-to-br ${glowClass} blur-3xl pointer-events-none`} />

        <div className="relative rounded-[1.5rem] sm:rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl bg-black">
          <video
            ref={videoRef}
            poster={poster}
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
