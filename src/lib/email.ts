const EMAIL_PATTERN = /^[^\s@]+@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z]{2,}$/i;

export function isValidEmail(value: string) {
  return value.length <= 254 && EMAIL_PATTERN.test(value.trim());
}
