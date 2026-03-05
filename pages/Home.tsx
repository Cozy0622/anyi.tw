
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as THREE from 'three';

gsap.registerPlugin(ScrollTrigger);

const CORE_SERVICES = [
  { 
    id: '01', 
    title: '建設與無障礙空間', 
    english: 'Construction & Accessibility',
    link: '/accessibility',
    desc: '長照大樓標案建設 · 養護機構經營 · 室內設計 · 無障礙施工',
    sub: '※ 大鎵營造戰略合作 (施工全透明錄影紀錄)',
    img: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1200&auto=format&fit=crop'
  },
  { 
    id: '02', 
    title: 'AI 科技與數位化', 
    english: 'AI Tech & Digital DX',
    desc: 'AI智慧輔具 · AI智慧資料整合 · 自動化存儲資料',
    sub: '※ 專屬軟體開發 · 網頁設計 · 社群媒體經營',
    img: 'https://images.unsplash.com/photo-1551076805-e1869033e561?q=80&w=1200&auto=format&fit=crop'
  },
  { 
    id: '03', 
    title: '設備與耗材供應', 
    english: 'Medical Equipment Supply',
    desc: '醫療器材供應 · 醫療器材團購 · 輔具維修',
    sub: '※ 租賃墊付服務 · 營養品販賣 (含定期訂購)',
    img: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1200&auto=format&fit=crop'
  },
  { 
    id: '04', 
    title: '人文關懷與協會', 
    english: 'Humanity & Community',
    desc: '長照服務代辦 · 在地化長照定期課程 · 老人活動策劃',
    sub: '※ 結合「愛無界長照發展協會」擴大服務',
    img: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?q=80&w=1200&auto=format&fit=crop'
  }
];

const Home: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, alpha: true, antialias: false, powerPreference: "high-performance" });
    const resize = () => {
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', resize);
    resize();

    const material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) }
      },
      vertexShader: `void main() { gl_Position = vec4(position, 1.0); }`,
      fragmentShader: `
        uniform float time;
        uniform vec2 resolution;
        void main() {
          vec2 uv = gl_FragCoord.xy / resolution.xy;
          float fluid = sin(uv.x * 2.5 + time * 0.1) * cos(uv.y * 1.5 + time * 0.15);
          fluid += sin(uv.y * 4.0 - time * 0.05) * 0.5;
          vec3 baseColor = vec3(0.22, 0.24, 0.26);
          vec3 highlightColor = vec3(0.32, 0.38, 0.35);
          vec3 finalColor = mix(baseColor, highlightColor, fluid + 0.5);
          gl_FragColor = vec4(finalColor, 1.0);
        }
      `
    });
    const plane = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
    scene.add(plane);

    let animationFrameId: number;
    const animate = (time: number) => {
      if (window.scrollY < window.innerHeight || window.scrollY > (document.body.scrollHeight - window.innerHeight * 2)) {
        material.uniforms.time.value = time * 0.001;
        renderer.render(scene, camera);
      }
      animationFrameId = requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
      tl.from('.hero-col', { clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)', duration: 1.5, stagger: 0.15 })
      .to('.hero-title', { y: 0, duration: 1.5 }, '-=1.2')
      .to('.hero-subtitle', { y: 0, duration: 1.2 }, '-=1.0')
      .from('.hero-scroll', { opacity: 0, y: 20, duration: 1 }, '-=0.5');

      gsap.utils.toArray('.service-item').forEach((item: any) => {
        gsap.from(item, { scrollTrigger: { trigger: item, start: 'top 90%' }, y: 40, opacity: 0, duration: 1, ease: 'power3.out' });
      });
    }, containerRef);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
      ctx.revert();
    };
  }, []);

  return (
    <div className="flex-1 relative bg-[#222222] text-white overflow-x-hidden" ref={containerRef}>
      <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none" />
      
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 flex justify-evenly">
        {[1, 2, 3, 4].map(i => <div key={i} className="w-[1px] h-full bg-white/[0.05]" />)}
      </div>

      <section className="relative h-[100svh] w-full flex overflow-hidden z-0 bg-[#222222]">
        {CORE_SERVICES.map((s, idx) => (
          <div key={s.id} className={`flex-1 h-full relative hero-col group/col${idx+1} z-10 ${idx < 3 ? 'border-r border-white/10' : ''}`} 
               style={{ background: `#333333 url('${s.img}') center/cover` }}>
            <div className="absolute bottom-16 left-0 w-full text-center z-20">
              <span className="text-[10px] tracking-[0.4em] uppercase font-black text-white/70 group-hover:text-emerald-400 transition-colors duration-500">{s.english}</span>
            </div>
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 flex flex-col justify-center items-center z-10 pointer-events-none text-center px-4">
          <div className="overflow-hidden">
            <h1 className="text-6xl md:text-[10.5rem] font-black tracking-tighter uppercase hero-title transform translate-y-full leading-none text-white italic">
              Care <span className="text-transparent" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.8)' }}>Redefined</span>
            </h1>
          </div>
          <div className="overflow-hidden mt-8">
            <p className="text-xl md:text-3xl font-bold tracking-[0.4em] hero-subtitle transform translate-y-full text-emerald-100">全方位智慧長照生態系</p>
          </div>
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 opacity-70 hero-scroll pointer-events-none">
          <span className="text-xs uppercase tracking-widest font-bold text-white/60 text-[10px]">向下滑動探索</span>
          <div className="w-[1px] h-12 bg-white/20 overflow-hidden relative">
            <div className="w-full h-full bg-emerald-400 absolute top-0 left-0 animate-pulse"></div>
          </div>
        </div>
      </section>

      <section id="about" className="py-40 px-6 md:px-12 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-xs text-emerald-400 font-bold mb-12 flex items-center gap-4 tracking-[0.8em] uppercase text-[10px]">
            <span className="w-12 h-[1px] bg-emerald-400/50"></span> Vision & Identity
          </div>
          <h2 className="text-4xl md:text-7xl font-light mb-28 leading-snug text-[#E5E5E5] tracking-tighter uppercase italic">
            重塑長照標準，<br />融合<span className="text-white/40 font-thin not-italic">科技精準</span>與<span className="text-white/40 font-thin not-italic">人文溫感</span>。
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { title: '智慧長照大腦', desc: 'AI智慧輔具、自動化資料存儲與整合分析。結合頂尖軟體開發與專屬網頁設計，打造數位化照護平台。' },
              { title: '無障礙空間美學', desc: '專精長照大樓標案建設、養護機構經營與室內設計。施工全透明，搭配大鎵營造專業紀錄。', link: '/accessibility' },
              { title: '全方位服務與社群', desc: '醫療器材供應、輔具維修、租賃墊付。串聯「愛無界長照發展協會」，提供豐富長者活動。' }
            ].map((v) => (
              <div key={v.title} className="p-0 flex flex-col justify-start min-h-[300px] text-left">
                <div className="w-full h-[1px] bg-white/10 mb-12"></div>
                <h3 className="text-3xl md:text-4xl font-black mb-8 text-white tracking-tighter uppercase italic leading-tight">{v.title}</h3>
                <p className="text-gray-400 text-lg leading-relaxed font-normal max-w-sm">{v.desc}</p>
                {v.link && (
                  <Link to={v.link} className="mt-8 text-emerald-400 text-[10px] font-black tracking-[0.4em] uppercase hover:text-white transition-colors">
                    Explore Details →
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="py-40 relative z-10 bg-[#1a1a1a] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-xs text-emerald-400 font-bold mb-16 flex items-center gap-4 tracking-[0.6em] uppercase text-[10px]">
            <span className="w-12 h-[1px] bg-emerald-400/50"></span> Service Ecosystem
          </div>
          <div className="flex flex-col md:flex-row justify-between items-end mb-32 gap-10">
            <h2 className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.9] italic uppercase text-white">細緻入微。<br /><span className="text-white/20 font-thin not-italic">無所不包。</span></h2>
            <p className="text-gray-400 max-w-sm mt-10 md:mt-0 font-medium text-lg leading-relaxed">安一建立了一個自給自足且不斷進化的長照生態系，為您守護生命中最珍視的時光。</p>
          </div>
          
          <div className="space-y-12">
            {CORE_SERVICES.map((s) => (
              <div key={s.id} className="service-item group grid grid-cols-1 lg:grid-cols-12 gap-10 items-center border-b border-white/5 pb-12">
                <div className="lg:col-span-4 relative aspect-[16/10] bg-[#333333] rounded-3xl overflow-hidden">
                   <img src={s.img} alt={s.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                   <div className="absolute inset-0 bg-emerald-500/5 translate-y-full group-hover:translate-y-0 transition-transform duration-700"></div>
                </div>
                <div className="lg:col-span-8 flex flex-col md:flex-row md:items-center justify-between gap-10">
                  <div className="max-w-md">
                    <h3 className="text-3xl md:text-5xl font-black mb-4 tracking-tighter group-hover:text-emerald-400 transition-colors uppercase text-white italic">{s.title}</h3>
                    <p className="text-gray-400 font-medium leading-loose">{s.desc}</p>
                    <p className="text-emerald-500/80 text-sm font-black mt-4 tracking-wider uppercase text-[10px]">{s.sub}</p>
                  </div>
                  <div className="md:text-right shrink-0">
                    {s.link ? (
                      <Link to={s.link} className="inline-flex size-20 rounded-full border border-white/10 items-center justify-center hover:bg-white hover:text-black transition-all duration-500 text-white">
                        <span className="text-2xl">→</span>
                      </Link>
                    ) : (
                      <div className="text-[10px] font-black tracking-[0.5em] text-white/5 vertical-text uppercase hidden md:block">
                        Integrity / Professional
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
