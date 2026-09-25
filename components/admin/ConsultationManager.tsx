"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { MessageSquare, Phone, Mail, Clock, Trash2, CheckCircle2, AlertCircle } from "lucide-react";
import { formatDate } from "@/lib/utils";

interface ConsultationItem {
  id: string;
  fullName: string;
  phone: string;
  email: string | null;
  interestedIn: string | null;
  message: string;
  status: "NEW" | "CONTACTED" | "COMPLETED";
  createdAt: Date;
}

export function ConsultationManager({ initialList }: { initialList: ConsultationItem[] }) {
  const router = useRouter();
  const [list, setList] = useState(initialList);
  const [filter, setFilter] = useState<string>("ALL");

  const filteredList = list.filter((item) => {
    if (filter === "ALL") return true;
    return item.status === filter;
  });

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/admin/consultations/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setList((prev) =>
          prev.map((c) => (c.id === id ? { ...c, status: newStatus as any } : c))
        );
        toast.success("Cập nhật trạng thái thành công!");
        router.refresh();
      } else {
        toast.error("Không thể cập nhật trạng thái");
      }
    } catch {
      toast.error("Lỗi kết nối");
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Bạn có chắc muốn xóa yêu cầu tư vấn này?")) return;

    try {
      const res = await fetch(`/api/admin/consultations/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setList((prev) => prev.filter((c) => c.id !== id));
        toast.success("Đã xóa yêu cầu tư vấn!");
        router.refresh();
      } else {
        toast.error("Không thể xóa");
      }
    } catch {
      toast.error("Lỗi kết nối");
    }
  };

  return (
    <div className="space-y-6">
      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {[
          { key: "ALL", label: "Tất cả yêu cầu" },
          { key: "NEW", label: "Mới nhận" },
          { key: "CONTACTED", label: "Đã liên hệ" },
          { key: "COMPLETED", label: "Hoàn thành" },
        ].map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setFilter(tab.key)}
            className={`text-xs uppercase tracking-wider px-4 py-2 border transition-colors ${
              filter === tab.key
                ? "bg-[var(--color-gold-500)] text-white border-[var(--color-gold-500)] font-semibold"
                : "border-[var(--color-border)] text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Consultations Card List */}
      {filteredList.length === 0 ? (
        <div className="p-12 text-center border border-[var(--color-border)] bg-[var(--color-card)] text-xs text-[var(--color-muted-foreground)]">
          Không có yêu cầu tư vấn nào phù hợp với bộ lọc hiện tại.
        </div>
      ) : (
        <div className="space-y-4">
          {filteredList.map((item) => (
            <div
              key={item.id}
              className="p-5 border border-[var(--color-border)] bg-[var(--color-card)] flex flex-col md:flex-row gap-4 justify-between items-start"
            >
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="text-base font-semibold text-[var(--color-foreground)]">
                    {item.fullName}
                  </span>
                  <span
                    className={`px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${
                      item.status === "NEW"
                        ? "bg-amber-500/10 text-amber-500 border border-amber-500/30"
                        : item.status === "CONTACTED"
                        ? "bg-blue-500/10 text-blue-500 border border-blue-500/30"
                        : "bg-emerald-500/10 text-emerald-500 border border-emerald-500/30"
                    }`}
                  >
                    {item.status === "NEW" ? "Mới nhận" : item.status === "CONTACTED" ? "Đã liên hệ" : "Hoàn thành"}
                  </span>
                  <span className="text-xs text-[var(--color-muted-foreground)] flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {formatDate(item.createdAt)}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs text-[var(--color-muted-foreground)]">
                  <a
                    href={`tel:${item.phone}`}
                    className="flex items-center gap-1.5 text-[var(--color-gold-600)] dark:text-[var(--color-gold-400)] font-bold hover:underline"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    {item.phone}
                  </a>
                  {item.email && (
                    <a
                      href={`mailto:${item.email}`}
                      className="flex items-center gap-1.5 hover:underline"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      {item.email}
                    </a>
                  )}
                  {item.interestedIn && (
                    <span className="px-2 py-0.5 bg-[var(--color-ivory-200)] dark:bg-[var(--color-charcoal-700)] text-[11px] font-medium text-[var(--color-foreground)]">
                      Sản phẩm quan tâm: {item.interestedIn}
                    </span>
                  )}
                </div>

                <div className="p-3 bg-[var(--color-ivory-100)] dark:bg-[var(--color-charcoal-800)] border border-[var(--color-border)] text-xs text-[var(--color-foreground)] leading-relaxed">
                  <span className="font-semibold block mb-1 text-[var(--color-muted-foreground)] text-[10px] uppercase tracking-wider">
                    Lời nhắn của khách hàng:
                  </span>
                  {item.message}
                </div>
              </div>

              {/* Action controls */}
              <div className="flex md:flex-col items-center gap-2 self-end md:self-center shrink-0">
                <select
                  value={item.status}
                  onChange={(e) => handleStatusChange(item.id, e.target.value)}
                  className="px-3 py-1.5 text-xs bg-transparent border border-[var(--color-border)] focus:border-[var(--color-gold-500)] focus:outline-none uppercase font-semibold text-[var(--color-foreground)]"
                >
                  <option value="NEW" className="bg-[var(--color-card)]">Mới nhận</option>
                  <option value="CONTACTED" className="bg-[var(--color-card)]">Đã liên hệ</option>
                  <option value="COMPLETED" className="bg-[var(--color-card)]">Hoàn thành</option>
                </select>

                <button
                  type="button"
                  onClick={() => handleDelete(item.id)}
                  className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                  title="Xóa yêu cầu"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
