import { useState, useEffect, useRef } from 'react';
import Player from '@vimeo/player';
import Reveal from './Reveal';

const MAIN_VIDEO_ID = '1210525399';

const VIDEOS = [
  { id: '1210526978', titulo: 'Loritos' },
  { id: '1210526972', titulo: 'Porque Mevino' },
  { id: '1210526974', titulo: 'Pata de Pulpo' },
  { id: '1210526973', titulo: 'Aenergetic' },
  { id: '1210529777', titulo: 'Pinza Gazuza' },
  { id: '1210529779', titulo: 'Mostaza Bodeguita' },
  { id: '1210529780', titulo: 'Soplete Mevino' },
  { id: '1210529778', titulo: 'Copa en Movimiento' },
  { id: '1210529831', titulo: 'Pasta Ilveneto' },
  { id: '1210529834', titulo: 'Perfumarte' },
  { id: '1210529836', titulo: 'Boxeo Juampi' },
  { id: '1210529838', titulo: 'Fuego Vlue' },
];

const CATEGORIAS = ['Todos', ...new Set(VIDEOS.filter(v => v.categoria).map(v => v.categoria))];

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
      aria-label={`Video ${video.titulo || video.categoria}`}
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
            title={`Video ${video.titulo || video.categoria}`}
          />
        </div>

        {/* Título / categoría */}
        <span
          className="font-mozilla font-bold uppercase"
          style={{
            fontSize: '0.6rem', letterSpacing: '0.2em',
            color: 'rgba(240,237,227,0.5)',
          }}
        >
          {video.titulo || video.categoria}
        </span>
      </div>
    </div>
  );
}

/* ── MainVideo ── */
function MainVideo() {
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const cardRef = useRef(null);
  const iframeRef = useRef(null);
  const playerRef = useRef(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPlaying(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!playing || !iframeRef.current) return;
    const player = new Player(iframeRef.current);
    playerRef.current = player;
    return () => {
      player.destroy();
      playerRef.current = null;
    };
  }, [playing]);

  const handleManualPlay = () => {
    setMuted(false);
    setPlaying(true);
  };

  const toggleMuted = () => {
    const player = playerRef.current;
    if (!player) return;
    const next = !muted;
    player.setMuted(next).then(() => setMuted(next));
  };

  return (
    <div
      ref={cardRef}
      className="relative"
      style={{
        width: 'clamp(260px,88%,940px)',
        aspectRatio: '16/9',
        borderRadius: 20,
        overflow: 'hidden',
        boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
        border: '1px solid rgba(255,255,255,0.1)',
      }}
    >
      {playing ? (
        <>
          <iframe
            ref={iframeRef}
            src={`https://player.vimeo.com/video/${MAIN_VIDEO_ID}?autoplay=1&muted=${muted ? 1 : 0}&loop=1&controls=0&title=0&byline=0&portrait=0`}
            title="Video principal Portfolio"
            allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
            allowFullScreen
            style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
          />
          <button
            onClick={toggleMuted}
            aria-label={muted ? 'Activar sonido' : 'Silenciar'}
            style={{
              position: 'absolute', bottom: 16, right: 16,
              width: 40, height: 40, borderRadius: '50%',
              border: '1px solid rgba(240,237,227,0.5)',
              background: 'rgba(0,0,0,0.4)',
              backdropFilter: 'blur(8px)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer',
              transition: 'transform 0.2s ease, background 0.2s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.08)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}
          >
            {muted ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f0ede3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="#f0ede3" stroke="none" />
                <line x1="23" y1="9" x2="17" y2="15" />
                <line x1="17" y1="9" x2="23" y2="15" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f0ede3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="#f0ede3" stroke="none" />
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
              </svg>
            )}
          </button>
        </>
      ) : (
        <button
          onClick={handleManualPlay}
          aria-label="Reproducir video principal"
          className="relative flex items-center justify-center"
          style={{
            width: '100%', height: '100%',
            border: 'none', padding: 0, cursor: 'pointer',
            backgroundImage: `linear-gradient(rgba(6,26,26,0.25), rgba(6,26,26,0.4)), url(https://vumbnail.com/${MAIN_VIDEO_ID}.jpg)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <span
            style={{
              width: 72, height: 72, borderRadius: '50%',
              border: '2px solid rgba(240,237,227,0.8)',
              background: 'rgba(0,0,0,0.35)',
              backdropFilter: 'blur(8px)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'transform 0.25s cubic-bezier(0.16,1,0.3,1), box-shadow 0.25s ease',
              boxShadow: '0 4px 24px rgba(0,0,0,0.35)',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'scale(1.1)';
              e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.5)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 4px 24px rgba(0,0,0,0.35)';
            }}
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="#f0ede3" style={{ marginLeft: 4 }}>
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        </button>
      )}
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
        alt={video.titulo || video.categoria}
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
      {video.categoria && (
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
      )}

      {/* Play overlay */}
      <button
        onClick={onPlay}
        aria-label={`Ver video ${video.titulo || video.categoria}`}
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
    <section id="portfolio" className="md:min-h-screen pt-14">
      <div className="flex flex-col md:flex-row" style={{ minHeight: 'calc(100vh - 56px)' }}>

        {/* ── Izquierda — Video principal ── */}
        <div
          className="w-full md:w-[65%] relative flex flex-col items-center justify-center overflow-hidden"
          style={{
            minHeight: 320,
            background: 'linear-gradient(150deg, #0c3838 0%, #072424 55%, #061a1a 100%)',
          }}
        >
          {/* Blobs */}
          <div aria-hidden="true" className="absolute pointer-events-none" style={{
            top: '-15%', right: '-10%', width: 420, height: 420, borderRadius: '50%',
            opacity: 0.2, filter: 'blur(50px)',
            background: 'radial-gradient(circle, #1a7a6e 0%, transparent 70%)',
            animation: 'drift 18s ease-in-out infinite',
          }} />
          <div aria-hidden="true" className="absolute pointer-events-none" style={{
            bottom: '-10%', left: '-8%', width: 300, height: 300, borderRadius: '50%',
            opacity: 0.15, filter: 'blur(50px)',
            background: 'radial-gradient(circle, #e8621a 0%, transparent 70%)',
            animation: 'drift 20s ease-in-out infinite reverse',
          }} />

          <Reveal>
            <MainVideo />
          </Reveal>
        </div>

        {/* ── Derecha — Mini grilla ── */}
        <div
          className="w-full md:w-[35%] flex flex-col justify-center bg-cream"
          style={{ padding: 'clamp(48px,8vh,80px) clamp(24px,5vw,72px)' }}
        >
          <Reveal>
            <p className="font-mozilla font-bold uppercase mb-3"
               style={{ fontSize: '0.65rem', letterSpacing: '0.26em', color: '#e8621a' }}>
              Portfolio
            </p>
            <h2 className="font-mozilla font-bold mb-8"
                style={{ fontSize: 'clamp(2rem,3.5vw,3rem)', letterSpacing: '0.02em', color: '#0c3838', lineHeight: 1.1 }}>
              Nuestro <span style={{ color: '#e8621a' }}>trabajo</span> habla por sí solo
            </h2>
          </Reveal>

          {CATEGORIAS.length > 1 && (
            <Reveal delay={0.08}>
              <div className="flex flex-wrap" style={{ gap: 8, marginBottom: 24 }} role="group" aria-label="Filtrar categoría">
                {CATEGORIAS.map(cat => (
                  <FilterPill key={cat} label={cat} active={activa === cat} onClick={() => setActiva(cat)} />
                ))}
              </div>
            </Reveal>
          )}

          <div className="grid grid-cols-3" style={{ gap: 10 }}>
            {filtrados.map((video, i) => (
              <Reveal key={video.id} delay={Math.min(i * 0.05, 0.4)}>
                <VideoCard video={video} onPlay={() => setModalVideo(video)} />
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      {modalVideo && (
        <VideoModal video={modalVideo} onClose={() => setModalVideo(null)} />
      )}
    </section>
  );
}
