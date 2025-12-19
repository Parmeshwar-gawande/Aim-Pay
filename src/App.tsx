import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { HowItWorks } from './components/HowItWorks';
import { Benefits } from './components/Benefits';
import { CTA } from './components/CTA';
import { Footer } from './components/Footer';
import { Navigation } from './components/Navigation';
import { StackedCards } from './components/StackedCards';
import { AddExchangeSend } from './components/AddExchangeSend';
import { useEffect, useState } from 'react';
import Home from './pages/Home';
import {VideoCarousel} from './components/video';

export default function App() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Animated gradient background */}
      <div 
        className="fixed inset-0 opacity-20 pointer-events-none"
        style={{
          background: `radial-gradient(circle 800px at ${mousePosition.x}px ${mousePosition.y}px, rgba(249, 115, 22, 0.12), transparent)`,
        }}
      />
      
      <Navigation />
      <Hero />
      <AddExchangeSend />
       <Home />
      <Features />
      <StackedCards />
      <VideoCarousel />
      <HowItWorks />
      <Benefits />
      
      <CTA />
      <Footer />
    </div>
  );
}