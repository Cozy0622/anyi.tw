
import React from 'react';
import { ServiceItem, TeamMember } from './types';

export const SERVICES: ServiceItem[] = [
  {
    id: 'home-care',
    title: '居家照護',
    description: '在家中享受專業且貼心的生活照顧與護理服務，維持原有的生活品質。',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDmEGeO7_wt6Ihb1aP9ezCoT8shfqAY0j8se6WNaeGMPsMBwNUd28T9bkCDlW0mgZ1PQsgIiVDpo92BAO9htFkftxQIR9j9wUJC9PWzjPKzjwewOJzj031C2VBUk3fwkfgSNlSBXYh5860libQsDqXkgIOrn85yYCBDW8wIvDfzDa1hr4u2fmm3ppUTIv2j3FqM1z_g-VPLEnPkmr1L8w2KeA8WCl1oJrjn9ZboMzvXZCpaQEZwBFXRviyAXsVyH9UPVI0ppVrhOkjO',
    features: ['營養膳食準備與餵食援助', '專業醫療陪同與用藥提醒', '身體清潔、沐浴與翻身拍背']
  },
  {
    id: 'day-care',
    title: '日間照顧',
    description: '提供豐富的社區社交生活與專業復健計畫，讓長者的白天時光充滿活力。',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAIlCbGwSVcKuEofJoNohovzKXWEPDC_VaGE2CcDbAeS05k-IwsOQtRQgI0iktM4ltpAu4OepMaobyUZXJRaTMVVMhPd1K2gHNfmMPt4_sB__F9MLxvbA4Ruz-hiVb23eeDTI34XJJ28KYBmCI4vuOqwsfpPzpJdkZ6hu_dBxAapQGtOQUGT8V0tPyUiie1RJOtFfOoLkz95i7owE4-xSsArIuQGaVUTriu56e3Kb8u-mlta7tYzPfSnRx_S-KUbc8jCsJqp-9X9kQ5',
    features: ['體適能運動與認知趣味團體活動', '均衡健康共餐服務與下午茶時間', '日常生活自立訓練與復健諮詢']
  },
  {
    id: 'respite-care',
    title: '喘息服務',
    description: '為辛苦的家庭照顧者提供短期喘息空間，讓我們接手您的照顧工作。',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAogC3WVWSE80KQQZFSR62Ksl-padCodfO4QemXvu0XiJUSM96I0e0aYHdVAcGtqmlUV4_Up3W7uNA3WSLeAlMu00QSNmRBjiIfUKsoqy-bTKY6tB3zk69AouAoiC2nPutgX-WQUDnPWfySDxIXbrwU1HvWL-cjM6Dq3Q0oj9x62JfTZCWosh4fUGtmdAWArbWqwpouH_8cEyhoo4wzYOO-TqjlpuPBEs1Qv14VAbQC-wYnZYTdIwfiQI4tUNKF7bXVuCZwF4YZv8tc',
    features: ['機構內短期住宿照顧服務', '臨時居家替代照護服務', '社區式日間接手照護']
  },
  {
    id: 'dementia-care',
    title: '失智症照護',
    description: '針對失智症患者設計的非藥物治療與全方位安全監護，減緩退化速度。',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBJksFO1bg83PP_lAHL-4e0U8HY3SciaUloQg9PWeIN2EwigCOK514hXMaFCh32pduPZEaWAjAY7WGn4Mo_687v3frmTzx18_gIfKvYHnWg0pHeswgVHPiWmDxpMkMedXe1oZXYC0260UvPYsKXLdLJMNE2q0mMB7aIqb0l3Bl96JlATygdwDVcgMro-BUI3G_ax9pi_8H3jTNBgaW9J-MmVo7cxL2X-pb66jPInNxO-HaG_ygikCOYW4qzFDvtQm8uEkUXaKShYxkh',
    features: ['懷舊療法與專業記憶認知訓練', '數位防走失引導與安全環境規劃', '24小時生活全方位專業守護']
  }
];

export const TEAM: TeamMember[] = [
  {
    id: 'team1',
    name: '李曉明',
    role: '護理師',
    bio: '擁有15年臨床護理經驗，擅長慢性病管理與術後復健指導。',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCuMTeEv21FXM0hVFpenaUT9rvKAgYozQ3JwUqqm2F0PBS9Zux7vyf-JKkm_yExW1eiibWsNLY4PRHF0WHyutsn585B5SaLYvgDdGaKBsHdmNC6Bsp6Vw0uvkgEp_uiAdMvzIJJA3QHTv1BS9LPowSnh2wK8y_hWEPnLZt7yaJRnB2EwiLJDxQk0g-0KIRT7ulyQqlgLFOV-1XLeB21Vp189X4cotv2ttPqFUS9s38innq4S5rW9BeDrQX4FtTYzCcr6LyIv7-T3WZt',
    tags: ['三段五級預防', '傷口護理']
  },
  {
    id: 'team2',
    name: '張雅婷',
    role: '資深社工師',
    bio: '致力於資源連結與心理諮商，協助家屬減輕照顧負擔與壓力。',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDepuMCMEwdnxho5DalaCjWkWoPHm7kUQOnAZZZRvibcswW03fcK_pNb8qhiZomsdJHMtlpYNT8v0Rz8TVCZ7RyEiYwgFpddoYyagNl-Sw49M-Pnni6mEANLNR0U-Fv6sOkCCwJ-hO4FeiVCTb-ax1ueEN1Rcrk8wC7-UUgd86-SX7K0T7OOXVXzaqW4kBuxYTgdh9hE7iolPBzHuWvEWTBvcA0bGRlWzfpEpZ6VUhyRdzoIBRDzJObHSwc3dDQq7NrnJ7xfqcwpBpH',
    tags: ['資源連結', '家屬支持']
  },
  {
    id: 'team3',
    name: '王大衛',
    role: '照顧服務員',
    bio: '耐心熱忱，擅長生活照顧與日常陪伴，是長輩最親近的好夥伴。',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCi3X18xhpTBkWyAlcuFvfHhSEEMYVqa_StciuwKQ_QItY2BZ0V_xsEg55wL_EcPbrPcbya5obBtU_2fCpShIGLUojCCzggRGIHXtyP-RtEsY4Lc6FX2YKf52qVnvpNVuC13cymkXdKUrTEvoOCmeTdq72C6YRBq6byXgcgu_m3YIUq4p4ToeNpZSz4euIQzimNM4LsHjOwLslmKLsUo8mmS9oWQMZTuQ6kdsdZ7pfR5NKAhJXxCeRv-h80_SNUztu3acFjL8tT7HA6',
    tags: ['生活陪伴', '日常復健']
  }
];
