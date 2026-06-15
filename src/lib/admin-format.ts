import type { BookingStatus } from "@prisma/client";

export const STATUS_LABELS: Record<BookingStatus, string> = {
  PENDING: "Ausstehend",
  CONFIRMED: "Bestätigt",
  REJECTED: "Abgelehnt",
  COMPLETED: "Abgeschlossen",
  CANCELLED: "Storniert",
};

export const STATUS_STYLES: Record<BookingStatus, string> = {
  PENDING: "bg-warning/15 text-warning",
  CONFIRMED: "bg-success/15 text-success",
  REJECTED: "bg-danger/15 text-danger",
  COMPLETED: "bg-ink/10 text-ink",
  CANCELLED: "bg-muted/15 text-muted",
};

export const TRIP_TYPE_LABELS: Record<string, string> = {
  ONE_WAY: "Einfache Fahrt",
  RETURN: "Hin & Rück",
};

export function formatDateTime(d: Date | string): string {
  return new Date(d).toLocaleString("de-AT", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}
