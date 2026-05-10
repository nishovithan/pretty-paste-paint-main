import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();

  const { signIn } = useAuth();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email.trim() || !password) {
      toast({
        title: "Missing information",
        description: "Please enter both email and password.",
        variant: "destructive",
      });
      return;
    }

    // Check if it's admin login
    if (email === "admin@cakeoz.com" && password === "admin123") {
      signIn(true);
      toast({
        title: "Admin signed in successfully",
        description: "Welcome to the admin dashboard!",
      });
      navigate("/admin");
    } else {
      // Customer login - any other credentials
      signIn(false);
      toast({
        title: "Signed in successfully",
        description: "Welcome back to CakeOZ!",
      });
      navigate("/menu");
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-xl rounded-[32px] border border-border/70 bg-card/90 p-10 shadow-xl shadow-black/10 backdrop-blur-xl">
        <div className="mb-10 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.4em] text-primary/80">
            Sign In
          </p>
          <h1 className="mt-4 text-4xl font-bold text-foreground">Welcome back</h1>
          <p className="mt-3 text-base text-muted-foreground">
            Enter your credentials to access the CakeOZ dashboard.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-medium text-foreground">
              Email address
            </label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-2 block text-sm font-medium text-foreground">
              Password
            </label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          <Button type="submit" className="w-full">
            Continue
          </Button>
        </form>

        <div className="mt-8 text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{' '}
          <Link to="/" className="font-semibold text-primary hover:text-primary/90">
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
