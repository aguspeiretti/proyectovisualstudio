import { useEffect, useRef, useState } from 'react';
import Player from '@vimeo/player';
import Reveal from './Reveal';

const VIMEO_ID = '1209854511';
const VIMEO_THUMBNAIL = 'https://i.vimeocdn.com/video/2179566729-495fed72a85e35a5e79722f1435e667d1e66ff1de80b716dd0e183e073e3d67a-d_1280?region=us';

const SERVICIOS = [
  {
    title: 'Estrategia y Consultoría',
    quote: 'No sabemos cómo comunicar lo que hacemos.',
    sub: ['Auditorías de marca', 'Posicionamiento', 'Propuesta de valor', 'Estrategia de comunicación'],
  },
  {
    title: 'Branding y Diseño',
    quote: 'Nuestra imagen no refleja quiénes somos.',
    sub: ['Identidad visual', 'Rebranding', 'Manual de marca', 'Diseño editorial', 'Packaging', 'Diseño gráfico', 'Ilustración', 'Murales corporativos', 'Señalética'],
  },
  {
    title: 'Comunicación Digital',
    quote: 'Tenemos presencia digital pero no una estrategia correcta.',
    sub: ['Estrategia digital', 'Gestión de redes', 'Campañas', 'Copywriting', 'LinkedIn corporativo'],
  },
  {
    title: 'Producción Audiovisual',
    quote: 'Necesitamos mostrar nuestro valor de forma profesional.',
    sub: ['Fotografía corporativa', 'Fotografía gastronómica', 'Fotografía de producto', 'Videos corporativos', 'Campañas publicitarias', 'Cobertura de eventos', 'Manuales de uso', 'Formación interna y externa', 'Entrevistas', 'Testimoniales'],
  },
  {
    title: 'Experiencia Digital',
    quote: 'Nuestro negocio necesita presencia en la web.',
    sub: ['Diseño web', 'Landing pages', 'Ecommerce'],
  },
];

export default function Nosotros() {
  const [open, setOpen] = useState('Branding y Diseño');
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const videoCardRef = useRef(null);
  const iframeRef = useRef(null);
  const playerRef = useRef(null);

  useEffect(() => {
    const el = videoCardRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPlaying(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
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

  const handleFullscreen = () => {
    const player = playerRef.current;
    if (player) player.requestFullscreen();
  };

  return (
    <section id="nosotros" className="md:min-h-screen pt-14">
      <div className="flex flex-col md:flex-row" style={{ minHeight: 'calc(100vh - 56px)' }}>

        {/* ── Izquierda — Video ── */}
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
            animation: 'drift 16s ease-in-out infinite',
          }} />
          <div aria-hidden="true" className="absolute pointer-events-none" style={{
            bottom: '-10%', left: '-8%', width: 300, height: 300, borderRadius: '50%',
            opacity: 0.15, filter: 'blur(50px)',
            background: 'radial-gradient(circle, #e8621a 0%, transparent 70%)',
            animation: 'drift 20s ease-in-out infinite reverse',
          }} />

          {/* Video card */}
          <div
            ref={videoCardRef}
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
                  src={`https://player.vimeo.com/video/${VIMEO_ID}?autoplay=1&muted=${muted ? 1 : 0}&loop=1&controls=0&title=0&byline=0&portrait=0`}
                  title="Presentación Nosotros"
                  allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                  allowFullScreen
                  style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
                />
                <div
                  onClick={handleFullscreen}
                  role="button"
                  tabIndex={0}
                  aria-label="Ver en pantalla completa"
                  onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') handleFullscreen(); }}
                  style={{ position: 'absolute', inset: 0, cursor: 'pointer', zIndex: 1 }}
                />
                <button
                  onClick={e => { e.stopPropagation(); toggleMuted(); }}
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
                    zIndex: 2,
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
                aria-label="Reproducir video de presentación"
                className="relative flex items-center justify-center"
                style={{
                  width: '100%', height: '100%',
                  border: 'none', padding: 0, cursor: 'pointer',
                  backgroundImage: `linear-gradient(rgba(6,26,26,0.25), rgba(6,26,26,0.4)), url(${VIMEO_THUMBNAIL})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                <span
                  style={{
                    width: 64, height: 64, borderRadius: '50%',
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
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="#f0ede3" style={{ marginLeft: 4 }}>
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
              </button>
            )}
          </div>
        </div>

        {/* ── Derecha — Servicios ── */}
        <div
          className="w-full md:w-[35%] flex flex-col justify-center bg-cream"
          style={{ padding: 'clamp(48px,8vh,80px) clamp(24px,5vw,72px)' }}
        >
          <Reveal>
            <p
              className="font-mozilla font-bold uppercase mb-3"
              style={{ fontSize: '0.65rem', letterSpacing: '0.26em', color: '#e8621a' }}
            >
              Lo que hacemos
            </p>
            <h2
              className="font-mozilla font-bold mb-10"
              style={{ fontSize: 'clamp(2rem,3.5vw,3rem)', letterSpacing: '0.04em', color: '#0c3838', lineHeight: 1.1 }}
            >
              SERVICIOS
            </h2>
          </Reveal>

          <ul className="flex flex-col" style={{ gap: 0 }}>
            {SERVICIOS.map(({ title, quote, sub }, i) => {
              const isOpen = open === title;
              const hasChildren = sub.length > 0;
              const panelId = `srv-${title.replace(/\s+/g, '-')}`;

              return (
                <Reveal key={title} delay={i * 0.07}>
                  <li style={{ borderBottom: '1px solid rgba(12,56,56,0.1)' }}>
                    <button
                      onClick={() => hasChildren && setOpen(isOpen ? null : title)}
                      aria-expanded={hasChildren ? isOpen : undefined}
                      aria-controls={hasChildren ? panelId : undefined}
                      className="w-full flex items-center justify-between text-left font-mozilla"
                      style={{
                        background: 'transparent', border: 'none',
                        padding: '18px 0',
                        cursor: hasChildren ? 'pointer' : 'default',
                        transition: 'opacity 0.2s',
                      }}
                      onMouseEnter={e => { if (hasChildren && !isOpen) e.currentTarget.style.opacity = 0.7; }}
                      onMouseLeave={e => { e.currentTarget.style.opacity = 1; }}
                    >
                      <span style={{
                        fontSize: '1rem',
                        fontWeight: isOpen ? 700 : 400,
                        letterSpacing: '0.01em',
                        color: isOpen ? '#0c3838' : '#156b60',
                        transition: 'color 0.2s, font-weight 0.2s',
                      }}>
                        {title}
                      </span>
                      {hasChildren && (
                        <span style={{
                          width: 24, height: 24,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          borderRadius: '50%',
                          background: isOpen ? '#0c3838' : 'rgba(12,56,56,0.1)',
                          transition: 'background 0.25s ease, transform 0.25s ease',
                          transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                          flexShrink: 0,
                        }}>
                          <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                            <line x1="6" y1="1" x2="6" y2="11" stroke={isOpen ? '#f0ede3' : '#0c3838'} strokeWidth="1.8" strokeLinecap="round"/>
                            <line x1="1" y1="6" x2="11" y2="6" stroke={isOpen ? '#f0ede3' : '#0c3838'} strokeWidth="1.8" strokeLinecap="round"/>
                          </svg>
                        </span>
                      )}
                    </button>

                    {/* Sub-items */}
                    {hasChildren && (
                      <div
                        id={panelId}
                        style={{
                          overflow: 'hidden',
                          maxHeight: isOpen ? 640 : 0,
                          opacity: isOpen ? 1 : 0,
                          transition: 'max-height 0.4s cubic-bezier(0.16,1,0.3,1), opacity 0.3s ease',
                        }}
                      >
                        {quote && (
                          <p
                            className="font-mozilla font-light italic"
                            style={{ fontSize: '0.85rem', color: '#0c3838', opacity: 0.6, paddingBottom: 10 }}
                          >
                            "{quote}"
                          </p>
                        )}
                        <ul
                          className="flex flex-col"
                          style={{ paddingBottom: 18, gap: 0 }}
                        >
                          {sub.map((item, idx) => (
                            <li
                              key={item}
                              className="font-mozilla font-light flex items-center"
                              style={{
                                fontSize: '0.85rem',
                                color: '#156b60',
                                padding: '5px 0',
                                gap: 10,
                                borderTop: idx === 0 ? 'none' : '1px solid rgba(12,56,56,0.06)',
                              }}
                            >
                              <span style={{
                                width: 4, height: 4, borderRadius: '50%',
                                background: '#e8621a', flexShrink: 0,
                              }} />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </li>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
