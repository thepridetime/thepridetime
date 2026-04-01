import { Link } from "react-router";
import { Zap, Twitter, Linkedin, Youtube, Facebook, Globe, Mail, Phone, Instagram } from "lucide-react";
import logo from "/src/app/assess/logos.png";

export function Footer() {
  return (
    <footer className="bg-[#0a1628] text-gray-300">
      {/* Main footer content */}
      <div className="max-w-screen-xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-4">
            <div className="flex items-center justify-center w-10 h-10  rounded overflow-hidden">
            <img src={logo} alt="The Pride Times Logo" className="w-full h-full object-contain" />
            </div>
              <div>
                <div className="text-xl font-black tracking-tight text-white">
                  The Pride <span className="text-[#00d4ff]">Times</span>
                </div>
                <div className="text-[9px] tracking-widest text-gray-400 uppercase">
                  Global Digital Intelligence Network
                </div>
              </div>
            </Link>
            <p className="text-sm leading-relaxed text-gray-400 mb-5 max-w-sm">
              The world's premier enterprise news platform delivering intelligence, analysis, and insight across every industry and region of the global economy.
            </p>
            <div className="flex items-center gap-3 mb-6">
              <a href="https://x.com/thepridetime" className="w-8 h-8 flex items-center justify-center rounded bg-[#1a2f50] hover:bg-[#00d4ff] hover:text-[#0d1f3c] text-gray-400 transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="https://www.linkedin.com/company/thepridetimes" className="w-8 h-8 flex items-center justify-center rounded bg-[#1a2f50] hover:bg-[#00d4ff] hover:text-[#0d1f3c] text-gray-400 transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="https://www.youtube.com/@pridetimenews" className="w-8 h-8 flex items-center justify-center rounded bg-[#1a2f50] hover:bg-[#00d4ff] hover:text-[#0d1f3c] text-gray-400 transition-colors">
                <Youtube className="w-4 h-4" />
              </a>
              <a href="https://www.facebook.com/thepridetime" className="w-8 h-8 flex items-center justify-center rounded bg-[#1a2f50] hover:bg-[#00d4ff] hover:text-[#0d1f3c] text-gray-400 transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
                <a href="https://www.instagram.com/thepridetime/" className="w-8 h-8 flex items-center justify-center rounded bg-[#1a2f50] hover:bg-[#00d4ff] hover:text-[#0d1f3c] text-gray-400 transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Sections */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4 pb-2 border-b border-[#1a2f50]">
              Industries
            </h4>
            <ul className="space-y-2.5">
              {["Technology", "Finance", "Healthcare", "Energy", "More Industries"].map(item => (
                <li key={item}>
                  <Link to={`/category/${item.toLowerCase().replace(" ", "-")}`} className="text-sm text-gray-400 hover:text-[#00d4ff] transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4 pb-2 border-b border-[#1a2f50]">
              Regions
            </h4>
            <ul className="space-y-2.5">
              {["North America", "Europe", "Asia-Pacific", "Middle East", "More Countries"].map(item => (
                <li key={item}>
                  <Link to={`/region/${item.toLowerCase().replace(" ", "-")}`} className="text-sm text-gray-400 hover:text-[#00d4ff] transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4 pb-2 border-b border-[#1a2f50]">
              Company
            </h4>
            <ul className="space-y-2.5">
              {["About The Pride Times", "Editorial Standards", "Careers", "Advertise", "Contact Us"].map(item => (
                <li key={item}>
                  <Link to="#" className="text-sm text-gray-400 hover:text-[#00d4ff] transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Newsletter bar */}
      <div className="bg-[#0d1f3c] border-t border-[#1a2f50]">
        <div className="max-w-screen-xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="text-white font-bold text-sm">Stay Ahead of the Curve</div>
            <div className="text-gray-400 text-xs mt-0.5">Daily intelligence briefing for enterprise leaders</div>
          </div>
          <form onSubmit={e => e.preventDefault()} className="flex gap-2 w-full sm:w-auto">
            <input
              type="email"
              placeholder="Enter your work email"
              className="bg-[#1a2f50] text-white placeholder-gray-400 rounded px-4 py-2 text-sm border border-[#2a4f80] outline-none focus:border-[#00d4ff] w-full sm:w-64"
            />
            <button className="bg-[#00d4ff] text-[#0d1f3c] px-5 py-2 rounded text-sm font-bold hover:bg-white transition-colors whitespace-nowrap flex-shrink-0">
              Get Briefing
            </button>
          </form>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="bg-black/30 border-t border-[#1a2f50]">
        <div className="max-w-screen-xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-500">
            © 2026 The Pride Times. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <Link to="/privacy" className="hover:text-gray-300 transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-gray-300 transition-colors">Terms of Use</Link>
            <Link to="/cookie-policy" className="hover:text-gray-300 transition-colors">Cookie Policy</Link>
            <Link to="/accessibility" className="hover:text-gray-300 transition-colors">Accessibility</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}