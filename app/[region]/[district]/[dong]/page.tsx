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

const SITE_URL = "https://allthat-homecare.netlify.app";

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

// 🌟 동/구 뒤에 '출장 마사지' 필수 결합 + 30종 패턴 전체에 '출장'과 '마사지' 키워드 포함
const SEO_PATTERNS = [
  {
    titleSuffix: "출장 정찰제 마사지 코스 요금표",
    desc: (loc: string) => `${loc} 출장 마사지 정찰제 코스 요금표 안내. 서울·경기·인천 출장마사지·스웨디시 업체를 올댓홈케어에서 확인하세요. 시·군·구별 코스, 요금, 운영시간을 정리했습니다.`
  },
  {
    titleSuffix: "출장 아로마 마사지 바디 릴렉싱",
    desc: (loc: string) => `${loc} 출장 마사지 천연 아로마 코스 안내. 최고급 식물성 오일 블렌딩으로 심신을 편안하게 이완하는 출장 아로마 마사지 정보를 비교해 보세요.`
  },
  {
    titleSuffix: "출장 웰니스 마사지 신체 밸런스 회복",
    desc: (loc: string) => `${loc} 출장 마사지 웰니스 힐링 가이드. 굳어있던 근육을 부드럽게 이완시키는 출장 웰니스 마사지 프로그램을 올댓홈케어에서 확인하세요.`
  },
  {
    titleSuffix: "출장 스웨디시 마사지 림프 순환 케어",
    desc: (loc: string) => `${loc} 출장 마사지 스웨디시 케어 안내. 림프선을 따라 심장 방향으로 부드럽게 이완하는 출장 스웨디시 마사지 제휴 매장을 소개합니다.`
  },
  {
    titleSuffix: "출장 정찰제 마사지 투명한 표준 요금",
    desc: (loc: string) => `${loc} 출장 마사지 투명한 요금 체계. 거품 없는 출장 정찰제 마사지 매장 정보와 운영 시간을 올댓홈케어에서 한눈에 확인하세요.`
  },
  {
    titleSuffix: "출장 웰니스 마사지 피로회복 솔루션",
    desc: (loc: string) => `${loc} 출장 마사지 맞춤 힐링 안내. 장시간 앉아서 일하는 분들을 위한 출장 웰니스 마사지 집중 컨디셔닝 프로그램을 제공합니다.`
  },
  {
    titleSuffix: "출장 아로마 마사지 에센셜 힐링 케어",
    desc: (loc: string) => `${loc} 출장 마사지 힐링 테라피. 감각을 깨우는 순수 에센셜 오일과 함께하는 출장 아로마 마사지 추천 목록을 만나보세요.`
  },
  {
    titleSuffix: "출장 타이 마사지 전신 스트레칭",
    desc: (loc: string) => `${loc} 출장 마사지 정통 건식 코스. 굳어있던 관절 가동 범위를 넓혀주는 전통 수동적 스트레칭 출장 타이 마사지 안내입니다.`
  },
  {
    titleSuffix: "출장 정찰제 마사지 엄선 추천 매장",
    desc: (loc: string) => `${loc} 출장 마사지 추천 제휴점. 코스와 요금, 운영 시간을 정직하게 공개하는 출장 정찰제 마사지 정보를 올댓홈케어에서 제공합니다.`
  },
  {
    titleSuffix: "출장 웰니스 마사지 프라이빗 힐링",
    desc: (loc: string) => `${loc} 출장 마사지 홈 & 숙소 맞춤 케어. 외출의 번거로움 없이 편안한 프라이빗 공간에서 누리는 출장 웰니스 마사지입니다.`
  },
  {
    titleSuffix: "출장 아로마 마사지 림프 순환 집중",
    desc: (loc: string) => `${loc} 출장 마사지 림프 순환 솔루션. 정체된 신체 흐름을 원활히 돕고 부종을 가라앉히는 출장 아로마 마사지 정보를 확인하세요.`
  },
  {
    titleSuffix: "출장 딥티슈 마사지 속근육 집중 케어",
    desc: (loc: string) => `${loc} 출장 마사지 심부 근막 이완. 뭉친 승모근과 만성 요통 부위를 정확한 수기 압으로 풀어주는 출장 딥티슈 마사지 코스입니다.`
  },
  {
    titleSuffix: "출장 정찰제 마사지 코스 비교 가이드",
    desc: (loc: string) => `${loc} 출장 마사지 코스별 비교. 타이, 아로마, 스웨디시 출장 정찰제 마사지 이용 요금과 운영 시간을 직접 확인하고 예약하세요.`
  },
  {
    titleSuffix: "출장 웰니스 마사지 컨디셔닝 케어",
    desc: (loc: string) => `${loc} 출장 마사지 바디 컨디셔닝. 무거운 피로감을 비우고 가뿐한 활력을 충전해 드리는 출장 웰니스 마사지 안내입니다.`
  },
  {
    titleSuffix: "출장 아로마 마사지 감성 스웨디시",
    desc: (loc: string) => `${loc} 출장 마사지 부드러운 감성 테라피. 식물성 오일로 피부 마찰을 줄인 고품격 출장 아로마 마사지 제휴처를 소개합니다.`
  },
  {
    titleSuffix: "출장 정찰제 마사지 24시 상시 안내",
    desc: (loc: string) => `${loc} 출장 마사지 주야간 안내. 야간이나 주말에도 편안하게 상담받고 일정 조율이 가능한 출장 정찰제 마사지 목록입니다.`
  },
  {
    titleSuffix: "출장 웰니스 마사지 상체 집중 이완",
    desc: (loc: string) => `${loc} 출장 마사지 목·어깨 결림 완화. 스마트폰과 PC 사용으로 굳어진 상체 라인을 부드럽게 이완하는 출장 웰니스 마사지입니다.`
  },
  {
    titleSuffix: "출장 아로마 마사지 보습 & 숙면 유도",
    desc: (loc: string) => `${loc} 출장 마사지 딥 슬립 케어. 건조한 피부에 영양을 더하고 깊은 밤 숙면을 유도하는 출장 아로마 마사지 코스입니다.`
  },
  {
    titleSuffix: "출장 건식 마사지 포인트 이완 케어",
    desc: (loc: string) => `${loc} 출장 마사지 개운한 건식 요법. 오일 없이 관절 마디와 피로 포인트를 짚어주는 출장 건식 마사지 정보입니다.`
  },
  {
    titleSuffix: "출장 정찰제 마사지 제휴 업체 리스트",
    desc: (loc: string) => `${loc} 출장 마사지 정식 제휴점. 철저한 매너와 청결한 위생 규정을 준수하는 출장 정찰제 마사지 샵만을 선별했습니다.`
  },
  {
    titleSuffix: "출장 웰니스 마사지 1:1 맞춤 관리",
    desc: (loc: string) => `${loc} 출장 마사지 맞춤 솔루션. 고객님의 당일 피로도와 신체 상태를 세심하게 배려한 출장 웰니스 마사지 큐레이션입니다.`
  },
  {
    titleSuffix: "출장 아로마 마사지 하체 부종 완화",
    desc: (loc: string) => `${loc} 출장 마사지 하체 순환 케어. 장시간 서 있거나 앉아있어 굳은 다리를 가볍게 만들어 드리는 출장 아로마 마사지입니다.`
  },
  {
    titleSuffix: "출장 정찰제 마사지 안심 이용 가이드",
    desc: (loc: string) => `${loc} 출장 마사지 안심 정보. 사전에 투명하게 공지된 요금 체계로 믿고 부를 수 있는 출장 정찰제 마사지 안내입니다.`
  },
  {
    titleSuffix: "출장 웰니스 마사지 도심휴식 힐링",
    desc: (loc: string) => `${loc} 출장 마사지 도심 속 안식처. 복잡한 생각을 내려놓고 신체 밸런스를 정돈하는 출장 웰니스 마사지를 누려보세요.`
  },
  {
    titleSuffix: "출장 아로마 마사지 천연 식물성 케어",
    desc: (loc: string) => `${loc} 출장 마사지 천연 에센셜 테라피. 피부 자극 없이 부드럽게 스며드는 프리미엄 출장 아로마 마사지입니다.`
  },
  {
    titleSuffix: "출장 스웨디시 마사지 감성 릴렉스",
    desc: (loc: string) => `${loc} 출장 마사지 감성 힐링. 심신의 긴장을 완화하고 따뜻한 온기를 전하는 출장 스웨디시 마사지 코스 안내입니다.`
  },
  {
    titleSuffix: "출장 정찰제 마사지 다이렉트 예약",
    desc: (loc: string) => `${loc} 출장 마사지 실시간 연결. 원하는 코스를 선택한 후 각 매장에 직접 연락하여 조율하는 출장 정찰제 마사지입니다.`
  },
  {
    titleSuffix: "출장 웰니스 마사지 전신 바이탈 리셋",
    desc: (loc: string) => `${loc} 출장 마사지 전신 활력 충전. 만성 피로를 시원하게 털어내고 신체 밸런스를 회복하는 출장 웰니스 마사지입니다.`
  },
  {
    titleSuffix: "출장 아로마 마사지 심신 안정 힐링",
    desc: (loc: string) => `${loc} 출장 마사지 힐링 솔루션. 지친 몸과 마음에 깊은 안식을 선사하는 전문 테라피스트의 출장 아로마 마사지입니다.`
  },
  {
    titleSuffix: "출장 정찰제 마사지 종합 코스 안내",
    desc: (loc: string) => `${loc} 출장 마사지 종합 큐레이션. 건식, 아로마, 스웨디시를 아우르는 최고의 출장 정찰제 마사지 정보를 확인해 보세요.`
  }
];

function getDynamicDongInsight(districtName: string, dongName: string, seed: number) {
  const dongInsightGroups = [
    {
      subtitle: `${dongName} 출장 마사지 이용 고객을 위한 1:1 맞춤 바디 테라피 인사이트`,
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
        `${dongName} 출장 마사지 서비스를 이용하실 때는 건전성과 투명성을 갖춘 공식 플랫폼을 확인하시는 것이 안전합니다. 정상적인 제휴 파트너는 사전에 공시된 투명한 정찰제 요금 기준을 엄격히 준수합니다.`,
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
        `올댓홈케어는 ${dongName} 전역의 고객 여러분께서 안심하고 힐링을 누리실 수 있도록 엄격한 위생 점검과 검증 절차를 통과한 제휴 매장 정보만을 선별해 안내합니다.`,
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
        `${dongName} 공식 제휴 샵들은 사전에 명시된 투명한 정찰제 요금을 적용하여 이용자에게 혼선을 주지 않습니다.`,
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

  const charSum = (`${districtName} ${dongName}` + region).split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const patternIndex = Math.abs(charSum) % SEO_PATTERNS.length;
  const pattern = SEO_PATTERNS[patternIndex];

  // 🌟 핵심: {dongName} 출장 마사지 키워드 바로 결합
  const locationKeyword = `${dongName} 출장 마사지`;
  const finalTitle = `${locationKeyword} ${pattern.titleSuffix} | 올댓홈케어`;
  const finalDescription = pattern.desc(`${districtName} ${dongName}`);
  const canonicalUrl = `${SITE_URL}/${region}/${encodeURIComponent(districtName)}/${encodeURIComponent(dongName)}`;

  return {
    title: { absolute: finalTitle },
    description: finalDescription,
    alternates: { canonical: canonicalUrl },
    keywords: [
      `${dongName} 출장 마사지`,
      `${dongName}출장마사지`,
      `${districtName} ${dongName} 출장 마사지`,
      `${dongName} 출장 정찰제 마사지`,
      `${dongName} 출장 아로마 마사지`,
      `${dongName} 출장 웰니스 마사지`,
      `${dongName} 출장 스웨디시 마사지`,
      "올댓홈케어"
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
      siteName: "올댓홈케어",
      locale: "ko_KR",
      type: "article",
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
  const locationKeyword = `${dongName} 출장 마사지`;

  // 🌟 네이버 서치어드바이저 및 구글 공용 디렉터리 허브 JSON-LD (CollectionPage, ItemList, FAQPage, BreadcrumbList)
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${currentUrl}/#webpage`,
        url: currentUrl,
        name: `${locationKeyword} ${pattern.titleSuffix} | 올댓홈케어`,
        description: pattern.desc(displayLocation),
        inLanguage: "ko-KR",
        isPartOf: {
          "@type": "WebSite",
          "@id": `${SITE_URL}/#website`,
          url: SITE_URL,
          name: "올댓홈케어",
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${currentUrl}/#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "홈", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: `${districtName} 출장 마사지`, item: `${SITE_URL}/${resolved.region}/${encodeURIComponent(districtName)}` },
          { "@type": "ListItem", position: 3, name: locationKeyword, item: currentUrl },
        ],
      },
      {
        "@type": "ItemList",
        "@id": `${currentUrl}/#itemlist`,
        name: `${locationKeyword} 추천 제휴 매장 목록`,
        description: `${displayLocation} 출장 정찰제 마사지, 출장 아로마 마사지, 출장 웰니스 마사지 제휴점 리스트`,
        itemListOrder: "https://schema.org/ItemListUnordered",
      },
      {
        "@type": "FAQPage",
        "@id": `${currentUrl}/#faq`,
        mainEntity: [
          {
            "@type": "Question",
            name: `${dongName} 출장 마사지 예약 및 이용 방법은 어떻게 되나요?`,
            acceptedAnswer: {
              "@type": "Answer",
              text: "올댓홈케어에서 각 제휴 업체의 코스와 이용 요금, 운영 시간을 확인하신 후 안내된 전화연결 버튼을 통해 해당 매장에 직접 예약하시면 됩니다.",
            },
          },
          {
            "@type": "Question",
            name: `${dongName} 출장 정찰제 마사지 요금은 사전에 확인 가능한가요?`,
            acceptedAnswer: {
              "@type": "Answer",
              text: "네, 올댓홈케어는 시·군·구 및 동별 제휴 업체의 코스 구성과 요금을 사전에 투명하게 정리해 두었으므로 사전에 코스별 금액을 확인하고 비교해 보실 수 있습니다.",
            },
          },
          {
            "@type": "Question",
            name: `${dongName} 당일 예약도 가능한가요?`,
            acceptedAnswer: {
              "@type": "Answer",
              text: "네, 대다수 제휴 샵에서 당일 예약이 가능하며, 원활한 일정 조율을 위해 1~2시간 전 사전 연락을 권장합니다.",
            },
          },
          {
            "@type": "Question",
            name: "올댓홈케어 플랫폼 이용 시 별도 수수료가 발생하나요?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "아닙니다. 올댓홈케어는 건전하고 편리한 정보 안내 플랫폼으로 이용자에게 어떠한 중개 수수료도 청구하지 않습니다.",
            },
          },
        ],
      },
      {
        "@type": "Article",
        "@id": `${currentUrl}/#article`,
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": currentUrl,
        },
        headline: `${locationKeyword} ${pattern.titleSuffix} | 올댓홈케어`,
        description: pattern.desc(displayLocation),
        image: `${SITE_URL}/banner.jpg`,
        datePublished: "2026-10-14T09:00:00+09:00",
        dateModified: "2026-10-14T09:00:00+09:00",
        author: {
          "@type": "Organization",
          name: "올댓홈케어",
        },
        publisher: {
          "@type": "Organization",
          name: "올댓홈케어",
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
            <span className="w-8 h-8 rounded-lg bg-amber-400 text-black flex items-center justify-center font-extrabold text-sm">올</span>
            올댓홈케어
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
              📞 제휴·입점 문의
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
          <Link href={`/${resolved.region}/${encodeURIComponent(districtName)}`} className="hover:text-amber-400">{districtName} 출장 마사지</Link>
          <span>&gt;</span>
          <span className="text-amber-400 font-bold">{locationKeyword}</span>
        </nav>

        {/* 상단 메인 히어로 배너 */}
        <section className="relative rounded-3xl overflow-hidden border border-amber-500/30 shadow-[0_0_40px_rgba(245,158,11,0.12)] bg-[#141418] p-6 md:p-8 space-y-2">
          <span className="text-amber-400 text-xs font-black tracking-widest uppercase block">
            {regionFullName} · {districtName} · {dongName} 도심휴식 마사지 · 홈케어
          </span>
          <h1 className="text-2xl md:text-3xl font-black text-white">
            {dongName} 출장 마사지 {pattern.titleSuffix}
          </h1>
          <p className="text-xs md:text-sm text-gray-300 leading-relaxed">
            {pattern.desc(displayLocation)}
          </p>
        </section>

        {/* 3단 탭 메뉴 */}
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
                <span className="text-[10px] bg-amber-500/10 text-amber-300 px-2 py-0.5 rounded font-bold">건식 타이</span>
                <h3 className="font-bold text-sm text-white mt-1">출장 타이 마사지 기본 스트레칭 (60분)</h3>
                <p className="text-xs text-gray-400 mt-0.5">뭉친 근육 긴장 완화 및 관절 가동성 회복</p>
              </div>
              <div className="text-right">
                <span className="text-amber-400 font-black text-base">60,000원~</span>
              </div>
            </div>

            <div className="bg-[#111114] border border-white/10 rounded-2xl p-4 flex justify-between items-center shadow-sm hover:border-amber-500/30 transition">
              <div>
                <span className="text-[10px] bg-amber-500/10 text-amber-300 px-2 py-0.5 rounded font-bold">아로마 케어</span>
                <h3 className="font-bold text-sm text-white mt-1">출장 아로마 마사지 천연 오일 순환 (90분)</h3>
                <p className="text-xs text-gray-400 mt-0.5">식물성 오일 블렌딩과 부드러운 림프 드레니쥐</p>
              </div>
              <div className="text-right">
                <span className="text-amber-400 font-black text-base">90,000원~</span>
              </div>
            </div>

            <div className="bg-[#111114] border border-white/10 rounded-2xl p-4 flex justify-between items-center shadow-sm hover:border-amber-500/30 transition">
              <div>
                <span className="text-[10px] bg-amber-500/10 text-amber-300 px-2 py-0.5 rounded font-bold">VIP 스웨디시</span>
                <h3 className="font-bold text-sm text-white mt-1">출장 스웨디시 마사지 프리미엄 웰니스 (120분)</h3>
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
          <h2 className="text-sm font-bold text-white mb-2">{dongName} 출장 마사지 이용 안내</h2>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 py-2 border-b border-white/5">
            <span className="text-gray-400 w-20 shrink-0">운영시간</span>
            <span className="text-gray-200">24시간 상시 안내 (각 제휴 샵별 운영시간 준수)</span>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 py-2 border-b border-white/5">
            <span className="text-gray-400 w-20 shrink-0">방문위치</span>
            <span className="text-gray-200">{dongName} 전 지역 자택, 오피스텔, 호텔 및 숙소</span>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 py-2 border-b border-white/5">
            <span className="text-gray-400 w-20 shrink-0">예약방식</span>
            <span className="text-gray-200">제공된 연락처로 해당 업체에 직접 전화하여 코스 및 일정 조율</span>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 py-2">
            <span className="text-gray-400 w-20 shrink-0">이용에티켓</span>
            <span className="text-gray-200">건전하고 품격 있는 바디 힐링을 지향하며 퇴폐 요구 시 환불 없이 즉시 종료됩니다.</span>
          </div>
        </section>

        {/* 동 단위 차별화 정보성 칼럼 */}
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
            <h2 className="text-xl font-black text-white mt-1">{dongName} 출장 마사지 간편 절차</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-black/60 p-4 rounded-2xl border border-white/5 text-center">
              <span className="text-xs text-amber-400 font-bold">STEP 1</span>
              <h3 className="font-bold text-white mt-1">샵 확인</h3>
              <p className="text-xs text-gray-400 mt-1">{dongName} 추천 제휴점 확인</p>
            </div>
            <div className="bg-black/60 p-4 rounded-2xl border border-white/5 text-center">
              <span className="text-xs text-amber-400 font-bold">STEP 2</span>
              <h3 className="font-bold text-white mt-1">프로그램 비교</h3>
              <p className="text-xs text-gray-400 mt-1">스웨디시 / 아로마 / 타이</p>
            </div>
            <div className="bg-black/60 p-4 rounded-2xl border border-white/5 text-center">
              <span className="text-xs text-amber-400 font-bold">STEP 3</span>
              <h3 className="font-bold text-white mt-1">직접 예약</h3>
              <p className="text-xs text-gray-400 mt-1">전화 버튼으로 샵과 일정 조율</p>
            </div>
            <div className="bg-black/60 p-4 rounded-2xl border border-white/5 text-center">
              <span className="text-xs text-amber-400 font-bold">STEP 4</span>
              <h3 className="font-bold text-white mt-1">맞춤 케어</h3>
              <p className="text-xs text-gray-400 mt-1">약속된 장소에서 편안한 힐링</p>
            </div>
          </div>
        </section>

        {/* FAQ 아코디언 섹션 */}
        <section id="faq_info" className="space-y-3">
          <h2 className="text-base font-black text-white flex items-center gap-2">
            <span className="w-1.5 h-4 bg-amber-400 rounded-full inline-block"></span>
            {dongName} 출장 마사지 자주 묻는 질문
          </h2>
          <div className="bg-[#111114] rounded-2xl p-4 border border-white/5 space-y-1.5">
            <div className="font-bold text-xs sm:text-sm text-gray-200 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center text-xs font-black">Q</span>
              {dongName} 출장 마사지 예약은 어떻게 하나요?
            </div>
            <p className="text-xs text-gray-400 pl-7 leading-relaxed">
              올댓홈케어에서 각 제휴 업체의 코스와 이용 요금, 운영 시간을 확인하신 후 전화연결 버튼을 통해 해당 샵으로 직접 예약하시면 됩니다.
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
              {dongName} 출장 정찰제 마사지 요금인가요?
            </div>
            <p className="text-xs text-gray-400 pl-7 leading-relaxed">
              올댓홈케어에 등록된 매장들은 사전에 공지된 투명한 정찰제 요금을 준수합니다.
            </p>
          </div>
          <div className="bg-[#111114] rounded-2xl p-4 border border-white/5 space-y-1.5">
            <div className="font-bold text-xs sm:text-sm text-gray-200 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center text-xs font-black">Q</span>
              위생 소모품 및 시트는 어떻게 관리되나요?
            </div>
            <p className="text-xs text-gray-400 pl-7 leading-relaxed">
              모든 시트와 타월은 1회 사용 시 즉시 세탁 및 교체되며 청결한 위생 규정을 엄격히 준수합니다.
            </p>
          </div>
        </section>
      </main>

      {/* 모바일 하단 플로팅 고정 바 */}
      <aside className="fixed bottom-0 left-0 right-0 z-50 bg-[#070709]/95 border-t border-amber-500/30 p-3 shadow-2xl backdrop-blur-md md:hidden">
        <div className="max-w-md mx-auto flex items-center justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="text-xs font-bold text-white truncate">{dongName} 출장 마사지</div>
            <div className="text-[10px] text-amber-400">코스 요금·운영시간 비교 안내</div>
          </div>
          <a
            href="tel:0507-1280-3344"
            className="bg-gradient-to-r from-amber-500 to-yellow-400 text-black font-black text-xs px-5 py-2.5 rounded-xl shadow-md active:scale-95 transition-transform shrink-0 flex items-center gap-1.5"
          >
            <span>📞</span> 제휴 문의
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
              <span>🤝</span> 올댓홈케어 제휴 문의 (0507-1280-3344)
            </a>
          </div>
          <p className="text-gray-400 font-medium">
            올댓홈케어는 건전하고 안전한 출장 정찰제 마사지 및 홈케어 제휴 정보를 정리하여 제공합니다.
          </p>
          <p className="text-[11px] text-gray-600">
            COPYRIGHT &copy; ALL THAT HOMECARE ALL RIGHTS RESERVED.
          </p>
        </div>
      </footer>
    </div>
  );
}