import { useParams, Link } from "react-router";
import { ChevronRight, Clock, MapPin, Tag, ArrowRight, BarChart2 } from "lucide-react";
import { articles, categories } from "../data/newsData";
import { NewsCard } from "../components/NewsCard";
import { Sidebar } from "../components/Sidebar";

const categoryMeta: Record<string, {
  description: string;
  color: string;
  stats: { label: string; value: string }[];
  subtopics: string[];
}> = {
  Technology: {
    description: "Comprehensive coverage of enterprise technology, AI, cloud computing, semiconductors, and digital transformation across every global sector.",
    color: "#3b82f6",
    stats: [
      { label: "AI Investment 2026", value: "$2.4T" },
      { label: "Cloud Market Size", value: "$800B" },
      { label: "Articles This Month", value: "1,240" },
      { label: "Tech Startups Tracked", value: "18,400" },
    ],
    subtopics: ["Artificial Intelligence", "Cloud Computing", "Semiconductors", "Quantum Computing", "5G & Connectivity", "Enterprise Software", "Robotics", "IoT"],
  },
  Finance: {
    description: "Global financial markets intelligence covering investment banking, central banking, digital currencies, capital markets, and enterprise financial strategy.",
    color: "#10b981",
    stats: [
      { label: "Daily FX Volume", value: "$7.5T" },
      { label: "Global Equities Mkt", value: "$109T" },
      { label: "DeFi TVL", value: "$840B" },
      { label: "CBDC Nations", value: "94" },
    ],
    subtopics: ["Capital Markets", "Digital Currency", "Investment Banking", "Central Banking", "Private Equity", "Risk & Compliance", "FinTech", "ESG Finance"],
  },
  Cybersecurity: {
    description: "Enterprise cybersecurity intelligence covering threat intelligence, data protection, regulatory compliance, zero-trust architecture, and digital sovereignty.",
    color: "#8b5cf6",
    stats: [
      { label: "Global Cyber Spending", value: "$245B" },
      { label: "Breaches in 2025", value: "14,200" },
      { label: "Nations with Frameworks", value: "140" },
      { label: "Zero-Day Vulnerabilities", value: "2,847" },
    ],
    subtopics: ["Threat Intelligence", "Zero Trust", "Quantum Encryption", "Regulatory Compliance", "Identity Security", "OT Security", "Cloud Security", "Nation-State Threats"],
  },
  Energy: {
    description: "Global energy sector coverage spanning renewables, fossil fuels, grid infrastructure, nuclear power, energy storage, and the digital transformation of utilities.",
    color: "#f59e0b",
    stats: [
      { label: "Renewable Capacity Added", value: "512 GW" },
      { label: "Carbon Credit Market", value: "$2.1T" },
      { label: "Nations in Smart Grid", value: "200" },
      { label: "EV Fleet Worldwide", value: "84M" },
    ],
    subtopics: ["Renewables", "Oil & Gas", "Nuclear Power", "Smart Grid", "Energy Storage", "Hydrogen Economy", "Carbon Markets", "Utilities"],
  },
  Healthcare: {
    description: "In-depth reporting on global healthcare innovation, pharmaceutical development, medical AI, health policy, genomics, and life sciences enterprise transformation.",
    color: "#ef4444",
    stats: [
      { label: "Global Health Spending", value: "$12.5T" },
      { label: "AI Diagnostic Accuracy", value: "99.3%" },
      { label: "Pharma R&D Investment", value: "$340B" },
      { label: "Genomic Sequences/Day", value: "4.2M" },
    ],
    subtopics: ["Medical AI", "Genomics", "Drug Discovery", "Digital Health", "Health Policy", "MedTech Devices", "Personalized Medicine", "Global Health"],
  },
  Manufacturing: {
    description: "Advanced manufacturing intelligence covering Industry 5.0, smart factories, industrial automation, additive manufacturing, and reshoring strategies globally.",
    color: "#f97316",
    stats: [
      { label: "Global Mfg Output", value: "$16.7T" },
      { label: "Automation Penetration", value: "67%" },
      { label: "Smart Factories", value: "12,800" },
      { label: "Productivity Gain (AI)", value: "+400%" },
    ],
    subtopics: ["Smart Factories", "Robotics & Automation", "Industry 5.0", "Additive Manufacturing", "Digital Twins", "Reshoring", "Quality 4.0", "Industrial IoT"],
  },
  "Smart Cities": {
    description: "Urban intelligence reporting on digital city infrastructure, sustainable urban development, mobility innovation, citizen services, and governance technology.",
    color: "#14b8a6",
    stats: [
      { label: "Smart City Investment", value: "$2.5T" },
      { label: "Metros Using Digital Twin", value: "50+" },
      { label: "Cost Reduction", value: "42%" },
      { label: "Service Score Improvement", value: "78%" },
    ],
    subtopics: ["Digital Infrastructure", "Urban Mobility", "Smart Energy Grids", "Citizen Services", "Urban AI", "Sustainable Cities", "Smart Transport", "City Security"],
  },
  "Supply Chain": {
    description: "Global supply chain and logistics intelligence covering blockchain visibility, autonomous logistics, trade policy, last-mile delivery, and resilience strategies.",
    color: "#6366f1",
    stats: [
      { label: "Global Trade Volume", value: "$32T" },
      { label: "Blockchain Adoption", value: "83%" },
      { label: "Autonomous Deliveries/wk", value: "2.4M" },
      { label: "Supply Chain AI Savings", value: "$1.8T" },
    ],
    subtopics: ["Blockchain Logistics", "Autonomous Delivery", "Trade Policy", "Warehousing 4.0", "Cold Chain", "Port Technology", "Procurement AI", "Resilience & Risk"],
  },
  Sustainability: {
    description: "ESG intelligence and sustainability reporting covering corporate decarbonization, green investment, circular economy, climate tech, and global policy frameworks.",
    color: "#84cc16",
    stats: [
      { label: "Carbon Credit Market", value: "$2.1T" },
      { label: "Green Bond Issuance", value: "$1.4T" },
      { label: "Net-Zero Commitments", value: "92% Fortune 500" },
      { label: "Clean Energy Jobs", value: "13.7M" },
    ],
    subtopics: ["Net Zero Strategy", "Carbon Markets", "Green Finance", "Circular Economy", "Climate Tech", "ESG Reporting", "Biodiversity", "Water Security"],
  },
  Markets: {
    description: "Comprehensive global markets intelligence covering equities, fixed income, commodities, forex, digital assets, and The Pride Times Report's proprietary industry indices.",
    color: "#00d4ff",
    stats: [
      { label: "Global Equities", value: "$109T" },
      { label: "Daily FX Volume", value: "$7.5T" },
      { label: "Crypto Market Cap", value: "$4.2T" },
      { label: "Commodities Index", value: "GDNCMD" },
    ],
    subtopics: ["Equities", "Fixed Income", "Commodities", "Forex", "Cryptocurrency", "Derivatives", "ETFs", "Private Markets"],
  },
};

const categoryColors: Record<string, string> = {
  Technology: "bg-blue-600",
  Finance: "bg-emerald-600",
  Cybersecurity: "bg-purple-600",
  Energy: "bg-yellow-600",
  Healthcare: "bg-rose-600",
  Manufacturing: "bg-orange-600",
  "Smart Cities": "bg-teal-600",
  "Supply Chain": "bg-indigo-600",
  Sustainability: "bg-lime-600",
  Markets: "bg-cyan-600",
};

export function Category() {
  const { slug } = useParams();

  const categoryName = categories.find(
    c => c.toLowerCase().replace(/ /g, "-") === slug
  ) || (slug ? slug.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase()) : "Category");

  const meta = categoryMeta[categoryName] || {
    description: `Latest intelligence and analysis from The Pride Times Report on ${categoryName}.`,
    color: "#00d4ff",
    stats: [],
    subtopics: [],
  };

  const catColor = categoryColors[categoryName] || "bg-[#0d1f3c]";

  // Get articles for this category (fall back to all if none match)
  let categoryArticles = articles.filter(
    a => a.category.toLowerCase().replace(/ /g, "-") === slug ||
         a.category === categoryName
  );
  const displayArticles = categoryArticles.length > 0 ? categoryArticles : articles;

  const heroArticle = displayArticles[0];
  const gridArticles = displayArticles.slice(1);
  const latestAll = articles.slice(0, 5);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Category hero banner */}
      <div className="bg-[#0d1f3c]">
        <div className="max-w-screen-xl mx-auto px-4 pt-6 pb-0">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
            <Link to="/" className="hover:text-[#00d4ff] transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white">{categoryName}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pb-6">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-1 h-8 rounded" style={{ background: meta.color }} />
                <h1 className="text-3xl font-black text-white uppercase tracking-wide">{categoryName}</h1>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed mb-5 max-w-2xl">{meta.description}</p>

              {/* Subtopics */}
              {meta.subtopics.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-5">
                  {meta.subtopics.map(sub => (
                    <Link
                      key={sub}
                      to={`/category/${slug}/${sub.toLowerCase().replace(/ /g, "-")}`}
                      className="text-xs px-3 py-1.5 border border-white/20 text-gray-300 rounded hover:bg-white/10 hover:border-white/40 transition-colors"
                    >
                      {sub}
                    </Link>
                  ))}
                </div>
              )}

              {/* Stats */}
              {meta.stats.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {meta.stats.map(stat => (
                    <div key={stat.label} className="bg-white/5 border border-white/10 rounded-lg px-3 py-3">
                      <div className="text-lg font-black text-white" style={{ color: meta.color }}>{stat.value}</div>
                      <div className="text-xs text-gray-400 mt-0.5 leading-tight">{stat.label}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Quick links */}
            <div className="hidden lg:block">
              <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                <div className="text-xs font-black text-gray-400 uppercase tracking-widest mb-3">Quick Navigation</div>
                <ul className="space-y-2">
                  {["Latest News", "Analysis", "Reports", "Data & Research", "Events"].map(item => (
                    <li key={item}>
                      <Link
                        to="#"
                        className="flex items-center justify-between text-sm text-gray-300 hover:text-[#00d4ff] transition-colors group"
                      >
                        {item}
                        <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </Link>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 pt-4 border-t border-white/10">
                  <Link
                    to="/markets"
                    className="flex items-center gap-2 text-sm text-[#00d4ff] hover:text-white transition-colors"
                  >
                    <BarChart2 className="w-4 h-4" />
                    Live Market Data
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">

            {/* Hero article */}
            {heroArticle && (
              <div className="h-80">
                <NewsCard article={heroArticle} variant="hero" />
              </div>
            )}

            {/* Breaking / Featured strip */}
            {displayArticles.some(a => a.breaking) && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <span className="bg-red-600 text-white text-xs font-black px-2 py-0.5 uppercase tracking-widest">Breaking</span>
                  <span className="text-xs text-red-700 font-semibold">Latest Developments in {categoryName}</span>
                </div>
                <div className="space-y-2">
                  {displayArticles.filter(a => a.breaking).map(a => (
                    <Link key={a.id} to={`/article/${a.id}`} className="flex items-start gap-2 group">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 flex-shrink-0" />
                      <p className="text-sm font-bold text-gray-900 group-hover:text-red-700 transition-colors leading-tight">
                        {a.title}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Article grid */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-1 h-6" style={{ background: meta.color }} />
                <h2 className="text-lg font-black text-[#0d1f3c] uppercase tracking-wide">Latest in {categoryName}</h2>
                <span className="text-xs text-gray-400 ml-auto">{displayArticles.length} articles</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {gridArticles.map(article => (
                  <NewsCard key={article.id} article={article} variant="standard" />
                ))}
              </div>
            </div>

            {/* If we have fewer than 3 category articles, show related from other categories */}
            {categoryArticles.length < 3 && (
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-1 h-6 bg-gray-300" />
                  <h2 className="text-lg font-black text-[#0d1f3c] uppercase tracking-wide">More Global Intelligence</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {articles.filter(a => a.category !== categoryName).slice(0, 4).map(article => (
                    <NewsCard key={article.id} article={article} variant="standard" />
                  ))}
                </div>
              </div>
            )}

            {/* Analysis banner */}
            <div className="rounded-xl overflow-hidden" style={{ background: `linear-gradient(135deg, ${meta.color}22, #0d1f3c)` }}>
              <div className="border border-white/10 rounded-xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <div className="text-xs font-black uppercase tracking-widest mb-1" style={{ color: meta.color }}>The Pride Times Intelligence Report</div>
                  <h3 className="text-[#0d1f3c] font-bold text-xl leading-tight">
                    {categoryName} Outlook Q1 2026
                  </h3>
                  <p className="text-gray-600 text-sm mt-1">
                    Deep-dive analysis and strategic forecasting for enterprise leaders
                  </p>
                </div>
                <Link
                  to="/reports"
                  className="flex items-center gap-2 px-5 py-2.5 rounded font-bold text-sm text-white whitespace-nowrap flex-shrink-0 transition-colors"
                  style={{ background: meta.color }}
                >
                  Read Report <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* All recent articles horizontal list */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-1 h-6 bg-[#00d4ff]" />
                <h2 className="text-lg font-black text-[#0d1f3c] uppercase tracking-wide">All Recent Stories</h2>
                <Link to="/latest" className="ml-auto text-sm text-blue-700 font-semibold hover:text-[#0d1f3c] flex items-center gap-1">
                  View All <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg divide-y divide-gray-100">
                {latestAll.map(article => (
                  <Link
                    key={article.id}
                    to={`/article/${article.id}`}
                    className="flex gap-4 p-4 hover:bg-gray-50 transition-colors group"
                  >
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-20 h-16 object-cover rounded flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`${categoryColors[article.category] || "bg-gray-600"} text-white text-[10px] font-bold px-1.5 py-0.5 uppercase tracking-wide`}>
                          {article.category}
                        </span>
                        {article.breaking && (
                          <span className="text-red-600 text-[10px] font-black uppercase tracking-wide">● Breaking</span>
                        )}
                      </div>
                      <h4 className="text-sm font-bold text-gray-900 leading-tight line-clamp-2 group-hover:text-[#0d1f3c] transition-colors">
                        {article.title}
                      </h4>
                      <div className="flex items-center gap-2 mt-1.5 text-xs text-gray-500">
                        <span className="font-medium">{article.author}</span>
                        <span>•</span>
                        <span className="flex items-center gap-0.5"><Clock className="w-3 h-3" />{article.readTime}</span>
                        <span>•</span>
                        <span>{article.date}</span>
                        <span>•</span>
                        <span className="flex items-center gap-0.5"><MapPin className="w-3 h-3" />{article.region}</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1.5 line-clamp-1">{article.excerpt}</p>
                      <div className="flex gap-1 mt-1.5 flex-wrap">
                        {article.tags.slice(0, 2).map(tag => (
                          <span key={tag} className="flex items-center gap-0.5 text-[10px] text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">
                            <Tag className="w-2.5 h-2.5" />{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Load more */}
            <div className="text-center">
              <button className="px-10 py-3 bg-[#0d1f3c] text-white rounded-lg font-bold text-sm hover:bg-[#1a3a5c] transition-colors">
                Load More Stories
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Sidebar />
          </div>
        </div>
      </div>
    </div>
  );
}