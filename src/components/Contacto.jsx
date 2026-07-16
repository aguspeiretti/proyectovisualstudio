import { useState } from 'react';
import Reveal from './Reveal';

const INFO = [
  {
    label: 'Instagram',
    value: '@visualstudio.es',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    value: '@visual studio españa',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
      </svg>
    ),
  },
  {
    label: 'Teléfono',
    value: '+34 617 909 696  ·  +34 603 218 396',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.1a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 15z"/>
      </svg>
    ),
  },
  {
    label: 'Email',
    value: 'somosvisualstudio@gmail.com',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
  },
];

const FIELD_STYLE = {
  background: 'rgba(255,255,255,0.07)',
  border: '1px solid rgba(255,255,255,0.12)',
  borderRadius: '12px',
  padding: '14px 18px',
  width: '100%',
  fontSize: '0.9rem',
  fontWeight: 300,
  color: '#f0ede3',
  outline: 'none',
  transition: 'background 0.2s, border-color 0.2s',
  fontFamily: 'inherit',
};

function Field({ id, label, type = 'text', placeholder, required, as = 'input', rows }) {
  const [focused, setFocused] = useState(false);
  const style = {
    ...FIELD_STYLE,
    background: focused ? 'rgba(255,255,255,0.11)' : 'rgba(255,255,255,0.07)',
    borderColor: focused ? 'rgba(232,98,26,0.65)' : 'rgba(255,255,255,0.12)',
    ...(as === 'textarea' ? { resize: 'none', display: 'block' } : {}),
  };

  const sharedProps = {
    id,
    name: id,
    placeholder,
    required,
    style,
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false),
  };

  return (
    <div className="flex flex-col gap-[7px]">
      <label
        htmlFor={id}
        className="font-mozilla font-bold uppercase"
        style={{ fontSize: '0.58rem', letterSpacing: '0.22em', color: 'rgba(240,237,227,0.45)' }}
      >
        {label}{required && <span style={{ color: '#e8621a' }} aria-hidden="true"> *</span>}
      </label>
      {as === 'textarea'
        ? <textarea {...sharedProps} rows={rows} />
        : <input {...sharedProps} type={type} />}
    </div>
  );
}

function encodeFormData(data) {
  return Object.keys(data)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
    .join('&');
}

export default function Contacto() {
  const [status, setStatus] = useState('idle');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const data = Object.fromEntries(new FormData(form));

    setStatus('sending');
    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encodeFormData(data),
      });
      if (!response.ok) throw new Error(`Netlify respondió ${response.status}`);
      setStatus('sent');
      form.reset();
    } catch {
      setStatus('error');
    }
  };

  return (
    <section
      id="contacto"
      className="relative overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: 'url(/fondo.jpg)' }}
    >
      {/* Overlay oscuro — imprescindible para que el glass se vea */}
      <div className="absolute inset-0" style={{ background: 'rgba(4, 26, 26, 0.72)' }} />

      {/* Layout */}
      <div
        className="relative flex flex-col lg:flex-row min-h-screen"
        style={{ zIndex: 2, paddingTop: '56px' }}
      >

        {/* ── Izquierda ── */}
        <div
          className="w-full lg:w-[44%] flex flex-col justify-center gap-10"
          style={{ padding: 'clamp(48px,8vh,80px) clamp(24px,5vw,96px)' }}
        >
          <Reveal>
            <p className="font-mozilla font-bold uppercase mb-4"
               style={{ fontSize: '0.68rem', letterSpacing: '0.26em', color: '#e8621a' }}>
              Contacto
            </p>
            <h2 className="font-mozilla font-bold text-cream uppercase"
                style={{ fontSize: 'clamp(2.6rem,3.8vw,4rem)', lineHeight: 1.04 }}>
              ¿Listo para<br />el salto?{' '}
              <span style={{ color: '#e8621a' }}>Hablemos.</span>
            </h2>
          </Reveal>

          <Reveal delay={0.12}>
            <ul className="flex flex-col" style={{ gap: '24px' }}>
              {INFO.map(({ icon, label, value }) => (
                <li key={label} className="flex items-start" style={{ gap: '16px' }}>
                  <span
                    className="flex items-center justify-center shrink-0"
                    style={{
                      width: 42, height: 42,
                      borderRadius: '50%',
                      background: 'rgba(232,98,26,0.14)',
                      border: '1px solid rgba(232,98,26,0.25)',
                      color: '#ff8a3d',
                      marginTop: 2,
                    }}
                    aria-hidden="true"
                  >
                    {icon}
                  </span>
                  <div>
                    <p className="font-mozilla font-bold uppercase"
                       style={{ fontSize: '0.57rem', letterSpacing: '0.2em', color: 'rgba(240,237,227,0.38)', marginBottom: 4 }}>
                      {label}
                    </p>
                    <p className="font-mozilla font-light text-cream" style={{ fontSize: '0.92rem', lineHeight: 1.5 }}>
                      {value}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* ── Derecha — Formulario glass ── */}
        <div
          className="w-full lg:w-[56%] flex items-center justify-center"
          style={{ padding: 'clamp(40px,7vh,72px) clamp(24px,4vw,72px)' }}
        >
          <Reveal delay={0.08} className="w-full" style={{ maxWidth: 580 }}>
            <form
              name="contacto"
              method="POST"
              data-netlify="true"
              netlify-honeypot="bot-field"
              onSubmit={handleSubmit}
              style={{
                background: 'rgba(255,255,255,0.05)',
                backdropFilter: 'blur(32px)',
                WebkitBackdropFilter: 'blur(32px)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderTop: '1px solid rgba(255,255,255,0.18)',
                borderRadius: '20px',
                padding: 'clamp(28px,4vw,48px)',
                boxShadow: '0 24px 64px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.1)',
              }}
            >
              <h3
                className="font-mozilla font-bold text-cream uppercase mb-8"
                style={{ fontSize: '1.7rem', letterSpacing: '0.04em' }}
              >
                Escríbenos
              </h3>

              <input type="hidden" name="form-name" value="contacto" />
              <p hidden>
                <label>
                  No completar: <input name="bot-field" tabIndex={-1} autoComplete="off" />
                </label>
              </p>

              <div className="flex flex-col" style={{ gap: '20px' }}>
                {/* Nombre + Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: '20px' }}>
                  <Field id="nombre" label="Nombre" placeholder="Tu nombre" required />
                  <Field id="email" label="Email" type="email" placeholder="ejemplo@mail.com" required />
                </div>

                <Field id="telefono" label="Teléfono" type="tel" placeholder="+34 617 909 696" />

                <Field id="mensaje" label="Mensaje" as="textarea" rows={5} placeholder="¿En qué podemos ayudarte?" required />

                {/* Botón */}
                <div className="flex flex-col items-start" style={{ gap: '12px', paddingTop: '4px' }}>
                  <button
                    type="submit"
                    disabled={status === 'sent' || status === 'sending'}
                    className="font-mozilla font-bold uppercase text-cream transition-all duration-200"
                    style={{
                      fontSize: '0.75rem',
                      letterSpacing: '0.22em',
                      background: status === 'sent' ? 'rgba(232,98,26,0.6)' : '#e8621a',
                      borderRadius: '100px',
                      padding: '14px 40px',
                      border: 'none',
                      cursor: status === 'sent' || status === 'sending' ? 'default' : 'pointer',
                      boxShadow: status === 'sent' ? 'none' : '0 8px 28px rgba(232,98,26,0.45)',
                      transform: 'scale(1)',
                    }}
                    onMouseEnter={e => { if (status !== 'sent' && status !== 'sending') e.currentTarget.style.transform = 'scale(1.04)'; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}
                  >
                    {status === 'sending' ? 'Enviando...' : status === 'sent' ? 'Mensaje enviado ✓' : 'Enviar mensaje'}
                  </button>
                  {status === 'sent' && (
                    <p role="status" className="font-mozilla font-light"
                       style={{ fontSize: '0.8rem', color: 'rgba(240,237,227,0.55)' }}>
                      ¡Gracias! Te responderemos a la brevedad.
                    </p>
                  )}
                  {status === 'error' && (
                    <p role="status" className="font-mozilla font-light"
                       style={{ fontSize: '0.8rem', color: '#ff8a3d' }}>
                      Hubo un error al enviar. Probá de nuevo o escribinos por WhatsApp.
                    </p>
                  )}
                </div>
              </div>
            </form>
          </Reveal>
        </div>
      </div>

      {/* Footer */}
      <div
        className="relative font-mozilla font-light"
        style={{
          zIndex: 2,
          padding: '14px clamp(24px,5vw,96px)',
          fontSize: '0.75rem',
          color: 'rgba(240,237,227,0.28)',
          borderTop: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        // UniversoVisual
      </div>
    </section>
  );
}
