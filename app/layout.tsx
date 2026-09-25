import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { Toaster } from "sonner";
import { JsonLdOrganization, JsonLdWebsite } from "@/components/seo/JsonLd";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://nhatjewerly.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "NHẬT JEWERLY — Trang Sức Vàng Cao Cấp",
    template: "%s | NHẬT JEWERLY",
  },
  description:
    "NHẬT JEWERLY — Thương hiệu trang sức vàng cao cấp. Chuyên cung cấp nhẫn vàng, dây chuyền vàng, lắc tay, bông tai và trang sức cưới tinh tế. Xem giá vàng hôm nay.",
  keywords: [
    "NHẬT JEWERLY",
    "trang sức NHẬT",
    "trang sức vàng cao cấp",
    "nhẫn vàng",
    "dây chuyền vàng",
    "lắc tay vàng",
    "bông tai vàng",
    "giá vàng hôm nay",
    "trang sức cưới",
    "trang sức cao cấp",
    "jewelry Vietnam",
  ],
  authors: [{ name: "NHẬT JEWERLY" }],
  creator: "NHẬT JEWERLY",
  publisher: "NHẬT JEWERLY",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: siteUrl,
    siteName: "NHẬT JEWERLY",
    title: "NHẬT JEWERLY — Trang Sức Vàng Cao Cấp",
    description:
      "Thương hiệu trang sức vàng cao cấp. Nhẫn, dây chuyền, lắc tay, bông tai tinh tế. Xem giá vàng hôm nay.",
    images: [
      {
        url: "/assets/images/icon_jewerly.png",
        width: 1200,
        height: 630,
        alt: "NHẬT JEWERLY — Trang Sức Vàng Cao Cấp",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NHẬT JEWERLY — Trang Sức Vàng Cao Cấp",
    description:
      "Thương hiệu trang sức vàng cao cấp. Nhẫn, dây chuyền, lắc tay, bông tai tinh tế.",
    images: ["/assets/images/logo_jewerly.png"],
  },
  icons: {
    icon: "/assets/images/icon_jewerly.png",
    shortcut: "/assets/images/icon_jewerly.png",
    apple: "/assets/images/icon_jewerly.png",
  },
  verification: {
    google: "",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <head>
        <JsonLdOrganization />
        <JsonLdWebsite />
      </head>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange={false}
          storageKey="nhat-jewerly-theme"
        >
          {children}
          <Toaster
            position="top-right"
            richColors
            toastOptions={{
              style: {
                fontFamily: "var(--font-body)",
                borderRadius: "0",
              },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
