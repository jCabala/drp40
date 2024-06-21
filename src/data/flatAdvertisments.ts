import { UserApplication } from "./userApplication";
import { UserProfile } from "./userProfile";

export type FlatAdvertisment = {
  id: string;
  address: string;
  rentPerWeek: number;
  numberOfRooms: number;
  numberOfGaps: number;
  images: string[];
  houseDescription?: string;
  labels?: { name: string; color: string }[];
  applications: string[]; 
  tenants: UserProfile[]
  lat: number;
  lng: number;
  lister: string;
};
