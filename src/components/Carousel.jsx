import { useEffect, useRef } from 'react';
import Reveal from './Reveal';

const TOTAL_FOTOS = 36;
const FOTOS = Array.from(
  { length: TOTAL_FOTOS },
  (_, i) => `/carousel/carrusel-${String(i + 1).padStart(2, '0')}.jpg`
);

const SPEED = 36; // px/s
const RESUME_DELAY = 2500;

export default function Carousel() {
  const trackRef = useRef(null);
  const pausedRef = useRef(false);
  const resumeTimeoutRef = useRef(null);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    let rafId;
    let lastTs = null;

    const step = (ts) => {
      if (lastTs == null) lastTs = ts;
      const dt = (ts - lastTs) / 1000;
      lastTs = ts;

      if (!pausedRef.current) {
        const maxScroll = el.scrollWidth - el.clientWidth;
        if (maxScroll > 0) {
          const next = el.scrollLeft + SPEED * dt;
          el.scrollLeft = next >= maxScroll ? 0 : next;
        }
      }
      rafId = requestAnimationFrame(step);
    };

    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, []);

  const pause = () => {
    clearTimeout(resumeTimeoutRef.current);
    pausedRef.current = true;
  };

  const resumeLater = () => {
    clearTimeout(resumeTimeoutRef.current);
    resumeTimeoutRef.current = setTimeout(() => {
      pausedRef.current = false;
    }, RESUME_DELAY);
  };

  const scrollByCard = (dir) => {
    const el = trackRef.current;
    if (!el) return;
    pause();
    el.scrollBy({ left: dir * 340, behavior: 'smooth' });
    resumeLater();
  };

  return (
    <section
      id="galeria"
      className="relative overflow-hidden bg-cream"
      style={{ padding: 'clamp(48px,8vh,80px) 0' }}
    >
      <Reveal>
        <div style={{ padding: '0 clamp(24px,5vw,96px)', marginBottom: 32 }}>
          <p
            className="font-mozilla font-bold uppercase mb-3"
            style={{ fontSize: '0.68rem', letterSpacing: '0.26em', color: '#e8621a' }}
          >
            Galería
          </p>
          <h2
            className="font-mozilla font-bold"
            style={{ fontSize: 'clamp(2rem,4vw,3rem)', color: '#0c3838', lineHeight: 1.1 }}
          >
            Momentos que contamos
          </h2>
        </div>
      </Reveal>

      <div className="relative">
        <div
          ref={trackRef}
          onMouseEnter={pause}
          onMouseLeave={() => { pausedRef.current = false; }}
          onPointerDown={pause}
          onPointerUp={resumeLater}
          onTouchStart={pause}
          onTouchEnd={resumeLater}
          className="no-scrollbar flex"
          style={{
            gap: 16,
            overflowX: 'auto',
            padding: '0 clamp(24px,5vw,96px)',
          }}
        >
          {FOTOS.map((src, i) => (
            <div
              key={src}
              style={{
                flexShrink: 0,
                height: 'clamp(220px,32vw,340px)',
                borderRadius: 16,
                overflow: 'hidden',
                boxShadow: '0 8px 28px rgba(12,56,56,0.15)',
              }}
            >
              <img
                src={src}
                alt={`Visual Studio — foto ${i + 1}`}
                loading="lazy"
                style={{ height: '100%', width: 'auto', display: 'block', objectFit: 'cover' }}
              />
            </div>
          ))}
        </div>

        {/* Flechas */}
        <button
          onClick={() => scrollByCard(-1)}
          aria-label="Fotos anteriores"
          className="hidden md:flex"
          style={{
            position: 'absolute', top: '50%', left: 16, transform: 'translateY(-50%)',
            width: 48, height: 48, borderRadius: '50%',
            border: '1px solid rgba(12,56,56,0.15)',
            background: 'rgba(240,237,227,0.9)',
            backdropFilter: 'blur(8px)',
            alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', boxShadow: '0 8px 24px rgba(12,56,56,0.18)',
            zIndex: 2,
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0c3838" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <button
          onClick={() => scrollByCard(1)}
          aria-label="Fotos siguientes"
          className="hidden md:flex"
          style={{
            position: 'absolute', top: '50%', right: 16, transform: 'translateY(-50%)',
            width: 48, height: 48, borderRadius: '50%',
            border: '1px solid rgba(12,56,56,0.15)',
            background: 'rgba(240,237,227,0.9)',
            backdropFilter: 'blur(8px)',
            alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', boxShadow: '0 8px 24px rgba(12,56,56,0.18)',
            zIndex: 2,
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0c3838" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>
    </section>
  );
}
