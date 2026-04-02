import { Link } from "react-router";
import { FileText, ChevronRight } from "lucide-react";
import { useLiveDateTime } from "../components/LiveClock";

const sections = [
  {
    title: "1. Acceptance of Terms",
    content: `By accessing or using The Pride Times website, mobile applications, or any of our services, you agree to be bound by these Terms of Use ("Terms"). If you do not agree to these Terms, please do not use our services.

    These Terms constitute a legally binding agreement between you and The Pride Times LLC. We reserve the right to update these Terms at any time, and your continued use of the service following any changes constitutes acceptance of the new Terms.`,
  },
  {
    title: "2. Description of Service",
    content: `The Pride Times is a global enterprise news platform providing:

    • Journalistic news content across multiple industries and regions
    • Live and simulated real-time financial market data and analysis
    • Intelligence reports, research, and editorial content
    • Newsletter and email notification services
    • A digital magazine with long-form investigative journalism

    Our market data is provided for informational and educational purposes only. It does not constitute financial advice, and we are not a licensed financial advisor, broker, or investment manager.`,
  },
  {
    title: "3. User Accounts",
    content: `To access certain features of our service, you may be required to create an account. You are responsible for:

    • Maintaining the confidentiality of your account credentials
    • All activities that occur under your account
    • Providing accurate, current, and complete information during registration
    • Promptly notifying us of any unauthorized use of your account

    You may not transfer your account to another person or entity. We reserve the right to terminate accounts that violate these Terms.`,
  },
  {
    title: "4. Subscription and Payment Terms",
    content: `Subscription Plans: We offer Digital, Premium, and Enterprise subscription tiers. Pricing and features are detailed on our Subscribe page.

    Billing: Subscriptions are billed monthly or annually as selected. All amounts are in USD unless otherwise stated.

    Free Trials: New subscribers receive a free trial period as stated at sign-up. You will not be charged until the trial expires. You may cancel during the trial period at no cost.

    Cancellation: You may cancel your subscription at any time. Cancellation takes effect at the end of the current billing period. No refunds are provided for partial periods except where required by applicable law.

    Refund Policy: Refunds may be issued at our discretion within 14 days of initial purchase for annual plans. Monthly plans are non-refundable.`,
  },
  {
    title: "5. Intellectual Property Rights",
    content: `All content published by The Pride Times, including articles, reports, photographs, graphics, video, audio, and the overall layout and design of the website, is owned by or licensed to The Pride Times and is protected by copyright, trademark, and other intellectual property laws.

    You may:
    • Read and access content for personal, non-commercial use
    • Share links to our articles on social media
    • Quote brief passages with proper attribution to The Pride Times

    You may not:
    • Reproduce, republish, or distribute content without written permission
    • Use our content for commercial purposes without a license
    • Scrape, crawl, or systematically extract content via automated means
    • Remove or alter any copyright notices or attribution statements`,
  },
  {
    title: "6. Acceptable Use Policy",
    content: `You agree not to use The Pride Times platform to:

    • Violate any applicable law or regulation
    • Transmit spam, malware, or unauthorized communications
    • Attempt to gain unauthorized access to our systems or user accounts
    • Engage in any conduct that disrupts or interferes with our services
    • Impersonate any person or entity, or misrepresent your affiliation
    • Harvest or collect user information without consent
    • Use the service for any unlawful, harmful, or abusive purpose

    Violation of this policy may result in immediate termination of your account without notice or refund.`,
  },
  {
    title: "7. Financial Market Data Disclaimer",
    content: `IMPORTANT: The financial market data, indices, prices, and analysis provided on The Pride Times platform are for informational purposes only and do not constitute:

    • Investment, financial, or trading advice
    • An offer or solicitation to buy or sell any security or financial instrument
    • A recommendation to take any particular investment action

    Market data may be delayed or simulated. Always consult a qualified financial advisor before making investment decisions. The Pride Times, its employees, and affiliated entities are not responsible for any trading losses or investment decisions made based on information provided on this platform.`,
  },
  {
    title: "8. Limitation of Liability",
    content: `TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, THE PRIDE TIMES AND ITS OFFICERS, DIRECTORS, EMPLOYEES, AND AGENTS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING WITHOUT LIMITATION, LOSS OF PROFITS, DATA, USE, OR GOODWILL, RESULTING FROM YOUR ACCESS TO OR USE OF, OR INABILITY TO ACCESS OR USE, OUR SERVICES.

    Our total liability to you for any claim arising from or related to these Terms or our services shall not exceed the amount paid by you to us in the 12 months preceding the claim.`,
  },
  {
    title: "9. Governing Law and Dispute Resolution",
    content: `These Terms shall be governed by and construed in accordance with the laws of the State of New York, United States, without regard to its conflict of law provisions.

    Any dispute arising from these Terms shall first be attempted to be resolved through good-faith negotiation. If unresolved within 30 days, disputes shall be submitted to binding arbitration in New York City under the rules of the American Arbitration Association.

    For users in the European Union, mandatory statutory rights under EU consumer protection law shall apply and are not affected by these Terms.`,
  },
  {
    title: "10. Contact Information",
    content: `For questions about these Terms of Use, please contact:

    The Pride Times Department
    Email: business@thepridetime.com
    Email: arup.parida@thepridetime.com`,
  },
];

export function Terms() {
  const { fullDate } = useLiveDateTime();

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-[#0a1628] text-white py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 text-[#00d4ff] text-xs font-black uppercase tracking-widest mb-3">
            <FileText className="w-4 h-4" /> Legal
          </div>
          <h1 className="text-3xl font-black mb-3">Terms of Use</h1>
          <p className="text-gray-400">The Pride Times · Last updated: {fullDate}</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-8">
          <p className="text-sm text-yellow-800">
            <strong>Important Notice:</strong> Market data provided on The Pride Times is for informational purposes only and does not constitute financial advice. Please read Section 7 carefully.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-4 mb-8">
          <h3 className="font-bold text-[#0d1f3c] text-sm mb-3">Table of Contents</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
            {sections.map((s, i) => (
              <a key={i} href={`#term-${i}`} className="text-sm text-[#00d4ff] hover:text-[#0d1f3c] transition-colors flex items-center gap-1">
                <ChevronRight className="w-3 h-3" /> {s.title}
              </a>
            ))}
          </div>
        </div>

        <div className="space-y-8">
          {sections.map((s, i) => (
            <div key={i} id={`term-${i}`} className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8">
              <h2 className="text-lg font-black text-[#0d1f3c] mb-4 pb-3 border-b border-gray-100">{s.title}</h2>
              <div className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">{s.content}</div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-4 text-sm text-gray-500">
          <Link to="/privacy" className="text-[#00d4ff] hover:text-[#0d1f3c] transition-colors">Privacy Policy</Link>
          <Link to="/cookie-policy" className="text-[#00d4ff] hover:text-[#0d1f3c] transition-colors">Cookie Policy</Link>
          <Link to="/accessibility" className="text-[#00d4ff] hover:text-[#0d1f3c] transition-colors">Accessibility</Link>
        </div>
      </div>
    </div>
  );
}
