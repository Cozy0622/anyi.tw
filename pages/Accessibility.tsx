
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as THREE from 'three';
import Navbar from '../components/Navbar';
import BuildingDecomposition from '../components/BuildingDecomposition';

gsap.registerPlugin(ScrollTrigger);

const Accessibility: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. WebGL 背景初始化 (保持與首頁一致的質感)
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
      // 效能節流
      const isVisible = window.scrollY < window.innerHeight || window.scrollY > (document.body.scrollHeight - window.innerHeight * 2);
      if (isVisible) {
        material.uniforms.time.value = time * 0.001;
        renderer.render(scene, camera);
      }
      animationFrameId = requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);

    // 2. GSAP 動畫
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
      
      <Navbar />

      {/* Hero Section */}
      <section className="pt-48 pb-20 px-6 md:px-20 relative z-10">
        <div className="max-w-7xl mx-auto">
          <span className="text-emerald-400 font-bold tracking-[0.5em] uppercase mb-6 block reveal-text">Space Aesthetics</span>
          <h1 className="text-6xl md:text-[8rem] font-black leading-tight mb-12 reveal-text">
            無障礙<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">空間美學</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 max-w-2xl leading-relaxed reveal-text">
            安一認為，無障礙不應只是功能的疊加，而是一種對尊嚴的致敬。我們將醫療級的安全標準，完美隱形於現代居家美學之中。
          </p>
        </div>
      </section>

      {/* 核心理念區塊 */}
      <section className="py-32 px-6 md:px-20 relative z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <div className="rounded-[3rem] overflow-hidden shadow-2xl border border-white/10 group aspect-square md:aspect-auto md:h-[600px]">
            <img 
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop" 
              alt="Accessibility Interior" 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
            />
          </div>
          <div>
            <h2 className="text-4xl md:text-5xl font-black mb-10 text-emerald-400 leading-tight">隱形化設計<br /><span className="text-white text-2xl font-bold tracking-widest uppercase opacity-50">Safety without Sacrifice</span></h2>
            <div className="space-y-8 text-gray-300 text-lg leading-loose">
              <p>我們移除傳統醫療機構的冰冷感，採用隱藏式扶手設計、地坪全平坦化工程，並結合色彩心理學打造溫馨的起居空間。</p>
              <ul className="space-y-6">
                <li className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/5"><span className="size-3 bg-emerald-500 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)]"></span> 100% 全屋無門檻平坦化工程</li>
                <li className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/5"><span className="size-3 bg-emerald-500 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)]"></span> 隱藏式高承重結構扶手 (Invisible Support)</li>
                <li className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/5"><span className="size-3 bg-emerald-500 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)]"></span> AI 智慧照明與智慧動線引導系統</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 3D 拆解模型區塊 (替換原本的 Feature Grid) */}
      <section className="relative z-10">
        <div className="py-20 px-6 text-center">
          <h2 className="text-4xl md:text-6xl font-black mb-6">次世代長照旗艦園區</h2>
          <p className="text-gray-400 tracking-[0.2em] uppercase font-bold text-sm">3D Architecture Decomposition</p>
        </div>
        <BuildingDecomposition />
      </section>

      {/* 施工透明承諾 */}
      <section className="py-40 px-6 md:px-20 text-center relative z-10 bg-[#0a0a0a]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-8xl font-black mb-12 tracking-tighter">施工全透明</h2>
          <p className="text-xl md:text-2xl text-gray-400 leading-relaxed mb-16">
            安一擁有專業攝影團隊，為每一個施工階段進行縮時攝影與 24H 錄影紀錄。<br />
            <span className="text-emerald-400 font-bold">品質與細節，讓您隨時隨地都能在線上看見。</span>
          </p>
          <Link to="/contact" className="group relative inline-flex items-center gap-6 bg-white text-black px-16 py-8 rounded-full font-black text-2xl hover:bg-emerald-400 hover:text-white transition-all shadow-2xl">
            預約空間美學評估
            <span className="text-3xl group-hover:translate-x-2 transition-transform">→</span>
          </Link>
        </div>
      </section>

      <footer className="py-20 text-center text-gray-600 text-sm border-t border-white/5 relative z-10">
        &copy; 2026 ANYI CARE. ACCESSIBILITY AESTHETICS & ARCHITECTURE.
      </footer>
    </div>
  );
};

export default Accessibility;
