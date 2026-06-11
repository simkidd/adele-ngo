export interface AdminUser {
  id: string;
  fullName: string;
  email: string;
  role: "super_admin" | "program_officer" | "blog_editor";
  centerId: string | null;
}
