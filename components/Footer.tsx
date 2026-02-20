
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="relative mt-auto overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-white/40 to-white/90 backdrop-blur-xl border-t border-white/40 -z-10"></div>
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-6 sm:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3 text-dark-text dark:text-white">
              <div className="size-6 text-primary">
                <svg fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                  <path d="M36.7273 44C33.9891 44 31.6043 39.8386 30.3636 33.69C29.123 39.8386 26.7382 44 24 44C21.2618 44 18.877 39.8386 17.6364 33.69C16.3957 39.8386 14.0109 44 11.2727 44C7.25611 44 4 35.0457 4 24C4 12.9543 7.25611 4 11.2727 4C14.0109 4 16.3957 8.16144 17.6364 14.31C18.877 8.16144 21.2618 4 24 4C26.7382 4 29.123 8.16144 30.3636 14.31C31.6043 8.16144 33.9891 4 36.7273 4C40.7439 4 44 12.9543 44 24C44 35.0457 40.7439 44 36.7273 44Z"></path>
                </svg>
              </div>
              <h2 className="text-xl font-bold tracking-tight">長照守護者</h2>
            </div>
            <p className="text-sm leading-relaxed text-sage-green dark:text-zinc-400">
              致力於提供最溫暖、專業的長期照護服務，陪伴長輩尊嚴安老，成為每個家庭最堅強的後盾。
            </p>
            <div className="flex gap-4">
              <a href="#" className="size-9 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-gradient-to-r hover:from-primary hover:to-primary-dark hover:text-white transition-all shadow-sm">
                <span className="material-symbols-outlined text-lg">public</span>
              </a>
              <a href="#" className="size-9 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-gradient-to-r hover:from-primary hover:to-primary-dark hover:text-white transition-all shadow-sm">
                <span className="material-symbols-outlined text-lg">mail</span>
              </a>
              <a href="#" className="size-9 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-gradient-to-r hover:from-primary hover:to-primary-dark hover:text-white transition-all shadow-sm">
                <span className="material-symbols-outlined text-lg">call</span>
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-dark-text dark:text-white mb-6 uppercase text-sm tracking-wider">服務據點</h4>
            <ul className="space-y-4 text-sm text-sage-green dark:text-zinc-400">
              <li className="flex gap-2"><span className="material-symbols-outlined text-primary text-base">location_on</span> 台北市大安區仁愛路四段 100 號</li>
              <li className="flex gap-2"><span className="material-symbols-outlined text-primary text-base">location_on</span> 新北市板橋區縣民大道...</li>
              <li className="flex gap-2"><span className="material-symbols-outlined text-primary text-base">location_on</span> 台中市西屯區台灣大道...</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-dark-text dark:text-white mb-6 uppercase text-sm tracking-wider">快速連結</h4>
            <ul className="space-y-4 text-sm text-sage-green dark:text-zinc-400">
              <li><Link to="/services" className="hover:text-primary transition-colors">服務項目一覽</Link></li>
              <li><Link to="/news" className="hover:text-primary transition-colors">最新衛教資訊</Link></li>
              <li><Link to="/about" className="hover:text-primary transition-colors">常見問題 Q&A</Link></li>
              <li><Link to="/contact" className="hover:text-primary transition-colors">預約參觀與合作</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-dark-text dark:text-white mb-6 uppercase text-sm tracking-wider">追蹤最新動態</h4>
            <p className="text-xs text-sage-green dark:text-zinc-400 mb-4">訂閱我們的電子報，獲取第一手長照政策與健康資訊。</p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="您的電子信箱" 
                className="flex-1 px-3 py-2 rounded-lg border border-white/60 bg-white/40 text-sm focus:ring-primary focus:border-primary outline-none backdrop-blur-sm" 
              />
              <button className="px-4 py-2 bg-gradient-to-r from-primary to-primary-dark text-white text-xs font-bold rounded-lg shadow-md hover:opacity-90 transition-all">
                訂閱
              </button>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/20 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-sage-green dark:text-zinc-500">
          <p>© 2024 長照守護者 Care Guardian. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-primary transition-colors">隱私政策</a>
            <a href="#" className="hover:text-primary transition-colors">服務條款</a>
            <a href="#" className="hover:text-primary transition-colors">無障礙聲明</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
