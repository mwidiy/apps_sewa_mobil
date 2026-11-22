export interface LocationArea {
  id: string;
  name: string;
  badge: string;
  deliveryTime: string;
  popularSpots: string[];
  deliveryFee: number; // 0 if near hub / pool
}

export const JABODETABEK_AREAS: LocationArea[] = [
  {
    id: "depok-cinere",
    name: "Depok & Sekitarnya (Pool Pusat)",
    badge: "Pool Utama (Cinere)",
    deliveryTime: "15 - 30 Menit",
    deliveryFee: 0,
    popularSpots: ["Pool Cinere", "Margonda Raya", "Stasiun Depok Baru", "Cimanggis", "Sawangan"],
  },
  {
    id: "jakarta-selatan",
    name: "Jakarta Selatan",
    badge: "Antar Kilat",
    deliveryTime: "30 - 45 Menit",
    deliveryFee: 50000,
    popularSpots: ["TB Simatupang & Cilandak", "Kemang & Bangka", "Stasiun MRT Blok M / Lebak Bulus", "Tebet & Pancoran", "Pondok Indah"],
  },
  {
    id: "tangerang-selatan",
    name: "Tangerang Selatan & BSD",
    badge: "Coverage Cepat",
    deliveryTime: "30 - 45 Menit",
    deliveryFee: 50000,
    popularSpots: ["BSD City", "Bintaro Jaya", "Alam Sutera", "Gading Serpong", "Pamulang / Ciputat"],
  },
  {
    id: "bandara-soetta",
    name: "Bandara Soekarno-Hatta",
    badge: "Airport Standby",
    deliveryTime: "Standby Jadwal",
    deliveryFee: 100000,
    popularSpots: ["Terminal 1", "Terminal 2D/2E/2F", "Terminal 3 Domestik / Internasional"],
  },
  {
    id: "jakarta-pusat",
    name: "Jakarta Pusat",
    badge: "Area Bisnis",
    deliveryTime: "40 - 60 Menit",
    deliveryFee: 50000,
    popularSpots: ["Stasiun Gambir", "Menteng", "Thamrin & Sudirman", "Tanah Abang", "Cempaka Putih"],
  },
  {
    id: "jakarta-barat",
    name: "Jakarta Barat",
    badge: "Tersedia",
    deliveryTime: "45 - 60 Menit",
    deliveryFee: 50000,
    popularSpots: ["Kebon Jeruk", "Puri Indah", "Grogol & Tomang", "Cengkareng", "Tanjung Duren"],
  },
  {
    id: "jakarta-timur",
    name: "Jakarta Timur",
    badge: "Tersedia",
    deliveryTime: "45 - 60 Menit",
    deliveryFee: 50000,
    popularSpots: ["Bandara Halim Perdanakusuma", "Stasiun Jatinegara", "Rawamangun", "Cibubur", "Pondok Bambu"],
  },
  {
    id: "jakarta-utara",
    name: "Jakarta Utara",
    badge: "Tersedia",
    deliveryTime: "50 - 70 Menit",
    deliveryFee: 75000,
    popularSpots: ["Kelapa Gading", "PIK (Pantai Indah Kapuk)", "Sunter", "Ancol", "Pluit"],
  },
  {
    id: "bekasi",
    name: "Kota & Kab. Bekasi",
    badge: "Tersedia",
    deliveryTime: "45 - 60 Menit",
    deliveryFee: 75000,
    popularSpots: ["Summarecon Bekasi", "Bekasi Barat", "Galaxy", "Harapan Indah", "Cikarang"],
  },
  {
    id: "bogor",
    name: "Kota Bogor & Sentul",
    badge: "Tersedia",
    deliveryTime: "45 - 60 Menit",
    deliveryFee: 75000,
    popularSpots: ["Sentul City", "Bogor Kota (Pajajaran)", "Stasiun Bogor", "Baranangsiang"],
  },
];
