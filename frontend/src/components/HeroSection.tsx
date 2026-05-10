import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import logo from "@/assets/logo.png";

const HeroSection = () => {
  const { signedIn } = useAuth();

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/hero-bg.jpeg')" }}
      />
      {/* Dark overlay gradient */}
      <div
        className="absolute inset-0"
        style={{ background: "var(--gradient-hero)" }}
      />

      {/* Navbar */}
      <nav className="relative z-10 flex items-center justify-between px-8 py-6 md:px-16">
        <img src={logo} alt="CakeOz Logo" className="w-28 md:w-36" />
        <div className="hidden md:flex items-center gap-4">
          <Link
            to="/menu"
            className="font-body text-sm tracking-widest uppercase rounded-full bg-white/10 px-4 py-2 text-foreground/80 transition-colors hover:bg-white/20 hover:text-primary"
          >
            Menu
          </Link>
          <Link
            to="/about"
            className="font-body text-sm tracking-widest uppercase rounded-full bg-white/10 px-4 py-2 text-foreground/80 transition-colors hover:bg-white/20 hover:text-primary"
          >
            About
          </Link>
          <Link
            to="/signin"
            className="font-body text-sm tracking-widest uppercase rounded-full bg-white/10 px-4 py-2 text-foreground/80 transition-colors hover:bg-white/20 hover:text-primary"
          >
            Sign In
          </Link>
        </div>
      </nav>

      {/* Hero content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-[calc(100vh-100px)] text-center px-6">

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-foreground leading-tight mb-6"
        >
          Delicious Cake
          <br />
          <span className="text-gradient-warm">With Love</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-elegant text-2xl md:text-3xl text-primary/80 italic mb-10"
        >
          Cake pops a love story
        </motion.p>

        <motion.a
          href={signedIn ? "/menu" : "/signin"}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          whileHover={{ scale: 1.05, y: -3 }}
          whileTap={{ scale: 0.98 }}
          className="bg-gradient-warm text-primary-foreground font-body font-semibold text-lg px-12 py-4 rounded-full shadow-warm tracking-wide transition-shadow hover:shadow-glow"
        >
          {signedIn ? "Explore Menu" : "Sign In to Explore"}
        </motion.a>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-primary/40 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-primary/60 rounded-full" />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
