import { useState, useEffect, useCallback, useRef } from "react";
import { Link } from "react-router";
import {
  AreaChart, Area, LineChart, Line, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";
import {
  TrendingUp, TrendingDown, Activity, Globe, Zap, RefreshCw,
  ArrowUpRight, ArrowDownRight, BarChart2, DollarSign,
  Bitcoin, Fuel, Leaf, ChevronRight
} from "lucide-react";
import {
  globalIndices, industryIndices, commodities, forexPairs, cryptoAssets,
  topMovers, generateChartData, generateSparkline,
  type GlobalIndex, type IndustryIndex, type CommodityItem,
  type ForexPair, type CryptoAsset, type MarketAsset
} from "../data/marketLiveData";
import { articles } from "../data/newsData";

// --- Live Price Hook ---
function useLivePrice(base: number, volatility = 0.0008, interval = 1800) {
  const [price, setPrice] = useState(base);
  const [prev, setPrev] = useState(base);
  useEffect(() => {
    const id = setInterval(() => {
      setPrice(p => {
        setPrev(p);
        const delta = (Math.random() - 0.48) * p * volatility;
        return parseFloat((p + delta).toFixed(p > 100 ? 2 : 4));
      });
    }, interval);
    return () => clearInterval(id);
  }, [volatility, interval]);
  return { price, up: price >= prev };
}

// Sparkline component
function Sparkline({ data, up }: { data: number[]; up: boolean }) {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const W = 80, H = 28;
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * W;
    const y = H - ((v - min) / range) * H;
    return `${x},${y}`;
  }).join(" ");
  const color = up ? "#22c55e" : "#ef4444";
  return (
    <svg width={W} height={H} className="flex-shrink-0">
      <polyline points={pts} fill="none" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

// --- Live price cell ---
function LivePriceCell({ value, up, decimals = 2 }: { value: number; up: boolean; decimals?: number }) {
  const [flash, setFlash] = useState(false);
  const prevRef = useRef(value);
  useEffect(() => {
    if (value !== prevRef.current) {
      setFlash(true);
      prevRef.current = value;
      const t = setTimeout(() => setFlash(false), 400);
      return () => clearTimeout(t);
    }
  }, [value]);
  return (
    <span className={`font-bold tabular-nums transition-colors duration-300 ${flash ? (up ? "text-green-400" : "text-red-400") : "text-white"}`}>
      {value.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}
    </span>
  );
}

// --- Section Header ---
function SectionHeader({ icon: Icon, title, color = "#00d4ff" }: { icon: any; title: string; color?: string }) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <Icon className="w-4 h-4" style={{ color }} />
      <h2 className="text-white font-black text-sm uppercase tracking-widest">{title}</h2>
      <div className="flex-1 h-px bg-[#1a2f50] ml-2" />
      <span className="flex items-center gap-1 text-xs text-green-400 ml-2">
        <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
        LIVE
      </span>
    </div>
  );
}

// ==================== MAIN COMPONENT ====================
export function Markets() {
  const [activeTab, setActiveTab] = useState<"overview" | "indices" | "commodities" | "forex" | "crypto" | "movers">("overview");
  const [chartData, setChartData] = useState(() => generateChartData(12847, 24));
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [sparklines] = useState(() => ({
    tech: generateSparkline(12847),
    ai: generateSparkline(4521),
    crypto: generateSparkline(98234),
    energy: generateSparkline(87.42),
    health: generateSparkline(3102),
    cyber: generateSparkline(5847),
  }));

  // Live index prices
  const gdnTech = useLivePrice(12847.23, 0.001);
  const gdnAI = useLivePrice(4521.80, 0.0015);
  const btcPrice = useLivePrice(98234.50, 0.002);
  const ethPrice = useLivePrice(4127.80, 0.0025);
  const goldPrice = useLivePrice(3124.80, 0.0005);
  const oilPrice = useLivePrice(87.42, 0.001);
  const eurusd = useLivePrice(1.0842, 0.0003);
  const gdnCyber = useLivePrice(5847.34, 0.002);

  // Live update timestamp
  useEffect(() => {
    const t = setInterval(() => setLastUpdate(new Date()), 2000);
    return () => clearInterval(t);
  }, []);

  // Chart auto-update
  useEffect(() => {
    const t = setInterval(() => {
      setChartData(prev => {
        const last = prev[prev.length - 1];
        const newPrice = parseFloat((last.price + (Math.random() - 0.47) * 60).toFixed(2));
        const now = new Date();
        return [
          ...prev.slice(-47),
          {
            time: `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`,
            price: Math.max(12000, newPrice),
            volume: Math.floor(Math.random() * 5000000 + 1000000),
          }
        ];
      });
    }, 3000);
    return () => clearInterval(t);
  }, []);

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "indices", label: "Global Indices" },
    { id: "commodities", label: "Commodities" },
    { id: "forex", label: "Forex" },
    { id: "crypto", label: "Crypto" },
    { id: "movers", label: "Top Movers" },
  ] as const;

  const marketNewsArticles = articles.filter(a => ["Finance", "Technology", "Energy"].includes(a.category)).slice(0, 4);

  return (
    <div className="bg-[#06101f] min-h-screen">
      {/* Page header */}
      <div className="bg-[#0a1628] border-b border-[#1a2f50]">
        <div className="max-w-screen-xl mx-auto px-4 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <BarChart2 className="w-5 h-5 text-[#00d4ff]" />
              <h1 className="text-white font-black text-xl uppercase tracking-wider">Alphaburg Live Markets</h1>
              <span className="flex items-center gap-1 text-xs bg-green-500/20 text-green-400 border border-green-500/30 px-2 py-0.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                LIVE
              </span>
            </div>
            <p className="text-gray-400 text-xs">Real-time market intelligence across all global asset classes and industry sectors</p>
          </div>
          <div className="flex items-center gap-3 text-xs text-gray-400">
            <RefreshCw className="w-3.5 h-3.5 text-[#00d4ff] animate-spin" style={{ animationDuration: "3s" }} />
            <span>Updated: {lastUpdate.toLocaleTimeString()}</span>
            <span className="text-gray-600">|</span>
            <span className="text-gray-400">NYC {new Date().toLocaleTimeString("en-US", { timeZone: "America/New_York", hour: "2-digit", minute: "2-digit" })}</span>
            <span className="text-gray-400">LDN {new Date().toLocaleTimeString("en-US", { timeZone: "Europe/London", hour: "2-digit", minute: "2-digit" })}</span>
            <span className="text-gray-400">TKY {new Date().toLocaleTimeString("en-US", { timeZone: "Asia/Tokyo", hour: "2-digit", minute: "2-digit" })}</span>
          </div>
        </div>
      </div>

      {/* TOP KPI STRIP */}
      <div className="bg-[#0a1628] border-b border-[#1a2f50]">
        <div className="max-w-screen-xl mx-auto px-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 divide-x divide-[#1a2f50]">
            {[
              { label: "AR Tech", ...gdnTech, suffix: "", decimals: 2 },
              { label: "AR AI Index", price: gdnAI.price, up: gdnAI.up, suffix: "", decimals: 2 },
              { label: "BTC/USD", price: btcPrice.price, up: btcPrice.up, suffix: "$", decimals: 0 },
              { label: "ETH/USD", price: ethPrice.price, up: ethPrice.up, suffix: "$", decimals: 2 },
              { label: "Gold $/oz", price: goldPrice.price, up: goldPrice.up, suffix: "$", decimals: 2 },
              { label: "WTI Oil", price: oilPrice.price, up: oilPrice.up, suffix: "$", decimals: 2 },
              { label: "EUR/USD", price: eurusd.price, up: eurusd.up, suffix: "", decimals: 4 },
              { label: "AR Cyber", price: gdnCyber.price, up: gdnCyber.up, suffix: "", decimals: 2 },
            ].map((item, i) => (
              <div key={i} className="px-4 py-3 flex flex-col gap-0.5">
                <span className="text-[10px] text-gray-500 uppercase tracking-wider">{item.label}</span>
                <div className="flex items-center gap-1">
                  {item.up
                    ? <ArrowUpRight className="w-3 h-3 text-green-400 flex-shrink-0" />
                    : <ArrowDownRight className="w-3 h-3 text-red-400 flex-shrink-0" />
                  }
                  <LivePriceCell value={item.price} up={item.up} decimals={item.decimals} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* TABS */}
      <div className="bg-[#0a1628] border-b border-[#1a2f50] sticky top-0 z-30">
        <div className="max-w-screen-xl mx-auto px-4 flex overflow-x-auto scrollbar-hide">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-3 text-sm font-bold whitespace-nowrap border-b-2 transition-colors ${
                activeTab === tab.id
                  ? "border-[#00d4ff] text-[#00d4ff]"
                  : "border-transparent text-gray-400 hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-4 py-6 space-y-6">

        {/* ==================== OVERVIEW ==================== */}
        {activeTab === "overview" && (
          <>
            {/* Main chart + Industry indices */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              {/* Main chart */}
              <div className="lg:col-span-2 bg-[#0d1f3c] rounded-xl p-5">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">Alphaburg Technology Index</div>
                    <div className="flex items-center gap-3">
                      <LivePriceCell value={gdnTech.price} up={gdnTech.up} decimals={2} />
                      <span className={`text-sm font-bold ${gdnTech.up ? "text-green-400" : "text-red-400"}`}>
                        {gdnTech.up ? "+" : ""}
                        {((gdnTech.price - 12847) / 12847 * 100).toFixed(2)}%
                      </span>
                      <span className="text-xs text-gray-500">Today</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {["1H", "1D", "1W", "1M"].map(t => (
                      <button key={t} className={`text-xs px-2 py-1 rounded ${t === "1D" ? "bg-[#00d4ff] text-[#0d1f3c]" : "text-gray-400 hover:text-white"}`}>{t}</button>
                    ))}
                  </div>
                </div>
                <ResponsiveContainer width="100%" height={220}>
                  <AreaChart data={chartData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="techGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#00d4ff" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#00d4ff" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1a2f50" />
                    <XAxis dataKey="time" tick={{ fill: "#6b7280", fontSize: 10 }} interval={3} />
                    <YAxis tick={{ fill: "#6b7280", fontSize: 10 }} domain={["auto", "auto"]} />
                    <Tooltip
                      contentStyle={{ background: "#0d1f3c", border: "1px solid #1a2f50", borderRadius: "8px" }}
                      labelStyle={{ color: "#9ca3af", fontSize: 11 }}
                      itemStyle={{ color: "#00d4ff", fontSize: 12 }}
                    />
                    <Area type="monotone" dataKey="price" stroke="#00d4ff" fill="url(#techGrad)" strokeWidth={2} dot={false} />
                  </AreaChart>
                </ResponsiveContainer>
                {/* Volume */}
                <div className="mt-2">
                  <div className="text-xs text-gray-500 mb-1">Volume</div>
                  <ResponsiveContainer width="100%" height={40}>
                    <BarChart data={chartData.slice(-20)} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                      <Bar dataKey="volume" fill="#1a2f50" radius={[2, 2, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Industry indices panel */}
              <div className="bg-[#0d1f3c] rounded-xl p-5">
                <SectionHeader icon={BarChart2} title="Industry Indices" />
                <div className="space-y-3">
                  {industryIndices.map((idx) => {
                    const [liveVal, setLiveVal] = useState(idx.value);
                    const [liveUp, setLiveUp] = useState(idx.changePct >= 0);
                    useEffect(() => {
                      const t = setInterval(() => {
                        setLiveVal(v => {
                          const nv = parseFloat((v + (Math.random() - 0.48) * v * 0.0008).toFixed(2));
                          setLiveUp(nv >= v);
                          return nv;
                        });
                      }, 2000 + Math.random() * 1000);
                      return () => clearInterval(t);
                    }, []);
                    const pct = ((liveVal - idx.value) / idx.value * 100 + idx.changePct).toFixed(2);
                    const isUp = parseFloat(pct) >= 0;
                    return (
                      <div key={idx.symbol} className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: idx.color }} />
                        <div className="flex-1 min-w-0">
                          <div className="text-xs text-gray-400 truncate">{idx.name}</div>
                          <div className="text-sm font-bold text-white tabular-nums">
                            {liveVal.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                          </div>
                        </div>
                        <Sparkline data={sparklines.tech.map(v => v * (idx.value / 12847))} up={isUp} />
                        <span className={`text-xs font-bold w-14 text-right tabular-nums ${isUp ? "text-green-400" : "text-red-400"}`}>
                          {isUp ? "+" : ""}{pct}%
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Global Indices quick row */}
            <div className="bg-[#0d1f3c] rounded-xl p-5">
              <SectionHeader icon={Globe} title="Global Indices" />
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {globalIndices.map((idx) => {
                  const [val, setVal] = useState(idx.value);
                  const [up, setUp] = useState(idx.changePct >= 0);
                  useEffect(() => {
                    const t = setInterval(() => {
                      setVal(v => {
                        const nv = parseFloat((v + (Math.random() - 0.48) * v * 0.0005).toFixed(2));
                        setUp(nv >= v);
                        return nv;
                      });
                    }, 2500);
                    return () => clearInterval(t);
                  }, []);
                  const pct = ((val - idx.value) / idx.value * 100 + idx.changePct).toFixed(2);
                  const isUp = parseFloat(pct) >= 0;
                  return (
                    <div key={idx.name} className="bg-[#0a1628] rounded-lg p-3 hover:bg-[#1a2f50] transition-colors cursor-pointer">
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className="text-lg leading-none">{idx.flag}</span>
                        <span className="text-[10px] text-gray-500 uppercase tracking-wider truncate">{idx.country}</span>
                      </div>
                      <div className="text-[11px] text-gray-300 mb-1 truncate">{idx.name}</div>
                      <div className="text-sm font-bold text-white tabular-nums">
                        {val.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </div>
                      <div className={`text-xs font-bold flex items-center gap-0.5 mt-0.5 ${isUp ? "text-green-400" : "text-red-400"}`}>
                        {isUp ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                        {isUp ? "+" : ""}{pct}%
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Commodities + Crypto quick panels */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {/* Commodities */}
              <div className="bg-[#0d1f3c] rounded-xl p-5">
                <SectionHeader icon={Fuel} title="Commodities" />
                <div className="space-y-2">
                  {commodities.slice(0, 8).map((c) => {
                    const [val, setVal] = useState(c.price);
                    const [up, setUp] = useState(c.changePct >= 0);
                    useEffect(() => {
                      const t = setInterval(() => {
                        setVal(v => {
                          const nv = parseFloat((v + (Math.random() - 0.49) * v * 0.0006).toFixed(4));
                          setUp(nv >= v);
                          return nv;
                        });
                      }, 2200);
                      return () => clearInterval(t);
                    }, []);
                    const pct = ((val - c.price) / c.price * 100 + c.changePct).toFixed(2);
                    const isUp = parseFloat(pct) >= 0;
                    return (
                      <div key={c.symbol} className="flex items-center gap-3 py-1.5 border-b border-[#1a2f50] last:border-none">
                        <div className="w-10 text-[10px] font-black text-gray-500 uppercase">{c.symbol}</div>
                        <div className="flex-1">
                          <div className="text-xs text-gray-300">{c.name}</div>
                          <div className="text-[10px] text-gray-600">{c.unit}</div>
                        </div>
                        <div className="text-sm font-bold text-white tabular-nums">
                          {val.toLocaleString("en-US", { minimumFractionDigits: val < 10 ? 4 : 2, maximumFractionDigits: val < 10 ? 4 : 2 })}
                        </div>
                        <div className={`text-xs font-bold w-16 text-right tabular-nums ${isUp ? "text-green-400" : "text-red-400"}`}>
                          {isUp ? "+" : ""}{pct}%
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Crypto */}
              <div className="bg-[#0d1f3c] rounded-xl p-5">
                <SectionHeader icon={Bitcoin} title="Cryptocurrency" />
                <div className="space-y-2">
                  {cryptoAssets.map((c) => {
                    const [val, setVal] = useState(c.price);
                    const [up, setUp] = useState(c.changePct >= 0);
                    useEffect(() => {
                      const t = setInterval(() => {
                        setVal(v => {
                          const nv = parseFloat((v + (Math.random() - 0.48) * v * 0.002).toFixed(2));
                          setUp(nv >= v);
                          return nv;
                        });
                      }, 1800 + Math.random() * 600);
                      return () => clearInterval(t);
                    }, []);
                    const pct = ((val - c.price) / c.price * 100 + c.changePct).toFixed(2);
                    const isUp = parseFloat(pct) >= 0;
                    return (
                      <div key={c.symbol} className="flex items-center gap-3 py-1.5 border-b border-[#1a2f50] last:border-none">
                        <div className="w-12 h-8 flex items-center justify-center bg-[#0a1628] rounded text-[10px] font-black text-[#00d4ff]">{c.symbol}</div>
                        <div className="flex-1">
                          <div className="text-xs text-gray-300">{c.name}</div>
                          <div className="text-[10px] text-gray-600">Mkt Cap: {c.mktCap}</div>
                        </div>
                        <div>
                          <div className="text-sm font-bold text-white tabular-nums text-right">
                            ${val.toLocaleString("en-US", { minimumFractionDigits: val < 10 ? 4 : 2, maximumFractionDigits: val < 10 ? 4 : 2 })}
                          </div>
                          <div className={`text-xs font-bold text-right tabular-nums ${isUp ? "text-green-400" : "text-red-400"}`}>
                            {isUp ? "+" : ""}{pct}%
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Forex */}
            <div className="bg-[#0d1f3c] rounded-xl p-5">
              <SectionHeader icon={DollarSign} title="Forex — Major Pairs" />
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                {forexPairs.slice(0, 10).map((fx) => {
                  const [val, setVal] = useState(fx.rate);
                  const [up, setUp] = useState(fx.changePct >= 0);
                  useEffect(() => {
                    const t = setInterval(() => {
                      setVal(v => {
                        const nv = parseFloat((v + (Math.random() - 0.5) * v * 0.00015).toFixed(4));
                        setUp(nv >= v);
                        return nv;
                      });
                    }, 1500);
                    return () => clearInterval(t);
                  }, []);
                  const pct = ((val - fx.rate) / fx.rate * 100 + fx.changePct).toFixed(3);
                  const isUp = parseFloat(pct) >= 0;
                  return (
                    <div key={fx.pair} className="bg-[#0a1628] rounded-lg p-3">
                      <div className="text-xs font-black text-gray-300 mb-1">{fx.pair}</div>
                      <div className="text-lg font-bold text-white tabular-nums">{val.toFixed(4)}</div>
                      <div className={`text-xs font-bold ${isUp ? "text-green-400" : "text-red-400"}`}>
                        {isUp ? "+" : ""}{pct}%
                      </div>
                      <div className="text-[10px] text-gray-600 mt-1">
                        Bid: {(val - 0.0001).toFixed(4)} | Ask: {(val + 0.0001).toFixed(4)}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Top Movers */}
            <div className="bg-[#0d1f3c] rounded-xl p-5">
              <SectionHeader icon={Activity} title="Top Movers — Equities" />
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[#1a2f50]">
                      {["Symbol", "Company", "Price", "Change", "% Change", "Volume", "Mkt Cap", "Sector"].map(h => (
                        <th key={h} className="text-left py-2 px-3 text-xs text-gray-500 uppercase tracking-wider font-semibold whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {topMovers.map((stock) => {
                      const [val, setVal] = useState(stock.price);
                      const [up, setUp] = useState(stock.changePct >= 0);
                      useEffect(() => {
                        const t = setInterval(() => {
                          setVal(v => {
                            const nv = parseFloat((v + (Math.random() - 0.48) * v * 0.001).toFixed(2));
                            setUp(nv >= v);
                            return nv;
                          });
                        }, 2000 + Math.random() * 1000);
                        return () => clearInterval(t);
                      }, []);
                      const change = (val - stock.prevClose).toFixed(2);
                      const changePct = ((val - stock.prevClose) / stock.prevClose * 100).toFixed(2);
                      const isUp = parseFloat(changePct) >= 0;
                      return (
                        <tr key={stock.symbol} className="border-b border-[#0a1628] hover:bg-[#1a2f50] transition-colors">
                          <td className="py-2.5 px-3 font-black text-[#00d4ff]">{stock.symbol}</td>
                          <td className="py-2.5 px-3 text-gray-300">{stock.name}</td>
                          <td className="py-2.5 px-3 font-bold text-white tabular-nums">
                            ${val.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                          </td>
                          <td className={`py-2.5 px-3 font-bold tabular-nums ${isUp ? "text-green-400" : "text-red-400"}`}>
                            {isUp ? "+" : ""}{change}
                          </td>
                          <td className={`py-2.5 px-3 font-bold tabular-nums ${isUp ? "text-green-400" : "text-red-400"}`}>
                            <span className={`inline-flex items-center gap-0.5 px-2 py-0.5 rounded text-xs ${isUp ? "bg-green-400/10" : "bg-red-400/10"}`}>
                              {isUp ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                              {isUp ? "+" : ""}{changePct}%
                            </span>
                          </td>
                          <td className="py-2.5 px-3 text-gray-400 tabular-nums">{stock.volume}</td>
                          <td className="py-2.5 px-3 text-gray-400">{stock.mktCap}</td>
                          <td className="py-2.5 px-3">
                            <span className="text-xs bg-blue-900/40 text-blue-300 px-2 py-0.5 rounded">{stock.sector}</span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Market News */}
            <div className="bg-[#0d1f3c] rounded-xl p-5">
              <SectionHeader icon={Zap} title="Market Intelligence" />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {marketNewsArticles.map(article => (
                  <Link key={article.id} to={`/article/${article.id}`} className="group block">
                    <img src={article.image} alt={article.title} className="w-full h-32 object-cover rounded-lg mb-3 group-hover:opacity-80 transition-opacity" />
                    <div className="text-[10px] font-black text-[#00d4ff] uppercase tracking-wider mb-1">{article.category}</div>
                    <h4 className="text-sm font-bold text-gray-200 leading-tight line-clamp-2 group-hover:text-white transition-colors">{article.title}</h4>
                    <p className="text-xs text-gray-500 mt-1">{article.date}</p>
                  </Link>
                ))}
              </div>
            </div>
          </>
        )}

        {/* ==================== GLOBAL INDICES TAB ==================== */}
        {activeTab === "indices" && (
          <div className="space-y-5">
            <div className="bg-[#0d1f3c] rounded-xl p-5">
              <SectionHeader icon={Globe} title="All Global Indices" />
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[#1a2f50]">
                      {["", "Index", "Country", "Value", "Change", "% Change", "Open", "High", "Low"].map(h => (
                        <th key={h} className="text-left py-2 px-3 text-xs text-gray-500 uppercase tracking-wider font-semibold whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {globalIndices.map((idx) => {
                      const [val, setVal] = useState(idx.value);
                      const [up, setUp] = useState(idx.changePct >= 0);
                      useEffect(() => {
                        const t = setInterval(() => {
                          setVal(v => {
                            const nv = parseFloat((v + (Math.random() - 0.49) * v * 0.0005).toFixed(2));
                            setUp(nv >= v);
                            return nv;
                          });
                        }, 2000);
                        return () => clearInterval(t);
                      }, []);
                      const change = (val - idx.value + idx.change).toFixed(2);
                      const pct = ((val - idx.value) / idx.value * 100 + idx.changePct).toFixed(2);
                      const isUp = parseFloat(pct) >= 0;
                      return (
                        <tr key={idx.name} className="border-b border-[#0a1628] hover:bg-[#1a2f50] transition-colors">
                          <td className="py-3 px-3 text-xl">{idx.flag}</td>
                          <td className="py-3 px-3 font-bold text-gray-100">{idx.name}</td>
                          <td className="py-3 px-3 text-gray-400">{idx.country}</td>
                          <td className="py-3 px-3 font-bold text-white tabular-nums">
                            {val.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                          </td>
                          <td className={`py-3 px-3 font-bold tabular-nums ${isUp ? "text-green-400" : "text-red-400"}`}>
                            {isUp ? "+" : ""}{change}
                          </td>
                          <td className={`py-3 px-3 font-bold tabular-nums ${isUp ? "text-green-400" : "text-red-400"}`}>
                            <span className={`inline-flex items-center gap-0.5 px-2 py-0.5 rounded text-xs ${isUp ? "bg-green-400/10" : "bg-red-400/10"}`}>
                              {isUp ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                              {isUp ? "+" : ""}{pct}%
                            </span>
                          </td>
                          <td className="py-3 px-3 text-gray-400 tabular-nums">{(idx.value * 0.998).toFixed(2)}</td>
                          <td className="py-3 px-3 text-green-400 tabular-nums">{(Math.max(val, idx.value) * 1.003).toFixed(2)}</td>
                          <td className="py-3 px-3 text-red-400 tabular-nums">{(Math.min(val, idx.value) * 0.997).toFixed(2)}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-[#0d1f3c] rounded-xl p-5">
              <SectionHeader icon={BarChart2} title="Alphaburg Industry Indices" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {industryIndices.map(idx => {
                  const [val, setVal] = useState(idx.value);
                  const [up, setUp] = useState(idx.changePct >= 0);
                  useEffect(() => {
                    const t = setInterval(() => {
                      setVal(v => {
                        const nv = parseFloat((v + (Math.random() - 0.48) * v * 0.0008).toFixed(2));
                        setUp(nv >= v);
                        return nv;
                      });
                    }, 1900);
                    return () => clearInterval(t);
                  }, []);
                  const pct = ((val - idx.value) / idx.value * 100 + idx.changePct).toFixed(2);
                  const isUp = parseFloat(pct) >= 0;
                  const spark = generateSparkline(idx.value);
                  return (
                    <div key={idx.symbol} className="bg-[#0a1628] rounded-lg p-4 flex items-center gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <div className="w-2 h-2 rounded-full" style={{ background: idx.color }} />
                          <div className="text-xs text-gray-400">{idx.symbol}</div>
                        </div>
                        <div className="text-sm font-bold text-gray-200 mb-1">{idx.name}</div>
                        <div className="text-xl font-black text-white tabular-nums">
                          {val.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                        </div>
                        <div className="flex items-center gap-3 mt-1">
                          <span className={`text-xs font-bold ${isUp ? "text-green-400" : "text-red-400"}`}>
                            {isUp ? "+" : ""}{pct}% Today
                          </span>
                          <span className={`text-xs ${idx.ytd >= 0 ? "text-green-400" : "text-red-400"}`}>
                            YTD: +{idx.ytd}%
                          </span>
                        </div>
                      </div>
                      <Sparkline data={spark} up={isUp} />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ==================== COMMODITIES TAB ==================== */}
        {activeTab === "commodities" && (
          <div className="bg-[#0d1f3c] rounded-xl p-5">
            <SectionHeader icon={Fuel} title="All Commodities" />
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#1a2f50]">
                    {["Symbol", "Name", "Price", "Unit", "Change", "% Change", "Open", "52W High", "52W Low"].map(h => (
                      <th key={h} className="text-left py-2 px-3 text-xs text-gray-500 uppercase tracking-wider font-semibold whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {commodities.map((c) => {
                    const [val, setVal] = useState(c.price);
                    const [up, setUp] = useState(c.changePct >= 0);
                    useEffect(() => {
                      const t = setInterval(() => {
                        setVal(v => {
                          const nv = parseFloat((v + (Math.random() - 0.49) * v * 0.001).toFixed(4));
                          setUp(nv >= v);
                          return nv;
                        });
                      }, 2000 + Math.random() * 800);
                      return () => clearInterval(t);
                    }, []);
                    const change = (val - c.price + c.change).toFixed(4);
                    const pct = ((val - c.price) / c.price * 100 + c.changePct).toFixed(2);
                    const isUp = parseFloat(pct) >= 0;
                    const dec = val < 10 ? 4 : 2;
                    return (
                      <tr key={c.symbol} className="border-b border-[#0a1628] hover:bg-[#1a2f50] transition-colors">
                        <td className="py-3 px-3 font-black text-[#00d4ff]">{c.symbol}</td>
                        <td className="py-3 px-3 font-bold text-gray-200">{c.name}</td>
                        <td className="py-3 px-3 font-bold text-white tabular-nums">{val.toFixed(dec)}</td>
                        <td className="py-3 px-3 text-gray-500 text-xs">{c.unit}</td>
                        <td className={`py-3 px-3 font-bold tabular-nums ${isUp ? "text-green-400" : "text-red-400"}`}>
                          {isUp ? "+" : ""}{change}
                        </td>
                        <td className={`py-3 px-3 font-bold tabular-nums ${isUp ? "text-green-400" : "text-red-400"}`}>
                          <span className={`inline-flex items-center gap-0.5 px-2 py-0.5 rounded text-xs ${isUp ? "bg-green-400/10" : "bg-red-400/10"}`}>
                            {isUp ? "+" : ""}{pct}%
                          </span>
                        </td>
                        <td className="py-3 px-3 text-gray-400 tabular-nums">{(c.price * 0.999).toFixed(dec)}</td>
                        <td className="py-3 px-3 text-green-400 tabular-nums">{(c.price * 1.18).toFixed(dec)}</td>
                        <td className="py-3 px-3 text-red-400 tabular-nums">{(c.price * 0.74).toFixed(dec)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ==================== FOREX TAB ==================== */}
        {activeTab === "forex" && (
          <div className="space-y-5">
            <div className="bg-[#0d1f3c] rounded-xl p-5">
              <SectionHeader icon={DollarSign} title="Foreign Exchange — Major & Minor Pairs" />
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[#1a2f50]">
                      {["Pair", "Rate", "Change", "% Change", "Bid", "Ask", "Spread", "Day Range"].map(h => (
                        <th key={h} className="text-left py-2 px-3 text-xs text-gray-500 uppercase tracking-wider font-semibold whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {forexPairs.map((fx) => {
                      const [val, setVal] = useState(fx.rate);
                      const [up, setUp] = useState(fx.changePct >= 0);
                      useEffect(() => {
                        const t = setInterval(() => {
                          setVal(v => {
                            const nv = parseFloat((v + (Math.random() - 0.5) * v * 0.00012).toFixed(4));
                            setUp(nv >= v);
                            return nv;
                          });
                        }, 1200);
                        return () => clearInterval(t);
                      }, []);
                      const chg = (val - fx.rate + fx.change).toFixed(4);
                      const pct = ((val - fx.rate) / fx.rate * 100 + fx.changePct).toFixed(3);
                      const isUp = parseFloat(pct) >= 0;
                      return (
                        <tr key={fx.pair} className="border-b border-[#0a1628] hover:bg-[#1a2f50] transition-colors">
                          <td className="py-3 px-3 font-black text-white">{fx.pair}</td>
                          <td className="py-3 px-3 font-bold text-white tabular-nums">{val.toFixed(4)}</td>
                          <td className={`py-3 px-3 font-bold tabular-nums ${isUp ? "text-green-400" : "text-red-400"}`}>{isUp ? "+" : ""}{chg}</td>
                          <td className={`py-3 px-3 font-bold tabular-nums ${isUp ? "text-green-400" : "text-red-400"}`}>
                            <span className={`inline-flex items-center gap-0.5 px-2 py-0.5 rounded text-xs ${isUp ? "bg-green-400/10" : "bg-red-400/10"}`}>
                              {isUp ? "+" : ""}{pct}%
                            </span>
                          </td>
                          <td className="py-3 px-3 text-gray-400 tabular-nums">{(val - 0.00015).toFixed(4)}</td>
                          <td className="py-3 px-3 text-gray-400 tabular-nums">{(val + 0.00015).toFixed(4)}</td>
                          <td className="py-3 px-3 text-yellow-400 tabular-nums">0.3</td>
                          <td className="py-3 px-3 text-gray-400 tabular-nums text-xs">
                            {(val * 0.993).toFixed(4)} – {(val * 1.007).toFixed(4)}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ==================== CRYPTO TAB ==================== */}
        {activeTab === "crypto" && (
          <div className="bg-[#0d1f3c] rounded-xl p-5">
            <SectionHeader icon={Bitcoin} title="Digital Assets — Live Prices" />
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#1a2f50]">
                    {["#", "Asset", "Price", "24h Change", "Market Cap", "24h Volume", "7D", "Sparkline"].map(h => (
                      <th key={h} className="text-left py-2 px-3 text-xs text-gray-500 uppercase tracking-wider font-semibold whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {cryptoAssets.map((c, i) => {
                    const [val, setVal] = useState(c.price);
                    const [up, setUp] = useState(c.changePct >= 0);
                    const [spark] = useState(() => generateSparkline(c.price, 20, 0.015));
                    useEffect(() => {
                      const t = setInterval(() => {
                        setVal(v => {
                          const nv = parseFloat((v + (Math.random() - 0.48) * v * 0.002).toFixed(v < 100 ? 4 : 2));
                          setUp(nv >= v);
                          return nv;
                        });
                      }, 1500 + Math.random() * 500);
                      return () => clearInterval(t);
                    }, []);
                    const pct = ((val - c.price) / c.price * 100 + c.changePct).toFixed(2);
                    const isUp = parseFloat(pct) >= 0;
                    return (
                      <tr key={c.symbol} className="border-b border-[#0a1628] hover:bg-[#1a2f50] transition-colors">
                        <td className="py-3 px-3 text-gray-500 font-bold">{i + 1}</td>
                        <td className="py-3 px-3">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-[#1a2f50] flex items-center justify-center text-[10px] font-black text-[#00d4ff]">{c.symbol}</div>
                            <div>
                              <div className="font-bold text-white">{c.name}</div>
                              <div className="text-[10px] text-gray-500">{c.symbol}</div>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-3 font-bold text-white tabular-nums">
                          ${val.toLocaleString("en-US", { minimumFractionDigits: val < 1 ? 4 : 2, maximumFractionDigits: val < 1 ? 4 : 2 })}
                        </td>
                        <td className={`py-3 px-3 font-bold tabular-nums ${isUp ? "text-green-400" : "text-red-400"}`}>
                          <span className={`inline-flex items-center gap-0.5 px-2 py-0.5 rounded text-xs ${isUp ? "bg-green-400/10" : "bg-red-400/10"}`}>
                            {isUp ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                            {isUp ? "+" : ""}{pct}%
                          </span>
                        </td>
                        <td className="py-3 px-3 text-gray-300 tabular-nums">{c.mktCap}</td>
                        <td className="py-3 px-3 text-gray-400 tabular-nums">{c.volume24h}</td>
                        <td className={`py-3 px-3 font-bold tabular-nums ${isUp ? "text-green-400" : "text-red-400"}`}>
                          {isUp ? "+" : ""}{(parseFloat(pct) * 3.2).toFixed(1)}%
                        </td>
                        <td className="py-3 px-3">
                          <Sparkline data={spark} up={isUp} />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ==================== MOVERS TAB ==================== */}
        {activeTab === "movers" && (
          <div className="space-y-5">
            <div className="bg-[#0d1f3c] rounded-xl p-5">
              <SectionHeader icon={TrendingUp} title="Top Gainers & Losers — Equities" />
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[#1a2f50]">
                      {["Symbol", "Company", "Sector", "Price", "Change", "% Change", "Volume", "Mkt Cap", "Open", "High", "Low"].map(h => (
                        <th key={h} className="text-left py-2 px-3 text-xs text-gray-500 uppercase tracking-wider font-semibold whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {topMovers.map((stock) => {
                      const [val, setVal] = useState(stock.price);
                      const [up, setUp] = useState(stock.changePct >= 0);
                      useEffect(() => {
                        const t = setInterval(() => {
                          setVal(v => {
                            const nv = parseFloat((v + (Math.random() - 0.48) * v * 0.001).toFixed(2));
                            setUp(nv >= v);
                            return nv;
                          });
                        }, 2000 + Math.random() * 1000);
                        return () => clearInterval(t);
                      }, []);
                      const change = (val - stock.prevClose).toFixed(2);
                      const changePct = ((val - stock.prevClose) / stock.prevClose * 100).toFixed(2);
                      const isUp = parseFloat(changePct) >= 0;
                      return (
                        <tr key={stock.symbol} className="border-b border-[#0a1628] hover:bg-[#1a2f50] transition-colors">
                          <td className="py-3 px-3 font-black text-[#00d4ff]">{stock.symbol}</td>
                          <td className="py-3 px-3 font-bold text-gray-200 whitespace-nowrap">{stock.name}</td>
                          <td className="py-3 px-3"><span className="text-xs bg-blue-900/40 text-blue-300 px-2 py-0.5 rounded">{stock.sector}</span></td>
                          <td className="py-3 px-3 font-bold text-white tabular-nums">${val.toFixed(2)}</td>
                          <td className={`py-3 px-3 font-bold tabular-nums ${isUp ? "text-green-400" : "text-red-400"}`}>{isUp ? "+" : ""}{change}</td>
                          <td className={`py-3 px-3 font-bold tabular-nums ${isUp ? "text-green-400" : "text-red-400"}`}>
                            <span className={`inline-flex items-center gap-0.5 px-2 py-0.5 rounded text-xs ${isUp ? "bg-green-400/10" : "bg-red-400/10"}`}>
                              {isUp ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                              {isUp ? "+" : ""}{changePct}%
                            </span>
                          </td>
                          <td className="py-3 px-3 text-gray-400 tabular-nums">{stock.volume}</td>
                          <td className="py-3 px-3 text-gray-400">{stock.mktCap}</td>
                          <td className="py-3 px-3 text-gray-400 tabular-nums">${stock.open.toFixed(2)}</td>
                          <td className="py-3 px-3 text-green-400 tabular-nums">${stock.high.toFixed(2)}</td>
                          <td className="py-3 px-3 text-red-400 tabular-nums">${stock.low.toFixed(2)}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}