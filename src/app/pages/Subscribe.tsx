import { useState } from "react";
import { Link } from "react-router";
import { Check, Star, Zap, Globe, BarChart2, BookOpen, ChevronRight } from "lucide-react";
import logo from "/src/app/assess/logos.png";

const API_BASE = "https://thepridetime.onrender.com";

// ─── Plan definitions ─────────────────────────────────────────────────────────
const plans = [
  {
    name: "Digital",
    price: "$9",
    period: "/month",
    desc: "Essential access to The Pride Times digital edition",
    features: [
      "Unlimited article access",
      "Daily newsletter",
      "Mobile app access",
      "Breaking news alerts",
      "7-day free trial",
    ],
    color: "border-gray-200",
    btn: "bg-[#0d1f3c] text-white hover:bg-[#1a3a5c]",
    badge: null,
  },
  {
    name: "Premium",
    price: "$19",
    period: "/month",
    desc: "Full access including live markets and magazine",
    features: [
      "Everything in Digital",
      "Live Markets dashboard",
      "Full magazine archive",
      "Exclusive intelligence reports",
      "Priority customer support",
      "Ad-free experience",
      "7-day free trial",
    ],
    color: "border-[#00d4ff] shadow-lg shadow-[#00d4ff]/10",
    btn: "bg-[#00d4ff] text-[#0d1f3c] hover:bg-[#00b8d9] font-black",
    badge: "Most Popular",
  },
  {
    name: "Enterprise",
    price: "$49",
    period: "/month",
    desc: "For teams, companies, and institutions",
    features: [
      "Everything in Premium",
      "Up to 20 team accounts",
      "API data access",
      "Custom intelligence briefings",
      "Dedicated account manager",
      "Custom analytics dashboard",
      "Priority breaking news",
      "14-day free trial",
    ],
    color: "border-gray-200",
    btn: "bg-[#0d1f3c] text-white hover:bg-[#1a3a5c]",
    badge: null,
  },
];

// ─── Razorpay script loader ───────────────────────────────────────────────────
const loadRazorpayScript = (): Promise<boolean> => {
  return new Promise((resolve) => {
    if ((window as any).Razorpay) { resolve(true); return; }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

// ─── Form state (no card fields) ─────────────────────────────────────────────
interface FormState {
  name: string;
  email: string;
  company: string;
}

interface FormErrors {
  name?: string;
  email?: string;
}

const validateForm = (form: FormState): FormErrors => {
  const errors: FormErrors = {};

  if (!form.name.trim()) {
    errors.name = "Full name is required.";
  } else if (!/^[A-Za-z\s'\-]{2,}$/.test(form.name.trim())) {
    errors.name = "Name must contain only letters, spaces, hyphens, or apostrophes.";
  }

  if (!form.email.trim()) {
    errors.email = "Email address is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim())) {
    errors.email = "Enter a valid email address (e.g. name@domain.com).";
  }

  return errors;
};

const FieldError = ({ msg }: { msg?: string }) =>
  msg ? <p className="text-red-500 text-xs mt-1">{msg}</p> : null;

// ─── Main component ───────────────────────────────────────────────────────────
export function Subscribe() {
  const [selected, setSelected] = useState("Premium");
  const [step, setStep] = useState<"plans" | "form" | "success">("plans");
  const [form, setForm] = useState<FormState>({ name: "", email: "", company: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((f) => ({ ...f, name: e.target.value }));
    if (errors.name) setErrors((e) => ({ ...e, name: undefined }));
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((f) => ({ ...f, email: e.target.value }));
    if (errors.email) setErrors((e) => ({ ...e, email: undefined }));
  };

  // ── Submit ─────────────────────────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validateForm(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);

    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const token = localStorage.getItem("token");

    if (!user.id || !token) {
      alert("Please sign in first.");
      window.location.href = "/signup";
      setLoading(false);
      return;
    }

    try {
      const isScriptLoaded = await loadRazorpayScript();
      if (!isScriptLoaded) {
        alert("Failed to load Razorpay. Please check your internet connection.");
        setLoading(false);
        return;
      }

      const amountMap: Record<string, number> = {
        digital: 900,
        premium: 1900,
        enterprise: 4900,
      };
      const amount = amountMap[selected.toLowerCase()] || 1900;

      // 1. Create order on backend
      const orderResponse = await fetch(`${API_BASE}/api/payment/create-order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ amount }),
      });

      const orderData = await orderResponse.json();
      if (!orderData.success) {
        throw new Error(orderData.error || "Failed to create order");
      }

      // 2. Open Razorpay — Razorpay collects card details securely
      const options = {
       key: "rzp_live_SgU8FOMdVYDiSV",
      // key: "rzp_test_SgU8FOMdVYDiSV",
        amount: amount * 100,
        currency: "INR",
        name: "The Pride Times",
        description: `${selected} Subscription`,
        image: logo,
        order_id: orderData.order.id,
        handler: async (response: any) => {
          // 3. Verify payment on backend
          try {
            const verifyRes = await fetch(`${API_BASE}/api/payment/verify`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                plan: selected.toLowerCase(),
              }),
            });

            const verifyData = await verifyRes.json();
            if (verifyData.success) {
              const updatedUser = {
                ...user,
                subscription: { plan: selected.toLowerCase(), status: "active" },
              };
              localStorage.setItem("user", JSON.stringify(updatedUser));
              setStep("success");
            } else {
              alert("Payment verification failed. Please contact support.");
            }
          } catch (err: any) {
            alert("Verification error: " + err.message);
          }
        },
        prefill: {
          name: form.name,
          email: form.email,
        },
        theme: { color: "#00d4ff" },
      };

      const razorpay = new (window as any).Razorpay(options);
      razorpay.open();
    } catch (err: any) {
      alert(err.message || "Subscription failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ── Success screen ─────────────────────────────────────────────────────────
  if (step === "success") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-black text-[#0d1f3c] mb-2">
            Welcome to The Pride Times!
          </h2>
          <p className="text-gray-600 mb-2">
            Your <strong>{selected}</strong> subscription is now active.
          </p>
          <p className="text-sm text-gray-500 mb-6">
            A confirmation has been sent to <strong>{form.email}</strong>.
          </p>
          <Link
            to="/"
            className="block w-full bg-[#00d4ff] text-[#0d1f3c] py-3 rounded-lg font-black text-center hover:bg-[#0d1f3c] hover:text-white transition-colors"
          >
            Start Reading →
          </Link>
          <Link
            to="/markets"
            className="block mt-3 text-sm text-[#00d4ff] hover:text-[#0d1f3c] font-semibold"
          >
            View Live Markets
          </Link>
        </div>
      </div>
    );
  }

  // ── Form step (name + email only, no card fields) ──────────────────────────
  if (step === "form") {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-lg mx-auto">
          <div className="text-center mb-8">
            <img
              src={logo}
              alt="The Pride Times"
              className="w-12 h-12 rounded-lg mx-auto mb-3 object-cover"
            />
            <h1 className="text-2xl font-black text-[#0d1f3c]">
              Complete Your Subscription
            </h1>
            <p className="text-gray-600 mt-1">
              <span className="font-bold text-[#00d4ff]">{selected}</span> plan selected
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
            <form onSubmit={handleSubmit} noValidate className="space-y-4">

              {/* Full Name */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={handleNameChange}
                  placeholder="Jane Smith"
                  className={`w-full border rounded-lg px-4 py-3 text-sm focus:border-[#00d4ff] outline-none transition-colors
                    ${errors.name ? "border-red-400 bg-red-50" : "border-gray-200"}`}
                />
                <FieldError msg={errors.name} />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={handleEmailChange}
                  placeholder="your@email.com"
                  className={`w-full border rounded-lg px-4 py-3 text-sm focus:border-[#00d4ff] outline-none transition-colors
                    ${errors.email ? "border-red-400 bg-red-50" : "border-gray-200"}`}
                />
                <FieldError msg={errors.email} />
              </div>

              {/* Company (optional) */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">
                  Company (optional)
                </label>
                <input
                  type="text"
                  value={form.company}
                  onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))}
                  placeholder="Your organization"
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:border-[#00d4ff] outline-none"
                />
              </div>

              {/* Trust badge */}
              <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-600 flex items-start gap-2">
                <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>
                  Your subscription starts with a free trial. Cancel anytime before it ends.
                  Card details are collected securely by Razorpay — we never see your card number.
                </span>
              </div>

              {/* Buttons */}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep("plans")}
                  className="flex-1 border border-gray-200 text-gray-600 py-3 rounded-lg font-bold text-sm hover:border-[#0d1f3c] transition-colors"
                >
                  ← Back
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-[#00d4ff] text-[#0d1f3c] py-3 rounded-lg font-black text-sm hover:bg-[#0d1f3c] hover:text-white transition-colors disabled:opacity-60"
                >
                  {loading ? "Processing..." : "Start Free Trial →"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // ── Plans selection screen ─────────────────────────────────────────────────
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-gradient-to-br from-[#0a1628] via-[#0d1f3c] to-[#1a3a5c] text-white py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <img
            src={logo}
            alt="The Pride Times"
            className="w-14 h-14 rounded-xl mx-auto mb-4 object-cover border-2 border-[#00d4ff]/40"
          />
          <div className="text-[#00d4ff] text-xs font-black uppercase tracking-widest mb-3">
            TPT Subscription
          </div>
          <h1 className="text-3xl sm:text-4xl font-black mb-4 leading-tight">
            The World's Trusted <br />
            Enterprise Intelligence
          </h1>
          <p className="text-gray-300 text-lg mb-6">
            Join 2.4 million enterprise readers across 195 nations. Truth · Integrity · Pride — every day.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-400">
            {[
              { icon: Globe, label: "195 Nations" },
              { icon: BarChart2, label: "Live Markets" },
              { icon: BookOpen, label: "Full Magazine" },
              { icon: Zap, label: "Breaking News" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-1.5">
                <Icon className="w-4 h-4 text-[#00d4ff]" />
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-black text-[#0d1f3c] text-center mb-2">
          Choose Your Plan
        </h2>
        <p className="text-gray-500 text-center mb-8">
          All plans include a free trial. Cancel anytime.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.name}
              onClick={() => setSelected(plan.name)}
              className={`bg-white rounded-2xl border-2 p-6 cursor-pointer transition-all relative ${plan.color} ${
                selected === plan.name ? "ring-2 ring-[#00d4ff]" : ""
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#00d4ff] text-[#0d1f3c] text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">
                  {plan.badge}
                </div>
              )}
              <div className="flex items-center gap-2 mb-3">
                {selected === plan.name && (
                  <div className="w-5 h-5 rounded-full bg-[#00d4ff] flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-[#0d1f3c]" />
                  </div>
                )}
                <h3 className="font-black text-lg text-[#0d1f3c]">{plan.name}</h3>
              </div>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-3xl font-black text-[#0d1f3c]">{plan.price}</span>
                <span className="text-gray-400 text-sm">{plan.period}</span>
              </div>
              <p className="text-sm text-gray-500 mb-4">{plan.desc}</p>
              <ul className="space-y-2">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-gray-600">
                    <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <button
            onClick={() => setStep("form")}
            className="inline-flex items-center gap-2 bg-[#00d4ff] text-[#0d1f3c] px-8 py-4 rounded-xl font-black text-lg hover:bg-[#0d1f3c] hover:text-white transition-colors"
          >
            Start with {selected} <ChevronRight className="w-5 h-5" />
          </button>
          <p className="text-xs text-gray-400 mt-3">
            No commitment. Cancel anytime. Secure checkout.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { icon: Star,     title: "4.9/5 Rating",  desc: "Rated by 48,000+ enterprise subscribers worldwide" },
            { icon: Globe,    title: "195 Nations",   desc: "Our correspondents report from every corner of the globe" },
            { icon: BarChart2,title: "Real-Time Markets", desc: "Live data across 10,000+ instruments 24/7" },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="bg-white rounded-xl p-5 text-center border border-gray-100">
              <Icon className="w-6 h-6 text-[#00d4ff] mx-auto mb-2" />
              <div className="font-black text-[#0d1f3c] mb-1">{title}</div>
              <p className="text-xs text-gray-500">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}