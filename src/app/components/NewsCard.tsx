import { Link } from "react-router";
import { Clock, MapPin, Tag } from "lucide-react";
import type { Article } from "../data/newsData";

interface NewsCardProps {
  article: Article;
  variant?: "featured" | "standard" | "compact" | "hero" | "horizontal";
}

const categoryColors: Record<string, string> = {
  Technology: "bg-blue-600",
  Finance: "bg-emerald-600",
  Cybersecurity: "bg-purple-600",
  Energy: "bg-yellow-600",
  Healthcare: "bg-rose-600",
  Manufacturing: "bg-orange-600",
  "Smart Cities": "bg-teal-600",
  "Supply Chain": "bg-indigo-600",
  Markets: "bg-green-600",
  Sustainability: "bg-lime-600",
};

export function NewsCard({ article, variant = "standard" }: NewsCardProps) {
  const catColor = categoryColors[article.category] || "bg-[#0d1f3c]";

  if (variant === "hero") {
    return (
      <Link to={`/article/${article.id}`} className="group block relative overflow-hidden rounded-lg h-full min-h-[320px]">
        <img
          src={article.image}
          alt={article.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        {article.breaking && (
          <div className="absolute top-4 left-4 bg-red-600 text-white text-xs font-black px-2 py-1 tracking-widest uppercase">
            Breaking
          </div>
        )}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="flex items-center gap-2 mb-3">
            <span className={`${catColor} text-white text-xs font-bold px-2 py-0.5 uppercase tracking-wide`}>
              {article.category}
            </span>
            <span className="text-gray-300 text-xs flex items-center gap-1">
              <MapPin className="w-3 h-3" />{article.region}
            </span>
          </div>
          <h2 className="text-white text-2xl font-bold leading-tight mb-3 group-hover:text-[#00d4ff] transition-colors">
            {article.title}
          </h2>
          <p className="text-gray-300 text-sm leading-relaxed line-clamp-2 mb-4">
            {article.excerpt}
          </p>
          <div className="flex items-center gap-3 text-xs text-gray-400">
            <span className="font-semibold text-gray-200">{article.author}</span>
            <span>•</span>
            <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{article.readTime}</span>
            <span>•</span>
            <span>{article.date}</span>
          </div>
        </div>
      </Link>
    );
  }

  if (variant === "featured") {
    return (
      <Link to={`/article/${article.id}`} className="group block relative overflow-hidden rounded-lg h-full min-h-[280px]">
        <img
          src={article.image}
          alt={article.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        {article.breaking && (
          <div className="absolute top-3 left-3 bg-red-600 text-white text-xs font-black px-2 py-0.5 tracking-widest uppercase">
            Breaking
          </div>
        )}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <span className={`${catColor} text-white text-xs font-bold px-2 py-0.5 uppercase tracking-wide inline-block mb-2`}>
            {article.category}
          </span>
          <h3 className="text-white font-bold leading-tight mb-2 group-hover:text-[#00d4ff] transition-colors">
            {article.title}
          </h3>
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{article.readTime}</span>
            <span>•</span>
            <span>{article.date}</span>
          </div>
        </div>
      </Link>
    );
  }

  if (variant === "horizontal") {
    return (
      <Link to={`/article/${article.id}`} className="group flex gap-4 items-start hover:bg-gray-50 p-3 rounded-lg transition-colors">
        <img
          src={article.image}
          alt={article.title}
          className="w-24 h-18 object-cover rounded flex-shrink-0"
          style={{ height: "72px" }}
        />
        <div className="flex-1 min-w-0">
          <span className={`${catColor} text-white text-[10px] font-bold px-1.5 py-0.5 uppercase tracking-wide inline-block mb-1.5`}>
            {article.category}
          </span>
          <h4 className="text-sm font-bold text-gray-900 leading-tight line-clamp-2 group-hover:text-[#0d1f3c] transition-colors mb-1.5">
            {article.title}
          </h4>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span className="flex items-center gap-0.5"><Clock className="w-3 h-3" />{article.readTime}</span>
            <span>•</span>
            <span>{article.date}</span>
          </div>
        </div>
      </Link>
    );
  }

  if (variant === "compact") {
    return (
      <Link to={`/article/${article.id}`} className="group flex gap-3 items-start py-3 border-b border-gray-100 last:border-none hover:bg-gray-50 px-2 transition-colors rounded">
        <div className="flex-1 min-w-0">
          <span className={`${catColor} text-white text-[10px] font-bold px-1.5 py-0.5 uppercase tracking-wide inline-block mb-1`}>
            {article.category}
          </span>
          <h4 className="text-sm font-bold text-gray-900 leading-tight line-clamp-2 group-hover:text-blue-700 transition-colors">
            {article.title}
          </h4>
          <p className="text-xs text-gray-500 mt-1">{article.date}</p>
        </div>
      </Link>
    );
  }

  // Standard card
  return (
    <Link to={`/article/${article.id}`} className="group block bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative overflow-hidden h-48">
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {article.breaking && (
          <div className="absolute top-3 left-3 bg-red-600 text-white text-xs font-black px-2 py-0.5 tracking-widest uppercase">
            Breaking
          </div>
        )}
        <div className="absolute bottom-3 left-3">
          <span className={`${catColor} text-white text-xs font-bold px-2 py-0.5 uppercase tracking-wide`}>
            {article.category}
          </span>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-gray-900 leading-tight mb-2 line-clamp-2 group-hover:text-[#0d1f3c] transition-colors">
          {article.title}
        </h3>
        <p className="text-sm text-gray-600 leading-relaxed line-clamp-2 mb-3">
          {article.excerpt}
        </p>
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span className="font-semibold text-gray-700">{article.author}</span>
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-0.5"><Clock className="w-3 h-3" />{article.readTime}</span>
          </div>
        </div>
        <div className="mt-2 flex items-center gap-1 flex-wrap">
          {article.tags.slice(0, 2).map((tag) => (
            <span key={tag} className="flex items-center gap-0.5 text-[10px] text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded">
              <Tag className="w-2.5 h-2.5" />{tag}
            </span>
          ))}
          <span className="text-[10px] text-gray-400 ml-auto flex items-center gap-0.5">
            <MapPin className="w-2.5 h-2.5" />{article.region}
          </span>
        </div>
      </div>
    </Link>
  );
}
