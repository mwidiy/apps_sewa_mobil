export interface RequirementDoc {
  id: string;
  name: string;
  desc: string;
  isRequiredLepasKunci: boolean;
  isRequiredSopir: boolean;
  isRequiredAllIn: boolean;
}

export const REQUIREMENT_DOCS: RequirementDoc[] = [
  {
    id: "ktp",
    name: "e-KTP Asli Pemesan",
    desc: "Wajib masih berlaku untuk verifikasi identitas penyewa",
    isRequiredLepasKunci: true,
    isRequiredSopir: true,
    isRequiredAllIn: true,
  },
  {
    id: "sim_a",
    name: "SIM A Aktif",
    desc: "Wajib untuk pengemudi rental lepas kunci (self-drive)",
    isRequiredLepasKunci: true,
    isRequiredSopir: false,
    isRequiredAllIn: false,
  },
];

export const RENTAL_RULES = [
  {
    title: "Ketentuan Waktu Sewa",
    items: [
      "Perhitungan 1 hari sewa lepas kunci adalah 24 jam sejak serah terima unit.",
      "Untuk sewa dengan sopir & all-in, hitungan standar adalah 12 jam atau maksimal pukul 23:00 WIB.",
      "Overtime sewa dikenakan biaya wajar 10% per jam.",
    ],
  },
  {
    title: "Zonasi Pemakaian",
    items: [
      "Tarif dasar mencakup seluruh wilayah JABODETABEK.",
      "Tujuan luar kota (Puncak, Bandung, Anyer, Cirebon, dll) dapat dikonfirmasi saat pemesanan.",
    ],
  },
  {
    title: "Kebersihan & Kenyamanan",
    items: [
      "Dilarang keras merokok atau vape di dalam kabin kendaraan.",
      "Unit mobil diserahkan dalam keadaan bersih, wangi, dan siap pakai.",
    ],
  },
];
