import * as React from "react";

type AuthContextType = {
  signedIn: boolean;
  isAdmin: boolean;
  signIn: (isAdmin?: boolean) => void;
  signOut: () => void;
};

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [signedIn, setSignedIn] = React.useState(false);
  const [isAdmin, setIsAdmin] = React.useState(false);

  React.useEffect(() => {
    const stored = window.localStorage.getItem("signedIn");
    const adminStored = window.localStorage.getItem("isAdmin");
    setSignedIn(stored === "true");
    setIsAdmin(adminStored === "true");
  }, []);

  const signIn = (isAdminUser?: boolean) => {
    window.localStorage.setItem("signedIn", "true");
    window.localStorage.setItem("isAdmin", isAdminUser ? "true" : "false");
    setSignedIn(true);
    setIsAdmin(isAdminUser || false);
  };

  const signOut = () => {
    window.localStorage.removeItem("signedIn");
    window.localStorage.removeItem("isAdmin");
    setSignedIn(false);
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider value={{ signedIn, isAdmin, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
