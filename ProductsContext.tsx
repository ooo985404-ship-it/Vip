import { createContext, useContext, useMemo, useState, ReactNode } from "react";
import type { Product } from "@/components/shop/ProductCard";
import { popular as seedPopular, offers as seedOffers } from "@/data/products";

export type Category = "popular" | "offers";
export type ProductWithCat = Product & { category: Category };

type ProductsCtx = {
  products: ProductWithCat[];
  add: (p: Omit<ProductWithCat, "id">) => ProductWithCat;
  update: (id: string, p: Partial<ProductWithCat>) => void;
  remove: (id: string) => void;
  listBy: (category: Category) => ProductWithCat[];
  getById: (id: string) => ProductWithCat | undefined;
};

const ProductsContext = createContext<ProductsCtx | null>(null);

export function ProductsProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<ProductWithCat[]>(() => [
    ...seedPopular.map((p) => ({ ...p, category: "popular" })),
    ...seedOffers.map((p) => ({ ...p, category: "offers" })),
  ]);

  const add: ProductsCtx["add"] = (p) => {
    const item = { ...p, id: String(Date.now()) } as ProductWithCat;
    setProducts((prev) => [item, ...prev]);
    return item;
  };
  const update: ProductsCtx["update"] = (id, p) =>
    setProducts((prev) => prev.map((x) => (x.id === id ? { ...x, ...p } : x)));
  const remove = (id: string) => setProducts((prev) => prev.filter((x) => x.id !== id));

  const listBy = (category: Category) => products.filter((p) => p.category === category);
  const getById = (id: string) => products.find((p) => p.id === id);

  const value = useMemo<ProductsCtx>(() => ({ products, add, update, remove, listBy, getById }), [products]);

  return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>;
}

export function useProducts() {
  const ctx = useContext(ProductsContext);
  if (!ctx) throw new Error("useProducts must be used within ProductsProvider");
  return ctx;
}
