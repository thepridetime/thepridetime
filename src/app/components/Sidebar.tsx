import { useState, useEffect } from "react";
import { Link } from "react-router";
import { TrendingUp, TrendingDown, BarChart2, Flame, Globe, ChevronRight, Activity } from "lucide-react";
import { articles, categories } from "../data/newsData";
import { AdBlock } from "./AdBlock";

interface LiveMarketItem {
  name: string;
  value: number;
  changePct: string;
  up: boolean;
}

const initialMarkets: LiveMarketItem[] = [
  { name: "S&P 500", value: 6284.17, changePct: "+0.77%", up: true },
  { name: "NASDAQ", value: 20847.94, changePct: "+1.52%", up: true },
  { name: "TPT Tech", value: 12847.23, changePct: "+1.34%", up: true },
  { name: "BTC/USD", value: 98234.50, changePct: "-0.72%", up: false },
  { name: "Gold $/oz", value: 3124.80, changePct: "+0.59%", up: true },
  { name: "WTI Oil", value: 87.42, changePct: "+0.95%", up: true },
  { name: "EUR/USD", value: 1.0842, changePct: "-0.23%", up: false },
  { name: "Nikkei 225", value: 41236.78, changePct: "+1.28%", up: true },
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
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  return (
    <aside className="space-y-5">
      
      {/* Ad Block 1 */}
      <AdBlock variant="sidebar" />

      {/* Trending */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-200 bg-gray-50">
          <Flame className="w-4 h-4 text-red-500" />
          <h3 className="text-sm font-black text-gray-900 uppercase tracking-wider">Trending Now</h3>
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
                <p className="text-xs font-bold text-[#00d4ff] uppercase tracking-wide mb-1">{article.category}</p>
                <h4 className="text-sm font-bold text-gray-900 leading-tight line-clamp-2 group-hover:text-[#0d1f3c] transition-colors">
                  {article.title}
                </h4>
                <p className="text-xs text-gray-500 mt-1">{article.readTime} · {article.date}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Ad Block 2 */}
      <AdBlock variant="rectangle" />

      {/* Categories */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-200 bg-gray-50">
          <Globe className="w-4 h-4 text-[#0d1f3c]" />
          <h3 className="text-sm font-black text-gray-900 uppercase tracking-wider">Browse Topics</h3>
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
      <div className="bg-gradient-to-br from-[#0d1f3c] to-[#1a3a5c] rounded-lg p-5 text-white border border-[#1a2f50]">
        <div className="text-[#00d4ff] text-xs font-black uppercase tracking-widest mb-2">TPT Intelligence</div>
        <h3 className="font-black text-base leading-tight mb-2">Daily Briefing Newsletter</h3>
        <p className="text-sm text-gray-300 leading-relaxed mb-4">
          Get the most important global news curated by our international team of correspondents, delivered every morning.
        </p>
        <form
          onSubmit={e => {
            e.preventDefault();
            const inp = (e.target as HTMLFormElement).querySelector("input") as HTMLInputElement;
            if (inp?.value) {
              alert(`Welcome to The Pride Times! You've subscribed with ${inp.value}`);
              inp.value = "";
            }
          }}
          className="space-y-2"
        >
          <input
            type="email"
            placeholder="your@email.com"
            required
            className="w-full bg-[#1a2f50] text-white placeholder-gray-400 rounded px-3 py-2 text-sm border border-[#2a4f80] outline-none focus:border-[#00d4ff]"
          />
          <button type="submit" className="w-full bg-[#00d4ff] text-[#0a1628] py-2 rounded text-sm font-black hover:bg-white transition-colors">
            Subscribe Free
          </button>
        </form>
        <p className="text-xs text-gray-500 mt-2">Join 2.4M+ global readers. No spam, ever.</p>
      </div>

      {/* TPT Premium Report */}
      <div className="border-2 border-[#0d1f3c] rounded-lg overflow-hidden">
        <div className="bg-[#0d1f3c] px-4 py-3">
          <div className="text-[#00d4ff] text-xs font-black uppercase tracking-widest">Premium Report</div>
          <h3 className="text-white font-black mt-1 leading-tight text-sm">Global Intelligence Outlook 2026</h3>
        </div>
        <div className="p-4 bg-white">
          <p className="text-sm text-gray-600 leading-relaxed mb-3">
            The Pride Times' comprehensive annual analysis covering AI, digital infrastructure, cybersecurity, and enterprise transformation across 195 nations.
          </p>
          <Link
            to="/reports"
            className="flex items-center justify-center gap-2 w-full bg-[#0d1f3c] text-white py-2.5 rounded text-sm font-black hover:bg-[#1a2f50] transition-colors"
          >
            Access Report <ChevronRight className="w-4 h-4" />
          </Link>
          <p className="text-xs text-gray-400 text-center mt-2">Available to subscribers</p>
        </div>
      </div>

      {/* Magazine promo */}
      <div className="bg-gradient-to-br from-yellow-900 to-amber-800 rounded-lg p-4 text-white border border-yellow-700">
        <div className="text-yellow-300 text-xs font-black uppercase tracking-widest mb-2">📖 Magazine</div>
        <h3 className="font-black text-base mb-1">The Pride Times Magazine</h3>
        <p className="text-xs text-yellow-100 mb-3">Full-length features, cover stories, and deep-dive analysis from around the globe.</p>
        <Link
          to="/magazine"
          className="block text-center bg-yellow-400 text-yellow-900 py-2 rounded text-sm font-black hover:bg-white hover:text-yellow-900 transition-colors"
        >
          Browse This Month's Issue
        </Link>
      </div>
    </aside>
  );
}
