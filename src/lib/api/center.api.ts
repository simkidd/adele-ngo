import { adminApiInstance, publicApi } from "../axios";
import { ICenter } from "@/interfaces/center.interface";
import { ApiResponse } from "@/interfaces/response.interface";

export const centersApi = {
  getCenters: async (): Promise<ApiResponse<ICenter[]>> => {
    const res = await publicApi.get("/centers");
    return res.data;
  },
  getCenterById: async (id: string): Promise<ApiResponse<ICenter>> => {
    const res = await publicApi.get(`/centers/${id}`);
    return res.data;
  },

  createCenter: async (data: any): Promise<ApiResponse<ICenter>> => {
    const res = await adminApiInstance.post("/centers", data);
    return res.data;
  },
  updateCenter: async (
    id: string,
    data: { mangerId: string },
  ): Promise<ApiResponse<ICenter>> => {
    const res = await adminApiInstance.patch(`/centers/${id}`, data);
    return res.data;
  },

  assignManager: async (id: string, data: { managerId: string }) => {
    const res = await adminApiInstance.patch(`/centers/${id}/manager`, data);
    return res.data;
  },
};
