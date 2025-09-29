import type { Product } from "@/components/shop/ProductCard";

export const popular: Product[] = [
  {
    id: "kabsa",
    name: "كبسة",
    price: 42,
    image:
      "https://images.unsplash.com/photo-1604908177453-74629501f2f7?q=80&w=1600&auto=format&fit=crop",
    badge: "Popular",
  },
  {
    id: "jareesh",
    name: "جريش",
    price: 28,
    image:
      "https://images.unsplash.com/photo-1556679343-c7306c76c5f2?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: "mutabbaq",
    name: "مطب��",
    price: 22,
    image:
      "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: "samboosa",
    name: "سمبوسة",
    price: 18,
    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1600&auto=format&fit=crop",
  },
];

export const offers: Product[] = [
  {
    id: "margoug",
    name: "مرقوق",
    price: 30,
    image:
      "https://images.unsplash.com/photo-1617195737493-7e565b82f43b?q=80&w=1600&auto=format&fit=crop",
    badge: "-20%",
  },
  {
    id: "harees",
    name: "هريس",
    price: 25,
    image:
      "https://images.unsplash.com/photo-1533777324565-a040eb52fac1?q=80&w=1600&auto=format&fit=crop",
    badge: "Deal",
  },
  {
    id: "maqluba",
    name: "مقلوبة",
    price: 36,
    image:
      "https://images.unsplash.com/photo-1617191519406-b416fd3a5281?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: "kunafa",
    name: "كنافة",
    price: 16,
    image:
      "https://images.unsplash.com/photo-1625944529227-62c6d1143eec?q=80&w=1600&auto=format&fit=crop",
  },
];

export const allProducts: Product[] = [...popular, ...offers];

export const getProductById = (id: string) => allProducts.find((p) => p.id === id);
