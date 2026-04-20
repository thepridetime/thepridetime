import { Link } from "react-router";
import { Globe, Users, Award, TrendingUp, ChevronRight } from "lucide-react";

export function About() {
  return (
    <div className="bg-[#0a1628] min-h-screen">
      <div className="bg-gradient-to-br from-[#0a1628] to-[#0d1f3c]">
        <div className="max-w-screen-xl mx-auto px-4 pt-12 pb-16">

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-400 mb-8">
            <Link to="/" className="hover:text-[#00d4ff] transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white font-medium">About</span>
          </div>

          <div className="flex items-center gap-3 mb-4">
            <div className="w-1 h-10 rounded-full bg-[#00d4ff]" />
            <h1 className="text-4xl font-black text-white tracking-tight">About The Pride Times</h1>
          </div>
          <p className="text-gray-300 text-base leading-relaxed max-w-2xl mb-12">
            The world's premier enterprise news platform delivering truth, integrity, and pride-driven journalism across every industry and region of the global economy.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-16">
            {[
              { value: "2.4M+", label: "Global Readers" },
              { value: "195", label: "Nations Reached" },
              { value: "2019", label: "Founded" },
              { value: "50+", label: "Expert Journalists" },
            ].map(stat => (
              <div key={stat.label} className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
                <div className="text-xl font-black text-[#00d4ff]">{stat.value}</div>
                <div className="text-[10px] text-gray-400 mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-4 py-12 space-y-12">
        {/* Mission */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1 h-6 bg-[#00d4ff]" />
            <h2 className="text-lg font-black text-white uppercase tracking-wide">Our Mission</h2>
          </div>
          <p className="text-gray-300 leading-relaxed">
            The Pride Times was founded on a simple but powerful belief: the world's decision-makers deserve journalism that is fearless, rigorous, and deeply sourced. We cover enterprise, finance, technology, and global affairs with the precision of analysts and the integrity of journalists who answer only to the truth.
          </p>
        </div>

        {/* Values */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-6 bg-[#00d4ff]" />
            <h2 className="text-lg font-black text-white uppercase tracking-wide">Our Values</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { icon: Award, title: "Truth", desc: "We report facts as they are, not as anyone wishes them to be. Our editorial independence is absolute." },
              { icon: Users, title: "Integrity", desc: "Every story is held to the highest standards of verification, sourcing, and ethical journalism." },
              { icon: TrendingUp, title: "Pride", desc: "We take pride in serving our readers with intelligence and analysis that drives real decisions." },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white/5 border border-white/10 rounded-xl p-6">
                <Icon className="w-6 h-6 text-[#00d4ff] mb-3" />
                <h3 className="text-white font-black mb-2">{title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Coverage */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-8">
          <div className="flex items-center gap-3 mb-4">
            <Globe className="w-5 h-5 text-[#00d4ff]" />
            <h2 className="text-lg font-black text-white uppercase tracking-wide">Global Coverage</h2>
          </div>
          <p className="text-gray-300 leading-relaxed">
            From Silicon Valley to Singapore, from London's financial district to emerging markets in Africa and Latin America, The Pride Times maintains correspondents and analysts in every major economic hub. Our coverage spans Technology, Finance, Healthcare, Energy, Manufacturing, Supply Chain, Smart Cities, and Cybersecurity.
          </p>
        </div>
      </div>
    </div>
  );
}