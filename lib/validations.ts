import { z } from "zod";

export const consultationSchema = z.object({
  fullName: z
    .string()
    .min(2, "Họ và tên phải có ít nhất 2 ký tự")
    .max(100, "Họ và tên không được vượt quá 100 ký tự"),
  phone: z
    .string()
    .regex(
      /^(\+84|84|0)(3[2-9]|5[6-9]|7[0-9]|8[0-9]|9[0-9])[0-9]{7}$/,
      "Số điện thoại không hợp lệ"
    ),
  email: z
    .string()
    .email("Email không hợp lệ")
    .optional()
    .or(z.literal("")),
  interestedIn: z.string().optional(),
  message: z
    .string()
    .min(10, "Nội dung tư vấn phải có ít nhất 10 ký tự")
    .max(2000, "Nội dung không được vượt quá 2000 ký tự"),
});

export type ConsultationFormData = z.infer<typeof consultationSchema>;

export const goldPriceSchema = z.object({
  type: z.string().min(1, "Loại vàng không được để trống"),
  buyPrice: z.coerce
    .number()
    .positive("Giá mua phải là số dương")
    .max(1000000000, "Giá không hợp lệ"),
  sellPrice: z.coerce
    .number()
    .positive("Giá bán phải là số dương")
    .max(1000000000, "Giá không hợp lệ"),
  unit: z.string().default("đồng/chỉ"),
  isActive: z.boolean().default(true),
});

export type GoldPriceFormData = z.infer<typeof goldPriceSchema>;

export const productSchema = z.object({
  name: z.string().min(2, "Tên sản phẩm phải có ít nhất 2 ký tự"),
  slug: z.string().min(2, "Slug phải có ít nhất 2 ký tự"),
  sku: z.string().min(2, "Mã SKU phải có ít nhất 2 ký tự"),
  categoryId: z.string().min(1, "Vui lòng chọn danh mục"),
  description: z.string().optional(),
  price: z.coerce.number().optional(),
  priceDisplay: z.enum(["SHOW", "CONTACT", "HIDDEN"]).default("CONTACT"),
  material: z.string().optional(),
  weight: z.string().optional(),
  gemstone: z.string().optional(),
  size: z.string().optional(),
  technicalInfo: z.string().optional(),
  isActive: z.boolean().default(true),
  isFeatured: z.boolean().default(false),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
  seoKeywords: z.string().optional(),
  images: z
    .array(
      z.object({
        url: z.string(),
        altText: z.string().optional(),
        isPrimary: z.boolean().default(false),
        sortOrder: z.number().default(0),
      })
    )
    .optional(),
});

export type ProductFormData = z.infer<typeof productSchema>;

export const categorySchema = z.object({
  name: z.string().min(2, "Tên danh mục phải có ít nhất 2 ký tự"),
  slug: z.string().min(2, "Slug phải có ít nhất 2 ký tự"),
  description: z.string().optional(),
  image: z.string().optional(),
  isActive: z.boolean().default(true),
  sortOrder: z.coerce.number().default(0),
});

export type CategoryFormData = z.infer<typeof categorySchema>;

export const loginSchema = z.object({
  email: z.string().email("Email không hợp lệ"),
  password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
});

export type LoginFormData = z.infer<typeof loginSchema>;
