export interface RideEstimateDTO {
  origin: { latitude: number; longitude: number };
  destination: { latitude: number; longitude: number };
  distance: number;
  duration: string;
  options: RideOptionDTO[];
  routeResponse: object;
}

export interface RideOptionDTO {
  id: number;
  name: string;
  description: string;
  vehicle: string;
  review: { rating: number; comment: string };
  value: number;
}

export interface RideHistoryDTO {
  customer_id: string;
  rides: RideDTO[];
}

export interface RideDTO {
  id?: number;
  date: Date;
  origin: string;
  destination: string;
  distance: number;
  duration: string;
  driver: {
    id: number;
    name: string;
  };
  value: number;
}
