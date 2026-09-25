import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Eye, Sparkles } from "lucide-react";
import type { Product, ProductImage, Category } from "@prisma/client";
import { formatPrice } from "@/lib/utils";

type ProductWithRelations = Product & {
  images: ProductImage[];
  category: Category;
};

interface FeaturedProductsProps {
  products: ProductWithRelations[];
}

export function ProductCard({ product }: { product: ProductWithRelations }) {
  const primaryImage = product.images.find((img) => img.isPrimary) || product.images[0];
  const imgUrl = primaryImage?.url || "/assets/images/poster_coming_doc.png";
  const formattedPrice = product.price ? formatPrice(Number(product.price)) : null;

  return (
    <article className="card-product group relative h-full flex flex-col justify-between">
      <div>
        {/* Product Image Container (1:1 Ratio) */}
        <div className="relative aspect-square w-full overflow-hidden bg-[var(--color-ivory-100)] dark:bg-[var(--color-charcoal-800)]">
          <Image
            src={imgUrl}
            alt={primaryImage?.altText || `${product.name} — NHẬT JEWERLY`}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />

          {/* Featured Badge */}
          {product.isFeatured && (
            <div className="absolute top-2.5 left-2.5 z-10">
              <span className="badge-gold">Nổi bật</span>
            </div>
          )}

          {/* Desktop Hover Quick Action Overlay */}
          <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-300 hidden md:flex items-center justify-center">
            <Link
              href={`/san-pham/${product.slug}`}
              className="px-5 py-2.5 bg-white text-black text-xs uppercase tracking-widest font-semibold flex items-center gap-2 shadow-lg hover:bg-[var(--color-accent)] hover:text-white transition-all duration-200 hover:scale-[1.02]"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Xem chi tiết</span>
            </Link>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-3.5 sm:p-4 md:p-5 transition-transform duration-300 group-hover:-translate-y-0.5">
          {/* Category */}
          <span className="text-[10px] tracking-[0.2em] uppercase font-semibold text-[var(--color-accent)] block mb-1">
            {product.category?.name || "Trang sức cao cấp"}
          </span>

          {/* Title */}
          <h3
            className="text-sm sm:text-base font-normal text-[var(--color-foreground)] line-clamp-2 mb-1.5 group-hover:text-[var(--color-accent)] transition-colors duration-200"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            <Link href={`/san-pham/${product.slug}`}>
              {product.name}
            </Link>
          </h3>

          {/* SKU */}
          <p className="text-xs font-mono text-[var(--color-muted-foreground)] mb-3">
            Mã: {product.sku}
          </p>
        </div>
      </div>

      {/* Pricing & CTA footer */}
      <div className="px-3.5 pb-3.5 sm:px-4 sm:pb-4 md:px-5 md:pb-5 pt-0 flex items-center justify-between border-t border-[var(--color-border)]/60">
        <div>
          {product.priceDisplay === "SHOW" && formattedPrice ? (
            <span
              className="text-sm sm:text-base font-semibold text-[var(--color-accent)]"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {formattedPrice}
            </span>
          ) : (
            <span className="text-xs text-[var(--color-muted-foreground)] font-medium">
              Liên hệ báo giá
            </span>
          )}
        </div>

        <Link
          href={`/san-pham/${product.slug}`}
          className="text-xs tracking-wider uppercase font-semibold text-[var(--color-foreground)] hover:text-[var(--color-accent)] flex items-center gap-1 transition-colors group/cta"
          aria-label={`Xem chi tiết ${product.name}`}
        >
          <span className="hidden sm:inline">Chi tiết</span>
          <ArrowRight className="w-3 h-3 group-hover/cta:translate-x-1 transition-transform duration-200" />
        </Link>
      </div>
    </article>
  );
}

const fallbackShowcaseProducts = [
  {
    id: "fb-1",
    name: "Nhẫn Kim Cương Solitaire Hoàng Gia 18K",
    slug: "nhan-kim-cuong-solitaire-hoang-gia-18k",
    sku: "NJ-RING-001",
    price: 28500000 as any,
    priceDisplay: "SHOW" as const,
    isFeatured: true,
    isActive: true,
    categoryId: "cat-1",
    description: "Nhẫn kim cương Solitaire 6 chấu kinh điển nâng tầm vẻ đẹp thanh khiết.",
    material: "Vàng trắng 18K (750)",
    weight: "1.15 chỉ",
    gemstone: "Kim cương tự nhiên 5.4mm",
    size: "Size 12-16",
    technicalInfo: null,
    seoTitle: null,
    seoDescription: null,
    seoKeywords: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    category: { id: "cat-1", name: "Nhẫn vàng", slug: "nhan-vang", description: null, isActive: true, sortOrder: 1, createdAt: new Date(), updatedAt: new Date() },
    images: [{ id: "img-1", productId: "fb-1", url: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=800", altText: "Nhẫn Kim Cương Solitaire", isPrimary: true, sortOrder: 0 }],
  },
  {
    id: "fb-2",
    name: "Nhẫn Nam Signet Vàng 24K Chạm Khắc Rồng",
    slug: "nhan-nam-signet-vang-24k-cham-khac-rong",
    sku: "NJ-RING-002",
    price: 45000000 as any,
    priceDisplay: "SHOW" as const,
    isFeatured: true,
    isActive: true,
    categoryId: "cat-1",
    description: "Nhẫn Signet bản lớn chạm khắc rồng 3D thể hiện uy quyền phái mạnh.",
    material: "Vàng ròng 24K (999.9)",
    weight: "3.5 chỉ",
    gemstone: "Không đính đá",
    size: "Size 18-22",
    technicalInfo: null,
    seoTitle: null,
    seoDescription: null,
    seoKeywords: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    category: { id: "cat-1", name: "Nhẫn vàng", slug: "nhan-vang", description: null, isActive: true, sortOrder: 1, createdAt: new Date(), updatedAt: new Date() },
    images: [{ id: "img-2", productId: "fb-2", url: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&q=80&w=800", altText: "Nhẫn Nam Signet", isPrimary: true, sortOrder: 0 }],
  },
  {
    id: "fb-3",
    name: "Dây Chuyền Vàng Ý 18K Mặt Hoa Sen Đính Kim Cương",
    slug: "day-chuyen-vang-y-18k-mat-hoa-sen-dinh-kim-cuong",
    sku: "NJ-NCK-001",
    price: 36000000 as any,
    priceDisplay: "SHOW" as const,
    isFeatured: true,
    isActive: true,
    categoryId: "cat-2",
    description: "Mặt dây chuyền hoa sen thanh cao đính kim cương tấm lấp lánh.",
    material: "Vàng hồng 18K (Rose Gold)",
    weight: "1.8 chỉ",
    gemstone: "Kim cương tấm",
    size: "42cm + tăng đơ",
    technicalInfo: null,
    seoTitle: null,
    seoDescription: null,
    seoKeywords: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    category: { id: "cat-2", name: "Dây chuyền vàng", slug: "day-chuyen-vang", description: null, isActive: true, sortOrder: 2, createdAt: new Date(), updatedAt: new Date() },
    images: [{ id: "img-3", productId: "fb-3", url: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=800", altText: "Dây Chuyền Hoa Sen", isPrimary: true, sortOrder: 0 }],
  },
  {
    id: "fb-4",
    name: "Lắc Tay Vàng 18K Dáng Tennis Đính Đá Tinh Xảo",
    slug: "lac-tay-vang-18k-dang-tennis-dinh-da-tinh-xao",
    sku: "NJ-BRC-001",
    price: 52000000 as any,
    priceDisplay: "SHOW" as const,
    isFeatured: true,
    isActive: true,
    categoryId: "cat-3",
    description: "Lắc tay Tennis Bracelet kiêu sa liền mạch ánh sáng.",
    material: "Vàng trắng 18K",
    weight: "2.8 chỉ",
    gemstone: "Đá Moissanite cao cấp",
    size: "17cm",
    technicalInfo: null,
    seoTitle: null,
    seoDescription: null,
    seoKeywords: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    category: { id: "cat-3", name: "Lắc tay vàng", slug: "lac-tay-vang", description: null, isActive: true, sortOrder: 3, createdAt: new Date(), updatedAt: new Date() },
    images: [{ id: "img-4", productId: "fb-4", url: "https://images.unsplash.com/photo-1611591475822-482455850974?auto=format&fit=crop&q=80&w=800", altText: "Lắc Tay Tennis", isPrimary: true, sortOrder: 0 }],
  },
];

import { ScrollReveal } from "@/components/ui/motion";

export function FeaturedProducts({ products }: FeaturedProductsProps) {
  const displayItems = products.length > 0 ? products : fallbackShowcaseProducts;

  return (
    <section
      className="section-padding bg-[var(--color-muted)]/30 border-b border-[var(--color-border)]"
      aria-labelledby="featured-products-heading"
    >
      <div className="container-site">
        {/* Header */}
        <ScrollReveal direction="up">
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
            <span className="tracking-luxury text-[var(--color-accent)] font-semibold block mb-2">
              TUYỆT TÁC NỔI BẬT
            </span>
            <h2
              id="featured-products-heading"
              className="text-2xl sm:text-3xl md:text-4xl text-[var(--color-foreground)] font-normal"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Sản phẩm được tuyển chọn
            </h2>
            <div className="divider-gold" />
            <p className="text-sm sm:text-base text-[var(--color-muted-foreground)] mt-3 leading-relaxed">
              Những thiết kế được săn đón nhất, hội tụ đỉnh cao kỹ nghệ kim hoàn của NHẬT JEWERLY.
            </p>
          </div>
        </ScrollReveal>

        {/* Product Grid: 2 columns mobile, 3 tablet, 4 desktop */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-5 lg:gap-6">
          {displayItems.map((product, idx) => (
            <ScrollReveal
              key={product.id}
              direction="up"
              staggerIndex={idx % 4}
            >
              <ProductCard product={product as any} />
            </ScrollReveal>
          ))}
        </div>

        {/* View All Button */}
        <ScrollReveal direction="up" delay={200} className="text-center mt-10 sm:mt-14">
          <Link
            href="/san-pham"
            className="btn-outline text-xs uppercase tracking-widest py-3.5 px-8 inline-flex items-center gap-2 group"
          >
            <span>Xem tất cả sản phẩm</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-250" />
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
