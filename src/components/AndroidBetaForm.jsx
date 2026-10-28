import { useEffect, useState } from 'react';
import { CheckCircle2, Loader2, ArrowRight } from 'lucide-react';
import { PLAY_STORE_URL } from '../config/deeplink';
import { SUPABASE_URL, SUPABASE_ANON_KEY } from '../config/supabase';

/**
 * Inscription au test fermé Google Play.
 *
 * Le test n'accepte que les comptes de la liste de testeurs de la Play Console :
 * on recueille donc l'adresse Gmail du visiteur (table play_store_participants,
 * statut « pending »), Kelvyn l'ajoute à la liste, puis le visiteur rejoint le
 * test avec le lien d'inscription affiché après l'envoi.
 */
const LABELS = {
  fr: {
    already: 'Déjà sur la liste ? Rejoindre le test',
    title: 'Android : rejoindre la bêta', intro: "L'app Android est en test fermé sur Google Play. Laissez l'adresse Gmail de votre téléphone : nous l'ajoutons à la liste des testeurs.",
    placeholder: 'vous@gmail.com', submit: "M'inscrire", sending: 'Envoi…',
    invalid: 'Entrez une adresse @gmail.com : c’est le compte Google de votre téléphone qui doit être ajouté.',
    error: "L'envoi a échoué. Réessayez dans un instant.",
    doneTitle: 'C’est noté !', done: 'Votre adresse est ajoutée à la liste sous 24 h. Ouvrez ensuite ce lien sur votre téléphone, avec ce compte Google, pour rejoindre le test et installer l’app :',
    join: 'Rejoindre le test Google Play', privacy: 'Votre adresse sert uniquement à vous inscrire au test.', privacyLink: 'Confidentialité',
  },
  en: {
    already: 'Already on the list? Join the test',
    title: 'Android: join the beta', intro: 'The Android app is in a closed test on Google Play. Leave the Gmail address used on your phone and we will add it to the testers list.',
    placeholder: 'you@gmail.com', submit: 'Sign me up', sending: 'Sending…',
    invalid: 'Enter a @gmail.com address: it is the Google account on your phone that has to be added.',
    error: 'Sending failed. Please try again in a moment.',
    doneTitle: 'You’re on the list!', done: 'Your address will be added within 24 hours. Then open this link on your phone, with that Google account, to join the test and install the app:',
    join: 'Join the Google Play test', privacy: 'Your address is only used to sign you up for the test.', privacyLink: 'Privacy',
  },
  es: {
    already: '¿Ya estás en la lista? Únete a la prueba',
    title: 'Android: únete a la beta', intro: 'La app de Android está en prueba cerrada en Google Play. Deja la dirección Gmail de tu teléfono y la añadimos a la lista de testers.',
    placeholder: 'tu@gmail.com', submit: 'Inscribirme', sending: 'Enviando…',
    invalid: 'Introduce una dirección @gmail.com: hay que añadir la cuenta de Google de tu teléfono.',
    error: 'El envío ha fallado. Inténtalo de nuevo en un momento.',
    doneTitle: '¡Apuntado!', done: 'Añadiremos tu dirección en menos de 24 h. Después abre este enlace en tu teléfono, con esa cuenta de Google, para unirte a la prueba e instalar la app:',
    join: 'Unirme a la prueba de Google Play', privacy: 'Tu dirección solo sirve para inscribirte en la prueba.', privacyLink: 'Privacidad',
  },
  zh: {
    already: '已在名单中？加入测试',
    title: 'Android：加入测试版', intro: 'Android 版正在 Google Play 封闭测试中。留下你手机上使用的 Gmail 地址，我们会把它加入测试人员名单。',
    placeholder: 'you@gmail.com', submit: '报名', sending: '发送中…',
    invalid: '请输入 @gmail.com 地址：需要加入的是你手机上的 Google 账号。',
    error: '发送失败，请稍后再试。',
    doneTitle: '已登记！', done: '我们会在 24 小时内加入你的地址。之后请在手机上用该 Google 账号打开此链接，加入测试并安装应用：',
    join: '加入 Google Play 测试', privacy: '你的地址仅用于为你报名测试。', privacyLink: '隐私',
  },
  it: {
    already: 'Già in lista? Entra nel test',
    title: 'Android: entra nella beta', intro: "L'app Android è in test chiuso su Google Play. Lascia l'indirizzo Gmail del tuo telefono e lo aggiungiamo alla lista dei tester.",
    placeholder: 'tu@gmail.com', submit: 'Iscrivimi', sending: 'Invio…',
    invalid: 'Inserisci un indirizzo @gmail.com: va aggiunto l’account Google del tuo telefono.',
    error: "Invio non riuscito. Riprova tra un attimo.",
    doneTitle: 'Fatto!', done: 'Aggiungeremo il tuo indirizzo entro 24 ore. Poi apri questo link sul telefono, con quell’account Google, per entrare nel test e installare l’app:',
    join: 'Entra nel test di Google Play', privacy: 'Il tuo indirizzo serve solo per iscriverti al test.', privacyLink: 'Privacy',
  },
  ru: {
    already: 'Уже в списке? Присоединиться к тесту',
    title: 'Android: участвовать в бета-тесте', intro: 'Приложение для Android проходит закрытое тестирование в Google Play. Оставьте адрес Gmail с вашего телефона — мы добавим его в список тестировщиков.',
    placeholder: 'vy@gmail.com', submit: 'Записаться', sending: 'Отправка…',
    invalid: 'Введите адрес @gmail.com: нужно добавить аккаунт Google с вашего телефона.',
    error: 'Не удалось отправить. Попробуйте ещё раз чуть позже.',
    doneTitle: 'Готово!', done: 'Мы добавим ваш адрес в течение 24 часов. Затем откройте эту ссылку на телефоне с этим аккаунтом Google, чтобы присоединиться к тесту и установить приложение:',
    join: 'Присоединиться к тесту Google Play', privacy: 'Адрес используется только для записи на тест.', privacyLink: 'Конфиденциальность',
  },
  uk: {
    already: 'Уже в списку? Долучитися до тесту',
    title: 'Android: долучитися до бета-тесту', intro: 'Застосунок для Android проходить закрите тестування в Google Play. Залиште адресу Gmail зі свого телефона — ми додамо її до списку тестувальників.',
    placeholder: 'vy@gmail.com', submit: 'Записатися', sending: 'Надсилання…',
    invalid: 'Введіть адресу @gmail.com: потрібно додати обліковий запис Google з вашого телефона.',
    error: 'Не вдалося надіслати. Спробуйте ще раз трохи згодом.',
    doneTitle: 'Готово!', done: 'Ми додамо вашу адресу протягом 24 годин. Потім відкрийте це посилання на телефоні з цим обліковим записом Google, щоб долучитися до тесту й установити застосунок:',
    join: 'Долучитися до тесту Google Play', privacy: 'Адреса використовується лише для запису на тест.', privacyLink: 'Конфіденційність',
  },
};

const GMAIL = /^[a-z0-9.+_-]+@(gmail|googlemail)\.com$/;
const STOCKAGE = 'android-beta-inscrit';

const dejaInscrit = () => {
  try { return localStorage.getItem(STOCKAGE) === 'oui'; } catch { return false; }
};

export default function AndroidBetaForm({ lang = 'fr' }) {
  const labels = LABELS[lang] || LABELS.fr;
  const [email, setEmail] = useState('');
  const [etat, setEtat] = useState('saisie'); // saisie | envoi | fait | invalide | erreur
  // Lu après l'hydratation : le HTML pré-rendu montre toujours le formulaire.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { if (dejaInscrit()) setEtat('fait'); }, []);

  const envoyer = async (e) => {
    e.preventDefault();
    // Champ piège invisible : seul un robot le remplit.
    if (e.currentTarget.elements.website.value) { setEtat('fait'); return; }
    const adresse = email.trim().toLowerCase();
    if (!GMAIL.test(adresse) || adresse.length > 254) { setEtat('invalide'); return; }
    setEtat('envoi');
    try {
      const reponse = await fetch(`${SUPABASE_URL}/rest/v1/play_store_participants`, {
        method: 'POST',
        headers: {
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
          Prefer: 'return=minimal',
        },
        body: JSON.stringify({ email: adresse }),
      });
      // 409 : adresse déjà inscrite (si la table a une contrainte d'unicité).
      if (!reponse.ok && reponse.status !== 409) throw new Error(String(reponse.status));
      try { localStorage.setItem(STOCKAGE, 'oui'); } catch { /* navigation privée */ }
      setEtat('fait');
    } catch {
      setEtat('erreur');
    }
  };

  return (
    <div id="beta-android" className="scroll-mt-24 mt-6 max-w-xl mx-auto lg:mx-0 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-5 text-left space-y-3">
      <h3 className="text-base font-bold text-white">{labels.title}</h3>

      {etat === 'fait' ? (
        <div className="space-y-3" role="status">
          <p className="flex items-center gap-2 text-sm font-semibold text-emerald-300">
            <CheckCircle2 size={16} className="shrink-0" /> {labels.doneTitle}
          </p>
          <p className="text-sm text-slate-300 leading-relaxed">{labels.done}</p>
          <a
            href={PLAY_STORE_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-500 transition-colors"
          >
            {labels.join} <ArrowRight size={15} />
          </a>
        </div>
      ) : (
        <form onSubmit={envoyer} noValidate className="space-y-3">
          <p className="text-sm text-slate-400 leading-relaxed">{labels.intro}</p>
          <div className="flex flex-col sm:flex-row gap-2">
            <label htmlFor="beta-email" className="sr-only">{labels.placeholder}</label>
            <input
              id="beta-email"
              type="email"
              inputMode="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => { setEmail(e.target.value); if (etat === 'invalide' || etat === 'erreur') setEtat('saisie'); }}
              placeholder={labels.placeholder}
              aria-invalid={etat === 'invalide'}
              aria-describedby="beta-message"
              className="w-full sm:flex-1 min-w-0 h-12 px-4 rounded-xl bg-black/40 border border-white/15 text-base text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-400"
            />
            {/* Piège à robots, hors écran et hors tabulation */}
            <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -left-[9999px] size-px opacity-0" />
            <button
              type="submit"
              disabled={etat === 'envoi'}
              className="h-12 px-5 rounded-xl text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-500 disabled:opacity-60 transition-colors inline-flex items-center justify-center gap-2 cursor-pointer"
            >
              {etat === 'envoi' && <Loader2 size={15} className="animate-spin" />}
              {etat === 'envoi' ? labels.sending : labels.submit}
            </button>
          </div>
          <p id="beta-message" className="text-xs" aria-live="polite">
            {etat === 'invalide' && <span className="text-amber-300">{labels.invalid}</span>}
            {etat === 'erreur' && <span className="text-rose-300">{labels.error}</span>}
            {(etat === 'saisie' || etat === 'envoi') && (
              <span className="text-slate-500">{labels.privacy} <a href="/privacy.html" className="underline hover:text-slate-300">{labels.privacyLink}</a></span>
            )}
          </p>
          <a href={PLAY_STORE_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-300 hover:text-emerald-200">
            {labels.already} <ArrowRight size={12} />
          </a>
        </form>
      )}
    </div>
  );
}
