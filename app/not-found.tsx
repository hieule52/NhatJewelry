import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Search } from "lucide-react";

export default function NotFound() {
  return (
    <main
      className="relative min-h-screen w-full overflow-hidden flex items-center justify-center"
      aria-label="Trang không tìm thấy"
    >
      {/* Full-screen poster background */}
      <Image
        src="/assets/images/poster_coming_ngang.png"
        alt="NHẬT JEWERLY — Trang không tìm thấy"
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />

      {/* Darker overlay for 404 — slightly different feel */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80"
        aria-hidden="true"
      />

      {/* Gold shimmer bars */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#C9952C] to-transparent opacity-60"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#C9952C] to-transparent opacity-60"
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-2xl mx-auto">

        {/* 404 large number */}
        <p
          className="text-[120px] md:text-[160px] font-extralight leading-none text-white/10 tracking-[0.12em] select-none"
          style={{ fontFamily: "var(--font-heading)" }}
          aria-hidden="true"
        >
          404
        </p>

        {/* Eyebrow */}
        <div className="flex items-center gap-2.5 mb-5 -mt-4">
          <span className="block w-8 h-[1px] bg-[#C9952C]/60" />
          <span
            className="text-[10px] tracking-[0.35em] uppercase text-[#C9952C] font-semibold"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Trang không tồn tại
          </span>
          <span className="block w-8 h-[1px] bg-[#C9952C]/60" />
        </div>

        {/* Icon */}
        <div className="mb-5 text-[#C9952C]/70">
          <Search size={26} strokeWidth={1} />
        </div>

        {/* Headline */}
        <h1
          className="text-3xl md:text-4xl lg:text-5xl font-light tracking-[0.05em] text-white mb-4 leading-[1.2]"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Xin lỗi,{" "}
          <span className="text-[#C9952C]">không tìm thấy</span>
          <br />
          trang này
        </h1>

        {/* Ornament */}
        <div className="flex items-center gap-3 my-6" aria-hidden="true">
          <span className="block w-12 h-[1px] bg-white/20" />
          <span className="text-[#C9952C] text-xs">◆</span>
          <span className="block w-12 h-[1px] bg-white/20" />
        </div>

        {/* Description */}
        <p className="text-base text-white/60 leading-[1.9] font-light max-w-sm">
          Trang bạn đang tìm kiếm có thể đã được di chuyển, đổi tên hoặc
          chưa được phát triển.{" "}
          <span className="text-[#C9952C]/80 font-normal">
            Hãy để chúng tôi hướng dẫn bạn.
          </span>
        </p>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mt-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-[#C9952C] text-black text-sm tracking-[0.12em] uppercase hover:bg-[#DEAA40] transition-all duration-300 font-medium"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            <ArrowLeft size={14} strokeWidth={2} />
            Về trang chủ
          </Link>

          <Link
            href="/san-pham"
            className="inline-flex items-center gap-2.5 px-7 py-3.5 border border-white/30 text-white/80 text-sm tracking-[0.12em] uppercase hover:border-[#C9952C] hover:text-[#C9952C] transition-all duration-300"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Xem sản phẩm
          </Link>
        </div>

        {/* Bottom note */}
        <p className="mt-10 text-[11px] tracking-[0.2em] uppercase text-white/25">
          NHẬT JEWERLY — Tinh hoa từ giá trị thật
        </p>
      </div>
    </main>
  );
}
