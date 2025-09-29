import { NavLink, Outlet } from "react-router-dom";

export default function MerchantLayout() {
  const link = "px-3 py-2 rounded-md text-sm hover:bg-accent hover:text-accent-foreground";
  const active = ({ isActive }: any) => `${link} ${isActive ? "bg-accent text-accent-foreground" : ""}`;
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">لوحة التاجر</h1>
      <nav className="flex gap-2 mb-6">
        <NavLink to="/merchant/products" className={active}>المنتجات</NavLink>
        <NavLink to="/merchant/orders" className={active}>الطلبات</NavLink>
        <NavLink to="/merchant/customers" className={active}>العملاء</NavLink>
        <NavLink to="/merchant/settings" className={active}>الإعدادات</NavLink>
      </nav>
      <Outlet />
    </div>
  );
}
