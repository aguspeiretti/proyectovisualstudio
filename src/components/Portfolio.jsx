import Reveal from './Reveal';

const CATEGORIAS = ['Branding', 'Audiovisual', 'Digital', 'Packaging'];

export default function Portfolio() {
  return (
    <section
      id="portfolio"
      className="md:min-h-screen pt-14 bg-jet relative overflow-hidden flex flex-col"
    >
      {/* Blob decorativo */}
      <div
        aria-hidden="true"
        className="absolute -top-[10%] -right-[8%] w-[500px] h-[500px] rounded-full opacity-30 blur-[40px] pointer-events-none animate-[drift_16s_ease-in-out_infinite]"
        style={{ background: 'radial-gradient(circle at 60% 40%, #1a7a6e 0%, transparent 70%)' }}
      />

      <div className="min-h-[400px] md:min-h-[600px] relative flex flex-1 flex-col items-center justify-center gap-7 py-[clamp(40px,8vh,80px)] px-[var(--gutter)]">

        <p className="absolute top-5 left-[var(--gutter)] font-mozilla text-[0.72rem] font-normal text-cream/85 tracking-[0.03em] z-10">
          *COMPILADO DE TRABAJOS (VIDEO)
        </p>

        {/* Watermark logo */}
        <img
          src="/logo-icon.png"
          alt=""
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[65%] w-[200px] opacity-15 pointer-events-none z-[1]"
        />

        <Reveal>
          <h2 className="font-nevanta text-[clamp(2.2rem,7vw,5.5rem)] font-bold leading-[1.02] text-center text-cream relative z-[5]">
            Nuestro <span className="text-ember">trabajo</span> habla
          </h2>
        </Reveal>

        <Reveal delay={0.15}>
          <button
            aria-label="Reproducir compilado de trabajos"
            className="relative z-[5] w-[68px] h-[68px] rounded-full border-2 border-cream/80 bg-cream/10 flex items-center justify-center backdrop-blur-[6px] transition-transform duration-200 hover:scale-110"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" className="text-cream ml-[4px]">
              <path d="M8 5v14l11-7z" />
            </svg>
          </button>
        </Reveal>

        <Reveal delay={0.3}>
          <ul className="flex flex-wrap gap-[10px] justify-center relative z-[5]">
            {CATEGORIAS.map(cat => (
              <li
                key={cat}
                className="font-mozilla text-[0.72rem] font-normal tracking-[0.08em] text-cream border border-cream/30 rounded-full px-[18px] py-[6px]"
              >
                {cat}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
