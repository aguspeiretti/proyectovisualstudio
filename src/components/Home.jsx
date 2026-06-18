import Reveal from './Reveal';

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
          <Reveal>
            <p style={{
              fontFamily: 'MozillaText, sans-serif',
              fontSize: '0.7rem',
              fontWeight: 700,
              letterSpacing: '0.22em',
              color: '#e8621a',
              marginBottom: '10px',
            }}>
              VISUAL STUDIO ®
            </p>

            <h1 style={{
              fontFamily: 'Nevanta, sans-serif',
              fontSize: 'clamp(2.4rem, 6vw, 4.2rem)',
              lineHeight: 1.02,
              color: '#0c3838',
              textTransform: 'uppercase',
              marginBottom: '18px',
            }}>
              <span style={{ fontWeight: 300 }}>¿Listo para la</span>
              <br />
              <span style={{ fontWeight: 700 }}>próxima misión?</span>
            </h1>
          </Reveal>

          <Reveal delay={0.15}>
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
              maxWidth: '380px',
            }}>
              Impulsamos a empresas a construir marcas sólidas mediante estrategia, diseño y comunicación.
            </p>
          </Reveal>
        </div>

        {/* Panel derecho — foto */}
        <div className="w-full md:w-[66%] min-h-[280px] md:min-h-0" style={{
          backgroundColor: '#d6d3cb',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}>
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: '20%', left: '55%',
              width: '420px', height: '420px',
              borderRadius: '50%',
              background: 'radial-gradient(circle at 40% 40%, #ff8a3d 0%, #e8621a 45%, transparent 75%)',
              opacity: 0.35,
              filter: 'blur(30px)',
              animation: 'drift 14s ease-in-out infinite',
              pointerEvents: 'none',
            }}
          />
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              bottom: '10%', left: '10%',
              width: '300px', height: '300px',
              borderRadius: '50%',
              background: 'radial-gradient(circle at 60% 60%, #1a7a6e 0%, transparent 70%)',
              opacity: 0.4,
              filter: 'blur(30px)',
              animation: 'drift 18s ease-in-out infinite reverse',
              pointerEvents: 'none',
            }}
          />
          <span style={{
            position: 'relative', zIndex: 1,
            fontFamily: 'MozillaText, sans-serif',
            fontSize: '0.72rem',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: '#0c3838',
            opacity: 0.3,
          }}>
            FOTO DEL EQUIPO
          </span>
        </div>
      </div>
    </section>
  );
}
