import { AdminUser } from "./admin.interface";

export type BlogCategory = "News" | "Programs" | "Community" | "Impact";
export type BlogStatus = "Draft" | "Published";

export interface IPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  category: BlogCategory;
  status: BlogStatus;
  authorId: AdminUser;
  authorName: string;
  coverImage: string;
  coverPublicId: string;
  readTime: number;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePostInput {
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  category: string;
  status: "draft" | "published";
  createdAt: string;
  updatedAt: string;
}
