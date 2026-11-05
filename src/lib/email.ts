import nodemailer from "nodemailer";

const SMTP_HOST = "smtp.gmail.com";
const SMTP_PORT = 465;

export class EmailConfigurationError extends Error {
  constructor() {
    super("SMTP_USER and SMTP_PASS are not configured");
    this.name = "EmailConfigurationError";
  }
}

export const CONTACT_RECIPIENT =
  process.env.CONTACT_RECIPIENT || "Contact@grabbytech.com";

export function escapeEmailHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function getMailTransporter() {
  const host = process.env.SMTP_HOST || SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || SMTP_PORT);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!user || !pass) {
    throw new EmailConfigurationError();
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });
}

export function getMailSender() {
  const sender = process.env.SMTP_USER;

  if (!sender || !process.env.SMTP_PASS) {
    throw new EmailConfigurationError();
  }

  return sender;
}
