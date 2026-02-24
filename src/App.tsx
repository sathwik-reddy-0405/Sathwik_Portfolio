import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';

import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Navbar from './components/Navbar';

import CustomCursor from './components/CustomCursor';
import SketchBackground from './components/SketchBackground';
import FullscreenIntro from './components/FullscreenIntro';
import MechanicalBackground from './components/MechanicalBackground';

function App() {
  const [started, setStarted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Handle scroll blocking
  useEffect(() => {
    if (!started) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [started]);

  // Handle fullscreen change events
  useEffect(() => {
    const handleFullscreenChange = () => {
      const isCurrentlyFullscreen = !!(
        (document.fullscreenElement ||
          ('webkitFullscreenElement' in document && (document as Document & { webkitFullscreenElement: Element | null }).webkitFullscreenElement) ||
          ('msFullscreenElement' in document && (document as Document & { msFullscreenElement: Element | null }).msFullscreenElement))
      );

      setIsFullscreen(isCurrentlyFullscreen);

      // If user exits fullscreen via ESC, we can decide to show the overlay again
      // or just keep it started. Here we keep it started but update a status.
      if (!isCurrentlyFullscreen && started) {
        console.log('User exited fullscreen');
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('MSFullscreenChange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
      document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
    };
  }, [started]);

  return (
    <div className="bg-white min-h-screen text-black selection:bg-black selection:text-white relative overflow-x-hidden">
      <CustomCursor isIntro={!started} />

      <AnimatePresence mode="wait">
        {!started && (
          <FullscreenIntro onStart={() => setStarted(true)} />
        )}
      </AnimatePresence>

      <div className="grain-overlay" />
      <SketchBackground />

      {started && <Navbar />}

      <div className="relative z-10 px-4 md:px-8 max-w-[1600px] mx-auto">
        <section id="home"><Hero /></section>
        <section id="about"><About /></section>
        <section id="projects"><Projects /></section>
        <section id="skills"><Skills /></section>
        <section id="experience"><Experience /></section>
        <section id="contact"><Contact /></section>
        <Footer />
        <MechanicalBackground />
      </div>

      {/* Optional: Small indicator if not in fullscreen after starting */}
      {started && !isFullscreen && (
        <div className="fixed bottom-4 right-4 z-50 px-3 py-1 bg-black/50 backdrop-blur-md rounded-full text-[10px] font-mono text-gray-500 pointer-events-none opacity-50">
          ESC EXIT
        </div>
      )}
    </div>
  );
}

export default App;
