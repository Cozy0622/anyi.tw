import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Lenis from '@studio-freight/lenis';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Services from './pages/Services';
import About from './pages/About';
import Blog from './pages/Blog';
import BlogPostPepperSpray from './pages/blog/PepperSprayDefense';
import Contact from './pages/Contact';
import Construction from './pages/Accessibility';

const App: React.FC = () => {
  useEffect(() => {
    // 初始化 Lenis 平滑捲動
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <Router>
      <div className="min-h-screen flex flex-col font-sans bg-[#222222] selection:bg-emerald-500/40 text-white">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/pepper-spray-defense" element={<BlogPostPepperSpray />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/accessibility" element={<Construction />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
