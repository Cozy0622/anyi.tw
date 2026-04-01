import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: '品牌願景', path: '/about' },
    { name: '服務生態', path: '/services' },
    { name: '無障礙美學', path: '/accessibility' },
    { name: '部落格', path: '/blog' },
    { name: '聯絡我們', path: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${
          scrolled
            ? 'bg-black/50 backdrop-blur-2xl border-b border-white/[0.06]'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 lg:px-12">
          {/* Logo */}
          <Link to="/" className="flex items-center group shrink-0">
            <img
              src="/assets/images/logo/1.png"
              alt="Anyi Care 安一長照"
              className="h-20 w-auto object-contain transition-opacity duration-300 group-hover:opacity-80"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative text-sm font-semibold tracking-[0.05em] transition-colors duration-300 py-1 ${
                  isActive(link.path)
                    ? 'text-emerald-400'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                {link.name}
                {isActive(link.path) && (
                  <span className="absolute -bottom-0.5 left-0 w-full h-px bg-emerald-400/70" />
                )}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center">
            <Link
              to="/contact"
              className="text-xs font-black tracking-[0.2em] uppercase text-black bg-emerald-500 hover:bg-emerald-400 transition-colors duration-300 px-5 py-2.5 rounded-full"
            >
              諮詢服務
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsOpen(true)}
            className="md:hidden text-white/70 hover:text-white transition-colors p-1"
            aria-label="開啟選單"
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <path d="M4 7H20M4 12H16M4 17H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 z-[9999] flex flex-col justify-center items-center transition-all duration-400 ${
          isOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
        style={{ background: 'rgba(5,5,5,0.97)', backdropFilter: 'blur(24px)' }}
      >
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors p-2"
          aria-label="關閉選單"
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>

        <div className="flex flex-col items-center gap-8">
          {navLinks.map((link, i) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-3xl font-black tracking-tight transition-colors duration-200 ${
                isActive(link.path) ? 'text-emerald-400' : 'text-white/80 hover:text-white'
              }`}
              style={{ transitionDelay: isOpen ? `${i * 40}ms` : '0ms' }}
            >
              {link.name}
            </Link>
          ))}
          <Link
            to="/contact"
            className="mt-4 inline-flex items-center gap-2 bg-emerald-500 text-black px-8 py-3.5 rounded-full font-black text-sm tracking-[0.15em] uppercase hover:bg-emerald-400 transition-colors"
          >
            諮詢服務 →
          </Link>
        </div>

        {/* Bottom info */}
        <div className="absolute bottom-10 text-center">
          <p className="text-[10px] text-white/20 tracking-[0.4em] uppercase">anyicare.tw</p>
        </div>
      </div>
    </>
  );
};

export default Navbar;
