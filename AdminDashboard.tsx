import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";

export default function AdminDashboard() {
  const { user, setRole } = useAuth();
  return (
    <div className="container mx-auto py-8 grid gap-6">
      <h1 className="text-2xl font-bold">لوحة الأدمن</h1>
      <div className="border rounded-xl p-4">
        <div className="font-semibold mb-2">المستخدم الحالي</div>
        <div className="text-sm text-muted-foreground">{user?.name} - {user?.phone}</div>
        <div className="mt-3 flex gap-2">
          <Button onClick={() => setRole("customer")}>تحويل لعميل</Button>
          <Button variant="secondary" onClick={() => setRole("merchant")}>تحويل لتاجر</Button>
          <Button variant="ghost" onClick={() => setRole("admin")}>تحويل لأدمن</Button>
        </div>
        <div className="mt-2 text-xs text-muted-foreground">للنسخة التجريبية فقط. عند الربط سيتم إدارة الأدوار من القاعدة.</div>
      </div>
    </div>
  );
}
