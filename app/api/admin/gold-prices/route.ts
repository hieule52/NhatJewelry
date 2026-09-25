import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { goldPriceSchema } from "@/lib/validations";
import { auth } from "@/lib/auth";

export async function GET() {
  try {
    const prices = await prisma.goldPrice.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ success: true, data: prices });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Không thể lấy dữ liệu giá vàng" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth();
    const body = await req.json();
    const validated = goldPriceSchema.parse(body);

    // Get an admin user id to associate the update with
    let userId = session?.user?.id;
    if (!userId) {
      const admin = await prisma.user.findFirst();
      userId = admin?.id || "system";
    }

    const price = await prisma.goldPrice.create({
      data: {
        type: validated.type,
        buyPrice: validated.buyPrice,
        sellPrice: validated.sellPrice,
        unit: validated.unit,
        isActive: validated.isActive,
        updatedById: userId,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Thêm loại vàng thành công",
      data: price,
    });
  } catch (error: any) {
    if (error.name === "ZodError") {
      return NextResponse.json(
        { success: false, error: "Dữ liệu không hợp lệ", details: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, error: error.message || "Không thể cập nhật giá vàng" },
      { status: 500 }
    );
  }
}
