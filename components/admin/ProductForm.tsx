"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import { Plus, Trash2, Loader2, ArrowLeft, Image as ImageIcon, Upload } from "lucide-react";
import type { Category, Product, ProductImage } from "@prisma/client";

interface ProductFormProps {
  categories: Category[];
  initialData?: (Product & { images: ProductImage[] }) | null;
}

export function ProductForm({ categories, initialData }: ProductFormProps) {
  const router = useRouter();
  const isEdit = !!initialData;

  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    slug: initialData?.slug || "",
    sku: initialData?.sku || "",
    categoryId: initialData?.categoryId || (categories[0]?.id || ""),
    description: initialData?.description || "",
    price: initialData?.price ? Number(initialData.price) : 0,
    priceDisplay: initialData?.priceDisplay || "CONTACT",
    material: initialData?.material || "",
    weight: initialData?.weight || "",
    gemstone: initialData?.gemstone || "",
    size: initialData?.size || "",
    technicalInfo: initialData?.technicalInfo || "",
    isActive: initialData ? initialData.isActive : true,
    isFeatured: initialData ? initialData.isFeatured : false,
    seoTitle: initialData?.seoTitle || "",
    seoDescription: initialData?.seoDescription || "",
    seoKeywords: initialData?.seoKeywords || "",
  });

  const [images, setImages] = useState<{ url: string; altText: string; isPrimary: boolean }[]>(
    initialData?.images && initialData.images.length > 0
      ? initialData.images.map((img) => ({
          url: img.url,
          altText: img.altText || "",
          isPrimary: img.isPrimary,
        }))
      : [{ url: "", altText: "", isPrimary: true }]
  );

  const [submitting, setSubmitting] = useState(false);
  const [newImageUrl, setNewImageUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    const toastId = toast.loading(`Đang tải ${files.length} ảnh lên...`);

    try {
      const data = new FormData();
      for (let i = 0; i < files.length; i++) {
        data.append("files", files[i]);
      }

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: data,
      });

      const result = await res.json();

      if (!res.ok || !result.success) {
        toast.error(result.error || "Tải ảnh thất bại.", { id: toastId });
        return;
      }

      const newUrls: string[] = result.urls || [result.url];

      setImages((prev) => [
        ...prev,
        ...newUrls.map((url, idx) => ({
          url,
          altText: formData.name || "Ảnh sản phẩm",
          isPrimary: prev.length === 0 && idx === 0,
        })),
      ]);

      toast.success(`Đã thêm ${newUrls.length} ảnh từ máy tính thành công!`, { id: toastId });
    } catch (err) {
      console.error(err);
      toast.error("Lỗi khi tải ảnh. Vui lòng thử lại!", { id: toastId });
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  // Handle auto-generating slug from name
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setFormData((prev) => {
      if (!isEdit && (!prev.slug || prev.slug === slugify(prev.name))) {
        return { ...prev, name, slug: slugify(name) };
      }
      return { ...prev, name };
    });
  };

  const slugify = (text: string) => {
    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[đĐ]/g, "d")
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  };

  const handleAddImage = () => {
    if (!newImageUrl.trim()) return;
    setImages((prev) => [
      ...prev,
      {
        url: newImageUrl.trim(),
        altText: formData.name,
        isPrimary: prev.length === 0,
      },
    ]);
    setNewImageUrl("");
  };

  const handleRemoveImage = (index: number) => {
    setImages((prev) => {
      const filtered = prev.filter((_, idx) => idx !== index);
      if (filtered.length > 0 && !filtered.some((img) => img.isPrimary)) {
        filtered[0].isPrimary = true;
      }
      return filtered;
    });
  };

  const handleSetPrimaryImage = (index: number) => {
    setImages((prev) =>
      prev.map((img, idx) => ({
        ...img,
        isPrimary: idx === index,
      }))
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const validImages = images.filter((img) => img.url.trim().length > 0);
    if (validImages.length === 0) {
      toast.error("Vui lòng thêm ít nhất một hình ảnh cho sản phẩm!");
      setSubmitting(false);
      return;
    }

    const payload = {
      ...formData,
      price: formData.price ? Number(formData.price) : null,
      images: validImages.map((img, idx) => ({
        ...img,
        sortOrder: idx,
      })),
    };

    try {
      const url = isEdit
        ? `/api/admin/products/${initialData.id}`
        : "/api/admin/products";
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (!res.ok || !result.success) {
        toast.error(result.error || "Không thể lưu sản phẩm.");
        return;
      }

      toast.success(isEdit ? "Cập nhật sản phẩm thành công!" : "Tạo sản phẩm mới thành công!");
      router.push("/admin/san-pham");
      router.refresh();
    } catch {
      toast.error("Đã xảy ra lỗi mạng. Vui lòng thử lại!");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Top action header */}
      <div className="flex items-center justify-between gap-4 pb-4 border-b border-[var(--color-border)]">
        <Link
          href="/admin/san-pham"
          className="text-xs uppercase tracking-wider text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] flex items-center gap-1.5 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Quay lại danh sách</span>
        </Link>
        <button
          type="submit"
          disabled={submitting}
          className="btn-gold text-xs uppercase tracking-widest py-2.5 px-6 font-semibold flex items-center gap-2 cursor-pointer disabled:opacity-50"
        >
          {submitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Đang lưu...
            </>
          ) : (
            isEdit ? "Cập nhật sản phẩm" : "Lưu & Xuất bản"
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left column: Core Product Information */}
        <div className="lg:col-span-8 space-y-6">
          {/* Main Info */}
          <div className="p-6 bg-[var(--color-card)] border border-[var(--color-border)] space-y-4">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-[var(--color-foreground)] border-b border-[var(--color-border)] pb-2">
              Thông tin cơ bản
            </h2>

            <div>
              <label className="block text-xs uppercase tracking-wider font-medium mb-1.5">
                Tên sản phẩm <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={handleNameChange}
                placeholder="Ví dụ: Nhẫn Kim Cương Solitaire Vàng 18K"
                className="w-full px-4 py-2 text-sm bg-transparent border border-[var(--color-border)] focus:border-[var(--color-gold-500)] focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-wider font-medium mb-1.5">
                  Đường dẫn tĩnh (Slug URL) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  placeholder="nhan-kim-cuong-solitaire-vang-18k"
                  className="w-full px-4 py-2 text-sm bg-transparent border border-[var(--color-border)] focus:border-[var(--color-gold-500)] focus:outline-none font-mono text-xs"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-medium mb-1.5">
                  Mã SKU sản phẩm <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.sku}
                  onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                  placeholder="NJ-RING-001"
                  className="w-full px-4 py-2 text-sm bg-transparent border border-[var(--color-border)] focus:border-[var(--color-gold-500)] focus:outline-none font-mono text-xs uppercase"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-medium mb-1.5">
                Mô tả chi tiết sản phẩm
              </label>
              <textarea
                rows={5}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Mô tả về cảm hứng thiết kế, độ tinh xảo, ý nghĩa phong thủy..."
                className="w-full px-4 py-2 text-sm bg-transparent border border-[var(--color-border)] focus:border-[var(--color-gold-500)] focus:outline-none"
              />
            </div>
          </div>

          {/* Specifications */}
          <div className="p-6 bg-[var(--color-card)] border border-[var(--color-border)] space-y-4">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-[var(--color-foreground)] border-b border-[var(--color-border)] pb-2">
              Thông số kỹ thuật & Kim hoàn
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-wider font-medium mb-1.5">
                  Chất liệu vàng
                </label>
                <input
                  type="text"
                  value={formData.material}
                  onChange={(e) => setFormData({ ...formData, material: e.target.value })}
                  placeholder="Vàng 18K (750) / Vàng 24K (999.9)"
                  className="w-full px-4 py-2 text-sm bg-transparent border border-[var(--color-border)] focus:border-[var(--color-gold-500)] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-medium mb-1.5">
                  Trọng lượng ước tính
                </label>
                <input
                  type="text"
                  value={formData.weight}
                  onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                  placeholder="1.25 chỉ / 4.68 gram"
                  className="w-full px-4 py-2 text-sm bg-transparent border border-[var(--color-border)] focus:border-[var(--color-gold-500)] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-medium mb-1.5">
                  Đá chủ / Đá tấm đính kèm
                </label>
                <input
                  type="text"
                  value={formData.gemstone}
                  onChange={(e) => setFormData({ ...formData, gemstone: e.target.value })}
                  placeholder="Kim cương tự nhiên 4.5mm / Đá CZ"
                  className="w-full px-4 py-2 text-sm bg-transparent border border-[var(--color-border)] focus:border-[var(--color-gold-500)] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-medium mb-1.5">
                  Kích thước (Size)
                </label>
                <input
                  type="text"
                  value={formData.size}
                  onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                  placeholder="Size 10 - 18 (hoặc Chỉnh theo cỡ tay)"
                  className="w-full px-4 py-2 text-sm bg-transparent border border-[var(--color-border)] focus:border-[var(--color-gold-500)] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-medium mb-1.5">
                Lưu ý kỹ thuật chế tác (Technical Info)
              </label>
              <textarea
                rows={2}
                value={formData.technicalInfo}
                onChange={(e) => setFormData({ ...formData, technicalInfo: e.target.value })}
                placeholder="Công nghệ cắt mài Laser, khắc chữ theo yêu cầu..."
                className="w-full px-4 py-2 text-sm bg-transparent border border-[var(--color-border)] focus:border-[var(--color-gold-500)] focus:outline-none"
              />
            </div>
          </div>

          {/* Product Images */}
          <div className="p-6 bg-[var(--color-card)] border border-[var(--color-border)] space-y-4">
            <div className="flex items-center justify-between border-b border-[var(--color-border)] pb-2">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-[var(--color-foreground)]">
                Hình ảnh sản phẩm
              </h2>
              <span className="text-xs text-[var(--color-muted-foreground)]">
                {images.length} ảnh đã chọn
              </span>
            </div>

            {/* Upload from PC & URL input */}
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-3">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleFileUpload}
                  className="hidden"
                  id="product-image-upload"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading}
                  className="btn-gold text-xs uppercase tracking-wider py-2.5 px-5 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 transition-all"
                >
                  {isUploading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Đang tải lên...</span>
                    </>
                  ) : (
                    <>
                      <Upload className="w-4 h-4" />
                      <span>Tải ảnh từ máy tính (PC)</span>
                    </>
                  )}
                </button>

                <span className="text-xs text-[var(--color-muted-foreground)]">
                  hoặc dán đường dẫn ảnh:
                </span>
              </div>

              <div className="flex gap-2">
                <input
                  type="url"
                  value={newImageUrl}
                  onChange={(e) => setNewImageUrl(e.target.value)}
                  placeholder="Nhập URL hình ảnh (ví dụ https://... hoặc /assets/images/...)"
                  className="flex-1 px-4 py-2 text-sm bg-transparent border border-[var(--color-border)] focus:border-[var(--color-gold-500)] focus:outline-none"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddImage();
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={handleAddImage}
                  className="btn-outline text-xs uppercase tracking-wider px-4 flex items-center gap-1"
                >
                  <Plus className="w-4 h-4" />
                  <span>Thêm URL</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
              {images.map((img, idx) => (
                <div
                  key={idx}
                  className={`relative p-2 border rounded-none flex flex-col items-center gap-2 ${
                    img.isPrimary ? "border-[var(--color-gold-500)] bg-[var(--color-gold-500)]/5" : "border-[var(--color-border)]"
                  }`}
                >
                  <div className="relative w-full aspect-square bg-[var(--color-ivory-200)] dark:bg-[var(--color-charcoal-700)] overflow-hidden">
                    {img.url ? (
                      <Image
                        src={img.url}
                        alt={`Ảnh ${idx + 1}`}
                        fill
                        className="object-cover"
                        sizes="160px"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <ImageIcon className="w-6 h-6" />
                      </div>
                    )}
                  </div>

                  <div className="w-full flex items-center justify-between text-[11px]">
                    <label className="flex items-center gap-1 cursor-pointer">
                      <input
                        type="radio"
                        name="primaryImage"
                        checked={img.isPrimary}
                        onChange={() => handleSetPrimaryImage(idx)}
                      />
                      <span>Ảnh chính</span>
                    </label>

                    <button
                      type="button"
                      onClick={() => handleRemoveImage(idx)}
                      className="text-red-500 hover:text-red-700 p-1"
                      title="Xóa ảnh"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SEO Metadata */}
          <div className="p-6 bg-[var(--color-card)] border border-[var(--color-border)] space-y-4">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-[var(--color-foreground)] border-b border-[var(--color-border)] pb-2">
              Tối ưu hóa công cụ tìm kiếm (SEO)
            </h2>

            <div>
              <label className="block text-xs uppercase tracking-wider font-medium mb-1.5">
                Tiêu đề SEO (Meta Title)
              </label>
              <input
                type="text"
                value={formData.seoTitle}
                onChange={(e) => setFormData({ ...formData, seoTitle: e.target.value })}
                placeholder="Để trống sẽ tự động dùng Tên sản phẩm | NHẬT JEWERLY"
                className="w-full px-4 py-2 text-sm bg-transparent border border-[var(--color-border)] focus:border-[var(--color-gold-500)] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-medium mb-1.5">
                Mô tả SEO (Meta Description)
              </label>
              <textarea
                rows={2}
                value={formData.seoDescription}
                onChange={(e) => setFormData({ ...formData, seoDescription: e.target.value })}
                placeholder="Khoảng 150-160 ký tự mô tả hấp dẫn chuẩn SEO Google..."
                className="w-full px-4 py-2 text-sm bg-transparent border border-[var(--color-border)] focus:border-[var(--color-gold-500)] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-medium mb-1.5">
                Từ khóa SEO (cách nhau bằng dấu phẩy)
              </label>
              <input
                type="text"
                value={formData.seoKeywords}
                onChange={(e) => setFormData({ ...formData, seoKeywords: e.target.value })}
                placeholder="nhẫn vàng, nhẫn kim cương 18k, trang sức nhật jewerly"
                className="w-full px-4 py-2 text-sm bg-transparent border border-[var(--color-border)] focus:border-[var(--color-gold-500)] focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Right column: Publishing, Category, Pricing settings */}
        <div className="lg:col-span-4 space-y-6">
          {/* Publishing state */}
          <div className="p-6 bg-[var(--color-card)] border border-[var(--color-border)] space-y-4">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-[var(--color-foreground)] border-b border-[var(--color-border)] pb-2">
              Trạng thái xuất bản
            </h2>

            <div className="space-y-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  className="w-4 h-4 accent-[var(--color-gold-500)]"
                />
                <span className="text-xs font-medium">Hiển thị trên website</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isFeatured}
                  onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                  className="w-4 h-4 accent-[var(--color-gold-500)]"
                />
                <span className="text-xs font-medium">Ghim sản phẩm nổi bật trang chủ</span>
              </label>
            </div>
          </div>

          {/* Category */}
          <div className="p-6 bg-[var(--color-card)] border border-[var(--color-border)] space-y-4">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-[var(--color-foreground)] border-b border-[var(--color-border)] pb-2">
              Danh mục bộ sưu tập
            </h2>

            <div>
              <label className="block text-xs uppercase tracking-wider font-medium mb-1.5">
                Chọn danh mục <span className="text-red-500">*</span>
              </label>
              <select
                required
                value={formData.categoryId}
                onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                className="w-full px-4 py-2 text-sm bg-transparent border border-[var(--color-border)] focus:border-[var(--color-gold-500)] focus:outline-none text-[var(--color-foreground)]"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.id} className="bg-[var(--color-card)]">
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Pricing settings */}
          <div className="p-6 bg-[var(--color-card)] border border-[var(--color-border)] space-y-4">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-[var(--color-foreground)] border-b border-[var(--color-border)] pb-2">
              Giá niêm yết
            </h2>

            <div>
              <label className="block text-xs uppercase tracking-wider font-medium mb-1.5">
                Chế độ hiển thị giá
              </label>
              <select
                value={formData.priceDisplay}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    priceDisplay: e.target.value as "SHOW" | "CONTACT" | "HIDDEN",
                  })
                }
                className="w-full px-4 py-2 text-sm bg-transparent border border-[var(--color-border)] focus:border-[var(--color-gold-500)] focus:outline-none text-[var(--color-foreground)]"
              >
                <option value="CONTACT" className="bg-[var(--color-card)]">
                  Hiển thị chữ &quot;Liên hệ để báo giá&quot;
                </option>
                <option value="SHOW" className="bg-[var(--color-card)]">
                  Hiển thị mức giá số (VNĐ)
                </option>
                <option value="HIDDEN" className="bg-[var(--color-card)]">
                  Ẩn phần giá
                </option>
              </select>
            </div>

            {formData.priceDisplay === "SHOW" && (
              <div>
                <label className="block text-xs uppercase tracking-wider font-medium mb-1.5">
                  Giá tiền (VNĐ)
                </label>
                <input
                  type="number"
                  min="0"
                  step="100000"
                  value={formData.price || ""}
                  onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                  placeholder="Ví dụ: 15500000"
                  className="w-full px-4 py-2 text-sm bg-transparent border border-[var(--color-border)] focus:border-[var(--color-gold-500)] focus:outline-none"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </form>
  );
}
