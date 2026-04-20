import { Link } from "react-router";
import { Twitter, Linkedin, Youtube, Facebook, Instagram, Globe, Mail, Phone, MapPin } from "lucide-react";
import { useLiveDateTime } from "./LiveClock";
import { useState } from "react";
import logo from "/src/app/assess/logos.png";
import icon from "/src/app/assess/icon.png";

export function Footer() {
  const { fullDate } = useLiveDateTime();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  return (
    <footer className="bg-[#050e1a] text-gray-300">
      {/* Main footer content */}
      <div className="max-w-screen-xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-5">
              <img
                src={logo}
                alt="The Pride Times"
                className="w-12 h-12 rounded-lg object-cover border-2 border-[#00d4ff]/30"
              />
              <div>
                <div className="text-xl font-black tracking-tight text-white">
                  The Pride <span className="text-[#00d4ff]">Times</span>
                </div>
                <div className="text-[9px] tracking-widest text-gray-400 uppercase">
                  Truth · Integrity · Pride
                </div>
              </div>
            </Link>
            <p className="text-sm leading-relaxed text-gray-400 mb-5 max-w-sm">
              The Pride Times is the world's premier enterprise news platform delivering truth, integrity, and pride-driven journalism across every industry and region of the global economy. Trusted by 2.4M+ readers in 195 nations.
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
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-gray-400">
                <Mail className="w-3.5 h-3.5 text-[#00d4ff] flex-shrink-0" />
                <span>business@thepridetimes.com</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <Globe className="w-3.5 h-3.5 text-[#00d4ff] flex-shrink-0" />
                <span>Published Worldwide</span>
              </div>
            </div>
          </div>

          {/* Industries */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4 pb-2 border-b border-[#1a2f50]">
              Industries
            </h4>
            <ul className="space-y-2.5">
              {["Technology", "Finance", "Healthcare", "Energy", "Manufacturing", "Supply Chain", "Smart Cities", "Cybersecurity"].map(item => (
                <li key={item}>
                  <Link to={`/category/${item.toLowerCase().replace(/ /g, "-")}`} className="text-sm text-gray-400 hover:text-[#00d4ff] transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Regions */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4 pb-2 border-b border-[#1a2f50]">
              Regions
            </h4>
            <ul className="space-y-2.5 mb-6">
              {["North America", "Europe", "Asia-Pacific", "Middle East", "Africa", "Latin America", "Global Markets", "Emerging Markets"].map(item => (
                <li key={item}>
                  <Link to={`/region/${item.toLowerCase().replace(/ /g, "-")}`} className="text-sm text-gray-400 hover:text-[#00d4ff] transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services + Company */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4 pb-2 border-b border-[#1a2f50]">
              Company
            </h4>
            <ul className="space-y-2.5">
              {[
                { label: "About The Pride Times", to: "/about" },
                { label: "Editorial Standards", to: "/editorial-standards" },
                //{ label: "Careers", to: "/careers" },
                { label: "Advertise With Us", to: "/advertise" },
                //{ label: "Contact Us", to: "/contact" },
              ].map(item => (
                <li key={item.label}>
                  <Link to={item.to} className="text-sm text-gray-400 hover:text-[#00d4ff] transition-colors">
                    {item.label}
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
            <div className="text-white font-bold text-sm">Stay Ahead of the World</div>
            <div className="text-gray-400 text-xs mt-0.5">Daily intelligence briefing for global leaders — trusted by 2.4M+ readers</div>
          </div>
          <form
  onSubmit={(e) => {
    e.preventDefault();

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/;

    if (!email) {
      setError("Email is required");
      return;
    }

    if (!emailRegex.test(email)) {
      setError("Enter a valid email address");
      return;
    }

    setError("");
    alert(`Thank you! You've subscribed with ${email}. Welcome to The Pride Times!`);
    setEmail("");
  }}
  className="flex flex-col gap-1 w-full sm:w-auto"
>
  <div className="flex gap-2 w-full sm:w-auto">
    <input
      type="text"  // no browser interference
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      placeholder="Enter your work email"
      className={`bg-[#1a2f50] text-white placeholder-gray-400 rounded px-4 py-2 text-sm border ${
        error ? "border-red-500" : "border-[#2a4f80]"
      } outline-none focus:border-[#00d4ff] w-full sm:w-64`}
    />

    <button
      type="submit"
      className="bg-[#00d4ff] text-[#0a1628] px-5 py-2 rounded text-sm font-black hover:bg-white transition-colors whitespace-nowrap"
    >
      Get Briefing
    </button>
  </div>

  {/* Inline error */}
  {error && (
    <span className="text-red-400 text-xs">{error}</span>
  )}
</form>
        </div>
      </div>

      {/* Live time bar */}
      <div className="bg-[#060e1c] border-t border-[#1a2f50]">
        <div className="max-w-screen-xl mx-auto px-4 py-2 flex items-center justify-center gap-4 text-[10px] text-gray-600">
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
            LIVE: {fullDate}
          </span>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="bg-black/50 border-t border-[#1a2f50]">
        <div className="max-w-screen-xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-600 text-center sm:text-left">
            © 2026 The Pride Times — Truth · Integrity · Pride. All rights reserved.
          </p>
          <div className="flex items-center gap-3 sm:gap-4 text-xs text-gray-600 flex-wrap justify-center">
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
