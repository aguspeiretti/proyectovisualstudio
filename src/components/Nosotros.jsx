import { useState } from 'react';
import Reveal from './Reveal';

const SERVICIOS = [
  { title: 'Estrategia y Consultoría', sub: [] },
  {
    title: 'Branding y Diseño',
    sub: ['Identidad visual', 'Rebranding', 'Manual de marca', 'Diseño editorial', 'Packaging', 'Diseño gráfico', 'Ilustración', 'Murales corporativos', 'Señalética'],
  },
  { title: 'Comunicación Digital', sub: [] },
  { title: 'Producción Audiovisual', sub: [] },
];

export default function Nosotros() {
  const [open, setOpen] = useState('Branding y Diseño');

  return (
    <section id="nosotros" className="md:min-h-screen pt-14">
      <div className="flex flex-col md:flex-row md:min-h-[calc(100vh-56px)]">

        {/* Video izquierda */}
        <div className="w-full md:w-[58%] min-h-[280px] md:min-h-0 bg-jet relative flex items-center justify-center">
          <p className="absolute top-5 left-[var(--gutter)] font-mozilla text-[0.72rem] font-normal text-cream/85 tracking-[0.03em]">
            *DESCRIPTIVO - PRESENTACIÓN (VIDEO)
          </p>

          <button
            aria-label="Reproducir video de presentación"
            className="transition-transform duration-200 hover:scale-110 w-[58px] h-[58px] rounded-full border-2 border-cream/75 bg-cream/10 flex items-center justify-center backdrop-blur-[4px]"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-cream ml-[3px]">
              <path d="M8 5v14l11-7z" />
            </svg>
          </button>
        </div>

        {/* Servicios derecha */}
        <div className="w-full md:w-[42%] flex flex-col justify-center bg-cream py-[clamp(40px,8vh,80px)] px-[var(--gutter)]">
          <Reveal>
            <h2 className="font-nevanta text-[clamp(2rem,4vw,2.8rem)] font-bold text-pine tracking-[0.06em] mb-7">
              SERVICIOS
            </h2>
          </Reveal>

          <ul className="flex flex-col gap-3">
            {SERVICIOS.map(({ title, sub }, i) => {
              const isOpen = open === title;
              const panelId = `servicio-panel-${title.replace(/\s+/g, '-')}`;
              return (
                <Reveal key={title} delay={i * 0.06}>
                  <li>
                    <button
                      onClick={() => sub.length && setOpen(isOpen ? null : title)}
                      aria-expanded={sub.length ? isOpen : undefined}
                      aria-controls={sub.length ? panelId : undefined}
                      className={[
                        'font-mozilla text-[1rem] tracking-[0.01em] block text-left',
                        'bg-transparent border-none p-0 transition-opacity duration-200 hover:opacity-80',
                        isOpen
                          ? 'font-bold text-forest cursor-default'
                          : 'font-normal text-fern cursor-pointer',
                      ].join(' ')}
                    >
                      {title}
                    </button>

                    {isOpen && sub.length > 0 && (
                      <ul id={panelId} className="mt-[6px] flex flex-col gap-[3px]">
                        {sub.map(item => (
                          <li key={item} className="font-mozilla text-[0.85rem] font-light text-forest">
                            {item}
                          </li>
                        ))}
                      </ul>
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
