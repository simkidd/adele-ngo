import { adminApiInstance, publicApi } from "../axios";

export const submissionApi = {
  createSubmission: async (data: any) => {
    const res = await publicApi.post("/submissions", data);
    return res.data;
  },
  listSubmissions: async () => {
    const res = await adminApiInstance.get("/submissions");
    return res.data;
  },
  markAsRead: async (submissionId: string) => {
    const res = await adminApiInstance.patch(
      `/submissions/${submissionId}/read`,
    );
    return res.data;
  },
  deleteSubmission: async (id: string) => {
    const res = await adminApiInstance.delete(`/submissions/${id}`);
    return res.data;
  },
};
