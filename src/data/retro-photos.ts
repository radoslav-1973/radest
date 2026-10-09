// src/data/african-art-photos.ts

export interface Photo {
  id: string;
  small: string;
  large: string;
  caption: string;
  smallWidth?: number;
  smallHeight?: number;
  link?: string;
  text?: string;
}

export const photos: Photo[] = [
  {
    id: "photo-1",
    small: "/albums/retro/img-1S.avif",
    large: "/albums/retro/img-1L.avif",
    caption: "My grandpa and uncle, June 1938",
    smallWidth: 300,
    smallHeight: 400,
    text: "Sofia, Bulgaria",
  },
  {
    id: "photo-2",
    small: "/albums/retro/img-2S.avif",
    large: "/albums/retro/img-2L.avif",
    caption: "My mom, dad, sister, uncle, aunt, and cousin, June 1967",
    smallWidth: 400,
    smallHeight: 279,
    text: "Ravno Pole, Bulgaria",
  },
  {
    id: "photo-3",
    small: "/albums/retro/img-3S.avif",
    large: "/albums/retro/img-3L.avif",
    caption: "My aunt, May 1969",
    smallWidth: 400,
    smallHeight: 269,
    text: "Gara Iskar, Bulgaria",
  },
  {
    id: "photo-4",
    small: "/albums/retro/img-4S.avif",
    large: "/albums/retro/img-4L.avif",
    caption: "This is me, February 1975",
    smallWidth: 300,
    smallHeight: 436,
    text: "Ravno Pole, Bulgaria",
  },
  {
    id: "photo-5",
    small: "/albums/retro/img-5S.avif",
    large: "/albums/retro/img-5L.avif",
    caption: "This is me, but with a book, February 1975",
    smallWidth: 300,
    smallHeight: 442,
    text: "Ravno Pole, Bulgaria",
  },
  {
    id: "photo-6",
    small: "/albums/retro/img-6S.avif",
    large: "/albums/retro/img-6L.avif",
    caption: "My grandma and grandpa, September 1932",
    smallWidth: 300,
    smallHeight: 443,
    text: "Ravno Pole, Bulgaria",
  },
  {
    id: "photo-7",
    small: "/albums/retro/img-7S.avif",
    large: "/albums/retro/img-7L.avif",
    caption: "My grandma with rural singers, May 1976",
    smallWidth: 300,
    smallHeight: 462,
    text: "Ravno Pole, Bulgaria",
  },
  {
    id: "photo-8",
    small: "/albums/retro/img-8S.avif",
    large: "/albums/retro/img-8L.avif",
    caption: "My grandma and grandpa, August 1964",
    smallWidth: 300,
    smallHeight: 474,
    text: "Ravno Pole, Bulgaria",
  },
  {
    id: "photo-9",
    small: "/albums/retro/img-9S.avif",
    large: "/albums/retro/img-9L.avif",
    caption: "Mitko & Rosi's Wedding, 30th of July 1978",
    smallWidth: 400,
    smallHeight: 277,
    text: "Ravno Pole, Bulgaria",
  },
  {
    id: "photo-10",
    small: "/albums/retro/img-10S.avif",
    large: "/albums/retro/img-10L.avif",
    caption: "My grandma, grandpa, and aunt, 1957",
    smallWidth: 300,
    smallHeight: 428,
    text: "Momin Prohod, Bulgaria",
  },
  {
    id: "photo-11",
    small: "/albums/retro/img-11S.avif",
    large: "/albums/retro/img-11L.avif",
    caption: "My grandpa, 1961",
    smallWidth: 400,
    smallHeight: 283,
    text: "Ravno Pole, Bulgaria",
  },
  {
    id: "photo-15",
    small: "/albums/retro/img-15S.avif",
    large: "/albums/retro/img-15L.avif",
    caption: "My grandma, grandpa and uncle, 1942",
    smallWidth: 300,
    smallHeight: 221,
    text: "Sofia, Bulgaria",
  },
  {
    id: "photo-16",
    small: "/albums/retro/img-16S.avif",
    large: "/albums/retro/img-16L.avif",
    caption: "August, 2025",
    smallWidth: 400,
    smallHeight: 323,
    text: "Nesebar, Bulgaria",
  },
  {
    id: "photo-17",
    small: "/albums/retro/img-17S.avif",
    large: "/albums/retro/img-17L.avif",
    caption: "Books are the horizon beyond which the sun sets and the sun rises",
    smallWidth: 300,
    smallHeight: 315,
    text: "My favorite pin",
  },
];
