export function toE164(raw: string, defaultCountryCode = "+91") {
  const s = raw.replace(/\s+/g, "");
  if (/^\d{10}$/.test(s)) return `${defaultCountryCode}${s}`;
  if (/^\+[1-9]\d{7,14}$/.test(s)) return s;
  throw new Error("Enter phone like +919876543210");
}
