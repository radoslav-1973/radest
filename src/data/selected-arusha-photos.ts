// src/data/arusha-photos.ts

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
    id: "photo-42",
    small: "/albums/arusha/img-42S.avif",
    large: "/albums/arusha/img-42L.avif",
    caption: "July, 2023",
    link: "",
    text: "Arusha Art Gallery",
  },
  {
    id: "photo-30",
    small: "/albums/arusha/img-30S.avif",
    large: "/albums/arusha/img-30L.avif",
    caption: "July, 2023",
    link: "",
    text: "Arusha Art Gallery",
  },
  {
    id: "photo-32",
    small: "/albums/arusha/img-32S.avif",
    large: "/albums/arusha/img-32L.avif",
    caption: "July, 2023",
    link: "",
    text: "Arusha Art Gallery",
  },
  {
    id: "photo-21",
    small: "/albums/arusha/img-21S.avif",
    large: "/albums/arusha/img-21L.avif",
    caption: "July, 2023",
    link: "",
    text: "Arusha Art Gallery",
  },
];
