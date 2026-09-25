import { prisma } from "@/lib/prisma";
import { GoldPriceManager } from "@/components/admin/GoldPriceManager";

export default async function AdminGoldPricesPage() {
  const goldPrices = await prisma.goldPrice.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1
          className="text-2xl sm:text-3xl text-[var(--color-foreground)] font-normal"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Quản lý bảng giá vàng
        </h1>
        <p className="text-xs text-[var(--color-muted-foreground)] mt-1">
          Cập nhật giá mua vào, bán ra và đơn vị tính cho từng loại vàng hiển thị trên trang chủ và trang Giá Vàng
        </p>
      </div>

      <GoldPriceManager initialPrices={goldPrices} />
    </div>
  );
}
