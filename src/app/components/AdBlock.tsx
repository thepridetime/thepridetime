import { ExternalLink } from "lucide-react";

interface AdBlockProps {
  variant?: "sidebar" | "banner" | "rectangle" | "leaderboard";
  className?: string;
}

const sidebarAds = [
  {
    title: "Invest Smarter in 2026",
    sub: "AI-Powered Portfolio Management",
    cta: "Start Free Trial",
    bg: "bg-gradient-to-br from-[#0a1628] to-[#1a3a5c]",
    accent: "text-[#00d4ff]",
    label: "SPONSORED · FINTECH",
    url: "#",
  },
  {
    title: "Enterprise Cloud Security",
    sub: "Protect Your Data at Scale",
    cta: "Get Demo",
    bg: "bg-gradient-to-br from-purple-900 to-indigo-900",
    accent: "text-purple-300",
    label: "SPONSORED · CYBERSECURITY",
    url: "#",
  },
  {
    title: "Global Market Data API",
    sub: "Real-time data for 80+ exchanges",
    cta: "Explore Plans",
    bg: "bg-gradient-to-br from-emerald-900 to-teal-900",
    accent: "text-emerald-300",
    label: "SPONSORED · DATA",
    url: "#",
  },
];

const bannerAds = [
  {
    title: "The Pride Times Premium",
    sub: "Unlimited access to all articles, live markets, and the full magazine archive.",
    cta: "Subscribe Now — 30% Off",
    bg: "bg-gradient-to-r from-[#0a1628] via-[#0d2a4e] to-[#0a1628]",
    accent: "text-[#00d4ff]",
    label: "ADVERTISEMENT",
  },
  {
    title: "Trade Global Markets with Confidence",
    sub: "Access 10,000+ instruments with institutional-grade tools.",
    cta: "Open Account",
    bg: "bg-gradient-to-r from-emerald-900 to-green-800",
    accent: "text-emerald-300",
    label: "SPONSORED",
  },
];

let adRotation = { sidebar: 0, banner: 0 };

export function AdBlock({ variant = "sidebar", className = "" }: AdBlockProps) {
  const ad = variant === "sidebar"
    ? sidebarAds[adRotation.sidebar++ % sidebarAds.length]
    : bannerAds[adRotation.banner++ % bannerAds.length];

  if (variant === "leaderboard" || variant === "banner") {
    return (
      <div className={`rounded-lg overflow-hidden border border-gray-200 ${className}`}>
        <div className={`${(ad as any).bg} p-5 sm:p-6`}>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">{ad.label}</div>
              <div className={`text-sm font-black uppercase tracking-wider mb-1 ${ad.accent}`}>{ad.title}</div>
              <p className="text-white text-sm">{ad.sub}</p>
            </div>
            <a
              href={ad.url || "#"}
              className="flex-shrink-0 bg-[#00d4ff] text-[#0a1628] px-5 py-2.5 rounded font-bold text-sm hover:bg-white transition-colors whitespace-nowrap flex items-center gap-1.5"
            >
              {ad.cta} <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    );
  }

  if (variant === "rectangle") {
    return (
      <div className={`rounded-lg overflow-hidden ${className}`}>
        <div className="text-[10px] text-gray-400 uppercase tracking-widest text-center py-1 bg-gray-50 border border-gray-200 border-b-0 rounded-t-lg">
          Advertisement
        </div>
        <div className={`${(ad as any).bg} p-5 rounded-b-lg border border-gray-200 border-t-0`}>
          <div className={`text-[10px] ${ad.accent} uppercase tracking-widest mb-2`}>{ad.label}</div>
          <div className="text-white font-black text-base mb-1">{ad.title}</div>
          <p className="text-gray-300 text-xs mb-3">{ad.sub}</p>
          <a
            href={ad.url || "#"}
            className="block text-center bg-[#00d4ff] text-[#0a1628] py-2 rounded font-bold text-sm hover:bg-white transition-colors"
          >
            {ad.cta}
          </a>
        </div>
      </div>
    );
  }

  // Sidebar default
  return (
    <div className={`rounded-lg overflow-hidden ${className}`}>
      <div className="text-[10px] text-gray-400 uppercase tracking-widest text-center py-1 bg-gray-50 border border-gray-200 border-b-0 rounded-t-lg">
        Advertisement
      </div>
      <div className={`${(ad as any).bg} p-4 rounded-b-lg border border-gray-200 border-t-0`}>
        <div className={`text-[10px] ${ad.accent} uppercase tracking-widest mb-2`}>{ad.label}</div>
        <div className="text-white font-black text-sm mb-1">{ad.title}</div>
        <p className="text-gray-300 text-xs mb-3">{ad.sub}</p>
        <a
          href={ad.url || "#"}
          className="block text-center bg-[#00d4ff] text-[#0a1628] py-2 rounded font-bold text-xs hover:bg-white transition-colors"
        >
          {ad.cta}
        </a>
      </div>
    </div>
  );
}

// Google Ad placeholder unit
export function GoogleAdUnit({ slot = "top", className = "" }: { slot?: string; className?: string }) {
  return (
    <div className={`bg-gray-100 border border-dashed border-gray-300 rounded flex flex-col items-center justify-center py-8 ${className}`}>
      <div className="text-[10px] text-gray-400 uppercase tracking-widest mb-2">Advertisement</div>
      <div className="text-xs text-gray-400">Ad Unit · {slot}</div>
      <div className="text-[10px] text-gray-300 mt-1">300×250</div>
    </div>
  );
}
