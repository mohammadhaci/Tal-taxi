"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { requireSession } from "@/lib/auth/session";

const num = (fd: FormData, key: string, fallback = 0) => {
  const v = Number(fd.get(key));
  return Number.isFinite(v) ? v : fallback;
};

export async function updateTariff(formData: FormData) {
  await requireSession();
  const data = {
    baseFare: num(formData, "baseFare"),
    pricePerKmTier1: num(formData, "pricePerKmTier1"),
    tier1EndKm: num(formData, "tier1EndKm"),
    pricePerKmTier2: num(formData, "pricePerKmTier2"),
    tier2EndKm: num(formData, "tier2EndKm"),
    pricePerKmTier3: num(formData, "pricePerKmTier3"),
    nightSurchargePct: num(formData, "nightSurchargePct"),
    nightStartHour: num(formData, "nightStartHour"),
    nightEndHour: num(formData, "nightEndHour"),
    waitingPricePerMin: num(formData, "waitingPricePerMin"),
    freeWaitingMin: num(formData, "freeWaitingMin"),
    minFare: num(formData, "minFare"),
    currency: String(formData.get("currency") || "EUR"),
  };
  await db.tariffSettings.upsert({
    where: { id: "default" },
    update: data,
    create: { id: "default", ...data },
  });
  revalidatePath("/admin/tarif");
  revalidatePath("/preisrechner");
}

export async function addFixedRoute(formData: FormData) {
  await requireSession();
  const label = String(formData.get("label") || "").trim();
  const price = num(formData, "price");
  if (!label || price <= 0) return;
  await db.fixedRoute.create({ data: { label, price } });
  revalidatePath("/admin/tarif");
  revalidatePath("/preisrechner");
}

export async function deleteFixedRoute(formData: FormData) {
  await requireSession();
  const id = String(formData.get("id"));
  await db.fixedRoute.delete({ where: { id } });
  revalidatePath("/admin/tarif");
  revalidatePath("/preisrechner");
}

export async function toggleFixedRoute(formData: FormData) {
  await requireSession();
  const id = String(formData.get("id"));
  const route = await db.fixedRoute.findUnique({ where: { id } });
  if (!route) return;
  await db.fixedRoute.update({ where: { id }, data: { active: !route.active } });
  revalidatePath("/admin/tarif");
  revalidatePath("/preisrechner");
}
