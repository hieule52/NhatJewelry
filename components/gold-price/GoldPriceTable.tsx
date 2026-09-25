import type { GoldPrice } from "@prisma/client";
import { formatPrice, formatDate } from "@/lib/utils";
import { Clock, Info } from "lucide-react";

interface GoldPriceTableProps {
  prices: GoldPrice[];
  lastUpdated?: Date | null;
}

export function GoldPriceTable({ prices, lastUpdated }: GoldPriceTableProps) {
  const defaultFallbackPrices = [
    { id: "1", type: "Vàng miếng SJC 999.9", buyPrice: 88500000, sellPrice: 90500000, unit: "đồng/lượng" },
    { id: "2", type: "Nhẫn tròn trơn 999.9", buyPrice: 87900000, sellPrice: 89400000, unit: "đồng/lượng" },
    { id: "3", type: "Vàng nữ trang 99.99% (24K)", buyPrice: 87200000, sellPrice: 88700000, unit: "đồng/lượng" },
    { id: "4", type: "Vàng nữ trang 75% (18K)", buyPrice: 64800000, sellPrice: 67300000, unit: "đồng/lượng" },
    { id: "5", type: "Vàng nữ trang 58.3% (14K)", buyPrice: 49800000, sellPrice: 52300000, unit: "đồng/lượng" },
    { id: "6", type: "Vàng nữ trang 41.7% (10K)", buyPrice: 34500000, sellPrice: 37000000, unit: "đồng/lượng" },
  ];

  const items = prices.length > 0 ? prices : defaultFallbackPrices;
  const updateDate = lastUpdated || (prices[0]?.createdAt ?? new Date());

  return (
    <div className="flex flex-col space-y-4">
      {/* Header with update time */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-2">
        <div className="flex items-center gap-2 text-xs text-[var(--color-muted-foreground)]">
          <Clock className="w-4 h-4 text-[var(--color-gold-500)]" />
          <span>Cập nhật lúc: <strong>{formatDate(updateDate)}</strong></span>
        </div>
        <div className="text-xs text-[var(--color-muted-foreground)]">
          Đơn vị tính: <strong>VNĐ / Lượng (hoặc Chỉ)</strong>
        </div>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto border border-[var(--color-border)] bg-[var(--color-card)] shadow-sm">
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="bg-[var(--color-ivory-200)] dark:bg-[#1E1B17] border-b border-[var(--color-border)] text-xs uppercase tracking-wider text-[var(--color-foreground)]">
              <th className="py-3.5 px-4 font-semibold">Loại vàng</th>
              <th className="py-3.5 px-4 font-semibold text-right">Giá mua vào (VNĐ)</th>
              <th className="py-3.5 px-4 font-semibold text-right">Giá bán ra (VNĐ)</th>
              <th className="py-3.5 px-4 font-semibold text-right hidden sm:table-cell">Chênh lệch</th>
              <th className="py-3.5 px-4 font-semibold text-center hidden md:table-cell">Đơn vị</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--color-border)]">
            {items.map((item, idx) => {
              const buy = Number(item.buyPrice);
              const sell = Number(item.sellPrice);
              const spread = sell - buy;

              return (
                <tr
                  key={item.id || idx}
                  className="hover:bg-[var(--color-ivory-100)] dark:hover:bg-white/[0.04] transition-colors"
                >
                  <td className="py-3.5 px-4 font-medium text-[var(--color-foreground)]">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-gold-500)] shrink-0" />
                      <span className="text-xs sm:text-sm font-medium">{item.type}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-right font-medium text-[var(--color-foreground)] tabular-nums text-xs sm:text-sm">
                    {formatPrice(buy).replace(" ₫", "")}
                  </td>
                  <td className="py-3.5 px-4 text-right font-semibold text-[var(--color-gold-600)] dark:text-[var(--color-gold-400)] tabular-nums text-xs sm:text-sm">
                    {formatPrice(sell).replace(" ₫", "")}
                  </td>
                  <td className="py-3.5 px-4 text-right text-xs text-[var(--color-muted-foreground)] tabular-nums hidden sm:table-cell">
                    +{formatPrice(spread).replace(" ₫", "")}
                  </td>
                  <td className="py-3.5 px-4 text-center text-xs text-[var(--color-muted-foreground)] hidden md:table-cell">
                    {item.unit || "đồng/lượng"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Disclaimers & Advice */}
      <div className="flex items-start gap-3 p-4 bg-[var(--color-ivory-100)] dark:bg-[#14120E] border border-[var(--color-border)] text-xs text-[var(--color-muted-foreground)]">
        <Info className="w-4 h-4 text-[var(--color-gold-500)] shrink-0 mt-0.5" />
        <div>
          <p className="font-medium text-[var(--color-foreground)] mb-1">
            Lưu ý bảng giá vàng NHẬT JEWERLY:
          </p>
          <ul className="list-disc list-inside space-y-0.5">
            <li>Bảng giá mang tính chất tham khảo tại thời điểm cập nhật.</li>
            <li>Giá giao dịch thực tế có thể thay đổi tùy thuộc vào thời điểm giao dịch và khối lượng tại cửa hàng.</li>
            <li>Để biết giá vàng trang sức chế tác chính xác nhất kèm tiền công, quý khách vui lòng liên hệ trực tiếp hotline hoặc gửi yêu cầu tư vấn.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
