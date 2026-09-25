import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Sparkles, Phone } from "lucide-react";

export const metadata: Metadata = {
  title: "Sắp Ra Mắt — NHẬT JEWERLY",
  description:
    "Tính năng đang được phát triển. NHẬT JEWERLY sẽ sớm mang đến trải nghiệm hoàn hảo hơn.",
  robots: { index: false, follow: false },
};

export default function ComingSoonPage() {
  return (
    <main
      className="relative min-h-screen w-full overflow-hidden flex items-center justify-center"
      aria-label="Trang thông báo sắp ra mắt"
    >
      {/* Full-screen poster background */}
      <Image
        src="/assets/images/poster_coming_ngang.png"
        alt="NHẬT JEWERLY — Coming Soon"
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />

      {/* Dark gradient overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/75"
        aria-hidden="true"
      />

      {/* Gold shimmer bar top */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#C9952C] to-transparent opacity-70"
        aria-hidden="true"
      />
      {/* Gold shimmer bar bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#C9952C] to-transparent opacity-70"
        aria-hidden="true"
      />

      {/* Content card */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-2xl mx-auto">

        {/* Eyebrow */}
        <div className="flex items-center gap-2.5 mb-6">
          <span className="block w-8 h-[1px] bg-[#C9952C]/60" />
          <span
            className="text-[10px] tracking-[0.35em] uppercase text-[#C9952C] font-semibold"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Đang phát triển
          </span>
          <span className="block w-8 h-[1px] bg-[#C9952C]/60" />
        </div>

        {/* Icon sparkle */}
        <div className="mb-5 text-[#C9952C]/80 animate-pulse">
          <Sparkles size={28} strokeWidth={1} />
        </div>

        {/* Headline */}
        <h1
          className="text-4xl md:text-5xl lg:text-6xl font-light tracking-[0.06em] text-white mb-4 leading-[1.15]"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Tính Năng
          <br />
          <span className="text-[#C9952C]">Sắp Ra Mắt</span>
        </h1>

        {/* Divider ornament */}
        <div className="flex items-center gap-3 my-6" aria-hidden="true">
          <span className="block w-12 h-[1px] bg-white/20" />
          <span className="text-[#C9952C] text-xs">◆</span>
          <span className="block w-12 h-[1px] bg-white/20" />
        </div>

        {/* Description */}
        <p className="text-base md:text-lg text-white/70 leading-[1.9] font-light max-w-md">
          Chúng tôi đang dày công hoàn thiện tính năng này để mang đến cho bạn
          một trải nghiệm{" "}
          <span className="text-[#C9952C]/90 font-normal">
            tinh tế và trọn vẹn nhất
          </span>
          . Hãy quay lại sớm nhé.
        </p>

        {/* CTA group */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mt-10">
          <Link
            href="/"
            className="group inline-flex items-center gap-2.5 px-7 py-3.5 border border-white/30 text-white/90 text-sm tracking-[0.12em] uppercase hover:border-[#C9952C] hover:text-[#C9952C] hover:bg-[#C9952C]/5 transition-all duration-300"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            <ArrowLeft size={14} strokeWidth={1.5} />
            Về trang chủ
          </Link>

          <a
            href="tel:0757575755"
            className="group inline-flex items-center gap-2.5 px-7 py-3.5 bg-[#C9952C] text-black text-sm tracking-[0.12em] uppercase hover:bg-[#DEAA40] transition-all duration-300 font-medium"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            <Phone size={14} strokeWidth={2} />
            Liên hệ tư vấn
          </a>
        </div>

        {/* Bottom note */}
        <p className="mt-10 text-[11px] tracking-[0.2em] uppercase text-white/30">
          NHẬT JEWERLY — Tinh hoa từ giá trị thật
        </p>
      </div>
    </main>
  );
}
