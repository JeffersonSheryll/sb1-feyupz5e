import { useEffect, useState } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Portfolio from './components/Portfolio';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-zinc-900 flex items-center justify-center">
        <div className="text-white text-2xl font-bold">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <Portfolio />
      <About />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
