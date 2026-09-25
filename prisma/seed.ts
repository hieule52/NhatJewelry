import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Bắt đầu gieo mầm dữ liệu mẫu (Seeding data)...");

  // 1. Tạo tài khoản Admin
  const hashedPassword = await bcrypt.hash("NhatJewerly@2026", 10);
  const admin = await prisma.user.upsert({
    where: { email: "admin@nhatjewerly.com" },
    update: {},
    create: {
      email: "admin@nhatjewerly.com",
      name: "Quản Trị Viên NHẬT",
      password: hashedPassword,
      role: "SUPER_ADMIN",
    },
  });
  console.log("✅ Đã tạo tài khoản admin: admin@nhatjewerly.com / NhatJewerly@2026");

  // 2. Tạo các danh mục (Categories)
  const categoriesData = [
    {
      name: "Nhẫn vàng",
      slug: "nhan-vang",
      description: "Tuyệt tác nhẫn vàng nam nữ, nhẫn kim cương và nhẫn đính hôn tinh xảo.",
      sortOrder: 1,
    },
    {
      name: "Dây chuyền vàng",
      slug: "day-chuyen-vang",
      description: "Dây chuyền vàng 18K, 24K kết hợp mặt dây đính đá sang trọng.",
      sortOrder: 2,
    },
    {
      name: "Lắc tay vàng",
      slug: "lac-tay-vang",
      description: "Lắc tay và vòng tay vàng đúc, lắc charm phong cách quý phái.",
      sortOrder: 3,
    },
    {
      name: "Bông tai vàng",
      slug: "bong-tai-vang",
      description: "Bông tai vàng nụ đính kim cương, hoa tai dáng dài tôn vinh nét duyên phái đẹp.",
      sortOrder: 4,
    },
    {
      name: "Trang sức cưới",
      slug: "trang-suc-cuoi",
      description: "Bộ trang sức cưới vàng 24K truyền thống và nhẫn cưới định ước trọn đời.",
      sortOrder: 5,
    },
  ];

  const createdCategories: Record<string, any> = {};
  for (const cat of categoriesData) {
    const created = await prisma.category.upsert({
      where: { slug: cat.slug },
      update: cat,
      create: cat,
    });
    createdCategories[cat.slug] = created;
  }
  console.log("✅ Đã tạo 5 danh mục sản phẩm");

  // 3. Tạo bảng giá vàng (Gold Prices)
  const goldPricesData = [
    {
      type: "Vàng miếng SJC 999.9",
      buyPrice: 88500000,
      sellPrice: 90500000,
      unit: "đồng/lượng",
    },
    {
      type: "Nhẫn tròn trơn 999.9 (24K)",
      buyPrice: 87900000,
      sellPrice: 89400000,
      unit: "đồng/lượng",
    },
    {
      type: "Vàng nữ trang 99.99% (24K)",
      buyPrice: 87200000,
      sellPrice: 88700000,
      unit: "đồng/lượng",
    },
    {
      type: "Vàng nữ trang 75% (18K)",
      buyPrice: 64800000,
      sellPrice: 67300000,
      unit: "đồng/lượng",
    },
    {
      type: "Vàng nữ trang 58.3% (14K)",
      buyPrice: 49800000,
      sellPrice: 52300000,
      unit: "đồng/lượng",
    },
    {
      type: "Vàng nữ trang 41.7% (10K)",
      buyPrice: 34500000,
      sellPrice: 37000000,
      unit: "đồng/lượng",
    },
  ];

  // Xóa giá vàng cũ và thêm mới
  await prisma.goldPrice.deleteMany({});
  for (const gp of goldPricesData) {
    await prisma.goldPrice.create({
      data: {
        ...gp,
        updatedById: admin.id,
      },
    });
  }
  console.log("✅ Đã tạo bảng giá vàng thị trường");

  // 4. Tạo các sản phẩm trang sức mẫu cao cấp
  const productsData = [
    {
      name: "Nhẫn Kim Cương Solitaire Hoàng Gia 18K",
      slug: "nhan-kim-cuong-solitaire-hoang-gia-18k",
      sku: "NJ-RING-001",
      categorySlug: "nhan-vang",
      price: 28500000,
      priceDisplay: "SHOW" as const,
      material: "Vàng trắng 18K (750)",
      weight: "1.15 chỉ",
      gemstone: "Kim cương tự nhiên 5.4mm (F/VVS1)",
      size: "Size 12 - 16",
      isFeatured: true,
      description: "Nhẫn kim cương Solitaire mang thiết kế 6 chấu kinh điển nâng niu viên kim cương chủ lấp lánh tuyệt mỹ. Biểu tượng bất diệt của tình yêu vĩnh cửu.",
      technicalInfo: "Giác cắt tròn Brilliant Cut đạt chuẩn Excellent. Vàng trắng phủ Rhodium cao cấp chống ố vàng.",
      images: [
        "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&q=80&w=800",
      ],
    },
    {
      name: "Nhẫn Nam Signet Vàng 24K Chạm Khắc Rồng",
      slug: "nhan-nam-signet-vang-24k-cham-khac-rong",
      sku: "NJ-RING-002",
      categorySlug: "nhan-vang",
      price: 45000000,
      priceDisplay: "SHOW" as const,
      material: "Vàng ròng 24K (999.9)",
      weight: "3.5 chỉ",
      gemstone: "Không đính đá",
      size: "Size 18 - 22",
      isFeatured: true,
      description: "Thiết kế nhẫn Signet bản lớn thể hiện bản lĩnh và uy quyền của phái mạnh. Họa tiết Long Vân chạm khắc nổi 3D bởi các nghệ nhân kim hoàn hàng đầu.",
      technicalInfo: "Chế tác đúc nguyên khối công nghệ cao, đánh bóng bóng gương kết hợp vân cát nhám thủ công.",
      images: [
        "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&q=80&w=800",
      ],
    },
    {
      name: "Dây Chuyền Vàng Ý 18K Mặt Hoa Sen Đính Kim Cương",
      slug: "day-chuyen-vang-y-18k-mat-hoa-sen-dinh-kim-cuong",
      sku: "NJ-NCK-001",
      categorySlug: "day-chuyen-vang",
      price: 36000000,
      priceDisplay: "SHOW" as const,
      material: "Vàng hồng 18K (Rose Gold)",
      weight: "1.8 chỉ",
      gemstone: "Đá Cubic Zirconia thượng hạng & Kim cương tấm",
      size: "Chiều dài dây 42cm + 3cm tăng đơ",
      isFeatured: true,
      description: "Lấy cảm hứng từ đóa sen thanh khiết vươn mình đón ánh nắng mai, mặt dây chuyền khắc họa đường nét mềm mại, uyển chuyển tôn lên vẻ đẹp thanh lịch của người phụ nữ Á Đông.",
      technicalInfo: "Dây mắt xích Ý chống xoắn, khóa cài an toàn chuẩn quốc tế.",
      images: [
        "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=800",
      ],
    },
    {
      name: "Dây Chuyền Nam Cubano Vàng 18K Bản Lớn",
      slug: "day-chuyen-nam-cubano-vang-18k-ban-lon",
      sku: "NJ-NCK-002",
      categorySlug: "day-chuyen-vang",
      price: 85000000,
      priceDisplay: "CONTACT" as const,
      material: "Vàng vàng 18K (750)",
      weight: "8.5 chỉ",
      gemstone: "Không đính đá",
      size: "Chiều dài 55cm, bề rộng 7mm",
      isFeatured: false,
      description: "Dây chuyền Cuban Link kinh điển với các mắt xích vát cạnh sắc sảo, đầm tay và đầy uy lực. Món trang sức tôn vinh đẳng cấp thượng lưu.",
      technicalInfo: "Khóa hộp đôi chắc chắn, khắc chìm biểu tượng bảo chứng thương hiệu NHẬT JEWERLY.",
      images: [
        "https://images.unsplash.com/photo-1611591475822-482455850974?auto=format&fit=crop&q=80&w=800",
      ],
    },
    {
      name: "Lắc Tay Vàng 18K Dáng Tennis Đính Đá Tinh Xảo",
      slug: "lac-tay-vang-18k-dang-tennis-dinh-da-tinh-xao",
      sku: "NJ-BRC-001",
      categorySlug: "lac-tay-vang",
      price: 52000000,
      priceDisplay: "SHOW" as const,
      material: "Vàng trắng 18K",
      weight: "2.8 chỉ",
      gemstone: "Dải đá Moissanite cao cấp 3.0mm độ tán sắc hoàn hảo",
      size: "Chiều dài 16.5cm - 17.5cm",
      isFeatured: true,
      description: "Lắc tay Tennis Bracelet kiêu sa, liền mạch ánh sáng với hàng chục giác cắt đá quý đồng đều tuyệt đối. Dễ dàng phối cùng đồng hồ hoặc đeo đơn lẻ sang trọng.",
      technicalInfo: "Khóa đôi chống rơi độc quyền, từng chấu đá được gắp và tán kỹ lưỡng dưới kính hiển vi quang học.",
      images: [
        "https://images.unsplash.com/photo-1611591475822-482455850974?auto=format&fit=crop&q=80&w=800",
      ],
    },
    {
      name: "Vòng Tay Kiềng Khắc Kim Tiền Vàng 24K May Mắn",
      slug: "vong-tay-kieng-khac-kim-tien-vang-24k-may-man",
      sku: "NJ-BRC-002",
      categorySlug: "lac-tay-vang",
      price: 68000000,
      priceDisplay: "SHOW" as const,
      material: "Vàng 24K (999.9)",
      weight: "5 chỉ",
      gemstone: "Không đính đá",
      size: "Đường kính 54mm - 58mm",
      isFeatured: false,
      description: "Họa tiết chuỗi kim tiền nối tiếp tượng trưng cho dòng chảy tài lộc dồi dào và thịnh vượng bất tận. Lựa chọn hoàn hảo cho quà tặng đối tác hoặc tích sản gia đình.",
      technicalInfo: "Công nghệ Hard Gold 24K tăng độ cứng cáp cho vàng nguyên chất, hạn chế móp méo khi va chạm.",
      images: [
        "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=800",
      ],
    },
    {
      name: "Bông Tai Kim Cương Halo Duyên Dáng 18K",
      slug: "bong-tai-kim-cuong-halo-duyen-dang-18k",
      sku: "NJ-EAR-001",
      categorySlug: "bong-tai-vang",
      price: 24000000,
      priceDisplay: "SHOW" as const,
      material: "Vàng trắng 18K (750)",
      weight: "0.8 chỉ",
      gemstone: "Kim cương tự nhiên viền Halo nhân đôi độ tỏa sáng",
      size: "Đường kính mặt 8.5mm",
      isFeatured: true,
      description: "Kiểu dáng Halo bao quanh viên chủ tạo hiệu ứng nhân đôi kích thước thị giác, tỏa ra hào quang lấp lánh theo từng chuyển động của nàng.",
      technicalInfo: "Chốt vặn ren an toàn không gây cấn tai khi ngủ hay vận động.",
      images: [
        "https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&q=80&w=800",
      ],
    },
    {
      name: "Bông Tai Dài Dáng Giọt Lệ Vàng Hồng 18K",
      slug: "bong-tai-dai-dang-giot-le-vang-hong-18k",
      sku: "NJ-EAR-002",
      categorySlug: "bong-tai-vang",
      price: 18500000,
      priceDisplay: "SHOW" as const,
      material: "Vàng hồng 18K",
      weight: "1.1 chỉ",
      gemstone: "Đá Thạch Anh Hồng tự nhiên & Kim cương tấm",
      size: "Dài 4.5cm",
      isFeatured: false,
      description: "Dáng hoa tai thanh mảnh hình giọt sương mai đung đưa nhẹ nhàng, giúp tôn vinh đường nét thon gọn của khuôn mặt và chiếc cổ kiêu kỳ.",
      technicalInfo: "Bề mặt vàng hồng đánh bóng đạt độ phản chiếu tuyệt đối.",
      images: [
        "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=800",
      ],
    },
    {
      name: "Cặp Nhẫn Cưới Vàng Trắng & Vàng Vàng Phối Màu Tình Nồng",
      slug: "cap-nhan-cuoi-vang-trang-vang-vang-phoi-mau-tinh-nong",
      sku: "NJ-WED-001",
      categorySlug: "trang-suc-cuoi",
      price: 22000000,
      priceDisplay: "SHOW" as const,
      material: "Vàng Two-tone 18K (Trắng + Vàng)",
      weight: "1.9 chỉ (cả cặp)",
      gemstone: "Kim cương tự nhiên đính chìm lòng nhẫn (Secret Diamond)",
      size: "Đo cỡ tay theo yêu cầu cô dâu chú rể",
      isFeatured: true,
      description: "Sự hòa quyện giữa sắc trắng tinh khôi và sắc vàng truyền thống, tượng trưng cho hai tâm hồn đồng điệu cùng hướng về tương lai ngập tràn hạnh phúc.",
      technicalInfo: "Tặng kèm dịch vụ khắc tên và ngày cưới độc bản bằng laser công nghệ Đức bên trong lòng nhẫn.",
      images: [
        "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=800",
      ],
    },
    {
      name: "Bộ Trang Sức Cưới Rồng Phượng Sum Vầy 24K",
      slug: "bo-trang-suc-cuoi-rong-phuong-sum-vay-24k",
      sku: "NJ-WED-002",
      categorySlug: "trang-suc-cuoi",
      price: 180000000,
      priceDisplay: "CONTACT" as const,
      material: "Vàng ròng 24K (999.9)",
      weight: "1.5 cây (15 chỉ)",
      gemstone: "Vàng khắc hoa thủ công truyền thống",
      size: "Trọn bộ: Kiềng cổ, Lắc tay, Bông tai, Nhẫn",
      isFeatured: true,
      description: "Tuyệt tác trang sức cưới truyền thống khắc họa hình tượng Long Phụng trình tường. Món của hồi môn tôn quý chứa đựng phúc lành và lời chúc trăm năm viên mãn từ hai họ.",
      technicalInfo: "Chế tác thủ công đúc rút mạ dập hoa 3D tinh xảo theo mẫu hoàng gia Huế.",
      images: [
        "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=800",
      ],
    },
  ];

  for (const prod of productsData) {
    const category = createdCategories[prod.categorySlug];
    if (!category) continue;

    // Delete existing images for this slug if any
    const existing = await prisma.product.findUnique({
      where: { slug: prod.slug },
    });
    if (existing) {
      await prisma.productImage.deleteMany({ where: { productId: existing.id } });
    }

    await prisma.product.upsert({
      where: { slug: prod.slug },
      update: {
        name: prod.name,
        sku: prod.sku,
        categoryId: category.id,
        price: prod.price,
        priceDisplay: prod.priceDisplay,
        material: prod.material,
        weight: prod.weight,
        gemstone: prod.gemstone,
        size: prod.size,
        technicalInfo: prod.technicalInfo,
        description: prod.description,
        isFeatured: prod.isFeatured,
        isActive: true,
        seoTitle: `${prod.name} | NHẬT JEWERLY`,
        seoDescription: prod.description.slice(0, 160),
        images: {
          create: prod.images.map((url, idx) => ({
            url,
            altText: prod.name,
            isPrimary: idx === 0,
            sortOrder: idx,
          })),
        },
      },
      create: {
        name: prod.name,
        slug: prod.slug,
        sku: prod.sku,
        categoryId: category.id,
        price: prod.price,
        priceDisplay: prod.priceDisplay,
        material: prod.material,
        weight: prod.weight,
        gemstone: prod.gemstone,
        size: prod.size,
        technicalInfo: prod.technicalInfo,
        description: prod.description,
        isFeatured: prod.isFeatured,
        isActive: true,
        seoTitle: `${prod.name} | NHẬT JEWERLY`,
        seoDescription: prod.description.slice(0, 160),
        images: {
          create: prod.images.map((url, idx) => ({
            url,
            altText: prod.name,
            isPrimary: idx === 0,
            sortOrder: idx,
          })),
        },
      },
    });
  }
  console.log(`✅ Đã tạo thành công ${productsData.length} sản phẩm trang sức cao cấp`);

  // 5. Tạo một số yêu cầu tư vấn mẫu
  await prisma.consultation.createMany({
    data: [
      {
        fullName: "Trần Thị Mai Phương",
        phone: "0918123456",
        email: "phuong.tran@gmail.com",
        interestedIn: "Cặp Nhẫn Cưới Vàng Trắng & Vàng Vàng Phối Màu Tình Nồng (NJ-WED-001)",
        message: "Chào NHẬT JEWERLY, mình muốn đặt lịch ghé cửa hàng để thử size nhẫn cưới vào cuối tuần này. Nhờ bạn tư vấn giúp giá chính xác và thời gian gia công nhé!",
        status: "NEW",
      },
      {
        fullName: "Lê Hoàng Quân",
        phone: "0903998877",
        email: "quan.le@techcorp.vn",
        interestedIn: "Nhẫn Nam Signet Vàng 24K Chạm Khắc Rồng (NJ-RING-002)",
        message: "Tôi cần tư vấn thêm về mẫu nhẫn rồng này, nếu làm theo size tay 20 thì trọng lượng vàng cụ thể là bao nhiêu và thời gian nhận nhẫn bao lâu?",
        status: "CONTACTED",
      },
    ],
    skipDuplicates: true,
  });
  console.log("✅ Đã tạo 2 yêu cầu tư vấn mẫu");

  console.log("🎉 Hoàn tất gieo mầm dữ liệu cho NHẬT JEWERLY!");
}

main()
  .catch((e) => {
    console.error("❌ Lỗi khi gieo mầm dữ liệu:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
