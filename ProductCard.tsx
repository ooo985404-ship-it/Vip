import { Button } from "@/components/ui/button";

export type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  badge?: string;
};

import { useNavigate, Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";

export default function ProductCard({ product, onAdd }: { product: Product; onAdd: (p: Product) => void }) {
  const navigate = useNavigate();
  const { addItem } = useCart();
  return (
    <div className="group rounded-xl border bg-card hover:shadow-lg transition overflow-hidden">
      <Link to={`/product/${product.id}`} className="block relative aspect-[4/3] overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
          loading="lazy"
        />
        {product.badge && (
          <span className="absolute left-3 top-3 rtl-right-3 rounded-full bg-accent text-accent-foreground text-xs px-2 py-1 shadow">
            {product.badge}
          </span>
        )}
      </Link>
      <div className="p-3 sm:p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <Link to={`/product/${product.id}`} className="hover:underline">
              <h3 className="font-semibold leading-tight text-[15px] sm:text-base">{product.name}</h3>
            </Link>
            <p className="mt-1 text-sm text-muted-foreground">طبق سعودي تقليدي</p>
          </div>
          <div className="text-right">
            <div className="font-bold text-primary flex items-baseline gap-1 justify-end">
              <span dir="ltr">{new Intl.NumberFormat("ar-SA", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(product.price)}</span>
              <span className="font-riyal" aria-label="ريال سعودي">{"\uFDFC"}</span>
            </div>
          </div>
        </div>
        <Button onClick={(e) => { addItem({ id: product.id, name: product.name, price: product.price, image: product.image }, 1); onAdd(product); }} className="mt-4 w-full">أضف إلى السلة</Button>
      </div>
    </div>
  );
}
