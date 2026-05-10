import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <nav className="sticky top-0 z-50 shadow-md" style={{ backgroundColor: '#e8c5a5' }}>
        <div className="max-w-7xl mx-auto px-6 md:px-16 py-4 flex items-center justify-between">
          <Link to="/" className="font-display text-2xl font-bold" style={{ color: '#2d1b0e' }}>
            Cake OZ
          </Link>
          <Link
            to="/"
            className="font-body text-sm font-semibold uppercase tracking-widest rounded-full bg-white/20 px-4 py-2 transition-colors hover:bg-white/30"
            style={{ color: '#2d1b0e' }}
          >
            ← Back to Home
          </Link>
        </div>
      </nav>

      <div className="hero-section text-center px-6 py-20 border-b border-[#2f1d0f]">
        <p className="text-[11px] uppercase tracking-[3px] text-[#c89b4a] mb-4">
          Our story
        </p>
        <h1 className="font-display text-5xl md:text-6xl font-bold text-[#f5e0c3] mb-6 leading-tight">
          Made with <span className="text-[#b07d2a] italic">love,</span>
          <br /> baked with passion
        </h1>
        <p className="mx-auto max-w-2xl text-sm md:text-base text-[#d7c29d] leading-8">
          Every cake pop tells a story. Cake OZ was born from a simple belief — that every celebration deserves something truly special, handcrafted just for you.
        </p>
      </div>

      <div className="baker-section px-6 py-16 border-b border-[#2f1d0f]">
        <p className="text-[11px] uppercase tracking-[3px] text-[#c89b4a] text-center mb-8">
          Meet the baker
        </p>
        <div className="mx-auto flex max-w-4xl flex-col gap-8 rounded-2xl border border-border/50 bg-background/80 p-10 text-[#f5e0c3] md:flex-row shadow-card backdrop-blur-sm">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-[#c89b4a] to-[#8a5c20] text-3xl">
            🎂
          </div>
          <div>
            <p className="font-display text-2xl font-bold mb-2">Priya Meenakshi</p>
            <p className="text-xs uppercase tracking-[2px] text-[#c89b4a] mb-4">Founder & Head Baker</p>
            <p className="text-sm leading-7 text-[#a08060]">
              With over 8 years of baking experience, Priya started Cake OZ from her home kitchen with one goal — to make every bite feel like a warm hug. Trained in French pastry arts, she brings both skill and heart to every creation.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <span className="rounded-full border border-[#3a2a10] bg-[#231508] px-3 py-1 text-[11px] uppercase tracking-[1px] text-[#c89b4a]">
                Cake Pops
              </span>
              <span className="rounded-full border border-[#3a2a10] bg-[#231508] px-3 py-1 text-[11px] uppercase tracking-[1px] text-[#c89b4a]">
                Custom Cakes
              </span>
              <span className="rounded-full border border-[#3a2a10] bg-[#231508] px-3 py-1 text-[11px] uppercase tracking-[1px] text-[#c89b4a]">
                Eggless Specialist
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="reviews-section px-6 py-16">
        <p className="text-[11px] uppercase tracking-[3px] text-[#c89b4a] text-center mb-8">
          What our customers say
        </p>
        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
          {[
            {
              text: "The cake pops were absolutely stunning. Everyone at the party kept asking where I got them from!",
              author: "Ananya R.",
              location: "Batticaloa Town",
            },
            {
              text: "Ordered a custom birthday cake — it looked exactly like my vision. Taste was even better than the look!",
              author: "Karthik S.",
              location: "Kallady",
            },
            {
              text: "Best eggless cake I've ever had. My kids loved it and I felt good knowing it was made fresh with care.",
              author: "Deepa M.",
              location: "Arasady",
            },
          ].map((review) => (
            <div key={review.author} className="rounded-2xl border border-border/50 bg-background p-6 shadow-card">
              <div className="text-[48px] leading-none text-[#c89b4a33]">"</div>
              <div className="mb-4 flex gap-1">
                {Array.from({ length: 5 }).map((_, index) => (
                  <div key={index} className="h-3.5 w-3.5 rounded-full bg-[#c89b4a]" />
                ))}
              </div>
              <p className="text-sm italic text-[#c8a878] leading-7 mb-5">{review.text}</p>
              <p className="font-display text-base font-bold">{review.author}</p>
              <p className="text-[11px] text-[#6a5030] mt-1">{review.location}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
