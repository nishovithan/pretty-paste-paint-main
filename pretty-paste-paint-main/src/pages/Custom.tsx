import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { sendInquiry } from "@/lib/api";

const Custom = () => {
  const { toast } = useToast();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [occasion, setOccasion] = useState("");
  const [message, setMessage] = useState("");

  const inquiryMutation = useMutation({
    mutationFn: sendInquiry,
    onSuccess: (data) => {
      toast({
        title: "Inquiry submitted",
        description: `We received your request ${data.inquiryId}. We'll contact you shortly.`,
      });
      setName("");
      setEmail("");
      setPhone("");
      setEventDate("");
      setOccasion("");
      setMessage("");
    },
    onError: (error) => {
      toast({
        title: "Submission failed",
        description: error instanceof Error ? error.message : "Unable to send inquiry.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!name.trim() || !email.trim() || !phone.trim() || !message.trim()) {
      toast({
        title: "Missing information",
        description: "Please complete all required fields before sending your inquiry.",
        variant: "destructive",
      });
      return;
    }

    inquiryMutation.mutate({
      name,
      email,
      phone,
      eventDate,
      occasion,
      message,
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground px-6 py-10 md:px-10 md:py-14">
      <div className="max-w-6xl mx-auto grid gap-10 lg:grid-cols-[0.9fr_0.8fr]">
        <div className="rounded-[32px] border border-border/70 bg-card/90 p-8 shadow-xl backdrop-blur-xl">
          <p className="text-sm uppercase tracking-[0.3em] text-primary/80">Custom cakes</p>
          <h1 className="mt-3 text-5xl font-bold">Create a cake that matches your celebration.</h1>
          <p className="mt-5 text-sm leading-7 text-muted-foreground">
            Share your theme, flavour preferences and delivery date. Our team will respond with a custom quote and design options within a few hours.
          </p>

          <div className="mt-10 grid gap-6 rounded-3xl border border-border/50 bg-background/80 p-6">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Perfect for</p>
              <p className="mt-2 text-lg font-semibold">Birthdays, weddings, anniversaries, and parties.</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">What we do</p>
              <p className="mt-2 text-lg font-semibold">Theme cakes, premium flavors, customized writing, and special dietary requests.</p>
            </div>
          </div>

          <Link
            to="/menu"
            className="mt-10 inline-flex rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
          >
            Browse available cakes
          </Link>
        </div>

        <div className="rounded-[32px] border border-border/70 bg-card/90 p-8 shadow-xl backdrop-blur-xl">
          <p className="text-sm uppercase tracking-[0.3em] text-primary/80">Send a request</p>
          <h2 className="mt-3 text-3xl font-bold">Tell us your vision</h2>

          <form onSubmit={handleSubmit} className="mt-8 grid gap-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-foreground">Full name</label>
                <Input value={name} onChange={(event) => setName(event.target.value)} placeholder="Your name" required />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-foreground">Email</label>
                <Input value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" required />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-foreground">Phone</label>
              <Input value={phone} onChange={(event) => setPhone(event.target.value)} placeholder="07x xxx xxxx" required />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-foreground">Event date</label>
                <Input value={eventDate} onChange={(event) => setEventDate(event.target.value)} type="date" />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-foreground">Occasion</label>
                <Input value={occasion} onChange={(event) => setOccasion(event.target.value)} placeholder="Birthday, wedding, etc." />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-foreground">Describe your idea</label>
              <textarea
                rows={6}
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                placeholder="Tell us about colors, flavors, decorations, guest count, or dietary preferences."
                className="w-full rounded-3xl border border-border/50 bg-background/80 px-4 py-3 text-foreground outline-none transition focus:border-primary"
                required
              />
            </div>

            <Button type="submit" className="w-full" disabled={inquiryMutation.isPending}>
              {inquiryMutation.isPending ? "Sending request…" : "Send inquiry"}
            </Button>

            {inquiryMutation.isSuccess && (
              <div className="rounded-3xl border border-primary/50 bg-primary/10 p-4 text-sm text-foreground">
                Request received! Reference <strong>{inquiryMutation.data?.inquiryId}</strong>. We will contact you soon.
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Custom;
