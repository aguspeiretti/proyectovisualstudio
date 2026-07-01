import { useState } from 'react';
import Reveal from './Reveal';

const INFO = [
  { icon: '◎', label: 'Instagram', value: '@visualstudio.es' },
  { icon: '▣', label: 'LinkedIn', value: '@visual studio españa' },
  { icon: '✆', label: 'Teléfono', value: '+34 617 909 696  ·  +34 603 218 396' },
  { icon: '✉', label: 'Email', value: 'somosvisualstudio@gmail.com' },
];

const inputCls =
  'w-full rounded-xl px-5 py-4 text-[0.9rem] font-light text-cream placeholder:text-cream/30 outline-none transition-all duration-200 border border-white/10 focus:border-ember/60';

export default function Contacto() {
  const [status, setStatus] = useState('idle');

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('sent');
  };

  return (
    <section
      id="contacto"
      className="relative overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: 'url(/fondo.jpg)' }}
    >
      {/* Eclipse decorativo */}
      <div
        aria-hidden="true"
        className="absolute -bottom-[200px] -left-[200px] w-[520px] h-[520px] rounded-full pointer-events-none z-[1]"
        style={{
          background:
            'radial-gradient(circle at 62% 38%, transparent 58%, #ff8a3d 64%, #e8621a 68%, #7a2c00 74%, transparent 78%)',
          boxShadow: '0 0 80px 20px rgba(232,98,26,0.18)',
        }}
      />

      {/* Layout principal */}
      <div className="relative z-[2] flex flex-col lg:flex-row min-h-screen pt-14">

        {/* ── Izquierda ── */}
        <div className="w-full lg:w-[42%] flex flex-col justify-center gap-10 py-16 pl-[var(--gutter)] pr-10">

          <Reveal>
            <p className="font-mozilla text-[0.68rem] font-bold tracking-[0.24em] text-ember uppercase mb-3">
              Contacto
            </p>
            <h2 className="font-nevanta text-[clamp(2.8rem,3.6vw,4.2rem)] font-bold text-cream leading-[1.04] uppercase">
              ¿Listo para<br />el salto?{' '}
              <span className="text-ember">Hablemos.</span>
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <ul className="flex flex-col gap-6">
              {INFO.map(({ icon, label, value }) => (
                <li key={label} className="flex items-start gap-4">
                  <span
                    aria-hidden="true"
                    className="mt-[3px] w-[40px] h-[40px] rounded-full shrink-0 flex items-center justify-center text-[0.95rem]"
                    style={{ background: 'rgba(232,98,26,0.15)', color: '#ff8a3d' }}
                  >
                    {icon}
                  </span>
                  <div>
                    <p className="font-mozilla text-[0.58rem] font-bold tracking-[0.22em] uppercase mb-1"
                       style={{ color: 'rgba(240,237,227,0.4)' }}>
                      {label}
                    </p>
                    <p className="font-mozilla text-[0.92rem] font-light text-cream">
                      {value}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* ── Derecha — Formulario ── */}
        <div className="w-full lg:w-[58%] flex items-center py-16 pl-6 pr-[var(--gutter)]">
          <Reveal delay={0.08} className="w-full">
            <form
              onSubmit={handleSubmit}
              className="w-full rounded-2xl p-8 lg:p-10"
              style={{
                background: 'rgba(8, 38, 38, 0.78)',
                backdropFilter: 'blur(24px)',
                border: '1px solid rgba(240,237,227,0.09)',
              }}
            >
              <h3 className="font-nevanta text-[1.8rem] font-bold text-cream uppercase tracking-wide mb-8">
                Escribinos
              </h3>

              <div className="flex flex-col gap-5">
                {/* Nombre + Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {[
                    { id: 'nombre', label: 'Nombre', type: 'text', placeholder: 'Tu nombre' },
                    { id: 'email', label: 'Email', type: 'email', placeholder: 'ejemplo@mail.com' },
                  ].map(({ id, label, type, placeholder }) => (
                    <div key={id}>
                      <label
                        htmlFor={`c-${id}`}
                        className="block font-mozilla text-[0.6rem] font-bold tracking-[0.22em] uppercase mb-2"
                        style={{ color: 'rgba(240,237,227,0.45)' }}
                      >
                        {label}
                      </label>
                      <input
                        id={`c-${id}`}
                        name={id}
                        type={type}
                        required
                        placeholder={placeholder}
                        className={inputCls}
                        style={{ background: 'rgba(240,237,227,0.06)' }}
                      />
                    </div>
                  ))}
                </div>

                {/* Teléfono */}
                <div>
                  <label
                    htmlFor="c-telefono"
                    className="block font-mozilla text-[0.6rem] font-bold tracking-[0.22em] uppercase mb-2"
                    style={{ color: 'rgba(240,237,227,0.45)' }}
                  >
                    Teléfono
                  </label>
                  <input
                    id="c-telefono"
                    name="telefono"
                    type="tel"
                    placeholder="+34 617 909 696"
                    className={inputCls}
                    style={{ background: 'rgba(240,237,227,0.06)' }}
                  />
                </div>

                {/* Mensaje */}
                <div>
                  <label
                    htmlFor="c-mensaje"
                    className="block font-mozilla text-[0.6rem] font-bold tracking-[0.22em] uppercase mb-2"
                    style={{ color: 'rgba(240,237,227,0.45)' }}
                  >
                    Mensaje
                  </label>
                  <textarea
                    id="c-mensaje"
                    name="mensaje"
                    rows={5}
                    required
                    placeholder="¿En qué podemos ayudarte?"
                    className={`${inputCls} resize-none`}
                    style={{ background: 'rgba(240,237,227,0.06)' }}
                  />
                </div>

                {/* Botón */}
                <div className="flex items-center gap-5 pt-2">
                  <button
                    type="submit"
                    disabled={status === 'sent'}
                    className="font-mozilla font-bold text-[0.75rem] tracking-[0.22em] uppercase rounded-full px-10 py-[14px] text-cream transition-all duration-200 hover:scale-[1.03] active:scale-[0.97] disabled:opacity-60 disabled:cursor-default disabled:hover:scale-100"
                    style={{ background: '#e8621a' }}
                  >
                    {status === 'sent' ? 'Mensaje enviado ✓' : 'Enviar mensaje'}
                  </button>
                  {status === 'sent' && (
                    <p role="status" className="font-mozilla text-[0.8rem] font-light"
                       style={{ color: 'rgba(240,237,227,0.6)' }}>
                      ¡Gracias! Te responderemos a la brevedad.
                    </p>
                  )}
                </div>
              </div>
            </form>
          </Reveal>
        </div>
      </div>

      {/* Footer */}
      <div
        className="relative z-[2] w-full py-4 px-[var(--gutter)] font-mozilla text-[0.75rem] font-light"
        style={{ color: 'rgba(240,237,227,0.3)', borderTop: '1px solid rgba(240,237,227,0.06)' }}
      >
        // UniversoVisual
      </div>
    </section>
  );
}
