import { Link } from "react-router";
import { ChevronRight, Briefcase, MapPin, ArrowRight } from "lucide-react";

const openRoles = [
  { title: "Senior Technology Reporter", location: "Remote / Global", type: "Full-time" },
  { title: "Financial Markets Analyst", location: "London / Remote", type: "Full-time" },
  { title: "Data Journalist", location: "Remote / Global", type: "Full-time" },
  { title: "Video Producer", location: "Remote / Global", type: "Full-time" },
  { title: "Frontend Engineer", location: "Remote", type: "Full-time" },
];

export function Careers() {
  return (
    <div className="bg-[#0a1628] min-h-screen">
      <div className="bg-gradient-to-br from-[#0a1628] to-[#0d1f3c]">
        <div className="max-w-screen-xl mx-auto px-4 pt-12 pb-16">

          <div className="flex items-center gap-2 text-sm text-gray-400 mb-8">
            <Link to="/" className="hover:text-[#00d4ff] transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white font-medium">Careers</span>
          </div>

          <div className="flex items-center gap-3 mb-4">
            <div className="w-1 h-10 rounded-full bg-[#00d4ff]" />
            <h1 className="text-4xl font-black text-white tracking-tight">Careers</h1>
          </div>
          <p className="text-gray-300 text-base leading-relaxed max-w-2xl">
            Join a global team of journalists, analysts, and technologists shaping the future of enterprise journalism.
          </p>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-4 py-12 space-y-10">

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { title: "Remote-First", desc: "Work from anywhere in the world. We hire globally and support distributed teams." },
            { title: "Mission-Driven", desc: "Join a team that believes in the power of truth and integrity in journalism." },
            { title: "Growth-Focused", desc: "We invest in our people with training, mentorship, and clear career progression." },
          ].map(item => (
            <div key={item.title} className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h3 className="text-white font-black mb-2">{item.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-6 bg-[#00d4ff]" />
            <h2 className="text-lg font-black text-white uppercase tracking-wide">Open Roles</h2>
          </div>
          <div className="space-y-3">
            {openRoles.map(role => (
              <div key={role.title} className="bg-white/5 border border-white/10 rounded-xl p-5 flex items-center justify-between hover:bg-white/10 transition-all group">
                <div>
                  <div className="text-white font-bold">{role.title}</div>
                  <div className="flex items-center gap-4 mt-1">
                    <span className="flex items-center gap-1 text-xs text-gray-400">
                      <MapPin className="w-3 h-3" />{role.location}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-gray-400">
                      <Briefcase className="w-3 h-3" />{role.type}
                    </span>
                  </div>
                </div>
                <a
                  href="mailto:business@thepridetimes.com"
                  className="flex items-center gap-1 text-sm text-[#00d4ff] hover:text-white transition-colors"
                >
                  Apply <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl p-8 text-center">
          <p className="text-gray-300 mb-2">Don't see a role that fits? Send us your CV anyway.</p>
          <a href="mailto:business@thepridetimes.com" className="text-[#00d4ff] hover:underline text-sm">
            business@thepridetimes.com
          </a>
        </div>

      </div>
    </div>
  );
}