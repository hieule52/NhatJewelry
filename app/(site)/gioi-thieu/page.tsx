import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Breadcrumb } from "@/components/seo/Breadcrumb";
import { ConsultationCTA } from "@/components/home/ConsultationCTA";
import { Award, Gem, ShieldCheck, Heart, Sparkles, CheckCircle2 } from "lucide-react";
import { ScrollReveal } from "@/components/ui/motion";

export const metadata: Metadata = {
  title: "Câu Chuyện Thương Hiệu | Giới Thiệu NHẬT JEWERLY",
  description:
    "Tìm hiểu về lịch sử hình thành, nghệ thuật kim hoàn thủ công và triết lý tôn vinh vẻ đẹp vĩnh cửu của thương hiệu trang sức cao cấp NHẬT JEWERLY.",
  keywords: [
    "giới thiệu NHẬT JEWERLY",
    "câu chuyện thương hiệu",
    "kim hoàn cao cấp",
    "chế tác trang sức thủ công",
    "thương hiệu trang sức vàng",
  ],
};

const milestones = [
  {
    year: "Khởi nguồn",
    title: "Tình yêu với nghệ thuật kim hoàn",
    description:
      "Bắt đầu từ một xưởng chế tác thủ công với những nghệ nhân kim hoàn đầy tâm huyết, NHẬT JEWERLY được nuôi dưỡng từ khát vọng tạo nên những món trang sức lưu giữ ký ức và giá trị truyền đời.",
  },
  {
    year: "Phát triển",
    title: "Nâng chuẩn công nghệ & chất lượng",
    description:
      "Đầu tư hệ thống máy móc quang phổ kiểm định hàm lượng vàng chuẩn quốc tế, kết hợp bàn tay tài hoa của nghệ nhân để nâng cao độ tinh xảo trong từng đường nét.",
  },
  {
    year: "Khẳng định",
    title: "Thương hiệu trang sức tin cậy",
    description:
      "Trở thành điểm đến quen thuộc của hàng nghìn khách hàng tìm kiếm trang sức cưới, trang sức phong thủy và vàng tích sản chuẩn mực.",
  },
  {
    year: "Hôm nay",
    title: "Tôn vinh khí chất hiện đại",
    description:
      "Tiếp tục đổi mới sáng tạo, ra mắt những bộ sưu tập trang sức mang hơi thở đương đại nhưng vẫn vẹn nguyên giá trị vĩnh cửu của vàng.",
  },
];

export default function AboutPage() {
  const breadcrumbs = [
    { label: "Trang chủ", href: "/" },
    { label: "Giới thiệu thương hiệu", href: "/gioi-thieu", current: true },
  ];

  return (
    <div className="pt-20 min-h-screen bg-[var(--color-background)]">
      {/* Header Banner */}
      <div className="border-b border-[var(--color-border)] pt-8 pb-8 md:pt-10 md:pb-14 bg-[var(--color-surface)] dark:bg-[#12100E]">
        <div className="container-site">
          <Breadcrumb items={breadcrumbs} />
          <div className="max-w-3xl mt-4">
            <span className="text-xs uppercase tracking-widest text-[var(--color-gold-500)] font-medium block mb-2">
              Về chúng tôi
            </span>
            <h1
              className="text-3xl sm:text-4xl lg:text-5xl text-[var(--color-foreground)] font-normal leading-tight"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Nghệ thuật kim hoàn tôn vinh giá trị trường tồn
            </h1>
            <p className="text-[var(--color-muted-foreground)] text-sm sm:text-base mt-4 leading-relaxed">
              Tại NHẬT JEWERLY, mỗi tuyệt tác trang sức không đơn thuần là một món phụ kiện xa xỉ, mà là sự hội tụ giữa kỹ nghệ thủ công bậc thầy và nguồn cảm hứng bất tận về cái đẹp.
            </p>
          </div>
        </div>
      </div>

      <div className="container-site py-12 md:py-20 space-y-20">
        {/* Story Section with Poster */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <ScrollReveal direction="scale" className="lg:col-span-5 relative">
            <div className="relative aspect-[3/4] w-full border border-[var(--color-border)] overflow-hidden shadow-xl group">
              <Image
                src="/assets/images/poster_coming_doc.png"
                alt="Chế tác trang sức NHẬT JEWERLY"
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                sizes="(max-width: 1024px) 100vw, 40vw"
                priority
              />
            </div>
            <div className="absolute -bottom-6 -right-6 hidden sm:block p-6 bg-[var(--color-card)] border border-[var(--color-border)] shadow-lg max-w-[220px]">
              <div
                className="text-3xl text-[var(--color-gold-500)] font-semibold"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                100%
              </div>
              <div className="text-xs text-[var(--color-muted-foreground)] mt-1">
                Chuẩn hàm lượng tuổi vàng cam kết
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={150} className="lg:col-span-7 space-y-6">
            <span className="text-xs uppercase tracking-widest text-[var(--color-gold-500)] font-medium">
              Triết lý thương hiệu
            </span>
            <h2
              className="text-2xl sm:text-3xl lg:text-4xl text-[var(--color-foreground)] font-normal"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Thổi hồn vào từng gam vàng, gìn giữ từng khoảnh khắc
            </h2>
            <div className="space-y-4 text-sm sm:text-base text-[var(--color-muted-foreground)] leading-relaxed">
              <p>
                Từ khi thành lập, <strong>NHẬT JEWERLY</strong> đã định vị mình là người bạn đồng hành cùng những cột mốc trọng đại nhất trong đời người: từ khoảnh khắc trao nhẫn ước nguyện ngày chung đôi, đến những món quà kỷ niệm trao gửi ân tình gia đình.
              </p>
              <p>
                Chúng tôi tin rằng, vẻ đẹp đích thực của kim hoàn nằm ở sự tỉ mỉ trong từng đường gọt, nét khắc, và sự chuẩn xác tuyệt đối trong định lượng tuổi vàng. Mọi sản phẩm xuất xưởng đều phải vượt qua những tiêu chuẩn kiểm tra nghiêm ngặt trước khi đến tay quý khách.
              </p>
            </div>

            <div className="pt-4 grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-[var(--color-gold-500)] shrink-0" />
                <span className="text-sm font-medium text-[var(--color-foreground)]">Thiết kế độc bản</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-[var(--color-gold-500)] shrink-0" />
                <span className="text-sm font-medium text-[var(--color-foreground)]">Kiểm định minh bạch</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-[var(--color-gold-500)] shrink-0" />
                <span className="text-sm font-medium text-[var(--color-foreground)]">Đá quý tuyển chọn</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-[var(--color-gold-500)] shrink-0" />
                <span className="text-sm font-medium text-[var(--color-foreground)]">Bảo hành trọn đời</span>
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* Core Values */}
        <section className="py-12 border-y border-[var(--color-border)]">
          <ScrollReveal direction="up">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs uppercase tracking-widest text-[var(--color-gold-500)] block mb-2">
                Giá trị cốt lõi
              </span>
              <h2
                className="text-2xl sm:text-3xl text-[var(--color-foreground)] font-normal"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Bốn trụ cột tạo dựng niềm tin
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <ScrollReveal direction="up" staggerIndex={0}>
              <div className="p-6 border border-[var(--color-border)] bg-[var(--color-card)] hover:border-[var(--color-gold-400)] transition-all duration-300 hover:-translate-y-1 h-full">
                <ShieldCheck className="w-8 h-8 text-[var(--color-gold-500)] mb-4" />
                <h3 className="text-base font-semibold mb-2">Uy tín hàng đầu</h3>
                <p className="text-xs text-[var(--color-muted-foreground)] leading-relaxed">
                  Minh bạch trong hàm lượng, trọng lượng và giá cả. Chữ Tín là sinh mệnh của NHẬT JEWERLY.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal direction="up" staggerIndex={1}>
              <div className="p-6 border border-[var(--color-border)] bg-[var(--color-card)] hover:border-[var(--color-gold-400)] transition-all duration-300 hover:-translate-y-1 h-full">
                <Gem className="w-8 h-8 text-[var(--color-gold-500)] mb-4" />
                <h3 className="text-base font-semibold mb-2">Nghệ thuật tinh hoa</h3>
                <p className="text-xs text-[var(--color-muted-foreground)] leading-relaxed">
                  Kết hợp tay nghề thủ công truyền thống với kỹ thuật gia công hiện đại cho đường nét hoàn mỹ.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal direction="up" staggerIndex={2}>
              <div className="p-6 border border-[var(--color-border)] bg-[var(--color-card)] hover:border-[var(--color-gold-400)] transition-all duration-300 hover:-translate-y-1 h-full">
                <Heart className="w-8 h-8 text-[var(--color-gold-500)] mb-4" />
                <h3 className="text-base font-semibold mb-2">Tận tâm phục vụ</h3>
                <p className="text-xs text-[var(--color-muted-foreground)] leading-relaxed">
                  Mỗi khách hàng là một câu chuyện riêng biệt. Chúng tôi lắng nghe để mang đến sự hài lòng cao nhất.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal direction="up" staggerIndex={3}>
              <div className="p-6 border border-[var(--color-border)] bg-[var(--color-card)] hover:border-[var(--color-gold-400)] transition-all duration-300 hover:-translate-y-1 h-full">
                <Sparkles className="w-8 h-8 text-[var(--color-gold-500)] mb-4" />
                <h3 className="text-base font-semibold mb-2">Đồng hành trọn đời</h3>
                <p className="text-xs text-[var(--color-muted-foreground)] leading-relaxed">
                  Chăm sóc, đánh bóng, làm mới và dịch vụ hậu mãi lâu dài để món trang sức mãi sáng ngời như thuở đầu.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Brand Timeline */}
        <section>
          <ScrollReveal direction="up">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="text-xs uppercase tracking-widest text-[var(--color-gold-500)] block mb-2">
                Hành trình
              </span>
              <h2
                className="text-2xl sm:text-3xl text-[var(--color-foreground)] font-normal"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Chặng đường kiến tạo & khẳng định
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {milestones.map((m, idx) => (
              <ScrollReveal key={idx} direction="up" staggerIndex={idx}>
                <div className="relative flex flex-col h-full">
                  <div className="text-2xl font-bold text-[var(--color-gold-500)] mb-2" style={{ fontFamily: "var(--font-heading)" }}>
                    {m.year}
                  </div>
                  <div className="h-0.5 w-full bg-[var(--color-gold-300)] dark:bg-[var(--color-gold-800)] mb-4" />
                  <h3 className="text-base font-semibold text-[var(--color-foreground)] mb-2">
                    {m.title}
                  </h3>
                  <p className="text-xs text-[var(--color-muted-foreground)] leading-relaxed">
                    {m.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* Workshop Image Banner */}
        <ScrollReveal direction="up">
          <section className="relative overflow-hidden border border-[var(--color-border)] p-8 sm:p-12 bg-[var(--color-charcoal-900)] text-white text-center">
            <div className="max-w-2xl mx-auto relative z-10 space-y-4">
              <Award className="w-10 h-10 text-[var(--color-gold-400)] mx-auto mb-2" />
              <h3
                className="text-2xl sm:text-3xl text-white font-normal"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Đặt niềm tin vào sự hoàn mỹ của NHẬT JEWERLY
              </h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                Hãy ghé thăm cửa hàng hoặc để lại thông tin để các chuyên viên tư vấn kim hoàn của chúng tôi phục vụ bạn một cách chu đáo nhất.
              </p>
              <div className="pt-4">
                <Link
                  href="/lien-he"
                  className="btn-gold inline-flex py-3 px-8 text-xs font-semibold uppercase tracking-wider"
                >
                  Gửi yêu cầu tư vấn ngay
                </Link>
              </div>
            </div>
          </section>
        </ScrollReveal>
      </div>

      {/* Footer CTA */}
      <ConsultationCTA />
    </div>
  );
}
