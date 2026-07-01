import { useState } from 'react';
import Reveal from './Reveal';

export default function Contacto() {
  const [status, setStatus] = useState('idle');

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('sent');
  };

  return (
    <section
      id="contacto"
      className="md:min-h-screen pt-14 relative overflow-hidden flex flex-col bg-cover bg-center"
      style={{ backgroundImage: 'url(/fondo.jpg)' }}
    >
      {/* Eclipse naranja esquina inferior izquierda */}
      <div
        className="absolute -bottom-[180px] -left-[180px] w-[480px] h-[480px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 62% 38%, transparent 58%, #ff8a3d 64%, #e8621a 68%, #7a2c00 74%, transparent 78%)',
          boxShadow: '0 0 60px 10px rgba(232, 98, 26, 0.25)',
        }}
      />

      {/* Contenido principal */}
      <div className="flex flex-col md:flex-row flex-1 w-full relative z-[2]">

        {/* Izquierda — datos */}
        <div className="w-full md:w-[38%] flex flex-col justify-center py-[clamp(40px,8vh,80px)] px-[var(--gutter)]">
          <Reveal>
            <h2 className="font-nevanta text-[clamp(1.8rem,4vw,2.6rem)] font-bold text-cream leading-[1.1] uppercase mb-8">
              ¿Listo para<br />el salto? <span className="text-ember">Hablemos!</span>
            </h2>
          </Reveal>

          <Reveal delay={0.15}>
            <ul className="flex flex-col gap-[14px]">
              {[
                { icon: '◎', text: '@visualstudio.es' },
                { icon: '▣', text: '@visual studio españa' },
                { icon: '✆', text: '+34 617909696 | +34 603218396' },
                { icon: '✉', text: 'somosvisualstudio@gmail.com' },
              ].map(({ icon, text }) => (
                <li key={text} className="flex items-center gap-3 font-mozilla text-[0.85rem] font-light text-cream">
                  <span
                    aria-hidden="true"
                    className="w-[30px] h-[30px] rounded-full flex items-center justify-center shrink-0 bg-ember/[0.18] text-ember-light text-[0.85rem]"
                  >
                    {icon}
                  </span>
                  {text}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* Derecha — formulario */}
        <div className="w-full md:w-[62%] flex items-center justify-center py-[clamp(40px,8vh,80px)] px-[var(--gutter)]">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-[500px] backdrop-blur-[14px] rounded-[14px] px-7 pt-7 pb-8 border border-cream/[0.09]"
            style={{ background: 'rgba(20, 85, 76, 0.5)' }}
          >
            {/* Fila nombre + email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-[14px] mb-[14px]">
              {[
                { id: 'contacto-nombre', label: 'NOMBRE', type: 'text', placeholder: 'Tu nombre' },
                { id: 'contacto-email', label: 'EMAIL', type: 'email', placeholder: 'ejemplo@mail.com' },
              ].map(({ id, label, type, placeholder }) => (
                <div key={id}>
                  <label
                    htmlFor={id}
                    className="font-mozilla text-[0.65rem] font-normal tracking-[0.18em] text-cream/[0.62] block mb-[6px]"
                  >
                    {label}
                  </label>
                  <input
                    id={id}
                    name={id}
                    type={type}
                    required
                    placeholder={placeholder}
                    className="w-full bg-white/[0.16] rounded-lg px-[14px] py-[10px] text-[0.85rem] font-light text-cream outline-none transition-[background] duration-200 focus:bg-white/25"
                  />
                </div>
              ))}
            </div>

            {/* Teléfono */}
            <div className="mb-[14px]">
              <label
                htmlFor="contacto-telefono"
                className="font-mozilla text-[0.65rem] font-normal tracking-[0.18em] text-cream/[0.62] block mb-[6px]"
              >
                TELÉFONO
              </label>
              <input
                id="contacto-telefono"
                name="contacto-telefono"
                type="tel"
                placeholder="+34 617909696"
                className="w-full bg-white/[0.16] rounded-lg px-[14px] py-[10px] text-[0.85rem] font-light text-cream outline-none transition-[background] duration-200 focus:bg-white/25"
              />
            </div>

            {/* Mensaje */}
            <div className="mb-[22px]">
              <label
                htmlFor="contacto-mensaje"
                className="font-mozilla text-[0.65rem] font-normal tracking-[0.18em] text-cream/[0.62] block mb-[6px]"
              >
                MENSAJE
              </label>
              <textarea
                id="contacto-mensaje"
                name="contacto-mensaje"
                rows={5}
                required
                placeholder="¿En qué podemos ayudarte?"
                className="w-full bg-white/[0.16] rounded-lg px-[14px] py-[10px] text-[0.85rem] font-light text-cream outline-none transition-[background] duration-200 focus:bg-white/25 resize-none"
              />
            </div>

            {/* Botón */}
            <div className="flex flex-col items-center gap-[10px]">
              <button
                type="submit"
                disabled={status === 'sent'}
                className="transition-transform duration-200 hover:scale-105 disabled:cursor-default disabled:opacity-70 disabled:hover:scale-100 bg-cream text-forest rounded-full px-11 py-[11px] font-mozilla font-bold text-[0.75rem] tracking-[0.2em]"
              >
                {status === 'sent' ? 'MENSAJE ENVIADO ✓' : 'ENVIAR MENSAJE'}
              </button>
              {status === 'sent' && (
                <p role="status" className="font-mozilla text-[0.75rem] font-light text-cream">
                  ¡Gracias! Te responderemos a la brevedad.
                </p>
              )}
            </div>
          </form>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-[2] w-full py-[14px] px-[var(--gutter)] font-mozilla text-[0.82rem] font-light text-cream/[0.62]">
        // UniversoVisual
      </div>
    </section>
  );
}
