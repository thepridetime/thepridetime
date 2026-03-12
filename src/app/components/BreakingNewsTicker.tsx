import { useState, useEffect } from "react";
import { AlertCircle } from "lucide-react";
import { breakingNews } from "../data/newsData";

export function BreakingNewsTicker() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % breakingNews.length);
        setIsTransitioning(false);
      }, 400);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-red-600 text-white">
      <div className="max-w-screen-xl mx-auto px-4 flex items-center h-9">
        <div className="flex items-center gap-2 flex-shrink-0 bg-red-800 px-3 py-1 mr-4">
          <AlertCircle className="w-3.5 h-3.5 animate-pulse" />
          <span className="text-xs font-black tracking-widest uppercase">Breaking</span>
        </div>
        <div className="flex-1 overflow-hidden relative h-full flex items-center">
          <p
            className={`text-sm font-medium transition-opacity duration-400 whitespace-nowrap overflow-hidden text-ellipsis ${
              isTransitioning ? "opacity-0" : "opacity-100"
            }`}
          >
            {breakingNews[currentIndex]}
          </p>
        </div>
        <div className="flex items-center gap-1.5 flex-shrink-0 ml-4">
          {breakingNews.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`w-1.5 h-1.5 rounded-full transition-all ${
                i === currentIndex ? "bg-white" : "bg-red-400"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
