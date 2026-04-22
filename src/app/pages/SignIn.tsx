import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Eye, EyeOff, Lock, Mail, AlertCircle, CheckCircle } from "lucide-react";

export function SignIn() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [resetMode, setResetMode] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetSent, setResetSent] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  
  // Validation error states
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [resetEmailError, setResetEmailError] = useState("");

  // Simple email check
  const isValidEmail = (email: string) => {
    if (!email) return "Email is required";
    if (email.trim().length < 5) return "Email must be at least 5 characters";
    if (!email.includes("@") || !email.includes(".")) return "Enter valid email (like name@domain.com)";
    return "";
  };

  // Simple password check  
  const isValidPassword = (password: string) => {
    if (!password) return "Password is required";
    if (password.length < 8) return "Password must be at least 8 characters";
    return "";
  };

  const checkUserSubscription = async (email: string) => {
    try {
      const response = await fetch(`https://thepridetime.com/api/auth/check-status/${email}`);
      const data = await response.json();
      return data;
    } catch (err) {
      return { canLogin: false, message: "Unable to verify subscription status" };
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate before submission
    const emailCheck = isValidEmail(form.email);
    const passwordCheck = isValidPassword(form.password);
    setEmailError(emailCheck);
    setPasswordError(passwordCheck);
    
    if (emailCheck || passwordCheck) {
      return; // Stop if validation fails
    }
    
    setLoading(true);
    setError("");
    
    try {
      const response = await fetch('https://thepridetime.onrender.com/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email: form.email.trim(), 
          password: form.password 
        })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }
      
      if (data.success) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        window.dispatchEvent(new Event('auth-change'));
        setIsSuccess(true);
        
        setTimeout(() => {
          navigate('/');
        }, 2000);
      }
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleReset = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate reset email
    const emailCheck = isValidEmail(resetEmail);
    setResetEmailError(emailCheck);
    
    if (emailCheck) {
      return; // Stop if validation fails
    }
    
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setResetSent(true);
    }, 1000);
  };

  // Success screen
  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-sm w-full text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-black text-[#0d1f3c] mb-2">Welcome Back!</h2>
          <p className="text-gray-600 mb-6">You're signed in to The Pride Times as <strong>{form.email}</strong>.</p>
          <Link to="/" className="block bg-[#00d4ff] text-[#0d1f3c] py-3 rounded-lg font-black hover:bg-[#0d1f3c] hover:text-white transition-colors">
            Go to Homepage
          </Link>
          <Link to="/markets" className="block mt-3 text-sm text-[#00d4ff] hover:underline">
            View Live Markets
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex flex-col items-center gap-2">
            <div className="w-14 h-14 bg-gradient-to-br from-[#0d1f3c] to-[#00d4ff] rounded-xl flex items-center justify-center border-2 border-[#00d4ff]/40">
              <span className="text-white font-black text-2xl">PT</span>
            </div>
            <div>
              <div className="text-xl font-black text-[#0d1f3c]">The Pride <span className="text-[#00d4ff]">Times</span></div>
              <div className="text-[9px] tracking-widest text-gray-400 uppercase">Truth · Integrity · Pride</div>
            </div>
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
          {!resetMode ? (
            <>
              <h1 className="text-2xl font-black text-[#0d1f3c] mb-1">Sign In</h1>
              <p className="text-gray-500 text-sm mb-6">Access your Pride Times account</p>

              {error && (
                <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 mb-4 text-sm">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  {error}
                </div>
              )}

              <form onSubmit={handleSignIn} className="space-y-4">
                {/* Email Field */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={e => {
                        setForm(f => ({ ...f, email: e.target.value }));
                        setEmailError(isValidEmail(e.target.value));
                      }}
                      placeholder="your@email.com"
                      className={`w-full border ${emailError ? 'border-red-500' : 'border-gray-200'} rounded-lg pl-10 pr-4 py-3 text-sm focus:border-[#00d4ff] outline-none`}
                    />
                  </div>
                  {emailError && (
                    <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {emailError}
                    </p>
                  )}
                </div>

                {/* Password Field */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type={showPw ? "text" : "password"}
                      required
                      value={form.password}
                      onChange={e => {
                        setForm(f => ({ ...f, password: e.target.value }));
                        setPasswordError(isValidPassword(e.target.value));
                      }}
                      placeholder="••••••••"
                      className={`w-full border ${passwordError ? 'border-red-500' : 'border-gray-200'} rounded-lg pl-10 pr-10 py-3 text-sm focus:border-[#00d4ff] outline-none`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPw(!showPw)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {passwordError && (
                    <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {passwordError}
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded border-gray-300" />
                    <span className="text-gray-600">Remember me</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => setResetMode(true)}
                    className="text-[#00d4ff] hover:text-[#0d1f3c] font-semibold transition-colors"
                  >
                    Forgot password?
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={loading || !!emailError || !!passwordError || !form.email || !form.password}
                  className="w-full bg-[#00d4ff] text-[#0d1f3c] py-3 rounded-lg font-black hover:bg-[#0d1f3c] hover:text-white transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-[#0d1f3c]/30 border-t-[#0d1f3c] rounded-full animate-spin" />
                      Signing in...
                    </>
                  ) : "Sign In →"}
                </button>
              </form>

              <div className="mt-6 pt-5 border-t border-gray-100 text-center">
                <p className="text-sm text-gray-600">
                  Don't have an account?{" "}
                  <Link to="/signup" className="text-[#00d4ff] font-bold hover:text-[#0d1f3c] transition-colors">
                    Subscribe Now
                  </Link>
                </p>
              </div>
            </>
          ) : (
            <>
              <button
                onClick={() => { setResetMode(false); setResetSent(false); setResetEmailError(""); }}
                className="text-sm text-gray-500 hover:text-[#0d1f3c] mb-4 flex items-center gap-1"
              >
                ← Back to Sign In
              </button>
              <h1 className="text-2xl font-black text-[#0d1f3c] mb-1">Reset Password</h1>
              <p className="text-gray-500 text-sm mb-6">We'll send you a link to reset your password.</p>
              {resetSent ? (
                <div className="text-center py-4">
                  <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
                  <p className="text-gray-700 font-semibold">Reset link sent to <strong>{resetEmail}</strong></p>
                  <p className="text-sm text-gray-500 mt-1">Check your inbox and follow the instructions.</p>
                </div>
              ) : (
                <form onSubmit={handleReset} className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      value={resetEmail}
                      onChange={e => {
                        setResetEmail(e.target.value);
                        setResetEmailError(isValidEmail(e.target.value));
                      }}
                      placeholder="your@email.com"
                      className={`w-full border ${resetEmailError ? 'border-red-500' : 'border-gray-200'} rounded-lg px-4 py-3 text-sm focus:border-[#00d4ff] outline-none`}
                    />
                    {resetEmailError && (
                      <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {resetEmailError}
                      </p>
                    )}
                  </div>
                  <button 
                    type="submit" 
                    disabled={loading || !!resetEmailError || !resetEmail}
                    className="w-full bg-[#00d4ff] text-[#0d1f3c] py-3 rounded-lg font-black hover:bg-[#0d1f3c] hover:text-white transition-colors disabled:opacity-60"
                  >
                    {loading ? "Sending..." : "Send Reset Link"}
                  </button>
                </form>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
