export interface SeatInfo {
  car: string;     // Номер вагона
  seat: string;    // Номер місця
}

export interface JourneySegment {
  fromStation: string;
  toStation: string;
  
  trainBrand: Brand;
  trainId: string;
  
  hasSeat: boolean;
  seatInfo?: SeatInfo;
}

export interface ConnectionDetail {
  id: string;
  startTime: string;
  endTime: string;
  duration?: string;
  segments: JourneySegment[];

}
export interface ApiCheckedSegment {
  train_nr: number;
  train_name: string;
  brand_id: number;
  station_origin: number;
  station_destination: number;
  departure: string;
  arrival: string;
  available: boolean;
}
export interface ApiCheckedConnection {
  train_nr: number;
  origin_station_id: number;
  destination_station_id: number;
  routeVariant: {
    brand_id: number,
    type: string;
    segments: ApiCheckedSegment[];
    coveredDuration: number;
    coverage: number;
  };
}
export interface ConnectionResponse {
  uuid: string;
  departure: string;
  arrival: string;
  duration: number;
  legs: ApiLeg[];
  changes: number;
  constrictions: unknown[];
  origin_station_id: number;
  destination_station_id: number;
  eol_response_version: number;
}
export interface ApiLeg {
  train_id: number;
  train_nr: number;
  train_name: string;
  train_full_name: string;

  operating_day: string;

  commercial_brand_id: number;
  internal_brand_id: number;

  origin_station_id: number;
  destination_station_id: number;

  departure: string;
  arrival: string;
  duration: number;

  departure_platform: string;
  departure_track: string;

  arrival_platform: string;
  arrival_track: string;

  stops_before_leg: unknown[];
  stops_in_leg: unknown[];
  stops_after_leg: unknown[];

  leg_type: string;
  attributes: unknown[];
}
function timeToMinutes(timeStr: string): number {

  const [hours, minutes] = timeStr.split(':').map(Number);

  return (hours * 60) + minutes;

}



function minutesToTime(totalMinutes: number): string {

  const isNegative = totalMinutes < 0;

  const absMinutes = Math.abs(totalMinutes);



  const hours = Math.floor(absMinutes / 60);

  const minutes = absMinutes % 60;



  const formattedHours = String(hours).padStart(2, '0');

  const formattedMinutes = String(minutes).padStart(2, '0');

  return `${isNegative ? '-' : ''}${formattedHours}:${formattedMinutes}`;

}

export function calculateDuration(startTime: string, endTime: string): string {

  const startMinutes = timeToMinutes(startTime);

  const endMinutes = timeToMinutes(endTime);

  const diff = endMinutes - startMinutes;

  return minutesToTime(diff);

}
export interface Brand {
  id: number;
  name: string;
  color: string;
}