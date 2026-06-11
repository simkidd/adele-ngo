"use client";
import { ReactNode, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export function makeQueryClient(): QueryClient {
  return new QueryClient({ defaultOptions: { queries: { staleTime: 60000 } } });
}

let client: QueryClient | undefined;

export function QueryProvider({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => {
    const c = makeQueryClient();
    if (typeof window !== "undefined") {
      client = c;
    }
    return c;
  });
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
