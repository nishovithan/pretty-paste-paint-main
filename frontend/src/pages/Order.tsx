import { useMemo, useState, type FormEvent } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { fetchCakes, placeOrder } from "@/lib/api";

const Order = () => {
  const [searchParams] = useSearchParams();
  const cakeIdParam = searchParams.get("cakeId");
  const cakeId = cakeIdParam ? Number(cakeIdParam) : null;
  const navigate = useNavigate();
  const { toast } = useToast();

  const [unit, setUnit] = useState<"full" | "piece">("full");
  const [quantity, setQuantity] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [note, setNote] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"delivery" | "card">("delivery");
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCVV, setCardCVV] = useState("");

  const { data: cakes, isLoading, error: cakesError } = useQuery({
    queryKey: ["cakes"],
    queryFn: fetchCakes,
    retry: 1,
  });

  const fallbackCakes = [
    { id: 1, name: "Strawberry Bliss", price: "LKR 2,200", image: "/images/strawberry-cake.png", desc: "Fresh strawberries with cream layers", details: "A light vanilla sponge layered with whipped cream, fresh berries, and berry compote." },
    { id: 2, name: "Black Forest", price: "LKR 1,980", image: "/images/black-forest.jpg", desc: "Classic chocolate cherry delight", details: "Rich chocolate sponge with cherries, whipped cream, and dark chocolate shavings." },
    { id: 3, name: "Tiramisu", price: "LKR 2,500", image: "/images/tiramisu.webp", desc: "Italian coffee-soaked elegance", details: "Coffee-soaked ladyfingers layered with mascarpone cream and cocoa powder." },
    { id: 4, name: "Red Velvet", price: "LKR 2,300", image: "/images/red-velvet.jpg", desc: "Velvety smooth cream cheese frosting", details: "Moist red velvet sponge finished with rich cream cheese frosting." },
    { id: 5, name: "Coffee Cake", price: "LKR 1,800", image: "/images/coffee-cake.jpg", desc: "Rich espresso butter cake", details: "Buttery coffee-flavored cake glazed with espresso syrup." },
    { id: 6, name: "Vanilla Cake", price: "LKR 2,100", image: "/images/vanilla-cake.jpeg", desc: "Silky smooth vanilla bean perfection", details: "Classic vanilla cake layered with creamy vanilla frosting." },
  ];

  const cakeList = (cakes && cakes.length > 0) ? cakes : fallbackCakes;

  const cake = useMemo(
    () => (cakeId && cakeList) ? cakeList.find((item) => item.id === cakeId) : undefined,
    [cakeList, cakeId],
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

    if (paymentMethod === "card") {
      if (!cardNumber.trim() || !cardName.trim() || !cardExpiry.trim() || !cardCVV.trim()) {
        toast({
          title: "Missing card details",
          description: "Please complete all card payment fields.",
          variant: "destructive",
        });
        return;
      }
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-14 w-14 border-4 border-primary/20 border-t-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Loading cake details...</p>
        </div>
      </div>
    );
  }

  if (cakesError) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-6 py-24">
        <div className="max-w-xl rounded-3xl border border-border/70 bg-card/90 p-10 text-center shadow-xl">
          <p className="text-sm uppercase tracking-[0.3em] text-destructive mb-4">Connection error</p>
          <h1 className="text-4xl font-bold text-foreground mb-4">Failed to load cakes</h1>
          <p className="text-sm text-muted-foreground mb-8">
            We're having trouble connecting to our menu. Please check your connection and try again.
          </p>
          <Link to="/menu" className="inline-flex rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
            Back to Menu
          </Link>
        </div>
      </div>
    );
  }

  if (!cakeId) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-6 py-24">
        <div className="max-w-xl rounded-3xl border border-border/70 bg-card/90 p-10 text-center shadow-xl">
          <p className="text-sm uppercase tracking-[0.3em] text-primary/80 mb-4">Invalid request</p>
          <h1 className="text-4xl font-bold text-foreground mb-4">No cake selected</h1>
          <p className="text-sm text-muted-foreground mb-8">
            Please select a cake from the menu to proceed with your order.
          </p>
          <Link to="/menu" className="inline-flex rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
            Browse Our Menu
          </Link>
        </div>
      </div>
    );
  }

  if (!cake) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-6 py-24">
        <div className="max-w-xl rounded-3xl border border-border/70 bg-card/90 p-10 text-center shadow-xl">
          <p className="text-sm uppercase tracking-[0.3em] text-primary/80 mb-4">Unavailable</p>
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

            <div>
              <p className="mb-3 block text-sm font-medium text-foreground">Payment method</p>
              <div className="grid gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod("delivery")}
                  className={`rounded-2xl px-4 py-3 text-sm font-semibold transition border ${paymentMethod === "delivery" ? "bg-primary text-primary-foreground border-primary" : "bg-background text-foreground/80 border-border/50 hover:bg-secondary"}`}
                >
                  💰 Cash on Delivery
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod("card")}
                  className={`rounded-2xl px-4 py-3 text-sm font-semibold transition border ${paymentMethod === "card" ? "bg-primary text-primary-foreground border-primary" : "bg-background text-foreground/80 border-border/50 hover:bg-secondary"}`}
                >
                  💳 Card Payment
                </button>
              </div>
            </div>

            {paymentMethod === "card" && (
              <div className="rounded-3xl border border-primary/30 bg-primary/5 p-6">
                <p className="mb-4 text-sm font-semibold text-foreground">Card details</p>
                
                <div>
                  <label className="mb-2 block text-sm font-medium text-foreground">Card number</label>
                  <Input
                    value={cardNumber}
                    onChange={(event) => setCardNumber(event.target.value.replace(/\s/g, '').slice(0, 16))}
                    placeholder="1234 5678 9012 3456"
                    maxLength={16}
                    required={paymentMethod === "card"}
                  />
                </div>

                <div className="mt-4">
                  <label className="mb-2 block text-sm font-medium text-foreground">Cardholder name</label>
                  <Input
                    value={cardName}
                    onChange={(event) => setCardName(event.target.value)}
                    placeholder="Name on card"
                    required={paymentMethod === "card"}
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2 mt-4">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-foreground">Expiry date</label>
                    <Input
                      value={cardExpiry}
                      onChange={(event) => {
                        let val = event.target.value.replace(/\D/g, '');
                        if (val.length >= 2) {
                          val = val.slice(0, 2) + '/' + val.slice(2, 4);
                        }
                        setCardExpiry(val);
                      }}
                      placeholder="MM/YY"
                      maxLength={5}
                      required={paymentMethod === "card"}
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-foreground">CVV</label>
                    <Input
                      value={cardCVV}
                      onChange={(event) => setCardCVV(event.target.value.replace(/\D/g, '').slice(0, 3))}
                      placeholder="123"
                      maxLength={3}
                      type="password"
                      required={paymentMethod === "card"}
                    />
                  </div>
                </div>
              </div>
            )}

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
