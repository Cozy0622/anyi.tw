
import React from 'react';

const About: React.FC = () => {
  return (
    <div className="flex-1">
      {/* Hero Section */}
      <section className="relative h-[450px] flex items-center justify-center overflow-hidden">
        <img 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAsehjCYOm3xuHf5fwyePh6m87liVha-YLI_ke_UhVZZ4pFOmOI_HhdH5OhsPQrlUc-s-r9b2ltz0Ikq7q3MKbdA6vKhRgpywuDgZ9Y2gHxU4gQcWsf88avJoijvSdxaAVNYqGDHeNvrLniQXOg5lMsnJi1_RfEvxA9e2_6DgBsEb7nVyoOIQ9wbnOpD4N-m0SuGjaCRLqGGDJugnHMvC6gYbVXFuKddgLolcfSZOtKx1euPG_JJOonVSK1OSVv6XgdQWAiPl3sK5oW" 
          alt="About Us Hero"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20 backdrop-blur-[2px]"></div>
        <div className="relative z-10 text-center text-white px-6">
          <h1 className="text-5xl font-black mb-6">關於我們</h1>
          <p className="text-xl font-medium max-w-2xl mx-auto opacity-90 leading-relaxed">
            致力於提供最有溫度的長照服務，陪伴長輩尊嚴安老，在熟悉的社區中享受豐盛晚年。
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1">
            <h2 className="text-4xl font-black mb-8">我們的使命與願景</h2>
            <p className="text-lg text-sage-green mb-10 leading-relaxed">
              我們深信每一位長者都值得被溫柔對待。透過專業的整合性照護，我們致力於建立一個讓長輩感到安心、讓家屬感到放心的長照網絡。
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="p-8 rounded-2xl bg-gradient-to-br from-white/80 to-primary/5 border border-white/60 shadow-md backdrop-blur-md">
                <span className="material-symbols-outlined text-primary text-4xl mb-4">lightbulb</span>
                <h3 className="text-xl font-bold mb-3">使命</h3>
                <p className="text-sm text-sage-green">提供全方位的專業照護，提升長者生活品質，延續家庭的溫暖笑容。</p>
              </div>
              <div className="p-8 rounded-2xl bg-gradient-to-br from-white/80 to-primary/5 border border-white/60 shadow-md backdrop-blur-md">
                <span className="material-symbols-outlined text-primary text-4xl mb-4">visibility</span>
                <h3 className="text-xl font-bold mb-3">願景</h3>
                <p className="text-sm text-sage-green">成為台灣最值得信賴的長期照顧服務品牌，定義高齡照護的新標竿。</p>
              </div>
            </div>
          </div>
          <div className="flex-1 w-full rounded-2xl overflow-hidden shadow-2xl relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent pointer-events-none"></div>
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuC10n2OuFq23MZqd8tL6xehJS200g3o2k9PJVADX9qvjcp1NNh4gG1aP3BHqUKSmZDJRY-RM6BNlBdyF3VV6ZdB8G0KlTj6VZ0NA7ObIKrXH03ss9ZUfUdFG0xEl_jE0sTGcaVL_-OyoljG4MK_-fytFcG0-16vLEWh1z6jMPqZ99aapsmzazHYNOiHIMmViS8bF97nMdJEoi6hk2l8zLUFf_W40vajiSSpMJkRlSEWKUFQNwgU8rtieq6E5kYJkg5TKcPbJXA2s_gG" 
              alt="Interior"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Origin Story */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 w-full order-2 lg:order-1">
            <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl rotate-2 relative">
              <div className="absolute inset-0 bg-gradient-to-bl from-primary/10 to-transparent"></div>
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDNU8umEzmR7haFbRCiRjtMkz0IGkrR8ZMy7krHWFFIGHi2TdCBQXUKQc536qydXeZhVHNUJfWNT5hi7PYd9MmDro9sTd5jMN8ijyGrHfeEKkYtkkYvLtAstZg71dcMbYoIB6JwE-0QpnuCin1zHv2dg0aqUo72cnc2v3Ab0R_WHlOJNc7TymzIvvw-8Zh0K6L4N-_7sjmlQ9f3h-2AW_ksEI758k1nwbYxltN_DfRCmpHp_gmAJcIGfUft4a26BVfyZR4Fd0SA5MDM" 
                alt="Our Origin"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="flex-1 order-1 lg:order-2">
            <h2 className="text-3xl font-black mb-8 border-l-4 border-primary pl-6">服務初衷</h2>
            <div className="space-y-6 text-lg text-sage-green leading-relaxed">
              <p>「安一長照」的起源，來自於創辦人自身照顧年邁雙親的親身經歷。在尋求資源的過程中，我們發現除了醫療技術外，長者更需要的是「被尊重」與「被陪伴」的溫暖。</p>
              <div className="p-6 rounded-2xl bg-gradient-to-r from-primary/10 via-white/5 to-transparent border-l-4 border-primary/40 italic text-dark-text font-medium backdrop-blur-sm">
                「我們堅持把每一位服務的長者，都當作自己的家人來守護。」
              </div>
              <p>我們決定成立這間公司，初衷很簡單：讓每一位像我們父母一樣辛苦了一輩子的長輩，都能在舒適、尊嚴、且富有活力的環境中，走完人生的最後一段旅程。</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
