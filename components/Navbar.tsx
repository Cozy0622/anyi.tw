
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // 當手機版選單開啟時，鎖定背景捲動以修復破圖 bug
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

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
        scrolled ? 'bg-black/40 backdrop-blur-xl border-b border-white/5' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-10 py-0">
        <Link to="/" className="flex items-center group">
          {/* 完整品牌 Logo (內含文字) - 縮小兩倍 (h-24) */}
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

        <div className="flex items-center gap-6">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white hover:text-emerald-400 transition-all duration-300"
          >
            {isOpen ? (
              <span className="material-symbols-outlined text-4xl">close</span>
            ) : (
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8">
                <path d="M4 6H20M4 12H20M4 18H20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <div 
        className={`fixed inset-0 z-[110] bg-black/98 backdrop-blur-3xl transition-all duration-500 md:hidden ${
          isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full pointer-events-none'
        }`}
      >
        {/* 手機版選單內的關閉按鈕 */}
        <div className="absolute top-8 right-6">
          <button
            onClick={() => setIsOpen(false)}
            className="text-white hover:text-emerald-400 transition-colors"
          >
            <span className="material-symbols-outlined text-4xl">close</span>
          </button>
        </div>

        <div className="flex flex-col items-center justify-center h-full gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={`text-3xl font-black tracking-[0.2em] uppercase transition-all ${
                isActive(link.path) ? 'text-emerald-400' : 'text-white'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
