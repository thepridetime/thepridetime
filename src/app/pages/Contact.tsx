import { Link } from "react-router";
import { ChevronRight, Mail, Globe, Twitter, Linkedin } from "lucide-react";

export function Contact() {
  return (
    <div className="bg-[#0a1628] min-h-screen">
      <div className="bg-gradient-to-br from-[#0a1628] to-[#0d1f3c]">
        <div className="max-w-screen-xl mx-auto px-4 pt-12 pb-16">

          <div className="flex items-center gap-2 text-sm text-gray-400 mb-8">
            <Link to="/" className="hover:text-[#00d4ff] transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white font-medium">Contact Us</span>
          </div>

          <div className="flex items-center gap-3 mb-4">
            <div className="w-1 h-10 rounded-full bg-[#00d4ff]" />
            <h1 className="text-4xl font-black text-white tracking-tight">Contact Us</h1>
          </div>
          <p className="text-gray-300 text-base leading-relaxed max-w-2xl">
            Get in touch with our editorial, advertising, or general enquiries teams.
          </p>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Contact cards */}
          <div className="space-y-4">
            {[
              { title: "General Enquiries", email: "business@thepridetimes.com", desc: "For general questions about The Pride Times." },
              { title: "Editorial Team", email: "business@thepridetimes.com", desc: "Story tips, press releases, and journalist enquiries." },
              { title: "Advertising & Partnerships", email: "business@thepridetimes.com", desc: "Commercial partnerships and advertising opportunities." },
              { title: "Technical Support", email: "business@thepridetimes.com", desc: "Issues with the website or your subscription." },
            ].map(item => (
              <div key={item.title} className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="text-white font-black mb-1">{item.title}</h3>
                <p className="text-gray-400 text-sm mb-3">{item.desc}</p>
                <a href={`mailto:${item.email}`} className="flex items-center gap-2 text-[#00d4ff] text-sm hover:underline">
                  <Mail className="w-4 h-4" />{item.email}
                </a>
              </div>
            ))}
          </div>

          {/* Social & info */}
          <div className="space-y-4">
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h3 className="text-white font-black mb-4">Follow Us</h3>
              <div className="space-y-3">
                {[
                  { icon: Twitter, label: "@thepridetime", href: "https://x.com/thepridetime" },
                  { icon: Linkedin, label: "The Pride Times", href: "https://www.linkedin.com/company/thepridetimes" },
                  { icon: Globe, label: "thepridetimes.com", href: "/" },
                ].map(({ icon: Icon, label, href }) => (
                  <a key={label} href={href} className="flex items-center gap-3 text-gray-300 hover:text-[#00d4ff] transition-colors text-sm">
                    <Icon className="w-4 h-4 text-[#00d4ff]" />{label}
                  </a>
                ))}
              </div>
            </div>

            <div className="bg-[#0d1f3c] border border-[#1a2f50] rounded-xl p-6">
              <div className="flex items-center gap-2 mb-3">
                <Globe className="w-4 h-4 text-[#00d4ff]" />
                <h3 className="text-white font-black">Published Worldwide</h3>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                The Pride Times is a fully remote, globally distributed newsroom. We have no single headquarters — our journalists and staff operate across every time zone to deliver 24/7 enterprise intelligence.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}