"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, ArrowRight, Eye, ChevronLeft, ChevronRight, SlidersHorizontal } from "lucide-react";
import type { Product, ProductImage, Category } from "@prisma/client";
import { formatPrice } from "@/lib/utils";

type ProductWithRelations = Product & {
  images: ProductImage[];
  category: Category;
};

interface ProductCatalogProps {
  products: ProductWithRelations[];
  categories: Category[];
  total: number;
  page: number;
  totalPages: number;
  searchParams: { q?: string; category?: string; sort?: string; page?: string };
}

function CatalogProductCard({ product }: { product: ProductWithRelations }) {
  const primaryImage = product.images?.[0];
  const imgUrl = primaryImage?.url || "/assets/images/poster_coming_doc.png";
  const formattedPrice = product.price ? formatPrice(Number(product.price)) : null;

  return (
    <article className="card-product group relative h-full flex flex-col justify-between">
      <div>
        {/* Product Image Container (1:1 Square) */}
        <div className="relative aspect-square w-full overflow-hidden bg-[var(--color-ivory-100)] dark:bg-[var(--color-charcoal-800)]">
          <Image
            src={imgUrl}
            alt={primaryImage?.altText || `${product.name} — NHẬT JEWERLY`}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />

          {product.isFeatured && (
            <div className="absolute top-2 left-2 z-10">
              <span className="badge-gold">Nổi bật</span>
            </div>
          )}

          {/* Quick View Button for Desktop */}
          <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-300 hidden md:flex items-center justify-center">
            <Link
              href={`/san-pham/${product.slug}`}
              className="px-4 py-2 bg-white text-black text-xs uppercase tracking-widest font-semibold flex items-center gap-1.5 shadow-md hover:bg-[var(--color-accent)] hover:text-white transition-all duration-200 hover:scale-[1.02]"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Chi tiết</span>
            </Link>
          </div>
        </div>

        {/* Product Details */}
        <div className="p-3 sm:p-4 transition-transform duration-300 group-hover:-translate-y-0.5">
          <span className="text-[10px] tracking-[0.2em] uppercase font-semibold text-[var(--color-accent)] block mb-1">
            {product.category?.name || "Trang sức cao cấp"}
          </span>
          <h2
            className="text-xs sm:text-sm font-normal text-[var(--color-foreground)] line-clamp-2 mb-1 group-hover:text-[var(--color-accent)] transition-colors duration-200 leading-snug"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            <Link href={`/san-pham/${product.slug}`}>
              {product.name}
            </Link>
          </h2>
          <p className="text-[10px] sm:text-[11px] font-mono text-[var(--color-muted-foreground)] mb-2">
            Mã: {product.sku}
          </p>
        </div>
      </div>

      {/* Footer Pricing & CTA */}
      <div className="p-3 sm:p-4 pt-0 flex items-center justify-between border-t border-[var(--color-border)]/50">
        <div>
          {product.priceDisplay === "SHOW" && formattedPrice ? (
            <span
              className="text-xs sm:text-sm font-semibold text-[var(--color-accent)]"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {formattedPrice}
            </span>
          ) : (
            <span className="text-[11px] text-[var(--color-muted-foreground)] font-medium">
              Liên hệ
            </span>
          )}
        </div>

        <Link
          href={`/san-pham/${product.slug}`}
          className="text-[11px] tracking-wider uppercase font-semibold text-[var(--color-foreground)] hover:text-[var(--color-accent)] inline-flex items-center gap-1 group/cta transition-colors"
          aria-label={`Chi tiết ${product.name}`}
        >
          <span>Chi tiết</span>
          <ArrowRight className="w-3 h-3 group-hover/cta:translate-x-1 transition-transform duration-200" />
        </Link>
      </div>
    </article>
  );
}

export function ProductCatalog({
  products,
  categories,
  total,
  page,
  totalPages,
  searchParams,
}: ProductCatalogProps) {
  const router = useRouter();
  const pathname = usePathname();
  const currentSearchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(currentSearchParams.toString());
      if (value) {
        params.set(name, value);
      } else {
        params.delete(name);
      }
      if (name !== "page") params.delete("page");
      return params.toString();
    },
    [currentSearchParams]
  );

  return (
    <div className="container-site py-8 sm:py-12">
      {/* Category Pills Bar (Touch Friendly on Mobile) */}
      <div className="mb-6 sm:mb-8 overflow-x-auto pb-2 scrollbar-none flex items-center gap-2">
        <button
          type="button"
          onClick={() => router.push(`${pathname}?${createQueryString("category", "")}`)}
          className={`min-h-[44px] px-5 py-2 text-xs uppercase tracking-wider font-semibold border transition-all whitespace-nowrap cursor-pointer ${
            !searchParams.category
              ? "bg-[var(--color-accent)] text-white border-[var(--color-accent)] shadow-sm"
              : "border-[var(--color-border)] bg-[var(--color-card)] text-[var(--color-foreground)] hover:border-[var(--color-accent)]"
          }`}
        >
          Tất cả sản phẩm
        </button>

        {categories.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => router.push(`${pathname}?${createQueryString("category", cat.slug)}`)}
            className={`min-h-[44px] px-5 py-2 text-xs uppercase tracking-wider font-medium border transition-all whitespace-nowrap cursor-pointer ${
              searchParams.category === cat.slug
                ? "bg-[var(--color-accent)] text-white border-[var(--color-accent)] font-semibold shadow-sm"
                : "border-[var(--color-border)] bg-[var(--color-card)] text-[var(--color-foreground)] hover:border-[var(--color-accent)]"
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 bg-[var(--color-card)] border border-[var(--color-border)] flex flex-col sm:flex-row gap-4 justify-between items-center mb-8">
        {/* Search Input */}
        <form method="GET" action="/san-pham" className="relative w-full sm:max-w-md">
          <input
            name="q"
            type="search"
            defaultValue={searchParams.q || ""}
            placeholder="Tìm theo tên hoặc mã SKU..."
            className="input-luxury pr-10 text-xs sm:text-sm py-2 min-h-[44px]"
          />
          {searchParams.category && (
            <input type="hidden" name="category" value={searchParams.category} />
          )}
          <button
            type="submit"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-muted-foreground)] hover:text-[var(--color-accent)] p-1"
            aria-label="Tìm kiếm"
          >
            <Search className="w-4 h-4" />
          </button>
        </form>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <span className="text-xs text-[var(--color-muted-foreground)] whitespace-nowrap hidden sm:inline">
            Sắp xếp:
          </span>
          <select
            value={searchParams.sort || "newest"}
            onChange={(e) => router.push(`${pathname}?${createQueryString("sort", e.target.value)}`)}
            className="w-full sm:w-auto min-h-[44px] px-3 py-2 text-xs bg-transparent border border-[var(--color-border)] focus:border-[var(--color-accent)] focus:outline-none text-[var(--color-foreground)] cursor-pointer"
          >
            <option value="newest" className="bg-[var(--color-card)]">Mới nhất</option>
            <option value="name-asc" className="bg-[var(--color-card)]">Tên A → Z</option>
            <option value="name-desc" className="bg-[var(--color-card)]">Tên Z → A</option>
          </select>
        </div>
      </div>

      {/* Product Grid (2 columns on mobile, 3 on tablet, 4 on desktop) */}
      {products.length === 0 ? (
        <div className="py-16 text-center border border-[var(--color-border)] bg-[var(--color-card)] p-8">
          <p className="text-base text-[var(--color-foreground)] font-medium mb-2">
            Không tìm thấy sản phẩm nào
          </p>
          <p className="text-xs text-[var(--color-muted-foreground)] mb-6">
            Vui lòng thử tìm với từ khóa khác hoặc quay lại danh mục đầy đủ.
          </p>
          <Link
            href="/san-pham"
            className="btn-gold text-xs uppercase tracking-widest py-2.5 px-6 inline-flex"
          >
            Xem toàn bộ sản phẩm
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5 lg:gap-6">
          {products.map((product) => (
            <CatalogProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-12 pt-8 border-t border-[var(--color-border)]">
          <button
            type="button"
            onClick={() => router.push(`${pathname}?${createQueryString("page", String(page - 1))}`)}
            disabled={page <= 1}
            className="min-h-[44px] px-3.5 py-2 border border-[var(--color-border)] text-xs flex items-center gap-1 hover:border-[var(--color-accent)] disabled:opacity-40 disabled:pointer-events-none"
            aria-label="Trang trước"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Trước</span>
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => router.push(`${pathname}?${createQueryString("page", String(p))}`)}
              className={`w-11 h-11 text-xs font-semibold border transition-colors ${
                p === page
                  ? "bg-[var(--color-accent)] text-white border-[var(--color-accent)]"
                  : "border-[var(--color-border)] bg-[var(--color-card)] text-[var(--color-foreground)] hover:border-[var(--color-accent)]"
              }`}
            >
              {p}
            </button>
          ))}

          <button
            type="button"
            onClick={() => router.push(`${pathname}?${createQueryString("page", String(page + 1))}`)}
            disabled={page >= totalPages}
            className="min-h-[44px] px-3.5 py-2 border border-[var(--color-border)] text-xs flex items-center gap-1 hover:border-[var(--color-accent)] disabled:opacity-40 disabled:pointer-events-none"
            aria-label="Trang sau"
          >
            <span className="hidden sm:inline">Sau</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
