export type FlatAdvertisment = {
  id: number;
  address: string;
  rentPerWeek: number;
  numberOfRooms: number;
  numberOfGaps: number;
  images: string[];
  labels: { name: string; color: string }[];
  lat: number;
  lng: number;
};
