
import React, { useEffect, useRef } from 'react';
import { SERVICES } from '../constants';
import * as THREE from 'three';

const PROCESS_STEPS = [
  {
    num: '01',
    title: '線上諮詢',
    desc: '透過電話、LINE 或官網預約初步諮詢，說明您的照護需求。',
    img: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=800&auto=format&fit=crop'
  },
  {
    num: '02',
    title: '到府評估',
    desc: '專業社工與護理師親自到府，全面了解長者現況與家庭需求。',
    img: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?q=80&w=800&auto=format&fit=crop'
  },
  {
    num: '03',
    title: '擬定計畫',
    desc: '量身打造最合適的照護方案，提供透明報價，無隱藏費用。',
    img: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800&auto=format&fit=crop'
  },
  {
    num: '04',
    title: '開始服務',
    desc: '合約簽署完成，正式啟動專屬的高品質照護服務。',
    img: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?q=80&w=800&auto=format&fit=crop'
  },
];

const Services: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: false,
      powerPreference: 'high-performance'
    });
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
          float f = sin(uv.x * 3.0 + time * 0.07) * cos(uv.y * 2.0 + time * 0.11);
          f += sin(uv.y * 5.0 - time * 0.04) * 0.35;
          float t = clamp(f * 0.5 + 0.5, 0.0, 1.0);
          vec3 c0 = vec3(0.05, 0.06, 0.06);
          vec3 c1 = vec3(0.09, 0.12, 0.11);
          gl_FragColor = vec4(mix(c0, c1, t), 1.0);
        }
      `
    });
    const plane = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
    scene.add(plane);

    const resize = () => {
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      renderer.setSize(window.innerWidth, window.innerHeight);
      material.uniforms.resolution.value.set(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', resize);
    resize();

    let animId: number;
    const animate = (t: number) => {
      material.uniforms.time.value = t * 0.001;
      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animId);
      renderer.dispose();
    };
  }, []);

  return (
    <div
      className="min-h-screen relative text-white"
      ref={containerRef}
      style={{ background: '#0a0a0a' }}
    >
      <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none" />

      <main className="relative z-10 pt-44 pb-36 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">

          {/* Page Header */}
          <div className="mb-28 max-w-4xl">
            <div className="flex items-center gap-4 text-emerald-400 mb-8">
              <span className="w-8 h-px bg-emerald-500/50" />
              <span className="text-[10px] font-bold tracking-[0.55em] uppercase">Ecosystem Services</span>
            </div>
            <h1
              className="font-black leading-[0.88] tracking-[-0.04em] mb-10"
              style={{ fontSize: 'clamp(3.5rem,10vw,8rem)' }}
            >
              細緻入微。<br />
              <span
                className="text-transparent"
                style={{
                  background: 'linear-gradient(135deg, #34d399, #22d3ee)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                } as React.CSSProperties}
              >
                全方位照護
              </span>
              。
            </h1>
            <p className="text-gray-500 text-lg leading-relaxed max-w-xl font-light">
              安一深知每位長者的需求獨一無二。我們建立了自給自足的長照生態系，
              從空間營造到 AI 科技，為尊榮長者守護安穩的晚年。
            </p>
          </div>

          {/* Services — editorial grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-32">
            {SERVICES.map((service, idx) => (
              <div
                key={service.id}
                className={`group relative rounded-3xl border border-white/[0.07] overflow-hidden flex flex-col hover:border-emerald-500/20 transition-all duration-700 ${
                  idx === 0 ? 'lg:col-span-2' : ''
                }`}
                style={{ background: 'rgba(255,255,255,0.02)' }}
              >
                {/* Image */}
                <div
                  className="w-full overflow-hidden"
                  style={{ aspectRatio: idx === 0 ? '21/8' : '16/9' }}
                >
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60 pointer-events-none" />
                </div>

                {/* Content */}
                <div className={`p-8 md:p-12 flex flex-col flex-1 ${idx === 0 ? 'lg:flex-row lg:gap-16 lg:items-start' : ''}`}>
                  <div className={idx === 0 ? 'lg:flex-1' : ''}>
                    <h3 className="text-2xl md:text-3xl font-black mb-4 tracking-tight group-hover:text-emerald-400 transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed mb-8">{service.description}</p>
                  </div>
                  <div className={`grid grid-cols-1 sm:grid-cols-2 gap-3 ${idx === 0 ? 'lg:w-80 lg:shrink-0' : ''}`}>
                    {service.features.map((f, i) => (
                      <div key={i} className="flex items-center gap-3 text-xs text-gray-400 font-medium">
                        <div className="size-1 rounded-full bg-emerald-500 shrink-0" />
                        {f}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Process */}
          <section
            className="relative rounded-3xl border border-white/[0.07] p-10 md:p-20 mb-24 overflow-hidden"
            style={{ background: 'rgba(255,255,255,0.018)' }}
          >
            <div
              className="absolute top-0 right-0 p-16 font-black leading-none select-none pointer-events-none uppercase text-white"
              style={{ fontSize: '12rem', opacity: 0.018 }}
              aria-hidden="true"
            >
              Step
            </div>

            <div className="relative z-10 mb-16">
              <div className="flex items-center gap-4 text-emerald-400 mb-6">
                <span className="w-8 h-px bg-emerald-500/50" />
                <span className="text-[10px] font-bold tracking-[0.55em] uppercase">Application Process</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black tracking-[-0.03em] text-white">服務申請流程</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {PROCESS_STEPS.map((step, i) => (
                <div
                  key={step.num}
                  className="group relative rounded-2xl overflow-hidden flex flex-col"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
                >
                  {/* Step image */}
                  <div className="relative overflow-hidden" style={{ aspectRatio: '4/3' }}>
                    <img
                      src={step.img}
                      alt={step.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-70 group-hover:opacity-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    {/* Number badge */}
                    <div className="absolute top-4 left-4">
                      <span className="text-[10px] font-black tracking-[0.45em] uppercase px-3 py-1.5 rounded-full"
                        style={{ background: 'rgba(16,185,129,0.15)', color: '#34d399', border: '1px solid rgba(52,211,153,0.3)' }}>
                        {step.num}
                      </span>
                    </div>
                    {/* Arrow connector (not on last) */}
                    {i < PROCESS_STEPS.length - 1 && (
                      <div className="absolute top-1/2 -right-3 -translate-y-1/2 z-10 hidden lg:flex size-6 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-black">
                        →
                      </div>
                    )}
                  </div>
                  {/* Text content */}
                  <div className="p-6 flex flex-col gap-2">
                    <h4 className="font-black text-base text-white group-hover:text-emerald-400 transition-colors duration-300">
                      {step.title}
                    </h4>
                    <p className="text-gray-500 text-xs leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Bottom CTA */}
          <div className="text-center">
            <h3 className="text-4xl md:text-6xl font-black mb-6 tracking-[-0.04em] text-white leading-[0.9]">
              準備好開啟<br />
              <span className="text-emerald-400">高品質照護</span>了嗎？
            </h3>
            <p className="text-gray-500 text-base mb-12 max-w-sm mx-auto leading-relaxed">
              立即聯絡我們，讓專業團隊為您量身規劃最適合的照護方案。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="tel:0800000000"
                className="inline-flex items-center gap-3 bg-emerald-500 text-black px-10 py-4 rounded-full font-black text-sm tracking-[0.15em] uppercase hover:bg-emerald-400 transition-all duration-300 hover:gap-5"
              >
                撥打諮詢電話 →
              </a>
              <a
                href="#footer"
                className="inline-flex items-center border border-white/10 text-white/60 px-10 py-4 rounded-full font-semibold text-sm tracking-[0.15em] uppercase hover:border-white/22 hover:text-white transition-all duration-300"
              >
                線上留言
              </a>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default Services;
