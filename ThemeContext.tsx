import { createContext, useContext, useEffect, useMemo, useState, ReactNode } from "react";

type ThemeState = {
  logoUrl?: string;
  primary?: string; // HSL variables like "261 89% 60%"
  accent?: string;
};

type ThemeCtx = ThemeState & {
  setLogo: (url?: string) => void;
  setPrimary: (hsl: string) => void;
  setAccent: (hsl: string) => void;
};

const STORAGE_KEY = "theme_state_v1";
const ThemeContext = createContext<ThemeCtx | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ThemeState>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  useEffect(() => {
    const root = document.documentElement;
    if (state.primary) root.style.setProperty("--primary", state.primary);
    if (state.accent) root.style.setProperty("--accent", state.accent);
  }, [state.primary, state.accent]);

  const setLogo = (url?: string) => setState((s) => ({ ...s, logoUrl: url }));
  const setPrimary = (hsl: string) => setState((s) => ({ ...s, primary: hsl }));
  const setAccent = (hsl: string) => setState((s) => ({ ...s, accent: hsl }));

  const value = useMemo<ThemeCtx>(
    () => ({ ...state, setLogo, setPrimary, setAccent }),
    [state],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useThemeConfig() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useThemeConfig must be used within ThemeProvider");
  return ctx;
}
