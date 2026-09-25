import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const files = formData.getAll("file") as File[];

    if (!files || files.length === 0) {
      // Also try "files"
      const altFiles = formData.getAll("files") as File[];
      if (altFiles && altFiles.length > 0) {
        files.push(...altFiles);
      }
    }

    if (!files || files.length === 0) {
      return NextResponse.json(
        { success: false, error: "Không tìm thấy file tải lên" },
        { status: 400 }
      );
    }

    const uploadDir = path.join(process.cwd(), "public", "uploads");
    await mkdir(uploadDir, { recursive: true });

    const uploadedUrls: string[] = [];

    for (const file of files) {
      // Validate type
      if (!file.type.startsWith("image/")) {
        return NextResponse.json(
          { success: false, error: `File ${file.name} không phải là hình ảnh hợp lệ` },
          { status: 400 }
        );
      }

      // Max 10MB
      if (file.size > 10 * 1024 * 1024) {
        return NextResponse.json(
          { success: false, error: `File ${file.name} vượt quá dung lượng tối đa 10MB` },
          { status: 400 }
        );
      }

      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Safe clean filename
      const ext = path.extname(file.name).toLowerCase() || ".png";
      const cleanBase = path
        .basename(file.name, ext)
        .toLowerCase()
        .replace(/[^a-z0-9_-]/g, "_")
        .slice(0, 40);

      const uniqueName = `${cleanBase}_${Date.now()}_${Math.random().toString(36).substring(2, 7)}${ext}`;
      const filePath = path.join(uploadDir, uniqueName);

      await writeFile(filePath, buffer);
      uploadedUrls.push(`/uploads/${uniqueName}`);
    }

    return NextResponse.json({
      success: true,
      url: uploadedUrls[0],
      urls: uploadedUrls,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { success: false, error: "Lỗi lưu file trên server" },
      { status: 500 }
    );
  }
}
