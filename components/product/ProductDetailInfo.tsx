"use client";

import Link from "next/link";
import { useState } from "react";
import { MessageSquare, Phone, ShieldCheck, Sparkles, RefreshCw, Check, Copy } from "lucide-react";
import type { Product, Category } from "@prisma/client";
import { formatPrice } from "@/lib/utils";

interface ProductDetailInfoProps {
  product: Product & { category: Category };
}

export function ProductDetailInfo({ product }: ProductDetailInfoProps) {
  const [copied, setCopied] = useState(false);

  const copySku = () => {
    navigator.clipboard.writeText(product.sku);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const priceFormatted = product.price ? formatPrice(Number(product.price)) : null;

  return (
    <div className="flex flex-col">
      {/* Category & SKU */}
      <div className="flex items-center justify-between gap-4 mb-3">
        <Link
          href={`/san-pham?category=${product.category.slug}`}
          className="text-xs uppercase tracking-widest text-[var(--color-gold-500)] hover:text-[var(--color-gold-400)] transition-colors font-medium"
        >
          {product.category.name}
        </Link>
        <button
          type="button"
          onClick={copySku}
          className="text-xs text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] flex items-center gap-1.5 transition-colors py-1 px-2 rounded hover:bg-[var(--color-ivory-200)] dark:hover:bg-[var(--color-charcoal-700)]"
          title="Sao chép mã sản phẩm"
          aria-label="Sao chép mã sản phẩm"
        >
          <span>Mã SP: {product.sku}</span>
          {copied ? (
            <Check className="w-3.5 h-3.5 text-emerald-500" />
          ) : (
            <Copy className="w-3.5 h-3.5 opacity-60" />
          )}
        </button>
      </div>

      {/* Product Name */}
      <h1
        className="text-2xl sm:text-3xl lg:text-4xl text-[var(--color-foreground)] mb-4 font-normal tracking-tight"
        style={{ fontFamily: "var(--font-heading)" }}
      >
        {product.name}
      </h1>

      {/* Price section */}
      <div className="p-4 sm:p-5 bg-[var(--color-ivory-100)] dark:bg-[var(--color-charcoal-800)]/80 border border-[var(--color-border)] mb-6">
        <div className="text-[11px] uppercase tracking-widest text-[var(--color-muted-foreground)] mb-1">
          Giá tham khảo
        </div>
        {product.priceDisplay === "SHOW" && priceFormatted ? (
          <div className="flex flex-wrap items-baseline gap-2.5">
            <span
              className="text-2xl sm:text-3xl font-semibold text-[var(--color-gold-500)] tabular-nums"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {priceFormatted}
            </span>
            <span className="text-xs text-[var(--color-muted-foreground)]">
              (Giá có thể biến động theo thời giá vàng thực tế)
            </span>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <span className="text-lg sm:text-xl font-medium text-[var(--color-gold-500)]">
              Liên hệ để nhận báo giá chính xác theo trọng lượng
            </span>
          </div>
        )}
      </div>

      {/* Action CTA Buttons (Desktop & Tablet) */}
      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        <Link
          href={`/lien-he?product=${encodeURIComponent(product.name)}&sku=${encodeURIComponent(product.sku)}`}
          className="btn-gold flex-1 justify-center min-h-[48px] py-3.5 text-center text-xs sm:text-sm font-semibold tracking-wider uppercase flex items-center gap-2"
        >
          <MessageSquare className="w-4 h-4" />
          Gửi yêu cầu tư vấn
        </Link>
        <a
          href="tel:0757575755"
          className="btn-outline flex-1 justify-center min-h-[48px] py-3.5 text-center text-xs sm:text-sm font-semibold tracking-wider uppercase flex items-center gap-2"
        >
          <Phone className="w-4 h-4 text-[var(--color-gold-500)]" />
          Hotline: 0757 575 755
        </a>
      </div>

      {/* Specifications */}
      <div className="border border-[var(--color-border)] divide-y divide-[var(--color-border)] mb-8 bg-[var(--color-card)]">
        <div className="px-4 py-3 bg-[var(--color-ivory-200)] dark:bg-[var(--color-charcoal-700)] text-xs font-semibold uppercase tracking-wider text-[var(--color-foreground)]">
          Thông số kỹ thuật sản phẩm
        </div>
        {product.material && (
          <div className="flex justify-between px-4 py-3 text-sm">
            <span className="text-[var(--color-muted-foreground)]">Chất liệu</span>
            <span className="font-medium text-[var(--color-foreground)]">{product.material}</span>
          </div>
        )}
        {product.weight && (
          <div className="flex justify-between px-4 py-3 text-sm">
            <span className="text-[var(--color-muted-foreground)]">Trọng lượng vàng</span>
            <span className="font-medium text-[var(--color-foreground)]">{product.weight}</span>
          </div>
        )}
        {product.gemstone && (
          <div className="flex justify-between px-4 py-3 text-sm">
            <span className="text-[var(--color-muted-foreground)]">Đá đính kèm</span>
            <span className="font-medium text-[var(--color-foreground)]">{product.gemstone}</span>
          </div>
        )}
        {product.size && (
          <div className="flex justify-between px-4 py-3 text-sm">
            <span className="text-[var(--color-muted-foreground)]">Kích cỡ (Size)</span>
            <span className="font-medium text-[var(--color-foreground)]">{product.size}</span>
          </div>
        )}
        <div className="flex justify-between px-4 py-3 text-sm">
          <span className="text-[var(--color-muted-foreground)]">Thương hiệu</span>
          <span className="font-medium text-[var(--color-foreground)]">NHẬT JEWERLY</span>
        </div>
      </div>

      {/* Commitments & Guarantee */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 bg-[var(--color-ivory-100)] dark:bg-[var(--color-charcoal-800)]/60 border border-[var(--color-border)] text-xs">
        <div className="flex items-start gap-2.5">
          <ShieldCheck className="w-4 h-4 text-[var(--color-gold-500)] shrink-0 mt-0.5" />
          <div>
            <div className="font-medium text-[var(--color-foreground)]">Chuẩn tuổi vàng 100%</div>
            <div className="text-[var(--color-muted-foreground)]">Có giấy kiểm định theo kèm</div>
          </div>
        </div>
        <div className="flex items-start gap-2.5">
          <Sparkles className="w-4 h-4 text-[var(--color-gold-500)] shrink-0 mt-0.5" />
          <div>
            <div className="font-medium text-[var(--color-foreground)]">Bảo hành trọn đời</div>
            <div className="text-[var(--color-muted-foreground)]">Làm sáng, vệ sinh miễn phí</div>
          </div>
        </div>
        <div className="flex items-start gap-2.5">
          <RefreshCw className="w-4 h-4 text-[var(--color-gold-500)] shrink-0 mt-0.5" />
          <div>
            <div className="font-medium text-[var(--color-foreground)]">Thu đổi minh bạch</div>
            <div className="text-[var(--color-muted-foreground)]">Theo giá vàng thị trường</div>
          </div>
        </div>
      </div>

      {/* Full Description & Technical Notes */}
      {(product.description || product.technicalInfo) && (
        <div className="mt-8 pt-8 border-t border-[var(--color-border)] space-y-4">
          <h2
            className="text-xl font-normal text-[var(--color-foreground)]"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Mô tả chi tiết & Chế tác
          </h2>
          {product.description && (
            <p className="text-sm leading-relaxed text-[var(--color-muted-foreground)] whitespace-pre-line">
              {product.description}
            </p>
          )}
          {product.technicalInfo && (
            <div className="p-4 bg-[var(--color-ivory-200)] dark:bg-[var(--color-charcoal-900)] text-xs text-[var(--color-muted-foreground)] space-y-1 border-l-2 border-[var(--color-gold-500)]">
              <span className="font-semibold text-[var(--color-foreground)] block mb-1">
                Lưu ý kỹ thuật & dịch vụ hậu mãi:
              </span>
              <p className="whitespace-pre-line">{product.technicalInfo}</p>
            </div>
          )}
        </div>
      )}

      {/* Sticky Bottom Bar on Mobile for maximum conversion */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[var(--color-card)]/95 backdrop-blur-md border-t border-[var(--color-border)] p-3 shadow-lg flex gap-2">
        <a
          href="tel:0900000000"
          className="btn-outline flex-1 justify-center min-h-[46px] py-2 text-center text-xs font-semibold tracking-wider uppercase flex items-center gap-1.5"
          aria-label="Gọi hotline"
        >
          <Phone className="w-3.5 h-3.5 text-[var(--color-gold-500)]" />
          Gọi ngay
        </a>
        <Link
          href={`/lien-he?product=${encodeURIComponent(product.name)}&sku=${encodeURIComponent(product.sku)}`}
          className="btn-gold flex-[2] justify-center min-h-[46px] py-2 text-center text-xs font-semibold tracking-wider uppercase flex items-center gap-1.5"
        >
          <MessageSquare className="w-3.5 h-3.5" />
          Nhận tư vấn
        </Link>
      </div>
    </div>
  );
}

