import { useState, useEffect } from 'react';

const NAV_LINKS = ['HOME', 'NOSOTROS', 'PORTFOLIO', 'CONTACTO'];

export default function Navbar() {
  const [active, setActive] = useState('HOME');
  const [menuOpen, setMenuOpen] = useState(false);

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

  const goTo = (label) => {
    setActive(label);
    setMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] bg-forest border-b border-white/[0.07]">
      <div className="h-14 flex items-center justify-between relative px-[var(--gutter)]">

        {/* Logo */}
        <a
          href="#home"
          onClick={() => goTo('HOME')}
          className="flex items-center gap-[10px] transition-opacity duration-200 hover:opacity-75"
        >
          <img src="/logo-icon.png" alt="Visual Studio" className="h-[34px] w-auto block" />
          <span className="font-mozilla text-[0.82rem] tracking-[0.2em] text-cream">
            <strong className="font-bold">VISUAL</strong>
            {' '}
            <span className="font-light">STUDIO</span>
          </span>
        </a>

        {/* Center + (desktop only) */}
        <span className="hidden md:block absolute left-1/2 -translate-x-1/2 text-cream/25 text-[1.1rem] leading-none select-none">
          +
        </span>

        {/* Nav (desktop) */}
        <ul className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map(label => {
            const isActive = active === label;
            return (
              <li key={label}>
                <a
                  href={`#${label.toLowerCase()}`}
                  onClick={() => goTo(label)}
                  aria-current={isActive ? 'true' : undefined}
                  className={[
                    'font-mozilla text-[0.75rem] tracking-[0.12em] text-cream pb-[3px]',
                    'border-b-[1.5px] transition-[border-color,opacity] duration-200 hover:opacity-75',
                    isActive ? 'font-bold border-cream' : 'font-normal border-transparent',
                  ].join(' ')}
                >
                  {label}
                </a>
              </li>
            );
          })}
        </ul>

        {/* Hamburger (mobile) */}
        <button
          className="flex md:hidden flex-col justify-center gap-[5px] w-8 h-8"
          onClick={() => setMenuOpen(o => !o)}
          aria-label={menuOpen ? 'Cerrar menú de navegación' : 'Abrir menú de navegación'}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          <span className={`block h-[2px] w-full bg-cream transition-transform duration-200 ${menuOpen ? 'translate-y-[7px] rotate-45' : ''}`} />
          <span className={`block h-[2px] w-full bg-cream transition-opacity duration-200 ${menuOpen ? 'opacity-0' : 'opacity-100'}`} />
          <span className={`block h-[2px] w-full bg-cream transition-transform duration-200 ${menuOpen ? '-translate-y-[7px] -rotate-45' : ''}`} />
        </button>

        {/* Top-right ++ (desktop only) */}
        <span className="hidden md:block absolute -right-[10px] -top-[21px] text-cream/25 text-[0.65rem] leading-[1.4] select-none">
          +<br/>+
        </span>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <ul id="mobile-menu" className="md:hidden flex flex-col bg-forest border-t border-white/[0.07] py-2 px-[var(--gutter)] pb-4">
          {NAV_LINKS.map(label => {
            const isActive = active === label;
            return (
              <li key={label}>
                <a
                  href={`#${label.toLowerCase()}`}
                  onClick={() => goTo(label)}
                  aria-current={isActive ? 'true' : undefined}
                  className={`block font-mozilla text-[0.85rem] tracking-[0.12em] text-cream py-3 ${isActive ? 'font-bold' : 'font-normal'}`}
                >
                  {label}
                </a>
              </li>
            );
          })}
        </ul>
      )}
    </nav>
  );
}
