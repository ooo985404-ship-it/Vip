import RequireRole from "@/components/auth/RequireRole";

export default function AdminSettings() {
  return (
    <RequireRole allow={["admin"]}>
      <p className="text-sm text-muted-foreground">إعدادات الموقع العامة (SMTP/OTP/السمات) ستتوفر بعد الربط.</p>
    </RequireRole>
  );
}
