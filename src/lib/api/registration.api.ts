import { adminApiInstance } from "../axios";

export const registrationApi = {
  listRegistrations: async () => {
    const res = await adminApiInstance.get("/registrations");
    return res.data;
  },
  getRegistrationStats: async () => {
    const res = await adminApiInstance.get("/registrations/stats");
    return res.data;
  },
  getRegistration: async (id: string) => {
    const res = await adminApiInstance.get(`/registrations/${id}`);
    return res.data;
  },
  updateRegistrationStatus: async (id: string, status: string) => {
    const res = await adminApiInstance.patch(`/registrations/${id}/status`, {
      status,
    });
    return res.data;
  },
  deleteRegistration: async (id: string) => {
    const res = await adminApiInstance.delete(`/registrations/${id}`);
    return res.data;
  },
};
