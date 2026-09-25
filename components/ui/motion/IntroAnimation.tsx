"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export function IntroAnimation() {
  const [stage, setStage] = useState<"initial" | "line" | "fadeout" | "done">("initial");
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Check if intro has already run this session
    const hasSeenIntro = sessionStorage.getItem("nj_intro_seen");

    if (prefersReducedMotion || hasSeenIntro) {
      setStage("done");
      return;
    }

    // Mark as seen immediately so navigating back or refreshing doesn't loop
    sessionStorage.setItem("nj_intro_seen", "true");
    setShouldRender(true);

    // Sequence timing (Total duration ~1200ms)
    const t1 = setTimeout(() => {
      setStage("line");
    }, 450);

    const t2 = setTimeout(() => {
      setStage("fadeout");
    }, 950);

    const t3 = setTimeout(() => {
      setStage("done");
      setShouldRender(false);
    }, 1350);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  if (!shouldRender || stage === "done") {
    return null;
  }

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0C0A08] transition-opacity duration-500 ease-out select-none pointer-events-none ${
        stage === "fadeout" ? "opacity-0" : "opacity-100"
      }`}
      aria-hidden="true"
    >
      {/* Subtle ambient luxury backdrop glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,149,44,0.12)_0%,transparent_60%)] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center px-6">
        {/* Logo container with emerge motion */}
        <div
          className="relative w-48 sm:w-60 h-20 transition-all duration-700"
          style={{
            opacity: stage === "fadeout" ? 0 : 1,
            transform:
              stage === "initial"
                ? "translateY(8px) scale(0.96)"
                : "translateY(0) scale(1)",
            transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          <Image
            src="/assets/images/logo_jewerly.png"
            alt="NHẬT JEWERLY"
            fill
            priority
            className="object-contain"
          />
        </div>

        {/* Elegant Gold Hairline */}
        <div className="w-24 sm:w-32 h-[1px] mt-4 overflow-hidden relative">
          <div
            className="h-full w-full bg-gradient-to-r from-transparent via-[#C9952C] to-transparent transition-transform duration-500 ease-out"
            style={{
              transform: stage === "initial" ? "scaleX(0)" : "scaleX(1)",
              transformOrigin: "center",
            }}
          />
        </div>

        {/* Subtle tagline */}
        <span
          className="text-[9px] tracking-[0.3em] uppercase text-[#C9952C]/80 mt-2 font-medium transition-opacity duration-500"
          style={{
            opacity: stage === "line" ? 0.9 : stage === "fadeout" ? 0 : 0.3,
          }}
        >
          Trang Sức Cao Cấp
        </span>
      </div>
    </div>
  );
}
