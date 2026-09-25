import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { Breadcrumb } from "@/components/seo/Breadcrumb";
import { GoldPriceTable } from "@/components/gold-price/GoldPriceTable";
import { TradingViewWidget } from "@/components/gold-price/TradingViewWidget";
import { ConsultationCTA } from "@/components/home/ConsultationCTA";
import { TrendingUp, ShieldCheck, Sparkles, HelpCircle } from "lucide-react";
import { ScrollReveal } from "@/components/ui/motion";

export const metadata: Metadata = {
  title: "Bảng Giá Vàng Hôm Nay | Giá Vàng SJC, 9999, 24K, 18K",
  description:
    "Cập nhật bảng giá vàng hôm nay mới nhất tại NHẬT JEWERLY: giá vàng SJC, nhẫn tròn trơn 9999, vàng 24K, 18K, 14K, 10K. Biểu đồ giá vàng thế giới trực tuyến.",
  keywords: [
    "giá vàng hôm nay",
    "bảng giá vàng",
    "giá vàng SJC",
    "giá vàng 9999",
    "giá vàng 24k",
    "giá vàng 18k",
    "biểu đồ giá vàng",
    "NHẬT JEWERLY",
  ],
};

async function getGoldPrices() {
  try {
    return await prisma.goldPrice.findMany({
      where: { isActive: true },
      orderBy: { createdAt: "desc" },
    });
  } catch {
    return [];
  }
}

export default async function GoldPricePage() {
  const goldPrices = await getGoldPrices();

  const breadcrumbs = [
    { label: "Trang chủ", href: "/" },
    { label: "Bảng giá vàng", href: "/gia-vang", current: true },
  ];

  return (
    <div className="pt-20 min-h-screen bg-[var(--color-background)]">
      {/* Header */}
      <div className="border-b border-[var(--color-border)] pt-8 pb-8 md:pt-10 md:pb-12 bg-[var(--color-surface)] dark:bg-[#12100E]">
        <div className="container-site">
          <Breadcrumb items={breadcrumbs} />
          <div className="flex items-center gap-3 mt-4">
            <TrendingUp className="w-6 h-6 text-[var(--color-gold-500)]" />
            <h1
              className="text-3xl sm:text-4xl text-[var(--color-foreground)] font-normal tracking-tight"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Bảng giá vàng hôm nay
            </h1>
          </div>
          <p className="text-[var(--color-muted-foreground)] text-sm max-w-2xl mt-2">
            Theo dõi giá vàng trong nước và biểu đồ giá vàng quốc tế thời gian thực.
            Cam kết minh bạch và cập nhật thường xuyên tại hệ thống NHẬT JEWERLY.
          </p>
        </div>
      </div>

      <div className="container-site py-10 md:py-16 space-y-16">
        {/* Table Section */}
        <ScrollReveal direction="up">
          <section>
            <div className="mb-6">
              <span className="text-xs uppercase tracking-widest text-[var(--color-gold-500)] block mb-1">
                Thị trường trong nước
              </span>
              <h2
                className="text-2xl sm:text-3xl text-[var(--color-foreground)] font-normal"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Báo giá các loại vàng
              </h2>
            </div>
            <GoldPriceTable prices={goldPrices} />
          </section>
        </ScrollReveal>

        {/* Live Chart Section */}
        <ScrollReveal direction="up">
          <section>
            <div className="mb-6">
              <span className="text-xs uppercase tracking-widest text-[var(--color-gold-500)] block mb-1">
                Thị trường quốc tế
              </span>
              <h2
                className="text-2xl sm:text-3xl text-[var(--color-foreground)] font-normal"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Biểu đồ giá vàng thế giới (XAU/USD)
              </h2>
              <p className="text-xs text-[var(--color-muted-foreground)] mt-1">
                Biểu đồ trực tuyến cung cấp bởi TradingView phản ánh xu hướng giá vàng thế giới theo thời gian thực.
              </p>
            </div>
            <TradingViewWidget />
          </section>
        </ScrollReveal>

        {/* Buying Gold Benefits */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ScrollReveal direction="up" staggerIndex={0}>
            <div className="p-6 border border-[var(--color-border)] bg-[var(--color-card)] flex flex-col items-start h-full hover:border-[var(--color-gold-400)] transition-all duration-300 hover:-translate-y-1">
              <ShieldCheck className="w-8 h-8 text-[var(--color-gold-500)] mb-4" />
              <h3 className="text-base font-semibold mb-2">Đúng chuẩn hàm lượng</h3>
              <p className="text-xs text-[var(--color-muted-foreground)] leading-relaxed">
                Mọi sản phẩm vàng tại NHẬT JEWERLY đều được quang phổ kiểm định hàm lượng tuổi vàng chính xác tuyệt đối.
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal direction="up" staggerIndex={1}>
            <div className="p-6 border border-[var(--color-border)] bg-[var(--color-card)] flex flex-col items-start h-full hover:border-[var(--color-gold-400)] transition-all duration-300 hover:-translate-y-1">
              <Sparkles className="w-8 h-8 text-[var(--color-gold-500)] mb-4" />
              <h3 className="text-base font-semibold mb-2">Chính sách thu đổi tối ưu</h3>
              <p className="text-xs text-[var(--color-muted-foreground)] leading-relaxed">
                Thu đổi trang sức vàng linh hoạt, giá thu mua sát thị trường, rõ ràng và minh bạch cho quý khách.
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal direction="up" staggerIndex={2}>
            <div className="p-6 border border-[var(--color-border)] bg-[var(--color-card)] flex flex-col items-start h-full hover:border-[var(--color-gold-400)] transition-all duration-300 hover:-translate-y-1">
              <TrendingUp className="w-8 h-8 text-[var(--color-gold-500)] mb-4" />
              <h3 className="text-base font-semibold mb-2">Tư vấn tích lũy chuyên sâu</h3>
              <p className="text-xs text-[var(--color-muted-foreground)] leading-relaxed">
                Đội ngũ tư vấn giàu kinh nghiệm hỗ trợ khách hàng lựa chọn loại vàng phù hợp cho nhu cầu tích sản và làm đẹp.
              </p>
            </div>
          </ScrollReveal>
        </section>

        {/* FAQs */}
        <ScrollReveal direction="up">
          <section className="border-t border-[var(--color-border)] pt-12">
            <div className="flex items-center gap-2 mb-6">
              <HelpCircle className="w-5 h-5 text-[var(--color-gold-500)]" />
              <h2
                className="text-2xl text-[var(--color-foreground)] font-normal"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Câu hỏi thường gặp về giá vàng
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
              <div className="p-5 border border-[var(--color-border)] bg-[var(--color-card)]">
                <h3 className="font-semibold text-[var(--color-foreground)] mb-2">
                  Giá vàng trên website có áp dụng cho toàn bộ sản phẩm trang sức không?
                </h3>
                <p className="text-xs text-[var(--color-muted-foreground)] leading-relaxed">
                  Bảng giá vàng thể hiện giá nguyên liệu vàng. Khi mua trang sức vàng chế tác, tổng giá thành sẽ bao gồm giá vàng theo trọng lượng cộng với tiền công chế tác và đá quý (nếu có).
                </p>
              </div>
              <div className="p-5 border border-[var(--color-border)] bg-[var(--color-card)]">
                <h3 className="font-semibold text-[var(--color-foreground)] mb-2">
                  Tần suất cập nhật bảng giá vàng là bao lâu?
                </h3>
                <p className="text-xs text-[var(--color-muted-foreground)] leading-relaxed">
                  Giá vàng tại NHẬT JEWERLY được đội ngũ chuyên viên cập nhật liên tục theo diễn biến thực tế của thị trường vàng trong nước và quốc tế để đảm bảo thông tin chính xác nhất.
                </p>
              </div>
            </div>
          </section>
        </ScrollReveal>
      </div>

      {/* Consultation CTA */}
      <ConsultationCTA />
    </div>
  );
}
