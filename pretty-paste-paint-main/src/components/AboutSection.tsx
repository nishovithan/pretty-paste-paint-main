import { motion } from "framer-motion";
import { Heart, Award, Clock } from "lucide-react";

const features = [
  { icon: Heart, title: "Made With Love", desc: "Every cake is handcrafted with passion and the finest ingredients" },
  { icon: Award, title: "Premium Quality", desc: "We use only the best imported chocolates and fresh cream" },
  { icon: Clock, title: "Fresh Daily", desc: "Baked fresh every morning for the perfect taste experience" },
];

const AboutSection = () => {
  return (
    <section id="about" className="py-24 px-6 md:px-16 bg-secondary/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-primary tracking-[0.3em] uppercase text-sm font-body font-semibold mb-3"
          >
            Why Choose Us
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-4xl md:text-6xl font-bold text-foreground"
          >
            Baked With <span className="text-gradient-warm">Passion</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="text-center p-8 rounded-2xl bg-gradient-card border border-border/30 shadow-card"
            >
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-warm flex items-center justify-center shadow-warm">
                <f.icon className="w-7 h-7 text-primary-foreground" />
              </div>
              <h3 className="font-display text-xl font-bold text-foreground mb-3">{f.title}</h3>
              <p className="font-body text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
