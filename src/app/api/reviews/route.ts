import { NextResponse } from "next/server";
import {
  CONTACT_RECIPIENT,
  EmailConfigurationError,
  escapeEmailHtml,
  getMailSender,
  getMailTransporter,
} from "@/lib/email";

type ReviewPayload = {
  productName?: unknown;
  productId?: unknown;
  rating?: unknown;
  review?: unknown;
  name?: unknown;
  email?: unknown;
};

function text(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as ReviewPayload;
    const productName = text(payload.productName);
    const productId = text(payload.productId);
    const review = text(payload.review);
    const name = text(payload.name);
    const email = text(payload.email);
    const rating = Number(payload.rating);

    if (!productName || !productId || !review || !name || !email || !Number.isInteger(rating) || rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: "Product, rating, review, name, and email are required." },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Please provide a valid email address." }, { status: 400 });
    }

    const transporter = getMailTransporter();
    const sender = getMailSender();
    await transporter.sendMail({
      from: `"GrabbyTech Review" <${sender}>`,
      to: CONTACT_RECIPIENT,
      replyTo: email,
      subject: `New ${rating}/5 product review: ${productName}`,
      text: [
        `Product: ${productName}`,
        `Product ID: ${productId}`,
        `Rating: ${rating}/5`,
        `Reviewer: ${name}`,
        `Email: ${email}`,
        "",
        review,
      ].join("\n"),
      html: `
        <div style="font-family:Arial,sans-serif;line-height:1.6;color:#111827">
          <h2>New GrabbyTech product review</h2>
          <p><strong>Product:</strong> ${escapeEmailHtml(productName)}</p>
          <p><strong>Product ID:</strong> ${escapeEmailHtml(productId)}</p>
          <p><strong>Rating:</strong> ${rating}/5</p>
          <p><strong>Reviewer:</strong> ${escapeEmailHtml(name)}</p>
          <p><strong>Email:</strong> ${escapeEmailHtml(email)}</p>
          <p><strong>Review:</strong></p>
          <p>${escapeEmailHtml(review).replace(/\n/g, "<br />")}</p>
        </div>
      `,
    });

    return NextResponse.json({ message: "Your review has been submitted successfully." });
  } catch (error) {
    console.error("Review email failed:", error);
    if (error instanceof EmailConfigurationError) {
      return NextResponse.json(
        { error: "Email service is not configured. Add SMTP_USER and SMTP_PASS to the server environment." },
        { status: 503 }
      );
    }
    return NextResponse.json(
      { error: "Unable to submit your review right now. Please try again later." },
      { status: 500 }
    );
  }
}
