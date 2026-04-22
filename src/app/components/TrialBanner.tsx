import { useEffect, useState } from "react";
import { Link } from "react-router";
import { Clock, X } from "lucide-react";

export function TrialBanner() {
  const [trialInfo, setTrialInfo] = useState<{
    daysLeft: number;
    hoursLeft: number;
    minutesLeft: number;
    isTrial: boolean;
    isExpired: boolean;
  } | null>(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const calculate = () => {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      const subscription = user?.subscription;

      if (!subscription?.trialEndsAt) {
        setTrialInfo(null);
        return;
      }

      const now = new Date();
      const trialEnd = new Date(subscription.trialEndsAt);
      const diff = trialEnd.getTime() - now.getTime();
      const isExpired = diff <= 0;
      const isTrial = subscription.status === 'trial';

      if (!isTrial && !isExpired) {
        setTrialInfo(null);
        return;
      }

      const daysLeft = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hoursLeft = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutesLeft = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

      setTrialInfo({ daysLeft, hoursLeft, minutesLeft, isTrial, isExpired });
    };

    calculate();
    // Update every minute
    const interval = setInterval(calculate, 60000);
    window.addEventListener('auth-change', calculate);

    return () => {
      clearInterval(interval);
      window.removeEventListener('auth-change', calculate);
    };
  }, []);

  if (!trialInfo || dismissed) return null;

  // Trial expired banner
  if (trialInfo.isExpired) {
    return (
      <div className="bg-red-600 text-white text-center py-2.5 px-4 text-sm font-bold flex items-center justify-center gap-3">
        <span>⚠️ Your free trial has expired.</span>
        <Link
          to="/subscribe"
          className="bg-white text-red-600 px-3 py-1 rounded font-black text-xs hover:bg-red-50 transition-colors"
        >
          Subscribe Now →
        </Link>
      </div>
    );
  }

  // Active trial banner
  return (
    <div className="bg-[#0d1f3c] text-white py-2 px-4 flex items-center justify-between gap-3">
      <div className="flex items-center gap-2 text-sm">
        <Clock className="w-4 h-4 text-[#00d4ff] flex-shrink-0" />
        <span className="font-bold">
          🎉 Free Trial:{" "}
          <span className="text-[#00d4ff]">
            {trialInfo.daysLeft > 0
              ? `${trialInfo.daysLeft}d ${trialInfo.hoursLeft}h remaining`
              : `${trialInfo.hoursLeft}h ${trialInfo.minutesLeft}m remaining`}
          </span>
        </span>
      </div>
      <div className="flex items-center gap-2">
        <Link
          to="/subscribe"
          className="bg-[#00d4ff] text-[#0d1f3c] px-3 py-1 rounded font-black text-xs hover:bg-white transition-colors whitespace-nowrap"
        >
          Subscribe →
        </Link>
        <button
          onClick={() => setDismissed(true)}
          className="text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}