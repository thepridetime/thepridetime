import { Link } from "react-router";
import { Clock, MapPin, Tag } from "lucide-react";
import type { Article } from "../data/newsData";
import { useState } from "react";

interface NewsCardProps {
  article: Article;
  variant?: "hero" | "featured" | "large" | "standard" | "compact" | "horizontal";
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
  "Health & Wellness": "bg-teal-600",
  Lifestyle: "bg-pink-600",
};

// Fallback images for when original images fail to load
const getFallbackImage = (category: string): string => {
  const fallbacks: Record<string, string> = {
    Technology: "https://picsum.photos/id/0/600/400",
    Finance: "https://picsum.photos/id/20/600/400",
    Cybersecurity: "https://picsum.photos/id/26/600/400",
    Energy: "https://picsum.photos/id/29/600/400",
    Healthcare: "https://picsum.photos/id/43/600/400",
    Manufacturing: "https://picsum.photos/id/48/600/400",
    "Smart Cities": "https://picsum.photos/id/96/600/400",
    "Supply Chain": "https://picsum.photos/id/60/600/400",
    Markets: "https://picsum.photos/id/77/600/400",
    Sustainability: "https://picsum.photos/id/88/600/400",
  };
  return fallbacks[category] || "https://picsum.photos/id/100/600/400";
};

export function NewsCard({ article, variant = "standard" }: NewsCardProps) {
  const catColor = categoryColors[article.category] || "bg-[#0d1f3c]";
  const [imgError, setImgError] = useState(false);
  
  const imageSrc = imgError ? getFallbackImage(article.category) : article.image;

  // HERO variant
  if (variant === "hero") {
    return (
      <Link to={`/article/${article.id}`} className="group block relative overflow-hidden rounded-lg h-full min-h-[320px] bg-gray-900">
        <img
          src={imageSrc}
          alt={article.title}
          className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
          onError={() => setImgError(true)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        {article.breaking && (
          <div className="absolute top-4 left-4 bg-red-600 text-white text-xs font-black px-2 py-1 tracking-widest uppercase z-10">
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
          <h2 className="text-white text-xl md:text-2xl font-bold leading-tight mb-3 group-hover:text-[#00d4ff] transition-colors line-clamp-2">
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

  // FEATURED variant
  if (variant === "featured") {
    return (
      <Link to={`/article/${article.id}`} className="group block relative overflow-hidden rounded-lg h-full min-h-[280px] bg-gray-900">
        <img
          src={imageSrc}
          alt={article.title}
          className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
          onError={() => setImgError(true)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        {article.breaking && (
          <div className="absolute top-3 left-3 bg-red-600 text-white text-xs font-black px-2 py-0.5 tracking-widest uppercase z-10">
            Breaking
          </div>
        )}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <span className={`${catColor} text-white text-xs font-bold px-2 py-0.5 uppercase tracking-wide inline-block mb-2`}>
            {article.category}
          </span>
          <h3 className="text-white font-bold leading-tight mb-2 group-hover:text-[#00d4ff] transition-colors line-clamp-2 text-base">
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

  // LARGE variant
  if (variant === "large") {
    return (
      <Link to={`/article/${article.id}`} className="group block bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 h-full">
        <div className="relative w-full pt-[56.25%] bg-gray-100">
          <img
            src={imageSrc}
            alt={article.title}
            className="absolute top-0 left-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
            onError={() => setImgError(true)}
          />
          {article.breaking && (
            <div className="absolute top-4 left-4 bg-red-600 text-white text-xs font-black px-2 py-1 tracking-widest uppercase z-10">
              Breaking
            </div>
          )}
          <div className="absolute bottom-4 left-4">
            <span className={`${catColor} text-white text-xs font-bold px-2 py-1 uppercase tracking-wide`}>
              {article.category}
            </span>
          </div>
        </div>
        <div className="p-5">
          <h3 className="text-lg font-black text-gray-900 leading-tight mb-2 line-clamp-2 group-hover:text-[#0d1f3c] transition-colors">
            {article.title}
          </h3>
          <p className="text-gray-600 leading-relaxed line-clamp-2 mb-3 text-sm">
            {article.excerpt}
          </p>
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span className="font-semibold text-gray-700">{article.author}</span>
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{article.readTime}</span>
              <span>•</span>
              <span>{article.date}</span>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  // HORIZONTAL variant
  if (variant === "horizontal") {
    return (
      <Link to={`/article/${article.id}`} className="group flex gap-4 items-start hover:bg-gray-50 p-3 rounded-lg transition-colors">
        <div className="flex-shrink-0 w-24 h-20 overflow-hidden rounded bg-gray-100">
          <img
            src={imageSrc}
            alt={article.title}
            className="w-full h-full object-cover object-center"
            onError={() => setImgError(true)}
          />
        </div>
        <div className="flex-1 min-w-0">
          <span className={`${catColor} text-white text-[10px] font-bold px-1.5 py-0.5 uppercase tracking-wide inline-block mb-1.5 rounded`}>
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

  // COMPACT variant
  if (variant === "compact") {
    return (
      <Link to={`/article/${article.id}`} className="group flex gap-3 items-start py-3 border-b border-gray-100 last:border-none hover:bg-gray-50 px-2 transition-colors rounded">
        <div className="flex-1 min-w-0">
          <span className={`${catColor} text-white text-[10px] font-bold px-1.5 py-0.5 uppercase tracking-wide inline-block mb-1 rounded`}>
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

  // STANDARD variant (default)
  return (
    <Link to={`/article/${article.id}`} className="group block bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow h-full">
      <div className="relative w-full pt-[56.25%] bg-gray-100">
        <img
          src={imageSrc}
          alt={article.title}
          className="absolute top-0 left-0 w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
          onError={() => setImgError(true)}
        />
        {article.breaking && (
          <div className="absolute top-3 left-3 bg-red-600 text-white text-xs font-black px-2 py-0.5 tracking-widest uppercase z-10">
            Breaking
          </div>
        )}
        <div className="absolute bottom-3 left-3">
          <span className={`${catColor} text-white text-xs font-bold px-2 py-0.5 uppercase tracking-wide rounded`}>
            {article.category}
          </span>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-gray-900 leading-tight mb-2 line-clamp-2 group-hover:text-[#0d1f3c] transition-colors text-base">
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