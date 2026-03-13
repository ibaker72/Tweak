interface NotificationParams {
  to: string;
  subject: string;
  heading: string;
  body: string;
  ctaLabel?: string;
  ctaUrl?: string;
}

export async function sendNotification(params: NotificationParams): Promise<boolean> {
  const key = process.env.RESEND_API_KEY;
  if (!key || key === "re_xxxxxxxxxxxx") {
    console.log(`\n📧 NOTIFICATION (dev mode)\nTo: ${params.to}\nSubject: ${params.subject}\n${params.body}\n`);
    return false;
  }

  try {
    const { Resend } = await import("resend");
    const resend = new Resend(key);

    await resend.emails.send({
      from: "Tweak & Build <noreply@tweakandbuild.com>",
      to: [params.to],
      subject: params.subject,
      html: buildHtml(params),
    });
    return true;
  } catch (err) {
    console.error("Notification send failed:", err);
    return false;
  }
}

function buildHtml(params: NotificationParams): string {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#0a0a0a;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif">
  <div style="max-width:520px;margin:0 auto;padding:40px 24px">
    <div style="margin-bottom:32px">
      <span style="font-size:17px;font-weight:800;color:#fff;letter-spacing:-0.03em">
        Tweak<span style="color:#C8FF00">&amp;</span>Build
      </span>
    </div>
    <div style="background:#141414;border:1px solid rgba(255,255,255,0.06);border-radius:16px;padding:32px 28px">
      <h1 style="margin:0 0 16px;font-size:20px;font-weight:700;color:#fff;letter-spacing:-0.02em">${params.heading}</h1>
      <div style="font-size:14px;line-height:1.6;color:#a0a0a0">${params.body}</div>
      ${params.ctaLabel && params.ctaUrl ? `
      <div style="margin-top:24px">
        <a href="${params.ctaUrl}" style="display:inline-block;background:#C8FF00;color:#0a0a0a;padding:10px 20px;border-radius:8px;text-decoration:none;font-size:13px;font-weight:600">${params.ctaLabel}</a>
      </div>` : ""}
    </div>
    <div style="margin-top:24px;text-align:center;font-size:11px;color:#555">
      <a href="${process.env.NEXT_PUBLIC_SITE_URL || "https://tweakandbuild.com"}" style="color:#555;text-decoration:none">tweakandbuild.com</a>
    </div>
  </div>
</body>
</html>`.trim();
}
