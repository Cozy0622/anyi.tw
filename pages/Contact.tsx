import React, { useState } from 'react';

const CONTACT_METHODS = [
  {
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    label: '電子郵件',
    value: 'anoacozy@gmail.com',
    href: 'mailto:anoacozy@gmail.com',
  },
  {
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    label: 'LINE 官方帳號',
    value: '點此加入好友',
    href: 'https://lin.ee/NFWA5Tu',
  },
  {
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M7 4v16M17 4v16M3 8h4m10 0h4M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
      </svg>
    ),
    label: 'Instagram',
    value: '@anyi.care',
    href: 'https://www.instagram.com/anyi.care/',
  },
  {
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    label: 'Facebook',
    value: '安一長照粉絲專頁',
    href: 'https://www.facebook.com/profile.php?id=61583860456881&locale=zh_TW',
  },
];

const SERVICES_OPTIONS = [
  '建設與無障礙空間諮詢',
  'AI 科技與數位化服務',
  '設備與耗材採購',
  '人文關懷與活動規劃',
  '長照補助申請代辦',
  '其他需求',
];

const Contact: React.FC = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Send via mailto as fallback (backend not yet wired)
    const subject = encodeURIComponent(`[安一長照官網諮詢] ${form.service || '服務詢問'} — ${form.name}`);
    const body = encodeURIComponent(
      `姓名：${form.name}\n電話：${form.phone}\n信箱：${form.email}\n需求：${form.service}\n\n留言：\n${form.message}`
    );
    window.location.href = `mailto:anoacozy@gmail.com?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  return (
    <div className="flex-1 text-white overflow-x-hidden" style={{ background: '#0a0a0a' }}>

      {/* ── HERO ── */}
      <section className="pt-40 pb-20 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 text-emerald-400 mb-8">
            <span className="w-8 h-px bg-emerald-500/50" />
            <span className="text-[10px] font-bold tracking-[0.55em] uppercase">Contact Us</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-black tracking-[-0.04em] leading-[0.88] text-white mb-6">
            開始對話<br />
            <span className="text-white/20 font-thin text-4xl md:text-6xl">我們很樂意為您服務</span>
          </h1>
          <p className="text-gray-500 text-base max-w-lg leading-relaxed mt-8">
            無論是服務諮詢、合作提案或任何問題，填寫下方表單或透過任一管道聯繫我們，
            我們將在一個工作天內回覆。
          </p>
        </div>
      </section>

      {/* ── MAIN CONTENT ── */}
      <section className="px-6 lg:px-12 pb-32">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-20">

          {/* Left: Contact info */}
          <div className="lg:col-span-2 flex flex-col gap-8">

            {/* Contact methods */}
            <div>
              <p className="text-[10px] font-bold tracking-[0.5em] uppercase text-white/30 mb-6">聯絡管道</p>
              <div className="flex flex-col gap-4">
                {CONTACT_METHODS.map((m) => (
                  <a
                    key={m.label}
                    href={m.href}
                    target={m.href.startsWith('http') ? '_blank' : undefined}
                    rel={m.href.startsWith('http') ? 'noreferrer' : undefined}
                    className="group flex items-center gap-4 p-5 rounded-2xl border border-white/[0.07] hover:border-emerald-500/25 transition-all duration-300"
                    style={{ background: 'rgba(255,255,255,0.02)' }}
                  >
                    <div className="size-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 shrink-0 group-hover:bg-emerald-500/20 transition-colors">
                      {m.icon}
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-600 font-bold tracking-[0.3em] uppercase mb-0.5">{m.label}</p>
                      <p className="text-sm font-semibold text-white/80 group-hover:text-emerald-400 transition-colors">{m.value}</p>
                    </div>
                    <span className="ml-auto text-white/15 group-hover:text-emerald-400 transition-colors text-sm">→</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Response time promise */}
            <div
              className="p-6 rounded-2xl border border-emerald-500/15"
              style={{ background: 'rgba(16,185,129,0.04)' }}
            >
              <div className="flex items-start gap-4">
                <div className="size-8 rounded-lg bg-emerald-500/15 flex items-center justify-center shrink-0 mt-0.5">
                  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="text-emerald-400">
                    <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-black text-white mb-1">快速回應承諾</p>
                  <p className="text-xs text-gray-500 leading-relaxed">我們承諾在 <span className="text-emerald-400 font-bold">1 個工作天內</span> 回覆您的所有諮詢，讓您的照護需求不再等待。</p>
                </div>
              </div>
            </div>

            {/* LINE QR-like CTA */}
            <a
              href="https://lin.ee/NFWA5Tu"
              target="_blank"
              rel="noreferrer"
              className="group flex items-center justify-between p-6 rounded-2xl border border-white/[0.07] hover:border-emerald-500/25 transition-all duration-300"
              style={{ background: 'rgba(255,255,255,0.02)' }}
            >
              <div>
                <p className="text-xs text-gray-500 mb-1">最快速的聯繫方式</p>
                <p className="text-base font-black text-white group-hover:text-emerald-400 transition-colors">加入 LINE 官方帳號 →</p>
              </div>
              <img
                src="https://scdn.line-apps.com/n/line_add_friends/btn/zh-Hant.png"
                alt="加入好友"
                className="h-9 object-contain opacity-80 group-hover:opacity-100 transition-opacity"
              />
            </a>
          </div>

          {/* Right: Form */}
          <div className="lg:col-span-3">
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center py-20 text-center">
                <div className="size-16 rounded-full bg-emerald-500/15 flex items-center justify-center mb-6">
                  <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="text-emerald-400">
                    <path d="M20 6L9 17l-5-5"/>
                  </svg>
                </div>
                <h2 className="text-3xl font-black text-white mb-3">感謝您的留言！</h2>
                <p className="text-gray-500 text-sm leading-relaxed max-w-sm">
                  我們已收到您的諮詢，將在 1 個工作天內透過您提供的電子郵件與您聯絡。
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-bold tracking-[0.4em] uppercase text-white/30">姓名 *</label>
                    <input
                      name="name"
                      required
                      placeholder="您的姓名"
                      value={form.name}
                      onChange={handleChange}
                      className="px-5 py-4 rounded-2xl text-sm text-white placeholder-gray-600 outline-none transition-all focus:border-emerald-500/40"
                      style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-bold tracking-[0.4em] uppercase text-white/30">聯絡電話</label>
                    <input
                      name="phone"
                      type="tel"
                      placeholder="0900-000-000"
                      value={form.phone}
                      onChange={handleChange}
                      className="px-5 py-4 rounded-2xl text-sm text-white placeholder-gray-600 outline-none transition-all focus:border-emerald-500/40"
                      style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold tracking-[0.4em] uppercase text-white/30">電子郵件 *</label>
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder="your@email.com"
                    value={form.email}
                    onChange={handleChange}
                    className="px-5 py-4 rounded-2xl text-sm text-white placeholder-gray-600 outline-none transition-all focus:border-emerald-500/40"
                    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold tracking-[0.4em] uppercase text-white/30">諮詢服務項目</label>
                  <select
                    name="service"
                    value={form.service}
                    onChange={handleChange}
                    className="px-5 py-4 rounded-2xl text-sm outline-none transition-all appearance-none cursor-pointer"
                    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: form.service ? '#fafafa' : '#4b5563' }}
                  >
                    <option value="" style={{ background: '#1a1a1a' }}>請選擇您感興趣的服務…</option>
                    {SERVICES_OPTIONS.map(s => (
                      <option key={s} value={s} style={{ background: '#1a1a1a', color: '#fafafa' }}>{s}</option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold tracking-[0.4em] uppercase text-white/30">留言內容 *</label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    placeholder="請描述您的需求或問題，我們會盡快為您提供最合適的照護方案…"
                    value={form.message}
                    onChange={handleChange}
                    className="px-5 py-4 rounded-2xl text-sm text-white placeholder-gray-600 outline-none transition-all resize-none focus:border-emerald-500/40"
                    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-5 rounded-2xl font-black text-sm tracking-[0.15em] uppercase bg-emerald-500 text-black hover:bg-emerald-400 transition-all duration-300 hover:shadow-[0_0_40px_rgba(16,185,129,0.25)] active:scale-[0.99]"
                >
                  送出諮詢 — 免費評估
                </button>

                <p className="text-[10px] text-gray-600 text-center leading-relaxed">
                  送出即代表您同意我們處理您的聯絡資訊，僅用於回覆本次諮詢。
                </p>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
