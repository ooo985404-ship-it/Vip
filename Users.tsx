import { useAuth } from "@/context/AuthContext";
import RequireRole from "@/components/auth/RequireRole";

export default function AdminUsers() {
  const { user } = useAuth();
  return (
    <RequireRole allow={["admin"]}>
      <div className="text-sm text-muted-foreground">مستخدم حالي: {user?.name} — {user?.phone}</div>
      <p className="mt-2">هذه الشاشة ستُربط بقاعدة البيانات لإدارة الأعضاء لاحقًا.</p>
    </RequireRole>
  );
}
