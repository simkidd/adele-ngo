import { announcementApi } from "@/lib/api/announcement.api";
import { useQuery } from "@tanstack/react-query";
import {
  AnnouncementAudience,
  AnnouncementStatus,
  AnnouncementType,
} from "@/interfaces/announcement.interface";

export const usePublicAnnouncements = () => {
  return useQuery({
    queryKey: ["public-announcements"],
    queryFn: () => announcementApi.getPublicAnnouncements(),
  });
};

export const useAdminAnnouncements = (params: {
  status?: AnnouncementStatus;
  audience?: AnnouncementAudience;
  type?: AnnouncementType;
}) => {
  return useQuery({
    queryKey: ["admin-announcements", params],
    queryFn: () => announcementApi.getAdminAnnouncements(params),
  });
};
