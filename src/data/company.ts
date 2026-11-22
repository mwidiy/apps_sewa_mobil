export interface CompanyInfo {
  name: string;
  shortName: string;
  tagline: string;
  whatsapp: string;
  whatsappDisplay: string;
  phone: string;
  email: string;
  address: {
    street: string;
    subdistrict: string;
    city: string;
    province: string;
    fullAddress: string;
  };
  mapsUrl: string;
  operationalHours: string;
  ratingValue: number;
  reviewCount: number;
}

export const COMPANY: CompanyInfo = {
  name: "DCS Rent Car Mobile",
  shortName: "DCS Rent Car",
  tagline: "Sewa Mobil Harian Jabodetabek - Lepas Kunci, Supir & All-In",
  whatsapp: "6282114254460",
  whatsappDisplay: "0821-1425-4460",
  phone: "0821-1425-4460",
  email: "rentaldcs@gmail.com",
  address: {
    street: "Gg. Masjid No.12",
    subdistrict: "Cinere",
    city: "Kota Depok",
    province: "Jawa Barat",
    fullAddress: "Gg. Masjid No.12, Cinere, Kota Depok, Jawa Barat 16514 (Hub Utama Jabodetabek)",
  },
  mapsUrl: "https://maps.app.goo.gl/MUGFZb6Wz3dKkRkr9?g_st=ac",
  operationalHours: "Layanan 24 Jam (Antar-Jemput Standby)",
  ratingValue: 4.9,
  reviewCount: 524,
};

export type RentalServiceType = "lepas_kunci" | "dengan_sopir" | "all_in";

export interface BookingPayload {
  carName: string;
  serviceType: RentalServiceType;
  durationDays: number;
  startDate: string;
  startTime: string;
  pickupLocation: string;
  customLocationDetail?: string;
  needDelivery: boolean;
  notes?: string;
  estimatedPrice: number;
}

export function generateWhatsAppBookingUrl(booking: BookingPayload): string {
  const serviceLabelMap: Record<RentalServiceType, string> = {
    lepas_kunci: "🔑 Lepas Kunci (Self-Drive)",
    dengan_sopir: "👨‍✈️ Dengan Sopir (Driver Standby)",
    all_in: "✨ All-In (Sopir + BBM + Tol/Parkir)",
  };

  const lines = [
    `*FORM ORDER SEWA MOBIL - DCS RENT CAR*`,
    `----------------------------------------`,
    `🚗 *Unit Mobil*: ${booking.carName}`,
    `📋 *Paket Layanan*: ${serviceLabelMap[booking.serviceType]}`,
    `📅 *Tanggal Mulai*: ${booking.startDate || "Menyesuaikan"}`,
    `⏰ *Jam Ambil/Jemput*: ${booking.startTime || "09:00 WIB"}`,
    `⏳ *Durasi*: ${booking.durationDays} Hari`,
    `📍 *Titik Lokasi*: ${booking.needDelivery ? `Antar ke ${booking.pickupLocation}` : "Ambil Sendiri di Pool Cinere"}`,
  ];

  if (booking.customLocationDetail) {
    lines.push(`📝 *Detail Alamat*: ${booking.customLocationDetail}`);
  }

  lines.push(
    `💰 *Estimasi Total*: Rp ${booking.estimatedPrice.toLocaleString("id-ID")}`,
    `----------------------------------------`,
    `Halo Admin DCS, saya mau order rental via Aplikasi Mobile. Apakah unit dan jadwal ini ready? Mohon info kelanjutan verifikasinya ya. Terima kasih!`
  );

  const fullText = lines.join("\n");
  return `https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent(fullText)}`;
}

export function getGeneralWhatsAppUrl(message?: string): string {
  const text = message || "Halo Admin DCS Rent Car, saya ingin konsultasi sewa mobil harian di Jabodetabek.";
  return `https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent(text)}`;
}

export function getEmergencyWhatsAppUrl(): string {
  const text = "🚨 *DARURAT PENYEWA DCS*: Halo Tim Support DCS, saya sedang menggunakan unit sewa dan membutuhkan bantuan darurat / technical support sekarang.";
  return `https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent(text)}`;
}
