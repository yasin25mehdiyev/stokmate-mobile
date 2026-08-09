import { capitalize } from "./capitalize";

const formatToday = (locale: string, date: Date = new Date()): string => {
  const parts = new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).formatToParts(date);
  const get = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((part) => part.type === type)?.value ?? "";

  return `${get("day")} ${capitalize(get("month"))} ${get("year")}`;
};

export { formatToday };
