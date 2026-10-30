export interface MapMarker {
  id?: string;
  latlng: [number, number];
  popup?: string;
}

export interface MapCircle {
  id?: string;
  latlng: [number, number];
  radius: number;
  color?: string;
  fillColor?: string;
  fillOpacity?: number;
  popup?: string;
}

export interface MapPolyline {
  id?: string;
  latlngs: [number, number][];
  color?: string;
  weight?: number;
  opacity?: number;
  popup?: string;
}

export interface TripMapData {
  id: string;
  title: string;
  center: [number, number];
  zoom: number;
  scrollWheelZoom?: boolean;
  markers?: MapMarker[];
  circles?: MapCircle[];
  polylines?: MapPolyline[];
}

export const kilimanjaro: TripMapData = {
  id: "kilimanjaro",
  title: "Kilimanjaro",
  center: [-12.956741, 45.13433],
  zoom: 4,
  scrollWheelZoom: false,

  markers: [
    {
      latlng: [-21.099455, 55.480032],
      popup: "<a href='https://en.reunion.fr/organize/our-experiences/the-piton-des-neiges-hike/' target='_blank' rel='noopener noreferrer'>Piton des Neiges, 3071 m</a>"
    },
    {
      latlng: [-12.956741, 45.13433],
      popup: "<a href='https://komori-iles.com/en/lieux/mont-choungui.html' target='_blank' rel='noopener noreferrer'>Mont Choungui, 594 m</a>"
    },
     
    {
      latlng: [-3.076752, 37.354031],
      popup: "<a href='https://radest.top/galleries/kilimanjaro'>Uhuru Summit, 5,895 m</a>"
    }
  ],

  circles: [
     {
      id: "Reunion",
      latlng: [-21.099455, 55.480032],
      radius: 150000,
      color: "green",
      fillColor: "",
      fillOpacity: 0.0,
      popup: "<a href='https://www.radest.top/galleries/la-reunion'>Reunion Island, France</a>"
    },
    {
      id: "Mayotte",
      latlng: [-12.956741, 45.13433],
      radius: 100000,
      color: "yellow",
      fillColor: "",
      fillOpacity: 0.0,
      popup: "<a href='https://www.radest.top/galleries/mayotte'>Mayotte Island, France</a>"
    },
    {
      id: "Kilimanjaro",
      latlng: [-3.076752, 37.354031],
      radius: 200000,
      color: "orange",
      fillColor: "",
      fillOpacity: 0.0,
      popup: "<a href='https://radest.top/galleries/kilimanjaro'>Kilimanjaro, Tanzania</a>"
    }
  ],

  polylines: [
    {
      id: "route-1",
      latlngs: [
        [-21.099455, 55.480032],
        [-12.956741, 45.13433],
        [-3.076752, 37.354031]
      ],
      color: "gray",
      weight: 2,
      opacity: 0.8,
      popup: "Reunion-Mayotte-Kilimanjaro"
    }
  ]
};
