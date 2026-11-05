import { NextResponse } from "next/server";
import {
  CONTACT_RECIPIENT,
  EmailConfigurationError,
  escapeEmailHtml,
  getMailSender,
  getMailTransporter,
} from "@/lib/email";

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  subject?: unknown;
  message?: unknown;
};

function text(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as ContactPayload;
    const name = text(payload.name);
    const email = text(payload.email);
    const subject = text(payload.subject);
    const message = text(payload.message);

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "Name, email, subject, and message are required." },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Please provide a valid email address." }, { status: 400 });
    }

    const transporter = getMailTransporter();
    const sender = getMailSender();
    await transporter.sendMail({
      from: `"GrabbyTech Contact" <${sender}>`,
      to: CONTACT_RECIPIENT,
      replyTo: email,
      subject: `Contact form: ${subject}`,
      text: [`Name: ${name}`, `Email: ${email}`, `Subject: ${subject}`, "", message].join("\n"),
      html: `
        <div style="font-family:Arial,sans-serif;line-height:1.6;color:#111827">
          <h2>New GrabbyTech contact message</h2>
          <p><strong>Name:</strong> ${escapeEmailHtml(name)}</p>
          <p><strong>Email:</strong> ${escapeEmailHtml(email)}</p>
          <p><strong>Subject:</strong> ${escapeEmailHtml(subject)}</p>
          <p><strong>Message:</strong></p>
          <p>${escapeEmailHtml(message).replace(/\n/g, "<br />")}</p>
        </div>
      `,
    });

    return NextResponse.json({ message: "Your message has been sent successfully." });
  } catch (error) {
    console.error("Contact email failed:", error);
    if (error instanceof EmailConfigurationError) {
      return NextResponse.json(
        { error: "Email service is not configured. Add SMTP_USER and SMTP_PASS to the server environment." },
        { status: 503 }
      );
    }
    return NextResponse.json(
      { error: "Unable to send your message right now. Please try again later." },
      { status: 500 }
    );
  }
}
