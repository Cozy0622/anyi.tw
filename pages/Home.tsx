
import React from 'react';
import { Link } from 'react-router-dom';
import { SERVICES } from '../constants';

const Home: React.FC = () => {
  return (
    <div className="flex-1">
      {/* Hero Section */}
      <section className="relative w-full overflow-hidden bg-zinc-900">
        <div className="absolute inset-0">
          <img 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCh9KsOeGBOIVAbUALc5U7fNWf9wv0WmdI7cCpl2pLnaNbwignhwrdEZg6usWVtSrWVNkQxdc3gXpdTaHs0Aam07R0dl8DKDniKTNe0tlqkf6MyCzEmYWCyd7mkaPn9Eu8-vfOGlaeBOJRX-RXtfXn-ngLMHnzCMshsR2qSvdFDxq9MyKOJktfguqmMpWPKiFHQW76GwbhmuoYDdfA2_x30CEXnUhwEcB91EjQDSVb3ltVDiIQ_HOS7L3xniJgjAUJZIxybNaZzZoLX" 
            alt="Hero background"
            className="h-full w-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-primary/10 to-transparent"></div>
        </div>
        
        <div className="relative z-10 mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-10 lg:py-48">
          <div className="max-w-2xl">
            <span className="mb-4 inline-block rounded-full bg-primary/20 px-4 py-1 text-sm font-bold text-primary backdrop-blur-md border border-primary/30">
              溫馨專業的長照服務
            </span>
            <h1 className="text-4xl font-black tracking-tight text-white sm:text-6xl mb-6">
              專業關懷，<br/><span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-white">視如親人</span>
            </h1>
            <p className="text-lg leading-relaxed text-gray-200 mb-10 max-w-xl">
              我們提供充滿溫暖與個人化的長期照護計畫，致力於讓您的摯愛在舒適與尊嚴中安享生活。
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/contact" className="flex items-center justify-center rounded-xl bg-gradient-to-r from-primary to-primary-dark px-10 py-4 text-lg font-bold text-white shadow-xl hover:shadow-primary/20 hover:-translate-y-1 transition-all">
                預約諮詢
              </Link>
              <Link to="/services" className="flex items-center justify-center rounded-xl bg-white/10 px-10 py-4 text-lg font-bold text-white backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all">
                服務項目
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black text-dark-text mb-4">為什麼選擇我們</h2>
            <div className="h-1.5 w-20 bg-gradient-to-r from-primary to-primary-dark mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-gradient-to-br from-white/80 to-white/40 border border-white/50 shadow-sm backdrop-blur-md hover:shadow-xl hover:border-primary/20 transition-all">
              <div className="size-14 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center mb-6 text-primary">
                <span className="material-symbols-outlined text-[32px]">verified_user</span>
              </div>
              <h3 className="text-xl font-bold mb-3">專業團隊</h3>
              <p className="text-sage-green leading-relaxed">我們的照護人員均經過認證且經驗豐富，充滿愛心，確保安全與舒適。</p>
            </div>
            <div className="p-8 rounded-2xl bg-gradient-to-br from-white/80 to-white/40 border border-white/50 shadow-sm backdrop-blur-md hover:shadow-xl hover:border-primary/20 transition-all">
              <div className="size-14 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center mb-6 text-primary">
                <span className="material-symbols-outlined text-[32px]">volunteer_activism</span>
              </div>
              <h3 className="text-xl font-bold mb-3">客製化照護</h3>
              <p className="text-sage-green leading-relaxed">專為滿足每位長者獨特需求與偏好而設計的客製化照護計畫。</p>
            </div>
            <div className="p-8 rounded-2xl bg-gradient-to-br from-white/80 to-white/40 border border-white/50 shadow-sm backdrop-blur-md hover:shadow-xl hover:border-primary/20 transition-all">
              <div className="size-14 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center mb-6 text-primary">
                <span className="material-symbols-outlined text-[32px]">payments</span>
              </div>
              <h3 className="text-xl font-bold mb-3">價格透明</h3>
              <p className="text-sage-green leading-relaxed">清晰、公開的定價，絕無隱藏費用，讓您可以安心規劃與預算。</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Snapshot */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-black text-dark-text mb-4">核心長照服務</h2>
              <p className="text-sage-green text-lg">全方位的專業照護方案，讓家屬安心，長輩舒心。</p>
            </div>
            <Link to="/services" className="text-primary font-bold flex items-center gap-1 hover:translate-x-1 transition-transform">
              探索所有服務 <span className="material-symbols-outlined">arrow_forward</span>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.slice(0, 3).map((svc) => (
              <div key={svc.id} className="group overflow-hidden rounded-2xl bg-gradient-to-br from-white/90 to-white/50 border border-white shadow-md hover:shadow-2xl transition-all flex flex-col backdrop-blur-sm">
                <div className="aspect-video overflow-hidden">
                  <img src={svc.image} alt={svc.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>
                <div className="p-8 flex-1 flex flex-col">
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">{svc.title}</h3>
                  <p className="text-sage-green mb-6 line-clamp-2">{svc.description}</p>
                  <Link to="/services" className="mt-auto inline-flex items-center font-bold text-primary hover:underline group/link">
                    了解更多 
                    <span className="material-symbols-outlined text-sm ml-1 transition-transform group-hover/link:translate-x-1">arrow_forward_ios</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-white/5 to-primary/10"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-black mb-6">準備好開始了嗎？</h2>
          <p className="text-lg text-sage-green mb-10">立即聯繫我們預約免費諮詢，讓我們協助您為家人開啟專屬的溫馨照護服務計畫。</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact" className="bg-gradient-to-r from-primary to-primary-dark text-white px-10 py-4 rounded-xl font-bold text-lg shadow-xl hover:shadow-primary/30 transition-all transform hover:scale-105 active:scale-95">
              立即聯繫我們
            </Link>
            <Link to="/about" className="bg-white/60 backdrop-blur-md text-dark-text px-10 py-4 rounded-xl font-bold text-lg shadow-sm border border-white hover:bg-white/80 transition-all">
              關於我們的團隊
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
