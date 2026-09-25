import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { categorySchema } from "@/lib/validations";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function PUT(req: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    const body = await req.json();
    const validated = categorySchema.parse(body);

    const category = await prisma.category.update({
      where: { id },
      data: validated,
    });

    return NextResponse.json({
      success: true,
      message: "Cập nhật danh mục thành công",
      data: category,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Không thể cập nhật danh mục" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request, { params }: RouteParams) {
  try {
    const { id } = await params;

    // Check if category has products
    const productCount = await prisma.product.count({
      where: { categoryId: id },
    });

    if (productCount > 0) {
      return NextResponse.json(
        {
          success: false,
          error: `Không thể xóa danh mục đang có ${productCount} sản phẩm. Hãy chuyển sản phẩm sang danh mục khác trước.`,
        },
        { status: 400 }
      );
    }

    await prisma.category.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: "Xóa danh mục thành công",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Không thể xóa danh mục" },
      { status: 500 }
    );
  }
}
