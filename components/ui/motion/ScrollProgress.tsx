"use client";

import { useEffect, useState } from "react";

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const totalHeight =
            document.documentElement.scrollHeight - window.innerHeight;
          if (totalHeight > 0) {
            const currentProgress = (window.scrollY / totalHeight) * 100;
            setProgress(Math.min(100, Math.max(0, currentProgress)));
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 h-[2px] z-[120] pointer-events-none origin-left"
      aria-hidden="true"
    >
      <div
        className="h-full bg-gradient-to-r from-[#9A5C04] via-[#D4A017] to-[#EDD987] dark:from-[#835C08] dark:via-[#C9952C] dark:to-[#FAF0CB] transition-transform duration-100 ease-out"
        style={{
          transform: `scaleX(${progress / 100})`,
          transformOrigin: "left",
          willChange: "transform",
        }}
      />
    </div>
  );
}
