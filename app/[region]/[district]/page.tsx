import { Metadata } from "next";
import Link from "next/link";
import ClientTextMixer from "./ClientTextMixer";

interface PageProps {
  params: Promise<{
    region: string;
    district: string;
  }>;
}

function safeDecode(str: string): string {
  if (!str) return "";
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
    case "seoul": return "서울특별시";
    case "gyeonggi": return "경기도";
    case "incheon": return "인천광역시";
    default: return region || "";
  }
}

// 네이버 C-Rank / D.I.A. 대응용 SEO 타이틀 & 설명 패턴
const SEO_PATTERNS = [
  { title: "출장 웰니스 마사지 & 프리미엄 케어", desc: (r: string) => `${r}출장마사지 안심 가이드. 나만의 편안한 공간에서 경험하는 1:1 맞춤 바디 테라피 코스와 정찰제 요금을 케어존마사지에서 확인하세요.` },
  { title: "출장 스웨디시 마사지 감성 바디 릴렉스", desc: (r: string) => `${r}출장마사지 추천 코스 안내. 섬세한 터치와 부드러운 오일 이완 프로그램으로 지친 피로를 풀어드립니다.` },
  { title: "출장 아로마 마사지 오일 테라피 안내", desc: (r: string) => `${r}출장마사지 힐링 케어. 천연 에센셜 오일로 누적된 일상 스트레스를 부드럽게 비워내는 솔루션입니다.` },
  { title: "출장 타이 마사지 정통 바디 스트레칭", desc: (r: string) => `${r}출장마사지 전문 안내. 숙련된 테라피스트의 전신 스트레칭과 시원한 압 조절로 굳은 몸을 개운하게 풀어드립니다.` },
  { title: "출장 릴렉스 마사지 집중 피로 회복", desc: (r: string) => `${r}출장마사지 큐레이션. 집이나 편안한 숙소에서 언제든 프라이빗하게 누리는 맞춤형 힐링 플랫폼입니다.` },
  { title: "출장 딥티슈 마사지 속근육 집중 케어", desc: (r: string) => `${r}출장마사지 프로그램. 만성적인 목 어깨 결림과 등, 허리의 뭉친 피로를 집중적으로 완화해 드립니다.` },
  { title: "출장 림프 순환 마사지 바디 솔루션", desc: (r: string) => `${r}출장마사지 정찰제 안내. 정체된 신체 림프 순환을 돕고 붓기 관리에 집중한 편안한 웰니스 케어입니다.` },
  { title: "출장 감성 테라피 마사지 제휴 안내", desc: (r: string) => `${r}출장마사지 실시간 연결. 편안한 휴식을 제공하는 검증된 파트너 샵 정보를 한눈에 비교해 보세요.` },
  { title: "출장 밸런스 힐링 마사지 가이드", desc: (r: string) => `${r}출장마사지 추천. 균형 잡힌 바디 컨디션과 활력 회복을 돕는 1:1 방문 맞춤 테라피를 만나보세요.` },
  { title: "출장 프리미엄 바디 마사지 힐링 안내", desc: (r: string) => `${r}출장마사지 VIP 안내. 고급 천연 오일과 세심한 케어가 어우러진 최고급 릴렉싱 프로그램을 안내합니다.` }
];

function getDynamicDistrictInsight(districtName: string, seed: number) {
  const sectionsGroup = [
    {
      subtitle: `${districtName} 직장인 및 현대인을 위한 바디 밸런스 회복 가이드`,
      sec1Title: "1. 좌식 생활과 경추·승모근의 만성 긴장 메커니즘",
      sec1Text: [
        `${districtName} 일대에서 사무 업무나 이동이 잦은 직장인들은 장시간 고정된 자세로 인해 상체 근골격계에 피로가 쉽게 누적됩니다. 특히 모니터를 향해 목을 앞으로 빼는 거북목 형태의 자세는 경추 굴곡근을 약화시키고 상부 승모근과 견갑거근에 지속적인 장력을 가하게 됩니다. 이로 인해 어깨 윗선이 묵직해지고 혈류 순환이 제한되면서 뻐근한 두통이나 피로감이 동반됩니다.`,
        `이러한 국소 부위의 근막 유착을 풀어내기 위해서는 경직된 근섬유의 온도를 서서히 올리고, 수기 테크닉을 통해 근육 결을 따라 부드럽게 이완시키는 과정이 요구됩니다. 굳어있던 혈관이 확장되면서 산소와 영양소가 원활히 공급되고, 축적된 피로 물질이 배출되어 신체 본래의 유연성과 가동 범위를 회복할 수 있습니다.`
      ],
      sec2Title: "2. 신체 상태에 따른 건식 스트레칭과 오일 테라피의 차이",
      sec2Text: [
        `바디 케어는 압의 깊이와 전달 방식에 따라 기대 효과가 달라집니다. 본인의 당일 신체 상태와 관절 상태에 맞춰 적절한 기법을 고르는 것이 안전한 힐링의 핵심입니다.`,
        `오일을 사용하지 않는 건식 타이 케어는 관절의 가동성을 넓히고 뭉친 근육을 길게 늘려주는 수동적 스트레칭에 중점을 둡니다. 평소 활동량이 적어 몸이 굳어있거나 하체 부종이 심한 경우 큰 개운함을 줍니다. 반면 스웨디시 및 아로마 테라피는 식물성 오일을 매개로 마찰을 줄이며 림프절을 자극하는 기법으로, 속근육의 통증 없이 심신의 깊은 이완과 감정적 스트레스 해소를 원하는 분들에게 알맞습니다.`
      ],
      sec3Title: "3. 독립된 1인 공간에서 누리는 심리적 안정 효과",
      sec3Text: [
        `테라피의 생리학적 효과를 극대화하는 중요한 요소는 바로 심리적 안정감입니다. 외부 매장을 방문할 때 겪는 번거로운 이동, 대중교통 이용, 타인과의 접촉은 무의식중에 스트레스 호르몬 분비를 촉진할 수 있습니다.`,
        `반면 자택이나 숙소 등 독립된 공간에서 진행되는 프라이빗 케어는 외부의 시선과 소음이 완전히 차단되어 부교감 신경계를 빠르게 활성화합니다. 관리가 끝난 직후에도 환복이나 귀가 이동 없이 곧바로 편안한 수면으로 이어질 수 있어 힐링의 지속 시간이 훨씬 길어집니다.`
      ],
      sec4Title: "4. 안전하고 투명한 웰니스 이용 수칙",
      sec4Text: [
        `건전하고 투명한 이용 환경을 위해 ${districtName} 고객님께서는 다음 사항을 사전에 확인하시는 것이 좋습니다. 신뢰할 수 있는 공식 등록 파트너는 예약 명목의 불법 선입금을 일절 요구하지 않으며 정찰제 요금 기준을 엄격히 준수합니다.`,
        `또한 최근 디스크 시술을 받았거나 임신, 급성 염증 질환이 있는 경우에는 관리 시작 전 담당 힐러에게 컨디션을 명확히 전달하여 안전한 맞춤 압 조절을 진행하시길 권장합니다.`
      ]
    },
    {
      subtitle: `${districtName} 거주자 및 방문객을 위한 일상 스트레스 리셋 솔루션`,
      sec1Title: "1. 만성 스트레스와 자율신경계 불균형이 신체에 미치는 영향",
      sec1Text: [
        `${districtName} 도심 속에서 바쁜 스케줄을 소화하다 보면 교감 신경이 장기간 흥분 상태를 유지하게 됩니다. 자율신경계의 균형이 깨지면 혈관이 수축하고 전신의 모세혈관 순환이 정체되며, 이는 불면증과 만성 피로, 소화 불량 등 다양한 신체화 증상으로 발현됩니다.`,
        `신체 표면을 섬세하고 일정한 리듬으로 터치하는 이완 요법은 감각 수용기를 자극하여 옥시토신과 엔도르핀 분비를 유도합니다. 이를 통해 긴장되어 있던 중추 신경계가 안정 국면으로 전환되며, 뇌파가 안정 상태(알파파)로 접어들어 깊은 숙면을 유도하는 토대가 형성됩니다.`
      ],
      sec2Title: "2. 부종 완화와 디톡스를 위한 림프 순환 케어의 원리",
      sec2Text: [
        `림프계는 혈액순환과 달리 자체적인 펌프 기능이 없어 근육의 수축과 이완, 또는 외부의 부드러운 수기 압력에 의존해 흐름을 유지합니다. 림프절이 집중된 쇄골 하부, 겨드랑이 액와부, 서혜부 주변이 경직되면 체내 잉여 수분과 노폐물이 정체되어 부종과 피부 톤 저하를 일으킵니다.`,
        `림프 테라피는 강한 지압 대신 피부 층을 미세하게 당기고 밀어내는 유러피언 림프 드레니쥐 기법을 활용합니다. 무겁고 둔탁했던 팔다리가 한결 가벼워지고, 신진대사가 활발해져 전신 순환 컨디션이 눈에 띄게 개선되는 경험을 누리실 수 있습니다.`
      ],
      sec3Title: "3. 따뜻한 온도 환경과 아로마 블렌딩의 시너지",
      sec3Text: [
        `테라피를 받으실 때 실내 온도는 23~25도 내외로 아늑하게 유지되는 것이 중요합니다. 체온이 따뜻하게 유지될 때 모공이 열리고 모세혈관 확장이 촉진되어 유효 성분의 흡수율이 높아지기 때문입니다.`,
        `라벤더, 유칼립투스, 베르가못 등 천연 식물에서 추출한 순수 에센셜 오일의 향기는 후각 신경을 통해 대뇌 변연계에 즉각 도달하여 감정적 불안과 긴장을 차분히 가라앉혀 줍니다. 피부 결 케어와 정신적 안정감을 동시에 완성하는 이유입니다.`
      ],
      sec4Title: "4. 올바른 테라피 이용 및 사후 관리 팁",
      sec4Text: [
        `관리를 마친 후에는 체내 노폐물 배출이 활발해지므로 미온수를 충분히 섭취해 주는 것이 바람직합니다. 관리 당일에는 무리한 고강도 운동이나 과도한 음주를 삼가고 따뜻한 휴식을 취해야 근육의 미세 이완 효과가 오래 보존됩니다.`,
        `${districtName} 케어존마사지는 고객 여러분께서 믿고 선택하실 수 있도록 위생 수칙과 에티켓을 준수하는 검증된 매장 정보만을 엄선하여 실시간 제공합니다.`
      ]
    }
  ];

  return sectionsGroup[seed % sectionsGroup.length];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { region, district } = await params;
  const districtName = safeDecode(district);

  const charSum = (districtName + region).split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const pattern = SEO_PATTERNS[Math.abs(charSum) % SEO_PATTERNS.length];

  const finalTitle = `${districtName} 출장 마사지 & 웰니스 테라피 가이드 | 케어존마사지`;
  const finalDescription = pattern.desc(districtName);

  // sitemap.xml과 100% 일치하는 대표 Canonical URL
  const canonicalUrl = `https://carezone-massage.netlify.app/${region}/${encodeURIComponent(districtName)}`;

  return {
    title: { absolute: finalTitle },
    description: finalDescription,
    alternates: { canonical: canonicalUrl },
    keywords: [
      `${districtName}출장마사지`,
      `${districtName} 마사지`,
      `${districtName} 스웨디시`,
      `${districtName} 아로마테라피`,
      `${districtName} 타이마사지`,
      "케어존마사지"
    ],
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
    },
    openGraph: {
      title: finalTitle,
      description: finalDescription,
      url: canonicalUrl,
      siteName: "케어존마사지",
      locale: "ko_KR",
      type: "article",
      images: [
        {
          url: "https://carezone-massage.netlify.app/banner.jpg",
          width: 1200,
          height: 630,
          alt: `${districtName} 출장 마사지 케어존마사지`,
        },
      ],
    },
  };
}

export default async function RegionalDetailPage({ params }: PageProps) {
  const { region, district } = await params;
  const districtName = safeDecode(district);
  const regionFullName = getRegionFullName(region);

  const charSum = (districtName + region).split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const pattern = SEO_PATTERNS[Math.abs(charSum) % SEO_PATTERNS.length];
  const article = getDynamicDistrictInsight(districtName, Math.abs(charSum));
  const currentUrl = `https://carezone-massage.netlify.app/${region}/${encodeURIComponent(districtName)}`;

  // 🌟 네이버 서치어드바이저 및 구글 공용 고도화 JSON-LD (LocalBusiness + FAQPage 결합)
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": `${currentUrl}/#localbusiness`,
        name: `${districtName} 출장 마사지 안내 - 케어존마사지`,
        description: pattern.desc(districtName),
        url: currentUrl,
        telephone: "0507-1280-3344",
        image: "https://carezone-massage.netlify.app/banner.jpg",
        priceRange: "₩₩",
        address: {
          "@type": "PostalAddress",
          addressLocality: districtName,
          addressRegion: regionFullName,
          addressCountry: "KR",
        },
        areaServed: {
          "@type": "AdministrativeArea",
          name: `${regionFullName} ${districtName}`,
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${currentUrl}/#faq`,
        mainEntity: [
          {
            "@type": "Question",
            name: `${districtName}출장마사지 예약은 어떻게 하나요?`,
            acceptedAnswer: {
              "@type": "Answer",
              text: "리스트에서 원하시는 샵 카드의 전화연결 버튼을 누르시면 해당 업체 매니저와 직접 프로그램 및 시간을 조율하실 수 있습니다.",
            },
          },
          {
            "@type": "Question",
            name: "케어존마사지 플랫폼 이용 시 별도 중개 수수료가 있나요?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "케어존마사지는 순수 웰니스 정보 안내 플랫폼으로 이용자에게 어떠한 중개 수수료도 부과하지 않습니다.",
            },
          },
        ],
      },
    ],
  };

  return (
    <div className="bg-[#070709] text-gray-100 min-h-screen flex flex-col font-sans selection:bg-amber-500 selection:text-black">
      {/* 1. 구조화 데이터 주입 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 2. 네비게이션 헤더 */}
      <header className="sticky top-0 z-40 bg-[#070709]/90 backdrop-blur-md border-b border-white/10">
        <div className="max-w-4xl mx-auto h-16 px-4 flex items-center justify-between">
          <Link href="/" className="font-black text-lg text-white flex items-center gap-1.5">
            <span className="w-2.5 h-5 bg-amber-400 rounded-full inline-block"></span>
            케어존마사지
          </Link>
          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-colors"
            >
              전체 지역 홈
            </Link>
            <a
              href="tel:0507-1280-3344"
              className="px-3.5 py-1.5 rounded-full bg-amber-400 text-black font-black text-xs hover:scale-105 transition-transform"
            >
              📞 제휴 문의
            </a>
          </div>
        </div>
      </header>

      {/* 3. 본문 영역 */}
      <main className="max-w-4xl mx-auto px-4 py-8 w-full flex-1 space-y-12">
        {/* 상단 메인 히어로 배너: 문서 전체에서 단 1개의 H1만 배치 */}
        <section className="relative rounded-3xl overflow-hidden border border-amber-500/30 shadow-[0_0_40px_rgba(245,158,11,0.12)] bg-[#141418]">
          <div className="p-6 md:p-10 space-y-3">
            <span className="text-amber-400 text-xs font-black tracking-widest uppercase mb-1 block">
              {regionFullName.toUpperCase()} · DISTRICT WELLNESS HUB
            </span>
            <h1 className="text-2xl md:text-4xl font-black text-white drop-shadow-md">
              {districtName} {pattern.title}
            </h1>
            <p className="text-xs md:text-sm text-gray-300 max-w-xl leading-relaxed">
              {pattern.desc(districtName)}
            </p>
          </div>
        </section>

        {/* 제휴 샵 목록 UI (클라이언트 믹서) */}
        <ClientTextMixer region={region} district={districtName} />

        {/* 네이버 C-Rank / D.I.A. 상위 노출용 심층 정보성 아티클 (H2 태그) */}
        <article className="bg-[#0e0e12] p-6 sm:p-10 rounded-3xl border border-white/10 space-y-8 text-gray-300 leading-relaxed text-xs sm:text-sm">
          <div className="border-b border-white/10 pb-4">
            <span className="text-amber-400 font-extrabold text-xs tracking-widest block uppercase mb-1">
              WELLNESS & BODY CARE INSIGHT
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              {article.subtitle}
            </h2>
            <p className="text-gray-400 text-xs mt-1">
              {districtName} 거주자 및 방문객을 위한 신체 불균형 개선 원리와 테라피 선택 가이드
            </p>
          </div>

          <section className="space-y-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <span className="text-amber-400">●</span> {article.sec1Title}
            </h3>
            {article.sec1Text.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </section>

          <section className="space-y-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <span className="text-amber-400">●</span> {article.sec2Title}
            </h3>
            {article.sec2Text.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </section>

          <section className="space-y-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <span className="text-amber-400">●</span> {article.sec3Title}
            </h3>
            {article.sec3Text.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </section>

          <section className="space-y-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <span className="text-amber-400">●</span> {article.sec4Title}
            </h3>
            {article.sec4Text.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </section>

          <div className="pt-4 border-t border-white/5 text-[11px] text-gray-500">
            * 본 가이드는 {districtName} 지역 거주자 및 방문객 여러분의 올바른 신체 건강 상식과 투명한 테라피 서비스 이용을 돕기 위해 작성된 정보성 칼럼입니다.
          </div>
        </article>

        {/* 서비스 이용 절차 섹션 */}
        <section className="bg-[#0f0f13] p-6 md:p-8 rounded-3xl border border-amber-500/20 space-y-6">
          <div className="text-center">
            <span className="text-amber-400 text-xs font-bold tracking-widest uppercase">SERVICE PROCESS</span>
            <h2 className="text-xl font-black text-white mt-1">{districtName} 안심 이용 순서</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-black/60 p-4 rounded-2xl border border-white/5 text-center">
              <span className="text-xs text-amber-400 font-bold">STEP 1</span>
              <h3 className="font-bold text-white mt-1">지역 확인</h3>
              <p className="text-xs text-gray-400 mt-1">{districtName} 제휴 샵 목록을 확인합니다.</p>
            </div>
            <div className="bg-black/60 p-4 rounded-2xl border border-white/5 text-center">
              <span className="text-xs text-amber-400 font-bold">STEP 2</span>
              <h3 className="font-bold text-white mt-1">코스 비교</h3>
              <p className="text-xs text-gray-400 mt-1">스웨디시, 타이, 아로마 프로그램을 비교합니다.</p>
            </div>
            <div className="bg-black/60 p-4 rounded-2xl border border-white/5 text-center">
              <span className="text-xs text-amber-400 font-bold">STEP 3</span>
              <h3 className="font-bold text-white mt-1">직접 소통</h3>
              <p className="text-xs text-gray-400 mt-1">전화 버튼을 통해 샵과 직접 일정을 상담합니다.</p>
            </div>
            <div className="bg-black/60 p-4 rounded-2xl border border-white/5 text-center">
              <span className="text-xs text-amber-400 font-bold">STEP 4</span>
              <h3 className="font-bold text-white mt-1">맞춤 힐링</h3>
              <p className="text-xs text-gray-400 mt-1">정찰제 요금으로 편안한 관리를 경험합니다.</p>
            </div>
          </div>
        </section>

        {/* FAQ 섹션 */}
        <section className="space-y-4">
          <div className="text-center">
            <span className="text-amber-400 text-xs font-bold tracking-widest uppercase">FAQ</span>
            <h2 className="text-xl font-black text-white mt-1">{districtName} 자주 묻는 질문</h2>
          </div>
          <div className="space-y-3">
            <div className="bg-black/60 p-4 rounded-2xl border border-white/5 space-y-1.5">
              <div className="font-bold text-sm text-gray-200 flex items-center gap-2">
                <span className="text-amber-400">Q.</span> {districtName}출장마사지 예약은 어떻게 하나요?
              </div>
              <p className="text-xs text-gray-400 pl-6 leading-relaxed">
                <span className="text-amber-400 font-bold">A.</span> 리스트에서 원하시는 샵 카드의 전화연결 버튼을 누르시면 해당 업체 매니저와 직접 프로그램 및 시간을 조율하실 수 있습니다.
              </p>
            </div>
            <div className="bg-black/60 p-4 rounded-2xl border border-white/5 space-y-1.5">
              <div className="font-bold text-sm text-gray-200 flex items-center gap-2">
                <span className="text-amber-400">Q.</span> 케어존마사지 플랫폼 이용 시 별도 수수료가 있나요?
              </div>
              <p className="text-xs text-gray-400 pl-6 leading-relaxed">
                <span className="text-amber-400 font-bold">A.</span> 케어존마사지는 순수 정보 안내 플랫폼으로 이용자에게 어떠한 중개 수수료도 부과하지 않습니다.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* 푸터 */}
      <footer className="bg-[#040406] border-t border-white/10 py-10 text-center text-gray-500 text-xs mt-auto">
        <div className="max-w-4xl mx-auto px-4 space-y-4">
          <div>
            <a
              href="tel:0507-1280-3344"
              className="inline-flex items-center gap-1.5 bg-neutral-900 hover:bg-neutral-800 text-amber-400 font-bold px-4 py-2 rounded-xl border border-amber-500/30 hover:border-amber-400 transition-all text-xs shadow-md"
            >
              <span>🤝</span> 케어존마사지 제휴 문의 (0507-1280-3344)
            </a>
          </div>
          <p className="text-gray-400 font-medium">케어존마사지는 쾌적하고 건전한 프리미엄 바디 웰니스 제휴 정보를 제공합니다.</p>
          <p className="text-[11px] text-gray-600">COPYRIGHT &copy; CAREZONE MASSAGE ALL RIGHTS RESERVED.</p>
        </div>
      </footer>
    </div>
  );
}