import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";

const MenuSection = () => {
  const { data: cakes, isLoading } = useQuery({
    queryKey: ['cakes'],
    queryFn: () => fetch('/api/cakes').then(res => res.json())
  });

  if (isLoading) {
    return (
      <section id="menu" className="py-24 px-6 md:px-16 relative">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-4xl md:text-6xl font-bold text-foreground"
          >
            Loading <span className="text-gradient-warm">Cakes</span>
          </motion.h2>
        </div>
      </section>
    );
  }

  return (
    <section id="menu" className="py-24 px-6 md:px-16 relative">
      {/* Section header */}
      <div className="text-center mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-4xl md:text-6xl font-bold text-foreground"
        >
          Premium <span className="text-gradient-warm">Cakes</span>
        </motion.h2>
      </div>

      {/* Cake grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {cakes?.map((cake, i) => (
          <motion.div
            key={cake.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            whileHover={{ y: -8 }}
            className="group bg-gradient-card backdrop-blur-sm rounded-2xl border border-border/50 overflow-hidden shadow-card hover:shadow-glow transition-all duration-500"
          >
            <div className="relative h-56 flex items-center justify-center overflow-hidden bg-secondary/30 p-4">
              <img
                src={cake.image}
                alt={cake.name}
                loading="lazy"
                width={768}
                height={768}
                className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-700"
              />
            </div>
            <div className="p-6">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <h3 className="font-display text-xl font-bold text-foreground">{cake.name}</h3>
                  <p className="text-sm text-primary/80 mt-1">{cake.desc}</p>
                </div>
                <div className="rounded-full bg-primary/5 px-4 py-2 text-right">
                  <p className="text-xs uppercase tracking-[0.25em] text-primary/70">Price</p>
                  <p className="text-lg font-semibold text-foreground">{cake.price}</p>
                </div>
              </div>
              <div className="mb-4 rounded-2xl border border-border/50 bg-background px-4 py-3">
                <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-2">Details</p>
                <p className="text-sm text-foreground/90 leading-relaxed">{cake.details ?? cake.desc}</p>
              </div>
              <Link
                to={`/order?cakeId=${cake.id}`}
                className="w-full inline-flex items-center justify-center py-3 rounded-full bg-gradient-warm text-primary-foreground font-body font-semibold text-sm tracking-wide opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:shadow-warm"
              >
                Order Now
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default MenuSection;
