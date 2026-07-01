import { useState } from 'react';
import Reveal from './Reveal';

// Reemplazá los vimeoId con los IDs reales de tus videos de Vimeo
const VIDEOS = [
  { id: 1, vimeoId: 'PLACEHOLDER_1', titulo: 'Video 1', categoria: 'Gastronomía' },
  { id: 2, vimeoId: 'PLACEHOLDER_2', titulo: 'Video 2', categoria: 'Branding' },
  { id: 3, vimeoId: 'PLACEHOLDER_3', titulo: 'Video 3', categoria: 'Lifestyle' },
  { id: 4, vimeoId: 'PLACEHOLDER_4', titulo: 'Video 4', categoria: 'Gastronomía' },
  { id: 5, vimeoId: 'PLACEHOLDER_5', titulo: 'Video 5', categoria: 'Reel' },
  { id: 6, vimeoId: 'PLACEHOLDER_6', titulo: 'Video 6', categoria: 'Branding' },
  { id: 7, vimeoId: 'PLACEHOLDER_7', titulo: 'Video 7', categoria: 'Lifestyle' },
  { id: 8, vimeoId: 'PLACEHOLDER_8', titulo: 'Video 8', categoria: 'Gastronomía' },
  { id: 9, vimeoId: 'PLACEHOLDER_9', titulo: 'Video 9', categoria: 'Reel' },
];

const CATEGORIAS = ['Todos', ...new Set(VIDEOS.map(v => v.categoria))];

function VideoCard({ vimeoId, titulo, categoria }) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="relative rounded-[12px] overflow-hidden bg-white/[0.04] border border-white/[0.08] aspect-video group">
      {playing ? (
        <iframe
          src={`https://player.vimeo.com/video/${vimeoId}?autoplay=1&title=0&byline=0&portrait=0`}
          className="absolute inset-0 w-full h-full"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          title={titulo}
        />
      ) : (
        <>
          <iframe
            src={`https://player.vimeo.com/video/${vimeoId}?background=1&autoplay=1&loop=1&byline=0&title=0&muted=1`}
            className="absolute inset-0 w-full h-full pointer-events-none"
            allow="autoplay"
            title=""
            aria-hidden="true"
          />
          {/* Overlay con info y botón play */}
          <div className="absolute inset-0 bg-jet/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
            <span className="font-mozilla text-[0.62rem] tracking-[0.14em] text-ember uppercase mb-1">
              {categoria}
            </span>
            <p className="font-mozilla text-[0.82rem] font-light text-cream leading-snug">
              {titulo}
            </p>
          </div>
          <button
            onClick={() => setPlaying(true)}
            aria-label={`Reproducir ${titulo}`}
            className="absolute inset-0 w-full h-full flex items-center justify-center"
          >
            <span className="w-[52px] h-[52px] rounded-full border-2 border-cream/80 bg-jet/50 flex items-center justify-center backdrop-blur-[4px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:scale-110 transform">
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
  const [categoriaActiva, setCategoriaActiva] = useState('Todos');

  const videosFiltrados = categoriaActiva === 'Todos'
    ? VIDEOS
    : VIDEOS.filter(v => v.categoria === categoriaActiva);

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
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <Reveal>
            <h2 className="font-nevanta text-[clamp(2.2rem,6vw,4.5rem)] font-bold leading-[1.02] text-cream">
              Nuestro <span className="text-ember">trabajo</span><br />habla
            </h2>
          </Reveal>

          {/* Filtros */}
          <Reveal delay={0.1}>
            <ul className="flex flex-wrap gap-[8px]" role="list" aria-label="Filtrar por categoría">
              {CATEGORIAS.map(cat => {
                const isActive = categoriaActiva === cat;
                return (
                  <li key={cat}>
                    <button
                      onClick={() => setCategoriaActiva(cat)}
                      aria-pressed={isActive}
                      className={[
                        'font-mozilla text-[0.72rem] tracking-[0.08em] rounded-full px-[16px] py-[7px] transition-all duration-200',
                        isActive
                          ? 'bg-ember text-cream border border-ember'
                          : 'text-cream/70 border border-cream/25 hover:border-cream/60 hover:text-cream',
                      ].join(' ')}
                    >
                      {cat}
                    </button>
                  </li>
                );
              })}
            </ul>
          </Reveal>
        </div>

        {/* Grilla de videos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[14px]">
          {videosFiltrados.map((video, i) => (
            <Reveal key={video.id} delay={i * 0.05}>
              <VideoCard
                vimeoId={video.vimeoId}
                titulo={video.titulo}
                categoria={video.categoria}
              />
            </Reveal>
          ))}
        </div>

        {videosFiltrados.length === 0 && (
          <p className="font-mozilla text-cream/40 text-center py-20">No hay videos en esta categoría.</p>
        )}
      </div>
    </section>
  );
}
