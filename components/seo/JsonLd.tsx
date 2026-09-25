interface BreadcrumbItem {
  label: string;
  href: string;
  current?: boolean;
}

interface JsonLdOrganizationProps {
  url?: string;
  logo?: string;
  name?: string;
}

export function JsonLdOrganization({
  url = "https://nhatjewerly.com",
  logo = "https://nhatjewerly.com/assets/images/logo_jewerly.png",
  name = "NHẬT JEWERLY",
}: JsonLdOrganizationProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "JewelryStore",
    name: name,
    url: url,
    logo: logo,
    image: logo,
    description:
      "NHẬT JEWERLY — Thương hiệu trang sức vàng cao cấp. Chuyên nhẫn vàng, dây chuyền, lắc tay, bông tai và trang sức cưới tinh xảo.",
    telephone: "+84 900 000 000",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Việt Nam",
      addressLocality: "Hồ Chí Minh",
      addressRegion: "Hồ Chí Minh",
      addressCountry: "VN",
    },
    priceRange: "$$$$",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "08:30",
        closes: "20:30",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function JsonLdWebsite({
  url = "https://nhatjewerly.com",
  name = "NHẬT JEWERLY",
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: name,
    url: url,
    potentialAction: {
      "@type": "SearchAction",
      target: `${url}/san-pham?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function JsonLdProduct({
  name,
  description,
  image,
  sku,
  price,
  url,
  category,
}: {
  name: string;
  description?: string | null;
  image?: string;
  sku: string;
  price?: number | null;
  url: string;
  category?: string;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: name,
    description: description || name,
    image: image ? [image] : undefined,
    sku: sku,
    brand: {
      "@type": "Brand",
      name: "NHẬT JEWERLY",
    },
    category: category,
    offers: {
      "@type": "Offer",
      url: url,
      priceCurrency: "VND",
      price: price || 0,
      priceValidUntil: "2027-12-31",
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function JsonLdBreadcrumb({ items }: { items: BreadcrumbItem[] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: item.href.startsWith("http")
        ? item.href
        : `https://nhatjewerly.com${item.href}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
