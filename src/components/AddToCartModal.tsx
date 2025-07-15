"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useCart } from "@/contexts/CartContext";
import { Minus, Plus } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  inStock: boolean;
}

interface AddToCartModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function AddToCartModal({
  product,
  isOpen,
  onClose,
}: AddToCartModalProps) {
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();

  console.log("🎭 MODAL RENDER:", {
    isOpen,
    productName: product?.name,
    hasProduct: !!product,
  });

  const handleAddToCart = () => {
    if (!product) {
      console.log("❌ Pas de produit sélectionné");
      return;
    }

    console.log(
      "✅ MODAL handleAddToCart appelé:",
      product.name,
      "quantité:",
      quantity
    );
    console.log("✅ MODAL Stack trace:", new Error().stack);

    addItem(
      {
        id: product.id,
        name: product.name,
        price: product.price,
        images: [product.imageUrl],
        stock: product.inStock ? 10 : 0,
      },
      quantity
    );

    // Toast personnalisé depuis le modal
    toast.success(
      `${quantity} ${product.name}${quantity > 1 ? "s" : ""} ajouté${
        quantity > 1 ? "s" : ""
      } au panier !`
    );

    setQuantity(1);
    onClose();
  };

  if (!product) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{product.name}</DialogTitle>
          <DialogDescription>{product.description}</DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="relative h-48 w-full">
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="object-cover rounded-md"
            />
          </div>

          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">
              {product.price.toFixed(2)} €
            </p>
          </div>

          <div className="flex items-center justify-center space-x-4">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              disabled={quantity <= 1}
            >
              <Minus className="h-4 w-4" />
            </Button>

            <span className="text-lg font-medium w-12 text-center">
              {quantity}
            </span>

            <Button
              variant="outline"
              size="icon"
              onClick={() => setQuantity(quantity + 1)}
              disabled={quantity >= 10}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Annuler
          </Button>
          <Button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className="bg-green-600 hover:bg-green-700"
          >
            Ajouter au panier ({(product.price * quantity).toFixed(2)} €)
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
