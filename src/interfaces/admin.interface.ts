export interface AdminUser {
  id: string;
  fullName: string;
  email: string;
  role: "super_admin" | "program_officer" | "blog_editor";
  centerId: string | null;
  lastLogin?: string | null;
}

export interface AdminLoginResponse {
  accessToken: string;
  user: AdminUser;
}

export interface CreateAdminInput {
  fullName: string;
  email: string;
  role: "super_admin" | "program_officer" | "blog_editor";
  centerId?: string;
  password: string;
}
