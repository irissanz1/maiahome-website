import Link from "next/link";
import { whatsappUrl, WHATSAPP_DISPLAY } from "@/lib/contact";

// Página operativa "cómo abrir la chapa" (TTLock, código de 6 dígitos + #).
// Una sola guía para las 41 unidades: CX manda este link cuando el huésped está frente a la puerta.
// Fotos = cuadros del video de acceso (public/chapa/), recortados sin los subtítulos.
const VIDEO = "https://cdn.sanity.io/files/6o3ro0a1/production/a7c0c88d68980aded022513f765e468d36adf389.mp4";

type Lang = "es" | "en";

// Fotos por paso. El paso 3 lleva dos: la puerta del departamento (manija) y la de la calle (solo empujar).
const IMGS: { src: string; cap?: Record<Lang, string> }[][] = [
  [{ src: "/chapa/paso-1.jpg" }],
  [{ src: "/chapa/paso-2.jpg" }],
  [
    { src: "/chapa/paso-3.jpg", cap: { es: "Tu departamento", en: "Your apartment" } },
    { src: "/chapa/paso-3-calle.jpg", cap: { es: "Puerta de la calle", en: "Street door" } },
  ],
  [{ src: "/chapa/paso-4.jpg" }],
];

const T = {
  es: {
    eyebrow: "Acceso a tu departamento",
    h1: "Cómo abrir la chapa",
    intro: "Todas nuestras puertas usan la misma chapa electrónica. Abrirla toma menos de un minuto.",
    warnTitle: "Usa tu propio código",
    warnBody:
      "El código que se ve en el video y en las fotos es solo un ejemplo: no abre ninguna puerta. Tu código de 6 dígitos te llega por correo cuando validamos tu registro.",
    codeLabel: "Tu código",
    codeHint: "6 dígitos y al final la tecla #",
    clear: "borra el último dígito tecleado",
    confirm: "confirma",
    steps: [
      ["Enciende el teclado", "Pon la palma sobre la chapa un par de segundos. Se iluminan los números."],
      ["Marca tu código y presiona #", "Son 6 dígitos y al final la tecla #. Si te equivocas, presiona * para borrar el último dígito y corrígelo."],
      ["Escucha el sonido y abre la puerta", "Con el código correcto la chapa suena. En tu departamento, baja la manija y empuja. En la puerta de la calle no tienes que bajar ninguna manija: solo empuja la puerta."],
      ["Para cerrar, solo cierra la puerta", "La chapa se asegura sola en unos segundos."],
    ],
    building: "En varios de nuestros edificios este mismo código abre también la puerta de la calle.",
    troubleTitle: "¿No abre?",
    trouble: [
      ["No se encienden los números", "Cubre todo el teclado con la palma y espera 2 segundos."],
      ["Me equivoqué al marcar", "Presiona * para borrar el último dígito, corrígelo y termina con #."],
      ["No sonó", "Revisa que hayas terminado con #. Sin # la chapa no lee el código."],
      ["Fallé 5 veces", "La chapa se bloquea por seguridad. Espera 3 minutos y vuelve a intentar."],
      ["Llegué antes de las 15:00", "Tu código se activa a la hora de entrada, 15:00. Si contrataste entrada anticipada, escríbenos para activarlo antes."],
    ],
    noCodeQ: "No me llegó el código",
    noCodeA: ["Revisa tu correo, incluida la carpeta de spam. El código se activa cuando validamos tu ", "registro", "; si ya lo enviaste, escríbenos."],
    checkinHref: "/check-in",
    helpTitle: "¿Sigue sin abrir?",
    helpBody: "Escríbenos por WhatsApp y te ayudamos en el momento.",
    helpBtn: "Escribir por WhatsApp",
    helpMsg: "Hola, estoy frente a la puerta y la chapa no abre. Mi departamento es: ",
    videoTitle: "Ver el video (23 s)",
    videoWarn: "El código que se marca en el video es solo un ejemplo.",
    stepAlt: "Paso",
  },
  en: {
    eyebrow: "Getting into your apartment",
    h1: "How to open the door lock",
    intro: "All our doors use the same electronic lock. Opening it takes less than a minute.",
    warnTitle: "Use your own code",
    warnBody:
      "The code shown in the video and photos is only an example: it doesn't open any door. Your 6-digit code arrives by email once we validate your registration.",
    codeLabel: "Your code",
    codeHint: "6 digits, then the # key",
    clear: "deletes the last digit typed",
    confirm: "confirms",
    steps: [
      ["Wake up the keypad", "Place your palm over the lock for a couple of seconds. The numbers light up."],
      ["Enter your code and press #", "It's 6 digits, then the # key. If you make a mistake, press * to delete the last digit and fix it."],
      ["Wait for the sound and open the door", "With the right code the lock beeps. At your apartment, push the handle down and push the door. At the street door you don't need to push down any handle: just push the door."],
      ["To lock, just close the door", "The lock secures itself after a few seconds."],
    ],
    building: "In several of our buildings the same code also opens the street door.",
    troubleTitle: "Still locked?",
    trouble: [
      ["The numbers don't light up", "Cover the whole keypad with your palm and wait 2 seconds."],
      ["I typed a wrong digit", "Press * to delete the last digit, fix it and finish with #."],
      ["No sound", "Make sure you finished with #. Without # the lock doesn't read the code."],
      ["I failed 5 times", "The lock blocks itself for security. Wait 3 minutes and try again."],
      ["I arrived before 3:00 PM", "Your code activates at check-in time, 3:00 PM. If you booked early check-in, message us so we can activate it earlier."],
    ],
    noCodeQ: "I didn't get my code",
    noCodeA: ["Check your email, including spam. The code is activated once we validate your ", "registration", "; if you already sent it, message us."],
    checkinHref: "/en/check-in",
    helpTitle: "Still not opening?",
    helpBody: "Message us on WhatsApp and we'll help you right away.",
    helpBtn: "Message us on WhatsApp",
    helpMsg: "Hi, I'm at the door and the lock won't open. My apartment is: ",
    videoTitle: "Watch the video (23 s)",
    videoWarn: "The code entered in the video is only an example.",
    stepAlt: "Step",
  },
} as const;

// Teclado esquemático: 3×4, con * (borra) y # (confirma) resaltados.
function Keypad({ clear, confirm }: { clear: string; confirm: string }) {
  const keys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "*", "0", "#"];
  return (
    <svg viewBox="0 0 150 200" className="h-32 w-auto shrink-0 sm:h-40" role="img" aria-label={`* ${clear} · # ${confirm}`}>
      <rect x="0" y="0" width="150" height="200" rx="16" fill="#1c1c1c" />
      {keys.map((k, i) => {
        const cx = 30 + (i % 3) * 45;
        const cy = 30 + Math.floor(i / 3) * 46;
        const hash = k === "#";
        const star = k === "*";
        return (
          <g key={k}>
            {hash && <circle cx={cx} cy={cy} r="17" fill="#F9D316" />}
            {star && <circle cx={cx} cy={cy} r="17" fill="none" stroke="#FDDB51" strokeWidth="2" strokeDasharray="4 3" />}
            <text x={cx} y={cy + 6} textAnchor="middle" fontSize="18" fontWeight="700" fill={hash ? "#1c1c1c" : "#f5f5f5"}>
              {k}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export default function LockGuide({ lang }: { lang: Lang }) {
  const t = T[lang];
  return (
    <div className="mx-auto max-w-3xl px-5 py-12 md:py-16">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-maia-strong">{t.eyebrow}</p>
      <h1 className="mt-3 font-serif text-4xl text-neutral-900 md:text-5xl">{t.h1}</h1>
      <p className="mt-4 text-lg text-neutral-600">{t.intro}</p>

      {/* Aviso: el código del video es ejemplo */}
      <div className="mt-6 rounded-2xl border-l-4 border-maia-strong bg-[#FBF7EC] p-5">
        <p className="text-base font-bold text-neutral-900">⚠️ {t.warnTitle}</p>
        <p className="mt-1 text-sm text-neutral-700">{t.warnBody}</p>
      </div>

      {/* Patrón del código + teclado */}
      <div className="mt-6 flex items-center gap-4 rounded-2xl border border-neutral-200 p-4 sm:gap-5 sm:p-5">
        <Keypad clear={t.clear} confirm={t.confirm} />
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500">{t.codeLabel}</p>
          <p className="mt-1 whitespace-nowrap font-mono text-xl font-bold tracking-[0.12em] text-neutral-900 sm:text-2xl sm:tracking-[0.2em]">
            ●●●●●● <span className="rounded-md bg-maia-strong px-2 text-neutral-900">#</span>
          </p>
          <p className="mt-1 text-sm text-neutral-600">{t.codeHint}</p>
          <p className="mt-3 text-sm text-neutral-600">
            <b className="text-neutral-900">*</b> {t.clear} · <b className="text-neutral-900">#</b> {t.confirm}
          </p>
        </div>
      </div>

      {/* Pasos */}
      <ol className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
        {t.steps.map(([title, body], i) => (
          <li key={title} className="overflow-hidden rounded-2xl border border-neutral-200 bg-white">
            <div className="relative">
              <div className={IMGS[i].length > 1 ? "grid grid-cols-2 gap-px bg-neutral-200" : ""}>
                {IMGS[i].map((im) => (
                  <div key={im.src} className="relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={im.src}
                      alt={`${t.stepAlt} ${i + 1}: ${title}${im.cap ? ` (${im.cap[lang]})` : ""}`}
                      width={406}
                      height={360}
                      loading={i < 2 ? "eager" : "lazy"}
                      className="aspect-[406/360] w-full object-cover"
                    />
                    {im.cap && (
                      <span className="absolute bottom-2 left-2 rounded-full bg-black/70 px-2.5 py-1 text-xs font-semibold text-white">
                        {im.cap[lang]}
                      </span>
                    )}
                  </div>
                ))}
              </div>
              <span className="absolute left-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-maia-strong text-lg font-bold text-neutral-900 shadow">
                {i + 1}
              </span>
            </div>
            <div className="p-4">
              <p className="text-base font-bold text-neutral-900">{title}</p>
              <p className="mt-1 text-sm text-neutral-600">{body}</p>
            </div>
          </li>
        ))}
      </ol>
      <p className="mt-4 text-sm text-neutral-500">{t.building}</p>

      {/* ¿No abre? */}
      <section className="mt-10">
        <h2 className="font-serif text-2xl text-neutral-900">{t.troubleTitle}</h2>
        <dl className="mt-4 divide-y divide-neutral-200 rounded-2xl border border-neutral-200">
          {t.trouble.map(([q, a]) => (
            <div key={q} className="p-4">
              <dt className="text-sm font-bold text-neutral-900">{q}</dt>
              <dd className="mt-1 text-sm text-neutral-600">{a}</dd>
            </div>
          ))}
          <div className="p-4">
            <dt className="text-sm font-bold text-neutral-900">{t.noCodeQ}</dt>
            <dd className="mt-1 text-sm text-neutral-600">
              {t.noCodeA[0]}
              <Link href={t.checkinHref} className="font-semibold text-neutral-900 underline">
                {t.noCodeA[1]}
              </Link>
              {t.noCodeA[2]}
            </dd>
          </div>
        </dl>
      </section>

      {/* Ayuda por WhatsApp */}
      <section className="mt-8 rounded-2xl bg-[#FBF7EC] p-6">
        <h2 className="font-serif text-2xl text-neutral-900">{t.helpTitle}</h2>
        <p className="mt-1 text-neutral-600">{t.helpBody}</p>
        <a
          href={whatsappUrl(t.helpMsg)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-block rounded-full bg-maia-yellow px-6 py-3 text-sm font-bold text-black transition hover:bg-maia-strong"
        >
          {t.helpBtn}
        </a>
        <p className="mt-2 text-sm text-neutral-500">{WHATSAPP_DISPLAY}</p>
      </section>

      {/* Video (no se descarga hasta abrirlo: poca señal frente a la puerta) */}
      <details className="mt-8 rounded-2xl border border-neutral-200 p-4">
        <summary className="cursor-pointer text-base font-bold text-neutral-900">{t.videoTitle}</summary>
        <p className="mt-3 rounded-lg bg-[#FBF7EC] px-3 py-2 text-sm font-semibold text-neutral-800">⚠️ {t.videoWarn}</p>
        <video
          src={VIDEO}
          poster="/chapa/video-poster.jpg"
          controls
          playsInline
          preload="none"
          className="mx-auto mt-3 max-h-[70vh] rounded-xl"
        />
      </details>
    </div>
  );
}
