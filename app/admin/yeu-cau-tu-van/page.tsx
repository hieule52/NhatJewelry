import { prisma } from "@/lib/prisma";
import { ConsultationManager } from "@/components/admin/ConsultationManager";

export default async function AdminConsultationsPage() {
  const consultations = await prisma.consultation.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1
          className="text-2xl sm:text-3xl text-[var(--color-foreground)] font-normal"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Quản lý yêu cầu tư vấn
        </h1>
        <p className="text-xs text-[var(--color-muted-foreground)] mt-1">
          Theo dõi danh sách khách hàng để lại thông tin cần tư vấn hoặc báo giá sản phẩm
        </p>
      </div>

      <ConsultationManager initialList={consultations} />
    </div>
  );
}
