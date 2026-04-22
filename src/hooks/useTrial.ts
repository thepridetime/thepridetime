export function useTrial() {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const subscription = user?.subscription;

  if (!subscription?.trialEndsAt) {
    return { isTrial: false, isExpired: false, daysLeft: 0, hoursLeft: 0 };
  }

  const now = new Date();
  const trialEnd = new Date(subscription.trialEndsAt);
  const diff = trialEnd.getTime() - now.getTime();

  const daysLeft = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hoursLeft = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const isExpired = diff <= 0;
  const isTrial = subscription.status === 'trial';

  return { isTrial, isExpired, daysLeft, hoursLeft };
}