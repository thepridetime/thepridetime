import { Link } from "react-router";
import { Shield, ChevronRight } from "lucide-react";
import { useLiveDateTime } from "../components/LiveClock";

const sections = [
  {
    title: "1. Introduction",
    content: `The Pride Times ("we," "us," or "our") is committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.

    We operate as a global enterprise news platform serving readers in 195 nations. Our headquarters are registered in New York, United States, with additional registered offices in London, United Kingdom, and Singapore. We are committed to complying with applicable data protection laws worldwide, including GDPR, CCPA, and PDPA.`,
  },
  {
    title: "2. Information We Collect",
    content: `We collect information that you provide directly to us, such as when you create an account, subscribe to our newsletter, purchase a subscription, or contact us for support. This includes:

    • Personal identification information (name, email address, phone number)
    • Billing and payment information (processed securely via Stripe)
    • Account credentials (email, password — stored using bcrypt hashing)
    • Communication preferences and newsletter settings
    • Professional information (job title, company name) — optional
    • Reading preferences and article interaction data

    We also collect information automatically when you use our services, including IP address, browser type, operating system, pages viewed, time spent on pages, referring URLs, and device identifiers.`,
  },
  {
    title: "3. How We Use Your Information",
    content: `We use the information we collect to:

    • Provide, maintain, and improve our news and market data services
    • Process transactions and manage your subscription
    • Send you newsletters, market alerts, and editorial notifications (with your consent)
    • Respond to your comments, questions, and customer service requests
    • Analyze usage patterns to improve user experience and content quality
    • Detect, prevent, and address technical issues and security threats
    • Comply with legal obligations across jurisdictions where we operate
    • Conduct market research and audience analytics (aggregated and anonymized)`,
  },
  {
    title: "4. Sharing Your Information",
    content: `We do not sell your personal data to third parties. We may share your information with:

    • Service providers who assist us in operating our website and services (cloud hosting, payment processing, email delivery, analytics)
    • Professional advisors including lawyers, auditors, and consultants under strict confidentiality agreements
    • Law enforcement or regulatory authorities when required by applicable law
    • Acquirers in the event of a merger, acquisition, or sale of all or a portion of our assets

    All third-party service providers are required to maintain appropriate data security measures and are prohibited from using your data for any purpose other than providing services to us.`,
  },
  {
    title: "5. Data Retention",
    content: `We retain your personal data for as long as necessary to provide you with our services and as required by applicable law. Specifically:

    • Account information: retained for the duration of your account plus 2 years after closure
    • Transaction records: retained for 7 years for tax and accounting compliance
    • Newsletter preferences: retained until you unsubscribe or delete your account
    • Web analytics data: retained for 26 months in anonymized form
    • Customer service records: retained for 3 years`,
  },
  {
    title: "6. Your Rights and Choices",
    content: `Depending on your location, you may have the following rights regarding your personal data:

    • Right of Access: Request a copy of the personal data we hold about you
    • Right to Rectification: Correct inaccurate or incomplete personal data
    • Right to Erasure: Request deletion of your personal data ("right to be forgotten")
    • Right to Restrict Processing: Limit how we use your data in certain circumstances
    • Right to Data Portability: Receive your data in a structured, machine-readable format
    • Right to Object: Object to certain types of processing, including direct marketing
    • Right to Withdraw Consent: Withdraw consent at any time where processing is based on consent

    To exercise any of these rights, contact us at privacy@thepridetimes.com.`,
  },
  {
    title: "7. Cookies and Tracking Technologies",
    content: `We use cookies and similar tracking technologies to enhance your experience on our platform. Please refer to our Cookie Policy for detailed information about the types of cookies we use, their purposes, and how to manage your preferences.

    Essential cookies are required for the website to function properly. Analytics and preference cookies are used only with your consent.`,
  },
  {
    title: "8. International Data Transfers",
    content: `As a global organization, we may transfer your data to countries outside your home jurisdiction. Where we transfer data from the European Economic Area, we ensure appropriate safeguards are in place, including Standard Contractual Clauses approved by the European Commission.

    Our data centers are located in the United States, European Union, and Singapore. All transfers are governed by appropriate legal mechanisms to protect your privacy rights.`,
  },
  {
    title: "9. Security",
    content: `We implement industry-standard security measures to protect your personal information, including:

    • TLS/SSL encryption for all data in transit
    • AES-256 encryption for sensitive data at rest
    • Multi-factor authentication options for accounts
    • Regular security audits and penetration testing
    • ISO 27001-aligned information security management practices

    While we take all reasonable steps to protect your data, no security system is impenetrable. We cannot guarantee the absolute security of your information.`,
  },
  {
    title: "10. Changes to This Policy",
    content: `We may update this Privacy Policy from time to time. We will notify you of material changes by posting the new policy on this page and, where appropriate, by sending you an email notification. Your continued use of our services after changes are posted constitutes your acceptance of the updated policy.`,
  },
  {
    title: "11. Contact Us",
    content: `If you have questions or concerns about this Privacy Policy or our data practices, please contact us:

    The Pride Times — Data Protection Team
    Email: privacy@thepridetimes.com
    Address: The Pride Times, 1 World Trade Center, New York, NY 10007, USA
    Phone: +1 (800) 477-4348
    EU Representative: TPT Europe Ltd, 1 Canada Square, London E14 5AB, UK
    Data Protection Officer: dpo@thepridetimes.com`,
  },
];

export function Privacy() {
  const { fullDate } = useLiveDateTime();

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-[#0a1628] text-white py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 text-[#00d4ff] text-xs font-black uppercase tracking-widest mb-3">
            <Shield className="w-4 h-4" /> Legal
          </div>
          <h1 className="text-3xl font-black mb-3">Privacy Policy</h1>
          <p className="text-gray-400">The Pride Times · Last updated: {fullDate}</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="bg-white rounded-2xl border border-gray-100 p-4 mb-8">
          <h3 className="font-bold text-[#0d1f3c] text-sm mb-3">Table of Contents</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
            {sections.map((s, i) => (
              <a
                key={i}
                href={`#section-${i}`}
                className="text-sm text-[#00d4ff] hover:text-[#0d1f3c] transition-colors flex items-center gap-1"
              >
                <ChevronRight className="w-3 h-3" /> {s.title}
              </a>
            ))}
          </div>
        </div>

        <div className="space-y-8">
          {sections.map((s, i) => (
            <div key={i} id={`section-${i}`} className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8">
              <h2 className="text-lg font-black text-[#0d1f3c] mb-4 pb-3 border-b border-gray-100">{s.title}</h2>
              <div className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">{s.content}</div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-4 text-sm text-gray-500">
          <Link to="/terms" className="text-[#00d4ff] hover:text-[#0d1f3c] transition-colors">Terms of Use</Link>
          <Link to="/cookie-policy" className="text-[#00d4ff] hover:text-[#0d1f3c] transition-colors">Cookie Policy</Link>
          <Link to="/accessibility" className="text-[#00d4ff] hover:text-[#0d1f3c] transition-colors">Accessibility</Link>
        </div>
      </div>
    </div>
  );
}
