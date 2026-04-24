import { useState, useEffect } from "react";
import { Link } from "react-router";
import { TrendingUp, TrendingDown, Activity } from "lucide-react";
import { marketData } from "../data/newsData";

interface LiveItem {
  name: string;
  value: number;
  rawValue: string;
  up: boolean;
  changePct: string;
}

function parseValue(v: string): number {
  return parseFloat(v.replace(/,/g, ""));
}

export function MarketTicker() {
  const [liveData, setLiveData] = useState<LiveItem[]>(() =>
    marketData.map(item => ({
      name: item.name,
      value: parseValue(item.value),
      rawValue: item.value,
      up: item.up,
      changePct: item.change,
    }))
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveData(prev =>
        prev.map(item => {
          const volatility = item.value > 10000 ? 0.0003 : item.value > 100 ? 0.0005 : 0.0002;
          const delta = (Math.random() - 0.48) * item.value * volatility;
          const newValue = parseFloat((item.value + delta).toFixed(item.value < 10 ? 4 : 2));
          const up = newValue >= item.value;
          const pct = ((newValue - item.value) / item.value * 100).toFixed(2);
          return {
            ...item,
            up,
            value: newValue,
            changePct: `${up ? "+" : ""}${pct}%`,
          };
        })
      );
    }, 1600);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[#07131f] border-b border-[#1a2f50] overflow-hidden">
      <div className="max-w-screen-xl mx-auto px-3 sm:px-4 flex items-center h-9 gap-0 overflow-x-auto scrollbar-hide">
        <Link
          to="/markets"
          className="flex items-center gap-1.5 text-xs font-black text-[#07131f] bg-[#00d4ff] px-2 sm:px-3 h-full uppercase tracking-wider mr-0 flex-shrink-0 hover:bg-white transition-colors"
        >
          <Activity className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Live</span> Markets
        </Link>
        <div className="flex items-center gap-0 flex-nowrap overflow-x-auto scrollbar-hide">
          {liveData.map((item, idx) => (
            <Link
              key={idx}
              to="/markets"
              className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0 px-2 sm:px-4 border-r border-[#1a2f50] last:border-none hover:bg-[#1a2f50] transition-colors h-9"
            >
              <span className="text-xs text-gray-400 font-medium whitespace-nowrap">{item.name}</span>
              <span className="text-xs font-bold text-white tabular-nums">
                {item.value.toLocaleString("en-US", {
                  minimumFractionDigits: item.value < 10 ? 4 : 2,
                  maximumFractionDigits: item.value < 10 ? 4 : 2,
                })}
              </span>
              <span className={`text-xs flex items-center gap-0.5 font-semibold tabular-nums ${item.up ? "text-green-400" : "text-red-400"}`}>
                {item.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                {item.changePct}
              </span>
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-1.5 ml-auto pl-3 sm:pl-4 flex-shrink-0 text-[10px] text-gray-500">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse flex-shrink-0"></span>
          <span className="hidden sm:inline">LIVE</span>
        </div>
      </div>
    </div>
  );
}