import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";

const Menu = () => {
  const { signedIn, isAdmin } = useAuth();
  const { data: cakes, isLoading, error } = useQuery({
    queryKey: ['cakes'],
    queryFn: () => fetch('/api/cakes').then(res => res.json()),
    retry: false,
  });

  const fallbackCakes = [
    {
      id: 1,
      name: "Strawberry Bliss",
      price: "LKR 2,200",
      image: "/images/strawberry-cake.png",
      desc: "Fresh strawberries with cream layers",
      details: "A light vanilla sponge layered with whipped cream, fresh berries, and berry compote.",
    },
    {
      id: 2,
      name: "Black Forest",
      price: "LKR 1,980",
      image: "/images/black-forest.jpg",
      desc: "Classic chocolate cherry delight",
      details: "Rich chocolate sponge with cherries, whipped cream, and dark chocolate shavings.",
    },
    {
      id: 3,
      name: "Tiramisu",
      price: "LKR 2,500",
      image: "/images/tiramisu.webp",
      desc: "Italian coffee-soaked elegance",
      details: "Coffee-soaked ladyfingers layered with mascarpone cream and cocoa powder.",
    },
    {
      id: 4,
      name: "Red Velvet",
      price: "LKR 2,300",
      image: "/images/red-velvet.jpg",
      desc: "Velvety smooth cream cheese frosting",
      details: "Moist red velvet sponge finished with rich cream cheese frosting.",
    },
    {
      id: 5,
      name: "Coffee Cake",
      price: "LKR 1,800",
      image: "/images/coffee-cake.jpg",
      desc: "Rich espresso butter cake",
      details: "Buttery coffee-flavored cake glazed with espresso syrup.",
    },
    {
      id: 6,
      name: "Vanilla Cake",
      price: "LKR 2,100",
      image: "/images/vanilla-cake.jpeg",
      desc: "Silky smooth vanilla bean perfection",
      details: "Classic vanilla cake layered with creamy vanilla frosting.",
    },
  ];

  const cakeList = cakes && cakes.length > 0 ? cakes : fallbackCakes;

  if (!signedIn) {
    return <Navigate to="/signin" replace />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 shadow-md" style={{ backgroundColor: '#e8c5a5' }}>
        <div className="max-w-7xl mx-auto px-6 md:px-16 py-4 flex flex-wrap items-center justify-between gap-3">
          <Link to="/" className="font-display text-2xl font-bold" style={{ color: '#2d1b0e' }}>
            Cake OZ
          </Link>
          <div className="flex flex-wrap items-center gap-3">
            {isAdmin && (
              <Link
                to="/admin"
                className="font-body text-sm font-semibold uppercase tracking-widest rounded-full bg-white/20 px-4 py-2 transition-colors hover:bg-white/30"
                style={{ color: '#2d1b0e' }}
              >
                📊 Admin
              </Link>
            )}
            <Link
              to="/"
              className="font-body text-sm font-semibold uppercase tracking-widest rounded-full bg-white/20 px-4 py-2 transition-colors hover:bg-white/30"
              style={{ color: '#2d1b0e' }}
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </nav>

      {/* Header Section */}
      <section className="relative bg-gradient-to-br from-secondary to-black py-16 px-6 md:px-16">
        <div className="max-w-6xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-primary tracking-[0.3em] uppercase text-sm font-body font-semibold mb-4"
          >
            Signature Collection
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-4"
          >
            Our <span className="text-gradient-warm">Premium Cakes</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-body text-foreground/70 text-lg md:text-xl"
          >
            Handcrafted with love, baked with passion, delivered with excellence
          </motion.p>
        </div>
      </section>

      {/* Menu Grid Section */}
      <section className="py-16 px-6 md:px-16">
        <div className="max-w-6xl mx-auto">
          {isLoading ? (
            <div className="flex items-center justify-center min-h-96">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full"
              />
            </div>
          ) : (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              {cakeList.map((cake, index) => (
                <motion.div
                  key={cake.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  whileHover={{ y: -8 }}
                  className="group bg-gradient-card backdrop-blur-sm rounded-2xl border border-border/50 overflow-hidden shadow-card hover:shadow-glow transition-all duration-500"
                >
                  {/* Image Container */}
                  <div className="relative h-80 flex items-center justify-center overflow-hidden bg-secondary/30 p-6">
                    <img
                      src={cake.image}
                      alt={cake.name}
                      loading="lazy"
                      width={768}
                      height={768}
                      className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-700"
                    />
                    {/* Badge */}
                    <div className="absolute top-4 right-4 bg-gradient-warm text-primary-foreground px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                      ✨ Featured
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex flex-col gap-4 mb-4">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="font-display text-2xl font-bold text-foreground">
                            {cake.name}
                          </h3>
                          <p className="text-primary/80 text-sm mt-1 font-medium">
                            Premium Selection
                          </p>
                        </div>
                        <div className="rounded-full bg-primary/5 px-4 py-2 text-right">
                          <p className="text-xs uppercase tracking-[0.25em] text-primary/70">Price</p>
                          <p className="text-xl font-semibold text-foreground">{cake.price}</p>
                        </div>
                      </div>
                      <p className="text-sm text-primary/80 leading-relaxed">{cake.desc}</p>
                    </div>

                    <div className="mb-4 rounded-2xl border border-border/50 bg-background px-4 py-3">
                      <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-2">Details</p>
                      <p className="text-sm text-foreground/90 leading-relaxed">{cake.details ?? cake.desc}</p>
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      <span className="text-gradient-warm font-display font-bold text-3xl">
                        {cake.price}
                      </span>
                      <span className="text-primary/60 text-sm font-medium">Per Cake</span>
                    </div>

                    {/* Button */}
                    <Link
                      to={`/order?cakeId=${cake.id}`}
                      className="w-full inline-flex items-center justify-center py-3 rounded-full bg-gradient-warm text-primary-foreground font-body font-semibold text-sm tracking-wide opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:shadow-warm transform hover:scale-105"
                    >
                      Order Now
                    </Link>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 md:px-16 bg-secondary/10 border-t border-border/30">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-6">
              Can't Find Your Favorite?
            </h2>
            <p className="font-body text-foreground/70 text-lg mb-8 max-w-2xl mx-auto">
              We offer custom cake designs and personalized flavors. Contact us to create your perfect celebration cake!
            </p>
            <Link to="/custom" className="inline-flex px-8 py-3 bg-gradient-warm text-primary-foreground font-body font-semibold rounded-full hover:shadow-warm transition-all transform hover:scale-105">
              Custom Cake Inquiry
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Menu;
