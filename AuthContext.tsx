import { createContext, useContext, useEffect, useMemo, useState, ReactNode } from "react";

export type Role = "customer" | "merchant" | "admin";
export type User = { name: string; phone: string; role: Role; email?: string };

type AuthContextValue = {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  setRole: (role: Role) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

const STORAGE_KEY = "auth_user";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setUser(JSON.parse(raw));
    } catch {}
  }, []);

  useEffect(() => {
    if (user) localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    else localStorage.removeItem(STORAGE_KEY);
  }, [user]);

  const login = (u: User) => setUser(u);
  const logout = () => setUser(null);
  const setRole = (role: Role) => setUser((u) => (u ? { ...u, role } : u));

  const value = useMemo<AuthContextValue>(
    () => ({ user, isAuthenticated: !!user, login, logout, setRole }),
    [user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
