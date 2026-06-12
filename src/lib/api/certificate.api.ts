import { adminApiInstance, publicApi } from "../axios";

export const certificate = {
  verifyCertificate: async (id: string) => {
    const res = await publicApi.get(`/certificates/verify/${id}`);
    return res.data;
  },
  listCertificates: async () => {
    const res = await adminApiInstance.get("/certificates");
    return res.data;
  },
  issueCertificate: async (data: { registrationId: string }) => {
    const res = await adminApiInstance.post("/certificates/issue", data);
    return res.data;
  },
};
