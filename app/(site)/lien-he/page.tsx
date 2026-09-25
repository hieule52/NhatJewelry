import type { Metadata } from "next";
import { Suspense } from "react";
import { Breadcrumb } from "@/components/seo/Breadcrumb";
import { ConsultationForm } from "@/components/contact/ConsultationForm";
import { MapPin, Phone, Mail, Clock, MessageSquare, ShieldCheck, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Liên Hệ & Đặt Lịch Tư Vấn Kim Hoàn",
  description:
    "Liên hệ với NHẬT JEWERLY để nhận tư vấn chế tác trang sức, báo giá vàng nhanh chóng, hoặc đặt lịch ghé thăm cửa hàng.",
  keywords: [
    "liên hệ NHẬT JEWERLY",
    "tư vấn trang sức",
    "đặt làm trang sức theo yêu cầu",
    "cửa hàng vàng bạc đá quý",
  ],
};

export default function ContactPage() {
  const breadcrumbs = [
    { label: "Trang chủ", href: "/" },
    { label: "Liên hệ tư vấn", href: "/lien-he", current: true },
  ];

  return (
    <div className="pt-20 min-h-screen bg-[var(--color-background)]">
      {/* Header */}
      <div className="border-b border-[var(--color-border)] pt-8 pb-8 md:pt-10 md:pb-12 bg-[var(--color-surface)] dark:bg-[#12100E]">
        <div className="container-site">
          <Breadcrumb items={breadcrumbs} />
          <div className="max-w-2xl mt-4">
            <span className="text-xs uppercase tracking-widest text-[var(--color-gold-500)] font-medium block mb-1">
              Hỗ trợ khách hàng
            </span>
            <h1
              className="text-3xl sm:text-4xl text-[var(--color-foreground)] font-normal tracking-tight"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Liên hệ & Nhận tư vấn
            </h1>
            <p className="text-[var(--color-muted-foreground)] text-sm mt-2">
              Chúng tôi luôn sẵn sàng lắng nghe và đồng hành cùng quý khách để lựa chọn hoặc chế tác những tuyệt tác trang sức ưng ý nhất.
            </p>
          </div>
        </div>
      </div>

      <div className="container-site py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          {/* Contact Info Sidebar */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <h2
                className="text-2xl text-[var(--color-foreground)] font-normal mb-4"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Thông tin thương hiệu
              </h2>
              <p className="text-sm text-[var(--color-muted-foreground)] leading-relaxed">
                Quý khách có thể ghé thăm trực tiếp cửa hàng để chiêm ngưỡng sản phẩm thực tế, hoặc liên hệ qua đường dây nóng để được hỗ trợ tức thì.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4 p-4 border border-[var(--color-border)] bg-[var(--color-card)]">
                <div className="w-10 h-10 rounded-full bg-[var(--color-gold-500)]/10 text-[var(--color-gold-500)] flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--color-foreground)]">
                    Địa chỉ cửa hàng
                  </h3>
                  <p className="text-sm text-[var(--color-muted-foreground)] mt-1">
                    Thanh Thủy, Thành Phố Huế
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 border border-[var(--color-border)] bg-[var(--color-card)]">
                <div className="w-10 h-10 rounded-full bg-[var(--color-gold-500)]/10 text-[var(--color-gold-500)] flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--color-foreground)]">
                    Hotline tư vấn & CSKH
                  </h3>
                  <a
                    href="tel:0757575755"
                    className="text-base font-bold text-[var(--color-gold-500)] hover:underline block mt-1"
                  >
                    0757 575 755
                  </a>
                  <span className="text-xs text-[var(--color-muted-foreground)]">
                    Hỗ trợ nhanh qua Zalo / Cuộc gọi trực tiếp
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 border border-[var(--color-border)] bg-[var(--color-card)]">
                <div className="w-10 h-10 rounded-full bg-[var(--color-gold-500)]/10 text-[var(--color-gold-500)] flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--color-foreground)]">
                    Email liên hệ
                  </h3>
                  <a
                    href="mailto:contact@nhatjewerly.com"
                    className="text-sm text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] mt-1 block transition-colors"
                  >
                    contact@nhatjewerly.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 border border-[var(--color-border)] bg-[var(--color-card)]">
                <div className="w-10 h-10 rounded-full bg-[var(--color-gold-500)]/10 text-[var(--color-gold-500)] flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--color-foreground)]">
                    Thời gian hoạt động
                  </h3>
                  <p className="text-sm text-[var(--color-muted-foreground)] mt-1">
                    Thứ Hai — Chủ Nhật: <strong>08:30 – 20:30</strong>
                  </p>
                  <span className="text-xs text-[var(--color-muted-foreground)]">
                    (Mở cửa cả ngày lễ & cuối tuần)
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-7">
            <Suspense fallback={<div className="p-8 text-center">Đang tải biểu mẫu...</div>}>
              <ConsultationForm />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
