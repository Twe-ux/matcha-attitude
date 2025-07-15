"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Calendar, CreditCard, Eye, Package, ShoppingBag } from "lucide-react";
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

const statusColors = {
  PENDING: "bg-yellow-100 text-yellow-800",
  CONFIRMED: "bg-blue-100 text-blue-800",
  SHIPPED: "bg-purple-100 text-purple-800",
  DELIVERED: "bg-green-100 text-green-800",
  CANCELLED: "bg-red-100 text-red-800",
};

const statusLabels = {
  PENDING: "En attente",
  CONFIRMED: "Confirmée",
  SHIPPED: "Expédiée",
  DELIVERED: "Livrée",
  CANCELLED: "Annulée",
};

export default function OrdersPage() {
  const { data: session, status } = useSession();
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
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Chargement de vos commandes...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Mes commandes
          </h1>
          <p className="text-gray-600">
            Retrouvez l&apos;historique de toutes vos commandes
          </p>
        </div>

        {orders.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <ShoppingBag className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Aucune commande
              </h3>
              <p className="text-gray-600 mb-6">
                Vous n&apos;avez pas encore passé de commande.
              </p>
              <Button onClick={() => router.push("/products")}>
                Découvrir nos produits
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <Card key={order.id} className="overflow-hidden">
                <CardHeader className="bg-gray-50">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg mb-2">
                        Commande #{order.id.slice(-8).toUpperCase()}
                      </CardTitle>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {format(new Date(order.createdAt), "d MMMM yyyy", {
                            locale: fr,
                          })}
                        </div>
                        <div className="flex items-center">
                          <Package className="h-4 w-4 mr-1" />
                          {order.items.length} article
                          {order.items.length > 1 ? "s" : ""}
                        </div>
                        <div className="flex items-center">
                          <CreditCard className="h-4 w-4 mr-1" />
                          {order.total.toFixed(2)} €
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Badge
                        className={`${
                          statusColors[
                            order.status as keyof typeof statusColors
                          ]
                        } border-0`}
                      >
                        {
                          statusLabels[
                            order.status as keyof typeof statusLabels
                          ]
                        }
                      </Badge>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          setSelectedOrder(
                            selectedOrder?.id === order.id ? null : order
                          )
                        }
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        {selectedOrder?.id === order.id ? "Masquer" : "Détails"}
                      </Button>
                    </div>
                  </div>
                </CardHeader>

                {selectedOrder?.id === order.id && (
                  <CardContent className="pt-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Articles commandés */}
                      <div>
                        <h4 className="font-medium text-gray-900 mb-4">
                          Articles commandés
                        </h4>
                        <div className="space-y-3">
                          {order.items.map((item) => (
                            <div
                              key={item.id}
                              className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
                            >
                              <Image
                                src={
                                  item.product.images[0] || "/placeholder.jpg"
                                }
                                alt={item.product.name}
                                width={48}
                                height={48}
                                className="object-cover rounded"
                              />
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate">
                                  {item.product.name}
                                </p>
                                <p className="text-sm text-gray-600">
                                  Quantité: {item.quantity} ×{" "}
                                  {item.price.toFixed(2)} €
                                </p>
                              </div>
                              <div className="text-sm font-medium text-gray-900">
                                {(item.quantity * item.price).toFixed(2)} €
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Adresse de livraison */}
                      <div>
                        <h4 className="font-medium text-gray-900 mb-4">
                          Adresse de livraison
                        </h4>
                        <div className="p-4 bg-gray-50 rounded-lg">
                          <div className="text-sm text-gray-900">
                            <p>{order.address.street}</p>
                            <p>
                              {order.address.postalCode} {order.address.city}
                            </p>
                            <p>{order.address.country}</p>
                          </div>
                        </div>

                        <Separator className="my-4" />

                        {/* Récapitulatif */}
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Sous-total</span>
                            <span>{(order.total * 0.9).toFixed(2)} €</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Livraison</span>
                            <span>{(order.total * 0.1).toFixed(2)} €</span>
                          </div>
                          <Separator />
                          <div className="flex justify-between font-medium">
                            <span>Total</span>
                            <span>{order.total.toFixed(2)} €</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
