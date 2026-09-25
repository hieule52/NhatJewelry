import { prisma } from "@/lib/prisma";
import { ProductForm } from "@/components/admin/ProductForm";

export default async function NewProductPage() {
  const categories = await prisma.category.findMany({
    orderBy: { sortOrder: "asc" },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1
          className="text-2xl sm:text-3xl text-[var(--color-foreground)] font-normal"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Thêm sản phẩm trang sức mới
        </h1>
        <p className="text-xs text-[var(--color-muted-foreground)] mt-1">
          Nhập đầy đủ thông tin để hiển thị trên catalog và tối ưu SEO cho sản phẩm
        </p>
      </div>

      <ProductForm categories={categories} />
    </div>
  );
}
