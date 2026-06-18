import { useState } from 'react';
import Reveal from './Reveal';

const inputStyle = {
  width: '100%',
  background: 'rgba(255,255,255,0.16)',
  border: 'none', borderRadius: '8px',
  padding: '10px 14px',
  fontSize: '0.85rem', fontWeight: 300,
  color: '#f0ede3',
  outline: 'none',
  transition: 'background 0.2s ease',
};

const labelStyle = {
  fontFamily: 'MozillaText, sans-serif',
  fontSize: '0.65rem', fontWeight: 400,
  letterSpacing: '0.18em',
  color: 'rgba(240,237,227,0.62)',
  display: 'block', marginBottom: '6px',
};

export default function Contacto() {
  const [status, setStatus] = useState('idle');

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('sent');
  };

  return (
    <section id="contacto" className="md:min-h-screen" style={{
      paddingTop: '56px',
      backgroundImage: 'url(/fondo.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
    }}>

      {/* Eclipse naranja esquina inferior izquierda */}
      <div style={{
        position: 'absolute',
        bottom: '-180px', left: '-180px',
        width: '480px', height: '480px',
        borderRadius: '50%',
        background: 'radial-gradient(circle at 62% 38%, transparent 58%, #ff8a3d 64%, #e8621a 68%, #7a2c00 74%, transparent 78%)',
        boxShadow: '0 0 60px 10px rgba(232, 98, 26, 0.25)',
        pointerEvents: 'none',
      }} />

      {/* Contenido principal */}
      <div className="flex flex-col md:flex-row" style={{ flex: 1, width: '100%', position: 'relative', zIndex: 2 }}>

        {/* Izquierda — datos */}
        <div className="w-full md:w-[38%]" style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: 'clamp(40px, 8vh, 80px) var(--gutter)',
        }}>
          <Reveal>
            <h2 style={{
              fontFamily: 'Nevanta, sans-serif',
              fontSize: 'clamp(1.8rem, 4vw, 2.6rem)',
              fontWeight: 700,
              color: '#f0ede3',
              lineHeight: 1.1,
              textTransform: 'uppercase',
              marginBottom: '32px',
            }}>
              ¿Listo para<br />el salto? <span style={{ color: '#e8621a' }}>Hablemos!</span>
            </h2>
          </Reveal>

          <Reveal delay={0.15}>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {[
                { icon: '◎', text: '@visualstudio.es' },
                { icon: '▣', text: '@visual studio españa' },
                { icon: '✆', text: '+34 617909696 | +34 603218396' },
                { icon: '✉', text: 'somosvisualstudio@gmail.com' },
              ].map(({ icon, text }) => (
                <li key={text} style={{
                  display: 'flex', alignItems: 'center', gap: '12px',
                  fontFamily: 'MozillaText, sans-serif',
                  fontSize: '0.85rem', fontWeight: 300,
                  color: '#f0ede3',
                }}>
                  <span aria-hidden="true" style={{
                    width: '30px', height: '30px',
                    borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                    background: 'rgba(232,98,26,0.18)',
                    color: '#ff8a3d',
                    fontSize: '0.85rem',
                  }}>{icon}</span>
                  {text}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* Derecha — formulario */}
        <div className="w-full md:w-[62%]" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 'clamp(40px, 8vh, 80px) var(--gutter)',
        }}>
          <form
            onSubmit={handleSubmit}
            style={{
              width: '100%',
              maxWidth: '500px',
              background: 'rgba(20, 85, 76, 0.5)',
              backdropFilter: 'blur(14px)',
              WebkitBackdropFilter: 'blur(14px)',
              borderRadius: '14px',
              padding: '28px 28px 32px',
              border: '1px solid rgba(240,237,227,0.09)',
            }}
          >
            {/* Fila nombre + email */}
            <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: '14px', marginBottom: '14px' }}>
              {[
                { id: 'contacto-nombre', label: 'NOMBRE', type: 'text', placeholder: 'Tu nombre' },
                { id: 'contacto-email', label: 'EMAIL', type: 'email', placeholder: 'ejemplo@mail.com' },
              ].map(({ id, label, type, placeholder }) => (
                <div key={id}>
                  <label htmlFor={id} style={labelStyle}>{label}</label>
                  <input
                    id={id}
                    name={id}
                    type={type}
                    required
                    placeholder={placeholder}
                    className="focus:bg-white/25"
                    style={inputStyle}
                  />
                </div>
              ))}
            </div>

            {/* Teléfono */}
            <div style={{ marginBottom: '14px' }}>
              <label htmlFor="contacto-telefono" style={labelStyle}>TELÉFONO</label>
              <input
                id="contacto-telefono"
                name="contacto-telefono"
                type="tel"
                placeholder="+34 617909696"
                className="focus:bg-white/25"
                style={inputStyle}
              />
            </div>

            {/* Mensaje */}
            <div style={{ marginBottom: '22px' }}>
              <label htmlFor="contacto-mensaje" style={labelStyle}>MENSAJE</label>
              <textarea
                id="contacto-mensaje"
                name="contacto-mensaje"
                rows={5}
                required
                placeholder="¿En qué podemos ayudarte?"
                className="focus:bg-white/25"
                style={{ ...inputStyle, resize: 'none' }}
              />
            </div>

            {/* Botón */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
              <button
                type="submit"
                disabled={status === 'sent'}
                className="transition-transform duration-200 hover:scale-105 disabled:cursor-default disabled:opacity-70 disabled:hover:scale-100"
                style={{
                  background: '#f0ede3',
                  color: '#0c3838',
                  borderRadius: '999px',
                  padding: '11px 44px',
                  fontFamily: 'MozillaText, sans-serif',
                  fontWeight: 700,
                  fontSize: '0.75rem',
                  letterSpacing: '0.2em',
                }}>
                {status === 'sent' ? 'MENSAJE ENVIADO ✓' : 'ENVIAR MENSAJE'}
              </button>
              {status === 'sent' && (
                <p role="status" style={{
                  fontFamily: 'MozillaText, sans-serif',
                  fontSize: '0.75rem', fontWeight: 300,
                  color: '#f0ede3',
                }}>
                  ¡Gracias! Te responderemos a la brevedad.
                </p>
              )}
            </div>
          </form>
        </div>
      </div>

      {/* Footer */}
      <div style={{
        position: 'relative', zIndex: 2,
        width: '100%',
        padding: '14px var(--gutter)',
        fontFamily: 'MozillaText, sans-serif',
        fontSize: '0.82rem', fontWeight: 300,
        color: 'rgba(240,237,227,0.62)',
      }}>
        // UniversoVisual
      </div>
    </section>
  );
}
