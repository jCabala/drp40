export type FlatAdvertisment = {
  id: string;
  rentPerWeek: number;
  numberOfRooms: number;
  numberOfGaps: number;
  images: string[];
  houseDescription?: string;
  labels?: { name: string; color: string }[];
  lat: number;
  lng: number;
};
