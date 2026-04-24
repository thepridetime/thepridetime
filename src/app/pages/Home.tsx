import { useState } from "react";
import { Link } from "react-router";
import { ChevronRight, ArrowRight, BarChart2, Globe2, Award, Users, TrendingUp, Activity, BookOpen, Menu, X } from "lucide-react";
import { articles, categories } from "../data/newsData";
import { NewsCard } from "../components/NewsCard";
import { useLiveDateTime } from "../components/LiveClock";

// ============================================================
// HOME COVER CONFIG
// ============================================================
const HOME_COVER = {
  image: "/assess/TribePay.png",
  title: "Eddie N Ibude: Leading YEP Tribe into the Future of Digital Finance",
  subtitle: "April 2026 · CEO Interview",
  tag: "Cover Story",
  linkTo: "/article/yep-tribe-1",
  linkLabel: "Read Cover Story",
  postedOn: "2026-04-24",
  daysOnTop: 2,
};

function getCoverPosition(): "top" | "below" | "hidden" {
  if (!HOME_COVER.image.trim()) return "hidden";
  const posted = new Date(HOME_COVER.postedOn);
  const now = new Date();
  const daysSince = Math.floor((now.getTime() - posted.getTime()) / (1000 * 60 * 60 * 24));
  if (daysSince < 0) return "hidden";
  if (daysSince < HOME_COVER.daysOnTop) return "top";
  return "below";
}

function CoverBanner({ size }: { size: "top" | "below" }) {
  const isTop = size === "top";
  return (
    <div className={`relative rounded-xl overflow-hidden group ${isTop ? "mb-8" : "mb-8"}`}>
      <Link to={HOME_COVER.linkTo} className="block">
        <div className="relative w-full h-[400px] md:h-[500px]">
          <img
            src={HOME_COVER.image}
            alt={HOME_COVER.title}
            className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
          
          <div className="absolute top-4 left-4 z-10">
            <span className="bg-red-600 text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded">
              {HOME_COVER.tag}
            </span>
          </div>
          
          <div className={`absolute bottom-0 left-0 right-0 z-10 ${isTop ? "p-6 md:p-8" : "p-4 md:p-5"}`}>
            {isTop && (
              <p className="text-[#00d4ff] text-sm font-semibold mb-2">{HOME_COVER.subtitle}</p>
            )}
            <h2 className={`text-white font-bold leading-tight mb-3 ${isTop ? "text-xl md:text-3xl lg:text-4xl max-w-3xl" : "text-lg md:text-xl"}`}>
              {HOME_COVER.title}
            </h2>
            {isTop && (
              <p className="text-gray-300 text-sm mb-4 max-w-2xl line-clamp-2">
                Exclusive interview with the CEO about revolutionizing digital payments across emerging markets
              </p>
            )}
            <span className="inline-flex items-center gap-2 bg-white text-black px-4 md:px-5 py-2 rounded-lg font-bold text-sm hover:bg-gray-100 transition-colors">
              {HOME_COVER.linkLabel} <ArrowRight className="w-4 h-4" />
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}

export function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const { fullDate, timeShort } = useLiveDateTime();

  const coverPosition = getCoverPosition();
  const coverArticleId = HOME_COVER.linkTo.split("/article/")[1] ?? "";

  // Filter out cover article to avoid duplication
  const allArticles = articles.filter(a => a.id !== coverArticleId);
  
  // Sort articles by date (newest first)
  const sortedArticles = [...allArticles].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB.getTime() - dateA.getTime();
  });
  
  // Article selections
  const topStory = sortedArticles.find(a => a.featured === true) || sortedArticles[0];
  const secondaryStories = sortedArticles.filter(a => a.id !== topStory.id).slice(0, 3);
  
  // Get remaining articles for More News (excluding top story and secondary)
  const remainingArticles = sortedArticles.filter(a => a.id !== topStory.id && !secondaryStories.includes(a));
  const moreStories = remainingArticles.slice(0, 8);

  // Category filter options - USE ALL CATEGORIES
  const categoryFilterOptions = ["All", ...categories];
  
  // Filtered articles based on active category - USE ALL SORTED ARTICLES (not remainingArticles)
  const filteredArticles = activeCategory === "All"
    ? sortedArticles
    : sortedArticles.filter(a => a.category === activeCategory);

  // Get current month
  const currentMonth = new Date().toLocaleString('default', { month: 'long', year: 'numeric' });

  const navItems = [
    { name: "Home", path: "/" },
    { name: "World", path: "/category/technology" },
    { name: "Technology", path: "/category/technology" },
    { name: "Finance", path: "/category/finance" },
    { name: "Markets", path: "/markets" },
    { name: "Magazine", path: "/magazine" },
  ];

  // Debug logging
  console.log("Active Category:", activeCategory);
  console.log("Filtered Articles Count:", filteredArticles.length);
  console.log("All Articles Count:", sortedArticles.length);

  return (
    <div className="bg-white min-h-screen">
      {/* TOP BAR */}
      <div className="bg-black text-white">
        <div className="max-w-screen-xl mx-auto px-4">
          <div className="flex items-center justify-between py-3 text-sm">
            <div className="flex items-center gap-4">
              <Link to="/" className="font-bold text-xl tracking-tight hover:text-gray-300 transition-colors">
                THE PRIDE TIMES
              </Link>
              <span className="hidden md:inline text-gray-400">|</span>
              <span className="hidden md:inline text-gray-400">Your Global News Source</span>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="hidden sm:inline">{fullDate}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
              <span>LIVE</span>
              <Globe2 className="w-3 h-3 text-[#00d4ff]" />
            </div>
          </div>
        </div>
      </div>

      {/* NAVIGATION */}
      <div className="border-b border-gray-200 sticky top-0 bg-white z-40 shadow-sm">
        <div className="max-w-screen-xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <nav className="hidden md:flex items-center gap-6 py-3 text-sm font-medium">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="text-gray-700 hover:text-red-600 transition-colors whitespace-nowrap"
                >
                  {item.name}
                </Link>
              ))}
            </nav>
            
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2">
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            
            <Link to="/search" className="p-2 text-gray-500 hover:text-black">
              🔍
            </Link>
          </div>
          
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-100">
              <div className="flex flex-col gap-3">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className="text-gray-700 hover:text-red-600 transition-colors py-1"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                <Link to="/search" className="text-gray-700 hover:text-red-600 transition-colors py-1">
                  Search
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* LIVE TICKER */}
      <div className="bg-[#0a1628] border-y border-[#1a2f50]">
        <div className="max-w-screen-xl mx-auto px-4 py-2">
          <div className="flex items-center gap-4 text-xs overflow-x-auto">
            <span className="text-[#00d4ff] font-bold whitespace-nowrap">🌍 GLOBAL MARKETS</span>
            <div className="flex items-center gap-4">
              {[
                { label: "S&P 500", val: "6,284.17", chg: "+0.77%" },
                { label: "NASDAQ", val: "20,847.94", chg: "+1.52%" },
                { label: "FTSE 100", val: "8,247.30", chg: "+0.45%" },
                { label: "Nikkei 225", val: "38,942.50", chg: "+1.12%" },
                { label: "BTC/USD", val: "$98,234", chg: "-0.72%" },
              ].map((m, i) => (
                <div key={i} className="flex items-center gap-2 whitespace-nowrap">
                  <span className="text-gray-400">{m.label}</span>
                  <span className="text-white font-semibold">{m.val}</span>
                  <span className={m.chg.startsWith("+") ? "text-green-400" : "text-red-400"}>{m.chg}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="max-w-screen-xl mx-auto px-4 py-8">
        
        {/* COVER BANNER */}
        {coverPosition === "top" && <CoverBanner size="top" />}

        {/* TOP GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2">
            <div className="border-l-4 border-red-600 pl-3 mb-4">
              <h2 className="text-xs font-bold text-red-600 uppercase tracking-wider">TOP STORY</h2>
            </div>
            <NewsCard article={topStory} variant="hero" />
          </div>
          
          <div>
            <div className="border-l-4 border-gray-300 pl-3 mb-4">
              <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wider">AROUND THE WORLD</h2>
            </div>
            <div className="space-y-5">
              {secondaryStories.map((article) => (
                <NewsCard key={article.id} article={article} variant="horizontal" />
              ))}
            </div>
          </div>
        </div>

        {/* GLOBAL COVERAGE */}
        <div className="mb-12">
          <div className="flex items-center justify-between border-b border-gray-200 pb-3 mb-5">
            <div className="flex items-center gap-2">
              <Globe2 className="w-5 h-5 text-red-600" />
              <h2 className="text-lg font-bold text-gray-900">Global Coverage</h2>
              <span className="bg-red-100 text-red-600 text-xs px-2 py-0.5 rounded-full">195 Nations</span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-3">
            {[
              { name: "North America", flag: "🇺🇸", path: "/region/north-america" },
              { name: "Europe", flag: "🇪🇺", path: "/region/europe" },
              { name: "Asia-Pacific", flag: "🌏", path: "/region/asia-pacific" },
              { name: "Middle East", flag: "🌍", path: "/region/middle-east" },
              { name: "Africa", flag: "🌍", path: "/region/africa" },
              { name: "India", flag: "🌎", path: "/region/India" },
              { name: "Latin America", flag: "🌎", path: "/region/latin-america" },
              { name: "Global Markets", flag: "🌐", path: "/markets" },
              { name: "Emerging Markets", flag: "📈", path: "/region/emerging-markets" },
            ].map((region) => (
              <Link
                key={region.name}
                to={region.path}
                className="bg-gray-50 hover:bg-red-50 border border-gray-200 rounded-lg p-3 text-center transition-all group"
              >
                <div className="text-2xl mb-1 group-hover:scale-110 transition-transform">{region.flag}</div>
                <div className="text-xs font-medium text-gray-700 group-hover:text-red-600 transition-colors">
                  {region.name}
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* COVER: smaller strip after N days */}
        {coverPosition === "below" && <CoverBanner size="below" />}

        {/* ============================================================ */}
        {/* CATEGORY SECTION - FIXED WORKING BUTTONS */}
        {/* ============================================================ */}
        <div className="mb-12">
          <div className="flex items-center gap-2 border-b border-gray-200 mb-6 overflow-x-auto pb-1">
            {categoryFilterOptions.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  console.log("Clicked:", cat);
                  setActiveCategory(cat);
                }}
                className={`px-4 py-2 text-sm font-medium whitespace-nowrap transition-all duration-200 rounded-t-lg ${
                  activeCategory === cat
                    ? "text-red-600 border-b-2 border-red-600 -mb-px bg-red-50/30"
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                }`}
              >
                {cat}
                {cat !== "All" && (
                  <span className="ml-1 text-xs text-gray-400">
                    ({sortedArticles.filter(a => a.category === cat).length})
                  </span>
                )}
              </button>
            ))}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.slice(0, 9).map((article) => (
              <NewsCard key={article.id} article={article} variant="standard" />
            ))}
          </div>
          
          {filteredArticles.length === 0 && (
            <div className="text-center py-12 bg-gray-50 rounded-xl">
              <p className="text-gray-500">No articles found in <strong>{activeCategory}</strong></p>
              <button 
                onClick={() => setActiveCategory("All")}
                className="mt-2 text-red-600 hover:text-red-700 font-medium"
              >
                View all articles →
              </button>
            </div>
          )}
        </div>

        {/* MAGAZINE PROMO */}
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-xl p-8 mb-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                <BookOpen className="w-5 h-5 text-yellow-400" />
                <span className="text-yellow-400 text-xs font-black uppercase tracking-widest">The Pride Times Magazine</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">{currentMonth} Issue Now Available</h3>
              <p className="text-gray-300 text-sm">Deep-dive features, cover stories, and exclusive interviews from around the globe</p>
            </div>
            <Link to="/magazine" className="bg-yellow-400 text-black px-6 py-3 rounded-lg font-bold text-sm hover:bg-yellow-300 transition-colors whitespace-nowrap">
              Read Magazine →
            </Link>
          </div>
        </div>

        {/* MORE NEWS GRID */}
        <div>
          <div className="flex items-center justify-between border-b border-gray-200 pb-3 mb-5">
            <div className="flex items-center gap-2">
              <div className="w-1 h-5 bg-red-600 rounded-full"></div>
              <h2 className="text-lg font-bold text-gray-900">More News</h2>
              <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                {moreStories.length} articles
              </span>
            </div>
            <Link to="/category/technology" className="text-sm text-red-600 hover:text-red-700 font-medium flex items-center gap-1">
              Browse All <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          
          {moreStories.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {moreStories.map((article) => (
                <NewsCard key={article.id} article={article} variant="standard" />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-xl border border-gray-200">
              <p className="text-gray-500">More articles coming soon.</p>
              <p className="text-xs text-gray-400 mt-1">Check back later for updates</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}