// src/data/favorites-photos.ts

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
    small: "/albums/favorites/img-1S.avif",
    large: "/albums/favorites/img-1L.avif",
    caption: "The peak is 2016 metres high. It is situated south of the town Berkovitsa",
    link: "",
    text: "Mount Kom, Bulgaria",
  },
  {
    id: "photo-2",
    small: "/albums/favorites/img-2S.avif",
    large: "/albums/favorites/img-2L.avif",
    caption: "Mount Vihren (2914 m.) is the highest point of Pirin Mountains.",
    link: "",
    text: "Mount Vihren, Bulgaria",
  },
  {
    id: "photo-3",
    small: "/albums/favorites/img-3S.avif",
    large: "/albums/favorites/img-3L.avif",
    caption: "Mount Malyovitsa is 2729 m. high. Situated in the Rila Mountain it is gorgeous place.",
    link: "",
    text: "Mount Malyovitsa, Bulgaria",
  },
  {
    id: "photo-4",
    small: "/albums/favorites/img-4S.avif",
    large: "/albums/favorites/img-4L.avif",
    caption: "It is the highest point on the Africa continent (5895m)",
    link: "",
    text: "Mount Kilimanjaro, Tanzania",
  },
  {
    id: "photo-5",
    small: "/albums/favorites/img-5S.avif",
    large: "/albums/favorites/img-5L.avif",
    caption: "Chamonix is the world capital of mountaineering and ski holidays in both summer and winter.",
    link: "",
    text: "Chamonix, France",
  },
  {
    id: "photo-6",
    small: "/albums/favorites/img-6S.avif",
    large: "/albums/favorites/img-6L.avif",
    caption: "Mount Bogdan (1600m) is situated in Sredna Gora, Bulgaria",
    link: "",
    text: "On the trail to Mount Bogdan",
  },
  {
    id: "photo-7",
    small: "/albums/favorites/img-7S.avif",
    large: "/albums/favorites/img-7L.avif",
    caption: "Skolio (2,909m.), the second highest of Mt. Olympus and Greece.",
    link: "",
    text: "Mount Scolio, Greece",
  },
  {
    id: "photo-8",
    small: "/albums/favorites/img-8S.avif",
    large: "/albums/favorites/img-8L.avif",
    caption: "The highest point in La Réunion and the entire Indian Ocean is Piton des Neiges, standing at 3,069 meters",
    link: "",
    text: "The Mountains of La Réunion",
  },
  {
    id: "photo-9",
    small: "/albums/favorites/img-9S.avif",
    large: "/albums/favorites/img-9L.avif",
    caption: "Tyulenovo means Village of seals in Bulgarian and there are plenty of clifs above the sea.",
    link: "",
    text: "Tyulenovo, Bulgaria",
  },
  {
    id: "photo-10",
    small: "/albums/favorites/img-10S.avif",
    large: "/albums/favorites/img-10L.avif",
    caption: "Descent from Musala, the highest point in the Rila Mountains (2,925m.), to the Rila Monastery",
    link: "",
    text: "On the Rila Ridge, Bulgaria",
  },
  {
    id: "photo-11",
    small: "/albums/favorites/img-11S.avif",
    large: "/albums/favorites/img-11L.avif",
    caption: "The second highest point of the island at 593 m.",
    link: "",
    text: "Mont Choungui, Mayotte",
  },
  {
    id: "photo-12",
    small: "/albums/favorites/img-12S.avif",
    large: "/albums/favorites/img-12L.avif",
    caption: "The highest waterfall in the Rila Mountain.",
    link: "",
    text: "Skakavitza Fall, Bulgaria",
  },
  {
    id: "photo-15",
    small: "/albums/favorites/img-15S.avif",
    large: "/albums/favorites/img-15L.avif",
    caption: "A 2645 m. high granite peak in the Pirin mountain.",
    link: "",
    text: "On the trail to Bezbog, Bulgaria",
  },
];
