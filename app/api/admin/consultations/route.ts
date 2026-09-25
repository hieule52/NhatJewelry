import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const consultations = await prisma.consultation.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ success: true, data: consultations });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Không thể lấy danh sách yêu cầu tư vấn" },
      { status: 500 }
    );
  }
}
