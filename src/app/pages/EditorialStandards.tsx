import { Link } from "react-router";
import { ChevronRight, Shield, Eye, FileText, AlertCircle } from "lucide-react";

export function EditorialStandards() {
  return (
    <div className="bg-[#0a1628] min-h-screen">
      <div className="bg-gradient-to-br from-[#0a1628] to-[#0d1f3c]">
        <div className="max-w-screen-xl mx-auto px-4 pt-12 pb-16">

          <div className="flex items-center gap-2 text-sm text-gray-400 mb-8">
            <Link to="/" className="hover:text-[#00d4ff] transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white font-medium">Editorial Standards</span>
          </div>

          <div className="flex items-center gap-3 mb-4">
            <div className="w-1 h-10 rounded-full bg-[#00d4ff]" />
            <h1 className="text-4xl font-black text-white tracking-tight">Editorial Standards</h1>
          </div>
          <p className="text-gray-300 text-base leading-relaxed max-w-2xl">
            Our commitment to accuracy, independence, and transparency in every story we publish.
          </p>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-4 py-12 space-y-6">
        {[
          { icon: Shield, title: "Independence", body: "The Pride Times editorial team operates with complete independence from advertisers, investors, and any external parties. No story is influenced by commercial relationships. Our newsroom decisions are made solely on journalistic merit." },
          { icon: Eye, title: "Accuracy & Verification", body: "Every factual claim published by The Pride Times is verified through at least two independent sources. Our editors review all stories before publication. Corrections are issued promptly and transparently when errors occur." },
          { icon: FileText, title: "Sourcing Policy", body: "We name our sources wherever possible. Anonymous sourcing is permitted only when a source faces genuine risk and the information is of significant public interest. We never fabricate or composite sources." },
          { icon: AlertCircle, title: "Corrections Policy", body: "We correct errors quickly and transparently. Corrections are appended to the original article with a clear note of what was changed and when. We do not silently alter published content." },
        ].map(({ icon: Icon, title, body }) => (
          <div key={title} className="bg-white/5 border border-white/10 rounded-xl p-8">
            <div className="flex items-center gap-3 mb-4">
              <Icon className="w-5 h-5 text-[#00d4ff]" />
              <h2 className="text-lg font-black text-white uppercase tracking-wide">{title}</h2>
            </div>
            <p className="text-gray-300 leading-relaxed">{body}</p>
          </div>
        ))}

        <div className="bg-white/5 border border-white/10 rounded-xl p-8">
          <p className="text-gray-400 text-sm">
            For editorial queries or to report a factual concern, contact us at{" "}
            <a href="mailto:business@thepridetimes.com" className="text-[#00d4ff] hover:underline">
              business@thepridetimes.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}