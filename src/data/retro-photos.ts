// src/data/african-art-photos.ts

export interface Photo {
  id: string;
  small: string;
  large: string;
  caption: string;
  link?: string;
  text?: string;
}

export const photos: Photo[] = [
  {
    id: "photo-1",
    small: "/albums/retro/img-1S.avif",
    large: "/albums/retro/img-1L.avif",
    caption: "June 1938",
    link: "",
    text: "Sofia, Bulgaria",
  },
  {
    id: "photo-2",
    small: "/albums/retro/img-2S.avif",
    large: "/albums/retro/img-2L.avif",
    caption: "June 1967",
    link: "",
    text: "Ravno Pole, Bulgaria",
  },
  {
    id: "photo-3",
    small: "/albums/retro/img-3S.avif",
    large: "/albums/retro/img-3L.avif",
    caption: "May 1969",
    link: "",
    text: "Gara Iskar, Bulgaria",
  },
  {
    id: "photo-4",
    small: "/albums/retro/img-4S.avif",
    large: "/albums/retro/img-4L.avif",
    caption: "February 1975",
    link: "",
    text: "Ravno Pole, Bulgaria",
  },
  {
    id: "photo-5",
    small: "/albums/retro/img-5S.avif",
    large: "/albums/retro/img-5L.avif",
    caption: "February 1975",
    link: "",
    text: "Ravno Pole, Bulgaria",
  },
  {
    id: "photo-6",
    small: "/albums/retro/img-6S.avif",
    large: "/albums/retro/img-6L.avif",
    caption: "September, 1932",
    link: "",
    text: "Ravno Pole, Bulgaria",
  },
  {
    id: "photo-7",
    small: "/albums/retro/img-7S.avif",
    large: "/albums/retro/img-7L.avif",
    caption: "May, 1976",
    link: "",
    text: "Ravno Pole, Bulgaria",
  },
  {
    id: "photo-8",
    small: "/albums/retro/img-8S.avif",
    large: "/albums/retro/img-8L.avif",
    caption: "August, 1964",
    link: "",
    text: "Ravno Pole, Bulgaria",
  },
];
