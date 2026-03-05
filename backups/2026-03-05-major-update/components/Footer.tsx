
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer id="footer" className="py-32 px-6 md:px-12 relative z-10 bg-[#0a0a0a] text-center border-t border-white/5 overflow-hidden">
      {/* 背景裝飾光暈 */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none -z-10"></div>
      
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        <h2 className="text-5xl md:text-[8rem] font-black mb-16 uppercase leading-none text-white tracking-tighter italic">
          Start <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-cyan-400">Future Care</span>
        </h2>
        
        <div className="mt-20 w-full grid grid-cols-1 lg:grid-cols-2 gap-20 text-left items-stretch">
          {/* Social & Contact Info */}
          <div className="flex flex-col justify-between">
            <div className="space-y-12">
              <div>
                <p className="text-emerald-400 mb-8 text-xs tracking-[0.5em] uppercase font-bold">Connect With Us</p>
                <div className="flex gap-8 items-center">
                  <a href="#" className="size-16 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-emerald-500 hover:text-black transition-all group">
                     <iconify-icon icon="bi:instagram" className="text-3xl group-hover:scale-110 transition-transform"></iconify-icon>
                  </a>
                  <a href="#" className="size-16 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-emerald-500 hover:text-black transition-all group">
                     <iconify-icon icon="bi:facebook" className="text-3xl group-hover:scale-110 transition-transform"></iconify-icon>
                  </a>
                  <a href="#" className="size-16 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-emerald-500 hover:text-black transition-all group">
                     <iconify-icon icon="bi:line" className="text-3xl group-hover:scale-110 transition-transform"></iconify-icon>
                  </a>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="group">
                   <p className="text-[10px] text-gray-500 tracking-[0.4em] uppercase mb-1">Office Location</p>
                   <p className="text-white text-lg font-bold group-hover:text-emerald-400 transition-colors">台北市大安區仁愛路四段 100 號</p>
                </div>
                <div className="group">
                   <p className="text-[10px] text-gray-500 tracking-[0.4em] uppercase mb-1">Customer Service</p>
                   <p className="text-white text-lg font-bold group-hover:text-emerald-400 transition-colors">service@anyi.care | 0800-000-000</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="w-full bg-white/5 p-12 rounded-[3rem] border border-white/10 backdrop-blur-3xl relative">
            <div className="absolute top-0 right-0 p-10 opacity-10 font-black text-6xl select-none pointer-events-none">CONTACT</div>
            <h4 className="text-white font-bold mb-10 tracking-widest uppercase text-sm border-l-4 border-emerald-500 pl-4">快速諮詢留言</h4>
            <div className="space-y-5">
              <input type="email" placeholder="您的電子郵件 Email" className="w-full bg-white/5 border border-white/10 rounded-2xl px-8 py-5 text-white focus:border-emerald-500 focus:bg-white/10 outline-none transition-all" />
              <textarea placeholder="留言內容與需求..." rows={3} className="w-full bg-white/5 border border-white/10 rounded-2xl px-8 py-5 text-white focus:border-emerald-500 focus:bg-white/10 outline-none transition-all resize-none" />
              <button className="w-full bg-emerald-500 py-6 rounded-2xl font-black text-black hover:bg-emerald-400 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_20px_50px_rgba(16,185,129,0.2)]">
                送出留言 SEND MESSAGE
              </button>
            </div>
          </div>
        </div>

        <div className="mt-40 w-full pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] text-gray-600 uppercase tracking-[0.4em]">
          <div>&copy; 2026 ANYI CARE. ALL RIGHTS RESERVED.</div>
          <div className="flex gap-10">
            <Link to="/accessibility" className="hover:text-emerald-400 transition-colors">Accessibility</Link>
            <Link to="/services" className="hover:text-emerald-400 transition-colors">Services</Link>
            <Link to="/contact" className="hover:text-emerald-400 transition-colors">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
