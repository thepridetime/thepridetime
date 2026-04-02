import { useState } from "react";
import { Link } from "react-router";
import { ChevronRight, ArrowRight, BarChart2, Globe2, Award, Users, TrendingUp, Activity } from "lucide-react";
import { articles, categories } from "../data/newsData";
import { NewsCard } from "../components/NewsCard";
import { Sidebar } from "../components/Sidebar";
import { AdBlock } from "../components/AdBlock";
import { useLiveDateTime } from "../components/LiveClock";

export function Home() {
  const [activeCategory, setActiveCategory] = useState("All");
  const { fullDate, timeShort, est, gmt } = useLiveDateTime();

  const featuredArticle = articles[0];
  const secondaryFeatured = articles.slice(1, 3);
  const latestArticles = articles.slice(3, 7);
  const moreArticles = articles.slice(0, 12);

  const categoryFilterOptions = ["All", ...categories.slice(0, 6)];
  const filteredArticles = activeCategory === "All"
    ? moreArticles
    : moreArticles.filter(a => a.category === activeCategory);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Live stats bar */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-screen-xl mx-auto px-3 sm:px-4 py-3">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {[
              { icon: Globe2, label: "Global Correspondents", value: "850+" },
              { icon: BarChart2, label: "Industries Covered", value: "47" },
              { icon: Users, label: "Enterprise Readers", value: "2.4M+" },
              { icon: Award, label: "Nations Represented", value: "195" },
            ].map((stat, idx) => (
              <div key={idx} className="flex items-center gap-2 sm:gap-3">
                <div className="w-7 h-7 sm:w-8 sm:h-8 bg-[#0d1f3c]/10 rounded flex items-center justify-center flex-shrink-0">
                  <stat.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#0d1f3c]" />
                </div>
                <div>
                  <div className="text-sm font-black text-[#0d1f3c]">{stat.value}</div>
                  <div className="text-[10px] sm:text-xs text-gray-500">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Live time banner */}
      <div className="bg-[#0a1628] border-b border-[#1a2f50]">
        <div className="max-w-screen-xl mx-auto px-4 py-2 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-[#00d4ff] font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
            <span className="hidden sm:inline">{fullDate} · {timeShort}</span>
            <span className="sm:hidden">{timeShort}</span>
          </div>
          <div className="flex items-center gap-4 text-[10px] text-gray-500">
            <span>NYC: {est}</span>
            <span className="hidden sm:inline">LON: {gmt}</span>
            <Link to="/markets" className="flex items-center gap-1 text-[#00d4ff] font-bold">
              <Activity className="w-3 h-3" /> Live Markets →
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-3 sm:px-4 py-4 sm:py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Hero + secondary featured */}
            <section>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:h-[480px]">
                <div className="md:col-span-1 h-72 sm:h-96 md:h-full">
                  <NewsCard article={featuredArticle} variant="hero" />
                </div>
                <div className="md:col-span-1 grid grid-rows-2 gap-4 md:h-full h-72 sm:h-96">
                  {secondaryFeatured.map(article => (
                    <NewsCard key={article.id} article={article} variant="featured" />
                  ))}
                </div>
              </div>
            </section>

            {/* Ad Banner */}
            <AdBlock variant="banner" />

            {/* Latest News Section */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-1 h-6 bg-[#00d4ff]"></div>
                  <h2 className="text-lg font-black text-[#0d1f3c] uppercase tracking-wide">Latest News</h2>
                </div>
                <Link to="/latest" className="flex items-center gap-1 text-sm text-[#00d4ff] font-semibold hover:text-[#0d1f3c] transition-colors">
                  All News <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {latestArticles.map(article => (
                  <NewsCard key={article.id} article={article} variant="standard" />
                ))}
              </div>
            </section>

            {/* Intelligence banner */}
            <section className="bg-gradient-to-r from-[#0d1f3c] to-[#1a3a5c] rounded-xl p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <div className="text-[#00d4ff] text-xs font-black uppercase tracking-widest mb-1">TPT Intelligence Series</div>
                <h3 className="text-white font-black text-xl leading-tight">Q1 2026 Global Enterprise Technology Report</h3>
                <p className="text-gray-300 text-sm mt-1">Comprehensive analysis of AI, cloud, and digital transformation trends across 195 nations</p>
              </div>
              <Link
                to="/reports"
                className="flex items-center gap-2 bg-[#00d4ff] text-[#0d1f3c] px-5 sm:px-6 py-3 rounded font-black text-sm hover:bg-white transition-colors whitespace-nowrap flex-shrink-0"
              >
                Read Report <ArrowRight className="w-4 h-4" />
              </Link>
            </section>

            {/* Live Markets mini panel */}
            <section className="bg-[#0a1628] rounded-xl p-4 sm:p-5 border border-[#1a2f50]">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-[#00d4ff]" />
                  <h2 className="text-white font-black text-sm uppercase tracking-wider">Live Market Snapshot</h2>
                  <span className="flex items-center gap-1 text-xs text-green-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
                    LIVE
                  </span>
                </div>
                <Link to="/markets" className="text-xs text-[#00d4ff] hover:text-white font-semibold transition-colors">
                  Full Dashboard →
                </Link>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { label: "S&P 500", val: "6,284.17", chg: "+0.77%", up: true },
                  { label: "NASDAQ", val: "20,847.94", chg: "+1.52%", up: true },
                  { label: "BTC/USD", val: "98,234.50", chg: "-0.72%", up: false },
                  { label: "Gold $/oz", val: "3,124.80", chg: "+0.59%", up: true },
                ].map((m, i) => (
                  <Link key={i} to="/markets" className="bg-[#0d1f3c] rounded-lg p-3 hover:bg-[#1a2f50] transition-colors">
                    <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">{m.label}</div>
                    <div className="text-sm font-black text-white tabular-nums">{m.val}</div>
                    <div className={`text-xs font-bold ${m.up ? "text-green-400" : "text-red-400"}`}>{m.chg}</div>
                  </Link>
                ))}
              </div>
            </section>

            {/* Filtered news grid */}
            <section>
              <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-1 h-6 bg-red-500"></div>
                  <h2 className="text-lg font-black text-[#0d1f3c] uppercase tracking-wide">Industry Intelligence</h2>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  {categoryFilterOptions.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`px-3 py-1 rounded text-xs font-bold transition-colors ${
                        activeCategory === cat
                          ? "bg-[#0d1f3c] text-white"
                          : "bg-white border border-gray-200 text-gray-600 hover:border-[#0d1f3c] hover:text-[#0d1f3c]"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {filteredArticles.map(article => (
                  <NewsCard key={article.id} article={article} variant="standard" />
                ))}
              </div>
            </section>

            {/* Magazine promo */}
            <section className="bg-gradient-to-r from-amber-900 to-yellow-800 rounded-xl p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 border border-yellow-700">
              <div>
                <div className="text-yellow-300 text-xs font-black uppercase tracking-widest mb-1">📖 The Pride Times Magazine</div>
                <h3 className="text-white font-black text-xl leading-tight">March 2026 Issue Now Available</h3>
                <p className="text-yellow-100 text-sm mt-1">Deep-dive features, cover stories, and exclusive interviews from around the globe</p>
              </div>
              <Link
                to="/magazine"
                className="flex items-center gap-2 bg-yellow-400 text-yellow-900 px-5 sm:px-6 py-3 rounded font-black text-sm hover:bg-white transition-colors whitespace-nowrap flex-shrink-0"
              >
                Read Magazine <ArrowRight className="w-4 h-4" />
              </Link>
            </section>

            {/* Regional coverage */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-1 h-6 bg-yellow-500"></div>
                <h2 className="text-lg font-black text-[#0d1f3c] uppercase tracking-wide">Global Coverage</h2>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {[
                  { name: "North America", flag: "🇺🇸" },
                  { name: "Europe", flag: "🇪🇺" },
                  { name: "Asia-Pacific", flag: "🌏" },
                  { name: "Middle East", flag: "🌍" },
                  { name: "Africa", flag: "🌍" },
                  { name: "Latin America", flag: "🌎" },
                  { name: "Global Markets", flag: "🌐" },
                  { name: "Emerging Markets", flag: "📈" },
                ].map(region => (
                  <Link
                    key={region.name}
                    to={`/region/${region.name.toLowerCase().replace(/ /g, "-")}`}
                    className="bg-white border border-gray-200 rounded-lg p-3 text-center hover:border-[#0d1f3c] hover:shadow-md transition-all group"
                  >
                    <div className="text-2xl mb-1">{region.flag}</div>
                    <div className="text-xs font-bold text-gray-800 group-hover:text-[#0d1f3c] transition-colors">{region.name}</div>
                  </Link>
                ))}
              </div>
            </section>

            {/* Bottom Ad */}
            <AdBlock variant="leaderboard" />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Sidebar />
          </div>
        </div>
      </div>
    </div>
  );
}
