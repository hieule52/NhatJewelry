import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { consultationSchema } from "@/lib/validations";
import { sendConsultationNotification } from "@/lib/email";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validatedData = consultationSchema.parse(body);

    // Save consultation request to database
    const consultation = await prisma.consultation.create({
      data: {
        fullName: validatedData.fullName,
        phone: validatedData.phone,
        email: validatedData.email || null,
        interestedIn: validatedData.interestedIn || null,
        message: validatedData.message,
        status: "NEW",
      },
    });

    // Send email notification in background (non-blocking if email service fails)
    try {
      await sendConsultationNotification({
        fullName: validatedData.fullName,
        phone: validatedData.phone,
        email: validatedData.email || undefined,
        interestedIn: validatedData.interestedIn || undefined,
        message: validatedData.message,
        submittedAt: consultation.createdAt,
      });
    } catch (emailError) {
      console.warn("Failed to send consultation email:", emailError);
    }

    return NextResponse.json({
      success: true,
      message: "Yêu cầu tư vấn của bạn đã được gửi thành công! Chuyên viên NHẬT JEWERLY sẽ liên hệ trong thời gian sớm nhất.",
      data: consultation,
    });
  } catch (error: any) {
    if (error.name === "ZodError") {
      return NextResponse.json(
        {
          success: false,
          error: "Dữ liệu nhập vào không hợp lệ",
          details: error.errors,
        },
        { status: 400 }
      );
    }

    console.error("Consultation submission error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Đã có lỗi xảy ra. Vui lòng thử lại sau hoặc gọi điện trực tiếp.",
      },
      { status: 500 }
    );
  }
}
