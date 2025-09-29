import { useProducts } from "@/context/ProductsContext";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import RequireRole from "@/components/auth/RequireRole";

export default function MerchantProducts() {
  const { products, add, update, remove } = useProducts();
  const [form, setForm] = useState({ name: "", price: "", image: "", category: "popular" as "popular" | "offers" });

  const create = () => {
    if (!form.name || !form.price) return;
    add({ name: form.name, price: parseFloat(form.price), image: form.image || "https://images.unsplash.com/photo-1604908177453-74629501f2f7?q=80&w=1600&auto=format&fit=crop", category: form.category });
    setForm({ name: "", price: "", image: "", category: "popular" });
  };

  return (
    <RequireRole allow={["merchant","admin"]}>
      <section className="grid gap-4">
        <div className="grid gap-3 md:grid-cols-2">
          <input placeholder="اسم المنتج" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="border rounded-md px-3 py-2 bg-background" />
          <input placeholder="السعر" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} className="border rounded-md px-3 py-2 bg-background" />
          <input placeholder="رابط الصو��ة" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} className="border rounded-md px-3 py-2 bg-background md:col-span-2" />
          <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value as any })} className="border rounded-md px-3 py-2 bg-background">
            <option value="popular">الأكثر شعبية</option>
            <option value="offers">العروض</option>
          </select>
          <Button onClick={create}>إضافة</Button>
        </div>
        <div className="grid gap-3">
          {products.map((p) => (
            <div key={p.id} className="flex items-center gap-3 border rounded-xl p-3">
              <img src={p.image} className="w-16 h-16 rounded object-cover" />
              <div className="flex-1">
                <div className="font-semibold">{p.name}</div>
                <div className="text-xs text-muted-foreground">{p.category === "popular" ? "الأكثر شعبية" : "العروض"}</div>
              </div>
              <Button variant="secondary" onClick={() => update(p.id, { category: p.category === "popular" ? "offers" : "popular" })}>نقل التصنيف</Button>
              <Button variant="ghost" onClick={() => remove(p.id)}>حذف</Button>
            </div>
          ))}
        </div>
      </section>
    </RequireRole>
  );
}
