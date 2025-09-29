import { useOrders } from "@/context/OrderContext";
import RequireRole from "@/components/auth/RequireRole";
import { Button } from "@/components/ui/button";

const StatusBadge = ({ status }: { status: "preparing"|"approved"|"canceled" }) => (
  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${status==="approved"?"bg-emerald-600/15 text-emerald-700":status==="canceled"?"bg-red-600/15 text-red-700":"bg-amber-500/15 text-amber-700"}`}>{status==="approved"?"تمت الموافقة":status==="canceled"?"أُلغي":"قيد التحضير"}</span>
);

export default function MerchantOrders() {
  const { orders, setStatus } = useOrders();
  return (
    <RequireRole allow={["merchant","admin"]}>
      <div className="grid gap-3">
        {orders.length === 0 ? (
          <p className="text-muted-foreground">لا توجد طلبات حالياً.</p>
        ) : (
          orders.map((o) => (
            <div key={o.id} className="flex items-center justify-between border rounded-xl p-3">
              <div>
                <div className="text-sm">طلب #{o.id} — {o.customer?.name || "عميل"} ({o.customer?.phone || "-"})</div>
                <div className="text-xs text-muted-foreground">{new Date(o.createdAt).toLocaleString("ar-SA")}</div>
              </div>
              <div className="flex items-center gap-2">
                <StatusBadge status={o.status} />
                <Button variant="secondary" onClick={() => setStatus(o.id, "preparing")}>تحضير</Button>
                <Button onClick={() => setStatus(o.id, "approved")}>موافقة</Button>
                <Button variant="ghost" onClick={() => setStatus(o.id, "canceled")}>إلغاء</Button>
              </div>
            </div>
          ))
        )}
      </div>
    </RequireRole>
  );
}
