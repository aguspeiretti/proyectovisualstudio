export default function Contacto() {
  return (
    <section id="contacto" style={{
      minHeight: '100vh',
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
      <div style={{ flex: 1, display: 'flex', position: 'relative', zIndex: 2 }}>

        {/* Izquierda — datos */}
        <div style={{
          width: '38%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '52px 44px',
        }}>
          <p style={{
            fontFamily: 'MozillaText, sans-serif',
            fontSize: '1.1rem',
            color: '#f0ede3',
            lineHeight: 1.45,
            marginBottom: '32px',
          }}>
            Listo para el salto? <strong style={{ fontWeight: 700 }}>Hablemos!</strong>
          </p>

          <ul style={{ display: 'flex', flexDirection: 'column', gap: '13px' }}>
            {[
              { icon: '◎', text: '@visualstudio.es' },
              { icon: '▣', text: '@visual studio españa' },
              { icon: '✆', text: '+34 617909696 | +34 603218396' },
              { icon: '✉', text: 'somosvisualstudio@gmail.com' },
            ].map(({ icon, text }) => (
              <li key={text} style={{
                display: 'flex', alignItems: 'center', gap: '10px',
                fontFamily: 'MozillaText, sans-serif',
                fontSize: '0.85rem', fontWeight: 300,
                color: '#f0ede3',
              }}>
                <span style={{ fontSize: '0.75rem', opacity: 0.7 }}>{icon}</span>
                {text}
              </li>
            ))}
          </ul>
        </div>

        {/* Derecha — formulario */}
        <div style={{
          width: '62%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '52px 44px',
        }}>
          <form
            onSubmit={e => e.preventDefault()}
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
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
              {[
                { label: 'NOMBRE', type: 'text', placeholder: 'Tu nombre' },
                { label: 'EMAIL', type: 'email', placeholder: 'ejemplo@mail.com' },
              ].map(({ label, type, placeholder }) => (
                <div key={label}>
                  <label style={{
                    fontFamily: 'MozillaText, sans-serif',
                    fontSize: '0.65rem', fontWeight: 400,
                    letterSpacing: '0.18em',
                    color: 'rgba(240,237,227,0.55)',
                    display: 'block', marginBottom: '6px',
                  }}>{label}</label>
                  <input type={type} placeholder={placeholder} style={{
                    width: '100%',
                    background: 'rgba(255,255,255,0.16)',
                    border: 'none', borderRadius: '8px',
                    padding: '10px 14px',
                    fontSize: '0.85rem', fontWeight: 300,
                    color: '#f0ede3',
                    outline: 'none',
                  }} />
                </div>
              ))}
            </div>

            {/* Teléfono */}
            <div style={{ marginBottom: '14px' }}>
              <label style={{
                fontFamily: 'MozillaText, sans-serif',
                fontSize: '0.65rem', fontWeight: 400,
                letterSpacing: '0.18em',
                color: 'rgba(240,237,227,0.55)',
                display: 'block', marginBottom: '6px',
              }}>TELÉFONO</label>
              <input type="tel" placeholder="+34 617909696" style={{
                width: '100%',
                background: 'rgba(255,255,255,0.16)',
                border: 'none', borderRadius: '8px',
                padding: '10px 14px',
                fontSize: '0.85rem', fontWeight: 300,
                color: '#f0ede3',
                outline: 'none',
              }} />
            </div>

            {/* Mensaje */}
            <div style={{ marginBottom: '22px' }}>
              <textarea rows={5} placeholder="¿En qué podemos ayudarte?" style={{
                width: '100%',
                background: 'rgba(255,255,255,0.16)',
                border: 'none', borderRadius: '8px',
                padding: '10px 14px',
                fontSize: '0.85rem', fontWeight: 300,
                color: '#f0ede3',
                outline: 'none', resize: 'none',
              }} />
            </div>

            {/* Botón */}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <button type="submit" style={{
                background: '#f0ede3',
                color: '#0c3838',
                borderRadius: '999px',
                padding: '11px 44px',
                fontFamily: 'MozillaText, sans-serif',
                fontWeight: 700,
                fontSize: '0.75rem',
                letterSpacing: '0.2em',
              }}>
                ENVIAR MENSAJE
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Footer */}
      <div style={{
        position: 'relative', zIndex: 2,
        padding: '14px 28px',
        fontFamily: 'MozillaText, sans-serif',
        fontSize: '0.82rem', fontWeight: 300,
        color: 'rgba(240,237,227,0.4)',
      }}>
        // UniversoVisual
      </div>
    </section>
  );
}
