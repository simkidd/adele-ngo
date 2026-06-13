import {
  IRegistration,
  RegistrationStatus,
} from "@/interfaces/registration.interface";
import { adminApiInstance } from "../axios";
import {
  ApiResponse,
  PaginatedResponse,
} from "@/interfaces/response.interface";

export const registrationApi = {
  listRegistrations: async (params?: {
    page?: number;
    limit?: number;
    cohortId?: string;
    centerId?: string;
    programId?: string;
    status?: RegistrationStatus | "All";
    search?: string;
  }): Promise<PaginatedResponse<IRegistration[]>> => {
    const res = await adminApiInstance.get("/registrations", { params });
    return res.data;
  },
  getRegistrationStats: async (params?: {
    centerId?: string;
  }): Promise<
    ApiResponse<{
      Pending: number;
      Accepted: number;
      Verified: number;
      Enrolled: number;
      Rejected: number;
      total: number;
    }>
  > => {
    const res = await adminApiInstance.get("/registrations/stats", { params });
    return res.data;
  },
  getRegistration: async (id: string): Promise<ApiResponse<IRegistration>> => {
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
