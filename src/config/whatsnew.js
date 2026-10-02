// Section « Nouveautés ». Chaque élément porte la version qui l'apporte :
// - 4.1.1 : publiée sur l'App Store ;
// - 4.1.2 : envoyée à Apple le 30 septembre 2026 ;
// - next  : développé, dans la prochaine version (pas encore sur les stores).
// Quand une version sort, changer son tag ici plutôt que le texte.

export const WHATS_NEW_ITEMS = [
  { key: 'share', tag: '4.1.2', icon: 'share', accent: 'pink' },
  { key: 'selection', tag: '4.1.2', icon: 'selection', accent: 'violet' },
  { key: 'reminders', tag: '4.1.2', icon: 'bell', accent: 'emerald' },
  { key: 'forum', tag: '4.1.2', icon: 'forum', accent: 'sky' },
  { key: 'math', tag: 'next', icon: 'math', accent: 'cyan' },
  { key: 'login', tag: '4.1.1', icon: 'login', accent: 'orange' },
];

export const PREMIUM_ICONS = ['purple', 'cyan', 'pink', 'green', 'orange', 'amoled'];

export const WHATS_NEW = {
  fr: {
    microBadge: 'Nouveautés',
    title: 'Quoi de neuf dans Abyssia',
    subtitle: 'Les dernières améliorations de l’application, avec la version qui les apporte.',
    tags: { '4.1.1': 'Version 4.1.1', '4.1.2': 'Version 4.1.2', next: 'Prochaine version' },
    logo: {
      title: 'Nouveau logo, et Halloween s’invite tout seul',
      desc: 'Un logo plus grand et sans texte : le cerveau néon des abysses. Du 24 octobre au 2 novembre, Abyssia passe d’elle-même en mode Halloween : thème citrouille, chauves-souris, logo et icône de saison. Tout redevient normal ensuite, et l’ambiance se coupe dans les réglages.',
      normal: 'Toute l’année',
      halloween: 'Du 24 oct. au 2 nov.',
    },
    icons: {
      title: 'Des icônes premium qui changent vraiment',
      desc: 'Six couleurs (Violet, Cyan, Rose, Vert, Orange, AMOLED) qui remplacent l’icône sur l’écran d’accueil de l’iPhone et d’Android, et dans le Dock sur Mac. Le logo affiché dans l’application suit votre choix.',
      names: { purple: 'Violet', cyan: 'Cyan', pink: 'Rose', green: 'Vert', orange: 'Orange', amoled: 'AMOLED' },
    },
    items: {
      share: { title: 'Partagez vos réussites', desc: 'QCM réussi, fiches terminées, série d’habitudes, badge : créez une carte en story ou en publication pour Instagram, Snapchat ou WhatsApp, avec vos vrais chiffres.' },
      selection: { title: 'Copier une réponse d’un geste', desc: 'La sélection traverse toute la réponse de l’IA, et le texte copié garde ses puces et ses retours à la ligne.' },
      reminders: { title: 'Rappels appliqués aussitôt', desc: 'Les rappels automatiques se mettent à jour immédiatement quand vous changez vos réglages, sans écran figé.' },
      forum: { title: 'Le forum vous prévient', desc: 'Les nouveaux messages du forum s’affichent en bannière pendant que vous utilisez l’app, avec un rattrapage à votre retour.' },
      math: { title: 'Les calculs en entier', desc: 'Une longue suite de calculs ne sort plus de la bulle du chat : glissez-la pour la lire jusqu’au bout.' },
      login: { title: 'Connexion plus fiable', desc: 'Si le service est momentanément indisponible, l’app l’explique clairement au lieu d’afficher une erreur technique.' },
    },
  },
  en: {
    microBadge: 'What’s new',
    title: 'What’s new in Abyssia',
    subtitle: 'The latest improvements to the app, with the version that brings each one.',
    tags: { '4.1.1': 'Version 4.1.1', '4.1.2': 'Version 4.1.2', next: 'Next version' },
    logo: {
      title: 'A new logo, and Halloween shows up on its own',
      desc: 'A bigger logo with no text: the neon brain from the abyss. From 24 October to 2 November, Abyssia switches to Halloween mode by itself: pumpkin theme, bats, seasonal logo and icon. Everything goes back to normal afterwards, and you can turn the theme off in settings.',
      normal: 'All year round',
      halloween: '24 Oct. – 2 Nov.',
    },
    icons: {
      title: 'Premium icons that really change',
      desc: 'Six colours (Purple, Cyan, Pink, Green, Orange, AMOLED) that replace the icon on the iPhone and Android home screen, and in the Dock on Mac. The logo inside the app follows your choice.',
      names: { purple: 'Purple', cyan: 'Cyan', pink: 'Pink', green: 'Green', orange: 'Orange', amoled: 'AMOLED' },
    },
    items: {
      share: { title: 'Share your achievements', desc: 'Quiz passed, flashcards finished, habit streak, badge: create a story or post card for Instagram, Snapchat or WhatsApp, with your real numbers.' },
      selection: { title: 'Copy an answer in one gesture', desc: 'Selection now spans the whole AI answer, and the copied text keeps its bullets and line breaks.' },
      reminders: { title: 'Reminders applied instantly', desc: 'Automatic reminders update as soon as you change your settings, with no frozen screen.' },
      forum: { title: 'The forum lets you know', desc: 'New forum messages show up as a banner while you use the app, and you catch up on the rest when you come back.' },
      math: { title: 'Calculations in full', desc: 'A long chain of calculations no longer spills out of the chat bubble: swipe it to read it to the end.' },
      login: { title: 'More reliable sign-in', desc: 'When the service is briefly unavailable, the app says so clearly instead of showing a technical error.' },
    },
  },
  es: {
    microBadge: 'Novedades',
    title: 'Novedades de Abyssia',
    subtitle: 'Las últimas mejoras de la app, con la versión que trae cada una.',
    tags: { '4.1.1': 'Versión 4.1.1', '4.1.2': 'Versión 4.1.2', next: 'Próxima versión' },
    logo: {
      title: 'Nuevo logo, y Halloween llega solo',
      desc: 'Un logo más grande y sin texto: el cerebro de neón del abismo. Del 24 de octubre al 2 de noviembre, Abyssia se pone sola en modo Halloween: tema calabaza, murciélagos, logo e icono de temporada. Después todo vuelve a la normalidad, y el tema se desactiva en los ajustes.',
      normal: 'Todo el año',
      halloween: 'Del 24 oct. al 2 nov.',
    },
    icons: {
      title: 'Iconos premium que cambian de verdad',
      desc: 'Seis colores (Violeta, Cian, Rosa, Verde, Naranja, AMOLED) que sustituyen el icono en la pantalla de inicio del iPhone y de Android, y en el Dock del Mac. El logo dentro de la app sigue tu elección.',
      names: { purple: 'Violeta', cyan: 'Cian', pink: 'Rosa', green: 'Verde', orange: 'Naranja', amoled: 'AMOLED' },
    },
    items: {
      share: { title: 'Comparte tus logros', desc: 'Test aprobado, tarjetas terminadas, racha de hábitos, insignia: crea una tarjeta en formato story o publicación para Instagram, Snapchat o WhatsApp, con tus cifras reales.' },
      selection: { title: 'Copia una respuesta de un gesto', desc: 'La selección abarca toda la respuesta de la IA, y el texto copiado conserva sus viñetas y saltos de línea.' },
      reminders: { title: 'Recordatorios al instante', desc: 'Los recordatorios automáticos se actualizan en cuanto cambias tus ajustes, sin pantalla congelada.' },
      forum: { title: 'El foro te avisa', desc: 'Los mensajes nuevos del foro aparecen como banner mientras usas la app, y te pones al día al volver.' },
      math: { title: 'Los cálculos completos', desc: 'Una larga serie de cálculos ya no se sale de la burbuja del chat: deslízala para leerla hasta el final.' },
      login: { title: 'Inicio de sesión más fiable', desc: 'Si el servicio no está disponible un momento, la app lo explica claramente en lugar de mostrar un error técnico.' },
    },
  },
  zh: {
    microBadge: '新功能',
    title: 'Abyssia 有哪些新变化',
    subtitle: '应用的最新改进，并标注了带来每项改进的版本。',
    tags: { '4.1.1': '4.1.1 版', '4.1.2': '4.1.2 版', next: '下一版本' },
    logo: {
      title: '全新标志，万圣节自动登场',
      desc: '更大、不含文字的标志：来自深渊的霓虹大脑。每年 10 月 24 日至 11 月 2 日，Abyssia 会自动切换到万圣节模式：南瓜主题、蝙蝠、节日标志和图标。之后一切自动恢复，也可以在设置中关闭该主题。',
      normal: '全年',
      halloween: '10 月 24 日 – 11 月 2 日',
    },
    icons: {
      title: '真正生效的高级图标',
      desc: '六种颜色（紫色、青色、粉色、绿色、橙色、AMOLED）可替换 iPhone 和 Android 主屏幕上的图标，以及 Mac 程序坞中的图标。应用内显示的标志也会随之改变。',
      names: { purple: '紫色', cyan: '青色', pink: '粉色', green: '绿色', orange: '橙色', amoled: 'AMOLED' },
    },
    items: {
      share: { title: '分享你的成就', desc: '测验通过、卡片学完、习惯连续打卡、获得徽章：为 Instagram、Snapchat 或 WhatsApp 生成快拍或帖子卡片，数据真实。' },
      selection: { title: '一次选中整条回答', desc: '选择可以覆盖 AI 的整条回答，复制的文字保留项目符号和换行。' },
      reminders: { title: '提醒即时生效', desc: '修改设置后，自动提醒会立即更新，界面不再卡住。' },
      forum: { title: '论坛新消息提醒', desc: '使用应用时，论坛新消息会以横幅显示；回到应用时会补上错过的消息。' },
      math: { title: '完整显示计算过程', desc: '很长的计算过程不再超出聊天气泡：左右滑动即可看完。' },
      login: { title: '登录更可靠', desc: '服务暂时不可用时，应用会清楚说明，而不是显示技术错误。' },
    },
  },
  it: {
    microBadge: 'Novità',
    title: 'Le novità di Abyssia',
    subtitle: 'Gli ultimi miglioramenti dell’app, con la versione che porta ciascuno.',
    tags: { '4.1.1': 'Versione 4.1.1', '4.1.2': 'Versione 4.1.2', next: 'Prossima versione' },
    logo: {
      title: 'Nuovo logo, e Halloween arriva da solo',
      desc: 'Un logo più grande e senza testo: il cervello al neon degli abissi. Dal 24 ottobre al 2 novembre, Abyssia passa da sola in modalità Halloween: tema zucca, pipistrelli, logo e icona di stagione. Poi tutto torna normale, e il tema si disattiva nelle impostazioni.',
      normal: 'Tutto l’anno',
      halloween: 'Dal 24 ott. al 2 nov.',
    },
    icons: {
      title: 'Icone premium che cambiano davvero',
      desc: 'Sei colori (Viola, Ciano, Rosa, Verde, Arancione, AMOLED) che sostituiscono l’icona nella schermata Home di iPhone e Android, e nel Dock del Mac. Il logo dentro l’app segue la tua scelta.',
      names: { purple: 'Viola', cyan: 'Ciano', pink: 'Rosa', green: 'Verde', orange: 'Arancione', amoled: 'AMOLED' },
    },
    items: {
      share: { title: 'Condividi i tuoi successi', desc: 'Quiz superato, flashcard completate, serie di abitudini, badge: crea una card in formato storia o post per Instagram, Snapchat o WhatsApp, con i tuoi numeri reali.' },
      selection: { title: 'Copia una risposta con un gesto', desc: 'La selezione copre l’intera risposta dell’IA, e il testo copiato mantiene elenchi puntati e a capo.' },
      reminders: { title: 'Promemoria applicati subito', desc: 'I promemoria automatici si aggiornano appena cambi le impostazioni, senza schermate bloccate.' },
      forum: { title: 'Il forum ti avvisa', desc: 'I nuovi messaggi del forum compaiono in un banner mentre usi l’app, e recuperi il resto al tuo ritorno.' },
      math: { title: 'I calcoli per intero', desc: 'Una lunga serie di calcoli non esce più dalla bolla della chat: scorrila per leggerla fino in fondo.' },
      login: { title: 'Accesso più affidabile', desc: 'Se il servizio è momentaneamente non disponibile, l’app lo spiega chiaramente invece di mostrare un errore tecnico.' },
    },
  },
  ru: {
    microBadge: 'Что нового',
    title: 'Что нового в Abyssia',
    subtitle: 'Последние улучшения приложения и версия, в которой появилось каждое из них.',
    tags: { '4.1.1': 'Версия 4.1.1', '4.1.2': 'Версия 4.1.2', next: 'Следующая версия' },
    logo: {
      title: 'Новый логотип, а Хэллоуин приходит сам',
      desc: 'Логотип крупнее и без текста: неоновый мозг из бездны. С 24 октября по 2 ноября Abyssia сама переходит в режим Хэллоуина: тыквенная тема, летучие мыши, сезонные логотип и значок. Потом всё возвращается как было, а тему можно отключить в настройках.',
      normal: 'Круглый год',
      halloween: '24 окт. – 2 нояб.',
    },
    icons: {
      title: 'Премиум-значки, которые действительно меняются',
      desc: 'Шесть цветов (фиолетовый, голубой, розовый, зелёный, оранжевый, AMOLED) заменяют значок на главном экране iPhone и Android и в Dock на Mac. Логотип внутри приложения меняется вместе с выбором.',
      names: { purple: 'Фиолетовый', cyan: 'Голубой', pink: 'Розовый', green: 'Зелёный', orange: 'Оранжевый', amoled: 'AMOLED' },
    },
    items: {
      share: { title: 'Делитесь успехами', desc: 'Тест пройден, карточки изучены, серия привычек, значок: создайте карточку для сторис или поста в Instagram, Snapchat или WhatsApp с вашими реальными цифрами.' },
      selection: { title: 'Копирование ответа одним жестом', desc: 'Выделение охватывает весь ответ ИИ, а скопированный текст сохраняет списки и переносы строк.' },
      reminders: { title: 'Напоминания применяются сразу', desc: 'Автоматические напоминания обновляются, как только вы меняете настройки, без зависшего экрана.' },
      forum: { title: 'Форум сообщает о новом', desc: 'Новые сообщения форума показываются баннером, пока вы пользуетесь приложением, а пропущенные — при возвращении.' },
      math: { title: 'Вычисления целиком', desc: 'Длинная цепочка вычислений больше не выходит за пузырь чата: прокрутите её, чтобы дочитать до конца.' },
      login: { title: 'Надёжный вход', desc: 'Если сервис временно недоступен, приложение ясно об этом сообщает вместо технической ошибки.' },
    },
  },
  uk: {
    microBadge: 'Що нового',
    title: 'Що нового в Abyssia',
    subtitle: 'Останні покращення застосунку та версія, у якій з’явилося кожне з них.',
    tags: { '4.1.1': 'Версія 4.1.1', '4.1.2': 'Версія 4.1.2', next: 'Наступна версія' },
    logo: {
      title: 'Новий логотип, а Гелловін приходить сам',
      desc: 'Більший логотип без тексту: неоновий мозок із безодні. З 24 жовтня до 2 листопада Abyssia сама переходить у режим Гелловіну: гарбузова тема, кажани, сезонні логотип і значок. Потім усе повертається як було, а тему можна вимкнути в налаштуваннях.',
      normal: 'Цілий рік',
      halloween: '24 жовт. – 2 лист.',
    },
    icons: {
      title: 'Преміум-значки, які справді змінюються',
      desc: 'Шість кольорів (фіолетовий, блакитний, рожевий, зелений, помаранчевий, AMOLED) замінюють значок на головному екрані iPhone і Android та в Dock на Mac. Логотип у застосунку змінюється разом із вибором.',
      names: { purple: 'Фіолетовий', cyan: 'Блакитний', pink: 'Рожевий', green: 'Зелений', orange: 'Помаранчевий', amoled: 'AMOLED' },
    },
    items: {
      share: { title: 'Діліться успіхами', desc: 'Тест складено, картки вивчено, серія звичок, значок: створіть картку для сторіс або допису в Instagram, Snapchat чи WhatsApp зі своїми реальними цифрами.' },
      selection: { title: 'Копіювання відповіді одним жестом', desc: 'Виділення охоплює всю відповідь ШІ, а скопійований текст зберігає списки й переноси рядків.' },
      reminders: { title: 'Нагадування застосовуються одразу', desc: 'Автоматичні нагадування оновлюються щойно ви змінюєте налаштування, без завислого екрана.' },
      forum: { title: 'Форум повідомляє про нове', desc: 'Нові повідомлення форуму з’являються банером, поки ви користуєтеся застосунком, а пропущені — коли повертаєтеся.' },
      math: { title: 'Обчислення повністю', desc: 'Довгий ланцюжок обчислень більше не виходить за бульбашку чату: прогорніть його, щоб дочитати до кінця.' },
      login: { title: 'Надійніший вхід', desc: 'Якщо сервіс тимчасово недоступний, застосунок чітко про це каже замість технічної помилки.' },
    },
  },
};
