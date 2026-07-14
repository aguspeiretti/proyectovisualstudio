import { useState } from 'react';

const WHATSAPP_NUMBER = '34603218396';
const WHATSAPP_MESSAGE = 'Hola! Quiero conocer más sobre Visual Studio.';

export default function WhatsAppButton() {
  const [hover, setHover] = useState(false);

  return (
    <a
      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escribinos por WhatsApp"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="fixed flex items-center justify-center"
      style={{
        right: 'clamp(16px,4vw,32px)',
        bottom: 'clamp(16px,4vw,32px)',
        width: 60,
        height: 60,
        borderRadius: '50%',
        background: hover ? '#c85418' : '#e8621a',
        boxShadow: hover
          ? '0 10px 32px rgba(232,98,26,0.5)'
          : '0 6px 20px rgba(232,98,26,0.35)',
        transform: hover ? 'scale(1.08)' : 'scale(1)',
        transition: 'all 0.25s cubic-bezier(0.16,1,0.3,1)',
        zIndex: 200,
      }}
    >
      <img
        src="/logo-icon.png"
        alt=""
        style={{ width: 30, height: 30, objectFit: 'contain' }}
      />
    </a>
  );
}
