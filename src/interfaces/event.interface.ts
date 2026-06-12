import { AdminUser } from "./admin.interface";
import { ICenter } from "./center.interface";

export type EventType = "Workshop" | "Graduation" | "Open Day" | "Community";
export type EventStatus = "Upcoming" | "Past" | "Cancelled";

export interface IEvent {
  _id: string;
  title: string;
  description: string;
  date: Date;
  time: string;
  location: string;
  type: EventType;
  status: EventStatus;
  centerId: ICenter;
  capacity: number;
  rsvps: IRSVP[];
  createdBy: AdminUser;
  createdAt: Date;
  updatedAt: Date;
}

export interface IRSVP {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  seats: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateEventInput {
  title: string;
  description: string;
  date: Date;
  time: string;
  location: string;
  type: EventType;
  status: EventStatus;
  capacity: number;
  centerId: string;
}
