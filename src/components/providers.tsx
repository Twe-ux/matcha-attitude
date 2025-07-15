"use client";

import { CartProvider } from "@/contexts/CartContext";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import { Toaster } from "sonner";

interface ProvidersProps {
  children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <SessionProvider>
      <CartProvider>
        {children}
        <Toaster
          richColors
          position="top-center"
          expand={false}
          visibleToasts={1}
          closeButton={true}
          duration={3000}
        />
      </CartProvider>
    </SessionProvider>
  );
}
