import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { productSchema } from "@/lib/validations";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const categoryId = searchParams.get("categoryId");
    const q = searchParams.get("q");

    const where = {
      ...(categoryId ? { categoryId } : {}),
      ...(q
        ? {
            OR: [
              { name: { contains: q, mode: "insensitive" as const } },
              { sku: { contains: q, mode: "insensitive" as const } },
            ],
          }
        : {}),
    };

    const products = await prisma.product.findMany({
      where,
      include: {
        category: true,
        images: { orderBy: { sortOrder: "asc" } },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ success: true, data: products });
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return NextResponse.json(
      { success: false, error: "Lỗi tải danh sách sản phẩm" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validated = productSchema.parse(body);

    // Create product and its images in a transaction
    const product = await prisma.product.create({
      data: {
        name: validated.name,
        slug: validated.slug,
        sku: validated.sku,
        categoryId: validated.categoryId,
        description: validated.description || null,
        price: validated.price ?? null,
        priceDisplay: validated.priceDisplay,
        material: validated.material || null,
        weight: validated.weight || null,
        gemstone: validated.gemstone || null,
        size: validated.size || null,
        technicalInfo: validated.technicalInfo || null,
        isActive: validated.isActive,
        isFeatured: validated.isFeatured,
        seoTitle: validated.seoTitle || null,
        seoDescription: validated.seoDescription || null,
        seoKeywords: validated.seoKeywords || null,
        images: {
          create: (validated.images || []).map((img, index) => ({
            url: img.url,
            altText: img.altText || validated.name,
            isPrimary: img.isPrimary || index === 0,
            sortOrder: img.sortOrder ?? index,
          })),
        },
      },
      include: {
        images: true,
        category: true,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Thêm sản phẩm thành công",
      data: product,
    });
  } catch (error: any) {
    if (error.name === "ZodError") {
      return NextResponse.json(
        { success: false, error: "Dữ liệu không hợp lệ", details: error.errors },
        { status: 400 }
      );
    }
    console.error("Create product error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Không thể tạo sản phẩm" },
      { status: 500 }
    );
  }
}
