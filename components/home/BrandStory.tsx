import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { ScrollReveal } from "@/components/ui/motion";

export function BrandStory() {
  return (
    <section
      className="section-padding bg-[var(--color-background)] border-b border-[var(--color-border)]"
      aria-labelledby="brand-story-heading"
    >
      <div className="container-site">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Left Column: Image with Subtle Accent Frame */}
          <ScrollReveal direction="scale" className="lg:col-span-6 relative">
            <div className="relative aspect-[4/5] w-full max-w-md mx-auto lg:max-w-none overflow-hidden border border-[var(--color-border)] shadow-xl bg-[var(--color-ivory-100)] group">
              <Image
                src="/assets/images/poster_coming_doc.png"
                alt="Câu chuyện kim hoàn NHẬT JEWERLY"
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            {/* Delicate Gold Floating Seal */}
            <div className="absolute -bottom-4 -right-2 sm:bottom-6 sm:-right-4 p-4 sm:p-5 bg-[var(--color-card)] border border-[var(--color-border)] shadow-lg max-w-[200px] hidden sm:block">
              <div
                className="text-2xl font-normal text-[var(--color-accent)] mb-1"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                100%
              </div>
              <p className="text-[11px] text-[var(--color-muted-foreground)] leading-tight">
                Cam kết tuổi vàng định chuẩn quốc gia
              </p>
            </div>
          </ScrollReveal>

          {/* Right Column: Storytelling Text */}
          <ScrollReveal direction="up" delay={150} className="lg:col-span-6 flex flex-col items-start">
            <span className="tracking-luxury text-[var(--color-accent)] font-semibold block mb-2">
              HÀNH TRÌNH TẠO TÁC
            </span>

            <h2
              id="brand-story-heading"
              className="text-2xl sm:text-3xl lg:text-4xl text-[var(--color-foreground)] font-normal leading-snug mb-6"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Nghệ thuật kim hoàn tôn vinh{" "}
              <span className="italic font-light text-[var(--color-accent)]">
                vẻ đẹp truyền đời
              </span>
            </h2>

            <div className="space-y-4 text-xs sm:text-sm text-[var(--color-muted-foreground)] leading-relaxed mb-8">
              <p>
                Được tạo dựng từ niềm đam mê thuần khiết với kim hoàn, <strong>NHẬT JEWERLY</strong> xem mỗi thỏi vàng, mỗi giác cắt đá quý là một bản hòa ca giữa bàn tay con người và sự kỳ diệu của tự nhiên.
              </p>
              <p>
                Trải qua quá trình nung chảy, gọt giũa và đánh bóng tỉ mỉ, mỗi thiết kế xuất xưởng không chỉ đơn thuần là trang sức, mà là biểu tượng của phẩm hạnh, sự thành công và lời ước hẹn trăm năm.
              </p>
            </div>

            {/* Commitments Check */}
            <div className="grid grid-cols-2 gap-3.5 mb-8 w-full max-w-md text-xs font-medium text-[var(--color-foreground)]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[var(--color-accent)] shrink-0" />
                <span>Thiết kế độc quyền</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[var(--color-accent)] shrink-0" />
                <span>Quang phổ kiểm định</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[var(--color-accent)] shrink-0" />
                <span>Bảo dưỡng miễn phí</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[var(--color-accent)] shrink-0" />
                <span>Thu đổi sát thị trường</span>
              </div>
            </div>

            <Link
              href="/gioi-thieu"
              className="btn-gold text-xs uppercase tracking-widest py-3.5 px-8 inline-flex items-center gap-2 group"
            >
              <span>Về NHẬT JEWERLY</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-250" />
            </Link>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
