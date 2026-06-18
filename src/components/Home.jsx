export default function Home() {
  return (
    <section id="home" style={{ minHeight: '100vh', paddingTop: '56px' }}>
      <div style={{ display: 'flex', maxWidth: '1600px', margin: '0 auto', minHeight: 'calc(100vh - 56px)' }}>

        {/* Panel izquierdo crema */}
        <div style={{
          width: '34%',
          backgroundColor: '#f0ede3',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '48px 36px',
        }}>
          <h1 style={{
            fontFamily: 'Nevanta, sans-serif',
            fontSize: '2.15rem',
            lineHeight: 1.08,
            color: '#0c3838',
            textTransform: 'uppercase',
            marginBottom: '18px',
          }}>
            <span style={{ fontWeight: 300 }}>¿Listo para la</span>
            <br />
            <span style={{ fontWeight: 700 }}>próxima misión?</span>
          </h1>

          <div
            aria-hidden="true"
            style={{
              fontSize: '1.6rem', color: '#0c3838', marginBottom: '18px', lineHeight: 1,
              display: 'inline-block', animation: 'gentle-bounce 2s ease-in-out infinite',
            }}
          >↙</div>

          <p style={{
            fontFamily: 'MozillaText, sans-serif',
            fontSize: '0.88rem',
            fontWeight: 400,
            lineHeight: 1.65,
            color: '#0c3838',
          }}>
            Impulsamos a empresas a construir marcas sólidas mediante estrategia, diseño y comunicación.
          </p>
        </div>

        {/* Panel derecho — foto */}
        <div style={{
          width: '66%',
          backgroundColor: '#d6d3cb',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}>
          <span style={{
            fontFamily: 'MozillaText, sans-serif',
            fontSize: '0.72rem',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: '#0c3838',
            opacity: 0.22,
          }}>
            FOTO DEL EQUIPO
          </span>
        </div>
      </div>
    </section>
  );
}
