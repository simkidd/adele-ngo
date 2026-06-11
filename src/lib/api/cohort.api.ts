import { ICohort } from "@/interfaces/cohort.interface";
import { publicApi } from "../axios";
import { ApiResponse } from "@/interfaces/response.interface";

export const cohortApi = {
  getOpenCohort: async (): Promise<ApiResponse<ICohort | null>> => {
    const res = await publicApi.get("/cohorts/open");
    return res.data;
  },

  listCohorts: () => {
    return publicApi.get("/cohorts");
  },

  getCohortById: (id: string) => {
    return publicApi.get(`/cohorts/${id}`);
  },

  createCohort: (data: any) => {
    return publicApi.post("/cohorts", data);
  },

  updateCohort: (id: string, data: any) => {
    return publicApi.patch(`/cohorts/${id}`, data);
  },

  updateCohortStatus: (id: string, data: any) => {
    return publicApi.patch(`/cohorts/${id}/status`, data);
  },
};
