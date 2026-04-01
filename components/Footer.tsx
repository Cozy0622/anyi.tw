
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer
      id="footer"
      className="relative z-10 border-t border-white/[0.06] overflow-hidden"
      style={{ background: '#080808' }}
    >
      {/* Ambient glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full pointer-events-none -z-10"
        style={{ background: 'radial-gradient(ellipse, rgba(16,185,129,0.04) 0%, transparent 70%)' }}
      />

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-24 pb-12">

        {/* Top: CTA headline */}
        <div className="mb-20 pb-20 border-b border-white/[0.07]">
          <div className="flex items-center gap-4 text-emerald-400 mb-8">
            <span className="w-8 h-px bg-emerald-500/50" />
            <span className="text-[10px] font-bold tracking-[0.55em] uppercase">Start Today</span>
          </div>
          <h2 className="text-5xl md:text-8xl font-black tracking-[-0.04em] leading-[0.88] text-white mb-10">
            開啟<br />
            <span
              className="text-transparent"
              style={{ WebkitTextStroke: '1px rgba(255,255,255,0.18)' }}
            >
              高品質照護
            </span>
          </h2>
          <div className="flex flex-col sm:flex-row gap-3 mt-12">
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 bg-emerald-500 text-black px-8 py-4 rounded-full font-black text-sm tracking-[0.15em] uppercase hover:bg-emerald-400 transition-all duration-300 hover:gap-5 w-fit"
            >
              立即聯絡我們 →
            </Link>
            <Link
              to="/services"
              className="inline-flex items-center border border-white/10 text-white/60 px-8 py-4 rounded-full font-semibold text-sm tracking-[0.15em] uppercase hover:border-white/22 hover:text-white transition-all duration-300 w-fit"
            >
              瀏覽服務項目
            </Link>
          </div>
        </div>

        {/* Middle: 3-column info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-20">

          {/* Brand */}
          <div>
            <img
              src="/assets/images/logo/1.png"
              alt="安一長照"
              className="h-16 w-auto object-contain mb-6 opacity-80"
            />
            <p className="text-gray-600 text-sm leading-relaxed max-w-[220px]">
              融合科技精準與人文溫感，打造全方位智慧長照生態系。
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-[10px] text-white/30 tracking-[0.45em] uppercase font-bold mb-6">Navigation</p>
            <div className="flex flex-col gap-3">
              {[
                { name: '品牌願景', path: '/about' },
                { name: '服務生態', path: '/services' },
                { name: '無障礙美學', path: '/accessibility' },
                { name: '部落格', path: '/blog' },
                { name: '聯絡我們', path: '/contact' },
              ].map((l) => (
                <Link
                  key={l.path}
                  to={l.path}
                  className="text-sm text-gray-600 hover:text-emerald-400 transition-colors duration-200 w-fit"
                >
                  {l.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact & Social */}
          <div>
            <p className="text-[10px] text-white/30 tracking-[0.45em] uppercase font-bold mb-6">Connect</p>
            <div className="flex gap-3 mb-8">
              <a
                href="https://www.instagram.com/anyi.care/"
                target="_blank"
                rel="noreferrer"
                className="size-10 rounded-xl border border-white/10 flex items-center justify-center text-white/40 hover:text-emerald-400 hover:border-emerald-500/30 transition-all"
                aria-label="Instagram"
              >
                <iconify-icon icon="bi:instagram" className="text-lg" />
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61583860456881&locale=zh_TW"
                target="_blank"
                rel="noreferrer"
                className="size-10 rounded-xl border border-white/10 flex items-center justify-center text-white/40 hover:text-emerald-400 hover:border-emerald-500/30 transition-all"
                aria-label="Facebook"
              >
                <iconify-icon icon="bi:facebook" className="text-lg" />
              </a>
              <a
                href="https://lin.ee/NFWA5Tu"
                target="_blank"
                rel="noreferrer"
                className="size-10 rounded-xl border border-white/10 flex items-center justify-center text-white/40 hover:text-emerald-400 hover:border-emerald-500/30 transition-all"
                aria-label="LINE"
              >
                <iconify-icon icon="bi:line" className="text-lg" />
              </a>
            </div>
            <div>
              <p className="text-[10px] text-white/20 tracking-[0.3em] uppercase mb-1">Customer Service</p>
              <a
                href="mailto:anoacozy@gmail.com"
                className="text-sm text-gray-500 hover:text-emerald-400 transition-colors"
              >
                anoacozy@gmail.com
              </a>
            </div>
          </div>
        </div>

        {/* Quick contact form */}
        <div
          className="rounded-3xl border border-white/[0.07] p-8 md:p-12 mb-16"
          style={{ background: 'rgba(255,255,255,0.025)' }}
        >
          <h4 className="text-white font-black mb-6 tracking-tight text-lg">快速諮詢留言</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="email"
              placeholder="您的電子郵件"
              className="col-span-1 bg-white/[0.04] border border-white/[0.08] rounded-2xl px-5 py-4 text-sm text-white placeholder-gray-600 focus:border-emerald-500/40 focus:bg-white/[0.07] outline-none transition-all"
            />
            <textarea
              placeholder="留言內容與需求…"
              rows={1}
              className="col-span-1 bg-white/[0.04] border border-white/[0.08] rounded-2xl px-5 py-4 text-sm text-white placeholder-gray-600 focus:border-emerald-500/40 focus:bg-white/[0.07] outline-none transition-all resize-none"
            />
            <button className="col-span-1 bg-emerald-500 py-4 rounded-2xl font-black text-sm text-black hover:bg-emerald-400 transition-colors tracking-[0.1em] uppercase">
              送出留言
            </button>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/[0.05] flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] text-white/20 tracking-[0.4em] uppercase">
            &copy; 2026 ANYI CARE · 安一長照. All rights reserved.
          </p>
          <div className="flex gap-8 text-[10px] text-white/20 tracking-[0.3em] uppercase">
            <Link to="/accessibility" className="hover:text-emerald-400/60 transition-colors">
              Accessibility
            </Link>
            <Link to="/services" className="hover:text-emerald-400/60 transition-colors">
              Services
            </Link>
            <Link to="/contact" className="hover:text-emerald-400/60 transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
