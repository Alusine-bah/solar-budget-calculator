// ─────────────────────────────────────────────────────────────
// Solar Budget Calculator — Data File
// ─────────────────────────────────────────────────────────────
// Peak Sun Hours (PSH) are regional averages in kWh/m²/day.
// For precise sizing, verify with the Global Solar Atlas:
// https://globalsolaratlas.info
// ─────────────────────────────────────────────────────────────

const COUNTRIES = [
  // ── West Africa ──
  { name: "Sierra Leone",      code: "SL", currency: "SLL", psh: 5.0 },
  { name: "Nigeria",           code: "NG", currency: "NGN", psh: 5.5 },
  { name: "Ghana",             code: "GH", currency: "GHS", psh: 5.2 },
  { name: "Senegal",           code: "SN", currency: "XOF", psh: 5.8 },
  { name: "Liberia",           code: "LR", currency: "LRD", psh: 5.0 },
  { name: "Guinea",            code: "GN", currency: "GNF", psh: 5.2 },

  // ── East Africa ──
  { name: "Kenya",             code: "KE", currency: "KES", psh: 5.5 },
  { name: "Tanzania",          code: "TZ", currency: "TZS", psh: 5.6 },
  { name: "Uganda",            code: "UG", currency: "UGX", psh: 5.4 },
  { name: "Ethiopia",          code: "ET", currency: "ETB", psh: 5.6 },
  { name: "Rwanda",            code: "RW", currency: "RWF", psh: 5.2 },

  // ── Southern Africa ──
  { name: "South Africa",      code: "ZA", currency: "ZAR", psh: 5.5 },
  { name: "Zimbabwe",          code: "ZW", currency: "ZWL", psh: 5.6 },
  { name: "Zambia",            code: "ZM", currency: "ZMW", psh: 5.5 },
  { name: "Mozambique",        code: "MZ", currency: "MZN", psh: 5.4 },

  // ── North Africa ──
  { name: "Egypt",             code: "EG", currency: "EGP", psh: 6.0 },
  { name: "Morocco",           code: "MA", currency: "MAD", psh: 5.6 },
  { name: "Tunisia",           code: "TN", currency: "TND", psh: 5.5 },
  { name: "Algeria",           code: "DZ", currency: "DZD", psh: 5.8 },

  // ── South Asia ──
  { name: "Bangladesh",        code: "BD", currency: "BDT", psh: 4.5 },
  { name: "India",             code: "IN", currency: "INR", psh: 5.0 },
  { name: "Pakistan",          code: "PK", currency: "PKR", psh: 5.2 },
  { name: "Sri Lanka",         code: "LK", currency: "LKR", psh: 4.8 },
  { name: "Nepal",             code: "NP", currency: "NPR", psh: 4.7 },
  { name: "Afghanistan",       code: "AF", currency: "AFN", psh: 5.5 },

  // ── Southeast Asia ──
  { name: "Indonesia",         code: "ID", currency: "IDR", psh: 4.5 },
  { name: "Philippines",       code: "PH", currency: "PHP", psh: 4.6 },
  { name: "Vietnam",           code: "VN", currency: "VND", psh: 4.5 },
  { name: "Thailand",          code: "TH", currency: "THB", psh: 4.8 },
  { name: "Malaysia",          code: "MY", currency: "MYR", psh: 4.4 },
  { name: "Cambodia",          code: "KH", currency: "KHR", psh: 4.8 },

  // ── Middle East ──
  { name: "Saudi Arabia",      code: "SA", currency: "SAR", psh: 6.2 },
  { name: "United Arab Emirates", code: "AE", currency: "AED", psh: 6.0 },
  { name: "Jordan",            code: "JO", currency: "JOD", psh: 5.8 },
  { name: "Iraq",              code: "IQ", currency: "IQD", psh: 5.5 },
  { name: "Yemen",             code: "YE", currency: "YER", psh: 5.8 },

  // ── Latin America ──
  { name: "Brazil",            code: "BR", currency: "BRL", psh: 5.2 },
  { name: "Mexico",            code: "MX", currency: "MXN", psh: 5.5 },
  { name: "Colombia",          code: "CO", currency: "COP", psh: 4.8 },
  { name: "Peru",              code: "PE", currency: "PEN", psh: 5.5 },
  { name: "Chile",             code: "CL", currency: "CLP", psh: 5.8 },
  { name: "Argentina",         code: "AR", currency: "ARS", psh: 5.0 },

  // ── Europe ──
  { name: "Spain",             code: "ES", currency: "EUR", psh: 5.0 },
  { name: "Portugal",          code: "PT", currency: "EUR", psh: 5.0 },
  { name: "Italy",             code: "IT", currency: "EUR", psh: 4.5 },
  { name: "Greece",            code: "GR", currency: "EUR", psh: 4.8 },
  { name: "Germany",           code: "DE", currency: "EUR", psh: 3.2 },

  // ── Asia-Pacific (Developed) ──
  { name: "Australia",         code: "AU", currency: "AUD", psh: 5.5 },
  { name: "Japan",             code: "JP", currency: "JPY", psh: 3.8 },
  { name: "South Korea",       code: "KR", currency: "KRW", psh: 3.8 },
  { name: "China",             code: "CN", currency: "CNY", psh: 4.5 },
];

// ── Exchange rates (approximate, base USD) ──
// Update these periodically or connect to a live API later.
const EXCHANGE_RATES = {
  USD: 1,
  SLL: 22500,
  NGN: 1550,
  GHS: 15.5,
  XOF: 605,
  LRD: 190,
  GNF: 8600,
  KES: 129,
  TZS: 2650,
  UGX: 3700,
  ETB: 57,
  RWF: 1350,
  ZAR: 18.5,
  ZWL: 25,
  ZMW: 27,
  MZN: 64,
  EGP: 48,
  MAD: 10,
  TND: 3.1,
  DZD: 135,
  BDT: 120,
  INR: 84,
  PKR: 278,
  LKR: 295,
  NPR: 134,
  AFN: 70,
  IDR: 15800,
  PHP: 58,
  VND: 25000,
  THB: 35,
  MYR: 4.5,
  KHR: 4100,
  SAR: 3.75,
  AED: 3.67,
  JOD: 0.71,
  IQD: 1310,
  YER: 250,
  BRL: 5.5,
  MXN: 18,
  COP: 4100,
  PEN: 3.8,
  CLP: 950,
  ARS: 950,
  EUR: 0.92,
  AUD: 1.5,
  JPY: 150,
  KRW: 1350,
  CNY: 7.2,
};

// ── Currency display names for the dropdown ──
const CURRENCY_NAMES = {
  USD: "USD — US Dollar",
  SLL: "SLL — Sierra Leonean Leone",
  NGN: "NGN — Nigerian Naira",
  GHS: "GHS — Ghanaian Cedi",
  XOF: "XOF — West African CFA Franc",
  LRD: "LRD — Liberian Dollar",
  GNF: "GNF — Guinean Franc",
  KES: "KES — Kenyan Shilling",
  TZS: "TZS — Tanzanian Shilling",
  UGX: "UGX — Ugandan Shilling",
  ETB: "ETB — Ethiopian Birr",
  RWF: "RWF — Rwandan Franc",
  ZAR: "ZAR — South African Rand",
  ZWL: "ZWL — Zimbabwean Dollar",
  ZMW: "ZMW — Zambian Kwacha",
  MZN: "MZN — Mozambican Metical",
  EGP: "EGP — Egyptian Pound",
  MAD: "MAD — Moroccan Dirham",
  TND: "TND — Tunisian Dinar",
  DZD: "DZD — Algerian Dinar",
  BDT: "BDT — Bangladeshi Taka",
  INR: "INR — Indian Rupee",
  PKR: "PKR — Pakistani Rupee",
  LKR: "LKR — Sri Lankan Rupee",
  NPR: "NPR — Nepalese Rupee",
  AFN: "AFN — Afghan Afghani",
  IDR: "IDR — Indonesian Rupiah",
  PHP: "PHP — Philippine Peso",
  VND: "VND — Vietnamese Dong",
  THB: "THB — Thai Baht",
  MYR: "MYR — Malaysian Ringgit",
  KHR: "KHR — Cambodian Riel",
  SAR: "SAR — Saudi Riyal",
  AED: "AED — UAE Dirham",
  JOD: "JOD — Jordanian Dinar",
  IQD: "IQD — Iraqi Dinar",
  YER: "YER — Yemeni Rial",
  BRL: "BRL — Brazilian Real",
  MXN: "MXN — Mexican Peso",
  COP: "COP — Colombian Peso",
  PEN: "PEN — Peruvian Sol",
  CLP: "CLP — Chilean Peso",
  ARS: "ARS — Argentine Peso",
  EUR: "EUR — Euro",
  AUD: "AUD — Australian Dollar",
  JPY: "JPY — Japanese Yen",
  KRW: "KRW — South Korean Won",
  CNY: "CNY — Chinese Yuan",
};