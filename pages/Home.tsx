
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as THREE from 'three';

gsap.registerPlugin(ScrollTrigger);

// 核心服務數據
const CORE_SERVICES = [
  { 
    id: '01', 
    title: '建設與無障礙空間', 
    english: 'Construction',
    img: 'https://images.unsplash.com/photo-1584622781564-1d9876a13300?q=80&w=1200&auto=format&fit=crop',
    desc: '長照大樓標案建設 · 養護機構經營 · 室內設計 · 無障礙施工',
    sub: '※ 施工全透明 (專業攝影團隊錄影紀錄)'
  },
  { 
    id: '02', 
    title: 'AI 科技與數位化', 
    english: 'AI Tech',
    img: 'https://images.unsplash.com/photo-1551076805-e1869033e561?q=80&w=1200&auto=format&fit=crop',
    desc: 'AI智慧輔具 · AI智慧資料整合 · 自動化存儲資料',
    sub: '※ 專屬軟體開發 · 網頁設計 · 社群媒體經營'
  },
  { 
    id: '03', 
    title: '設備與耗材供應', 
    english: 'Equipment',
    img: 'https://images.unsplash.com/photo-1530639834082-05bafb81bfad?q=80&w=1200&auto=format&fit=crop',
    desc: '醫療器材供應 · 醫療器材團購 · 輔具維修',
    sub: '※ 租賃墊付服務 · 營養品販賣 (含定期訂購)'
  },
  { 
    id: '04', 
    title: '人文關懷與協會', 
    english: 'Human Care',
    img: 'https://images.unsplash.com/photo-1581578731522-540420621305?q=80&w=1200&auto=format&fit=crop',
    desc: '長照服務代辦 · 在地化長照定期課程 · 老人活動策劃',
    sub: '※ 結合「愛無界長照發展協會」擴大服務'
  }
];

const Home: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. WebGL 背景初始化
    if (!canvasRef.current) return;
    
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const renderer = new THREE.WebGLRenderer({ 
      canvas: canvasRef.current, 
      alpha: true, 
      antialias: false 
    });
    
    const handleResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);
    handleResize();

    const material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) }
      },
      vertexShader: `
        void main() {
          gl_Position = vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform vec2 resolution;

        void main() {
          vec2 uv = gl_FragCoord.xy / resolution.xy;
          float fluid = sin(uv.x * 2.5 + time * 0.1) * cos(uv.y * 1.5 + time * 0.15);
          fluid += sin(uv.y * 4.0 - time * 0.05) * 0.5;
          
          vec3 baseColor = vec3(0.08, 0.09, 0.10);
          vec3 highlightColor = vec3(0.12, 0.18, 0.16);
          vec3 finalColor = mix(baseColor, highlightColor, fluid + 0.5);
          gl_FragColor = vec4(finalColor, 1.0);
        }
      `
    });

    const plane = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
    scene.add(plane);

    let animationFrameId: number;
    const animate = (time: number) => {
      material.uniforms.time.value = time * 0.001;
      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);

    // 2. GSAP 進場動畫
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
      
      tl.to('.hero-col', {
        clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
        duration: 2,
        stagger: 0.15
      })
      .to('.hero-title', {
        y: 0,
        duration: 1.5
      }, '-=1.2')
      .to('.hero-subtitle', {
        y: 0,
        duration: 1.2
      }, '-=1.0')
      .from('.hero-scroll', {
        opacity: 0,
        y: 20,
        duration: 1
      }, '-=0.5');

      // 服務列表滾動動畫
      gsap.utils.toArray('.service-row').forEach((row: any) => {
        gsap.from(row, {
          scrollTrigger: {
            trigger: row,
            start: 'top 90%',
            toggleActions: "play none none reverse"
          },
          y: 60,
          opacity: 0,
          duration: 1,
          ease: 'power3.out'
        });
      });
    }, heroRef);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      ctx.revert();
      renderer.dispose();
      material.dispose();
    };
  }, []);

  return (
    <div className="flex-1 relative bg-[#0a0a0a]" ref={heroRef}>
      {/* WebGL Canvas */}
      <canvas 
        ref={canvasRef} 
        className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none"
      />

      {/* 垂直參考線 */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 flex justify-evenly">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="w-[1px] h-full bg-white/[0.05]" />
        ))}
      </div>

      {/* Hero Section (4-Column Clip) */}
      <section className="relative h-[100svh] w-full flex overflow-hidden group/hero">
        {CORE_SERVICES.map((s, idx) => (
          <div key={s.id} className={`w-1/4 h-full relative hero-col group/col${idx+1} transition-all duration-500 hover:grayscale-0 grayscale-[20%]`} 
            style={{ 
              background: `url('${s.img}') center/cover`,
              clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)'
            }}>
            <div className="absolute bottom-12 left-0 w-full text-center opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0 pointer-events-none">
              <span className="text-[10px] tracking-[0.5em] uppercase font-black text-white bg-black/50 backdrop-blur-md px-6 py-3 rounded-full border border-white/10 shadow-2xl">
                {s.id} / {s.english}
              </span>
            </div>
          </div>
        ))}

        {/* Hero 文字疊層 */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/30 flex flex-col justify-center items-center z-10 pointer-events-none text-center px-4">
          <div className="overflow-hidden">
            <h1 className="text-6xl md:text-[10rem] font-black tracking-tighter uppercase hero-title transform translate-y-full leading-none text-white">
              Care <span className="text-transparent" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.9)' }}>Redefined</span>
            </h1>
          </div>
          <div className="overflow-hidden mt-8">
            <p className="text-xl md:text-3xl font-bold tracking-[0.3em] hero-subtitle transform translate-y-full text-emerald-100/90">
              全方位智慧長照生態系
            </p>
          </div>
        </div>
        
        {/* 滾動提示 */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 opacity-70 hero-scroll pointer-events-none">
          <span className="text-xs uppercase tracking-widest font-bold text-white/60">向下滑動探索</span>
          <div className="w-[1px] h-12 bg-white/20 overflow-hidden relative">
            <div className="w-full h-full bg-emerald-400 absolute top-0 left-0 animate-[scrollLine_2s_infinite]"></div>
          </div>
        </div>
      </section>

      {/* 品牌願景 (Vision/About) */}
      <section id="about" className="py-40 px-6 md:px-12 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-xs text-emerald-400 font-bold mb-12 flex items-center gap-4 tracking-widest uppercase">
            <span className="w-12 h-[1px] bg-emerald-400"></span> 01 / 品牌願景
          </div>
          <h2 className="text-4xl md:text-7xl font-black mb-28 leading-snug text-white tracking-tight">
            重塑長照標準，<br />
            融合<span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-cyan-300">科技精準</span>與<span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-orange-300">人文溫感</span>。
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { title: '智慧長照大腦', desc: 'AI智慧輔具、自動化資料存儲與整合分析。結合頂尖軟體開發與專屬網頁設計，打造數位化照護平台。', icon: '🧠' },
              { title: '無障礙空間美學', desc: '專精長照大樓標案建設、養護機構經營與室內設計。施工全透明，搭配專業攝影團隊紀錄。', icon: '🏛️' },
              { title: '全方位服務與社群', desc: '醫療器材供應、輔具維修、租賃墊付。串聯「愛無界長照發展協會」，提供豐富長者活動。', icon: '🤝' }
            ].map((v) => (
              <div key={v.title} className="bg-white/5 backdrop-blur-2xl p-12 rounded-[2.5rem] border border-white/10 hover:bg-white/10 transition-all duration-500 hover:-translate-y-2">
                <div className="text-4xl mb-8">{v.icon}</div>
                <h3 className="text-2xl font-bold mb-5 text-white">{v.title}</h3>
                <p className="text-gray-400 text-lg leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 服務生態 (Ecosystem) */}
      <section id="services" className="py-40 relative z-10 bg-[#f4f7f5] text-[#0a0a0a] rounded-t-[4rem] md:rounded-t-[6rem] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-xs text-gray-500 font-bold mb-16 flex items-center gap-4 tracking-widest uppercase">
            <span className="w-12 h-[1px] bg-gray-500"></span> 02 / 服務生態
          </div>
          <div className="flex flex-col md:flex-row justify-between items-end mb-28">
            <h2 className="text-5xl md:text-8xl font-black tracking-tighter leading-tight">細緻入微。<br />無所不包。</h2>
            <p className="text-gray-600 max-w-sm mt-10 md:mt-0 font-medium text-xl leading-relaxed">我們建立了一個自給自足且不斷進化的長照生態系。</p>
          </div>
          <div className="space-y-0 border-t border-black/10">
            {CORE_SERVICES.map((s) => (
              <div key={s.id} className="service-row border-b border-black/10 py-14 flex flex-col md:flex-row md:items-center justify-between group relative overflow-hidden px-8 hover:bg-black/5 transition-all duration-500">
                <div className="flex flex-col md:flex-row md:items-center gap-8 md:gap-20 relative z-10 w-full">
                  <span className="text-4xl font-light text-gray-400 group-hover:text-emerald-600 transition-colors">{s.id}</span>
                  <h3 className="text-3xl md:text-6xl font-bold tracking-tight group-hover:translate-x-2 transition-transform duration-500">{s.title}</h3>
                  <div className="flex-1 text-gray-700 font-medium md:text-right mt-6 md:mt-0 text-xl leading-relaxed">
                    {s.desc}<br /><span className="text-emerald-700 text-sm font-black tracking-wider">{s.sub}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 合作夥伴與最後呼籲 (Partners/CTA) */}
      <section id="partners" className="py-48 px-6 md:px-12 relative z-10 bg-[#121414] text-center">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          <h2 className="text-5xl md:text-[10rem] font-black mb-20 uppercase leading-none text-white tracking-tighter">
            Start <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-cyan-300">Future Care</span>
          </h2>
          <Link to="/contact" className="group relative inline-flex items-center gap-6 bg-white text-black px-16 py-8 rounded-full font-black text-2xl hover:bg-emerald-400 hover:text-white transition-all shadow-[0_0_60px_rgba(52,211,153,0.2)]">
            啟動未來照護
            <span className="text-3xl group-hover:translate-x-2 transition-transform">→</span>
          </Link>
          <footer className="mt-56 text-xs text-gray-600 uppercase tracking-[0.6em] w-full border-t border-white/5 pt-12">
            &copy; 2026 ANYI CARE. ALL RIGHTS RESERVED. DESIGNED FOR EXCELLENCE.
          </footer>
        </div>
      </section>

      <style>{`
        @keyframes scrollLine {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
      `}</style>
    </div>
  );
};

export default Home;
