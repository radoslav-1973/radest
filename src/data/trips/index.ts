import { kilimanjaro, type TripMapData } from "./kilimanjaro";

export const trips: Record<string, TripMapData | undefined> = {
  kilimanjaro
};

export function getTrip(id: string): TripMapData | undefined {
  return trips[id];
}
