import { ICenter } from "./center.interface";
import { IProgram } from "./program.interface";

export interface ICohort {
  _id: string;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  status: string;
  centers: ICohortCenter[];
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
