export interface MarketAsset {
  symbol: string;
  name: string;
  price: number;
  prevClose: number;
  open: number;
  high: number;
  low: number;
  volume: string;
  mktCap: string;
  sector: string;
  change: number;
  changePct: number;
}

export interface CommodityItem {
  symbol: string;
  name: string;
  price: number;
  unit: string;
  change: number;
  changePct: number;
}

export interface ForexPair {
  pair: string;
  rate: number;
  change: number;
  changePct: number;
  bid: number;
  ask: number;
}

export interface CryptoAsset {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePct: number;
  mktCap: string;
  volume24h: string;
}

export interface GlobalIndex {
  name: string;
  country: string;
  value: number;
  change: number;
  changePct: number;
  flag: string;
}

export interface IndustryIndex {
  name: string;
  symbol: string;
  value: number;
  change: number;
  changePct: number;
  ytd: number;
  color: string;
}

// --- Base data (will be mutated by live simulation) ---

export const globalIndices: GlobalIndex[] = [
  { name: "Global 500", country: "Global", value: 18432.56, change: 234.12, changePct: 1.29, flag: "🌐" },
  { name: "S&P 500", country: "USA", value: 6284.17, change: 48.33, changePct: 0.77, flag: "🇺🇸" },
  { name: "NASDAQ", country: "USA", value: 20847.94, change: 312.88, changePct: 1.52, flag: "🇺🇸" },
  { name: "FTSE 100", country: "UK", value: 8741.22, change: -34.56, changePct: -0.39, flag: "🇬🇧" },
  { name: "DAX", country: "Germany", value: 22184.67, change: 187.45, changePct: 0.85, flag: "🇩🇪" },
  { name: "Nikkei 225", country: "Japan", value: 41236.78, change: 523.44, changePct: 1.28, flag: "🇯🇵" },
  { name: "Hang Seng", country: "Hong Kong", value: 24582.39, change: -189.23, changePct: -0.76, flag: "🇭🇰" },
  { name: "SSE Composite", country: "China", value: 3847.55, change: 22.14, changePct: 0.58, flag: "🇨🇳" },
  { name: "CAC 40", country: "France", value: 7982.44, change: 56.22, changePct: 0.71, flag: "🇫🇷" },
  { name: "ASX 200", country: "Australia", value: 8234.67, change: -12.78, changePct: -0.15, flag: "🇦🇺" },
  { name: "TSX Composite", country: "Canada", value: 25847.33, change: 134.56, changePct: 0.52, flag: "🇨🇦" },
  { name: "BSE Sensex", country: "India", value: 82347.89, change: 847.23, changePct: 1.04, flag: "🇮🇳" },
];

export const industryIndices: IndustryIndex[] = [
  { name: "Technology", symbol: "ARTECH", value: 12847.23, change: 172.34, changePct: 1.36, ytd: 18.4, color: "#3b82f6" },
  { name: "Finance", symbol: "ARFIN", value: 8432.17, change: 45.22, changePct: 0.54, ytd: 11.2, color: "#10b981" },
  { name: "Energy", symbol: "ARENG", value: 6284.55, change: -32.18, changePct: -0.51, ytd: 7.8, color: "#f59e0b" },
  { name: "Healthcare", symbol: "ARHLT", value: 9102.67, change: 142.89, changePct: 1.59, ytd: 22.1, color: "#ef4444" },
  { name: "Cyber Security", symbol: "ARCYB", value: 5847.34, change: 234.56, changePct: 4.18, ytd: 31.7, color: "#8b5cf6" },
  { name: "Manufacturing", symbol: "ARMFG", value: 4523.89, change: -18.67, changePct: -0.41, ytd: 9.3, color: "#f97316" },
  { name: "SmartCity", symbol: "ARSC", value: 3284.12, change: 56.34, changePct: 1.74, ytd: 24.6, color: "#14b8a6" },
  { name: "Supply Chain", symbol: "ARSCP", value: 2947.66, change: 28.44, changePct: 0.97, ytd: 13.5, color: "#6366f1" },
  { name: "AI Index", symbol: "ARAI", value: 4521.80, change: 96.84, changePct: 2.19, ytd: 47.3, color: "#00d4ff" },
  { name: "Sustainability", symbol: "ARSUS", value: 3102.45, change: 41.22, changePct: 1.35, ytd: 19.8, color: "#84cc16" },
];

export const commodities: CommodityItem[] = [
  { symbol: "CL", name: "Crude Oil WTI", price: 87.42, unit: "USD/bbl", change: 0.83, changePct: 0.96 },
  { symbol: "BRN", name: "Brent Crude", price: 91.18, unit: "USD/bbl", change: 1.12, changePct: 1.24 },
  { symbol: "NG", name: "Natural Gas", price: 3.47, unit: "USD/MMBtu", change: -0.08, changePct: -2.25 },
  { symbol: "GC", name: "Gold", price: 3124.80, unit: "USD/oz", change: 18.40, changePct: 0.59 },
  { symbol: "SI", name: "Silver", price: 34.72, unit: "USD/oz", change: 0.64, changePct: 1.88 },
  { symbol: "PL", name: "Platinum", price: 1048.30, unit: "USD/oz", change: -8.20, changePct: -0.78 },
  { symbol: "HG", name: "Copper", price: 4.72, unit: "USD/lb", change: 0.09, changePct: 1.94 },
  { symbol: "ZW", name: "Wheat", price: 542.75, unit: "USD/bu", change: -4.25, changePct: -0.78 },
  { symbol: "ZC", name: "Corn", price: 448.50, unit: "USD/bu", change: 2.75, changePct: 0.62 },
  { symbol: "ZS", name: "Soybeans", price: 1082.25, unit: "USD/bu", change: 6.50, changePct: 0.60 },
  { symbol: "LRC", name: "Lithium Carbonate", price: 24.84, unit: "USD/kg", change: -0.32, changePct: -1.27 },
  { symbol: "URN", name: "Uranium", price: 92.40, unit: "USD/lb", change: 1.80, changePct: 1.99 },
];

export const forexPairs: ForexPair[] = [
  { pair: "EUR/USD", rate: 1.0842, change: -0.0025, changePct: -0.23, bid: 1.0841, ask: 1.0843 },
  { pair: "GBP/USD", rate: 1.2634, change: 0.0048, changePct: 0.38, bid: 1.2633, ask: 1.2635 },
  { pair: "USD/JPY", rate: 148.72, change: 0.84, changePct: 0.57, bid: 148.71, ask: 148.73 },
  { pair: "USD/CHF", rate: 0.8947, change: -0.0012, changePct: -0.13, bid: 0.8946, ask: 0.8948 },
  { pair: "AUD/USD", rate: 0.6584, change: 0.0032, changePct: 0.49, bid: 0.6583, ask: 0.6585 },
  { pair: "USD/CAD", rate: 1.3512, change: -0.0018, changePct: -0.13, bid: 1.3511, ask: 1.3513 },
  { pair: "USD/CNY", rate: 7.2481, change: 0.0124, changePct: 0.17, bid: 7.2480, ask: 7.2482 },
  { pair: "USD/INR", rate: 83.24, change: 0.18, changePct: 0.22, bid: 83.23, ask: 83.25 },
  { pair: "EUR/GBP", rate: 0.8581, change: -0.0018, changePct: -0.21, bid: 0.8580, ask: 0.8582 },
  { pair: "NZD/USD", rate: 0.6147, change: 0.0022, changePct: 0.36, bid: 0.6146, ask: 0.6148 },
];

export const cryptoAssets: CryptoAsset[] = [
  { symbol: "BTC", name: "Bitcoin", price: 98234.50, change: -712.30, changePct: -0.72, mktCap: "$1.94T", volume24h: "$42.8B" },
  { symbol: "ETH", name: "Ethereum", price: 4127.80, change: 89.40, changePct: 2.21, mktCap: "$496B", volume24h: "$18.4B" },
  { symbol: "SOL", name: "Solana", price: 248.34, change: 12.67, changePct: 5.38, mktCap: "$117B", volume24h: "$6.2B" },
  { symbol: "XRP", name: "XRP", price: 3.42, change: 0.18, changePct: 5.56, mktCap: "$196B", volume24h: "$8.4B" },
  { symbol: "ADA", name: "Cardano", price: 1.24, change: -0.04, changePct: -3.12, mktCap: "$43.8B", volume24h: "$1.2B" },
  { symbol: "AVAX", name: "Avalanche", price: 48.72, change: 3.21, changePct: 7.05, mktCap: "$20.1B", volume24h: "$0.9B" },
  { symbol: "DOT", name: "Polkadot", price: 12.84, change: -0.32, changePct: -2.43, mktCap: "$17.8B", volume24h: "$0.6B" },
  { symbol: "LINK", name: "Chainlink", price: 22.47, change: 1.84, changePct: 8.92, mktCap: "$14.2B", volume24h: "$0.8B" },
];

export const topMovers: MarketAsset[] = [
  { symbol: "NVDA", name: "NVIDIA Corp", price: 987.42, prevClose: 952.10, open: 960.20, high: 994.30, low: 957.80, volume: "48.2M", mktCap: "$2.43T", sector: "Technology", change: 35.32, changePct: 3.71 },
  { symbol: "TSLA", name: "Tesla Inc", price: 384.17, prevClose: 371.22, open: 374.50, high: 387.90, low: 372.10, volume: "62.4M", mktCap: "$1.22T", sector: "Technology", change: 12.95, changePct: 3.49 },
  { symbol: "META", name: "Meta Platforms", price: 724.88, prevClose: 742.30, open: 738.20, high: 742.10, low: 721.40, volume: "18.6M", mktCap: "$1.84T", sector: "Technology", change: -17.42, changePct: -2.35 },
  { symbol: "MSFT", name: "Microsoft Corp", price: 468.32, prevClose: 461.80, open: 463.40, high: 470.20, low: 462.10, volume: "22.1M", mktCap: "$3.48T", sector: "Technology", change: 6.52, changePct: 1.41 },
  { symbol: "AAPL", name: "Apple Inc", price: 234.56, prevClose: 231.40, open: 232.10, high: 235.80, low: 231.20, volume: "54.7M", mktCap: "$3.56T", sector: "Technology", change: 3.16, changePct: 1.37 },
  { symbol: "AMZN", name: "Amazon.com", price: 212.84, prevClose: 218.40, open: 216.20, high: 218.50, low: 211.80, volume: "28.4M", mktCap: "$2.24T", sector: "Technology", change: -5.56, changePct: -2.55 },
  { symbol: "GOOGL", name: "Alphabet Inc", price: 182.47, prevClose: 179.80, open: 180.20, high: 183.40, low: 179.60, volume: "19.8M", mktCap: "$2.29T", sector: "Technology", change: 2.67, changePct: 1.48 },
  { symbol: "JPM", name: "JPMorgan Chase", price: 248.92, prevClose: 244.10, open: 245.30, high: 250.20, low: 244.80, volume: "12.3M", mktCap: "$713B", sector: "Finance", change: 4.82, changePct: 1.97 },
];

// Sparkline history generator (for charts)
export function generateSparkline(basePrice: number, points: number = 30, volatility: number = 0.01): number[] {
  const data: number[] = [basePrice];
  for (let i = 1; i < points; i++) {
    const change = (Math.random() - 0.48) * basePrice * volatility;
    data.push(Math.max(0, data[i - 1] + change));
  }
  return data;
}

export function generateChartData(basePrice: number, hours: number = 24): { time: string; price: number; volume: number }[] {
  const data = [];
  let price = basePrice * 0.97;
  const now = new Date();
  for (let i = hours; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 60 * 60 * 1000);
    const change = (Math.random() - 0.47) * basePrice * 0.005;
    price = Math.max(basePrice * 0.9, price + change);
    data.push({
      time: `${time.getHours().toString().padStart(2, "0")}:00`,
      price: parseFloat(price.toFixed(2)),
      volume: Math.floor(Math.random() * 5000000 + 1000000),
    });
  }
  return data;
}