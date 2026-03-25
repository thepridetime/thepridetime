import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Search, Bell, Menu, X, ChevronDown, Globe, Zap, TrendingUp } from "lucide-react";
import { categories } from "../data/newsData";
import logo from "/src/app/assess/logos.png";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  const navCategories = categories.slice(0, 8);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      {/* Top utility bar */}
      <div className="bg-[#0a1628] text-gray-300 text-xs">
        <div className="max-w-screen-xl mx-auto px-4 flex items-center justify-between h-8">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Globe className="w-3 h-3" />
              <span>Global Digital Intelligence Network</span>
            </span>
            <span className="hidden sm:block text-gray-500">|</span>
            <span className="hidden sm:block">Wednesday, March 25, 2026</span>
          </div> 
          <div className="flex items-center gap-4">
            <Link to="/subscribe" className="text-[#00d4ff] hover:text-white transition-colors">Subscribe</Link>
            <span className="text-gray-500">|</span>
            <Link to="/signin" className="hover:text-white transition-colors">Sign In</Link>
            <span className="text-gray-500">|</span>
            <Link to="/newsletter" className="hover:text-white transition-colors">Newsletter</Link>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="bg-[#0d1f3c] text-white">
        <div className="max-w-screen-xl mx-auto px-4 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 flex-shrink-0">
           <div className="flex items-center justify-center w-10 h-10  rounded overflow-hidden">
           <img src={logo} alt="The Pride Times Logo" className="w-full h-full object-contain" />
           </div>
            <div>
              <div className="text-xl font-black tracking-tight leading-none text-white">
                The Pride <span className="text-[#00d4ff]">Times</span>
              </div>
              <div className="text-[9px] tracking-widest text-gray-400 uppercase leading-none mt-0.5">
                Global Digital Intelligence Network
              </div>
            </div>
          </Link>

          {/* Center tagline - desktop only */}
          <div className="hidden lg:flex flex-col items-center">
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <TrendingUp className="w-3 h-3 text-[#00d4ff]" />
              <span>Enterprise Intelligence for Every Industry</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {searchOpen ? (
              <form onSubmit={handleSearch} className="flex items-center gap-2">
                <input
                  autoFocus
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search Alphaburg Report..."
                  className="bg-[#1a2f50] text-white placeholder-gray-400 rounded px-3 py-1.5 text-sm w-64 border border-[#00d4ff]/30 outline-none focus:border-[#00d4ff]"
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
                <button className="text-gray-400 hover:text-white transition-colors p-1 relative">
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
                <Link
                  to="/subscribe"
                  className="hidden sm:flex items-center gap-1.5 bg-[#00d4ff] text-[#0d1f3c] px-4 py-1.5 rounded text-sm font-semibold hover:bg-white transition-colors"
                >
                  Subscribe
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
      <nav className="bg-[#0a1628] border-t border-[#1a2f50] hidden lg:block">
        <div className="max-w-screen-xl mx-auto px-4">
          <ul className="flex items-center gap-0">
            <li>
              <Link
                to="/"
                className="flex items-center h-10 px-4 text-sm text-white bg-[#00d4ff]/10 border-b-2 border-[#00d4ff] hover:text-[#00d4ff] transition-colors"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/markets"
                className="flex items-center gap-1 h-10 px-4 text-sm text-[#00d4ff] hover:bg-[#1a2f50] transition-colors font-bold border-b-2 border-[#00d4ff]/40"
              >
                📈 Live Markets
              </Link>
            </li>
            {navCategories.map((cat) => (
              <li key={cat} className="relative group">
                <Link
                  to={`/category/${cat.toLowerCase().replace(" ", "-")}`}
                  className="flex items-center gap-1 h-10 px-4 text-sm text-gray-300 hover:text-[#00d4ff] hover:bg-[#1a2f50] transition-colors"
                >
                  {cat}
                  <ChevronDown className="w-3 h-3 opacity-60" />
                </Link>
                {/* Dropdown placeholder */}
                <div className="absolute top-full left-0 w-48 bg-[#0d1f3c] border border-[#1a2f50] shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                  <Link to={`/category/${cat.toLowerCase().replace(" ", "-")}`} className="block px-4 py-2.5 text-sm text-gray-300 hover:text-[#00d4ff] hover:bg-[#1a2f50] transition-colors border-b border-[#1a2f50]">
                    All {cat}
                  </Link>
                  <Link to={`/category/${cat.toLowerCase().replace(" ", "-")}/analysis`} className="block px-4 py-2.5 text-sm text-gray-300 hover:text-[#00d4ff] hover:bg-[#1a2f50] transition-colors border-b border-[#1a2f50]">
                    Analysis
                  </Link>
                  <Link to={`/category/${cat.toLowerCase().replace(" ", "-")}/reports`} className="block px-4 py-2.5 text-sm text-gray-300 hover:text-[#00d4ff] hover:bg-[#1a2f50] transition-colors">
                    Reports
                  </Link>
                </div>
              </li>
            ))}
            <li className="ml-auto">
              <Link
                to="/reports"
                className="flex items-center h-10 px-4 text-sm text-[#00d4ff] hover:text-white transition-colors font-semibold"
              >
                TPT Reports
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0d1f3c] border-t border-[#1a2f50]">
          <div className="max-w-screen-xl mx-auto px-4 py-4">
            <form onSubmit={handleSearch} className="flex gap-2 mb-4">
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search Alphaburg Report..."
                className="flex-1 bg-[#1a2f50] text-white placeholder-gray-400 rounded px-3 py-2 text-sm border border-[#00d4ff]/30 outline-none"
              />
              <button type="submit" className="bg-[#00d4ff] text-[#0d1f3c] px-3 py-2 rounded">
                <Search className="w-4 h-4" />
              </button>
            </form>
            <ul className="space-y-1">
              <li>
                <Link to="/" className="block px-3 py-2 text-sm text-white hover:text-[#00d4ff] transition-colors" onClick={() => setMobileMenuOpen(false)}>
                  Home
                </Link>
              </li>
              {navCategories.map((cat) => (
                <li key={cat}>
                  <Link
                    to={`/category/${cat.toLowerCase().replace(" ", "-")}`}
                    className="block px-3 py-2 text-sm text-gray-300 hover:text-[#00d4ff] transition-colors"
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