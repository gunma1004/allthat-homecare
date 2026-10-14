"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface DongDetailClientProps {
  region: string;
  districtName: string;
  dongName: string;
  regionFullName: string;
}

const initialShops = [
  {
    id: 1,
    name: "바른안심테라피",
    desc: "선입금 없는 100% 현장 후불제! 전문 테라피스트의 정성 어린 감성 바디 테라피",
    phone: "0507-1280-3140",
    price: "110,000원부터~",
    image: "/shop1.jpg",
  },
  {
    id: 2,
    name: "오늘밤바른케어",
    desc: "최고급 천연 아로마 오일을 활용한 전신 이완 및 림프 순환 케어 전문 프로그램",
    phone: "0507-1280-3199",
    price: "60,000원부터~",
    image: "/shop2.jpg",
  },
  {
    id: 3,
    name: "주주안심홈타이",
    desc: "재방문율 높은 안심 케어! 철저한 위생 관리와 품격 있는 정통 타이 & 릴렉싱",
    phone: "0507-1280-3197",
    price: "60,000원부터~",
    image: "/shop3.jpg",
  },
  {
    id: 4,
    name: "골든바른테라피",
    desc: "전문 힐러진의 맞춤형 바디 관리, 시간대별 편안한 VIP 피로회복 솔루션",
    phone: "0507-1280-3360",
    price: "60,000원부터~",
    image: "/shop4.jpg",
  },
  {
    id: 5,
    name: "퀸즈바른홈케어",
    desc: "수도권 전지역 엄선된 파트너! 정직한 정찰제와 함께하는 프라이빗 힐링 테라피",
    phone: "0507-1280-3296",
    price: "60,000원부터~",
    image: "/shop5.jpg",
  },
];

export default function DongDetailClient({
  region,
  districtName,
  dongName,
  regionFullName,
}: DongDetailClientProps) {
  const [shops, setShops] = useState(initialShops);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // 🌟 클라이언트 마운트 후에만 안전하게 셔플을 실행하여 서버/클라이언트 불일치(#418) 차단
    setMounted(true);
    const shuffled = [...initialShops];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setShops(shuffled);
  }, []);

  const fullLocation = `${regionFullName} ${districtName} ${dongName}`;
  const shortLocation = `${districtName} ${dongName}`;
  const displayShops = mounted ? shops : initialShops;

  return (
    <div className="space-y-8">
      {/* 1. 지역 디렉토리 안내 배너 */}
      <section className="bg-[#141418] border border-amber-500/30 rounded-3xl p-6 md:p-8 shadow-lg">
        <span className="text-amber-400 text-xs font-black tracking-widest uppercase mb-1 block">
          {districtName} · {dongName} 100% 현장 후불 정찰제
        </span>
        <h2 className="text-2xl md:text-3xl font-black text-white">
          📍 {shortLocation} 선입금 없는 출장 안심 마사지
        </h2>
        <p className="text-xs md:text-sm text-gray-300 mt-2 leading-relaxed">
          {fullLocation} 고객님을 위한 바른케어 안심 바디케어 디렉토리입니다. 예약 선입금 사기 걱정 없는 정찰제 요금표와 맞춤 코스를 확인하세요.
        </p>
      </section>

      {/* 2. 샵 리스트 섹션 */}
      <section className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-black text-amber-400 tracking-wider uppercase">
            🏆 {shortLocation} 안심 후불 추천 제휴점
          </h3>
          <span className="text-[11px] text-gray-500">선입금 0원 정찰제 제휴 센터</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {displayShops.map((shop) => (
            <div
              key={shop.id}
              className="bg-[#111114] border border-amber-500/20 hover:border-amber-500/60 rounded-2xl p-4 flex gap-4 items-center shadow-lg transition-all group"
            >
              <img
                src={shop.image}
                alt={`${shortLocation} 출장 마사지 - ${shop.name}`}
                width={96}
                height={96}
                loading="lazy"
                className="w-20 h-20 md:w-24 md:h-24 rounded-xl object-cover border border-white/10 flex-shrink-0"
              />

              <div className="flex-1 min-w-0">
                <h4 className="font-extrabold text-sm md:text-base text-white truncate group-hover:text-amber-400 transition-colors">
                  {shop.name} <span className="text-xs font-normal text-gray-400">({dongName})</span>
                </h4>
                <p className="text-[11px] text-gray-400 mt-1 line-clamp-2 leading-snug">
                  {shop.desc}
                </p>
                <div className="mt-2.5 flex items-center justify-between">
                  <span className="text-xs font-black text-amber-400">
                    {shop.price}
                  </span>
                  <a
                    href={`tel:${shop.phone.replace(/-/g, "")}`}
                    className="bg-gradient-to-r from-amber-500 to-yellow-400 text-black font-black text-xs px-3.5 py-1.5 rounded-xl shadow hover:brightness-105 active:scale-95 transition-all"
                  >
                    전화연결
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. 하단 네비게이션 복귀 링크 */}
      <nav aria-label="이전 지역 이동" className="pt-2 flex justify-center gap-3">
        <Link
          href="/"
          className="text-xs bg-neutral-900 border border-white/10 px-4 py-2 rounded-xl text-gray-400 hover:text-amber-400 transition-colors"
        >
          🏠 홈으로 돌아가기
        </Link>
        <Link
          href={`/${region}/${encodeURIComponent(districtName)}`}
          className="text-xs bg-neutral-900 border border-white/10 px-4 py-2 rounded-xl text-amber-400 hover:text-yellow-300 transition-colors"
        >
          📍 {districtName} 다른 동 보기
        </Link>
      </nav>
    </div>
  );
}