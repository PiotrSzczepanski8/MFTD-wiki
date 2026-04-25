import { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUser, signIn as storageSignIn, signUp as storageSignUp, signOut as storageSignOut, updateProfile as storageUpdateProfile } from "@/lib/storage";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setUser(getCurrentUser());
    setLoading(false);
  }, []);

  const signIn = async (email, password) => {
    const nextUser = await storageSignIn({ email, password });
    setUser(nextUser);
    return nextUser;
  };

  const signUp = async (email, password, username) => {
    const nextUser = await storageSignUp({ email, password, username });
    setUser(nextUser);
    return nextUser;
  };

  const signOut = () => {
    storageSignOut();
    setUser(null);
  };

  const updateProfile = async (profile) => {
    const nextUser = await storageUpdateProfile(profile);
    setUser(nextUser);
    return nextUser;
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
};
