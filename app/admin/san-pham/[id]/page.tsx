import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ProductForm } from "@/components/admin/ProductForm";

interface EditProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditProductPage({ params }: EditProductPageProps) {
  const { id } = await params;

  const [product, categories] = await Promise.all([
    prisma.product.findUnique({
      where: { id },
      include: {
        images: { orderBy: { sortOrder: "asc" } },
      },
    }),
    prisma.category.findMany({
      orderBy: { sortOrder: "asc" },
    }),
  ]);

  if (!product) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1
          className="text-2xl sm:text-3xl text-[var(--color-foreground)] font-normal"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Chỉnh sửa sản phẩm: {product.name}
        </h1>
        <p className="text-xs text-[var(--color-muted-foreground)] mt-1">
          Mã SKU: {product.sku} — Cập nhật thông tin chi tiết hoặc hình ảnh
        </p>
      </div>

      <ProductForm categories={categories} initialData={product} />
    </div>
  );
}
