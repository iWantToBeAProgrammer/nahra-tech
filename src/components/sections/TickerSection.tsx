"use client";

import type { Dictionary } from "@/data/dictionaries";

export default function TickerSection({ dict }: { dict: Dictionary }) {
  const o = dict.ticker.slice(0, 3);
  const b = dict.ticker.slice(3);
  const orangeItems = [...o, ...o, ...o, ...o];
  const blackItems = [...b, ...b, ...b, ...b];

  return (
    <section className="relative bg-bg-light overflow-hidden h-[110px] sm:h-[180px] md:h-[260px]">
      {/* Orange strip — rotates "/" (lower-left → upper-right) */}
      <div
        className="absolute overflow-hidden h-[44px] sm:h-[58px] md:h-[72px]"
        style={{
          width: "220%",
          left: "-60%", top: "50%",
          transform: "translateY(-50%) rotate(-5deg)",
          background: "rgb(255,77,0)",
        }}
      >
        <div
          className="flex items-center whitespace-nowrap h-full"
          style={{ width: "max-content", animation: "ag-ticker-l 22s linear infinite" }}
        >
          {orangeItems.map((item, i) => (
            <span key={i} className="font-display text-white inline-flex items-center gap-3 sm:gap-6 text-[15px] sm:text-[22px] md:text-[28px] px-3 sm:px-6">
              {item} <span className="opacity-40">×</span>
            </span>
          ))}
        </div>
      </div>

      {/* Black strip — rotates "\" (upper-left → lower-right), sits on top */}
      <div
        className="absolute overflow-hidden h-[44px] sm:h-[58px] md:h-[72px]"
        style={{
          width: "220%",
          left: "-60%", top: "50%",
          transform: "translateY(-50%) rotate(5deg)",
          background: "rgb(0,0,0)",
          zIndex: 2,
        }}
      >
        <div
          className="flex items-center whitespace-nowrap h-full"
          style={{ width: "max-content", animation: "ag-ticker-r 22s linear infinite" }}
        >
          {blackItems.map((item, i) => (
            <span key={i} className="font-display text-white inline-flex items-center gap-3 sm:gap-6 text-[15px] sm:text-[22px] md:text-[28px] px-3 sm:px-6">
              {item} <span className="opacity-40">×</span>
            </span>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes ag-ticker-l { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes ag-ticker-r { from { transform: translateX(-50%); } to { transform: translateX(0); } }
      `}</style>
    </section>
  );
}
