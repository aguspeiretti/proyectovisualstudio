import Navbar from './components/Navbar';
import Home from './components/Home';
import Nosotros from './components/Nosotros';
import Portfolio from './components/Portfolio';
import Contacto from './components/Contacto';
import './index.css';

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Home />
        <Nosotros />
        <Portfolio />
        <Contacto />
      </main>
    </>
  );
}
