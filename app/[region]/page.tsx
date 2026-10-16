// app/[region]/page.tsx
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { regionData } from '../MainClientUI';

const SITE_URL = 'https://allthat-homecare.netlify.app';

interface RegionPageProps {
  params: Promise<{
    region: string;
  }>;
}

function safeDecode(str: string): string {
  if (!str) return '';
  let decoded = str;
  try {
    decoded = decodeURIComponent(decodeURIComponent(str));
  } catch {
    try {
      decoded = decodeURIComponent(str);
    } catch {
      decoded = str;
    }
  }
  return decoded.trim();
}

function getRegionFullName(region: string): string {
  switch (region?.toLowerCase()) {
    case 'seoul':
      return '서울';
    case 'gyeonggi':
      return '경기';
    case 'incheon':
      return '인천';
    default:
      return region || '';
  }
}

// 🌟 네이버 C-Rank / D.I.A. 대응: 권역 뒤에 '출장 마사지' 필수 결합 및 '출장', '마사지' 키워드 포함
const REGION_SEO_PATTERNS = [
  {
    titleSuffix: '출장 정찰제 마사지 코스 요금표',
    desc: (r: string) => `${r} 출장 마사지 정찰제 코스 요금표 및 운영시간 안내. 서울·경기·인천 출장마사지·스웨디시 업체를 올댓홈케어에서 확인하세요. 시·군·구별 코스와 요금을 정리했습니다.`,
  },
  {
    titleSuffix: '출장 아로마 마사지 바디 릴렉싱',
    desc: (r: string) => `${r} 출장 마사지 천연 아로마 코스 안내. 최고급 식물성 오일 블렌딩으로 심신을 편안하게 이완하는 출장 아로마 마사지 정보를 올댓홈케어에서 비교해 보세요.`,
  },
  {
    titleSuffix: '출장 웰니스 마사지 신체 밸런스 회복',
    desc: (r: string) => `${r} 출장 마사지 웰니스 힐링 가이드. 굳어있던 근육을 부드럽게 이완시키는 출장 웰니스 마사지 제휴 매장 정보를 확인하고 직접 예약하세요.`,
  },
  {
    titleSuffix: '출장 스웨디시 마사지 림프 순환 케어',
    desc: (r: string) => `${r} 출장 마사지 스웨디시 안내. 림프선을 따라 심장 방향으로 부드럽게 이완하는 출장 스웨디시 마사지 제휴 매장 목록을 올댓홈케어에서 제공합니다.`,
  },
];

export async function generateMetadata({ params }: RegionPageProps): Promise<Metadata> {
  const { region } = await params;
  const currentRegion = regionData[region];

  if (!currentRegion) {
    return {};
  }

  const regionFullName = getRegionFullName(region);
  const locationKeyword = `${regionFullName} 출장 마사지`;

  const charSum = (regionFullName + region).split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const pattern = REGION_SEO_PATTERNS[Math.abs(charSum) % REGION_SEO_PATTERNS.length];

  const title = `${locationKeyword} ${pattern.titleSuffix} | 올댓홈케어`;
  const description = pattern.desc(regionFullName);
  const canonicalUrl = `${SITE_URL}/${region}`;

  return {
    title: { absolute: title },
    description,
    alternates: { canonical: canonicalUrl },
    keywords: [
      `${regionFullName} 출장 마사지`,
      `${regionFullName}출장마사지`,
      `${locationKeyword}`,
      `${regionFullName} 출장 정찰제 마사지`,
      `${regionFullName} 출장 아로마 마사지`,
      `${regionFullName} 출장 웰니스 마사지`,
      `${regionFullName} 출장 스웨디시 마사지`,
      '올댓홈케어',
    ],
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: '올댓홈케어',
      locale: 'ko_KR',
      type: 'website',
      images: [
        {
          url: `${SITE_URL}/banner.jpg`,
          width: 1200,
          height: 630,
          alt: `${locationKeyword} - 올댓홈케어`,
        },
      ],
    },
  };
}

export default async function RegionLandingPage({ params }: RegionPageProps) {
  const { region } = await params;
  const currentRegion = regionData[region];

  if (!currentRegion) {
    notFound();
  }

  const regionFullName = getRegionFullName(region);
  const locationKeyword = `${regionFullName} 출장 마사지`;
  const currentUrl = `${SITE_URL}/${region}`;
  const districts = Object.entries(currentRegion.districts);

  const charSum = (regionFullName + region).split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const pattern = REGION_SEO_PATTERNS[Math.abs(charSum) % REGION_SEO_PATTERNS.length];

  // 🌟 네이버 서치어드바이저 및 구글 공용 허브 구조화 데이터
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `${currentUrl}/#webpage`,
        url: currentUrl,
        name: `${locationKeyword} ${pattern.titleSuffix} | 올댓홈케어`,
        description: pattern.desc(regionFullName),
        inLanguage: 'ko-KR',
        isPartOf: {
          '@type': 'WebSite',
          '@id': `${SITE_URL}/#website`,
          url: SITE_URL,
          name: '올댓홈케어',
        },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${currentUrl}/#breadcrumb`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: '홈',
            item: SITE_URL,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: locationKeyword,
            item: currentUrl,
          },
        ],
      },
      {
        '@type': 'ItemList',
        '@id': `${currentUrl}/#itemlist`,
        name: `${locationKeyword} 세부 시·군·구 제휴 바로가기`,
        itemListOrder: 'https://schema.org/ItemListUnordered',
        itemListElement: districts.map(([dKey, dVal], idx) => ({
          '@type': 'ListItem',
          position: idx + 1,
          name: `${dVal.name} 출장 마사지`,
          url: `${SITE_URL}/${region}/${encodeURIComponent(dVal.name)}`,
        })),
      },
      {
        '@type': 'FAQPage',
        '@id': `${currentUrl}/#faq`,
        mainEntity: [
          {
            '@type': 'Question',
            name: `${regionFullName} 출장 마사지 예약은 어떻게 진행하나요?`,
            acceptedAnswer: {
              '@type': 'Answer',
              text: '올댓홈케어에서 원하시는 시·군·구 제휴 매장의 코스, 요금, 운영 시간을 확인하신 후 전화연결 버튼으로 해당 업체에 직접 예약하시면 됩니다.',
            },
          },
          {
            '@type': 'Question',
            name: `${regionFullName} 출장 마사지 요금은 사전에 확인된 금액 그대로인가요?`,
            acceptedAnswer: {
              '@type': 'Answer',
              text: '네, 올댓홈케어에 등록된 모든 제휴 업체는 사전에 공개된 정찰제 요금표를 준수하며 불투명한 추가 요금이 발생하지 않습니다.',
            },
          },
          {
            '@type': 'Question',
            name: '올댓홈케어 플랫폼 이용 시 별도 중개 수수료가 발생하나요?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: '아닙니다. 올댓홈케어는 건전하고 편리한 정보 안내 플랫폼으로 이용 고객님께 별도의 수수료를 청구하지 않습니다.',
            },
          },
        ],
      },
    ],
  };

  return (
    <div className="bg-[#070709] text-gray-100 min-h-screen flex flex-col font-sans pb-28 md:pb-12 selection:bg-amber-500 selection:text-black">
      {/* 1. 구조화 데이터 주입 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 2. 상단 헤더 */}
      <header className="sticky top-0 z-50 bg-[#070709]/95 backdrop-blur-md border-b border-amber-500/20 px-4 py-3 shadow-[0_4px_20px_rgba(245,158,11,0.08)]">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center font-black text-black text-base shadow-[0_0_12px_rgba(245,158,11,0.4)] group-hover:scale-105 transition-transform flex-shrink-0">
              올
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-black tracking-wider bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-500 bg-clip-text text-transparent">
                올댓홈케어
              </span>
              <span className="text-[9px] text-gray-400 tracking-tighter uppercase">
                ALL THAT HOMECARE
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-2 text-xs font-bold text-gray-300">
            <Link
              href="/seoul"
              className={`px-3 py-1.5 rounded-xl border transition-all ${
                region === 'seoul'
                  ? 'border-amber-400 text-amber-400 bg-amber-500/10'
                  : 'border-white/5 hover:border-amber-500/40 hover:text-amber-400 bg-neutral-900/60'
              }`}
            >
              서울 홈케어
            </Link>
            <Link
              href="/gyeonggi"
              className={`px-3 py-1.5 rounded-xl border transition-all ${
                region === 'gyeonggi'
                  ? 'border-amber-400 text-amber-400 bg-amber-500/10'
                  : 'border-white/5 hover:border-amber-500/40 hover:text-amber-400 bg-neutral-900/60'
              }`}
            >
              경기 홈케어
            </Link>
            <Link
              href="/incheon"
              className={`px-3 py-1.5 rounded-xl border transition-all ${
                region === 'incheon'
                  ? 'border-amber-400 text-amber-400 bg-amber-500/10'
                  : 'border-white/5 hover:border-amber-500/40 hover:text-amber-400 bg-neutral-900/60'
              }`}
            >
              인천 홈케어
            </Link>
          </nav>

          <div className="flex items-center gap-2">
            <a
              href="tel:0507-1280-3344"
              className="bg-gradient-to-r from-amber-500 to-yellow-400 text-black font-extrabold text-xs px-3.5 py-2 rounded-xl shadow transition-all active:scale-95 hover:brightness-105"
            >
              📞 제휴 문의
            </a>
          </div>
        </div>
      </header>

      {/* 3. 본문 메인 영역 */}
      <main className="max-w-5xl mx-auto px-4 py-8 w-full flex-1 space-y-12">
        {/* 네이버 Yeti 봇용 브레드크럼 */}
        <nav aria-label="Breadcrumb" className="text-xs text-gray-400 flex items-center gap-2">
          <Link href="/" className="hover:text-amber-400 transition-colors">홈</Link>
          <span>&gt;</span>
          <span className="text-amber-400 font-bold">{locationKeyword}</span>
        </nav>

        {/* 레퍼런스 스타일 히어로 섹션 */}
        <section className="relative rounded-3xl overflow-hidden border border-amber-500/30 shadow-[0_0_40px_rgba(245,158,11,0.12)] bg-gradient-to-b from-[#141418] to-[#0a0a0d] p-6 md:p-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-7 space-y-4">
              <span className="inline-block px-3.5 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold text-xs tracking-wider uppercase">
                {regionFullName} · 24H 큐레이션
              </span>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white leading-tight">
                {regionFullName}{' '}
                <span className="bg-gradient-to-r from-amber-300 to-yellow-500 bg-clip-text text-transparent block mt-1">
                  출장 마사지 · 스웨디시 안내
                </span>
              </h1>
              <p className="text-xs md:text-sm text-gray-300 leading-relaxed max-w-xl">
                바쁜 하루 끝에는 번거롭게 외출하거나 이동할 필요가 없습니다. 올댓홈케어는 {regionFullName} 전 지역의 시·군·구별 제휴 샵 코스와 이용 요금, 운영 시간을 한눈에 비교해 드립니다. 예약은 각 업체에 직접 전화해 편안하게 진행하세요.
              </p>
              <div className="flex flex-wrap gap-2.5 pt-2">
                <a
                  href="#districts"
                  className="bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 hover:from-amber-400 hover:to-yellow-300 text-black font-extrabold text-xs px-4 py-2.5 rounded-xl shadow transition-transform active:scale-95"
                >
                  📍 {regionFullName} 세부 지역 선택
                </a>
                <a
                  href="#courses"
                  className="bg-neutral-900 hover:bg-neutral-800 text-gray-200 border border-white/10 text-xs font-bold px-4 py-2.5 rounded-xl transition-colors"
                >
                  💎 표준 코스·요금표 보기
                </a>
              </div>
              <div className="flex flex-wrap gap-2 text-[11px] text-gray-400 pt-1 font-medium">
                <span className="bg-black/50 px-2.5 py-1 rounded-lg border border-white/5">24시간 상시 안내</span>
                <span className="bg-black/50 px-2.5 py-1 rounded-lg border border-white/5">60 · 90 · 120분 코스</span>
                <span className="bg-black/50 px-2.5 py-1 rounded-lg border border-white/5">타이 · 아로마 · 스웨디시</span>
              </div>
            </div>

            <div className="md:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden border border-amber-500/20 shadow-2xl h-64 sm:h-72">
                <img
                  src="/banner.jpg"
                  alt={`${locationKeyword} - 올댓홈케어 메인 비주얼`}
                  width={920}
                  height={1280}
                  className="w-full h-full object-cover filter brightness-[0.7]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                <span className="absolute bottom-3 left-4 text-xs font-black text-amber-300 tracking-wider">
                  ALL THAT HOMECARE · {regionFullName}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* 3대 광역 허브 스위처 카드 */}
        <section className="space-y-4">
          <div className="border-b border-white/10 pb-3 flex items-center justify-between">
            <h2 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
              <span className="w-1.5 h-4 bg-amber-400 rounded-full inline-block"></span>
              광역 권역 선택
            </h2>
            <span className="text-xs text-gray-400">수도권 전 지역 안내</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Link
              href="/seoul"
              className={`p-4 rounded-2xl border transition-all ${
                region === 'seoul'
                  ? 'bg-amber-500/10 border-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.15)]'
                  : 'bg-[#111114] border-white/5 hover:border-amber-500/40'
              }`}
            >
              <span className="text-xs text-amber-400 font-bold block mb-1">01</span>
              <h3 className="font-extrabold text-sm text-white">서울 출장 마사지</h3>
              <p className="text-[11px] text-gray-400 mt-1">25개 자치구 세부 동별 코스 안내</p>
            </Link>

            <Link
              href="/gyeonggi"
              className={`p-4 rounded-2xl border transition-all ${
                region === 'gyeonggi'
                  ? 'bg-amber-500/10 border-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.15)]'
                  : 'bg-[#111114] border-white/5 hover:border-amber-500/40'
              }`}
            >
              <span className="text-xs text-amber-400 font-bold block mb-1">02</span>
              <h3 className="font-extrabold text-sm text-white">경기 출장 마사지</h3>
              <p className="text-[11px] text-gray-400 mt-1">31개 시·군 세부 지역 코스 안내</p>
            </Link>

            <Link
              href="/incheon"
              className={`p-4 rounded-2xl border transition-all ${
                region === 'incheon'
                  ? 'bg-amber-500/10 border-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.15)]'
                  : 'bg-[#111114] border-white/5 hover:border-amber-500/40'
              }`}
            >
              <span className="text-xs text-amber-400 font-bold block mb-1">03</span>
              <h3 className="font-extrabold text-sm text-white">인천 출장 마사지</h3>
              <p className="text-[11px] text-gray-400 mt-1">10개 군·구 세부 권역 코스 안내</p>
            </Link>
          </div>
        </section>

        {/* 시·군·구 세부 지역 선택 (레퍼런스 place-grid 형태) */}
        <section id="districts" className="space-y-4">
          <div className="border-b border-white/10 pb-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
            <h2 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
              <span className="w-1.5 h-4 bg-amber-400 rounded-full inline-block"></span>
              {regionFullName} 세부 지역({districts.length}개 시·군·구) 선택
            </h2>
            <p className="text-xs text-gray-400">
              클릭하시면 해당 시·군·구의 전문 출장 마사지 제휴 목록으로 이동합니다.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
            {districts.map(([dKey, dVal]) => (
              <Link
                key={dKey}
                href={`/${region}/${encodeURIComponent(dVal.name)}`}
                className="bg-[#111114] hover:bg-neutral-800 text-gray-200 hover:text-amber-400 border border-white/5 hover:border-amber-500/40 p-3.5 rounded-2xl text-xs font-bold transition-all flex items-center justify-between group shadow-sm"
              >
                <span className="truncate">{dVal.name} 출장 마사지</span>
                <span className="text-amber-400 text-xs transition-transform group-hover:translate-x-0.5">↗</span>
              </Link>
            ))}
          </div>
        </section>

        {/* 대표 코스 및 요금표 섹션 (레퍼런스 course-grid 형태) */}
        <section id="courses" className="space-y-5">
          <div className="border-b border-white/10 pb-3">
            <span className="text-amber-400 text-xs font-black tracking-widest uppercase block mb-1">
              STANDARD COURSES & PRICE
            </span>
            <h2 className="text-lg sm:text-xl font-black text-white">
              {regionFullName} 출장 마사지 표준 코스 & 정찰제 요금표
            </h2>
            <p className="text-xs text-gray-400 mt-1">
              타이·아로마·스웨디시·스페셜 구성과 60·90·120분 시간대별 요금을 확인하고 원하시는 매장에 직접 예약하세요.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {/* 타이 마사지 */}
            <article className="bg-[#111114] border border-white/10 rounded-2xl p-5 space-y-3 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center text-xs font-bold text-amber-400 mb-1">
                  <span>THAI</span>
                  <b>01</b>
                </div>
                <h3 className="text-base font-extrabold text-white">출장 타이 마사지</h3>
                <p className="text-[11px] text-gray-400 mt-1.5 leading-snug">
                  오일 없이 관절의 가동 범위를 넓히는 정통 수동적 스트레칭 중심으로 뭉친 근육을 시원하게 풀어냅니다.
                </p>
              </div>
              <ul className="space-y-1.5 pt-3 border-t border-white/5 text-xs">
                <li className="flex justify-between text-gray-300">
                  <span>60분</span>
                  <b className="text-amber-400 font-bold">60,000원~</b>
                </li>
                <li className="flex justify-between text-gray-300">
                  <span>90분</span>
                  <b className="text-amber-400 font-bold">80,000원~</b>
                </li>
                <li className="flex justify-between text-gray-300">
                  <span>120분</span>
                  <b className="text-amber-400 font-bold">100,000원~</b>
                </li>
              </ul>
            </article>

            {/* 아로마 마사지 */}
            <article className="bg-[#111114] border border-white/10 rounded-2xl p-5 space-y-3 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center text-xs font-bold text-amber-400 mb-1">
                  <span>AROMA</span>
                  <b>02</b>
                </div>
                <h3 className="text-base font-extrabold text-white">출장 아로마 마사지</h3>
                <p className="text-[11px] text-gray-400 mt-1.5 leading-snug">
                  천연 식물성 에센셜 오일로 피부 마찰을 줄이고 심신 안정과 전신 혈류 순환을 촉진하는 부드러운 케어입니다.
                </p>
              </div>
              <ul className="space-y-1.5 pt-3 border-t border-white/5 text-xs">
                <li className="flex justify-between text-gray-300">
                  <span>60분</span>
                  <b className="text-amber-400 font-bold">70,000원~</b>
                </li>
                <li className="flex justify-between text-gray-300">
                  <span>90분</span>
                  <b className="text-amber-400 font-bold">90,000원~</b>
                </li>
                <li className="flex justify-between text-gray-300">
                  <span>120분</span>
                  <b className="text-amber-400 font-bold">120,000원~</b>
                </li>
              </ul>
            </article>

            {/* 스웨디시 마사지 */}
            <article className="bg-[#111114] border border-white/10 rounded-2xl p-5 space-y-3 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center text-xs font-bold text-amber-400 mb-1">
                  <span>SWEDISH</span>
                  <b>03</b>
                </div>
                <h3 className="text-base font-extrabold text-white">출장 스웨디시 마사지</h3>
                <p className="text-[11px] text-gray-400 mt-1.5 leading-snug">
                  림프선을 따라 심장 방향으로 부드럽게 밀어 올리는 유러피언 테크닉으로 전신 부종 완화와 감성 힐링을 돕습니다.
                </p>
              </div>
              <ul className="space-y-1.5 pt-3 border-t border-white/5 text-xs">
                <li className="flex justify-between text-gray-300">
                  <span>60분</span>
                  <b className="text-amber-400 font-bold">90,000원~</b>
                </li>
                <li className="flex justify-between text-gray-300">
                  <span>90분</span>
                  <b className="text-amber-400 font-bold">120,000원~</b>
                </li>
                <li className="flex justify-between text-gray-300">
                  <span>120분</span>
                  <b className="text-amber-400 font-bold">150,000원~</b>
                </li>
              </ul>
            </article>

            {/* 스페셜 마사지 */}
            <article className="bg-[#111114] border border-white/10 rounded-2xl p-5 space-y-3 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center text-xs font-bold text-amber-400 mb-1">
                  <span>SPECIAL</span>
                  <b>04</b>
                </div>
                <h3 className="text-base font-extrabold text-white">출장 스페셜 마사지</h3>
                <p className="text-[11px] text-gray-400 mt-1.5 leading-snug">
                  타이 스트레칭과 아로마, 스웨디시의 장점을 결합하여 당일 피로도를 완벽하게 리셋하는 올인원 코스입니다.
                </p>
              </div>
              <ul className="space-y-1.5 pt-3 border-t border-white/5 text-xs">
                <li className="flex justify-between text-gray-300">
                  <span>60분</span>
                  <b className="text-amber-400 font-bold">100,000원~</b>
                </li>
                <li className="flex justify-between text-gray-300">
                  <span>90분</span>
                  <b className="text-amber-400 font-bold">130,000원~</b>
                </li>
                <li className="flex justify-between text-gray-300">
                  <span>120분</span>
                  <b className="text-amber-400 font-bold">160,000원~</b>
                </li>
              </ul>
            </article>
          </div>
        </section>

        {/* 3대 안심 원칙 (레퍼런스 principles 형태) */}
        <section className="bg-[#0b0b0e] border border-white/5 p-6 md:p-8 rounded-3xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <span className="text-xs font-black text-amber-400">01</span>
              <h3 className="font-extrabold text-sm text-white">시·군·구 위치부터 확인</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                머무시는 구, 시, 동을 선택하시면 해당 지역에 등록된 신속 방문 제휴 매장 목록을 바로 확인하실 수 있습니다.
              </p>
            </div>
            <div className="space-y-2">
              <span className="text-xs font-black text-amber-400">02</span>
              <h3 className="font-extrabold text-sm text-white">코스와 정찰 요금 비교</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                타이, 아로마, 스웨디시, 웰니스 프로그램과 60·90·120분 구성을 사전에 투명하게 확인하고 비교할 수 있습니다.
              </p>
            </div>
            <div className="space-y-2">
              <span className="text-xs font-black text-amber-400">03</span>
              <h3 className="font-extrabold text-sm text-white">업체 직접 예약 및 케어</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                별도의 중개 수수료 없이 제공된 전화번호로 각 매장과 직접 연결하여 편안한 장소에서 1:1 맞춤 관리를 누립니다.
              </p>
            </div>
          </div>
        </section>

        {/* 권역 특화 정보성 가이드 (네이버 C-Rank / D.I.A. 상위 랭킹용) */}
        <article className="bg-[#0e0e12] p-6 sm:p-8 rounded-3xl border border-white/10 space-y-4 text-gray-300 leading-relaxed text-xs sm:text-sm">
          <div className="border-b border-white/10 pb-3">
            <span className="text-amber-400 font-bold text-xs uppercase block mb-1">
              ALL THAT HOMECARE WELLNESS THEORY
            </span>
            <h2 className="text-base sm:text-lg font-black text-white">
              {regionFullName} 시민을 위한 도심휴식 홈케어 가이드 | 올댓홈케어
            </h2>
          </div>
          <p>
            {regionFullName} 일대에서 고정된 자세로 장시간 근무하는 직장인과 거주자분들은 상부 승모근과 척추 기립근에 피로가 집중되기 쉽습니다. 이동 시간과 주차의 번거로움 없이 편안한 프라이빗 공간에서 받는 방문형 바디 테라피는 심신의 긴장을 풀고 자율신경계 균형을 되찾아줍니다.
          </p>
          <p>
            올댓홈케어는 {regionFullName} 전역의 시·군·구별 제휴 업체의 코스와 요금, 운영 시간 정보를 투명하게 정리해 제공합니다. 마음에 드는 코스를 확인하신 후 각 업체에 직접 전화하여 편리하게 일정을 조율해 보시기 바랍니다.
          </p>
        </article>

        {/* 하단 클로징 CTA 카드 (레퍼런스 closing 형태) */}
        <section className="bg-gradient-to-r from-[#18181f] via-[#121216] to-[#18181f] border border-amber-500/30 p-6 md:p-8 rounded-3xl shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-5">
          <div className="space-y-1.5">
            <span className="text-amber-400 text-xs font-black tracking-widest uppercase">
              DIRECT RESERVATION
            </span>
            <h2 className="text-lg sm:text-xl font-black text-white">
              오늘 편안하게 쉬고 싶은 시간에 맞춰 확인하세요
            </h2>
            <p className="text-xs text-gray-400">
              {regionFullName} 내 현재 계신 지역을 선택하시면 각 업체의 코스와 요금을 즉시 확인하실 수 있습니다.
            </p>
          </div>
          <a
            href="tel:0507-1280-3344"
            className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-black font-black px-6 py-3.5 rounded-2xl text-xs sm:text-sm shadow-[0_0_20px_rgba(245,158,11,0.3)] transition-transform active:scale-95 shrink-0"
          >
            <span>📞</span> 입점 및 제휴 문의
          </a>
        </section>
      </main>

      {/* 모바일 하단 플로팅 바 (레퍼런스 floating-cta 형태) */}
      <aside className="fixed bottom-0 left-0 right-0 z-50 bg-[#070709]/95 border-t border-amber-500/30 p-3 shadow-2xl backdrop-blur-md md:hidden">
        <div className="max-w-md mx-auto flex items-center justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="text-xs font-bold text-white truncate">{locationKeyword}</div>
            <div className="text-[10px] text-amber-400">시·군·구별 코스·요금표 직접 확인</div>
          </div>
          <a
            href="tel:0507-1280-3344"
            className="bg-gradient-to-r from-amber-500 to-yellow-400 text-black font-black text-xs px-5 py-2.5 rounded-xl shadow-md active:scale-95 transition-transform shrink-0 flex items-center gap-1.5"
          >
            <span>📞</span> 제휴 문의
          </a>
        </div>
      </aside>

      {/* 4. 푸터 */}
      <footer className="bg-[#040406] border-t border-white/10 py-8 text-center text-gray-500 text-xs mt-auto">
        <div className="max-w-4xl mx-auto px-4 space-y-3">
          <div>
            <a
              href="tel:0507-1280-3344"
              className="inline-flex items-center gap-1.5 bg-neutral-900 hover:bg-neutral-800 text-amber-400 font-bold px-4 py-2 rounded-xl border border-amber-500/30 hover:border-amber-400 transition-all text-xs shadow-md"
            >
              <span>🤝</span> 올댓홈케어 제휴 문의 (0507-1280-3344)
            </a>
          </div>
          <p className="text-gray-400 font-medium">
            올댓홈케어는 {regionFullName} 전 지역의 출장 정찰제 마사지 및 홈케어 제휴 정보를 정리하여 제공합니다.
          </p>
          <p className="text-[11px] text-gray-600">
            COPYRIGHT &copy; ALL THAT HOMECARE ALL RIGHTS RESERVED.
          </p>
        </div>
      </footer>
    </div>
  );
}