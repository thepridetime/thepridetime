import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Search, Bell, Menu, X, ChevronDown, Globe, TrendingUp, ChevronRight } from "lucide-react";
//import { categories } from "../data/newsData";
import { articles, categories } from "../data/newsData";
import { useLiveDateTime } from "./LiveClock";
import logo from "/src/app/assess/logos.png";
import icon from "/src/app/assess/icon.png";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [notifOpen, setNotifOpen] = useState(false);
  const navigate = useNavigate();
  const { fullDate, timeShort, est, gmt, ist } = useLiveDateTime();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  const navCategories = [...categories.slice(0, 8)];
  return (
    <header className="sticky top-0 z-50 shadow-lg">
      {/* Top utility bar — live date/time + world clocks */}
      <div className="bg-[#05111f] text-gray-400 text-xs border-b border-[#1a2f50]">
        <div className="max-w-screen-xl mx-auto px-3 sm:px-4 flex items-center justify-between h-8 gap-2">
          <div className="flex items-center gap-3 overflow-hidden">
            <span className="flex items-center gap-1 flex-shrink-0">
              <Globe className="w-3 h-3 text-[#00d4ff]" />
              <span className="hidden sm:inline font-semibold text-gray-300">The Pride Times</span>
            </span>
            <span className="hidden md:flex items-center gap-1 text-[#00d4ff] font-mono flex-shrink-0">
              📅 {fullDate}
            </span>
            <span className="hidden lg:flex items-center gap-3 text-[10px] flex-shrink-0">
              <span className="text-gray-300">EST {est}</span>
              <span className="text-gray-300">|</span>
              <span className="text-gray-300">GMT {gmt}</span>
              <span className="text-gray-300">|</span>
              <span className="text-gray-300">IST {ist}</span>
            </span>
          </div>
          <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
            <span className="text-gray-300 hidden sm:inline">|</span>
            <Link to="/newsletter" className="hidden sm:inline hover:text-white transition-colors">Newsletter</Link>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="bg-[#0a1628] text-white border-b border-[#1a2f50]">
        <div className="max-w-screen-xl mx-auto px-3 sm:px-4 py-3 flex items-center justify-between gap-3">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 sm:gap-3 flex-shrink-0 min-w-0">
            <img
              src={logo}
              alt="The Pride Times Logo"
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg object-cover flex-shrink-0 border-2 border-[#00d4ff]/40"
            />
            <div className="min-w-0">
              <div className="text-lg sm:text-xl lg:text-2xl font-black tracking-tight leading-none text-white whitespace-nowrap">
                The Pride <span className="text-[#00d4ff]">Times</span>
              </div>
              <div className="text-[8px] sm:text-[9px] tracking-widest text-gray-400 uppercase leading-none mt-0.5 hidden sm:block">
                Truth · Integrity · Pride · Global Coverage
              </div>
            </div>
          </Link>

          {/* Center tagline - desktop only */}
          <div className="hidden xl:flex flex-col items-center flex-1 max-w-sm">
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <TrendingUp className="w-3 h-3 text-[#00d4ff]" />
              <span>Enterprise Intelligence for Every Industry</span>
            </div>
            <div className="text-[10px] text-[#00d4ff] font-mono mt-0.5">{timeShort}</div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            {searchOpen ? (
              <form onSubmit={handleSearch} className="flex items-center gap-2">
                <input
                  autoFocus
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search The Pride Times..."
                  className="bg-[#1a2f50] text-white placeholder-gray-400 rounded px-3 py-1.5 text-sm w-40 sm:w-64 border border-[#00d4ff]/30 outline-none focus:border-[#00d4ff]"
                />
                <button type="submit" className="text-[#00d4ff] hover:text-white transition-colors">
                  <Search className="w-5 h-5" />
                </button>
                <button type="button" onClick={() => setSearchOpen(false)} className="text-gray-400 hover:text-white transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </form>
            ) : (
              <>
                <button onClick={() => setSearchOpen(true)} className="text-gray-400 hover:text-white transition-colors p-1">
                  <Search className="w-5 h-5" />
                </button>
                <div className="relative">
                  <button
                    className="text-gray-400 hover:text-white transition-colors p-1 relative"
                    onClick={() => setNotifOpen(!notifOpen)}
                  >
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
                  </button>
                  {notifOpen && (
                    <div className="absolute right-0 top-9 w-72 bg-[#0d1f3c] border border-[#1a2f50] rounded-lg shadow-2xl z-50 overflow-hidden">
                      <div className="px-4 py-3 border-b border-[#1a2f50] flex items-center justify-between">
                        <span className="text-sm font-bold text-white">Notifications</span>
                        <button onClick={() => setNotifOpen(false)}><X className="w-4 h-4 text-gray-400" /></button>
                      </div>
                      {articles.filter(a => a.breaking).slice(0, 3).length > 0
  ? articles.filter(a => a.breaking).slice(0, 3).map((article) => (
      <Link
        key={article.id}
        to={`/article/${article.id}`}
        onClick={() => setNotifOpen(false)}
        className="block px-4 py-3 border-b border-[#1a2f50] hover:bg-[#1a2f50] transition-colors"
      >
        <div className="text-xs text-gray-200 leading-tight">
          🔴 {article.title}
        </div>
        <div className="text-[10px] text-gray-500 mt-1">{article.date} · {article.readTime}</div>
      </Link>
    ))
  : articles.slice(0, 3).map((article) => (
      <Link
        key={article.id}
        to={`/article/${article.id}`}
        onClick={() => setNotifOpen(false)}
        className="block px-4 py-3 border-b border-[#1a2f50] hover:bg-[#1a2f50] transition-colors"
      >
        <div className="text-xs text-gray-200 leading-tight">
          📰 {article.title}
        </div>
        <div className="text-[10px] text-gray-500 mt-1">{article.date} · {article.readTime}</div>
      </Link>
    ))
}
                      <Link
                        to="/latest"
                        className="block text-center text-xs text-[#00d4ff] py-3 hover:text-white transition-colors"
                        onClick={() => setNotifOpen(false)}
                      >
                        View All Alerts
                      </Link>
                    </div>
                  )}
                </div>
                <Link
                  to="/subscribe"
                  className="hidden sm:flex items-center gap-1.5 bg-[#00d4ff] text-[#0a1628] px-3 sm:px-4 py-1.5 rounded text-sm font-black hover:bg-white transition-colors"
                >
                  Subscribe
                </Link>
                <Link
                  to="/signin"
                  className="hidden md:flex items-center gap-1.5 border border-[#00d4ff]/40 text-[#00d4ff] px-3 py-1.5 rounded text-sm font-semibold hover:bg-[#00d4ff] hover:text-[#0a1628] transition-colors"
                >
                  Sign In
                </Link>
                <button
                  className="lg:hidden text-gray-400 hover:text-white transition-colors p-1"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                  {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Navigation bar */}
      <nav className="bg-[#0d1f3c] border-t border-[#1a2f50] hidden lg:block">
        <div className="max-w-screen-xl mx-auto px-4">
          <ul className="flex items-center justify-between flex-nowrap w-full">
            <li>
              <Link to="/markets" className="flex items-center gap-1 h-10 px-3 text-sm text-[#00d4ff] hover:bg-[#1a2f50] transition-colors font-black border-b-2 border-[#00d4ff]/50 whitespace-nowrap">
                📈 Live Markets
              </Link>
            </li>
            <li>
              <Link to="/magazine" className="flex items-center gap-1 h-10 px-3 text-sm text-yellow-400 hover:bg-[#1a2f50] transition-colors font-bold border-b-2 border-yellow-500/50 whitespace-nowrap">
                📖 Magazine
              </Link>
            </li>
            {navCategories.map((cat) => (
              <li key={cat} className="relative group">
                <Link
                  to={`/category/${cat.toLowerCase().replace(/ /g, "-")}`}
                  className="flex items-center gap-1 h-10 px-3 text-sm text-gray-300 hover:text-[#00d4ff] hover:bg-[#1a2f50] transition-colors whitespace-nowrap"
                >
                  {cat}
                  <ChevronDown className="w-3 h-3 opacity-60 group-hover:rotate-180 transition-transform duration-200" />
                </Link>

                {/* Modern Organized Dropdown */}
                <div className="absolute top-full left-0 w-64 bg-[#0d1f3c] border border-[#1a2f50] rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 overflow-hidden">

                  {/* Header */}
                  <div className="px-4 py-3 border-b border-[#1a2f50] bg-gradient-to-r from-[#0a1628] to-[#0d1f3c]">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">📰</span>
                      <div>
                        <div className="text-sm font-bold text-white">{cat}</div>
                        <div className="text-[10px] text-gray-500">Latest news & analysis</div>
                      </div>
                    </div>
                  </div>






                </div>
              </li>
            ))}
            <li className="ml-auto">
              <Link to="/reports" className="flex items-center h-10 px-3 text-sm text-[#00d4ff] hover:text-white hover:bg-[#1a2f50] transition-colors font-bold whitespace-nowrap">
                TPT Reports
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0d1f3c] border-t border-[#1a2f50] max-h-[80vh] overflow-y-auto">
          <div className="max-w-screen-xl mx-auto px-4 py-4">
            <form onSubmit={handleSearch} className="flex gap-2 mb-4">
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search The Pride Times..."
                className="flex-1 bg-[#1a2f50] text-white placeholder-gray-400 rounded px-3 py-2 text-sm border border-[#00d4ff]/30 outline-none"
              />
              <button type="submit" className="bg-[#00d4ff] text-[#0a1628] px-3 py-2 rounded font-bold">
                <Search className="w-4 h-4" />
              </button>
            </form>
            <ul className="space-y-0.5">
              {[
                { to: "/", label: "🏠 Home" },
                { to: "/markets", label: "📈 Live Markets" },
                { to: "/magazine", label: "📖 Magazine" },
                { to: "/subscribe", label: "⭐ Subscribe" },
                { to: "/signin", label: "👤 Sign In" },
                { to: "/newsletter", label: "📧 Newsletter" },
              ].map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="block px-3 py-2.5 text-sm text-gray-200 hover:text-[#00d4ff] hover:bg-[#1a2f50] rounded transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li className="border-t border-[#1a2f50] pt-2 mt-2">
                <div className="text-[10px] text-gray-500 uppercase tracking-widest px-3 py-1">Categories</div>
              </li>
              {navCategories.map((cat) => (
                <li key={cat}>
                  <Link
                    to={`/category/${cat.toLowerCase().replace(/ /g, "-")}`}
                    className="block px-3 py-2.5 text-sm text-gray-300 hover:text-[#00d4ff] hover:bg-[#1a2f50] rounded transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </header>
  );
}
