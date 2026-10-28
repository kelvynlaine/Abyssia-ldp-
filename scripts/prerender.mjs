/**
 * Pré-rendu de la page d'accueil : écrit le HTML de l'application (en français)
 * dans dist/index.html, puis le navigateur l'hydrate (src/main.jsx).
 *
 * Pourquoi : les robots des moteurs IA (GPTBot, ClaudeBot, PerplexityBot…)
 * n'exécutent pas JavaScript. Sans ce pré-rendu, ils ne voyaient qu'une
 * <div id="root"> vide. Ajoute aussi le JSON-LD FAQPage, tiré des mêmes
 * questions que la FAQ affichée (src/config/faq.js).
 *
 * Usage : lancé par `npm run build`, après `vite build`.
 */
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const RACINE = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SORTIE = path.join(RACINE, 'node_modules', '.prerender'); // ignoré par git
const PAGE = path.join(RACINE, 'dist', 'index.html');
const RACINE_VIDE = '<div id="root"></div>';

execFileSync(
  'npx',
  ['vite', 'build', '--ssr', 'src/App.jsx', '--outDir', SORTIE, '--emptyOutDir', '--logLevel', 'error'],
  { cwd: RACINE, stdio: 'inherit' },
);

const { createElement } = await import('react');
const { renderToString } = await import('react-dom/server');
const { default: App } = await import(pathToFileURL(path.join(SORTIE, 'App.js')).href);
const { FAQ_DATA } = await import(pathToFileURL(path.join(RACINE, 'src', 'config', 'faq.js')).href);

const html = renderToString(createElement(App));
const mots = html.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
if (mots < 800) throw new Error(`pré-rendu trop court (${mots} mots) : la page a-t-elle changé ?`);

const faq = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  inLanguage: 'fr',
  mainEntity: FAQ_DATA.fr.map(({ question, answer }) => ({
    '@type': 'Question',
    name: question,
    acceptedAnswer: { '@type': 'Answer', text: answer },
  })),
};
// « < » échappé : le JSON ne peut pas fermer la balise <script>.
const jsonLd = `<script type="application/ld+json">${JSON.stringify(faq).replace(/</g, '\\u003c')}</script>`;

let page = fs.readFileSync(PAGE, 'utf8');
if (!page.includes(RACINE_VIDE)) throw new Error('point de montage introuvable dans dist/index.html');
page = page.replace(RACINE_VIDE, `<div id="root">${html}</div>`).replace('</head>', `${jsonLd}\n  </head>`);
fs.writeFileSync(PAGE, page);
console.log(`pré-rendu : ${mots} mots, ${FAQ_DATA.fr.length} questions FAQPage`);
