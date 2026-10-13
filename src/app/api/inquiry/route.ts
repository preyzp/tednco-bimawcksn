import { NextResponse } from "next/server";
import { isValidEmail } from "@/lib/email";

const services = ["Wedding Photography", "Wedding Film", "Photography & Film"] as const;
const MAX_BODY_BYTES = 16_000;

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

function sameOriginReferer(request: Request) {
  const origin = request.headers.get("origin");
  const referer = request.headers.get("referer");
  if (!origin || !referer) return undefined;
  try {
    return new URL(referer).origin === new URL(origin).origin ? referer : undefined;
  } catch {
    return undefined;
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
  if (!isValidEmail(email)) return errorResponse("Please enter a valid email address.", 400);
  if (!services.includes(service as (typeof services)[number])) return errorResponse("Please select a valid service.", 400);
  if (!validDate(weddingDate)) return errorResponse("Please enter a valid wedding date.", 400);

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
  const referer = sameOriginReferer(request);
  try {
    const response = await fetch("https://formspree.io/f/mgaonkpl", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        ...(referer ? { Referer: referer } : {}),
      },
      body: JSON.stringify({
        name: inquiry.fullName,
        email: inquiry.email,
        service: inquiry.service,
        wedding_date: inquiry.weddingDate,
        wedding_location: inquiry.location,
        whatsapp: inquiry.whatsapp,
        message: inquiry.message,
        _subject: "New Wedding Inquiry — Bima Wicksn",
      }),
      cache: "no-store",
    });
    if (!response.ok) {
      return response.status === 400 || response.status === 422
        ? errorResponse("Please check the form and try again.", 400)
        : errorResponse("Something went wrong. Please try again.", 502);
    }
    const result: unknown = await response.json();
    if (!result || typeof result !== "object" || !("ok" in result) || result.ok !== true) {
      return errorResponse("Something went wrong. Please try again.", 502);
    }
  } catch {
    return errorResponse("Something went wrong. Please try again.", 502);
  }

  return NextResponse.json({ ok: true }, { headers: { "Cache-Control": "no-store" } });
}

