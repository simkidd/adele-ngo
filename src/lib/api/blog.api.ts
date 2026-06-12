import { CreatePostInput, IPost } from "@/interfaces/blog.interface";
import {
  ApiResponse,
  PaginatedResponse,
} from "@/interfaces/response.interface";
import { adminApiInstance, publicApi } from "../axios";

export const blogApi = {
  getPublishedPosts: async (): Promise<PaginatedResponse<IPost[]>> => {
    const res = await publicApi.get("/blogs");
    return res.data;
  },
  getSinglePost: async (slug: string): Promise<ApiResponse<IPost>> => {
    const res = await publicApi.get(`/blogs/${slug}`);
    return res.data;
  },
  createPost: async (data: CreatePostInput): Promise<ApiResponse<IPost>> => {
    const res = await adminApiInstance.post("/blogs", data);
    return res.data;
  },
  updatePost: async (
    id: string,
    data: CreatePostInput,
  ): Promise<ApiResponse<IPost>> => {
    const res = await adminApiInstance.patch(`/blogs/admin/${id}`, data);
    return res.data;
  },
  deletePost: async (id: string): Promise<ApiResponse<IPost>> => {
    const res = await adminApiInstance.delete(`/blogs/${id}`);
    return res.data;
  },
  getAdminPosts: async (): Promise<PaginatedResponse<IPost[]>> => {
    const res = await adminApiInstance.get("/blogs/admin/all");
    return res.data;
  },
  getAdminPostById: async (id: string): Promise<ApiResponse<IPost>> => {
    const res = await adminApiInstance.get(`/blogs/admin/${id}`);
    return res.data;
  },
  uploadCoverImage: async (
    id: string,
    image: File,
  ): Promise<ApiResponse<IPost>> => {
    const formData = new FormData();
    formData.append("image", image);
    const res = await adminApiInstance.post(`/blogs/${id}/cover`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  },
};
