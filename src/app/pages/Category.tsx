import { useState, useEffect, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router";
import { ChevronRight, ChevronDown, Clock, MapPin, Tag, ArrowRight, BarChart2 } from "lucide-react";
import { articles, categories } from "../data/newsData";
import { NewsCard } from "../components/NewsCard";
import { Sidebar } from "../components/Sidebar";

// ============================================
// SEARCHABLE SUBTOPICS DROPDOWN COMPONENT
// ============================================
function SearchableSubtopicsDropdown({ 
  subtopics, 
  onSelect 
}: { 
  subtopics: string[]; 
  onSelect: (topic: string) => void;
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filteredSubtopics = subtopics.filter(topic =>
    topic.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (topic: string) => {
    setSelectedTopic(topic);
    setSearchTerm(topic);
    setIsOpen(false);
    onSelect(topic); // ✅ Call the parent handler
  };

  const handleClear = () => {
    setSearchTerm("");
    setSelectedTopic("");
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className="relative w-full">
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder="Type to search topics..."
          className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder-gray-400 focus:outline-none focus:border-[#00d4ff] focus:ring-1 focus:ring-[#00d4ff]"
        />
        {searchTerm && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
          >
            ✕
          </button>
        )}
      </div>

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-[#0d1f3c] border border-[#1a2f50] rounded-lg shadow-xl max-h-60 overflow-y-auto">
          {filteredSubtopics.length > 0 ? (
            filteredSubtopics.map((topic) => (
              <div
                key={topic}
                onClick={() => handleSelect(topic)}
                className={`px-4 py-2 cursor-pointer transition-colors text-sm ${
                  selectedTopic === topic
                    ? "bg-[#00d4ff] text-[#0a1628] font-medium"
                    : "text-gray-300 hover:bg-[#1a2f50] hover:text-white"
                }`}
              >
                {topic}
              </div>
            ))
          ) : (
            <div className="px-4 py-3 text-center text-gray-400 text-sm">
              No topics found
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ============================================
// SUBTOPIC CONTENT COMPONENT
// ============================================
function SubtopicContent({ topic, categoryName }: { topic: string; categoryName: string }) {
  // Filter articles related to this subtopic
  const subtopicArticles = articles.filter(article => 
    article.category === categoryName && 
    article.tags?.some(tag => tag.toLowerCase().includes(topic.toLowerCase()))
  );

  if (subtopicArticles.length === 0) {
    return (
      <div className="bg-white/5 border border-white/10 rounded-xl p-8 text-center">
        <p className="text-gray-400">No articles found for "{topic}"</p>
      </div>
    );
  }

  return (
    <div>
     <div className="flex items-center gap-3 mb-4">
  <div className="w-1 h-6 bg-[#00d4ff]" />
  <h2 className="text-lg font-black text-[#00d4ff] uppercase tracking-wide">
    {topic} - Latest Articles
  </h2>
</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {subtopicArticles.map(article => (
          <NewsCard key={article.id} article={article} variant="standard" />
        ))}
      </div>
    </div>
  );
}

// ============================================
// CATEGORY META DATA
// ============================================
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
    description: "Comprehensive global markets intelligence covering equities, fixed income, commodities, forex, digital assets, and The Pride Times' proprietary industry indices.",
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

// ============================================
// MAIN CATEGORY COMPONENT
// ============================================
export function Category() {
  const { slug } = useParams();
  const [selectedSubtopic, setSelectedSubtopic] = useState<string | null>(null);

  const categoryName = categories.find(
    c => c.toLowerCase().replace(/ /g, "-") === slug
  ) || (slug ? slug.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase()) : "Category");

  const meta = categoryMeta[categoryName] || {
    description: `Latest intelligence and analysis from The Pride Times on ${categoryName}.`,
    color: "#00d4ff",
    stats: [],
    subtopics: [],
  };

  let categoryArticles = articles.filter(
    a => a.category.trim() === categoryName
  );
  const displayArticles = categoryArticles;
  const heroArticle = displayArticles[0];
  const gridArticles = displayArticles.slice(1);

  // Handle subtopic selection
  const handleSubtopicSelect = (topic: string) => {
    setSelectedSubtopic(topic);
    // Scroll to the content
    setTimeout(() => {
      document.getElementById("subtopic-content")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  // Clear selected subtopic
  const clearSubtopic = () => {
    setSelectedSubtopic(null);
  };

return (
  <div className="bg-[#0a1628] min-h-screen">
    {/* Category hero banner */}
    <div className="bg-gradient-to-br from-[#0a1628] to-[#0d1f3c]">
      <div className="max-w-screen-xl mx-auto px-4 pt-12 pb-16">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-400 mb-8">
          <Link to="/" className="hover:text-[#00d4ff] transition-colors">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-white font-medium">{categoryName}</span>
          {selectedSubtopic && (
            <>
              <ChevronRight className="w-4 h-4" />
              <span className="text-[#00d4ff] font-medium">{selectedSubtopic}</span>
            </>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            
            <div className="flex items-center gap-3 mb-4">
              <div className="w-1 h-10 rounded-full" style={{ background: meta.color }} />
              <h1 className="text-4xl font-black text-white tracking-tight">
                {selectedSubtopic ? selectedSubtopic : categoryName}
              </h1>
            </div>
            
            {!selectedSubtopic && (
              <p className="text-gray-300 text-base leading-relaxed mb-6 max-w-2xl">{meta.description}</p>
            )}
            
            {selectedSubtopic && (
              <div className="mb-6">
                <button 
                  onClick={clearSubtopic}
                  className="text-[#00d4ff] text-sm hover:underline flex items-center gap-1"
                >
                  ← Back to all {categoryName} topics
                </button>
                <p className="text-gray-300 text-base leading-relaxed mt-4 max-w-2xl">
                  Latest articles and insights on {selectedSubtopic} from The Pride Times.
                </p>
              </div>
            )}
            
            {/* Subtopics Dropdown */}
            {meta.subtopics.length > 0 && !selectedSubtopic && (
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-bold text-[#00d4ff] uppercase tracking-wider">Browse by Topic</span>
                  <div className="h-px flex-1 bg-white/10"></div>
                </div>
                
                <div className="w-full sm:w-80">
                  <SearchableSubtopicsDropdown 
                    subtopics={meta.subtopics}
                    onSelect={handleSubtopicSelect}
                  />
                </div>
              </div>
            )}
            
            {/* Stats Cards */}
            {meta.stats.length > 0 && !selectedSubtopic && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {meta.stats.map(stat => (
                  <div 
                    key={stat.label} 
                    className="bg-white/5 border border-white/10 rounded-xl p-3 text-center hover:bg-white/10 transition-all"
                  >
                    <div className="text-xl font-black text-white" style={{ color: meta.color }}>{stat.value}</div>
                    <div className="text-[10px] text-gray-400 mt-0.5">{stat.label}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Column */}
          <div className="hidden lg:block">
            <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
              <div className="p-5">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-1 h-5 bg-[#00d4ff] rounded-full"></div>
                  <div className="text-xs font-black text-gray-400 uppercase tracking-wider">Quick Navigation</div>
                </div>
                <ul className="space-y-3">
                  <li>
                    <Link to="/" className="flex items-center justify-between text-sm text-gray-300 hover:text-[#00d4ff] transition-colors group">
                      <span className="flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-gray-500 group-hover:bg-[#00d4ff]"></span>
                        Latest News
                      </span>
                      <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all" />
                    </Link>
                  </li>
                  <li>
                    <Link to="/analysis" className="flex items-center justify-between text-sm text-gray-300 hover:text-[#00d4ff] transition-colors group">
                      <span className="flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-gray-500 group-hover:bg-[#00d4ff]"></span>
                        Analysis
                      </span>
                      <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all" />
                    </Link>
                  </li>
                  <li>
                    <Link to="/reports" className="flex items-center justify-between text-sm text-gray-300 hover:text-[#00d4ff] transition-colors group">
                      <span className="flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-gray-500 group-hover:bg-[#00d4ff]"></span>
                        Reports
                      </span>
                      <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all" />
                    </Link>
                  </li>
                  <li>
                    <Link to="/data-research" className="flex items-center justify-between text-sm text-gray-300 hover:text-[#00d4ff] transition-colors group">
                      <span className="flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-gray-500 group-hover:bg-[#00d4ff]"></span>
                        Data & Research
                      </span>
                      <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all" />
                    </Link>
                  </li>
                  <li>
                    <Link to="/events" className="flex items-center justify-between text-sm text-gray-300 hover:text-[#00d4ff] transition-colors group">
                      <span className="flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-gray-500 group-hover:bg-[#00d4ff]"></span>
                        Events
                      </span>
                      <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all" />
                    </Link>
                  </li>
                </ul>
                <div className="mt-6 pt-4 border-t border-white/10">
                  <Link to="/markets" className="flex items-center gap-2 text-sm text-[#00d4ff] hover:text-white transition-colors">
                    <BarChart2 className="w-4 h-4" />
                    Live Market Data
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    {/* Main Content */}
    <div id="subtopic-content" className="max-w-screen-xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">

          {!selectedSubtopic ? (
            <>
              {/* Hero article */}
              {heroArticle && (
                <div className="h-80">
                  <NewsCard article={heroArticle} variant="hero" />
                </div>
              )}

              {/* Article grid */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-1 h-6" style={{ background: meta.color }} />
                  <h2 className="text-lg font-black text-white uppercase tracking-wide">Latest in {categoryName}</h2>
                  <span className="text-xs text-gray-400 ml-auto">{displayArticles.length} articles</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {gridArticles.map(article => (
                    <NewsCard key={article.id} article={article} variant="standard" />
                  ))}
                </div>
              </div>
            </>
          ) : (
            <SubtopicContent topic={selectedSubtopic} categoryName={categoryName} />
          )}

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