import { ICenter } from "./center.interface";

export type AdminRole = "super_admin" | "program_officer" | "blog_editor";

export interface AdminUser {
  id: string;
  fullName: string;
  email: string;
  role: AdminRole;
  centerId?: ICenter;
  lastLogin?: string | null;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
}

export interface AdminLoginResponse {
  accessToken: string;
  user: AdminUser;
}

export interface CreateAdminInput {
  fullName: string;
  email: string;
  role: AdminRole;
  centerId?: string;
  password: string;
}
