"use client";

import { useState, type FormEvent } from "react";

type FieldName = "fullName" | "email" | "service" | "message";
type Errors = Partial<Record<FieldName, string>>;
type SubmissionState = "idle" | "sending" | "success" | "error";

const errorIds: Record<FieldName, string> = {
  fullName: "inquiry-name-error",
  email: "inquiry-email-error",
  service: "inquiry-service-error",
  message: "inquiry-message-error",
};

function validate(values: Record<string, string>): Errors {
  const errors: Errors = {};
  if (!values.fullName.trim()) errors.fullName = "Please enter your name.";
  else if (values.fullName.trim().length > 120) errors.fullName = "Please keep your name under 120 characters.";
  if (!values.email.trim()) errors.email = "Please enter your email address.";
  else if (values.email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }
  if (!["Wedding Photography", "Wedding Film", "Photography & Film"].includes(values.service)) {
    errors.service = "Please select a service.";
  }
  if (!values.message.trim()) errors.message = "Please tell me a little about your day.";
  else if (values.message.trim().length > 5000) errors.message = "Please keep your message under 5,000 characters.";
  return errors;
}

export default function InquiryForm({ configured }: { configured: boolean }) {
  const [state, setState] = useState<SubmissionState>("idle");
  const [errors, setErrors] = useState<Errors>({});

  async function submitInquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!configured || state === "sending") return;

    const form = event.currentTarget;
    const formData = new FormData(form);
    const values = Object.fromEntries(
      [...formData.entries()].map(([key, value]) => [key, typeof value === "string" ? value : ""]),
    );
    const nextErrors = validate(values);
    setErrors(nextErrors);
    setState("idle");

    const firstError = Object.keys(nextErrors)[0] as FieldName | undefined;
    if (firstError) {
      document.getElementById(firstError)?.focus();
      return;
    }

    setState("sending");
    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const result: unknown = await response.json();
      if (!response.ok || !result || typeof result !== "object" || !("ok" in result) || result.ok !== true) {
        setState("error");
        return;
      }
      form.reset();
      setErrors({});
      setState("success");
    } catch {
      setState("error");
    }
  }

  function describedBy(field: FieldName, hint?: string) {
    return [hint, errors[field] ? errorIds[field] : undefined].filter(Boolean).join(" ") || undefined;
  }

  return (
    <div className="inquiry-form-wrap">
      {!configured && (
        <p className="inquiry-config-notice" role="status">
          The inquiry form is temporarily unavailable. Please check back soon.
        </p>
      )}
      <form className="inquiry-form" onSubmit={submitInquiry} noValidate>
        <fieldset disabled={!configured || state === "sending"}>
          <legend className="inquiry-legend">Your wedding plans</legend>
          <div className="inquiry-fields">
            <div className="inquiry-field">
              <label htmlFor="fullName">Full name <span aria-hidden="true">*</span></label>
              <input id="fullName" name="fullName" autoComplete="name" required maxLength={120} aria-invalid={Boolean(errors.fullName)} aria-describedby={describedBy("fullName")} />
              {errors.fullName && <p className="inquiry-field-error" id={errorIds.fullName}>{errors.fullName}</p>}
            </div>
            <div className="inquiry-field">
              <label htmlFor="email">Email address <span aria-hidden="true">*</span></label>
              <input id="email" name="email" type="email" autoComplete="email" required maxLength={254} aria-invalid={Boolean(errors.email)} aria-describedby={describedBy("email")} />
              {errors.email && <p className="inquiry-field-error" id={errorIds.email}>{errors.email}</p>}
            </div>
            <div className="inquiry-field">
              <label htmlFor="service">Service <span aria-hidden="true">*</span></label>
              <select id="service" name="service" required defaultValue="" aria-invalid={Boolean(errors.service)} aria-describedby={describedBy("service")}>
                <option value="" disabled>Select a service</option>
                <option>Wedding Photography</option>
                <option>Wedding Film</option>
                <option>Photography &amp; Film</option>
              </select>
              {errors.service && <p className="inquiry-field-error" id={errorIds.service}>{errors.service}</p>}
            </div>
            <div className="inquiry-field">
              <label htmlFor="weddingDate">Wedding date <span className="inquiry-optional">Optional</span></label>
              <input id="weddingDate" name="weddingDate" type="date" />
            </div>
            <div className="inquiry-field">
              <label htmlFor="location">Wedding location <span className="inquiry-optional">Optional</span></label>
              <input id="location" name="location" autoComplete="address-level2" maxLength={160} placeholder="City or venue" />
            </div>
            <div className="inquiry-field">
              <label htmlFor="whatsapp">WhatsApp number <span className="inquiry-optional">Optional</span></label>
              <input id="whatsapp" name="whatsapp" type="tel" autoComplete="tel" maxLength={40} placeholder="Include your country code" />
            </div>
            <div className="inquiry-field inquiry-field--wide">
              <label htmlFor="message">Tell me about your day <span aria-hidden="true">*</span></label>
              <textarea id="message" name="message" required rows={5} maxLength={5000} placeholder="The people, the place, and what you’re looking forward to…" aria-invalid={Boolean(errors.message)} aria-describedby={describedBy("message", "inquiry-message-hint")} />
              <p className="inquiry-field-hint" id="inquiry-message-hint">A few sentences is plenty.</p>
              {errors.message && <p className="inquiry-field-error" id={errorIds.message}>{errors.message}</p>}
            </div>
            <div className="inquiry-honeypot" aria-hidden="true">
              <label htmlFor="website">Leave this field empty</label>
              <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
            </div>
          </div>
          <button className="inquiry-submit" type="submit" disabled={!configured || state === "sending"}>
            {state === "sending" ? "SENDING…" : "SEND YOUR INQUIRY"}
            {state === "sending" ? <span className="inquiry-spinner" aria-hidden="true" /> : <span aria-hidden="true">↗</span>}
          </button>
        </fieldset>
        <p className={`inquiry-status inquiry-status--${state}`} role={state === "error" ? "alert" : "status"} aria-live={state === "error" ? "assertive" : "polite"}>
          {state === "success" && "Thank you for reaching out. Your inquiry has been sent."}
          {state === "error" && "Something went wrong. Please try again."}
          {state === "sending" && "Sending your inquiry securely…"}
        </p>
      </form>
    </div>
  );
}
