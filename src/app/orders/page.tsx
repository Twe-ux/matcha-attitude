"use client";

import { format } from "date-fns";
import { fr } from "date-fns/locale";
import {
  Calendar,
  CheckCircle,
  Clock,
  CreditCard,
  Eye,
  Package,
  ShoppingBag,
  Truck,
  X,
} from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface OrderItem {
  id: string;
  quantity: number;
  price: number;
  product: {
    id: string;
    name: string;
    images: string[];
  };
}

interface Order {
  id: string;
  status: string;
  total: number;
  createdAt: string;
  items: OrderItem[];
  address: {
    street: string;
    city: string;
    postalCode: string;
    country: string;
  };
}

const statusConfig = {
  PENDING: {
    label: "En attente",
    color: "bg-amber-100 text-amber-800 border-amber-200",
    icon: Clock,
    gradient: "from-amber-500 to-orange-500",
  },
  CONFIRMED: {
    label: "Confirmée",
    color: "bg-blue-100 text-blue-800 border-blue-200",
    icon: CheckCircle,
    gradient: "from-blue-500 to-cyan-500",
  },
  SHIPPED: {
    label: "Expédiée",
    color: "bg-purple-100 text-purple-800 border-purple-200",
    icon: Truck,
    gradient: "from-purple-500 to-pink-500",
  },
  DELIVERED: {
    label: "Livrée",
    color: "bg-green-100 text-green-800 border-green-200",
    icon: CheckCircle,
    gradient: "from-green-500 to-emerald-500",
  },
  CANCELLED: {
    label: "Annulée",
    color: "bg-red-100 text-red-800 border-red-200",
    icon: X,
    gradient: "from-red-500 to-pink-500",
  },
};

export default function OrdersPage() {
  const { status } = useSession();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
      return;
    }

    if (status === "authenticated") {
      fetchOrders();
    }
  }, [status, router]);

  const fetchOrders = async () => {
    try {
      const response = await fetch("/api/orders");
      if (response.ok) {
        const data = await response.json();
        setOrders(data);
      }
    } catch (error) {
      console.error("Erreur lors du chargement des commandes:", error);
    } finally {
      setLoading(false);
    }
  };

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-matcha-50 via-white to-neutral-50">
        <div className="container mx-auto px-4 py-24">
          <div className="text-center">
            <div className="relative mx-auto w-24 h-24 mb-8">
              <div className="absolute inset-0 rounded-full bg-gradient-primary opacity-20 animate-ping"></div>
              <div className="relative w-24 h-24 rounded-full bg-gradient-primary flex items-center justify-center animate-pulse">
                <Package className="h-10 w-10 text-white" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-matcha-700 mb-2 font-[family-name:var(--font-playfair)]">
              Chargement de vos Commandes Premium
            </h3>
            <p className="text-neutral-600">
              Consultation de votre historique d&apos;achats...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-matcha-50 via-white to-neutral-50 relative overflow-hidden">
      {/* Background Premium */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-40 h-40 bg-matcha-200/30 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-matcha-300/20 rounded-full blur-2xl animate-float-delayed"></div>
        <div className="absolute top-1/2 left-10 w-24 h-24 bg-matcha-100/40 rounded-full blur-2xl animate-float-slow"></div>
      </div>

      <div className="relative container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Header Premium */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-primary rounded-3xl shadow-premium mb-6 animate-fade-in-down">
              <Package className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-5xl font-bold text-matcha-800 mb-4 font-[family-name:var(--font-playfair)]">
              Mes Commandes Premium
            </h1>
            <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
              Suivez vos commandes et découvrez l&apos;historique de vos achats
              matcha d&apos;exception
            </p>
          </div>

          {orders.length === 0 ? (
            <div className="text-center py-24">
              <div className="max-w-lg mx-auto bg-white/80 backdrop-blur-sm rounded-3xl p-12 shadow-premium border border-white/50">
                <div className="relative w-24 h-24 mx-auto mb-8">
                  <div className="absolute inset-0 bg-matcha-100 rounded-full"></div>
                  <div className="relative w-24 h-24 bg-gradient-to-r from-matcha-200 to-matcha-300 rounded-full flex items-center justify-center">
                    <ShoppingBag className="h-12 w-12 text-matcha-700" />
                  </div>
                </div>
                <h3 className="text-3xl font-bold text-matcha-800 mb-4 font-[family-name:var(--font-playfair)]">
                  Aucune commande pour l&apos;instant
                </h3>
                <p className="text-lg text-neutral-600 mb-8 leading-relaxed">
                  Découvrez notre collection premium de produits matcha et
                  passez votre première commande d&apos;exception.
                </p>
                <button
                  onClick={() => router.push("/products")}
                  className="btn-premium-primary px-8 py-4 text-lg"
                >
                  <span className="flex items-center space-x-2">
                    <ShoppingBag className="h-5 w-5" />
                    <span>Découvrir nos Produits Premium</span>
                    <span>✨</span>
                  </span>
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              {orders.map((order, index) => {
                const statusInfo =
                  statusConfig[order.status as keyof typeof statusConfig];
                const StatusIcon = statusInfo.icon;

                return (
                  <div
                    key={order.id}
                    className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-premium hover:shadow-premium-lg transition-all duration-500 border border-white/50 hover:-translate-y-1 animate-fade-in-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="p-8">
                      {/* En-tête de la commande */}
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8 gap-6">
                        <div className="flex items-start space-x-4">
                          <div
                            className={`w-12 h-12 bg-gradient-to-r ${statusInfo.gradient} rounded-2xl flex items-center justify-center shadow-premium`}
                          >
                            <StatusIcon className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-matcha-800 font-[family-name:var(--font-playfair)] mb-2">
                              Commande #{order.id.slice(-8).toUpperCase()}
                            </h3>
                            <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-600">
                              <div className="flex items-center space-x-2">
                                <Calendar className="h-4 w-4" />
                                <span>
                                  {format(
                                    new Date(order.createdAt),
                                    "dd MMMM yyyy 'à' HH:mm",
                                    {
                                      locale: fr,
                                    }
                                  )}
                                </span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <CreditCard className="h-4 w-4" />
                                <span className="font-semibold text-matcha-700">
                                  {order.total.toFixed(2)} €
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between lg:justify-end gap-4">
                          <span
                            className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium border ${statusInfo.color}`}
                          >
                            <StatusIcon className="h-4 w-4 mr-2" />
                            {statusInfo.label}
                          </span>

                          <button
                            onClick={() =>
                              setSelectedOrder(
                                selectedOrder?.id === order.id ? null : order
                              )
                            }
                            className="btn-premium-outline px-4 py-2 text-sm"
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            {selectedOrder?.id === order.id
                              ? "Masquer"
                              : "Détails"}
                          </button>
                        </div>
                      </div>

                      {/* Aperçu des produits */}
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-6">
                        {order.items.slice(0, 6).map((item) => (
                          <div key={item.id} className="relative group">
                            <div className="aspect-square relative rounded-2xl overflow-hidden bg-matcha-50 border border-matcha-100">
                              <Image
                                src={
                                  item.product.images[0] || "/placeholder.jpg"
                                }
                                alt={item.product.name}
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-300"
                              />
                              <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-primary rounded-full flex items-center justify-center shadow-premium">
                                <span className="text-white text-xs font-bold">
                                  {item.quantity}
                                </span>
                              </div>
                            </div>
                            <p className="text-xs text-matcha-700 font-medium mt-2 text-center truncate">
                              {item.product.name}
                            </p>
                          </div>
                        ))}
                        {order.items.length > 6 && (
                          <div className="aspect-square rounded-2xl bg-matcha-100 border-2 border-dashed border-matcha-300 flex items-center justify-center">
                            <span className="text-matcha-600 font-medium text-sm">
                              +{order.items.length - 6}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Détails étendus */}
                      {selectedOrder?.id === order.id && (
                        <div className="border-t border-matcha-100 pt-8 animate-fade-in-down">
                          <div className="grid md:grid-cols-2 gap-8">
                            {/* Liste détaillée des produits */}
                            <div>
                              <h4 className="text-lg font-bold text-matcha-800 mb-4 font-[family-name:var(--font-playfair)]">
                                Produits commandés
                              </h4>
                              <div className="space-y-4">
                                {order.items.map((item) => (
                                  <div
                                    key={item.id}
                                    className="flex items-center space-x-4 p-4 bg-matcha-50/50 rounded-2xl"
                                  >
                                    <div className="w-16 h-16 relative rounded-xl overflow-hidden bg-white border border-matcha-100">
                                      <Image
                                        src={
                                          item.product.images[0] ||
                                          "/placeholder.jpg"
                                        }
                                        alt={item.product.name}
                                        fill
                                        className="object-cover"
                                      />
                                    </div>
                                    <div className="flex-1">
                                      <h5 className="font-semibold text-matcha-800 mb-1">
                                        {item.product.name}
                                      </h5>
                                      <div className="flex items-center justify-between text-sm">
                                        <span className="text-neutral-600">
                                          Quantité: {item.quantity}
                                        </span>
                                        <span className="font-semibold text-matcha-700">
                                          {(item.price * item.quantity).toFixed(
                                            2
                                          )}{" "}
                                          €
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Adresse de livraison */}
                            <div>
                              <h4 className="text-lg font-bold text-matcha-800 mb-4 font-[family-name:var(--font-playfair)]">
                                Adresse de livraison
                              </h4>
                              <div className="p-6 bg-matcha-50/50 rounded-2xl">
                                <div className="flex items-start space-x-3">
                                  <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center mt-1">
                                    <Package className="h-5 w-5 text-white" />
                                  </div>
                                  <div>
                                    <p className="font-semibold text-matcha-800 mb-1">
                                      {order.address.street}
                                    </p>
                                    <p className="text-neutral-600">
                                      {order.address.postalCode}{" "}
                                      {order.address.city}
                                    </p>
                                    <p className="text-neutral-600">
                                      {order.address.country}
                                    </p>
                                  </div>
                                </div>
                              </div>

                              {/* Récapitulatif */}
                              <div className="mt-6 p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/50">
                                <h5 className="font-bold text-matcha-800 mb-4">
                                  Récapitulatif
                                </h5>
                                <div className="space-y-2 text-sm">
                                  <div className="flex justify-between">
                                    <span className="text-neutral-600">
                                      Sous-total
                                    </span>
                                    <span className="font-medium">
                                      {(order.total - 5.99).toFixed(2)} €
                                    </span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-neutral-600">
                                      Livraison
                                    </span>
                                    <span className="font-medium">5,99 €</span>
                                  </div>
                                  <div className="h-px bg-matcha-200 my-3"></div>
                                  <div className="flex justify-between text-lg font-bold">
                                    <span className="text-matcha-800">
                                      Total
                                    </span>
                                    <span className="text-matcha-700">
                                      {order.total.toFixed(2)} €
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
