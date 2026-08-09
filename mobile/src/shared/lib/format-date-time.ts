import { capitalize } from "./capitalize";

const formatDateTime = (locale: string, iso: string): string => {
  const date = new Date(iso);

  const dateParts = new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).formatToParts(date);
  const get = (type: Intl.DateTimeFormatPartTypes) =>
    dateParts.find((part) => part.type === type)?.value ?? "";
  const time = new Intl.DateTimeFormat(locale, {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(date);

  return `${get("day")} ${capitalize(get("month"))} ${get("year")}, ${time}`;
};

export { formatDateTime };
