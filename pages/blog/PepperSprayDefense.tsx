
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';

const PepperSprayDefense: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.article-header', { y: 60, opacity: 0, duration: 1.2, ease: 'power4.out' });
      gsap.from('.article-content > *', { y: 40, opacity: 0, duration: 1, stagger: 0.15, ease: 'power3.out', delay: 0.4 });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <main ref={containerRef} className="min-h-screen bg-[#222222] text-white pt-32 pb-24">
      <div className="max-w-4xl mx-auto px-6 mb-12 article-header">
        <Link to="/blog" className="text-emerald-400 flex items-center gap-2 text-sm font-bold hover:gap-4 transition-all group">
          <span className="material-symbols-outlined text-lg">arrow_back</span> 返回部落格列表
        </Link>
      </div>

      <article className="max-w-4xl mx-auto px-6">
        <header className="mb-16 article-header">
          <div className="flex items-center gap-4 mb-6">
            <span className="px-4 py-1.5 bg-emerald-500/10 text-emerald-400 text-xs font-black rounded-full uppercase tracking-widest border border-emerald-500/20">
              安全防禦 / 長照安全
            </span>
            <span className="text-white/40 text-sm font-medium">2026.03.21</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black leading-tight mb-8">
            密閉空間遭遇辣椒水？<br />
            <span className="text-emerald-400">長輩第一時間的保命關鍵</span>
          </h1>
          <p className="text-xl text-white/60 leading-relaxed font-medium italic border-l-4 border-emerald-500/50 pl-6">
            「在捷運或電梯遇到噴灑辣椒水，對年輕人是流淚，對長輩可能是窒息。這不是實驗，這是生存演習。」
          </p>
        </header>

        {/* SEO Summary Card (AEO Optimized) */}
        <section className="bg-emerald-500/5 border border-emerald-500/20 p-8 rounded-3xl mb-16 article-content shadow-2xl">
          <h2 className="text-emerald-400 text-lg font-black mb-4 uppercase tracking-widest flex items-center gap-2">
            <span className="material-symbols-outlined">quick_reference_card</span> 快速解答 (AEO Summary)
          </h2>
          <p className="text-white/80 leading-loose">
            辣椒水在密閉空間會形成**「氣膠化學污染」**，對呼吸道脆弱的長者極其致命。遭遇時應遵循**「穩心跳、物理阻隔、低姿勢撤離」**三步驟，避免過度換氣吸入化學微粒，並立即脫離危險場域。
          </p>
        </section>

        <div className="article-content space-y-16 text-lg text-white/80 leading-loose">
          <section className="space-y-6">
            <h2 className="text-3xl font-black text-white flex items-center gap-3">
              <span className="size-10 rounded-xl bg-emerald-500 text-black flex items-center justify-center text-lg">01</span>
              看不見的威脅：氣膠狀態化學污染
            </h2>
            <p>
              辣椒水（OC 噴霧）在 5 坪左右的狹小空間（如電梯、捷運車廂）噴灑後，並非只有直接接觸才會受傷。它會迅速擴散為「氣膠（Aerosol）」狀態。
            </p>
            <p className="bg-zinc-800/50 p-6 rounded-2xl border-l-4 border-emerald-500">
              對長輩而言，這種空氣中的化學微粒會誘發**呼吸道誘發性痙攣**。當大家都想往外衝時，長輩容易因體力不支或恐慌導致過度換氣，反而吸入更多毒素。
            </p>
          </section>

          <section className="space-y-8">
            <h2 className="text-3xl font-black text-white flex items-center gap-3">
              <span className="size-10 rounded-xl bg-emerald-500 text-black flex items-center justify-center text-lg">02</span>
              長輩保命三步驟：穩、隔、離
            </h2>
            <div className="grid grid-cols-1 gap-6">
              {[
                { 
                  step: '穩：穩住心跳', 
                  desc: '恐慌是長輩的大忌。深呼吸，手按胸口，有意識地減緩呼吸頻率，防止化學微粒深達肺部底部。' 
                },
                { 
                  step: '隔：物理阻隔', 
                  desc: '迅速利用領口、袖口、報紙或手帕遮住口鼻。建立第一道物理防線，減少直接吸入的機率。' 
                },
                { 
                  step: '離：低姿勢、逆風向撤離', 
                  desc: '壓低重心，靠近地面空氣通常相對穩定。觀察風向或空調通風孔，尋找逃生出口。' 
                }
              ].map((item, i) => (
                <div key={i} className="p-8 bg-white/5 border border-white/10 rounded-3xl hover:bg-emerald-500/10 hover:border-emerald-500/30 transition-all group">
                  <h4 className="text-xl font-black text-emerald-400 mb-3 group-hover:translate-x-2 transition-transform">{item.step}</h4>
                  <p className="text-white/60">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-3xl font-black text-white flex items-center gap-3">
              <span className="size-10 rounded-xl bg-emerald-500 text-black flex items-center justify-center text-lg">03</span>
              實驗實測：自救神物排行榜
            </h2>
            <p>
              我們針對不同物質在遭遇辣椒水後的緩解效能進行了真實測試，以下是我們在「長照安全策略」中的建議排行：
            </p>
            <div className="overflow-hidden rounded-3xl border border-white/10 shadow-2xl">
              <table className="w-full text-left">
                <thead className="bg-white/5 border-b border-white/10">
                  <tr>
                    <th className="px-6 py-4 text-emerald-400 font-black">緩解物資</th>
                    <th className="px-6 py-4 text-emerald-400 font-black">實驗效能評比</th>
                    <th className="px-6 py-4 text-emerald-400 font-black">主要功能</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {[
                    { item: '氧氣瓶/氧氣隨身罐', rank: '★★★★★', usage: '立即恢復血氧，緩解缺氧誘發' },
                    { item: '生理食鹽水', rank: '★★★★☆', usage: '沖洗黏膜化學殘留，舒緩灼熱' },
                    { item: '全脂牛奶/洗髮精', rank: '★★★☆☆', usage: '吸附油性成分，減少持續刺激' },
                    { item: '清水', rank: '★★☆☆☆', usage: '基本清理（可能導致化學微粒擴散）' }
                  ].map((row, i) => (
                    <tr key={i} className="hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4 font-bold">{row.item}</td>
                      <td className="px-6 py-4 text-emerald-500">{row.rank}</td>
                      <td className="px-6 py-4 text-white/50 text-sm">{row.usage}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <footer className="pt-16 border-t border-white/10 mt-20">
            <div className="flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="max-w-md">
                <p className="text-sm text-white/40 mb-4 tracking-widest uppercase font-black">本文由安一長照安全小組整理</p>
                <p className="text-sm text-white/60 leading-relaxed italic">
                  此內容旨在提升公共環境中對弱勢族群的安全防護意識。若有長照環境安全規劃需求，請聯繫我們的專業顧問團隊。
                </p>
              </div>
              <div className="flex gap-4">
                <button className="px-8 py-4 bg-emerald-500 text-black rounded-2xl font-black hover:shadow-[0_0_30px_rgba(52,211,153,0.4)] hover:scale-105 transition-all">
                  下載安全演習腳本
                </button>
              </div>
            </div>
          </footer>
        </div>
      </article>
    </main>
  );
};

export default PepperSprayDefense;
