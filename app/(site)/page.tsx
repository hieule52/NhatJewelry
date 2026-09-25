import type { Metadata } from "next";
import { HeroSection } from "@/components/home/HeroSection";
import { BrandIntro } from "@/components/home/BrandIntro";
import { FeaturedCollections } from "@/components/home/FeaturedCollections";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { GoldPriceWidget } from "@/components/home/GoldPriceWidget";
import { BrandStory } from "@/components/home/BrandStory";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { ConsultationCTA } from "@/components/home/ConsultationCTA";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "NHẬT JEWERLY — Trang Sức Vàng Cao Cấp",
  description:
    "NHẬT JEWERLY — Thương hiệu trang sức vàng cao cấp. Khám phá bộ sưu tập nhẫn, dây chuyền, lắc tay, bông tai tinh tế. Xem giá vàng hôm nay.",
};

async function getFeaturedProducts() {
  try {
    return await prisma.product.findMany({
      where: { isActive: true, isFeatured: true },
      include: {
        images: {
          where: { isPrimary: true },
          take: 1,
        },
        category: true,
      },
      orderBy: { createdAt: "desc" },
      take: 8,
    });
  } catch {
    return [];
  }
}

async function getLatestGoldPrices() {
  try {
    const types = await prisma.goldPrice.groupBy({
      by: ["type"],
      where: { isActive: true },
    });

    const prices = await Promise.all(
      types.map(({ type }) =>
        prisma.goldPrice.findFirst({
          where: { type, isActive: true },
          orderBy: { createdAt: "desc" },
        })
      )
    );

    return prices.filter(Boolean);
  } catch {
    return [];
  }
}

export default async function HomePage() {
  const [featuredProducts, goldPrices] = await Promise.all([
    getFeaturedProducts(),
    getLatestGoldPrices(),
  ]);

  return (
    <>
      <HeroSection />
      <BrandIntro />
      <FeaturedCollections />
      <FeaturedProducts products={featuredProducts} />
      <GoldPriceWidget goldPrices={goldPrices} />
      <BrandStory />
      <WhyChooseUs />
      <ConsultationCTA />
    </>
  );
}
