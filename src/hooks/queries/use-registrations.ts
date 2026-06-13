import { RegistrationStatus } from "@/interfaces/registration.interface";
import { registrationApi } from "@/lib/api/registration.api";
import { useQuery } from "@tanstack/react-query";

export interface ListRegistrationsParams {
  page?: number;
  limit?: number;
  cohortId?: string;
  centerId?: string;
  programId?: string;
  status?: RegistrationStatus | "All";
  search?: string;
}

export const useRegistrations = (params?: ListRegistrationsParams) => {
  return useQuery({
    queryKey: ["registrations", params],
    queryFn: async () => {
      const res = await registrationApi.listRegistrations(params);
      return res.data;
    },
  });
};

export const useRegistrationStats = (params?: { centerId: string }) => {
  return useQuery({
    queryKey: ["registrations", "stats", params],
    queryFn: async () => {
      const res = await registrationApi.getRegistrationStats(params);
      return res.data;
    },
  });
};

export const useRegistration = (registrationId: string) => {
  return useQuery({
    queryKey: ["registration", registrationId],
    queryFn: async () => {
      const res = await registrationApi.getRegistration(registrationId);
      return res.data;
    },
    enabled: !!registrationId,
  });
};
