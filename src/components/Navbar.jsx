import { useState, useEffect } from 'react';

const NAV_LINKS = ['HOME', 'NOSOTROS', 'PORTFOLIO', 'CONTACTO'];

export default function Navbar() {
  const [active, setActive] = useState('HOME');
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const ids = ['home', 'nosotros', 'portfolio', 'contacto'];

    const onScroll = () => {
      setScrolled(window.scrollY > 10);
      for (const id of [...ids].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 80) {
          setActive(id.toUpperCase());
          break;
        }
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const goTo = (label) => {
    setActive(label);
    setMenuOpen(false);
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-[100]"
      style={{
        background: scrolled
          ? 'rgba(10,44,44,0.92)'
          : '#0c3838',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
        transition: 'background 0.4s ease, backdrop-filter 0.4s ease',
      }}
    >
      <div
        className="flex items-center justify-between"
        style={{ height: 56, padding: '0 clamp(20px,4vw,80px)' }}
      >

        {/* ── Logo ── */}
        <a
          href="#home"
          onClick={() => goTo('HOME')}
          className="flex items-center"
          style={{ gap: 12, textDecoration: 'none', opacity: 1, transition: 'opacity 0.2s' }}
          onMouseEnter={e => e.currentTarget.style.opacity = 0.75}
          onMouseLeave={e => e.currentTarget.style.opacity = 1}
        >
          <img src="/logo-icon.png" alt="Visual Studio" style={{ height: 38, width: 'auto', display: 'block' }} />
          <span className="font-mozilla" style={{ fontSize: '0.92rem', letterSpacing: '0.22em', color: '#f0ede3' }}>
            <strong style={{ fontWeight: 700 }}>VISUAL</strong>
            {' '}
            <span style={{ fontWeight: 300 }}>STUDIO</span>
          </span>
        </a>

        {/* ── Nav links (desktop) ── */}
        <ul className="hidden md:flex items-center" style={{ gap: 36, listStyle: 'none', margin: 0, padding: 0 }}>
          {NAV_LINKS.map(label => {
            const isActive = active === label;
            return (
              <li key={label}>
                <a
                  href={`#${label.toLowerCase()}`}
                  onClick={() => goTo(label)}
                  aria-current={isActive ? 'page' : undefined}
                  className="font-mozilla font-bold"
                  style={{
                    fontSize: '0.68rem',
                    letterSpacing: '0.14em',
                    textDecoration: 'none',
                    color: isActive ? '#f0ede3' : 'rgba(240,237,227,0.5)',
                    position: 'relative',
                    paddingBottom: 4,
                    transition: 'color 0.2s ease',
                  }}
                  onMouseEnter={e => { if (!isActive) e.currentTarget.style.color = 'rgba(240,237,227,0.85)'; }}
                  onMouseLeave={e => { if (!isActive) e.currentTarget.style.color = 'rgba(240,237,227,0.5)'; }}
                >
                  {label}
                  {/* Indicador activo */}
                  <span style={{
                    position: 'absolute', bottom: 0, left: 0, right: 0,
                    height: 2, borderRadius: 1,
                    background: '#e8621a',
                    opacity: isActive ? 1 : 0,
                    transform: isActive ? 'scaleX(1)' : 'scaleX(0)',
                    transformOrigin: 'left',
                    transition: 'opacity 0.25s ease, transform 0.3s cubic-bezier(0.16,1,0.3,1)',
                  }} />
                </a>
              </li>
            );
          })}
        </ul>

        {/* ── CTA desktop ── */}
        <a
          href="#contacto"
          onClick={() => goTo('CONTACTO')}
          className="hidden md:inline-flex items-center font-mozilla font-bold uppercase"
          style={{
            fontSize: '0.65rem', letterSpacing: '0.18em',
            color: '#f0ede3',
            background: '#e8621a',
            borderRadius: 100,
            padding: '8px 22px',
            textDecoration: 'none',
            boxShadow: '0 4px 16px rgba(232,98,26,0.3)',
            transition: 'all 0.22s cubic-bezier(0.16,1,0.3,1)',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = '#c85418';
            e.currentTarget.style.transform = 'scale(1.05)';
            e.currentTarget.style.boxShadow = '0 6px 22px rgba(232,98,26,0.45)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = '#e8621a';
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 4px 16px rgba(232,98,26,0.3)';
          }}
        >
          Contacto
        </a>

        {/* ── Hamburger (mobile) ── */}
        <button
          className="flex md:hidden flex-col justify-center"
          style={{ gap: 5, width: 32, height: 32, background: 'transparent', border: 'none', cursor: 'pointer', padding: 4 }}
          onClick={() => setMenuOpen(o => !o)}
          aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          {[0, 1, 2].map(i => (
            <span
              key={i}
              style={{
                display: 'block',
                height: 2, width: '100%',
                borderRadius: 1,
                background: '#f0ede3',
                transition: 'transform 0.25s cubic-bezier(0.16,1,0.3,1), opacity 0.2s ease',
                transform: menuOpen
                  ? i === 0 ? 'translateY(7px) rotate(45deg)'
                  : i === 2 ? 'translateY(-7px) rotate(-45deg)'
                  : 'none'
                  : 'none',
                opacity: menuOpen && i === 1 ? 0 : 1,
              }}
            />
          ))}
        </button>
      </div>

      {/* ── Mobile menu ── */}
      <div
        id="mobile-menu"
        style={{
          overflow: 'hidden',
          maxHeight: menuOpen ? 300 : 0,
          opacity: menuOpen ? 1 : 0,
          transition: 'max-height 0.35s cubic-bezier(0.16,1,0.3,1), opacity 0.25s ease',
          borderTop: menuOpen ? '1px solid rgba(255,255,255,0.07)' : 'none',
        }}
      >
        <ul
          style={{ listStyle: 'none', margin: 0, padding: 'clamp(12px,3vw,20px) clamp(20px,4vw,80px) 20px' }}
        >
          {NAV_LINKS.map(label => {
            const isActive = active === label;
            return (
              <li key={label} style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                <a
                  href={`#${label.toLowerCase()}`}
                  onClick={() => goTo(label)}
                  aria-current={isActive ? 'page' : undefined}
                  className="font-mozilla"
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '14px 0',
                    textDecoration: 'none',
                    fontSize: '0.9rem', letterSpacing: '0.1em',
                    fontWeight: isActive ? 700 : 400,
                    color: isActive ? '#f0ede3' : 'rgba(240,237,227,0.6)',
                  }}
                >
                  {label}
                  {isActive && (
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#e8621a' }} />
                  )}
                </a>
              </li>
            );
          })}
          <li style={{ paddingTop: 16 }}>
            <a
              href="#contacto"
              onClick={() => goTo('CONTACTO')}
              className="font-mozilla font-bold uppercase"
              style={{
                display: 'inline-block',
                fontSize: '0.7rem', letterSpacing: '0.18em',
                color: '#f0ede3', background: '#e8621a',
                borderRadius: 100, padding: '10px 28px',
                textDecoration: 'none',
              }}
            >
              Escribinos
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
