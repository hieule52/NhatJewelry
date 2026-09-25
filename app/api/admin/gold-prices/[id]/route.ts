import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { goldPriceSchema } from "@/lib/validations";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function PUT(req: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    const body = await req.json();
    const validated = goldPriceSchema.parse(body);

    const price = await prisma.goldPrice.update({
      where: { id },
      data: {
        type: validated.type,
        buyPrice: validated.buyPrice,
        sellPrice: validated.sellPrice,
        unit: validated.unit,
        isActive: validated.isActive,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Cập nhật giá vàng thành công",
      data: price,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Lỗi cập nhật giá vàng" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    await prisma.goldPrice.delete({
      where: { id },
    });
    return NextResponse.json({
      success: true,
      message: "Xóa loại vàng thành công",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Không thể xóa loại vàng này" },
      { status: 500 }
    );
  }
}
