export type ProgramCategory =
  | "Construction & Civil Works"
  | "Fabrication & Metalwork"
  | "Woodwork & Furniture"
  | "Automotive & Mechanical"
  | "Technology & Networks"
  | "Media & Communications"
  | "Agriculture"
  | "Fashion & Beauty"
  | "Hospitality";

export interface IProgram {
  _id: string;
  title: string;
  slug: string;
  category: ProgramCategory;
  description: string;
  objectives: string[];
  outcomes: string[];
  isActive: boolean;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateProductInput {
  title: string;
  category: ProgramCategory;
  description: string;
  objectives: string[];
  outcomes: string[];
  isActive: boolean;
}
