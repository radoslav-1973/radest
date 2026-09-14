// src/data/map-gallery.ts

export type Region = "Africa" | "Indian Ocean" | "Europe";

export interface Gallery {
    name: string;
    lng: number;
    lat: number;
    href: string;
    region: Region;
}

export const galleries: Gallery[] = [
    {
        name: "Arusha",
        lng: 36.8,
        lat: -3.38,
        href: "/galleries/arusha",
        region: "Africa",
    },
    {
        name: "Kilimanjaro",
        lng: 37.35,
        lat: -3.07,
        href: "/galleries/kilimanjaro",
        region: "Africa",
    },
    {
        name: "La Réunion",
        lng: 55.5,
        lat: -21.1,
        href: "/galleries/la-reunion",
        region: "Indian Ocean",
    },
    {
        name: "Mayotte",
        lng: 45.25,
        lat: -12.83,
        href: "/galleries/mayotte",
        region: "Indian Ocean",
    },
    {
        name: "Olympus",
        lng: 22.35,
        lat: 40.08,
        href: "/galleries/olympus",
        region: "Europe",
    },
    {
        name: "Chamonix",
        lng: 6.86,
        lat: 45.92,
        href: "/galleries/chamonix",
        region: "Europe",
    },
];

export const allRegions = ["All", "Africa", "Indian Ocean", "Europe"] as const;
export type RegionFilter = (typeof allRegions)[number];
