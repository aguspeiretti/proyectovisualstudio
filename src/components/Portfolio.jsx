import { useState } from 'react';
import Reveal from './Reveal';

const VIDEOS = [
  { id: '1206134514', categoria: 'Gastronomía' },
  { id: '1206134475', categoria: 'Gastronomía' },
  { id: '1206134892', categoria: 'Coctelería' },
  { id: '1206134935', categoria: 'Coctelería' },
  { id: '1206134831', categoria: 'Gastronomía' },
  { id: '1206134778', categoria: 'Gastronomía' },
  { id: '1206134705', categoria: 'Gastronomía' },
  { id: '1206134662', categoria: 'Coctelería' },
  { id: '1206134626', categoria: 'Gastronomía' },
  { id: '1206134588', categoria: 'Gastronomía' },
  { id: '1206134553', categoria: 'Gastronomía' },
];

function VideoCard({ id, categoria }) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="relative rounded-[12px] overflow-hidden aspect-[9/16] bg-white/[0.04] border border-white/[0.08] group">
      {playing ? (
        <iframe
          src={`https://player.vimeo.com/video/${id}?autoplay=1&loop=1&title=0&byline=0&portrait=0&dnt=1`}
          className="absolute inset-0 w-full h-full"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          title={categoria}
        />
      ) : (
        <>
          <img
            src={`https://vumbnail.com/${id}.jpg`}
            alt={categoria}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          {/* Overlay oscuro */}
          <div className="absolute inset-0 bg-jet/30 group-hover:bg-jet/50 transition-colors duration-300" />

          {/* Etiqueta categoría */}
          <span className="absolute bottom-3 left-4 font-mozilla text-[0.62rem] tracking-[0.14em] text-cream/80 uppercase">
            {categoria}
          </span>

          {/* Botón play */}
          <button
            onClick={() => setPlaying(true)}
            aria-label={`Reproducir video de ${categoria}`}
            className="absolute inset-0 w-full h-full flex items-center justify-center"
          >
            <span className="w-[54px] h-[54px] rounded-full border-2 border-cream/80 bg-jet/40 flex items-center justify-center backdrop-blur-[4px] opacity-0 group-hover:opacity-100 transition-all duration-300 scale-90 group-hover:scale-100">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-cream ml-[3px]">
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
          </button>
        </>
      )}
    </div>
  );
}

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

      <div className="relative flex flex-1 flex-col gap-10 py-[clamp(40px,8vh,80px)] px-[var(--gutter)]">

        {/* Header */}
        <Reveal>
          <h2 className="font-nevanta text-[clamp(2.2rem,6vw,4.5rem)] font-bold leading-[1.02] text-cream">
            Nuestro <span className="text-ember">trabajo</span><br />habla
          </h2>
        </Reveal>

        {/* Grilla */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-[14px]">
          {VIDEOS.map((video, i) => (
            <Reveal key={video.id} delay={i * 0.07}>
              <VideoCard id={video.id} categoria={video.categoria} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
