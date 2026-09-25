import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ShieldCheck, Gem, Sparkles } from "lucide-react";

export function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-16 md:pt-28 md:pb-20 bg-gradient-to-br from-[#F8F4EC] via-[#F2EAD8] to-[#EDE0C4] dark:from-[#0A0907] dark:via-[#100E0B] dark:to-[#0A0907] dark:bg-[#0A0907] text-[var(--color-foreground)] dark:text-white transition-colors duration-300"
      aria-label="NHẬT JEWERLY — Trang sức vàng cao cấp"
    >
      {/* ── Light mode: subtle ornamental gold texture ── */}
      <div
        className="absolute inset-0 pointer-events-none z-0 dark:hidden"
        aria-hidden="true"
        style={{
          backgroundImage: `
            radial-gradient(ellipse 70% 50% at 20% 40%, rgba(201,149,44,0.12) 0%, transparent 60%),
            radial-gradient(ellipse 50% 40% at 80% 70%, rgba(154,92,4,0.08) 0%, transparent 55%)
          `,
        }}
      />
      {/* Thin gold hairline — top border in light */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#C9952C]/50 to-transparent z-10 dark:hidden pointer-events-none"
        aria-hidden="true"
      />

      {/* ── Dark mode: radial glow ── */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] md:w-[900px] h-[400px] md:h-[600px] bg-[radial-gradient(ellipse_at_center,rgba(154,92,4,0.18)_0%,transparent_65%)] pointer-events-none blur-3xl z-0 hidden dark:block"
        aria-hidden="true"
      />
      <div
        className="absolute top-2/3 right-0 w-[300px] h-[300px] bg-[radial-gradient(ellipse_at_center,rgba(201,149,44,0.10)_0%,transparent_70%)] pointer-events-none blur-3xl z-0 hidden dark:block"
        aria-hidden="true"
      />

      {/* ── Content ── */}
      <div className="container-site relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">

          {/* Left Column: Editorial Headline & Actions */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">

            {/* Eyebrow tag */}
            <div className="animate-hero-eyebrow inline-flex items-center gap-2.5 px-4 py-2 mb-6 sm:mb-8 border border-[#C9952C]/30 bg-[#C9952C]/[0.08] dark:border-[#C9952C]/30 dark:bg-white/[0.04] dark:backdrop-blur-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#9A5C04] dark:text-[#C9952C] shrink-0" aria-hidden="true" />
              <span className="text-[11px] sm:text-xs tracking-[0.22em] uppercase font-semibold text-[#9A5C04] dark:text-[#C9952C]">
                NHẬT JEWERLY · HIGH JEWELRY
              </span>
            </div>

            {/* Main Headline */}
            <h1
              className="animate-hero-title text-[2.25rem] sm:text-5xl md:text-[3.5rem] xl:text-[4rem] font-light tracking-tight leading-[1.12] mb-6 sm:mb-7 text-[#1A1714] dark:text-white"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Giá trị thật{" "}
              <br className="hidden sm:inline" />
              <span className="not-italic font-normal dark:hidden bg-gradient-to-r from-[#835C08] via-[#C07D10] to-[#835C08] bg-clip-text text-transparent">
                Niềm tin bền vững
              </span>
              <span className="not-italic font-normal hidden dark:inline bg-gradient-to-r from-[#EDD987] via-[#C9952C] to-[#EDD987] bg-clip-text text-transparent">
                Niềm tin bền vững
              </span>
            </h1>

            {/* Subtitle */}
            <p className="animate-hero-desc text-base sm:text-lg font-light leading-[1.85] max-w-[560px] mb-8 sm:mb-10 text-[#58534E] dark:text-white/70">
              NHẬT JEWERLY đặt chất lượng và uy tín làm nền tảng trong từng sản phẩm, minh bạch trong từng giá trị, tận tâm trong từng trải nghiệm — để mỗi lựa chọn của bạn luôn xứng đáng với niềm tin trao gửi.
            </p>

            {/* CTA Buttons */}
            <div className="animate-hero-cta flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto mb-10 sm:mb-12">
              <Link
                href="/san-pham"
                className="btn-gold text-[0.75rem] uppercase tracking-[0.16em] py-4 px-8 flex items-center justify-center gap-2.5 group"
              >
                <span>Khám phá bộ sưu tập</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-250 shrink-0" aria-hidden="true" />
              </Link>
              {/* Light: dark outline | Dark: white outline */}
              <Link
                href="/lien-he"
                className="text-[0.75rem] uppercase tracking-[0.16em] py-4 px-8 flex items-center justify-center gap-2 min-h-[48px] border transition-all duration-[280ms] cursor-pointer font-medium
                  border-[#9A5C04]/35 text-[#6B4902] hover:border-[#9A5C04] hover:bg-[#9A5C04]/8
                  dark:border-white/35 dark:text-white dark:hover:border-white/75 dark:hover:bg-white/10"
              >
                <span>Nhận tư vấn riêng</span>
              </Link>
            </div>

            {/* Value Proof — 3 badges */}
            <div className="animate-hero-proof grid grid-cols-3 gap-4 sm:gap-6 pt-6 w-full max-w-[480px] border-t border-[#C9952C]/25 dark:border-white/10">
              {[
                { Icon: ShieldCheck, label: "100% Chuẩn vàng", sub: "Kiểm định quang phổ" },
                { Icon: Gem, label: "Đá quý chọn lọc", sub: "Giác cắt hoàn mỹ" },
                { Icon: Sparkles, label: "Bảo dưỡng trọn đời", sub: "Đánh bóng miễn phí" },
              ].map(({ Icon, label, sub }) => (
                <div key={label} className="flex flex-col items-center lg:items-start text-center lg:text-left gap-1.5">
                  <Icon className="w-5 h-5 text-[#9A5C04] dark:text-[#C9952C]" aria-hidden="true" />
                  <span className="text-xs sm:text-sm font-medium leading-tight text-[#1A1714] dark:text-white/90">
                    {label}
                  </span>
                  <span className="text-[11px] sm:text-xs leading-snug text-[#7A746E] dark:text-white/45">
                    {sub}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Brand Image Showcase */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end order-first lg:order-last">
            {/* Light: warm shadow + champagne border | Dark: deep shadow */}
            <div className="animate-hero-image relative w-full max-w-[340px] sm:max-w-[400px] lg:max-w-none aspect-[3/4] overflow-hidden group
              border border-[#C9952C]/30 dark:border-[#C9952C]/20
              shadow-[0_20px_56px_rgba(154,92,4,0.18),0_4px_16px_rgba(0,0,0,0.08)]
              dark:shadow-[0_24px_64px_rgba(0,0,0,0.8)]
              bg-[#F0E6D0] dark:bg-black/50">
              <Image
                src="/assets/images/poster_coming_doc.png"
                alt="Tuyệt tác trang sức NHẬT JEWERLY — Khám phá bộ sưu tập"
                fill
                priority
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                sizes="(max-width: 1024px) 80vw, 38vw"
              />

              {/* Light: subtle warm vignette | Dark: dark vignette */}
              <div className="absolute inset-0 pointer-events-none
                bg-gradient-to-t from-[#2A1800]/60 via-transparent to-[#1A0D00]/10
                dark:from-black/75 dark:via-transparent dark:to-black/15" />

              {/* Caption card */}
              <div className="absolute bottom-5 left-5 right-5 p-4 backdrop-blur-md border
                bg-[#1A0D00]/60 border-white/15
                dark:bg-black/60 dark:border-white/10">
                <span className="text-[9px] uppercase tracking-[0.28em] text-[#C9952C] font-semibold block mb-1">
                  ĐỘC BẢN · TINH XẢO
                </span>
                <p className="text-xs sm:text-sm font-light leading-relaxed text-white/90 dark:text-white/80">
                  Chắt lọc tinh hoa kim hoàn cho từng tuyệt tác
                </p>
              </div>

              {/* Corner accent */}
              <div className="absolute top-0 right-0 w-12 h-12 overflow-hidden">
                <div className="absolute -top-6 -right-6 w-12 h-12 border border-[#C9952C]/30 rotate-45" />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
