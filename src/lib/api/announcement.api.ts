import {
  AnnouncementAudience,
  AnnouncementStatus,
  AnnouncementType,
  CreateAnnouncementInput,
  IAnnouncement,
} from "@/interfaces/announcement.interface";
import { adminApiInstance, publicApi } from "../axios";
import { ApiResponse } from "@/interfaces/response.interface";

export const announcementApi = {
  getPublicAnnouncements: async (): Promise<ApiResponse<IAnnouncement[]>> => {
    const res = await publicApi.get("/announcements/public");
    return res.data;
  },

  getAdminAnnouncements: async (params: {
    status?: AnnouncementStatus;
    audience?: AnnouncementAudience;
    type?: AnnouncementType;
  }): Promise<ApiResponse<IAnnouncement[]>> => {
    const res = await adminApiInstance.get("/announcements", { params });
    return res.data;
  },

  createAdminAnnouncement: async (
    data: CreateAnnouncementInput,
  ): Promise<ApiResponse<IAnnouncement>> => {
    const res = await adminApiInstance.post("/announcements", data);
    return res.data;
  },

  updateAdminAnnouncement: async (
    id: string,
    data: CreateAnnouncementInput,
  ): Promise<ApiResponse<IAnnouncement>> => {
    const res = await adminApiInstance.patch(`/announcements/${id}`, data);
    return res.data;
  },

  deleteAdminAnnouncement: async (id: string): Promise<ApiResponse<void>> => {
    const res = await adminApiInstance.delete(`/announcements/${id}`);
    return res.data;
  },
};
