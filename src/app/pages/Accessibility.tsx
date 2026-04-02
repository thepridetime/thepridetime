import { Link } from "react-router";
import { Eye, Keyboard, Volume2, Smartphone, Globe, Mail } from "lucide-react";
import { useLiveDateTime } from "../components/LiveClock";

const features = [
  {
    icon: Eye,
    title: "Visual Accessibility",
    items: [
      "High contrast mode with WCAG AA-compliant color ratios",
      "Resizable text supporting up to 200% zoom without loss of content",
      "Alt text on all editorial images and infographics",
      "Dark mode support to reduce eye strain",
      "Clear typographic hierarchy with adequate font sizes",
    ],
  },
  {
    icon: Keyboard,
    title: "Keyboard Navigation",
    items: [
      "Full keyboard navigation throughout the website",
      "Visible focus indicators on all interactive elements",
      "Skip navigation link to bypass repetitive headers",
      "Logical tab order following the visual page structure",
      "Keyboard shortcut support for common actions",
    ],
  },
  {
    icon: Volume2,
    title: "Screen Reader Support",
    items: [
      "Semantic HTML5 throughout, including ARIA landmarks",
      "Descriptive link text and button labels",
      "Live region announcements for market data updates",
      "Form labels properly associated with input fields",
      "Meaningful document structure with heading hierarchy",
    ],
  },
  {
    icon: Smartphone,
    title: "Mobile & Responsive",
    items: [
      "Fully responsive design across all device sizes",
      "Touch targets of minimum 44×44 pixels",
      "Pinch-to-zoom not disabled on any page",
      "Content reflows without horizontal scrolling at 400% zoom",
      "Compatible with iOS VoiceOver and Android TalkBack",
    ],
  },
];

const standards = [
  { standard: "WCAG 2.1 Level AA", status: "Achieved", color: "text-green-600 bg-green-50" },
  { standard: "Section 508 Compliance (US)", status: "Achieved", color: "text-green-600 bg-green-50" },
  { standard: "EN 301 549 (EU)", status: "In Progress", color: "text-yellow-600 bg-yellow-50" },
  { standard: "ADA Title III", status: "Achieved", color: "text-green-600 bg-green-50" },
  { standard: "WCAG 2.2 Level AAA", status: "Planned 2026", color: "text-blue-600 bg-blue-50" },
];

export function Accessibility() {
  const { fullDate } = useLiveDateTime();

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-[#0a1628] text-white py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 text-[#00d4ff] text-xs font-black uppercase tracking-widest mb-3">
            <Globe className="w-4 h-4" /> Accessibility
          </div>
          <h1 className="text-3xl font-black mb-3">Accessibility Statement</h1>
          <p className="text-gray-400">The Pride Times · Last updated: {fullDate}</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-10 space-y-6">
        {/* Commitment */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8">
          <h2 className="text-lg font-black text-[#0d1f3c] mb-4">Our Commitment to Accessibility</h2>
          <p className="text-gray-600 text-sm leading-relaxed mb-4">
            The Pride Times is committed to ensuring that our digital platform is accessible to everyone, including people with disabilities. We believe that access to quality journalism and market intelligence should not be limited by ability, and we work continuously to improve the accessibility of our website and digital products.
          </p>
          <p className="text-gray-600 text-sm leading-relaxed">
            We are working towards conformance with the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA. These guidelines explain how to make web content more accessible to people with disabilities, including users who are blind or have low vision, users who are deaf or hard of hearing, users with motor disabilities, and users with cognitive disabilities.
          </p>
        </div>

        {/* Compliance Status */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8">
          <h2 className="text-lg font-black text-[#0d1f3c] mb-4">Compliance Status</h2>
          <div className="space-y-3">
            {standards.map(s => (
              <div key={s.standard} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-none">
                <span className="text-sm font-semibold text-gray-700">{s.standard}</span>
                <span className={`text-xs font-bold px-3 py-1 rounded-full ${s.color}`}>{s.status}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Features grid */}
        <div>
          <h2 className="text-lg font-black text-[#0d1f3c] mb-4">Accessibility Features</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {features.map(({ icon: Icon, title, items }) => (
              <div key={title} className="bg-white rounded-2xl border border-gray-100 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 bg-[#0d1f3c]/10 rounded-lg flex items-center justify-center">
                    <Icon className="w-5 h-5 text-[#0d1f3c]" />
                  </div>
                  <h3 className="font-black text-[#0d1f3c]">{title}</h3>
                </div>
                <ul className="space-y-2">
                  {items.map(item => (
                    <li key={item} className="flex items-start gap-2 text-sm text-gray-600">
                      <span className="text-[#00d4ff] mt-0.5 flex-shrink-0">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Known issues */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8">
          <h2 className="text-lg font-black text-[#0d1f3c] mb-4">Known Limitations</h2>
          <p className="text-gray-600 text-sm leading-relaxed mb-4">
            We are aware of the following limitations and are working to address them:
          </p>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-start gap-2">
              <span className="text-yellow-500 mt-0.5">⚠</span>
              Live market data charts may not be fully accessible to screen readers. We are working on an alternative text-based data view.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-yellow-500 mt-0.5">⚠</span>
              Some older archived articles may contain images without alt text. We are systematically adding alt text to the archive.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-yellow-500 mt-0.5">⚠</span>
              Video content currently lacks closed captions. We are implementing automated captioning for all video content by Q2 2026.
            </li>
          </ul>
        </div>

        {/* Assistive technology */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8">
          <h2 className="text-lg font-black text-[#0d1f3c] mb-4">Tested With</h2>
          <p className="text-gray-600 text-sm mb-4">We regularly test our platform with the following assistive technologies:</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[
              "NVDA (Windows)", "JAWS (Windows)", "VoiceOver (macOS/iOS)",
              "TalkBack (Android)", "Dragon NaturallySpeaking", "ZoomText",
            ].map(tech => (
              <div key={tech} className="bg-gray-50 rounded-lg p-3 text-sm text-gray-700 font-medium text-center border border-gray-100">
                {tech}
              </div>
            ))}
          </div>
        </div>

        {/* Feedback */}
        <div className="bg-gradient-to-br from-[#0d1f3c] to-[#1a3a5c] rounded-2xl p-6 sm:p-8 text-white">
          <h2 className="text-lg font-black mb-2">Report an Accessibility Issue</h2>
          <p className="text-gray-300 text-sm leading-relaxed mb-5">
            We welcome feedback on the accessibility of The Pride Times. If you experience any barriers or have suggestions for improvement, please contact our dedicated accessibility team.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="mailto:accessibility@thepridetimes.com"
              className="flex items-center gap-2 bg-[#00d4ff] text-[#0d1f3c] px-5 py-3 rounded-lg font-black text-sm hover:bg-white transition-colors"
            >
              <Mail className="w-4 h-4" /> arup.parida@thepridetime.com
            </a>
            <a
              href="tel:+18004774348"
              className="flex items-center gap-2 border border-white/20 text-white px-5 py-3 rounded-lg font-semibold text-sm hover:bg-white/10 transition-colors"
            >
              Call: +91 9529782361
            </a>
          </div>
          <p className="text-xs text-gray-500 mt-3">
            We aim to respond to accessibility feedback within 2 business days.
          </p>
        </div>

        <div className="flex flex-wrap gap-4 text-sm text-gray-500">
          <Link to="/privacy" className="text-[#00d4ff] hover:text-[#0d1f3c] transition-colors">Privacy Policy</Link>
          <Link to="/terms" className="text-[#00d4ff] hover:text-[#0d1f3c] transition-colors">Terms of Use</Link>
          <Link to="/cookie-policy" className="text-[#00d4ff] hover:text-[#0d1f3c] transition-colors">Cookie Policy</Link>
        </div>
      </div>
    </div>
  );
}
