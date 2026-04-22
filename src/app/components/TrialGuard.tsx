import { Navigate } from "react-router";

export function TrialGuard({ children }: { children: React.ReactNode }) {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const subscription = user?.subscription;

  // Not logged in — allow access
  if (!token || !user?.id) return <>{children}</>;

  // Active paid subscription — allow access
  if (subscription?.status === 'active') return <>{children}</>;

  // Trial — check if expired
  if (subscription?.status === 'trial' && subscription?.trialEndsAt) {
    const now = new Date();
    const trialEnd = new Date(subscription.trialEndsAt);
    if (now > trialEnd) {
      // Trial expired — redirect to subscribe
      return <Navigate to="/subscribe" replace />;
    }
    return <>{children}</>;
  }

  // No subscription at all — allow (trial will start on login)
  return <>{children}</>;
}