import { UserApplication } from "./userApplication";

export type FlatAdvertisment = {
  id: string;
  address: string;
  rentPerWeek: number;
  numberOfRooms: number;
  numberOfGaps: number;
  images: string[];
  houseDescription?: string;
  labels?: { name: string; color: string }[];
  applications: UserApplication[]; 
  lat: number;
  lng: number;
};
