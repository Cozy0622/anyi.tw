
import React, { useState } from 'react';
import { NEWS } from '../constants';

const News: React.FC = () => {
  const [activeTab, setActiveTab] = useState('全部文章');
  const tabs = ['全部文章', '最新消息', '照護技巧', '政府政策', '健康飲食'];

  return (
    <main className="max-w-7xl mx-auto px-6 py-12 lg:px-10">
      <div className="mb-12">
        <h1 className="text-4xl font-black mb-3">最新消息與衛教資訊</h1>
        <p className="text-sage-green text-lg">提供專業長照補助、照護技巧與長者健康指南</p>
      </div>

      {/* Featured Article */}
      <div className="mb-16">
        <div className="relative group cursor-pointer overflow-hidden rounded-3xl h-[450px] bg-zinc-900 shadow-2xl">
          <img 
            src={NEWS[0].image} 
            alt="Featured" 
            className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-10 w-full max-w-4xl">
            <span className="inline-block px-4 py-1.5 bg-primary text-white text-xs font-black rounded-lg mb-6 uppercase tracking-wider">
              {NEWS[0].category}
            </span>
            <h2 className="text-white text-3xl font-black mb-4 group-hover:text-primary transition-colors duration-300">
              {NEWS[0].title}
            </h2>
            <p className="text-gray-300 line-clamp-2 text-lg mb-6 leading-relaxed">
              {NEWS[0].excerpt}
            </p>
            <div className="flex items-center gap-6 text-gray-400 text-sm font-medium">
              <span className="flex items-center gap-2">
                <span className="material-symbols-outlined text-lg">calendar_month</span> {NEWS[0].date}
              </span>
              <span className="flex items-center gap-2">
                <span className="material-symbols-outlined text-lg">person</span> 專業諮詢團隊
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Left: Article List */}
        <div className="flex-1">
          {/* Custom Tabs */}
          <div className="sticky top-16 z-30 bg-background-light py-4">
            <div className="flex border-b border-[#ebf3e8] gap-8 overflow-x-auto whitespace-nowrap scrollbar-hide">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-4 text-sm font-bold tracking-wide transition-all ${
                    activeTab === tab 
                      ? 'border-b-4 border-primary text-dark-text' 
                      : 'text-sage-green hover:text-primary border-b-4 border-transparent'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
            {NEWS.slice(1).concat(NEWS.slice(1)).map((article, i) => (
              <div key={`${article.id}-${i}`} className="flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all group">
                <div className="aspect-video relative overflow-hidden">
                  <img src={article.image} alt={article.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute top-4 left-4">
                    <span className="bg-primary text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
                      {article.category}
                    </span>
                  </div>
                </div>
                <div className="p-8 flex flex-col flex-1">
                  <p className="text-xs font-bold text-sage-green/60 mb-2">{article.date}</p>
                  <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors leading-tight">
                    {article.title}
                  </h3>
                  <p className="text-sage-green text-sm line-clamp-3 mb-6 flex-1 leading-relaxed">
                    {article.excerpt}
                  </p>
                  <button className="text-primary text-sm font-black flex items-center gap-1 group-hover:gap-3 transition-all">
                    閱讀全文 <span className="material-symbols-outlined text-base">arrow_forward</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-16 gap-3">
            <button className="size-12 flex items-center justify-center rounded-xl border border-[#ebf3e8] text-sage-green hover:bg-primary/10 transition-colors">
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            <button className="size-12 flex items-center justify-center rounded-xl bg-primary text-white font-black shadow-lg">1</button>
            <button className="size-12 flex items-center justify-center rounded-xl border border-[#ebf3e8] text-sage-green hover:bg-primary/10 transition-colors font-bold">2</button>
            <button className="size-12 flex items-center justify-center rounded-xl border border-[#ebf3e8] text-sage-green hover:bg-primary/10 transition-colors font-bold">3</button>
            <button className="size-12 flex items-center justify-center rounded-xl border border-[#ebf3e8] text-sage-green hover:bg-primary/10 transition-colors">
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        </div>

        {/* Right: Sidebar */}
        <aside className="w-full lg:w-80 space-y-10">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-[#ebf3e8]">
            <h4 className="text-lg font-black mb-6 flex items-center gap-3">
              <span className="material-symbols-outlined text-primary">search</span> 搜尋文章
            </h4>
            <div className="relative">
              <input 
                type="text" 
                placeholder="輸入關鍵字..." 
                className="w-full pl-12 pr-4 py-3 bg-zinc-50 border-none rounded-xl focus:ring-2 focus:ring-primary text-sm font-medium" 
              />
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-sage-green text-sm">search</span>
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-[#ebf3e8]">
            <h4 className="text-lg font-black mb-6 flex items-center gap-3">
              <span className="material-symbols-outlined text-primary">sell</span> 熱門標籤
            </h4>
            <div className="flex flex-wrap gap-2">
              {['補助申請', '失智症照護', '居家復健', '銀髮飲食', '2024新制', '心理支持', '喘息服務'].map((tag) => (
                <a key={tag} href="#" className="px-4 py-2 bg-primary/5 text-primary text-xs font-bold rounded-xl hover:bg-primary hover:text-white transition-all">
                  {tag}
                </a>
              ))}
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-[#ebf3e8]">
            <h4 className="text-lg font-black mb-6 flex items-center gap-3">
              <span className="material-symbols-outlined text-primary">trending_up</span> 熱門排行
            </h4>
            <div className="space-y-6">
              {[
                '長照評估怎麼做？專員上門流程大公開',
                '輔具購買與租賃：哪一種比較划算？',
                '如何與家中長輩談論長照服務的介入？'
              ].map((title, i) => (
                <a key={i} href="#" className="flex gap-4 group">
                  <span className="text-primary font-black text-xl leading-none">0{i+1}</span>
                  <p className="text-sm font-bold text-dark-text group-hover:text-primary transition-colors line-clamp-2">
                    {title}
                  </p>
                </a>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
};

export default News;
