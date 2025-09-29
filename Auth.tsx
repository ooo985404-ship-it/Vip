import { useSearchParams, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function AuthPage() {
  const [params] = useSearchParams();
  const redirect = params.get("redirect") || "/";
  const navigate = useNavigate();
  const { login } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState<"customer" | "merchant" | "admin">("customer");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;
    const finalRole = email.trim().toLowerCase() === "ooo985404@gmail.com" ? "admin" : role;
    login({ name, phone, role: finalRole, email });
    navigate(redirect);
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">التسجيل</h1>
      <form onSubmit={submit} className="max-w-md grid gap-4">
        <label className="grid gap-2">
          <span>الاسم الكامل</span>
          <input value={name} onChange={(e) => setName(e.target.value)} className="border rounded-md px-3 py-2 bg-background" required />
        </label>
        <label className="grid gap-2">
          <span>البريد الإلكتروني</span>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="border rounded-md px-3 py-2 bg-background" placeholder="name@example.com" />
          {email.trim().toLowerCase() === "ooo985404@gmail.com" && (
            <span className="text-xs text-emerald-600">سيتم منح هذا المستخدم صلاحية الأدمن تلقائيًا (وضع تجريبي).</span>
          )}
        </label>
        <label className="grid gap-2">
          <span>رقم الجوال</span>
          <input value={phone} onChange={(e) => setPhone(e.target.value)} className="border rounded-md px-3 py-2 bg-background" required />
        </label>
        <label className="grid gap-2">
          <span>الدور</span>
          <select value={role} onChange={(e) => setRole(e.target.value as any)} className="border rounded-md px-3 py-2 bg-background">
            <option value="customer">عميل</option>
            <option value="merchant">تاجر (تجريبي)</option>
            <option value="admin">أدمن (تجريبي)</option>
          </select>
          <span className="text-xs text-muted-foreground">للنسخة التجريبية فقط، سيتم ضبط الصلاحيات عند ربط القاعدة.</span>
        </label>
        <div className="flex gap-3">
          <Button type="submit">تسجيل</Button>
          <Button type="button" variant="secondary" onClick={() => navigate(-1)}>رجوع</Button>
        </div>
      </form>
    </div>
  );
}
