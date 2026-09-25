import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Breadcrumb } from "@/components/seo/Breadcrumb";
import { JsonLdProduct } from "@/components/seo/JsonLd";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductDetailInfo } from "@/components/product/ProductDetailInfo";
import { ProductCard } from "@/components/home/FeaturedProducts";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await prisma.product.findUnique({
    where: { slug },
    include: {
      images: { where: { isPrimary: true }, take: 1 },
      category: true,
    },
  });

  if (!product) {
    return {
      title: "Không tìm thấy sản phẩm",
    };
  }

  const primaryImage = product.images[0]?.url || "/assets/images/poster_coming_doc.png";
  const title = product.seoTitle || `${product.name} | NHẬT JEWERLY`;
  const description =
    product.seoDescription ||
    product.description?.slice(0, 160) ||
    `${product.name} — Trang sức vàng cao cấp từ NHẬT JEWERLY. Chế tác tinh xảo, cam kết chất lượng.`;

  return {
    title,
    description,
    keywords: product.seoKeywords ? product.seoKeywords.split(",") : undefined,
    openGraph: {
      title,
      description,
      images: [
        {
          url: primaryImage,
          width: 800,
          height: 800,
          alt: product.name,
        },
      ],
      type: "website",
    },
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = await params;

  const product = await prisma.product.findUnique({
    where: { slug },
    include: {
      images: { orderBy: { sortOrder: "asc" } },
      category: true,
    },
  });

  if (!product || !product.isActive) {
    notFound();
  }

  // Fetch related products from the same category
  const relatedProducts = await prisma.product.findMany({
    where: {
      categoryId: product.categoryId,
      id: { not: product.id },
      isActive: true,
    },
    include: {
      images: { where: { isPrimary: true }, take: 1 },
      category: true,
    },
    take: 4,
  });

  const breadcrumbs = [
    { label: "Trang chủ", href: "/" },
    { label: "Sản phẩm", href: "/san-pham" },
    { label: product.category.name, href: `/san-pham?category=${product.category.slug}` },
    { label: product.name, href: `/san-pham/${product.slug}`, current: true },
  ];

  const primaryImage = product.images[0]?.url || "/assets/images/poster_coming_doc.png";

  return (
    <div className="pt-24 min-h-screen bg-[var(--color-background)]">
      <JsonLdProduct
        name={product.name}
        description={product.description}
        image={primaryImage}
        sku={product.sku}
        price={product.price ? Number(product.price) : null}
        url={`https://nhatjewerly.com/san-pham/${product.slug}`}
        category={product.category.name}
      />

      <div className="border-b border-[var(--color-border)] py-3 bg-[var(--color-surface)] dark:bg-[#12100E]">
        <div className="container-site">
          <Breadcrumb items={breadcrumbs} />
        </div>
      </div>

      <div className="container-site py-10 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
          {/* Gallery */}
          <ProductGallery images={product.images} productName={product.name} />

          {/* Details & Specs */}
          <ProductDetailInfo product={product} />
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-20 pt-12 border-t border-[var(--color-border)]">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
              <div>
                <span className="text-xs uppercase tracking-widest text-[var(--color-gold-500)] block mb-1">
                  Cùng bộ sưu tập
                </span>
                <h3
                  className="text-2xl sm:text-3xl text-[var(--color-foreground)] font-normal"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  Sản phẩm tương tự
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {relatedProducts.map((relProd) => (
                <ProductCard key={relProd.id} product={relProd} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
