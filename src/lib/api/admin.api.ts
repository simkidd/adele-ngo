import { ApiResponse } from "@/interfaces/response.interface";
import { adminApiInstance } from "../axios";
import {
  AdminLoginResponse,
  AdminUser,
  CreateAdminInput,
} from "@/interfaces/admin.interface";

export const adminApi = {
  adminLogin: async (data: {
    email: string;
    password: string;
  }): Promise<ApiResponse<AdminLoginResponse>> => {
    const res = await adminApiInstance.post("/auth/login", data);
    return res.data;
  },
  adminLogout: async () => {
    const res = await adminApiInstance.post("/auth/logout");
    return res.data;
  },

  adminRefreshToken: async () => {
    const res = await adminApiInstance.post("/auth/refresh");
    return res.data;
  },

  //get admin
  getAdminMe: async (): Promise<ApiResponse<AdminUser>> => {
    const { data } = await adminApiInstance.get("/auth/me");
    return data;
  },

  //update admin
  updateAdmin: async (data: any) => {
    const res = await adminApiInstance.patch("/auth/me", data);
    return res.data;
  },

  //change admin password
  changeAdminPassword: async (data: any) => {
    const res = await adminApiInstance.patch("/auth/me/password", data);
    return res.data;
  },

  //add admin
  createAdmin: async (data: CreateAdminInput): Promise<{ message: string }> => {
    const res = await adminApiInstance.post("/auth/users", data);
    return res.data;
  },

  //get all admins
  getAllAdmins: async () => {
    const res = await adminApiInstance.get("/users");
    return res.data;
  },

  //get admin by id
  getAdminById: async (id: string) => {
    const res = await adminApiInstance.get(`/users/${id}`);
    return res.data;
  },

  //update admin by id
  updateAdminById: async (id: string, data: any) => {
    const res = await adminApiInstance.patch(`/users/${id}`, data);
    return res.data;
  },

  //delete admin by id
  deleteAdminById: async (id: string) => {
    const res = await adminApiInstance.delete(`/users/${id}`);
    return res.data;
  },
};
