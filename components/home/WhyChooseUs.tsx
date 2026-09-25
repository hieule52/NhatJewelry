import { CheckCircle, Shield, Award, RefreshCw } from "lucide-react";
import { ScrollReveal } from "@/components/ui/motion";

const reasons = [
  {
    icon: CheckCircle,
    title: "Chứng nhận chất lượng",
    description:
      "100% sản phẩm đều trải qua kiểm định hàm lượng tuổi vàng chính xác tuyệt đối bằng phương pháp quang phổ hiện đại.",
  },
  {
    icon: Award,
    title: "Nghệ nhân bậc thầy",
    description:
      "Đội ngũ kim hoàn tài hoa với hơn 20 năm kinh nghiệm trong nghệ thuật đúc, chạm khắc và chế tác trang sức tinh xảo.",
  },
  {
    icon: Shield,
    title: "Bảo hành trọn đời",
    description:
      "Miễn phí đánh bóng, làm sáng và kiểm tra định kỳ cho mọi món trang sức. Cam kết đồng hành cùng bạn mãi mãi.",
  },
  {
    icon: RefreshCw,
    title: "Thu đổi minh bạch",
    description:
      "Chính sách thu mua, trao đổi rõ ràng, sát giá thị trường vàng trong nước và quốc tế. Không phí ẩn, không thủ tục phức tạp.",
  },
];

export function WhyChooseUs() {
  return (
    <section
      className="section-padding bg-[var(--color-surface)] border-b border-[var(--color-border)]"
      aria-labelledby="why-choose-us-heading"
    >
      <div className="container-site">
        <ScrollReveal direction="up">
          <div className="section-heading mb-10 sm:mb-14">
            <span className="tracking-luxury text-[var(--color-accent)] eyebrow">
              ĐẶC QUYỀN KHÁCH HÀNG
            </span>
            <h2
              id="why-choose-us-heading"
              className="text-3xl sm:text-4xl text-[var(--color-foreground)] font-normal mt-2"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Vì sao chọn NHẬT JEWERLY?
            </h2>
            <div className="divider-gold" />
            <p className="text-[0.9375rem] text-[var(--color-muted-foreground)] mt-2 leading-relaxed">
              Những giá trị trường tồn tạo nên niềm tin vững chắc của hàng nghìn
              khách hàng.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {reasons.map((r, idx) => {
            const Icon = r.icon;
            return (
              <ScrollReveal
                key={r.title}
                direction="up"
                staggerIndex={idx}
              >
                <div className="p-6 sm:p-7 bg-[var(--color-card)] border border-[var(--color-border)] hover:border-[var(--color-accent)] transition-all duration-300 flex flex-col items-start group h-full hover:-translate-y-1">
                  {/* Icon */}
                  <div className="w-11 h-11 flex items-center justify-center bg-[var(--color-accent)]/8 text-[var(--color-accent)] mb-5 group-hover:bg-[var(--color-accent)] group-hover:text-white transition-all duration-300">
                    <Icon className="w-5 h-5" aria-hidden="true" />
                  </div>

                  {/* Title */}
                  <h3
                    className="text-xl font-normal text-[var(--color-foreground)] mb-2.5 leading-snug"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {r.title}
                  </h3>

                  {/* Description — 14px min */}
                  <p className="text-sm text-[var(--color-muted-foreground)] leading-[1.8]">
                    {r.description}
                  </p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
