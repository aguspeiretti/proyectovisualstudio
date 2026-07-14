import { useState, useEffect } from 'react';
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

/* ── Modal ── */
function VideoModal({ video, onClose }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 200,
        background: 'rgba(4,20,20,0.92)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '24px',
      }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Video de ${video.categoria}`}
    >
      <div
        style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}
        onClick={e => e.stopPropagation()}
      >
        {/* Cerrar */}
        <button
          onClick={onClose}
          aria-label="Cerrar video"
          style={{
            alignSelf: 'flex-end',
            background: 'rgba(255,255,255,0.1)',
            border: '1px solid rgba(255,255,255,0.18)',
            borderRadius: '50%',
            width: 36, height: 36,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', color: '#f0ede3',
            backdropFilter: 'blur(8px)',
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>

        {/* Iframe portrait */}
        <div style={{
          width: 'min(90vw, calc(80vh * 9 / 16))',
          aspectRatio: '9/16',
          maxHeight: '80vh',
          borderRadius: 16,
          overflow: 'hidden',
          boxShadow: '0 32px 80px rgba(0,0,0,0.6)',
          border: '1px solid rgba(255,255,255,0.1)',
          position: 'relative',
        }}>
          <iframe
            src={`https://player.vimeo.com/video/${video.id}?autoplay=1&loop=1&title=0&byline=0&portrait=0&dnt=1`}
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none' }}
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            title={`Video ${video.categoria}`}
          />
        </div>

        {/* Categoría */}
        <span
          className="font-mozilla font-bold uppercase"
          style={{
            fontSize: '0.6rem', letterSpacing: '0.2em',
            color: 'rgba(240,237,227,0.5)',
          }}
        >
          {video.categoria}
        </span>
      </div>
    </div>
  );
}

/* ── FilterPill ── */
function FilterPill({ label, active, onClick }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-pressed={active}
      className="font-mozilla font-bold uppercase"
      style={{
        fontSize: '0.65rem', letterSpacing: '0.16em',
        padding: '8px 20px', borderRadius: '100px',
        cursor: 'pointer', transition: 'all 0.2s cubic-bezier(0.16,1,0.3,1)',
        border: active ? '1px solid #e8621a' : '1px solid rgba(255,255,255,0.18)',
        background: active ? '#e8621a' : hovered ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.05)',
        color: active ? '#f0ede3' : 'rgba(240,237,227,0.7)',
        boxShadow: active ? '0 4px 20px rgba(232,98,26,0.35)' : 'none',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        transform: hovered && !active ? 'scale(1.03)' : 'scale(1)',
      }}
    >
      {label}
    </button>
  );
}

/* ── VideoCard ── */
function VideoCard({ video, onPlay }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{
        aspectRatio: '9/16', borderRadius: 16, overflow: 'hidden', position: 'relative',
        border: hovered ? '1px solid rgba(255,255,255,0.2)' : '1px solid rgba(255,255,255,0.09)',
        borderTop: '1px solid rgba(255,255,255,0.22)',
        background: 'rgba(255,255,255,0.04)',
        backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)',
        boxShadow: hovered ? '0 24px 60px rgba(0,0,0,0.55)' : '0 8px 28px rgba(0,0,0,0.35)',
        transform: hovered ? 'scale(1.025)' : 'scale(1)',
        transition: 'transform 0.35s cubic-bezier(0.16,1,0.3,1), box-shadow 0.35s ease, border-color 0.25s ease',
        cursor: 'pointer',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Thumbnail */}
      <img
        src={`https://vumbnail.com/${video.id}.jpg`}
        alt={video.categoria}
        loading="lazy"
        style={{
          position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover',
          transform: hovered ? 'scale(1.07)' : 'scale(1)',
          transition: 'transform 0.5s cubic-bezier(0.16,1,0.3,1)',
        }}
      />

      {/* Gradient */}
      <div style={{
        position: 'absolute', inset: 0,
        background: hovered
          ? 'linear-gradient(to top, rgba(6,24,24,0.92) 0%, rgba(6,24,24,0.3) 55%, transparent 100%)'
          : 'linear-gradient(to top, rgba(6,24,24,0.78) 0%, transparent 55%)',
        transition: 'background 0.3s ease',
      }} />

      {/* Badge */}
      <div style={{
        position: 'absolute', bottom: 14, left: 14,
        background: 'rgba(232,98,26,0.16)',
        border: '1px solid rgba(232,98,26,0.32)',
        borderRadius: 100, padding: '4px 12px',
      }}>
        <span className="font-mozilla font-bold uppercase"
              style={{ fontSize: '0.52rem', letterSpacing: '0.18em', color: '#ff8a3d' }}>
          {video.categoria}
        </span>
      </div>

      {/* Play overlay */}
      <button
        onClick={onPlay}
        aria-label={`Ver video de ${video.categoria}`}
        style={{
          position: 'absolute', inset: 0, width: '100%', height: '100%',
          background: 'transparent', border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
      >
        <span style={{
          width: 54, height: 54, borderRadius: '50%',
          border: '2px solid rgba(240,237,227,0.88)',
          background: 'rgba(4,16,16,0.5)',
          backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 4px 24px rgba(0,0,0,0.5)',
          opacity: hovered ? 1 : 0,
          transform: hovered ? 'scale(1)' : 'scale(0.75)',
          transition: 'opacity 0.25s ease, transform 0.3s cubic-bezier(0.16,1,0.3,1)',
        }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="#f0ede3" style={{ marginLeft: 3 }}>
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
      </button>
    </div>
  );
}

/* ── Portfolio ── */
export default function Portfolio() {
  const [activa, setActiva] = useState('Todos');
  const [modalVideo, setModalVideo] = useState(null);

  const filtrados = activa === 'Todos'
    ? VIDEOS
    : VIDEOS.filter(v => v.categoria === activa);

  return (
    <section
      id="portfolio"
      className="relative overflow-hidden"
      style={{
        paddingTop: '56px',
        background: 'linear-gradient(160deg, #0c3838 0%, #072020 55%, #061818 100%)',
      }}
    >
      {/* Blob teal */}
      <div aria-hidden="true" className="absolute pointer-events-none" style={{
        top: '-10%', right: '-5%', width: 500, height: 500, borderRadius: '50%',
        opacity: 0.22, filter: 'blur(50px)',
        background: 'radial-gradient(circle, #1a7a6e 0%, transparent 70%)',
        animation: 'drift 18s ease-in-out infinite',
      }} />
      {/* Blob ember */}
      <div aria-hidden="true" className="absolute pointer-events-none" style={{
        bottom: '-8%', left: '-4%', width: 340, height: 340, borderRadius: '50%',
        opacity: 0.1, filter: 'blur(60px)',
        background: 'radial-gradient(circle, #e8621a 0%, transparent 70%)',
        animation: 'drift 24s ease-in-out infinite reverse',
      }} />

      <div
        className="relative flex flex-col"
        style={{ zIndex: 1, padding: 'clamp(48px,8vh,88px) clamp(24px,5vw,96px)', gap: 'clamp(36px,5vh,60px)' }}
      >
        {/* Header */}
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

          <Reveal delay={0.1}>
            <div className="flex flex-wrap" style={{ gap: 8 }} role="group" aria-label="Filtrar categoría">
              {CATEGORIAS.map(cat => (
                <FilterPill key={cat} label={cat} active={activa === cat} onClick={() => setActiva(cat)} />
              ))}
            </div>
          </Reveal>
        </div>

        {/* Grilla — 5 columnas */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5" style={{ gap: 18 }}>
          {filtrados.map((video, i) => (
            <Reveal key={video.id} delay={Math.min(i * 0.06, 0.42)}>
              <VideoCard video={video} onPlay={() => setModalVideo(video)} />
            </Reveal>
          ))}
        </div>
      </div>

      {/* Modal */}
      {modalVideo && (
        <VideoModal video={modalVideo} onClose={() => setModalVideo(null)} />
      )}
    </section>
  );
}
