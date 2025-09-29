import RequireRole from "@/components/auth/RequireRole";

export default function AdminShops() {
  return (
    <RequireRole allow={["admin"]}>
      <p className="text-sm text-muted-foreground">إدارة المتاجر ستُفعل بعد الربط بقاعدة البيانات.</p>
    </RequireRole>
  );
}
