"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard,
  Gem,
  FolderTree,
  Coins,
  MessageSquare,
  ExternalLink,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";
import { ThemeToggle } from "@/components/layout/ThemeToggle";

interface AdminNavProps {
  user?: {
    name?: string | null;
    email?: string | null;
    role?: string | null;
  };
}

const navItems = [
  { href: "/admin", label: "Tổng quan", icon: LayoutDashboard },
  { href: "/admin/san-pham", label: "Sản phẩm", icon: Gem },
  { href: "/admin/danh-muc", label: "Danh mục", icon: FolderTree },
  { href: "/admin/gia-vang", label: "Bảng giá vàng", icon: Coins },
  { href: "/admin/yeu-cau-tu-van", label: "Yêu cầu tư vấn", icon: MessageSquare },
];

export function AdminNav({ user }: AdminNavProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  // If on login page, don't show the admin sidebar
  if (pathname === "/admin/login") {
    return null;
  }

  const NavLinks = () => (
    <div className="space-y-1 py-4">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive =
          item.href === "/admin"
            ? pathname === "/admin"
            : pathname.startsWith(item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setMobileOpen(false)}
            className={`flex items-center gap-3 px-4 py-3 text-xs uppercase tracking-wider font-medium transition-colors ${
              isActive
                ? "bg-[var(--color-gold-500)] text-white shadow-sm"
                : "text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] hover:bg-[var(--color-ivory-200)] dark:hover:bg-[var(--color-charcoal-800)]"
            }`}
          >
            <Icon className="w-4 h-4" />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </div>
  );

  return (
    <>
      {/* Mobile Top Header */}
      <div className="md:hidden flex items-center justify-between p-4 bg-[var(--color-card)] border-b border-[var(--color-border)]">
        <div className="flex items-center gap-2">
          <div className="relative w-7 h-7">
            <Image
              src="/assets/images/logo_bieutuong.png"
              alt="Logo"
              fill
              className="object-contain"
            />
          </div>
          <span className="font-bold text-xs uppercase tracking-widest text-[var(--color-gold-500)]">
            Admin Panel
          </span>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 border border-[var(--color-border)] text-[var(--color-foreground)]"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {mobileOpen && (
        <div className="md:hidden bg-[var(--color-card)] border-b border-[var(--color-border)] p-4 space-y-4">
          <NavLinks />
          <div className="pt-4 border-t border-[var(--color-border)] flex flex-col gap-2">
            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-2 text-xs uppercase tracking-wider text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] p-2"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Xem website</span>
            </Link>
            <button
              type="button"
              onClick={() => signOut({ callbackUrl: "/admin/login" })}
              className="flex items-center gap-2 text-xs uppercase tracking-wider text-red-500 hover:text-red-600 p-2 text-left"
            >
              <LogOut className="w-4 h-4" />
              <span>Đăng xuất</span>
            </button>
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-[var(--color-card)] border-r border-[var(--color-border)] min-h-screen p-5 shrink-0 justify-between">
        <div className="space-y-6">
          {/* Logo & Brand */}
          <div className="pb-4 border-b border-[var(--color-border)]">
            <Link href="/admin" className="flex items-center gap-3">
              <div className="relative w-9 h-9">
                <Image
                  src="/assets/images/logo_bieutuong.png"
                  alt="NHẬT JEWERLY"
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <div
                  className="font-normal text-base text-[var(--color-foreground)] tracking-wider uppercase"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  NHẬT JEWERLY
                </div>
                <div className="text-[10px] uppercase tracking-widest text-[var(--color-gold-500)] font-semibold">
                  Hệ Thống Admin
                </div>
              </div>
            </Link>
          </div>

          {/* Navigation Links */}
          <NavLinks />
        </div>

        {/* User Info & Footer Actions */}
        <div className="pt-6 border-t border-[var(--color-border)] space-y-4">
          <div className="flex items-center justify-between">
            <div className="truncate">
              <p className="text-xs font-semibold text-[var(--color-foreground)] truncate">
                {user?.name || "Admin NHẬT"}
              </p>
              <p className="text-[10px] text-[var(--color-muted-foreground)] truncate">
                {user?.email || "admin@nhatjewerly.com"}
              </p>
            </div>
            <ThemeToggle />
          </div>

          <div className="space-y-1">
            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-2 px-3 py-2 text-xs text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] transition-colors hover:bg-[var(--color-ivory-200)] dark:hover:bg-[var(--color-charcoal-800)]"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Xem trang chủ website</span>
            </Link>
            <button
              type="button"
              onClick={() => signOut({ callbackUrl: "/admin/login" })}
              className="flex items-center gap-2 px-3 py-2 text-xs text-red-500 hover:text-red-600 transition-colors w-full text-left hover:bg-red-500/10"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Đăng xuất</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
