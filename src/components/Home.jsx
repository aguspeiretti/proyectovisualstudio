import Reveal from './Reveal';

export default function Home() {
  return (
    <section id="home" className="md:min-h-screen pt-14">
      <div className="flex flex-col md:flex-row md:min-h-[calc(100vh-56px)]">

        {/* Panel izquierdo crema */}
        <div className="w-full md:w-[34%] flex flex-col justify-center bg-cream py-[clamp(40px,8vh,80px)] px-[var(--gutter)]">
          <Reveal>
            <p className="font-mozilla text-[0.7rem] font-bold tracking-[0.22em] text-ember mb-[10px]">
              VISUAL STUDIO ®
            </p>

            <h1 className="font-nevanta text-[clamp(2.4rem,6vw,4.2rem)] leading-[1.02] text-forest uppercase mb-[18px]">
              <span className="font-light">¿Listo para la</span>
              <br />
              <span className="font-bold">próxima misión?</span>
            </h1>
          </Reveal>

          <Reveal delay={0.15}>
            <div
              aria-hidden="true"
              className="text-[1.6rem] text-forest mb-[18px] leading-none inline-block animate-gentle-bounce"
            >↙</div>

            <p className="font-mozilla text-[0.88rem] font-normal leading-[1.65] text-forest max-w-[380px]">
              Impulsamos a empresas a construir marcas sólidas mediante estrategia, diseño y comunicación.
            </p>
          </Reveal>
        </div>

        {/* Panel derecho — foto */}
        <div className="w-full md:w-[66%] min-h-[280px] md:min-h-0 bg-pebble relative flex items-center justify-center overflow-hidden">
          <div
            aria-hidden="true"
            className="absolute top-[20%] left-[55%] w-[420px] h-[420px] rounded-full opacity-35 blur-[30px] pointer-events-none animate-[drift_14s_ease-in-out_infinite]"
            style={{ background: 'radial-gradient(circle at 40% 40%, #ff8a3d 0%, #e8621a 45%, transparent 75%)' }}
          />
          <div
            aria-hidden="true"
            className="absolute bottom-[10%] left-[10%] w-[300px] h-[300px] rounded-full opacity-40 blur-[30px] pointer-events-none animate-[drift_18s_ease-in-out_infinite_reverse]"
            style={{ background: 'radial-gradient(circle at 60% 60%, #1a7a6e 0%, transparent 70%)' }}
          />
          <span className="relative z-[1] font-mozilla text-[0.72rem] tracking-[0.22em] uppercase text-forest opacity-30">
            FOTO DEL EQUIPO
          </span>
        </div>
      </div>
    </section>
  );
}
