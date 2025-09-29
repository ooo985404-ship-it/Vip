import { createContext, useContext, useEffect, useMemo, useRef, useState, ReactNode } from "react";
import type { CartItem } from "@/context/CartContext";

export type OrderStatus = "preparing" | "approved" | "canceled";
export type Order = {
  id: string;
  items: CartItem[];
  total: number;
  status: OrderStatus;
  createdAt: number;
  customer?: { name: string; phone: string } | null;
};

type OrdersContextValue = {
  orders: Order[];
  addOrder: (payload: { items: CartItem[]; total: number; customer?: { name: string; phone: string } | null }) => Order;
  setStatus: (id: string, status: OrderStatus) => void;
  clearOrders: () => void;
};

const STORAGE_KEY = "orders_store_v1";
const OrdersContext = createContext<OrdersContextValue | null>(null);

export function OrdersProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as Order[]) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
  }, [orders]);

  // Keep timeouts to simulate status transitions
  const timers = useRef<Record<string, number>>({});

  const schedule = (id: string) => {
    // After 6s => approved, but 20% chance canceled
    const t = window.setTimeout(() => {
      setOrders((prev) =>
        prev.map((o) =>
          o.id === id
            ? { ...o, status: Math.random() < 0.2 ? "canceled" : "approved" }
            : o,
        ),
      );
      delete timers.current[id];
    }, 6000);
    timers.current[id] = t as unknown as number;
  };

  const addOrder: OrdersContextValue["addOrder"] = ({ items, total, customer = null }) => {
    const order: Order = {
      id: String(Date.now()),
      items: items.map((i) => ({ ...i })),
      total,
      status: "preparing",
      createdAt: Date.now(),
      customer,
    };
    setOrders((prev) => [order, ...prev]);
    schedule(order.id);
    return order;
  };

  const setStatus: OrdersContextValue["setStatus"] = (id, status) =>
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));

  const clearOrders = () => setOrders([]);

  const value = useMemo<OrdersContextValue>(() => ({ orders, addOrder, setStatus, clearOrders }), [orders]);

  useEffect(() => () => {
    Object.values(timers.current).forEach((t) => clearTimeout(t));
  }, []);

  return <OrdersContext.Provider value={value}>{children}</OrdersContext.Provider>;
}

export function useOrders() {
  const ctx = useContext(OrdersContext);
  if (!ctx) throw new Error("useOrders must be used within OrdersProvider");
  return ctx;
}
