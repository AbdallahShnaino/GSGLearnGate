"use client";
import { createContext, useContext, useEffect, useState } from "react";
import jwt from "jsonwebtoken";

interface DecodedToken {
  email?: string;
  role?: string;
  userId?: string;
}

interface AuthContextType {
  token: string | null;
  user: {
    email: string;
    role: string;
    userId: string;
  };
  userId: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [user, setUser] = useState({
    email: "",
    role: "",
    userId: "",
  });
  useEffect(() => {
    function getCookie(name: string) {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) {
        const cookieValue = parts.pop()?.split(";").shift();
        return cookieValue ? decodeURIComponent(cookieValue) : undefined;
      }
    }
    setToken(getCookie("token") || null);
  }, []);
  useEffect(() => {
    if (token) {
      try {
        const decodedToken = jwt.decode(token) as DecodedToken | null;
        if (decodedToken) {
          setUser({
            email: decodedToken.email || "",
            role: decodedToken.role || "",
            userId: decodedToken.userId || "",
          });
          setUserId(decodedToken.userId || "");
        }
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{ token, user, userId }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
