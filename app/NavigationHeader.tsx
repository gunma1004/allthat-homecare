"use client";

import { useState } from "react";
import Link from "next/link";

export default function NavigationHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // 상위 광역 라우트(예: /seoul, /gyeonggi, /incheon)로 연결하여 404 방지
  const navLinks = [
    { name: "서울 홈케어", href: "/seoul" },
    { name: "경기 홈케어", href: "/gyeonggi" },
    { name: "인천 홈케어", href: "/incheon" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#070709]/95 backdrop-blur-xl border-b border-amber-500/20 px-4 py-3 shadow-[0_4px_20px_rgba(245,158,11,0.08)]">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        {/* 로고 영역 */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center font-black text-black text-base shadow-[0_0_12px_rgba(245,158,11,0.4)] group-hover:scale-105 transition-transform flex-shrink-0">
            올
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-black tracking-wider bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-500 bg-clip-text text-transparent">
              올댓홈케어
            </span>
            <span className="text-[9px] text-gray-400 tracking-tighter hidden sm:block uppercase">
              ALL THAT HOMECARE
            </span>
          </div>
        </Link>

        {/* 데스크톱 네비게이션: 순수 HTML <a> 링크로 즉시 크롤링 보장 */}
        <nav
          aria-label="주요 지역 바로가기"
          className="hidden md:flex items-center gap-2 text-xs font-bold text-gray-300"
        >
          {navLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-3.5 py-2 rounded-xl border border-white/5 bg-neutral-900/60 hover:border-amber-500/40 hover:text-amber-400 hover:bg-neutral-800 transition-all flex items-center gap-1.5"
            >
              <span>📍</span> {item.name}
            </Link>
          ))}
        </nav>

        {/* 우측 CTA 및 모바일 메뉴 버튼 */}
        <div className="flex items-center gap-2">
          <a
            href="tel:0507-1280-3344"
            className="bg-gradient-to-r from-amber-500 to-yellow-400 text-black font-extrabold text-xs px-3.5 py-2 rounded-xl shadow transition-all active:scale-95 hover:brightness-105"
          >
            📞 제휴·입점 문의
          </a>

          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-gray-300 hover:text-amber-400 rounded-lg border border-white/10"
            aria-label="메뉴 열기"
            aria-expanded={isMobileMenuOpen}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* 모바일 전용 메뉴 */}
      {isMobileMenuOpen && (
        <nav
          aria-label="모바일 주요 지역 바로가기"
          className="md:hidden border-t border-white/10 mt-3 pt-3 space-y-2 text-xs font-bold text-gray-300"
        >
          {navLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3.5 py-2.5 rounded-xl bg-neutral-900/80 hover:bg-neutral-800 text-gray-200 hover:text-amber-400 border border-white/5 transition-all"
            >
              📍 {item.name}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}