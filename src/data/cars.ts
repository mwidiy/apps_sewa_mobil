import type { RentalServiceType } from "./company";

export interface CarPricing {
  originalLepasKunci: number;
  lepasKunciPerDay: number;
  originalSopir: number;
  sopirPerDay: number;
  originalAllIn: number;
  allInPerDay: number;
  twelveHoursLepasKunci?: number;
  twelveHoursSopir?: number;
  weeklyPerDay?: number;
}

export interface CarSpecs {
  transmission: "Manual" | "Matic" | "Manual / Matic";
  capacity: number;
  luggage: number;
  fuel: "Bensin" | "Diesel";
  year: number;
  engineCc: string;
  hasAirConditioner: boolean;
  hasBluetoothAudio: boolean;
  hasParkingCamera: boolean;
}

export interface MobileCarItem {
  id: string;
  name: string;
  brand: string;
  category: "MPV" | "City Car";
  pricing: CarPricing;
  specs: CarSpecs;
  photoUrl: string;
  badge: string;
  discountBadge: string;
  isPopular?: boolean;
  shortDesc: string;
  highlights: string[];
}

export const MOBILE_CARS: MobileCarItem[] = [
  {
    id: "toyota-calya",
    name: "Toyota Calya 1.2",
    brand: "Toyota",
    category: "MPV",
    pricing: {
      originalLepasKunci: 350000,
      lepasKunciPerDay: 280000,
      originalSopir: 480000,
      sopirPerDay: 420000,
      originalAllIn: 720000,
      allInPerDay: 620000,
      twelveHoursLepasKunci: 250000,
      twelveHoursSopir: 370000,
      weeklyPerDay: 260000,
    },
    specs: {
      transmission: "Manual / Matic",
      capacity: 7,
      luggage: 2,
      fuel: "Bensin",
      year: 2025,
      engineCc: "1197 cc Dual VVT-i",
      hasAirConditioner: true,
      hasBluetoothAudio: true,
      hasParkingCamera: true,
    },
    photoUrl: "https://gebkkslvavgkzpjqbrsl.supabase.co/storage/v1/object/public/rental-assets/cars/photo_url/1794972974420_asjjty.webp",
    badge: "Paling Hemat",
    discountBadge: "Diskon Promo 20%",
    isPopular: true,
    shortDesc: "Keluarga 7-seater super irit bensin, tarif harian paling ramah di kantong.",
    highlights: ["Muat 7 orang", "BBM super irit", "Unit gress 2025", "AC double blower"],
  },
  {
    id: "honda-brio-satya",
    name: "Honda Brio Satya",
    brand: "Honda",
    category: "City Car",
    pricing: {
      originalLepasKunci: 380000,
      lepasKunciPerDay: 300000,
      originalSopir: 500000,
      sopirPerDay: 430000,
      originalAllIn: 750000,
      allInPerDay: 630000,
      twelveHoursLepasKunci: 260000,
      twelveHoursSopir: 380000,
      weeklyPerDay: 280000,
    },
    specs: {
      transmission: "Manual / Matic",
      capacity: 5,
      luggage: 2,
      fuel: "Bensin",
      year: 2025,
      engineCc: "1199 cc i-VTEC",
      hasAirConditioner: true,
      hasBluetoothAudio: true,
      hasParkingCamera: true,
    },
    photoUrl: "https://gebkkslvavgkzpjqbrsl.supabase.co/storage/v1/object/public/rental-assets/cars/photo_url/1794974404595_d6uc1r.png",
    badge: "Lincah & Irit",
    discountBadge: "Diskon 21%",
    isPopular: true,
    shortDesc: "Paling lincah selap-selip di macet Jakarta & mudah parkir di mall.",
    highlights: ["Lincah & bertenaga", "Parkir gampang", "Audio mantap", "Interior modern"],
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
      twelveHoursLepasKunci: 260000,
      twelveHoursSopir: 380000,
      weeklyPerDay: 280000,
    },
    specs: {
      transmission: "Manual / Matic",
      capacity: 7,
      luggage: 3,
      fuel: "Bensin",
      year: 2023,
      engineCc: "1329 cc Dual VVT-i",
      hasAirConditioner: true,
      hasBluetoothAudio: true,
      hasParkingCamera: true,
    },
    photoUrl: "https://gebkkslvavgkzpjqbrsl.supabase.co/storage/v1/object/public/rental-assets/cars/photo_url/1794974651141_p5t5sn.jpg",
    badge: "Ekonomis 7 Seater",
    discountBadge: "Diskon 21%",
    shortDesc: "MPV keluarga lega, suspensi empuk, cocok untuk perjalanan dinas & liburan.",
    highlights: ["Kabin lega & senyap", "Bagasinya luas", "Sofa mode seat", "BBM efisien"],
  },
  {
    id: "toyota-avanza",
    name: "Toyota All New Avanza",
    brand: "Toyota",
    category: "MPV",
    pricing: {
      originalLepasKunci: 450000,
      lepasKunciPerDay: 350000,
      originalSopir: 580000,
      sopirPerDay: 500000,
      originalAllIn: 850000,
      allInPerDay: 720000,
      twelveHoursLepasKunci: 300000,
      twelveHoursSopir: 430000,
      weeklyPerDay: 325000,
    },
    specs: {
      transmission: "Manual / Matic",
      capacity: 7,
      luggage: 3,
      fuel: "Bensin",
      year: 2024,
      engineCc: "1329 - 1496 cc",
      hasAirConditioner: true,
      hasBluetoothAudio: true,
      hasParkingCamera: true,
    },
    photoUrl: "https://gebkkslvavgkzpjqbrsl.supabase.co/storage/v1/object/public/rental-assets/cars/photo_url/1794975210521_vhum9e.webp",
    badge: "Paling Laris",
    discountBadge: "Best Seller",
    isPopular: true,
    shortDesc: "Armada sejuta umat paling diminati. Nyaman, tangguh, dan harga sangat pas.",
    highlights: ["FWD gesit & empuk", "AC digital dingin", "Apple CarPlay ready", "Muat 7 dewasa"],
  },
  {
    id: "toyota-avanza-veloz",
    name: "Toyota Avanza Veloz",
    brand: "Toyota",
    category: "MPV",
    pricing: {
      originalLepasKunci: 450000,
      lepasKunciPerDay: 375000,
      originalSopir: 600000,
      sopirPerDay: 520000,
      originalAllIn: 880000,
      allInPerDay: 750000,
      twelveHoursLepasKunci: 320000,
      twelveHoursSopir: 450000,
      weeklyPerDay: 350000,
    },
    specs: {
      transmission: "Matic",
      capacity: 7,
      luggage: 3,
      fuel: "Bensin",
      year: 2023,
      engineCc: "1496 cc Dual VVT-i",
      hasAirConditioner: true,
      hasBluetoothAudio: true,
      hasParkingCamera: true,
    },
    photoUrl: "https://gebkkslvavgkzpjqbrsl.supabase.co/storage/v1/object/public/rental-assets/cars/photo_url/1794981698043_db5zr7.webp",
    badge: "Sporty & Elegan",
    discountBadge: "Diskon 17%",
    shortDesc: "Tampilan lebih premium dan gagah. Cocok untuk acara pernikahan dan tamu penting.",
    highlights: ["Wireless charger", "Ambient light", "Electronic parking brake", "Desain mewah"],
  },
  {
    id: "mitsubishi-xpander-ultimate",
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
      twelveHoursLepasKunci: 380000,
      twelveHoursSopir: 520000,
      weeklyPerDay: 420000,
    },
    specs: {
      transmission: "Matic",
      capacity: 7,
      luggage: 3,
      fuel: "Bensin",
      year: 2023,
      engineCc: "1499 cc MIVEC",
      hasAirConditioner: true,
      hasBluetoothAudio: true,
      hasParkingCamera: true,
    },
    photoUrl: "https://gebkkslvavgkzpjqbrsl.supabase.co/storage/v1/object/public/rental-assets/cars/photo_url/1794973302849_dzpbyb.jpg",
    badge: "Paling Nyaman",
    discountBadge: "Diskon 18%",
    isPopular: true,
    shortDesc: "Juara kenyamanan suspensi kelas MPV. Peredaman suara kabin sangat senyap.",
    highlights: ["Suspensi paling empuk", "Kabin hening", "Cruise control", "Tipe tertinggi (Ultimate)"],
  },
  {
    id: "toyota-innova-reborn",
    name: "Toyota Innova Reborn",
    brand: "Toyota",
    category: "MPV",
    pricing: {
      originalLepasKunci: 750000,
      lepasKunciPerDay: 650000,
      originalSopir: 900000,
      sopirPerDay: 800000,
      originalAllIn: 1300000,
      allInPerDay: 1100000,
      twelveHoursLepasKunci: 550000,
      twelveHoursSopir: 700000,
      weeklyPerDay: 600000,
    },
    specs: {
      transmission: "Manual / Matic",
      capacity: 7,
      luggage: 4,
      fuel: "Diesel",
      year: 2024,
      engineCc: "2393 cc Turbo Diesel (2GD)",
      hasAirConditioner: true,
      hasBluetoothAudio: true,
      hasParkingCamera: true,
    },
    photoUrl: "https://gebkkslvavgkzpjqbrsl.supabase.co/storage/v1/object/public/rental-assets/cars/photo_url/1794981269437_3i2kxu.png",
    badge: "Favorit Luar Kota",
    discountBadge: "Promo Premium",
    shortDesc: "Mesin diesel 2GD bertenaga badak. Paling nyaman & stabil untuk perjalanan jauh/VIP.",
    highlights: ["Diesel 2.4 Turbo bertenaga", "Kenyamanan eksekutif", "Kapasitas koper besar", "Idola perjalanan luar kota"],
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
