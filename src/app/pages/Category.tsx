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
    onSelect(topic);
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
// DYNAMIC META DATA - FIXED FOR REGIONS
// ============================================
const getDynamicMeta = (name: string, articlesList: typeof articles, isRegion: boolean) => {
  let filteredArticles: typeof articles = [];
  
  if (isRegion) {
    // For regions, filter by region
    filteredArticles = articlesList.filter(a => 
      a.region?.toLowerCase() === name.toLowerCase()
    );
  } else {
    // For categories, filter by category
    filteredArticles = articlesList.filter(a => a.category === name);
  }
  
  const stats = [
    { label: "Total Articles", value: filteredArticles.length.toString() },
    { label: "This Month", value: filteredArticles.filter(a => a.date.includes("April")).length.toString() },
    { label: "Authors", value: new Set(filteredArticles.map(a => a.author)).size.toString() },
    { label: "Regions", value: new Set(filteredArticles.map(a => a.region)).size.toString() },
  ];

  const subtopics = [...new Set(filteredArticles.flatMap(a => a.tags || []))].slice(0, 8);

  const colors: Record<string, string> = {
    Technology: "#3b82f6",
    Finance: "#10b981",
    Cybersecurity: "#8b5cf6",
    Energy: "#f59e0b",
    Healthcare: "#ef4444",
    Manufacturing: "#f97316",
    "Smart Cities": "#14b8a6",
    "Supply Chain": "#6366f1",
    Sustainability: "#84cc16",
    Markets: "#00d4ff",
    "Health & Wellness": "#14b8a6",
    Lifestyle: "#ec4899",
  };

  return {
    description: isRegion 
      ? `Latest news, analysis, and intelligence from ${name}.` 
      : `Latest intelligence and analysis from The Pride Times on ${name}.`,
    color: colors[name] || "#00d4ff",
    stats: stats,
    subtopics: subtopics,
  };
};

// ============================================
// MAIN CATEGORY/REGION COMPONENT
// ============================================
export function Category() {
  const { slug } = useParams();
  const [selectedSubtopic, setSelectedSubtopic] = useState<string | null>(null);
  const navigate = useNavigate();

  // Check if this is a region page
  const isRegion = window.location.pathname.startsWith('/region/');
  
  let displayName = "";
  let regionName = "";
  
  if (isRegion) {
    // Convert URL slug to proper region name
    regionName = slug?.replace(/-/g, " ")
      .split(" ")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ") || "";
    displayName = regionName;
  } else {
    displayName = categories.find(
      c => c.toLowerCase().replace(/ /g, "-") === slug
    ) || (slug ? slug.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase()) : "Category");
  }

  // Get articles based on type
  let categoryArticles: typeof articles = [];
  if (isRegion) {
    // Case-insensitive region matching
    categoryArticles = articles.filter(a => 
      a.region?.toLowerCase() === regionName.toLowerCase()
    );
    console.log(`🔍 Region: ${regionName}, Found: ${categoryArticles.length} articles`);
  } else {
    categoryArticles = articles.filter(a => a.category.trim() === displayName);
    console.log(`🔍 Category: ${displayName}, Found: ${categoryArticles.length} articles`);
  }

  // Get dynamic meta data
  const meta = getDynamicMeta(displayName, articles, isRegion);
  
  const heroArticle = categoryArticles[0];
  const gridArticles = categoryArticles.slice(1);

  const handleSubtopicSelect = (topic: string) => {
    setSelectedSubtopic(topic);
    setTimeout(() => {
      document.getElementById("subtopic-content")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const clearSubtopic = () => {
    setSelectedSubtopic(null);
  };

  // Show message if no articles found
  if (categoryArticles.length === 0) {
    return (
      <div className="bg-[#0a1628] min-h-screen">
        <div className="max-w-screen-xl mx-auto px-4 py-20 text-center">
          <div className="mb-6">
            <span className="text-6xl">{isRegion ? "🌎" : "📰"}</span>
          </div>
          <h1 className="text-4xl font-black text-white mb-4">{displayName}</h1>
          <p className="text-gray-400 text-lg mb-6 max-w-md mx-auto">
            {isRegion 
              ? `We're currently building our coverage for ${displayName}. Check back soon for local news and analysis.`
              : `We're currently building our ${displayName} coverage. Check back soon for the latest intelligence and analysis.`
            }
          </p>
          <Link to="/" className="bg-[#00d4ff] text-[#0a1628] px-6 py-3 rounded-lg font-bold hover:bg-white transition-colors">
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#0a1628] min-h-screen">
      {/* Hero banner */}
      <div className="bg-gradient-to-br from-[#0a1628] to-[#0d1f3c]">
        <div className="max-w-screen-xl mx-auto px-4 pt-12 pb-16">
          
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-400 mb-8">
            <Link to="/" className="hover:text-[#00d4ff] transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            {isRegion ? (
              <>
                <Link to="/" className="hover:text-[#00d4ff]">Global Coverage</Link>
                <ChevronRight className="w-4 h-4" />
                <span className="text-white font-medium">{displayName}</span>
              </>
            ) : (
              <span className="text-white font-medium">{displayName}</span>
            )}
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
                  {selectedSubtopic ? selectedSubtopic : displayName}
                </h1>
                {isRegion && <MapPin className="w-6 h-6 text-[#00d4ff]" />}
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
                    ← Back to all {displayName} topics
                  </button>
                  <p className="text-gray-300 text-base leading-relaxed mt-4 max-w-2xl">
                    Latest articles and insights on {selectedSubtopic} from The Pride Times.
                  </p>
                </div>
              )}
              
              {/* Subtopics Dropdown - only for categories, not regions */}
              {meta.subtopics.length > 0 && !selectedSubtopic && !isRegion && (
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
              
              {/* Stats Cards - Now shows correct counts for regions */}
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
            </div>

            {/* Right Column - Quick Navigation */}
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
                      <Link to="/magazine" className="flex items-center justify-between text-sm text-gray-300 hover:text-[#00d4ff] transition-colors group">
                        <span className="flex items-center gap-2">
                          <span className="w-1 h-1 rounded-full bg-gray-500 group-hover:bg-[#00d4ff]"></span>
                          Magazine
                        </span>
                        <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all" />
                      </Link>
                    </li>
                    <li>
                      <Link to="/markets" className="flex items-center justify-between text-sm text-gray-300 hover:text-[#00d4ff] transition-colors group">
                        <span className="flex items-center gap-2">
                          <span className="w-1 h-1 rounded-full bg-gray-500 group-hover:bg-[#00d4ff]"></span>
                          Markets
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
                  </ul>
                  <div className="mt-6 pt-4 border-t border-white/10">
                    <Link to="/subscribe" className="flex items-center gap-2 text-sm text-[#00d4ff] hover:text-white transition-colors">
                      <BarChart2 className="w-4 h-4" />
                      Subscribe for Premium
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
                    <h2 className="text-lg font-black text-white uppercase tracking-wide">
                      {isRegion ? `Latest from ${displayName}` : `Latest in ${displayName}`}
                    </h2>
                    <span className="text-xs text-gray-400 ml-auto">{categoryArticles.length} articles</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {gridArticles.map(article => (
                      <NewsCard key={article.id} article={article} variant="standard" />
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <SubtopicContent topic={selectedSubtopic} categoryName={displayName} />
            )}

            {/* Load more button */}
            {gridArticles.length > 6 && (
              <div className="text-center">
                <button className="px-10 py-3 bg-[#0d1f3c] text-white rounded-lg font-bold text-sm hover:bg-[#1a3a5c] transition-colors">
                  Load More Stories
                </button>
              </div>
            )}
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