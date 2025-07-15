import { prisma } from "@/lib/prisma";
import {
  Crown,
  DollarSign,
  Eye,
  Package,
  ShoppingCart,
  Sparkles,
  TrendingUp,
  Users,
} from "lucide-react";

async function getStats() {
  try {
    const [usersCount, productsCount, ordersCount, cartItemsCount] =
      await Promise.all([
        prisma.user.count(),
        prisma.product.count(),
        prisma.order.count(),
        prisma.cartItem.count(),
      ]);

    const orders = await prisma.order.findMany({
      select: { total: true },
    });

    const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);

    return {
      usersCount,
      productsCount,
      ordersCount,
      cartItemsCount,
      totalRevenue,
    };
  } catch (error) {
    console.error("Erreur lors de la récupération des statistiques:", error);
    return {
      usersCount: 0,
      productsCount: 0,
      ordersCount: 0,
      cartItemsCount: 0,
      totalRevenue: 0,
    };
  }
}

export default async function AdminDashboard() {
  const stats = await getStats();

  const statsCards = [
    {
      title: "Revenus Totaux",
      value: `${stats.totalRevenue.toFixed(2)} €`,
      icon: DollarSign,
      description: "Chiffre d'affaires global",
      color: "from-green-500 to-emerald-600",
      bgColor: "bg-green-50",
      textColor: "text-green-700",
    },
    {
      title: "Utilisateurs Premium",
      value: stats.usersCount.toString(),
      icon: Users,
      description: "Membres de la communauté",
      color: "from-blue-500 to-cyan-600",
      bgColor: "bg-blue-50",
      textColor: "text-blue-700",
    },
    {
      title: "Produits Premium",
      value: stats.productsCount.toString(),
      icon: Package,
      description: "Articles dans le catalogue",
      color: "from-purple-500 to-pink-600",
      bgColor: "bg-purple-50",
      textColor: "text-purple-700",
    },
    {
      title: "Commandes",
      value: stats.ordersCount.toString(),
      icon: ShoppingCart,
      description: "Commandes passées",
      color: "from-orange-500 to-red-600",
      bgColor: "bg-orange-50",
      textColor: "text-orange-700",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-matcha-50 via-white to-neutral-50 relative overflow-hidden">
      {/* Background Premium */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-40 h-40 bg-matcha-200/30 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-matcha-300/20 rounded-full blur-2xl animate-float-delayed"></div>
        <div className="absolute top-1/2 left-10 w-24 h-24 bg-matcha-100/40 rounded-full blur-2xl animate-float-slow"></div>
      </div>

      <div className="relative container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto">
          {/* Header Premium */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-primary rounded-3xl shadow-premium mb-6 animate-fade-in-down">
              <Crown className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-5xl font-bold text-matcha-800 mb-4 font-[family-name:var(--font-playfair)]">
              Dashboard Administrateur
            </h1>
            <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
              Pilotez votre boutique matcha premium avec élégance et efficacité
            </p>
          </div>

          {/* Statistiques Premium */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {statsCards.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.title}
                  className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-premium border border-white/50 p-8 hover:shadow-premium-lg hover:-translate-y-1 transition-all duration-500 animate-fade-in-up group"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center justify-between mb-6">
                    <div
                      className={`w-14 h-14 bg-gradient-to-r ${stat.color} rounded-2xl flex items-center justify-center shadow-premium group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Icon className="h-7 w-7 text-white" />
                    </div>
                    <div className="flex items-center space-x-1 text-green-600">
                      <TrendingUp className="h-4 w-4" />
                      <span className="text-sm font-medium">+12%</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-neutral-600 uppercase tracking-wide">
                      {stat.title}
                    </h3>
                    <div className="text-3xl font-bold text-matcha-800 font-[family-name:var(--font-playfair)]">
                      {stat.value}
                    </div>
                    <p className="text-sm text-neutral-500">
                      {stat.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Actions rapides Premium */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <div
              className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-premium border border-white/50 p-8 animate-fade-in-up"
              style={{ animationDelay: "0.4s" }}
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-matcha-500 to-matcha-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-premium">
                  <Package className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-matcha-800 mb-3 font-[family-name:var(--font-playfair)]">
                  Gestion des Produits
                </h3>
                <p className="text-neutral-600 mb-6">
                  Ajoutez, modifiez et organisez votre catalogue premium
                </p>
                <a
                  href="/admin/products"
                  className="btn-premium-primary w-full py-3 inline-block text-center"
                >
                  Gérer les Produits
                </a>
              </div>
            </div>

            <div
              className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-premium border border-white/50 p-8 animate-fade-in-up"
              style={{ animationDelay: "0.5s" }}
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-premium">
                  <ShoppingCart className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-matcha-800 mb-3 font-[family-name:var(--font-playfair)]">
                  Commandes Premium
                </h3>
                <p className="text-neutral-600 mb-6">
                  Suivez et gérez toutes les commandes clients
                </p>
                <a
                  href="/admin/orders"
                  className="btn-premium-primary w-full py-3 inline-block text-center"
                >
                  Voir les Commandes
                </a>
              </div>
            </div>

            <div
              className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-premium border border-white/50 p-8 animate-fade-in-up"
              style={{ animationDelay: "0.6s" }}
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-premium">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-matcha-800 mb-3 font-[family-name:var(--font-playfair)]">
                  Utilisateurs Premium
                </h3>
                <p className="text-neutral-600 mb-6">
                  Gérez votre communauté de passionnés matcha
                </p>
                <a
                  href="/admin/users"
                  className="btn-premium-primary w-full py-3 inline-block text-center"
                >
                  Gérer les Utilisateurs
                </a>
              </div>
            </div>
          </div>

          {/* Vue d'ensemble Premium */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Dernières activités */}
            <div
              className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-premium border border-white/50 p-8 animate-fade-in-up"
              style={{ animationDelay: "0.7s" }}
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center">
                  <Eye className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-xl font-bold text-matcha-800 font-[family-name:var(--font-playfair)]">
                  Aperçu Récent
                </h3>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-matcha-50/50 rounded-2xl">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                      <ShoppingCart className="h-4 w-4 text-green-600" />
                    </div>
                    <span className="text-matcha-700 font-medium">
                      Nouvelle commande
                    </span>
                  </div>
                  <span className="text-sm text-neutral-500">Il y a 2 min</span>
                </div>

                <div className="flex items-center justify-between p-4 bg-matcha-50/50 rounded-2xl">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Users className="h-4 w-4 text-blue-600" />
                    </div>
                    <span className="text-matcha-700 font-medium">
                      Nouvel utilisateur
                    </span>
                  </div>
                  <span className="text-sm text-neutral-500">
                    Il y a 15 min
                  </span>
                </div>

                <div className="flex items-center justify-between p-4 bg-matcha-50/50 rounded-2xl">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Package className="h-4 w-4 text-purple-600" />
                    </div>
                    <span className="text-matcha-700 font-medium">
                      Produit mis à jour
                    </span>
                  </div>
                  <span className="text-sm text-neutral-500">
                    Il y a 1 heure
                  </span>
                </div>
              </div>
            </div>

            {/* Performance Premium */}
            <div
              className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-premium border border-white/50 p-8 animate-fade-in-up"
              style={{ animationDelay: "0.8s" }}
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-xl font-bold text-matcha-800 font-[family-name:var(--font-playfair)]">
                  Performance Premium
                </h3>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-600">Taux de conversion</span>
                    <span className="font-medium text-matcha-700">4.2%</span>
                  </div>
                  <div className="w-full bg-neutral-200 rounded-full h-2">
                    <div
                      className="bg-gradient-primary h-2 rounded-full"
                      style={{ width: "42%" }}
                    ></div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-600">
                      Satisfaction client
                    </span>
                    <span className="font-medium text-matcha-700">98%</span>
                  </div>
                  <div className="w-full bg-neutral-200 rounded-full h-2">
                    <div
                      className="bg-gradient-primary h-2 rounded-full"
                      style={{ width: "98%" }}
                    ></div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-600">Produits premium</span>
                    <span className="font-medium text-matcha-700">85%</span>
                  </div>
                  <div className="w-full bg-neutral-200 rounded-full h-2">
                    <div
                      className="bg-gradient-primary h-2 rounded-full"
                      style={{ width: "85%" }}
                    ></div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-gradient-to-r from-matcha-50 to-matcha-100 rounded-2xl border border-matcha-200">
                  <div className="flex items-center space-x-2 text-matcha-700">
                    <Crown className="h-4 w-4" />
                    <span className="text-sm font-medium">
                      Votre boutique matcha premium performe excellemment ! ✨
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
