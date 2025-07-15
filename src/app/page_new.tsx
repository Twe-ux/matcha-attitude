import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Bienvenue chez <span className="text-green-600">Matcha</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Découvrez notre sélection de produits de qualité pour votre bien-être
          et votre style de vie.
        </p>
        <div className="flex gap-4 justify-center">
          <Button asChild size="lg">
            <Link href="/products">Voir nos produits</Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/auth/signup">Créer un compte</Link>
          </Button>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">
          Produits en vedette
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Produit exemple 1 */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-full h-48 bg-green-100 rounded-lg mb-4 flex items-center justify-center">
                <span className="text-green-600 text-sm">Image du produit</span>
              </div>
              <CardTitle>Thé Matcha Premium</CardTitle>
              <CardDescription>
                Thé matcha japonais de qualité supérieure, parfait pour vos
                moments de détente.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-green-600">
                  29,99 €
                </span>
                <Badge variant="secondary">En stock</Badge>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Ajouter au panier</Button>
            </CardFooter>
          </Card>

          {/* Produit exemple 2 */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-full h-48 bg-blue-100 rounded-lg mb-4 flex items-center justify-center">
                <span className="text-blue-600 text-sm">Image du produit</span>
              </div>
              <CardTitle>Fouet à Matcha Traditionnel</CardTitle>
              <CardDescription>
                Fouet en bambou authentique pour préparer le matcha parfait.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-green-600">
                  15,99 €
                </span>
                <Badge variant="secondary">En stock</Badge>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Ajouter au panier</Button>
            </CardFooter>
          </Card>

          {/* Produit exemple 3 */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-full h-48 bg-purple-100 rounded-lg mb-4 flex items-center justify-center">
                <span className="text-purple-600 text-sm">
                  Image du produit
                </span>
              </div>
              <CardTitle>Set Dégustation</CardTitle>
              <CardDescription>
                Coffret complet avec thé matcha, fouet et bol pour découvrir la
                cérémonie du thé.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-green-600">
                  49,99 €
                </span>
                <Badge variant="destructive">Édition limitée</Badge>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Ajouter au panier</Button>
            </CardFooter>
          </Card>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Pourquoi choisir Matcha ?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-green-600 text-2xl">🌿</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Qualité Premium</h3>
              <p className="text-gray-600">
                Produits sélectionnés avec soin pour vous offrir la meilleure
                qualité.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 text-2xl">🚚</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Livraison Rapide</h3>
              <p className="text-gray-600">
                Livraison gratuite dès 50€ d'achat, expédition sous 24h.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-purple-600 text-2xl">💳</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Paiement Sécurisé</h3>
              <p className="text-gray-600">
                Transactions sécurisées avec Stripe pour votre tranquillité
                d'esprit.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
