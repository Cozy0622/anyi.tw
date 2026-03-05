
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: '品牌願景', path: '/about' },
    { name: '服務生態', path: '/services' },
    { name: '無障礙美學', path: '/accessibility' },
    { name: '最新動態', path: '/news' },
    { name: '聯絡我們', path: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header 
      className={`fixed top-0 z-[100] w-full transition-all duration-500 ${
        scrolled ? 'bg-black/40 backdrop-blur-xl border-b border-white/5 py-4' : 'bg-transparent py-8'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-10">
        <Link to="/" className="flex flex-col group">
          <div className="text-2xl font-black tracking-[0.2em] uppercase text-white group-hover:text-emerald-400 transition-colors">
            ANYI CARE
          </div>
          <div className="text-[10px] tracking-[0.4em] text-emerald-400 font-bold uppercase">安一長照</div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-xs font-black uppercase tracking-[0.2em] transition-all hover:text-emerald-400 relative ${
                isActive(link.path) ? 'text-emerald-400' : 'text-white/80'
              }`}
            >
              {link.name}
              {isActive(link.path) && (
                <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.5)]"></span>
              )}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-6">
          <Link
            to="/contact"
            className="hidden sm:flex items-center justify-center rounded-full bg-white text-black px-8 py-2.5 text-xs font-black tracking-widest uppercase hover:bg-emerald-400 hover:text-white transition-all shadow-xl"
          >
            Inquiry
          </Link>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white hover:text-emerald-400 transition-colors"
          >
            <span className="material-symbols-outlined text-3xl">{isOpen ? 'close' : 'menu'}</span>
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <div 
        className={`fixed inset-0 z-[-1] bg-black/95 backdrop-blur-2xl transition-all duration-500 md:hidden ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={`text-2xl font-black tracking-widest uppercase ${
                isActive(link.path) ? 'text-emerald-400' : 'text-white'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <Link
            to="/contact"
            onClick={() => setIsOpen(false)}
            className="mt-8 px-12 py-4 bg-emerald-500 text-black font-black rounded-full text-xl"
          >
            立即諮詢
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
