/**
 * Test de fumée : vérifie que le site s'affiche réellement.
 *
 * Pourquoi : une erreur dans un effet React (useEffect) démonte toute
 * l'application et laisse une page blanche, sans casser ni le build, ni le lint,
 * ni un rendu côté serveur — qui n'exécute pas les effets. C'est arrivé en
 * production (commit 7945bd7).
 *
 * Deux volets :
 *   1. Rendu réel — l'application est montée dans un DOM (jsdom) avec
 *      react-dom/client, donc les effets s'exécutent. Le test échoue si la page
 *      finit vide. C'est le volet qui aurait attrapé le bug.
 *   2. Site construit — contrôles sur dist/ : point de montage présent et
 *      fichier JavaScript référencé bien produit.
 *
 * Limite assumée : jsdom n'exécute pas les scripts de type "module" produits par
 * Vite, le bundle de production n'est donc pas exécuté tel quel. Le volet 1
 * monte le même code source. Pour aller plus loin, il faudrait un navigateur
 * sans tête (Playwright).
 *
 * Usage : npm run build && npm run test:smoke
 */
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { JSDOM } from 'jsdom';

const RACINE = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIST = path.join(RACINE, 'dist');
const BUILD_TEST = path.join(RACINE, 'node_modules', '.smoke'); // ignoré par git

let echecs = 0;
const verifier = (ok, libelle) => {
  if (!ok) echecs++;
  console.log(`${ok ? 'OK  ' : 'FAIL'} ${libelle}`);
};

// ---------------------------------------------------------------- volet 1
console.log('== 1. Rendu réel de l\'application (effets compris) ==');

// Compile App.jsx pour Node afin de pouvoir le monter ici.
execFileSync(
  'npx',
  ['vite', 'build', '--ssr', 'src/App.jsx', '--outDir', BUILD_TEST, '--emptyOutDir', '--logLevel', 'error'],
  { cwd: RACINE, stdio: 'inherit' },
);

const dom = new JSDOM('<!doctype html><html><body><div id="root"></div></body></html>', {
  url: 'https://abyssia.eu/',
  pretendToBeVisual: true,
});

// react-dom/client a besoin de ces variables globales avant d'être chargé.
// defineProperty et non affectation : Node définit certaines de ces variables
// (navigator) en lecture seule.
for (const cle of ['window', 'document', 'navigator', 'location', 'history', 'HTMLElement', 'Element', 'Node', 'Text', 'DocumentFragment', 'MutationObserver', 'getComputedStyle', 'requestAnimationFrame', 'cancelAnimationFrame']) {
  Object.defineProperty(globalThis, cle, { value: dom.window[cle], configurable: true, writable: true });
}

const erreurs = [];
dom.window.addEventListener('error', (e) => erreurs.push(e.message || String(e.error)));
globalThis.reportError = (e) => erreurs.push(String(e && e.message ? e.message : e));
const consoleErreur = console.error;
console.error = (...args) => { erreurs.push(args.map(String).join(' ')); };

const { default: App } = await import(pathToFileURL(path.join(BUILD_TEST, 'App.js')));
const { createElement } = await import('react');
const { createRoot } = await import('react-dom/client');

const racine = dom.window.document.getElementById('root');
try {
  createRoot(racine).render(createElement(App));
} catch (e) {
  erreurs.push(String(e && e.message ? e.message : e));
}
await new Promise((resolve) => setTimeout(resolve, 1500));
console.error = consoleErreur;

const doc = dom.window.document;
const texte = doc.body.textContent.trim();
const liens = [...doc.querySelectorAll('a')].map((a) => a.getAttribute('href') || '');

verifier(racine.childElementCount > 0, "l'application est montée (#root non vide)");
verifier(texte.length > 500, `la page contient du texte (${texte.length} caractères)`);
verifier(!!doc.querySelector('h1'), 'un titre principal est présent');
verifier(!!doc.getElementById('appstore'), 'la section des stores est présente');
verifier(
  liens.some((h) => h.includes('apps.apple.com')) && liens.some((h) => h.includes('play.google.com')),
  'les liens App Store et Google Play sont présents',
);
verifier(erreurs.length === 0, `aucune erreur JavaScript${erreurs.length ? ` : ${erreurs.slice(0, 3).join(' | ').slice(0, 300)}` : ''}`);

dom.window.close();
fs.rmSync(BUILD_TEST, { recursive: true, force: true });

// ---------------------------------------------------------------- volet 2
console.log('\n== 2. Site construit (dist/) ==');
const indexHtml = path.join(DIST, 'index.html');
if (!fs.existsSync(indexHtml)) {
  console.error('dist/index.html introuvable. Lancez `npm run build` avant ce test.');
  process.exit(1);
}
const html = fs.readFileSync(indexHtml, 'utf8');
const bundle = (html.match(/\/assets\/index-[A-Za-z0-9_-]+\.js/) || [])[0];
const bundleFichier = bundle && path.join(DIST, bundle);

verifier(html.includes('id="root"'), 'le point de montage #root est présent dans index.html');
verifier(!!bundle, `un fichier JavaScript est référencé${bundle ? ` (${bundle})` : ''}`);
verifier(
  !!bundleFichier && fs.existsSync(bundleFichier) && fs.statSync(bundleFichier).size > 50_000,
  'ce fichier existe et a une taille plausible',
);

console.log(echecs ? `\n❌ ${echecs} échec(s)` : "\n✅ le site s'affiche correctement");
process.exit(echecs ? 1 : 0);
