import { useParams, useNavigate } from "react-router-dom";
import { useProducts } from "@/context/ProductsContext";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getById } = useProducts();
  const product = id ? getById(id) : undefined;
  const { addItem } = useCart();
  const { isAuthenticated } = useAuth();

  if (!product) {
    return (
      <div className="container mx-auto py-10">
        <p className="text-center text-muted-foreground">المنتج غير موجود.</p>
        <div className="mt-6 flex justify-center">
          <Button onClick={() => navigate(-1)}>عودة</Button>
        </div>
      </div>
    );
  }

  const orderNow = () => {
    if (!isAuthenticated) {
      toast.error("الرجاء التسجيل لإتمام الطلب");
      navigate(`/auth?redirect=/product/${product.id}`);
      return;
    }
    addItem({ id: product.id, name: product.name, price: product.price, image: product.image }, 1);
    toast.success(`تمت إضافة ${product.name} إلى السلة`);
    navigate("/cart");
  };

  return (
    <div className="container mx-auto py-8">
      <button onClick={() => navigate(-1)} className="text-primary hover:underline mb-4">عودة</button>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="rounded-xl overflow-hidden border">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        </div>
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold mb-3">{product.name}</h1>
          <p className="text-muted-foreground mb-6">طبق سعودي تقليدي شهي محضّر بعناية باستخدام مكونات طازجة.</p>
          <div className="text-2xl font-bold text-primary flex items-baseline gap-2 mb-6 justify-start">
            <span dir="ltr">{new Intl.NumberFormat("ar-SA", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(product.price)}</span>
            <span className="font-riyal" aria-label="ريال سعودي">{"\uFDFC"}</span>
          </div>
          <div className="flex gap-3">
            <Button size="lg" onClick={orderNow}>اطلب الآن</Button>
            <Button size="lg" variant="secondary" onClick={() => navigate(-1)}>رجوع</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
