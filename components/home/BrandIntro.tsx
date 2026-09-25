import Link from "next/link";
import { ArrowRight, Award, Gem, Heart, Shield } from "lucide-react";
import { ScrollReveal } from "@/components/ui/motion";

const values = [
  {
    num: "01",
    icon: Gem,
    title: "Chất liệu thượng hạng",
    description: "Vàng chuẩn tuổi và đá quý tự nhiên được kiểm định quang phổ nghiêm ngặt.",
  },
  {
    num: "02",
    icon: Award,
    title: "Kỹ nghệ bậc thầy",
    description: "Từng góc cạnh và chấu đá được gọt dũa thủ công dưới bàn tay nghệ nhân giàu kinh nghiệm.",
  },
  {
    num: "03",
    icon: Heart,
    title: "Thiết kế độc bản",
    description: "Tôn vinh cá tính và khí chất riêng biệt của từng vị chủ nhân sở hữu.",
  },
  {
    num: "04",
    icon: Shield,
    title: "Bảo chứng trọn đời",
    description: "Dịch vụ làm sáng, vệ sinh và đồng hành thu đổi minh bạch qua nhiều thế hệ.",
  },
];

export function BrandIntro() {
  return (
    <section
      className="section-padding bg-[var(--color-background)] border-b border-[var(--color-border)]"
      aria-labelledby="brand-intro-heading"
    >
      <div className="container-site">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Brand Manifesto */}
          <ScrollReveal direction="up" className="lg:col-span-5 flex flex-col items-start">
            <span className="tracking-luxury text-[var(--color-accent)] mb-3 block font-semibold">
              TRIẾT LÝ KIM HOÀN
            </span>
            <h2
              id="brand-intro-heading"
              className="text-2xl sm:text-3xl lg:text-4xl text-[var(--color-foreground)] font-normal leading-snug mb-6"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Nghệ thuật chế tác từ{" "}
              <span className="italic font-light text-[var(--color-accent)]">
                tâm huyết & sự hoàn mỹ
              </span>
            </h2>

            <div className="space-y-4 text-sm sm:text-base text-[var(--color-muted-foreground)] leading-[1.85] mb-8">
              <p>
                Tại <strong>NHẬT JEWERLY</strong>, chúng tôi không đơn thuần tạo tác
                những món trang sức quý phái, mà nuôi dưỡng một biểu tượng của tình
                yêu, thành công và những cột mốc thiêng liêng nhất đời người.
              </p>
              <p>
                Mọi đường nét đều là sự hòa quyện nhịp nhàng giữa bí quyết kim hoàn cổ
                truyền cùng tư duy thẩm mỹ đương đại.
              </p>
            </div>

            <Link
              href="/gioi-thieu"
              className="btn-outline text-[0.75rem] uppercase tracking-[0.12em] py-3.5 px-7 inline-flex items-center gap-2 group"
            >
              <span>Khám phá câu chuyện</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </ScrollReveal>

          {/* Right Column: 4 Pillars of Excellence */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
            {values.map((v, idx) => {
              const Icon = v.icon;
              return (
                <ScrollReveal
                  key={v.title}
                  staggerIndex={idx}
                  direction="up"
                >
                  <div className="p-6 sm:p-7 bg-[var(--color-card)] border border-[var(--color-border)] hover:border-[var(--color-accent)] transition-all duration-300 group flex flex-col justify-between h-full hover:-translate-y-1">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-mono font-bold tracking-widest text-[var(--color-accent)]">
                        {v.num}
                      </span>
                      <Icon className="w-5 h-5 text-[var(--color-accent)] opacity-80 group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <div>
                      <h3
                        className="text-lg font-normal text-[var(--color-foreground)] mb-2"
                        style={{ fontFamily: "var(--font-heading)" }}
                      >
                        {v.title}
                      </h3>
                      <p className="text-sm leading-[1.8] text-[var(--color-muted-foreground)]">
                        {v.description}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
