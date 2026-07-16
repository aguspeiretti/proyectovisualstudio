import Navbar from './components/Navbar';
import Home from './components/Home';
import Nosotros from './components/Nosotros';
import Portfolio from './components/Portfolio';
import Carousel from './components/Carousel';
import Contacto from './components/Contacto';
import WhatsAppButton from './components/WhatsAppButton';
import './index.css';

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Home />
        <Nosotros />
        <Portfolio />
        <Carousel />
        <Contacto />
      </main>
      <WhatsAppButton />
    </>
  );
}
