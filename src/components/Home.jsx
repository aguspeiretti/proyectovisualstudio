import { useState } from 'react';
import Reveal from './Reveal';

export default function Home() {
  const [btnHover, setBtnHover] = useState(false);

  return (
    <section id="home" className="md:min-h-screen pt-14">
      <div className="flex flex-col md:flex-row" style={{ minHeight: 'calc(100vh - 56px)' }}>

        {/* ── Panel izquierdo — crema ── */}
        <div
          className="w-full md:w-[38%] flex flex-col justify-center bg-cream relative overflow-hidden"
          style={{ padding: 'clamp(48px,8vh,80px) clamp(28px,5vw,80px)' }}
        >
          {/* Línea decorativa vertical */}
          <div style={{
            position: 'absolute', left: 0, top: '15%', bottom: '15%',
            width: 3, borderRadius: 2,
            background: 'linear-gradient(to bottom, transparent, #e8621a 30%, #e8621a 70%, transparent)',
            opacity: 0.6,
          }} />

          <Reveal>
            <p
              className="font-mozilla font-bold uppercase mb-4"
              style={{ fontSize: '0.65rem', letterSpacing: '0.28em', color: '#e8621a' }}
            >
              Visual Studio ®
            </p>

            <h1
              className="font-mozilla font-bold text-forest uppercase"
              style={{ fontSize: 'clamp(2.6rem,5.5vw,4.4rem)', lineHeight: 1.02, marginBottom: 24 }}
            >
              <span style={{ fontWeight: 300 }}>¿Listo</span>
              <br />
              <span style={{ fontWeight: 300 }}>para la</span>
              <br />
              <span style={{ fontWeight: 700 }}>próxima</span>
              <br />
              <span style={{ fontWeight: 700 }}>misión?</span>
            </h1>
          </Reveal>

          <Reveal delay={0.12}>
            <p
              className="font-mozilla font-normal text-forest"
              style={{ fontSize: '0.9rem', lineHeight: 1.7, maxWidth: 360, marginBottom: 36, opacity: 0.82 }}
            >
              Impulsamos a empresas a construir marcas sólidas mediante estrategia, diseño y comunicación.
            </p>

            {/* CTA */}
            <div className="flex items-center" style={{ gap: 20 }}>
              <a
                href="#contacto"
                onMouseEnter={() => setBtnHover(true)}
                onMouseLeave={() => setBtnHover(false)}
                className="font-mozilla font-bold uppercase text-cream"
                style={{
                  fontSize: '0.72rem', letterSpacing: '0.2em',
                  background: btnHover ? '#c85418' : '#e8621a',
                  borderRadius: 100,
                  padding: '13px 32px',
                  textDecoration: 'none',
                  display: 'inline-block',
                  boxShadow: btnHover ? '0 8px 28px rgba(232,98,26,0.5)' : '0 4px 16px rgba(232,98,26,0.3)',
                  transform: btnHover ? 'scale(1.04)' : 'scale(1)',
                  transition: 'all 0.22s cubic-bezier(0.16,1,0.3,1)',
                }}
              >
                Hablemos
              </a>

              <a
                href="#portfolio"
                className="font-mozilla font-normal text-forest"
                style={{
                  fontSize: '0.78rem', letterSpacing: '0.06em',
                  textDecoration: 'none', opacity: 0.6,
                  display: 'flex', alignItems: 'center', gap: 6,
                  transition: 'opacity 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.opacity = 1}
                onMouseLeave={e => e.currentTarget.style.opacity = 0.6}
              >
                Ver portfolio
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                </svg>
              </a>
            </div>
          </Reveal>
        </div>

        {/* ── Panel derecho — foto ── */}
        <div
          className="w-full md:w-[62%] relative overflow-hidden"
          style={{ minHeight: 320, background: '#e8e5dc' }}
        >
          <img
            src="/equipo.jpg"
            alt="Equipo Visual Studio"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />

          {/* Gradiente izquierdo para integrar con el panel crema */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to right, rgba(240,237,227,0.55) 0%, transparent 30%)',
            pointerEvents: 'none',
          }} />

          {/* Marca de agua esquina */}
          <div style={{
            position: 'absolute', bottom: 20, right: 24,
            display: 'flex', alignItems: 'center', gap: 8,
            opacity: 0.35,
          }}>
            <img src="/logo-icon.png" alt="" style={{ height: 22, width: 'auto' }} />
            <span
              className="font-mozilla font-light"
              style={{ fontSize: '0.65rem', letterSpacing: '0.18em', color: '#0c3838' }}
            >
              VISUAL STUDIO
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
