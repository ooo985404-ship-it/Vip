import { ReactNode, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "sonner";

export default function RequireRole({ allow, children }: { allow: ("customer"|"merchant"|"admin")[]; children: ReactNode }) {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const loc = useLocation();

  useEffect(() => {
    if (!isAuthenticated || !user || !allow.includes(user.role)) {
      toast.error("ليست لديك صلاحية الوصول، الرجاء تسجيل الدخول");
      navigate(`/auth?redirect=${encodeURIComponent(loc.pathname)}`);
    }
  }, [isAuthenticated, user, loc.pathname]);

  if (!isAuthenticated || !user || !allow.includes(user.role)) return null;
  return <>{children}</>;
}
