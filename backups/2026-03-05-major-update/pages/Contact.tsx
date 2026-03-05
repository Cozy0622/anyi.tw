
import React, { useState } from 'react';

const Contact: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1500);
  };

  return (
    <main className="max-w-7xl mx-auto px-6 py-12 lg:px-10">
      <div className="mb-12">
        <h1 className="text-4xl font-black mb-3">聯絡我們 / 諮詢服務</h1>
        <p className="text-sage-green text-lg">專業團隊為您提供溫暖、細心的長照諮詢服務</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Left Side: Info */}
        <div className="space-y-8">
          <h2 className="text-2xl font-black border-l-4 border-primary pl-6 py-1">隨時為您提供協助</h2>
          
          <div className="space-y-4">
            <div className="flex items-center gap-6 bg-gradient-to-br from-white/90 to-white/40 backdrop-blur-md rounded-2xl p-6 shadow-sm border border-white/60 hover:shadow-lg transition-all group">
              <div className="size-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center shrink-0 text-primary group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-3xl">call</span>
              </div>
              <div className="flex-1">
                <p className="text-2xl font-black">0800-000-000</p>
                <p className="text-sage-green text-sm">免費諮詢專線 (全年無休)</p>
              </div>
              <button className="hidden sm:block px-6 py-2.5 bg-gradient-to-r from-primary to-primary-dark text-white text-sm font-bold rounded-xl hover:shadow-lg transition-all">
                點擊撥打
              </button>
            </div>

            <div className="flex items-center gap-6 bg-gradient-to-br from-white/90 to-white/40 backdrop-blur-md rounded-2xl p-6 shadow-sm border border-white/60 hover:shadow-lg transition-all">
              <div className="size-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center shrink-0 text-primary">
                <span className="material-symbols-outlined text-3xl">schedule</span>
              </div>
              <div>
                <p className="text-lg font-bold">週一至週五 09:00 - 18:00</p>
                <p className="text-sage-green text-sm">服務時間 (國定假日除外)</p>
              </div>
            </div>

            <div className="flex items-center gap-6 bg-gradient-to-br from-white/90 to-white/40 backdrop-blur-md rounded-2xl p-6 shadow-sm border border-white/60 hover:shadow-lg transition-all">
              <div className="size-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center shrink-0 text-primary">
                <span className="material-symbols-outlined text-3xl">location_on</span>
              </div>
              <div>
                <p className="text-lg font-bold">台北市大安區仁愛路四段 100 號</p>
                <p className="text-sage-green text-sm">服務中心總辦公室</p>
              </div>
            </div>
          </div>

          {/* Map Mockup */}
          <div className="relative w-full h-64 rounded-3xl overflow-hidden border border-white group">
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDL23QdHYdCDvYHPwIfRoaflAt9bcB9RwjX1q6kFDOfpjF1DVerPPRvPDUyo94_HXpycxboSHs9Ec3pdD0nVttpbJN_PaY5Eo8EqHAp0D6yg04FSEkDWdPxriHrJY7mVA5rRXKSBkxj8Ly--8y9Dh9JXwgXYZ72K94h2IXVN6mVS-U3GJ8k-ayRLYfHZWyjeYG9EpjtnSlAkHppgJsrzs84TBIdGTkhU97sY3LXKf3gr01PiIeHvnqUe7hxL1cfBj71xdMZDBW8TDHa" 
              alt="Map"
              className="w-full h-full object-cover transition-all grayscale group-hover:grayscale-0"
            />
            <div className="absolute inset-0 bg-black/10 flex items-center justify-center group-hover:bg-transparent transition-all pointer-events-none">
              <div className="bg-white/80 backdrop-blur-md px-6 py-3 rounded-2xl shadow-xl flex items-center gap-3 border border-white/40">
                <span className="material-symbols-outlined text-primary">map</span>
                <span className="font-bold text-dark-text">點擊查看 Google 地圖</span>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <a href="#" className="flex-1 flex items-center justify-center gap-3 py-4 bg-gradient-to-r from-[#06C755] to-[#05b14c] text-white rounded-2xl font-black text-sm shadow-md hover:opacity-90 transition-all">
              <span className="material-symbols-outlined">chat</span> LINE 線上諮詢
            </a>
            <a href="#" className="flex-1 flex items-center justify-center gap-3 py-4 bg-gradient-to-r from-[#1877F2] to-[#1464cc] text-white rounded-2xl font-black text-sm shadow-md hover:opacity-90 transition-all">
              <span className="material-symbols-outlined">diversity_3</span> Facebook 團體
            </a>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="relative p-10 rounded-3xl overflow-hidden shadow-2xl border border-white/60 sticky top-24">
          <div className="absolute inset-0 bg-gradient-to-br from-white/95 to-white/70 backdrop-blur-xl -z-10"></div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full -mr-16 -mt-16 blur-3xl"></div>
          
          <h3 className="text-2xl font-black mb-8 flex items-center gap-3">
            <span className="material-symbols-outlined text-primary text-4xl">edit_note</span>
            預約諮詢表單
          </h3>
          
          {submitted ? (
            <div className="py-12 text-center space-y-6">
              <div className="size-20 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto shadow-inner">
                <span className="material-symbols-outlined text-5xl">check_circle</span>
              </div>
              <h4 className="text-2xl font-bold">送出成功！</h4>
              <p className="text-sage-green">我們已收到您的諮詢，專業專員將於 24 小時內與您聯繫。</p>
              <button 
                onClick={() => setSubmitted(false)}
                className="px-10 py-3 bg-gradient-to-r from-primary to-primary-dark text-white font-bold rounded-xl shadow-lg"
              >
                再次填寫
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-sage-green ml-1">您的姓名</label>
                <input 
                  required
                  type="text" 
                  placeholder="例：王小明" 
                  className="w-full p-4 rounded-xl border border-white/60 bg-white/40 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder:text-zinc-400"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-sage-green ml-1">聯絡電話</label>
                <input 
                  required
                  type="tel" 
                  placeholder="例：0912-345-678" 
                  className="w-full p-4 rounded-xl border border-white/60 bg-white/40 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder:text-zinc-400"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-sage-green ml-1">感興趣的服務</label>
                <select className="w-full p-4 rounded-xl border border-white/60 bg-white/40 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all cursor-pointer appearance-none">
                  <option value="none">請選擇服務項目</option>
                  <option value="home">居家照護 (Home Care)</option>
                  <option value="day">日間照顧 (Day Care)</option>
                  <option value="respite">喘息服務 (Respite Care)</option>
                  <option value="dementia">失智症專案 (Dementia)</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-sage-green ml-1">諮詢內容</label>
                <textarea 
                  required
                  rows={4} 
                  placeholder="請描述長輩目前的狀況或您想了解的細節..." 
                  className="w-full p-4 rounded-xl border border-white/60 bg-white/40 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none placeholder:text-zinc-400"
                ></textarea>
              </div>

              <button 
                disabled={isSubmitting}
                className={`w-full py-4 rounded-2xl font-black text-white shadow-xl transition-all flex items-center justify-center gap-3 ${
                  isSubmitting ? 'bg-zinc-400 cursor-not-allowed opacity-50' : 'bg-gradient-to-r from-primary to-primary-dark hover:shadow-primary/30 transform active:scale-95'
                }`}
              >
                {isSubmitting ? (
                  <>處理中...</>
                ) : (
                  <>
                    <span className="material-symbols-outlined">send</span> 送出諮詢申請
                  </>
                )}
              </button>

              <p className="text-center text-sage-green text-xs font-medium flex items-center justify-center gap-2">
                <span className="material-symbols-outlined text-sm">verified_user</span>
                您的隱私資料僅供諮詢評估使用
              </p>
            </form>
          )}
        </div>
      </div>
    </main>
  );
};

export default Contact;
