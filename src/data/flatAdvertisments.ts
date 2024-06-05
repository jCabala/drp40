export type FlatAdvertisment = {
  id: string;
  address: string;
  rentPerWeek: number;
  numberOfRooms: number;
  numberOfGaps: number;
  images: string[];
  labels: { name: string; color: string }[];
  lat: number;
  lng: number;
};
