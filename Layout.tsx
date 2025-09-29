import { NavLink, Outlet } from "react-router-dom";

export default function AdminLayout() {
  const link = "px-3 py-2 rounded-md text-sm hover:bg-accent hover:text-accent-foreground";
  const active = ({ isActive }: any) => `${link} ${isActive ? "bg-accent text-accent-foreground" : ""}`;
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">لوحة الإدارة</h1>
      <nav className="flex gap-2 mb-6">
        <NavLink to="/admin/users" className={active}>الأعضاء</NavLink>
        <NavLink to="/admin/shops" className={active}>المتاجر</NavLink>
        <NavLink to="/admin/settings" className={active}>الإعدادات</NavLink>
      </nav>
      <Outlet />
    </div>
  );
}
