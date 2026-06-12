import { CohortStatus, ICohort } from "@/interfaces/cohort.interface";
import { adminApiInstance, publicApi } from "../axios";
import { ApiResponse } from "@/interfaces/response.interface";
import {
  CreateCohortInput,
  UpdateCohortInput,
} from "@/app/(admin)/admin/dashboard/programs/cohorts/page";

export const cohortApi = {
  getOpenCohort: async (): Promise<ApiResponse<ICohort | null>> => {
    const res = await publicApi.get("/cohorts/open");
    return res.data;
  },

  listCohorts: async (): Promise<ApiResponse<ICohort[]>> => {
    const res = await adminApiInstance.get("/cohorts");
    console.log("res>>>", res);
    return res.data;
  },

  getCohortById: async (id: string): Promise<ApiResponse<ICohort>> => {
    const res = await adminApiInstance.get(`/cohorts/${id}`);
    return res.data;
  },

  createCohort: async (
    data: CreateCohortInput,
  ): Promise<ApiResponse<ICohort>> => {
    const res = await adminApiInstance.post("/cohorts", data);
    return res.data;
  },

  updateCohort: async (
    id: string,
    data: UpdateCohortInput,
  ): Promise<ApiResponse<ICohort>> => {
    const res = await adminApiInstance.patch(`/cohorts/${id}`, data);
    return res.data;
  },

  updateCohortStatus: async (
    id: string,
    data: { status: CohortStatus },
  ): Promise<ApiResponse<ICohort>> => {
    const res = await adminApiInstance.patch(`/cohorts/${id}/status`, data);
    return res.data;
  },
};
