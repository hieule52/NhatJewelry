import type { Metadata } from "next";
import { Suspense } from "react";
import { prisma } from "@/lib/prisma";
import { ProductCatalog } from "@/components/product/ProductCatalog";
import { Breadcrumb } from "@/components/seo/Breadcrumb";

export const metadata: Metadata = {
  title: "Bộ Sưu Tập Trang Sức Vàng Cao Cấp",
  description:
    "Khám phá bộ sưu tập trang sức vàng cao cấp NHẬT JEWERLY: nhẫn vàng, dây chuyền, lắc tay, bông tai và trang sức cưới tinh xảo.",
};

const defaultCategories = [
  { id: "cat-1", name: "Nhẫn vàng", slug: "nhan-vang", description: "Nhẫn vàng 18K, 24K đính kim cương", image: null, isActive: true, sortOrder: 1, createdAt: new Date(), updatedAt: new Date() },
  { id: "cat-2", name: "Dây chuyền vàng", slug: "day-chuyen-vang", description: "Dây chuyền vàng Ý, mặt hoa sen", image: null, isActive: true, sortOrder: 2, createdAt: new Date(), updatedAt: new Date() },
  { id: "cat-3", name: "Lắc tay vàng", slug: "lac-tay-vang", description: "Lắc tay dáng tennis, vòng kiềng", image: null, isActive: true, sortOrder: 3, createdAt: new Date(), updatedAt: new Date() },
  { id: "cat-4", name: "Bông tai vàng", slug: "bong-tai-vang", description: "Bông tai Halo, hoa tai giọt lệ", image: null, isActive: true, sortOrder: 4, createdAt: new Date(), updatedAt: new Date() },
  { id: "cat-5", name: "Trang sức cưới", slug: "trang-suc-cuoi", description: "Nhẫn cưới và bộ trang sức cô dâu", image: null, isActive: true, sortOrder: 5, createdAt: new Date(), updatedAt: new Date() },
];

const defaultCatalogProducts = [
  {
    id: "p-1",
    name: "Nhẫn Kim Cương Solitaire Hoàng Gia 18K",
    slug: "nhan-kim-cuong-solitaire-hoang-gia-18k",
    sku: "NJ-RING-001",
    price: 28500000 as any,
    priceDisplay: "SHOW" as const,
    isFeatured: true,
    isActive: true,
    categoryId: "cat-1",
    description: "Nhẫn kim cương Solitaire 6 chấu kinh điển nâng tầm vẻ đẹp thanh khiết.",
    material: "Vàng trắng 18K (750)",
    weight: "1.15 chỉ",
    gemstone: "Kim cương tự nhiên 5.4mm",
    size: "Size 12-16",
    technicalInfo: null,
    seoTitle: null,
    seoDescription: null,
    seoKeywords: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    category: defaultCategories[0],
    images: [{ id: "img-1", productId: "p-1", url: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=800", altText: "Nhẫn Kim Cương Solitaire", isPrimary: true, sortOrder: 0 }],
  },
  {
    id: "p-2",
    name: "Nhẫn Nam Signet Vàng 24K Chạm Khắc Rồng",
    slug: "nhan-nam-signet-vang-24k-cham-khac-rong",
    sku: "NJ-RING-002",
    price: 45000000 as any,
    priceDisplay: "SHOW" as const,
    isFeatured: true,
    isActive: true,
    categoryId: "cat-1",
    description: "Nhẫn Signet bản lớn chạm khắc rồng 3D thể hiện uy quyền phái mạnh.",
    material: "Vàng ròng 24K (999.9)",
    weight: "3.5 chỉ",
    gemstone: "Không đính đá",
    size: "Size 18-22",
    technicalInfo: null,
    seoTitle: null,
    seoDescription: null,
    seoKeywords: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    category: defaultCategories[0],
    images: [{ id: "img-2", productId: "p-2", url: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&q=80&w=800", altText: "Nhẫn Nam Signet", isPrimary: true, sortOrder: 0 }],
  },
  {
    id: "p-3",
    name: "Dây Chuyền Vàng Ý 18K Mặt Hoa Sen Đính Kim Cương",
    slug: "day-chuyen-vang-y-18k-mat-hoa-sen-dinh-kim-cuong",
    sku: "NJ-NCK-001",
    price: 36000000 as any,
    priceDisplay: "SHOW" as const,
    isFeatured: true,
    isActive: true,
    categoryId: "cat-2",
    description: "Mặt dây chuyền hoa sen thanh cao đính kim cương tấm lấp lánh.",
    material: "Vàng hồng 18K (Rose Gold)",
    weight: "1.8 chỉ",
    gemstone: "Kim cương tấm",
    size: "42cm",
    technicalInfo: null,
    seoTitle: null,
    seoDescription: null,
    seoKeywords: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    category: defaultCategories[1],
    images: [{ id: "img-3", productId: "p-3", url: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=800", altText: "Dây Chuyền Hoa Sen", isPrimary: true, sortOrder: 0 }],
  },
  {
    id: "p-4",
    name: "Lắc Tay Vàng 18K Dáng Tennis Đính Đá Tinh Xảo",
    slug: "lac-tay-vang-18k-dang-tennis-dinh-da-tinh-xao",
    sku: "NJ-BRC-001",
    price: 52000000 as any,
    priceDisplay: "SHOW" as const,
    isFeatured: true,
    isActive: true,
    categoryId: "cat-3",
    description: "Lắc tay Tennis Bracelet kiêu sa liền mạch ánh sáng.",
    material: "Vàng trắng 18K",
    weight: "2.8 chỉ",
    gemstone: "Đá Moissanite cao cấp",
    size: "17cm",
    technicalInfo: null,
    seoTitle: null,
    seoDescription: null,
    seoKeywords: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    category: defaultCategories[2],
    images: [{ id: "img-4", productId: "p-4", url: "https://images.unsplash.com/photo-1611591475822-482455850974?auto=format&fit=crop&q=80&w=800", altText: "Lắc Tay Tennis", isPrimary: true, sortOrder: 0 }],
  },
  {
    id: "p-5",
    name: "Bông Tai Kim Cương Halo Duyên Dáng 18K",
    slug: "bong-tai-kim-cuong-halo-duyen-dang-18k",
    sku: "NJ-EAR-001",
    price: 24000000 as any,
    priceDisplay: "SHOW" as const,
    isFeatured: true,
    isActive: true,
    categoryId: "cat-4",
    description: "Kiểu dáng Halo bao quanh viên chủ nhân đôi độ tỏa sáng kiêu kỳ.",
    material: "Vàng trắng 18K (750)",
    weight: "0.8 chỉ",
    gemstone: "Kim cương tự nhiên",
    size: "8.5mm",
    technicalInfo: null,
    seoTitle: null,
    seoDescription: null,
    seoKeywords: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    category: defaultCategories[3],
    images: [{ id: "img-5", productId: "p-5", url: "https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&q=80&w=800", altText: "Bông Tai Halo", isPrimary: true, sortOrder: 0 }],
  },
  {
    id: "p-6",
    name: "Cặp Nhẫn Cưới Vàng Trắng & Vàng Vàng Tình Nồng",
    slug: "cap-nhan-cuoi-vang-trang-vang-vang-phoi-mau-tinh-nong",
    sku: "NJ-WED-001",
    price: 22000000 as any,
    priceDisplay: "SHOW" as const,
    isFeatured: true,
    isActive: true,
    categoryId: "cat-5",
    description: "Sự hòa quyện giữa sắc trắng tinh khôi và sắc vàng truyền thống cho ngày chung đôi.",
    material: "Vàng Two-tone 18K",
    weight: "1.9 chỉ (cả cặp)",
    gemstone: "Kim cương tự nhiên",
    size: "Đo cỡ tay theo yêu cầu",
    technicalInfo: null,
    seoTitle: null,
    seoDescription: null,
    seoKeywords: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    category: defaultCategories[4],
    images: [{ id: "img-6", productId: "p-6", url: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=800", altText: "Cặp Nhẫn Cưới", isPrimary: true, sortOrder: 0 }],
  },
];

async function getCategories() {
  try {
    const list = await prisma.category.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: "asc" },
    });
    return list.length > 0 ? list : defaultCategories;
  } catch {
    return defaultCategories;
  }
}

async function getProducts(searchParams: { q?: string; category?: string; sort?: string; page?: string }) {
  try {
    const page = Number(searchParams.page) || 1;
    const pageSize = 16;
    const skip = (page - 1) * pageSize;

    const where = {
      isActive: true,
      ...(searchParams.q && {
        OR: [
          { name: { contains: searchParams.q, mode: "insensitive" as const } },
          { sku: { contains: searchParams.q, mode: "insensitive" as const } },
          { description: { contains: searchParams.q, mode: "insensitive" as const } },
        ],
      }),
      ...(searchParams.category && {
        category: { slug: searchParams.category },
      }),
    };

    const orderBy =
      searchParams.sort === "name-asc"
        ? { name: "asc" as const }
        : searchParams.sort === "name-desc"
        ? { name: "desc" as const }
        : { createdAt: "desc" as const };

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        include: {
          images: { where: { isPrimary: true }, take: 1 },
          category: true,
        },
        orderBy,
        skip,
        take: pageSize,
      }),
      prisma.product.count({ where }),
    ]);

    if (products.length === 0 && !searchParams.q && !searchParams.category) {
      return { products: defaultCatalogProducts as any, total: defaultCatalogProducts.length, page: 1, pageSize: 16, totalPages: 1 };
    }

    return { products, total, page, pageSize, totalPages: Math.ceil(total / pageSize) };
  } catch {
    return { products: defaultCatalogProducts as any, total: defaultCatalogProducts.length, page: 1, pageSize: 16, totalPages: 1 };
  }
}

interface ProductsPageProps {
  searchParams: Promise<{ q?: string; category?: string; sort?: string; page?: string }>;
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const params = await searchParams;
  const [categories, { products, total, page, totalPages }] = await Promise.all([
    getCategories(),
    getProducts(params),
  ]);

  const breadcrumbs = [
    { label: "Trang chủ", href: "/" },
    { label: "Sản phẩm", href: "/san-pham", current: true },
  ];

  return (
    <>
      {/* Page header with Clearance for Fixed Header */}
      <div className="pt-24 pb-8 sm:pt-28 sm:pb-10 border-b border-[var(--color-border)] bg-[var(--color-surface)] dark:bg-[#12100E]">
        <div className="container-site">
          <Breadcrumb items={breadcrumbs} />
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mt-4">
            <h1
              className="text-2xl sm:text-3xl md:text-4xl text-[var(--color-foreground)] font-normal"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Bộ sưu tập trang sức
            </h1>
            <p className="text-xs sm:text-sm text-[var(--color-muted-foreground)]">
              {total > 0 ? `${total} tuyệt tác kim hoàn` : "Bộ sưu tập trang sức"}
            </p>
          </div>
        </div>
      </div>

      {/* Catalog Component */}
      <Suspense fallback={<div className="container-site py-16 text-center text-sm text-[var(--color-muted-foreground)]">Đang tải bộ sưu tập...</div>}>
        <ProductCatalog
          products={products}
          categories={categories}
          total={total}
          page={page}
          totalPages={totalPages}
          searchParams={params}
        />
      </Suspense>
    </>
  );
}
