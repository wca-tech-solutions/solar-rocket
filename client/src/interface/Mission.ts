import { Mission } from './../graphql/schema';
export interface MissionInputProps {
    title: string;
    operator: string;
    launch: LaunchInputProps;
    orbit: OrbitInputProps;
    payload: PayloadInputProps;
}
export interface LaunchInputProps {
    date: Date | null;
    vehicle: string;
    location: LocationInputProps
}
export interface LocationInputProps {
    longitude: number;
    latitude: number;
    name: string;
}
export interface OrbitInputProps {
    apoapsis: number;
    periapsis: number;
    inclination: number;
}
export interface PayloadInputProps {
    capacity: number;
    available: number;
}


export interface MissionsResponse {
    data: {
      Missions: Mission[];
    };
  }