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
  { year: 2023, month: 7, location: "Arusha Art Gallery", file: "img-30L.jpg" },
  { year: 2023, month: 7, location: "Arusha Art Gallery", file: "img-14L.jpg" },
  { year: 2023, month: 7, location: "Arusha Art Gallery", file: "img-34L.jpg" },
  { year: 2023, month: 7, location: "Arusha Art Gallery", file: "img-59L.webp" },
  { year: 2023, month: 7, location: "Arusha Art Gallery", file: "img-12L.jpg" },
  { year: 2023, month: 7, location: "Arusha Art Gallery", file: "img-24L.jpg" },
];

export const analog: GalleryPhoto[] = [
  { year: 2024, month: 5, location: "Quiet street", file: "analog-01.jpg" },
  { year: 2024, month: 5, location: "River bend", file: "analog-02.jpg" },
  { year: 0, month: 0, location: "", file: "analog-03.jpg" },
  { year: 0, month: 0, location: "", file: "analog-04.jpg" },
];
