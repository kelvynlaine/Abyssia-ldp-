"""Génère les guides statiques public/guides/*.html (contenu lisible sans JavaScript, pour Google et les IA).

Usage : python3 scripts/guides.py  (puis commit des fichiers produits). Modifier le contenu ici, pas dans le HTML.
"""
import html
import json
import pathlib
import re

RACINE = pathlib.Path(__file__).resolve().parent.parent
SORTIE = RACINE / 'public' / 'guides'
DATE = '2026-10-28'
APP_STORE = 'https://apps.apple.com/app/id6776822178'

STYLE = """
    :root { color-scheme: dark; }
    * { box-sizing: border-box; }
    body { margin: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      background: radial-gradient(circle at 50% 0%, #1e293b 0%, #0f172a 60%, #020617 100%); color: #fff; line-height: 1.65; padding: 32px 18px; }
    main { width: 100%; max-width: 820px; margin: 0 auto; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12);
      border-radius: 24px; padding: 32px; box-shadow: 0 24px 60px rgba(0,0,0,0.45); }
    h1, h2, h3 { line-height: 1.25; } h1 { margin-top: 0; font-size: 30px; } h2 { margin-top: 32px; font-size: 21px; color: #67e8f9; }
    p, li { color: rgba(255,255,255,0.84); } a { color: #67e8f9; } .meta { color: rgba(255,255,255,0.58); font-size: 14px; }
    .resume { background: rgba(103,232,249,0.08); border-left: 3px solid #67e8f9; padding: 12px 16px; border-radius: 8px; }
    .cta { display: inline-block; margin-top: 8px; padding: 12px 20px; border-radius: 12px; background: linear-gradient(90deg,#8b5cf6,#ec4899);
      color: #fff; font-weight: 700; text-decoration: none; }
    nav.fil { font-size: 14px; margin-bottom: 18px; } nav.fil a { color: rgba(255,255,255,0.7); }
    @media (max-width: 600px) { main { padding: 22px; } h1 { font-size: 25px; } }
"""

# Chaque guide : réponse directe en tête (citable), étapes en liste, sources fiables, liens internes.
GUIDES = [
    {
        'slug': 'reviser-avec-ia',
        'titre': "Comment réviser avec l'IA : la méthode en 5 étapes",
        'title': "Réviser avec l'IA : méthode en 5 étapes pour le bac et les partiels — Abyssia",
        'desc': "Comment réviser efficacement avec l'intelligence artificielle : faire rédiger un cours, se tester avec des QCM et des flashcards, planifier en sessions courtes.",
        'resume': "Pour réviser avec l'IA, faites-lui d'abord expliquer le chapitre, puis interrogez-vous avec des QCM et des flashcards générés à partir de ce cours, et répétez ces tests sur plusieurs jours. L'IA sert à produire le support et les questions ; la mémorisation vient du fait de se tester, pas de relire.",
        'corps': [
            ('h2', "Pourquoi l'IA aide vraiment à réviser"),
            ('p', "Une IA générative produit en quelques secondes ce qui prenait des heures à préparer : un cours structuré, des exemples corrigés, des questions d'entraînement. Le gain n'est pas de « faire réviser l'IA à votre place », mais d'avoir immédiatement de quoi vous tester. Or se tester est l'une des méthodes de mémorisation les mieux étudiées : c'est l'<a href=\"https://en.wikipedia.org/wiki/Testing_effect\" rel=\"noopener\">effet de test</a>, qui montre que retrouver une information de mémoire la consolide davantage que la relire."),
            ('h2', "La méthode en 5 étapes"),
            ('ol', [
                "<strong>Faire expliquer le chapitre.</strong> Donnez à l'IA la matière, le chapitre et votre niveau (par exemple « fonctions affines, première »). Demandez un cours complet avec définitions, propriétés et exemples traités.",
                "<strong>Vérifier avec votre propre cours.</strong> Comparez avec le cours du professeur ou le manuel. L'IA peut se tromper : ce qui compte pour l'examen, c'est le programme et ce qui a été vu en classe.",
                "<strong>Se tester avec un QCM.</strong> Générez un QCM à partir du sujet ou en collant votre cours. Répondez sans regarder, puis lisez les corrections des erreurs.",
                "<strong>Transformer les erreurs en flashcards.</strong> Chaque notion ratée devient une carte question-réponse, à revoir les jours suivants (voir <a href=\"/guides/flashcards-repetition-espacee.html\">flashcards et répétition espacée</a>).",
                "<strong>Planifier en sessions courtes.</strong> Révisez par blocs de 25 minutes avec une pause (voir <a href=\"/guides/methode-pomodoro-revisions.html\">la méthode Pomodoro pour réviser</a>) et revenez sur chaque chapitre à plusieurs jours d'intervalle.",
            ]),
            ('h2', "Les erreurs à éviter"),
            ('ul', [
                "Copier une réponse de l'IA sans la comprendre : à l'examen, vous n'aurez pas l'IA.",
                "Relire le cours généré plusieurs fois au lieu de vous interroger dessus.",
                "Tout réviser la veille : la mémoire retient mieux des révisions espacées sur plusieurs jours.",
                "Ne jamais vérifier : une IA peut inventer une date, une formule ou une référence. Contrôlez les faits importants.",
            ]),
            ('h2', "Faire tout cela dans une seule application"),
            ('p', "Dans <a href=\"/\">Abyssia</a>, ces étapes se suivent sans changer d'outil : l'outil Cours IA rédige le chapitre à votre niveau, les QCM et les flashcards se génèrent à partir d'un sujet, d'un texte ou d'un fichier, et le minuteur Pomodoro cadre les sessions. L'application est gratuite sur iPhone et iPad (iOS 15+), avec des quotas quotidiens d'IA ; l'abonnement Premium les retire."),
        ],
    },
    {
        'slug': 'methode-pomodoro-revisions',
        'titre': "La méthode Pomodoro pour réviser : mode d'emploi",
        'title': "Méthode Pomodoro pour réviser : 25 minutes, pauses et conseils — Abyssia",
        'desc': "La technique Pomodoro appliquée aux révisions : 25 minutes de travail, 5 minutes de pause, une pause longue après quatre cycles. Mode d'emploi et erreurs à éviter.",
        'resume': "La méthode Pomodoro consiste à travailler 25 minutes sur une seule tâche, puis à faire une pause de 5 minutes ; après quatre cycles, on prend une pause plus longue de 15 à 30 minutes. Pour réviser, elle aide à démarrer, à rester concentré et à mesurer le travail réellement fait.",
        'corps': [
            ('h2', "D'où vient la méthode Pomodoro ?"),
            ('p', "La <a href=\"https://fr.wikipedia.org/wiki/Technique_Pomodoro\" rel=\"noopener\">technique Pomodoro</a> a été mise au point par Francesco Cirillo à la fin des années 1980. Son nom vient du minuteur de cuisine en forme de tomate (pomodoro en italien) qu'il utilisait pendant ses études."),
            ('h2', "Comment l'appliquer à vos révisions"),
            ('ol', [
                "<strong>Choisissez une seule tâche précise</strong> : « faire le QCM du chapitre 3 », plutôt que « réviser l'histoire ».",
                "<strong>Lancez un minuteur de 25 minutes</strong> et travaillez sans téléphone ni notifications jusqu'à la sonnerie.",
                "<strong>Faites une vraie pause de 5 minutes</strong> : levez-vous, buvez de l'eau, ne rouvrez pas les réseaux sociaux.",
                "<strong>Après quatre « pomodoros »</strong>, prenez une pause longue de 15 à 30 minutes.",
                "<strong>Notez ce que vous avez fait</strong> à chaque cycle : compter les sessions motive et montre où part votre temps.",
            ]),
            ('h2', "Bien choisir le contenu de chaque session"),
            ('p', "Une session est plus utile quand elle vous fait produire quelque chose : répondre à un QCM, réciter une flashcard, refaire un exercice sans la correction. Gardez la relecture pour le début d'un chapitre, et passez vite aux tests (voir <a href=\"/guides/reviser-avec-ia.html\">réviser avec l'IA en 5 étapes</a>)."),
            ('h2', "Exemple : une soirée de révision en quatre pomodoros"),
            ('ol', [
                "<strong>Pomodoro 1</strong> : lire le cours du chapitre et noter les trois notions qui posent problème.",
                "<strong>Pomodoro 2</strong> : faire un QCM sur le chapitre, sans regarder le cours.",
                "<strong>Pomodoro 3</strong> : reprendre chaque erreur du QCM et en faire une flashcard.",
                "<strong>Pomodoro 4</strong> : refaire un exercice type de l'examen, puis vérifier avec la correction.",
            ]),
            ('p', "Ensuite, pause longue : vous avez travaillé environ deux heures, dont l'essentiel à vous tester plutôt qu'à relire."),
            ('h2', "Erreurs courantes"),
            ('ul', [
                "Sauter les pauses : la concentration baisse et les sessions suivantes deviennent moins efficaces.",
                "Garder le téléphone à portée de main pendant les 25 minutes.",
                "Choisir une tâche trop vague, qu'on ne sait pas par où commencer.",
                "S'en tenir à 25 minutes quand cela ne convient pas : certains travaillent mieux sur 40 ou 50 minutes. Le principe est l'alternance, pas le chiffre exact.",
            ]),
            ('h2', "Un minuteur Pomodoro dans Abyssia"),
            ('p', "<a href=\"/\">Abyssia</a> intègre un minuteur Pomodoro qui continue de tourner en dehors de l'application, avec le décompte affiché sur l'écran de verrouillage. Les sessions comptent dans votre progression (XP et séries), aux côtés des cours IA, des QCM et des flashcards. Vous pouvez aussi essayer la démonstration interactive sur <a href=\"/#pomodoro\">la page d'accueil</a>."),
        ],
    },
    {
        'slug': 'flashcards-repetition-espacee',
        'titre': "Flashcards et répétition espacée : mémoriser durablement",
        'title': "Flashcards et répétition espacée : la méthode pour mémoriser — Abyssia",
        'desc': "Pourquoi les flashcards et la répétition espacée sont efficaces pour mémoriser, comment faire de bonnes cartes et à quel rythme les revoir avant un examen.",
        'resume': "La répétition espacée consiste à revoir une information à des intervalles de plus en plus longs, juste avant de l'oublier. Associée aux flashcards, qui obligent à retrouver la réponse de mémoire, c'est l'une des méthodes les plus efficaces pour retenir durablement du vocabulaire, des dates, des définitions ou des formules.",
        'corps': [
            ('h2', "Pourquoi on oublie, et comment l'éviter"),
            ('p', "À la fin du XIXe siècle, Hermann Ebbinghaus a décrit la <a href=\"https://fr.wikipedia.org/wiki/Courbe_de_l%27oubli\" rel=\"noopener\">courbe de l'oubli</a> : sans révision, on perd une grande partie d'une information nouvelle en quelques jours. Chaque révision faite au bon moment ralentit cet oubli. C'est le principe de la <a href=\"https://fr.wikipedia.org/wiki/R%C3%A9p%C3%A9tition_espac%C3%A9e\" rel=\"noopener\">répétition espacée</a> : revoir peu, mais à des intervalles croissants."),
            ('h2', "Faire de bonnes flashcards"),
            ('ul', [
                "<strong>Une seule idée par carte</strong> : « Date de la prise de la Bastille ? », pas « Résumez la Révolution française ».",
                "<strong>Une question qui oblige à chercher</strong> : la réponse ne doit pas se deviner à partir de la question.",
                "<strong>Des mots à vous</strong> : reformuler une définition aide déjà à la comprendre.",
                "<strong>Un exemple quand c'est abstrait</strong> : une formule de maths se retient mieux avec un cas chiffré.",
            ]),
            ('h2', "À quel rythme revoir ses cartes ?"),
            ('p', "Un rythme simple avant un examen : revoir une nouvelle carte le jour même, puis le lendemain, trois jours plus tard, une semaine plus tard, et ainsi de suite en allongeant l'intervalle. Une carte ratée revient au début du cycle. Les cartes déjà bien sues se revoient rarement, ce qui laisse le temps aux notions difficiles."),
            ('h2', "Se tester plutôt que relire"),
            ('p', "Le bénéfice des flashcards tient surtout à l'effort de rappel : essayer de retrouver la réponse avant de la lire. Ce phénomène est connu sous le nom d'<a href=\"https://en.wikipedia.org/wiki/Testing_effect\" rel=\"noopener\">effet de test</a>. Dites ou écrivez la réponse avant de retourner la carte, même si vous n'êtes pas sûr."),
            ('h2', "Générer ses flashcards avec l'IA"),
            ('p', "Préparer des dizaines de cartes à la main prend du temps. Dans <a href=\"/\">Abyssia</a>, l'outil Flashcards IA crée un paquet de cartes à partir d'un sujet (« les capitales d'Europe »), d'un texte collé ou d'un fichier, et les QCM se génèrent de la même façon. Relisez les cartes produites et corrigez-les si besoin : une carte fausse s'apprend aussi bien qu'une carte juste. Pour enchaîner cours, tests et planning, voir <a href=\"/guides/reviser-avec-ia.html\">réviser avec l'IA en 5 étapes</a>."),
        ],
    },
    {
        'slug': 'fiche-de-revision',
        'titre': "Comment faire une fiche de révision efficace",
        'title': "Faire une fiche de révision efficace : méthode, modèle et erreurs — Abyssia",
        'desc': "Comment faire une bonne fiche de révision : ce qu'il faut y mettre, la structure à suivre, la méthode Cornell et comment s'en servir pour se tester.",
        'resume': "Une bonne fiche de révision tient sur une page, ne garde que l'essentiel (définitions, notions clés, formules, exemples) et se rédige avec vos propres mots, de mémoire autant que possible. Elle sert ensuite à vous interroger : cachez le contenu et essayez de le retrouver, au lieu de la relire.",
        'corps': [
            ('h2', "Pourquoi faire des fiches ?"),
            ('p', "Faire une fiche oblige à trier : ce qui doit absolument être su, ce qui est un détail. Ce travail de sélection et de reformulation fait déjà partie de l'apprentissage. Une fiche recopiée mot pour mot depuis le cours apporte beaucoup moins : elle devient un deuxième cours, pas un outil de révision."),
            ('h2', "Ce qu'il faut mettre sur une fiche"),
            ('ul', [
                "<strong>Le titre du chapitre et la question centrale</strong> : « Les fonctions affines : comment reconnaître et représenter une droite ? ».",
                "<strong>Les définitions</strong>, formulées simplement.",
                "<strong>Les notions, dates ou formules à connaître par cœur</strong>, mises en évidence.",
                "<strong>Un exemple court</strong> pour chaque notion abstraite : un calcul, une citation, un cas concret.",
                "<strong>Les pièges</strong> déjà rencontrés en exercice ou signalés par le professeur.",
            ]),
            ('h2', "La méthode en 4 étapes"),
            ('ol', [
                "<strong>Relisez le chapitre une fois</strong> en entier, sans rien écrire.",
                "<strong>Fermez le cours et notez de mémoire</strong> ce que vous avez retenu : c'est le brouillon de la fiche.",
                "<strong>Rouvrez le cours pour compléter</strong> les trous, d'une autre couleur : ce sont vos points faibles.",
                "<strong>Mettez au propre sur une seule page</strong>, avec des titres courts, des listes et des flèches plutôt que des paragraphes.",
            ]),
            ('h2', "Le modèle Cornell"),
            ('p', "La <a href=\"https://en.wikipedia.org/wiki/Cornell_Notes\" rel=\"noopener\">méthode Cornell</a> divise la page en trois zones : une colonne étroite à gauche pour les questions ou mots-clés, une grande zone à droite pour les notes, et un résumé de deux ou trois phrases en bas. Pour réviser, on cache la zone de droite et on répond aux questions de la colonne de gauche."),
            ('h2', "Se servir de ses fiches"),
            ('p', "Une fiche est utile quand elle vous fait réfléchir. Lisez la question ou le titre, essayez de dire le contenu à voix haute, puis vérifiez. Les notions oubliées peuvent devenir des <a href=\"/guides/flashcards-repetition-espacee.html\">flashcards</a>, et les révisions de chaque fiche s'étalent sur plusieurs jours (voir <a href=\"/guides/planning-revisions-bac.html\">un planning de révision sur quatre semaines</a>)."),
            ('h2', "Gagner du temps avec l'IA"),
            ('p', "Dans <a href=\"/\">Abyssia</a>, l'outil Cours IA rédige un cours complet sur le chapitre, avec exemples et exercices, et l'outil d'écriture peut résumer un texte que vous collez. Servez-vous de ces résumés comme point de départ, puis faites votre propre fiche : c'est le tri que vous faites vous-même qui vous fait retenir."),
        ],
    },
    {
        'slug': 'carte-mentale-reviser',
        'titre': "Réviser avec une carte mentale : mode d'emploi",
        'title': "Carte mentale pour réviser : comment la faire et quand l'utiliser — Abyssia",
        'desc': "Comment faire une carte mentale (mind map) pour réviser un chapitre : idée centrale, branches, mots-clés, couleurs. Pour quels sujets elle marche le mieux.",
        'resume': "Une carte mentale place le sujet au centre de la page et organise les idées en branches, avec un mot-clé par branche. Elle sert surtout à voir la structure d'un chapitre et les liens entre les notions ; pour mémoriser des définitions ou des dates précises, elle se complète avec des flashcards ou des QCM.",
        'corps': [
            ('h2', "Qu'est-ce qu'une carte mentale ?"),
            ('p', "Une <a href=\"https://fr.wikipedia.org/wiki/Carte_mentale\" rel=\"noopener\">carte mentale</a> (ou carte heuristique, mind map en anglais) est un schéma qui part d'une idée centrale et se ramifie en sous-thèmes, puis en détails. Au lieu d'une liste linéaire, on obtient une vue d'ensemble du chapitre sur une seule page."),
            ('h2', "Comment faire une carte mentale en 5 étapes"),
            ('ol', [
                "<strong>Écrivez le sujet au centre</strong> d'une feuille posée à l'horizontale, dans un cadre ou un dessin.",
                "<strong>Tracez les grandes branches</strong> : une par partie du chapitre (causes, conséquences, acteurs, dates…).",
                "<strong>Ajoutez des sous-branches</strong> pour les idées secondaires, avec un ou deux mots-clés par branche, pas de phrases.",
                "<strong>Utilisez une couleur par grande branche</strong> et quelques symboles ou dessins simples pour les notions importantes.",
                "<strong>Reliez les notions</strong> qui dépendent l'une de l'autre par des flèches entre les branches.",
            ]),
            ('h2', "Pour quelles matières ?"),
            ('ul', [
                "<strong>Très adaptée</strong> : histoire, géographie, SES, SVT, philosophie, littérature, où il faut relier des idées.",
                "<strong>Utile pour structurer</strong> une dissertation ou un exposé avant de rédiger.",
                "<strong>Moins adaptée seule</strong> pour les formules de maths ou le vocabulaire de langue : mieux vaut s'entraîner sur des exercices ou des <a href=\"/guides/flashcards-repetition-espacee.html\">flashcards</a>.",
            ]),
            ('h2', "La refaire de mémoire"),
            ('p', "Le meilleur usage d'une carte mentale est de la refaire sans regarder, quelques jours plus tard, puis de la comparer à l'originale. Les branches oubliées montrent exactement ce qu'il faut revoir. C'est le même principe que se tester avec un QCM : retrouver une information de mémoire la fixe mieux que la relire."),
            ('h2', "Carte mentale, fiche ou flashcards ?"),
            ('p', "Ces outils se complètent : la carte mentale donne la structure, la <a href=\"/guides/fiche-de-revision.html\">fiche de révision</a> rassemble les détails à savoir, et les flashcards et QCM servent à vérifier que tout est retenu. Dans <a href=\"/\">Abyssia</a>, les QCM et les flashcards se génèrent à partir d'un sujet, d'un texte ou d'un fichier, ce qui permet de vérifier rapidement un chapitre déjà schématisé."),
        ],
    },
    {
        'slug': 'planning-revisions-bac',
        'titre': "Planning de révision pour le bac : le programme sur 4 semaines",
        'title': "Planning de révision du bac sur 4 semaines : méthode et exemple — Abyssia",
        'desc': "Comment organiser ses révisions du bac ou des partiels sur quatre semaines : faire le point, répartir les chapitres, espacer les révisions et s'entraîner sur des sujets.",
        'resume': "Pour réviser le bac en quatre semaines, faites d'abord la liste de tous les chapitres et notez votre niveau sur chacun, puis répartissez-les en commençant par les plus faibles, revenez sur chaque chapitre plusieurs fois à quelques jours d'intervalle, et gardez la dernière semaine pour des sujets en conditions réelles.",
        'corps': [
            ('h2', "Étape 1 : faire l'inventaire"),
            ('p', "Listez, matière par matière, tous les chapitres au programme de l'examen. À côté de chacun, notez votre niveau : vert (je maîtrise), orange (à revoir), rouge (je ne sais pas). Ce tableau évite de réviser au hasard et de passer trop de temps sur ce que vous savez déjà."),
            ('h2', "Étape 2 : répartir sur quatre semaines"),
            ('ol', [
                "<strong>Semaine 1 : les chapitres rouges.</strong> Reprenez le cours, faites une fiche par chapitre, terminez chaque séance par un petit QCM.",
                "<strong>Semaine 2 : les chapitres orange</strong>, et une première révision rapide des chapitres de la semaine 1.",
                "<strong>Semaine 3 : les chapitres verts</strong> et des exercices types, avec une deuxième révision des semaines 1 et 2.",
                "<strong>Semaine 4 : des sujets complets</strong> en temps limité, corrigés, puis une dernière révision des notions encore fragiles.",
            ]),
            ('h2', "Pourquoi revenir plusieurs fois sur chaque chapitre"),
            ('p', "Réviser un chapitre une seule fois, même longtemps, est moins efficace que d'y revenir plusieurs fois à quelques jours d'écart. C'est l'<a href=\"https://en.wikipedia.org/wiki/Spacing_effect\" rel=\"noopener\">effet d'espacement</a>, l'un des résultats les plus solides de la recherche sur la mémoire. Dans le planning ci-dessus, chaque chapitre faible est vu au moins trois fois avant l'examen."),
            ('h2', "Une journée type de révision"),
            ('ul', [
                "Trois à quatre blocs de travail de 25 à 50 minutes, avec des pauses (voir <a href=\"/guides/methode-pomodoro-revisions.html\">la méthode Pomodoro</a>).",
                "Deux matières différentes dans la journée plutôt qu'une seule : alterner évite la saturation.",
                "Chaque bloc se termine par un test : QCM, flashcards ou exercice sans la correction.",
                "Une soirée libre par semaine, et des nuits complètes : le sommeil compte dans la mémorisation (voir <a href=\"/guides/reviser-veille-examen.html\">réviser la veille d'un examen</a>).",
            ]),
            ('h2', "Suivre son planning"),
            ('p', "Notez chaque soir ce que vous avez fait et repassez les chapitres du rouge à l'orange puis au vert. Dans <a href=\"/\">Abyssia</a>, les objectifs et les tâches servent à suivre ce planning, le minuteur Pomodoro cadre les séances, et le brief quotidien résume ce qui a été fait. Les cours IA, les QCM et les flashcards couvrent les séances elles-mêmes."),
        ],
    },
    {
        'slug': 'apprendre-vocabulaire-langue',
        'titre': "Apprendre du vocabulaire en langue étrangère : la méthode qui marche",
        'title': "Apprendre du vocabulaire (anglais, espagnol…) vite et durablement — Abyssia",
        'desc': "Comment apprendre et retenir du vocabulaire en anglais, espagnol, italien ou autre : mots en contexte, flashcards dans les deux sens, répétition espacée, réemploi à l'oral et à l'écrit.",
        'resume': "Pour retenir du vocabulaire, apprenez les mots dans une phrase plutôt que seuls, révisez-les avec des flashcards dans les deux sens (langue maternelle vers langue étrangère et l'inverse), espacez les révisions sur plusieurs jours, et réutilisez chaque mot à l'oral ou à l'écrit le plus tôt possible.",
        'corps': [
            ('h2', "Apprendre les mots en contexte"),
            ('p', "Un mot isolé s'oublie vite. Notez-le avec une phrase d'exemple, l'article ou le genre pour les noms (le, la, der, die, el…), la préposition qui l'accompagne pour les verbes, et un mot de la même famille. « To rely on » se retient mieux avec « You can rely on me » qu'avec la seule traduction « compter sur »."),
            ('h2', "Des flashcards dans les deux sens"),
            ('ul', [
                "<strong>Langue étrangère vers français</strong> : pour comprendre un texte ou un oral.",
                "<strong>Français vers langue étrangère</strong> : plus difficile, mais c'est ce qu'il faut pour parler et écrire.",
                "<strong>Dites le mot à voix haute</strong> avant de retourner la carte, pour travailler aussi la prononciation.",
                "<strong>Une petite quantité chaque jour</strong> (10 à 20 nouveaux mots) vaut mieux que 100 mots la veille du contrôle.",
            ]),
            ('h2', "Espacer les révisions"),
            ('p', "Revoyez un nouveau mot le jour même, le lendemain, puis quelques jours plus tard et une semaine après. Les mots bien sus reviennent rarement, les mots ratés reviennent vite. C'est la <a href=\"https://fr.wikipedia.org/wiki/R%C3%A9p%C3%A9tition_espac%C3%A9e\" rel=\"noopener\">répétition espacée</a>, détaillée dans <a href=\"/guides/flashcards-repetition-espacee.html\">notre guide sur les flashcards</a>."),
            ('h2', "Réutiliser les mots"),
            ('ol', [
                "<strong>Écrivez trois phrases</strong> par jour avec les mots de la veille.",
                "<strong>Lisez ou écoutez un contenu court</strong> dans la langue (article, chanson, vidéo) et repérez les mots appris.",
                "<strong>Parlez</strong> : avec un camarade, un correspondant ou une IA de conversation, en essayant de placer les nouveaux mots.",
                "<strong>Regroupez les mots par thème</strong> (voyage, travail, émotions) pour pouvoir les mobiliser ensemble.",
            ]),
            ('h2', "Avec Abyssia"),
            ('p', "<a href=\"/\">Abyssia</a> propose des parcours d'apprentissage des langues (anglais, espagnol, italien, russe…), un traducteur multilingue avec dictionnaire, et des flashcards générées à partir d'une liste de mots ou d'un texte. Le chat IA peut aussi servir de partenaire de conversation pour réemployer le vocabulaire à l'écrit."),
        ],
    },
    {
        'slug': 'reviser-veille-examen',
        'titre': "Réviser la veille d'un examen : ce qu'il faut faire (et éviter)",
        'title': "Que réviser la veille d'un examen ? Méthode pour la dernière soirée — Abyssia",
        'desc': "Comment utiliser la veille d'un examen : revoir ses fiches et ses erreurs, se tester rapidement, préparer son matériel et bien dormir plutôt que réviser toute la nuit.",
        'resume': "La veille d'un examen, n'apprenez pas de nouveaux chapitres : revoyez vos fiches et vos erreurs passées, faites un test rapide pour vous rassurer, préparez votre matériel, puis arrêtez tôt et dormez. Une nuit de sommeil complète aide davantage la mémoire qu'une nuit blanche de révisions.",
        'corps': [
            ('h2', "Ce qu'il faut faire"),
            ('ol', [
                "<strong>Relire ses fiches et cartes mentales</strong>, chapitre par chapitre, en essayant de réciter avant de lire.",
                "<strong>Revoir ses erreurs</strong> : les flashcards ratées, les questions manquées aux QCM, les remarques sur les copies corrigées.",
                "<strong>Faire un test court</strong> (15 à 20 minutes) sur les notions les plus importantes, pour vérifier qu'elles sont là.",
                "<strong>Préparer le matériel</strong> : convocation, pièce d'identité, stylos, calculatrice autorisée, montre, eau.",
                "<strong>Arrêter tôt</strong> et faire une activité calme avant de dormir.",
            ]),
            ('h2', "Ce qu'il faut éviter"),
            ('ul', [
                "<strong>Découvrir un nouveau chapitre</strong> : il a peu de chances d'être retenu et augmente le stress.",
                "<strong>La nuit blanche</strong> : le manque de sommeil réduit l'attention et la mémoire le jour de l'épreuve.",
                "<strong>Comparer ses révisions</strong> avec celles des autres sur les réseaux sociaux.",
                "<strong>L'excès de caféine ou de boissons énergisantes</strong>, qui perturbe l'endormissement.",
            ]),
            ('h2', "Pourquoi le sommeil compte"),
            ('p', "Pendant le sommeil, le cerveau consolide ce qui a été appris dans la journée. Les liens entre <a href=\"https://en.wikipedia.org/wiki/Sleep_and_memory\" rel=\"noopener\">sommeil et mémoire</a> sont bien documentés : une bonne nuit avant l'épreuve vaut mieux que quelques heures de révision supplémentaires. C'est aussi pour cela que les révisions s'étalent sur plusieurs semaines (voir <a href=\"/guides/planning-revisions-bac.html\">le planning sur quatre semaines</a>)."),
            ('h2', "Le matin de l'examen"),
            ('ul', [
                "Un petit-déjeuner normal, sans changer ses habitudes.",
                "Un coup d'œil de cinq minutes sur une fiche de synthèse, pas plus.",
                "Arriver en avance pour éviter de courir.",
                "Pendant l'épreuve : lire tout le sujet, commencer par ce que l'on sait le mieux, garder du temps pour se relire.",
            ]),
            ('h2', "Une dernière révision rapide avec Abyssia"),
            ('p', "La veille, un QCM court généré dans <a href=\"/\">Abyssia</a> à partir du chapitre ou de votre fiche permet de vérifier en quelques minutes les notions essentielles. Les flashcards déjà créées se revoient de la même façon. Pour la suite de vos révisions, voir aussi <a href=\"/guides/fiche-de-revision.html\">comment faire une fiche de révision</a>."),
        ],
    },
]


def bloc(kind, contenu):
    if kind in ('h2', 'p'):
        return f'    <{kind}>{contenu}</{kind}>'
    items = '\n'.join(f'      <li>{li}</li>' for li in contenu)
    return f'    <{kind}>\n{items}\n    </{kind}>'


def page(title, desc, url, jsonld, corps):
    ld = json.dumps(jsonld, ensure_ascii=False, indent=2).replace('</', '<\\/')
    return f'''<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>{html.escape(title)}</title>
  <meta name="description" content="{html.escape(desc)}" />
  <link rel="canonical" href="{url}" />
  <link rel="icon" type="image/png" href="/logo-abyssia.png" />
  <meta property="og:type" content="article" />
  <meta property="og:title" content="{html.escape(title)}" />
  <meta property="og:description" content="{html.escape(desc)}" />
  <meta property="og:url" content="{url}" />
  <meta property="og:image" content="https://abyssia.eu/screens/02-cours.webp" />
  <script type="application/ld+json">
{ld}
  </script>
  <style>{STYLE}  </style>
</head>
<body>
  <main>
{corps}
  </main>
</body>
</html>
'''


def mots(texte):
    return len(re.sub('<[^>]+>', ' ', texte).split())


SORTIE.mkdir(parents=True, exist_ok=True)
for g in GUIDES:
    url = f"https://abyssia.eu/guides/{g['slug']}.html"
    autres = [x for x in GUIDES if x is not g]
    corps = [
        f'    <nav class="fil"><a href="/">Accueil</a> › <a href="/guides/">Guides</a> › {html.escape(g["titre"])}</nav>',
        f'    <h1>{html.escape(g["titre"])}</h1>',
        f'    <p class="meta">Par Kelvyn Laine, créateur d\'Abyssia · mis à jour le 28 octobre 2026</p>',
        f'    <p class="resume"><strong>En bref :</strong> {g["resume"]}</p>',
        *(bloc(k, c) for k, c in g['corps']),
        '    <h2>Pour aller plus loin</h2>',
        bloc('ul', [f'<a href="/guides/{x["slug"]}.html">{html.escape(x["titre"])}</a>' for x in autres]
             + ['<a href="/#faq">Questions fréquentes sur Abyssia</a>', '<a href="/a-propos.html">Qui édite Abyssia</a>']),
        f'    <p><a class="cta" href="{APP_STORE}" rel="noopener">Télécharger Abyssia gratuitement sur l\'App Store</a></p>',
    ]
    corps = '\n'.join(corps)
    assert mots(corps) > 450, (g['slug'], mots(corps))
    jsonld = {
        '@context': 'https://schema.org',
        '@graph': [
            {'@type': 'Article', 'headline': g['titre'], 'description': g['desc'], 'inLanguage': 'fr', 'url': url,
             'mainEntityOfPage': url, 'datePublished': DATE, 'dateModified': DATE,
             'image': 'https://abyssia.eu/screens/02-cours.webp',
             'author': {'@type': 'Person', 'name': 'Kelvyn Laine', 'url': 'https://abyssia.eu/a-propos.html'},
             'publisher': {'@type': 'Organization', '@id': 'https://abyssia.eu/#editeur', 'name': 'Abyssia',
                           'logo': {'@type': 'ImageObject', 'url': 'https://abyssia.eu/logo-abyssia.png'}},
             'about': {'@id': 'https://abyssia.eu/#app'}},
            {'@type': 'BreadcrumbList', 'itemListElement': [
                {'@type': 'ListItem', 'position': 1, 'name': 'Accueil', 'item': 'https://abyssia.eu/'},
                {'@type': 'ListItem', 'position': 2, 'name': 'Guides', 'item': 'https://abyssia.eu/guides/'},
                {'@type': 'ListItem', 'position': 3, 'name': g['titre'], 'item': url}]},
        ],
    }
    (SORTIE / f"{g['slug']}.html").write_text(page(g['title'], g['desc'], url, jsonld, corps))
    print(g['slug'], mots(corps), 'mots')

# Index des guides
liste = '\n'.join(
    f'      <li><a href="/guides/{g["slug"]}.html"><strong>{html.escape(g["titre"])}</strong></a><br />{html.escape(g["desc"])}</li>'
    for g in GUIDES)
corps = f'''    <nav class="fil"><a href="/">Accueil</a> › Guides</nav>
    <h1>Guides pour réviser efficacement</h1>
    <p class="resume">Des méthodes de révision simples et éprouvées — se tester, espacer les révisions, travailler par sessions courtes — et la façon de les appliquer avec l'IA.</p>
    <ul>
{liste}
    </ul>
    <p>Ces guides sont écrits par Kelvyn Laine, créateur d'<a href="/">Abyssia</a>, l'application gratuite pour réviser avec l'IA. <a href="/a-propos.html">En savoir plus sur Abyssia</a>.</p>
    <p><a class="cta" href="{APP_STORE}" rel="noopener">Télécharger Abyssia gratuitement sur l'App Store</a></p>'''
jsonld = {'@context': 'https://schema.org', '@type': 'CollectionPage', 'name': 'Guides pour réviser efficacement',
          'url': 'https://abyssia.eu/guides/', 'inLanguage': 'fr', 'publisher': {'@id': 'https://abyssia.eu/#editeur'},
          'hasPart': [{'@type': 'Article', 'headline': g['titre'], 'url': f"https://abyssia.eu/guides/{g['slug']}.html"} for g in GUIDES]}
(SORTIE / 'index.html').write_text(page("Guides pour réviser efficacement avec l'IA — Abyssia",
    "Méthodes de révision éprouvées expliquées simplement : réviser avec l'IA, méthode Pomodoro, flashcards et répétition espacée.",
    'https://abyssia.eu/guides/', jsonld, corps))
print('index ok')
