import { Link } from "react-router";
import { BookOpen, ChevronRight, ArrowRight, Star, Clock, User } from "lucide-react";
import { currentMonthArticles, articles, categories, CURRENT_MONTH, CURRENT_YEAR } from "../data/newsData";
import { useLiveDateTime } from "../components/LiveClock";
import { AdBlock } from "../components/AdBlock";

// ============================================================
// DYNAMIC TAG COLORS BASED ON CATEGORY
// ============================================================
const getTagColor = (category: string): string => {
  const colors: Record<string, string> = {
    "Technology": "bg-blue-600",
    "Finance": "bg-emerald-600",
    "Cybersecurity": "bg-purple-600",
    "Energy": "bg-yellow-600",
    "Healthcare": "bg-rose-600",
    "Manufacturing": "bg-orange-600",
    "Smart Cities": "bg-teal-600",
    "Supply Chain": "bg-indigo-600",
    "Markets": "bg-green-600",
    "Sustainability": "bg-lime-600",
    "Health & Wellness": "bg-teal-600",
    "Lifestyle": "bg-pink-600",
  };
  return colors[category] || "bg-gray-600";
};

// ============================================================
// DYNAMIC COVER STORIES - Featured articles from current month
// ============================================================
const getCoverStories = () => {
  return currentMonthArticles
    .filter(article => article.featured === true || article.breaking === true)
    .slice(0, 5)
    .map((article, index) => ({
      id: article.id,
      articleId: article.id,
      title: article.title,
      subtitle: article.date.split(",")[0],
      desc: article.excerpt,
      image: article.image,
      author: article.author,
      readTime: article.readTime,
      tag: article.tags?.[0] || (article.breaking ? "BREAKING" : "Featured"),
      tagColor: getTagColor(article.category),
    }));
};

// ============================================================
// DYNAMIC SECTIONS - Based on actual categories
// ============================================================
const getSections = () => {
  const sectionEmojis: Record<string, string> = {
    "Technology": "💻",
    "Finance": "💰",
    "Cybersecurity": "🔒",
    "Energy": "⚡",
    "Healthcare": "🏥",
    "Manufacturing": "🏭",
    "Smart Cities": "🏙️",
    "Supply Chain": "📦",
    "Sustainability": "🌱",
    "Markets": "📈",
    "Health & Wellness": "💪",
    "Lifestyle": "🎭",
  };

  return categories.slice(0, 6).map(category => ({
    name: category,
    emoji: sectionEmojis[category] || "📰",
    count: currentMonthArticles.filter(a => a.category === category).length,
    link: `/category/${category.toLowerCase().replace(/ /g, "-")}`,
  }));
};

export function Magazine() {
  const { fullDate } = useLiveDateTime();
  
  // Get dynamic data
  const coverStories = getCoverStories();
  const sections = getSections();
  const magazineArticles = currentMonthArticles.slice(0, 12);
  const totalArticles = currentMonthArticles.length;
  const featuredCount = currentMonthArticles.filter(a => a.featured === true).length;
  const breakingCount = currentMonthArticles.filter(a => a.breaking === true).length;
  
  // Get first cover story for the badge
  const firstCoverStory = coverStories[0];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* ============================================================ */}
      {/* MAGAZINE HERO - GOLDEN THEME */}
      {/* ============================================================ */}
      <div className="bg-gradient-to-br from-amber-900 via-yellow-800 to-orange-900 text-white">
        <div className="max-w-screen-xl mx-auto px-4 py-12 sm:py-16">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="text-center sm:text-left">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 mb-4">
                <BookOpen className="w-4 h-4 text-yellow-300" />
                <span className="text-xs font-bold uppercase tracking-wider text-yellow-300">
                  The Pride Times Magazine
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-black leading-tight mb-3">
                {CURRENT_MONTH} {CURRENT_YEAR} Issue
              </h1>
              <p className="text-yellow-100 text-lg mb-4 max-w-lg">
                "Truth in every page. Pride in every story."
              </p>
              <div className="flex flex-wrap items-center gap-4 text-sm text-yellow-200">
                <span>📅 {fullDate}</span>
                <span>·</span>
                <span>{totalArticles} Articles</span>
                <span>·</span>
                <span>{featuredCount} Featured</span>
                <span>·</span>
                <span>{breakingCount} Breaking News</span>
              </div>
            </div>
            
            {/* GOLDEN COVER BADGE */}
            <div className="flex-shrink-0">
              <div className="bg-gradient-to-br from-yellow-600 to-amber-700 rounded-2xl p-6 shadow-2xl w-48 text-center border-4 border-yellow-500">
                <div className="text-yellow-200 text-[10px] font-black uppercase tracking-widest mb-2">
                  The Pride Times
                </div>
                <div className="text-white text-4xl font-black mb-1">
                  {CURRENT_MONTH.slice(0, 3)}
                </div>
                <div className="text-yellow-300 text-lg font-bold">{CURRENT_YEAR}</div>
                <div className="mt-3 pt-3 border-t border-yellow-500/40">
                  <div className="text-[10px] text-yellow-200">COVER STORY</div>
                  <div className="text-white text-sm font-bold truncate">
                    {firstCoverStory?.title.split(" ").slice(0, 3).join(" ") || "Featured"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-4 py-8 sm:py-10">
        
        {/* ============================================================ */}
        {/* COVER STORIES GRID - Dynamic */}
        {/* ============================================================ */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-1 h-8 bg-yellow-500 rounded-full"></div>
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Cover Stories</h2>
            <span className="bg-gray-100 text-gray-500 text-xs px-2 py-0.5 rounded-full">
              {CURRENT_MONTH} {CURRENT_YEAR}
            </span>
          </div>
          <div className="hidden sm:block text-xs text-gray-400 uppercase tracking-wider">
            Featured Content
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 mb-12">
          {coverStories.map((story) => (
            <Link
              key={story.id}
              to={`/article/${story.articleId}`}
              className="group rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 bg-white"
            >
              <div className="relative h-52">
                <img
                  src={story.image}
                  alt={story.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute top-3 left-3">
                  <span className={`${story.tagColor} text-white text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider rounded`}>
                    {story.tag}
                  </span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="text-yellow-300 text-xs font-semibold mb-1">{story.subtitle}</div>
                  <h3 className="text-white font-bold leading-tight mb-2 group-hover:text-yellow-300 transition-colors text-sm line-clamp-2">
                    {story.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-2 text-xs text-gray-300">
                    <span className="flex items-center gap-1"><User className="w-2.5 h-2.5" />{story.author}</span>
                    <span>·</span>
                    <span className="flex items-center gap-1"><Clock className="w-2.5 h-2.5" />{story.readTime}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* ============================================================ */}
        {/* MAGAZINE SECTIONS - Dynamic from categories */}
        {/* ============================================================ */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-1 h-7 bg-yellow-500 rounded-full"></div>
            <h2 className="text-xl font-bold text-gray-900 tracking-tight">Magazine Sections</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {sections.map((sec) => (
              <Link
                key={sec.name}
                to={sec.link}
                className="bg-white rounded-xl p-4 text-center border border-gray-200 hover:border-yellow-400 hover:shadow-md transition-all group"
              >
                <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">
                  {sec.emoji}
                </div>
                <div className="text-sm font-bold text-gray-800 mb-1 group-hover:text-yellow-600 transition-colors">
                  {sec.name}
                </div>
                <div className="text-[10px] font-bold text-yellow-600">{sec.count} articles</div>
              </Link>
            ))}
          </div>
        </div>

        {/* Ad Block */}
        <AdBlock variant="banner" className="mb-10" />

        {/* ============================================================ */}
        {/* ALL ARTICLES GRID - Dynamic from current month */}
        {/* ============================================================ */}
        <div>
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <div className="w-1 h-7 bg-red-500 rounded-full"></div>
              <h2 className="text-xl font-bold text-gray-900 tracking-tight">
                All Articles — {CURRENT_MONTH} {CURRENT_YEAR}
              </h2>
            </div>
            <Link to="/" className="text-sm text-red-600 font-medium hover:text-red-700 flex items-center gap-1">
              View All <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {magazineArticles.map((article) => (
              <Link
                key={article.id}
                to={`/article/${article.id}`}
                className="group bg-white rounded-xl overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300"
              >
                <div className="h-48 overflow-hidden">
                  <img 
                    src={article.image} 
                    alt={article.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                  />
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-bold text-yellow-600 uppercase tracking-wider">
                      {article.category}
                    </span>
                    {article.breaking && (
                      <span className="text-[9px] bg-red-600 text-white px-1.5 py-0.5 rounded font-black">
                        BREAKING
                      </span>
                    )}
                  </div>
                  <h3 className="text-sm font-bold text-gray-900 leading-tight line-clamp-2 mb-2 group-hover:text-yellow-600 transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-xs text-gray-600 line-clamp-2 mb-3">{article.excerpt}</p>
                  <div className="flex items-center justify-between text-[10px] text-gray-400">
                    <span className="flex items-center gap-1"><User className="w-3 h-3" />{article.author}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{article.readTime}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* ============================================================ */}
        {/* SUBSCRIBE PROMO */}
        {/* ============================================================ */}
        <div className="mt-10 bg-gradient-to-r from-amber-900 via-yellow-800 to-orange-900 rounded-2xl p-8 text-white">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-5">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Star className="w-5 h-5 text-yellow-400" />
                <span className="text-yellow-400 text-xs font-black uppercase tracking-widest">
                  Premium Access
                </span>
              </div>
              <h3 className="text-2xl font-bold mb-1">Get Full Magazine Access</h3>
              <p className="text-yellow-100 text-sm">
                Access every issue, every article, and the complete archive.
              </p>
            </div>
            <Link
              to="/subscribe"
              className="flex items-center gap-2 bg-yellow-400 text-yellow-900 px-6 py-3 rounded-xl font-bold text-sm hover:bg-white hover:text-gray-900 transition-colors whitespace-nowrap flex-shrink-0"
            >
              Subscribe Now <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}