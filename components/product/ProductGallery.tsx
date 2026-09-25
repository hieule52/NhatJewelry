"use client";

import { useState } from "react";
import Image from "next/image";
import { ZoomIn, X, ChevronLeft, ChevronRight } from "lucide-react";
import type { ProductImage } from "@prisma/client";

interface ProductGalleryProps {
  images: ProductImage[];
  productName: string;
}

export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const displayImages =
    images.length > 0
      ? images
      : [
          {
            id: "placeholder",
            url: "/assets/images/poster_coming_doc.png",
            altText: productName,
            isPrimary: true,
            sortOrder: 0,
            productId: "",
          },
        ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const activeImage = displayImages[activeIndex] || displayImages[0];

  const nextImage = () => {
    setActiveIndex((prev) => (prev + 1) % displayImages.length);
  };

  const prevImage = () => {
    setActiveIndex((prev) => (prev - 1 + displayImages.length) % displayImages.length);
  };

  return (
    <div className="flex flex-col-reverse md:flex-row gap-4">
      {/* Thumbnails */}
      {displayImages.length > 1 && (
        <div className="flex md:flex-col gap-2.5 overflow-x-auto md:overflow-y-auto max-h-[520px] pb-2 md:pb-0 scrollbar-none">
          {displayImages.map((img, idx) => (
            <button
              key={img.id || idx}
              type="button"
              onClick={() => setActiveIndex(idx)}
              className={`relative w-16 h-16 sm:w-20 sm:h-20 shrink-0 border transition-all duration-300 overflow-hidden hover:scale-[1.03] ${
                activeIndex === idx
                  ? "border-[var(--color-gold-500)] ring-1 ring-[var(--color-gold-500)] shadow-sm"
                  : "border-[var(--color-border)] opacity-70 hover:opacity-100 hover:border-[var(--color-gold-400)]"
              }`}
              aria-label={`Xem ảnh ${idx + 1} của ${productName}`}
            >
              <Image
                src={img.url}
                alt={img.altText || `${productName} thumbnail ${idx + 1}`}
                fill
                className="object-cover"
                sizes="80px"
              />
            </button>
          ))}
        </div>
      )}

      {/* Main image container */}
      <div className="relative flex-1 aspect-square bg-[var(--color-ivory-100)] dark:bg-[var(--color-charcoal-800)] border border-[var(--color-border)] overflow-hidden group">
        <Image
          key={activeImage.url}
          src={activeImage.url}
          alt={activeImage.altText || productName}
          fill
          priority
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03] cursor-zoom-in animate-in fade-in duration-500"
          sizes="(max-width: 768px) 100vw, 50vw"
          onClick={() => setIsZoomOpen(true)}
        />

        {/* Top-right Tag */}
        <div className="absolute top-3.5 right-3.5 pointer-events-none">
          <span className="text-[10px] tracking-widest uppercase bg-black/60 text-white backdrop-blur-md px-2.5 py-1 border border-white/20 font-medium">
            NHẬT JEWERLY
          </span>
        </div>

        {/* Zoom trigger button */}
        <button
          type="button"
          onClick={() => setIsZoomOpen(true)}
          className="absolute bottom-3.5 right-3.5 w-10 h-10 rounded-full bg-black/60 text-white backdrop-blur-md border border-white/20 flex items-center justify-center opacity-80 hover:opacity-100 transition-opacity"
          aria-label="Phóng to ảnh chi tiết"
        >
          <ZoomIn className="w-4 h-4 text-[var(--color-gold-300)]" />
        </button>

        {/* Mobile quick arrows if multiple images */}
        {displayImages.length > 1 && (
          <div className="md:hidden">
            <button
              type="button"
              onClick={prevImage}
              className="absolute left-2.5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 text-white backdrop-blur-sm flex items-center justify-center"
              aria-label="Ảnh trước"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={nextImage}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 text-white backdrop-blur-sm flex items-center justify-center"
              aria-label="Ảnh tiếp theo"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            {/* Index count badge */}
            <div className="absolute bottom-3.5 left-3.5 bg-black/50 text-white/90 text-xs px-2.5 py-0.5 rounded-full backdrop-blur-sm">
              {activeIndex + 1} / {displayImages.length}
            </div>
          </div>
        )}
      </div>

      {/* Lightbox / Fullscreen Zoom Modal */}
      {isZoomOpen && (
        <div
          role="dialog"
          aria-label="Xem ảnh phóng to"
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setIsZoomOpen(false)}
        >
          <button
            type="button"
            onClick={() => setIsZoomOpen(false)}
            className="absolute top-6 right-6 text-white/80 hover:text-white p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-10"
            aria-label="Đóng xem ảnh"
          >
            <X className="w-6 h-6" />
          </button>

          <div
            className="relative max-w-4xl max-h-[85vh] w-full h-[80vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={activeImage.url}
              alt={activeImage.altText || productName}
              fill
              className="object-contain"
              sizes="100vw"
            />
          </div>

          {displayImages.length > 1 && (
            <div
              className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 z-10"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={prevImage}
                className="w-10 h-10 rounded-full bg-white/10 text-white hover:bg-white/20 flex items-center justify-center"
                aria-label="Ảnh trước"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <span className="text-white/80 text-sm tracking-wider">
                {activeIndex + 1} / {displayImages.length}
              </span>
              <button
                type="button"
                onClick={nextImage}
                className="w-10 h-10 rounded-full bg-white/10 text-white hover:bg-white/20 flex items-center justify-center"
                aria-label="Ảnh tiếp theo"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

