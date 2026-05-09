import { useState, useEffect, useCallback, useRef } from "react";

const FIAT_CURRENCIES = {
  AED: { name: "Emirati Dirham", symbol: "د.إ", flag: "🇦🇪" },
  AFN: { name: "Afghan Afghani", symbol: "؋", flag: "🇦🇫" },
  ALL: { name: "Albanian Lek", symbol: "L", flag: "🇦🇱" },
  AMD: { name: "Armenian Dram", symbol: "֏", flag: "🇦🇲" },
  ANG: { name: "Dutch Guilder", symbol: "ƒ", flag: "🇨🇼" },
  AOA: { name: "Angolan Kwanza", symbol: "Kz", flag: "🇦🇴" },
  ARS: { name: "Argentine Peso", symbol: "$", flag: "🇦🇷" },
  AUD: { name: "Australian Dollar", symbol: "A$", flag: "🇦🇺" },
  AWG: { name: "Aruban Guilder", symbol: "ƒ", flag: "🇦🇼" },
  AZN: { name: "Azerbaijan Manat", symbol: "₼", flag: "🇦🇿" },
  BAM: { name: "Bosnian Mark", symbol: "KM", flag: "🇧🇦" },
  BBD: { name: "Barbadian Dollar", symbol: "$", flag: "🇧🇧" },
  BDT: { name: "Bangladeshi Taka", symbol: "৳", flag: "🇧🇩" },
  BGN: { name: "Bulgarian Lev", symbol: "лв", flag: "🇧🇬" },
  BHD: { name: "Bahraini Dinar", symbol: "BD", flag: "🇧🇭" },
  BIF: { name: "Burundian Franc", symbol: "FBu", flag: "🇧🇮" },
  BMD: { name: "Bermudian Dollar", symbol: "$", flag: "🇧🇲" },
  BND: { name: "Bruneian Dollar", symbol: "B$", flag: "🇧🇳" },
  BOB: { name: "Bolivian Boliviano", symbol: "Bs", flag: "🇧🇴" },
  BRL: { name: "Brazilian Real", symbol: "R$", flag: "🇧🇷" },
  BSD: { name: "Bahamian Dollar", symbol: "$", flag: "🇧🇸" },
  BTN: { name: "Bhutanese Ngultrum", symbol: "Nu", flag: "🇧🇹" },
  BWP: { name: "Botswana Pula", symbol: "P", flag: "🇧🇼" },
  BYN: { name: "Belarusian Ruble", symbol: "Br", flag: "🇧🇾" },
  BZD: { name: "Belizean Dollar", symbol: "BZ$", flag: "🇧🇿" },
  CAD: { name: "Canadian Dollar", symbol: "C$", flag: "🇨🇦" },
  CDF: { name: "Congolese Franc", symbol: "FC", flag: "🇨🇩" },
  CHF: { name: "Swiss Franc", symbol: "Fr", flag: "🇨🇭" },
  CLP: { name: "Chilean Peso", symbol: "$", flag: "🇨🇱" },
  CNY: { name: "Chinese Yuan", symbol: "¥", flag: "🇨🇳" },
  COP: { name: "Colombian Peso", symbol: "$", flag: "🇨🇴" },
  CRC: { name: "Costa Rican Colon", symbol: "₡", flag: "🇨🇷" },
  CUP: { name: "Cuban Peso", symbol: "$", flag: "🇨🇺" },
  CVE: { name: "Cape Verdean Escudo", symbol: "$", flag: "🇨🇻" },
  CZK: { name: "Czech Koruna", symbol: "Kč", flag: "🇨🇿" },
  DJF: { name: "Djiboutian Franc", symbol: "Fdj", flag: "🇩🇯" },
  DKK: { name: "Danish Krone", symbol: "kr", flag: "🇩🇰" },
  DOP: { name: "Dominican Peso", symbol: "RD$", flag: "🇩🇴" },
  DZD: { name: "Algerian Dinar", symbol: "د.ج", flag: "🇩🇿" },
  EGP: { name: "Egyptian Pound", symbol: "E£", flag: "🇪🇬" },
  ERN: { name: "Eritrean Nakfa", symbol: "Nfk", flag: "🇪🇷" },
  ETB: { name: "Ethiopian Birr", symbol: "Br", flag: "🇪🇹" },
  EUR: { name: "Euro", symbol: "€", flag: "🇪🇺" },
  FJD: { name: "Fijian Dollar", symbol: "FJ$", flag: "🇫🇯" },
  FKP: { name: "Falkland Island Pound", symbol: "£", flag: "🇫🇰" },
  GBP: { name: "British Pound", symbol: "£", flag: "🇬🇧" },
  GEL: { name: "Georgian Lari", symbol: "₾", flag: "🇬🇪" },
  GHS: { name: "Ghanaian Cedi", symbol: "GH₵", flag: "🇬🇭" },
  GIP: { name: "Gibraltar Pound", symbol: "£", flag: "🇬🇮" },
  GMD: { name: "Gambian Dalasi", symbol: "D", flag: "🇬🇲" },
  GNF: { name: "Guinean Franc", symbol: "FG", flag: "🇬🇳" },
  GTQ: { name: "Guatemalan Quetzal", symbol: "Q", flag: "🇬🇹" },
  GYD: { name: "Guyanese Dollar", symbol: "GY$", flag: "🇬🇾" },
  HKD: { name: "Hong Kong Dollar", symbol: "HK$", flag: "🇭🇰" },
  HNL: { name: "Honduran Lempira", symbol: "L", flag: "🇭🇳" },
  HRK: { name: "Croatian Kuna", symbol: "kn", flag: "🇭🇷" },
  HTG: { name: "Haitian Gourde", symbol: "G", flag: "🇭🇹" },
  HUF: { name: "Hungarian Forint", symbol: "Ft", flag: "🇭🇺" },
  IDR: { name: "Indonesian Rupiah", symbol: "Rp", flag: "🇮🇩" },
  ILS: { name: "Israeli Shekel", symbol: "₪", flag: "🇮🇱" },
  INR: { name: "Indian Rupee", symbol: "₹", flag: "🇮🇳" },
  IQD: { name: "Iraqi Dinar", symbol: "ع.د", flag: "🇮🇶" },
  IRR: { name: "Iranian Rial", symbol: "﷼", flag: "🇮🇷" },
  ISK: { name: "Icelandic Krona", symbol: "kr", flag: "🇮🇸" },
  JMD: { name: "Jamaican Dollar", symbol: "J$", flag: "🇯🇲" },
  JOD: { name: "Jordanian Dinar", symbol: "JD", flag: "🇯🇴" },
  JPY: { name: "Japanese Yen", symbol: "¥", flag: "🇯🇵" },
  KES: { name: "Kenyan Shilling", symbol: "KSh", flag: "🇰🇪" },
  KGS: { name: "Kyrgyzstani Som", symbol: "С", flag: "🇰🇬" },
  KHR: { name: "Cambodian Riel", symbol: "៛", flag: "🇰🇭" },
  KMF: { name: "Comorian Franc", symbol: "CF", flag: "🇰🇲" },
  KPW: { name: "North Korean Won", symbol: "₩", flag: "🇰🇵" },
  KRW: { name: "South Korean Won", symbol: "₩", flag: "🇰🇷" },
  KWD: { name: "Kuwaiti Dinar", symbol: "KD", flag: "🇰🇼" },
  KYD: { name: "Caymanian Dollar", symbol: "CI$", flag: "🇰🇾" },
  KZT: { name: "Kazakhstani Tenge", symbol: "₸", flag: "🇰🇿" },
  LAK: { name: "Lao Kip", symbol: "₭", flag: "🇱🇦" },
  LBP: { name: "Lebanese Pound", symbol: "ل.ل", flag: "🇱🇧" },
  LKR: { name: "Sri Lankan Rupee", symbol: "Rs", flag: "🇱🇰" },
  LRD: { name: "Liberian Dollar", symbol: "L$", flag: "🇱🇷" },
  LSL: { name: "Basotho Loti", symbol: "L", flag: "🇱🇸" },
  LYD: { name: "Libyan Dinar", symbol: "LD", flag: "🇱🇾" },
  MAD: { name: "Moroccan Dirham", symbol: "MAD", flag: "🇲🇦" },
  MDL: { name: "Moldovan Leu", symbol: "L", flag: "🇲🇩" },
  MGA: { name: "Malagasy Ariary", symbol: "Ar", flag: "🇲🇬" },
  MKD: { name: "Macedonian Denar", symbol: "ден", flag: "🇲🇰" },
  MMK: { name: "Burmese Kyat", symbol: "K", flag: "🇲🇲" },
  MNT: { name: "Mongolian Tughrik", symbol: "₮", flag: "🇲🇳" },
  MOP: { name: "Macau Pataca", symbol: "MOP$", flag: "🇲🇴" },
  MRU: { name: "Mauritanian Ouguiya", symbol: "UM", flag: "🇲🇷" },
  MUR: { name: "Mauritian Rupee", symbol: "Rs", flag: "🇲🇺" },
  MVR: { name: "Maldivian Rufiyaa", symbol: "Rf", flag: "🇲🇻" },
  MWK: { name: "Malawian Kwacha", symbol: "MK", flag: "🇲🇼" },
  MXN: { name: "Mexican Peso", symbol: "MX$", flag: "🇲🇽" },
  MYR: { name: "Malaysian Ringgit", symbol: "RM", flag: "🇲🇾" },
  MZN: { name: "Mozambican Metical", symbol: "MT", flag: "🇲🇿" },
  NAD: { name: "Namibian Dollar", symbol: "N$", flag: "🇳🇦" },
  NGN: { name: "Nigerian Naira", symbol: "₦", flag: "🇳🇬" },
  NIO: { name: "Nicaraguan Cordoba", symbol: "C$", flag: "🇳🇮" },
  NOK: { name: "Norwegian Krone", symbol: "kr", flag: "🇳🇴" },
  NPR: { name: "Nepalese Rupee", symbol: "Rs", flag: "🇳🇵" },
  NZD: { name: "New Zealand Dollar", symbol: "NZ$", flag: "🇳🇿" },
  OMR: { name: "Omani Rial", symbol: "OMR", flag: "🇴🇲" },
  PAB: { name: "Panamanian Balboa", symbol: "B/.", flag: "🇵🇦" },
  PEN: { name: "Peruvian Sol", symbol: "S/.", flag: "🇵🇪" },
  PGK: { name: "Papua New Guinean Kina", symbol: "K", flag: "🇵🇬" },
  PHP: { name: "Philippine Peso", symbol: "₱", flag: "🇵🇭" },
  PKR: { name: "Pakistani Rupee", symbol: "Rs", flag: "🇵🇰" },
  PLN: { name: "Polish Zloty", symbol: "zł", flag: "🇵🇱" },
  PYG: { name: "Paraguayan Guarani", symbol: "₲", flag: "🇵🇾" },
  QAR: { name: "Qatari Riyal", symbol: "QR", flag: "🇶🇦" },
  RON: { name: "Romanian Leu", symbol: "lei", flag: "🇷🇴" },
  RSD: { name: "Serbian Dinar", symbol: "din", flag: "🇷🇸" },
  RUB: { name: "Russian Ruble", symbol: "₽", flag: "🇷🇺" },
  RWF: { name: "Rwandan Franc", symbol: "RF", flag: "🇷🇼" },
  SAR: { name: "Saudi Riyal", symbol: "SR", flag: "🇸🇦" },
  SBD: { name: "Solomon Islands Dollar", symbol: "SI$", flag: "🇸🇧" },
  SCR: { name: "Seychellois Rupee", symbol: "Rs", flag: "🇸🇨" },
  SDG: { name: "Sudanese Pound", symbol: "£", flag: "🇸🇩" },
  SEK: { name: "Swedish Krona", symbol: "kr", flag: "🇸🇪" },
  SGD: { name: "Singapore Dollar", symbol: "S$", flag: "🇸🇬" },
  SHP: { name: "Saint Helena Pound", symbol: "£", flag: "🇸🇭" },
  SLE: { name: "Sierra Leonean Leone", symbol: "Le", flag: "🇸🇱" },
  SOS: { name: "Somali Shilling", symbol: "Sh", flag: "🇸🇴" },
  SRD: { name: "Surinamese Dollar", symbol: "SR$", flag: "🇸🇷" },
  SSP: { name: "South Sudanese Pound", symbol: "SS£", flag: "🇸🇸" },
  STN: { name: "São Tomé Dobra", symbol: "Db", flag: "🇸🇹" },
  SYP: { name: "Syrian Pound", symbol: "S£", flag: "🇸🇾" },
  SZL: { name: "Swazi Lilangeni", symbol: "E", flag: "🇸🇿" },
  THB: { name: "Thai Baht", symbol: "฿", flag: "🇹🇭" },
  TJS: { name: "Tajikistani Somoni", symbol: "SM", flag: "🇹🇯" },
  TMT: { name: "Turkmenistani Manat", symbol: "T", flag: "🇹🇲" },
  TND: { name: "Tunisian Dinar", symbol: "DT", flag: "🇹🇳" },
  TOP: { name: "Tongan Pa'anga", symbol: "T$", flag: "🇹🇴" },
  TRY: { name: "Turkish Lira", symbol: "₺", flag: "🇹🇷" },
  TTD: { name: "Trinidadian Dollar", symbol: "TT$", flag: "🇹🇹" },
  TWD: { name: "Taiwan Dollar", symbol: "NT$", flag: "🇹🇼" },
  TZS: { name: "Tanzanian Shilling", symbol: "TSh", flag: "🇹🇿" },
  UAH: { name: "Ukrainian Hryvnia", symbol: "₴", flag: "🇺🇦" },
  UGX: { name: "Ugandan Shilling", symbol: "USh", flag: "🇺🇬" },
  USD: { name: "US Dollar", symbol: "$", flag: "🇺🇸" },
  UYU: { name: "Uruguayan Peso", symbol: "$U", flag: "🇺🇾" },
  UZS: { name: "Uzbekistani Som", symbol: "сўм", flag: "🇺🇿" },
  VES: { name: "Venezuelan Bolívar", symbol: "Bs.S", flag: "🇻🇪" },
  VND: { name: "Vietnamese Dong", symbol: "₫", flag: "🇻🇳" },
  VUV: { name: "Ni-Vanuatu Vatu", symbol: "VT", flag: "🇻🇺" },
  WST: { name: "Samoan Tala", symbol: "WS$", flag: "🇼🇸" },
  XAF: { name: "Central African CFA", symbol: "FCFA", flag: "🇨🇲" },
  XCD: { name: "East Caribbean Dollar", symbol: "EC$", flag: "🇦🇬" },
  XOF: { name: "West African CFA", symbol: "CFA", flag: "🇸🇳" },
  XPF: { name: "CFP Franc", symbol: "₣", flag: "🇵🇫" },
  YER: { name: "Yemeni Rial", symbol: "YR", flag: "🇾🇪" },
  ZAR: { name: "South African Rand", symbol: "R", flag: "🇿🇦" },
  ZMW: { name: "Zambian Kwacha", symbol: "ZK", flag: "🇿🇲" },
  ZWL: { name: "Zimbabwean Dollar", symbol: "Z$", flag: "🇿🇼" },
};

const ALL_CODES = Object.keys(FIAT_CURRENCIES).sort();
const DEFAULT_FAVS = ["GBP", "EUR", "USD", "CHF", "JPY", "AUD", "THB"];
const ZERO_DECIMAL = new Set(["JPY","KRW","HUF","ISK","IDR","VND","CLP","PYG","UGX","GNF","KMF","RWF","XAF","XOF","XPF","VUV","BIF","DJF","MGA","IQD","IRR","LAK","MMK","KPW","SYP","SOS","LBP","STN","MWK","SLE","SSP","SDG","CDF","HTG","KHR","UZS","TZS"]);

const API_PRIMARY = "https://latest.currency-api.pages.dev/v1/currencies";
const API_FALLBACK = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

// Build-time constants injected by Vite (see vite.config.js).
const APP_VERSION = typeof __APP_VERSION__ !== "undefined" ? __APP_VERSION__ : "dev";
const BUILD_DATE_ISO = typeof __BUILD_DATE__ !== "undefined" ? __BUILD_DATE__ : new Date().toISOString();
const BUILD_DATE_FMT = BUILD_DATE_ISO.slice(0, 10);
// Captured once at module load, i.e. when the page is (re)freshed.
const REFRESH_TIME_FMT = new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit" });

// Use localStorage for favourites persistence (works in PWA / browser)
function loadFavs() {
  try {
    const stored = localStorage.getItem("fx-favs");
    return stored ? JSON.parse(stored) : DEFAULT_FAVS;
  } catch { return DEFAULT_FAVS; }
}
function storeFavs(favs) {
  try { localStorage.setItem("fx-favs", JSON.stringify(favs)); } catch {}
}

const RECENTS_LIMIT = 8;
function loadRecents() {
  try {
    const stored = localStorage.getItem("fx-recents");
    const parsed = stored ? JSON.parse(stored) : [];
    return Array.isArray(parsed) ? parsed.filter(c => FIAT_CURRENCIES[c]).slice(0, RECENTS_LIMIT) : [];
  } catch { return []; }
}
function storeRecents(r) {
  try { localStorage.setItem("fx-recents", JSON.stringify(r)); } catch {}
}

function fmt(num, cur) {
  if (isNaN(num) || num === 0) return "0";
  const d = ZERO_DECIMAL.has(cur) ? 0 : 2;
  return num.toLocaleString("en-GB", { minimumFractionDigits: d, maximumFractionDigits: d });
}

async function fetchRates(base) {
  const c = base.toLowerCase();
  try {
    const r = await fetch(`${API_PRIMARY}/${c}.min.json`);
    if (!r.ok) throw new Error();
    return await r.json();
  } catch {
    const r = await fetch(`${API_FALLBACK}/${c}.min.json`);
    if (!r.ok) throw new Error("Failed");
    return await r.json();
  }
}

/* ─── Currency Picker ─── */
function Picker({ isOpen, onClose, onSelect, selected, favourites, recents, onToggleFav, title }) {
  const [search, setSearch] = useState("");
  const ref = useRef(null);

  useEffect(() => {
    if (!isOpen) setSearch("");
  }, [isOpen]);

  if (!isOpen) return null;

  const q = search.toLowerCase();
  const matches = c => c.toLowerCase().includes(q) || FIAT_CURRENCIES[c].name.toLowerCase().includes(q);
  // Recents shown at the top so a freshly-picked currency is one tap from
  // being starred. Exclude codes that are already favourites — they live in
  // their own section just below and would otherwise duplicate.
  const recentList = recents.filter(c => FIAT_CURRENCIES[c] && !favourites.includes(c) && matches(c));
  const recentSet = new Set(recentList);
  const filtered = ALL_CODES.filter(matches);
  const favs = filtered.filter(c => favourites.includes(c));
  const rest = filtered.filter(c => !favourites.includes(c) && !recentSet.has(c));

  const Row = ({ code }) => {
    const cur = FIAT_CURRENCIES[code];
    const isFav = favourites.includes(code);
    return (
      <div
        onClick={() => onSelect(code)}
        style={{
          display: "flex", alignItems: "center", padding: "10px 8px",
          borderRadius: 10, cursor: "pointer", gap: 10,
          background: selected === code ? "#1e3a5f" : "transparent",
        }}
      >
        <span style={{ fontSize: 22 }}>{cur.flag}</span>
        <div style={{ flex: 1, minWidth: 0, overflow: "hidden" }}>
          <span style={{ color: "#e5e7eb", fontWeight: 600, fontSize: 15, fontFamily: "var(--mono)" }}>{code}</span>
          <span style={{ color: "#6b7280", fontSize: 13, marginLeft: 8 }}>{cur.name}</span>
        </div>
        <button
          onClick={e => { e.stopPropagation(); onToggleFav(code); }}
          style={{ background: "none", border: "none", cursor: "pointer", fontSize: 18, padding: 4, color: isFav ? "#f59e0b" : "#4b5563", flexShrink: 0 }}
        >{isFav ? "★" : "☆"}</button>
      </div>
    );
  };

  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 100, background: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)", display: "flex", alignItems: "flex-start", justifyContent: "center" }}>
      <div onClick={e => e.stopPropagation()} style={{ width: "100%", maxWidth: 440, maxHeight: "85vh", background: "#1a1d23", borderRadius: "0 0 20px 20px", display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <div style={{ padding: "16px 20px 12px", borderBottom: "1px solid #2a2d35" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <span style={{ color: "#9ca3af", fontSize: 13, fontWeight: 600, textTransform: "uppercase", letterSpacing: 1 }}>{title}</span>
            <button onClick={onClose} style={{ background: "#2a2d35", border: "none", color: "#9ca3af", width: 32, height: 32, borderRadius: 8, cursor: "pointer", fontSize: 18 }}>✕</button>
          </div>
          <input
            ref={ref} value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search currencies..."
            style={{ width: "100%", padding: "10px 14px", background: "#0d0f13", border: "1px solid #2a2d35", borderRadius: 10, color: "#e5e7eb", fontSize: 14, outline: "none", boxSizing: "border-box", fontFamily: "var(--mono)" }}
          />
        </div>
        <div style={{ overflowY: "auto", flex: 1, padding: "8px 12px 20px", WebkitOverflowScrolling: "touch" }}>
          {recentList.length > 0 && (
            <>
              <div style={{ padding: "8px 8px 4px", color: "#9ca3af", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1 }}>↻ Recent</div>
              {recentList.map(c => <Row key={`recent-${c}`} code={c} />)}
              <div style={{ height: 1, background: "#2a2d35", margin: "8px 0" }} />
            </>
          )}
          {favs.length > 0 && (
            <>
              <div style={{ padding: "8px 8px 4px", color: "#f59e0b", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1 }}>★ Favourites</div>
              {favs.map(c => <Row key={c} code={c} />)}
              <div style={{ height: 1, background: "#2a2d35", margin: "8px 0" }} />
            </>
          )}
          <div style={{ padding: "8px 8px 4px", color: "#6b7280", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1 }}>All ({rest.length})</div>
          {rest.map(c => <Row key={c} code={c} />)}
        </div>
      </div>
    </div>
  );
}

/* ─── Main App ─── */
export default function App() {
  const [amount, setAmount] = useState("1");
  const [from, setFrom] = useState("GBP");
  const [to, setTo] = useState("EUR");
  const [rates, setRates] = useState(null);
  const [rateDate, setRateDate] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favs, setFavs] = useState(loadFavs);
  const [recents, setRecents] = useState(loadRecents);
  const [picker, setPicker] = useState(null);

  const saveFavs = useCallback((f) => {
    setFavs(f);
    storeFavs(f);
  }, []);

  const pushRecent = useCallback((code) => {
    setRecents(prev => {
      const next = [code, ...prev.filter(c => c !== code)].slice(0, RECENTS_LIMIT);
      storeRecents(next);
      return next;
    });
  }, []);

  useEffect(() => {
    let dead = false;
    setLoading(true); setError(null);
    fetchRates(from).then(data => {
      if (dead) return;
      const obj = data[from.toLowerCase()] || {};
      const norm = {};
      for (const c of ALL_CODES) {
        const v = obj[c.toLowerCase()];
        if (v != null && v > 0) norm[c] = v;
      }
      norm[from] = 1;
      setRates(norm);
      setRateDate(data.date || "daily");
      setLoading(false);
    }).catch(() => {
      if (!dead) { setError("Network error — check connection"); setLoading(false); }
    });
    return () => { dead = true; };
  }, [from]);

  const num = parseFloat(amount) || 0;
  const rate = rates?.[to] ?? 0;
  const converted = num * rate;

  const keypad = (key) => {
    setAmount(prev => {
      if (key === "C") return "0";
      if (key === "⌫") return prev.length <= 1 ? "0" : prev.slice(0, -1);
      if (key === ".") return prev.includes(".") ? prev : prev + ".";
      if (prev === "0" && key !== ".") return key;
      if (prev.includes(".") && prev.split(".")[1]?.length >= 2) return prev;
      if (prev.length >= 12) return prev;
      return prev + key;
    });
  };

  const swap = () => { setFrom(to); setTo(from); };
  const toggleFav = c => saveFavs(favs.includes(c) ? favs.filter(x => x !== c) : [...favs, c]);

  const keys = [["7","8","9","⌫"],["4","5","6","C"],["1","2","3","."],["00","0",null,null]];
  const fi = FIAT_CURRENCIES[from], ti = FIAT_CURRENCIES[to];

  return (
    <div style={{ "--mono": "'JetBrains Mono','SF Mono',monospace", minHeight: "100vh", background: "linear-gradient(180deg,#0d0f13,#141720)", color: "#e5e7eb", fontFamily: "'SF Pro Display',-apple-system,'Segoe UI',sans-serif", display: "flex", flexDirection: "column", maxWidth: 440, margin: "0 auto" }}>

      {/* Header */}
      <div style={{ padding: "16px 20px 8px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: "#f1f5f9", letterSpacing: -0.5 }}>FX Convert</h1>
          <span style={{ fontSize: 11, color: "#6b7280", fontFamily: "var(--mono)" }}>{ALL_CODES.length} currencies · mid-market</span>
        </div>
        {rateDate && <span style={{ fontSize: 11, color: "#4b5563", background: "#1a1d23", padding: "4px 10px", borderRadius: 6, fontFamily: "var(--mono)" }}>{rateDate}</span>}
      </div>

      <div style={{ padding: "12px 20px 0" }}>
        {/* FROM */}
        <div style={{ background: "#1a1d23", border: "1px solid #2563eb", borderRadius: 14, padding: "14px 16px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <button onClick={() => setPicker("from")} style={{ background: "#22252d", border: "1px solid #2a2d35", borderRadius: 10, padding: "6px 12px", cursor: "pointer", display: "flex", alignItems: "center", gap: 6, color: "#e5e7eb" }}>
              <span style={{ fontSize: 20 }}>{fi.flag}</span>
              <span style={{ fontWeight: 700, fontSize: 15, fontFamily: "var(--mono)" }}>{from}</span>
              <span style={{ color: "#6b7280", fontSize: 12 }}>▼</span>
            </button>
            <span style={{ fontSize: num > 999999 ? 22 : 28, fontWeight: 700, fontFamily: "var(--mono)", color: "#f1f5f9", letterSpacing: -1 }}>
              {fi.symbol}{amount === "0" ? "0" : amount}
            </span>
          </div>
        </div>

        {/* Swap */}
        <div style={{ display: "flex", justifyContent: "center", margin: "-10px 0", position: "relative", zIndex: 2 }}>
          <button onClick={swap} style={{ width: 40, height: 40, borderRadius: 12, background: "#2563eb", border: "3px solid #0d0f13", color: "#fff", fontSize: 18, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 8px rgba(37,99,235,0.3)" }}>⇅</button>
        </div>

        {/* TO */}
        <div style={{ background: "#14161a", border: "1px solid #1e2028", borderRadius: 14, padding: "14px 16px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <button onClick={() => setPicker("to")} style={{ background: "#22252d", border: "1px solid #2a2d35", borderRadius: 10, padding: "6px 12px", cursor: "pointer", display: "flex", alignItems: "center", gap: 6, color: "#e5e7eb" }}>
              <span style={{ fontSize: 20 }}>{ti.flag}</span>
              <span style={{ fontWeight: 700, fontSize: 15, fontFamily: "var(--mono)" }}>{to}</span>
              <span style={{ color: "#6b7280", fontSize: 12 }}>▼</span>
            </button>
            <span style={{ fontSize: converted > 999999 ? 22 : 28, fontWeight: 700, fontFamily: "var(--mono)", color: loading ? "#6b7280" : error ? "#ef4444" : "#34d399", letterSpacing: -1 }}>
              {loading ? "···" : error ? "!" : `${ti.symbol}${fmt(converted, to)}`}
            </span>
          </div>
        </div>

        {/* Rate */}
        {!loading && !error && rate > 0 && (
          <div style={{ textAlign: "center", padding: "10px 0 2px", color: "#6b7280", fontSize: 11, fontFamily: "var(--mono)", lineHeight: 1.8 }}>
            1 {from} = {rate.toFixed(ZERO_DECIMAL.has(to) ? 2 : 4)} {to}<br/>
            1 {to} = {(1/rate).toFixed(ZERO_DECIMAL.has(from) ? 2 : 4)} {from}
          </div>
        )}
        {error && <div style={{ textAlign: "center", padding: "8px 0", color: "#ef4444", fontSize: 12 }}>{error}</div>}
      </div>

      {/* Quick favs */}
      <div style={{ padding: "8px 20px 4px", display: "flex", gap: 6, flexWrap: "wrap" }}>
        {favs.filter(c => c !== from && FIAT_CURRENCIES[c]).slice(0, 8).map(code => {
          const cur = FIAT_CURRENCIES[code];
          const qr = rates?.[code];
          const sel = code === to;
          return (
            <button key={code} onClick={() => setTo(code)} style={{
              background: sel ? "#1e3a5f" : "#1a1d23",
              border: sel ? "1px solid #2563eb" : "1px solid #22252d",
              borderRadius: 8, padding: "5px 8px", cursor: "pointer",
              color: sel ? "#60a5fa" : "#9ca3af",
              fontSize: 11, fontFamily: "var(--mono)", fontWeight: 600,
              display: "flex", alignItems: "center", gap: 4,
            }}>
              <span style={{ fontSize: 13 }}>{cur.flag}</span>{code}
              {qr != null && <span style={{ color: "#4b5563", fontWeight: 400, fontSize: 9 }}>{qr.toFixed(ZERO_DECIMAL.has(code) ? 0 : 2)}</span>}
            </button>
          );
        })}
      </div>

      {/* Keypad */}
      <div style={{ padding: "10px 20px 20px", marginTop: "auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 8 }}>
          {keys.flat().map((k, i) => {
            if (k === null) return <div key={i} />;
            const act = k === "⌫" || k === "C";
            return (
              <button key={i} onClick={() => keypad(k)} style={{
                height: 52, borderRadius: 12, border: "none", cursor: "pointer",
                fontSize: act ? 18 : 20, fontWeight: 600, fontFamily: "var(--mono)",
                background: act ? "#2a1a1a" : "#1a1d23",
                color: act ? "#f87171" : k === "." ? "#6b7280" : "#e5e7eb",
                WebkitTapHighlightColor: "transparent",
              }}>{k}</button>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <div style={{ padding: "0 20px 12px", textAlign: "center", color: "#4b5563", fontSize: 10, fontFamily: "var(--mono)", lineHeight: 1.6 }}>
        v{APP_VERSION} · deployed {BUILD_DATE_FMT} · refreshed {REFRESH_TIME_FMT}
      </div>

      {/* Picker */}
      <Picker
        isOpen={picker !== null}
        onClose={() => setPicker(null)}
        onSelect={code => {
          if (picker === "from") { if (code === to) setTo(from); setFrom(code); }
          else { if (code === from) setFrom(to); setTo(code); }
          pushRecent(code);
          setPicker(null);
        }}
        selected={picker === "from" ? from : to}
        favourites={favs}
        recents={recents}
        onToggleFav={toggleFav}
        title={picker === "from" ? "Convert from" : "Convert to"}
      />
    </div>
  );
}
