import { useState } from 'react';
import Reveal from './Reveal';

const INFO = [
  { icon: '◎', label: 'Instagram', value: '@visualstudio.es' },
  { icon: '▣', label: 'LinkedIn', value: '@visual studio españa' },
  { icon: '✆', label: 'Teléfono', value: '+34 617 909 696  ·  +34 603 218 396' },
  { icon: '✉', label: 'Email', value: 'somosvisualstudio@gmail.com' },
];

export default function Contacto() {
  const [status, setStatus] = useState('idle');

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('sent');
  };

  return (
    <section
      id="contacto"
      className="relative overflow-hidden flex flex-col bg-cover bg-center"
      style={{ backgroundImage: 'url(/fondo.jpg)' }}
    >
      {/* Eclipse decorativo */}
      <div
        aria-hidden="true"
        className="absolute -bottom-[200px] -left-[200px] w-[520px] h-[520px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 62% 38%, transparent 58%, #ff8a3d 64%, #e8621a 68%, #7a2c00 74%, transparent 78%)',
          boxShadow: '0 0 80px 20px rgba(232, 98, 26, 0.18)',
        }}
      />

      <div className="flex flex-col lg:flex-row min-h-screen relative z-[2] pt-14">

        {/* Izquierda */}
        <div className="w-full lg:w-[45%] flex flex-col justify-center py-[clamp(48px,8vh,80px)] px-[var(--gutter)]">
          <Reveal>
            <p className="font-mozilla text-[0.7rem] font-bold tracking-[0.22em] text-ember mb-5 uppercase">
              Contacto
            </p>
            <h2 className="font-nevanta text-[clamp(2.4rem,4.5vw,3.8rem)] font-bold text-cream leading-[1.05] uppercase mb-10">
              ¿Listo para<br />el salto?{' '}
              <span className="text-ember">Hablemos.</span>
            </h2>
          </Reveal>

          <Reveal delay={0.12}>
            <ul className="flex flex-col gap-6">
              {INFO.map(({ icon, label, value }) => (
                <li key={label} className="flex items-start gap-4">
                  <span
                    aria-hidden="true"
                    className="mt-[2px] w-[38px] h-[38px] rounded-full shrink-0 flex items-center justify-center bg-ember/[0.15] text-ember text-[0.9rem]"
                  >
                    {icon}
                  </span>
                  <div>
                    <p className="font-mozilla text-[0.58rem] font-bold tracking-[0.2em] text-cream/40 uppercase mb-[4px]">
                      {label}
                    </p>
                    <p className="font-mozilla text-[0.9rem] font-light text-cream leading-snug">
                      {value}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* Derecha — formulario */}
        <div className="w-full lg:w-[55%] flex items-center justify-center py-[clamp(48px,8vh,80px)] px-[var(--gutter)]">
          <Reveal delay={0.1} className="w-full max-w-[580px]">
            <form
              onSubmit={handleSubmit}
              className="w-full rounded-2xl p-8 md:p-10 border border-cream/[0.1]"
              style={{ background: 'rgba(10, 46, 46, 0.72)', backdropFilter: 'blur(20px)' }}
            >
              <h3 className="font-nevanta text-[1.6rem] font-bold text-cream mb-8 uppercase tracking-wide">
                Escribinos
              </h3>

              {/* Nombre + Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                {[
                  { id: 'nombre', label: 'Nombre', type: 'text', placeholder: 'Tu nombre' },
                  { id: 'email', label: 'Email', type: 'email', placeholder: 'ejemplo@mail.com' },
                ].map(({ id, label, type, placeholder }) => (
                  <div key={id} className="flex flex-col gap-[6px]">
                    <label
                      htmlFor={`c-${id}`}
                      className="font-mozilla text-[0.6rem] font-bold tracking-[0.2em] text-cream/45 uppercase"
                    >
                      {label}
                    </label>
                    <input
                      id={`c-${id}`}
                      name={id}
                      type={type}
                      required
                      placeholder={placeholder}
                      className="bg-cream/[0.06] border border-cream/[0.12] rounded-lg px-4 py-[13px] text-[0.88rem] font-light text-cream placeholder:text-cream/25 outline-none transition-all duration-200 focus:bg-cream/[0.1] focus:border-ember/50"
                    />
                  </div>
                ))}
              </div>

              {/* Teléfono */}
              <div className="flex flex-col gap-[6px] mb-5">
                <label
                  htmlFor="c-telefono"
                  className="font-mozilla text-[0.6rem] font-bold tracking-[0.2em] text-cream/45 uppercase"
                >
                  Teléfono
                </label>
                <input
                  id="c-telefono"
                  name="telefono"
                  type="tel"
                  placeholder="+34 617 909 696"
                  className="bg-cream/[0.06] border border-cream/[0.12] rounded-lg px-4 py-[13px] text-[0.88rem] font-light text-cream placeholder:text-cream/25 outline-none transition-all duration-200 focus:bg-cream/[0.1] focus:border-ember/50"
                />
              </div>

              {/* Mensaje */}
              <div className="flex flex-col gap-[6px] mb-8">
                <label
                  htmlFor="c-mensaje"
                  className="font-mozilla text-[0.6rem] font-bold tracking-[0.2em] text-cream/45 uppercase"
                >
                  Mensaje
                </label>
                <textarea
                  id="c-mensaje"
                  name="mensaje"
                  rows={5}
                  required
                  placeholder="¿En qué podemos ayudarte?"
                  className="bg-cream/[0.06] border border-cream/[0.12] rounded-lg px-4 py-[13px] text-[0.88rem] font-light text-cream placeholder:text-cream/25 outline-none transition-all duration-200 focus:bg-cream/[0.1] focus:border-ember/50 resize-none"
                />
              </div>

              {/* Botón */}
              <div className="flex flex-col items-start gap-3">
                <button
                  type="submit"
                  disabled={status === 'sent'}
                  className="bg-ember hover:bg-ember-light disabled:opacity-60 disabled:cursor-default text-cream font-mozilla font-bold text-[0.75rem] tracking-[0.22em] uppercase rounded-full px-10 py-[13px] transition-all duration-200 hover:scale-[1.03] active:scale-[0.98] disabled:hover:scale-100"
                >
                  {status === 'sent' ? 'Mensaje enviado ✓' : 'Enviar mensaje'}
                </button>
                {status === 'sent' && (
                  <p role="status" className="font-mozilla text-[0.78rem] font-light text-cream/60">
                    ¡Gracias! Te responderemos a la brevedad.
                  </p>
                )}
              </div>
            </form>
          </Reveal>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-[2] w-full py-4 px-[var(--gutter)] font-mozilla text-[0.75rem] font-light text-cream/35 border-t border-cream/[0.06]">
        // UniversoVisual
      </div>
    </section>
  );
}
