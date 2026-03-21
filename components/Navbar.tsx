import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // 1. 極簡滾動鎖定 (Clean Scroll Lock)
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // 2. 監聽滾動狀態 (僅用於 Header 背景變色)
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
      {/* Header Section */}
      <header 
        className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${
          scrolled ? 'bg-black/40 backdrop-blur-xl border-b border-white/5' : 'bg-transparent'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-10 py-0">
          <Link to="/" className="flex items-center group">
            <div className="flex-shrink-0 flex items-center">
              <img 
                src="/assets/images/logo/1.png" 
                alt="Anyi Care 安一長照" 
                className="h-24 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-base font-black uppercase tracking-[0.1em] transition-all hover:text-emerald-400 relative ${
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

          {/* Mobile Menu Toggle Button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(true)}
              className="text-white hover:text-emerald-400 transition-colors"
              aria-label="Open Menu"
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 6H20M4 12H20M4 18H20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Nav Overlay (Foundation) - 獨立於 Header 外的兄弟節點 */}
      <div 
        className={`fixed inset-0 z-[9999] bg-black/20 backdrop-blur-xl flex flex-col justify-center items-center transition-all duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Close Button - 原生 SVG X 圖示 */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-6 right-6 text-white hover:text-emerald-400 transition-colors p-2"
          aria-label="Close Menu"
        >
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* Mobile Links */}
        <div className="flex flex-col items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={`text-2xl font-black tracking-[0.2em] uppercase transition-all ${
                isActive(link.path) ? 'text-emerald-400' : 'text-white'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Navbar;
