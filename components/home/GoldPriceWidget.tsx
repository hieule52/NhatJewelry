import Link from "next/link";
import { ArrowRight, TrendingUp, Clock } from "lucide-react";
import type { GoldPrice } from "@prisma/client";
import { formatPrice } from "@/lib/utils";

interface GoldPriceWidgetProps {
  goldPrices: (GoldPrice | null)[];
}

const defaultPrices = [
  { id: "1", type: "Vàng miếng SJC 999.9", buyPrice: 88500000, sellPrice: 90500000, unit: "đồng/lượng" },
  { id: "2", type: "Nhẫn tròn trơn 999.9 (24K)", buyPrice: 87900000, sellPrice: 89400000, unit: "đồng/lượng" },
  { id: "3", type: "Vàng nữ trang 75% (18K)", buyPrice: 64800000, sellPrice: 67300000, unit: "đồng/lượng" },
  { id: "4", type: "Vàng nữ trang 58.3% (14K)", buyPrice: 49800000, sellPrice: 52300000, unit: "đồng/lượng" },
];

import { ScrollReveal } from "@/components/ui/motion";

export function GoldPriceWidget({ goldPrices }: GoldPriceWidgetProps) {
  const dbPrices = goldPrices.filter((p): p is GoldPrice => p !== null);
  const prices = dbPrices.length > 0 ? dbPrices : defaultPrices;

  return (
    <section
      className="py-14 sm:py-16 md:py-20 bg-[#F8F5EC] dark:bg-[#12100E] text-[var(--color-foreground)] dark:text-white border-y border-[#E2DDD5] dark:border-[#262320] transition-colors duration-300"
      aria-labelledby="gold-price-widget-heading"
    >
      <div className="container-site">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          {/* Left Heading & Value Proposition */}
          <ScrollReveal direction="up" className="lg:col-span-4 flex flex-col items-start">
            <div className="inline-flex items-center gap-2 text-[#9A5C04] dark:text-[var(--color-gold-400)] mb-3">
              <TrendingUp className="w-4 h-4" />
              <span className="tracking-luxury text-xs font-semibold">
                THỊ TRƯỜNG VÀNG HÔM NAY
              </span>
            </div>

            <h2
              id="gold-price-widget-heading"
              className="text-2xl sm:text-3xl lg:text-4xl text-[#1A1714] dark:text-white font-light leading-snug mb-4"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Bảng giá vàng niêm yết
            </h2>

            <p className="text-sm sm:text-base text-[#58534E] dark:text-[#A8A29C] leading-[1.85] mb-6 max-w-sm">
              Cập nhật liên tục theo biến động thị trường trong nước và thế giới. Cam kết minh bạch tuyệt đối tại hệ thống NHẬT JEWERLY.
            </p>

            <div className="flex items-center gap-2 text-xs text-[#7A746E] mb-6">
              <Clock className="w-3.5 h-3.5 text-[#9A5C04] dark:text-[var(--color-gold-400)]" />
              <span>Cập nhật theo thời gian thực</span>
            </div>

            <Link
              href="/gia-vang"
              className="btn-gold text-xs uppercase tracking-widest py-3 px-6 inline-flex items-center gap-2 group w-full sm:w-auto"
            >
              <span>Xem biểu đồ trực tuyến</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-250" />
            </Link>
          </ScrollReveal>

          {/* Right Price Table */}
          <ScrollReveal direction="up" delay={150} className="lg:col-span-8">
            <div className="overflow-x-auto border border-[#E2DDD5] dark:border-[#2B2724] bg-white dark:bg-black/40 backdrop-blur-sm shadow-sm">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#E2DDD5] dark:border-[#2B2724] bg-[#F1EDE4] dark:bg-[#1C1917]/80 text-xs uppercase tracking-[0.12em] text-[#6E6860] dark:text-[#7A746E]">
                    <th className="py-3.5 px-4 sm:px-5 font-semibold">Loại vàng</th>
                    <th className="py-3.5 px-4 sm:px-5 font-semibold text-right">Mua vào (VNĐ)</th>
                    <th className="py-3.5 px-4 sm:px-5 font-semibold text-right">Bán ra (VNĐ)</th>
                    <th className="py-3.5 px-4 font-semibold text-center hidden sm:table-cell">Đơn vị</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EAE5DB] dark:divide-[#262320]">
                  {prices.map((item, idx) => (
                    <tr
                      key={item.id || idx}
                      className="hover:bg-[#FAF8F5] dark:hover:bg-white/[0.04] transition-colors duration-200"
                    >
                      <td className="py-4 px-4 sm:px-5 font-medium text-sm text-[#1A1714] dark:text-[#E2DDD5]">
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#9A5C04] dark:bg-[var(--color-gold-400)] shrink-0" />
                          <span className="line-clamp-1">{item.type}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 sm:px-5 text-right font-medium text-sm text-[#44403C] dark:text-[#A8A29C] font-mono">
                        {formatPrice(Number(item.buyPrice)).replace(" ₫", "")}
                      </td>
                      <td className="py-4 px-4 sm:px-5 text-right font-semibold text-sm text-[#9A5C04] dark:text-[#D4A017] font-mono">
                        {formatPrice(Number(item.sellPrice)).replace(" ₫", "")}
                      </td>
                      <td className="py-4 px-4 text-center text-xs text-[#7A746E] hidden sm:table-cell">
                        {item.unit || "đồng/lượng"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-between mt-3 text-xs text-[#7A746E] px-1">
              <span>Đơn vị tính: VNĐ / Lượng (hoặc Chỉ)</span>
              <span className="italic sm:inline hidden">*Giá có thể biến động theo phiên giao dịch</span>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
