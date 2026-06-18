import Reveal from './Reveal';

const CATEGORIAS = ['Branding', 'Audiovisual', 'Digital', 'Packaging'];

export default function Portfolio() {
  return (
    <section id="portfolio" className="md:min-h-screen" style={{
      paddingTop: '56px',
      backgroundColor: '#141414',
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* Blob decorativo */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '-10%', right: '-8%',
          width: '500px', height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle at 60% 40%, #1a7a6e 0%, transparent 70%)',
          opacity: 0.3,
          filter: 'blur(40px)',
          animation: 'drift 16s ease-in-out infinite',
          pointerEvents: 'none',
        }}
      />

      <div className="min-h-[400px] md:min-h-[600px]" style={{ position: 'relative', flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '28px', padding: '40px 20px' }}>

        <p style={{
          position: 'absolute', top: '20px', left: '20px',
          fontFamily: 'MozillaText, sans-serif',
          fontSize: '0.72rem', fontWeight: 400,
          color: 'rgba(240,237,227,0.85)',
          letterSpacing: '0.03em',
          zIndex: 10,
        }}>
          *COMPILADO DE TRABAJOS (VIDEO)
        </p>

        {/* Watermark logo */}
        <img
          src="/logo-icon.png"
          alt=""
          style={{
            position: 'absolute',
            top: '50%', left: '50%',
            transform: 'translate(-50%, -65%)',
            width: '200px',
            opacity: 0.15,
            pointerEvents: 'none',
            zIndex: 1,
          }}
        />

        <Reveal>
          <h2 style={{
            fontFamily: 'Nevanta, sans-serif',
            fontSize: 'clamp(2.2rem, 7vw, 5.5rem)',
            fontWeight: 700,
            lineHeight: 1.02,
            textAlign: 'center',
            color: '#f0ede3',
            position: 'relative',
            zIndex: 5,
          }}>
            Nuestro <span style={{ color: '#e8621a' }}>trabajo</span> habla
          </h2>
        </Reveal>

        {/* Play */}
        <Reveal delay={0.15}>
          <button
            aria-label="Reproducir compilado de trabajos"
            className="transition-transform duration-200 hover:scale-110"
            style={{
              position: 'relative', zIndex: 5,
              width: '68px', height: '68px',
              borderRadius: '50%',
              border: '2px solid rgba(240,237,227,0.8)',
              background: 'rgba(240,237,227,0.1)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              backdropFilter: 'blur(6px)',
            }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="#f0ede3" style={{ marginLeft: '4px' }}>
              <path d="M8 5v14l11-7z" />
            </svg>
          </button>
        </Reveal>

        <Reveal delay={0.3}>
          <ul style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center', position: 'relative', zIndex: 5 }}>
            {CATEGORIAS.map(cat => (
              <li key={cat} style={{
                fontFamily: 'MozillaText, sans-serif',
                fontSize: '0.72rem',
                fontWeight: 400,
                letterSpacing: '0.08em',
                color: '#f0ede3',
                border: '1px solid rgba(240,237,227,0.3)',
                borderRadius: '999px',
                padding: '6px 18px',
              }}>
                {cat}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
