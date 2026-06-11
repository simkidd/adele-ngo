import AdminShell from "@/components/admin/AdminShell";
import { AdminAuthGuard } from "@/guards/AdminAuthGuard";

export const metadata = { title: "Admin | Adele Foundation" };

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminAuthGuard>
      <AdminShell>{children}</AdminShell>
    </AdminAuthGuard>
  );
}
