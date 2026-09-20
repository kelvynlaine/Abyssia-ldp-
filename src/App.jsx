import React, { useState } from 'react';
import { 
  Sparkles, 
  Flame, 
  Zap, 
  GraduationCap,
  NotebookPen,
  Timer,
  ArrowRight, 
  CheckCircle2, 
  ChevronDown, 
  Smartphone,
  MessageSquare,
  Menu,
  X,
  Mail,
  Phone,
  ExternalLink,
  Shield,
  FileText,
  Globe,
  Check
} from 'lucide-react';

import PomodoroDemo from './components/PomodoroDemo';
import HabitTrackerDemo from './components/HabitTrackerDemo';
import AppScreenCarousel from './components/AppScreenCarousel';
import MockupGallery from './components/MockupGallery';
import KeynoteVideo from './components/KeynoteVideo';
import InteractiveDashboardDemo from './components/InteractiveDashboardDemo';
import { TRANSLATIONS } from './config/translations';
import { APP_STORE_URL, PLAY_STORE_URL, SUPPORT_DISCORD_URL, SUPPORT_EMAIL, SUPPORT_PHONE } from './config/deeplink';

export default function App() {
  const [lang, setLang] = useState('fr');
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);

  const t = TRANSLATIONS[lang] || TRANSLATIONS.fr;

  const faqData = {
    fr: [
      {
        question: "Qu'est-ce qu'Abyssia et comment fonctionne cet assistant IA personnel ?",
        answer: "Abyssia réunit une IA conversationnelle et une suite de plus de 25 outils dans une seule application. Vous pouvez discuter avec un assistant ou un agent spécialisé, lui faire rédiger un cours complet, générer des flashcards et des quiz, prendre des notes, lancer un Pomodoro, suivre vos habitudes et vos objectifs, traduire, planifier un voyage ou lire un PDF — sans quitter l'app."
      },
      {
        question: "Comment utiliser Abyssia efficacement pour améliorer ma productivité ?",
        answer: "Pour maximiser votre productivité, commencez par définir vos objectifs SMART dans l'application. Utilisez notre tracker d'habitudes avec IA pour développer des routines durables et lancez notre chronomètre Pomodoro pour des sessions de travail focalisées. L'analyse de productivité IA identifiera ensuite vos moments les plus performants pour vous suggérer des plannings optimaux."
      },
      {
        question: "Comment développer de bonnes habitudes avec le tracker d'habitudes Abyssia ?",
        answer: "Notre tracker d'habitudes avec IA analyse vos patterns comportementaux et vous propose des recommandations personnalisées IA pour créer des routines durables. L'application détecte également vos obstacles potentiels (ex: fatigue, retards cumulés) et ajuste automatiquement vos objectifs quotidiens pour maximiser vos chances de réussite."
      },
      {
        question: "Abyssia vs autres applications de productivité - Quelle est la différence ?",
        answer: "La différence tient à l'étendue : au lieu d'une app pour le chat IA, une autre pour les révisions, une troisième pour les tâches et une quatrième pour le focus, Abyssia réunit les 25 outils dans une même interface sombre, avec une progression commune (XP, séries, badges) et une synchronisation cloud entre vos appareils."
      },
      {
        question: "Comment arrêter la procrastination avec l'assistant IA d'Abyssia ?",
        answer: "Notre application utilise plusieurs techniques éprouvées amplifiées par l'IA. La technique Pomodoro découpe vos tâches en sessions gérables, la gamification rend le travail engageant, et l'assistant IA personnel vous envoie des encouragements motivants personnalisés. De plus, l'analyse comportementale identifie vos déclencheurs de procrastination pour vous aider à les surmonter."
      },
      {
        question: "Comment installer Abyssia sur iPhone, iPad ou Android ?",
        answer: "Abyssia est téléchargeable gratuitement sur l'App Store pour iPhone et iPad, et disponible sur Google Play pour Android. Cliquez sur n'importe quel bouton « Installer l'application » du site pour accéder aux deux stores, puis choisissez le vôtre. Sur Android, l'application est actuellement proposée via le programme de test officiel de Google Play."
      },
      {
        question: "Quels sont les prérequis système pour cette application IA productivité ?",
        answer: "L'application Abyssia est légère et optimisée pour être économe en batterie. Sur iPhone et iPad, elle nécessite iOS 15.0 ou une version ultérieure (environ 70 Mo d'espace de stockage). Sur Android, elle fonctionne sur tout appareil équipé d'Android 8.0 ou supérieur, avec un minimum de 50 Mo d'espace disponible."
      },
      {
        question: "Mes données sont-elles sécurisées dans cette solution IA pour la productivité ?",
        answer: "Absolument. Vos requêtes et données personnelles sont chiffrées de bout en bout et nous ne revendons aucune information à des tiers. La confidentialité est notre priorité absolue. Toutes les analyses de productivité IA sont effectuées de manière sécurisée et respectueuse de votre vie privée."
      }
    ],
    en: [
      {
        question: "What is Abyssia and how does this personal AI assistant work?",
        answer: "Abyssia combines a conversational AI with a suite of over 25 tools in one app. You can talk to an assistant or a specialized agent, have it write a full course, generate flashcards and quizzes, take notes, start a Pomodoro, track habits and goals, translate, plan a trip or read a PDF — without leaving the app."
      },
      {
        question: "How to use Abyssia effectively to improve my productivity?",
        answer: "To maximize your productivity, start by setting your SMART goals in the application. Use our AI-powered habit tracker to build sustainable routines and launch our Pomodoro timer for focused work sessions. The AI productivity analysis will then identify your peak performance moments to suggest optimal schedules."
      },
      {
        question: "How to develop good habits with the Abyssia habit tracker?",
        answer: "Our AI-powered habit tracker analyzes your behavioral patterns and provides personalized AI recommendations to create sustainable routines. The app also detects your potential obstacles (e.g., fatigue, cumulative delays) and automatically adjusts your daily goals to maximize your chances of success."
      },
      {
        question: "Abyssia vs other productivity apps - What is the difference?",
        answer: "The difference is scope: instead of one app for AI chat, another for revision, a third for tasks and a fourth for focus, Abyssia brings all 25 tools into the same dark interface, with shared progress (XP, streaks, badges) and cloud sync across your devices."
      },
      {
        question: "How to stop procrastinating with the Abyssia assistant?",
        answer: "Our app uses several proven techniques amplified by AI. The Pomodoro technique cuts your tasks into manageable sessions, gamification makes work engaging, and the personal AI assistant sends you customized motivational encouragement. Additionally, behavioral analysis identifies your procrastination triggers to help you overcome them."
      },
      {
        question: "How to install Abyssia on iPhone, iPad or Android?",
        answer: "Abyssia is free to download on the App Store for iPhone and iPad, and available on Google Play for Android. Click any 'Install App' button on our site to reach both stores, then pick yours. On Android, the app is currently offered through Google Play's official testing program."
      },
      {
        question: "What are the system requirements for this productivity AI app?",
        answer: "The Abyssia app is lightweight and optimized to be battery-efficient. On iPhone and iPad, it requires iOS 15.0 or later (about 70 MB of storage). On Android, it runs on any device with Android 8.0 or higher and at least 50 MB of available storage."
      },
      {
        question: "Is my data secure in this productivity AI solution?",
        answer: "Absolutely. Your queries and personal data are end-to-end encrypted and we do not sell any information to third parties. Privacy is our top priority. All AI productivity analyses are performed securely and with respect for your privacy."
      }
    ],
    es: [
      {
        question: "¿Qué es Abyssia y cómo funciona este asistente personal de IA?",
        answer: "Abyssia reúne una IA conversacional y un conjunto de más de 25 herramientas en una sola aplicación. Puedes hablar con un asistente o un agente especializado, pedirle un curso completo, generar flashcards y test, tomar notas, lanzar un Pomodoro, seguir tus hábitos y objetivos, traducir, planificar un viaje o leer un PDF sin salir de la app."
      },
      {
        question: "¿Cómo usar Abyssia de manera efectiva para mejorar mi productividad?",
        answer: "Para maximizar su productividad, comience por definir sus objetivos SMART en la aplicación. Utilice nuestro rastreador de hábitos con IA para desarrollar rutinas sostenibles y active nuestro temporizador Pomodoro para sesiones de trabajo enfocadas. El análisis de productividad de IA identificará sus momentos de mayor rendimiento para sugerir horarios óptimos."
      },
      {
        question: "¿Cómo desarrollar buenos hábitos con el rastreador de hábitos de Abyssia?",
        answer: "Nuestro rastreador de hábitos con IA analiza sus patrones de comportamiento y ofrece recomendaciones personalizadas de IA para crear rutinas sostenibles. La aplicación también detecta sus obstáculos potenciales (por ejemplo, fatiga, retrasos acumulados) y ajusta automáticamente sus objetivos diarios para maximizar sus posibilidades de éxito."
      },
      {
        question: "Abyssia vs otras aplicaciones de productividad - ¿Cuál es la diferencia?",
        answer: "La diferencia está en el alcance: en lugar de una app para el chat con IA, otra para repasar, una tercera para las tareas y una cuarta para concentrarte, Abyssia reúne las 25 herramientas en la misma interfaz oscura, con un progreso común (XP, rachas, medallas) y sincronización en la nube entre tus dispositivos."
      },
      {
        question: "¿Cómo dejar de procrastinar con el asistente de Abyssia?",
        answer: "Nuestra aplicación utiliza varias técnicas probadas amplificadas por IA. La técnica Pomodoro divide sus tareas en sesiones manejables, la gamificación hace que el trabajo sea atractivo y el asistente de IA personal le envía mensajes motivacionales personalizados. Además, el análisis de comportamiento identifica sus desencadenantes de procrastinación para ayudarle a deponerlos."
      },
      {
        question: "¿Cómo instalar Abyssia en iPhone, iPad o Android?",
        answer: "Abyssia se puede descargar gratis en la App Store para iPhone y iPad, y está disponible en Google Play para Android. Haga clic en cualquier botón 'Instalar App' de nuestro sitio para acceder a las dos tiendas y elija la suya. En Android, la aplicación se ofrece actualmente a través del programa oficial de pruebas de Google Play."
      },
      {
        question: "¿Cuáles son los requisitos del sistema para esta aplicación de IA de productividad?",
        answer: "La aplicación Abyssia es ligera y está optimizada para consumir poca batería. En iPhone y iPad requiere iOS 15.0 o posterior (unos 70 MB de almacenamiento). En Android funciona en cualquier dispositivo con Android 8.0 o superior y un mínimo de 50 MB de espacio disponible."
      },
      {
        question: "¿Están seguros mis datos en esta solución de IA de productividad?",
        answer: "Absolutamente. Sus consultas y datos personales están cifrados de extremo a extremo y no vendemos ninguna información a terceros. La privacidad es nuestra máxima prioridad. Todos los análisis de productividad de IA se realizan de forma segura y respetando su privacidad."
      }
    ],
    zh: [
      {
        question: "什么是 Abyssia？这个个人人工智能助手是如何工作的？",
        answer: "Abyssia 将对话式 AI 与 25 款以上工具集成在一个应用中。你可以与助手或专业代理对话，让它撰写完整课程、生成闪卡和测验、记笔记、启动番茄钟、跟踪习惯与目标、翻译、规划旅行或阅读 PDF，全程无需离开应用。"
      },
      {
        question: "如何有效利用 Abyssia 提高我的工作效率？",
        answer: "为了最大化您的效率，首先在应用程序中设定您的 SMART 目标。利用我们的 AI 习惯跟踪器建立可持续的日常习惯，并启动番茄工作钟进行专注工作。随后，人工智能效率分析将识别您的最佳表现时刻，为您建议最合理的日程安排。"
      },
      {
        question: "如何利用 Abyssia 习惯跟踪器培养良好的习惯？",
        answer: "我们的 AI 习惯跟踪器会分析您的行为模式，并提供个性化的 AI 建议，以帮助您建立可持续的日常习惯。该应用还能检测您的潜在障碍（例如疲劳、累计延迟），并自动调整您的每日目标，以最大程度地提高成功几率。"
      },
      {
        question: "Abyssia 与其他效率应用相比有什么区别？",
        answer: "区别在于覆盖面：无需一个应用用于 AI 聊天、另一个用于复习、第三个用于任务、第四个用于专注，Abyssia 把这 25 款工具放进同一个深色界面，共享同一套进度体系（经验值、连续记录、徽章），并在设备间云端同步。"
      },
      {
        question: "如何使用 Abyssia 助手来停止拖延？",
        answer: "我们的应用采用了多种经 AI 强化的行之有效的技术。番茄钟技术将您的任务拆分为可管理的会话，游戏化使工作更具吸引力，个人人工智能助手还会向您发送定制的激励语言。此外，行为分析还可以识别您的拖延诱因，帮助您克服它们。"
      },
      {
        question: "如何在 iPhone、iPad 或安卓设备上安装 Abyssia？",
        answer: "Abyssia 可在 App Store 免费下载，支持 iPhone 和 iPad；安卓用户可通过 Google Play 获取。点击我们网站上任意“安装应用”按钮即可看到两个商店，选择适合您的即可。目前，安卓版本通过 Google Play 官方测试计划提供。"
      },
      {
        question: "此效率 AI 应用的系统要求是什么？",
        answer: "Abyssia 应用非常轻量，并经过优化，十分省电。在 iPhone 和 iPad 上，需要 iOS 15.0 或更高版本（约 70 MB 存储空间）。在安卓设备上，需运行 Android 8.0 或更高版本，并至少有 50 MB 可用存储空间。"
      },
      {
        question: "在此效率 AI 解决方案中，我的数据安全吗？",
        answer: "绝对安全。您的查询和个人数据均采用端到端加密，我们不会向第三方出售任何信息。隐私是我们的重中之重。所有 AI 效率分析均在安全且尊重您隐私的前提下进行。"
      }
    ],
    it: [
      {
        question: "Cos'è Abyssia e come funziona questo assistente personale IA?",
        answer: "Abyssia unisce un'IA conversazionale e una raccolta di oltre 25 strumenti in una sola applicazione. Puoi parlare con un assistente o un agente specializzato, farti scrivere un corso completo, generare flashcard e quiz, prendere appunti, avviare un Pomodoro, monitorare abitudini e obiettivi, tradurre, pianificare un viaggio o leggere un PDF senza uscire dall'app."
      },
      {
        question: "Come utilizzare Abyssia in modo efficace per migliorare la mia produttività?",
        answer: "Per massimizzare la tua produttività, inizia impostando i tuoi obiettivi SMART nell'applicazione. Usa il nostro tracker di abitudini basato sull'IA per sviluppare routine sostenibili e avvia il timer Pomodoro per sessioni di lavoro focalizzate. L'analisi della produttività dell'IA identificherà quindi i tuoi momenti di massimo rendimento per suggerirti programmi ottimali."
      },
      {
        question: "Come sviluppare buone abitudini con il tracker di abitudini Abyssia?",
        answer: "Il nostro tracker di abitudini basato sull'IA analizza i tuoi schemi comportamentali e fornisce raccomandazioni IA personalizzate per creare routine sostenibili. L'app rileva anche i tuoi potenziali ostacoli (es. fatica, ritardi accumulati) e regola automaticamente i tuoi obiettivi quotidiani per massimizzare le tue possibilità di successo."
      },
      {
        question: "Abyssia rispetto ad altre app di produttività: qual è la differenza?",
        answer: "La differenza sta nell'ampiezza: invece di un'app per la chat IA, un'altra per il ripasso, una terza per le attività e una quarta per la concentrazione, Abyssia riunisce i 25 strumenti nella stessa interfaccia scura, con progressi condivisi (XP, serie, badge) e sincronizzazione cloud tra i dispositivi."
      },
      {
        question: "Come smettere di procrastinare con l'assistente di Abyssia?",
        answer: "La nostra applicazione utilizza diverse tecniche collaudate amplificate dall'IA. La tecnica Pomodoro suddivide i tuoi compiti in sessioni gestibili, la gamification rende il lavoro stimolante e l'assistente IA personale ti invia incoraggiamenti motivazionali personalizzati. Inoltre, l'analisi comportamentale identifica i fattori scatenanti della tua procrastinazione per aiutarti a superarli."
      },
      {
        question: "Come installare Abyssia su iPhone, iPad o Android?",
        answer: "Abyssia si scarica gratuitamente dall'App Store per iPhone e iPad ed è disponibile su Google Play per Android. Clicca su qualsiasi pulsante 'Installa App' del nostro sito per raggiungere i due store, poi scegli il tuo. Su Android, l'app è attualmente offerta tramite il programma di test ufficiale di Google Play."
      },
      {
        question: "Quali sono i requisiti di sistema per questa app di produttività IA?",
        answer: "L'applicazione Abyssia è leggera e ottimizzata per consumare pochissima batteria. Su iPhone e iPad richiede iOS 15.0 o versioni successive (circa 70 MB di spazio). Su Android funziona su qualsiasi dispositivo con Android 8.0 o versioni successive e almeno 50 MB di spazio di archiviazione disponibile."
      },
      {
        question: "I miei dati sono al sicuro in questa soluzione IA per la produttività?",
        answer: "Assolutamente sì. Le tue richieste e i tuoi dati personali sono crittografati end-to-end e non vendiamo alcuna informazione a terzi. La privacy è la nostra massima priorità. Tutte le analisi di produttività dell'IA vengono eseguite in modo sicuro e nel rispetto della tua privacy."
      }
    ],
    ru: [
      {
        question: "Что такое Abyssia и как работает этот персональный ИИ-ассистент?",
        answer: "Abyssia объединяет разговорный ИИ и набор из более чем 25 инструментов в одном приложении. Вы можете общаться с ассистентом или специализированным агентом, попросить написать полный курс, создать флеш-карты и тесты, вести заметки, запустить Помодоро, отслеживать привычки и цели, переводить, планировать поездку или читать PDF, не выходя из приложения."
      },
      {
        question: "Как эффективно использовать Abyssia для повышения продуктивности?",
        answer: "Чтобы максимизировать продуктивность, начните с постановки SMART-целей в приложении. Используйте наш ИИ-трекер привычек для выработки устойчивых рутин и запускайте таймер Pomodoro для сфокусированной работы. ИИ-анализ продуктивности определит пики вашей активности и предложит оптимальное расписание."
      },
      {
        question: "Как выработать полезные привычки с помощью трекера привычек Abyssia?",
        answer: "Наш ИИ-трекер привычек анализирует ваше поведение и предлагает персональные рекомендации для создания устойчивых рутин. Приложение также обнаруживает потенциальные препятствия (например, усталость или накопленные задержки) и автоматически корректирует ежедневные цели для достижения успеха."
      },
      {
        question: "Abyssia по сравнению с другими приложениями для продуктивности — в чем разница?",
        answer: "Разница в охвате: вместо одного приложения для ИИ-чата, второго для повторения, третьего для задач и четвёртого для концентрации, Abyssia собирает все 25 инструментов в одном тёмном интерфейсе с общим прогрессом (опыт, серии, значки) и облачной синхронизацией между устройствами."
      },
      {
        question: "Как перестать прокрастинировать с помощью ассистента Abyssia?",
        answer: "Наше приложение использует проверенные техники, усиленные ИИ. Метод Pomodoro разбивает задачи на управляемые сессии, геймификация делает процесс увлекательным, а личный ИИ-ассистент отправляет вам индивидуальные слова поддержки. Кроме того, поведенческий анализ выявляет триггеры прокрастинации, помогая вам справиться с ними."
      },
      {
        question: "Как установить Abyssia на iPhone, iPad или Android?",
        answer: "Abyssia можно бесплатно скачать в App Store для iPhone и iPad, а для Android приложение доступно в Google Play. Нажмите любую кнопку «Установить» на нашем сайте, чтобы перейти к обоим магазинам, и выберите свой. На Android приложение сейчас распространяется через официальную программу тестирования Google Play."
      },
      {
        question: "Каковы системные требования для этого ИИ-приложения продуктивности?",
        answer: "Приложение Abyssia лёгкое и оптимизировано для экономии заряда батареи. На iPhone и iPad требуется iOS 15.0 или новее (около 70 МБ свободного места). На Android оно работает на любом устройстве с Android 8.0 или выше при наличии не менее 50 МБ свободного места."
      },
      {
        question: "Безопасны ли мои данные в этом ИИ-решении для продуктивности?",
        answer: "Абсолютно. Ваши запросы и личные данные шифруются сквозным методом, и мы не продаем информацию третьим лицам. Конфиденциальность — наш главный приоритет. Все анализы продуктивности выполняются безопасно и с уважением к вашей частной жизни."
      }
    ],
    uk: [
      {
        question: "Що таке Abyssia і як працює цей персональний ШІ-асистент?",
        answer: "Abyssia поєднує розмовний ШІ та набір із понад 25 інструментів в одному застосунку. Ви можете спілкуватися з асистентом або спеціалізованим агентом, попросити написати повний курс, створити флеш-картки й тести, вести нотатки, запустити Помодоро, відстежувати звички та цілі, перекладати, планувати подорож або читати PDF, не виходячи із застосунку."
      },
      {
        question: "Як ефективно використовувати Abyssia для покращення продуктивності?",
        answer: "Щоб максимізувати продуктивність, почніть із встановлення SMART-цілей у додатку. Використовуйте наш ШІ-трекер звичок для формування стійких рутин та запускайте таймер Pomodoro для сфокусованої роботи. ШІ-аналіз продуктивності визначить піки вашої активності та запропонує оптимальний розклад."
      },
      {
        question: "Як розвинути корисні звички за допомогою трекера звичок Abyssia?",
        answer: "Наш ШІ-трекер звичок аналізує вашу поведінку та надає персоналізовані рекомендації для створення стійких рутин. Додаток також виявляє потенційні перешкоди (наприклад, втому чи накопичені затримки) і автоматично коригує щоденні цілі для досягнення успіху."
      },
      {
        question: "Abyssia порівняно з іншими додатками для продуктивності — в чому різниця?",
        answer: "Різниця в охопленні: замість одного застосунку для ШІ-чату, другого для повторення, третього для завдань і четвертого для концентрації, Abyssia збирає всі 25 інструментів в одному темному інтерфейсі зі спільним прогресом (досвід, серії, значки) та хмарною синхронізацією між пристроями."
      },
      {
        question: "Як перестати прокрастинувати за допомогою асистента Abyssia?",
        answer: "Наш додаток використовує перевірені техніки, підсилені ШІ. Метод Pomodoro розбиває завдання на керовані сесії, гейміфікація робить процес захопливим, а особистісний ШІ-асистент надсилає вам індивідуальні слова підтримки. Крім того, поведінковий аналіз виявляє тригери прокрастинації, допомагаючи вам впоратися з ними."
      },
      {
        question: "Як встановити Abyssia на iPhone, iPad або Android?",
        answer: "Abyssia можна безкоштовно завантажити в App Store для iPhone та iPad, а для Android додаток доступний у Google Play. Натисніть будь-яку кнопку «Встановити» на нашому сайті, щоб перейти до обох магазинів, і оберіть свій. На Android додаток наразі поширюється через офіційну програму тестування Google Play."
      },
      {
        question: "Які системні вимоги для цього ШІ-додатка продуктивності?",
        answer: "Додаток Abyssia легкий та оптимізований для економії заряду батареї. На iPhone та iPad потрібна iOS 15.0 або новіша (близько 70 МБ вільного місця). На Android він працює на будь-якому пристрої з Android 8.0 або вище за наявності не менше 50 МБ вільного місця."
      },
      {
        question: "Чи безпечні мої дані в цьому ШІ-рішенні для продуктивності?",
        answer: "Абсолютно. Ваші запити та особисті дані шифруються наскрізним методом, і ми не продаємо інформацію третім особам. Конфіденційність — наш головний пріоритет. Усі аналізи продуктивності виконуються безпечно та з повагою до вашого приватного життя."
      }
    ]
  };



  const currentFaqData = faqData[lang] || faqData.fr;

  return (
    <div className="gradient-bg min-h-screen text-slate-100 flex flex-col font-sans select-none w-full overflow-x-hidden">
      
      {/* 1. Header / Navigation */}
      <header className="fixed top-0 inset-x-0 h-16 glass-nav z-40 transition-all duration-300">
        <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 flex items-center justify-between">
          
          {/* Logo brand */}
          <a href="#" className="flex items-center gap-2.5 group">
            <img 
              src="/logo.png" 
              alt="Abyssia Logo" 
              className="size-9 rounded-xl border border-white/20 group-hover:scale-105 transition-all duration-300 animate-glow"
            />
            <span className="text-xl font-black tracking-tight text-white font-heading">
              Abys<span className="text-pink-500">sia</span>
            </span>
          </a>

          {/* Nav links - Desktop */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-semibold text-slate-300 hover:text-white transition-all duration-300">{t.nav.features}</a>
            <a href="#demo" className="text-sm font-semibold text-slate-300 hover:text-white transition-all duration-300">{t.nav.demos}</a>
            <a href="#faq" className="text-sm font-semibold text-slate-300 hover:text-white transition-all duration-300">{t.nav.faq}</a>
            <a href="#contact" className="text-sm font-semibold text-slate-300 hover:text-white transition-all duration-300">{t.nav.contact}</a>
          </nav>

          {/* CTA & Language selector - Desktop */}
          <div className="hidden md:flex items-center gap-4">
            {/* Language Selector Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 hover:border-pink-500/30 text-xs font-bold text-slate-300 hover:text-white transition-all duration-300 focus:outline-none"
              >
                <Globe size={14} className="text-pink-500 animate-pulse" />
                <span>{lang.toUpperCase()}</span>
                <ChevronDown size={12} className={`transition-transform duration-300 ${isLangDropdownOpen ? 'rotate-180 text-pink-400' : ''}`} />
              </button>
              
              {isLangDropdownOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setIsLangDropdownOpen(false)} />
                  <div className="absolute right-0 mt-2 w-36 bg-[#07080d]/95 backdrop-blur-md border border-white/10 rounded-xl p-1.5 shadow-2xl z-50 animate-fade-in flex flex-col gap-1">
                    {[
                      { code: 'fr', label: '🇫🇷 Français' },
                      { code: 'en', label: '🇬🇧 English' },
                      { code: 'es', label: '🇪🇸 Español' },
                      { code: 'zh', label: '🇨🇳 中文' },
                      { code: 'it', label: '🇮🇹 Italiano' },
                      { code: 'ru', label: '🇷🇺 Русский' },
                      { code: 'uk', label: '🇺🇦 Українська' }
                    ].map((item) => (
                      <button
                        key={item.code}
                        onClick={() => {
                          setLang(item.code);
                          setIsLangDropdownOpen(false);
                        }}
                        className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all duration-300 flex items-center justify-between ${
                          lang === item.code 
                            ? 'bg-gradient-to-r from-pink-500/10 to-violet-500/10 text-pink-400 border border-pink-500/20' 
                            : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
                        }`}
                      >
                        <span>{item.label}</span>
                        {lang === item.code && <Check size={12} strokeWidth={3} className="text-pink-500" />}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Install Button -> section de choix du store */}
            <a
              href="#appstore"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white gradient-button shadow-lg shadow-pink-500/10 cursor-pointer"
            >
              <Smartphone size={14} />
              {t.nav.install}
            </a>
          </div>

          {/* Hamburger Menu Toggle - Mobile */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-white transition-all duration-300 focus:outline-none"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-16 bg-[#07080d]/95 backdrop-blur-2xl border-b border-white/10 z-30 py-6 px-4 animate-in fade-in-0 slide-in-from-top-4 duration-300 select-none">
          <nav className="flex flex-col gap-4 text-center">
            <a 
              href="#features" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-sm font-semibold text-slate-300 hover:text-white py-2 border-b border-white/5"
            >
              {t.nav.features}
            </a>
            <a 
              href="#demo" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-sm font-semibold text-slate-300 hover:text-white py-2 border-b border-white/5"
            >
              {t.nav.demos}
            </a>
            <a 
              href="#faq" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-sm font-semibold text-slate-300 hover:text-white py-2 border-b border-white/5"
            >
              {t.nav.faq}
            </a>
            <a 
              href="#contact" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-sm font-semibold text-slate-300 hover:text-white py-2 border-b border-white/5"
            >
              {t.nav.contact}
            </a>

            {/* Language Toggle Selector - Mobile */}
            <div className="flex flex-wrap justify-center gap-2 py-3 border-b border-white/5">
              {[
                { code: 'fr', label: '🇫🇷 FR' },
                { code: 'en', label: '🇬🇧 EN' },
                { code: 'es', label: '🇪🇸 ES' },
                { code: 'zh', label: '🇨🇳 中文' },
                { code: 'it', label: '🇮🇹 IT' },
                { code: 'ru', label: '🇷🇺 RU' },
                { code: 'uk', label: '🇺🇦 UK' }
              ].map((item) => (
                <button
                  key={item.code}
                  onClick={() => {
                    setLang(item.code);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all duration-300 ${
                    lang === item.code 
                      ? 'bg-gradient-to-r from-pink-500/10 to-violet-500/10 text-pink-400 border-pink-500/20 shadow-md' 
                      : 'bg-black/20 border-white/5 text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <a
              href="#appstore"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold text-white gradient-button mt-2 shadow-lg"
            >
              <Smartphone size={16} />
              {t.nav.install}
            </a>
          </nav>
        </div>
      )}

      {/* Main content body */}
      <main className="flex-1 pt-24 sm:pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-24 sm:space-y-32">
          
          {/* 2. Hero Section */}
          <section className="relative grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Background glowing blobs */}
            <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 size-72 rounded-full bg-violet-600/10 blur-[100px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 size-72 rounded-full bg-pink-500/10 blur-[100px] pointer-events-none" />

            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-center lg:text-left">
              
              {/* Premium micro badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-slate-300 animate-fade-in">
                <span className="flex size-2 rounded-full bg-pink-500 animate-ping" />
                {t.hero.microBadge}
              </div>

              {/* Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight sm:leading-none tracking-tight text-white">
                {t.hero.headline} <br />
                <span className="gradient-text">Abyssia</span>
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg text-slate-400 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
                {t.hero.subtitle}
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <a
                  href="#appstore"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-bold text-white gradient-button shadow-xl shadow-pink-500/15 cursor-pointer text-base"
                >
                  <Smartphone size={18} />
                  {t.hero.ctaInstall}
                  <ArrowRight size={16} />
                </a>
                <a 
                  href="#demo" 
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-bold bg-white/5 border border-white/10 hover:bg-white/10 text-slate-300 hover:text-white transition-all duration-300 text-base"
                >
                  {t.hero.ctaDemo}
                </a>
              </div>

              {/* Trust Badge */}
              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-400">
                <div className="flex items-center gap-1.5">
                  <Sparkles size={15} className="text-violet-400" />
                  <span>{t.hero.trustBadge1}</span>
                </div>
                <div className="h-4 w-px bg-white/10 hidden sm:block" />
                <div className="flex items-center gap-1.5">
                  <Smartphone size={16} className="text-emerald-400" />
                  <span>{t.hero.trustBadge2}</span>
                </div>
              </div>

            </div>

            {/* Right Mockup Display */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end w-full">
              <AppScreenCarousel lang={lang} />
            </div>

          </section>

          {/* 2.5 Film de présentation (juste après le héros) */}
          <KeynoteVideo lang={lang} />

          {/* 3. Interactive Demos Segment (Pomodoro & Habits) */}
          <section id="demo" className="space-y-10 sm:space-y-12 scroll-mt-20">
            
            {/* Header section */}
            <div className="text-center max-w-2xl mx-auto space-y-4">
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                {t.demos.sectionTitle}
              </h2>
              <p className="text-sm sm:text-base text-slate-400">
                {t.demos.sectionSubtitle}
              </p>
            </div>

            {/* Side-by-side Demos */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              
              {/* Pomodoro Demo Panel */}
              <div id="pomodoro" className="lg:col-span-5 flex flex-col justify-center">
                <PomodoroDemo lang={lang} />
              </div>

              {/* Habit Tracker Demo Panel */}
              <div id="habits" className="lg:col-span-7 flex flex-col justify-center">
                <HabitTrackerDemo lang={lang} />
              </div>

            </div>

          </section>

          {/* 4. Features Grid */}
          <section id="features" className="space-y-12 scroll-mt-20">
            
            {/* Header */}
            <div className="text-center max-w-2xl mx-auto space-y-4">
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                {t.features.sectionTitle}
              </h2>
              <p className="text-sm sm:text-base text-slate-400">
                {t.features.sectionSubtitle}
              </p>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              
              {/* Feature 1 */}
              <div className="glass-card rounded-2xl p-6 flex flex-col space-y-4">
                <div className="size-11 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400">
                  <MessageSquare size={22} className="animate-pulse" />
                </div>
                <h3 className="text-lg font-bold text-white">{t.features.feat1Title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {t.features.feat1Desc}
                </p>
              </div>

              {/* Feature 2 */}
              <div className="glass-card rounded-2xl p-6 flex flex-col space-y-4">
                <div className="size-11 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400">
                  <GraduationCap size={22} />
                </div>
                <h3 className="text-lg font-bold text-white">{t.features.feat2Title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {t.features.feat2Desc}
                </p>
              </div>

              {/* Feature 3 */}
              <div className="glass-card rounded-2xl p-6 flex flex-col space-y-4">
                <div className="size-11 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                  <Zap size={22} />
                </div>
                <h3 className="text-lg font-bold text-white">{t.features.feat3Title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {t.features.feat3Desc}
                </p>
              </div>

              {/* Feature 4 */}
              <div className="glass-card rounded-2xl p-6 flex flex-col space-y-4">
                <div className="size-11 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <NotebookPen size={22} />
                </div>
                <h3 className="text-lg font-bold text-white">{t.features.feat4Title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {t.features.feat4Desc}
                </p>
              </div>

              {/* Feature 5 */}
              <div className="glass-card rounded-2xl p-6 flex flex-col space-y-4">
                <div className="size-11 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400">
                  <Timer size={22} />
                </div>
                <h3 className="text-lg font-bold text-white">{t.features.feat5Title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {t.features.feat5Desc}
                </p>
              </div>

              {/* Feature 6 */}
              <div className="glass-card rounded-2xl p-6 flex flex-col space-y-4 justify-between border-dashed border-white/20 bg-transparent hover:border-pink-500/30 transition-all duration-300">
                <div className="space-y-4">
                  <div className="size-11 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400">
                    <Sparkles size={22} />
                  </div>
                  <h3 className="text-lg font-bold text-white">{t.features.feat6Title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    {t.features.feat6Desc}
                  </p>
                </div>
                <a
                  href="#appstore"
                  className="w-full mt-4 flex items-center justify-center gap-2 py-3 rounded-xl border border-white/10 hover:border-pink-500/30 text-xs font-bold text-slate-300 hover:text-white transition-all duration-300 bg-white/5"
                >
                  {t.nav.install}
                  <ArrowRight size={14} />
                </a>
              </div>

            </div>

          </section>

          {/* 5. Dashboard Preview Mockups Section */}
          <section className="space-y-12">
            <div className="glass-card rounded-[2.5rem] p-6 sm:p-10 lg:p-12 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-violet-600/10 rounded-full blur-[100px] pointer-events-none" />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                
                {/* Left Columns - Text content */}
                <div className="lg:col-span-5 space-y-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/15 border border-violet-500/20 text-xs font-semibold text-violet-300">
                    {t.dashboard.microBadge}
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight">
                    {t.dashboard.title}
                  </h2>
                  <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
                    {t.dashboard.subtitle}
                  </p>
                  <ul className="space-y-3.5 pt-2">
                    {[
                      t.dashboard.bullet1,
                      t.dashboard.bullet2,
                      t.dashboard.bullet3,
                      t.dashboard.bullet4
                    ].map(item => (
                      <li key={item} className="flex items-center gap-2.5 text-sm text-slate-300">
                        <CheckCircle2 size={16} className="text-pink-500 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Right Columns - Premium Interactive React Dashboard Widget */}
                <div className="lg:col-span-7 flex flex-col items-stretch justify-center w-full">
                  <InteractiveDashboardDemo lang={lang} />
                </div>

              </div>
            </div>
          </section>

          {/* 5.5 Galerie complète des captures de l'application */}
          <MockupGallery lang={lang} />

          {/* 6. Extensive FAQ Section */}
          <section id="faq" className="space-y-12 scroll-mt-20">
            
            {/* Header */}
            <div className="text-center max-w-2xl mx-auto space-y-4">
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                {t.faq.sectionTitle}
              </h2>
              <p className="text-sm sm:text-base text-slate-400">
                {t.faq.sectionSubtitle}
              </p>
            </div>

            {/* Accordion List */}
            <div className="max-w-3xl mx-auto space-y-3.5">
              {currentFaqData.map((faq, index) => {
                const isActive = activeFaq === index;
                return (
                  <div 
                    key={index} 
                    className={`rounded-2xl transition-all duration-300 ${
                      isActive 
                        ? 'bg-white/5 border border-pink-500/20' 
                        : 'bg-white/3 border border-white/5 hover:border-white/10'
                    }`}
                  >
                    <button
                      onClick={() => setActiveFaq(isActive ? null : index)}
                      className="w-full flex items-center justify-between p-5 text-left text-white font-bold text-sm sm:text-base gap-4"
                    >
                      <span>{faq.question}</span>
                      <ChevronDown 
                        size={18} 
                        className={`text-slate-400 transition-transform duration-300 ${isActive ? 'rotate-180 text-pink-400' : ''}`} 
                      />
                    </button>
                    
                    <div 
                      className={`overflow-hidden transition-all duration-300 ${
                        isActive ? 'max-h-[600px] border-t border-white/5' : 'max-h-0'
                      }`}
                    >
                      <p className="p-5 text-xs sm:text-sm text-slate-400 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

          </section>

          {/* 6.5 App Store Section */}
          <section id="appstore" className="relative scroll-mt-20">
            <div className="glass-card rounded-[2.5rem] p-8 sm:p-12 relative overflow-hidden border border-white/10">
              {/* Decorative glow */}
              <div className="absolute -top-10 -left-10 w-72 h-72 bg-sky-500/10 rounded-full blur-[110px] pointer-events-none" />
              <div className="absolute -bottom-10 -right-10 w-72 h-72 bg-violet-600/10 rounded-full blur-[110px] pointer-events-none" />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">

                {/* Left - Text content */}
                <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-slate-200">
                    {/* Apple logo */}
                    <svg viewBox="0 0 384 512" width="12" height="12" fill="currentColor" aria-hidden="true">
                      <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
                    </svg>
                    {/* Google Play logo */}
                    <svg viewBox="0 0 24 24" width="12" height="12" aria-hidden="true">
                      <path fill="#00A0FF" d="M.614 2.454v19.03L10.15 12 .614 2.454z" />
                      <path fill="#00E676" d="M1.337.924a1.86 1.86 0 0 0-.633.483l10.846 10.784 3.16-3.14L1.337.924z" />
                      <path fill="#FFCE00" d="M22.018 13.298l-3.919 2.218-3.515-3.493 3.543-3.521 3.891 2.202c1.302.771 1.302 2.052 0 2.594z" />
                      <path fill="#FF3A44" d="M1.36 23.077l13.373-7.575-3.19-3.17L.72 23.11c.196.19.42.34.64.44z" />
                    </svg>
                    {t.appstore.microBadge}
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight">
                    {t.appstore.title}
                  </h2>
                  <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-xl mx-auto lg:mx-0">
                    {t.appstore.subtitle}
                  </p>

                  {/* Bullets */}
                  <ul className="space-y-3 pt-1 inline-block text-left">
                    {[t.appstore.bullet1, t.appstore.bullet2, t.appstore.bullet3].map(item => (
                      <li key={item} className="flex items-center gap-2.5 text-sm text-slate-300">
                        <CheckCircle2 size={16} className="text-sky-400 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Store badges (App Store + Google Play) */}
                  <div className="pt-4 flex flex-wrap justify-center lg:justify-start gap-3">
                    {/* App Store badge */}
                    <a
                      href={APP_STORE_URL}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={t.appstore.cta}
                      className="group inline-flex items-center gap-3 pl-4 pr-6 py-3 rounded-2xl bg-black border border-white/15 hover:border-white/40 hover:-translate-y-0.5 shadow-xl transition-all duration-300"
                    >
                      <svg viewBox="0 0 384 512" width="26" height="26" fill="currentColor" className="text-white shrink-0" aria-hidden="true">
                        <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
                      </svg>
                      <span className="flex flex-col leading-none text-left">
                        <span className="text-[10px] text-slate-300 font-medium">{t.appstore.badgeTop}</span>
                        <span className="text-lg font-bold text-white -mt-0.5 tracking-tight">App Store</span>
                      </span>
                    </a>

                    {/* Google Play badge */}
                    <a
                      href={PLAY_STORE_URL}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={t.appstore.ctaPlay}
                      className="group inline-flex items-center gap-3 pl-4 pr-6 py-3 rounded-2xl bg-black border border-white/15 hover:border-white/40 hover:-translate-y-0.5 shadow-xl transition-all duration-300"
                    >
                      <svg viewBox="0 0 24 24" width="24" height="24" className="shrink-0" aria-hidden="true">
                        <path fill="#00A0FF" d="M.614 2.454v19.03L10.15 12 .614 2.454z" />
                        <path fill="#00E676" d="M1.337.924a1.86 1.86 0 0 0-.633.483l10.846 10.784 3.16-3.14L1.337.924z" />
                        <path fill="#FFCE00" d="M22.018 13.298l-3.919 2.218-3.515-3.493 3.543-3.521 3.891 2.202c1.302.771 1.302 2.052 0 2.594z" />
                        <path fill="#FF3A44" d="M1.36 23.077l13.373-7.575-3.19-3.17L.72 23.11c.196.19.42.34.64.44z" />
                      </svg>
                      <span className="flex flex-col leading-none text-left">
                        <span className="text-[10px] text-slate-300 font-medium">{t.appstore.badgeTopPlay}</span>
                        <span className="text-lg font-bold text-white -mt-0.5 tracking-tight">Google Play</span>
                      </span>
                    </a>
                  </div>
                </div>

                {/* Right - Visual */}
                <div className="lg:col-span-5 flex justify-center">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-sky-500/20 to-violet-600/20 blur-3xl rounded-full" />
                    <div className="relative size-44 sm:size-52 rounded-[2rem] bg-gradient-to-br from-[#0a0c14] to-[#15101f] border border-white/10 flex items-center justify-center shadow-2xl">
                      <img
                        src="/logo.png"
                        alt="Abyssia"
                        className="size-28 sm:size-32 rounded-[1.5rem] border border-white/10 shadow-lg animate-glow"
                      />
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </section>

          {/* 7. Bottom Installation CTA Section */}
          <section className="relative">
            {/* Glowing background */}
            <div className="absolute inset-0 bg-gradient-to-r from-violet-600/20 to-pink-500/20 blur-[120px] rounded-[2.5rem] pointer-events-none" />

            <div className="glass-card rounded-[2.5rem] p-8 sm:p-12 text-center space-y-6 sm:space-y-8 max-w-4xl mx-auto border border-pink-500/20 relative z-10">
              <div className="inline-flex items-center justify-center size-14 rounded-full bg-pink-500/10 text-pink-400 border border-pink-500/20 animate-glow">
                <Sparkles size={28} />
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
                {lang === 'fr' ? <>Optimisez Votre Temps Dès <span className="gradient-text">Aujourd'hui</span></> : 
                 lang === 'en' ? <>Optimize Your Time <span className="gradient-text">Today</span></> :
                 lang === 'es' ? <>Optimice su tiempo <span className="gradient-text">hoy mismo</span></> :
                 lang === 'zh' ? <>从今天起 <span className="gradient-text">优化您的时间</span></> :
                 lang === 'it' ? <>Ottimizza il tuo tempo <span className="gradient-text">oggi stesso</span></> :
                 lang === 'ru' ? <>Оптимизируйте свое время <span className="gradient-text">уже сегодня</span></> :
                 <>Оптимізуйте свій час <span className="gradient-text">уже сьогодні</span></>}
              </h2>
              <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
                {lang === 'fr' ? "Téléchargez dès maintenant l'application Abyssia et intégrez la puissance de l'intelligence artificielle au service de votre réussite." :
                 lang === 'en' ? "Download the Abyssia app now and integrate the power of artificial intelligence to support your success." :
                 lang === 'es' ? "Descargue la aplicación Abyssia ahora e integre el poder de la inteligencia artificial al servicio de su éxito." :
                 lang === 'zh' ? "立即下载 Abyssia 应用程序，融入人工智能的力量，为您的成功提供助力。" :
                 lang === 'it' ? "Scarica subito l'app Abyssia e integra la potenza dell'intelligenza artificiale per supportare il tuo successo." :
                 lang === 'ru' ? "Скачайте приложение Abyssia прямо сейчас и используйте всю мощь искусственного интеллекта для достижения успеха." :
                 "Завантажте додаток Abyssia прямо зараз та інтегруйте силу штучного інтелекту для вашого успіху."}
              </p>
              
              <div className="pt-2">
                <a
                  href="#appstore"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-10 py-4.5 rounded-2xl font-bold text-white gradient-button shadow-xl shadow-pink-500/20 text-base cursor-pointer"
                >
                  <Smartphone size={18} />
                  {t.hero.ctaInstall}
                  <ArrowRight size={18} />
                </a>
              </div>

              <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2 text-xs text-slate-500">
                <span className="flex items-center gap-1">
                  <Smartphone size={14} className="text-emerald-400" />
                  {t.hero.trustBadge2}
                </span>
                <span className="h-3 w-px bg-white/10 hidden sm:block" />
                <span>Version 1.0.4 - Premium</span>
              </div>
            </div>
          </section>

          {/* 8. Contact & Support Section */}
          <section id="contact" className="space-y-12 scroll-mt-20">
            <div className="text-center max-w-2xl mx-auto space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/15 border border-violet-500/20 text-xs font-semibold text-violet-300">
                {t.contact.microBadge}
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                {t.contact.sectionTitle}
              </h2>
              <p className="text-sm sm:text-base text-slate-400">
                {t.contact.sectionSubtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Contact Card 1: Email */}
              <div className="glass-card rounded-2xl p-6 sm:p-8 flex flex-col justify-between items-start space-y-6 relative overflow-hidden group hover:border-pink-500/30 transition-all duration-300">
                <div className="absolute top-0 right-0 w-24 h-24 bg-pink-500/5 rounded-full blur-2xl pointer-events-none" />
                <div className="space-y-4">
                  <div className="size-12 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400 group-hover:scale-105 transition-all duration-300">
                    <Mail size={24} />
                  </div>
                  <h3 className="text-lg font-bold text-white">{t.contact.emailTitle}</h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    {t.contact.emailDesc}
                  </p>
                </div>
                <a 
                  href={`mailto:${SUPPORT_EMAIL}`} 
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-white/10 hover:border-pink-500/30 text-xs font-bold text-slate-300 hover:text-white transition-all duration-300 bg-white/5 w-full justify-center"
                >
                  {SUPPORT_EMAIL}
                  <ArrowRight size={14} />
                </a>
              </div>

              {/* Contact Card 2: Phone */}
              <div className="glass-card rounded-2xl p-6 sm:p-8 flex flex-col justify-between items-start space-y-6 relative overflow-hidden group hover:border-violet-500/30 transition-all duration-300">
                <div className="absolute top-0 right-0 w-24 h-24 bg-violet-600/5 rounded-full blur-2xl pointer-events-none" />
                <div className="space-y-4">
                  <div className="size-12 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400 group-hover:scale-105 transition-all duration-300">
                    <Phone size={24} />
                  </div>
                  <h3 className="text-lg font-bold text-white">{t.contact.phoneTitle}</h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    {t.contact.phoneDesc}
                  </p>
                </div>
                <a 
                  href={`tel:${SUPPORT_PHONE.replace(/\s/g, '')}`} 
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-white/10 hover:border-violet-500/30 text-xs font-bold text-slate-300 hover:text-white transition-all duration-300 bg-white/5 w-full justify-center"
                >
                  {SUPPORT_PHONE}
                  <ArrowRight size={14} />
                </a>
              </div>
            </div>
          </section>

        </div>
      </main>

      {/* 9. Super Professional Multi-Column Footer */}
      <footer className="bg-[#05060b] border-t border-white/5 pt-16 pb-8 relative z-10 text-slate-400 select-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 pb-12 border-b border-white/5">
            
            {/* Column 1 - Brand Info */}
            <div className="lg:col-span-4 space-y-4 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2.5">
                <img 
                  src="/logo.png" 
                  alt="Abyssia Logo" 
                  className="size-7 rounded-lg border border-white/10 shadow-md"
                />
                <span className="text-lg font-black text-white tracking-tight font-heading">
                  Abys<span className="text-pink-500">sia</span>
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed max-w-sm mx-auto md:mx-0">
                {t.footer.brandDesc}
              </p>
            </div>

            {/* Column 2 - Product quick links */}
            <div className="lg:col-span-2 text-center md:text-left space-y-3.5">
              <h4 className="text-xs font-black text-white uppercase tracking-wider">{t.footer.colProduct}</h4>
              <ul className="space-y-2 text-xs">
                <li><a href="#features" className="hover:text-white transition-colors duration-300">{t.nav.features}</a></li>
                <li><a href="#pomodoro" className="hover:text-white transition-colors duration-300">{t.nav.demos} (Pomodoro)</a></li>
                <li><a href="#habits" className="hover:text-white transition-colors duration-300">{t.nav.demos} (Habit Tracker)</a></li>
              </ul>
            </div>

            {/* Column 3 - Community links */}
            <div className="lg:col-span-3 text-center md:text-left space-y-3.5">
              <h4 className="text-xs font-black text-white uppercase tracking-wider">{t.footer.colCommunity}</h4>
              <ul className="space-y-2 text-xs">
                <li>
                  <a 
                    href={SUPPORT_DISCORD_URL} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="inline-flex items-center gap-1 hover:text-white transition-colors duration-300"
                  >
                    <MessageSquare size={13} />
                    <span>{t.footer.officialDiscord}</span>
                    <ExternalLink size={10} className="text-slate-600" />
                  </a>
                </li>
                <li><a href="#" className="hover:text-white transition-colors duration-300">Twitter / X</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-300">{t.footer.blog}</a></li>
              </ul>
            </div>

            {/* Column 4 - Support & Legal info */}
            <div className="lg:col-span-3 text-center md:text-left space-y-3.5">
              <h4 className="text-xs font-black text-white uppercase tracking-wider">{t.footer.colSupport}</h4>
              <ul className="space-y-2 text-xs">
                <li>
                  <a href={`mailto:${SUPPORT_EMAIL}`} className="inline-flex items-center gap-1.5 hover:text-white transition-colors duration-300">
                    <Mail size={13} />
                    <span>{SUPPORT_EMAIL}</span>
                  </a>
                </li>
                <li>
                  <a href={`tel:${SUPPORT_PHONE.replace(/\s/g, '')}`} className="inline-flex items-center gap-1.5 hover:text-white transition-colors duration-300">
                    <Phone size={13} />
                    <span>{SUPPORT_PHONE}</span>
                  </a>
                </li>
                <li>
                  <a href="/privacy.html" className="inline-flex items-center gap-1.5 hover:text-white transition-colors duration-300">
                    <Shield size={13} />
                    <span>{t.footer.legal}</span>
                  </a>
                </li>
              </ul>
              {/* Store availability badge */}
              <div className="pt-2 flex justify-center md:justify-start">
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/5 border border-emerald-500/10 text-[10px] text-emerald-400 font-bold">
                  <Smartphone size={14} />
                  <span>{t.hero.trustBadge2}</span>
                </div>
              </div>
            </div>

          </div>

          {/* Bottom row copyrights */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center text-[10px] text-slate-500">
            <div className="space-y-1">
              <p>© {new Date().getFullYear()} {t.footer.copyright}</p>
              <p className="text-[9px] text-slate-600">{t.footer.subNote}</p>
            </div>
            <div className="flex gap-4">
              <a href="/privacy.html" className="hover:text-slate-300 transition-colors duration-300">{t.footer.legal}</a>
              <a href="/terms.html" className="hover:text-slate-300 transition-colors duration-300">{t.footer.cgu}</a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
