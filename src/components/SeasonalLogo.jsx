import { isChristmasSeason } from './noelTrailer';
import { isHalloweenSeason } from './halloweenTrailer';

// Même calendrier que les bandes-annonces : Halloween du 24 octobre au
// 2 novembre, Noël du 1er au 24 décembre, heure locale.
export function seasonalLogoSrc(now = new Date()) {
  if (isHalloweenSeason(now)) return '/logo-abyssia-halloween.png';
  if (isChristmasSeason(now)) return '/logo-abyssia-noel.png';
  return '/logo-abyssia.png';
}

export default function SeasonalLogo({ className, alt = 'Abyssia' }) {
  return <img src={seasonalLogoSrc()} alt={alt} className={className} />;
}
