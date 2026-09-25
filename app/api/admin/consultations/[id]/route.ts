import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function PATCH(req: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    const { status } = await req.json();

    if (!["NEW", "CONTACTED", "COMPLETED"].includes(status)) {
      return NextResponse.json(
        { success: false, error: "Trạng thái không hợp lệ" },
        { status: 400 }
      );
    }

    const updated = await prisma.consultation.update({
      where: { id },
      data: { status },
    });

    return NextResponse.json({
      success: true,
      message: "Cập nhật trạng thái thành công",
      data: updated,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Không thể cập nhật yêu cầu" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    await prisma.consultation.delete({
      where: { id },
    });
    return NextResponse.json({
      success: true,
      message: "Xóa yêu cầu thành công",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Không thể xóa yêu cầu" },
      { status: 500 }
    );
  }
}
