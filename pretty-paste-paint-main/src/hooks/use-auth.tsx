import * as React from "react";

type AuthContextType = {
  signedIn: boolean;
  signIn: () => void;
  signOut: () => void;
};

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [signedIn, setSignedIn] = React.useState(false);

  React.useEffect(() => {
    const stored = window.localStorage.getItem("signedIn");
    setSignedIn(stored === "true");
  }, []);

  const signIn = () => {
    window.localStorage.setItem("signedIn", "true");
    setSignedIn(true);
  };

  const signOut = () => {
    window.localStorage.removeItem("signedIn");
    setSignedIn(false);
  };

  return (
    <AuthContext.Provider value={{ signedIn, signIn, signOut }}>
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
