import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail, Facebook, Instagram } from "lucide-react";
import { ScrollReveal } from "@/components/ui/motion";

const navLinks = [
  { href: "/", label: "Trang chủ" },
  { href: "/san-pham", label: "Sản phẩm" },
  { href: "/gia-vang", label: "Giá vàng" },
  { href: "/gioi-thieu", label: "Giới thiệu" },
  { href: "/lien-he", label: "Liên hệ & tư vấn" },
];

const productLinks = [
  { href: "/san-pham?category=nhan-vang", label: "Nhẫn vàng" },
  { href: "/san-pham?category=day-chuyen-vang", label: "Dây chuyền vàng" },
  { href: "/san-pham?category=lac-tay-vang", label: "Lắc tay vàng" },
  { href: "/san-pham?category=bong-tai-vang", label: "Bông tai vàng" },
  { href: "/san-pham?category=trang-suc-cuoi", label: "Trang sức cưới" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="bg-[#F1EDE4] dark:bg-[#100E0B] text-[#58534E] dark:text-[#A8A29C] border-t border-[#E2DDD5] dark:border-[#242018] transition-colors duration-300"
      role="contentinfo"
    >
      {/* Top divider line — champagne gold */}
      <div className="h-[1px] bg-gradient-to-r from-transparent via-[#9A5C04]/35 dark:via-[#C9952C]/40 to-transparent" />

      {/* Main footer grid */}
      <div className="container-site pt-14 pb-10 md:pt-20 md:pb-14">
        <ScrollReveal direction="up">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12 xl:gap-16">

            {/* Column 1 — Brand */}
            <div className="lg:col-span-1 space-y-5">
              <Link
                href="/"
                aria-label="NHẬT JEWERLY — Trang chủ"
                className="flex items-center gap-3 group"
              >
                <div className="w-10 h-10 shrink-0 relative">
                  <Image
                    src="/assets/images/icon_jewerly.png"
                    alt="NHẬT JEWERLY"
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="flex flex-col">
                  <span
                    className="text-base font-normal tracking-[0.18em] uppercase text-[#1A1714] dark:text-white group-hover:text-[#9A5C04] dark:group-hover:text-[#C9952C] transition-colors duration-200 leading-tight"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    NHẬT JEWERLY
                  </span>
                  <span className="text-[9px] tracking-[0.3em] uppercase text-[#9A5C04] dark:text-[#C9952C]/70 mt-0.5 font-medium">
                    Haute Joaillerie
                  </span>
                </div>
              </Link>

              <p className="text-sm leading-[1.85] text-[#6E6860] dark:text-[#7A746E] max-w-[280px]">
                Thương hiệu trang sức vàng cao cấp. Mỗi tác phẩm là sự kết tinh
                giữa nghệ thuật kim hoàn thủ công và tinh hoa vàng chuẩn mực.
              </p>

              {/* Social links */}
              <div className="flex items-center gap-2.5 pt-1">
                <a
                  href="https://facebook.com/nhatjewerly"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 flex items-center justify-center border border-[#D4CEBF] text-[#58534E] hover:border-[#9A5C04] hover:text-[#9A5C04] hover:bg-[#9A5C04]/5 hover:-translate-y-0.5 dark:border-[#2A2520] dark:text-[#7A746E] dark:hover:border-[#C9952C] dark:hover:text-[#C9952C] dark:hover:bg-transparent transition-all duration-200"
                  aria-label="NHẬT JEWERLY trên Facebook"
                >
                  <Facebook size={15} strokeWidth={1.5} />
                </a>
                <a
                  href="https://instagram.com/nhatjewerly"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 flex items-center justify-center border border-[#D4CEBF] text-[#58534E] hover:border-[#9A5C04] hover:text-[#9A5C04] hover:bg-[#9A5C04]/5 hover:-translate-y-0.5 dark:border-[#2A2520] dark:text-[#7A746E] dark:hover:border-[#C9952C] dark:hover:text-[#C9952C] dark:hover:bg-transparent transition-all duration-200"
                  aria-label="NHẬT JEWERLY trên Instagram"
                >
                  <Instagram size={15} strokeWidth={1.5} />
                </a>
              </div>
            </div>

          {/* Column 2 — Navigation */}
          <div>
            <h3 className="text-[10px] tracking-[0.22em] uppercase font-semibold text-[#835C08] dark:text-[#C9952C]/80 mb-5">
              Điều hướng
            </h3>
            <ul className="space-y-3" role="list">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#58534E] hover:text-[#1A1714] dark:text-[#7A746E] dark:hover:text-[#E8E2D8] transition-colors duration-200 inline-flex items-center gap-1.5 group"
                  >
                    <span className="w-3 h-[1px] bg-transparent group-hover:bg-[#9A5C04] dark:group-hover:bg-[#C9952C]/60 transition-all duration-200 shrink-0" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Products */}
          <div>
            <h3 className="text-[10px] tracking-[0.22em] uppercase font-semibold text-[#835C08] dark:text-[#C9952C]/80 mb-5">
              Sản phẩm
            </h3>
            <ul className="space-y-3" role="list">
              {productLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#58534E] hover:text-[#1A1714] dark:text-[#7A746E] dark:hover:text-[#E8E2D8] transition-colors duration-200 inline-flex items-center gap-1.5 group"
                  >
                    <span className="w-3 h-[1px] bg-transparent group-hover:bg-[#9A5C04] dark:group-hover:bg-[#C9952C]/60 transition-all duration-200 shrink-0" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 — Contact */}
          <div>
            <h3 className="text-[10px] tracking-[0.22em] uppercase font-semibold text-[#835C08] dark:text-[#C9952C]/80 mb-5">
              Liên hệ
            </h3>
            <address className="not-italic space-y-4">
              <div className="flex items-start gap-3">
                <MapPin
                  size={14}
                  strokeWidth={1.5}
                  className="mt-0.5 flex-shrink-0 text-[#9A5C04] dark:text-[#C9952C]/70"
                  aria-hidden="true"
                />
                <p className="text-sm text-[#58534E] dark:text-[#7A746E] leading-relaxed">
                  Thanh Thủy, Thành Phố Huế
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Phone
                  size={14}
                  strokeWidth={1.5}
                  className="flex-shrink-0 text-[#9A5C04] dark:text-[#C9952C]/70"
                  aria-hidden="true"
                />
                <a
                  href="tel:0757575755"
                  className="text-sm text-[#58534E] hover:text-[#1A1714] dark:text-[#7A746E] dark:hover:text-[#E8E2D8] transition-colors duration-200"
                >
                  0757 575 755
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail
                  size={14}
                  strokeWidth={1.5}
                  className="flex-shrink-0 text-[#9A5C04] dark:text-[#C9952C]/70"
                  aria-hidden="true"
                />
                <a
                  href="mailto:info@nhatjewerly.com"
                  className="text-sm text-[#58534E] hover:text-[#1A1714] dark:text-[#7A746E] dark:hover:text-[#E8E2D8] transition-colors duration-200"
                >
                  info@nhatjewerly.com
                </a>
              </div>
            </address>

            {/* Business hours */}
            <div className="mt-5 pt-4 border-t border-[#E2DDD5] dark:border-[#1E1C18]">
              <p className="text-[11px] text-[#7A746E] dark:text-[#58534E] leading-relaxed">
                Giờ làm việc<br />
                <span className="text-[#58534E] dark:text-[#7A746E] font-medium">Thứ 2 – CN: 08:30 – 20:30</span>
              </p>
            </div>
          </div>
        </div>
        </ScrollReveal>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[#E2DDD5] dark:border-[#1E1C18]">
        <div className="container-site py-5 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-[#7A746E] dark:text-[#4A4540] text-center sm:text-left">
            © {currentYear} NHẬT JEWERLY. All rights reserved.
          </p>
          <p className="text-xs text-[#7A746E] dark:text-[#4A4540] text-center sm:text-right">
            Thiết kế &amp; phát triển bởi{" "}
            <span className="text-[#9A5C04] dark:text-[#C9952C] font-semibold tracking-wide hover:text-[#B8720A] dark:hover:text-[#DEAA40] transition-colors cursor-default">
              DHTECH
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
