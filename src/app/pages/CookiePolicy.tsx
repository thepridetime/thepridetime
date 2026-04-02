import { useState } from "react";
import { Link } from "react-router";
import { Cookie, Check } from "lucide-react";
import { useLiveDateTime } from "../components/LiveClock";

const cookieTypes = [
  {
    name: "Essential Cookies",
    required: true,
    enabled: true,
    desc: "These cookies are strictly necessary for the website to function. They cannot be disabled.",
    examples: ["Session authentication", "Load balancing", "Security tokens", "User preferences (language, theme)"],
  },
  {
    name: "Analytics Cookies",
    required: false,
    desc: "Help us understand how visitors interact with our website so we can improve the experience.",
    examples: ["Google Analytics", "Page view tracking", "User journey analysis", "Performance monitoring"],
  },
  {
    name: "Functional Cookies",
    required: false,
    desc: "Enable enhanced functionality such as saved article lists, reading history, and personalization.",
    examples: ["Reading history", "Saved articles", "Newsletter preferences", "Market watchlist settings"],
  },
  {
    name: "Marketing Cookies",
    required: false,
    desc: "Used to deliver advertisements relevant to your interests. Data may be shared with advertising partners.",
    examples: ["Targeted advertising", "Ad frequency capping", "Social media tracking", "Campaign measurement"],
  },
];

export function CookiePolicy() {
  const { fullDate } = useLiveDateTime();
  const [prefs, setPrefs] = useState({ analytics: true, functional: true, marketing: false });
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-[#0a1628] text-white py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 text-[#00d4ff] text-xs font-black uppercase tracking-widest mb-3">
            <Cookie className="w-4 h-4" /> Legal
          </div>
          <h1 className="text-3xl font-black mb-3">Cookie Policy</h1>
          <p className="text-gray-400">The Pride Times · Last updated: {fullDate}</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-10 space-y-6">
        {/* Intro */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8">
          <h2 className="text-lg font-black text-[#0d1f3c] mb-4">What Are Cookies?</h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            Cookies are small text files that are placed on your device when you visit a website. They are widely used to make websites work efficiently, to provide a better user experience, and to provide information to the website owner.
          </p>
          <p className="text-gray-600 text-sm leading-relaxed mt-3">
            The Pride Times uses cookies to ensure our platform functions correctly, to analyze how our readers interact with our content, and to deliver relevant advertising. We are committed to being fully transparent about our use of cookies and to providing you with meaningful choices about how your data is used.
          </p>
        </div>

        {/* Cookie preference center */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8">
          <h2 className="text-lg font-black text-[#0d1f3c] mb-2">Cookie Preference Centre</h2>
          <p className="text-gray-500 text-sm mb-6">Manage your cookie preferences below. Essential cookies cannot be disabled.</p>
          <div className="space-y-5">
            {cookieTypes.map(type => (
              <div key={type.name} className="flex flex-col sm:flex-row sm:items-start gap-4 pb-5 border-b border-gray-100 last:border-none last:pb-0">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-black text-[#0d1f3c] text-sm">{type.name}</h3>
                    {type.required && (
                      <span className="text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full font-bold">Required</span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed mb-2">{type.desc}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {type.examples.map(ex => (
                      <span key={ex} className="text-[10px] bg-gray-50 border border-gray-200 text-gray-500 px-2 py-0.5 rounded">{ex}</span>
                    ))}
                  </div>
                </div>
                <div className="flex-shrink-0">
                  {type.required ? (
                    <div className="bg-[#00d4ff] w-12 h-6 rounded-full flex items-center justify-end pr-1 cursor-not-allowed opacity-75">
                      <div className="w-4 h-4 bg-white rounded-full" />
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        const key = type.name.toLowerCase().split(" ")[0] as keyof typeof prefs;
                        setPrefs(p => ({ ...p, [key]: !p[key] }));
                      }}
                      className={`w-12 h-6 rounded-full flex items-center transition-colors ${
                        prefs[type.name.toLowerCase().split(" ")[0] as keyof typeof prefs]
                          ? "bg-[#00d4ff] justify-end pr-1"
                          : "bg-gray-200 justify-start pl-1"
                      }`}
                    >
                      <div className="w-4 h-4 bg-white rounded-full shadow-sm" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <button
              onClick={handleSave}
              className="flex items-center gap-2 bg-[#00d4ff] text-[#0d1f3c] px-5 py-2.5 rounded-lg font-black text-sm hover:bg-[#0d1f3c] hover:text-white transition-colors"
            >
              {saved ? <><Check className="w-4 h-4" /> Saved!</> : "Save Preferences"}
            </button>
            <button
              onClick={() => { setPrefs({ analytics: false, functional: false, marketing: false }); setSaved(false); }}
              className="border border-gray-200 text-gray-600 px-5 py-2.5 rounded-lg font-bold text-sm hover:border-[#0d1f3c] transition-colors"
            >
              Reject All Optional
            </button>
            <button
              onClick={() => { setPrefs({ analytics: true, functional: true, marketing: true }); setSaved(false); }}
              className="border border-gray-200 text-gray-600 px-5 py-2.5 rounded-lg font-bold text-sm hover:border-[#0d1f3c] transition-colors"
            >
              Accept All
            </button>
          </div>
        </div>

        {/* Additional info */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8">
          <h2 className="text-lg font-black text-[#0d1f3c] mb-4">Third-Party Cookies</h2>
          <p className="text-gray-600 text-sm leading-relaxed mb-4">
            Some cookies on our site are set by third-party services that appear on our pages. These may include Google Analytics, Google Ads, social media platforms (Twitter, LinkedIn, Facebook), and advertising networks. These third parties have their own privacy policies and cookie practices, which we encourage you to review.
          </p>
        </div>

        <div className="flex flex-wrap gap-4 text-sm text-gray-500">
          <Link to="/privacy" className="text-[#00d4ff] hover:text-[#0d1f3c] transition-colors">Privacy Policy</Link>
          <Link to="/terms" className="text-[#00d4ff] hover:text-[#0d1f3c] transition-colors">Terms of Use</Link>
          <Link to="/accessibility" className="text-[#00d4ff] hover:text-[#0d1f3c] transition-colors">Accessibility</Link>
        </div>
      </div>
    </div>
  );
}
