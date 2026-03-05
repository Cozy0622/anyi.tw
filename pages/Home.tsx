
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as THREE from 'three';

gsap.registerPlugin(ScrollTrigger);

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
          <div key={i} className="w-[1px] h-full bg-white/[0.03]" />
        ))}
      </div>

      {/* Hero Section */}
      <section className="relative h-[100svh] w-full flex overflow-hidden group/hero">
        {/* 切片 1: 建設與無障礙空間 */}
        <div className="w-1/4 h-full relative hero-col group/col1 transition-all duration-500 hover:grayscale-0 grayscale-[20%]" 
          style={{ 
            background: "url('https://images.unsplash.com/photo-1584622781564-1d9876a13300?q=80&w=1200&auto=format&fit=crop') center/cover",
            clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)'
          }}>
          <div className="absolute bottom-10 left-0 w-full text-center opacity-0 group-hover/col1:opacity-100 transition-all duration-500 translate-y-4 group-hover/col1:translate-y-0">
            <span className="text-[10px] tracking-[0.5em] uppercase font-black text-white bg-black/40 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10">01 / Construction</span>
          </div>
        </div>

        {/* 切片 2: AI 科技與數位化 */}
        <div className="w-1/4 h-full relative hero-col group/col2 transition-all duration-500 hover:grayscale-0 grayscale-[20%]" 
          style={{ 
            background: "url('https://images.unsplash.com/photo-1551076805-e1869033e561?q=80&w=1200&auto=format&fit=crop') center/cover",
            clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)'
          }}>
          <div className="absolute bottom-10 left-0 w-full text-center opacity-0 group-hover/col2:opacity-100 transition-all duration-500 translate-y-4 group-hover/col2:translate-y-0">
            <span className="text-[10px] tracking-[0.5em] uppercase font-black text-white bg-black/40 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10">02 / AI Tech</span>
          </div>
        </div>

        {/* 切片 3: 設備與耗材供應 */}
        <div className="w-1/4 h-full relative hero-col group/col3 transition-all duration-500 hover:grayscale-0 grayscale-[20%]" 
          style={{ 
            background: "url('https://images.unsplash.com/photo-1530639834082-05bafb81bfad?q=80&w=1200&auto=format&fit=crop') center/cover",
            clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)'
          }}>
          <div className="absolute bottom-10 left-0 w-full text-center opacity-0 group-hover/col3:opacity-100 transition-all duration-500 translate-y-4 group-hover/col3:translate-y-0">
            <span className="text-[10px] tracking-[0.5em] uppercase font-black text-white bg-black/40 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10">03 / Equipment</span>
          </div>
        </div>

        {/* 切片 4: 人文關懷與協會 */}
        <div className="w-1/4 h-full relative hero-col group/col4 transition-all duration-500 hover:grayscale-0 grayscale-[20%]" 
          style={{ 
            background: "url('https://images.unsplash.com/photo-1581578731522-540420621305?q=80&w=1200&auto=format&fit=crop') center/cover",
            clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)'
          }}>
          <div className="absolute bottom-10 left-0 w-full text-center opacity-0 group-hover/col4:opacity-100 transition-all duration-500 translate-y-4 group-hover/col4:translate-y-0">
            <span className="text-[10px] tracking-[0.5em] uppercase font-black text-white bg-black/40 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10">04 / Human Care</span>
          </div>
        </div>

        {/* Hero 文字疊層 */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/30 flex flex-col justify-center items-center z-10 pointer-events-none text-center px-4">
          <div className="overflow-hidden">
            <h1 className="text-6xl md:text-[9.5rem] font-black tracking-tighter uppercase hero-title transform translate-y-full leading-none text-white">
              Care <span className="text-transparent" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.8)' }}>Redefined</span>
            </h1>
          </div>
          <div className="overflow-hidden mt-6">
            <p className="text-lg md:text-2xl font-bold tracking-[0.3em] hero-subtitle transform translate-y-full text-emerald-100">
              全方位智慧長照生態系
            </p>
          </div>
        </div>
        
        {/* 滾動提示 */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 opacity-70 hero-scroll pointer-events-none">
          <span className="text-xs uppercase tracking-widest font-bold text-white">向下滑動探索</span>
          <div className="w-[1px] h-12 bg-white/50 overflow-hidden relative">
            <div className="w-full h-full bg-emerald-400 absolute top-0 left-0 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* 核心價值 (About) */}
      <section id="about" className="py-32 px-6 md:px-12 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-xs text-emerald-400 font-bold mb-8 flex items-center gap-4 tracking-widest uppercase">
            <span className="w-12 h-[1px] bg-emerald-400"></span> 01 / 核心價值
          </div>
          <h2 className="text-4xl md:text-6xl font-black mb-24 leading-snug text-white">
            重塑長照標準，<br />
            融合<span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-cyan-300">科技精準</span>與<span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-orange-300">人文溫感</span>。
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/5 backdrop-blur-xl p-10 rounded-[2rem] border border-white/10 hover:bg-white/10 transition-all">
              <h3 className="text-2xl font-bold mb-4 text-white">智慧長照大腦</h3>
              <p className="text-gray-300 text-sm leading-loose">AI智慧輔具、自動化資料存儲與整合分析。結合頂尖軟體開發與專屬網頁設計，打造數位化照護平台。</p>
            </div>
            <div className="bg-white/5 backdrop-blur-xl p-10 rounded-[2rem] border border-white/10 hover:bg-white/10 transition-all">
              <h3 className="text-2xl font-bold mb-4 text-white">無障礙空間美學</h3>
              <p className="text-gray-300 text-sm leading-loose">專精長照大樓標案建設、養護機構經營與室內設計。施工全透明，專業錄影紀錄。</p>
            </div>
            <div className="bg-white/5 backdrop-blur-xl p-10 rounded-[2rem] border border-white/10 hover:bg-white/10 transition-all">
              <h3 className="text-2xl font-bold mb-4 text-white">全方位服務與社群</h3>
              <p className="text-gray-300 text-sm leading-loose">醫療器材供應、輔具維修、租賃墊付。串聯「愛無界長照發展協會」，提供豐富長者活動。</p>
            </div>
          </div>
        </div>
      </section>

      {/* 服務生態 (Ecosystem) */}
      <section id="services" className="py-32 relative z-10 bg-[#f4f7f5] text-[#0a0a0a] rounded-t-[3rem] md:rounded-t-[5rem] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-xs text-gray-500 font-bold mb-12 flex items-center gap-4 tracking-widest uppercase">
            <span className="w-12 h-[1px] bg-gray-500"></span> 02 / 服務生態
          </div>
          <div className="flex flex-col md:flex-row justify-between items-end mb-24">
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-tight">細緻入微。<br />無所不包。</h2>
            <p className="text-gray-600 max-w-sm mt-8 md:mt-0 font-medium leading-relaxed">我們建立了一個自給自足且不斷進化的長照生態系。</p>
          </div>
          <div className="space-y-0 border-t border-black/10">
            {[
              { id: '01', title: '建設與無障礙空間', desc: '長照大樓建設 · 養護經營 · 室內設計', sub: '※ 施工全透明 (專業攝影紀錄)' },
              { id: '02', title: 'AI 科技與數位化', desc: '智慧輔具 · 資料整合 · 自動化存儲', sub: '※ 專屬軟體開發 · 網頁設計' },
              { id: '03', title: '設備與耗材供應', desc: '醫材供應 · 團購 · 輔具維修', sub: '※ 租賃墊付 · 營養品定期訂購' },
              { id: '04', title: '人文關懷與協會', desc: '代辦服務 · 定期課程 · 老人活動', sub: '※ 結合「愛無界長照發展協會」' }
            ].map((s) => (
              <div key={s.id} className="service-row border-b border-black/10 py-10 flex flex-col md:flex-row md:items-center justify-between group relative overflow-hidden px-4 hover:bg-black/5 transition-colors">
                <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-16 relative z-10 w-full">
                  <span className="text-3xl font-light text-gray-400 group-hover:text-emerald-600 transition-colors">{s.id}</span>
                  <h3 className="text-3xl md:text-5xl font-bold tracking-tight">{s.title}</h3>
                  <div className="flex-1 text-gray-700 font-medium md:text-right mt-4 md:mt-0">
                    {s.desc}<br /><span className="text-emerald-700 text-sm font-bold">{s.sub}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA (Partners) */}
      <section id="partners" className="py-40 px-6 md:px-12 relative z-10 bg-[#121414] text-center">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          <h2 className="text-5xl md:text-[8rem] font-black mb-16 uppercase leading-none text-white">
            Start <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-cyan-300">Future Care</span>
          </h2>
          <Link to="/contact" className="inline-flex items-center gap-4 bg-white text-black px-12 py-6 rounded-full font-bold text-xl hover:bg-emerald-400 hover:text-white transition-all shadow-[0_0_50px_rgba(52,211,153,0.2)]">
            啟動未來照護
          </Link>
          <footer className="mt-40 text-xs text-gray-600 uppercase tracking-[0.5em] w-full border-t border-white/5 pt-10">
            &copy; 2026 ANYI CARE. ALL RIGHTS RESERVED.
          </footer>
        </div>
      </section>
    </div>
  );
};

export default Home;
