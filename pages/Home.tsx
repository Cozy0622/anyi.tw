
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
    desc: '長照大樓標案建設、養護機構經營、室內設計與無障礙施工',
    sub: '大鎵營造 30+ 政府標案實績',
    img: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: '02',
    title: 'AI 科技與數位化',
    english: 'AI Tech & Digital DX',
    desc: 'AI 智慧輔具、智慧資料整合、自動化存儲，打造全數位化照護平台',
    sub: '專屬軟體開發 · 網頁設計 · 社群媒體',
    img: 'https://images.unsplash.com/photo-1551076805-e1869033e561?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: '03',
    title: '設備與耗材供應',
    english: 'Medical Equipment Supply',
    desc: '醫療器材供應、輔具維修與一站式租賃墊付服務',
    sub: '醫療器材團購 · 營養品定期訂購',
    img: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: '04',
    title: '人文關懷與協會',
    english: 'Humanity & Community',
    desc: '長照服務代辦、在地化定期課程與老人活動策劃',
    sub: '愛無界長照發展協會 資源串聯',
    img: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?q=80&w=1200&auto=format&fit=crop'
  }
];

const STATS = [
  { value: '4', label: '核心服務領域', en: 'Core Domains' },
  { value: '30+', label: '政府標案實績', en: 'Gov. Contracts' },
  { value: 'AI', label: '智慧照護科技', en: 'Smart Care Tech' },
  { value: '∞', label: '人文關懷守護', en: 'Endless Warmth' },
];

const Home: React.FC = () => {
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

    let animId: number;
    const animate = (t: number) => {
      if (window.scrollY < window.innerHeight || window.scrollY > (document.body.scrollHeight - window.innerHeight * 2)) {
        material.uniforms.time.value = t * 0.001;
        renderer.render(scene, camera);
      }
      animId = requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);

    const ctx = gsap.context(() => {
      // ── Original hero entrance ──
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
      tl.from('.hero-col', { clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)', duration: 1.5, stagger: 0.15 })
        .to('.hero-title', { y: 0, duration: 1.5 }, '-=1.2')
        .to('.hero-subtitle', { y: 0, duration: 1.2 }, '-=1.0')
        .from('.hero-scroll', { opacity: 0, y: 20, duration: 1 }, '-=0.5');

      // ── Scroll reveals ──
      gsap.utils.toArray<Element>('.reveal').forEach((el) => {
        gsap.from(el, {
          scrollTrigger: { trigger: el, start: 'top 87%' },
          y: 48, opacity: 0, duration: 1, ease: 'power3.out'
        });
      });

      // Stats count-up feel
      gsap.utils.toArray<Element>('.stat-item').forEach((el, i) => {
        gsap.from(el, {
          scrollTrigger: { trigger: el, start: 'top 90%' },
          y: 30, opacity: 0, duration: 0.7, ease: 'power3.out', delay: i * 0.1
        });
      });

      gsap.utils.toArray<Element>('.svc-row').forEach((el) => {
        gsap.from(el, {
          scrollTrigger: { trigger: el, start: 'top 88%' },
          x: -24, opacity: 0, duration: 0.85, ease: 'power3.out'
        });
      });
    }, containerRef);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animId);
      ctx.revert();
      renderer.dispose();
    };
  }, []);

  return (
    <div className="flex-1 relative bg-[#222222] text-white overflow-x-hidden" ref={containerRef}>
      <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none" />

      {/* ── HERO (original 4-column design) ── */}
      <section className="relative h-[100svh] w-full flex overflow-hidden z-0 bg-[#222222]">
        {CORE_SERVICES.map((s, idx) => (
          <div
            key={s.id}
            className={`flex-1 h-full relative hero-col z-10 ${idx < 3 ? 'border-r border-white/10' : ''}`}
            style={{ background: `#333333 url('${s.img}') center/cover` }}
          >
            <div className="absolute inset-0 bg-black/30 hover:bg-black/10 transition-colors duration-700" />
            <div className="absolute bottom-16 left-0 w-full text-center z-20">
              <span className="text-[10px] tracking-[0.4em] uppercase font-black text-white/70 hover:text-emerald-400 transition-colors duration-500">
                {s.english}
              </span>
            </div>
          </div>
        ))}

        {/* Centered overlay headline */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 flex flex-col justify-center items-center z-10 pointer-events-none text-center px-4">
          <div className="overflow-hidden">
            <h1 className="text-6xl md:text-[10.5rem] font-black tracking-tighter uppercase hero-title transform translate-y-full leading-none text-white italic">
              Care{' '}
              <span className="text-transparent" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.8)' }}>
                Redefined
              </span>
            </h1>
          </div>
          <div className="overflow-hidden mt-8">
            <p className="text-xl md:text-3xl font-bold tracking-[0.4em] hero-subtitle transform translate-y-full text-emerald-100">
              全方位智慧長照生態系
            </p>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 opacity-70 hero-scroll pointer-events-none">
          <span className="text-[10px] uppercase tracking-widest font-bold text-white/60">向下滑動探索</span>
          <div className="w-[1px] h-12 bg-white/20 overflow-hidden relative">
            <div className="w-full h-full bg-emerald-400 absolute top-0 left-0 animate-pulse" />
          </div>
        </div>
      </section>

      {/* ── STATS STRIP ── */}
      <section className="relative z-10 border-b border-white/[0.06]" style={{ background: '#111111' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {STATS.map((s, i) => (
              <div
                key={i}
                className={`stat-item group flex flex-col gap-3 py-12 md:py-16 px-6 md:px-10 relative overflow-hidden
                  ${i < STATS.length - 1 ? 'border-r border-white/[0.06]' : ''}
                  ${i >= 2 ? 'border-t md:border-t-0 border-white/[0.06]' : ''}
                `}
              >
                {/* Hover glow */}
                <div className="absolute inset-0 bg-emerald-500/0 group-hover:bg-emerald-500/[0.04] transition-colors duration-500" />
                {/* Top accent line */}
                <div className="w-8 h-0.5 bg-emerald-500/40 group-hover:w-16 group-hover:bg-emerald-400 transition-all duration-500 mb-1" />
                <span
                  className="font-black leading-none tracking-tight text-white group-hover:text-emerald-300 transition-colors duration-300"
                  style={{ fontSize: 'clamp(2.8rem,6vw,5rem)' }}
                >
                  {s.value}
                </span>
                <span className="text-sm font-semibold text-white/60 group-hover:text-white/80 transition-colors duration-300">
                  {s.label}
                </span>
                <span className="text-[9px] tracking-[0.5em] uppercase text-emerald-600/50 font-bold">
                  {s.en}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── VISION ── */}
      <section className="relative z-10 py-36 lg:py-52 border-t border-white/[0.06]" style={{ background: '#0f0f0f' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="reveal flex items-center gap-4 text-emerald-400 mb-14">
            <span className="w-8 h-px bg-emerald-500/50" />
            <span className="text-[10px] font-bold tracking-[0.55em] uppercase">Vision & Identity</span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-end">
            <div className="reveal">
              <h2 className="text-4xl md:text-6xl lg:text-[4.5rem] font-light leading-[1.12] tracking-tight text-gray-200">
                重塑長照標準，<br />
                融合<span className="text-white/25 font-thin">科技精準</span><br />
                與<span className="text-white/25 font-thin">人文溫感</span>。
              </h2>
            </div>
            <div className="reveal flex flex-col divide-y divide-white/[0.07]">
              {[
                {
                  title: '智慧長照大腦',
                  desc: 'AI 智慧輔具與自動化資料整合。結合專屬軟體與網頁開發，打造數位化照護平台。'
                },
                {
                  title: '無障礙空間美學',
                  desc: '長照大樓標案建設與養護機構經營。大鎵營造 30+ 政府標案，施工全透明紀錄。',
                  link: '/accessibility'
                },
                {
                  title: '全方位服務社群',
                  desc: '醫療器材供應、輔具維修與租賃墊付。串聯愛無界協會，豐富長者每一天。'
                }
              ].map((v) => (
                <div key={v.title} className="group py-8 flex items-start justify-between gap-8">
                  <div className="flex-1">
                    <h3 className="text-lg font-black mb-2.5 tracking-tight text-white group-hover:text-emerald-400 transition-colors duration-300">
                      {v.title}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
                  </div>
                  {v.link && (
                    <Link to={v.link} className="shrink-0 text-emerald-500/60 hover:text-emerald-400 transition-colors text-base mt-1">→</Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="relative z-10 py-36 lg:py-52 border-t border-white/[0.06]" style={{ background: '#0a0a0a' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="reveal flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
            <div>
              <div className="flex items-center gap-4 text-emerald-400 mb-6">
                <span className="w-8 h-px bg-emerald-500/50" />
                <span className="text-[10px] font-bold tracking-[0.55em] uppercase">Service Ecosystem</span>
              </div>
              <h2 className="text-5xl md:text-7xl font-black tracking-[-0.04em] leading-[0.9] text-white">
                細緻入微。<br />
                <span className="text-white/15 font-thin">無所不包。</span>
              </h2>
            </div>
            <p className="text-gray-500 max-w-xs text-sm leading-relaxed">
              安一建立了自給自足且不斷進化的長照生態系，為您守護生命中最珍貴的時光。
            </p>
          </div>
          <div>
            {CORE_SERVICES.map((s) => (
              <div
                key={s.id}
                className="svc-row group border-t border-white/[0.07] py-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center hover:border-emerald-500/20 transition-colors duration-500"
              >
                <div className="lg:col-span-1 text-[10px] font-black tracking-[0.35em] text-white/15 group-hover:text-emerald-500/40 transition-colors duration-300">
                  {s.id}
                </div>
                <div className="lg:col-span-3 overflow-hidden rounded-xl" style={{ aspectRatio: '16/9' }}>
                  <img src={s.img} alt={s.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="lg:col-span-5">
                  <span className="text-[9px] font-bold tracking-[0.45em] uppercase text-emerald-500/60 block mb-3">{s.english}</span>
                  <h3 className="text-2xl md:text-3xl font-black tracking-tight mb-3 text-white group-hover:text-emerald-400 transition-colors duration-300">{s.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
                </div>
                <div className="lg:col-span-3 flex lg:flex-col lg:items-end gap-4">
                  <p className="text-[9px] font-bold tracking-wider uppercase text-emerald-600/60">{s.sub}</p>
                  {s.link ? (
                    <Link to={s.link} className="text-[10px] font-black tracking-[0.35em] uppercase text-white/25 hover:text-emerald-400 transition-colors duration-300 group-hover:text-emerald-400 flex items-center gap-1.5">
                      詳細了解 →
                    </Link>
                  ) : (
                    <span className="text-[10px] font-black tracking-[0.35em] uppercase text-white/8">Professional</span>
                  )}
                </div>
              </div>
            ))}
            <div className="border-t border-white/[0.07]" />
          </div>
        </div>
      </section>

      {/* ── PROMISE ── */}
      <section className="relative z-10 py-44 lg:py-60 border-t border-white/[0.06] overflow-hidden" style={{ background: '#0f0f0f' }}>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none" aria-hidden="true">
          <span className="font-black text-white leading-none tracking-tighter uppercase" style={{ fontSize: 'clamp(8rem,22vw,22rem)', opacity: 0.018 }}>
            CARE
          </span>
        </div>
        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center relative z-10 reveal">
          <div className="w-8 h-px bg-emerald-500/35 mx-auto mb-16" />
          <blockquote className="text-2xl md:text-4xl lg:text-[2.6rem] font-light leading-[1.45] text-gray-200 tracking-tight">
            「每一位辛苦了一輩子的長輩，<br className="hidden md:block" />
            都值得在舒適、尊嚴、<br className="hidden md:block" />
            富有活力的環境中，走完人生旅程。」
          </blockquote>
          <div className="mt-12 text-[10px] text-emerald-400/60 tracking-[0.45em] uppercase font-bold">
            安一長照 · 創辦人
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative z-10 py-36 border-t border-white/[0.06]" style={{ background: '#0a0a0a' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center reveal">
          <div className="flex items-center gap-4 text-emerald-400 mb-8 justify-center">
            <span className="w-8 h-px bg-emerald-500/40" />
            <span className="text-[10px] font-bold tracking-[0.55em] uppercase">Get Started</span>
            <span className="w-8 h-px bg-emerald-500/40" />
          </div>
          <h2 className="text-4xl md:text-7xl font-black tracking-[-0.04em] leading-[0.9] text-white mb-8">今天就讓我們<br/>守護您的家人</h2>
          <p className="text-gray-500 text-base mb-14 max-w-sm mx-auto leading-relaxed">
            免費初次諮詢，專業評估長者需求，為您量身規劃最完善的照護方案。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/contact" className="inline-flex items-center gap-3 bg-emerald-500 text-black px-10 py-4 rounded-full font-black text-sm tracking-[0.15em] uppercase hover:bg-emerald-400 transition-all duration-300 hover:gap-5 shadow-[0_0_40px_rgba(16,185,129,0.2)]">
              免費諮詢方案 →
            </Link>
            <Link to="/services" className="inline-flex items-center border border-white/12 text-white/70 px-10 py-4 rounded-full font-semibold text-sm tracking-[0.15em] uppercase hover:border-white/25 hover:bg-white/5 transition-all duration-300">
              查看服務項目
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
