"use client";

import { useCart } from "@/contexts/CartContext";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const {
    items,
    total,
    itemsCount,
    updateQuantity,
    removeItem,
    clearCart,
    isLoading,
  } = useCart();
  const { data: session } = useSession();
  const router = useRouter();

  const handleCheckout = () => {
    if (!session) {
      router.push("/auth/signin?callbackUrl=/cart");
      return;
    }
    // TODO: Rediriger vers le checkout Stripe
    router.push("/checkout");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-matcha-50 via-white to-matcha-100">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center">
              <div className="relative w-20 h-20 mx-auto mb-6">
                <div className="absolute inset-0 rounded-full bg-gradient-primary opacity-20 animate-ping"></div>
                <div className="relative w-20 h-20 rounded-full bg-gradient-primary flex items-center justify-center">
                  <ShoppingBag className="h-8 w-8 text-white animate-pulse" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-matcha-700 mb-2 font-[family-name:var(--font-playfair)]">
                Chargement de votre panier
              </h3>
              <p className="text-neutral-600">
                Préparation de vos articles premium...
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-matcha-50 via-white to-matcha-100">
      {/* Background Premium */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 bg-matcha-200/30 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-matcha-300/20 rounded-full blur-2xl animate-float-delayed"></div>
        <div className="absolute bottom-20 left-1/3 w-40 h-40 bg-matcha-100/40 rounded-full blur-3xl animate-float"></div>
      </div>

      <div className="relative container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Header Premium */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-3xl shadow-premium mb-6">
              <ShoppingBag className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-5xl font-bold text-matcha-800 mb-4 font-[family-name:var(--font-playfair)]">
              Mon Panier Premium
            </h1>
            <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
              <span className="text-3xl font-bold text-matcha-600">
                {itemsCount}
              </span>
              <span className="ml-2">
                article{itemsCount > 1 ? "s" : ""} premium sélectionné
                {itemsCount > 1 ? "s" : ""} avec soin
              </span>
            </p>
          </div>

          {items.length === 0 ? (
            <div className="text-center py-24">
              <div className="max-w-lg mx-auto bg-white/80 backdrop-blur-sm rounded-3xl p-12 shadow-premium border border-white/50">
                <div className="relative w-24 h-24 mx-auto mb-8">
                  <div className="absolute inset-0 bg-matcha-100 rounded-full"></div>
                  <div className="relative w-24 h-24 bg-gradient-to-r from-matcha-200 to-matcha-300 rounded-full flex items-center justify-center">
                    <ShoppingBag className="h-12 w-12 text-matcha-700" />
                  </div>
                </div>
                <h3 className="text-3xl font-bold text-matcha-800 mb-4 font-[family-name:var(--font-playfair)]">
                  Votre panier est encore vide
                </h3>
                <p className="text-lg text-neutral-600 mb-8 leading-relaxed">
                  Découvrez notre sélection premium de produits matcha
                  d&apos;exception et laissez-vous séduire par leur qualité
                  artisanale.
                </p>
                <Link href="/products">
                  <button className="bg-gradient-primary text-white font-semibold px-8 py-4 rounded-2xl hover:shadow-premium-lg transform hover:scale-105 transition-all duration-300 shadow-premium inline-flex items-center space-x-2">
                    <span>Découvrir nos Produits Premium</span>
                    <span>✨</span>
                  </button>
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Articles du panier Premium */}
              <div className="lg:col-span-2 space-y-6">
                {items.map((item, index) => (
                  <div
                    key={item.id}
                    className="group bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-premium hover:shadow-premium-lg transition-all duration-500 border border-white/50 hover:-translate-y-1"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-center space-x-6">
                      <div className="relative h-24 w-24 flex-shrink-0">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover rounded-2xl shadow-premium"
                        />
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-primary rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">
                            {item.quantity}
                          </span>
                        </div>
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="text-xl font-bold text-matcha-800 truncate font-[family-name:var(--font-playfair)] mb-2">
                          {item.name}
                        </h3>
                        <div className="flex items-center space-x-4 mb-3">
                          <p className="text-lg font-semibold text-matcha-600">
                            {item.price.toFixed(2)} € l&apos;unité
                          </p>
                          <div className="h-1 w-1 bg-neutral-300 rounded-full"></div>
                          <p className="text-sm text-neutral-500">
                            Stock: {item.stock}
                          </p>
                        </div>
                        <div className="text-sm text-matcha-700 bg-matcha-50 px-3 py-1 rounded-full inline-block">
                          Total: {(item.price * item.quantity).toFixed(2)} €
                        </div>
                      </div>

                      {/* Contrôles Quantité Premium */}
                      <div className="flex flex-col items-center space-y-4">
                        <div className="flex items-center space-x-3 bg-white/60 backdrop-blur-sm rounded-2xl p-2 border border-white/50">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            disabled={item.quantity <= 1}
                            className="w-10 h-10 rounded-xl bg-white shadow-sm hover:shadow-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-matcha-600 hover:bg-matcha-50"
                          >
                            <Minus className="h-4 w-4" />
                          </button>

                          <span className="w-12 text-center font-bold text-matcha-700 text-lg">
                            {item.quantity}
                          </span>

                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            disabled={item.quantity >= item.stock}
                            className="w-10 h-10 rounded-xl bg-white shadow-sm hover:shadow-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-matcha-600 hover:bg-matcha-50"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>

                        <button
                          onClick={() => removeItem(item.id)}
                          className="w-10 h-10 rounded-xl bg-red-50 text-red-500 hover:bg-red-100 hover:text-red-600 transition-all duration-200 flex items-center justify-center group"
                        >
                          <Trash2 className="h-4 w-4 group-hover:scale-110 transition-transform" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Actions du panier Premium */}
                <div className="flex justify-between items-center pt-8">
                  <div className="text-lg text-neutral-600">
                    <span className="font-semibold text-matcha-700">
                      {itemsCount}
                    </span>{" "}
                    article{itemsCount > 1 ? "s" : ""} sélectionné
                    {itemsCount > 1 ? "s" : ""}
                  </div>
                  <button
                    onClick={clearCart}
                    className="text-red-500 hover:text-red-600 font-medium px-4 py-2 rounded-xl hover:bg-red-50 transition-all duration-200 flex items-center space-x-2"
                  >
                    <Trash2 className="h-4 w-4" />
                    <span>Vider le panier</span>
                  </button>
                </div>
              </div>

              {/* Récapitulatif Premium */}
              <div>
                <div className="sticky top-8 bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-premium border border-white/50">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-matcha-800 font-[family-name:var(--font-playfair)] mb-2">
                      Récapitulatif Premium
                    </h3>
                    <p className="text-neutral-600">
                      Votre sélection d&apos;exception
                    </p>
                  </div>

                  <div className="space-y-4 mb-8">
                    <div className="flex justify-between text-lg">
                      <span className="text-neutral-600">Sous-total</span>
                      <span className="font-semibold text-matcha-700">
                        {total.toFixed(2)} €
                      </span>
                    </div>
                    <div className="flex justify-between text-lg">
                      <span className="text-neutral-600">Livraison</span>
                      <div className="text-right">
                        <span
                          className={`font-semibold ${
                            total > 50 ? "text-green-600" : "text-matcha-700"
                          }`}
                        >
                          {total > 50 ? "Gratuite" : "5,99 €"}
                        </span>
                        {total > 50 && (
                          <div className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full inline-block ml-2">
                            ✨ Premium
                          </div>
                        )}
                      </div>
                    </div>
                    {total <= 50 && (
                      <div className="text-sm text-amber-600 bg-amber-50 p-4 rounded-2xl text-center">
                        💡 Ajoutez {(50 - total).toFixed(2)} € pour la livraison
                        gratuite premium !
                      </div>
                    )}
                    <div className="h-px bg-gradient-to-r from-transparent via-matcha-200 to-transparent"></div>
                    <div className="flex justify-between text-xl font-bold">
                      <span className="text-matcha-800">Total</span>
                      <span className="text-matcha-700">
                        {(total + (total > 50 ? 0 : 5.99)).toFixed(2)} €
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={handleCheckout}
                    className="btn-premium-primary w-full mb-4 py-4 text-lg"
                  >
                    <span className="flex items-center justify-center space-x-2">
                      <span>
                        {session
                          ? "Procéder au Paiement Premium"
                          : "Se connecter pour Commander"}
                      </span>
                      <span>💎</span>
                    </span>
                  </button>

                  <div className="space-y-3">
                    <Link href="/products">
                      <button className="btn-premium-outline w-full py-3">
                        Continuer mes Achats Premium
                      </button>
                    </Link>

                    <p className="text-xs text-neutral-500 text-center leading-relaxed">
                      🔒 Paiement 100% sécurisé avec Stripe
                      <br />✨ Satisfaction garantie ou remboursé
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
