import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { Plus, Edit, Search, CheckCircle, XCircle, Gem } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { ProductDeleteButton } from "@/components/admin/ProductDeleteButton";

interface ProductManageProps {
  searchParams: Promise<{ q?: string; category?: string }>;
}

export default async function AdminProductsPage({ searchParams }: ProductManageProps) {
  const { q, category } = await searchParams;

  const categories = await prisma.category.findMany({
    orderBy: { sortOrder: "asc" },
  });

  const where = {
    ...(category ? { categoryId: category } : {}),
    ...(q
      ? {
          OR: [
            { name: { contains: q, mode: "insensitive" as const } },
            { sku: { contains: q, mode: "insensitive" as const } },
          ],
        }
      : {}),
  };

  const products = await prisma.product.findMany({
    where,
    include: {
      category: true,
      images: { where: { isPrimary: true }, take: 1 },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1
            className="text-2xl sm:text-3xl text-[var(--color-foreground)] font-normal"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Quản lý sản phẩm trang sức
          </h1>
          <p className="text-xs text-[var(--color-muted-foreground)] mt-1">
            Tổng cộng {products.length} sản phẩm trong danh mục hiển thị
          </p>
        </div>

        <Link
          href="/admin/san-pham/new"
          className="btn-gold text-xs uppercase tracking-wider py-2.5 px-5 flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Thêm sản phẩm mới</span>
        </Link>
      </div>

      {/* Filter and Search */}
      <div className="p-4 bg-[var(--color-card)] border border-[var(--color-border)] flex flex-col md:flex-row gap-4 justify-between items-center">
        <form method="GET" className="flex items-center gap-2 w-full md:w-auto flex-1 max-w-md">
          <div className="relative w-full">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
            <input
              name="q"
              defaultValue={q || ""}
              placeholder="Tìm theo tên sản phẩm hoặc mã SKU..."
              className="w-full pl-9 pr-3 py-2 text-xs bg-transparent border border-[var(--color-border)] focus:border-[var(--color-gold-500)] focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="btn-outline text-xs uppercase tracking-wider py-2 px-4"
          >
            Tìm
          </button>
        </form>

        {/* Category filter pills */}
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
          <Link
            href="/admin/san-pham"
            className={`text-xs px-3 py-1.5 border whitespace-nowrap transition-colors ${
              !category
                ? "bg-[var(--color-gold-500)] text-white border-[var(--color-gold-500)]"
                : "border-[var(--color-border)] text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)]"
            }`}
          >
            Tất cả
          </Link>
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/admin/san-pham?category=${cat.id}`}
              className={`text-xs px-3 py-1.5 border whitespace-nowrap transition-colors ${
                category === cat.id
                  ? "bg-[var(--color-gold-500)] text-white border-[var(--color-gold-500)]"
                  : "border-[var(--color-border)] text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)]"
              }`}
            >
              {cat.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-[var(--color-card)] border border-[var(--color-border)] overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-[var(--color-ivory-200)] dark:bg-[var(--color-charcoal-700)] border-b border-[var(--color-border)] uppercase tracking-wider text-[var(--color-foreground)]">
              <th className="py-3 px-4">Ảnh & Sản phẩm</th>
              <th className="py-3 px-4">Mã SKU</th>
              <th className="py-3 px-4">Danh mục</th>
              <th className="py-3 px-4 text-right">Giá niêm yết</th>
              <th className="py-3 px-4 text-center">Nổi bật</th>
              <th className="py-3 px-4 text-center">Trạng thái</th>
              <th className="py-3 px-4 text-right">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--color-border)]">
            {products.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-10 text-[var(--color-muted-foreground)]">
                  Chưa có sản phẩm nào phù hợp với điều kiện tìm kiếm.
                </td>
              </tr>
            ) : (
              products.map((p) => {
                const img = p.images[0]?.url || "/assets/images/poster_coming_doc.png";
                return (
                  <tr
                    key={p.id}
                    className="hover:bg-[var(--color-ivory-100)] dark:hover:bg-[var(--color-charcoal-800)]/60 transition-colors"
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-12 border border-[var(--color-border)] overflow-hidden shrink-0 bg-[var(--color-ivory-200)] dark:bg-[var(--color-charcoal-700)]">
                          <Image
                            src={img}
                            alt={p.name}
                            fill
                            className="object-cover"
                            sizes="48px"
                          />
                        </div>
                        <div>
                          <Link
                            href={`/san-pham/${p.slug}`}
                            target="_blank"
                            className="font-semibold text-sm text-[var(--color-foreground)] hover:text-[var(--color-gold-500)] line-clamp-1 transition-colors"
                          >
                            {p.name}
                          </Link>
                          <span className="text-[11px] text-[var(--color-muted-foreground)]">
                            {p.material || "Trang sức cao cấp"}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 font-mono text-[11px] text-[var(--color-muted-foreground)]">
                      {p.sku}
                    </td>
                    <td className="py-3 px-4 font-medium text-[var(--color-foreground)]">
                      {p.category.name}
                    </td>
                    <td className="py-3 px-4 text-right font-medium">
                      {p.priceDisplay === "SHOW" && p.price ? (
                        <span className="text-[var(--color-gold-600)] dark:text-[var(--color-gold-400)] font-semibold">
                          {formatPrice(Number(p.price))}
                        </span>
                      ) : (
                        <span className="text-[var(--color-muted-foreground)] text-[11px]">
                          Liên hệ báo giá
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-center">
                      {p.isFeatured ? (
                        <span className="inline-flex items-center px-2 py-0.5 text-[10px] bg-amber-500/10 text-amber-500 border border-amber-500/30">
                          Nổi bật
                        </span>
                      ) : (
                        <span className="text-[var(--color-muted-foreground)]">—</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-center">
                      {p.isActive ? (
                        <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                          <CheckCircle className="w-3.5 h-3.5" />
                          <span>Hiển thị</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-gray-400">
                          <XCircle className="w-3.5 h-3.5" />
                          <span>Đang ẩn</span>
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/san-pham/${p.id}`}
                          className="p-1.5 text-[var(--color-muted-foreground)] hover:text-[var(--color-gold-500)] transition-colors"
                          title="Chỉnh sửa sản phẩm"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <ProductDeleteButton productId={p.id} productName={p.name} />
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
