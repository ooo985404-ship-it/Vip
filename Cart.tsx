import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useOrders } from "@/context/OrderContext";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const format = (v: number) => (
  <>
    <span dir="ltr">{new Intl.NumberFormat("ar-SA", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(v)}</span>
    <span className="font-riyal">{"\uFDFC"}</span>
  </>
);

export default function Cart() {
  const { items, updateQty, removeItem, total, clear } = useCart();
  const { isAuthenticated } = useAuth();
  const { addOrder } = useOrders();
  const navigate = useNavigate();

  const submit = () => {
    if (!items.length) {
      toast.error("سلتك فارغ��");
      return;
    }
    if (!isAuthenticated) {
      toast.error("الرجاء التسجيل قبل إرسال الطلب");
      navigate("/auth?redirect=/cart");
      return;
    }
    const order = addOrder({ items, total });
    toast.success("تم إرسال الطلب، شكرًا لك!");
    clear();
    navigate("/dashboard");
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">سلة المشتريات</h1>

      {items.length === 0 ? (
        <p className="text-muted-foreground">لا توجد منتجات بعد.</p>
      ) : (
        <div className="grid gap-4">
          {items.map((it) => (
            <div key={it.id} className="flex items-center gap-4 p-4 border rounded-xl">
              <img src={it.image} alt={it.name} className="w-20 h-20 rounded-md object-cover" />
              <div className="flex-1">
                <div className="font-semibold">{it.name}</div>
                <div className="text-sm text-muted-foreground">{format(it.price)}</div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="secondary" onClick={() => updateQty(it.id, it.qty - 1)}>-</Button>
                <span className="w-8 text-center">{it.qty}</span>
                <Button variant="secondary" onClick={() => updateQty(it.id, it.qty + 1)}>+</Button>
              </div>
              <Button variant="ghost" onClick={() => removeItem(it.id)}>حذف</Button>
            </div>
          ))}

          <div className="flex items-center justify-between border-t pt-4">
            <div className="text-lg">الإجمالي</div>
            <div className="text-lg font-bold text-primary">{format(total)}</div>
          </div>
        </div>
      )}

      <div className="mt-6 flex gap-3">
        <Button size="lg" onClick={submit}>إرسال الطلب</Button>
        <Button size="lg" variant="secondary" onClick={() => navigate(-1)}>متابعة التسوق</Button>
      </div>
    </div>
  );
}
