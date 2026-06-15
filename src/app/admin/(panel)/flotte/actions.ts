"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { requireSession } from "@/lib/auth/session";

export async function addVehicle(formData: FormData) {
  await requireSession();
  const name = String(formData.get("name") || "").trim();
  const type = String(formData.get("type") || "Standard").trim();
  const seats = Number(formData.get("seats")) || 4;
  if (!name) return;
  await db.vehicle.create({ data: { name, type, seats } });
  revalidatePath("/admin/flotte");
}

export async function toggleVehicle(formData: FormData) {
  await requireSession();
  const id = String(formData.get("id"));
  const v = await db.vehicle.findUnique({ where: { id } });
  if (v) await db.vehicle.update({ where: { id }, data: { active: !v.active } });
  revalidatePath("/admin/flotte");
}

export async function deleteVehicle(formData: FormData) {
  await requireSession();
  await db.vehicle.delete({ where: { id: String(formData.get("id")) } });
  revalidatePath("/admin/flotte");
}

export async function addDriver(formData: FormData) {
  await requireSession();
  const name = String(formData.get("name") || "").trim();
  const phone = String(formData.get("phone") || "").trim() || null;
  if (!name) return;
  await db.driver.create({ data: { name, phone } });
  revalidatePath("/admin/flotte");
}

export async function toggleDriver(formData: FormData) {
  await requireSession();
  const id = String(formData.get("id"));
  const d = await db.driver.findUnique({ where: { id } });
  if (d) await db.driver.update({ where: { id }, data: { active: !d.active } });
  revalidatePath("/admin/flotte");
}

export async function deleteDriver(formData: FormData) {
  await requireSession();
  await db.driver.delete({ where: { id: String(formData.get("id")) } });
  revalidatePath("/admin/flotte");
}
