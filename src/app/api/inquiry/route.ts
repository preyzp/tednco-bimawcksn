import { createHmac } from "node:crypto";
import { NextResponse } from "next/server";

const services = ["Wedding Photography", "Wedding Film", "Photography & Film"] as const;
const MAX_BODY_BYTES = 16_000;
const RATE_LIMIT = 5;
const WINDOW_SECONDS = 600;

type Inquiry = {
  fullName: string;
  email: string;
  service: (typeof services)[number];
  weddingDate: string;
  location: string;
  whatsapp: string;
  message: string;
  website: string;
};

function errorResponse(message: string, status: number) {
  return NextResponse.json({ error: message }, { status, headers: { "Cache-Control": "no-store" } });
}

function cleanString(value: unknown, maxLength: number): string | null {
  if (typeof value !== "string") return null;
  const result = value.trim();
  return result.length <= maxLength ? result : null;
}

function validDate(value: string) {
  if (!value) return true;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T00:00:00.000Z`);
  return !Number.isNaN(date.valueOf()) && date.toISOString().slice(0, 10) === value;
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return entities[character];
  });
}

async function allowRequest(request: Request) {
  const redisUrl = process.env.UPSTASH_REDIS_REST_URL?.trim();
  const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN?.trim();
  if (!redisUrl || !redisToken) return false;

  const ip = request.headers.get("x-real-ip")?.trim()
    || request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  if (!ip) return false;

  const ipHash = createHmac("sha256", redisToken).update(ip).digest("hex");
  const key = `bima:inquiry:${ipHash}`;

  try {
    const response = await fetch(`${redisUrl.replace(/\/+$/, "")}/pipeline`, {
      method: "POST",
      headers: { Authorization: `Bearer ${redisToken}`, "Content-Type": "application/json" },
      body: JSON.stringify([["INCR", key], ["EXPIRE", key, String(WINDOW_SECONDS), "NX"]]),
      cache: "no-store",
    });
    if (!response.ok) return false;
    const result: unknown = await response.json();
    if (!Array.isArray(result) || typeof result[0]?.result !== "number") return false;
    return result[0].result <= RATE_LIMIT;
  } catch {
    return false;
  }
}

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > MAX_BODY_BYTES) return errorResponse("The inquiry is too large.", 413);

  let input: unknown;
  try {
    const rawBody = await request.text();
    if (new TextEncoder().encode(rawBody).byteLength > MAX_BODY_BYTES) {
      return errorResponse("The inquiry is too large.", 413);
    }
    input = JSON.parse(rawBody) as unknown;
  } catch {
    return errorResponse("Please check the form and try again.", 400);
  }
  if (!input || typeof input !== "object" || Array.isArray(input)) {
    return errorResponse("Please check the form and try again.", 400);
  }

  const values = input as Record<string, unknown>;
  const fullName = cleanString(values.fullName, 120);
  const email = cleanString(values.email, 254)?.toLowerCase() ?? null;
  const service = cleanString(values.service, 40);
  const weddingDate = cleanString(values.weddingDate === undefined ? "" : values.weddingDate, 10);
  const location = cleanString(values.location === undefined ? "" : values.location, 160);
  const whatsapp = cleanString(values.whatsapp === undefined ? "" : values.whatsapp, 40);
  const message = cleanString(values.message, 5000);
  const website = cleanString(values.website, 200);

  if (website) return errorResponse("Please submit the form without links or automated fields.", 400);
  if (fullName === null || email === null || service === null || weddingDate === null || location === null || whatsapp === null || message === null) {
    return errorResponse("Please complete the required fields and check their length.", 400);
  }
  if (!fullName || !email || !service || !message) return errorResponse("Please complete the required fields.", 400);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return errorResponse("Please enter a valid email address.", 400);
  if (!services.includes(service as (typeof services)[number])) return errorResponse("Please select a valid service.", 400);
  if (!validDate(weddingDate)) return errorResponse("Please enter a valid wedding date.", 400);

  const apiKey = process.env.RESEND_API_KEY?.trim();
  const recipient = process.env.CONTACT_EMAIL_TO?.trim();
  const sender = process.env.CONTACT_EMAIL_FROM?.trim();
  if (!apiKey || !recipient || !sender) {
    return errorResponse("Email inquiries are not configured yet. Please try another contact option.", 503);
  }
  if (!await allowRequest(request)) {
    return errorResponse(
      process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
        ? "We could not verify this submission. Please try again later."
        : "Email inquiries are not available yet. Please try another contact option.",
      process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN ? 429 : 503,
    );
  }

  const inquiry: Inquiry = {
    fullName,
    email,
    service: service as (typeof services)[number],
    weddingDate,
    location,
    whatsapp,
    message,
    website: website ?? "",
  };
  const safeName = inquiry.fullName.replace(/[\r\n]+/g, " ");
  const optionalLines = [
    inquiry.weddingDate ? `Wedding date: ${inquiry.weddingDate}` : "",
    inquiry.location ? `Wedding location: ${inquiry.location}` : "",
    inquiry.whatsapp ? `WhatsApp number: ${inquiry.whatsapp}` : "",
  ].filter(Boolean);
  const text = [
    `Name: ${inquiry.fullName}`,
    `Email: ${inquiry.email}`,
    `Requested service: ${inquiry.service}`,
    ...optionalLines,
    "",
    "Message:",
    inquiry.message,
  ].join("\n");
  const html = `<h1>New wedding inquiry</h1><p><strong>Client name:</strong> ${escapeHtml(inquiry.fullName)}</p><p><strong>Email:</strong> ${escapeHtml(inquiry.email)}</p><p><strong>Requested service:</strong> ${escapeHtml(inquiry.service)}</p>${inquiry.weddingDate ? `<p><strong>Wedding date:</strong> ${escapeHtml(inquiry.weddingDate)}</p>` : ""}${inquiry.location ? `<p><strong>Wedding location:</strong> ${escapeHtml(inquiry.location)}</p>` : ""}${inquiry.whatsapp ? `<p><strong>WhatsApp number:</strong> ${escapeHtml(inquiry.whatsapp)}</p>` : ""}<h2>Message</h2><p style="white-space:pre-wrap">${escapeHtml(inquiry.message)}</p>`;

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: sender,
        to: [recipient],
        reply_to: inquiry.email,
        subject: `New Wedding Inquiry — ${safeName}`,
        html,
        text,
      }),
      cache: "no-store",
    });
    if (!response.ok) return errorResponse("Something went wrong. Please try again.", 502);
  } catch {
    return errorResponse("Something went wrong. Please try again.", 502);
  }

  return NextResponse.json({ ok: true }, { headers: { "Cache-Control": "no-store" } });
}
