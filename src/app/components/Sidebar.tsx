import { useState, useEffect } from "react";
import { Link } from "react-router";
import { TrendingUp, TrendingDown, BarChart2, Flame, Globe, ChevronRight, Activity } from "lucide-react";
import { articles, categories } from "../data/newsData";

interface LiveMarketItem {
  name: string;
  value: number;
  changePct: string;
  up: boolean;
}

const initialMarkets: LiveMarketItem[] = [
  { name: "AR Tech Index", value: 12847.23, changePct: "+1.34%", up: true },
  { name: "Global AI ETF", value: 4521.80, changePct: "+2.18%", up: true },
  { name: "BTC/USD", value: 98234.50, changePct: "-0.72%", up: false },
  { name: "Gold $/oz", value: 3124.80, changePct: "+0.59%", up: true },
  { name: "WTI Oil", value: 87.42, changePct: "+0.95%", up: true },
  { name: "EUR/USD", value: 1.0842, changePct: "-0.23%", up: false },
];

export function Sidebar() {
  const trendingArticles = articles.slice(0, 5);
  const [liveMarkets, setLiveMarkets] = useState<LiveMarketItem[]>(initialMarkets);

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveMarkets(prev =>
        prev.map(item => {
          const volatility = item.value > 10000 ? 0.0003 : item.value > 100 ? 0.0006 : 0.0002;
          const delta = (Math.random() - 0.48) * item.value * volatility;
          const newVal = parseFloat((item.value + delta).toFixed(item.value < 10 ? 4 : 2));
          const up = newVal >= item.value;
          const pct = ((newVal - item.value) / item.value * 100);
          return {
            ...item,
            value: newVal,
            up,
            changePct: `${up ? "+" : ""}${pct.toFixed(2)}%`,
          };
        })
      );
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <aside className="space-y-6">
      {/* Markets Widget */}
      <div className="bg-[#0d1f3c] rounded-lg overflow-hidden">
        <div className="flex items-center gap-2 px-4 py-3 border-b border-[#1a2f50]">
          <BarChart2 className="w-4 h-4 text-[#00d4ff]" />
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">Live Markets</h3>
          <span className="ml-auto flex items-center gap-1 text-xs text-green-400">
            <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
            Live
          </span>
        </div>
        <div className="p-2">
          {liveMarkets.map((item, idx) => (
            <Link
              key={idx}
              to="/markets"
              className="flex items-center justify-between px-3 py-2.5 hover:bg-[#1a2f50] rounded transition-colors"
            >
              <div>
                <div className="text-xs font-semibold text-gray-200">{item.name}</div>
                <div className="text-sm font-bold text-white tabular-nums">
                  {item.value.toLocaleString("en-US", {
                    minimumFractionDigits: item.value < 10 ? 4 : 2,
                    maximumFractionDigits: item.value < 10 ? 4 : 2,
                  })}
                </div>
              </div>
              <div className={`flex items-center gap-1 text-xs font-bold ${item.up ? "text-green-400" : "text-red-400"}`}>
                {item.up ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                {item.changePct}
              </div>
            </Link>
          ))}
        </div>
        <div className="px-4 py-2 border-t border-[#1a2f50]">
          <Link to="/markets" className="text-xs text-[#00d4ff] hover:text-white transition-colors flex items-center gap-1">
            <Activity className="w-3 h-3" />
            Full Live Market Data <ChevronRight className="w-3 h-3" />
          </Link>
        </div>
      </div>

      {/* Trending */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-200 bg-gray-50">
          <Flame className="w-4 h-4 text-red-500" />
          <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Trending Now</h3>
        </div>
        <div className="divide-y divide-gray-100">
          {trendingArticles.map((article, idx) => (
            <Link
              key={article.id}
              to={`/article/${article.id}`}
              className="flex gap-3 items-start p-4 hover:bg-gray-50 transition-colors group"
            >
              <span className="text-3xl font-black text-gray-100 leading-none flex-shrink-0 w-8 text-right">
                {idx + 1}
              </span>
              <div>
                <p className="text-xs font-bold text-blue-700 uppercase tracking-wide mb-1">{article.category}</p>
                <h4 className="text-sm font-bold text-gray-900 leading-tight line-clamp-2 group-hover:text-[#0d1f3c] transition-colors">
                  {article.title}
                </h4>
                <p className="text-xs text-gray-500 mt-1">{article.readTime}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-200 bg-gray-50">
          <Globe className="w-4 h-4 text-[#0d1f3c]" />
          <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Browse Topics</h3>
        </div>
        <div className="p-3 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <Link
              key={cat}
              to={`/category/${cat.toLowerCase().replace(/ /g, "-")}`}
              className="text-xs font-semibold px-3 py-1.5 bg-gray-100 text-gray-700 rounded hover:bg-[#0d1f3c] hover:text-white transition-colors"
            >
              {cat}
            </Link>
          ))}
        </div>
      </div>

      {/* Newsletter CTA */}
      <div className="bg-gradient-to-br from-[#0d1f3c] to-[#1a3a5c] rounded-lg p-5 text-white">
        <div className="text-[#00d4ff] text-xs font-black uppercase tracking-widest mb-2">The Pride Times Intelligence</div>
        <h3 className="font-bold text-lg leading-tight mb-2">Daily Briefing Newsletter</h3>
        <p className="text-sm text-gray-300 leading-relaxed mb-4">
          Get the most important enterprise news curated by our global intelligence network delivered every morning.
        </p>
        <form onSubmit={e => e.preventDefault()} className="space-y-2">
          <input
            type="email"
            placeholder="your@company.com"
            className="w-full bg-[#1a2f50] text-white placeholder-gray-400 rounded px-3 py-2 text-sm border border-[#2a4f80] outline-none focus:border-[#00d4ff]"
          />
          <button className="w-full bg-[#00d4ff] text-[#0d1f3c] py-2 rounded text-sm font-bold hover:bg-white transition-colors">
            Subscribe Free
          </button>
        </form>
        <p className="text-xs text-gray-500 mt-2">Join 2.4M+ enterprise readers. No spam.</p>
      </div>

      {/* Alphaburg Intelligence Report */}
      <div className="border-2 border-[#0d1f3c] rounded-lg overflow-hidden">
        <div className="bg-[#0d1f3c] px-4 py-3">
          <div className="text-[#00d4ff] text-xs font-black uppercase tracking-widest">Premium Report</div>
          <h3 className="text-white font-bold mt-1 leading-tight">Global Digital Intelligence Outlook 2026</h3>
        </div>
        <div className="p-4 bg-white">
          <p className="text-sm text-gray-600 leading-relaxed mb-3">
            Our comprehensive annual analysis covering AI, digital infrastructure, cybersecurity, and enterprise transformation across 195 nations.
          </p>
          <Link
            to="/reports"
            className="flex items-center justify-center gap-2 w-full bg-[#0d1f3c] text-white py-2.5 rounded text-sm font-bold hover:bg-[#1a2f50] transition-colors"
          >
            Download Report <ChevronRight className="w-4 h-4" />
          </Link>
          <p className="text-xs text-gray-400 text-center mt-2">Available to subscribers</p>
        </div>
      </div>
    </aside>
  );
}