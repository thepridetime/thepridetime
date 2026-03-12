import { useSearchParams, Link } from "react-router";
import { Search as SearchIcon, ChevronRight } from "lucide-react";
import { articles } from "../data/newsData";
import { NewsCard } from "../components/NewsCard";
import { Sidebar } from "../components/Sidebar";

export function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  const results = query
    ? articles.filter(a =>
        a.title.toLowerCase().includes(query.toLowerCase()) ||
        a.excerpt.toLowerCase().includes(query.toLowerCase()) ||
        a.category.toLowerCase().includes(query.toLowerCase()) ||
        a.tags.some(t => t.toLowerCase().includes(query.toLowerCase()))
      )
    : [];

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-[#0d1f3c] text-white">
        <div className="max-w-screen-xl mx-auto px-4 py-8">
          <div className="flex items-center gap-2 text-sm text-gray-400 mb-3">
            <Link to="/" className="hover:text-[#00d4ff] transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white">Search Results</span>
          </div>
          <div className="flex items-center gap-3">
            <SearchIcon className="w-8 h-8 text-[#00d4ff]" />
            <div>
              <h1 className="text-2xl font-black">Search Results</h1>
              {query && (
                <p className="text-gray-300 text-sm mt-1">
                  {results.length} result{results.length !== 1 ? "s" : ""} for "{query}"
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            {!query && (
              <div className="bg-white border border-gray-200 rounded-lg p-8 text-center text-gray-500">
                <SearchIcon className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p>Enter a search query to find articles</p>
              </div>
            )}
            {query && results.length === 0 && (
              <div className="bg-white border border-gray-200 rounded-lg p-8 text-center text-gray-500">
                <SearchIcon className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="font-bold mb-2">No results found for "{query}"</p>
                <p className="text-sm">Try different keywords or browse by category</p>
              </div>
            )}
            {results.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {results.map(article => (
                  <NewsCard key={article.id} article={article} variant="standard" />
                ))}
              </div>
            )}
          </div>
          <div className="lg:col-span-1">
            <Sidebar />
          </div>
        </div>
      </div>
    </div>
  );
}
