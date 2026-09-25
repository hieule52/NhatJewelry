import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { ScrollReveal } from "@/components/ui/motion";

// Fallback images from Unsplash keyed by slug prefix
const fallbackImages: Record<string, string> = {
  "nhan": "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=800",
  "day-chuyen": "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=800",
  "lac-tay": "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=800",
  "bong-tai": "https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&q=80&w=800",
  "trang-suc-cuoi": "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=800",
  "default": "https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&q=80&w=800",
};

function getFallbackImage(slug: string): string {
  for (const key of Object.keys(fallbackImages)) {
    if (slug.startsWith(key)) return fallbackImages[key];
  }
  return fallbackImages["default"];
}

export async function FeaturedCollections() {
  const categories = await prisma.category.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: "asc" },
    take: 5,
  });

  if (categories.length === 0) return null;

  const collections = categories.map((cat) => ({
    id: cat.id,
    slug: `/san-pham?category=${cat.slug}`,
    name: cat.name,
    description: cat.description || "",
    image: cat.image || getFallbackImage(cat.slug),
  }));

  return (
    <section
      className="section-padding bg-[var(--color-background)]"
      aria-labelledby="collections-heading"
    >
      <div className="container-site">
        {/* Section Header */}
        <ScrollReveal direction="up">
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
            <span className="tracking-luxury text-[var(--color-accent)] font-semibold block mb-2">
              BỘ SƯU TẬP CHỦ LỰC
            </span>
            <h2
              id="collections-heading"
              className="text-2xl sm:text-3xl md:text-4xl text-[var(--color-foreground)] font-normal"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Tuyệt tác trang sức NHẬT JEWERLY
            </h2>
            <div className="divider-gold" />
            <p className="text-xs sm:text-sm text-[var(--color-muted-foreground)] mt-3">
              Khám phá từng bộ sưu tập được chế tác công phu để tôn vinh trọn vẹn nét quý phái của bạn.
            </p>
          </div>
        </ScrollReveal>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* Feature Card — first category spans 2 rows */}
          <ScrollReveal
            className="sm:col-span-2 lg:col-span-2 lg:row-span-2"
            direction="up"
            staggerIndex={0}
          >
            <Link
              href={collections[0].slug}
              className="group relative min-h-[320px] sm:min-h-[420px] lg:min-h-[500px] h-full overflow-hidden border border-[var(--color-border)] flex flex-col justify-end p-6 sm:p-8 cursor-pointer hover:border-[var(--color-accent)] transition-colors duration-300"
              aria-label={`Xem bộ sưu tập ${collections[0].name}`}
            >
              <Image
                src={collections[0].image}
                alt={collections[0].name}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                sizes="(max-width: 768px) 100vw, 50vw"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10 transition-opacity duration-300 group-hover:from-black/90" />
              <div className="relative z-10 text-white">
                <span className="text-[10px] tracking-[0.2em] uppercase font-semibold text-[var(--color-gold-300)] block mb-1">
                  BỘ SƯU TẬP
                </span>
                <h3
                  className="text-2xl sm:text-3xl font-light text-white mb-2"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {collections[0].name}
                </h3>
                <p className="text-xs sm:text-sm text-gray-300 mb-4 max-w-sm">
                  {collections[0].description}
                </p>
                <span className="inline-flex items-center gap-2 text-xs tracking-widest uppercase font-semibold text-[var(--color-gold-300)] group-hover:text-white transition-colors">
                  <span>Khám phá ngay</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform duration-250" />
                </span>
              </div>
            </Link>
          </ScrollReveal>

          {/* Remaining Collections */}
          {collections.slice(1).map((col, idx) => (
            <ScrollReveal
              key={col.id}
              direction="up"
              staggerIndex={idx + 1}
            >
              <Link
                href={col.slug}
                className="group relative min-h-[220px] sm:min-h-[240px] h-full overflow-hidden border border-[var(--color-border)] flex flex-col justify-end p-5 sm:p-6 cursor-pointer hover:border-[var(--color-accent)] transition-colors duration-300"
                aria-label={`Xem bộ sưu tập ${col.name}`}
              >
                <Image
                  src={col.image}
                  alt={col.name}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  sizes="(max-width: 768px) 50vw, 25vw"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent transition-opacity duration-300 group-hover:from-black/85" />
                <div className="relative z-10 text-white">
                  <span className="text-[9px] tracking-[0.2em] uppercase font-medium text-[var(--color-gold-300)] block mb-0.5">
                    BỘ SƯU TẬP
                  </span>
                  <h3
                    className="text-lg sm:text-xl font-light text-white mb-1"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {col.name}
                  </h3>
                  <p className="text-[11px] text-gray-300 mb-2 line-clamp-1">
                    {col.description}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-[11px] tracking-widest uppercase font-medium text-[var(--color-gold-300)] group-hover:text-white transition-colors">
                    <span>Xem thêm</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1.5 transition-transform duration-250" />
                  </span>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}