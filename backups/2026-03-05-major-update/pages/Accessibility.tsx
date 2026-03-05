
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as THREE from 'three';
import BuildingDecomposition from '../components/BuildingDecomposition';

gsap.registerPlugin(ScrollTrigger);

const Accessibility: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. WebGL 背景初始化
    if (!canvasRef.current) return;
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const renderer = new THREE.WebGLRenderer({ 
      canvas: canvasRef.current, alpha: true, antialias: false, powerPreference: "high-performance" 
    });
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
      const isVisible = window.scrollY < window.innerHeight || window.scrollY > (document.body.scrollHeight - window.innerHeight * 2);
      if (isVisible) {
        material.uniforms.time.value = time * 0.001;
        renderer.render(scene, camera);
      }
      animationFrameId = requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);

    const ctx = gsap.context(() => {
      gsap.from('.reveal-text', {
        y: 80, opacity: 0, duration: 1.5, stagger: 0.2, ease: 'power4.out', delay: 0.5
      });
    }, containerRef);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
      ctx.revert();
    };
  }, []);

  return (
    <div className="min-h-screen relative bg-[#0a0a0a] text-white overflow-x-hidden" ref={containerRef}>
      <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none" />
      
      {/* Hero Section */}
      <section className="pt-48 pb-32 px-6 md:px-20 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="overflow-hidden mb-6">
            <span className="text-emerald-400 font-bold tracking-[0.6em] uppercase block reveal-text">Space Aesthetics</span>
          </div>
          <h1 className="text-6xl md:text-[9rem] font-black leading-[0.9] mb-12 tracking-tighter reveal-text">
            無障礙<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">空間美學</span>
          </h1>
          <p className="text-xl md:text-3xl text-gray-400 max-w-3xl leading-relaxed reveal-text font-light">
            安一認為，無障礙不應只是功能的疊加，而是一種對尊嚴的致敬。我們將醫療級的安全標準，完美隱形於現代居家美學之中。
          </p>
          
          <div className="mt-20 flex items-center gap-4 reveal-text">
            <div className="w-12 h-[1px] bg-emerald-500"></div>
            <span className="text-xs tracking-widest text-emerald-500 font-bold uppercase">Scroll to Explore</span>
          </div>
        </div>
      </section>

      {/* 核心理念區塊 - 左右交錯 */}
      <section className="py-32 px-6 md:px-20 relative z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="relative group">
            <div className="absolute -inset-4 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
            <div className="rounded-[3rem] overflow-hidden shadow-2xl border border-white/10 aspect-square relative">
              <img 
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop" 
                alt="Accessibility Interior" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
              />
              <div className="absolute bottom-10 left-10 bg-black/60 backdrop-blur-md p-6 rounded-3xl border border-white/10">
                 <p className="text-emerald-400 font-bold text-sm mb-1 tracking-widest">PROJECT 01</p>
                 <p className="text-white font-bold">隱形化安全扶手系統</p>
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-4xl md:text-5xl font-black mb-10 leading-tight text-white">隱形化設計<br /><span className="text-emerald-400 text-2xl font-bold tracking-widest uppercase opacity-80">Safety without Sacrifice</span></h2>
            <div className="space-y-10 text-gray-300 text-lg leading-loose">
              <p className="text-xl font-medium text-white/80">我們移除傳統醫療機構的冰冷感，採用隱藏式扶手設計、地坪全平坦化工程，並結合色彩心理學打造溫馨的起居空間。</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { title: "全屋無門檻", desc: "100% 平坦化地坪工程" },
                  { title: "隱藏扶手", desc: "結合牆面造型的高承重設計" },
                  { title: "AI 引導", desc: "智慧地面動線燈光引導" },
                  { title: "色彩療癒", desc: "經科學驗證的環境心理色調" }
                ].map((item, i) => (
                  <div key={i} className="bg-white/5 p-6 rounded-3xl border border-white/5 hover:border-emerald-500/30 transition-colors">
                    <p className="text-emerald-400 font-bold mb-1">{item.title}</p>
                    <p className="text-sm text-gray-500">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3D 拆解模型區塊 */}
      <section className="relative z-10 bg-zinc-900/30 py-40">
        <div className="max-w-7xl mx-auto px-6 mb-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
            <div>
              <p className="text-emerald-400 font-bold tracking-[0.4em] uppercase mb-4 text-xs">Architectural Logic</p>
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-white">次世代<br />長照旗艦園區</h2>
            </div>
            <div className="max-w-md text-gray-500 text-lg">
              透過 3D 建築拆解技術，我們讓您預見未來的每一層空間。從機電安全到療癒景觀，安一重新定義長照建築標準。
            </div>
          </div>
        </div>
        <BuildingDecomposition />
      </section>

      {/* 施工透明承諾 - 模擬 UI 版 */}
      <section className="py-40 px-6 md:px-20 relative z-10 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-5xl md:text-8xl font-black mb-12 tracking-tighter italic text-white">施工全透明</h2>
              <div className="space-y-8">
                <div className="flex gap-6 items-start">
                  <span className="text-5xl font-black text-emerald-500/20">01</span>
                  <div>
                    <h4 className="text-xl font-bold mb-2 text-white">24H 雲端即時監控</h4>
                    <p className="text-gray-400 leading-relaxed">家屬可隨時透過 APP 查看施工進度，品質與細節完全公開。</p>
                  </div>
                </div>
                <div className="flex gap-6 items-start">
                  <span className="text-5xl font-black text-emerald-500/20">02</span>
                  <div>
                    <h4 className="text-xl font-bold mb-2 text-white">專業縮時紀錄</h4>
                    <p className="text-gray-400 leading-relaxed">每一個施工關鍵點都備有攝影紀錄，確保結構安全無死角。</p>
                  </div>
                </div>
                <div className="flex gap-6 items-start">
                  <span className="text-5xl font-black text-emerald-500/20">03</span>
                  <div>
                    <h4 className="text-xl font-bold mb-2 text-white">數位品質履歷</h4>
                    <p className="text-gray-400 leading-relaxed">交屋時提供完整的數位材料與施工履歷，責任明確。</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="order-1 lg:order-2 relative">
               <div className="absolute -inset-10 bg-emerald-500/10 blur-[100px] rounded-full"></div>
               <div className="bg-[#1a1a1a] rounded-[2rem] border border-white/10 overflow-hidden shadow-2xl relative">
                  <div className="bg-white/5 px-6 py-4 flex items-center justify-between border-b border-white/5">
                    <div className="flex gap-2">
                      <div className="size-3 rounded-full bg-red-500/50"></div>
                      <div className="size-3 rounded-full bg-yellow-500/50"></div>
                      <div className="size-3 rounded-full bg-green-500/50"></div>
                    </div>
                    <span className="text-[10px] tracking-widest text-gray-500 font-bold uppercase">Live Camera 04 - Site Preview</span>
                  </div>
                  <div className="aspect-video relative overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1541888946425-d81bb19480c5?q=80&w=1200" 
                      className="w-full h-full object-cover grayscale opacity-50" 
                      alt="Construction Site"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                       <div className="size-20 bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center border border-white/20 group cursor-pointer hover:bg-emerald-500 transition-colors">
                          <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[18px] border-l-white border-b-[10px] border-b-transparent ml-2"></div>
                       </div>
                    </div>
                    <div className="absolute top-6 left-6 flex items-center gap-3">
                       <div className="size-2 bg-red-500 rounded-full animate-pulse"></div>
                       <span className="text-xs font-bold text-white tracking-widest bg-black/40 px-3 py-1 rounded-full">REC 00:42:15:08</span>
                    </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-60 px-6 md:px-20 text-center relative z-10 bg-[#0a0a0a]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-[7rem] font-black mb-16 tracking-tighter leading-none text-white">讓愛，<br /><span className="text-emerald-400">更自由地流動</span></h2>
          <Link to="/contact" className="group relative inline-flex items-center gap-6 bg-white text-black px-16 py-8 rounded-full font-black text-2xl hover:bg-emerald-400 hover:text-white transition-all shadow-[0_20px_60px_rgba(16,185,129,0.3)]">
            預約空間美學評估
            <span className="text-3xl group-hover:translate-x-2 transition-transform">→</span>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Accessibility;
