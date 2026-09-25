"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { signIn } from "next-auth/react";
import {
  Lock,
  Mail,
  Loader2,
  AlertCircle,
  Eye,
  EyeOff,
  ArrowLeft,
  Sparkles,
  ShieldCheck,
} from "lucide-react";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: email.trim(),
        password: password.trim(),
      });

      if (res?.error) {
        setError(
          "Email hoặc mật khẩu không chính xác. Quý khách vui lòng kiểm tra lại."
        );
      } else {
        // Use full page reload to ensure session cookie is sent with next request
        // router.push can race with cookie being set, causing middleware to block
        window.location.href = "/admin";
      }
    } catch {
      setError("Đã xảy ra lỗi kết nối xác thực. Vui lòng thử lại sau.");
    } finally {
      setLoading(false);
    }
  };

  const handleQuickFill = () => {
    setEmail("admin@nhatjewerly.com");
    setPassword("NhatJewerly@2026");
    setError("");
  };

  return (
    <div className="min-h-screen w-full bg-[#080706] text-white flex items-center justify-center p-4 relative overflow-hidden select-none">
      {/* Background Ambience & Radial Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(202,138,4,0.14),rgba(8,7,6,0.95)_70%)] pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[var(--color-gold-500)]/5 rounded-full blur-3xl pointer-events-none" />

      {/* Login Card */}
      <div className="relative w-full max-w-[430px] rounded-sm border border-[#D4AF37]/30 bg-[#12100E]/90 backdrop-blur-xl p-7 sm:p-9 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.95),0_0_35px_rgba(212,175,55,0.07)] transition-all">
        {/* Top Gold Ornament Bar */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />

        {/* Brand Header */}
        <div className="text-center space-y-2.5 mb-7">
          <div className="inline-flex p-2.5 rounded-full bg-gradient-to-b from-[#D4AF37]/20 to-transparent border border-[#D4AF37]/30 shadow-inner mb-1">
            <Image
              src="/assets/images/logo_bieutuong.png"
              alt="NHẬT JEWERLY"
              width={64}
              height={64}
              className="w-14 h-14 object-contain drop-shadow-[0_4px_12px_rgba(212,175,55,0.3)]"
              priority
            />
          </div>

          <h1
            className="text-2xl sm:text-3xl text-white font-normal uppercase tracking-[0.2em]"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            NHẬT JEWERLY
          </h1>

          <div className="flex items-center justify-center gap-2">
            <span className="w-6 h-[1px] bg-[#D4AF37]/40" />
            <p className="text-[10px] sm:text-xs text-[#D4AF37] uppercase tracking-[0.25em] font-medium">
              Hệ Thống Quản Trị Admin
            </p>
            <span className="w-6 h-[1px] bg-[#D4AF37]/40" />
          </div>
        </div>

        {/* Error Notification */}
        {error && (
          <div className="flex items-start gap-2.5 p-3.5 mb-5 bg-red-950/60 border border-red-800/60 text-red-200 text-xs rounded-sm animate-shake">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            <span className="leading-relaxed">{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="admin-email"
              className="block text-[11px] uppercase tracking-wider font-medium text-neutral-300 mb-1.5"
            >
              Email Quản Trị Viên
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#D4AF37]/70 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                id="admin-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@nhatjewerly.com"
                className="w-full pl-11 pr-4 py-3 bg-black/40 border border-neutral-800 text-white text-base sm:text-sm rounded-sm focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/40 focus:outline-none transition-all placeholder:text-neutral-600"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="admin-password"
              className="block text-[11px] uppercase tracking-wider font-medium text-neutral-300 mb-1.5"
            >
              Mật Khẩu
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#D4AF37]/70 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                id="admin-password"
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-11 pr-11 py-3 bg-black/40 border border-neutral-800 text-white text-base sm:text-sm rounded-sm focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/40 focus:outline-none transition-all placeholder:text-neutral-600"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-[#D4AF37] p-1 transition-colors"
                aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                title={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* Quick autofill helper */}
          <div className="flex justify-end pt-1">
            <button
              type="button"
              onClick={handleQuickFill}
              className="text-[11px] text-[#D4AF37]/80 hover:text-[#D4AF37] hover:underline flex items-center gap-1 transition-colors cursor-pointer"
            >
              <Sparkles className="w-3 h-3 text-[#D4AF37]" />
              Điền tài khoản quản trị mẫu
            </button>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={loading}
            className="btn-gold w-full justify-center min-h-[48px] py-3.5 text-xs uppercase tracking-[0.2em] font-semibold flex items-center gap-2 cursor-pointer disabled:opacity-50 mt-5 shadow-md shadow-[#D4AF37]/10"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Đang xác thực hệ thống...
              </>
            ) : (
              <>
                <ShieldCheck className="w-4 h-4" />
                Đăng nhập hệ thống
              </>
            )}
          </button>
        </form>

        {/* Footer Link */}
        <div className="pt-6 mt-6 border-t border-neutral-800/80 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-neutral-400 hover:text-[#D4AF37] transition-colors group"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
            <span>Quay lại trang chủ NHẬT JEWERLY</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

