
import React, { useEffect, useRef } from 'react';
import { SERVICES } from '../constants';
import * as THREE from 'three';
import gsap from 'gsap';

const Services: React.FC = () => {
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

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="min-h-screen relative bg-[#222222] text-white" ref={containerRef}>
      <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none" />
      
      <main className="relative z-10 pt-48 pb-32 px-6 md:px-20">
        <div className="max-w-7xl mx-auto">
          
          <div className="flex flex-col gap-6 mb-32 max-w-4xl">
            <span className="text-emerald-400 font-bold tracking-[0.6em] uppercase text-xs">Ecosystem Services</span>
            <h1 className="text-6xl md:text-8xl font-black leading-[0.9] tracking-tighter">
              細緻入微。<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">全方位照護</span>。
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mt-10 leading-relaxed font-light">
              安一深知每位長者的需求獨一無二。我們建立了自給自足的長照生態系，從空間營造到 AI 科技，為尊榮長者守護安穩的晚年。
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-40">
            {SERVICES.map((service) => (
              <div key={service.id} className="group relative bg-white/5 backdrop-blur-xl rounded-[3rem] overflow-hidden border border-white/10 hover:border-emerald-500/30 transition-all duration-700 flex flex-col shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                
                <div className="w-full aspect-[16/10] overflow-hidden relative">
                  <img src={service.image} alt={service.title} className="w-full h-full object-cover group-hover:scale-105 transition-all duration-1000" />
                </div>

                <div className="p-10 md:p-14 flex flex-col flex-1 relative z-10">
                  <h3 className="text-3xl md:text-4xl font-black mb-6 tracking-tight">{service.title}</h3>
                  <p className="text-gray-300 text-lg mb-10 leading-relaxed font-medium">{service.description}</p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-3 text-sm text-gray-200 font-medium">
                        <div className="size-1.5 bg-emerald-500 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                        {feature}
                      </div>
                    ))}
                  </div>

                  <button className="mt-auto w-fit group/btn flex items-center gap-4 text-emerald-400 font-bold tracking-widest uppercase text-xs">
                    了解更多細節 Explore More
                    <span className="text-xl group-hover/btn:translate-x-2 transition-transform">→</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          <section className="relative rounded-[4rem] p-12 md:p-24 overflow-hidden border border-white/10 bg-white/5 backdrop-blur-2xl">
            <div className="absolute top-0 right-0 p-20 opacity-[0.05] font-black text-[15rem] leading-none pointer-events-none uppercase">Step</div>
            
            <div className="relative z-10 mb-20">
              <span className="text-emerald-400 font-bold tracking-[0.4em] uppercase text-xs mb-4 block">Application Process</span>
              <h2 className="text-5xl md:text-6xl font-black tracking-tighter italic text-white">服務申請流程</h2>
            </div>

            <div className="relative grid grid-cols-1 md:grid-cols-4 gap-12 max-w-6xl">
              {[
                { icon: 'chat', title: '線上諮詢', desc: '透過電話、LINE或官網預約初步諮詢' },
                { icon: 'home_health', title: '到府評估', desc: '專業社工與護理師親自到府了解需求' },
                { icon: 'assignment_turned_in', title: '擬定計畫', desc: '量身打造最合適的照護方案與報價' },
                { icon: 'celebration', title: '開始服務', desc: '合約簽署完成，正式啟動專業服務' }
              ].map((step, i) => (
                <div key={i} className="flex flex-col group">
                  <h4 className="font-bold text-xl mb-4 text-white group-hover:text-emerald-400 transition-colors">{step.title}</h4>
                  <p className="text-gray-300 leading-relaxed font-medium">{step.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <div className="mt-40 text-center py-20">
             <h3 className="text-4xl md:text-6xl font-black mb-12 tracking-tighter text-white">準備好開啟<br /><span className="text-emerald-400">高品質照護</span>了嗎？</h3>
             <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
                <button className="bg-white text-black px-12 py-6 rounded-full font-black text-xl hover:bg-emerald-400 hover:text-white transition-all shadow-xl">撥打諮詢 0800-000-000</button>
                <button className="bg-white/5 border border-white/10 px-12 py-6 rounded-full font-black text-xl hover:bg-white/10 transition-all text-white">線上留言與我們聯繫</button>
             </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default Services;
