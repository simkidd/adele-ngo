import { AdminUser } from "./admin.interface";
import { ICenter } from "./center.interface";
import { IProgram } from "./program.interface";

export type CohortStatus = "Draft" | "Open" | "Closed" | "Active" | "Completed";

export interface ICohort {
  _id: string;
  name: string;
  applicationStart: string;
  applicationEnd: string;
  startDate: string;
  endDate: string;
  status: CohortStatus;
  centers: ICohortCenter[];
  createdBy: AdminUser;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  completedAt?: string;
}

export interface ICohortCenter {
  centerId: ICenter;
  programs: ICohortProgram[];
}

export interface ICohortProgram {
  programId: IProgram;
  totalSeats: number;
  enrolledCount: number;
}
