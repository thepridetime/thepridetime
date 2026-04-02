import { Link } from "react-router";
import { Home, Search } from "lucide-react";
import logo from "/src/app/assess/logos.png";
import icon from "/src/app/assess/icon.png";

export function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <img src={logo} alt="The Pride Times" className="w-16 h-16 rounded-xl object-cover mx-auto mb-6 border-2 border-[#00d4ff]/40" />
        <h1 className="text-6xl font-black text-[#0d1f3c] mb-4">404</h1>
        <h2 className="text-xl font-bold text-gray-700 mb-3">Page Not Found</h2>
        <p className="text-gray-500 text-sm mb-8 leading-relaxed">
          The page you're looking for may have been moved, deleted, or doesn't exist in our global network. Our team of correspondents is everywhere — but not here.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/"
            className="flex items-center gap-2 bg-[#0d1f3c] text-white px-6 py-3 rounded font-bold text-sm hover:bg-[#1a3a5c] transition-colors"
          >
            <Home className="w-4 h-4" /> Return Home
          </Link>
          <Link
            to="/search"
            className="flex items-center gap-2 border border-gray-300 text-gray-600 px-6 py-3 rounded font-bold text-sm hover:border-[#0d1f3c] hover:text-[#0d1f3c] transition-colors"
          >
            <Search className="w-4 h-4" /> Search News
          </Link>
        </div>
      </div>
    </div>
  );
}