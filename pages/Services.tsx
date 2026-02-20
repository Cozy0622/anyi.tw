
import React from 'react';
import { SERVICES } from '../constants';

const Services: React.FC = () => {
  return (
    <main className="flex-1">
      <div className="max-w-7xl mx-auto px-6 py-12 sm:px-10">
        
        {/* Page Heading */}
        <div className="flex flex-col gap-4 mb-12 text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-black leading-tight tracking-tight">我們的服務項目</h1>
          <p className="text-sage-green text-lg font-normal leading-relaxed">
            致力於提供高品質且充滿溫度的長照服務。我們深知每位長者的需求獨一無二，透過專業團隊的細心呵護，讓每位尊榮長者都能在熟悉的環境中享受安穩、尊嚴的晚年生活。
          </p>
        </div>

        {/* Final CTA Banner - Re-positioned per request */}
        <div className="relative rounded-3xl p-10 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 overflow-hidden border border-primary/20 mb-20">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/15 via-white/5 to-primary/5 backdrop-blur-md -z-10"></div>
          <div className="text-left">
            <h3 className="text-2xl font-black mb-3 text-dark-text">還在考慮哪種服務最合適？</h3>
            <p className="text-sage-green text-lg">立即與我們的個案經理通話，獲得量身定制的專業建議。</p>
          </div>
          <div className="flex gap-4 w-full md:w-auto">
            <button className="flex-1 md:flex-none flex items-center gap-2 justify-center rounded-xl h-14 px-8 bg-gradient-to-r from-primary to-primary-dark text-white font-bold hover:shadow-lg hover:scale-105 active:scale-95 transition-all">
              <span className="material-symbols-outlined">call</span> 撥打諮詢
            </button>
            <button className="flex-1 md:flex-none flex items-center gap-2 justify-center rounded-xl h-14 px-8 bg-white/60 backdrop-blur-md text-dark-text border border-white font-bold hover:bg-white/80 transition-all shadow-sm">
              <span className="material-symbols-outlined">edit_note</span> 線上留言
            </button>
          </div>
        </div>

        {/* Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-24">
          {SERVICES.map((service) => (
            <div key={service.id} className="flex flex-col bg-gradient-to-br from-white/80 to-white/40 backdrop-blur-md rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all border border-white/50">
              <div className="w-full aspect-[16/9] overflow-hidden">
                <img src={service.image} alt={service.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="p-8 flex flex-col flex-1">
                <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
                <p className="text-sage-green text-base mb-6 leading-relaxed">{service.description}</p>
                <ul className="space-y-4 mb-8 flex-1">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-sm font-medium">
                      <span className="material-symbols-outlined text-primary">check_circle</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <button className="w-full md:w-fit px-10 py-3 rounded-xl border-2 border-primary/50 bg-white/50 backdrop-blur-sm text-primary font-bold hover:bg-gradient-to-r hover:from-primary hover:to-primary-dark hover:text-white transition-all transform hover:-translate-y-0.5 shadow-sm">
                  了解更多細節
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Process Section */}
        <div className="relative rounded-3xl p-10 md:p-16 mb-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-warm-beige/80 to-white/40 backdrop-blur-xl -z-10"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(89,181,147,0.1),transparent)] -z-10"></div>
          
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black mb-4">服務申請流程</h2>
            <p className="text-sage-green max-w-xl mx-auto">簡單四步驟，為您的家人開啟專屬的溫馨照護服務計畫。</p>
          </div>

          <div className="relative grid grid-cols-1 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {/* Timeline connectors (Desktop only) */}
            <div className="hidden md:block absolute top-10 left-16 right-16 h-0.5 bg-gradient-to-r from-primary/10 via-primary/30 to-primary/10 -z-0"></div>

            {[
              { icon: 'chat', title: '線上諮詢', desc: '透過電話、LINE或官網預約初步諮詢' },
              { icon: 'home_health', title: '到府評估', desc: '專業社工與護理師親自到府了解需求' },
              { icon: 'assignment_turned_in', title: '擬定計畫', desc: '量身打造最合適的照護方案與報價' },
              { icon: 'celebration', title: '開始服務', desc: '合約簽署完成，正式啟動專業長照服務' }
            ].map((step, i) => (
              <div key={i} className="flex flex-col items-center text-center group relative z-10">
                <div className="w-20 h-20 flex items-center justify-center bg-white/80 backdrop-blur-md rounded-full border-2 border-primary/30 text-primary mb-6 shadow-md group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-primary-dark group-hover:text-white group-hover:border-transparent transition-all duration-300">
                  <span className="material-symbols-outlined text-4xl">{step.icon}</span>
                </div>
                <h4 className="font-bold text-xl mb-3">{step.title}</h4>
                <p className="text-sm text-sage-green leading-relaxed px-4">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Services;
