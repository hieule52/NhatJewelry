"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Search, Phone, MessageSquare, ChevronRight } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

const navLinks = [
  { href: "/", label: "Trang chủ" },
  { href: "/san-pham", label: "Sản phẩm" },
  { href: "/gia-vang", label: "Giá vàng" },
  { href: "/gioi-thieu", label: "Giới thiệu" },
  { href: "/lien-he", label: "Liên hệ & tư vấn" },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  // Handle scroll event
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu/search on route change
  useEffect(() => {
    setIsMenuOpen(false);
    setIsSearchOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const headerTransparent = isHome && !isScrolled && !isMenuOpen && !isSearchOpen;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ease-out ${
          headerTransparent
            ? "bg-transparent py-1 md:py-2"
            : "bg-[var(--color-background)]/95 backdrop-blur-xl border-b border-[var(--color-border)] shadow-[var(--shadow-sm)] py-0"
        }`}
      >
        <div className="container-site">
          <div
            className={`flex items-center justify-between transition-all duration-300 ease-out ${
              isScrolled ? "h-14 md:h-16" : "h-16 md:h-20"
            }`}
          >

            {/* Brand Logo */}
            <Link
              href="/"
              className="flex items-center gap-2.5 sm:gap-3 group shrink-0"
              aria-label="NHẬT JEWERLY — Trang chủ"
            >
              <div className="relative w-9 h-9 md:w-10 md:h-10 shrink-0">
                <Image
                  src="/assets/images/icon_jewerly.png"
                  alt="NHẬT JEWERLY Icon"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <div className="flex flex-col">
                <span
                  className={`text-base md:text-lg font-normal tracking-[0.12em] uppercase transition-colors leading-tight ${headerTransparent
                      ? "text-[#1A1714] dark:text-white group-hover:text-[var(--color-accent)] dark:group-hover:text-[var(--color-gold-300)]"
                      : "text-[var(--color-foreground)] group-hover:text-[var(--color-accent)]"
                    }`}
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  NHẬT JEWERLY
                </span>
                <span
                  className={`text-[8px] md:text-[9px] tracking-[0.28em] uppercase font-medium mt-0.5 ${headerTransparent
                      ? "text-[#6E6860] dark:text-white/60"
                      : "text-[var(--color-muted-foreground)]"
                    }`}
                >
                  Trang Sức Cao Cấp
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav
              className="hidden lg:flex items-center gap-7 xl:gap-9"
              aria-label="Menu chính"
            >
              {navLinks.map((link) => {
                const isActive =
                  pathname === link.href ||
                  (link.href !== "/" && pathname.startsWith(link.href));

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative text-[0.8125rem] tracking-[0.12em] uppercase py-2 transition-colors duration-200 group ${headerTransparent
                        ? isActive
                          ? "font-semibold text-[#1A1714] dark:text-white"
                          : "font-medium text-[#2A2520] hover:text-[var(--color-accent)] dark:text-white/80 dark:hover:text-white"
                        : isActive
                          ? "font-semibold text-[var(--color-accent)] dark:text-[var(--color-gold-300)]"
                          : "font-medium text-[#44403C] dark:text-[#D4D0CC] hover:text-[var(--color-accent)] dark:hover:text-[var(--color-gold-300)]"
                      }`}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {link.label}
                    {/* Active / hover underline */}
                    <span
                      className={`absolute bottom-0 left-0 h-[1.5px] transition-all duration-300 ${headerTransparent
                          ? "bg-[var(--color-accent)] dark:bg-[var(--color-gold-300)]"
                          : "bg-[var(--color-accent)]"
                        } ${isActive ? "w-full" : "w-0 group-hover:w-full"}`}
                    />
                  </Link>
                );
              })}
            </nav>

            {/* Right Action Tools */}
            <div className="flex items-center gap-1 sm:gap-1.5">
              {/* Search */}
              <button
                type="button"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className={`w-10 h-10 md:w-11 md:h-11 flex items-center justify-center transition-colors cursor-pointer rounded-full ${headerTransparent
                    ? "text-[#1A1714] hover:text-[var(--color-accent)] hover:bg-[#1A1714]/5 dark:text-white/85 dark:hover:text-white dark:hover:bg-white/10"
                    : "text-[#44403C] dark:text-[#D4D0CC] hover:text-[var(--color-accent)] dark:hover:text-[var(--color-gold-300)] hover:bg-[var(--color-muted)] dark:hover:bg-white/10"
                  }`}
                aria-label={isSearchOpen ? "Đóng tìm kiếm" : "Mở tìm kiếm"}
              >
                <Search className="w-[1.0625rem] h-[1.0625rem]" />
              </button>

              {/* Theme Toggle */}
              <ThemeToggle
                className={
                  headerTransparent
                    ? "text-[#1A1714] hover:text-[var(--color-accent)] hover:bg-[#1A1714]/5 dark:text-white/85 dark:hover:text-white dark:hover:bg-white/10"
                    : "text-[#44403C] dark:text-[#D4D0CC] hover:text-[var(--color-accent)] dark:hover:text-[var(--color-gold-300)] hover:bg-[var(--color-muted)] dark:hover:bg-white/10"
                }
              />

              {/* Hotline — Desktop only */}
              <a
                href="tel:0900000000"
                className={`hidden xl:inline-flex items-center gap-2 text-[0.75rem] tracking-[0.1em] uppercase font-medium px-4 py-2.5 border transition-all ${headerTransparent
                    ? "border-[#1A1714]/25 text-[#1A1714] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] hover:bg-[var(--color-accent)]/5 dark:border-white/25 dark:text-white dark:hover:border-white/60 dark:hover:bg-white/10"
                    : "border-[var(--color-border)] text-[var(--color-foreground)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
                  }`}
              >
                <Phone className="w-3.5 h-3.5 text-[var(--color-gold-500)] dark:text-[var(--color-gold-400)] shrink-0" />
                <span>0757 575 755</span>
              </a>

              {/* Mobile Hamburger — 48px touch target */}
              <button
                type="button"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`lg:hidden w-11 h-11 flex items-center justify-center transition-colors cursor-pointer rounded-full ${headerTransparent
                    ? "text-[#1A1714] hover:bg-[#1A1714]/5 dark:text-white dark:hover:bg-white/10"
                    : "text-[var(--color-foreground)] hover:bg-[var(--color-muted)]"
                  }`}
                aria-label={isMenuOpen ? "Đóng menu" : "Mở menu"}
                aria-expanded={isMenuOpen}
                aria-controls="mobile-nav-drawer"
              >
                {isMenuOpen
                  ? <X className="w-5 h-5" />
                  : <Menu className="w-5 h-5" />
                }
              </button>
            </div>
          </div>

          {/* Expandable Search Bar */}
          {isSearchOpen && (
            <div className="py-3 pb-4 border-t border-[var(--color-border)] animate-in slide-in-from-top-2 duration-200">
              <form action="/san-pham" method="GET" className="relative max-w-xl mx-auto">
                <input
                  name="q"
                  type="search"
                  placeholder="Tìm theo tên sản phẩm, mã nhẫn, vàng 18k, 24k..."
                  autoFocus
                  className="input-luxury pr-12 bg-[var(--color-background)] text-sm text-[var(--color-foreground)] border-[var(--color-border)]"
                />
                <button
                  type="submit"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-muted-foreground)] hover:text-[var(--color-accent)] p-2 transition-colors cursor-pointer"
                  aria-label="Thực hiện tìm kiếm"
                >
                  <Search className="w-4 h-4" />
                </button>
              </form>
            </div>
          )}
        </div>
      </header>

      {/* Mobile Drawer — Full screen overlay */}
      {isMenuOpen && (
        <div
          id="mobile-nav-drawer"
          className="fixed inset-0 z-[200] lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Menu di động"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/65 backdrop-blur-sm"
            onClick={() => setIsMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer Panel */}
          <div className="absolute top-0 right-0 bottom-0 w-full max-w-[300px] sm:max-w-sm bg-[var(--color-background)] text-[var(--color-foreground)] shadow-2xl flex flex-col border-l border-[var(--color-border)] animate-in slide-in-from-right duration-350 ease-out">

            {/* Drawer Header */}
            <div className="flex items-center justify-between px-6 h-16 border-b border-[var(--color-border)]">
              <div className="flex items-center gap-2.5">
                <div className="relative w-8 h-8">
                  <Image
                    src="/assets/images/logo_bieutuong.png"
                    alt="NHẬT JEWERLY"
                    fill
                    className="object-contain"
                  />
                </div>
                <span
                  className="font-normal text-sm tracking-[0.15em] uppercase text-[var(--color-foreground)]"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  NHẬT JEWERLY
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsMenuOpen(false)}
                className="w-10 h-10 flex items-center justify-center text-[var(--color-charcoal-400)] hover:text-[var(--color-accent)] cursor-pointer transition-colors"
                aria-label="Đóng menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation Links */}
            <nav className="flex-1 overflow-y-auto" aria-label="Menu di động">
              <ul className="py-2" role="list">
                {navLinks.map((link, idx) => {
                  const isActive =
                    pathname === link.href ||
                    (link.href !== "/" && pathname.startsWith(link.href));

                  return (
                    <li
                      key={link.href}
                      style={{
                        animation: `heroReveal 350ms var(--ease-luxury) ${idx * 60 + 60}ms both`,
                      }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setIsMenuOpen(false)}
                        className={`flex items-center justify-between min-h-[54px] px-6 py-3 text-[0.8125rem] tracking-[0.1em] uppercase font-medium border-b border-[var(--color-border)]/40 transition-colors ${isActive
                            ? "text-[var(--color-accent)] bg-[var(--color-accent)]/5 font-semibold"
                            : "text-[var(--color-foreground)] hover:text-[var(--color-accent)] hover:bg-[var(--color-muted)]/50"
                          }`}
                      >
                        <span>{link.label}</span>
                        <ChevronRight
                          className={`w-4 h-4 transition-colors ${isActive ? "text-[var(--color-accent)]" : "text-[var(--color-charcoal-300)]"
                            }`}
                        />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* Drawer Bottom CTAs */}
            <div className="p-5 border-t border-[var(--color-border)] space-y-3 bg-[var(--color-card)]">
              <Link
                href="/lien-he"
                onClick={() => setIsMenuOpen(false)}
                className="btn-gold w-full text-[0.75rem] uppercase tracking-[0.12em] flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4 shrink-0" />
                <span>Nhận tư vấn ngay</span>
              </Link>
              <a
                href="tel:0900000000"
                className="btn-outline w-full text-[0.75rem] uppercase tracking-[0.12em] flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-[var(--color-gold-400)] shrink-0" />
                <span>Hotline: 0757 575 755</span>
              </a>
              <p className="text-[11px] text-center text-[var(--color-muted-foreground)] pt-1">
                Giờ phục vụ: 08:30 – 20:30 (Cả tuần)
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
