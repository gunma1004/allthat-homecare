import { Metadata } from "next";
import Link from "next/link";
import DongDetailClient from "./DongDetailClient";

interface PageProps {
  params: Promise<{
    region: string;
    district: string;
    dong: string;
  }>;
}

const SITE_URL = "https://baruncare-seoul.netlify.app";

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

// 🌟 30종 고유 순환 패턴 (바른케어 선입금 0원 후불 정찰제 특화)
const SEO_PATTERNS = [
  {
    titleSuffix: "선입금 없는 출장 안심 마사지",
    desc: (d: string) => `${d} 출장 마사지 100% 현장 후불제 안내. 나만의 편안한 공간에서 경험하는 1:1 맞춤 바디 테라피 코스와 투명한 요금을 바른케어에서 확인하세요.`
  },
  {
    titleSuffix: "출장 안심 아로마마사지 케어",
    desc: (d: string) => `${d} 출장 마사지 추천 코스 안내. 최고급 천연 에센셜 오일과 섬세한 이완 테라피로 누적된 일상 피로를 바른케어에서 부드럽게 비워보세요.`
  },
  {
    titleSuffix: "출장 안심 마사지 후불 가이드",
    desc: (d: string) => `${d} 출장 마사지 100% 안심 가이드. 선입금 없는 현장 후불 정찰제와 검증된 전문 테라피스트의 프리미엄 바디 릴렉싱을 안내합니다.`
  },
  {
    titleSuffix: "출장 웰니스 마사지 힐링 안내",
    desc: (d: string) => `${d} 출장 마사지 큐레이션 플랫폼. 지친 신체 밸런스를 되찾아주는 프라이빗 테라피 프로그램과 실시간 연결을 바른케어에서 만나보세요.`
  },
  {
    titleSuffix: "출장 스웨디시 & 아로마마사지",
    desc: (d: string) => `${d} 출장 마사지 VIP 스웨디시 안내. 림프 순환을 돕는 섬세한 터칭 기법과 쾌적한 힐링 케어 정보를 한눈에 비교해 보세요.`
  },
  {
    titleSuffix: "출장 안심 마사지 정찰제 플랫폼",
    desc: (d: string) => `${d} 출장 마사지 투명한 표준 요금 안내. 번거로운 이동 없이 편안한 프라이빗 공간에서 만나는 고품격 맞춤 바디 테라피입니다.`
  },
  {
    titleSuffix: "출장 웰니스 마사지 피로회복",
    desc: (d: string) => `${d} 출장 마사지 집중 컨디셔닝 케어. 굳어있던 목, 어깨와 전신 근육을 시원하게 풀어주는 전문 힐링 프로그램을 제공합니다.`
  },
  {
    titleSuffix: "출장 아로마마사지 릴렉싱",
    desc: (d: string) => `${d} 출장 마사지 힐링 솔루션. 심신 안정에 도움을 주는 천연 아로마 향과 편안한 1:1 맞춤 관리를 바른케어에서 경험하세요.`
  },
  {
    titleSuffix: "출장 안심 마사지 바디 밸런스",
    desc: (d: string) => `${d} 출장 마사지 전문 비교 플랫폼. 위생 관리와 고객 만족도가 검증된 선입금 없는 파트너 샵 정보만을 정직하게 제공합니다.`
  },
  {
    titleSuffix: "출장 웰니스 마사지 감성 케어",
    desc: (d: string) => `${d} 출장 마사지 프리미엄 감성 코스. 온전한 휴식을 선사하는 섬세한 바디 터칭 테라피로 일상의 활력을 되찾아보세요.`
  },
  {
    titleSuffix: "출장 아로마마사지 림프 순환",
    desc: (d: string) => `${d} 출장 마사지 림프 순환 집중 안내. 정체된 신체 흐름을 원활하게 돕고 전신 부종을 가라앉히는 맞춤 아로마 솔루션입니다.`
  },
  {
    titleSuffix: "출장 안심 마사지 추천 코스",
    desc: (d: string) => `${d} 출장 마사지 신속 매칭 가이드. 투명한 요금표와 실시간 전화 상담으로 원하는 시간대에 편리하게 이용하실 수 있습니다.`
  },
  {
    titleSuffix: "출장 웰니스 마사지 전신 스트레칭",
    desc: (d: string) => `${d} 출장 마사지 전통 건식 스트레칭. 무겁고 뻐근한 관절 가동 범위를 넓혀 가뿐한 신체 컨디션을 완성해 드립니다.`
  },
  {
    titleSuffix: "출장 아로마마사지 보습 & 휴식",
    desc: (d: string) => `${d} 출장 마사지 식물성 오일 케어. 건조한 피부에 풍부한 영양을 채우고 깊은 숙면을 유도하는 프리미엄 테라피 코스입니다.`
  },
  {
    titleSuffix: "출장 안심 마사지 1:1 맞춤 솔루션",
    desc: (d: string) => `${d} 출장 마사지 개인 맞춤형 프로그램. 고객님의 당일 피로도와 체형을 세심하게 고려한 고품격 힐링을 안내합니다.`
  },
  {
    titleSuffix: "출장 웰니스 마사지 프라이빗 케어",
    desc: (d: string) => `${d} 출장 마사지 홈 & 호텔 프라이빗 케어. 번잡한 외출 없이 프라이빗한 공간에서 누리는 VIP 테라피 서비스를 확인하세요.`
  },
  {
    titleSuffix: "출장 아로마마사지 심신 안정 가이드",
    desc: (d: string) => `${d} 출장 마사지 힐링 아로마콜로지. 감각을 깨우는 순수 에센셜 블렌딩으로 지친 마음까지 포근하게 보듬어 드립니다.`
  },
  {
    titleSuffix: "출장 안심 마사지 정찰 요금표",
    desc: (d: string) => `${d} 출장 마사지 거품 없는 합리적인 가격. 추가 비용 걱정 없이 정직하게 이용 가능한 공인 파트너 샵 정보입니다.`
  },
  {
    titleSuffix: "출장 웰니스 마사지 속근육 딥티슈",
    desc: (d: string) => `${d} 출장 마사지 심부 근막 이완 케어. 뭉친 승모근과 만성 요통 부위를 정확한 수기 압으로 풀어주는 속 시원한 코스입니다.`
  },
  {
    titleSuffix: "출장 아로마마사지 부종 완화",
    desc: (d: string) => `${d} 출장 마사지 하체 붓기 및 림프 솔루션. 하루 종일 서 있거나 앉아있어 굳은 다리를 가볍게 만들어 드립니다.`
  },
  {
    titleSuffix: "출장 안심 마사지 공식 제휴처",
    desc: (d: string) => `${d} 출장 마사지 인증 제휴점 리스트. 철저한 매너와 체계적인 위생 수칙을 준수하는 테라피스트만을 선별했습니다.`
  },
  {
    titleSuffix: "출장 웰니스 마사지 힐링 테라피",
    desc: (d: string) => `${d} 출장 마사지 도심 속 힐링 가이드. 복잡한 생각을 내려놓고 신체 밸런스를 차분히 정돈하는 최고의 휴식을 선사합니다.`
  },
  {
    titleSuffix: "출장 아로마마사지 감성 스웨디시",
    desc: (d: string) => `${d} 출장 마사지 부드러운 스웨디시 케어. 림프선을 따라 심장 방향으로 밀어 올리는 유러피언 정통 테라피를 만나보세요.`
  },
  {
    titleSuffix: "출장 안심 마사지 클린 케어",
    desc: (d: string) => `${d} 출장 마사지 안심 위생 프로그램. 청결한 관리 환경과 세심한 1:1 케어로 고객 만족도가 높은 전문점 정보입니다.`
  },
  {
    titleSuffix: "출장 웰니스 마사지 상체 집중 케어",
    desc: (d: string) => `${d} 출장 마사지 거북목·어깨 결림 집중 관리. 스마트폰과 PC 사용으로 굳어버린 상체 라인을 편안하게 이완합니다.`
  },
  {
    titleSuffix: "출장 아로마마사지 프리미엄 오일",
    desc: (d: string) => `${d} 출장 마사지 100% 천연 식물성 블렌딩. 피부 자극 없이 부드럽고 촉촉하게 스며드는 프리미엄 테라피를 경험해 보세요.`
  },
  {
    titleSuffix: "출장 안심 마사지 야간 빠른 연결",
    desc: (d: string) => `${d} 출장 마사지 늦은 시간 안심 이용 안내. 늦은 저녁이나 주말에도 편안하게 상담받고 일정 조율이 가능합니다.`
  },
  {
    titleSuffix: "출장 웰니스 마사지 활력 회복",
    desc: (d: string) => `${d} 출장 마사지 바이탈 릴렉스 프로그램. 무거운 피로감을 비우고 가뿐한 에너지를 채워주는 최적의 코스입니다.`
  },
  {
    titleSuffix: "출장 아로마마사지 감성 릴렉스",
    desc: (d: string) => `${d} 출장 마사지 평온한 휴식의 완성. 차분한 분위기 속에서 누리는 전문 테라피스트의 손길을 바른케어에서 확인하세요.`
  },
  {
    titleSuffix: "출장 안심 마사지 종합 큐레이션",
    desc: (d: string) => `${d} 출장 마사지 토탈 웰니스 플랫폼. 스웨디시부터 건식, 아로마까지 취향에 맞는 최고의 프로그램을 한눈에 확인하세요.`
  }
];

function getDynamicDongInsight(districtName: string, dongName: string, seed: number) {
  const dongInsightGroups = [
    {
      subtitle: `${dongName} 거주자 및 직장인을 위한 1:1 맞춤 바디 테라피 인사이트`,
      sec1Title: `1. ${dongName} 일대 직장인들의 좌식 업무와 승모근 긴장 완화`,
      sec1Text: [
        `${districtName} ${dongName}은 활발한 상업 공간과 주거 단지가 조화를 이루는 곳으로, 일상 업무나 컴퓨터 작업 등으로 인한 상체 근육의 긴장도가 높게 나타나는 지역입니다. 장시간 키보드와 마우스를 조작하다 보면 어깨가 안으로 말리는 라운드 숄더와 거북목 자세가 유발되기 쉽습니다. 이는 목덜미 후두하근과 상부 승모근에 지속적인 부하를 주어 혈액 순환을 저해하고, 만성적인 어깨 뻐근함과 두통을 일으킵니다.`,
        `이러한 국소 근막 긴장을 효과적으로 완화하기 위해서는 체온을 안정적으로 유지하면서 단축된 근섬유를 결을 따라 부드럽게 늘려주는 수기 요법이 필요합니다. 굳어있던 혈관이 확장되면서 림프액과 혈액 순환이 촉진되고, 근육 내부에 쌓인 피로 부산물이 빠르게 배출되어 가벼운 어깨 컨디션을 회복할 수 있습니다.`
      ],
      sec2Title: "2. 컨디션에 따른 건식 타이와 스웨디시 오일 케어 비교",
      sec2Text: [
        `테라피를 선택할 때는 당일의 피로도와 신체 통증 양상을 파악하는 것이 중요합니다. 건식 기법의 대표인 타이는 별도의 오일 없이 진행되며, 관절의 가동 범위를 넓혀주는 수동적 전신 스트레칭을 핵심으로 합니다. 평소 운동량이 적어 관절 마디가 굳었거나 허리 및 하체의 묵직함을 개운하게 해소하고 싶을 때 알맞습니다.`,
        `반면 프리미엄 스웨디시는 식물성 오일을 도포하여 심장 방향으로 부드럽고 리드미컬하게 밀어 올리는 림프 순환 중심 테크닉입니다. 피부 표면의 자극 없이 정서적 안정과 깊은 신체 이완을 유도하므로, 스트레스로 인해 불면증을 겪거나 은은한 휴식을 원하는 분들에게 만족스러운 결과를 제공합니다.`
      ],
      sec3Title: `3. ${dongName} 프라이빗 룸에서 누리는 힐링의 환경적 장점`,
      sec3Text: [
        `테라피의 생리학적 효과를 온전히 누리기 위해서는 심리적 안정감이 필수적입니다. 외부 매장으로 직접 이동할 때 소모되는 교통 체증, 주차 스트레스, 대중교통 이용은 무의식중에 코르티솔 분비를 촉진할 수 있습니다.`,
        `반면 내가 가장 익숙한 독립된 공간에서 진행되는 홈케어는 외부 자극이 원천 차단되어 부교감 신경계가 빠르게 활성화됩니다. 세션이 끝난 후 환복이나 추가 이동 없이 바로 아늑한 수면으로 이어질 수 있어 힐링의 잔여 효과가 다음 날 아침까지 편안하게 지속됩니다.`
      ],
      sec4Title: "4. 안전하고 투명한 정찰제 이용 수칙",
      sec4Text: [
        `${dongName} 출장 마사지 서비스를 이용하실 때는 건전성과 투명성을 갖춘 공식 플랫폼을 확인하시는 것이 안전합니다. 정상적인 제휴 파트너는 예약 명목의 불법 선입금을 요구하지 않으며, 사전 공시된 100% 현장 후불 정찰제 기준을 엄격히 준수합니다.`,
        `허리 디스크 등 특정 질환이 있거나 임신 중인 경우 세션 시작 전 담당 테라피스트에게 미리 전달하시면 세심한 맞춤 압 조절을 통해 가장 안전한 웰니스 케어를 경험하실 수 있습니다.`
      ]
    },
    {
      subtitle: `${dongName} 웰니스 라이프를 위한 전신 림프 순환 & 디톡스 솔루션`,
      sec1Title: `1. 만성 피로와 교감신경 흥분이 신체에 미치는 생리적 영향`,
      sec1Text: [
        `현대인의 불규칙한 생활 습관과 과중한 스트레스는 체내 자율신경계의 밸런스를 무너뜨리는 주된 요인입니다. 교감신경이 지속적으로 긴장하면 말초 혈관이 수축하여 손발이 차가워지고, 근육이 무의식중에 수축 상태를 유지하게 됩니다. 이러한 긴장 상태가 지속되면 체내 노폐물 배출이 지연되고 아침에 기상할 때 몸이 무거운 만성 피로 증후군으로 발전합니다.`,
        `정성 어린 감성 터치와 균일한 리듬의 이완 요법은 감각 신경을 안정시키고 옥시토신과 세로토닌의 분비를 촉진합니다. 이를 통해 긴장되어 있던 신체가 회복 모드로 전환되며, 전신에 온기가 돌면서 자연스러운 활력을 되찾게 됩니다.`
      ],
      sec2Title: "2. 부종 완화와 혈액 순환을 위한 림프 배농 테라피",
      sec2Text: [
        `림프계는 신체의 자가 정화 시스템 역할을 수행하지만 혈관과 달리 자체 박동 펌프가 없습니다. 장시간 앉아 있거나 서 있는 생활로 서혜부(사타구니)와 액와부(겨드랑이) 주변 림프절이 뭉치면 림프액 흐름이 정체되어 하체 부종과 신체 피로도가 급격히 상승합니다.`,
        `림프 순환 케어는 강한 지압을 피하고 림프의 자연스러운 흐름 방향에 맞추어 피부층을 섬세하게 밀어주는 기법을 사용합니다. 이를 통해 축적된 잉여 수분과 대사 폐기물이 림프관으로 원활히 흡수되어 둔탁했던 다리와 전신이 한결 가벼워지는 것을 체감할 수 있습니다.`
      ],
      sec3Title: "3. 식물성 에센셜 아로마 오일의 릴렉싱 메커니즘",
      sec3Text: [
        `아로마 오일 테라피는 천연 식물 추출물의 유효 성분과 후각적 자극을 동시에 활용하는 복합 힐링 기법입니다. 실내를 은은하게 채우는 에센셜 향기는 대뇌 변연계에 직접 작용하여 불안과 긴장을 완화하는 신경 전달 물질을 유도합니다.`,
        `동시에 호호바, 스위트 아몬드 등 고급 베이스 오일이 피부 장벽에 수분막을 형성하여 건조한 환절기 피부를 윤택하게 가꾸어 줍니다. 몸의 긴장 완화와 피부 케어를 동시에 완성하는 이유입니다.`
      ],
      sec4Title: `4. ${dongName} 제휴 매장 신뢰 이용 팁`,
      sec4Text: [
        `바른케어는 ${dongName} 전역의 고객 여러분께서 안심하고 힐링을 누리실 수 있도록 선입금 없는 엄격한 위생 점검과 검증 절차를 통과한 파트너만을 선별합니다.`,
        `세션 후에는 미온수를 충분히 마셔 체내로 방출된 노폐물이 원활히 배출되도록 돕고, 관리 당일은 과음을 피하고 충분한 수면을 취하는 것이 릴렉싱 효과를 극대화하는 비결입니다.`
      ]
    },
    {
      subtitle: `${dongName} 바디 컨디셔닝을 위한 체계적 근골격계 릴렉싱 가이드`,
      sec1Title: `1. 보행 패턴과 골반 주변 근육의 긴장 메커니즘`,
      sec1Text: [
        `${districtName} ${dongName} 일대를 중심으로 대중교통 이용과 잦은 도보 이동을 반복하는 경우, 척추를 받쳐주는 골반 지지근(중둔근, 이상근, 장요근)에 불균형한 하중이 가해집니다. 특히 짝다리를 짚거나 다리를 꼬는 습관은 골반의 미세한 뒤틀림을 유발하여 허리 하부와 허벅지 뒤쪽 햄스트링에 연쇄적인 뻐근함을 초래합니다.`,
        `체계적인 바디 컨디셔닝 요법은 단순히 겉 근육만을 문지르는 것이 아니라 골반과 척추 주변의 심부 지지근을 정교하게 짚어냅니다. 틀어진 좌우 밸런스를 정돈함으로써 보행 시 하체 피로도를 낮추고 안정적인 신체 정렬을 완성합니다.`
      ],
      sec2Title: "2. 뭉친 속근육을 풀어내는 딥티슈 테크닉의 이해",
      sec2Text: [
        `오랜 기간 묵혀둔 만성 피로는 표층 근육 아래 위치한 심부 근막에 단단한 매듭 형태의 트리거 포인트가 형성되어 발생합니다. 가벼운 터치만으로는 도달하기 힘든 이 부위는 전문적인 딥티슈 기법을 통해 다루어야 합니다.`,
        `체중을 실은 일정한 지속 압력을 심부 조직에 전달함으로써 굳어있던 근막을 분리하고 정상적인 탄력을 회복시킵니다. 세션 직후 뻐근했던 허리와 등줄기가 개운하게 열리는 상쾌함을 경험하실 수 있습니다.`
      ],
      sec3Title: "3. 방문형 케어가 제공하는 프라이빗 시간의 효율성",
      sec3Text: [
        `바쁜 현대인에게 이동 시간을 절약하는 것은 가장 현명한 컨디션 관리 전략입니다. 주차 공간을 찾거나 대기 시간을 기다리는 피로를 덜어내고, 내가 지정한 시간에 프라이빗한 관리를 누릴 수 있습니다.`,
        `누구의 방해도 받지 않는 아늑한 공간에서 진행되는 세션은 정신적 휴식과 신체적 재생을 동시에 도모할 수 있는 최적의 환경을 선사합니다.`
      ],
      sec4Title: "4. 매너 있는 이용과 정찰제 서비스 신뢰",
      sec4Text: [
        `${dongName} 공식 제휴 샵들은 사전에 명시된 투명한 100% 현장 후불 정찰제 요금을 적용하여 이용자에게 혼선을 주지 않습니다.`,
        `위생 어메니티와 소독을 철저히 마친 전문 관리사와의 신뢰 관계를 통해 ${dongName} 일대 어디서나 격조 높은 프라이빗 테라피를 편안하게 누려보시기 바랍니다.`
      ]
    }
  ];

  return dongInsightGroups[seed % dongInsightGroups.length];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { region, district, dong } = await params;
  const districtName = safeDecode(district);
  const dongName = safeDecode(dong);

  const displayLocation = `${districtName} ${dongName}`;
  const charSum = (displayLocation + region).split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const patternIndex = Math.abs(charSum) % SEO_PATTERNS.length;
  const pattern = SEO_PATTERNS[patternIndex];

  // 🌟 '바른케어'가 뒤쪽에 배치된 최종 타이틀
  const finalTitle = `${dongName} ${pattern.titleSuffix} | 바른케어`;
  const finalDescription = pattern.desc(dongName);
  const canonicalUrl = `${SITE_URL}/${region}/${encodeURIComponent(districtName)}/${encodeURIComponent(dongName)}`;

  return {
    title: { absolute: finalTitle },
    description: finalDescription,
    alternates: { canonical: canonicalUrl },
    keywords: [
      `${dongName} 출장 마사지`,
      `${dongName}출장마사지`,
      `${dongName} 선입금 없는 마사지`,
      `${dongName} 스웨디시`,
      `${districtName} 마사지`,
      `${dongName} 아로마테라피`,
      `${displayLocation} 출장 안심 마사지`,
      "바른케어"
    ],
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true }
    },
    openGraph: {
      title: finalTitle,
      description: finalDescription,
      url: canonicalUrl,
      siteName: "바른케어",
      locale: "ko_KR",
      type: "article",
      images: [
        {
          url: `${SITE_URL}/banner.jpg`,
          width: 1200,
          height: 630,
          alt: `${dongName} ${pattern.titleSuffix} 바른케어`,
        },
      ],
    },
  };
}

export default async function Page({ params }: PageProps) {
  const resolved = await params;
  const regionFullName = getRegionFullName(resolved.region);
  const districtName = safeDecode(resolved.district);
  const dongName = safeDecode(resolved.dong);

  const displayLocation = `${districtName} ${dongName}`;
  const charSum = (displayLocation + resolved.region).split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const patternIndex = Math.abs(charSum) % SEO_PATTERNS.length;
  const pattern = SEO_PATTERNS[patternIndex];
  const article = getDynamicDongInsight(districtName, dongName, Math.abs(charSum));
  const currentUrl = `${SITE_URL}/${resolved.region}/${encodeURIComponent(districtName)}/${encodeURIComponent(dongName)}`;

  // 🌟 네이버 서치어드바이저 및 구글 공용 4대 고도화 JSON-LD (HealthAndBeautyBusiness, FAQPage, BreadcrumbList, Article)
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      // 1. 업체 및 서비스 구조화 데이터
      {
        "@type": ["HealthAndBeautyBusiness", "LocalBusiness"],
        "@id": `${currentUrl}/#business`,
        name: `${dongName} ${pattern.titleSuffix} | 바른케어`,
        description: pattern.desc(dongName),
        url: currentUrl,
        telephone: "0507-1280-3344",
        image: `${SITE_URL}/banner.jpg`,
        priceRange: "60,000원~180,000원",
        currenciesAccepted: "KRW",
        paymentAccepted: "Cash, Credit Card",
        areaServed: `${regionFullName} ${districtName} ${dongName}`,
        address: {
          "@type": "PostalAddress",
          streetAddress: dongName,
          addressLocality: districtName,
          addressRegion: regionFullName,
          addressCountry: "KR",
        },
      },
      // 2. 검색 결과 아코디언 질의응답 FAQPage 스키마
      {
        "@type": "FAQPage",
        "@id": `${currentUrl}/#faq`,
        mainEntity: [
          {
            "@type": "Question",
            name: `${dongName} 출장 마사지 이용 시 예약 선입금을 내야 하나요?`,
            acceptedAnswer: {
              "@type": "Answer",
              text: "아닙니다. 바른케어는 100% 현장 후불 정찰제로 운영됩니다. 어떠한 형태의 사전 선입금이나 예약금도 일절 요구하지 않습니다.",
            },
          },
          {
            "@type": "Question",
            name: `${dongName} 당일 예약도 가능한가요?`,
            acceptedAnswer: {
              "@type": "Answer",
              text: "네, 대다수 제휴 샵에서 당일 신속 예약이 가능하며, 원활한 일정 조율을 위해 1~2시간 전 사전 연락을 권장합니다.",
            },
          },
          {
            "@type": "Question",
            name: `${dongName} 출장 마사지 정찰제 요금인가요?`,
            acceptedAnswer: {
              "@type": "Answer",
              text: "네, 바른케어에 등록된 모든 제휴점은 선입금 사기 없는 투명한 정찰제 요금을 준수합니다.",
            },
          },
          {
            "@type": "Question",
            name: "위생 소모품 및 시트는 어떻게 관리되나요?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "모든 시트와 타월은 1회 사용 시 즉시 세탁 및 교체되며 철저한 위생 규정을 준수합니다.",
            },
          },
        ],
      },
      // 3. 브레드크럼 탐색 경로 BreadcrumbList 스키마
      {
        "@type": "BreadcrumbList",
        "@id": `${currentUrl}/#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "홈", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: `${districtName} 출장 마사지`, item: `${SITE_URL}/${resolved.region}/${encodeURIComponent(districtName)}` },
          { "@type": "ListItem", position: 3, name: `${dongName} 마사지`, item: currentUrl },
        ],
      },
      // 4. 최신 문서 인덱싱용 Article 스키마
      {
        "@type": "Article",
        "@id": `${currentUrl}/#article`,
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": currentUrl,
        },
        headline: `${dongName} ${pattern.titleSuffix} | 바른케어`,
        description: pattern.desc(dongName),
        image: `${SITE_URL}/banner.jpg`,
        datePublished: "2026-10-14T09:00:00+09:00",
        dateModified: "2026-10-14T09:00:00+09:00",
        author: {
          "@type": "Organization",
          name: "바른케어",
        },
        publisher: {
          "@type": "Organization",
          name: "바른케어",
          logo: {
            "@type": "ImageObject",
            url: `${SITE_URL}/og-image.png`,
          },
        },
      },
    ],
  };

  return (
    <div className="bg-[#070709] text-gray-100 min-h-screen flex flex-col font-sans pb-24 md:pb-10 selection:bg-amber-500 selection:text-black">
      {/* 1. 구조화 데이터 주입 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 2. 네비게이션 헤더 */}
      <header className="sticky top-0 z-40 bg-[#070709]/95 backdrop-blur-md border-b border-amber-500/20">
        <div className="max-w-4xl mx-auto h-16 px-4 flex items-center justify-between">
          <Link href="/" className="font-black text-lg text-white flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-amber-400 text-black flex items-center justify-center font-extrabold text-sm">바</span>
            바른케어
          </Link>
          <div className="flex items-center gap-2">
            <Link
              href={`/${resolved.region}/${encodeURIComponent(districtName)}`}
              className="px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-colors"
            >
              ← {districtName} 전체보기
            </Link>
            <a
              href="tel:0507-1280-3344"
              className="px-4 py-1.5 rounded-full bg-amber-400 hover:bg-amber-300 text-black font-black text-xs transition-transform active:scale-95"
            >
              📞 안심 상담
            </a>
          </div>
        </div>
      </header>

      {/* 3. 본문 영역 */}
      <main className="max-w-4xl mx-auto px-4 py-6 w-full flex-1 space-y-8">
        {/* 상단 브레드크럼 탐색 경로 */}
        <nav aria-label="Breadcrumb" className="text-xs text-gray-400 flex items-center gap-2">
          <Link href="/" className="hover:text-amber-400">홈</Link>
          <span>&gt;</span>
          <Link href={`/${resolved.region}/${encodeURIComponent(districtName)}`} className="hover:text-amber-400">{districtName}</Link>
          <span>&gt;</span>
          <span className="text-amber-400 font-bold">{dongName}</span>
        </nav>

        {/* 상단 메인 히어로 배너 (단 1개의 H1 할당) */}
        <section className="relative rounded-3xl overflow-hidden border border-amber-500/30 shadow-[0_0_40px_rgba(245,158,11,0.12)] bg-[#141418] p-6 md:p-8 space-y-2">
          <span className="text-amber-400 text-xs font-black tracking-widest uppercase block">
            {regionFullName} · {districtName} · {dongName} 100% 현장 후불제
          </span>
          <h1 className="text-2xl md:text-3xl font-black text-white">
            {dongName} {pattern.titleSuffix}
          </h1>
          <p className="text-xs md:text-sm text-gray-300 leading-relaxed">
            {pattern.desc(dongName)}
          </p>
        </section>

        {/* 포근 스타일 3단 탭 메뉴 */}
        <div className="tab_menu sticky top-16 bg-[#070709]/95 z-30 py-2 border-b border-white/10">
          <ul className="grid grid-cols-3 gap-2">
            <a href="#course_info" className="text-center py-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs font-bold hover:bg-amber-500/20 transition">
              코스안내
            </a>
            <a href="#company_info" className="text-center py-2.5 rounded-xl bg-neutral-900 text-gray-300 border border-white/5 text-xs font-bold hover:text-white transition">
              이용안내
            </a>
            <a href="#faq_info" className="text-center py-2.5 rounded-xl bg-neutral-900 text-gray-300 border border-white/5 text-xs font-bold hover:text-white transition">
              자주묻는질문
            </a>
          </ul>
        </div>

        {/* 샵 리스트 클라이언트 컴포넌트 */}
        <DongDetailClient
          region={resolved.region}
          districtName={districtName}
          dongName={dongName}
          regionFullName={regionFullName}
        />

        {/* 코스/요금표 카드 영역 */}
        <section id="course_info" className="space-y-4">
          <h2 className="text-base font-black text-white flex items-center gap-2">
            <span className="w-1.5 h-4 bg-amber-400 rounded-full inline-block"></span>
            {dongName} 출장 마사지 표준 코스 & 정찰제 요금
          </h2>
          <div className="grid gap-3">
            <div className="bg-[#111114] border border-white/10 rounded-2xl p-4 flex justify-between items-center shadow-sm hover:border-amber-500/30 transition">
              <div>
                <span className="text-[10px] bg-amber-500/10 text-amber-300 px-2 py-0.5 rounded font-bold">건식 릴렉스</span>
                <h3 className="font-bold text-sm text-white mt-1">기본 전신 스트레칭 (60분)</h3>
                <p className="text-xs text-gray-400 mt-0.5">뭉친 근육 긴장 완화 및 관절 가동성 회복</p>
              </div>
              <div className="text-right">
                <span className="text-amber-400 font-black text-base">60,000원~</span>
              </div>
            </div>

            <div className="bg-[#111114] border border-white/10 rounded-2xl p-4 flex justify-between items-center shadow-sm hover:border-amber-500/30 transition">
              <div>
                <span className="text-[10px] bg-amber-500/10 text-amber-300 px-2 py-0.5 rounded font-bold">아로마 케어</span>
                <h3 className="font-bold text-sm text-white mt-1">천연 오일 림프 순환 (90분)</h3>
                <p className="text-xs text-gray-400 mt-0.5">식물성 오일 블렌딩과 부드러운 림프 드레니쥐</p>
              </div>
              <div className="text-right">
                <span className="text-amber-400 font-black text-base">90,000원~</span>
              </div>
            </div>

            <div className="bg-[#111114] border border-white/10 rounded-2xl p-4 flex justify-between items-center shadow-sm hover:border-amber-500/30 transition">
              <div>
                <span className="text-[10px] bg-amber-500/10 text-amber-300 px-2 py-0.5 rounded font-bold">VIP 스웨디시</span>
                <h3 className="font-bold text-sm text-white mt-1">프리미엄 감성 바디 웰니스 (120분)</h3>
                <p className="text-xs text-gray-400 mt-0.5">심신의 깊은 휴식과 피로 완벽 리셋 시그니처</p>
              </div>
              <div className="text-right">
                <span className="text-amber-400 font-black text-base">150,000원~</span>
              </div>
            </div>
          </div>
        </section>

        {/* 안심 서비스 운영 안내 */}
        <section id="company_info" className="bg-[#0e0e12] border border-white/10 rounded-2xl p-5 space-y-3 text-xs">
          <h2 className="text-sm font-bold text-white mb-2">{dongName} 안심 서비스 운영 안내</h2>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 py-2 border-b border-white/5">
            <span className="text-gray-400 w-20 shrink-0">운영시간</span>
            <span className="text-gray-200">24시간 연중무휴 (실시간 빠른 조율 가능)</span>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 py-2 border-b border-white/5">
            <span className="text-gray-400 w-20 shrink-0">방문위치</span>
            <span className="text-gray-200">{dongName} 전 지역 자택, 오피스텔, 호텔 및 숙소</span>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 py-2 border-b border-white/5">
            <span className="text-gray-400 w-20 shrink-0">결제방식</span>
            <span className="text-gray-200">선입금 없는 100% 현장 후불 결제 (카드 및 계좌이체 가능)</span>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 py-2">
            <span className="text-gray-400 w-20 shrink-0">이용에티켓</span>
            <span className="text-gray-200">건전한 웰니스 힐링을 지향하며 퇴폐 요구 시 환불 없이 즉시 종료됩니다.</span>
          </div>
        </section>

        {/* 동마다 차별화된 정보성 칼럼 */}
        <article className="bg-[#0e0e12] p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6 text-gray-300 leading-relaxed text-xs sm:text-sm">
          <div className="border-b border-white/10 pb-4">
            <span className="text-amber-400 font-extrabold text-xs tracking-widest block uppercase mb-1">
              LOCAL WELLNESS & CARE GUIDE
            </span>
            <h2 className="text-lg sm:text-xl font-black text-white">
              {article.subtitle}
            </h2>
            <p className="text-gray-400 text-xs mt-1">
              {displayLocation} 고객님을 위한 신체 피로 회복 원리와 프라이빗 테라피 이용 가이드
            </p>
          </div>

          <section className="space-y-2">
            <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
              <span className="text-amber-400">●</span> {article.sec1Title}
            </h3>
            {article.sec1Text.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </section>

          <section className="space-y-2">
            <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
              <span className="text-amber-400">●</span> {article.sec2Title}
            </h3>
            {article.sec2Text.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </section>

          <section className="space-y-2">
            <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
              <span className="text-amber-400">●</span> {article.sec3Title}
            </h3>
            {article.sec3Text.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </section>

          <section className="space-y-2">
            <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
              <span className="text-amber-400">●</span> {article.sec4Title}
            </h3>
            {article.sec4Text.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </section>

          <div className="pt-4 border-t border-white/5 text-[11px] text-gray-500">
            * 본 콘텐츠는 {dongName} 출장 마사지 이용 고객 여러분의 건강한 라이프스타일과 안전한 힐링 테라피 정보 제공을 목적으로 작성되었습니다.
          </div>
        </article>

        {/* 서비스 이용 절차 4단계 */}
        <section className="bg-[#0f0f13] p-6 md:p-8 rounded-3xl border border-amber-500/20 space-y-6">
          <div className="text-center">
            <span className="text-amber-400 text-xs font-bold tracking-widest uppercase">SERVICE PROCESS</span>
            <h2 className="text-xl font-black text-white mt-1">{dongName} 안심 예약 4단계</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-black/60 p-4 rounded-2xl border border-white/5 text-center">
              <span className="text-xs text-amber-400 font-bold">STEP 1</span>
              <h3 className="font-bold text-white mt-1">샵 확인</h3>
              <p className="text-xs text-gray-400 mt-1">{dongName} 추천 제휴점 확인</p>
            </div>
            <div className="bg-black/60 p-4 rounded-2xl border border-white/5 text-center">
              <span className="text-xs text-amber-400 font-bold">STEP 2</span>
              <h3 className="font-bold text-white mt-1">프로그램 선택</h3>
              <p className="text-xs text-gray-400 mt-1">스웨디시 / 아로마 / 건식</p>
            </div>
            <div className="bg-black/60 p-4 rounded-2xl border border-white/5 text-center">
              <span className="text-xs text-amber-400 font-bold">STEP 3</span>
              <h3 className="font-bold text-white mt-1">전화 상담</h3>
              <p className="text-xs text-gray-400 mt-1">원하는 시간 및 코스 조율</p>
            </div>
            <div className="bg-black/60 p-4 rounded-2xl border border-white/5 text-center">
              <span className="text-xs text-amber-400 font-bold">STEP 4</span>
              <h3 className="font-bold text-white mt-1">안심 힐링</h3>
              <p className="text-xs text-gray-400 mt-1">선입금 없는 후불 정찰제</p>
            </div>
          </div>
        </section>

        {/* FAQ 아코디언 섹션 */}
        <section id="faq_info" className="space-y-3">
          <h2 className="text-base font-black text-white flex items-center gap-2">
            <span className="w-1.5 h-4 bg-amber-400 rounded-full inline-block"></span>
            {dongName} 자주 묻는 질문
          </h2>
          <div className="bg-[#111114] rounded-2xl p-4 border border-white/5 space-y-1.5">
            <div className="font-bold text-xs sm:text-sm text-gray-200 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center text-xs font-black">Q</span>
              {dongName} 출장 마사지 이용 시 예약 선입금을 내야 하나요?
            </div>
            <p className="text-xs text-gray-400 pl-7 leading-relaxed">
              아닙니다. 바른케어는 100% 현장 후불 정찰제로 운영됩니다. 어떠한 형태의 사전 선입금이나 예약금도 일절 요구하지 않으니 안심하세요.
            </p>
          </div>
          <div className="bg-[#111114] rounded-2xl p-4 border border-white/5 space-y-1.5">
            <div className="font-bold text-xs sm:text-sm text-gray-200 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center text-xs font-black">Q</span>
              {dongName} 당일 예약도 가능한가요?
            </div>
            <p className="text-xs text-gray-400 pl-7 leading-relaxed">
              네, 대다수 제휴 샵에서 당일 예약이 가능하며, 원활한 일정 조율을 위해 1~2시간 전 사전 연락을 권장합니다.
            </p>
          </div>
          <div className="bg-[#111114] rounded-2xl p-4 border border-white/5 space-y-1.5">
            <div className="font-bold text-xs sm:text-sm text-gray-200 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center text-xs font-black">Q</span>
              {dongName} 출장 마사지 정찰제 요금인가요?
            </div>
            <p className="text-xs text-gray-400 pl-7 leading-relaxed">
              바른케어에 등록된 매장들은 선입금 사기 없는 투명한 정찰제 요금을 준수합니다.
            </p>
          </div>
          <div className="bg-[#111114] rounded-2xl p-4 border border-white/5 space-y-1.5">
            <div className="font-bold text-xs sm:text-sm text-gray-200 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center text-xs font-black">Q</span>
              위생 소모품 및 시트는 어떻게 관리되나요?
            </div>
            <p className="text-xs text-gray-400 pl-7 leading-relaxed">
              모든 시트와 타월은 1회 사용 시 즉시 세탁 및 교체되며 위생 규정을 엄격히 준수합니다.
            </p>
          </div>
        </section>
      </main>

      {/* 모바일 하단 플로팅 고정 바 */}
      <aside className="fixed bottom-0 left-0 right-0 z-50 bg-[#070709]/95 border-t border-amber-500/30 p-3 shadow-2xl backdrop-blur-md md:hidden">
        <div className="max-w-md mx-auto flex items-center justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="text-xs font-bold text-white truncate">{dongName} 안심 테라피</div>
            <div className="text-[10px] text-amber-400">집·숙소 방문 100% 후불 정찰제</div>
          </div>
          <a
            href="tel:0507-1280-3344"
            className="bg-gradient-to-r from-amber-500 to-yellow-400 text-black font-black text-xs px-5 py-2.5 rounded-xl shadow-md active:scale-95 transition-transform shrink-0 flex items-center gap-1.5"
          >
            <span>📞</span> 24시 즉시상담
          </a>
        </div>
      </aside>

      {/* 푸터 */}
      <footer className="bg-[#040406] border-t border-white/10 py-8 text-center text-gray-500 text-xs mt-auto">
        <div className="max-w-4xl mx-auto px-4 space-y-3">
          <div>
            <a
              href="tel:0507-1280-3344"
              className="inline-flex items-center gap-1.5 bg-neutral-900 hover:bg-neutral-800 text-amber-400 font-bold px-4 py-2 rounded-xl border border-amber-500/30 hover:border-amber-400 transition-all text-xs shadow-md"
            >
              <span>🤝</span> 바른케어 제휴 문의 (0507-1280-3344)
            </a>
          </div>
          <p className="text-gray-400 font-medium">
            바른케어는 선입금 없는 건전하고 안전한 프리미엄 바디 웰니스 제휴 정보를 제공합니다.
          </p>
          <p className="text-[11px] text-gray-600">
            COPYRIGHT &copy; BARUNCARE ALL RIGHTS RESERVED.
          </p>
        </div>
      </footer>
    </div>
  );
}