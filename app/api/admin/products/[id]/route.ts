import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { productSchema } from "@/lib/validations";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(req: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        category: true,
        images: { orderBy: { sortOrder: "asc" } },
      },
    });

    if (!product) {
      return NextResponse.json(
        { success: false, error: "Không tìm thấy sản phẩm" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: product });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Lỗi tải thông tin sản phẩm" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    const body = await req.json();
    const validated = productSchema.parse(body);

    // Delete existing images and re-insert new image list
    await prisma.$transaction([
      prisma.productImage.deleteMany({
        where: { productId: id },
      }),
      prisma.product.update({
        where: { id },
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
      }),
    ]);

    return NextResponse.json({
      success: true,
      message: "Cập nhật sản phẩm thành công",
    });
  } catch (error: any) {
    if (error.name === "ZodError") {
      return NextResponse.json(
        { success: false, error: "Dữ liệu không hợp lệ", details: error.errors },
        { status: 400 }
      );
    }
    console.error("Update product error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Không thể cập nhật sản phẩm" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request, { params }: RouteParams) {
  try {
    const { id } = await params;

    await prisma.product.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: "Xóa sản phẩm thành công",
    });
  } catch (error) {
    console.error("Delete product error:", error);
    return NextResponse.json(
      { success: false, error: "Không thể xóa sản phẩm" },
      { status: 500 }
    );
  }
}
