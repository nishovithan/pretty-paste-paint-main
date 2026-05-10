import { useMemo, useState, type FormEvent } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { fetchCakes, placeOrder } from "@/lib/api";

const Order = () => {
  const [searchParams] = useSearchParams();
  const cakeId = Number(searchParams.get("cakeId"));
  const navigate = useNavigate();
  const { toast } = useToast();

  const [unit, setUnit] = useState<"full" | "piece">("full");
  const [quantity, setQuantity] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [note, setNote] = useState("");

  const { data: cakes, isPending } = useQuery({
    queryKey: ["cakes"],
    queryFn: fetchCakes,
    retry: false,
  });

  const cake = useMemo(
    () => cakes?.find((item) => item.id === cakeId),
    [cakes, cakeId],
  );

  const basePrice = Number(cake?.price.replace(/[^0-9]/g, "")) || 0;
  const unitPrice = unit === "piece" ? Math.max(1, Math.ceil(basePrice / 8)) : basePrice;
  const totalPrice = unitPrice * quantity;

  const orderMutation = useMutation({
    mutationFn: placeOrder,
    onSuccess: (data) => {
      toast({
        title: "Order submitted",
        description: `Your order ${data.orderId} is confirmed!`,
      });
      setTimeout(() => navigate("/menu"), 1200);
    },
    onError: (error) => {
      toast({
        title: "Order failed",
        description: error instanceof Error ? error.message : "Unable to place order.",
        variant: "destructive",
      });
    },
  });

  const handleQuantity = (change: number) => {
    setQuantity((current) => Math.max(1, current + change));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!name.trim() || !email.trim() || !phone.trim() || !address.trim() || !cake) {
      toast({
        title: "Missing information",
        description: "Please complete all required fields before placing your order.",
        variant: "destructive",
      });
      return;
    }

    orderMutation.mutate({
      cakeId: cake.id,
      quantity,
      unit,
      customer: {
        name,
        email,
        phone,
        address,
        note,
      },
    });
  };

  if (isPending) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-14 w-14 border-4 border-primary/20 border-t-primary" />
      </div>
    );
  }

  if (!cake) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-6 py-24">
        <div className="max-w-xl rounded-3xl border border-border/70 bg-card/90 p-10 text-center shadow-xl">
          <p className="text-sm uppercase tracking-[0.3em] text-primary/80 mb-4">Order page</p>
          <h1 className="text-4xl font-bold text-foreground mb-4">Cake not found</h1>
          <p className="text-sm text-muted-foreground mb-8">
            The cake you tried to order is no longer available. Please return to the menu and choose another option.
          </p>
          <Link to="/menu" className="inline-flex rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
            Return to Menu
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground px-6 py-10 md:px-10 md:py-14">
      <div className="max-w-7xl mx-auto grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="rounded-[32px] border border-border/70 bg-card/90 p-8 shadow-xl backdrop-blur-xl">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-primary/80">Order details</p>
              <h1 className="mt-3 text-4xl font-bold">{cake.name}</h1>
            </div>
            <Link
              to="/menu"
              className="rounded-full border border-input bg-background px-4 py-2 text-sm font-semibold text-foreground transition hover:bg-secondary"
            >
              Back to menu
            </Link>
          </div>

          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-3xl border border-border/50 bg-background/80 p-6">
              <img
                src={cake.image}
                alt={cake.name}
                className="w-full rounded-3xl object-cover"
              />
              <div className="mt-6 space-y-4">
                <p className="text-sm text-muted-foreground">{cake.desc}</p>
                <p className="text-sm text-muted-foreground">{cake.details}</p>
              </div>
            </div>

            <div className="rounded-3xl border border-border/50 bg-background/80 p-6">
              <div className="flex items-center justify-between gap-4 mb-6">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-primary/80">Selected cake</p>
                  <p className="text-2xl font-bold">{cake.name}</p>
                </div>
                <div className="rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
                  {unit === "full" ? "Full cake" : "Piece"}
                </div>
              </div>

              <div className="grid gap-4">
                <div className="rounded-3xl border border-border/50 bg-card p-4">
                  <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Price</p>
                  <p className="mt-2 text-3xl font-bold text-foreground">LKR {unitPrice.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">{unit === "piece" ? "Per slice" : "Per cake"}</p>
                </div>

                <div className="grid gap-3 rounded-3xl border border-border/50 bg-card p-4">
                  <div className="flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => setUnit("full")}
                      className={`rounded-2xl px-4 py-3 text-sm font-semibold transition ${unit === "full" ? "bg-primary text-primary-foreground" : "bg-background text-foreground/80 hover:bg-secondary"}`}
                    >
                      Full cake
                    </button>
                    <button
                      type="button"
                      onClick={() => setUnit("piece")}
                      className={`rounded-2xl px-4 py-3 text-sm font-semibold transition ${unit === "piece" ? "bg-primary text-primary-foreground" : "bg-background text-foreground/80 hover:bg-secondary"}`}
                    >
                      Single piece
                    </button>
                  </div>

                  <div className="rounded-3xl border border-border/50 bg-background p-4">
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
                      <span>Quantity</span>
                      <span>{quantity}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => handleQuantity(-1)}
                        className="h-11 w-11 rounded-full border border-border/50 bg-background text-foreground transition hover:bg-secondary"
                      >
                        −
                      </button>
                      <div className="flex-1 rounded-3xl border border-border/50 bg-card/80 px-4 py-3 text-center text-lg font-semibold text-foreground">
                        {quantity}
                      </div>
                      <button
                        type="button"
                        onClick={() => handleQuantity(1)}
                        className="h-11 w-11 rounded-full border border-border/50 bg-background text-foreground transition hover:bg-secondary"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="rounded-3xl border border-border/50 bg-card p-4">
                    <div className="flex items-center justify-between text-sm uppercase tracking-[0.3em] text-muted-foreground">
                      <span>Total</span>
                      <span className="text-xl font-semibold text-foreground">LKR {totalPrice.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-[32px] border border-border/70 bg-card/90 p-8 shadow-xl backdrop-blur-xl">
          <div className="mb-8">
            <p className="text-sm uppercase tracking-[0.3em] text-primary/80">Customer details</p>
            <h2 className="mt-3 text-3xl font-bold">Complete the order</h2>
            <p className="mt-3 text-sm text-muted-foreground">
              We will confirm your order details and delivery time by phone or email.
            </p>
          </div>

          <form className="grid gap-5" onSubmit={handleSubmit}>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-foreground">Full name</label>
                <Input value={name} onChange={(event) => setName(event.target.value)} placeholder="Your name" required />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-foreground">Phone</label>
                <Input value={phone} onChange={(event) => setPhone(event.target.value)} placeholder="07x xxx xxxx" required />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-foreground">Email address</label>
                <Input value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" required />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-foreground">Delivery address</label>
                <Input value={address} onChange={(event) => setAddress(event.target.value)} placeholder="Street, city, postal code" required />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-foreground">Special instructions</label>
              <textarea
                rows={4}
                value={note}
                onChange={(event) => setNote(event.target.value)}
                placeholder="Gluten-free, birthday note, or gift message"
                className="w-full rounded-3xl border border-border/50 bg-background/80 px-4 py-3 text-foreground outline-none transition focus:border-primary"
              />
            </div>

            <Button type="submit" className="w-full" disabled={orderMutation.isPending}>
              {orderMutation.isPending ? "Placing order…" : "Place order now"}
            </Button>

            {orderMutation.isSuccess && (
              <div className="rounded-3xl border border-primary/50 bg-primary/10 p-4 text-sm text-foreground">
                Order confirmed! Your order ID is <strong>{orderMutation.data?.orderId}</strong>. You will be redirected to the menu shortly.
              </div>
            )}
          </form>
        </section>
      </div>
    </div>
  );
};

export default Order;
