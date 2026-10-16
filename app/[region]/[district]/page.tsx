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

// 🌟 모든 패턴에 '출장'과 '마사지'가 반드시 포함된 70종 고유 순환 패턴
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
  },
  {
    titleSuffix: "출장 웰니스 마사지 전신 컨디셔닝",
    desc: (d: string) => `${d} 출장 마사지 전신 밸런스 케어. 무너진 신체 균형을 바르게 정돈하고 가뿐한 일상을 되찾아 드리는 맞춤 출장 웰니스 마사지입니다.`
  },
  {
    titleSuffix: "출장 아로마 마사지 릴렉스 트리트먼트",
    desc: (d: string) => `${d} 출장 마사지 향기 테라피 안내. 지친 몸과 마음의 긴장을 부드럽게 완화해 주는 프리미엄 출장 아로마 마사지를 경험해 보세요.`
  },
  {
    titleSuffix: "출장 정찰제 마사지 투명 예약 안내",
    desc: (d: string) => `${d} 출장 마사지 정직한 실시간 연결. 불필요한 중간 수수료 없이 공인 제휴점과 직접 편리하게 상담하는 출장 정찰제 마사지입니다.`
  },
  {
    titleSuffix: "출장 웰니스 마사지 피로 솔루션",
    desc: (d: string) => `${d} 출장 마사지 만성 피로 집중 케어. 굳은 목선과 허리 근육을 깊이감 있게 이완시켜 드리는 전문 출장 웰니스 마사지입니다.`
  },
  {
    titleSuffix: "출장 아로마 마사지 힐링 코스",
    desc: (d: string) => `${d} 출장 마사지 감성 아로마 테라피. 식물성 에센셜 성분이 피부 깊숙이 스며들어 온전한 심신 릴렉싱을 제공하는 출장 아로마 마사지입니다.`
  },
  {
    titleSuffix: "출장 정찰제 마사지 신속 매칭",
    desc: (d: string) => `${d} 출장 마사지 빠른 방문 서비스. 계신 곳 어디든 지체 없이 찾아가는 숙련된 힐러진의 정성 어린 출장 정찰제 마사지 케어입니다.`
  },
  {
    titleSuffix: "출장 웰니스 마사지 맞춤 스트레칭",
    desc: (d: string) => `${d} 출장 마사지 포인트 건식 요법. 관절의 뻐근함을 시원하게 덜어내고 유연성을 높여주는 효과적인 출장 웰니스 마사지 프로그램입니다.`
  },
  {
    titleSuffix: "출장 아로마 마사지 스페셜 케어",
    desc: (d: string) => `${d} 출장 마사지 스페셜 림프 이완. 원활한 체내 순환을 도와 무거운 몸을 가볍고 상쾌하게 가꾸어 드리는 출장 아로마 마사지입니다.`
  },
  {
    titleSuffix: "출장 정찰제 마사지 표준 가이드",
    desc: (d: string) => `${d} 출장 마사지 신뢰할 수 있는 제휴망. 철저한 신원 검증과 매너 교육을 수료한 전문 관리사가 함께하는 출장 정찰제 마사지입니다.`
  },
  {
    titleSuffix: "출장 웰니스 마사지 프라이빗 힐링",
    desc: (d: string) => `${d} 출장 마사지 1인 맞춤형 홈케어. 나만의 공간에서 편안하게 누리는 최고급 출장 웰니스 마사지 바디 트리트먼트입니다.`
  },
  {
    titleSuffix: "출장 아로마 마사지 숙면 유도 케어",
    desc: (d: string) => `${d} 출장 마사지 딥 슬립 힐링 프로그램. 교감신경의 긴장을 차분히 가라앉혀 깊고 편안한 밤의 휴식을 선사하는 출장 아로마 마사지입니다.`
  },
  {
    titleSuffix: "출장 정찰제 마사지 클린 케어",
    desc: (d: string) => `${d} 출장 마사지 안심 플랫폼. 현장에서 직접 확인하고 선택하는 투명한 표준 출장 정찰제 마사지 시스템을 운영합니다.`
  },
  {
    titleSuffix: "출장 웰니스 마사지 긴장 완화",
    desc: (d: string) => `${d} 출장 마사지 뭉친 어깨 집중 완화. 바쁜 일상 속 누적된 목과 어깨의 뻐근함을 시원한 압으로 풀어드리는 출장 웰니스 마사지입니다.`
  },
  {
    titleSuffix: "출장 아로마 마사지 에센셜 힐링",
    desc: (d: string) => `${d} 출장 마사지 천연 오일 테라피 코스. 은은한 자연 향기와 부드러운 수기 이완으로 전신 피로를 비워내는 출장 아로마 마사지입니다.`
  },
  {
    titleSuffix: "출장 정찰제 마사지 쾌적 가이드",
    desc: (d: string) => `${d} 출장 마사지 클린 웰니스 플랫폼. 엄격한 청결 수칙과 소독 관리를 철저히 지키는 검증된 출장 정찰제 마사지 매장만을 소개합니다.`
  },
  {
    titleSuffix: "출장 웰니스 마사지 하체 릴렉싱",
    desc: (d: string) => `${d} 출장 마사지 하체 부종 집중 관리. 장시간 보행이나 좌식 생활로 굳어버린 다리 피로를 개운하게 덜어드리는 출장 웰니스 마사지입니다.`
  },
  {
    titleSuffix: "출장 아로마 마사지 감성 터칭",
    desc: (d: string) => `${d} 출장 마사지 유러피언 감성 스웨디시. 피부 표층의 마찰을 줄이고 깊은 안식을 선사하는 섬세한 출장 아로마 마사지 테라피입니다.`
  },
  {
    titleSuffix: "출장 정찰제 마사지 VIP 매칭",
    desc: (d: string) => `${d} 출장 마사지 프리미엄 제휴 안내. 격조 높은 서비스 마인드를 갖춘 베테랑 테라피스트의 출장 정찰제 마사지 손길을 경험해 보세요.`
  },
  {
    titleSuffix: "출장 웰니스 마사지 상체 이완",
    desc: (d: string) => `${d} 출장 마사지 등·허리 집중 케어. 앉아있는 시간이 긴 직장인을 위한 척추 라인 릴렉싱 출장 웰니스 마사지 프로그램을 안내합니다.`
  },
  {
    titleSuffix: "출장 아로마 마사지 순환 트리트먼트",
    desc: (d: string) => `${d} 출장 마사지 림프 순환 케어 솔루션. 체내 정체된 노폐물 배출을 유도하여 맑고 활기찬 신체 상태를 돕는 출장 아로마 마사지입니다.`
  },
  {
    titleSuffix: "출장 정찰제 마사지 투명 요금표",
    desc: (d: string) => `${d} 출장 마사지 거품 없는 표준 가격. 불투명한 추가금 없이 믿고 이용하실 수 있는 출장 정찰제 마사지 정보입니다.`
  },
  {
    titleSuffix: "출장 웰니스 마사지 데일리 힐링",
    desc: (d: string) => `${d} 출장 마사지 일상 피로 완벽 충전. 집이나 숙소에서 언제든 프라이빗하게 누리는 최적의 출장 웰니스 마사지 힐링 코스입니다.`
  },
  {
    titleSuffix: "출장 아로마 마사지 딥 릴렉스",
    desc: (d: string) => `${d} 출장 마사지 부드러운 오일 이완 코스. 스트레스로 굳은 몸에 따뜻한 활력을 불어넣는 전문 출장 아로마 마사지 테라피를 만나보세요.`
  },
  {
    titleSuffix: "출장 정찰제 마사지 에티켓 가이드",
    desc: (d: string) => `${d} 출장 마사지 건전 웰니스 안내. 수준 높은 고객 만족도와 친절한 응대를 약속하는 파트너 출장 정찰제 마사지 정보만을 엄선합니다.`
  },
  {
    titleSuffix: "출장 웰니스 마사지 맞춤 압 조절",
    desc: (d: string) => `${d} 출장 마사지 섬세한 1:1 강도 케어. 고객님의 컨디션에 꼭 맞춘 시원하고 편안한 관리를 제공하는 출장 웰니스 마사지입니다.`
  },
  {
    titleSuffix: "출장 아로마 마사지 바디 밸런싱",
    desc: (d: string) => `${d} 출장 마사지 감성 바디 솔루션. 천연 보습막 형성과 피로 물질 배출을 동시에 돕는 프리미엄 출장 아로마 마사지 케어입니다.`
  },
  {
    titleSuffix: "출장 정찰제 마사지 24시 안내",
    desc: (d: string) => `${d} 출장 마사지 주야간 상시 상담. 원하시는 시간대에 맞춰 신속하고 안락하게 출장 정찰제 마사지를 이용해 보세요.`
  },
  {
    titleSuffix: "출장 웰니스 마사지 속근육 케어",
    desc: (d: string) => `${d} 출장 마사지 깊은 근막 이완 테크닉. 만성적인 뻐근함을 근본적으로 덜어내는 체계적인 출장 웰니스 마사지 프로그램입니다.`
  },
  {
    titleSuffix: "출장 아로마 마사지 피부 보습",
    desc: (d: string) => `${d} 출장 마사지 촉촉한 오일 바디 테라피. 건조해진 환절기 피부 결을 윤택하게 감싸는 고품격 출장 아로마 마사지 릴렉싱입니다.`
  },
  {
    titleSuffix: "출장 정찰제 마사지 신뢰 플랫폼",
    desc: (d: string) => `${d} 출장 마사지 검증된 매장 안내. 허위 정보 없는 투명한 가격표와 코스별 상세 내용을 손쉽게 비교하는 출장 정찰제 마사지입니다.`
  },
  {
    titleSuffix: "출장 웰니스 마사지 관절 스트레칭",
    desc: (d: string) => `${d} 출장 마사지 수동적 전신 관절 케어. 굳어진 전신 마디를 부드럽게 신전시켜 몸의 가동 범위를 되찾아 드리는 출장 웰니스 마사지입니다.`
  },
  {
    titleSuffix: "출장 아로마 마사지 향기 테라피",
    desc: (d: string) => `${d} 출장 마사지 마음을 달래는 힐링 케어. 은은한 에센셜 향기로 복잡한 일상의 번뇌를 차분히 가라앉혀 드리는 출장 아로마 마사지입니다.`
  },
  {
    titleSuffix: "출장 정찰제 마사지 다이렉트 연결",
    desc: (d: string) => `${d} 출장 마사지 실시간 전화 상담. 대기 시간 없이 원하는 코스와 방문 일정을 신속하게 조율하는 출장 정찰제 마사지입니다.`
  },
  {
    titleSuffix: "출장 웰니스 마사지 활력 리셋",
    desc: (d: string) => `${d} 출장 마사지 전신 피로 리셋 솔루션. 지친 신체에 즉각적인 상쾌함과 편안함을 선사하는 출장 웰니스 마사지 가이드입니다.`
  },
  {
    titleSuffix: "출장 아로마 마사지 림프 드레니쥐",
    desc: (d: string) => `${d} 출장 마사지 정밀 순환 관리. 피부를 부드럽게 견인하여 전신 부종을 말끔하게 비워내는 출장 아로마 마사지 웰니스 코스입니다.`
  },
  {
    titleSuffix: "출장 정찰제 마사지 클린 에티켓",
    desc: (d: string) => `${d} 출장 마사지 안락한 방문 관리. 쾌적한 1인 공간에서 안전하고 프라이빗하게 최상의 출장 정찰제 마사지 휴식을 누려보세요.`
  },
  {
    titleSuffix: "출장 웰니스 마사지 맞춤 컨디션",
    desc: (d: string) => `${d} 출장 마사지 일대일 체형 맞춤 솔루션. 고객님의 피로 부위를 정확히 짚어내는 숙련된 출장 웰니스 마사지 손길을 느껴보세요.`
  },
  {
    titleSuffix: "출장 아로마 마사지 심신 안정",
    desc: (d: string) => `${d} 출장 마사지 부드러운 전신 릴렉싱. 최고급 식물성 오일 블렌딩으로 지친 심신을 따뜻하게 감싸드리는 출장 아로마 마사지입니다.`
  },
  {
    titleSuffix: "출장 정찰제 마사지 표준 요금표",
    desc: (d: string) => `${d} 출장 마사지 안심 이용 가이드. 거품 없는 투명한 가격과 품격 있는 테라피 서비스를 올댓홈케어 출장 정찰제 마사지에서 확인하세요.`
  },
  {
    titleSuffix: "출장 웰니스 마사지 토탈 바디케어",
    desc: (d: string) => `${d} 출장 마사지 올인원 웰니스 코스. 타이 스트레칭과 아로마, 스웨디시의 장점을 모은 프리미엄 출장 웰니스 마사지 힐링을 안내합니다.`
  }
];

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { region, district } = await params;
  const districtName = safeDecode(district);

  const charSum = (districtName + region).split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const patternIndex = Math.abs(charSum) % SEO_PATTERNS.length;
  const pattern = SEO_PATTERNS[patternIndex];

  const locationKeyword = `${districtName} 출장 마사지`;
  const finalTitle = `${locationKeyword} ${pattern.titleSuffix} | 올댓홈케어`;
  const finalDescription = pattern.desc(districtName);

  const canonicalUrl = `${SITE_URL}/${region}/${encodeURIComponent(districtName)}`;

  return {
    title: { absolute: finalTitle },
    description: finalDescription,
    alternates: { canonical: canonicalUrl },
    keywords: [
      `${districtName} 출장 마사지`,
      `${districtName}출장마사지`,
      `${locationKeyword}`,
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
          alt: `${locationKeyword} - 올댓홈케어`,
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
  const currentUrl = `${SITE_URL}/${region}/${encodeURIComponent(districtName)}`;
  const locationKeyword = `${districtName} 출장 마사지`;

  // 🌟 네이버 서치어드바이저 및 구글 공용 디렉터리형 구조화 데이터
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${currentUrl}/#webpage`,
        url: currentUrl,
        name: `${locationKeyword} ${pattern.titleSuffix} | 올댓홈케어`,
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
            name: `${regionFullName} 출장 마사지`,
            item: `${SITE_URL}/${region}/${encodeURIComponent(regionFullName)}`
          },
          {
            "@type": "ListItem",
            position: 3,
            name: locationKeyword,
            item: currentUrl
          }
        ]
      },
      {
        "@type": "ItemList",
        "@id": `${currentUrl}/#itemlist`,
        name: `${locationKeyword} 추천 제휴 매장 목록`,
        description: `${districtName} 출장 정찰제 마사지, 출장 아로마 마사지, 출장 웰니스 마사지 제휴점 리스트`,
        itemListOrder: "https://schema.org/ItemListUnordered"
      },
      {
        "@type": "FAQPage",
        "@id": `${currentUrl}/#faq`,
        mainEntity: [
          {
            "@type": "Question",
            name: `${districtName} 출장 마사지 예약 및 이용 방법은 어떻게 되나요?`,
            acceptedAnswer: {
              "@type": "Answer",
              text: "올댓홈케어에서 각 제휴 업체의 코스와 이용 요금, 운영 시간을 확인하신 후 전화연결 버튼을 통해 해당 매장으로 직접 예약하시면 됩니다."
            }
          },
          {
            "@type": "Question",
            name: `${districtName} 출장 정찰제 마사지 요금은 사전에 확인 가능한가요?`,
            acceptedAnswer: {
              "@type": "Answer",
              text: "네, 올댓홈케어는 시·군·구별 제휴 업체의 코스 구성과 요금을 사전에 투명하게 정리해 두었으므로 사전에 코스별 금액을 확인하고 비교해 보실 수 있습니다."
            }
          },
          {
            "@type": "Question",
            name: "위생 관리와 시트 및 소모품은 어떻게 관리되나요?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "모든 시트와 타월 등 소모품은 1회 사용 시 즉시 세탁 및 교체되며 청결한 위생 규정을 엄격히 준수합니다."
            }
          },
          {
            "@type": "Question",
            name: "올댓홈케어 플랫폼 이용 시 별도 중개 수수료가 발생하나요?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "아닙니다. 올댓홈케어는 건전하고 편리한 정보 안내 플랫폼으로 이용자에게 어떠한 중개 수수료도 청구하지 않습니다."
            }
          }
        ]
      },
      {
        "@type": "Article",
        "@id": `${currentUrl}/#article`,
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": currentUrl
        },
        headline: `${locationKeyword} ${pattern.titleSuffix} | 올댓홈케어`,
        description: pattern.desc(districtName),
        image: `${SITE_URL}/banner.jpg`,
        datePublished: "2026-10-14T09:00:00+09:00",
        dateModified: "2026-10-14T09:00:00+09:00",
        author: {
          "@type": "Organization",
          name: "올댓홈케어"
        },
        publisher: {
          "@type": "Organization",
          name: "올댓홈케어",
          logo: {
            "@type": "ImageObject",
            url: `${SITE_URL}/og-image.png`
          }
        }
      }
    ]
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
              href="/"
              className="px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-colors"
            >
              홈으로
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
        {/* 상단 브레드크럼 탐색 바 */}
        <nav aria-label="Breadcrumb" className="text-xs text-gray-400 flex items-center gap-2">
          <Link href="/" className="hover:text-amber-400">홈</Link>
          <span>&gt;</span>
          <Link href={`/${region}/${encodeURIComponent(regionFullName)}`} className="hover:text-amber-400">
            {regionFullName} 출장 마사지
          </Link>
          <span>&gt;</span>
          <span className="text-amber-400 font-bold">{locationKeyword}</span>
        </nav>

        {/* 상단 메인 히어로 배너 (단일 H1) */}
        <section className="relative rounded-3xl overflow-hidden border border-amber-500/30 shadow-[0_0_40px_rgba(245,158,11,0.12)] bg-[#141418] p-6 md:p-8 space-y-2">
          <span className="text-amber-400 text-xs font-black tracking-widest uppercase block">
            {regionFullName} · {districtName} 도심휴식 마사지 · 홈케어
          </span>
          <h1 className="text-2xl md:text-3xl font-black text-white">
            {districtName} 출장 마사지 {pattern.titleSuffix}
          </h1>
          <p className="text-xs md:text-sm text-gray-300 leading-relaxed">
            {pattern.desc(districtName)}
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

        {/* 제휴 샵 목록 UI (ClientTextMixer) */}
        <ClientTextMixer region={region} district={districtName} />

        {/* 코스/요금표 카드 영역 */}
        <section id="course_info" className="space-y-4">
          <h2 className="text-base font-black text-white flex items-center gap-2">
            <span className="w-1.5 h-4 bg-amber-400 rounded-full inline-block"></span>
            {districtName} 출장 마사지 표준 코스 & 정찰제 요금표
          </h2>
          <div className="grid gap-3">
            <div className="bg-[#111114] border border-white/10 rounded-2xl p-4 flex justify-between items-center shadow-sm hover:border-amber-500/30 transition">
              <div>
                <span className="text-[10px] bg-amber-500/10 text-amber-300 px-2 py-0.5 rounded font-bold">건식 타이</span>
                <h3 className="font-bold text-sm text-white mt-1">출장 타이 마사지 전신 스트레칭 (60분)</h3>
                <p className="text-xs text-gray-400 mt-0.5">굳은 근육 긴장 완화 및 전신 유연성 회복</p>
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

        {/* 정보 안내 박스 */}
        <section id="company_info" className="bg-[#0e0e12] border border-white/10 rounded-2xl p-5 space-y-3 text-xs">
          <h2 className="text-sm font-bold text-white mb-2">{districtName} 출장 마사지 이용 안내</h2>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 py-2 border-b border-white/5">
            <span className="text-gray-400 w-20 shrink-0">운영시간</span>
            <span className="text-gray-200">24시간 상시 안내 (각 제휴 샵별 운영시간 준수)</span>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 py-2 border-b border-white/5">
            <span className="text-gray-400 w-20 shrink-0">관리장소</span>
            <span className="text-gray-200">{districtName} 전 지역 고객 자택, 오피스텔, 호텔 및 숙소</span>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 py-2 border-b border-white/5">
            <span className="text-gray-400 w-20 shrink-0">예약방식</span>
            <span className="text-gray-200">제공된 연락처로 해당 업체에 직접 전화하여 코스 및 일정 조율</span>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 py-2">
            <span className="text-gray-400 w-20 shrink-0">유의사항</span>
            <span className="text-gray-200">건전하고 쾌적한 웰니스 힐링을 지향하며 퇴폐 요구 시 즉시 종료됩니다.</span>
          </div>
        </section>

        {/* 네이버 C-Rank / D.I.A. 상위 노출용 심층 칼럼 */}
        <article className="bg-[#0e0e12] p-6 rounded-3xl border border-white/10 space-y-4 text-gray-300 leading-relaxed text-xs sm:text-sm">
          <div className="border-b border-white/10 pb-3">
            <span className="text-amber-400 font-bold text-xs uppercase block mb-1">
              WELLNESS & BODY CARE INSIGHT
            </span>
            <h2 className="text-base sm:text-lg font-black text-white">
              {districtName} 직장인 및 현대인을 위한 바디 밸런스 회복 가이드 | 올댓홈케어
            </h2>
          </div>
          <p>
            {districtName} 일대에서 고정된 자세로 업무를 수행하는 현대인들은 목, 어깨의 승모근과 척추 기립근에 만성적인 피로가 축적되기 쉽습니다. 이러한 긴장을 방치할 경우 혈액 순환이 저하되어 두통이나 만성 피로로 이어질 수 있습니다.
          </p>
          <p>
            독립된 1인 공간에서 진행되는 프라이빗 바디 테라피는 외부 스트레스를 차단하고 부교감신경을 촉진하여 혈류 공급과 근육 이완 효과를 극대화합니다. 관리가 끝난 후 환복이나 이동 없이 곧바로 숙면을 취할 수 있어 피로 해소에 가장 이상적입니다. 올댓홈케어는 투명한 코스와 정찰제 요금 기준을 엄격히 고수합니다.
          </p>
        </article>

        {/* 자주 묻는 질문 FAQ 섹션 */}
        <section id="faq_info" className="space-y-3">
          <h2 className="text-base font-black text-white flex items-center gap-2">
            <span className="w-1.5 h-4 bg-amber-400 rounded-full inline-block"></span>
            {districtName} 출장 마사지 자주 묻는 질문
          </h2>
          <div className="bg-[#111114] rounded-2xl p-4 border border-white/5 space-y-1.5">
            <div className="font-bold text-xs sm:text-sm text-gray-200 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center text-xs font-black">Q</span>
              {districtName} 출장 마사지 예약은 어떻게 하나요?
            </div>
            <p className="text-xs text-gray-400 pl-7 leading-relaxed">
              올댓홈케어 리스트에서 각 업체의 코스와 이용 요금, 운영 시간을 확인하신 후 전화연결 버튼을 통해 해당 샵 매니저와 직접 상담 및 예약하시면 됩니다.
            </p>
          </div>
          <div className="bg-[#111114] rounded-2xl p-4 border border-white/5 space-y-1.5">
            <div className="font-bold text-xs sm:text-sm text-gray-200 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center text-xs font-black">Q</span>
              {districtName} 출장 정찰제 마사지 요금인가요?
            </div>
            <p className="text-xs text-gray-400 pl-7 leading-relaxed">
              네, 올댓홈케어에 등록된 모든 제휴 업체는 사전에 공개된 투명한 정찰제 요금을 준수하므로 사전에 코스별 금액을 확인하실 수 있습니다.
            </p>
          </div>
          <div className="bg-[#111114] rounded-2xl p-4 border border-white/5 space-y-1.5">
            <div className="font-bold text-xs sm:text-sm text-gray-200 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center text-xs font-black">Q</span>
              시술 도구와 타월 등 소모품은 어떻게 관리되나요?
            </div>
            <p className="text-xs text-gray-400 pl-7 leading-relaxed">
              모든 타월과 시트는 1회 사용 시 즉시 세탁 및 교체되며, 위생 규정을 철저히 지키고 있습니다.
            </p>
          </div>
          <div className="bg-[#111114] rounded-2xl p-4 border border-white/5 space-y-1.5">
            <div className="font-bold text-xs sm:text-sm text-gray-200 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center text-xs font-black">Q</span>
              결제 방법은 어떻게 되나요?
            </div>
            <p className="text-xs text-gray-400 pl-7 leading-relaxed">
              각 제휴 매장별 정책에 따라 현금, 카드 결제 및 계좌이체가 지원되며 사전 추가 요금은 발생하지 않습니다.
            </p>
          </div>
        </section>
      </main>

      {/* 모바일 하단 플로팅 고정 바 */}
      <aside className="fixed bottom-0 left-0 right-0 z-50 bg-[#070709]/95 border-t border-amber-500/30 p-3 shadow-2xl backdrop-blur-md md:hidden">
        <div className="max-w-md mx-auto flex items-center justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="text-xs font-bold text-white truncate">{districtName} 출장 마사지</div>
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