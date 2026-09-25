import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const prices = await prisma.goldPrice.findMany({
      where: { isActive: true },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({
      success: true,
      data: prices,
      updatedAt: prices[0]?.createdAt || new Date(),
    });
  } catch (error) {
    console.error("Error fetching gold prices:", error);
    return NextResponse.json(
      { success: false, error: "Không thể lấy dữ liệu giá vàng" },
      { status: 500 }
    );
  }
}
