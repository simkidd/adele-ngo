import { AdminUser } from "./admin.interface";
import { ICenter } from "./center.interface";

export type AnnouncementType = "General" | "Cohort" | "Program" | "Alert";
export type AnnouncementAudience = "Public" | "Applicants" | "Enrolled" | "All";
export type AnnouncementStatus = "Draft" | "Published" | "Expired";

export interface IAnnouncement {
  _id: string;
  title: string;
  body: string;
  type: AnnouncementType;
  audience: AnnouncementAudience;
  status: AnnouncementStatus;
  centerId: ICenter;
  expiresAt: string;
  createdAt: string;
  updatedAt: string;
  createdBy: AdminUser;
}

export interface CreateAnnouncementInput {
  title: string;
  body: string;
  type: AnnouncementType;
  audience: AnnouncementAudience;
  status: AnnouncementStatus;
  centerId?: string;
  expiresAt?: string;
}
