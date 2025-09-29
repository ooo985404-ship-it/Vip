import { useOrders } from "@/context/OrderContext";

const statusLabel: Record<string, string> = {
  preparing: "قيد التحضير",
  approved: "تمت الموافقة",
  canceled: "أُلغي",
};

const StatusBadge = ({ status }: { status: keyof typeof statusLabel }) => {
  const color =
    status === "approved"
      ? "bg-emerald-600/15 text-emerald-700"
      : status === "canceled"
        ? "bg-red-600/15 text-red-700"
        : "bg-amber-500/15 text-amber-700";
  return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${color}`}>{statusLabel[status]}</span>
  );
};

const Price = ({ value }: { value: number }) => (
  <div className="font-semibold text-primary flex items-baseline gap-1">
    <span dir="ltr">{new Intl.NumberFormat("ar-SA", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value)}</span>
    <span className="font-riyal">{"\uFDFC"}</span>
  </div>
);

export default function Dashboard() {
  const { orders } = useOrders();

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">لوحة الطلبات</h1>
      {orders.length === 0 ? (
        <p className="text-muted-foreground">لا توجد طلبات حتى الآن.</p>
      ) : (
        <div className="grid gap-4">
          {orders.map((o) => (
            <div key={o.id} className="border rounded-xl p-4 flex items-center gap-4">
              <div className="flex-1">
                <div className="text-sm text-muted-foreground">رقم الطلب #{o.id}</div>
                <div className="mt-1 text-xs text-muted-foreground">تاريخ: {new Date(o.createdAt).toLocaleString("ar-SA")}</div>
              </div>
              <Price value={o.total} />
              <StatusBadge status={o.status} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
