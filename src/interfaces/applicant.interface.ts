export interface ApplicantUser {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  gender: "Male" | "Female";
  dob: string;
  stateOfOrigin: string;
  lga: string;
  address: string;
  whatsapp: string;
  nin: string;
  passportPhoto?: string;
  biometricEnrolled: boolean;
  biometricTemplate?: string;
  biometricEnrolledAt?: string;
  biometricCenterId?: string;
  isActive: boolean;
  lastLogin?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ApplicantCredentials {
  accessToken: string;
  applicant: ApplicantUser;
  referenceNumber: string;
}

export interface RegisterApplicantInput {
  nin: string;
  fullName: string;
  dob: string;
  gender: string;
  stateOfOrigin: string;
  phone: string;
  whatsapp: string;
  email: string;
  lga: string;
  address: string;
  centerId: string;
  programId: string;
  secondChoiceId: string | null;
  qualification: string;
  employmentStatus: string;
  priorExperience: string;
  experienceDetail: string;
  motivation: string;
  postTrainingPlan: string;
  referralSource: string;
  specialNeeds: string;
  emergencyName: string;
  emergencyPhone: string;
  emergencyRelation: string;
  passportPhoto: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
}
