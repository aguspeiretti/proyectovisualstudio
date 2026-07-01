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

const CATEGORIAS = ['Todos', ...new Set(VIDEOS.map(v => v.categoria))];

function FilterPill({ label, active, onClick }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-pressed={active}
      className="font-mozilla font-bold uppercase transition-all duration-200"
      style={{
        fontSize: '0.65rem',
        letterSpacing: '0.16em',
        padding: '8px 20px',
        borderRadius: '100px',
        cursor: 'pointer',
        border: active ? '1px solid #e8621a' : '1px solid rgba(255,255,255,0.15)',
        background: active
          ? '#e8621a'
          : hovered
          ? 'rgba(255,255,255,0.1)'
          : 'rgba(255,255,255,0.05)',
        color: active ? '#f0ede3' : 'rgba(240,237,227,0.7)',
        boxShadow: active ? '0 4px 20px rgba(232,98,26,0.35)' : 'none',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        transform: active ? 'scale(1)' : hovered ? 'scale(1.03)' : 'scale(1)',
      }}
    >
      {label}
    </button>
  );
}

function VideoCard({ id, categoria }) {
  const [playing, setPlaying] = useState(false);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative overflow-hidden"
      style={{
        aspectRatio: '9/16',
        borderRadius: '16px',
        border: hovered
          ? '1px solid rgba(255,255,255,0.18)'
          : '1px solid rgba(255,255,255,0.08)',
        borderTop: '1px solid rgba(255,255,255,0.2)',
        background: 'rgba(255,255,255,0.04)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        boxShadow: hovered
          ? '0 20px 56px rgba(0,0,0,0.55)'
          : '0 8px 32px rgba(0,0,0,0.4)',
        transform: hovered && !playing ? 'scale(1.02)' : 'scale(1)',
        transition: 'transform 0.3s cubic-bezier(0.16,1,0.3,1), box-shadow 0.3s ease, border-color 0.3s ease',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {playing ? (
        <iframe
          src={`https://player.vimeo.com/video/${id}?autoplay=1&loop=1&title=0&byline=0&portrait=0&dnt=1`}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none' }}
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          title={`Video ${categoria}`}
        />
      ) : (
        <>
          {/* Thumbnail */}
          <img
            src={`https://vumbnail.com/${id}.jpg`}
            alt={categoria}
            loading="lazy"
            style={{
              position: 'absolute', inset: 0,
              width: '100%', height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.5s cubic-bezier(0.16,1,0.3,1)',
              transform: hovered ? 'scale(1.06)' : 'scale(1)',
            }}
          />

          {/* Gradient overlay */}
          <div style={{
            position: 'absolute', inset: 0,
            background: hovered
              ? 'linear-gradient(to top, rgba(4,16,16,0.9) 0%, rgba(4,16,16,0.3) 50%, transparent 100%)'
              : 'linear-gradient(to top, rgba(4,16,16,0.75) 0%, transparent 60%)',
            transition: 'background 0.3s ease',
          }} />

          {/* Category badge */}
          <div style={{
            position: 'absolute', bottom: 14, left: 14,
            background: 'rgba(232,98,26,0.18)',
            border: '1px solid rgba(232,98,26,0.35)',
            borderRadius: '100px',
            padding: '4px 12px',
          }}>
            <span className="font-mozilla font-bold uppercase"
                  style={{ fontSize: '0.55rem', letterSpacing: '0.18em', color: '#ff8a3d' }}>
              {categoria}
            </span>
          </div>

          {/* Play button */}
          <button
            onClick={() => setPlaying(true)}
            aria-label={`Reproducir video de ${categoria}`}
            style={{
              position: 'absolute', inset: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: 'transparent', border: 'none', cursor: 'pointer',
            }}
          >
            <span style={{
              width: 56, height: 56,
              borderRadius: '50%',
              border: '2px solid rgba(240,237,227,0.85)',
              background: 'rgba(0,0,0,0.45)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              opacity: hovered ? 1 : 0,
              transform: hovered ? 'scale(1)' : 'scale(0.8)',
              transition: 'opacity 0.25s ease, transform 0.25s cubic-bezier(0.16,1,0.3,1)',
              boxShadow: '0 4px 24px rgba(0,0,0,0.4)',
            }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#f0ede3"
                   style={{ marginLeft: 3 }}>
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
  const [activa, setActiva] = useState('Todos');

  const filtrados = activa === 'Todos'
    ? VIDEOS
    : VIDEOS.filter(v => v.categoria === activa);

  return (
    <section
      id="portfolio"
      className="relative overflow-hidden bg-jet"
      style={{ paddingTop: '56px' }}
    >
      {/* Blob teal top-right */}
      <div
        aria-hidden="true"
        className="absolute pointer-events-none"
        style={{
          top: '-8%', right: '-6%',
          width: 520, height: 520,
          borderRadius: '50%',
          opacity: 0.25,
          filter: 'blur(48px)',
          background: 'radial-gradient(circle at 60% 40%, #1a7a6e 0%, transparent 70%)',
          animation: 'drift 18s ease-in-out infinite',
        }}
      />
      {/* Blob ember bottom-left */}
      <div
        aria-hidden="true"
        className="absolute pointer-events-none"
        style={{
          bottom: '-10%', left: '-5%',
          width: 380, height: 380,
          borderRadius: '50%',
          opacity: 0.12,
          filter: 'blur(60px)',
          background: 'radial-gradient(circle at 50% 50%, #e8621a 0%, transparent 70%)',
          animation: 'drift 22s ease-in-out infinite reverse',
        }}
      />

      <div
        className="relative flex flex-col"
        style={{
          zIndex: 1,
          padding: 'clamp(48px,8vh,88px) clamp(24px,5vw,96px)',
          gap: 'clamp(32px,5vh,56px)',
        }}
      >
        {/* ── Header ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between" style={{ gap: 24 }}>
          <Reveal>
            <p className="font-mozilla font-bold uppercase mb-3"
               style={{ fontSize: '0.68rem', letterSpacing: '0.26em', color: '#e8621a' }}>
              Portfolio
            </p>
            <h2 className="font-nevanta font-bold text-cream"
                style={{ fontSize: 'clamp(2.4rem,5.5vw,4.2rem)', lineHeight: 1.04 }}>
              Nuestro <span style={{ color: '#e8621a' }}>trabajo</span><br />habla por sí solo
            </h2>
          </Reveal>

          {/* Filtros */}
          <Reveal delay={0.1}>
            <div className="flex flex-wrap" style={{ gap: 8 }} role="group" aria-label="Filtrar categoría">
              {CATEGORIAS.map(cat => (
                <FilterPill
                  key={cat}
                  label={cat}
                  active={activa === cat}
                  onClick={() => setActiva(cat)}
                />
              ))}
            </div>
          </Reveal>
        </div>

        {/* ── Grilla ── */}
        <div
          className="grid"
          style={{
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(180px, 100%), 1fr))',
            gap: 16,
          }}
        >
          {filtrados.map((video, i) => (
            <Reveal key={video.id} delay={Math.min(i * 0.06, 0.4)}>
              <VideoCard id={video.id} categoria={video.categoria} />
            </Reveal>
          ))}
        </div>

        {filtrados.length === 0 && (
          <p className="font-mozilla font-light text-center"
             style={{ color: 'rgba(240,237,227,0.35)', padding: '80px 0', fontSize: '0.9rem' }}>
            No hay videos en esta categoría.
          </p>
        )}
      </div>
    </section>
  );
}
