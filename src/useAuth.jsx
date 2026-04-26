import { createContext, useContext, useEffect, useState } from "react";
import storage from "@/storage";

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setUser(storage.getCurrentUser());
    setLoading(false);
  }, []);

  const signIn = async (email, password) => {
    const nextUser = await storage.signIn({ email, password });
    setUser(nextUser);
    return nextUser;
  };

  const signUp = async (email, password, username) => {
    const nextUser = await storage.signUp({ email, password, username });
    setUser(nextUser);
    return nextUser;
  };

  const signOut = () => {
    storage.signOut();
    setUser(null);
  };

  const updateProfile = async (profile) => {
    const nextUser = await storage.updateProfile(profile);
    setUser(nextUser);
    return nextUser;
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
};

export default { AuthProvider, useAuth };
