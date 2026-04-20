import { Link } from "react-router";
import { ChevronRight, BarChart2, Globe, Users, Mail } from "lucide-react";

export function Advertise() {
  return (
    <div className="bg-[#0a1628] min-h-screen">
      <div className="bg-gradient-to-br from-[#0a1628] to-[#0d1f3c]">
        <div className="max-w-screen-xl mx-auto px-4 pt-12 pb-16">

          <div className="flex items-center gap-2 text-sm text-gray-400 mb-8">
            <Link to="/" className="hover:text-[#00d4ff] transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white font-medium">Advertise With Us</span>
          </div>

          <div className="flex items-center gap-3 mb-4">
            <div className="w-1 h-10 rounded-full bg-[#00d4ff]" />
            <h1 className="text-4xl font-black text-white tracking-tight">Advertise With Us</h1>
          </div>
          <p className="text-gray-300 text-base leading-relaxed max-w-2xl">
            Reach 2.4M+ senior decision-makers, executives, and enterprise leaders across 195 nations.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-10">
            {[
              { value: "2.4M+", label: "Monthly Readers" },
              { value: "195", label: "Countries" },
              { value: "78%", label: "C-Suite Audience" },
              { value: "8.2min", label: "Avg. Session Time" },
            ].map(stat => (
              <div key={stat.label} className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
                <div className="text-xl font-black text-[#00d4ff]">{stat.value}</div>
                <div className="text-[10px] text-gray-400 mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-4 py-12 space-y-10">

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { icon: BarChart2, title: "Display Advertising", desc: "Premium banner and rich media placements across our industry verticals and regional sections." },
            { icon: Globe, title: "Sponsored Content", desc: "Native editorial partnerships crafted with our content team to reach your target audience." },
            { icon: Users, title: "Newsletter Sponsorship", desc: "Reach our 2.4M subscribers directly through our daily intelligence briefing." },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="bg-white/5 border border-white/10 rounded-xl p-6">
              <Icon className="w-6 h-6 text-[#00d4ff] mb-3" />
              <h3 className="text-white font-black mb-2">{title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-[#0d1f3c] border border-[#1a2f50] rounded-xl p-8 text-center">
          <h2 className="text-white font-black text-xl mb-2">Ready to reach the world's top executives?</h2>
          <p className="text-gray-400 text-sm mb-6">Contact our partnerships team for a media kit and pricing.</p>
          <a
            href="mailto:business@thepridetimes.com"
            className="inline-flex items-center gap-2 bg-[#00d4ff] text-[#0a1628] px-6 py-3 rounded font-black text-sm hover:bg-white transition-colors"
          >
            <Mail className="w-4 h-4" />
            Get in Touch
          </a>
        </div>

      </div>
    </div>
  );
}