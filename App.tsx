
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Services from './pages/Services';
import About from './pages/About';
import News from './pages/News';
import Contact from './pages/Contact';

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col font-sans bg-background-light selection:bg-primary/30">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<About />} />
          <Route path="/news" element={<News />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Footer />
        
        {/* Floating Call Button for Mobile */}
        <a 
          href="tel:0800000000"
          className="md:hidden fixed bottom-6 right-6 size-16 bg-primary text-white rounded-full shadow-2xl flex items-center justify-center z-50 transform hover:scale-110 active:scale-90 transition-all border-4 border-white"
        >
          <span className="material-symbols-outlined text-3xl">call</span>
        </a>
      </div>
    </Router>
  );
};

export default App;
