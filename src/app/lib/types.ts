import { Appointment, Service, ServiceOption } from '@prisma/client';

// Represents a user with basic contact information
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

// Represents a user with their associated appointments
export interface UserWithAppointments extends User {
  appointments: Appointment[];
}

// Represents a step in the booking form
export interface Step {
  stepNumber: number;
  description: string;
}

// Represents booking data, including appointment, service, and pricing information
export interface BookingData {
  appointment: Appointment | null;
  service: Service | null;
  serviceOption: ServiceOption | null;
  servicePrice: number | null;
}

// Represents a service with its associated service options
export interface ServiceWithServiceOptions extends Service {
  serviceOptions: ServiceOption[];
}

// Represents an appointment with associated service, service option, and client information
export type AppointmentWithData = Appointment & {
  service: Service | null;
  serviceOption: ServiceOption | null;
  client: User | null;
};
