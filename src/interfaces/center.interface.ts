import { IProgram } from "./program.interface";

export interface ICenter {
  _id: string;
  name: string;
  slug: "port-harcourt" | "bayelsa";
  code: "PH" | "BY";
  state: string;
  address: string;
  phone: string;
  email: string;
  managerId?: string;
  programs: IProgram[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
