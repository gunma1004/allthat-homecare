import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { regionData } from "@/data/regions";

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

// 🌟 [필수] 수도권 70여 개 시·군·구를 빌드 시점에 100% 정적 HTML(SSG)로 생성하여 타임아웃 누락 방지
export async function generateStaticParams() {
  const paths: { region: string; district: string }[] = [];

  for (const [regionKey, regionVal] of Object.entries(regionData)) {
    for (const districtVal of Object.values(regionVal.districts)) {
      paths.push({
        region: regionKey,
        district: districtVal.name,
      });
    }
  }

  return paths;
}

// 🌟 30종 순환 패턴
const SEO_PATTERNS = [
  {
    titleSuffix: "출장 정찰제 마사지 코스 요금표",
    desc: (d: string) => `${d} 출장 마사지 정찰제 코스 요금표 안내. 서울·경기·인천 출장마사지·스웨디시 업체를 올댓홈케어에서 확인하세요. 시·군·구별 코스, 요금, 운영시간을 정리했습니다.`
  },
  {
    titleSuffix: "출장 아로마 마사지 바디 릴렉싱",
    desc: (d: string) => `${d} 출장 마사지 천연 아로마 코스 안내. 최고급 식물성 오일 블렌딩으로 심신을 편안하게 이완하는 출장 아로마 마사지 정보를 비교해 보세요.`
  },
  {
    titleSuffix: "출장 웰니스 마사지 신체 밸런스 회복",
    desc: (d: string) => `${d} 출장 마사지 웰니스 힐링 가이드. 굳어있던 근육을 부드럽게 이완시키는 출장 웰니스 마사지 프로그램을 올댓홈케어에서 확인하세요.`
  },
  {
    titleSuffix: "출장 스웨디시 마사지 림프 순환 케어",
    desc: (d: string) => `${d} 출장 마사지 스웨디시 케어 안내. 림프선을 따라 심장 방향으로 부드럽게 이완하는 출장 스웨디시 마사지 제휴 매장을 소개합니다.`
  },
  {
    titleSuffix: "출장 정찰제 마사지 투명한 표준 요금",
    desc: (d: string) => `${d} 출장 마사지 투명한 요금 체계. 거품 없는 출장 정찰제 마사지 매장 정보와 운영 시간을 올댓홈케어에서 한눈에 확인하세요.`
  },
  {
    titleSuffix: "출장 웰니스 마사지 피로회복 솔루션",
    desc: (d: string) => `${d} 출장 마사지 맞춤 힐링 안내. 장시간 앉아서 일하는 분들을 위한 출장 웰니스 마사지 집중 컨디셔닝 프로그램을 제공합니다.`
  },
  {
    titleSuffix: "출장 아로마 마사지 에센셜 힐링 케어",
    desc: (d: string) => `${d} 출장 마사지 힐링 테라피. 감각을 깨우는 순수 에센셜 오일과 함께하는 출장 아로마 마사지 추천 목록을 만나보세요.`
  },
  {
    titleSuffix: "출장 타이 마사지 전신 스트레칭",
    desc: (d: string) => `${d} 출장 마사지 정통 건식 코스. 굳어있던 관절 가동 범위를 넓혀주는 전통 수동적 스트레칭 출장 타이 마사지 안내입니다.`
  },
  {
    titleSuffix: "출장 정찰제 마사지 엄선 추천 매장",
    desc: (d: string) => `${d} 출장 마사지 추천 제휴점. 코스와 요금, 운영 시간을 정직하게 공개하는 출장 정찰제 마사지 정보를 올댓홈케어에서 제공합니다.`
  },
  {
    titleSuffix: "출장 웰니스 마사지 프라이빗 힐링",
    desc: (d: string) => `${d} 출장 마사지 홈 & 숙소 맞춤 케어. 외출의 번거로움 없이 편안한 프라이빗 공간에서 누리는 출장 웰니스 마사지입니다.`
  },
  {
    titleSuffix: "출장 아로마 마사지 림프 순환 집중",
    desc: (d: string) => `${d} 출장 마사지 림프 순환 솔루션. 정체된 신체 흐름을 원활히 돕고 부종을 가라앉히는 출장 아로마 마사지 정보를 확인하세요.`
  },
  {
    titleSuffix: "출장 딥티슈 마사지 속근육 집중 케어",
    desc: (d: string) => `${d} 출장 마사지 심부 근막 이완. 뭉친 승모근과 만성 요통 부위를 정확한 수기 압으로 풀어주는 출장 딥티슈 마사지 코스입니다.`
  },
  {
    titleSuffix: "출장 정찰제 마사지 코스 비교 가이드",
    desc: (d: string) => `${d} 출장 마사지 코스별 비교. 타이, 아로마, 스웨디시 출장 정찰제 마사지 이용 요금과 운영 시간을 직접 확인하고 예약하세요.`
  },
  {
    titleSuffix: "출장 웰니스 마사지 컨디셔닝 케어",
    desc: (d: string) => `${d} 출장 마사지 바디 컨디셔닝. 무거운 피로감을 비우고 가뿐한 활력을 충전해 드리는 출장 웰니스 마사지 안내입니다.`
  },
  {
    titleSuffix: "출장 아로마 마사지 감성 스웨디시",
    desc: (d: string) => `${d} 출장 마사지 부드러운 감성 테라피. 식물성 오일로 피부 마찰을 줄인 고품격 출장 아로마 마사지 제휴처를 소개합니다.`
  },
  {
    titleSuffix: "출장 정찰제 마사지 24시 상시 안내",
    desc: (d: string) => `${d} 출장 마사지 주야간 안내. 야간이나 주말에도 편안하게 상담받고 일정 조율이 가능한 출장 정찰제 마사지 목록입니다.`
  },
  {
    titleSuffix: "출장 웰니스 마사지 상체 집중 이완",
    desc: (d: string) => `${d} 출장 마사지 목·어깨 결림 완화. 스마트폰과 PC 사용으로 굳어진 상체 라인을 부드럽게 이완하는 출장 웰니스 마사지입니다.`
  },
  {
    titleSuffix: "출장 아로마 마사지 보습 & 숙면 유도",
    desc: (d: string) => `${d} 출장 마사지 딥 슬립 케어. 건조한 피부에 영양을 더하고 깊은 밤 숙면을 유도하는 출장 아로마 마사지 코스입니다.`
  },
  {
    titleSuffix: "출장 건식 마사지 포인트 이완 케어",
    desc: (d: string) => `${d} 출장 마사지 개운한 건식 요법. 오일 없이 관절 마디와 피로 포인트를 짚어주는 출장 건식 마사지 정보입니다.`
  },
  {
    titleSuffix: "출장 정찰제 마사지 제휴 업체 리스트",
    desc: (d: string) => `${d} 출장 마사지 정식 제휴점. 철저한 매너와 청결한 위생 규정을 준수하는 출장 정찰제 마사지 샵만을 선별했습니다.`
  },
  {
    titleSuffix: "출장 웰니스 마사지 1:1 맞춤 관리",
    desc: (d: string) => `${d} 출장 마사지 맞춤 솔루션. 고객님의 당일 피로도와 신체 상태를 세심하게 배려한 출장 웰니스 마사지 큐레이션입니다.`
  },
  {
    titleSuffix: "출장 아로마 마사지 하체 부종 완화",
    desc: (d: string) => `${d} 출장 마사지 하체 순환 케어. 장시간 서 있거나 앉아있어 굳은 다리를 가볍게 만들어 드리는 출장 아로마 마사지입니다.`
  },
  {
    titleSuffix: "출장 정찰제 마사지 안심 이용 가이드",
    desc: (d: string) => `${d} 출장 마사지 안심 정보. 사전에 투명하게 공지된 요금 체계로 믿고 부를 수 있는 출장 정찰제 마사지 안내입니다.`
  },
  {
    titleSuffix: "출장 웰니스 마사지 도심휴식 힐링",
    desc: (d: string) => `${d} 출장 마사지 도심 속 안식처. 복잡한 생각을 내려놓고 신체 밸런스를 정돈하는 출장 웰니스 마사지를 누려보세요.`
  },
  {
    titleSuffix: "출장 아로마 마사지 천연 식물성 케어",
    desc: (d: string) => `${d} 출장 마사지 천연 에센셜 테라피. 피부 자극 없이 부드럽게 스며드는 프리미엄 출장 아로마 마사지입니다.`
  },
  {
    titleSuffix: "출장 스웨디시 마사지 감성 릴렉스",
    desc: (d: string) => `${d} 출장 마사지 감성 힐링. 심신의 긴장을 완화하고 따뜻한 온기를 전하는 출장 스웨디시 마사지 코스 안내입니다.`
  },
  {
    titleSuffix: "출장 정찰제 마사지 다이렉트 예약",
    desc: (d: string) => `${d} 출장 마사지 실시간 연결. 원하는 코스를 선택한 후 각 매장에 직접 연락하여 조율하는 출장 정찰제 마사지입니다.`
  },
  {
    titleSuffix: "출장 웰니스 마사지 전신 바이탈 리셋",
    desc: (d: string) => `${d} 출장 마사지 전신 활력 충전. 만성 피로를 시원하게 털어내고 신체 밸런스를 회복하는 출장 웰니스 마사지입니다.`
  },
  {
    titleSuffix: "출장 아로마 마사지 심신 안정 힐링",
    desc: (d: string) => `${d} 출장 마사지 힐링 솔루션. 지친 몸과 마음에 깊은 안식을 선사하는 전문 테라피스트의 출장 아로마 마사지입니다.`
  },
  {
    titleSuffix: "출장 정찰제 마사지 종합 코스 안내",
    desc: (d: string) => `${d} 출장 마사지 종합 큐레이션. 건식, 아로마, 스웨디시를 아우르는 최고의 출장 정찰제 마사지 정보를 확인해 보세요.`
  }
];

// SSR 추천 제휴 샵 목록
const defaultShops = [
  { id: 1, name: "바른안심테라피", desc: "굳은 근육을 부드럽게 이완하는 건식 타이 & 정찰제 딥 릴렉스 전문", phone: "0507-1280-3140", price: "90,000원부터~", image: "/shop1.jpg" },
  { id: 2, name: "오늘밤바른케어", desc: "천연 에센셜 오일과 섬세한 핸드 테크닉의 프리미엄 아로마 바디 순환 케어", phone: "0507-1280-3199", price: "60,000원부터~", image: "/shop2.jpg" },
  { id: 3, name: "주주안심홈타이", desc: "타이와 아로마를 결합한 VIP 시그니처 정찰제 힐링 프로그램", phone: "0507-1280-3197", price: "60,000원부터~", image: "/shop3.jpg" },
  { id: 4, name: "골든바른테라피", desc: "정직한 정찰제 운영과 아늑한 힐링을 선사하는 감성 스웨디시", phone: "0507-1280-3360", price: "60,000원부터~", image: "/shop4.jpg" },
  { id: 5, name: "퀸즈바른홈케어", desc: "숙련된 테라피스트의 1:1 맞춤형 VIP 피로회복 웰니스 홈케어", phone: "0507-1280-3296", price: "60,000원부터~", image: "/shop5.jpg" }
];

function getDynamicDistrictInsight(districtName: string, seed: number) {
  const sectionsGroup = [
    {
      subtitle: `${districtName} 출장 마사지 이용 고객을 위한 신체 밸런스 회복 가이드`,
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
        `건전하고 투명한 이용 환경을 위해 ${districtName} 고객님께서는 다음 사항을 사전에 확인하시는 것이 좋습니다. 신뢰할 수 있는 공식 등록 파트너는 불투명한 현장 추가 요금 없이 사전에 안내된 정찰제 요금 기준을 엄격히 준수합니다.`,
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
        `${districtName} 올댓홈케어는 고객 여러분께서 믿고 선택하실 수 있도록 정찰제와 운영 시간을 정직하게 안내하는 검증된 매장 정보만을 엄선하여 실시간 제공합니다.`
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

  const finalTitle = `${districtName} 출장 마사지 ${pattern.titleSuffix} | 올댓홈케어`;
  const finalDescription = pattern.desc(districtName);
  const canonicalUrl = `${SITE_URL}/${region}/${encodeURIComponent(districtName)}`;

  return {
    title: { absolute: finalTitle },
    description: finalDescription,
    alternates: { canonical: canonicalUrl },
    keywords: [
      `${districtName} 출장 마사지`,
      `${districtName}출장마사지`,
      `${districtName} 출장 정찰제 마사지`,
      `${districtName} 출장 아로마 마사지`,
      `${districtName} 출장 웰니스 마사지`,
      `${districtName} 출장 스웨디시 마사지`,
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
          alt: `${districtName} 출장 마사지 - 올댓홈케어`,
        },
      ],
    },
  };
}

export default async function RegionalDetailPage({ params }: PageProps) {
  const { region, district } = await params;
  const districtName = safeDecode(district);
  const currentRegion = regionData[region];

  if (!currentRegion) {
    notFound();
  }

  const regionFullName = getRegionFullName(region);
  const charSum = (districtName + region).split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const patternIndex = Math.abs(charSum) % SEO_PATTERNS.length;
  const pattern = SEO_PATTERNS[patternIndex];
  const article = getDynamicDistrictInsight(districtName, Math.abs(charSum));
  const currentUrl = `${SITE_URL}/${region}/${encodeURIComponent(districtName)}`;

  // 🌟 네이버 서치어드바이저 / 구글 복합 JSON-LD
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${currentUrl}/#webpage`,
        url: currentUrl,
        name: `${districtName} 출장 마사지 ${pattern.titleSuffix} | 올댓홈케어`,
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
            item: `${SITE_URL}/${region}` // 🌟 올바른 상위 라우트 주소 (404 방지)
          },
          {
            "@type": "ListItem",
            position: 3,
            name: `${districtName} 출장 마사지`,
            item: currentUrl
          }
        ]
      },
      {
        "@type": "ItemList",
        "@id": `${currentUrl}/#itemlist`,
        name: `${districtName} 출장 마사지 제휴 목록`,
        description: `${districtName} 출장 정찰제 마사지 제휴점 리스트`,
        itemListOrder: "https://schema.org/ItemListUnordered",
        itemListElement: defaultShops.map((shop, idx) => ({
          "@type": "ListItem",
          position: idx + 1,
          item: {
            "@type": "HealthAndBeautyBusiness",
            name: `${districtName} ${shop.name}`,
            url: `${currentUrl}#shop-${shop.id}`,
            description: shop.desc,
            telephone: shop.phone,
            priceRange: shop.price,
            image: `${SITE_URL}${shop.image}`
          }
        }))
      },
      {
        "@type": "FAQPage",
        "@id": `${currentUrl}/#faq`,
        mainEntity: [
          {
            "@type": "Question",
            name: `${districtName} 출장 마사지 예약은 어떻게 하나요?`,
            acceptedAnswer: {
              "@type": "Answer",
              text: "올댓홈케어에서 각 제휴 업체의 코스와 이용 요금, 운영 시간을 확인하신 후 안내된 전화연결 버튼을 통해 해당 매장으로 직접 예약하시면 됩니다.",
            },
          },
          {
            "@type": "Question",
            name: `${districtName} 출장 정찰제 마사지 요금은 사전에 확인 가능한가요?`,
            acceptedAnswer: {
              "@type": "Answer",
              text: "네, 올댓홈케어는 시·군·구별 제휴 업체의 코스 구성과 요금을 사전에 투명하게 공개하여 추가금 걱정 없이 한눈에 비교하실 수 있습니다.",
            },
          },
          {
            "@type": "Question",
            name: "올댓홈케어 이용 시 별도 중개 수수료가 있나요?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "아닙니다. 올댓홈케어는 건전하고 편리한 정보 안내 플랫폼으로 이용자에게 어떠한 중개 수수료도 청구하지 않습니다.",
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
        {/* 네이버 Yeti 봇용 브레드크럼 */}
        <nav aria-label="Breadcrumb" className="text-xs text-gray-400 flex items-center gap-1.5">
          <Link href="/" className="hover:text-amber-400 transition-colors">홈</Link>
          <span>&gt;</span>
          <Link href={`/${region}`} className="hover:text-amber-400 transition-colors">
            {regionFullName}
          </Link>
          <span>&gt;</span>
          <span className="text-amber-400 font-bold">{districtName} 출장 마사지</span>
        </nav>

        {/* 상단 메인 히어로 배너 */}
        <section className="relative rounded-3xl overflow-hidden border border-amber-500/30 shadow-[0_0_40px_rgba(245,158,11,0.12)] bg-[#141418]">
          <div className="p-6 md:p-10 space-y-3">
            <span className="text-amber-400 text-xs font-black tracking-widest uppercase mb-1 block">
              {regionFullName.toUpperCase()} · 출장 정찰제 마사지 안내
            </span>
            <h1 className="text-2xl md:text-4xl font-black text-white drop-shadow-md">
              {districtName} 출장 마사지 {pattern.titleSuffix}
            </h1>
            <p className="text-xs md:text-sm text-gray-300 max-w-xl leading-relaxed">
              {pattern.desc(districtName)}
            </p>
          </div>
        </section>

        {/* 🌟 제휴 샵 목록 UI (빈 공간 문제 해결: SSR로 온전히 렌더링) */}
        <section className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-sm font-black text-amber-400 tracking-wider uppercase flex items-center gap-2">
              <span className="w-1.5 h-4 bg-amber-400 rounded-full inline-block"></span>
              🏆 {districtName} 추천 제휴 매장 목록
            </h2>
            <span className="text-[11px] text-gray-500">정찰제 요금 및 운영시간 준수</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {defaultShops.map((shop) => (
              <div
                key={shop.id}
                id={`shop-${shop.id}`}
                className="bg-gradient-to-br from-[#161619] to-[#101013] border border-amber-500/25 hover:border-amber-400 rounded-2xl p-4 flex gap-4 items-center shadow-lg transition-all"
              >
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-xl overflow-hidden shrink-0 border border-amber-500/30">
                  <img
                    src={shop.image}
                    alt={`${districtName} 출장 마사지 - ${shop.name}`}
                    width={96}
                    height={96}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-extrabold text-sm md:text-base text-white truncate">
                      {shop.name}
                    </h3>
                    <span className="text-[10px] bg-amber-500/10 text-amber-400 px-1.5 py-0.5 rounded font-bold shrink-0">
                      신속방문
                    </span>
                  </div>

                  <p className="text-[11px] text-gray-300 mt-1 line-clamp-2 leading-relaxed">
                    {shop.desc}
                  </p>

                  <div className="mt-2.5 flex items-center justify-between">
                    <span className="text-xs font-black text-amber-300">{shop.price}</span>

                    <a
                      href={`tel:${shop.phone.replace(/-/g, "")}`}
                      className="bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-black font-black text-xs px-3.5 py-1.5 rounded-xl shadow transition-all active:scale-95"
                    >
                      전화연결
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

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
            * 본 가이드는 {districtName} 출장 마사지 이용 고객 여러분의 건강한 휴식과 투명한 테라피 정보 비교를 돕기 위해 작성된 정보성 칼럼입니다.
          </div>
        </article>

        {/* 서비스 이용 절차 섹션 */}
        <section className="bg-[#0f0f13] p-6 md:p-8 rounded-3xl border border-amber-500/20 space-y-6">
          <div className="text-center">
            <span className="text-amber-400 text-xs font-bold tracking-widest uppercase">SERVICE PROCESS</span>
            <h2 className="text-xl font-black text-white mt-1">{districtName} 출장 마사지 이용 순서</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-black/60 p-4 rounded-2xl border border-white/5 text-center">
              <span className="text-xs text-amber-400 font-bold">STEP 1</span>
              <h3 className="font-bold text-white mt-1">지역 확인</h3>
              <p className="text-xs text-gray-400 mt-1">{districtName} 출장 마사지 제휴 목록을 확인합니다.</p>
            </div>
            <div className="bg-black/60 p-4 rounded-2xl border border-white/5 text-center">
              <span className="text-xs text-amber-400 font-bold">STEP 2</span>
              <h3 className="font-bold text-white mt-1">코스·요금 비교</h3>
              <p className="text-xs text-gray-400 mt-1">스웨디시, 아로마 정찰제 코스와 요금을 비교합니다.</p>
            </div>
            <div className="bg-black/60 p-4 rounded-2xl border border-white/5 text-center">
              <span className="text-xs text-amber-400 font-bold">STEP 3</span>
              <h3 className="font-bold text-white mt-1">직접 예약</h3>
              <p className="text-xs text-gray-400 mt-1">안내된 전화 버튼으로 해당 업체에 직접 예약합니다.</p>
            </div>
            <div className="bg-black/60 p-4 rounded-2xl border border-white/5 text-center">
              <span className="text-xs text-amber-400 font-bold">STEP 4</span>
              <h3 className="font-bold text-white mt-1">맞춤 케어</h3>
              <p className="text-xs text-gray-400 mt-1">약속된 장소에서 편안하게 홈케어 서비스를 받습니다.</p>
            </div>
          </div>
        </section>

        {/* FAQ 섹션 */}
        <section className="space-y-4">
          <div className="text-center">
            <span className="text-amber-400 text-xs font-bold tracking-widest uppercase">FAQ</span>
            <h2 className="text-xl font-black text-white mt-1">{districtName} 출장 마사지 자주 묻는 질문</h2>
          </div>
          <div className="space-y-3">
            <div className="bg-black/60 p-4 rounded-2xl border border-white/5 space-y-1.5">
              <div className="font-bold text-sm text-gray-200 flex items-center gap-2">
                <span className="text-amber-400">Q.</span> {districtName} 출장 마사지 예약은 어떻게 하나요?
              </div>
              <p className="text-xs text-gray-400 pl-6 leading-relaxed">
                <span className="text-amber-400 font-bold">A.</span> 올댓홈케어 리스트에서 각 업체의 코스와 이용 요금, 운영 시간을 확인하신 후 전화연결 버튼을 통해 해당 매장에 직접 예약하시면 됩니다.
              </p>
            </div>
            <div className="bg-black/60 p-4 rounded-2xl border border-white/5 space-y-1.5">
              <div className="font-bold text-sm text-gray-200 flex items-center gap-2">
                <span className="text-amber-400">Q.</span> {districtName} 출장 정찰제 마사지 요금은 사전에 확인 가능한가요?
              </div>
              <p className="text-xs text-gray-400 pl-6 leading-relaxed">
                <span className="text-amber-400 font-bold">A.</span> 네, 시·군·구별로 나눠 코스와 이용 요금, 운영 시간을 정리해 두었으므로 사전에 코스별 금액을 확인하고 비교해 보실 수 있습니다.
              </p>
            </div>
            <div className="bg-black/60 p-4 rounded-2xl border border-white/5 space-y-1.5">
              <div className="font-bold text-sm text-gray-200 flex items-center gap-2">
                <span className="text-amber-400">Q.</span> 올댓홈케어 플랫폼 이용 시 별도 수수료가 있나요?
              </div>
              <p className="text-xs text-gray-400 pl-6 leading-relaxed">
                <span className="text-amber-400 font-bold">A.</span> 올댓홈케어는 건전한 마사지 정보를 제공하는 디렉터리 플랫폼으로, 이용 고객님께 별도의 수수료를 부과하지 않습니다.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* 4. 푸터 */}
      <footer className="bg-[#040406] border-t border-white/10 py-10 text-center text-gray-500 text-xs mt-auto">
        <div className="max-w-4xl mx-auto px-4 space-y-4">
          <div>
            <a
              href="tel:0507-1280-3344"
              className="inline-flex items-center gap-1.5 bg-neutral-900 hover:bg-neutral-800 text-amber-400 font-bold px-4 py-2 rounded-xl border border-amber-500/30 hover:border-amber-400 transition-all text-xs shadow-md"
            >
              🤝 올댓홈케어 제휴 및 입점 문의
            </a>
          </div>
          <p className="text-gray-400 font-medium">
            올댓홈케어는 서울·인천·경기 전 지역의 출장 정찰제 마사지, 출장 아로마 마사지 코스 및 요금 정보를 제공하는 플랫폼입니다.
          </p>
          <p className="text-[11px] text-gray-600">COPYRIGHT &copy; ALL THAT HOMECARE ALL RIGHTS RESERVED.</p>
        </div>
      </footer>
    </div>
  );
}