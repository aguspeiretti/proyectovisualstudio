import { useState, useEffect } from 'react';

const NAV_LINKS = ['HOME', 'NOSOTROS', 'PORTFOLIO', 'CONTACTO'];

export default function Navbar() {
  const [active, setActive] = useState('HOME');

  useEffect(() => {
    const ids = ['home', 'nosotros', 'portfolio', 'contacto'];
    const onScroll = () => {
      for (const id of [...ids].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 80) {
          setActive(id.toUpperCase());
          break;
        }
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav style={{
      position: 'fixed',
      top: 0, left: 0, right: 0,
      zIndex: 100,
      height: '56px',
      backgroundColor: '#0c3838',
      borderBottom: '1px solid rgba(255,255,255,0.07)',
    }}>
      <div style={{
        maxWidth: '1600px',
        margin: '0 auto',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 28px',
        position: 'relative',
      }}>

        {/* Logo */}
        <a
          href="#home"
          className="transition-opacity duration-200 hover:opacity-75"
          style={{ display: 'flex', alignItems: 'center', gap: '10px' }}
        >
          <img src="/logo-icon.png" alt="Visual Studio" style={{ height: '34px', width: 'auto', display: 'block' }} />
          <span style={{ fontFamily: 'MozillaText, sans-serif', fontSize: '0.82rem', letterSpacing: '0.2em', color: '#f0ede3' }}>
            <strong style={{ fontWeight: 700 }}>VISUAL</strong>
            {' '}
            <span style={{ fontWeight: 300 }}>STUDIO</span>
          </span>
        </a>

        {/* Center + */}
        <span style={{
          position: 'absolute', left: '50%', transform: 'translateX(-50%)',
          color: 'rgba(240,237,227,0.25)', fontSize: '1.1rem', lineHeight: 1, userSelect: 'none',
        }}>+</span>

        {/* Nav */}
        <ul style={{ display: 'flex', alignItems: 'center', gap: '28px' }}>
          {NAV_LINKS.map(label => {
            const isActive = active === label;
            return (
              <li key={label}>
                <a
                  href={`#${label.toLowerCase()}`}
                  onClick={() => setActive(label)}
                  aria-current={isActive ? 'true' : undefined}
                  className="transition-opacity duration-200 hover:opacity-75"
                  style={{
                    fontFamily: 'MozillaText, sans-serif',
                    fontSize: '0.75rem',
                    fontWeight: isActive ? 700 : 400,
                    letterSpacing: '0.12em',
                    color: '#f0ede3',
                    paddingBottom: '3px',
                    borderBottom: isActive ? '1.5px solid #f0ede3' : '1.5px solid transparent',
                    transition: 'border-color 0.2s, opacity 0.2s',
                  }}
                >
                  {label}
                </a>
              </li>
            );
          })}
        </ul>

        {/* Top-right ++ */}
        <span style={{
          position: 'absolute', right: '-10px', top: '-21px',
          color: 'rgba(240,237,227,0.25)', fontSize: '0.65rem', lineHeight: 1.4, userSelect: 'none',
        }}>+<br/>+</span>
      </div>
    </nav>
  );
}
