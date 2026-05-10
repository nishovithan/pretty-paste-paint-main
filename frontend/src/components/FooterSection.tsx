import logo from "@/assets/logo.png";

const FooterSection = () => {
  return (
    <footer id="contact" className="py-16 px-6 md:px-16 border-t border-border/30">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex flex-col items-center md:items-start gap-3">
          <img src={logo} alt="CakeOz" className="w-28" />
          <p className="font-elegant text-lg text-muted-foreground italic">
            Cake pops a love story
          </p>
        </div>
        <div className="text-center md:text-right">
          <p className="font-body text-sm text-muted-foreground">
            © 2026 CakeOZ. All rights reserved.
          </p>
          <p className="font-body text-xs text-muted-foreground/60 mt-1">
            Handcrafted with love ❤️
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
