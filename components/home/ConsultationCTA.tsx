import Link from "next/link";
import { MessageSquare, Phone } from "lucide-react";
import { ScrollReveal } from "@/components/ui/motion";

export function ConsultationCTA() {
  return (
    <section
      className="relative overflow-hidden bg-gradient-to-b from-[#F8F5EC] to-[#EFE8DA] dark:from-[#141210] dark:to-[#0D0B09] dark:bg-[#141210] py-16 sm:py-20 md:py-24 border-t border-[#E2DDD5] dark:border-[#262320] transition-colors duration-300"
      aria-labelledby="cta-heading"
    >
      {/* Background ambient light */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[radial-gradient(ellipse_at_center,rgba(201,149,44,0.12)_0%,transparent_70%)] dark:bg-[radial-gradient(ellipse_at_center,rgba(161,98,7,0.18)_0%,transparent_70%)] pointer-events-none blur-3xl"
        aria-hidden="true"
      />

      <ScrollReveal direction="up" className="relative z-10 container-site text-center max-w-3xl mx-auto px-5">
        <span className="tracking-luxury text-[#9A5C04] dark:text-[var(--color-gold-300)] font-semibold block mb-3">
          TƯ VẤN & ĐẶT LỊCH HẸN
        </span>

        <h2
          id="cta-heading"
          className="text-2xl sm:text-3xl md:text-4xl text-[#1A1714] dark:text-white font-light leading-snug mb-5"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Để NHẬT JEWERLY cùng bạn khắc ghi{" "}
          <span className="italic font-normal text-[#9A5C04] dark:text-[var(--color-gold-300)]">
            khoảnh khắc vĩnh cửu
          </span>
        </h2>

        <p className="text-sm sm:text-base text-[#58534E] dark:text-white/65 leading-[1.85] max-w-xl mx-auto mb-8 sm:mb-10 font-light">
          Đội ngũ chuyên viên kim hoàn sẵn sàng đồng hành tư vấn chọn mẫu, đo size tay và báo giá chi tiết theo thời giá vàng chuẩn xác nhất.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 max-w-md mx-auto">
          <Link
            href="/lien-he"
            className="btn-gold w-full sm:w-auto text-xs uppercase tracking-widest py-3.5 px-8 flex items-center justify-center gap-2"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Gửi yêu cầu tư vấn</span>
          </Link>
          <a
            href="tel:0757575755"
            className="w-full sm:w-auto text-xs uppercase tracking-widest py-3.5 px-8 flex items-center justify-center gap-2 border transition-all duration-200 font-medium
              border-[#9A5C04]/35 text-[#6B4902] hover:border-[#9A5C04] hover:bg-[#9A5C04]/8
              dark:border-white/30 dark:text-white dark:hover:border-white/70 dark:hover:bg-white/10"
          >
            <Phone className="w-4 h-4 text-[#9A5C04] dark:text-[var(--color-gold-400)]" />
            <span>Hotline: 0757 575 755</span>
          </a>
        </div>

        {/* Footer brand promise */}
        <div className="mt-12 pt-8 border-t border-[#9A5C04]/20 dark:border-white/10">
          <p className="text-xs tracking-[0.2em] uppercase text-[#7A746E] dark:text-white/35 font-medium">
            NHẬT JEWERLY — Tinh hoa từ giá trị thật
          </p>
        </div>
      </ScrollReveal>
    </section>
  );
}
