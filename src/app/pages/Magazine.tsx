import { useState } from "react";
import { Link } from "react-router";
import { BookOpen, ChevronRight, ArrowRight, Star, Clock, User } from "lucide-react";
import { articles } from "../data/newsData";
import { useLiveDateTime } from "../components/LiveClock";
import { AdBlock } from "../components/AdBlock";


const coverStories = [
  {
    id: "cover-1",
    articleId: "1",
    title: "Why Most Businesses Fail at Digital Marketing",
    subtitle: "April 2026 Cover Story",
    desc: "And how AI-driven systems are turning unpredictable campaigns into scalable, revenue-generating engines.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    author: "Prakash Ray",
    readTime: "6 min read",
    tag: "Cover Story",
    tagColor: "bg-red-600",
  },
  {
    id: "cover-2",
    articleId: "7",
    title: "Why Most Businesses Fail at Digital Marketing",
    subtitle: "Special Report: April 2026",
    desc: "And how AI-driven systems are turning unpredictable campaigns into scalable, revenue-generating engines.",
    image: "/assess/Axis-Elevate-Cover-1.png",
    author: "Sagar Kumar",
    readTime: "22 min read",
    tag: "Special Report",
    tagColor: "bg-emerald-600",
  },
  {
    id: "cover-3",
    articleId: "nvbc-1",
    title: "american brittany club",
    subtitle: "Feature: April 2026",
    desc: "With fusion power now commercially viable and renewables connecting 200 nations, we mark the moment fossil fuels became history.",
    image: "/assess/NVBC-Article-1.png",
    author: "Sagar Kumar",
    readTime: "16 min read",
    tag: "Feature",
    tagColor: "bg-yellow-600",
  },
];

const issues = [
  { month: "April 2026", articles: 48, cover: "AI Revolution", current: true },
  //**{ month: "March 2026", articles: 52, cover: "Digital Finance" },
];

const sections = [
  { name: "In Depth", desc: "Long-form investigative journalism", count: 12 },
  { name: "Interview", desc: "One-on-one with global leaders", count: 6 },
  { name: "Analysis", desc: "Data-driven market intelligence", count: 18 },
  { name: "Commentary", desc: "Expert opinion and perspective", count: 8 },
  { name: "Photo Essay", desc: "The world in pictures", count: 4 },
  { name: "The Briefing", desc: "Fast facts and key numbers", count: 20 },
];

export function Magazine() {
  const [activeIssue, setActiveIssue] = useState("april 2026");
  const { fullDate } = useLiveDateTime();
  const magazineArticles = articles.slice(0, 9);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Magazine Hero */}
      <div className="bg-gradient-to-br from-amber-900 via-yellow-800 to-orange-900 text-white">
        <div className="max-w-screen-xl mx-auto px-4 py-10 sm:py-14">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <div className="text-yellow-300 text-xs font-black uppercase tracking-widest mb-2 flex items-center gap-2">
                <BookOpen className="w-4 h-4" /> The Pride Times Magazine
              </div>
              <h1 className="text-3xl sm:text-4xl font-black leading-tight mb-3">
                April 2026 Issue
              </h1>
              <p className="text-yellow-100 text-lg mb-4">
                "Truth in every page. Pride in every story."
              </p>
              <div className="flex items-center gap-4 text-sm text-yellow-200">
                <span>📅 {fullDate}</span>
                <span>·</span>
                <span>48 Articles</span>
                <span>·</span>
                <span>6 Sections</span>
              </div>
            </div>
            <div className="flex-shrink-0">
              <div className="bg-gradient-to-br from-yellow-600 to-amber-700 rounded-2xl p-6 shadow-2xl w-48 text-center border-4 border-yellow-500">
                <div className="text-yellow-200 text-[10px] font-black uppercase tracking-widest mb-2">The Pride Times</div>
                <div className="text-white text-4xl font-black mb-1">April</div>
                <div className="text-yellow-300 text-lg font-bold">2026</div>
                <div className="mt-3 pt-3 border-t border-yellow-500/40">
                  <div className="text-[10px] text-yellow-200">AI REVOLUTION</div>
                  <div className="text-white text-sm font-black">Cover Story</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-4 py-6 sm:py-8">
        {/* Issue selector */}
        <div className="flex items-center gap-3 mb-6 overflow-x-auto scrollbar-hide pb-2">
          {issues.map(issue => (
            <button
              key={issue.month}
              onClick={() => setActiveIssue(issue.month)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-bold transition-colors border ${activeIssue === issue.month
                  ? "bg-[#0d1f3c] text-white border-[#0d1f3c]"
                  : "bg-white text-gray-600 border-gray-200 hover:border-[#0d1f3c]"
                }`}
            >
              {issue.month}
              {issue.current && <span className="ml-1.5 text-[10px] bg-[#00d4ff] text-[#0d1f3c] px-1.5 py-0.5 rounded-full font-black">NEW</span>}
            </button>
          ))}
        </div>

        {/* Cover Stories */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1 h-6 bg-yellow-500"></div>
            <h2 className="text-xl font-black text-[#0d1f3c] uppercase tracking-wide">Cover Stories — {activeIssue}</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {coverStories.map((story, i) => (
              <Link
                key={story.id}
                to={`/article/${story.articleId}`}
                className={`group rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow ${i === 0 ? "lg:col-span-2 lg:row-span-1" : ""}`}
              >

                <div className={`relative ${i === 0 ? "h-72 sm:h-80" : "h-52"}`}>
                  <img
                    src={story.image}
                    alt={story.title}
                    className={`w-full group-hover:scale-105 transition-transform duration-500 ${i === 0 ? "h-full object-contain bg-gray-900" : "h-full object-cover"
                      }`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className={`${story.tagColor} text-white text-[10px] font-black px-2 py-1 uppercase tracking-wider rounded`}>
                      {story.tag}
                    </span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <div className="text-yellow-300 text-xs font-semibold mb-1">{story.subtitle}</div>
                    <h3 className={`text-white font-black leading-tight mb-2 group-hover:text-yellow-300 transition-colors ${i === 0 ? "text-xl sm:text-2xl" : "text-base"}`}>
                      {story.title}
                    </h3>
                    {i === 0 && <p className="text-gray-300 text-sm line-clamp-2">{story.desc}</p>}
                    <div className="flex items-center gap-3 mt-2 text-xs text-gray-400">
                      <span className="flex items-center gap-1"><User className="w-3 h-3" />{story.author}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{story.readTime}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Magazine sections */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1 h-6 bg-[#00d4ff]"></div>
            <h2 className="text-xl font-black text-[#0d1f3c] uppercase tracking-wide">Magazine Sections</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {sections.map(sec => (
              <button
                key={sec.name}
                className="bg-white rounded-xl p-4 text-center border border-gray-200 hover:border-[#0d1f3c] hover:shadow-md transition-all group"
              >
                <div className="text-sm font-black text-[#0d1f3c] mb-1 group-hover:text-[#00d4ff] transition-colors">{sec.name}</div>
                <div className="text-[10px] text-gray-500 mb-1">{sec.desc}</div>
                <div className="text-[10px] text-[#00d4ff] font-bold">{sec.count} articles</div>
              </button>
            ))}
          </div>
        </div>

        {/* Ad */}
        <AdBlock variant="banner" className="mb-8" />

        {/* Magazine articles grid */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-1 h-6 bg-red-500"></div>
              <h2 className="text-xl font-black text-[#0d1f3c] uppercase tracking-wide">All Articles — {activeIssue}</h2>
            </div>
            <Link to="/" className="text-sm text-[#00d4ff] font-semibold hover:text-[#0d1f3c] transition-colors">
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {magazineArticles.map(article => (
              <Link
                key={article.id}
                to={`/article/${article.id}`}
                className="group bg-white rounded-xl overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow"
              >
                <div className="h-44 overflow-hidden">
                  <img src={article.image} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-black text-[#00d4ff] uppercase tracking-wider">{article.category}</span>
                    {article.breaking && <span className="text-[9px] bg-red-600 text-white px-1.5 py-0.5 rounded font-black">BREAKING</span>}
                  </div>
                  <h3 className="text-sm font-black text-[#0d1f3c] leading-tight line-clamp-2 mb-2 group-hover:text-[#00d4ff] transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-xs text-gray-600 line-clamp-2 mb-3">{article.excerpt}</p>
                  <div className="flex items-center justify-between text-[10px] text-gray-400">
                    <span className="flex items-center gap-1"><User className="w-3 h-3" />{article.author}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{article.readTime}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Subscribe promo */}
        <div className="bg-gradient-to-r from-[#0d1f3c] to-[#1a3a5c] rounded-2xl p-6 sm:p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-5">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Star className="w-5 h-5 text-yellow-400" />
              <span className="text-yellow-400 text-xs font-black uppercase tracking-widest">Premium Access</span>
            </div>
            <h3 className="text-xl font-black mb-1">Get Full Magazine Access</h3>
            <p className="text-gray-300 text-sm">Access every issue, every article, and the complete archive dating back to 2018.</p>
          </div>
          <Link
            to="/subscribe"
            className="flex items-center gap-2 bg-yellow-400 text-yellow-900 px-6 py-3 rounded-xl font-black text-sm hover:bg-white hover:text-[#0d1f3c] transition-colors whitespace-nowrap flex-shrink-0"
          >
            Subscribe Now <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
