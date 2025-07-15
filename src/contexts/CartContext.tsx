"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  stock: number;
}

interface CartContextType {
  items: CartItem[];
  total: number;
  itemsCount: number;
  addItem: (
    product: {
      id: string;
      name: string;
      price: number;
      images: string[];
      stock: number;
    },
    quantity?: number
  ) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  isLoading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

interface CartProviderProps {
  children: React.ReactNode;
}

export function CartProvider({ children }: CartProviderProps) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Charger le panier depuis localStorage au démarrage
  useEffect(() => {
    if (typeof window === "undefined") return; // S'assurer qu'on est côté client

    const savedCart = localStorage.getItem("matcha-cart");
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (error) {
        console.error("Erreur lors du chargement du panier:", error);
        localStorage.removeItem("matcha-cart");
      }
    }
    setIsLoading(false);
  }, []);

  // Sauvegarder le panier dans localStorage à chaque modification
  useEffect(() => {
    if (!isLoading && typeof window !== "undefined") {
      localStorage.setItem("matcha-cart", JSON.stringify(items));
    }
  }, [items, isLoading]);

  const addItem = (
    product: {
      id: string;
      name: string;
      price: number;
      images: string[];
      stock: number;
    },
    quantity = 1
  ) => {
    console.log(
      "🛒 FONCTION addItem appelée:",
      product.name,
      "quantité:",
      quantity
    );
    console.log("🛒 Stack trace:", new Error().stack);

    setItems((currentItems) => {
      console.log("🛒 Articles actuels:", currentItems.length);

      const existingItem = currentItems.find(
        (item) => item.productId === product.id
      );

      if (existingItem) {
        // Vérifier le stock disponible
        const newQuantity = existingItem.quantity + quantity;
        if (newQuantity > product.stock) {
          console.log("❌ Stock insuffisant");
          toast.error(
            `Stock insuffisant. Seulement ${product.stock} article(s) disponible(s).`
          );
          return currentItems;
        }

        console.log("✅ Mise à jour quantité existante:", newQuantity);
        // toast.success(
        //   `Quantité mise à jour : ${newQuantité} ${product.name}(s)`
        // );

        return currentItems.map((item) =>
          item.productId === product.id
            ? { ...item, quantity: newQuantity }
            : item
        );
      } else {
        // Vérifier le stock pour un nouvel article
        if (quantity > product.stock) {
          console.log("❌ Stock insuffisant pour nouveau produit");
          toast.error(
            `Stock insuffisant. Seulement ${product.stock} article(s) disponible(s).`
          );
          return currentItems;
        }

        console.log("✅ Ajout nouveau produit");
        // toast.success(`${product.name} ajouté au panier`);

        const newItem: CartItem = {
          id: `${product.id}-${Date.now()}`,
          productId: product.id,
          name: product.name,
          price: product.price,
          image: product.images[0] || "/placeholder.jpg",
          quantity,
          stock: product.stock,
        };

        console.log("🛒 Nouvel article créé:", newItem);
        return [...currentItems, newItem];
      }
    });
  };

  const removeItem = (productId: string) => {
    setItems((currentItems) => {
      const item = currentItems.find((item) => item.productId === productId);
      if (item) {
        toast.success(`${item.name} retiré du panier`);
      }
      return currentItems.filter((item) => item.productId !== productId);
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }

    setItems((currentItems) => {
      return currentItems.map((item) => {
        if (item.productId === productId) {
          // Vérifier le stock
          if (quantity > item.stock) {
            toast.error(
              `Stock insuffisant. Seulement ${item.stock} article(s) disponible(s).`
            );
            return item;
          }
          return { ...item, quantity };
        }
        return item;
      });
    });
  };

  const clearCart = () => {
    setItems([]);
    toast.success("Panier vidé");
  };

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const itemsCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        total,
        itemsCount,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        isLoading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
