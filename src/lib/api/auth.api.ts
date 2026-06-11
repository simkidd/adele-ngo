import { adminApiInstance, applicantApiInstance, publicApi } from "../axios";

export const authApi = {
  adminLogin: (email: string, password: string) => {
    return adminApiInstance.post("/auth/login", { email, password });
  },
  adminLogout: () => {
    return adminApiInstance.post("/auth/logout");
  },

  applicantLogin: (email: string, password: string) => {
    return applicantApiInstance.post("/auth/login", { email, password });
  },
  applicantLogout: () => {
    return applicantApiInstance.post("/auth/logout");
  },

  applicantRegister: (data: any) => {
    return publicApi.post("/applicant/register", data);
  },

  uploadPassport: (formData: FormData) => {
    return publicApi.post("/applicant/upload/passport", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
};
