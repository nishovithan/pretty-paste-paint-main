import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useAuth } from "@/hooks/use-auth";
import Index from "./pages/Index.tsx";
import Menu from "./pages/Menu.tsx";
import About from "./pages/About.tsx";
import SignIn from "./pages/SignIn.tsx";
import Order from "./pages/Order.tsx";
import Custom from "./pages/Custom.tsx";
import Admin from "./pages/Admin.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const ProtectedRoute = ({ element }: { element: JSX.Element }) => {
  const { signedIn } = useAuth();
  return signedIn ? element : <Navigate to="/signin" replace />;
};

const AdminRoute = ({ element }: { element: JSX.Element }) => {
  const { signedIn, isAdmin } = useAuth();
  return signedIn && isAdmin ? element : <Navigate to="/menu" replace />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/menu" element={<ProtectedRoute element={<Menu />} />} />
          <Route path="/order" element={<ProtectedRoute element={<Order />} />} />
          <Route path="/custom" element={<ProtectedRoute element={<Custom />} />} />
          <Route path="/admin" element={<AdminRoute element={<Admin />} />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
