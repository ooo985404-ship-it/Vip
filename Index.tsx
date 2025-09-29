import { useMemo } from "react";
import ProductCard, { type Product } from "@/components/shop/ProductCard";
import { toast } from "sonner";
import { useProducts } from "@/context/ProductsContext";

export default function Index() {

  const { listBy } = useProducts();

  const popular = useMemo<Product[]>(
    () => listBy("popular"),
    [listBy],
  );

  const offers = useMemo<Product[]>(
    () => listBy("offers"),
    [listBy],
  );

  const addToCart = (p: Product) => {
    toast.success(`تمت إضافة ${p.name} إلى السلة`);
  };

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_10%_10%,hsl(var(--accent)/0.15),transparent_60%),radial-gradient(40%_40%_at_90%_20%,hsl(var(--primary)/0.15),transparent_60%)]" />
        <div className="container mx-auto relative py-16 sm:py-20">
          <div className="flex flex-col items-center text-center">
            <img src="https://cdn.builder.io/api/v1/image/assets%2F85a38ba16d074505ba42a71e3624baac%2F1c9a26b5f02c48fd82c8bbda553b21fc?format=webp&width=200" alt="بسيطة" className="h-16 w-auto mb-4 rounded-xl" />
            <h1 className="font-extrabold text-3xl sm:text-5xl tracking-tight">
              نكهات سعودية أصيلة
            </h1>
            <p className="mt-3 max-w-2xl text-muted-foreground text-base sm:text-lg">
              تذوّق أطباقًا سعودية تقليدية محضّرة بحب وتصل ساخنة وطازجة إلى باب منزلك.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a href="#popular" className="inline-flex items-center rounded-lg bg-primary px-5 py-2.5 text-primary-foreground font-semibold shadow hover:bg-primary/90">استكشف الأكثر شعبية</a>
              <a href="#offers" className="inline-flex items-center rounded-lg bg-accent px-5 py-2.5 text-accent-foreground font-semibold shadow hover:bg-accent/90">شاهد العروض</a>
            </div>
          </div>
        </div>
      </section>

      {/* Popular */}
      <section id="popular" className="container mx-auto py-10 sm:py-14">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold">الأكثر شعبية</h2>
            <p className="text-muted-foreground">الأطباق المفضلة هذا الأسبوع</p>
          </div>
          <a href="#offers" className="text-primary hover:underline">شاهد العروض</a>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:gap-6">
          {popular.map((p) => (
            <ProductCard key={p.id} product={p} onAdd={addToCart} />
          ))}
        </div>
      </section>

      {/* Offers */}
      <section id="offers" className="container mx-auto pb-16">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold">العروض</h2>
            <p className="text-muted-foreground">عروض لفترة محدودة على الأطباق الكلاسيكية</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:gap-6">
          {offers.map((p) => (
            <ProductCard key={p.id} product={p} onAdd={addToCart} />
          ))}
        </div>
      </section>
    </div>
  );
}
