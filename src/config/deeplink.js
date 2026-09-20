/**
 * Configuration centralisée pour Abyssia
 * Vous pouvez insérer ici les liens vers les stores (App Store / Google Play).
 *
 * Ces liens alimentent les badges de la section #appstore, vers laquelle pointent
 * tous les boutons « Installer » : le visiteur choisit lui-même son store.
 *
 * getSmartInstallUrl() ci-dessous sait déduire le store depuis l'appareil, mais
 * n'est branché sur aucun bouton : il reste disponible en cas de besoin.
 */

// Lien officiel App Store (iOS). Sans code pays : Apple envoie chaque visiteur
// sur la vitrine de son propre pays.
export const APP_STORE_URL = "https://apps.apple.com/app/id6776822178";

// Lien Google Play (Android). L'app est en test fermé, sans fiche publique :
// c'est le lien d'inscription au programme de test.
export const PLAY_STORE_URL = "https://play.google.com/apps/testing/com.kelvyn.abyss_ia";

/**
 * Lien intelligent : renvoie l'URL du store adaptée à l'appareil du visiteur.
 * Sûr côté serveur (SSR) : retourne l'App Store par défaut si `navigator` est absent.
 */
export function getSmartInstallUrl() {
  if (typeof navigator === "undefined") return APP_STORE_URL;

  const ua = navigator.userAgent || navigator.vendor || "";

  // iOS (iPhone / iPad / iPod) — y compris iPad en mode "desktop"
  const isIOS =
    /iPad|iPhone|iPod/.test(ua) ||
    (/Macintosh/.test(ua) && typeof document !== "undefined" && "ontouchend" in document);
  if (isIOS) return APP_STORE_URL;

  // Android
  if (/android/i.test(ua)) return PLAY_STORE_URL;

  // Ordinateur de bureau ou plateforme inconnue -> App Store par défaut
  return APP_STORE_URL;
}

// Compatibilité : conserve l'export historique (résolu dynamiquement côté client).
export const INSTALL_DEEPLINK_URL = getSmartInstallUrl();

// Lien alternatif de secours (ex: site officiel ou Discord)
export const SUPPORT_DISCORD_URL = "https://discord.gg/QtG7jnkE5G";
export const SUPPORT_EMAIL = "kelvynwear@gmail.com";
export const SUPPORT_PHONE = "07 66 60 13 35";
export const BRAND_EMAIL = "kelvynwear@gmail.com";
