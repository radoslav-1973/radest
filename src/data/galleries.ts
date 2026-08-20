// ────────────────────────────────────────────────────────────────────────────
//  Digital & Analog galleries — one optional description per photo.
//
//  Mirrors src/data/calendar.ts. Each entry attaches a caption to a photo in
//  src/assets/digital/ or src/assets/analog/, rendered as "Month Year, Location"
//  — the same format as the Calendar — under the photo and in the lightbox.
//
//  To describe a photo, fill in its year, month (1–12) and location below. A
//  caption stays hidden until you add a location, so a blank entry simply shows
//  the photo on its own.
//
//  These dates also control the gallery order: newest month/year first, and
//  within the same month, locations sort Z→A. Photos without a date yet sink
//  to the bottom — no filename renumbering needed when adding older photos.
//
//  The entries below are EXAMPLES that match the bundled placeholder images.
//  Replace the locations with real ones (or delete entries) as you add photos.
// ────────────────────────────────────────────────────────────────────────────

export interface GalleryPhoto {
  year: number; // e.g. 2025  (0 = not set yet)
  month: number; // 1–12       (0 = not set yet)
  location: string; // e.g. "Lisbon, Portugal"
  file: string; // filename in src/assets/digital/ or src/assets/analog/
}

export const digital: GalleryPhoto[] = [
  { year: 2023, month: 7, location: "Ngorongoro, Tanzania", file: "img-1L.webp" },
  { year: 2023, month: 7, location: "Ngorongoro, Tanzania", file: "img-2L.webp" },
  { year: 2023, month: 7, location: "Ngorongoro, Tanzania", file: "img-14L.webp" },
  { year: 2023, month: 7, location: "Ngorongoro, Tanzania", file: "img-19L.webp" },
  // The rest have no caption yet — they simply show on their own until you add a location.
  { year: 2023, month: 7, location: "Ngorongoro, Tanzania", file: "img-23L.webp" },
  { year: 2023, month: 7, location: "Ngorongoro, Tanzania", file: "img-28L.webp" },
  { year: 2023, month: 7, location: "Arusha Art Gallery", file: "img-30L.webp" },
  { year: 2023, month: 7, location: "Arusha Art Gallery", file: "img-140L.webp" },
  { year: 2023, month: 7, location: "Arusha Art Gallery", file: "img-34L.webp" },
  { year: 2023, month: 7, location: "Arusha Art Gallery", file: "img-59L.webp" },
  { year: 2023, month: 7, location: "Arusha Art Gallery", file: "img-12L.webp" },
  { year: 2023, month: 7, location: "Arusha Art Gallery", file: "img-24L.webp" },
  { year: 2023, month: 8, location: "Kisumu, Kenya", file: "IMG_20230802_11.webp" },
  { year: 2023, month: 8, location: "Kisumu, Kenya", file: "IMG_20230801_18.webp" },
  { year: 2023, month: 8, location: "Airpot, Kisumu, Kenya", file: "IMG_20230801_10.webp" },
  { year: 2016, month: 11, location: "Thai restaurant, Flic en Flac, Mauritius", file: "img_5968.webp" },
  { year: 2016, month: 9, location: "Thai restaurant, Flic en Flac, Mauritius", file: "img_5816.webp" },
];

export const analog: GalleryPhoto[] = [
  { year: 1967, month: 6, location: "Ravno Pole, Bulgaria", file: "IMG_2026-08-13-22-24-02-354.webp" },
  { year: 1969, month: 5, location: "Gara Iskar, Bulgaria", file: "IMG_2026-08-13-22-25-21-303.webp" },
  { year: 1975, month: 2, location: "Ravno Pole, Bulgaria", file: "IMG_2026-08-13-22-31-34-924.webp" },
  { year: 1992, month: 5, location: "Sofia, Bulgaria", file: "IMG_0001.webp" },
  { year: 0, month: 0, location: "Ravno Pole, Bulgaria 1932 / 1976", file: "IMG_2026-08-13-22-32-56-916.webp" },
  { year: 0, month: 0, location: "Ravno Pole, Bulgaria 1932 / 1964", file: "IMG_2026-08-14-16-26-13-259.webp" },
];
