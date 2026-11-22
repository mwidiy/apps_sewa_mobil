export interface RoutePreset {
  id: string;
  name: string;
  origin: string;
  destination: string;
  distanceKm: number;
  estDuration: string;
  isLuarKota: boolean;
  estTollFuel: number; // estimasi tol & bbm rute pulang pergi standard
}

export const POPULAR_ROUTES: RoutePreset[] = [
  {
    id: "jabodetabek-keliling",
    name: "Keliling Jabodetabek (Bisnis / Keluarga)",
    origin: "Jakarta & Sekitarnya",
    destination: "Area Jabodetabek (PP)",
    distanceKm: 45,
    estDuration: "1 - 2 Jam (Tergantung Macet)",
    isLuarKota: false,
    estTollFuel: 120000,
  },
  {
    id: "bandara-soetta",
    name: "Antar-Jemput Bandara Soekarno-Hatta",
    origin: "Depok / Jaksel / Sekitarnya",
    destination: "Bandara Soekarno-Hatta (Terminal 1/2/3)",
    distanceKm: 42,
    estDuration: "45 - 60 Menit",
    isLuarKota: false,
    estTollFuel: 100000,
  },
  {
    id: "bogor-puncak",
    name: "Wisata Bogor & Puncak",
    origin: "Jabodetabek Hub",
    destination: "Cisarua / Puncak Pass / Sentul",
    distanceKm: 85,
    estDuration: "1.5 - 2.5 Jam",
    isLuarKota: true,
    estTollFuel: 200000,
  },
  {
    id: "bandung-lembang",
    name: "Trip Luar Kota ke Bandung / Lembang",
    origin: "Jabodetabek Hub",
    destination: "Bandung Kota / Lembang / Ciwidey",
    distanceKm: 155,
    estDuration: "2.5 - 3.5 Jam via Tol Cipularang",
    isLuarKota: true,
    estTollFuel: 350000,
  },
  {
    id: "anyer-banten",
    name: "Wisata Pantai Anyer / Carita",
    origin: "Jabodetabek Hub",
    destination: "Pantai Anyer / Cilegon / Banten",
    distanceKm: 135,
    estDuration: "2.5 - 3 Jam via Tol Merak",
    isLuarKota: true,
    estTollFuel: 280000,
  },
  {
    id: "cirebon",
    name: "Trip Jawa Barat ke Cirebon",
    origin: "Jabodetabek Hub",
    destination: "Kota Cirebon via Tol Cipali",
    distanceKm: 220,
    estDuration: "3.5 - 4.5 Jam",
    isLuarKota: true,
    estTollFuel: 450000,
  },
];

export const POPULAR_ORIGINS = [
  "Pool DCS Cinere (Depok)",
  "Jakarta Selatan (Kemang / TB Simatupang / Blok M)",
  "Bandara Soekarno-Hatta (T1 / T2 / T3)",
  "Bandara Halim Perdanakusuma",
  "Tangerang Selatan / BSD / Bintaro",
  "Jakarta Pusat / Menteng / Gambir",
  "Jakarta Barat / Kebon Jeruk",
  "Jakarta Timur / Jatinegara / Cibubur",
  "Kota Bekasi / Harapan Indah",
  "Kota Bogor / Sentul City",
];

export const POPULAR_DESTINATIONS = [
  "Keliling Jabodetabek (Dalam Kota)",
  "Bandara Soekarno-Hatta",
  "Bandara Halim Perdanakusuma",
  "Puncak / Cisarua / Wisata Bogor",
  "Bandung Kota / Lembang",
  "Anyer / Pantai Banten",
  "Sukabumi / Pelabuhan Ratu",
  "Cirebon via Tol Cipali",
];
