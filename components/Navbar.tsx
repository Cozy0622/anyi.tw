
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: '首頁', path: '/' },
    { name: '服務項目', path: '/services' },
    { name: '關於我們', path: '/about' },
    { name: '最新消息', path: '/news' },
    { name: '聯絡我們', path: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/20 bg-white/60 backdrop-blur-xl dark:bg-zinc-900/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-10">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="size-8 text-primary group-hover:scale-110 transition-transform">
            <svg fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <path d="M36.7273 44C33.9891 44 31.6043 39.8386 30.3636 33.69C29.123 39.8386 26.7382 44 24 44C21.2618 44 18.877 39.8386 17.6364 33.69C16.3957 39.8386 14.0109 44 11.2727 44C7.25611 44 4 35.0457 4 24C4 12.9543 7.25611 4 11.2727 4C14.0109 4 16.3957 8.16144 17.6364 14.31C18.877 8.16144 21.2618 4 24 4C26.7382 4 29.123 8.16144 30.3636 14.31C31.6043 8.16144 33.9891 4 36.7273 4C40.7439 4 44 12.9543 44 24C44 35.0457 40.7439 44 36.7273 44Z"></path>
            </svg>
          </div>
          <h2 className="text-xl font-black leading-tight tracking-tight text-dark-text dark:text-white">安一長照</h2>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-9">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-medium transition-all hover:text-primary relative ${
                isActive(link.path) ? 'text-primary font-bold' : 'text-dark-text dark:text-gray-300'
              }`}
            >
              {link.name}
              {isActive(link.path) && <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-primary to-primary-dark"></span>}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Link
            to="/contact"
            className="hidden sm:flex min-w-[100px] cursor-pointer items-center justify-center rounded-lg h-10 px-6 bg-gradient-to-r from-primary to-primary-dark text-white text-sm font-bold hover:shadow-lg hover:opacity-90 transition-all"
          >
            預約諮詢
          </Link>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-dark-text dark:text-white"
          >
            <span className="material-symbols-outlined">{isOpen ? 'close' : 'menu'}</span>
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden bg-white/90 backdrop-blur-xl dark:bg-zinc-900/90 border-b border-white/20 p-4 space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={`block text-base font-medium p-2 rounded-lg ${
                isActive(link.path) ? 'bg-primary/10 text-primary font-bold' : 'text-dark-text dark:text-gray-300'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <Link
            to="/contact"
            onClick={() => setIsOpen(false)}
            className="block w-full text-center py-3 bg-gradient-to-r from-primary to-primary-dark text-white font-bold rounded-lg shadow-md"
          >
            立即諮詢
          </Link>
        </div>
      )}
    </header>
  );
};

export default Navbar;
