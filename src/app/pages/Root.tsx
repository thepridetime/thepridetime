import { Outlet } from "react-router";
import { Header } from "../components/Header";
import { BreakingNewsTicker } from "../components/BreakingNewsTicker";
import { MarketTicker } from "../components/MarketTicker";
import { Footer } from "../components/Footer";

export function Root() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <BreakingNewsTicker />
      <MarketTicker />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
