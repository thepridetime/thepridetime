import { Link } from "react-router";
import { FileText, Download, ChevronRight, Lock, Star } from "lucide-react";
import { useLiveDateTime } from "../components/LiveClock";
import { AdBlock } from "../components/AdBlock";

const reports = [
  {
    id: "r1",
    title: "Q1 2026 Global Enterprise Technology Report",
    subtitle: "TPT Intelligence Series",
    desc: "Comprehensive analysis of AI adoption, cloud infrastructure, and digital transformation across 195 nations and 47 industries.",
    pages: 148,
    date: "March 2026",
    tag: "Technology",
    tagColor: "bg-blue-600",
    premium: false,
    downloads: "48,200",
  },
  {
    id: "r2",
    title: "Global Capital Markets Outlook 2026",
    subtitle: "Finance Intelligence Report",
    desc: "In-depth analysis of equity markets, fixed income, commodities, and the rise of DeFi in the global financial ecosystem.",
    pages: 112,
    date: "March 2026",
    tag: "Finance",
    tagColor: "bg-emerald-600",
    premium: true,
    downloads: "31,800",
  },
  {
    id: "r3",
    title: "Cybersecurity Threat Landscape Report 2026",
    subtitle: "Digital Security Intelligence",
    desc: "Analysis of emerging threats, nation-state actors, ransomware evolution, and post-quantum cryptography strategies for enterprise.",
    pages: 96,
    date: "February 2026",
    tag: "Cybersecurity",
    tagColor: "bg-purple-600",
    premium: true,
    downloads: "27,400",
  },
  {
    id: "r4",
    title: "Global Energy Transition Report",
    subtitle: "Energy & Sustainability Series",
    desc: "Tracking the world's shift from fossil fuels to renewables: investment flows, policy frameworks, and the fusion energy breakthrough.",
    pages: 124,
    date: "February 2026",
    tag: "Energy",
    tagColor: "bg-yellow-600",
    premium: false,
    downloads: "22,600",
  },
  {
    id: "r5",
    title: "Healthcare Innovation Intelligence Report",
    subtitle: "Life Sciences & MedTech",
    desc: "AI diagnostics, digital therapeutics, precision medicine, and the $340B pharmaceutical digital health consortium.",
    pages: 88,
    date: "January 2026",
    tag: "Healthcare",
    tagColor: "bg-rose-600",
    premium: true,
    downloads: "18,900",
  },
  {
    id: "r6",
    title: "Smart Cities & Urban Tech Report 2026",
    subtitle: "Infrastructure Intelligence",
    desc: "Digital twin cities, autonomous urban systems, AI governance platforms, and the $4.2T global smart city market.",
    pages: 104,
    date: "January 2026",
    tag: "Smart Cities",
    tagColor: "bg-teal-600",
    premium: false,
    downloads: "15,700",
  },
];

export function Reports() {
  const { fullDate } = useLiveDateTime();

  const handleDownload = (report: typeof reports[0]) => {
    if (report.premium) {
      alert("This is a Premium report. Please subscribe to access all TPT intelligence reports.");
    } else {
      alert(`Downloading "${report.title}"... Thank you for reading The Pride Times!`);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero */}
      <div className="bg-gradient-to-br from-[#0a1628] to-[#1a3a5c] text-white py-12 px-4">
        <div className="max-w-screen-xl mx-auto">
          <div className="text-[#00d4ff] text-xs font-black uppercase tracking-widest mb-2">TPT Reports</div>
          <h1 className="text-3xl sm:text-4xl font-black mb-3">Intelligence Reports Library</h1>
          <p className="text-gray-300 text-lg max-w-2xl mb-4">
            In-depth research, analysis, and intelligence from The Pride Times' global team of correspondents, analysts, and industry experts.
          </p>
          <div className="text-xs text-gray-500 font-mono">{fullDate}</div>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Reports Published", val: "40+" },
            { label: "Industries Covered", val: "47" },
            { label: "Total Downloads", val: "1M+" },
            { label: "Nations Analyzed", val: "195" },
          ].map(s => (
            <div key={s.label} className="bg-white rounded-xl p-4 text-center border border-gray-100">
              <div className="text-2xl font-black text-[#0d1f3c] mb-1">{s.val}</div>
              <div className="text-xs text-gray-500">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Ad */}
        <AdBlock variant="banner" className="mb-8" />

        {/* Reports grid */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-1 h-6 bg-[#00d4ff]"></div>
          <h2 className="text-xl font-black text-[#0d1f3c] uppercase tracking-wide">Latest Reports</h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-8">
          {reports.map(report => (
            <div key={report.id} className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-5 sm:p-6">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <div className="text-[10px] text-gray-500 mb-1">{report.subtitle}</div>
                    <div className="flex items-center gap-2">
                      <span className={`${report.tagColor} text-white text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-wide`}>
                        {report.tag}
                      </span>
                      {report.premium && (
                        <span className="flex items-center gap-1 text-[10px] bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded font-bold">
                          <Star className="w-2.5 h-2.5" /> Premium
                        </span>
                      )}
                    </div>
                  </div>
                  <FileText className="w-8 h-8 text-gray-300 flex-shrink-0" />
                </div>
                <h3 className="font-black text-[#0d1f3c] text-base leading-tight mb-2">{report.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-4">{report.desc}</p>
                <div className="flex items-center gap-4 text-xs text-gray-400 mb-4">
                  <span>{report.pages} pages</span>
                  <span>·</span>
                  <span>{report.date}</span>
                  <span>·</span>
                  <span>{report.downloads} downloads</span>
                </div>
                <button
                  onClick={() => handleDownload(report)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-bold text-sm transition-colors w-full justify-center ${
                    report.premium
                      ? "bg-yellow-50 text-yellow-700 border border-yellow-200 hover:bg-yellow-100"
                      : "bg-[#0d1f3c] text-white hover:bg-[#1a3a5c]"
                  }`}
                >
                  {report.premium ? (
                    <><Lock className="w-4 h-4" /> Unlock with Premium</>
                  ) : (
                    <><Download className="w-4 h-4" /> Download Free Report</>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Subscribe CTA */}
        <div className="bg-gradient-to-r from-[#0d1f3c] to-[#1a3a5c] rounded-2xl p-6 sm:p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-5">
          <div>
            <div className="text-[#00d4ff] text-xs font-black uppercase tracking-widest mb-2">Premium Access</div>
            <h3 className="text-xl font-black mb-1">Unlock All Intelligence Reports</h3>
            <p className="text-gray-300 text-sm">Access our full library of 240+ intelligence reports, industry analysis, and exclusive data sets.</p>
          </div>
          <Link
            to="/subscribe"
            className="flex items-center gap-2 bg-[#00d4ff] text-[#0d1f3c] px-6 py-3 rounded-xl font-black text-sm hover:bg-white transition-colors whitespace-nowrap flex-shrink-0"
          >
            Subscribe Now <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
