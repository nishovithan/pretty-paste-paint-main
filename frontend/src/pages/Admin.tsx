import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import { useState, type FormEvent } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { fetchOrders } from "@/lib/api";

const Admin = () => {
  const { signedIn, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isVerified, setIsVerified] = useState(false);
  const [verifyEmail, setVerifyEmail] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");

  const { data: orders, isLoading, error } = useQuery({
    queryKey: ["orders"],
    queryFn: fetchOrders,
    retry: 1,
    enabled: isVerified,
  });

  if (!signedIn) {
    navigate("/signin");
    return null;
  }

  const handleVerifyAdmin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (verifyEmail === "admin@cakeoz.com" && verifyPassword === "admin123") {
      setIsVerified(true);
      toast({
        title: "Verified",
        description: "You have access to the admin dashboard.",
      });
    } else {
      toast({
        title: "Invalid credentials",
        description: "Please enter correct admin credentials.",
        variant: "destructive",
      });
    }
  };

  if (!isVerified) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-xl rounded-[32px] border border-border/70 bg-card/90 p-10 shadow-xl shadow-black/10 backdrop-blur-xl">
          <div className="mb-10 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.4em] text-primary/80">
              Admin Verification
            </p>
            <h1 className="mt-4 text-4xl font-bold text-foreground">Verify Access</h1>
            <p className="mt-3 text-base text-muted-foreground">
              Please enter your admin credentials to access the dashboard.
            </p>
          </div>

          <form onSubmit={handleVerifyAdmin} className="space-y-6">
            <div>
              <label htmlFor="verify-email" className="mb-2 block text-sm font-medium text-foreground">
                Admin Email
              </label>
              <Input
                id="verify-email"
                type="email"
                value={verifyEmail}
                onChange={(event) => setVerifyEmail(event.target.value)}
                placeholder="admin@cakeoz.com"
                required
              />
            </div>

            <div>
              <label htmlFor="verify-password" className="mb-2 block text-sm font-medium text-foreground">
                Admin Password
              </label>
              <Input
                id="verify-password"
                type="password"
                value={verifyPassword}
                onChange={(event) => setVerifyPassword(event.target.value)}
                placeholder="Enter admin password"
                required
              />
            </div>

            <Button type="submit" className="w-full">
              Verify Access
            </Button>
          </form>

          <div className="mt-8 text-center text-sm text-muted-foreground">
            <Link to="/menu" className="font-semibold text-primary hover:text-primary/90">
              Back to Menu
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handleLogout = () => {
    signOut();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background text-foreground px-6 py-10 md:px-10 md:py-14">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-primary/80">Admin dashboard</p>
            <h1 className="mt-3 text-4xl font-bold">All Orders</h1>
          </div>
          <div className="flex gap-3">
            <Link
              to="/menu"
              className="rounded-full border border-input bg-background px-6 py-3 text-sm font-semibold text-foreground transition hover:bg-secondary"
            >
              Back to Menu
            </Link>
            <Button onClick={handleLogout} variant="destructive">
              Logout
            </Button>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="rounded-3xl border border-border/70 bg-card/90 p-10 text-center shadow-xl">
            <div className="animate-spin rounded-full h-14 w-14 border-4 border-primary/20 border-t-primary mx-auto mb-4" />
            <p className="text-muted-foreground">Loading orders...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="rounded-3xl border border-destructive/50 bg-destructive/10 p-6 text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-destructive mb-3">Error loading orders</p>
            <p className="text-muted-foreground">{error instanceof Error ? error.message : "Failed to load orders"}</p>
          </div>
        )}

        {/* Orders List */}
        {orders && orders.length > 0 ? (
          <div className="grid gap-6">
            {orders.map((order) => (
              <div key={order.id} className="rounded-3xl border border-border/70 bg-card/90 p-8 shadow-xl backdrop-blur-xl">
                <div className="grid gap-6 md:grid-cols-[1fr_2fr]">
                  {/* Order Info */}
                  <div>
                    <div className="rounded-2xl border border-border/50 bg-background/80 p-4 mb-4">
                      <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Order ID</p>
                      <p className="mt-2 text-xl font-bold text-foreground">{order.id}</p>
                    </div>
                    
                    <div className="rounded-2xl border border-border/50 bg-background/80 p-4 mb-4">
                      <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Status</p>
                      <div className={`mt-2 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                        order.status === "Order Placed" ? "bg-yellow/20 text-yellow" :
                        order.status === "Confirmed" ? "bg-green/20 text-green" :
                        "bg-blue/20 text-blue"
                      }`}>
                        {order.status}
                      </div>
                    </div>

                    <div className="rounded-2xl border border-border/50 bg-background/80 p-4">
                      <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Created At</p>
                      <p className="mt-2 text-sm text-foreground">{new Date(order.createdAt).toLocaleString()}</p>
                    </div>
                  </div>

                  {/* Customer & Order Details */}
                  <div className="space-y-4">
                    {/* Customer Info */}
                    <div className="rounded-2xl border border-border/50 bg-background/80 p-4">
                      <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-3">Customer Information</p>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Name:</span>
                          <span className="font-medium">{order.customer.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Email:</span>
                          <span className="font-medium break-all">{order.customer.email}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Phone:</span>
                          <span className="font-medium">{order.customer.phone}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Address:</span>
                          <span className="font-medium text-right">{order.customer.address}</span>
                        </div>
                      </div>
                    </div>

                    {/* Order Details */}
                    <div className="grid gap-3 sm:grid-cols-2">
                      <div className="rounded-2xl border border-border/50 bg-background/80 p-4">
                        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Cake ID</p>
                        <p className="mt-2 text-lg font-bold text-foreground">#{order.cakeId}</p>
                      </div>
                      
                      <div className="rounded-2xl border border-border/50 bg-background/80 p-4">
                        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Quantity</p>
                        <p className="mt-2 text-lg font-bold text-foreground">{order.quantity} {order.unit}</p>
                      </div>
                    </div>

                    {/* Special Notes */}
                    {order.customer.note && (
                      <div className="rounded-2xl border border-primary/30 bg-primary/5 p-4">
                        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-2">Special Instructions</p>
                        <p className="text-sm text-foreground">{order.customer.note}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-border/70 bg-card/90 p-10 text-center shadow-xl">
            <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground mb-3">No orders</p>
            <p className="text-muted-foreground">There are currently no orders placed.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
