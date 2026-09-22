// fine-tune: the label shifts x: px right and y: px up from its automatic position
export type LabelOffset = {
  x: number;
  y: number;
};

export type Point = {
  name: string;
  lng: number;
  lat: number;
  labelOffset?: LabelOffset;// optional
};

export type ExtraArc = {
  id: string;
  from: [number, number];
  to: [number, number];
};

export const hub: Point = {
  name: "Sofia",
  lng: 23.3219,
  lat: 42.6977
};

const mayotte: Point = {
  name: "Mayotte",
  lng: 45.1662,
  lat: -12.8275
};

const reunion: Point = {
  name: "La Reunion",
  lng: 55.5325,
  lat: -21.1144
};

export const destinations: Point[] = [
  { name: "Kilimanjaro", lng: 37.3533, lat: -3.0758, labelOffset: { x: -40, y: 2 } },
  { name: "Tyulenovo", lng: 28.13, lat: 43.58 },
  { name: "Olympus", lng: 22.3586, lat: 40.0856, labelOffset: { x: -35, y: -5 } },
  { name: "Chamonix", lng: 6.8697, lat: 45.9231 },
  { name: "Mayotte", lng: 45.1662, lat: -12.8275, labelOffset: { x: -5, y: 40 } },
  { name: "La Reunion", lng: 55.5325, lat: -21.1144 },
  { name: "Arusha", lng: 36.8, lat: -3.38, labelOffset: { x: -30, y: -2 } }, 
];



//const reunion = destinations.find((dest) => dest.name === "La Reunion")!;

export const extraArcs: ExtraArc[] = [
  {
    id: "reunion-mayotte",
    from: [reunion.lng, reunion.lat],
    to: [mayotte.lng, mayotte.lat]
  },
  {
    id: "mayotte-kilimanjaro",
    from: [mayotte.lng, mayotte.lat],
    to: [destinations[0].lng, destinations[0].lat]
  }
];
