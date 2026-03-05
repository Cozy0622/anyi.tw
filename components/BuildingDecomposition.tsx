
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const floors = [
  {
    level: 'B1',
    title: '智慧機電與防災中心',
    subtitle: 'IoT & Safety Core',
    desc: '配置 AIoT 設備監控主機、緊急備用供電與智慧尋車，確保長照機構 24 小時極限安全。',
    img: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1200'
  },
  {
    level: '1F',
    title: '聯合門診與迎賓大廳',
    subtitle: 'Continuous Care',
    desc: '挑高 6 米高透光玻璃帷幕，整合聯合門診、家屬諮詢與健康管理中心，落實一站式服務。',
    img: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=1200'
  },
  {
    level: '2F',
    title: 'WELL 健康日照與復健',
    subtitle: 'Health Standard',
    desc: '導入 MERV13 醫療級新風系統、防眩光與晝夜節律照明，創造極致健康光熱環境。',
    img: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1200'
  },
  {
    level: '3F',
    title: '去機構化溫馨居住區',
    subtitle: 'Small Home Design',
    desc: '打破傳統病房冷硬長廊，採「小家單元」配置，運用溫潤親自然材質，兼具隱私與歸屬感。',
    img: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1200'
  },
  {
    level: 'RF',
    title: '療癒景觀空中花園',
    subtitle: 'ESG & Horticulture',
    desc: '規劃無障礙平整化高架植栽槽提供園藝復健，結合太陽能板實踐 ESG 永續營運。',
    img: 'https://images.unsplash.com/photo-1449156001437-3a1621dfbe2b?q=80&w=1200' // 使用極高頻寬的穩定圖片
  }
];

const BuildingDecomposition: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>('.stack-card');
      
      cards.forEach((card, i) => {
        // 1. 基礎揭示動畫 (針對 RF 優化：最後一張不使用 opacity: 0 的 from)
        if (i < cards.length - 1) {
          gsap.from(card, {
            scrollTrigger: {
              trigger: card,
              start: 'top 90%',
              toggleActions: 'play none none reverse'
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            ease: 'power2.out'
          });

          // 釘選邏輯
          ScrollTrigger.create({
            trigger: card,
            start: "top top+=120",
            endTrigger: containerRef.current,
            end: "bottom bottom",
            pin: true,
            pinSpacing: false,
            scrub: true,
          });

          // 視差縮小效果
          gsap.to(card, {
            scrollTrigger: {
              trigger: cards[i + 1],
              start: "top bottom",
              end: "top top",
              scrub: true
            },
            scale: 0.94,
            opacity: 0.4,
            filter: "blur(10px)",
            ease: "none"
          });
        } else {
          // 最後一張 RF：確保它在捲動到時絕對顯示
          gsap.from(card, {
            scrollTrigger: {
              trigger: card,
              start: 'top 95%',
            },
            y: 30,
            opacity: 0,
            duration: 1
          });
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full bg-[#0a0a0a] pb-[40vh]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative flex flex-col">
        <div className="flex flex-col gap-[20vh] pt-10">
          {floors.map((floor, idx) => (
            <div 
              key={floor.level} 
              className="stack-card w-full flex flex-col md:flex-row items-stretch bg-[#111111] border border-white/10 rounded-[3rem] overflow-hidden shadow-2xl transform-gpu"
              style={{ transform: 'translateZ(0)' }}
            >
              {/* 圖片區域 */}
              <div className="w-full md:w-1/2 h-[350px] md:h-[550px] relative overflow-hidden bg-zinc-900">
                <img 
                  src={floor.img} 
                  alt={floor.title} 
                  className="w-full h-full object-cover"
                  onLoad={(e) => (e.currentTarget.style.opacity = '1')}
                />
                <div className="absolute top-10 left-10 z-20">
                   <span className="text-6xl md:text-8xl font-black text-white drop-shadow-[0_5px_15px_rgba(0,0,0,0.5)]">{floor.level}</span>
                </div>
              </div>

              {/* 內容區域 */}
              <div className="w-full md:w-1/2 p-12 md:p-20 flex flex-col justify-center relative">
                <div className="absolute top-0 right-0 p-10 text-emerald-500/5 font-black text-[12rem] pointer-events-none select-none">
                  {idx + 1}
                </div>
                <h4 className="text-emerald-400 font-bold tracking-[0.5em] uppercase mb-6 text-xs">{floor.subtitle}</h4>
                <h2 className="text-4xl md:text-6xl font-black text-white mb-8 leading-tight tracking-tighter">{floor.title}</h2>
                <p className="text-gray-400 text-xl md:text-2xl leading-relaxed font-medium">
                  {floor.desc}
                </p>
                <div className="mt-12 w-24 h-2 bg-emerald-500 rounded-full shadow-[0_0_20px_rgba(16,185,129,0.4)]"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BuildingDecomposition;
