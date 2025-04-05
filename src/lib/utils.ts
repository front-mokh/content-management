import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date, locale: string = "fr") {
  const formattedLocale =
    locale === "ar" ? "ar-DZ" : locale === "fr" ? "fr-FR" : "en-US";
  return new Intl.DateTimeFormat(formattedLocale, {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
}

export function formatDuration(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
}
