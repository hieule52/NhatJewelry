"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { Send, CheckCircle2, Loader2, Sparkles } from "lucide-react";

export function ConsultationForm() {
  const searchParams = useSearchParams();
  const productParam = searchParams.get("product");
  const skuParam = searchParams.get("sku");

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    interestedIn: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (productParam) {
      const productInfo = skuParam ? `${productParam} (Mã: ${skuParam})` : productParam;
      setFormData((prev) => ({
        ...prev,
        interestedIn: productInfo,
        message: prev.message || `Tôi quan tâm đến sản phẩm ${productInfo} và muốn được tư vấn thêm về giá và chi tiết chế tác.`,
      }));
    }
  }, [productParam, skuParam]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    try {
      const res = await fetch("/api/consultations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.details && Array.isArray(data.details)) {
          const fieldErrors: Record<string, string> = {};
          data.details.forEach((err: any) => {
            if (err.path && err.path[0]) {
              fieldErrors[err.path[0]] = err.message;
            }
          });
          setErrors(fieldErrors);
          toast.error("Vui lòng kiểm tra lại các trường thông tin!");
        } else {
          toast.error(data.error || "Gửi yêu cầu thất bại. Vui lòng thử lại!");
        }
        return;
      }

      setIsSuccess(true);
      toast.success("Yêu cầu tư vấn đã được gửi thành công!");
      setFormData({
        fullName: "",
        phone: "",
        email: "",
        interestedIn: "",
        message: "",
      });
    } catch (err) {
      console.error(err);
      toast.error("Đã xảy ra lỗi kết nối. Vui lòng thử lại!");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="p-8 md:p-12 border border-[var(--color-gold-500)]/30 bg-[var(--color-card)] text-center space-y-4 animate-in fade-in zoom-in-95 duration-500">
        <div className="w-14 h-14 rounded-full bg-[var(--color-gold-500)]/10 text-[var(--color-gold-500)] flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h3
          className="text-2xl font-normal text-[var(--color-foreground)]"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Cảm ơn quý khách đã tin tưởng!
        </h3>
        <p className="text-sm text-[var(--color-muted-foreground)] max-w-md mx-auto leading-relaxed">
          Yêu cầu tư vấn của quý khách đã được chuyển tới chuyên viên kim hoàn NHẬT JEWERLY. Chúng tôi sẽ liên hệ lại trong thời gian sớm nhất qua số điện thoại quý khách đã cung cấp.
        </p>
        <div className="pt-4">
          <button
            type="button"
            onClick={() => setIsSuccess(false)}
            className="btn-outline text-xs uppercase tracking-wider py-2.5 px-6"
          >
            Gửi yêu cầu tư vấn khác
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 md:p-8 border border-[var(--color-border)] bg-[var(--color-card)] space-y-5"
    >
      <div className="flex items-center gap-2 pb-2 border-b border-[var(--color-border)]">
        <Sparkles className="w-4 h-4 text-[var(--color-gold-500)]" />
        <h2 className="text-base font-semibold uppercase tracking-wider text-[var(--color-foreground)]">
          Đăng ký nhận tư vấn trang sức
        </h2>
      </div>

      {/* Full name */}
      <div>
        <label
          htmlFor="fullName"
          className="block text-xs uppercase tracking-wider font-medium text-[var(--color-foreground)] mb-1.5"
        >
          Họ và tên <span className="text-red-500">*</span>
        </label>
        <input
          id="fullName"
          name="fullName"
          type="text"
          required
          value={formData.fullName}
          onChange={handleChange}
          placeholder="Ví dụ: Nguyễn Văn A"
          className={`w-full px-4 py-3 text-base sm:text-sm bg-transparent border ${
            errors.fullName ? "border-red-500" : "border-[var(--color-border)]"
          } focus:border-[var(--color-gold-500)] focus:outline-none transition-colors`}
        />
        {errors.fullName && (
          <p className="text-xs text-red-500 mt-1">{errors.fullName}</p>
        )}
      </div>

      {/* Phone & Email in 2 columns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="phone"
            className="block text-xs uppercase tracking-wider font-medium text-[var(--color-foreground)] mb-1.5"
          >
            Số điện thoại <span className="text-red-500">*</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            value={formData.phone}
            onChange={handleChange}
            placeholder="0912 345 678"
            className={`w-full px-4 py-3 text-base sm:text-sm bg-transparent border ${
              errors.phone ? "border-red-500" : "border-[var(--color-border)]"
            } focus:border-[var(--color-gold-500)] focus:outline-none transition-colors`}
          />
          {errors.phone && (
            <p className="text-xs text-red-500 mt-1">{errors.phone}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-xs uppercase tracking-wider font-medium text-[var(--color-foreground)] mb-1.5"
          >
            Email (Không bắt buộc)
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="example@gmail.com"
            className={`w-full px-4 py-3 text-base sm:text-sm bg-transparent border ${
              errors.email ? "border-red-500" : "border-[var(--color-border)]"
            } focus:border-[var(--color-gold-500)] focus:outline-none transition-colors`}
          />
          {errors.email && (
            <p className="text-xs text-red-500 mt-1">{errors.email}</p>
          )}
        </div>
      </div>

      {/* Interested in */}
      <div>
        <label
          htmlFor="interestedIn"
          className="block text-xs uppercase tracking-wider font-medium text-[var(--color-foreground)] mb-1.5"
        >
          Dòng sản phẩm hoặc mẫu quan tâm
        </label>
        <input
          id="interestedIn"
          name="interestedIn"
          type="text"
          value={formData.interestedIn}
          onChange={handleChange}
          placeholder="Nhẫn cưới, Dây chuyền 18K, Lắc tay nữ, Vàng 9999..."
          className="w-full px-4 py-3 text-base sm:text-sm bg-transparent border border-[var(--color-border)] focus:border-[var(--color-gold-500)] focus:outline-none transition-colors"
        />
      </div>

      {/* Message */}
      <div>
        <label
          htmlFor="message"
          className="block text-xs uppercase tracking-wider font-medium text-[var(--color-foreground)] mb-1.5"
        >
          Nội dung yêu cầu / Ghi chú <span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          value={formData.message}
          onChange={handleChange}
          placeholder="Vui lòng cung cấp thêm thông tin kích thước, ngân sách dự kiến, ngày cần hoặc bất kỳ yêu cầu thiết kế riêng nào..."
          className={`w-full px-4 py-3 text-base sm:text-sm bg-transparent border ${
            errors.message ? "border-red-500" : "border-[var(--color-border)]"
          } focus:border-[var(--color-gold-500)] focus:outline-none transition-colors`}
        />
        {errors.message && (
          <p className="text-xs text-red-500 mt-1">{errors.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-gold w-full justify-center min-h-[48px] py-3.5 text-sm font-semibold tracking-wider uppercase flex items-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Đang gửi yêu cầu...
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            Gửi yêu cầu tư vấn
          </>
        )}
      </button>

      <p className="text-[11px] text-center text-[var(--color-muted-foreground)]">
        Thông tin của quý khách được cam kết bảo mật 100% theo chính sách của NHẬT JEWERLY.
      </p>
    </form>
  );
}
