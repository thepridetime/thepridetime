import { useState, useEffect, useRef } from "react";
import { Link } from "react-router";
import {
  AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";
import {
  TrendingUp, TrendingDown, Activity, Globe, Zap, RefreshCw,
  ArrowUpRight, ArrowDownRight, BarChart2, DollarSign,
  Bitcoin, Fuel
} from "lucide-react";
import { articles } from "../data/newsData";

const formatNumber = (num: number) => {
  if (!num && num !== 0) return "0";
  return num.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

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

function EmptyTab({ label }: { label: string }) {
  return (
    <div className="bg-[#0d1f3c] rounded-xl p-12 text-center">
      <Activity className="w-10 h-10 text-[#00d4ff] mx-auto mb-4 opacity-50" />
      <p className="text-white font-bold mb-1">{label}</p>
      <p className="text-gray-500 text-sm">Live data feed connecting...</p>
    </div>
  );
}

export function Markets() {
  const [activeTab, setActiveTab] = useState<"overview" | "indices" | "commodities" | "forex" | "crypto" | "movers">("overview");
  const [marketData, setMarketData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [activeTimePeriod, setActiveTimePeriod] = useState("1D");

  const [allChartData] = useState(() => {
  let price = 12847;
  return Array(720).fill(0).map((_, i) => {
    price = price + (Math.random() - 0.5) * 60;
    return { time: `${i}:00`, price: Math.max(12000, price), volume: Math.floor(Math.random() * 5e6 + 1e6) };
  });
});

const [chartData, setChartData] = useState(allChartData.slice(-48));

// Filter chart data by time period
const filteredChartData = (() => {
  switch (activeTimePeriod) {
    case "1H": return allChartData.slice(-12);
    case "1D": return allChartData.slice(-48);
    case "1W": return allChartData.slice(-168);
    case "1M": return allChartData.slice(-720);
    default: return allChartData.slice(-48);
  }
})();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("https://www.thepridetime.com/api/market/live");
        if (!res.ok) throw new Error("HTTP " + res.status);
        const data = await res.json();
        setMarketData(data);
        setLastUpdate(new Date());
      } catch (err) {
        console.error("Fetch error:", err);
        // Don't block UI — just leave marketData as null or stale
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

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

  const indices = marketData?.indices || [];
  const topGainers = marketData?.topGainers || [];
  const topLosers = marketData?.topLosers || [];
  const commodities = marketData?.commodities || [];
  const forex = marketData?.forex || [];
  const crypto = marketData?.crypto || [];

  const kpiItems = indices.slice(0, 6).map((idx: any) => ({
    label: idx.name,
    price: idx.value,
    up: parseFloat(idx.changePercent) >= 0,
    decimals: idx.name === "SENSEX" ? 0 : 2
  }));
  const allKpi = [...kpiItems, { label: "BTC/USD", price: 98234, up: true, decimals: 0 }, { label: "ETH/USD", price: 4127, up: true, decimals: 2 }].slice(0, 8);

  if (loading) return (
    <div className="bg-[#06101f] min-h-screen flex items-center justify-center">
      <div className="text-center">
        <RefreshCw className="w-8 h-8 text-[#00d4ff] animate-spin mx-auto mb-3" />
        <p className="text-white font-bold">Loading live market data...</p>
      </div>
    </div>
  );

  return (
    <div className="bg-[#06101f] min-h-screen">
      {/* Header */}
      <div className="bg-[#0a1628] border-b border-[#1a2f50]">
        <div className="max-w-screen-xl mx-auto px-4 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <BarChart2 className="w-5 h-5 text-[#00d4ff]" />
              <h1 className="text-white font-black text-xl uppercase tracking-wider">The Pride Times — Live Markets</h1>
              <span className="flex items-center gap-1 text-xs bg-green-500/20 text-green-400 border border-green-500/30 px-2 py-0.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                LIVE
              </span>
            </div>
            <p className="text-gray-400 text-xs">Real-time market intelligence from Yahoo Finance</p>
          </div>
          <div className="flex items-center gap-3 text-xs text-gray-400">
            <RefreshCw className="w-3.5 h-3.5 text-[#00d4ff] animate-spin" style={{ animationDuration: "3s" }} />
            <span>Updated: {lastUpdate.toLocaleTimeString()}</span>
            <span className="text-gray-600">|</span>
            <span>NYC {new Date().toLocaleTimeString("en-US", { timeZone: "America/New_York", hour: "2-digit", minute: "2-digit" })}</span>
            <span>LDN {new Date().toLocaleTimeString("en-US", { timeZone: "Europe/London", hour: "2-digit", minute: "2-digit" })}</span>
            <span>TKY {new Date().toLocaleTimeString("en-US", { timeZone: "Asia/Tokyo", hour: "2-digit", minute: "2-digit" })}</span>
          </div>
        </div>
      </div>

      {/* KPI strip */}
      <div className="bg-[#0a1628] border-b border-[#1a2f50]">
        <div className="max-w-screen-xl mx-auto px-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 divide-x divide-[#1a2f50]">
            {allKpi.map((item, i) => (
              <div key={i} className="px-4 py-3 flex flex-col gap-0.5">
                <span className="text-[10px] text-gray-500 uppercase tracking-wider">{item.label}</span>
                <div className="flex items-center gap-1">
                  {item.up ? <ArrowUpRight className="w-3 h-3 text-green-400" /> : <ArrowDownRight className="w-3 h-3 text-red-400" />}
                  <LivePriceCell value={item.price} up={item.up} decimals={item.decimals} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-[#0a1628] border-b border-[#1a2f50] sticky top-0 z-30">
        <div className="max-w-screen-xl mx-auto px-4 flex overflow-x-auto">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-3 text-sm font-bold whitespace-nowrap border-b-2 transition-colors ${activeTab === tab.id ? "border-[#00d4ff] text-[#00d4ff]" : "border-transparent text-gray-400 hover:text-white"}`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-4 py-6 space-y-6">

        {/* OVERVIEW TAB */}
        {activeTab === "overview" && (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              <div className="lg:col-span-2 bg-[#0d1f3c] rounded-xl p-5">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">Market Index</div>
                    <div className="flex items-center gap-3">
                      {indices[0] && (
                        <>
                          <LivePriceCell value={indices[0].value} up={parseFloat(indices[0].changePercent) >= 0} decimals={2} />
                          <span className={`text-sm font-bold ${parseFloat(indices[0].changePercent) >= 0 ? "text-green-400" : "text-red-400"}`}>
                            {indices[0].changePercent}%
                          </span>
                        </>
                      )}
                      <span className="text-xs text-gray-500">Today</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {["1H", "1D", "1W", "1M"].map(t => (
  <button
    key={t}
    onClick={() => setActiveTimePeriod(t)}
    className={`text-xs px-2 py-1 rounded ${activeTimePeriod === t ? "bg-[#00d4ff] text-[#0d1f3c]" : "text-gray-400 hover:text-white"}`}
  >
    {t}
  </button>
))}
                  </div>
                </div>
                <ResponsiveContainer width="100%" height={220}>
                  <AreaChart data={filteredChartData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                    <defs><linearGradient id="techGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#00d4ff" stopOpacity={0.3} /><stop offset="95%" stopColor="#00d4ff" stopOpacity={0} /></linearGradient></defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1a2f50" />
                    <XAxis dataKey="time" tick={{ fill: "#6b7280", fontSize: 10 }} interval={3} />
                    <YAxis tick={{ fill: "#6b7280", fontSize: 10 }} domain={["auto", "auto"]} />
                    <Tooltip contentStyle={{ background: "#0d1f3c", border: "1px solid #1a2f50", borderRadius: "8px" }} labelStyle={{ color: "#9ca3af", fontSize: 11 }} itemStyle={{ color: "#00d4ff", fontSize: 12 }} />
                    <Area type="monotone" dataKey="price" stroke="#00d4ff" fill="url(#techGrad)" strokeWidth={2} dot={false} />
                  </AreaChart>
                </ResponsiveContainer>
                <div className="mt-2">
                  <div className="text-xs text-gray-500 mb-1">Volume</div>
                  <ResponsiveContainer width="100%" height={40}>
                    <BarChart data={filteredChartData.slice(-20)} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                      <Bar dataKey="volume" fill="#1a2f50" radius={[2, 2, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-[#0d1f3c] rounded-xl p-5">
                <SectionHeader icon={BarChart2} title="Market Indices" />
                <div className="space-y-3">
                  {indices.slice(0, 5).map((idx: any, i: number) => {
                    const isUp = parseFloat(idx.changePercent) >= 0;
                    return (
                      <div key={i} className="flex items-center justify-between">
                        <div className="text-sm text-gray-300">{idx.name}</div>
                        <div className="text-right">
                          <div className="text-white font-bold">{formatNumber(idx.value)}</div>
                          <div className={`text-xs ${isUp ? "text-green-400" : "text-red-400"}`}>{idx.changePercent}%</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="bg-[#0d1f3c] rounded-xl p-5">
              <SectionHeader icon={Globe} title="Global Indices" />
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {indices.slice(0, 6).map((idx: any, i: number) => {
                  const isUp = parseFloat(idx.changePercent) >= 0;
                  return (
                    <div key={i} className="bg-[#0a1628] rounded-lg p-3 hover:bg-[#1a2f50] transition-colors cursor-pointer">
                      <div className="text-[11px] text-gray-300 mb-1 truncate">{idx.name}</div>
                      <div className="text-sm font-bold text-white tabular-nums">{formatNumber(idx.value)}</div>
                      <div className={`text-xs font-bold flex items-center gap-0.5 mt-0.5 ${isUp ? "text-green-400" : "text-red-400"}`}>
                        {isUp ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                        {idx.changePercent}%
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="bg-[#0d1f3c] rounded-xl p-5">
              <SectionHeader icon={Activity} title="Top Movers — Equities" />
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[#1a2f50]">
                      {["Symbol", "Company", "Price", "Change", "% Change", "Volume"].map(h => (
                        <th key={h} className="text-left py-2 px-3 text-xs text-gray-500 uppercase tracking-wider font-semibold whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[...topGainers, ...topLosers].map((stock: any, idx: number) => {
                      const isUp = parseFloat(stock.percent) >= 0;
                      return (
                        <tr key={idx} className="border-b border-[#0a1628] hover:bg-[#1a2f50] transition-colors">
                          <td className="py-2.5 px-3 font-black text-[#00d4ff]">{stock.symbol}</td>
                          <td className="py-2.5 px-3 text-gray-300">{stock.symbol} (NSE)</td>
                          <td className="py-2.5 px-3 font-bold text-white tabular-nums">${formatNumber(stock.price)}</td>
                          <td className={`py-2.5 px-3 font-bold tabular-nums ${isUp ? "text-green-400" : "text-red-400"}`}>{stock.change}</td>
                          <td className={`py-2.5 px-3 font-bold tabular-nums ${isUp ? "text-green-400" : "text-red-400"}`}>
                            <span className={`inline-flex items-center gap-0.5 px-2 py-0.5 rounded text-xs ${isUp ? "bg-green-400/10" : "bg-red-400/10"}`}>
                              {isUp ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                              {stock.percent}
                            </span>
                          </td>
                          <td className="py-2.5 px-3 text-gray-400 tabular-nums">{stock.volume}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

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

        {/* GLOBAL INDICES TAB */}
        {activeTab === "indices" && (
          <div className="bg-[#0d1f3c] rounded-xl p-5">
            <SectionHeader icon={Globe} title="Global Indices" />
            {indices.length === 0 ? <EmptyTab label="Global Indices" /> : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {indices.map((idx: any, i: number) => {
                  const isUp = parseFloat(idx.changePercent) >= 0;
                  return (
                    <div key={i} className="bg-[#0a1628] rounded-lg p-4 hover:bg-[#1a2f50] transition-colors">
                      <div className="text-[11px] text-gray-400 mb-1 truncate">{idx.name}</div>
                      <div className="text-base font-black text-white tabular-nums">{formatNumber(idx.value)}</div>
                      <div className={`text-xs font-bold flex items-center gap-0.5 mt-1 ${isUp ? "text-green-400" : "text-red-400"}`}>
                        {isUp ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                        {idx.changePercent}%
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* COMMODITIES TAB */}
        {activeTab === "commodities" && (
          <div className="bg-[#0d1f3c] rounded-xl p-5">
            <SectionHeader icon={Fuel} title="Commodities" />
            {commodities.length === 0 ? <EmptyTab label="Commodities" /> : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {commodities.map((item: any, i: number) => {
                  const isUp = parseFloat(item.changePercent) >= 0;
                  return (
                    <div key={i} className="bg-[#0a1628] rounded-lg p-4 hover:bg-[#1a2f50] transition-colors">
                      <div className="text-[11px] text-gray-400 mb-1">{item.name}</div>
                      <div className="text-base font-black text-white tabular-nums">{formatNumber(item.value)}</div>
                      <div className={`text-xs font-bold flex items-center gap-0.5 mt-1 ${isUp ? "text-green-400" : "text-red-400"}`}>
                        {isUp ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                        {item.changePercent}%
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* FOREX TAB */}
        {activeTab === "forex" && (
          <div className="bg-[#0d1f3c] rounded-xl p-5">
            <SectionHeader icon={DollarSign} title="Forex" />
            {forex.length === 0 ? <EmptyTab label="Forex" /> : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[#1a2f50]">
                      {["Pair", "Rate", "Change", "% Change"].map(h => (
                        <th key={h} className="text-left py-2 px-3 text-xs text-gray-500 uppercase tracking-wider font-semibold">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {forex.map((item: any, i: number) => {
                      const isUp = parseFloat(item.changePercent) >= 0;
                      return (
                        <tr key={i} className="border-b border-[#0a1628] hover:bg-[#1a2f50] transition-colors">
                          <td className="py-2.5 px-3 font-black text-[#00d4ff]">{item.name}</td>
                          <td className="py-2.5 px-3 font-bold text-white tabular-nums">{formatNumber(item.value)}</td>
                          <td className={`py-2.5 px-3 font-bold tabular-nums ${isUp ? "text-green-400" : "text-red-400"}`}>{item.change}</td>
                          <td className={`py-2.5 px-3 font-bold tabular-nums ${isUp ? "text-green-400" : "text-red-400"}`}>
                            <span className={`inline-flex items-center gap-0.5 px-2 py-0.5 rounded text-xs ${isUp ? "bg-green-400/10" : "bg-red-400/10"}`}>
                              {isUp ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                              {item.changePercent}%
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* CRYPTO TAB */}
        {activeTab === "crypto" && (
          <div className="bg-[#0d1f3c] rounded-xl p-5">
            <SectionHeader icon={Bitcoin} title="Cryptocurrency" />
            {crypto.length === 0 ? <EmptyTab label="Cryptocurrency" /> : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {crypto.map((item: any, i: number) => {
                  const isUp = parseFloat(item.changePercent) >= 0;
                  return (
                    <div key={i} className="bg-[#0a1628] rounded-lg p-4 hover:bg-[#1a2f50] transition-colors">
                      <div className="text-[11px] text-gray-400 mb-1">{item.name}</div>
                      <div className="text-base font-black text-white tabular-nums">${formatNumber(item.value)}</div>
                      <div className={`text-xs font-bold flex items-center gap-0.5 mt-1 ${isUp ? "text-green-400" : "text-red-400"}`}>
                        {isUp ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                        {item.changePercent}%
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* TOP MOVERS TAB */}
        {activeTab === "movers" && (
          <div className="space-y-6">
            <div className="bg-[#0d1f3c] rounded-xl p-5">
              <SectionHeader icon={TrendingUp} title="Top Gainers" color="#4ade80" />
              {topGainers.length === 0 ? <EmptyTab label="Top Gainers" /> : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-[#1a2f50]">
                        {["Symbol", "Price", "Change", "% Change", "Volume"].map(h => (
                          <th key={h} className="text-left py-2 px-3 text-xs text-gray-500 uppercase tracking-wider font-semibold">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {topGainers.map((stock: any, i: number) => (
                        <tr key={i} className="border-b border-[#0a1628] hover:bg-[#1a2f50] transition-colors">
                          <td className="py-2.5 px-3 font-black text-[#00d4ff]">{stock.symbol}</td>
                          <td className="py-2.5 px-3 font-bold text-white tabular-nums">${formatNumber(stock.price)}</td>
                          <td className="py-2.5 px-3 font-bold text-green-400 tabular-nums">{stock.change}</td>
                          <td className="py-2.5 px-3">
                            <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded text-xs bg-green-400/10 text-green-400">
                              <ArrowUpRight className="w-3 h-3" />{stock.percent}
                            </span>
                          </td>
                          <td className="py-2.5 px-3 text-gray-400 tabular-nums">{stock.volume}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            <div className="bg-[#0d1f3c] rounded-xl p-5">
              <SectionHeader icon={TrendingDown} title="Top Losers" color="#f87171" />
              {topLosers.length === 0 ? <EmptyTab label="Top Losers" /> : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-[#1a2f50]">
                        {["Symbol", "Price", "Change", "% Change", "Volume"].map(h => (
                          <th key={h} className="text-left py-2 px-3 text-xs text-gray-500 uppercase tracking-wider font-semibold">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {topLosers.map((stock: any, i: number) => (
                        <tr key={i} className="border-b border-[#0a1628] hover:bg-[#1a2f50] transition-colors">
                          <td className="py-2.5 px-3 font-black text-[#00d4ff]">{stock.symbol}</td>
                          <td className="py-2.5 px-3 font-bold text-white tabular-nums">${formatNumber(stock.price)}</td>
                          <td className="py-2.5 px-3 font-bold text-red-400 tabular-nums">{stock.change}</td>
                          <td className="py-2.5 px-3">
                            <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded text-xs bg-red-400/10 text-red-400">
                              <ArrowDownRight className="w-3 h-3" />{stock.percent}
                            </span>
                          </td>
                          <td className="py-2.5 px-3 text-gray-400 tabular-nums">{stock.volume}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}