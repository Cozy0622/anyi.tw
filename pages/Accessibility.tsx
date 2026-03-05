
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as THREE from 'three';

gsap.registerPlugin(ScrollTrigger);

// 大鎵營造實績數據化
const TENDER_RECORDS = [
  { date: '2025-08-08', title: '嘉義縣歷史建築中央廣播電台民雄分台日式宿舍區修復工程', amount: '7,266,647', cat: '古蹟修復' },
  { date: '2025-07-22', title: '桃園市各原住民族集會所設施改善工程', amount: '2,696,015', cat: '設施改善' },
  { date: '2025-07-22', title: '航空警察局保大第四棟浴廁整修工程', amount: '2,800,000', cat: '無障礙空間' },
  { date: '2025-06-10', title: '新北市樹林地政事務所防水隔熱工程', amount: '3,640,000', cat: '防水工程' },
  { date: '2025-05-26', title: '陽明交通大學頂樓飛簷拆除工程', amount: '1,208,600', cat: '結構維護' },
  { date: '2025-05-22', title: '桃園市立大園幼兒園環境改善工程', amount: '8,621,662', cat: '校園改善' },
  { date: '2025-05-19', title: '陽明交通大學頂樓防水整修工程', amount: '2,240,000', cat: '防水工程' },
  { date: '2025-04-28', title: '國立關西高中行政大樓廁所整修工程', amount: '4,951,902', cat: '無障礙空間' },
  { date: '2025-04-23', title: '關西鎮立圖書館建築物耐震能力補強工程', amount: '6,639,760', cat: '耐震補強' },
  { date: '2025-04-11', title: '桃園市警察局大園分局辦公廳舍整修工程', amount: '2,531,877', cat: '設施整修' },
  { date: '2025-02-05', title: '航空警察局保安大隊浴廁整修工程', amount: '4,000,000', cat: '無障礙空間' },
  { date: '2024-12-23', title: '臺鐵車站美學與功能提升-日南站修復工程', amount: '43,173,754', cat: '古蹟美學' },
  { date: '2024-12-09', title: '宋屋國小老舊廁所整修工程', amount: '1,853,906', cat: '校園無障礙' },
  { date: '2024-11-11', title: '楊梅國中露臺防水隔熱整修工程', amount: '1,659,355', cat: '防水工程' },
  { date: '2024-10-14', title: '新竹縣縣定古蹟芎林鍾屋夥房修復工程', amount: '37,871,753', cat: '古蹟修復' },
  { date: '2024-10-11', title: '實踐國中校舍防水隔熱工程', amount: '4,161,359', cat: '防水工程' },
  { date: '2024-09-30', title: '中華郵政愛國大樓廁所整修工程', amount: '2,300,000', cat: '無障礙空間' },
  { date: '2024-08-02', title: '福中營區鼓樓緊急加固暨整修工程', amount: '2,919,083', cat: '結構加固' },
  { date: '2024-06-04', title: '桃園原住民族文化會館廁所環境改善', amount: '4,720,777', cat: '設施改善' },
  { date: '2024-05-27', title: '楊梅消防分隊屋頂防水暨修繕工程', amount: '8,109,051', cat: '防水修繕' },
  { date: '2024-05-21', title: '四搜分隊防水修繕工程', amount: '3,509,064', cat: '防水修繕' },
  { date: '2024-04-03', title: '歷史建築原嘉義郵局建築外觀修復', amount: '10,110,716', cat: '古蹟修復' },
  { date: '2024-03-11', title: '雙龍國小廁所整修工程', amount: '3,214,403', cat: '校園無障礙' },
  { date: '2024-02-23', title: '龜山區中隊辦公廳舍耐震補強工程', amount: '5,252,722', cat: '耐震補強' },
  { date: '2023-12-19', title: '白色恐怖景美紀念園區紀念碑整修工程', amount: '26,600,746', cat: '文化實績' },
  { date: '2023-09-15', title: '桃園楊梅戶政事務所廁所修繕工程', amount: '3,159,072', cat: '無障礙空間' }
];

const Construction: React.FC = () => {
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
      material.uniforms.time.value = time * 0.001;
      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);

    const ctx = gsap.context(() => {
      gsap.from('.reveal-text', { y: 40, opacity: 0, duration: 1.2, stagger: 0.15, ease: 'power3.out', delay: 0.5 });
      gsap.utils.toArray('.tender-row').forEach((row: any) => {
        gsap.from(row, { scrollTrigger: { trigger: row, start: 'top 95%' }, x: -20, opacity: 0, duration: 0.8, ease: 'power2.out' });
      });
    }, containerRef);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
      ctx.revert();
    };
  }, []);

  return (
    <div className="min-h-screen relative bg-[#222222] text-white overflow-x-hidden font-light" ref={containerRef}>
      <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none" />
      
      {/* Hero Section */}
      <section className="pt-60 pb-40 px-6 md:px-20 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="overflow-hidden mb-8">
            <span className="text-emerald-400 font-bold tracking-[0.8em] uppercase block reveal-text text-[10px]">Division 01 / Construction & Accessibility</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-black mb-12 tracking-tighter reveal-text leading-[0.9] uppercase">
            建設與<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 font-black">無障礙空間</span>
          </h1>
          <div className="w-20 h-[1px] bg-emerald-500/50 mb-12 reveal-text"></div>
          <p className="text-lg md:text-2xl text-gray-300 max-w-3xl leading-relaxed reveal-text font-normal">
            安一長照戰略合作夥伴：<span className="text-white font-bold">大鎵營造 (DA-JIA Construction)</span>。憑藉豐富的公共工程實績與古蹟修復經驗，我們將國家級建設工法引入照護空間，打造極致安全與美學兼具的通用建築。
          </p>
        </div>
      </section>

      {/* 重大實績 Highlight - 預留框 */}
      <section className="py-20 px-6 md:px-20 relative z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
           <div className="group relative aspect-[16/9] bg-white/5 border border-white/10 rounded-[2rem] overflow-hidden flex items-center justify-center shadow-2xl">
              <div className="text-center z-10">
                 <p className="text-emerald-400 font-black text-xs tracking-widest mb-2 uppercase">Core Project 01</p>
                 <h3 className="text-white font-bold text-2xl tracking-tight">臺鐵車站美學-日南站修復工程</h3>
                 <p className="text-white/20 text-[10px] mt-4 tracking-[0.3em] uppercase">Photo Placeholder (16:9)</p>
              </div>
              <div className="absolute bottom-0 left-0 w-full h-[2px] bg-emerald-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-700"></div>
           </div>
           <div className="group relative aspect-[16/9] bg-white/5 border border-white/10 rounded-[2rem] overflow-hidden flex items-center justify-center shadow-2xl">
              <div className="text-center z-10">
                 <p className="text-emerald-400 font-black text-xs tracking-widest mb-2 uppercase">Core Project 02</p>
                 <h3 className="text-white font-bold text-2xl tracking-tight">新竹縣縣定古蹟-芎林鍾屋夥房修復</h3>
                 <p className="text-white/20 text-[10px] mt-4 tracking-[0.3em] uppercase">Photo Placeholder (16:9)</p>
              </div>
              <div className="absolute bottom-0 left-0 w-full h-[2px] bg-cyan-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-700"></div>
           </div>
        </div>
      </section>

      {/* 標案實績 Registry */}
      <section className="py-40 px-6 md:px-20 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-10">
            <div>
              <span className="text-emerald-400 font-bold tracking-[0.4em] uppercase text-xs mb-4 block">Official Records</span>
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter italic">政府採購標案實績</h2>
            </div>
            <div className="text-right">
               <p className="text-gray-500 text-sm font-bold tracking-widest">UBN: 83462457</p>
               <p className="text-gray-400 text-[10px] tracking-widest uppercase mt-1">DA-JIA Construction Co., Ltd.</p>
            </div>
          </div>

          <div className="border-t border-white/10">
            {TENDER_RECORDS.map((item, idx) => (
              <div key={idx} className="tender-row border-b border-white/5 py-8 grid grid-cols-1 md:grid-cols-12 gap-6 items-center group hover:bg-white/[0.02] transition-colors px-4">
                <div className="md:col-span-2 text-xs font-bold text-gray-500 tracking-tighter group-hover:text-emerald-400 transition-colors">{item.date}</div>
                <div className="md:col-span-6">
                   <h4 className="text-lg md:text-xl font-bold text-white tracking-tight leading-snug">{item.title}</h4>
                   <span className="inline-block mt-2 px-3 py-1 bg-white/5 rounded text-[10px] text-gray-500 font-bold tracking-widest uppercase">{item.cat}</span>
                </div>
                <div className="md:col-span-3 text-right">
                   <span className="text-gray-500 text-[10px] tracking-widest uppercase block mb-1">Tender Amount</span>
                   <span className="text-2xl font-black text-white tracking-tighter group-hover:text-cyan-400 transition-colors">NT$ {item.amount}</span>
                </div>
                <div className="md:col-span-1 text-right opacity-0 group-hover:opacity-100 transition-opacity">
                   <div className="size-8 rounded-full border border-emerald-500/50 flex items-center justify-center text-emerald-500 ml-auto">→</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 技術規格 */}
      <section className="py-40 px-6 md:px-20 relative z-10 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="space-y-12">
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter leading-tight uppercase">
              專業營造能量<br /><span className="text-emerald-400">一體化施作承諾</span>
            </h2>
            <div className="space-y-10">
              {[
                { id: '01', title: '古蹟等級精密工法', desc: '延續大鎵營造在歷史建築修復中的嚴謹，確保每一處細節皆具備職人靈魂。' },
                { id: '02', title: '無障礙標章認證', desc: '嚴格遵循國家級無障礙設施規範，落實真正友善、有尊嚴的通用設計。' },
                { id: '03', title: '防水耐震核心技術', desc: '具備大型辦公廳舍與校園補強實績，守護長者居家的結構安全基礎。' }
              ].map((spec) => (
                <div key={spec.id} className="flex gap-8 group">
                  <div className="text-white/10 font-black text-5xl italic transition-colors group-hover:text-emerald-500/20">{spec.id}</div>
                  <div>
                    <h4 className="text-white font-bold mb-2 tracking-wide text-xl">{spec.title}</h4>
                    <p className="text-gray-400 text-sm leading-relaxed">{spec.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6">
             <div className="aspect-[3/4] rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center text-white/10 text-[10px] font-black uppercase tracking-[0.5em] vertical-text">Engineering Detail</div>
             <div className="aspect-[3/4] rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center text-white/10 text-[10px] font-black uppercase tracking-[0.5em] vertical-text mt-12">Construction Site</div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-60 px-6 md:px-20 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-7xl font-black mb-16 tracking-tighter leading-none text-white uppercase italic">
            讓國家級專業，<br /><span className="text-emerald-400">轉化為居家的溫暖</span>
          </h2>
          <Link to="/contact" className="group relative inline-flex items-center gap-6 bg-white text-black px-12 py-6 rounded-full font-black text-lg hover:bg-emerald-400 hover:text-white transition-all shadow-2xl">
            諮詢標案等級修繕方案
            <span className="text-2xl group-hover:translate-x-2 transition-transform">→</span>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Construction;
