# Formspree wedding inquiries

The contact form sends validated submissions from `/api/inquiry` to the Formspree form `mgaonkpl`. The Formspree endpoint is used server-side, so no private credential is required in the browser. The client is told the inquiry succeeded only after Formspree returns a successful JSON response.

## Dashboard protections

In the Formspree project for this form:

- Keep Formspree's automatic spam filtering enabled, and mark spam submissions as spam so its filter can learn from them.
- Set **Restrict to Domain** to the production website domain (without `https://`). Add any staging domain only while staging needs to accept inquiries. The server forwards the browser's same-origin `Referer` for this check.
- Do not enable a CAPTCHA challenge until its client token is added to this integration. The current form has no CAPTCHA widget or token exchange; enabling a challenge can prevent valid submissions from completing.
- Confirm the form's notification recipient and email verification in the dashboard. Change the recipient there when Bima's email is ready.

The site also validates each field server-side, rejects oversized payloads, and rejects a filled hidden `website` honeypot. The honeypot is not forwarded to Formspree. WhatsApp click-to-chat remains a separate user-initiated option.

## Manual test

Open `/en/contact` or `/id/contact`, submit a valid inquiry, and confirm the localized success state appears only after the request is accepted. Check the Formspree submissions dashboard and notification email. For failure handling, use browser developer tools to block the request or temporarily test with an invalid Formspree configuration in a local-only environment; the form should show its localized error state and retain the entered values. Do not test using real inquiry data unless you intend to send it.
