import { useState } from "react";
import { Link } from "react-router";
import { ChevronRight, ArrowRight, BarChart2, Globe2, Award, Users } from "lucide-react";
import { articles, categories } from "../data/newsData";
import { NewsCard } from "../components/NewsCard";
import { Sidebar } from "../components/Sidebar";

export function Home() {
  const [activeCategory, setActiveCategory] = useState("All");

  const featuredArticle = articles[0];
  const secondaryFeatured = articles.slice(1, 3);
  const latestArticles = articles.slice(3, 7);
  const moreArticles = articles.slice(0, 9);

  const categoryFilterOptions = ["All", ...categories.slice(0, 6)];
  const filteredArticles = activeCategory === "All"
    ? moreArticles
    : moreArticles.filter(a => a.category === activeCategory);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Stats bar */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-screen-xl mx-auto px-4 py-3">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Globe2, label: "Global Correspondents", value: "850+" },
              { icon: BarChart2, label: "Industries Covered", value: "47" },
              { icon: Users, label: "Enterprise Readers", value: "2.4M+" },
              { icon: Award, label: "Nations Represented", value: "195" },
            ].map((stat, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[#0d1f3c]/10 rounded flex items-center justify-center flex-shrink-0">
                  <stat.icon className="w-4 h-4 text-[#0d1f3c]" />
                </div>
                <div>
                  <div className="text-sm font-black text-[#0d1f3c]">{stat.value}</div>
                  <div className="text-xs text-gray-500">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Hero + secondary featured */}
            <section>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-auto md:h-[480px]">
                <div className="md:col-span-1 h-[480px]">
                  <NewsCard article={featuredArticle} variant="hero" />
                </div>
                <div className="md:col-span-1 grid grid-rows-2 gap-4 h-[480px]">
                  {secondaryFeatured.map(article => (
                    <NewsCard key={article.id} article={article} variant="featured" />
                  ))}
                </div>
              </div>
            </section>

            {/* Latest News Section */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-1 h-6 bg-[#00d4ff]"></div>
                  <h2 className="text-lg font-black text-[#0d1f3c] uppercase tracking-wide">Latest News</h2>
                </div>
                <Link to="/latest" className="flex items-center gap-1 text-sm text-blue-700 font-semibold hover:text-[#0d1f3c] transition-colors">
                  All News <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {latestArticles.map(article => (
                  <NewsCard key={article.id} article={article} variant="standard" />
                ))}
              </div>
            </section>

            {/* Industry Intelligence banner */}
            <section className="bg-gradient-to-r from-[#0d1f3c] to-[#1a3a5c] rounded-lg p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <div className="text-[#00d4ff] text-xs font-black uppercase tracking-widest mb-1">The Pride Times Intelligence Series</div>
                <h3 className="text-white font-bold text-xl leading-tight">Q1 2026 Enterprise Technology Report</h3>
                <p className="text-gray-300 text-sm mt-1">Comprehensive analysis of AI, cloud, and digital transformation trends</p>
              </div>
              <Link
                to="/reports"
                className="flex items-center gap-2 bg-[#00d4ff] text-[#0d1f3c] px-6 py-3 rounded font-bold text-sm hover:bg-white transition-colors whitespace-nowrap flex-shrink-0"
              >
                Read Report <ArrowRight className="w-4 h-4" />
              </Link>
            </section>

            {/* Filtered news grid */}
            <section>
              <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-1 h-6 bg-red-500"></div>
                  <h2 className="text-lg font-black text-[#0d1f3c] uppercase tracking-wide">Industry Intelligence</h2>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  {categoryFilterOptions.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`px-3 py-1 rounded text-xs font-bold transition-colors ${
                        activeCategory === cat
                          ? "bg-[#0d1f3c] text-white"
                          : "bg-white border border-gray-200 text-gray-600 hover:border-[#0d1f3c] hover:text-[#0d1f3c]"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {filteredArticles.map(article => (
                  <NewsCard key={article.id} article={article} variant="standard" />
                ))}
              </div>
            </section>

            {/* Regional coverage */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-1 h-6 bg-yellow-500"></div>
                <h2 className="text-lg font-black text-[#0d1f3c] uppercase tracking-wide">Global Coverage</h2>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {["North America", "Europe", "Asia-Pacific", "Middle East", "Africa", "Latin America", "Global Markets", "Emerging Markets"].map(region => (
                  <Link
                    key={region}
                    to={`/region/${region.toLowerCase().replace(/ /g, "-")}`}
                    className="bg-white border border-gray-200 rounded-lg p-3 text-center hover:border-[#0d1f3c] hover:shadow-md transition-all group"
                  >
                    <Globe2 className="w-5 h-5 text-[#0d1f3c] mx-auto mb-1.5 group-hover:text-[#00d4ff] transition-colors" />
                    <div className="text-xs font-bold text-gray-800">{region}</div>
                  </Link>
                ))}
              </div>
            </section>
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