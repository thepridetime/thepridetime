import { Outlet } from "react-router";
import { Header } from "../components/Header";
import { BreakingNewsTicker } from "../components/BreakingNewsTicker";
import { MarketTicker } from "../components/MarketTicker";
import { Footer } from "../components/Footer";
import { ScrollToTop } from "../components/ScrollToTop";

export function Root() {
  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop /> 
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
