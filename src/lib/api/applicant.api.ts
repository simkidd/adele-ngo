import { ApiResponse } from "@/interfaces/response.interface";
import { applicantApiInstance } from "../axios";
import {
  RegisterApplicantInput,
  ApplicantCredentials,
} from "@/interfaces/applicant.interface";

export const applicantApi = {
  registerApplicant: async (
    data: RegisterApplicantInput,
  ): Promise<ApiResponse<ApplicantCredentials>> => {
    return await applicantApiInstance.post("/applicant/register", data);
  },

  loginApplicant: async (data: {
    email: string;
    password: string;
  }): Promise<ApiResponse<ApplicantCredentials>> => {
    return await applicantApiInstance.post("/applicant/login", data);
  },

  getMe: async () => {
    return await applicantApiInstance.get("/applicant/me");
  },

  updateMe: async (data: any) => {
    return await applicantApiInstance.patch("/applicant/me", data);
  },

  changePassword: async (data: {
    currentPassword: string;
    newPassword: string;
  }) => {
    return await applicantApiInstance.patch("/applicant/me/password", data);
  },

  getApplication: async () => {
    return await applicantApiInstance.get("/applicant/application");
  },

  getCertificate: async () => {
    return await applicantApiInstance.get("/applicant/certificate");
  },

  getAnnouncements: async () => {
    return await applicantApiInstance.get("/applicant/announcements");
  },
};
