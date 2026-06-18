import { useState } from 'react';

const SERVICIOS = [
  { title: 'Estrategia y Consultoría', sub: [] },
  {
    title: 'Branding y Diseño',
    sub: ['Identidad visual', 'Rebranding', 'Manual de marca', 'Diseño editorial', 'Packaging', 'Diseño gráfico', 'Ilustración', 'Murales corporativos', 'Señalética'],
  },
  { title: 'Comunicación Digital', sub: [] },
  { title: 'Producción Audiovisual', sub: [] },
];

export default function Nosotros() {
  const [open, setOpen] = useState('Branding y Diseño');

  return (
    <section id="nosotros" style={{ minHeight: '100vh', paddingTop: '56px' }}>
      <div style={{ display: 'flex', maxWidth: '1600px', margin: '0 auto', minHeight: 'calc(100vh - 56px)' }}>

        {/* Video izquierda */}
        <div style={{
          width: '58%',
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
          <button style={{
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
        <div style={{
          width: '42%',
          backgroundColor: '#f0ede3',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '52px 44px',
        }}>
          <h2 style={{
            fontFamily: 'Nevanta, sans-serif',
            fontSize: '2.5rem',
            fontWeight: 700,
            color: '#1a7a6e',
            letterSpacing: '0.06em',
            marginBottom: '28px',
          }}>
            SERVICIOS
          </h2>

          <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {SERVICIOS.map(({ title, sub }) => {
              const isOpen = open === title;
              return (
                <li key={title}>
                  <button
                    onClick={() => sub.length && setOpen(isOpen ? null : title)}
                    style={{
                      fontFamily: 'MozillaText, sans-serif',
                      fontSize: '1rem',
                      fontWeight: isOpen ? 700 : 400,
                      color: isOpen ? '#0c3838' : '#1a7a6e',
                      letterSpacing: '0.01em',
                      display: 'block',
                      cursor: sub.length ? 'pointer' : 'default',
                      padding: 0,
                      background: 'none',
                      border: 'none',
                      textAlign: 'left',
                    }}
                  >
                    {title}
                  </button>

                  {isOpen && sub.length > 0 && (
                    <ul style={{ marginTop: '6px', display: 'flex', flexDirection: 'column', gap: '3px' }}>
                      {sub.map(item => (
                        <li key={item} style={{
                          fontFamily: 'MozillaText, sans-serif',
                          fontSize: '0.85rem',
                          fontWeight: 300,
                          color: '#0c3838',
                        }}>
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
