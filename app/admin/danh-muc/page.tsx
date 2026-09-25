import { prisma } from "@/lib/prisma";
import { CategoryManager } from "@/components/admin/CategoryManager";

export default async function AdminCategoriesPage() {
  const categories = await prisma.category.findMany({
    include: {
      _count: { select: { products: true } },
    },
    orderBy: { sortOrder: "asc" },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1
          className="text-2xl sm:text-3xl text-[var(--color-foreground)] font-normal"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Quản lý danh mục sản phẩm
        </h1>
        <p className="text-xs text-[var(--color-muted-foreground)] mt-1">
          Tạo và điều chỉnh các bộ sưu tập trang sức xuất hiện trên menu và trang chủ
        </p>
      </div>

      <CategoryManager initialCategories={categories} />
    </div>
  );
}
