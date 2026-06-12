import { CreateEventInput } from "@/interfaces/event.interface";
import { adminApiInstance, publicApi } from "../axios";

export const eventsApi = {
  listEvents: async () => {
    const res = await publicApi.get("/events");
    return res.data;
  },
  listAdminEvents: async () => {
    const res = await adminApiInstance.get("/events");
    return res.data;
  },
  createEvent: async (data: CreateEventInput) => {
    const res = await adminApiInstance.post("/events", data);
    return res.data;
  },
  updateEvent: async (id: string, data: CreateEventInput) => {
    const res = await adminApiInstance.patch(`/events/${id}`, data);
    return res.data;
  },
  deleteEvent: async (id: string) => {
    const res = await adminApiInstance.delete(`/events/${id}`);
    return res.data;
  },
  getEventById: async (id: string) => {
    const res = await publicApi.get(`/events/${id}`);
    return res.data;
  },
  rsvpEvent: async (eventId: string) => {
    const res = await publicApi.post(`/events/${eventId}/rsvp`);
    return res.data;
  },
};
