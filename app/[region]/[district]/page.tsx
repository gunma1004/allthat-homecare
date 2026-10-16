import { Metadata } from "next";
import Link from "next/link";
import ClientTextMixer from "./ClientTextMixer";

const SITE_URL = "https://allthat-homecare.netlify.app";

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
    case "seoul":
      return "서울특별시";
    case "gyeonggi":
      return "경기도";
    case "incheon":
      return "인천광역시";
    default:
      return region || "";
  }
}

// 🌟 네이버 C-Rank / D.I.A. 중복 수집 누락 방지용 30종 순환 패턴 (올댓홈케어 특화)
const SEO_PATTERNS = [
  {
    titleSuffix: "출장마사지 · 스웨디시 업체 요금 코스 안내",
    desc: (d: string) => `${d} 출장마사지·스웨디시 업체를 올댓홈케어에서 확인하세요. 시·군·구별 코스와 이용 요금, 운영 시간을 일목요연하게 정리했습니다.`
  },
  {
    titleSuffix: "도심휴식 출장 홈케어 아로마 테라피",
    desc: (d: string) => `${d} 출장마사지 및 아로마 테라피 추천 목록. 최고급 천연 에센셜 오일 케어와 쾌적한 힐링 코스를 올댓홈케어에서 편안하게 비교해 보세요.`
  },
  {
    titleSuffix: "홈케어 마사지 코스 요금표 및 운영시간",
    desc: (d: string) => `${d} 출장마사지 코스와 이용 요금, 운영 시간을 한눈에 정리했습니다. 원하시는 매장에 직접 연락하여 편리하게 예약하실 수 있습니다.`
  },
  {
    titleSuffix: "도심휴식 마사지 & 웰니스 테라피 큐레이션",
    desc: (d: string) => `${d} 마사지·홈케어 엄선 큐레이션. 지친 신체 밸런스를 되찾아주는 프라이빗 프로그램 정보와 업체별 세부 정보를 올댓홈케어에서 확인하세요.`
  },
  {
    titleSuffix: "출장 스웨디시 & 감성 힐링 케어 추천",
    desc: (d: string) => `${d} 출장 스웨디시·아로마 전문점 안내. 림프 순환을 돕는 부드러운 터칭 프로그램과 투명한 코스별 요금을 바로 비교해 보세요.`
  },
  {
    titleSuffix: "프라이빗 홈케어 마사지 업체별 상세 비교",
    desc: (d: string) => `${d} 출장마사지 표준 요금 및 코스 안내. 이동의 번거로움 없이 편안한 나만의 공간에서 누리는 고품격 홈 바디 케어 정보를 제공합니다.`
  },
  {
    titleSuffix: "도심휴식 힐링 마사지 피로회복 솔루션",
    desc: (d: string) => `${d} 출장마사지 집중 컨디셔닝 케어. 굳어있던 목, 어깨와 전신 근육을 부드럽게 이완해주는 전문 힐링 프로그램을 올댓에서 확인하세요.`
  },
  {
    titleSuffix: "출장 아로마마사지 심신 안정 릴렉싱",
    desc: (d: string) => `${d} 출장마사지 릴렉싱 케어. 심신 안정에 도움을 주는 천연 아로마 향과 편안한 1:1 맞춤 관리 정보를 올댓홈케어에서 제공합니다.`
  },
  {
    titleSuffix: "스웨디시 · 홈케어 투명한 요금표 정리",
    desc: (d: string) => `${d} 출장마사지 전문 비교 플랫폼. 청결한 관리 환경과 고객 평가가 우수한 제휴 샵의 코스, 이용 요금, 운영 시간 정보를 전해드립니다.`
  },
  {
    titleSuffix: "도심휴식 프리미엄 바디 밸런스 케어",
    desc: (d: string) => `${d} 출장마사지 프리미엄 감성 코스. 온전한 휴식을 선사하는 섬세한 바디 테라피로 일상의 활력을 되찾아보세요.`
  },
  {
    titleSuffix: "출장 아로마마사지 림프 순환 집중 케어",
    desc: (d: string) => `${d} 출장마사지 림프 순환 프로그램 안내. 정체된 신체 순환을 돕고 전신 피로를 가라앉히는 맞춤 테라피 정보를 정리했습니다.`
  },
  {
    titleSuffix: "출장마사지 제휴 매장 추천 리스트",
    desc: (d: string) => `${d} 출장마사지 업체 정보 가이드. 투명한 요금표와 영업시간을 확인하신 후 각 업체로 직접 연락하여 편리하게 일정을 잡으실 수 있습니다.`
  },
  {
    titleSuffix: "도심휴식 건식 스트레칭 & 타이 홈케어",
    desc: (d: string) => `${d} 출장마사지 전통 건식 스트레칭. 무겁고 뻐근한 관절 가동 범위를 넓혀 가뿐한 신체 컨디션을 완성하는 코스 정보를 확인하세요.`
  },
  {
    titleSuffix: "프리미엄 오일 테라피 보습 & 숙면 유도",
    desc: (d: string) => `${d} 출장마사지 식물성 에센셜 케어. 지친 피부에 영양을 더하고 깊은 휴식을 선사하는 프리미엄 홈케어 코스 정보를 안내합니다.`
  },
  {
    titleSuffix: "1:1 맞춤 출장마사지 프로그램 안내",
    desc: (d: string) => `${d} 출장마사지 맞춤형 힐링 가이드. 고객님의 당일 피로도와 신체 상태를 세심하게 배려한 우수 테라피스트 제휴 정보를 만나보세요.`
  },
  {
    titleSuffix: "도심휴식 프라이빗 힐링 공간 큐레이션",
    desc: (d: string) => `${d} 출장마사지 홈 & 숙소 맞춤 케어. 외출의 번거로움 없이 안락한 프라이빗 공간에서 누리는 VIP 테라피 서비스를 확인하세요.`
  },
  {
    titleSuffix: "출장 아로마 테라피 심신 안정 가이드",
    desc: (d: string) => `${d} 출장마사지 힐링 아로마콜로지. 감각을 깨우는 순수 에센셜 블렌딩으로 지친 일상을 포근하게 보듬어 드립니다.`
  },
  {
    titleSuffix: "출장마사지 코스별 이용 요금표 비교",
    desc: (d: string) => `${d} 출장마사지 거품 없는 표준 요금 안내. 각 제휴 업체의 코스 구성, 시간, 금액을 한자리에서 투명하게 비교해 보세요.`
  },
  {
    titleSuffix: "도심휴식 심부 근막 딥티슈 집중 케어",
    desc: (d: string) => `${d} 출장마사지 심부 근막 이완 케어. 뭉친 승모근과 만성 허리 피로를 정확한 수기 압으로 풀어주는 속 시원한 코스 안내입니다.`
  },
  {
    titleSuffix: "출장 아로마마사지 하체 부종 완화 코스",
    desc: (d: string) => `${d} 출장마사지 하체 피로 및 순환 솔루션. 하루 종일 서 있거나 앉아있어 굳은 다리를 가볍게 케어해 드리는 매장 정보입니다.`
  },
  {
    titleSuffix: "출장마사지 검증 제휴점 정보 확인",
    desc: (d: string) => `${d} 출장마사지 정식 제휴점 목록. 정성스러운 매너와 체계적인 위생 수칙을 엄수하는 테라피 정보를 올댓홈케어에서 정리했습니다.`
  },
  {
    titleSuffix: "도심휴식 힐링 바디 테라피 추천",
    desc: (d: string) => `${d} 출장마사지 힐링 가이드. 복잡한 생각을 내려놓고 신체 밸런스를 차분히 정돈하는 최고의 휴식 프로그램을 만나보세요.`
  },
  {
    titleSuffix: "출장 아로마 감성 스웨디시 프로그램",
    desc: (d: string) => `${d} 출장마사지 부드러운 스웨디시 케어. 림프선을 따라 심장 방향으로 밀어 올리는 유러피언 정통 테라피 정보를 제공합니다.`
  },
  {
    titleSuffix: "출장마사지 위생 및 클린 케어 안내",
    desc: (d: string) => `${d} 출장마사지 청결 위생 프로그램. 쾌적한 관리 환경과 세심한 케어로 고객 만족도가 높은 전문 업체 정보입니다.`
  },
  {
    titleSuffix: "도심휴식 상체 집중 이완 마사지",
    desc: (d: string) => `${d} 출장마사지 목·어깨 결림 집중 관리. 스마트폰과 PC 사용으로 굳어버린 상체 라인을 편안하게 풀어주는 코스를 확인하세요.`
  },
  {
    titleSuffix: "출장 아로마마사지 프리미엄 블렌딩",
    desc: (d: string) => `${d} 출장마사지 천연 식물성 오일 케어. 피부 자극 없이 부드럽고 촉촉하게 스며드는 프리미엄 테라피 업체를 엄선했습니다.`
  },
  {
    titleSuffix: "출장마사지 야간 및 주말 운영시간 안내",
    desc: (d: string) => `${d} 출장마사지 운영시간 정보. 늦은 저녁이나 주말에도 편안하게 상담받고 일정 조율이 가능한 매장 목록을 정리했습니다.`
  },
  {
    titleSuffix: "도심휴식 바이탈 에너지 회복 마사지",
    desc: (d: string) => `${d} 출장마사지 바이탈 릴렉스 프로그램. 무거운 피로감을 비우고 가뿐한 에너지를 채워주는 최적의 코스 정보입니다.`
  },
  {
    titleSuffix: "출장 아로마마사지 감성 힐링 완성",
    desc: (d: string) => `${d} 출장마사지 평온한 휴식의 완성. 차분한 분위기 속에서 누리는 전문 테라피스트의 손길을 올댓홈케어에서 확인하세요.`
  },
  {
    titleSuffix: "출장 홈케어 종합 큐레이션 가이드",
    desc: (d: string) => `${d} 출장마사지 토탈 홈케어 플랫폼. 스웨디시부터 건식, 아로마까지 취향에 맞는 최고의 프로그램을 한눈에 비교해 보세요.`
  }
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
        `오일을 사용하지 않는 건식 릴렉스 케어는 관절의 가동성을 넓히고 뭉친 근육을 길게 늘려주는 수동적 스트레칭에 중점을 둡니다. 평소 활동량이 적어 몸이 굳어있거나 하체 부종이 심한 경우 큰 개운함을 줍니다. 반면 스웨디시 및 아로마 테라피는 식물성 오일을 매개로 마찰을 줄이며 림프절을 자극하는 기법으로, 속근육의 통증 없이 심신의 깊은 이완과 감정적 스트레스 해소를 원하는 분들에게 알맞습니다.`
      ],
      sec3Title: "3. 독립된 1인 공간에서 누리는 심리적 안정 효과",
      sec3Text: [
        `테라피의 생리학적 효과를 극대화하는 중요한 요소는 바로 심리적 안정감입니다. 외부 매장을 방문할 때 겪는 번거로운 이동, 대중교통 이용, 타인과의 접촉은 무의식중에 스트레스 호르몬 분비를 촉진할 수 있습니다.`,
        `반면 자택이나 숙소 등 독립된 공간에서 진행되는 프라이빗 케어는 외부의 시선과 소음이 완전히 차단되어 부교감 신경계를 빠르게 활성화합니다. 관리가 끝난 직후에도 환복이나 귀가 이동 없이 곧바로 편안한 수면으로 이어질 수 있어 힐링의 지속 시간이 훨씬 길어집니다.`
      ],
      sec4Title: "4. 안전하고 투명한 웰니스 이용 수칙",
      sec4Text: [
        `건전하고 투명한 이용 환경을 위해 ${districtName} 고객님께서는 다음 사항을 사전에 확인하시는 것이 좋습니다. 신뢰할 수 있는 공인 파트너는 불투명한 추가금 없이 사전 공지된 정찰제 요금 기준을 정직하게 준수합니다.`,
        `또한 최근 관절 시술을 받았거나 임신, 급성 염증 질환이 있는 경우에는 관리 시작 전 담당 테라피스트에게 컨디션을 명확히 전달하여 안전한 맞춤 압 조절을 진행하시길 권장합니다.`
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
        `${districtName} 올댓홈케어는 고객 여러분께서 신뢰하고 선택하실 수 있도록 정찰제와 운영 시간을 정직하게 공개하는 검증된 매장 정보만을 엄선하여 실시간 제공합니다.`
      ]
    }
  ];

  return sectionsGroup[seed % sectionsGroup.length];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { region, district } = await params;
  const districtName = safeDecode(district);

  const charSum = (districtName + region).split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const patternIndex = Math.abs(charSum) % SEO_PATTERNS.length;
  const pattern = SEO_PATTERNS[patternIndex];

  const finalTitle = `${districtName} ${pattern.titleSuffix} | 올댓홈케어`;
  const finalDescription = pattern.desc(districtName);
  const canonicalUrl = `${SITE_URL}/${region}/${encodeURIComponent(districtName)}`;

  return {
    title: { absolute: finalTitle },
    description: finalDescription,
    alternates: { canonical: canonicalUrl },
    keywords: [
      `${districtName} 출장 마사지`,
      `${districtName}출장마사지`,
      `${districtName} 출장 홈케어`,
      `${districtName} 스웨디시`,
      `${districtName} 아로마마사지`,
      "올댓홈케어"
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
      siteName: "올댓홈케어",
      locale: "ko_KR",
      type: "article",
      images: [
        {
          url: `${SITE_URL}/banner.jpg`,
          width: 1200,
          height: 630,
          alt: `${districtName} ${pattern.titleSuffix} 올댓홈케어`,
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
  const patternIndex = Math.abs(charSum) % SEO_PATTERNS.length;
  const pattern = SEO_PATTERNS[patternIndex];
  const article = getDynamicDistrictInsight(districtName, Math.abs(charSum));
  const currentUrl = `${SITE_URL}/${region}/${encodeURIComponent(districtName)}`;

  // 🌟 네이버 서치어드바이저 및 구글 공용 고도화 JSON-LD (디렉터리 허브 페이지 표준 규격)
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${currentUrl}/#webpage`,
        url: currentUrl,
        name: `${districtName} ${pattern.titleSuffix} | 올댓홈케어`,
        description: pattern.desc(districtName),
        inLanguage: "ko-KR",
        isPartOf: {
          "@type": "WebSite",
          "@id": `${SITE_URL}/#website`,
          url: SITE_URL,
          name: "올댓홈케어"
        }
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${currentUrl}/#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "홈",
            item: SITE_URL
          },
          {
            "@type": "ListItem",
            position: 2,
            name: regionFullName,
            item: `${SITE_URL}/${region}/${encodeURIComponent(regionFullName)}`
          },
          {
            "@type": "ListItem",
            position: 3,
            name: districtName,
            item: currentUrl
          }
        ]
      },
      {
        "@type": "ItemList",
        "@id": `${currentUrl}/#itemlist`,
        name: `${districtName} 출장 마사지 · 홈케어 추천 제휴 목록`,
        description: `${districtName} 지역의 검증된 출장마사지, 스웨디시, 홈케어 제휴점 리스트`,
        itemListOrder: "https://schema.org/ItemListUnordered"
      },
      {
        "@type": "FAQPage",
        "@id": `${currentUrl}/#faq`,
        mainEntity: [
          {
            "@type": "Question",
            name: `${districtName} 출장마사지 예약은 어떻게 하나요?`,
            acceptedAnswer: {
              "@type": "Answer",
              text: "올댓홈케어 리스트에서 각 업체의 코스와 이용 요금, 운영 시간을 확인하신 후, 안내된 전화연결 버튼을 통해 해당 업체로 직접 예약하시면 됩니다.",
            },
          },
          {
            "@type": "Question",
            name: `${districtName} 홈케어 이용 요금은 사전에 확인 가능한가요?`,
            acceptedAnswer: {
              "@type": "Answer",
              text: "네, 올댓홈케어에서는 시·군·구별 제휴 업체의 코스 구성과 요금을 사전에 투명하게 공개하여 번거로운 문의 없이 한눈에 비교하실 수 있습니다.",
            },
          },
          {
            "@type": "Question",
            name: "올댓홈케어 이용 시 별도 중개 수수료가 발생하나요?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "아닙니다. 올댓홈케어는 건전하고 편리한 정보 안내 디렉터리 플랫폼으로 이용자에게 어떠한 중개 수수료도 요구하지 않습니다.",
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
            올댓홈케어
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
              📞 입점·제휴 문의
            </a>
          </div>
        </div>
      </header>

      {/* 3. 본문 영역 */}
      <main className="max-w-4xl mx-auto px-4 py-8 w-full flex-1 space-y-12">
        {/* 네이버 Yeti 봇용 브레드크럼 시맨틱 HTML */}
        <nav aria-label="Breadcrumb" className="text-xs text-gray-400 flex items-center gap-1.5">
          <Link href="/" className="hover:text-amber-400 transition-colors">홈</Link>
          <span>&gt;</span>
          <Link href={`/${region}/${encodeURIComponent(regionFullName)}`} className="hover:text-amber-400 transition-colors">
            {regionFullName}
          </Link>
          <span>&gt;</span>
          <span className="text-amber-400 font-bold">{districtName}</span>
        </nav>

        {/* 상단 메인 히어로 배너 */}
        <section className="relative rounded-3xl overflow-hidden border border-amber-500/30 shadow-[0_0_40px_rgba(245,158,11,0.12)] bg-[#141418]">
          <div className="p-6 md:p-10 space-y-3">
            <span className="text-amber-400 text-xs font-black tracking-widest uppercase mb-1 block">
              {regionFullName.toUpperCase()} · 도심휴식 마사지 · 홈케어
            </span>
            <h1 className="text-2xl md:text-4xl font-black text-white drop-shadow-md">
              {districtName} {pattern.titleSuffix}
            </h1>
            <p className="text-xs md:text-sm text-gray-300 max-w-xl leading-relaxed">
              {pattern.desc(districtName)}
            </p>
          </div>
        </section>

        {/* 제휴 샵 목록 UI */}
        <ClientTextMixer region={region} district={districtName} />

        {/* 네이버 C-Rank / D.I.A. 상위 노출용 심층 정보성 아티클 */}
        <article className="bg-[#0e0e12] p-6 sm:p-10 rounded-3xl border border-white/10 space-y-8 text-gray-300 leading-relaxed text-xs sm:text-sm">
          <div className="border-b border-white/10 pb-4">
            <span className="text-amber-400 font-extrabold text-xs tracking-widest block uppercase mb-1">
              ALL THAT HOMECARE WELLNESS INSIGHT
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              {article.subtitle}
            </h2>
            <p className="text-gray-400 text-xs mt-1">
              {districtName} 출장 마사지 이용 고객 및 방문객을 위한 신체 불균형 개선 원리와 테라피 선택 가이드
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
            * 본 가이드는 {districtName} 출장 마사지 및 홈케어 이용 고객 여러분의 건강한 휴식과 투명한 테라피 정보 비교를 돕기 위해 작성된 정보성 칼럼입니다.
          </div>
        </article>

        {/* 서비스 이용 절차 섹션 */}
        <section className="bg-[#0f0f13] p-6 md:p-8 rounded-3xl border border-amber-500/20 space-y-6">
          <div className="text-center">
            <span className="text-amber-400 text-xs font-bold tracking-widest uppercase">SERVICE PROCESS</span>
            <h2 className="text-xl font-black text-white mt-1">{districtName} 간편 이용 절차</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-black/60 p-4 rounded-2xl border border-white/5 text-center">
              <span className="text-xs text-amber-400 font-bold">STEP 1</span>
              <h3 className="font-bold text-white mt-1">지역 확인</h3>
              <p className="text-xs text-gray-400 mt-1">{districtName} 제휴 샵 목록을 확인합니다.</p>
            </div>
            <div className="bg-black/60 p-4 rounded-2xl border border-white/5 text-center">
              <span className="text-xs text-amber-400 font-bold">STEP 2</span>
              <h3 className="font-bold text-white mt-1">코스·요금 비교</h3>
              <p className="text-xs text-gray-400 mt-1">스웨디시, 건식, 아로마 코스와 요금을 비교합니다.</p>
            </div>
            <div className="bg-black/60 p-4 rounded-2xl border border-white/5 text-center">
              <span className="text-xs text-amber-400 font-bold">STEP 3</span>
              <h3 className="font-bold text-white mt-1">직접 예약</h3>
              <p className="text-xs text-gray-400 mt-1">전화 버튼을 통해 해당 업체에 직접 예약합니다.</p>
            </div>
            <div className="bg-black/60 p-4 rounded-2xl border border-white/5 text-center">
              <span className="text-xs text-amber-400 font-bold">STEP 4</span>
              <h3 className="font-bold text-white mt-1">편안한 케어</h3>
              <p className="text-xs text-gray-400 mt-1">약속된 장소에서 전문 홈케어 서비스를 누립니다.</p>
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
                <span className="text-amber-400">Q.</span> {districtName} 출장마사지 예약은 어떻게 하나요?
              </div>
              <p className="text-xs text-gray-400 pl-6 leading-relaxed">
                <span className="text-amber-400 font-bold">A.</span> 올댓홈케어 리스트에서 각 업체의 코스와 이용 요금, 운영 시간을 확인하신 후, 전화연결 버튼을 통해 매장에 직접 예약하시면 됩니다.
              </p>
            </div>
            <div className="bg-black/60 p-4 rounded-2xl border border-white/5 space-y-1.5">
              <div className="font-bold text-sm text-gray-200 flex items-center gap-2">
                <span className="text-amber-400">Q.</span> {districtName} 홈케어 이용 요금은 사전에 확인 가능한가요?
              </div>
              <p className="text-xs text-gray-400 pl-6 leading-relaxed">
                <span className="text-amber-400 font-bold">A.</span> 네, 시·군·구별로 나눠 코스와 이용 요금, 운영 시간을 투명하게 정리해 두었으므로 사전에 코스별 금액을 비교해 보실 수 있습니다.
              </p>
            </div>
            <div className="bg-black/60 p-4 rounded-2xl border border-white/5 space-y-1.5">
              <div className="font-bold text-sm text-gray-200 flex items-center gap-2">
                <span className="text-amber-400">Q.</span> 올댓홈케어 플랫폼 이용 시 별도 수수료가 있나요?
              </div>
              <p className="text-xs text-gray-400 pl-6 leading-relaxed">
                <span className="text-amber-400 font-bold">A.</span> 올댓홈케어는 건전한 마사지 및 홈케어 정보를 제공하는 플랫폼으로, 이용 고객님께 별도의 수수료를 부과하지 않습니다.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* 4. 푸터 */}
      <footer className="bg