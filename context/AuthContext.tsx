"use client";
import React, { createContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();
  useEffect(() => {
    const t = localStorage.getItem("admin_token");
    const u = localStorage.getItem("admin_user");
    if (t) setToken(t);
    if (u) setUser(JSON.parse(u));
  }, []);

  const login = (tokenStr: string, userObj: any) => {
    localStorage.setItem("admin_token", tokenStr);
    localStorage.setItem("admin_user", JSON.stringify(userObj));
    setToken(tokenStr);
    setUser(userObj);
    router.push("/products");
  };
  const logout = () => {
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_user");
    setToken(null);
    setUser(null);
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
