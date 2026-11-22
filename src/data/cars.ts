import type { RentalServiceType } from "./company";

export interface CarPricing {
  originalLepasKunci: number;
  lepasKunciPerDay: number;
  originalSopir: number;
  sopirPerDay: number;
  originalAllIn: number;
  allInPerDay: number;
  weeklyPerDay?: number;
}

export interface CarSpecs {
  transmission: "Manual" | "Matic" | "CVT / Matic" | "Manual / Matic";
  capacity: number;
  luggage: number;
  fuel: "Bensin" | "Diesel";
  year: number;
  engineCc: string;
  plateNumber?: string;
}

export interface MobileCarItem {
  id: string;
  name: string;
  brand: string;
  category: "MPV" | "City Car" | "SUV / Crossover";
  pricing: CarPricing;
  specs: CarSpecs;
  photoUrl: string;
  badge: string;
  discountBadge: string;
  isPopular?: boolean;
  shortDesc: string;
  status: "tersedia" | "disewa";
}

// Data unit armada real & ready dari Harian Database DCS
export const MOBILE_CARS: MobileCarItem[] = [
  {
    id: "toyota-calya-2025",
    name: "Toyota Calya 1.2 E (2025)",
    brand: "Toyota",
    category: "MPV",
    pricing: {
      originalLepasKunci: 350000,
      lepasKunciPerDay: 280000,
      originalSopir: 480000,
      sopirPerDay: 420000,
      originalAllIn: 720000,
      allInPerDay: 620000,
      weeklyPerDay: 260000,
    },
    specs: {
      transmission: "Manual / Matic",
      capacity: 7,
      luggage: 2,
      fuel: "Bensin",
      year: 2025,
      engineCc: "1197 cc Dual VVT-i",
      plateNumber: "B 1204 ZOI",
    },
    photoUrl: "https://gebkkslvavgkzpjqbrsl.supabase.co/storage/v1/object/public/rental-assets/cars/photo_url/1794972974420_asjjty.webp",
    badge: "Unit Gress 2025",
    discountBadge: "Diskon 20%",
    isPopular: true,
    shortDesc: "Unit baru 2025 super irit bensin, muat 7 orang, plat ganjil/genap ready.",
    status: "tersedia",
  },
  {
    id: "honda-brio-2025",
    name: "Honda Brio Satya (2025)",
    brand: "Honda",
    category: "City Car",
    pricing: {
      originalLepasKunci: 380000,
      lepasKunciPerDay: 300000,
      originalSopir: 500000,
      sopirPerDay: 430000,
      originalAllIn: 750000,
      allInPerDay: 630000,
      weeklyPerDay: 280000,
    },
    specs: {
      transmission: "Matic",
      capacity: 5,
      luggage: 2,
      fuel: "Bensin",
      year: 2025,
      engineCc: "1199 cc i-VTEC",
      plateNumber: "B 1830 ZOG",
    },
    photoUrl: "https://gebkkslvavgkzpjqbrsl.supabase.co/storage/v1/object/public/rental-assets/cars/photo_url/1794974404595_d6uc1r.png",
    badge: "Lincah & Irit",
    discountBadge: "Diskon 21%",
    isPopular: true,
    shortDesc: "Paling lincah untuk jalanan macet Jakarta & mudah parkir di mana saja.",
    status: "tersedia",
  },
  {
    id: "toyota-avanza-2025",
    name: "Toyota All New Avanza (2025)",
    brand: "Toyota",
    category: "MPV",
    pricing: {
      originalLepasKunci: 450000,
      lepasKunciPerDay: 350000,
      originalSopir: 580000,
      sopirPerDay: 500000,
      originalAllIn: 850000,
      allInPerDay: 720000,
      weeklyPerDay: 325000,
    },
    specs: {
      transmission: "Manual / Matic",
      capacity: 7,
      luggage: 3,
      fuel: "Bensin",
      year: 2025,
      engineCc: "1496 cc Dual VVT-i",
      plateNumber: "B 1041 ZOH",
    },
    photoUrl: "https://gebkkslvavgkzpjqbrsl.supabase.co/storage/v1/object/public/rental-assets/cars/photo_url/1794975210521_vhum9e.webp",
    badge: "Best Seller",
    discountBadge: "Diskon 22%",
    isPopular: true,
    shortDesc: "Armada sejuta umat paling diminati. Nyaman, tangguh, dan AC double blower dingin.",
    status: "tersedia",
  },
  {
    id: "toyota-avanza-cvt",
    name: "Toyota Avanza CVT (2023)",
    brand: "Toyota",
    category: "MPV",
    pricing: {
      originalLepasKunci: 420000,
      lepasKunciPerDay: 330000,
      originalSopir: 560000,
      sopirPerDay: 480000,
      originalAllIn: 820000,
      allInPerDay: 700000,
      weeklyPerDay: 310000,
    },
    specs: {
      transmission: "CVT / Matic",
      capacity: 7,
      luggage: 3,
      fuel: "Bensin",
      year: 2023,
      engineCc: "1329 cc",
      plateNumber: "B 1055 ZKZ",
    },
    photoUrl: "https://gebkkslvavgkzpjqbrsl.supabase.co/storage/v1/object/public/rental-assets/cars/photo_url/1794976426039_bs99a1.webp",
    badge: "Halus & Irit",
    discountBadge: "Diskon 21%",
    shortDesc: "Transmisi CVT super halus bebas hentakan, nyaman berkendara jauh.",
    status: "tersedia",
  },
  {
    id: "hyundai-stargazer-2026",
    name: "Hyundai Stargazer (2026)",
    brand: "Hyundai",
    category: "MPV",
    pricing: {
      originalLepasKunci: 520000,
      lepasKunciPerDay: 420000,
      originalSopir: 650000,
      sopirPerDay: 560000,
      originalAllIn: 920000,
      allInPerDay: 790000,
      weeklyPerDay: 390000,
    },
    specs: {
      transmission: "Matic",
      capacity: 7,
      luggage: 3,
      fuel: "Bensin",
      year: 2026,
      engineCc: "1497 cc Smartstream",
      plateNumber: "B 1094 ZOG",
    },
    photoUrl: "https://gebkkslvavgkzpjqbrsl.supabase.co/storage/v1/object/public/rental-assets/cars/photo_url/1794975883926_e5x0k6.webp",
    badge: "Futuristik 2026",
    discountBadge: "Promo Diskon 19%",
    isPopular: true,
    shortDesc: "Desain futuristik dengan kabin modern, kursi captain seat, dan fitur keselamatan canggih.",
    status: "tersedia",
  },
  {
    id: "xpander-ultimate",
    name: "Mitsubishi Xpander Ultimate",
    brand: "Mitsubishi",
    category: "MPV",
    pricing: {
      originalLepasKunci: 550000,
      lepasKunciPerDay: 450000,
      originalSopir: 680000,
      sopirPerDay: 590000,
      originalAllIn: 980000,
      allInPerDay: 850000,
      weeklyPerDay: 420000,
    },
    specs: {
      transmission: "Matic",
      capacity: 7,
      luggage: 3,
      fuel: "Bensin",
      year: 2023,
      engineCc: "1499 cc MIVEC",
      plateNumber: "B 1618 ZOC",
    },
    photoUrl: "https://gebkkslvavgkzpjqbrsl.supabase.co/storage/v1/object/public/rental-assets/cars/photo_url/1794973302849_dzpbyb.jpg",
    badge: "Paling Nyaman",
    discountBadge: "Diskon 18%",
    isPopular: true,
    shortDesc: "Suspensi paling empuk di kelas MPV, kabin hening dan fitur tipe tertinggi (Ultimate).",
    status: "tersedia",
  },
  {
    id: "xpander-sport",
    name: "Mitsubishi Xpander (2023)",
    brand: "Mitsubishi",
    category: "MPV",
    pricing: {
      originalLepasKunci: 520000,
      lepasKunciPerDay: 420000,
      originalSopir: 650000,
      sopirPerDay: 560000,
      originalAllIn: 920000,
      allInPerDay: 800000,
      weeklyPerDay: 390000,
    },
    specs: {
      transmission: "Matic",
      capacity: 7,
      luggage: 3,
      fuel: "Bensin",
      year: 2023,
      engineCc: "1499 cc MIVEC",
      plateNumber: "B 1663 ZOC",
    },
    photoUrl: "https://gebkkslvavgkzpjqbrsl.supabase.co/storage/v1/object/public/rental-assets/cars/photo_url/1794977045748_vobnl7.png",
    badge: "Elegan & Tangguh",
    discountBadge: "Diskon 19%",
    shortDesc: "Kenyamanan khas Xpander siap menemani liburan keluarga ke luar kota.",
    status: "tersedia",
  },
  {
    id: "innova-reborn-2024",
    name: "Toyota Innova Reborn (2024)",
    brand: "Toyota",
    category: "MPV",
    pricing: {
      originalLepasKunci: 750000,
      lepasKunciPerDay: 650000,
      originalSopir: 900000,
      sopirPerDay: 800000,
      originalAllIn: 1300000,
      allInPerDay: 1100000,
      weeklyPerDay: 600000,
    },
    specs: {
      transmission: "Manual / Matic",
      capacity: 7,
      luggage: 4,
      fuel: "Diesel",
      year: 2024,
      engineCc: "2393 cc Turbo Diesel (2GD)",
      plateNumber: "B 1760 ZOD",
    },
    photoUrl: "https://gebkkslvavgkzpjqbrsl.supabase.co/storage/v1/object/public/rental-assets/cars/photo_url/1794981455294_dkxmug.png",
    badge: "Unit 2024 Gress",
    discountBadge: "Promo Premium",
    isPopular: true,
    shortDesc: "Mesin diesel 2GD tangguh & bertenaga. Sangat stabil, senyap, dan nyaman perjalanan jauh.",
    status: "tersedia",
  },
  {
    id: "innova-reborn-2023",
    name: "Toyota Innova Reborn (2023)",
    brand: "Toyota",
    category: "MPV",
    pricing: {
      originalLepasKunci: 720000,
      lepasKunciPerDay: 620000,
      originalSopir: 880000,
      sopirPerDay: 780000,
      originalAllIn: 1250000,
      allInPerDay: 1080000,
      weeklyPerDay: 580000,
    },
    specs: {
      transmission: "Matic",
      capacity: 7,
      luggage: 4,
      fuel: "Diesel",
      year: 2023,
      engineCc: "2393 cc Diesel 2GD",
      plateNumber: "B 2933 P2V",
    },
    photoUrl: "https://gebkkslvavgkzpjqbrsl.supabase.co/storage/v1/object/public/rental-assets/cars/photo_url/1794981269437_3i2kxu.png",
    badge: "Favorit Luar Kota",
    discountBadge: "Diskon 14%",
    shortDesc: "Armada premium terfavorit untuk dinas kantor, pernikahan, dan perjalanan luar kota.",
    status: "tersedia",
  },
  {
    id: "daihatsu-xenia",
    name: "Daihatsu All New Xenia",
    brand: "Daihatsu",
    category: "MPV",
    pricing: {
      originalLepasKunci: 380000,
      lepasKunciPerDay: 300000,
      originalSopir: 490000,
      sopirPerDay: 430000,
      originalAllIn: 760000,
      allInPerDay: 640000,
      weeklyPerDay: 280000,
    },
    specs: {
      transmission: "Manual / Matic",
      capacity: 7,
      luggage: 3,
      fuel: "Bensin",
      year: 2023,
      engineCc: "1329 cc Dual VVT-i",
      plateNumber: "B 1461 ZMK",
    },
    photoUrl: "https://gebkkslvavgkzpjqbrsl.supabase.co/storage/v1/object/public/rental-assets/cars/photo_url/1794974651141_p5t5sn.jpg",
    badge: "Ekonomis 7 Seater",
    discountBadge: "Diskon 21%",
    shortDesc: "Pilihan hemat keluarga, kabin luas sofa mode, suspensi empuk.",
    status: "tersedia",
  },
];

export function getCarPrice(car: MobileCarItem, service: RentalServiceType): { promoPrice: number; originalPrice: number } {
  switch (service) {
    case "lepas_kunci":
      return { promoPrice: car.pricing.lepasKunciPerDay, originalPrice: car.pricing.originalLepasKunci };
    case "dengan_sopir":
      return { promoPrice: car.pricing.sopirPerDay, originalPrice: car.pricing.originalSopir };
    case "all_in":
      return { promoPrice: car.pricing.allInPerDay, originalPrice: car.pricing.originalAllIn };
  }
}
