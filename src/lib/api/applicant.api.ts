import { ApiResponse } from "@/interfaces/response.interface";
import { applicantApiInstance } from "../axios";
import {
  RegisterApplicantInput,
  ApplicantCredentials,
  ApplicantUser,
} from "@/interfaces/applicant.interface";

export const applicantApi = {
  registerApplicant: async (
    data: RegisterApplicantInput,
  ): Promise<ApiResponse<ApplicantCredentials>> => {
    const res = await applicantApiInstance.post("/applicant/register", data);
    return res.data;
  },

  loginApplicant: async (data: {
    email: string;
    password: string;
  }): Promise<ApiResponse<ApplicantCredentials>> => {
    const res = await applicantApiInstance.post("/applicant/login", data);
    return res.data;
  },

  applicantLogout: async () => {
    const res = await applicantApiInstance.post("/applicant/logout");
    return res.data;
  },

  getMe: async (): Promise<ApiResponse<ApplicantUser>> => {
    const res = await applicantApiInstance.get("/applicant/me");
    return res.data;
  },

  updateMe: async (data: any) => {
    const res = await applicantApiInstance.patch("/applicant/me", data);
    return res.data;
  },

  changePassword: async (data: {
    currentPassword: string;
    newPassword: string;
  }) => {
    const res = await applicantApiInstance.patch(
      "/applicant/me/password",
      data,
    );
    return res.data;
  },

  getApplication: async () => {
    const res = await applicantApiInstance.get("/applicant/application");
    return res.data;
  },

  getCertificate: async () => {
    const res = await applicantApiInstance.get("/applicant/certificate");
    return res.data;
  },

  getAnnouncements: async () => {
    const res = await applicantApiInstance.get("/applicant/announcements");
    return res.data;
  },
};
