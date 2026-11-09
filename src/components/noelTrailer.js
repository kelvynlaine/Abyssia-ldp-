// Bande-annonce de Noël : même lecteur, textes et sources propres.
// Du 1er au 24 décembre inclus, heure locale. Elle disparaît le jour de Noël.
export function isChristmasSeason(now = new Date()) {
  const month = now.getMonth() + 1;
  const day = now.getDate();
  return month === 12 && day >= 1 && day <= 24;
}

export const NOEL = {
  id: 'noel',
  mobile: '/video/noel-720.mp4',
  desktop: '/video/noel-1080.mp4',
  poster: '/video/noel-poster.webp',
  badgeClass: 'bg-red-500/15 border-amber-400/30 text-amber-200',
  glowClass: 'from-red-600/25 via-amber-500/15 to-emerald-800/20',
  textes: {
    fr: {
      microBadge: 'Édition Noël · 30 s',
      title: 'La bande-annonce de Noël',
      subtitle: 'Vacances de Noël, partiels en janvier. En ligne du 1er au 24 décembre.',
    },
    en: {
      microBadge: 'Christmas edition · 30 s · in French',
      title: 'The Christmas trailer',
      subtitle: 'Christmas break, January exams. Online from December 1 to 24.',
    },
    es: {
      microBadge: 'Edición Navidad · 30 s · en francés',
      title: 'El tráiler de Navidad',
      subtitle: 'Vacaciones de Navidad, exámenes en enero. En línea del 1 al 24 de diciembre.',
    },
    zh: {
      microBadge: '圣诞版 · 30 秒 · 法语',
      title: '圣诞预告片',
      subtitle: '圣诞假期，一月考试。12 月 1 日至 24 日上线。',
    },
    it: {
      microBadge: 'Edizione Natale · 30 s · in francese',
      title: 'Il trailer di Natale',
      subtitle: 'Vacanze di Natale, esami a gennaio. Online dal 1° al 24 dicembre.',
    },
    ru: {
      microBadge: 'Рождество · 30 с · на французском',
      title: 'Рождественский трейлер',
      subtitle: 'Каникулы и экзамены в январе. На сайте с 1 по 24 декабря.',
    },
    uk: {
      microBadge: 'Різдво · 30 с · французькою',
      title: 'Різдвяний трейлер',
      subtitle: 'Канікули й іспити в січні. На сайті з 1 до 24 грудня.',
    },
  },
};
