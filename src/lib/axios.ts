import axios, {
  AxiosInstance,
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";
import cookies from "js-cookie";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api/v1";

let adminToken: string | null = null;
let applicantToken: string | null = null;
export const setAdminToken = (t: string | null) => {
  adminToken = t;
};
export const setApplicantToken = (t: string | null) => {
  applicantToken = t;
};
export const getAdminToken = () => adminToken;
export const getApplicantToken = () => applicantToken;
export const getApiError = (error: unknown): string => {
  if (axios.isAxiosError(error))
    return (
      (error.response?.data as { message?: string })?.message ?? error.message
    );
  return (error as Error).message ?? "Something went wrong";
};

const createInstance = (): AxiosInstance =>
  axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
    headers: { "Content-Type": "application/json" },
    timeout: 15000,
  });

// Admin APIs
export const adminApiInstance = createInstance();

adminApiInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (adminToken) config.headers.Authorization = `Bearer ${adminToken}`;
    return config;
  },
);
let isRefreshingAdmin = false;
let adminQueue: ((t: string) => void)[] = [];
adminApiInstance.interceptors.response.use(
  (r) => r,
  async (error: AxiosError) => {
    const orig = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };
    if (error.response?.status === 401 && !orig._retry) {
      if (isRefreshingAdmin)
        return new Promise((res) =>
          adminQueue.push((t) => {
            orig.headers.Authorization = `Bearer ${t}`;
            res(adminApiInstance(orig));
          }),
        );
      orig._retry = true;
      isRefreshingAdmin = true;
      try {
        const { data } = await axios.post(
          `${BASE_URL}/auth/refresh`,
          {},
          { withCredentials: true },
        );
        const t = data.data.accessToken as string;
        setAdminToken(t);
        adminQueue.forEach((cb) => cb(t));
        adminQueue = [];
        orig.headers.Authorization = `Bearer ${t}`;
        return adminApiInstance(orig);
      } catch {
        setAdminToken(null);
        if (typeof window !== "undefined") window.location.href = "/admin";
        return Promise.reject(error);
      } finally {
        isRefreshingAdmin = false;
      }
    }
    return Promise.reject(error);
  },
);

// Applicant APIs
export const applicantApiInstance = createInstance();
applicantApiInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (applicantToken)
      config.headers.Authorization = `Bearer ${applicantToken}`;
    return config;
  },
);
let isRefreshingApplicant = false;
let applicantQueue: ((t: string) => void)[] = [];
applicantApiInstance.interceptors.response.use(
  (r) => r,
  async (error: AxiosError) => {
    const orig = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };
    if (error.response?.status === 401 && !orig._retry) {
      if (isRefreshingApplicant)
        return new Promise((res) =>
          applicantQueue.push((t) => {
            orig.headers.Authorization = `Bearer ${t}`;
            res(applicantApiInstance(orig));
          }),
        );
      orig._retry = true;
      isRefreshingApplicant = true;
      try {
        const { data } = await axios.post(
          `${BASE_URL}/applicant/refresh`,
          {},
          { withCredentials: true },
        );
        const t = data.data.accessToken as string;
        setApplicantToken(t);
        applicantQueue.forEach((cb) => cb(t));
        applicantQueue = [];
        orig.headers.Authorization = `Bearer ${t}`;
        return applicantApiInstance(orig);
      } catch {
        setApplicantToken(null);
        if (typeof window !== "undefined") window.location.href = "/login";
        return Promise.reject(error);
      } finally {
        isRefreshingApplicant = false;
      }
    }
    return Promise.reject(error);
  },
);

// Public APIs
export const publicApi = createInstance();
