import { useEffect, useRef, useState } from 'react';
import Reveal from './Reveal';

const TOTAL_FOTOS = 36;
const FOTOS = Array.from(
  { length: TOTAL_FOTOS },
  (_, i) => `/carousel/carrusel-${String(i + 1).padStart(2, '0')}.jpg`
);

const SPEED = 36; // px/s
const RESUME_DELAY = 2500;

/* ── Lightbox ── */
function Lightbox({ index, onClose, onPrev, onNext }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose, onPrev, onNext]);

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
      aria-label={`Foto ${index + 1} de ${TOTAL_FOTOS}`}
    >
      <img
        src={FOTOS[index]}
        alt={`Visual Studio — foto ${index + 1}`}
        onClick={e => e.stopPropagation()}
        style={{
          maxWidth: '90vw', maxHeight: '86vh',
          objectFit: 'contain',
          borderRadius: 12,
          boxShadow: '0 32px 80px rgba(0,0,0,0.6)',
        }}
      />

      <button
        onClick={onClose}
        aria-label="Cerrar"
        style={{
          position: 'absolute', top: 20, right: 20,
          background: 'rgba(255,255,255,0.1)',
          border: '1px solid rgba(255,255,255,0.18)',
          borderRadius: '50%',
          width: 40, height: 40,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', color: '#f0ede3',
          backdropFilter: 'blur(8px)',
        }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
      </button>

      <button
        onClick={e => { e.stopPropagation(); onPrev(); }}
        aria-label="Foto anterior"
        style={{
          position: 'absolute', top: '50%', left: 20, transform: 'translateY(-50%)',
          background: 'rgba(255,255,255,0.1)',
          border: '1px solid rgba(255,255,255,0.18)',
          borderRadius: '50%',
          width: 44, height: 44,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', color: '#f0ede3',
          backdropFilter: 'blur(8px)',
        }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>
      <button
        onClick={e => { e.stopPropagation(); onNext(); }}
        aria-label="Foto siguiente"
        style={{
          position: 'absolute', top: '50%', right: 20, transform: 'translateY(-50%)',
          background: 'rgba(255,255,255,0.1)',
          border: '1px solid rgba(255,255,255,0.18)',
          borderRadius: '50%',
          width: 44, height: 44,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', color: '#f0ede3',
          backdropFilter: 'blur(8px)',
        }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>
    </div>
  );
}

export default function Carousel() {
  const trackRef = useRef(null);
  const pausedRef = useRef(false);
  const resumeTimeoutRef = useRef(null);
  const [lightboxIndex, setLightboxIndex] = useState(null);

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
            <button
              key={src}
              onClick={() => setLightboxIndex(i)}
              aria-label={`Ver foto ${i + 1} en grande`}
              style={{
                flexShrink: 0,
                height: 'clamp(220px,32vw,340px)',
                borderRadius: 16,
                overflow: 'hidden',
                boxShadow: '0 8px 28px rgba(12,56,56,0.15)',
                border: 'none',
                padding: 0,
                cursor: 'pointer',
                display: 'block',
              }}
            >
              <img
                src={src}
                alt={`Visual Studio — foto ${i + 1}`}
                loading="lazy"
                style={{ height: '100%', width: 'auto', display: 'block', objectFit: 'cover' }}
              />
            </button>
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

      {lightboxIndex !== null && (
        <Lightbox
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onPrev={() => setLightboxIndex(i => (i - 1 + TOTAL_FOTOS) % TOTAL_FOTOS)}
          onNext={() => setLightboxIndex(i => (i + 1) % TOTAL_FOTOS)}
        />
      )}
    </section>
  );
}
