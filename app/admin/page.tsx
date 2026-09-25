import Link from "next/link";
import { prisma } from "@/lib/prisma";
import {
  Gem,
  Coins,
  MessageSquare,
  FolderTree,
  Plus,
  ArrowRight,
  Clock,
  CheckCircle2,
} from "lucide-react";
import { formatDate } from "@/lib/utils";

async function getDashboardStats() {
  try {
    const [
      totalProducts,
      featuredProducts,
      totalCategories,
      newConsultations,
      totalConsultations,
      recentConsultations,
      goldPrices,
    ] = await Promise.all([
      prisma.product.count(),
      prisma.product.count({ where: { isFeatured: true } }),
      prisma.category.count(),
      prisma.consultation.count({ where: { status: "NEW" } }),
      prisma.consultation.count(),
      prisma.consultation.findMany({
        orderBy: { createdAt: "desc" },
        take: 5,
      }),
      prisma.goldPrice.findMany({
        where: { isActive: true },
        orderBy: { createdAt: "desc" },
        take: 1,
      }),
    ]);

    return {
      totalProducts,
      featuredProducts,
      totalCategories,
      newConsultations,
      totalConsultations,
      recentConsultations,
      lastGoldUpdate: goldPrices[0]?.createdAt || null,
    };
  } catch {
    return {
      totalProducts: 0,
      featuredProducts: 0,
      totalCategories: 0,
      newConsultations: 0,
      totalConsultations: 0,
      recentConsultations: [],
      lastGoldUpdate: null,
    };
  }
}

export default async function AdminDashboardPage() {
  const stats = await getDashboardStats();

  return (
    <div className="space-y-8">
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1
            className="text-2xl sm:text-3xl text-[var(--color-foreground)] font-normal"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Bảng điều khiển quản trị
          </h1>
          <p className="text-xs text-[var(--color-muted-foreground)] mt-1">
            Chào mừng trở lại hệ thống quản lý thương hiệu NHẬT JEWERLY.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/san-pham/new"
            className="btn-gold text-xs uppercase tracking-wider py-2.5 px-4 flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Thêm sản phẩm</span>
          </Link>
          <Link
            href="/admin/gia-vang"
            className="btn-outline text-xs uppercase tracking-wider py-2.5 px-4 flex items-center gap-1.5"
          >
            <Coins className="w-4 h-4 text-[var(--color-gold-500)]" />
            <span>Cập nhật giá vàng</span>
          </Link>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Products */}
        <div className="p-5 bg-[var(--color-card)] border border-[var(--color-border)] flex items-start justify-between">
          <div>
            <div className="text-xs uppercase tracking-wider text-[var(--color-muted-foreground)] font-medium">
              Sản phẩm
            </div>
            <div
              className="text-3xl font-semibold text-[var(--color-foreground)] mt-2"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {stats.totalProducts}
            </div>
            <div className="text-[11px] text-[var(--color-gold-500)] mt-1">
              {stats.featuredProducts} sản phẩm nổi bật
            </div>
          </div>
          <div className="p-3 bg-[var(--color-gold-500)]/10 text-[var(--color-gold-500)]">
            <Gem className="w-6 h-6" />
          </div>
        </div>

        {/* Categories */}
        <div className="p-5 bg-[var(--color-card)] border border-[var(--color-border)] flex items-start justify-between">
          <div>
            <div className="text-xs uppercase tracking-wider text-[var(--color-muted-foreground)] font-medium">
              Danh mục
            </div>
            <div
              className="text-3xl font-semibold text-[var(--color-foreground)] mt-2"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {stats.totalCategories}
            </div>
            <div className="text-[11px] text-[var(--color-muted-foreground)] mt-1">
              Bộ sưu tập hiện hành
            </div>
          </div>
          <div className="p-3 bg-[var(--color-ivory-200)] dark:bg-[var(--color-charcoal-700)] text-[var(--color-foreground)]">
            <FolderTree className="w-6 h-6" />
          </div>
        </div>

        {/* New Consultations */}
        <div className="p-5 bg-[var(--color-card)] border border-[var(--color-border)] flex items-start justify-between">
          <div>
            <div className="text-xs uppercase tracking-wider text-[var(--color-muted-foreground)] font-medium">
              Tư vấn mới
            </div>
            <div
              className="text-3xl font-semibold text-[var(--color-gold-500)] mt-2"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {stats.newConsultations}
            </div>
            <div className="text-[11px] text-[var(--color-muted-foreground)] mt-1">
              Tổng số: {stats.totalConsultations} yêu cầu
            </div>
          </div>
          <div className="p-3 bg-[var(--color-gold-500)]/10 text-[var(--color-gold-500)]">
            <MessageSquare className="w-6 h-6" />
          </div>
        </div>

        {/* Gold price update status */}
        <div className="p-5 bg-[var(--color-card)] border border-[var(--color-border)] flex items-start justify-between">
          <div>
            <div className="text-xs uppercase tracking-wider text-[var(--color-muted-foreground)] font-medium">
              Giá vàng
            </div>
            <div className="text-sm font-medium text-[var(--color-foreground)] mt-3">
              {stats.lastGoldUpdate ? (
                <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="w-4 h-4" />
                  Đang hoạt động
                </span>
              ) : (
                <span className="text-[var(--color-muted-foreground)]">Chưa có dữ liệu</span>
              )}
            </div>
            <div className="text-[11px] text-[var(--color-muted-foreground)] mt-1 flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {stats.lastGoldUpdate ? formatDate(stats.lastGoldUpdate) : "Chưa cập nhật"}
            </div>
          </div>
          <div className="p-3 bg-[var(--color-gold-500)]/10 text-[var(--color-gold-500)]">
            <Coins className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Recent Consultation Requests */}
      <div className="bg-[var(--color-card)] border border-[var(--color-border)] p-5">
        <div className="flex items-center justify-between pb-4 border-b border-[var(--color-border)] mb-4">
          <div>
            <h2
              className="text-lg font-normal text-[var(--color-foreground)]"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Yêu cầu tư vấn mới nhận
            </h2>
            <p className="text-xs text-[var(--color-muted-foreground)]">
              Khách hàng cần liên hệ tư vấn trang sức hoặc báo giá
            </p>
          </div>
          <Link
            href="/admin/yeu-cau-tu-van"
            className="text-xs uppercase tracking-wider text-[var(--color-gold-500)] hover:underline flex items-center gap-1"
          >
            <span>Xem tất cả</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {stats.recentConsultations.length === 0 ? (
          <div className="text-center py-8 text-xs text-[var(--color-muted-foreground)]">
            Chưa có yêu cầu tư vấn nào được ghi nhận.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-[var(--color-border)] text-[var(--color-muted-foreground)] uppercase">
                  <th className="py-2.5 px-3">Khách hàng</th>
                  <th className="py-2.5 px-3">Số điện thoại</th>
                  <th className="py-2.5 px-3">Sản phẩm quan tâm</th>
                  <th className="py-2.5 px-3">Trạng thái</th>
                  <th className="py-2.5 px-3">Thời gian</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--color-border)]">
                {stats.recentConsultations.map((c) => (
                  <tr key={c.id} className="hover:bg-[var(--color-ivory-100)] dark:hover:bg-[var(--color-charcoal-800)]/50">
                    <td className="py-3 px-3 font-medium text-[var(--color-foreground)]">
                      {c.fullName}
                    </td>
                    <td className="py-3 px-3 font-semibold text-[var(--color-gold-600)] dark:text-[var(--color-gold-400)]">
                      {c.phone}
                    </td>
                    <td className="py-3 px-3 text-[var(--color-muted-foreground)] truncate max-w-[200px]">
                      {c.interestedIn || "Tư vấn chung"}
                    </td>
                    <td className="py-3 px-3">
                      <span
                        className={`inline-block px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider ${
                          c.status === "NEW"
                            ? "bg-amber-500/10 text-amber-500 border border-amber-500/30"
                            : c.status === "CONTACTED"
                            ? "bg-blue-500/10 text-blue-500 border border-blue-500/30"
                            : "bg-emerald-500/10 text-emerald-500 border border-emerald-500/30"
                        }`}
                      >
                        {c.status === "NEW" ? "Mới nhận" : c.status === "CONTACTED" ? "Đã liên hệ" : "Hoàn thành"}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-[var(--color-muted-foreground)]">
                      {formatDate(c.createdAt)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
