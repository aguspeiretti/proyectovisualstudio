export default function Portfolio() {
  return (
    <section id="portfolio" style={{
      minHeight: '100vh',
      paddingTop: '56px',
      backgroundColor: '#141414',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
    }}>
      <div style={{ position: 'relative', flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '600px' }}>

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

        {/* Play */}
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
      </div>
    </section>
  );
}
