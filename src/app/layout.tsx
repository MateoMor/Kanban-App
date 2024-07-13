"use client";

import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

/* ------------- Contexto de la aplicación ------------- */

import { AppContextType } from "@/types/task";
import { createContext, useContext, useState } from "react";

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppWrapper({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string>("");

  return (
    <AppContext.Provider value={{ token, setToken }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}

/* ------------------------------------------------------ */

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  /* const { token, setToken } = useAppContext() as AppContextType; */

  return (
    <html lang="en">
      <AppWrapper>
        <body className={inter.className}>{children}</body>
      </AppWrapper>
    </html>
  );
}
