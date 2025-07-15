import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Info, Key, Shield, User } from "lucide-react";

export default function AdminSettings() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Paramètres & Aide</h1>
        <p className="text-gray-600">
          Informations utiles pour l&apos;administration
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Comptes de test */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Key className="h-5 w-5 mr-2" />
              Comptes de Test
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-red-50 rounded-lg border border-red-200">
              <div className="flex items-center mb-2">
                <Shield className="h-4 w-4 text-red-600 mr-2" />
                <Badge className="bg-red-100 text-red-800">ADMIN</Badge>
              </div>
              <div className="text-sm">
                <p>
                  <strong>Email :</strong> admin@matcha.com
                </p>
                <p>
                  <strong>Mot de passe :</strong> password123
                </p>
                <p className="text-red-600 text-xs mt-1">
                  Accès complet à l&apos;administration
                </p>
              </div>
            </div>

            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center mb-2">
                <User className="h-4 w-4 text-green-600 mr-2" />
                <Badge className="bg-green-100 text-green-800">USER</Badge>
              </div>
              <div className="text-sm">
                <p>
                  <strong>Email :</strong> user@matcha.com
                </p>
                <p>
                  <strong>Mot de passe :</strong> password123
                </p>
                <p className="text-green-600 text-xs mt-1">
                  Accès client standard
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Informations système */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Info className="h-5 w-5 mr-2" />
              État du Système
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Base de données</span>
              <Badge className="bg-green-100 text-green-800">
                MongoDB Atlas
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Authentification</span>
              <Badge className="bg-green-100 text-green-800">NextAuth.js</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">ORM</span>
              <Badge className="bg-green-100 text-green-800">Prisma</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Paiements</span>
              <Badge className="bg-yellow-100 text-yellow-800">
                En attente (Stripe)
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Fonctionnalités disponibles */}
        <Card>
          <CardHeader>
            <CardTitle>Fonctionnalités Disponibles</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                <span className="text-sm">Gestion des produits</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                <span className="text-sm">Gestion des catégories</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                <span className="text-sm">Gestion des utilisateurs</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                <span className="text-sm">Panier persistant</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></div>
                <span className="text-sm">
                  Gestion des commandes (prochainement)
                </span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></div>
                <span className="text-sm">
                  Paiements Stripe (prochainement)
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Instructions */}
        <Card>
          <CardHeader>
            <CardTitle>Guide Rapide</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm">
              <div>
                <strong>1. Connexion Admin :</strong>
                <p className="text-gray-600">
                  Utilisez admin@matcha.com pour accéder à cette interface
                </p>
              </div>
              <div>
                <strong>2. Gestion Produits :</strong>
                <p className="text-gray-600">
                  Ajoutez, modifiez et organisez votre catalogue
                </p>
              </div>
              <div>
                <strong>3. Suivi Utilisateurs :</strong>
                <p className="text-gray-600">
                  Consultez la liste des clients inscrits
                </p>
              </div>
              <div>
                <strong>4. Navigation :</strong>
                <p className="text-gray-600">
                  Utilisez le menu latéral pour naviguer entre les sections
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
