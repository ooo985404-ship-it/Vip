import { Link } from "react-router-dom";
import { ShoppingCart, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { useThemeConfig } from "@/context/ThemeContext";
import { useAuth } from "@/context/AuthContext";

export default function Header({ cartCount = 0 }: { cartCount?: number }) {
  const { count } = useCart();
  const theme = useThemeConfig();
  const { user } = useAuth();
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur bg-background/70 border-b">
      <div className="container mx-auto flex h-16 items-center justify-between">
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2">
            <img src={theme.logoUrl || "https://cdn.builder.io/api/v1/image/assets%2F85a38ba16d074505ba42a71e3624baac%2F1c9a26b5f02c48fd82c8bbda553b21fc?format=webp&width=160"} alt="بسيطة" className="h-8 w-auto rounded-lg" />
            <span className="font-bold text-lg tracking-tight">بسيطة</span>
          </Link>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <a href="#popular" className="text-foreground/80 hover:text-foreground transition">الأكثر شعبية</a>
          <a href="#offers" className="text-foreground/80 hover:text-foreground transition">العروض</a>
          <Link to="/dashboard" className="text-foreground/80 hover:text-foreground transition">الطلبات</Link>
          {(user?.role === "merchant" || user?.role === "admin") && (
            <Link to="/merchant" className="text-foreground/80 hover:text-foreground transition">لوحة التاجر</Link>
          )}
          {user?.role === "admin" && (
            <Link to="/admin" className="text-foreground/80 hover:text-foreground transition">الإدارة</Link>
          )}
        </nav>
        <div className="flex items-center gap-2">
          <Button variant="ghost" className="md:hidden" aria-label="القائمة">
            <Menu className="h-5 w-5" />
          </Button>
          <Button variant="ghost" asChild aria-label="السلة">
            <Link to="/cart" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {count > 0 && (
                <span className="absolute -top-2 -right-2 rounded-full bg-accent text-accent-foreground text-[10px] px-1.5 py-0.5 font-semibold">
                  {count}
                </span>
              )}
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
