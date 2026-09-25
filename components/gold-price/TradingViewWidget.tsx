"use client";

import { useEffect, useRef, memo } from "react";
import { useTheme } from "next-themes";

function TradingViewWidgetComponent() {
  const container = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    if (!container.current) return;
    container.current.innerHTML = "";

    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = JSON.stringify({
      autosize: true,
      symbol: "OANDA:XAUUSD",
      interval: "D",
      timezone: "Asia/Ho_Chi_Minh",
      theme: resolvedTheme === "dark" ? "dark" : "light",
      style: "1",
      locale: "vi_VN",
      enable_publishing: false,
      hide_top_toolbar: false,
      hide_legend: false,
      save_image: false,
      calendar: false,
      hide_volume: true,
      support_host: "https://www.tradingview.com",
    });

    container.current.appendChild(script);
  }, [resolvedTheme]);

  return (
    <div className="w-full bg-[var(--color-card)] border border-[var(--color-border)] p-2">
      <div
        ref={container}
        className="w-full h-[360px] sm:h-[450px] md:h-[520px]"
      />
    </div>
  );
}

export const TradingViewWidget = memo(TradingViewWidgetComponent);
