
import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { BLOG_DATA as BLOG } from '../data/blogData';

const TABS = ['全部文章', '部落格', '照護技巧', '政府政策', '健康飲食'];

const CATEGORY_COLORS: Record<string, string> = {
  '精選文章': '#10b981',
  '照護技巧': '#3b82f6',
  '政府政策': '#f59e0b',
  '健康飲食': '#ec4899',
  '安全防禦': '#ef4444',
  '部落格': '#8b5cf6',
};

function getCategoryColor(cat: string) {
  return CATEGORY_COLORS[cat] ?? '#10b981';
}

const Blog: React.FC = () => {
  const [activeTab, setActiveTab] = useState('全部文章');
  const [searchQuery, setSearchQuery] = useState('');

  const featured = BLOG[0];
  const rest = BLOG.slice(1);

  const filtered = useMemo(() => {
    let list = activeTab === '全部文章'
      ? rest
      : rest.filter(a => a.category === activeTab);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(a =>
        a.title.toLowerCase().includes(q) || a.excerpt?.toLowerCase().includes(q)
      );
    }
    return list;
  }, [activeTab, searchQuery, rest]);

  const featuredLink = featured.id === 'pepper-spray-defense'
    ? '/blog/pepper-spray-defense'
    : `/blog/${featured.id}`;

  // Sidebar: recent articles (first 4 after featured)
  const recentArticles = rest.slice(0, 4);

  return (
    <div className="min-h-screen text-white" style={{ background: '#0a0a0a' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-36 pb-28">

        {/* ── PAGE HEADER ── */}
        <div className="mb-16">
          <div className="flex items-center gap-4 text-emerald-400 mb-6">
            <span className="w-8 h-px bg-emerald-500/50" />
            <span className="text-[10px] font-bold tracking-[0.55em] uppercase">Blog & Health Guide</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-[-0.04em] leading-[0.9] text-white mb-4">
            部落格<br />
            <span className="text-white/20 font-thin text-4xl md:text-6xl">與衛教資訊</span>
          </h1>
          <p className="text-gray-500 text-base mt-6 max-w-lg leading-relaxed">
            提供專業長照補助指南、照護技巧與長者健康資訊，持續更新讓您掌握最新知識。
          </p>
        </div>

        {/* ── FEATURED ARTICLE ── */}
        <Link
          to={featuredLink}
          className="group block relative overflow-hidden rounded-3xl mb-16"
          style={{ aspectRatio: '21/8', minHeight: '320px' }}
        >
          <img
            src={featured.image}
            alt={featured.title}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/10" />

          {/* Featured badge */}
          <div className="absolute top-6 left-6 flex items-center gap-2">
            <span className="text-[9px] font-black tracking-[0.45em] uppercase px-3 py-1.5 rounded-full"
              style={{ background: 'rgba(16,185,129,0.2)', color: '#34d399', border: '1px solid rgba(52,211,153,0.35)' }}>
              Featured
            </span>
            <span className="text-[9px] font-black tracking-[0.3em] uppercase px-3 py-1.5 rounded-full text-white/80"
              style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.12)' }}>
              {featured.category}
            </span>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
            <h2 className="text-white text-2xl md:text-4xl font-black leading-tight mb-4 max-w-3xl group-hover:text-emerald-300 transition-colors duration-300">
              {featured.title}
            </h2>
            <p className="text-gray-300 text-sm md:text-base leading-relaxed max-w-2xl line-clamp-2 mb-6 hidden md:block">
              {featured.excerpt}
            </p>
            <div className="flex items-center gap-6 text-gray-500 text-xs">
              <span>{featured.date}</span>
              <span>·</span>
              <span>專業諮詢團隊</span>
              <span className="ml-auto text-emerald-400 font-black tracking-wider group-hover:gap-3 flex items-center gap-2 transition-all">
                閱讀全文 →
              </span>
            </div>
          </div>
        </Link>

        {/* ── MAIN CONTENT ── */}
        <div className="flex flex-col lg:flex-row gap-14">

          {/* Left: Article grid */}
          <div className="flex-1 min-w-0">

            {/* Filter tabs */}
            <div className="sticky top-20 z-30 pb-6 mb-8" style={{ background: '#0a0a0a' }}>
              <div className="flex gap-1 overflow-x-auto scrollbar-hide p-1 rounded-2xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                {TABS.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`shrink-0 px-5 py-2.5 rounded-xl text-xs font-black tracking-wide transition-all duration-300 ${
                      activeTab === tab
                        ? 'bg-emerald-500 text-black'
                        : 'text-gray-500 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Article grid */}
            {filtered.length === 0 ? (
              <div className="py-20 text-center text-gray-600">
                <p className="text-lg font-bold mb-2">暫無相關文章</p>
                <p className="text-sm">請嘗試其他分類或搜尋關鍵字</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filtered.map((article, i) => (
                  <Link
                    key={`${article.id}-${i}`}
                    to={article.id === 'pepper-spray-defense' ? '/blog/pepper-spray-defense' : `/blog/${article.id}`}
                    className="group flex flex-col overflow-hidden rounded-2xl transition-all duration-500 hover:translate-y-[-3px]"
                    style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
                  >
                    {/* Image */}
                    <div className="relative overflow-hidden" style={{ aspectRatio: '16/9' }}>
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      {/* Category badge */}
                      <div className="absolute top-4 left-4">
                        <span
                          className="text-[9px] font-black tracking-[0.35em] uppercase px-3 py-1.5 rounded-full"
                          style={{
                            background: `${getCategoryColor(article.category)}22`,
                            color: getCategoryColor(article.category),
                            border: `1px solid ${getCategoryColor(article.category)}44`
                          }}
                        >
                          {article.category}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 flex flex-col flex-1 gap-3">
                      <p className="text-[10px] text-gray-600 font-bold tracking-[0.3em]">{article.date}</p>
                      <h3 className="text-base font-black leading-snug text-white group-hover:text-emerald-400 transition-colors duration-300 line-clamp-2">
                        {article.title}
                      </h3>
                      {article.excerpt && (
                        <p className="text-gray-600 text-xs leading-relaxed line-clamp-2 flex-1">
                          {article.excerpt}
                        </p>
                      )}
                      <div className="flex items-center gap-2 text-emerald-500/70 text-xs font-black tracking-wider group-hover:text-emerald-400 transition-colors mt-1">
                        閱讀全文
                        <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Right: Sidebar */}
          <aside className="w-full lg:w-72 xl:w-80 shrink-0 flex flex-col gap-6">

            {/* Search */}
            <div className="rounded-2xl p-6" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
              <h4 className="text-sm font-black mb-4 text-white tracking-tight">搜尋文章</h4>
              <div className="relative">
                <input
                  type="text"
                  placeholder="輸入關鍵字…"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl text-sm text-white placeholder-gray-600 outline-none transition-all focus:border-emerald-500/40"
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
                />
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
                </svg>
              </div>
            </div>

            {/* Recent posts */}
            <div className="rounded-2xl p-6" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
              <h4 className="text-sm font-black mb-5 text-white tracking-tight">最新文章</h4>
              <div className="flex flex-col divide-y" style={{ '--tw-divide-opacity': 0.07 } as React.CSSProperties}>
                {recentArticles.map((a, i) => (
                  <Link
                    key={i}
                    to={a.id === 'pepper-spray-defense' ? '/blog/pepper-spray-defense' : `/blog/${a.id}`}
                    className="group flex gap-4 py-4 first:pt-0 last:pb-0 hover:opacity-80 transition-opacity"
                  >
                    <div className="size-14 rounded-xl overflow-hidden shrink-0">
                      <img src={a.image} alt={a.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex flex-col gap-1 min-w-0">
                      <span
                        className="text-[9px] font-black tracking-[0.3em] uppercase"
                        style={{ color: getCategoryColor(a.category) }}
                      >
                        {a.category}
                      </span>
                      <p className="text-xs font-bold text-white/80 group-hover:text-emerald-400 transition-colors line-clamp-2 leading-snug">
                        {a.title}
                      </p>
                      <span className="text-[10px] text-gray-600">{a.date}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Categories */}
            <div className="rounded-2xl p-6" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
              <h4 className="text-sm font-black mb-5 text-white tracking-tight">文章分類</h4>
              <div className="flex flex-col gap-2">
                {TABS.filter(t => t !== '全部文章').map(tab => {
                  const count = rest.filter(a => a.category === tab).length;
                  return (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className="flex items-center justify-between px-4 py-3 rounded-xl text-sm transition-all duration-200 group"
                      style={{
                        background: activeTab === tab ? 'rgba(16,185,129,0.1)' : 'rgba(255,255,255,0.03)',
                        border: `1px solid ${activeTab === tab ? 'rgba(52,211,153,0.25)' : 'rgba(255,255,255,0.06)'}`
                      }}
                    >
                      <span className={`font-semibold ${activeTab === tab ? 'text-emerald-400' : 'text-gray-500 group-hover:text-white'} transition-colors`}>
                        {tab}
                      </span>
                      <span className="text-xs font-black text-gray-600">{count}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Newsletter CTA */}
            <div
              className="rounded-2xl p-6 relative overflow-hidden"
              style={{ background: 'linear-gradient(135deg, rgba(16,185,129,0.12) 0%, rgba(6,182,212,0.08) 100%)', border: '1px solid rgba(52,211,153,0.2)' }}
            >
              <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-emerald-500/10 blur-2xl pointer-events-none" />
              <h4 className="text-sm font-black text-white mb-2">訂閱健康週報</h4>
              <p className="text-xs text-gray-500 mb-5 leading-relaxed">每週收到最新長照資訊與健康建議，直送信箱。</p>
              <input
                type="email"
                placeholder="您的電子郵件"
                className="w-full px-4 py-3 rounded-xl text-xs text-white placeholder-gray-600 outline-none mb-3"
                style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)' }}
              />
              <button className="w-full py-3 rounded-xl text-xs font-black tracking-wider uppercase bg-emerald-500 text-black hover:bg-emerald-400 transition-colors">
                立即訂閱
              </button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Blog;
