import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { prisma } from "@/lib/prisma";
import { DollarSign, Package, ShoppingCart, Users } from "lucide-react";

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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Dashboard Administrateur
          </h1>
          <p className="mt-2 text-gray-600">
            Vue d&apos;ensemble de votre boutique en ligne
          </p>
        </div>

        {/* Statistiques principales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Revenus totaux
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {stats.totalRevenue.toFixed(2)} €
              </div>
              <p className="text-xs text-muted-foreground">
                Total des commandes
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Utilisateurs
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.usersCount}</div>
              <p className="text-xs text-muted-foreground">Comptes créés</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Produits</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.productsCount}</div>
              <p className="text-xs text-muted-foreground">En catalogue</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Commandes</CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.ordersCount}</div>
              <p className="text-xs text-muted-foreground">
                Total des commandes
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Actions rapides */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Actions Rapides</CardTitle>
              <CardDescription>Gérez votre boutique facilement</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <a
                href="/admin/products"
                className="block p-4 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <Package className="h-5 w-5 text-green-600" />
                  <div>
                    <h3 className="font-medium">Gérer les produits</h3>
                    <p className="text-sm text-gray-600">
                      Ajouter, modifier ou supprimer des produits
                    </p>
                  </div>
                </div>
              </a>

              <a
                href="/admin/categories"
                className="block p-4 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <Package className="h-5 w-5 text-blue-600" />
                  <div>
                    <h3 className="font-medium">Gérer les catégories</h3>
                    <p className="text-sm text-gray-600">
                      Organiser vos produits par catégories
                    </p>
                  </div>
                </div>
              </a>

              <a
                href="/admin/orders"
                className="block p-4 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <ShoppingCart className="h-5 w-5 text-purple-600" />
                  <div>
                    <h3 className="font-medium">Voir les commandes</h3>
                    <p className="text-sm text-gray-600">
                      Gérer les commandes clients
                    </p>
                  </div>
                </div>
              </a>

              <a
                href="/admin/users"
                className="block p-4 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <Users className="h-5 w-5 text-orange-600" />
                  <div>
                    <h3 className="font-medium">Gérer les utilisateurs</h3>
                    <p className="text-sm text-gray-600">
                      Administrer les comptes clients
                    </p>
                  </div>
                </div>
              </a>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Activité Récente</CardTitle>
              <CardDescription>
                Dernières activités sur la boutique
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm">Base de données connectée</p>
                    <p className="text-xs text-gray-500">
                      Système opérationnel
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm">
                      {stats.productsCount} produits en catalogue
                    </p>
                    <p className="text-xs text-gray-500">Prêts à la vente</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm">
                      {stats.usersCount} utilisateurs inscrits
                    </p>
                    <p className="text-xs text-gray-500">Base clients</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
