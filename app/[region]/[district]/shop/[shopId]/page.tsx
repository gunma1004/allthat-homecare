import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{
    region?: string;
    district?: string;
    dong?: string;
    id?: string;
    shopId?: string;
  }>;
}

const SITE_URL = "https://baruncare-seoul.netlify.app";

function getRegionFullName(region?: string): string {
  switch (region?.toLowerCase()) {
    case "seoul":
      return "서울";
    case "gyeonggi":
      return "경기";
    case "incheon":
      return "인천";
    default:
      return region || "";
  }
}

function safeDecode(str?: string): string {
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

function parseLocationText(region?: string, district?: string, dong?: string): string {
  const regionName = getRegionFullName(region);
  const decodedDistrict = safeDecode(district);
  const decodedDong = safeDecode(dong);
  return `${regionName} ${decodedDistrict} ${decodedDong}`.replace(/\s+/g, " ").trim();
}

const shopData: Record<string, {
  name: string;
  cleanName: string;
  phone: string;
  badge: string;
  image: string;
  desc: string;
  courses: { name: string; time: string; price: string; desc: string }[];
  features: string[];
}> = {
  "1": {
    name: "바른안심테라피",
    cleanName: "바른안심테라피",
    phone: "0507-1280-3140",
    badge: "100% 후불 정찰제",
    image: "/shop1.jpg",
    desc: "수도권 전지역 선입금 없는 신속 방문 케어! 출장 타이 마사지, 출장 아로마 마사지, 출장 릴렉스 마사지 전문 제휴처입니다. 숙련된 테라피스트가 계신 곳으로 직접 찾아가 굳은 근육과 묵은 피로를 안전하게 풀어드립니다.",
    courses: [
      { name: "출장 릴렉스 마사지 (기본)", time: "60분", price: "110,000원", desc: "뭉친 어깨와 등 근육을 부드럽게 이완시키는 맞춤형 출장 릴렉스 마사지 코스" },
      { name: "출장 아로마 마사지 (순환)", time: "90분", price: "130,000원", desc: "천연 에센셜 오일을 사용하여 전신 혈액순환과 피로 해소를 돕는 프리미엄 출장 아로마 마사지" },
      { name: "출장 스웨디시 릴렉스 마사지", time: "60분", price: "140,000원", desc: "감성적인 터치로 심신을 포근하게 녹여주는 최고급 스웨디시 출장 릴렉스 마사지" },
      { name: "VIP 출장 타이 & 아로마 풀코스", time: "90분", price: "180,000원", desc: "시원한 타이 스트레칭과 부드러운 아로마 관리를 결합한 전신 올인원 출장 마사지" }
    ],
    features: ["100% 후불제 안심결제", "24시간 365일 연중무휴", "수도권 전지역 신속 도착", "철저한 위생 및 소독 관리"]
  },
  "2": {
    name: "오늘밤바른케어",
    cleanName: "오늘밤바른케어",
    phone: "0507-1280-3199",
    badge: "재방문율 최우수",
    image: "/shop2.jpg",
    desc: "지친 하루의 피로를 말끔히 풀어드리는 1:1 방문 홈케어! 출장 타이 마사지부터 출장 아로마 마사지까지 원하는 장소에서 선입금 없이 편안하게 정통 힐링을 누려보세요.",
    courses: [
      { name: "출장 타이 마사지 (베이직)", time: "60분", price: "60,000원", desc: "전신 근육을 시원하게 스트레칭하여 가볍고 개운한 몸을 만드는 출장 타이 마사지" },
      { name: "출장 아로마 마사지 (소프트)", time: "60분", price: "80,000원", desc: "향기로운 천연 오일과 부드러운 압으로 신체 긴장을 완화하는 출장 아로마 마사지" },
      { name: "출장 릴렉스 마사지 (감성힐링)", time: "60분", price: "90,000원", desc: "지친 심신에 온전한 안식과 숙면을 유도하는 감성 충만 출장 릴렉스 마사지" },
      { name: "VVIP 스페셜 출장 마사지", time: "60분", price: "100,000원", desc: "타이와 아로마의 장점을 결합하여 전신 피로를 완벽하게 날려주는 코스" }
    ],
    features: ["선입금 없는 100% 후불제", "친절 마인드 전문 힐러 상주", "간편 결제 지원"]
  },
  "3": {
    name: "주주안심홈타이",
    cleanName: "주주안심홈타이",
    phone: "0507-1280-3197",
    badge: "24시 정찰제 매칭",
    image: "/shop3.jpg",
    desc: "재방문율 1위 만족도! 정통 출장 타이 마사지와 림프 순환을 돕는 출장 아로마 마사지로 굳어있던 몸을 유연하고 활력 넘치게 회복시켜 드립니다.",
    courses: [
      { name: "스탠다드 정통 출장 타이 마사지", time: "60분", price: "60,000원", desc: "머리부터 발끝까지 뭉친 근육을 시원하게 풀어주는 정통 출장 타이 마사지" },
      { name: "프리미엄 딥티슈 출장 아로마 마사지", time: "90분", price: "90,000원", desc: "근육 결을 따라 부드럽게 속근육 깊은 곳까지 풀어주는 출장 아로마 마사지" },
      { name: "VIP 시그니처 롱타임 출장 마사지", time: "120분", price: "120,000원", desc: "2시간 동안 출장 타이 마사지와 출장 아로마 마사지를 여유롭게 누리는 풀코스" }
    ],
    features: ["선입금 0원 100% 후불제", "평균 25분 방문 보장", "개인정보 완벽 보호"]
  },
  "4": {
    name: "골든바른테라피",
    cleanName: "골든바른테라피",
    phone: "0507-1280-3360",
    badge: "베테랑 힐러진",
    image: "/shop4.jpg",
    desc: "베테랑 테라피스트들의 1:1 방문 케어! 출장 릴렉스 마사지와 전신 출장 아로마 마사지로 수도권 전지역 어디서나 품격 있는 힐링을 선사합니다.",
    courses: [
      { name: "출장 릴렉스 마사지 (건식)", time: "60분", price: "60,000원", desc: "원하는 피로 부위를 집중적으로 시원하게 풀어주는 맞춤형 출장 릴렉스 마사지" },
      { name: "천연 순환 출장 아로마 마사지", time: "60분", price: "70,000원", desc: "천연 아로마 오일로 전신 혈액순환과 피부 보습을 돕는 출장 아로마 마사지" },
      { name: "VIP 감성 출장 릴렉스 마사지", time: "60분", price: "100,000원", desc: "부드러운 림프 순환 케어로 몸을 가볍게 만들어주는 스웨디시 출장 릴렉스 마사지" }
    ],
    features: ["젊고 세련된 감성 테라피", "100% 후불 결제", "24시간 상시 대기"]
  },
  "5": {
    name: "퀸즈바른홈케어",
    cleanName: "퀸즈바른홈케어",
    phone: "0507-1280-3296",
    badge: "안심 케어 만족도 1위",
    image: "/shop5.jpg",
    desc: "수도권 전지역 신속 도착! 출장 타이 마사지, 출장 아로마 마사지, 출장 릴렉스 마사지를 정직한 선입금 0원 정찰제 가격으로 편안하게 받아보세요.",
    courses: [
      { name: "컨디션 케어 출장 타이 마사지", time: "60분", price: "60,000원", desc: "지친 몸의 피로를 시원한 스트레칭으로 해소하는 정통 출장 타이 마사지" },
      { name: "스페셜 릴렉스 출장 아로마 마사지", time: "60분", price: "70,000원", desc: "향긋한 아로마 오일과 부드러운 손길로 진행되는 전신 출장 아로마 마사지" },
      { name: "콤비네이션 출장 릴렉스 마사지", time: "90분", price: "120,000원", desc: "출장 타이 마사지와 출장 아로마 마사지를 한 번에 경험하는 밸런스 힐링 코스" }
    ],
    features: ["100% 후불제", "수도권 전지역 빠른 도착", "고객 만족도 최상"]
  }
};

// 🌟 70종 고유 순환 패턴 (바른케어 후불 정찰제 특화)
const SHOP_SEO_PATTERNS = [
  {
    titleSuffix: "선입금 없는 출장 안심 마사지 안내",
    desc: (r: string, s: string) => `${r} 출장 마사지 공식 제휴처 ${s}. 100% 현장 후불 타이·아로마·스웨디시 방문 케어 코스와 투명한 정찰제 요금을 바른케어에서 확인하세요.`
  },
  {
    titleSuffix: "출장 안심 아로마마사지 케어",
    desc: (r: string, s: string) => `${r} 출장 마사지 추천 코스 안내. 최고급 천연 에센셜 오일과 섬세한 이완 테라피로 누적된 일상 피로를 ${s}에서 부드럽게 비워보세요.`
  },
  {
    titleSuffix: "출장 안심 마사지 후불 가이드",
    desc: (r: string, s: string) => `${r} 출장 마사지 100% 안심 가이드. 선입금 없는 현장 후불 정찰제와 검증된 전문 테라피스트 ${s}의 프리미엄 바디 릴렉싱을 안내합니다.`
  },
  {
    titleSuffix: "출장 웰니스 마사지 힐링 안내",
    desc: (r: string, s: string) => `${r} 출장 마사지 큐레이션 플랫폼. 지친 신체 밸런스를 되찾아주는 프라이빗 테라피 프로그램과 ${s} 실시간 연결을 확인하세요.`
  },
  {
    titleSuffix: "출장 스웨디시 & 아로마마사지",
    desc: (r: string, s: string) => `${r} 출장 마사지 VIP 스웨디시 안내. 림프 순환을 돕는 섬세한 터칭 기법과 쾌적한 힐링 케어를 ${s}에서 만나보세요.`
  },
  {
    titleSuffix: "출장 안심 마사지 정찰제 플랫폼",
    desc: (r: string, s: string) => `${r} 출장 마사지 투명한 표준 요금 안내. 번거로운 이동 없이 편안한 프라이빗 공간에서 ${s}의 맞춤 바디 테라피를 누려보세요.`
  },
  {
    titleSuffix: "출장 웰니스 마사지 피로회복",
    desc: (r: string, s: string) => `${r} 출장 마사지 집중 컨디셔닝 케어. 굳어있던 목, 어깨와 전신 근육을 시원하게 풀어주는 ${s}의 전문 힐링 프로그램입니다.`
  },
  {
    titleSuffix: "출장 아로마마사지 릴렉싱",
    desc: (r: string, s: string) => `${r} 출장 마사지 힐링 솔루션. 심신 안정에 도움을 주는 천연 아로마 향과 편안한 1:1 맞춤 관리를 ${s}에서 경험하세요.`
  },
  {
    titleSuffix: "출장 안심 마사지 바디 밸런스",
    desc: (r: string, s: string) => `${r} 출장 마사지 전문 비교 플랫폼. 위생 관리와 고객 만족도가 검증된 선입금 없는 파트너 샵 ${s} 정보를 정직하게 제공합니다.`
  },
  {
    titleSuffix: "출장 웰니스 마사지 감성 케어",
    desc: (r: string, s: string) => `${r} 출장 마사지 프리미엄 감성 코스. 온전한 휴식을 선사하는 섬세한 바디 터칭 테라피를 ${s}에서 만나보세요.`
  },
  {
    titleSuffix: "출장 아로마마사지 림프 순환",
    desc: (r: string, s: string) => `${r} 출장 마사지 림프 순환 집중 안내. 정체된 신체 흐름을 원활하게 돕고 전신 부종을 가라앉히는 ${s} 맞춤 아로마 솔루션입니다.`
  },
  {
    titleSuffix: "출장 안심 마사지 추천 코스",
    desc: (r: string, s: string) => `${r} 출장 마사지 신속 매칭 가이드. 투명한 요금표와 실시간 전화 상담으로 ${s}의 프로그램을 편리하게 이용하실 수 있습니다.`
  },
  {
    titleSuffix: "출장 웰니스 마사지 전신 스트레칭",
    desc: (r: string, s: string) => `${r} 출장 마사지 전통 건식 스트레칭. 무겁고 뻐근한 관절 가동 범위를 넓혀 가뿐한 신체 컨디션을 ${s}에서 완성해 드립니다.`
  },
  {
    titleSuffix: "출장 아로마마사지 보습 & 휴식",
    desc: (r: string, s: string) => `${r} 출장 마사지 식물성 오일 케어. 건조한 피부에 영양을 채우고 깊은 숙면을 유도하는 ${s} 프리미엄 테라피 코스입니다.`
  },
  {
    titleSuffix: "출장 안심 마사지 1:1 맞춤 솔루션",
    desc: (r: string, s: string) => `${r} 출장 마사지 개인 맞춤형 프로그램. 고객님의 당일 피로도와 체형을 세심하게 고려한 ${s}의 고품격 힐링을 안내합니다.`
  },
  {
    titleSuffix: "출장 웰니스 마사지 프라이빗 케어",
    desc: (r: string, s: string) => `${r} 출장 마사지 홈 & 호텔 프라이빗 케어. 번잡한 외출 없이 프라이빗한 공간에서 ${s}의 VIP 테라피 서비스를 확인하세요.`
  },
  {
    titleSuffix: "출장 아로마마사지 심신 안정 가이드",
    desc: (r: string, s: string) => `${r} 출장 마사지 힐링 아로마콜로지. 감각을 깨우는 순수 에센셜 블렌딩으로 ${s}에서 지친 마음까지 포근하게 보듬어 드립니다.`
  },
  {
    titleSuffix: "출장 안심 마사지 정찰 요금표",
    desc: (r: string, s: string) => `${r} 출장 마사지 거품 없는 합리적인 가격. 추가 비용 걱정 없이 정직하게 이용 가능한 ${s}의 정보입니다.`
  },
  {
    titleSuffix: "출장 웰니스 마사지 속근육 딥티슈",
    desc: (r: string, s: string) => `${r} 출장 마사지 심부 근막 이완 케어. 뭉친 승모근과 만성 요통 부위를 정확한 수기 압으로 풀어주는 ${s} 코스입니다.`
  },
  {
    titleSuffix: "출장 아로마마사지 부종 완화",
    desc: (r: string, s: string) => `${r} 출장 마사지 하체 붓기 및 림프 솔루션. 장시간 좌식 생활로 굳은 다리를 ${s}에서 가볍게 만들어 드립니다.`
  },
  {
    titleSuffix: "출장 안심 마사지 공식 제휴처",
    desc: (r: string, s: string) => `${r} 출장 마사지 인증 제휴점 ${s}. 철저한 매너와 체계적인 위생 수칙을 준수하는 테라피스트가 직접 방문합니다.`
  },
  {
    titleSuffix: "출장 웰니스 마사지 힐링 테라피",
    desc: (r: string, s: string) => `${r} 출장 마사지 도심 속 힐링 가이드. 복잡한 생각을 내려놓고 신체 밸런스를 정돈하는 최상의 휴식을 ${s}에서 선사합니다.`
  },
  {
    titleSuffix: "출장 아로마마사지 감성 스웨디시",
    desc: (r: string, s: string) => `${r} 출장 마사지 부드러운 스웨디시 케어. 림프선을 따라 심장 방향으로 밀어 올리는 유러피언 테크닉을 ${s}에서 만나보세요.`
  },
  {
    titleSuffix: "출장 안심 마사지 클린 케어",
    desc: (r: string, s: string) => `${r} 출장 마사지 안심 위생 프로그램. 청결한 관리 환경과 세심한 1:1 케어로 고객 만족도가 높은 ${s} 정보입니다.`
  },
  {
    titleSuffix: "출장 웰니스 마사지 상체 집중 케어",
    desc: (r: string, s: string) => `${r} 출장 마사지 거북목·어깨 결림 집중 관리. 스마트폰과 PC 사용으로 굳어버린 상체 라인을 ${s}에서 편안하게 이완합니다.`
  },
  {
    titleSuffix: "출장 아로마마사지 프리미엄 오일",
    desc: (r: string, s: string) => `${r} 출장 마사지 100% 천연 식물성 블렌딩. 피부 자극 없이 부드럽게 스며드는 프리미엄 테라피를 ${s}에서 경험해 보세요.`
  },
  {
    titleSuffix: "출장 안심 마사지 야간 빠른 연결",
    desc: (r: string, s: string) => `${r} 출장 마사지 늦은 시간 안심 이용 안내. 늦은 저녁이나 주말에도 ${s}에서 편안하게 상담받고 일정 조율이 가능합니다.`
  },
  {
    titleSuffix: "출장 웰니스 마사지 활력 회복",
    desc: (r: string, s: string) => `${r} 출장 마사지 바이탈 릴렉스 프로그램. 무거운 피로감을 비우고 가뿐한 에너지를 채워주는 ${s} 최적의 코스입니다.`
  },
  {
    titleSuffix: "출장 아로마마사지 감성 릴렉스",
    desc: (r: string, s: string) => `${r} 출장 마사지 평온한 휴식의 완성. 차분한 분위기 속에서 누리는 전문 테라피스트 ${s}의 손길을 확인하세요.`
  },
  {
    titleSuffix: "출장 안심 마사지 종합 큐레이션",
    desc: (r: string, s: string) => `${r} 출장 마사지 토탈 웰니스 플랫폼. 스웨디시부터 건식, 아로마까지 취향에 맞는 최고의 프로그램을 ${s}에서 만나보세요.`
  },
  {
    titleSuffix: "출장 웰니스 마사지 전신 컨디셔닝",
    desc: (r: string, s: string) => `${r} 출장 마사지 전신 밸런스 케어. 무너진 신체 균형을 바르게 정돈하고 가뿐한 일상을 되찾아 드리는 ${s} 테라피입니다.`
  },
  {
    titleSuffix: "출장 아로마마사지 릴렉스 트리트먼트",
    desc: (r: string, s: string) => `${r} 출장 마사지 향기 테라피 안내. 지친 몸과 마음의 긴장을 부드럽게 완화해 주는 ${s} 프리미엄 오일 케어를 확인하세요.`
  },
  {
    titleSuffix: "출장 안심 마사지 투명 예약",
    desc: (r: string, s: string) => `${r} 출장 마사지 정직한 실시간 연결. 불필요한 중간 수수료 없이 공인 제휴점 ${s}와 직접 편리하게 상담하실 수 있습니다.`
  },
  {
    titleSuffix: "출장 웰니스 마사지 피로 솔루션",
    desc: (r: string, s: string) => `${r} 출장 마사지 만성 피로 집중 케어. 굳은 목선과 허리 근육을 깊이감 있게 이완시켜 드리는 ${s} 전문 테라피입니다.`
  },
  {
    titleSuffix: "출장 아로마마사지 힐링 코스",
    desc: (r: string, s: string) => `${r} 출장 마사지 감성 아로마 테라피. 식물성 에센셜 성분이 피부 깊숙이 스며들어 온전한 심신 릴렉싱을 ${s}에서 제공합니다.`
  },
  {
    titleSuffix: "출장 안심 마사지 신속 매칭",
    desc: (r: string, s: string) => `${r} 출장 마사지 빠른 방문 서비스. 계신 곳 어디든 찾아가는 ${s} 숙련된 힐러진의 정성 어린 케어를 확인하세요.`
  },
  {
    titleSuffix: "출장 웰니스 마사지 맞춤 스트레칭",
    desc: (r: string, s: string) => `${r} 출장 마사지 포인트 건식 요법. 관절의 뻐근함을 시원하게 덜어내고 유연성을 높여주는 ${s} 프로그램입니다.`
  },
  {
    titleSuffix: "출장 아로마마사지 스페셜 케어",
    desc: (r: string, s: string) => `${r} 출장 마사지 스페셜 림프 이완. 원활한 체내 순환을 도와 무거운 몸을 가볍고 상쾌하게 ${s}에서 가꾸어 드립니다.`
  },
  {
    titleSuffix: "출장 안심 마사지 표준 가이드",
    desc: (r: string, s: string) => `${r} 출장 마사지 신뢰할 수 있는 제휴망. 철저한 신원 검증과 매너 교육을 수료한 ${s} 관리사 매칭을 보장합니다.`
  },
  {
    titleSuffix: "출장 웰니스 마사지 프라이빗 힐링",
    desc: (r: string, s: string) => `${r} 출장 마사지 1인 맞춤형 홈케어. 나만의 공간에서 편안하게 누리는 ${s} 최고급 바디 웰니스 트리트먼트입니다.`
  },
  {
    titleSuffix: "출장 아로마마사지 숙면 유도 케어",
    desc: (r: string, s: string) => `${r} 출장 마사지 딥 슬립 힐링 프로그램. 교감신경의 긴장을 차분히 가라앉혀 깊고 편안한 밤의 휴식을 ${s}에서 선사합니다.`
  },
  {
    titleSuffix: "출장 안심 마사지 정찰제 케어",
    desc: (r: string, s: string) => `${r} 출장 마사지 선입금 없는 안심 플랫폼. 현장에서 직접 확인하고 결제하는 ${s}의 투명한 표준 시스템을 확인하세요.`
  },
  {
    titleSuffix: "출장 웰니스 마사지 긴장 완화",
    desc: (r: string, s: string) => `${r} 출장 마사지 뭉친 어깨 집중 완화. 바쁜 일상 속 누적된 목과 어깨의 뻐근함을 ${s} 시원한 압으로 풀어드립니다.`
  },
  {
    titleSuffix: "출장 아로마마사지 에센셜 힐링",
    desc: (r: string, s: string) => `${r} 출장 마사지 천연 오일 테라피 코스. 은은한 자연 향기와 부드러운 수기 이완으로 ${s}에서 전신 피로를 비워보세요.`
  },
  {
    titleSuffix: "출장 안심 마사지 쾌적 가이드",
    desc: (r: string, s: string) => `${r} 출장 마사지 클린 웰니스 플랫폼. 엄격한 청결 수칙과 소독 관리를 철저히 지키는 검증된 매장 ${s}입니다.`
  },
  {
    titleSuffix: "출장 웰니스 마사지 하체 릴렉싱",
    desc: (r: string, s: string) => `${r} 출장 마사지 하체 부종 집중 관리. 장시간 보행이나 좌식 생활로 굳은 다리 피로를 ${s}에서 개운하게 덜어드립니다.`
  },
  {
    titleSuffix: "출장 아로마마사지 감성 터칭",
    desc: (r: string, s: string) => `${r} 출장 마사지 유러피언 감성 스웨디시. 피부 표층의 마찰을 줄이고 깊은 안식을 선사하는 ${s} 섬세한 테라피입니다.`
  },
  {
    titleSuffix: "출장 안심 마사지 VIP 매칭",
    desc: (r: string, s: string) => `${r} 출장 마사지 프리미엄 제휴 안내. 격조 높은 서비스 마인드를 갖춘 ${s} 베테랑 테라피스트의 손길을 경험해 보세요.`
  },
  {
    titleSuffix: "출장 웰니스 마사지 상체 이완",
    desc: (r: string, s: string) => `${r} 출장 마사지 등·허리 집중 케어. 척추 라인 릴렉싱 프로그램을 ${s}에서 편안하게 안내받으실 수 있습니다.`
  },
  {
    titleSuffix: "출장 아로마마사지 순환 트리트먼트",
    desc: (r: string, s: string) => `${r} 출장 마사지 림프 순환 케어 솔루션. 체내 정체된 노폐물 배출을 유도하여 활기찬 신체 상태를 ${s}에서 돕습니다.`
  },
  {
    titleSuffix: "출장 안심 마사지 100% 후불제",
    desc: (r: string, s: string) => `${r} 출장 마사지 예약금 없는 안전 플랫폼. 부당한 추가금이나 선입금 사기 없이 ${s}를 믿고 이용하실 수 있습니다.`
  },
  {
    titleSuffix: "출장 웰니스 마사지 데일리 힐링",
    desc: (r: string, s: string) => `${r} 출장 마사지 일상 피로 완벽 충전. 집이나 숙소에서 언제든 프라이빗하게 누리는 ${s} 최적의 힐링 코스입니다.`
  },
  {
    titleSuffix: "출장 아로마마사지 딥 릴렉스",
    desc: (r: string, s: string) => `${r} 출장 마사지 부드러운 오일 이완 코스. 스트레스로 굳은 몸에 활력을 불어넣는 ${s} 전문 테라피를 만나보세요.`
  },
  {
    titleSuffix: "출장 안심 마사지 에티켓 가이드",
    desc: (r: string, s: string) => `${r} 출장 마사지 건전 웰니스 안내. 수준 높은 고객 만족도와 친절한 응대를 약속하는 파트너 ${s} 정보입니다.`
  },
  {
    titleSuffix: "출장 웰니스 마사지 맞춤 압 조절",
    desc: (r: string, s: string) => `${r} 출장 마사지 섬세한 1:1 강도 케어. 고객님의 컨디션에 꼭 맞춘 시원하고 편안한 관리를 ${s}에서 경험하실 수 있습니다.`
  },
  {
    titleSuffix: "출장 아로마마사지 바디 밸런싱",
    desc: (r: string, s: string) => `${r} 출장 마사지 감성 바디 솔루션. 천연 보습막 형성과 피로 물질 배출을 돕는 ${s} 프리미엄 케어입니다.`
  },
  {
    titleSuffix: "출장 안심 마사지 24시 안내",
    desc: (r: string, s: string) => `${r} 출장 마사지 주야간 상시 상담. 원하시는 시간대에 맞춰 신속하고 안락하게 ${s}를 이용해 보세요.`
  },
  {
    titleSuffix: "출장 웰니스 마사지 속근육 케어",
    desc: (r: string, s: string) => `${r} 출장 마사지 깊은 근막 이완 테크닉. 만성적인 뻐근함을 근본적으로 덜어내는 ${s} 체계적인 힐링 프로그램입니다.`
  },
  {
    titleSuffix: "출장 아로마마사지 피부 보습",
    desc: (r: string, s: string) => `${r} 출장 마사지 촉촉한 오일 바디 테라피. 건조해진 환절기 피부 결을 윤택하게 감싸는 ${s} 릴렉싱입니다.`
  },
  {
    titleSuffix: "출장 안심 마사지 신뢰 플랫폼",
    desc: (r: string, s: string) => `${r} 출장 마사지 검증된 매장 안내. 허위 정보 없는 투명한 가격표와 코스별 상세 내용을 ${s}에서 확인하세요.`
  },
  {
    titleSuffix: "출장 웰니스 마사지 관절 스트레칭",
    desc: (r: string, s: string) => `${r} 출장 마사지 수동적 전신 관절 케어. 굳어진 전신 마디를 부드럽게 신전시켜 몸의 가동 범위를 ${s}에서 되찾아 드립니다.`
  },
  {
    titleSuffix: "출장 아로마마사지 향기 테라피",
    desc: (r: string, s: string) => `${r} 출장 마사지 마음을 달래는 힐링 케어. 은은한 에센셜 향기로 복잡한 일상의 번뇌를 ${s}에서 가라앉혀 드립니다.`
  },
  {
    titleSuffix: "출장 안심 마사지 다이렉트 연결",
    desc: (r: string, s: string) => `${r} 출장 마사지 실시간 전화 상담. 대기 시간 없이 원하는 코스와 방문 일정을 ${s}와 신속하게 조율하실 수 있습니다.`
  },
  {
    titleSuffix: "출장 웰니스 마사지 활력 리셋",
    desc: (r: string, s: string) => `${r} 출장 마사지 전신 피로 리셋 솔루션. 지친 신체에 즉각적인 상쾌함과 편안함을 선사하는 ${s} 가이드입니다.`
  },
  {
    titleSuffix: "출장 아로마마사지 림프 드레니쥐",
    desc: (r: string, s: string) => `${r} 출장 마사지 정밀 순환 관리. 피부를 부드럽게 견인하여 전신 부종을 말끔하게 비워내는 ${s} 웰니스 코스입니다.`
  },
  {
    titleSuffix: "출장 안심 마사지 클린 에티켓",
    desc: (r: string, s: string) => `${r} 출장 마사지 안락한 방문 관리. 쾌적한 1인 공간에서 안전하고 프라이빗하게 ${s}의 최상 휴식을 누려보세요.`
  },
  {
    titleSuffix: "출장 웰니스 마사지 맞춤 컨디션",
    desc: (r: string, s: string) => `${r} 출장 마사지 일대일 체형 맞춤 솔루션. 고객님의 피로 부위를 정확히 짚어내는 ${s}의 손길을 느껴보세요.`
  },
  {
    titleSuffix: "출장 아로마마사지 심신 안정",
    desc: (r: string, s: string) => `${r} 출장 마사지 부드러운 전신 릴렉싱. 최고급 식물성 오일 블렌딩으로 지친 심신을 ${s}에서 따뜻하게 감싸드립니다.`
  },
  {
    titleSuffix: "출장 안심 마사지 정찰제 추천",
    desc: (r: string, s: string) => `${r} 출장 마사지 안심 이용 가이드. 거품 없는 투명한 가격과 품격 있는 테라피 서비스를 ${s}에서 확인하세요.`
  },
  {
    titleSuffix: "출장 웰니스 마사지 토탈 바디케어",
    desc: (r: string, s: string) => `${r} 출장 마사지 올인원 웰니스 코스. 타이 스트레칭과 아로마, 스웨디시의 장점을 모은 ${s}의 힐링을 안내합니다.`
  }
];

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const targetId = resolvedParams.id || resolvedParams.shopId || "1";
  const shop = shopData[targetId] || shopData["1"];

  const currentRegion = parseLocationText(resolvedParams.region, resolvedParams.district, resolvedParams.dong);
  const districtName = safeDecode(resolvedParams.district);
  const dongName = safeDecode(resolvedParams.dong);

  const charSum = (currentRegion + shop.cleanName + targetId + "baruncare_salt").split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const patternIndex = Math.abs(charSum) % SHOP_SEO_PATTERNS.length;
  const pattern = SHOP_SEO_PATTERNS[patternIndex];

  // 🌟 '바른케어'가 뒤쪽에 배치된 최종 타이틀
  const finalTitle = `${currentRegion} ${shop.cleanName} ${pattern.titleSuffix} | 바른케어`;
  const finalDescription = pattern.desc(currentRegion, shop.cleanName);

  const canonicalPath = dongName
    ? `/${resolvedParams.region}/${encodeURIComponent(districtName)}/${encodeURIComponent(dongName)}/shop/${targetId}`
    : `/${resolvedParams.region}/${encodeURIComponent(districtName)}/shop/${targetId}`;

  const canonicalUrl = `${SITE_URL}${canonicalPath}`;

  return {
    title: { absolute: finalTitle },
    description: finalDescription,
    alternates: { canonical: canonicalUrl },
    keywords: [
      `${currentRegion} 출장 마사지`,
      `${districtName} 출장 마사지`,
      dongName ? `${dongName} 출장 마사지` : `${districtName} 마사지`,
      `${shop.cleanName}`,
      "선입금 없는 출장 마사지",
      "출장 안심 마사지",
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
          url: `${SITE_URL}${shop.image}`,
          width: 800,
          height: 600,
          alt: `${currentRegion} 출장 마사지 - ${shop.cleanName}`,
        },
      ],
    },
  };
}

export default async function ShopDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  const targetId = resolvedParams.id || resolvedParams.shopId || "1";
  const shop = shopData[targetId] || shopData["1"];

  const currentRegion = parseLocationText(resolvedParams.region, resolvedParams.district, resolvedParams.dong);
  const districtName = safeDecode(resolvedParams.district);
  const dongName = safeDecode(resolvedParams.dong);
  const regionFullName = getRegionFullName(resolvedParams.region);

  const charSum = (currentRegion + shop.cleanName + targetId + "baruncare_salt").split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const patternIndex = Math.abs(charSum) % SHOP_SEO_PATTERNS.length;
  const pattern = SHOP_SEO_PATTERNS[patternIndex];

  const canonicalPath = dongName
    ? `/${resolvedParams.region}/${encodeURIComponent(districtName)}/${encodeURIComponent(dongName)}/shop/${targetId}`
    : `/${resolvedParams.region}/${encodeURIComponent(districtName)}/shop/${targetId}`;

  const currentUrl = `${SITE_URL}${canonicalPath}`;

  const backUrl = dongName
    ? `/${resolvedParams.region}/${encodeURIComponent(districtName)}/${encodeURIComponent(dongName)}`
    : `/${resolvedParams.region}/${encodeURIComponent(districtName)}`;

  // 🌟 네이버 및 구글 4대 복합 JSON-LD
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      // 1. 업체 및 서비스 정보
      {
        "@type": ["HealthAndBeautyBusiness", "LocalBusiness"],
        "@id": `${currentUrl}/#business`,
        name: `${shop.cleanName} (${currentRegion})`,
        description: pattern.desc(currentRegion, shop.cleanName),
        url: currentUrl,
        telephone: shop.phone,
        image: `${SITE_URL}${shop.image}`,
        priceRange: "60,000원~180,000원",
        currenciesAccepted: "KRW",
        paymentAccepted: "Cash, Credit Card",
        address: {
          "@type": "PostalAddress",
          streetAddress: dongName || districtName,
          addressLocality: districtName,
          addressRegion: regionFullName,
          addressCountry: "KR",
        },
        areaServed: {
          "@type": "AdministrativeArea",
          name: currentRegion,
        },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "출장 안심 마사지 프로그램",
          itemListElement: shop.courses.map((c) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: c.name,
              description: c.desc,
            },
            price: c.price.replace(/[^0-9]/g, ""),
            priceCurrency: "KRW",
            availability: "https://schema.org/InStock",
          })),
        },
      },
      // 2. FAQPage 스키마
      {
        "@type": "FAQPage",
        "@id": `${currentUrl}/#faq`,
        mainEntity: [
          {
            "@type": "Question",
            name: `${shop.cleanName} 예약 및 이용 방법은 어떻게 되나요?`,
            acceptedAnswer: {
              "@type": "Answer",
              text: "하단의 전화 예약 또는 문자 상담 버튼을 통해 샵으로 직접 연결되며, 코스 및 방문 시간을 바로 조율하실 수 있습니다.",
            },
          },
          {
            "@type": "Question",
            name: "선입금이나 추가 요금이 있나요?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "바른케어 공식 제휴점은 100% 현장 후불 정찰제로 운영되며 일체의 예약 선입금을 요구하지 않습니다.",
            },
          },
          {
            "@type": "Question",
            name: "타월과 위생 소모품은 어떻게 관리되나요?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "모든 시트와 타월 등 소모품은 1회 사용 시 즉시 세탁 및 교체되며 위생 규정을 엄격히 준수합니다.",
            },
          },
        ],
      },
      // 3. BreadcrumbList 스키마
      {
        "@type": "BreadcrumbList",
        "@id": `${currentUrl}/#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "홈", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: `${districtName} 출장 마사지`, item: `${SITE_URL}/${resolvedParams.region}/${encodeURIComponent(districtName)}` },
          ...(dongName
            ? [{ "@type": "ListItem", position: 3, name: `${dongName} 마사지`, item: `${SITE_URL}/${resolvedParams.region}/${encodeURIComponent(districtName)}/${encodeURIComponent(dongName)}` }]
            : []),
          { "@type": "ListItem", position: dongName ? 4 : 3, name: shop.cleanName, item: currentUrl },
        ],
      },
      // 4. Article 스키마
      {
        "@type": "Article",
        "@id": `${currentUrl}/#article`,
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": currentUrl,
        },
        headline: `${currentRegion} ${shop.cleanName} ${pattern.titleSuffix}`,
        description: pattern.desc(currentRegion, shop.cleanName),
        image: `${SITE_URL}${shop.image}`,
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
    <div className="bg-[#050505] text-gray-100 min-h-screen flex flex-col font-sans selection:bg-amber-500 selection:text-black pb-28">
      {/* 1. 구조화 데이터 주입 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 2. 상단 헤더 */}
      <header className="sticky top-0 z-50 bg-[#050505]/85 backdrop-blur-xl border-b border-amber-500/20 px-4 py-3.5 shadow-[0_4px_20px_rgba(245,158,11,0.1)]">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center font-black text-black text-lg shadow-[0_0_12px_rgba(245,158,11,0.4)] group-hover:scale-105 transition-transform">
              바
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-black tracking-wider bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-500 bg-clip-text text-transparent">
                바른케어
              </span>
              <span className="text-[9px] text-gray-400 tracking-tighter">BARUNCARE PARTNER</span>
            </div>
          </Link>

          <Link
            href={backUrl}
            className="text-xs font-bold text-amber-400 bg-amber-500/10 px-3 py-1.5 rounded-xl border border-amber-500/30 hover:bg-amber-500 hover:text-black transition-all"
          >
            ← {dongName || districtName} 목록
          </Link>
        </div>
      </header>

      {/* 3. 본문 영역 */}
      <main className="max-w-4xl mx-auto px-4 py-8 w-full flex-1 space-y-8">
        {/* 상단 브레드크럼 탐색 바 */}
        <nav aria-label="Breadcrumb" className="text-xs text-gray-400 flex items-center gap-2">
          <Link href="/" className="hover:text-amber-400">홈</Link>
          <span>&gt;</span>
          <Link href={`/${resolvedParams.region}/${encodeURIComponent(districtName)}`} className="hover:text-amber-400">{districtName}</Link>
          {dongName && (
            <>
              <span>&gt;</span>
              <Link href={`/${resolvedParams.region}/${encodeURIComponent(districtName)}/${encodeURIComponent(dongName)}`} className="hover:text-amber-400">{dongName}</Link>
            </>
          )}
          <span>&gt;</span>
          <span className="text-amber-400 font-bold">{shop.cleanName}</span>
        </nav>

        {/* 대표 비주얼 카드 */}
        <section className="bg-[#121214] border border-amber-500/30 rounded-3xl overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
          <div className="relative h-64 md:h-80 w-full overflow-hidden bg-neutral-900">
            <img
              src={shop.image}
              alt={`${currentRegion} 출장 마사지 제휴점 - ${shop.cleanName}`}
              width={800}
              height={600}
              className="w-full h-full object-cover filter brightness-[0.7]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#121214] via-transparent to-black/30"></div>
            <span className="absolute top-4 left-4 bg-amber-500 text-black text-xs font-black px-3.5 py-1.5 rounded-full shadow-lg">
              {shop.badge}
            </span>
          </div>

          <div className="p-6 md:p-8 space-y-4 -mt-8 relative z-10">
            <div className="inline-block bg-amber-500/10 border border-amber-500/30 px-3 py-1 rounded-xl text-amber-400 text-xs font-bold">
              📍 {currentRegion} 출장 안심 마사지 (100% 현장 후불제)
            </div>

            <h1 className="text-2xl md:text-3xl font-black text-white">
              {currentRegion} 출장 마사지 안내 - <span className="text-amber-400">{shop.cleanName}</span>
            </h1>

            <p className="text-xs md:text-sm text-gray-300 leading-relaxed bg-black/50 p-4 rounded-2xl border border-white/5">
              {shop.desc}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
              {shop.features.map((feat, idx) => (
                <div key={idx} className="bg-black/60 border border-amber-500/20 px-3 py-2 rounded-xl text-center text-[11px] font-bold text-amber-300">
                  ✓ {feat}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 상세 코스 및 요금 안내 */}
        <section className="bg-[#0d0d0f] border border-amber-500/20 p-6 md:p-8 rounded-3xl space-y-6">
          <div className="text-center">
            <span className="text-amber-400 text-xs font-bold tracking-widest uppercase">PROGRAM & PRICE</span>
            <h2 className="text-xl md:text-2xl font-black text-white mt-1">
              💎 {currentRegion} 출장 코스 및 정찰제 요금표
            </h2>
          </div>

          <div className="space-y-4">
            {shop.courses.map((course, idx) => (
              <div key={idx} className="bg-black/60 border border-white/10 hover:border-amber-500/40 p-5 rounded-2xl flex flex-col md:flex-row justify-between md:items-center gap-3 transition-colors">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="bg-amber-500/20 text-amber-300 text-[10px] font-black px-2 py-0.5 rounded border border-amber-500/30">
                      {course.time}
                    </span>
                    <h3 className="font-extrabold text-white text-base md:text-lg">{course.name}</h3>
                  </div>
                  <p className="text-xs text-gray-400">{course.desc}</p>
                </div>
                <div className="text-right">
                  <span className="text-lg font-black text-amber-400 bg-amber-500/10 px-4 py-2 rounded-xl border border-amber-500/20 inline-block">
                    {course.price}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 안심 이용 안내 */}
        <section className="bg-black/80 p-5 rounded-2xl border border-white/10">
          <h3 className="text-amber-400 font-bold text-sm mb-2 flex items-center gap-1.5">
            <span>📌</span> {currentRegion} 안심 이용 수칙
          </h3>
          <ul className="text-xs text-gray-300 space-y-1.5 list-disc list-inside">
            <li>모든 제휴 샵은 <strong>100% 현장 후불제</strong>로만 운영되며, 사전 선입금이나 예약금을 절대 요구하지 않습니다.</li>
            <li>원하시는 시간 20~30분 전에 문의해 주시면 전문 테라피스트가 신속하게 방문합니다.</li>
          </ul>
        </section>

        {/* 자주 묻는 질문 FAQ 섹션 */}
        <section className="space-y-3">
          <h3 className="text-base font-black text-white flex items-center gap-2">
            <span className="w-1.5 h-4 bg-amber-400 rounded-full inline-block"></span>
            자주 묻는 질문
          </h3>
          <div className="bg-[#111114] rounded-2xl p-4 border border-white/5 space-y-1.5">
            <div className="font-bold text-xs sm:text-sm text-gray-200 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center text-xs font-black">Q</span>
              예약 및 방문 시간은 어떻게 조율하나요?
            </div>
            <p className="text-xs text-gray-400 pl-7 leading-relaxed">
              하단 전화 또는 문자 상담 버튼으로 연결하여 희망하시는 장소와 시간을 말씀해 주시면 평균 25~30분 내로 조율됩니다.
            </p>
          </div>
          <div className="bg-[#111114] rounded-2xl p-4 border border-white/5 space-y-1.5">
            <div className="font-bold text-xs sm:text-sm text-gray-200 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center text-xs font-black">Q</span>
              카드 결제나 영수증 발급이 가능한가요?
            </div>
            <p className="text-xs text-gray-400 pl-7 leading-relaxed">
              네, 관리사 현장 도착 후 카드 결제 및 계좌이체가 모두 가능하며 사전 추가금은 일절 발생하지 않습니다.
            </p>
          </div>
        </section>
      </main>

      {/* 하단 고정 전화 / 문자 바 */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#08080a]/95 backdrop-blur-xl border-t border-amber-500/30 p-3 md:p-4 shadow-[0_-10px_25px_rgba(0,0,0,0.8)]">
        <div className="max-w-4xl mx-auto grid grid-cols-2 gap-3">
          <a
            href={`tel:${shop.phone}`}
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 hover:from-amber-400 hover:to-yellow-300 text-black font-black py-3.5 rounded-2xl text-xs md:text-sm shadow-[0_0_20px_rgba(245,158,11,0.3)] transition-transform active:scale-95"
          >
            <span className="text-lg">📞</span> 전화로 즉시예약
          </a>
          <a
            href={`sms:${shop.phone}?body=${encodeURIComponent(`[${currentRegion}]${shop.cleanName} 출장 안심 마사지 예약 문의드립니다. (바른케어 보고 연락드렸어요)`)}`}
            className="flex items-center justify-center gap-2 bg-neutral-900 hover:bg-neutral-800 text-white font-black py-3.5 rounded-2xl text-xs md:text-sm border border-white/10 hover:border-amber-500/40 transition-transform active:scale-95"
          >
            <span className="text-lg">💬</span> 간편 문자상담
          </a>
        </div>
      </div>
    </div>
  );
}