export default function Home() {
  return (
    <section id="home" className="md:min-h-screen" style={{ paddingTop: '56px' }}>
      <div className="flex flex-col md:flex-row md:min-h-[calc(100vh-56px)]" style={{ maxWidth: '1600px', margin: '0 auto' }}>

        {/* Panel izquierdo crema */}
        <div className="w-full md:w-[34%] px-6 py-12 md:px-9" style={{
          backgroundColor: '#f0ede3',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
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
        <div className="w-full md:w-[66%] min-h-[280px] md:min-h-0" style={{
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
