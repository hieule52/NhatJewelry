"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Coins, Plus, Trash2, Loader2, Save, X } from "lucide-react";
import { formatPrice } from "@/lib/utils";

interface GoldPriceRow {
  id: string;
  type: string;
  buyPrice: number | string;
  sellPrice: number | string;
  unit: string;
  isActive: boolean;
}

export function GoldPriceManager({ initialPrices }: { initialPrices: any[] }) {
  const router = useRouter();
  const [prices, setPrices] = useState<GoldPriceRow[]>(
    initialPrices.map((p) => ({
      id: p.id,
      type: p.type,
      buyPrice: Number(p.buyPrice),
      sellPrice: Number(p.sellPrice),
      unit: p.unit,
      isActive: p.isActive,
    }))
  );

  const [isAdding, setIsAdding] = useState(false);
  const [newRow, setNewRow] = useState({
    type: "",
    buyPrice: 88000000,
    sellPrice: 90000000,
    unit: "đồng/lượng",
    isActive: true,
  });

  const [savingId, setSavingId] = useState<string | null>(null);
  const [addingLoading, setAddingLoading] = useState(false);

  const handleRowChange = (id: string, field: string, value: any) => {
    setPrices((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const handleSaveRow = async (row: GoldPriceRow) => {
    setSavingId(row.id);
    try {
      const res = await fetch(`/api/admin/gold-prices/${row.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: row.type,
          buyPrice: Number(row.buyPrice),
          sellPrice: Number(row.sellPrice),
          unit: row.unit,
          isActive: row.isActive,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        toast.success(`Đã cập nhật giá "${row.type}"!`);
        router.refresh();
      } else {
        toast.error(data.error || "Không thể cập nhật giá.");
      }
    } catch {
      toast.error("Lỗi mạng khi lưu giá vàng.");
    } finally {
      setSavingId(null);
    }
  };

  const handleDeleteRow = async (id: string, type: string) => {
    if (!window.confirm(`Xóa mục giá "${type}"?`)) return;

    try {
      const res = await fetch(`/api/admin/gold-prices/${id}`, { method: "DELETE" });
      const data = await res.json();

      if (res.ok && data.success) {
        setPrices((prev) => prev.filter((item) => item.id !== id));
        toast.success(`Đã xóa "${type}"!`);
        router.refresh();
      } else {
        toast.error(data.error || "Không thể xóa.");
      }
    } catch {
      toast.error("Lỗi khi kết nối đến máy chủ.");
    }
  };

  const handleAddRow = async (e: React.FormEvent) => {
    e.preventDefault();
    setAddingLoading(true);

    try {
      const res = await fetch("/api/admin/gold-prices", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newRow),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        toast.success("Thêm loại vàng thành công!");
        setIsAdding(false);
        router.refresh();
      } else {
        toast.error(data.error || "Không thể thêm mới.");
      }
    } catch {
      toast.error("Lỗi mạng.");
    } finally {
      setAddingLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Add New Gold Price Form */}
      {isAdding && (
        <form onSubmit={handleAddRow} className="p-6 bg-[var(--color-card)] border border-[var(--color-gold-500)]/40 space-y-4 shadow-md">
          <div className="flex items-center justify-between pb-2 border-b border-[var(--color-border)]">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-[var(--color-gold-500)]">
              Thêm loại vàng mới
            </h2>
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-wider font-medium mb-1">
                Tên loại vàng <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={newRow.type}
                onChange={(e) => setNewRow({ ...newRow, type: e.target.value })}
                placeholder="Vàng miếng SJC 999.9"
                className="w-full px-3 py-2 text-sm bg-transparent border border-[var(--color-border)] focus:border-[var(--color-gold-500)] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-medium mb-1">
                Giá mua vào (VNĐ) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                required
                value={newRow.buyPrice}
                onChange={(e) => setNewRow({ ...newRow, buyPrice: Number(e.target.value) })}
                className="w-full px-3 py-2 text-sm bg-transparent border border-[var(--color-border)] focus:border-[var(--color-gold-500)] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-medium mb-1">
                Giá bán ra (VNĐ) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                required
                value={newRow.sellPrice}
                onChange={(e) => setNewRow({ ...newRow, sellPrice: Number(e.target.value) })}
                className="w-full px-3 py-2 text-sm bg-transparent border border-[var(--color-border)] focus:border-[var(--color-gold-500)] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-medium mb-1">
                Đơn vị tính
              </label>
              <input
                type="text"
                value={newRow.unit}
                onChange={(e) => setNewRow({ ...newRow, unit: e.target.value })}
                placeholder="đồng/lượng"
                className="w-full px-3 py-2 text-sm bg-transparent border border-[var(--color-border)] focus:border-[var(--color-gold-500)] focus:outline-none"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-[var(--color-border)]">
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="btn-outline text-xs uppercase tracking-wider py-2 px-4"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={addingLoading}
              className="btn-gold text-xs uppercase tracking-widest py-2 px-6 font-semibold flex items-center gap-1.5"
            >
              {addingLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              <span>Lưu loại vàng</span>
            </button>
          </div>
        </form>
      )}

      {/* Gold Price Table */}
      <div className="bg-[var(--color-card)] border border-[var(--color-border)] overflow-x-auto">
        <div className="p-4 border-b border-[var(--color-border)] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Coins className="w-4 h-4 text-[var(--color-gold-500)]" />
            <span className="text-xs uppercase tracking-wider font-semibold">
              Bảng giá vàng hiển thị trên website ({prices.length} loại)
            </span>
          </div>
          {!isAdding && (
            <button
              type="button"
              onClick={() => setIsAdding(true)}
              className="btn-gold text-xs uppercase tracking-wider py-2 px-4 flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Thêm loại vàng</span>
            </button>
          )}
        </div>

        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-[var(--color-ivory-200)] dark:bg-[var(--color-charcoal-700)] border-b border-[var(--color-border)] uppercase tracking-wider text-[var(--color-foreground)]">
              <th className="py-3 px-4">Loại vàng</th>
              <th className="py-3 px-4">Giá mua vào (VNĐ)</th>
              <th className="py-3 px-4">Giá bán ra (VNĐ)</th>
              <th className="py-3 px-4">Đơn vị</th>
              <th className="py-3 px-4 text-center">Hiển thị</th>
              <th className="py-3 px-4 text-right">Lưu / Xóa</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--color-border)]">
            {prices.map((p) => (
              <tr key={p.id} className="hover:bg-[var(--color-ivory-100)] dark:hover:bg-[var(--color-charcoal-800)]/50">
                <td className="py-3 px-4">
                  <input
                    type="text"
                    value={p.type}
                    onChange={(e) => handleRowChange(p.id, "type", e.target.value)}
                    className="w-full max-w-[200px] px-2 py-1 bg-transparent border border-[var(--color-border)] focus:border-[var(--color-gold-500)] font-medium text-xs"
                  />
                </td>
                <td className="py-3 px-4">
                  <input
                    type="number"
                    value={p.buyPrice}
                    onChange={(e) => handleRowChange(p.id, "buyPrice", Number(e.target.value))}
                    className="w-36 px-2 py-1 bg-transparent border border-[var(--color-border)] focus:border-[var(--color-gold-500)] text-xs"
                  />
                </td>
                <td className="py-3 px-4">
                  <input
                    type="number"
                    value={p.sellPrice}
                    onChange={(e) => handleRowChange(p.id, "sellPrice", Number(e.target.value))}
                    className="w-36 px-2 py-1 bg-transparent border border-[var(--color-border)] focus:border-[var(--color-gold-500)] text-xs text-[var(--color-gold-600)] dark:text-[var(--color-gold-400)] font-semibold"
                  />
                </td>
                <td className="py-3 px-4">
                  <input
                    type="text"
                    value={p.unit}
                    onChange={(e) => handleRowChange(p.id, "unit", e.target.value)}
                    className="w-28 px-2 py-1 bg-transparent border border-[var(--color-border)] focus:border-[var(--color-gold-500)] text-xs"
                  />
                </td>
                <td className="py-3 px-4 text-center">
                  <input
                    type="checkbox"
                    checked={p.isActive}
                    onChange={(e) => handleRowChange(p.id, "isActive", e.target.checked)}
                    className="w-4 h-4 accent-[var(--color-gold-500)]"
                  />
                </td>
                <td className="py-3 px-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => handleSaveRow(p)}
                      disabled={savingId === p.id}
                      className="px-3 py-1.5 bg-[var(--color-gold-500)] text-white text-[11px] uppercase tracking-wider font-semibold hover:opacity-90 flex items-center gap-1 disabled:opacity-50"
                    >
                      {savingId === p.id ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <Save className="w-3.5 h-3.5" />
                      )}
                      <span>Lưu</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteRow(p.id, p.type)}
                      className="p-1.5 text-gray-400 hover:text-red-500 transition-colors"
                      title="Xóa loại vàng"
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
