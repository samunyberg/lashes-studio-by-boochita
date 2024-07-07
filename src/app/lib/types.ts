import { Appointment, Service, ServiceOption } from '@prisma/client';

export interface UserWithData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  appointments: Appointment[];
}

export interface Step {
  stepNumber: number;
  description: string;
}

export interface BookingData {
  appointment: Appointment | null;
  service: Service | null;
  serviceOption: ServiceOption | null;
  servicePrice: number;
}

export type ServiceWithServiceOptions = Service & {
  serviceOptions: ServiceOption[];
};
