"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Mail, Search, Shield, User, Users } from "lucide-react";
import { useEffect, useState } from "react";

interface UserData {
  id: string;
  name: string;
  email: string;
  role: "USER" | "ADMIN";
  createdAt: string;
  _count?: {
    orders?: number;
    cartItems?: number;
  };
}

export default function AdminUsers() {
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      // Pour l'instant, récupérons les utilisateurs via une API basique
      const response = await fetch("/api/admin/users");
      if (response.ok) {
        const data = await response.json();
        setUsers(data.users || []);
      } else {
        // Fallback avec des données de base si l'API n'existe pas encore
        setUsers([
          {
            id: "1",
            name: "Administrateur",
            email: "admin@matcha.com",
            role: "ADMIN" as const,
            createdAt: new Date().toISOString(),
          },
          {
            id: "2",
            name: "Utilisateur Test",
            email: "user@matcha.com",
            role: "USER" as const,
            createdAt: new Date().toISOString(),
          },
        ]);
      }
    } catch (error) {
      console.error("Erreur lors du chargement des utilisateurs:", error);
      // Fallback data
      setUsers([
        {
          id: "1",
          name: "Administrateur",
          email: "admin@matcha.com",
          role: "ADMIN" as const,
          createdAt: new Date().toISOString(),
        },
        {
          id: "2",
          name: "Utilisateur Test",
          email: "user@matcha.com",
          role: "USER" as const,
          createdAt: new Date().toISOString(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = {
    totalUsers: users.length,
    adminUsers: users.filter((user) => user.role === "ADMIN").length,
    regularUsers: users.filter((user) => user.role === "USER").length,
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement des utilisateurs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Gestion des Utilisateurs
          </h1>
          <p className="text-gray-600">Administrez les comptes utilisateurs</p>
        </div>
      </div>

      {/* Recherche */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Rechercher un utilisateur..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <div className="text-2xl font-bold text-gray-900">
                  {stats.totalUsers}
                </div>
                <p className="text-sm text-gray-600">Total utilisateurs</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <Shield className="h-8 w-8 text-red-600" />
              <div className="ml-4">
                <div className="text-2xl font-bold text-gray-900">
                  {stats.adminUsers}
                </div>
                <p className="text-sm text-gray-600">Administrateurs</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <User className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <div className="text-2xl font-bold text-gray-900">
                  {stats.regularUsers}
                </div>
                <p className="text-sm text-gray-600">Clients</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Liste des utilisateurs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUsers.map((user) => (
          <Card key={user.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                    {user.role === "ADMIN" ? (
                      <Shield className="h-5 w-5 text-red-600" />
                    ) : (
                      <User className="h-5 w-5 text-green-600" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{user.name}</h3>
                    <Badge
                      className={
                        user.role === "ADMIN"
                          ? "bg-red-100 text-red-800"
                          : "bg-green-100 text-green-800"
                      }
                    >
                      {user.role}
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <Mail className="h-4 w-4 mr-2" />
                  {user.email}
                </div>
                <div className="text-sm text-gray-600">
                  Inscrit le{" "}
                  {new Date(user.createdAt).toLocaleDateString("fr-FR")}
                </div>
              </div>

              {user._count && (
                <div className="border-t pt-4">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-lg font-bold text-blue-600">
                        {user._count.orders || 0}
                      </div>
                      <div className="text-xs text-gray-600">Commandes</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-green-600">
                        {user._count.cartItems || 0}
                      </div>
                      <div className="text-xs text-gray-600">
                        Articles panier
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-4 flex space-x-2">
                <Button variant="outline" size="sm" className="flex-1">
                  Voir profil
                </Button>
                {user.role !== "ADMIN" && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-red-600 hover:text-red-700"
                  >
                    Suspendre
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredUsers.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Users className="h-12 w-12 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Aucun utilisateur trouvé
          </h3>
          <p className="text-gray-600">
            {searchTerm
              ? "Essayez de modifier votre recherche"
              : "Aucun utilisateur enregistré pour le moment"}
          </p>
        </div>
      )}
    </div>
  );
}
