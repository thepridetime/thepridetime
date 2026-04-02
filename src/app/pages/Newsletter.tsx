import { useState } from "react";
import { Link } from "react-router";
import { Mail, Check, Globe, BarChart2, Zap, Clock } from "lucide-react";
import logo from "/src/app/assess/logos.png";
import icon from "/src/app/assess/icon.png";

const newsletters = [
  {
    name: "Daily Briefing",
    freq: "Every morning at 6 AM EST",
    desc: "Your essential daily digest of the most important enterprise news from around the globe.",
    icon: "☀️",
  },
  {
    name: "Markets Morning",
    freq: "Every weekday at 7:30 AM EST",
    desc: "Pre-market intelligence — indices, commodities, forex, and what's moving before the bell.",
    icon: "📈",
  },
  {
    name: "Technology Weekly",
    freq: "Every Tuesday",
    desc: "In-depth analysis of the biggest tech stories, AI developments, and enterprise IT trends.",
    icon: "💻",
  },
  {
    name: "Finance Intelligence",
    freq: "Every Wednesday",
    desc: "Capital markets, banking, investment, and macroeconomic analysis from our finance desk.",
    icon: "🏦",
  },
  {
    name: "Energy & Climate",
    freq: "Every Thursday",
    desc: "Energy markets, sustainability, ESG, and the green economy from our global correspondents.",
    icon: "⚡",
  },
  {
    name: "Weekend Intelligence",
    freq: "Every Saturday",
    desc: "Long-form analysis, magazine previews, and the week's best investigative reporting.",
    icon: "📖",
  },
];

export function Newsletter() {
  const [selected, setSelected] = useState<string[]>(["Daily Briefing"]);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const toggle = (name: string) => {
    setSelected(prev => prev.includes(name) ? prev.filter(n => n !== name) : [...prev, name]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && selected.length > 0) setSubscribed(true);
  };

  if (subscribed) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-black text-[#0d1f3c] mb-2">You're Subscribed!</h2>
          <p className="text-gray-600 mb-2">
            Welcome to <strong>{selected.length}</strong> newsletter{selected.length > 1 ? "s" : ""} from The Pride Times.
          </p>
          <p className="text-sm text-gray-500 mb-6">First edition arrives at <strong>{email}</strong> soon.</p>
          <div className="space-y-3">
            <Link to="/" className="block bg-[#00d4ff] text-[#0d1f3c] py-3 rounded-lg font-black hover:bg-[#0d1f3c] hover:text-white transition-colors">
              Read Today's News
            </Link>
            <Link to="/subscribe" className="block border border-gray-200 text-gray-600 py-3 rounded-lg font-semibold text-sm hover:border-[#0d1f3c] transition-colors">
              Upgrade to Premium
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero */}
      <div className="bg-gradient-to-br from-[#0a1628] to-[#1a3a5c] text-white py-14 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <img src={logo} alt="The Pride Times" className="w-12 h-12 rounded-lg mx-auto mb-4 object-cover border-2 border-[#00d4ff]/40" />
          <div className="text-[#00d4ff] text-xs font-black uppercase tracking-widest mb-3">Free Newsletters</div>
          <h1 className="text-3xl sm:text-4xl font-black mb-3">Stay Ahead of the World</h1>
          <p className="text-gray-300 text-lg">
            Join 2.4M+ readers who trust The Pride Times newsletters for daily intelligence, analysis, and insight.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-10">
          {/* Newsletter grid */}
        <h2 className="text-xl font-black text-[#0d1f3c] mb-4">Choose Your Newsletters</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {newsletters.map(nl => {
            const isSelected = selected.includes(nl.name);
            return (
              <div
                key={nl.name}
                onClick={() => toggle(nl.name)}
                className={`bg-white rounded-xl p-5 cursor-pointer border-2 transition-all ${isSelected ? "border-[#00d4ff] shadow-md" : "border-gray-200 hover:border-gray-300"}`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <span className="text-2xl">{nl.icon}</span>
                  </div>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${isSelected ? "bg-[#00d4ff] border-[#00d4ff]" : "border-gray-300"}`}>
                    {isSelected && <Check className="w-3 h-3 text-[#0d1f3c]" />}
                  </div>
                </div>
                <h3 className="font-black text-[#0d1f3c] mb-1">{nl.name}</h3>
                <p className="text-xs text-[#00d4ff] font-semibold mb-2 flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {nl.freq}
                </p>
                <p className="text-sm text-gray-600 leading-relaxed">{nl.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Sign up form */}
        <div className="bg-gradient-to-br from-[#0d1f3c] to-[#1a3a5c] rounded-2xl p-6 sm:p-8 text-white">
          <h2 className="text-xl font-black mb-2">Subscribe to {selected.length > 0 ? selected.length : "0"} Newsletter{selected.length !== 1 ? "s" : ""}</h2>
          <p className="text-gray-300 text-sm mb-5">Free forever. Unsubscribe anytime. No spam — ever.</p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full bg-[#1a2f50] text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-3 text-sm border border-[#2a4f80] outline-none focus:border-[#00d4ff]"
              />
            </div>
            <button
              type="submit"
              disabled={selected.length === 0}
              className="bg-[#00d4ff] text-[#0d1f3c] px-6 py-3 rounded-lg font-black text-sm hover:bg-white transition-colors disabled:opacity-50 whitespace-nowrap flex items-center gap-2"
            >
              <Zap className="w-4 h-4" />
              Subscribe Free
            </button>
          </form>
          {selected.length === 0 && (
            <p className="text-yellow-400 text-xs mt-2">Please select at least one newsletter above.</p>
          )}
        </div>
      </div>
    </div>
  );
}
