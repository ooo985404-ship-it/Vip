import { useThemeConfig } from "@/context/ThemeContext";
import RequireRole from "@/components/auth/RequireRole";

export default function MerchantSettings() {
  const theme = useThemeConfig();
  return (
    <RequireRole allow={["merchant","admin"]}>
      <div className="grid gap-4 md:grid-cols-2 max-w-3xl">
        <label className="grid gap-2">
          <span>رابط الشعار</span>
          <input value={theme.logoUrl || ""} onChange={(e) => theme.setLogo(e.target.value)} className="border rounded-md px-3 py-2 bg-background" />
        </label>
        <label className="grid gap-2">
          <span>اللون الأساسي (HSL)</span>
          <input placeholder="مثال: 261 89% 60%" onChange={(e) => theme.setPrimary(e.target.value)} className="border rounded-md px-3 py-2 bg-background" />
        </label>
        <label className="grid gap-2">
          <span>لون التمييز (HSL)</span>
          <input placeholder="مثال: 199 100% 50%" onChange={(e) => theme.setAccent(e.target.value)} className="border rounded-md px-3 py-2 bg-background" />
        </label>
      </div>
    </RequireRole>
  );
}
