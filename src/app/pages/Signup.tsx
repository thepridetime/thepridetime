import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Eye, EyeOff, Lock, Mail, User, AlertCircle } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
const API_BASE = "https://www.thepridetime.com";
export function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { signUp } = useAuth();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // OPTION 1 (RECOMMENDED): use your auth hook
      const result = await signUp(form.email, form.password, form.name);

      if (!result.success) {
        setError(result.message || "Signup failed");
        setLoading(false);
        return;
      }

      // Go to subscription after successful signup
      navigate("/subscribe");

    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">

        {/* HEADER */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex flex-col items-center gap-2">
            <div className="w-14 h-14 bg-gradient-to-br from-[#0d1f3c] to-[#00d4ff] rounded-xl flex items-center justify-center border-2 border-[#00d4ff]/40">
              <span className="text-white font-black text-2xl">PT</span>
            </div>
            <div>
              <div className="text-xl font-black text-[#0d1f3c]">
                The Pride <span className="text-[#00d4ff]">Times</span>
              </div>
              <div className="text-[9px] tracking-widest text-gray-400 uppercase">
                Truth · Integrity · Pride
              </div>
            </div>
          </Link>
        </div>

        {/* CARD */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
          <h1 className="text-2xl font-black text-[#0d1f3c] mb-1">
            Create Account
          </h1>
          <p className="text-gray-500 text-sm mb-6">
            Start your 7-day free trial today
          </p>

          {/* ERROR */}
          {error && (
            <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 mb-4 text-sm">
              <AlertCircle className="w-4 h-4" />
              {error}
            </div>
          )}

          {/* FORM */}
          <form onSubmit={handleSignUp} className="space-y-4">

            {/* NAME */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, name: e.target.value }))
                  }
                  placeholder="John Doe"
                  className="w-full border border-gray-200 rounded-lg pl-10 pr-4 py-3 text-sm focus:border-[#00d4ff] outline-none"
                />
              </div>
            </div>

            {/* EMAIL */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, email: e.target.value }))
                  }
                  placeholder="your@email.com"
                  className="w-full border border-gray-200 rounded-lg pl-10 pr-4 py-3 text-sm focus:border-[#00d4ff] outline-none"
                />
              </div>
            </div>

            {/* PASSWORD */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type={showPw ? "text" : "password"}
                  required
                  value={form.password}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, password: e.target.value }))
                  }
                  placeholder="Create a password"
                  className="w-full border border-gray-200 rounded-lg pl-10 pr-10 py-3 text-sm focus:border-[#00d4ff] outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPw ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#00d4ff] text-[#0d1f3c] py-3 rounded-lg font-black hover:bg-[#0d1f3c] hover:text-white transition-colors disabled:opacity-60"
            >
              {loading ? "Creating Account..." : "Start Free Trial →"}
            </button>
          </form>

          {/* FOOTER */}
          <div className="mt-6 pt-5 border-t border-gray-100 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                to="/signin"
                className="text-[#00d4ff] font-bold hover:text-[#0d1f3c] transition-colors"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}