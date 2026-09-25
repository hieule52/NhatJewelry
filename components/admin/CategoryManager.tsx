"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Plus, Edit, Trash2, Loader2, Check, X, FolderTree, ImagePlus, UploadCloud } from "lucide-react";
import Image from "next/image";

interface CategoryItem {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image: string | null;
  isActive: boolean;
  sortOrder: number;
  _count: { products: number };
}

const emptyForm = {
  name: "",
  slug: "",
  description: "",
  image: "",
  sortOrder: 0,
  isActive: true,
};

export function CategoryManager({ initialCategories }: { initialCategories: CategoryItem[] }) {
  const router = useRouter();
  const [categories] = useState(initialCategories);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const slugify = (text: string) =>
    text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[d�]/g, "d")
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();

  const handleStartEdit = (cat: CategoryItem) => {
    setEditingId(cat.id);
    setForm({
      name: cat.name,
      slug: cat.slug,
      description: cat.description || "",
      image: cat.image || "",
      sortOrder: cat.sortOrder,
      isActive: cat.isActive,
    });
    setIsCreating(false);
  };

  const handleStartCreate = () => {
    setEditingId(null);
    setForm({ ...emptyForm, sortOrder: categories.length + 1 });
    setIsCreating(true);
  };

  const handleCancel = () => {
    setEditingId(null);
    setIsCreating(false);
  };

  const handleImageUpload = async (file: File) => {
    setImageUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (res.ok && data.url) {
        setForm((prev) => ({ ...prev, image: data.url }));
        toast.success("Ảnh đã tải lên thành công!");
      } else {
        toast.error(data.error || "Không thể tải ảnh lên");
      }
    } catch {
      toast.error("Lỗi khi tải ảnh lên");
    } finally {
      setImageUploading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const url = editingId ? `/api/admin/categories/${editingId}` : "/api/admin/categories";
      const method = editingId ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        toast.error(data.error || "Thao tác không thành công");
        return;
      }
      toast.success(editingId ? "Cập nhật danh mục thành công!" : "Tạo danh mục thành công!");
      setEditingId(null);
      setIsCreating(false);
      router.refresh();
    } catch {
      toast.error("Đã xảy ra lỗi mạng");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (cat: CategoryItem) => {
    if (cat._count.products > 0) {
      toast.error(`Danh muc dang co ${cat._count.products} san pham. Khong the xoa!`);
      return;
    }
    if (!window.confirm(`Xac nhan Xóa danh mục "${cat.name}"?`)) return;
    try {
      const res = await fetch(`/api/admin/categories/${cat.id}`, { method: "DELETE" });
      const data = await res.json();
      if (res.ok && data.success) {
        toast.success("Đã xóa danh mục!");
        router.refresh();
      } else {
        toast.error(data.error || "Không thể xóa danh mục");
      }
    } catch {
      toast.error("Lỗi khi kết nối đến máy chủ");
    }
  };

  return (
    <div className="space-y-6">
      {(isCreating || editingId) && (
        <form onSubmit={handleSave} className="p-6 bg-[var(--color-card)] border border-[var(--color-gold-500)]/40 space-y-5 shadow-md">
          <div className="flex items-center justify-between pb-2 border-b border-[var(--color-border)]">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-[var(--color-gold-500)]">
              {editingId ? "Chỉnh sửa danh mục" : "Thêm danh mục mới"}
            </h2>
            <button type="button" onClick={handleCancel} className="text-gray-400 hover:text-gray-600">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-wider font-medium mb-1">
                Tên danh mục <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => {
                  const val = e.target.value;
                  setForm((prev) => ({ ...prev, name: val, slug: !editingId ? slugify(val) : prev.slug }));
                }}
                placeholder="Nhẫn, Dây cHủyền, v.v."
                className="w-full px-3 py-2 text-sm bg-transparent border border-[var(--color-border)] focus:border-[var(--color-gold-500)] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-medium mb-1">
                Slug URL <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={form.slug}
                onChange={(e) => setForm({ ...form, slug: e.target.value })}
                placeholder="nhan-vang"
                className="w-full px-3 py-2 text-sm bg-transparent border border-[var(--color-border)] focus:border-[var(--color-gold-500)] focus:outline-none font-mono text-xs"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs uppercase tracking-wider font-medium mb-1">Mô tả ngắn</label>
              <input
                type="text"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="Tinh tế, sang trọng, đẳng cấp..."
                className="w-full px-3 py-2 text-sm bg-transparent border border-[var(--color-border)] focus:border-[var(--color-gold-500)] focus:outline-none"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs uppercase tracking-wider font-medium mb-2">
                Ảnh bộ sưu tập (hiển thị trang chủ)
              </label>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative w-full sm:w-48 h-32 border-2 border-dashed border-[var(--color-border)] flex items-center justify-center overflow-hidden bg-[var(--color-ivory-100)] dark:bg-[var(--color-charcoal-800)] flex-shrink-0">
                  {form.image ? (
                    <>
                      <Image src={form.image} alt="Preview" fill className="object-cover" unoptimized />
                      <button
                        type="button"
                        onClick={() => setForm((p) => ({ ...p, image: "" }))}
                        className="absolute top-1 right-1 bg-black/60 rounded-full p-0.5 text-white hover:bg-red-600 transition-colors z-10"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </>
                  ) : (
                    <div className="flex flex-col items-center gap-1 text-[var(--color-muted-foreground)]">
                      <ImagePlus className="w-8 h-8 opacity-40" />
                      <span className="text-[10px]">Chưa có ảnh</span>
                    </div>
                  )}
                </div>

                <div className="flex flex-col gap-2 justify-center flex-1">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleImageUpload(file);
                      e.target.value = "";
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={imageUploading}
                    className="flex items-center gap-2 px-4 py-2 text-xs font-semibold border border-[var(--color-gold-500)] text-[var(--color-gold-600)] hover:bg-[var(--color-gold-500)] hover:text-white transition-colors disabled:opacity-50"
                  >
                    {imageUploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <UploadCloud className="w-4 h-4" />}
                    {imageUploading ? "Đang tải..." : "Tải ảnh từ máy tính"}
                  </button>

                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-px bg-[var(--color-border)]" />
                    <span className="text-[10px] text-[var(--color-muted-foreground)]">hoặc nhập URL</span>
                    <div className="flex-1 h-px bg-[var(--color-border)]" />
                  </div>
                  <input
                    type="text"
                    value={form.image}
                    onChange={(e) => setForm({ ...form, image: e.target.value })}
                    placeholder="https://..."
                    className="w-full px-3 py-2 text-xs bg-transparent border border-[var(--color-border)] focus:border-[var(--color-gold-500)] focus:outline-none font-mono"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-medium mb-1">Thứ tự sắp xếp</label>
              <input
                type="number"
                value={form.sortOrder}
                onChange={(e) => setForm({ ...form, sortOrder: Number(e.target.value) })}
                className="w-full px-3 py-2 text-sm bg-transparent border border-[var(--color-border)] focus:border-[var(--color-gold-500)] focus:outline-none"
              />
            </div>

            <div className="flex items-center pt-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.isActive}
                  onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
                  className="w-4 h-4 accent-[var(--color-gold-500)]"
                />
                <span className="text-xs font-medium">Kích hoạt hiển thị</span>
              </label>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-[var(--color-border)]">
            <button type="button" onClick={handleCancel} className="btn-outline text-xs uppercase tracking-wider py-2 px-4">
              Hủy
            </button>
            <button
              type="submit"
              disabled={loading}
              className="btn-gold text-xs uppercase tracking-widest py-2 px-6 font-semibold flex items-center gap-1.5"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
              <span>{editingId ? "Lưu thay đổi" : "Thêm mới"}</span>
            </button>
          </div>
        </form>
      )}

      <div className="bg-[var(--color-card)] border border-[var(--color-border)] overflow-x-auto">
        <div className="p-4 border-b border-[var(--color-border)] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FolderTree className="w-4 h-4 text-[var(--color-gold-500)]" />
            <span className="text-xs uppercase tracking-wider font-semibold">
              Danh sách danh mục ({initialCategories.length})
            </span>
          </div>
          {!isCreating && !editingId && (
            <button
              type="button"
              onClick={handleStartCreate}
              className="btn-gold text-xs uppercase tracking-wider py-2 px-4 flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Thêm danh mục</span>
            </button>
          )}
        </div>

        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-[var(--color-ivory-200)] dark:bg-[var(--color-charcoal-700)] border-b border-[var(--color-border)] uppercase tracking-wider text-[var(--color-foreground)]">
              <th className="py-3 px-4">Thứ tự</th>
              <th className="py-3 px-4">Anh</th>
              <th className="py-3 px-4">Tên danh mục</th>
              <th className="py-3 px-4">Slug URL</th>
              <th className="py-3 px-4 text-center">Số SP</th>
              <th className="py-3 px-4 text-center">Trạng thái</th>
              <th className="py-3 px-4 text-right">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--color-border)]">
            {initialCategories.map((cat) => (
              <tr
                key={cat.id}
                className="hover:bg-[var(--color-ivory-100)] dark:hover:bg-[var(--color-charcoal-800)]/60 transition-colors"
              >
                <td className="py-3 px-4 font-mono text-gray-500">{cat.sortOrder}</td>
                <td className="py-3 px-4">
                  {cat.image ? (
                    <div className="relative w-12 h-9 overflow-hidden border border-[var(--color-border)]">
                      <Image src={cat.image} alt={cat.name} fill className="object-cover" unoptimized />
                    </div>
                  ) : (
                    <div className="w-12 h-9 bg-[var(--color-ivory-200)] dark:bg-[var(--color-charcoal-700)] flex items-center justify-center border border-[var(--color-border)]">
                      <ImagePlus className="w-3.5 h-3.5 text-[var(--color-muted-foreground)] opacity-50" />
                    </div>
                  )}
                </td>
                <td className="py-3 px-4 font-semibold text-[var(--color-foreground)]">{cat.name}</td>
                <td className="py-3 px-4 font-mono text-[11px] text-[var(--color-muted-foreground)]">{cat.slug}</td>
                <td className="py-3 px-4 text-center">
                  <span className="inline-block px-2.5 py-0.5 rounded-full bg-[var(--color-ivory-200)] dark:bg-[var(--color-charcoal-700)] text-[11px] font-semibold">
                    {cat._count.products}
                  </span>
                </td>
                <td className="py-3 px-4 text-center">
                  {cat.isActive ? (
                    <span className="text-emerald-600 dark:text-emerald-400 font-medium">Hoạt động</span>
                  ) : (
                    <span className="text-gray-400">An</span>
                  )}
                </td>
                <td className="py-3 px-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => handleStartEdit(cat)}
                      className="p-1.5 text-gray-400 hover:text-[var(--color-gold-500)] transition-colors"
                      title="Chỉnh sửa"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(cat)}
                      className="p-1.5 text-gray-400 hover:text-red-500 transition-colors"
                      title="Xóa danh mục"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
