"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Edit2, Package, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
  createdAt: string;
  _count: {
    products: number;
  };
}

export default function AdminCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/categories");
      const data = await response.json();
      setCategories(data.categories || []);
    } catch (error) {
      console.error("Erreur lors du chargement des catégories:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement des catégories...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Gestion des Catégories
          </h1>
          <p className="text-gray-600">Organisez vos produits par catégories</p>
        </div>
        <Button className="bg-green-600 hover:bg-green-700">
          <Plus className="h-4 w-4 mr-2" />
          Ajouter une catégorie
        </Button>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-gray-900">
              {categories.length}
            </div>
            <p className="text-sm text-gray-600">Total catégories</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">
              {categories.reduce(
                (total, cat) => total + cat._count.products,
                0
              )}
            </div>
            <p className="text-sm text-gray-600">Total produits</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">
              {categories.length > 0
                ? Math.round(
                    categories.reduce(
                      (total, cat) => total + cat._count.products,
                      0
                    ) / categories.length
                  )
                : 0}
            </div>
            <p className="text-sm text-gray-600">Produits par catégorie</p>
          </CardContent>
        </Card>
      </div>

      {/* Liste des catégories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <Card
            key={category.id}
            className="overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="relative h-48">
              {category.image ? (
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center">
                  <Package className="h-16 w-16 text-green-600" />
                </div>
              )}
              <div className="absolute top-2 right-2">
                <Badge className="bg-white/90 text-gray-900">
                  {category._count.products} produits
                </Badge>
              </div>
            </div>

            <CardContent className="p-4">
              <div className="mb-3">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {category.name}
                </h3>
                <p className="text-sm text-gray-600 line-clamp-2">
                  {category.description}
                </p>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">
                  Créée le{" "}
                  {new Date(category.createdAt).toLocaleDateString("fr-FR")}
                </span>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline">
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-red-600 hover:text-red-700"
                    disabled={category._count.products > 0}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {category._count.products > 0 && (
                <p className="text-xs text-amber-600 mt-2">
                  ⚠️ Cette catégorie contient des produits et ne peut pas être
                  supprimée
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {categories.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Package className="h-12 w-12 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Aucune catégorie trouvée
          </h3>
          <p className="text-gray-600">
            Commencez par créer votre première catégorie de produits
          </p>
          <Button className="mt-4 bg-green-600 hover:bg-green-700">
            <Plus className="h-4 w-4 mr-2" />
            Créer une catégorie
          </Button>
        </div>
      )}
    </div>
  );
}
