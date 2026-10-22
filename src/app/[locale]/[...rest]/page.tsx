import { notFound } from "next/navigation";

/**
 * Noma'lum yo'llar uchun: til ichidagi 404 sahifasini ko'rsatadi.
 * Masalan /uz/bunday-sahifa-yoq
 */
export default function CatchAllPage() {
  notFound();
}
