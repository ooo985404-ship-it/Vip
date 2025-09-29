import { useOrders } from "@/context/OrderContext";
import RequireRole from "@/components/auth/RequireRole";

export default function MerchantCustomers() {
  const { orders } = useOrders();
  const map = new Map<string, { name: string; phone: string; count: number }>();
  for (const o of orders) {
    if (!o.customer) continue;
    const key = o.customer.phone;
    map.set(key, { name: o.customer.name, phone: o.customer.phone, count: (map.get(key)?.count || 0) + 1 });
  }
  const customers = Array.from(map.values());
  return (
    <RequireRole allow={["merchant","admin"]}>
      {customers.length === 0 ? (
        <p className="text-muted-foreground">لا يوجد عملاء بعد.</p>
      ) : (
        <div className="grid gap-3">
          {customers.map((c) => (
            <div key={c.phone} className="flex items-center justify-between border rounded-xl p-3">
              <div className="font-semibold">{c.name}</div>
              <div className="text-sm text-muted-foreground">{c.phone}</div>
              <div className="text-sm">طلبات: {c.count}</div>
            </div>
          ))}
        </div>
      )}
    </RequireRole>
  );
}
