import { Resend } from "resend";

interface ConsultationEmailData {
  fullName: string;
  phone: string;
  email?: string;
  interestedIn?: string;
  message: string;
  submittedAt: Date;
}

export async function sendConsultationEmail(data: ConsultationEmailData) {
  const apiKey = process.env.RESEND_API_KEY;
  const contactEmail = process.env.CONTACT_EMAIL || "contact@nhatjewerly.com";

  if (!apiKey) {
    console.warn("RESEND_API_KEY is not set. Email notification skipped.");
    return { success: true, warning: "Email skipped due to missing API key" };
  }

  try {
    const resend = new Resend(apiKey);
    const result = await resend.emails.send({
      from: "NHẬT JEWERLY <noreply@nhatjewerly.com>",
      to: [contactEmail],
      subject: `[Tư vấn mới] ${data.fullName} - ${data.phone}`,
      html: `
        <!DOCTYPE html>
        <html lang="vi">
        <head>
          <meta charset="UTF-8">
          <style>
            body { font-family: Arial, sans-serif; color: #1C1917; line-height: 1.6; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #1C1917; color: #FAFAF9; padding: 20px; text-align: center; }
            .header h1 { margin: 0; font-size: 24px; letter-spacing: 2px; }
            .header p { margin: 5px 0 0; color: #A16207; font-size: 12px; letter-spacing: 3px; }
            .content { padding: 30px 0; }
            .field { margin-bottom: 20px; border-bottom: 1px solid #E8ECF0; padding-bottom: 15px; }
            .label { font-size: 12px; color: #78716C; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 5px; }
            .value { font-size: 16px; color: #1C1917; }
            .message-box { background: #FAFAF9; padding: 15px; border-left: 3px solid #A16207; }
            .footer { text-align: center; padding-top: 20px; font-size: 12px; color: #78716C; border-top: 1px solid #E8ECF0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>NHẬT JEWERLY</h1>
              <p>YÊU CẦU TƯ VẤN MỚI</p>
            </div>
            <div class="content">
              <div class="field">
                <div class="label">Họ và tên</div>
                <div class="value">${data.fullName}</div>
              </div>
              <div class="field">
                <div class="label">Số điện thoại</div>
                <div class="value">${data.phone}</div>
              </div>
              ${data.email ? `
              <div class="field">
                <div class="label">Email</div>
                <div class="value">${data.email}</div>
              </div>
              ` : ""}
              ${data.interestedIn ? `
              <div class="field">
                <div class="label">Sản phẩm quan tâm</div>
                <div class="value">${data.interestedIn}</div>
              </div>
              ` : ""}
              <div class="field">
                <div class="label">Nội dung tư vấn</div>
                <div class="message-box">${data.message.replace(/\n/g, "<br>")}</div>
              </div>
              <div class="field">
                <div class="label">Thời gian gửi</div>
                <div class="value">${new Intl.DateTimeFormat("vi-VN", {
                  dateStyle: "full",
                  timeStyle: "short",
                }).format(data.submittedAt)}</div>
              </div>
            </div>
            <div class="footer">
              <p>© NHẬT JEWERLY. Email tự động — vui lòng không trả lời trực tiếp.</p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    return { success: true, data: result };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, error: "Failed to send email" };
  }
}

export const sendConsultationNotification = sendConsultationEmail;
