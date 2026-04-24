import { useParams, Link } from "react-router";
import { Clock, MapPin, Tag, Share2, Bookmark, Printer, ChevronRight, ArrowLeft, User, Facebook, Twitter, Linkedin, ChevronLeft, ChevronRight as ChevronRightIcon, X } from "lucide-react";
import { articles } from "../data/newsData";
import { NewsCard } from "../components/NewsCard";
import { Sidebar } from "../components/Sidebar";
import { AdBlock } from "../components/AdBlock";
import { useLiveDateTime } from "../components/LiveClock";
import { useState } from "react";

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

export function Article() {
  const { id } = useParams();
  const { fullDate, timeShort } = useLiveDateTime();
  const article = articles.find(a => a.id === id) || articles[0];
  const related = articles.filter(a => a.id !== article.id && (a.category === article.category || a.region === article.region)).slice(0, 3);
  const moreArticles = articles.filter(a => a.id !== article.id).slice(0, 6);
  const catColor = categoryColors[article.category] || "bg-[#0d1f3c]";

  // Gallery state
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalIndex, setModalIndex] = useState(0);

  // Combine main image + additional images
  const allGalleryImages = [article.image, ...(article.additionalImages || [])];
  const hasGallery = allGalleryImages.length > 1;

  // Gallery navigation functions
  const nextGalleryImage = () => {
    setGalleryIndex((prev) => (prev + 1) % allGalleryImages.length);
  };

  const prevGalleryImage = () => {
    setGalleryIndex((prev) => (prev - 1 + allGalleryImages.length) % allGalleryImages.length);
  };

  // Modal navigation functions
  const nextModalImage = () => {
    setModalIndex((prev) => (prev + 1) % allGalleryImages.length);
  };

  const prevModalImage = () => {
    setModalIndex((prev) => (prev - 1 + allGalleryImages.length) % allGalleryImages.length);
  };

  const openModal = (index: number) => {
    setModalIndex(index);
    setIsModalOpen(true);
  };

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const text = encodeURIComponent(article.title);
    const urls: Record<string, string> = {
      twitter: `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
    };
    window.open(urls[platform] || "#", "_blank");
  };

  const articleBody = article.content;
  
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Fullscreen Modal */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center"
          onClick={() => setIsModalOpen(false)}
        >
          <button 
            onClick={() => setIsModalOpen(false)}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition z-10 bg-black/50 rounded-full p-2"
          >
            <X className="w-8 h-8" />
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); prevModalImage(); }}
            className="absolute left-4 text-white hover:text-gray-300 transition bg-black/50 rounded-full p-3 z-10"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); nextModalImage(); }}
            className="absolute right-4 text-white hover:text-gray-300 transition bg-black/50 rounded-full p-3 z-10"
          >
            <ChevronRightIcon className="w-8 h-8" />
          </button>
          <img 
            src={allGalleryImages[modalIndex]} 
            alt={`Gallery ${modalIndex + 1}`}
            className="max-w-[90vw] max-h-[90vh] object-contain"
            onClick={(e) => e.stopPropagation()}
            onError={(e) => {
              (e.target as HTMLImageElement).src = "https://placehold.co/1200x800/1a1a2e/ffd700?text=Image+Not+Found";
            }}
          />
          <div className="absolute bottom-4 left-0 right-0 text-center text-white text-sm bg-black/50 py-2 mx-auto w-fit px-4 rounded-full">
            {modalIndex + 1} / {allGalleryImages.length}
          </div>
        </div>
      )}

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-screen-xl mx-auto px-3 sm:px-4 py-3 flex items-center gap-2 text-sm text-gray-500 overflow-x-auto">
          <Link to="/" className="hover:text-[#0d1f3c] transition-colors whitespace-nowrap">Home</Link>
          <ChevronRight className="w-4 h-4 flex-shrink-0" />
          <Link to={`/category/${article.category.toLowerCase()}`} className="hover:text-[#0d1f3c] transition-colors whitespace-nowrap">{article.category}</Link>
          <ChevronRight className="w-4 h-4 flex-shrink-0" />
          <span className="text-gray-700 truncate">{article.title.slice(0, 50)}...</span>
        </div>
      </div>

      {/* Live time bar */}
      <div className="bg-[#0a1628] text-xs py-1.5 border-b border-[#1a2f50]">
        <div className="max-w-screen-xl mx-auto px-4 flex items-center gap-3 text-gray-400">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse flex-shrink-0"></span>
          <span className="font-mono">{fullDate} · {timeShort}</span>
          <span className="hidden sm:inline text-gray-600">|</span>
          <span className="hidden sm:inline text-[#00d4ff] font-semibold">The Pride Times — Live Coverage</span>
        </div>
      </div>

      {/* Top Ad Banner */}
      <div className="max-w-screen-xl mx-auto px-3 sm:px-4 pt-4">
        <AdBlock variant="banner" />
      </div>

      <div className="max-w-screen-xl mx-auto px-3 sm:px-4 py-4 sm:py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Article main content */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-1.5 text-sm text-[#00d4ff] hover:text-[#0d1f3c] transition-colors mb-4 font-semibold">
              <ArrowLeft className="w-4 h-4" /> Back to Home
            </Link>

            <article className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100">
              {/* Hero image with navigation */}
              <div className="relative w-full bg-gray-900">
                <img
                  src={allGalleryImages[galleryIndex]}
                  alt={article.title}
                  className="w-full h-auto max-h-[500px] object-contain bg-gray-900"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://placehold.co/1200x600/1a1a2e/ffd700?text=The+Pride+Times";
                  }}
                />

                {/* Navigation Arrows - Only show if multiple images */}
                {hasGallery && (
                  <>
                    <button
                      onClick={(e) => { e.preventDefault(); e.stopPropagation(); prevGalleryImage(); }}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-all duration-200 z-10"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                      onClick={(e) => { e.preventDefault(); e.stopPropagation(); nextGalleryImage(); }}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-all duration-200 z-10"
                    >
                      <ChevronRightIcon className="w-6 h-6" />
                    </button>
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white text-xs px-3 py-1 rounded-full z-10">
                      {galleryIndex + 1} / {allGalleryImages.length}
                    </div>
                  </>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                {article.breaking && (
                  <div className="absolute top-4 left-4 bg-red-600 text-white text-xs font-black px-3 py-1.5 tracking-widest uppercase animate-pulse pointer-events-none">
                    🔴 Breaking News
                  </div>
                )}
                <div className="absolute bottom-4 left-4 flex items-center gap-2 pointer-events-none">
                  <span className={`${catColor} text-white text-xs font-bold px-2 py-1 uppercase tracking-wide`}>
                    {article.category}
                  </span>
                  <span className="bg-black/50 text-white text-xs px-2 py-1 rounded">
                    {article.region}
                  </span>
                </div>
              </div>

              {/* Thumbnail Gallery - Only show if multiple images */}
              {hasGallery && (
                <div className="flex gap-2 p-3 bg-gray-50 border-b border-gray-100 overflow-x-auto">
                  {allGalleryImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setGalleryIndex(idx)}
                      className={`flex-shrink-0 w-14 h-14 rounded-md overflow-hidden border-2 transition-all ${
                        galleryIndex === idx ? 'border-[#00d4ff] ring-1 ring-[#00d4ff]' : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      <img
                        src={img}
                        alt={`Thumb ${idx + 1}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "https://placehold.co/100x100/1a1a2e/ffd700?text=Error";
                        }}
                      />
                    </button>
                  ))}
                  <button
                    onClick={() => openModal(galleryIndex)}
                    className="flex-shrink-0 px-3 bg-gray-200 text-gray-700 rounded-md text-xs font-medium hover:bg-gray-300 transition"
                  >
                    Fullscreen
                  </button>
                </div>
              )}

              <div className="p-4 sm:p-6 md:p-8">
                {/* Meta */}
                <div className="flex items-center gap-2 sm:gap-3 text-xs text-gray-500 mb-4 flex-wrap">
                  <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{article.region}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{article.readTime}</span>
                  <span>•</span>
                  <span>{article.date}</span>
                </div>

                {/* Title */}
                <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-[#0d1f3c] leading-tight mb-4">
                  {article.title}
                </h1>

                {/* Excerpt / lead */}
                <p className="text-base sm:text-lg text-gray-700 leading-relaxed font-medium border-l-4 border-[#00d4ff] pl-4 mb-6">
                  {article.excerpt}
                </p>

                {/* Author info */}
                <div className="flex flex-wrap items-center gap-3 py-4 border-y border-gray-100 mb-6">
                  <div className="w-10 h-10 rounded-full bg-[#0d1f3c] flex items-center justify-center flex-shrink-0">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-sm font-black text-gray-900">{article.author}</div>
                    <div className="text-xs text-gray-500">{article.authorRole} — The Pride Times</div>
                  </div>
                  <div className="ml-auto flex items-center gap-2 flex-wrap">
                    <button
                      onClick={() => handleShare("twitter")}
                      className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-[#1da1f2] transition-colors border border-gray-200 px-2.5 py-1.5 rounded hover:border-[#1da1f2]"
                    >
                      <Twitter className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleShare("facebook")}
                      className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-[#1877f2] transition-colors border border-gray-200 px-2.5 py-1.5 rounded hover:border-[#1877f2]"
                    >
                      <Facebook className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleShare("linkedin")}
                      className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-[#0a66c2] transition-colors border border-gray-200 px-2.5 py-1.5 rounded hover:border-[#0a66c2]"
                    >
                      <Linkedin className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => {
                        navigator.clipboard?.writeText(window.location.href);
                        alert("Link copied to clipboard!");
                      }}
                      className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-[#0d1f3c] transition-colors border border-gray-200 px-2.5 py-1.5 rounded hover:border-[#0d1f3c]"
                    >
                      <Share2 className="w-3.5 h-3.5" /> Share
                    </button>
                    <button
                      onClick={() => alert("Article saved to your reading list!")}
                      className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-[#0d1f3c] transition-colors border border-gray-200 px-2.5 py-1.5 rounded hover:border-[#0d1f3c]"
                    >
                      <Bookmark className="w-3.5 h-3.5" /> Save
                    </button>
                    <button
                      onClick={() => window.print()}
                      className="hidden sm:flex items-center gap-1.5 text-xs text-gray-500 hover:text-[#0d1f3c] transition-colors border border-gray-200 px-2.5 py-1.5 rounded hover:border-[#0d1f3c]"
                    >
                      <Printer className="w-3.5 h-3.5" /> Print
                    </button>
                  </div>
                </div>

                {/* Article body */}
                <div className="prose prose-gray max-w-none">
                  {typeof articleBody === 'string' && articleBody.trim().split("\n\n").map((paragraph, idx) => {
                    const trimmed = paragraph.trim();
                    if (trimmed.startsWith("[IMAGE:") && trimmed.endsWith("]")) {
                      const src = trimmed.slice(7, -1);
                      return (
                        <img
                          key={idx}
                          src={src}
                          alt="Article image"
                          className="w-full h-auto rounded-xl my-6"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = "https://placehold.co/800x500/1a1a2e/ffd700?text=Image+Not+Found";
                          }}
                        />
                      );
                    }
                    return (
                      <p key={idx} className="text-gray-700 leading-relaxed mb-5 text-base">
                        {trimmed}
                      </p>
                    );
                  })}
                </div>

                {/* Inline Ad */}
                <AdBlock variant="rectangle" className="my-8" />

                {/* Tags */}
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Tag className="w-4 h-4 text-gray-400" />
                    {article.tags.map(tag => (
                      <Link
                        key={tag}
                        to={`/search?q=${encodeURIComponent(tag)}`}
                        className="text-xs bg-gray-100 text-gray-600 px-3 py-1.5 rounded hover:bg-[#0d1f3c] hover:text-white transition-colors font-medium"
                      >
                        {tag}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Subscription CTA */}
                <div className="mt-8 bg-gradient-to-r from-[#0d1f3c] to-[#1a3a5c] rounded-xl p-5 sm:p-6 text-white">
                  <div className="text-[#00d4ff] text-xs font-black uppercase tracking-widest mb-2">TPT Intelligence</div>
                  <h3 className="font-black text-lg mb-2">Access Premium Reporting</h3>
                  <p className="text-sm text-gray-300 mb-4">Subscribe to The Pride Times for unlimited access to exclusive enterprise intelligence, in-depth analysis, live market data, and the full magazine archive.</p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Link to="/subscribe" className="flex-1 text-center bg-[#00d4ff] text-[#0d1f3c] py-2.5 rounded font-black text-sm hover:bg-white transition-colors">
                      Subscribe Now
                    </Link>
                    <Link to="/newsletter" className="flex-1 text-center bg-white/10 text-white py-2.5 rounded font-bold text-sm hover:bg-white/20 transition-colors border border-white/20">
                      Free Newsletter
                    </Link>
                  </div>
                </div>
              </div>
            </article>

            {/* Bottom Ad Banner */}
            <AdBlock variant="banner" className="mt-6" />

            {/* Related articles */}
            {related.length > 0 && (
              <section className="mt-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-1 h-6 bg-[#00d4ff]"></div>
                  <h2 className="text-lg font-black text-[#0d1f3c] uppercase tracking-wide">Related Stories</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {related.map(a => (
                    <NewsCard key={a.id} article={a} variant="standard" />
                  ))}
                </div>
              </section>
            )}

            {/* More articles */}
            <section className="mt-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-1 h-6 bg-red-500"></div>
                  <h2 className="text-lg font-black text-[#0d1f3c] uppercase tracking-wide">More From The Pride Times</h2>
                </div>
                <Link to="/" className="text-sm text-[#00d4ff] hover:text-[#0d1f3c] font-semibold transition-colors">
                  All Stories →
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {moreArticles.slice(0, 6).map(a => (
                  <NewsCard key={a.id} article={a} variant="standard" />
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-5">
              <Sidebar />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}