export interface RequirementDoc {
  id: string;
  name: string;
  desc: string;
  isRequiredLepasKunci: boolean;
  isRequiredSopir: boolean;
  isRequiredAllIn: boolean;
  category: "identitas" | "pendukung" | "jaminan";
}

export const REQUIREMENT_DOCS: RequirementDoc[] = [
  {
    id: "ktp",
    name: "e-KTP Asli Pemesan",
    desc: "Wajib masih aktif & nama sesuai pemesan",
    isRequiredLepasKunci: true,
    isRequiredSopir: true,
    isRequiredAllIn: true,
    category: "identitas",
  },
  {
    id: "sim_a",
    name: "SIM A Aktif",
    desc: "Wajib untuk pengemudi lepas kunci",
    isRequiredLepasKunci: true,
    isRequiredSopir: false,
    isRequiredAllIn: false,
    category: "identitas",
  },
  {
    id: "id_kerja",
    name: "ID Card Karyawan / Kartu Nama / Slip Gaji",
    desc: "Sebagai bukti domisili & profesi",
    isRequiredLepasKunci: true,
    isRequiredSopir: false,
    isRequiredAllIn: false,
    category: "pendukung",
  },
  {
    id: "medsos",
    name: "Akun Media Sosial Aktif (IG / LinkedIn)",
    desc: "Akun aktif non-privat untuk verifikasi cepat",
    isRequiredLepasKunci: true,
    isRequiredSopir: false,
    isRequiredAllIn: false,
    category: "pendukung",
  },
  {
    id: "motor_deposit",
    name: "Motor + STNK atau Deposit Jaminan",
    desc: "Ditinggal saat serah terima unit / ditransfer",
    isRequiredLepasKunci: true,
    isRequiredSopir: false,
    isRequiredAllIn: false,
    category: "jaminan",
  },
];

export const RENTAL_RULES = [
  {
    title: "Ketentuan Waktu Sewa",
    items: [
      "Perhitungan 1 hari sewa adalah 24 jam terhitung dari jam serah terima unit (untuk lepas kunci).",
      "Untuk sewa dengan sopir & all-in, hitungan standar adalah 12 jam atau maksimal hingga pukul 23:00 WIB di hari yang sama.",
      "Overtime sewa dikenakan 10% dari tarif harian per jam.",
    ],
  },
  {
    title: "Zonasi Pemakaian",
    items: [
      "Tarif dasar mencakup area operasional JABODETABEK.",
      "Untuk tujuan luar kota (Bandung, Jawa Barat, Jawa Tengah), silakan konfirmasi saat booking untuk penyesuaian tarif.",
    ],
  },
  {
    title: "Larangan & Kebersihan",
    items: [
      "Dilarang keras merokok atau vape di dalam kabin mobil.",
      "Dilarang membawa barang berbau menyengat (durian, seafood basah tanpa wadah kedap).",
      "Mobil diserahkan dalam keadaan bersih dan wajib dikembalikan dalam kondisi wajar.",
    ],
  },
];
