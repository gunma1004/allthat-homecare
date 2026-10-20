export interface CourseOffer {
  name: string;
  time: string;
  price: number;
  priceText: string;
  desc: string;
  badge?: string;
}

export interface CourseGroup {
  category: string;
  desc: string;
  badge?: string;
  offers: CourseOffer[];
}

export interface ShopDetail {
  id: number;
  name: string;
  tagline: string;
  phone: string;
  image: string;
  basePrice: string;
  courses: CourseGroup[];
}

export const SHOPS_DATA: Record<number, ShopDetail> = {
  1: {
    id: 1,
    name: "한국골든테라피",
    tagline: "골든 품격의 감성 릴렉싱! 전문 관리사들의 정성스러운 맞춤 테라피로 일상의 피로를 완벽하게 해소해 드립니다.",
    phone: "0507-1280-3140",
    image: "/shop1.jpg",
    basePrice: "60,000원",
    courses: [
      {
        category: "건식 코스",
        desc: "뭉치고 굳은 전신 근육을 시원하게 풀어주는 정통 스트레칭 케어.",
        offers: [
          { name: "건식 코스 60분", time: "60분", price: 60000, priceText: "60,000원", desc: "뭉치고 굳은 전신 근육을 시원하게 풀어주는 정통 스트레칭 케어." },
          { name: "건식 코스 90분", time: "90분", price: 80000, priceText: "80,000원", desc: "뭉치고 굳은 전신 근육을 시원하게 풀어주는 정통 스트레칭 케어." },
          { name: "건식 코스 120분", time: "120분", price: 100000, priceText: "100,000원", desc: "뭉치고 굳은 전신 근육을 시원하게 풀어주는 정통 스트레칭 케어." },
        ],
      },
      {
        category: "전신아로마",
        desc: "고급 천연 오일로 피로와 긴장을 부드럽게 완화시켜주는 전신 릴렉스 케어.",
        offers: [
          { name: "전신아로마 60분", time: "60분", price: 70000, priceText: "70,000원", desc: "고급 천연 오일로 피로와 긴장을 부드럽게 완화시켜주는 전신 릴렉스 케어." },
          { name: "전신아로마 90분", time: "90분", price: 90000, priceText: "90,000원", desc: "고급 천연 오일로 피로와 긴장을 부드럽게 완화시켜주는 전신 릴렉스 케어." },
          { name: "전신아로마 120분", time: "120분", price: 110000, priceText: "110,000원", desc: "고급 천연 오일로 피로와 긴장을 부드럽게 완화시켜주는 전신 릴렉스 케어." },
        ],
      },
      {
        category: "VIP 감성힐링코스",
        desc: "감각적이고 섬세한 터치로 깊은 이완과 힐링을 선사하는 인기 코스.",
        badge: "★추천",
        offers: [
          { name: "VIP 감성힐링코스 60분", time: "60분", price: 90000, priceText: "90,000원", desc: "감각적이고 섬세한 터치로 깊은 이완과 힐링을 선사하는 인기 코스." },
          { name: "VIP 감성힐링코스 90분", time: "90분", price: 110000, priceText: "110,000원", desc: "감각적이고 섬세한 터치로 깊은 이완과 힐링을 선사하는 인기 코스." },
          { name: "VIP 감성힐링코스 120분", time: "120분", price: 130000, priceText: "130,000원", desc: "감각적이고 섬세한 터치로 깊은 이완과 힐링을 선사하는 인기 코스." },
        ],
      },
    ],
  },
  2: {
    id: 2,
    name: "한국미인테라피",
    tagline: "최고급 천연 오일을 활용한 감성 아로마 전신 바디케어 프로그램 및 제휴 샵.",
    phone: "0507-1280-3199",
    image: "/shop2.jpg",
    basePrice: "60,000원",
    courses: [
      {
        category: "건식 코스",
        desc: "뭉치고 굳은 전신 근육을 시원하게 풀어주는 정통 스트레칭 케어.",
        offers: [
          { name: "건식 코스 60분", time: "60분", price: 60000, priceText: "60,000원", desc: "전신 스트레칭 케어." },
          { name: "건식 코스 90분", time: "90분", price: 80000, priceText: "80,000원", desc: "전신 스트레칭 케어." },
        ],
      },
      {
        category: "전신아로마",
        desc: "고급 천연 오일로 피로와 긴장을 부드럽게 완화시켜주는 전신 릴렉스 케어.",
        offers: [
          { name: "전신아로마 60분", time: "60분", price: 70000, priceText: "70,000원", desc: "전신 릴렉스 케어." },
          { name: "전신아로마 90분", time: "90분", price: 90000, priceText: "90,000원", desc: "전신 릴렉스 케어." },
        ],
      },
    ],
  },
  3: {
    id: 3,
    name: "주주테라피",
    tagline: "재방문율 1위 만족도! 정통 힐링 테라피부터 올인원 VIP 코스까지 체계적인 프로그램.",
    phone: "0507-1280-3193",
    image: "/shop3.jpg",
    basePrice: "60,000원",
    courses: [
      {
        category: "건식 코스",
        desc: "뭉치고 굳은 전신 근육을 시원하게 풀어주는 정통 스트레칭 케어.",
        offers: [
          { name: "주주테라피 건식 코스 60분", time: "60분", price: 60000, priceText: "60,000원", desc: "뭉치고 굳은 전신 근육을 시원하게 풀어주는 정통 스트레칭 케어." },
          { name: "주주테라피 건식 코스 90분", time: "90분", price: 80000, priceText: "80,000원", desc: "뭉치고 굳은 전신 근육을 시원하게 풀어주는 정통 스트레칭 케어." },
          { name: "주주테라피 건식 코스 120분", time: "120분", price: 100000, priceText: "100,000원", desc: "뭉치고 굳은 전신 근육을 시원하게 풀어주는 정통 스트레칭 케어." },
        ],
      },
      {
        category: "전신아로마",
        desc: "고급 천연 오일로 피로와 긴장을 부드럽게 완화시켜주는 전신 릴렉스 케어.",
        offers: [
          { name: "주주테라피 전신아로마 60분", time: "60분", price: 70000, priceText: "70,000원", desc: "고급 천연 오일로 피로와 긴장을 부드럽게 완화시켜주는 전신 릴렉스 케어." },
          { name: "주주테라피 전신아로마 90분", time: "90분", price: 90000, priceText: "90,000원", desc: "고급 천연 오일로 피로와 긴장을 부드럽게 완화시켜주는 전신 릴렉스 케어." },
          { name: "주주테라피 전신아로마 120분", time: "120분", price: 110000, priceText: "110,000원", desc: "고급 천연 오일로 피로와 긴장을 부드럽게 완화시켜주는 전신 릴렉스 케어." },
        ],
      },
      {
        category: "VIP 감성힐링코스",
        desc: "감각적이고 섬세한 터치로 깊은 이완과 힐링을 선사하는 인기 코스.",
        badge: "★추천",
        offers: [
          { name: "주주테라피 VIP 감성힐링코스 60분", time: "60분", price: 90000, priceText: "90,000원", desc: "감각적이고 섬세한 터치로 깊은 이완과 힐링을 선사하는 인기 코스." },
          { name: "주주테라피 VIP 감성힐링코스 90분", time: "90분", price: 110000, priceText: "110,000원", desc: "감각적이고 섬세한 터치로 깊은 이완과 힐링을 선사하는 인기 코스." },
          { name: "주주테라피 VIP 감성힐링코스 120분", time: "120분", price: 130000, priceText: "130,000원", desc: "감각적이고 섬세한 터치로 깊은 이완과 힐링을 선사하는 인기 코스." },
        ],
      },
      {
        category: "VIP 스페셜코스",
        desc: "더욱 품격 있고 여유로운 휴식을 완성하는 프리미엄 스페셜 관리.",
        badge: "★추천",
        offers: [
          { name: "주주테라피 VIP 스페셜코스 60분", time: "60분", price: 100000, priceText: "100,000원", desc: "더욱 품격 있고 여유로운 휴식을 완성하는 프리미엄 스페셜 관리." },
          { name: "주주테라피 VIP 스페셜코스 90분", time: "90분", price: 120000, priceText: "120,000원", desc: "더욱 품격 있고 여유로운 휴식을 완성하는 프리미엄 스페셜 관리." },
          { name: "주주테라피 VIP 스페셜코스 120분", time: "120분", price: 140000, priceText: "140,000원", desc: "더욱 품격 있고 여유로운 휴식을 완성하는 프리미엄 스페셜 관리." },
        ],
      },
      {
        category: "VIP 프리미엄 코스",
        desc: "종합 바디케어를 모두 즐길 수 있는 올인원 150분 힐링.",
        offers: [
          { name: "주주테라피 VIP 프리미엄 코스 150분", time: "150분", price: 160000, priceText: "160,000원", desc: "종합 바디케어를 모두 즐길 수 있는 올인원 150분 힐링." },
        ],
      },
      {
        category: "한국인스웨디시",
        desc: "한국인 전문 관리사의 세심한 터치로 완성되는 최고급 스웨디시.",
        badge: "BEST",
        offers: [
          { name: "주주테라피 한국인스웨디시 60분", time: "60분", price: 140000, priceText: "140,000원", desc: "한국인 전문 관리사의 세심한 터치로 완성되는 최고급 스웨디시." },
          { name: "주주테라피 한국인스웨디시 90분", time: "90분", price: 180000, priceText: "180,000원", desc: "한국인 전문 관리사의 세심한 터치로 완성되는 최고급 스웨디시." },
        ],
      },
    ],
  },
  4: {
    id: 4,
    name: "퀸즈홈테라피",
    tagline: "여왕처럼 누리는 고품격 테라피! 전문 관리사들의 품격 있는 1:1 맞춤 방문 힐링 서비스.",
    phone: "0507-1280-3296",
    image: "/shop4.jpg",
    basePrice: "60,000원",
    courses: [
      {
        category: "건식 코스",
        desc: "정통 스트레칭 케어.",
        offers: [
          { name: "건식 코스 60분", time: "60분", price: 60000, priceText: "60,000원", desc: "정통 스트레칭 케어." },
          { name: "건식 코스 90분", time: "90분", price: 80000, priceText: "80,000원", desc: "정통 스트레칭 케어." },
        ],
      },
    ],
  },
  5: {
    id: 5,
    name: "오늘밤테라피",
    tagline: "선입금 없는 100% 후불제! 깊은 밤 지친 하루의 피로를 타이부터 스웨디시까지 완벽하게 날려버리세요.",
    phone: "0507-1280-3199",
    image: "/shop5.jpg",
    basePrice: "60,000원",
    courses: [
      {
        category: "건식 코스",
        desc: "정통 스트레칭 케어.",
        offers: [
          { name: "건식 코스 60분", time: "60분", price: 60000, priceText: "60,000원", desc: "정통 스트레칭 케어." },
          { name: "건식 코스 90분", time: "90분", price: 80000, priceText: "80,000원", desc: "정통 스트레칭 케어." },
        ],
      },
    ],
  },
};
