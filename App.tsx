import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
import { OrdersProvider } from "@/context/OrderContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { ProductsProvider } from "@/context/ProductsContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import NationalDayBanner from "@/components/layout/NationalDayBanner";
import ProductDetails from "@/pages/ProductDetails";
import Cart from "@/pages/Cart";
import AuthPage from "@/pages/Auth";
import Dashboard from "@/pages/Dashboard";
import MerchantDashboard from "@/pages/MerchantDashboard";
import AdminDashboard from "@/pages/AdminDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <OrdersProvider>
          <CartProvider>
            <ProductsProvider>
              <ThemeProvider>
                <BrowserRouter>
              <div className="min-h-screen flex flex-col">
            <Header />
            <NationalDayBanner />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/merchant" element={<MerchantDashboard />} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/auth" element={<AuthPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
              </div>
                </BrowserRouter>
              </ThemeProvider>
            </ProductsProvider>
          </CartProvider>
        </OrdersProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
