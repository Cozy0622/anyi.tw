import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const PILLARS = [
  {
    num: '01',
    title: '智慧長照大腦',
    en: 'AI & Digital',
    desc: 'AI 智慧輔具、自動化資料整合，以科技精準守護每一位長者的健康數據。'
  },
  {
    num: '02',
    title: '無障礙空間美學',
    en: 'Space & Construction',
    desc: '長照大樓標案建設、養護機構經營，與大鎵營造合作，施工全透明。'
  },
  {
    num: '03',
    title: '全方位設備供應',
    en: 'Equipment & Supply',
    desc: '醫療器材供應、輔具維修、租賃墊付，讓照護資源唾手可得。'
  },
  {
    num: '04',
    title: '人文關懷與社群',
    en: 'Community & Care',
    desc: '串聯「愛無界長照發展協會」，定期課程、長者活動，讓晚年充滿溫度。'
  }
];

const About: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<Element>('.reveal').forEach((el) => {
        gsap.from(el, {
          scrollTrigger: { trigger: el, start: 'top 87%' },
          y: 44,
          opacity: 0,
          duration: 1,
          ease: 'power3.out'
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div
      className="flex-1 text-white overflow-x-hidden"
      ref={containerRef}
      style={{ background: '#0a0a0a' }}
    >
      {/* ── HERO ── */}
      <section className="relative min-h-[70vh] flex items-end overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2000&auto=format&fit=crop"
          alt="安一長照品牌願景"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to top, #0a0a0a 0%, rgba(10,10,10,0.7) 50%, rgba(10,10,10,0.2) 100%)'
          }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full pb-20 pt-40">
          <div className="flex items-center gap-4 text-emerald-400 mb-6">
            <span className="w-8 h-px bg-emerald-500/50" />
            <span className="text-[10px] font-bold tracking-[0.55em] uppercase">Brand Vision</span>
          </div>
          <h1
            className="font-black tracking-[-0.04em] leading-[0.88] text-white"
            style={{ fontSize: 'clamp(3.5rem,10vw,8rem)' }}
          >
            關於<br />
            <span
              className="text-transparent"
              style={{
                background: 'linear-gradient(135deg, #34d399, #22d3ee)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              } as React.CSSProperties}
            >
              安一長照
            </span>
          </h1>
        </div>
      </section>

      {/* ── MISSION / VISION ── */}
      <section className="py-32 lg:py-48 border-t border-white/[0.06]" style={{ background: '#0f0f0f' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="reveal flex items-center gap-4 text-emerald-400 mb-14">
            <span className="w-8 h-px bg-emerald-500/50" />
            <span className="text-[10px] font-bold tracking-[0.55em] uppercase">Mission & Vision</span>
          </div>

          <h2 className="reveal text-4xl md:text-6xl lg:text-7xl font-light leading-[1.1] tracking-tight text-gray-200 mb-20">
            重塑長照標準，<br />
            融合<span className="text-white/25 font-thin">科技精準</span><br />
            與<span className="text-white/25 font-thin">人文溫感</span>。
          </h2>

          <div className="reveal grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                icon: (
                  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" className="text-emerald-400">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ),
                title: '使命',
                desc: '提供全方位的專業照護，提升長者生活品質，延續家庭的溫暖笑容。'
              },
              {
                icon: (
                  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" className="text-emerald-400">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 8v4l3 3" />
                  </svg>
                ),
                title: '願景',
                desc: '成為台灣最值得信賴的長期照顧服務品牌，定義高齡照護的新標竿。'
              }
            ].map((v) => (
              <div
                key={v.title}
                className="group p-10 rounded-3xl border border-white/[0.07] hover:border-emerald-500/20 transition-all duration-500"
                style={{ background: 'rgba(255,255,255,0.02)' }}
              >
                <div className="size-11 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-8">
                  {v.icon}
                </div>
                <h3 className="text-2xl font-black mb-4 tracking-tight group-hover:text-emerald-400 transition-colors duration-300">
                  {v.title}
                </h3>
                <p className="text-gray-500 leading-relaxed text-sm">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ORIGIN STORY ── */}
      <section className="py-32 lg:py-48 border-t border-white/[0.06]" style={{ background: '#0a0a0a' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div className="reveal order-2 lg:order-1">
            <div className="aspect-[4/3] rounded-3xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?q=80&w=1200&auto=format&fit=crop"
                alt="服務初衷"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="reveal order-1 lg:order-2">
            <div className="flex items-center gap-4 text-emerald-400 mb-10">
              <span className="w-8 h-px bg-emerald-500/50" />
              <span className="text-[10px] font-bold tracking-[0.55em] uppercase">Our Story</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-10">服務初衷</h2>
            <div className="space-y-6 text-gray-500 text-sm leading-[1.9]">
              <p>
                「安一長照」的起源，來自創辦人自身照顧年邁雙親的親身經歷。在尋求資源的過程中，
                我們發現長者除了醫療技術外，更需要「被尊重」與「被陪伴」的溫暖。
              </p>
              <blockquote
                className="py-7 px-8 rounded-2xl border-l-2 border-emerald-500/40 italic text-white/80 text-base font-light leading-relaxed"
                style={{ background: 'rgba(16,185,129,0.04)' }}
              >
                「我們堅持把每一位服務的長者，都當作自己的家人來守護。」
              </blockquote>
              <p>
                初衷很簡單：讓每一位辛苦了一輩子的長輩，都能在舒適、尊嚴、且富有活力的環境中，
                走完人生最後一段旅程。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4 PILLARS ── */}
      <section className="py-32 lg:py-48 border-t border-white/[0.06]" style={{ background: '#0f0f0f' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="reveal flex items-center gap-4 text-emerald-400 mb-14">
            <span className="w-8 h-px bg-emerald-500/50" />
            <span className="text-[10px] font-bold tracking-[0.55em] uppercase">Four Pillars</span>
          </div>
          <h2 className="reveal text-5xl md:text-7xl font-black tracking-[-0.04em] leading-[0.9] text-white mb-20">
            四大核心支柱
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PILLARS.map((p) => (
              <div
                key={p.num}
                className="reveal group p-10 rounded-3xl border border-white/[0.07] hover:border-emerald-500/20 transition-all duration-500 flex gap-8 items-start"
                style={{ background: 'rgba(255,255,255,0.02)' }}
              >
                <span
                  className="text-5xl font-black leading-none shrink-0 transition-colors duration-300"
                  style={{ color: 'rgba(255,255,255,0.07)' }}
                >
                  {p.num}
                </span>
                <div>
                  <span className="text-[9px] text-emerald-400/70 font-bold tracking-[0.45em] uppercase block mb-3">
                    {p.en}
                  </span>
                  <h3 className="text-xl font-black tracking-tight mb-3 group-hover:text-emerald-400 transition-colors duration-300">
                    {p.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
