import { adminApiInstance, applicantApiInstance, publicApi } from "../axios";

export const authApi = {
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
