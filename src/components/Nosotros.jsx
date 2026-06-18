import { useState } from 'react';
import Reveal from './Reveal';

const SERVICIOS = [
  { title: 'Estrategia y Consultoría', icon: '◆', sub: [] },
  {
    title: 'Branding y Diseño',
    icon: '✦',
    sub: ['Identidad visual', 'Rebranding', 'Manual de marca', 'Diseño editorial', 'Packaging', 'Diseño gráfico', 'Ilustración', 'Murales corporativos', 'Señalética'],
  },
  { title: 'Comunicación Digital', icon: '◎', sub: [] },
  { title: 'Producción Audiovisual', icon: '▶', sub: [] },
];

export default function Nosotros() {
  const [open, setOpen] = useState('Branding y Diseño');

  return (
    <section id="nosotros" className="md:min-h-screen" style={{ paddingTop: '56px' }}>
      <div className="flex flex-col md:flex-row md:min-h-[calc(100vh-56px)]">

        {/* Video izquierda */}
        <div className="w-full md:w-[58%] min-h-[280px] md:min-h-0" style={{
          backgroundColor: '#141414',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <p style={{
            position: 'absolute',
            top: '20px', left: '20px',
            fontFamily: 'MozillaText, sans-serif',
            fontSize: '0.72rem',
            fontWeight: 400,
            color: 'rgba(240,237,227,0.85)',
            letterSpacing: '0.03em',
          }}>
            *DESCRIPTIVO - PRESENTACIÓN (VIDEO)
          </p>

          {/* Play button */}
          <button
            aria-label="Reproducir video de presentación"
            className="transition-transform duration-200 hover:scale-110"
            style={{
              width: '58px', height: '58px',
              borderRadius: '50%',
              border: '2px solid rgba(240,237,227,0.75)',
              background: 'rgba(240,237,227,0.1)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              backdropFilter: 'blur(4px)',
            }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="#f0ede3" style={{ marginLeft: '3px' }}>
              <path d="M8 5v14l11-7z" />
            </svg>
          </button>
        </div>

        {/* Servicios derecha */}
        <div className="w-full md:w-[42%] px-6 py-12 md:px-11" style={{
          backgroundColor: '#f0ede3',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}>
          <Reveal>
            <h2 style={{
              fontFamily: 'Nevanta, sans-serif',
              fontSize: 'clamp(2rem, 4vw, 2.8rem)',
              fontWeight: 700,
              color: '#1a7a6e',
              letterSpacing: '0.06em',
              marginBottom: '28px',
            }}>
              SERVICIOS
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: '12px' }}>
            {SERVICIOS.map(({ title, icon, sub }, i) => {
              const isOpen = open === title;
              const panelId = `servicio-panel-${title.replace(/\s+/g, '-')}`;
              return (
                <Reveal key={title} delay={i * 0.08}>
                  <div
                    className="transition-transform duration-200 hover:-translate-y-1"
                    style={{
                      borderRadius: '14px',
                      border: '1px solid rgba(12,56,56,0.12)',
                      background: isOpen ? '#0c3838' : 'rgba(12,56,56,0.04)',
                      padding: '16px 16px',
                      height: '100%',
                      transition: 'background 0.25s ease',
                    }}
                  >
                    <button
                      onClick={() => sub.length && setOpen(isOpen ? null : title)}
                      aria-expanded={sub.length ? isOpen : undefined}
                      aria-controls={sub.length ? panelId : undefined}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '10px',
                        width: '100%',
                        cursor: sub.length ? 'pointer' : 'default',
                        background: 'none',
                        border: 'none',
                        padding: 0,
                        textAlign: 'left',
                      }}
                    >
                      <span aria-hidden="true" style={{
                        fontSize: '1.1rem',
                        color: isOpen ? '#ff8a3d' : '#e8621a',
                        lineHeight: 1.3,
                      }}>{icon}</span>
                      <span style={{
                        fontFamily: 'MozillaText, sans-serif',
                        fontSize: '0.95rem',
                        fontWeight: isOpen ? 700 : 500,
                        color: isOpen ? '#f0ede3' : '#0c3838',
                        letterSpacing: '0.01em',
                      }}>
                        {title}
                      </span>
                    </button>

                    {isOpen && sub.length > 0 && (
                      <ul id={panelId} style={{ marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '4px', paddingLeft: '26px' }}>
                        {sub.map(item => (
                          <li key={item} style={{
                            fontFamily: 'MozillaText, sans-serif',
                            fontSize: '0.8rem',
                            fontWeight: 300,
                            color: 'rgba(240,237,227,0.85)',
                          }}>
                            {item}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
