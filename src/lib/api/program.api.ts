import { ApiResponse } from "@/interfaces/response.interface";
import { adminApiInstance, publicApi } from "../axios";
import { CreateProductInput, IProgram } from "@/interfaces/program.interface";

export const programsApi = {
  getPrograms: async (params?: {
    category?: string;
    active?: string;
  }): Promise<ApiResponse<IProgram[]>> => {
    const res = await publicApi.get("/programs", { params });
    return res.data;
  },
  getProgram: async (id: string): Promise<ApiResponse<IProgram>> => {
    const res = await publicApi.get(`/program/${id}`);
    return res.data;
  },

  createProgram: async (data: CreateProductInput) => {
    const res = await adminApiInstance.post("programs", data);
    return res.data;
  },
  updateProgram: async (id: string, data: CreateProductInput) => {
    const res = await adminApiInstance.patch(`/programs/${id}`, data);
    return res.data;
  },
  assignProgramToCenter: async (id: string, data: { centerId: string }) => {
    const res = await adminApiInstance.post(
      `/programs/${id}/assign-center`,
      data,
    );
    return res.data;
  },
  removeProgramFromCenter: async (id: string, data: { centerId: string }) => {
    const res = await adminApiInstance.post(
      `/programs/${id}/remove-center`,
      data,
    );
    return res.data;
  },
  toggleProgramActive: async (id: string) => {
    const res = await adminApiInstance.patch(`/programs/${id}/toggle`);
    return res.data;
  },
};
