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
  { name: "Kilimanjaro", lng: 37.354031, lat: -3.076752, labelOffset: { x: -40, y: 2 } },
  { name: "Tyulenovo", lng: 28.584623, lat: 43.494487 },
  { name: "Olympus", lng: 22.358551, lat: 40.086149, labelOffset: { x: -35, y: -5 } },
  { name: "Chamonix", lng: 6.865146, lat: 45.832702 },
  { name: "Mayotte", lng: 45.13433, lat: -12.956741, labelOffset: { x: -5, y: 40 } },
  { name: "La Reunion", lng: 55.480032, lat: -21.099455 },
  { name: "Arusha", lng: 36.625972, lat: -3.368372, labelOffset: { x: -30, y: -2 } },
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
