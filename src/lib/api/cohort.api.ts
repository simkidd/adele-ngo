import { ICohort } from "@/interfaces/cohort.interface";
import { adminApiInstance, publicApi } from "../axios";
import { ApiResponse } from "@/interfaces/response.interface";

export const cohortApi = {
  getOpenCohort: async (): Promise<ApiResponse<ICohort | null>> => {
    const res = await publicApi.get("/cohorts/open");
    return res.data;
  },

  listCohorts: async (): Promise<ApiResponse<ICohort[]>> => {
    const res = await adminApiInstance.get("/cohorts");
    return res.data;
  },

  getCohortById: async (id: string): Promise<ApiResponse<ICohort>> => {
    const res = await adminApiInstance.get(`/cohorts/${id}`);
    return res.data;
  },

  createCohort: async (data: any): Promise<ApiResponse<ICohort>> => {
    const res = await adminApiInstance.post("/cohorts", data);
    return res.data;
  },

  updateCohort: async (
    id: string,
    data: any,
  ): Promise<ApiResponse<ICohort>> => {
    const res = await adminApiInstance.patch(`/cohorts/${id}`, data);
    return res.data;
  },

  updateCohortStatus: async (
    id: string,
    data: any,
  ): Promise<ApiResponse<ICohort>> => {
    const res = await adminApiInstance.patch(`/cohorts/${id}/status`, data);
    return res.data;
  },
};
