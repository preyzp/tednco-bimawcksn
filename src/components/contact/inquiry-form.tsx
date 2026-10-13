"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { AlertCircle, ArrowUpRight, CheckCircle2, X } from "lucide-react";
import { getCopy } from "@/i18n/translations";
import type { Locale } from "@/i18n/routing";
import { isValidEmail } from "@/lib/email";

type IndonesianRegion = { id: string; name: string };
const REGION_API = "https://www.emsifa.com/api-wilayah-indonesia/v2";

async function fetchRegions(path: string): Promise<IndonesianRegion[]> {
  const response = await fetch(`${REGION_API}/${path}`, { headers: { Accept: "application/json" } });
  if (!response.ok) throw new Error("Location data is unavailable");
  const result: unknown = await response.json();
  if (!result || typeof result !== "object" || !("data" in result) || !Array.isArray(result.data)) {
    throw new Error("Location data has an unexpected format");
  }
  return result.data.filter((item): item is IndonesianRegion => (
    Boolean(item)
    && typeof item === "object"
    && "id" in item
    && typeof item.id === "string"
    && "name" in item
    && typeof item.name === "string"
  ));
}

function readFormValues(form: HTMLFormElement) {
  const formData = new FormData(form);
  const values = Object.fromEntries(
    [...formData.entries()].map(([key, value]) => [key, typeof value === "string" ? value : ""]),
  );
  const locationParts = [values.location.trim(), values.locationRegency, values.locationProvince]
    .map((part) => part?.trim())
    .filter(Boolean);
  values.location = locationParts.join(", ").slice(0, 160);
  return values;
}

type FieldName = "fullName" | "email" | "service" | "message";
type Errors = Partial<Record<FieldName, string>>;
type SubmissionState = "idle" | "sending" | "success" | "error";
type ToastKind = "success" | "error";

const errorIds: Record<FieldName, string> = {
  fullName: "inquiry-name-error",
  email: "inquiry-email-error",
  service: "inquiry-service-error",
  message: "inquiry-message-error",
};

function validate(values: Record<string, string>, locale: Locale): Errors {
  const errors: Errors = {};
  const e = getCopy(locale).errors;
  if (!values.fullName.trim()) errors.fullName = e.name;
  else if (values.fullName.trim().length > 120) errors.fullName = e.nameLength;
  if (!values.email.trim()) errors.email = e.email;
  else if (!isValidEmail(values.email)) {
    errors.email = e.emailValid;
  }
  if (!["Wedding Photography", "Wedding Film", "Photography & Film"].includes(values.service)) {
    errors.service = e.service;
  }
  if (!values.message.trim()) errors.message = e.message;
  else if (values.message.trim().length > 5000) errors.message = e.messageLength;
  return errors;
}

export default function InquiryForm({ locale, whatsappNumber }: { locale: Locale; whatsappNumber: string }) {
  const t = getCopy(locale);
  const formRef = useRef<HTMLFormElement>(null);
  const provincesLoaded = useRef(false);
  const provincesLoading = useRef(false);
  const regencyRequestId = useRef(0);
  const [state, setState] = useState<SubmissionState>("idle");
  const [toast, setToast] = useState<ToastKind | null>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [provinces, setProvinces] = useState<IndonesianRegion[]>([]);
  const [regencies, setRegencies] = useState<IndonesianRegion[]>([]);
  const [provinceId, setProvinceId] = useState("");
  const [regencyId, setRegencyId] = useState("");
  const [loadingProvinces, setLoadingProvinces] = useState(false);
  const [loadingRegencies, setLoadingRegencies] = useState(false);
  const [locationLoadFailed, setLocationLoadFailed] = useState(false);

  useEffect(() => {
    if (!toast) return;
    const timeout = window.setTimeout(() => setToast(null), 6000);
    return () => window.clearTimeout(timeout);
  }, [toast]);

  async function loadProvinces() {
    if (provincesLoaded.current || provincesLoading.current) return;
    provincesLoading.current = true;
    setLoadingProvinces(true);
    setLocationLoadFailed(false);
    try {
      const result = await fetchRegions("provinces.json");
      setProvinces(result);
      provincesLoaded.current = true;
    } catch {
      setLocationLoadFailed(true);
    } finally {
      provincesLoading.current = false;
      setLoadingProvinces(false);
    }
  }

  async function selectProvince(id: string) {
    const requestId = ++regencyRequestId.current;
    setProvinceId(id);
    setRegencyId("");
    setRegencies([]);
    setLocationLoadFailed(false);
    if (!id) {
      setLoadingRegencies(false);
      return;
    }

    setLoadingRegencies(true);
    try {
      const result = await fetchRegions(`regencies/${encodeURIComponent(id)}.json`);
      if (requestId === regencyRequestId.current) setRegencies(result);
    } catch {
      if (requestId === regencyRequestId.current) setLocationLoadFailed(true);
    } finally {
      if (requestId === regencyRequestId.current) setLoadingRegencies(false);
    }
  }

  async function submitInquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (state === "sending") return;

    const form = event.currentTarget;
    setToast(null);
    const values = readFormValues(form);
    const nextErrors = validate(values, locale);
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
        setToast("error");
        return;
      }
      form.reset();
      setProvinceId("");
      setRegencyId("");
      setRegencies([]);
      regencyRequestId.current += 1;
      setErrors({});
      setState("success");
      setToast("success");
    } catch {
      setState("error");
      setToast("error");
    }
  }

  function sendViaWhatsApp() {
    const form = formRef.current;
    if (!form) return;

    const values = readFormValues(form);
    const nextErrors = validate(values, locale);
    setErrors(nextErrors);

    const firstError = Object.keys(nextErrors)[0] as FieldName | undefined;
    if (firstError) {
      document.getElementById(firstError)?.focus();
      return;
    }

    const serviceIndex = ["Wedding Photography", "Wedding Film", "Photography & Film"].indexOf(values.service);
    const message = locale === "id"
      ? [
          "Halo Bima, saya ingin bertanya tentang layanan pernikahan.", "",
          `Nama: ${values.fullName.trim()}`,
          `Email: ${values.email.trim()}`,
          `Layanan: ${t.serviceOptions[serviceIndex]}`,
          `Tanggal Pernikahan: ${values.weddingDate || "Belum ditentukan"}`,
          `Lokasi: ${values.location.trim() || "Belum ditentukan"}`,
          `WhatsApp: ${values.whatsapp.trim() || "Belum ditentukan"}`,
          "", "Pesan:", values.message.trim(),
        ].join("\n")
      : [
          "Hello Bima, I'd like to inquire about your wedding services.", "",
          `Name: ${values.fullName.trim()}`,
          `Email: ${values.email.trim()}`,
          `Service: ${t.serviceOptions[serviceIndex]}`,
          `Wedding Date: ${values.weddingDate || "Not specified"}`,
          `Location: ${values.location.trim() || "Not specified"}`,
          `WhatsApp: ${values.whatsapp.trim() || "Not specified"}`,
          "", "Message:", values.message.trim(),
        ].join("\n");

    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  }

  function describedBy(field: FieldName, hint?: string) {
    return [hint, errors[field] ? errorIds[field] : undefined].filter(Boolean).join(" ") || undefined;
  }

  return (
    <div className="inquiry-form-wrap">
      <form ref={formRef} className="inquiry-form" onSubmit={submitInquiry} noValidate>
        <fieldset disabled={state === "sending"}>
          <legend className="inquiry-legend">{t.formLegend}</legend>
          <div className="inquiry-fields">
            <div className="inquiry-field">
              <label htmlFor="fullName">{t.fullName} <span aria-hidden="true">*</span></label>
              <input id="fullName" name="fullName" autoComplete="name" required maxLength={120} aria-invalid={Boolean(errors.fullName)} aria-describedby={describedBy("fullName")} />
              {errors.fullName && <p className="inquiry-field-error" id={errorIds.fullName}>{errors.fullName}</p>}
            </div>
            <div className="inquiry-field">
              <label htmlFor="email">{t.email} <span aria-hidden="true">*</span></label>
              <input id="email" name="email" type="email" autoComplete="email" required maxLength={254} aria-invalid={Boolean(errors.email)} aria-describedby={describedBy("email")} />
              {errors.email && <p className="inquiry-field-error" id={errorIds.email}>{errors.email}</p>}
            </div>
            <div className="inquiry-field">
              <label htmlFor="service">{t.service} <span aria-hidden="true">*</span></label>
              <select id="service" name="service" required defaultValue="" aria-invalid={Boolean(errors.service)} aria-describedby={describedBy("service")}>
                <option value="" disabled>{t.selectService}</option>
                <option value="Wedding Photography">{t.serviceOptions[0]}</option>
                <option value="Wedding Film">{t.serviceOptions[1]}</option>
                <option value="Photography & Film">{t.serviceOptions[2]}</option>
              </select>
              {errors.service && <p className="inquiry-field-error" id={errorIds.service}>{errors.service}</p>}
            </div>
            <div className="inquiry-field">
              <label htmlFor="weddingDate">{t.date} <span className="inquiry-optional">{t.optional}</span></label>
              <input id="weddingDate" name="weddingDate" type="date" />
            </div>
            <div className="inquiry-field inquiry-field--wide">
              <label htmlFor="location">{t.location} <span className="inquiry-optional">{t.optional}</span></label>
              <input id="location" name="location" autoComplete="address-level2" maxLength={90} placeholder={t.city} aria-describedby="inquiry-location-hint" />
              <div className="inquiry-region-selects">
                <div>
                  <label htmlFor="location-province">{t.province}</label>
                  <select id="location-province" value={provinceId} onFocus={() => void loadProvinces()} onChange={(event) => void selectProvince(event.currentTarget.value)}>
                    <option value="">{loadingProvinces ? t.locationLoading : t.selectProvince}</option>
                    {provinces.map((province) => <option key={province.id} value={province.id}>{province.name}</option>)}
                  </select>
                </div>
                <div>
                  <label htmlFor="location-regency">{t.cityRegency}</label>
                  <select id="location-regency" value={regencyId} onChange={(event) => setRegencyId(event.currentTarget.value)} disabled={!provinceId || loadingRegencies || regencies.length === 0}>
                    <option value="">{loadingRegencies ? t.locationLoading : t.selectCityRegency}</option>
                    {regencies.map((regency) => <option key={regency.id} value={regency.id}>{regency.name}</option>)}
                  </select>
                </div>
              </div>
              <input type="hidden" name="locationProvince" value={provinces.find((province) => province.id === provinceId)?.name ?? ""} />
              <input type="hidden" name="locationRegency" value={regencies.find((regency) => regency.id === regencyId)?.name ?? ""} />
              <p className="inquiry-field-hint" id="inquiry-location-hint">{t.locationRegionHint}</p>
              {locationLoadFailed && <p className="inquiry-field-hint inquiry-location-error" role="status">{t.locationLoadFailed}</p>}
            </div>
            <div className="inquiry-field inquiry-field--wide">
              <label htmlFor="whatsapp">{t.whatsappNumber} <span className="inquiry-optional">{t.optional}</span></label>
              <input id="whatsapp" name="whatsapp" type="tel" autoComplete="tel" maxLength={40} placeholder={t.countryCode} />
            </div>
            <div className="inquiry-field inquiry-field--wide">
              <label htmlFor="message">{t.message} <span aria-hidden="true">*</span></label>
              <textarea id="message" name="message" required rows={5} maxLength={5000} placeholder={t.messagePlaceholder} aria-invalid={Boolean(errors.message)} aria-describedby={describedBy("message", "inquiry-message-hint")} />
              <p className="inquiry-field-hint" id="inquiry-message-hint">{t.sentences}</p>
              {errors.message && <p className="inquiry-field-error" id={errorIds.message}>{errors.message}</p>}
            </div>
            <div className="inquiry-honeypot" aria-hidden="true">
              <label htmlFor="website">{t.leaveEmpty}</label>
              <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
            </div>
          </div>
          <div className="inquiry-actions">
          <button className="inquiry-submit" type="submit" disabled={state === "sending"}>
            {state === "sending" ? t.sending : t.submit}
            {state === "sending" ? <span className="inquiry-spinner" aria-hidden="true" /> : <ArrowUpRight size={17} aria-hidden="true" />}
          </button>
          <button className="inquiry-submit inquiry-submit--whatsapp" type="button" onClick={sendViaWhatsApp} disabled={state === "sending"}>
            <svg className="whatsapp-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M20.4 11.7a8.4 8.4 0 0 1-12.3 7.4L3 20.3l1.2-4.9a8.4 8.4 0 1 1 16.2-3.7Z" />
              <path d="M8.3 7.9c.2-.4.4-.5.7-.5h.5c.2 0 .4.1.5.4l.8 1.8c.1.2.1.4 0 .6l-.5.7c-.1.2-.2.3-.1.5.2.4.7 1 1.3 1.6.6.5 1.3.8 1.7.9.2.1.4 0 .5-.1l.7-.8c.2-.2.3-.2.5-.1l1.8.9c.2.1.4.2.4.4 0 .3-.2 1.1-.7 1.6-.5.4-1.1.6-1.8.5-.7-.1-1.5-.3-2.4-.8-.9-.5-1.9-1.2-2.7-2.1-.7-.8-1.3-1.6-1.6-2.3-.3-.6-.4-1.3-.2-1.9.1-.5.6-1.1.8-1.3Z" />
            </svg>
            {t.sendViaWhatsApp}
          </button>
          </div>
        </fieldset>
        <p className={`inquiry-status inquiry-status--${state}`} role="status" aria-live="polite">
          {state === "sending" && t.sendingStatus}
        </p>
      </form>
      {toast && (
        <div className={`inquiry-toast inquiry-toast--${toast}`} role={toast === "error" ? "alert" : "status"} aria-live={toast === "error" ? "assertive" : "polite"}>
          {toast === "success" ? <CheckCircle2 size={20} aria-hidden="true" /> : <AlertCircle size={20} aria-hidden="true" />}
          <p>{toast === "success" ? t.success : t.failed}</p>
          <button type="button" aria-label={t.dismissNotification} onClick={() => setToast(null)}>
            <X size={18} aria-hidden="true" />
          </button>
        </div>
      )}
    </div>
  );
}
