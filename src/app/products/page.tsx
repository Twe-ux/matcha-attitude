"use client";

import AddToCartModal from "@/components/AddToCartModal";
import ProductImage from "@/components/ProductImage";
import { Search } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  categoryId: string;
  featured: boolean;
  inStock: boolean;
  rating?: number;
  reviewCount?: number;
  category: {
    id: string;
    name: string;
    description: string;
  };
}

interface Category {
  id: string;
  name: string;
  description: string;
  _count: {
    products: number;
  };
}

interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filtres et recherche
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState<PaginationInfo | null>(null);

  // État pour le modal
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/categories");
      if (!response.ok)
        throw new Error("Erreur lors du chargement des catégories");
      const data = await response.json();
      setCategories(data.categories);
    } catch (err) {
      console.error("Erreur catégories:", err);
    }
  };

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: "12",
      });

      if (searchTerm) params.append("search", searchTerm);
      if (selectedCategory !== "all")
        params.append("category", selectedCategory);

      const response = await fetch(`/api/products?${params}`);
      if (!response.ok)
        throw new Error("Erreur lors du chargement des produits");

      const data = await response.json();
      setProducts(data.products);
      setPagination(data.pagination);
      setError(null);
    } catch (err) {
      setError("Impossible de charger les produits");
      console.error("Erreur produits:", err);
    } finally {
      setLoading(false);
    }
  }, [currentPage, searchTerm, selectedCategory]);

  // Charger les catégories
  useEffect(() => {
    fetchCategories();
  }, []);

  // Charger les produits avec les filtres
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchProducts();
  };

  const handleAddToCart = (product: Product) => {
    console.log("🔥 CLICK SUR AJOUTER AU PANIER:", product.name);
    console.log("🔥 Product complet:", product);
    setSelectedProduct(product);
    setIsModalOpen(true);
    console.log("🔥 Modal devrait être ouvert:", true);
    console.log("🔥 Produit sélectionné:", product.name);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  if (loading && products.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-matcha-50 via-white to-neutral-50">
        <div className="container mx-auto py-24">
          <div className="text-center">
            <div className="relative mx-auto w-32 h-32 mb-8">
              <div className="w-32 h-32 border-4 border-matcha-200 border-t-matcha-600 rounded-full animate-spin"></div>
              <div className="absolute inset-4 bg-matcha-50 rounded-full flex items-center justify-center">
                <div className="w-8 h-8 bg-matcha-600 rounded-full animate-pulse"></div>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-neutral-900 mb-4 font-[family-name:var(--font-playfair)]">
              Chargement de la Collection
            </h3>
            <p className="text-neutral-600">
              Découverte de nos produits premium en cours...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-matcha-50 via-white to-neutral-50 texture-paper">
      {/* Header Premium */}
      <div className="relative overflow-hidden bg-gradient-to-r from-matcha-600 via-matcha-500 to-matcha-700 text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-20 w-24 h-24 bg-white/5 rounded-full blur-2xl"></div>

        <div className="relative container mx-auto px-4 py-16">
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-6 py-2 mb-6">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              <span className="text-sm font-medium tracking-wide">
                Collection Premium
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold mb-6 font-[family-name:var(--font-playfair)]">
              Nos Produits Matcha
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Découvrez notre sélection premium de thés matcha japonais
              authentiques, accessoires traditionnels et créations gourmandes
              d&apos;exception.
            </p>
          </div>
        </div>
      </div>

      {/* Barre de recherche et filtres Premium */}
      <div className="container mx-auto px-4 -mt-8 relative z-10">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-premium border border-white/50 p-8 mb-12">
          <form
            onSubmit={handleSearch}
            className="flex flex-col md:flex-row gap-6 mb-6"
          >
            <div className="flex-1 relative group">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-400 h-5 w-5 group-focus-within:text-matcha-600 transition-colors" />
              <input
                type="text"
                placeholder="Rechercher des produits premium..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 h-12 border border-neutral-200 rounded-2xl bg-white/50 backdrop-blur-sm focus:border-matcha-400 focus:outline-none focus:ring-2 focus:ring-matcha-400/20 text-lg placeholder:text-neutral-400 transition-all duration-300"
              />
            </div>
            <button
              type="submit"
              className="btn-premium-primary h-12 px-8 flex items-center space-x-2"
            >
              <Search className="h-5 w-5" />
              <span>Rechercher</span>
            </button>
          </form>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Sélecteur de catégorie premium */}
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full h-12 rounded-2xl border border-neutral-200 bg-white/50 backdrop-blur-sm focus:border-matcha-400 focus:outline-none focus:ring-2 focus:ring-matcha-400/20 px-4 appearance-none cursor-pointer transition-all duration-300"
              >
                <option value="all">Toutes les catégories</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name} ({category._count.products})
                  </option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <svg
                  className="w-4 h-4 text-neutral-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>

            {/* Sélecteur de prix premium */}
            <div className="relative">
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="w-full h-12 rounded-2xl border border-neutral-200 bg-white/50 backdrop-blur-sm focus:border-matcha-400 focus:outline-none focus:ring-2 focus:ring-matcha-400/20 px-4 appearance-none cursor-pointer transition-all duration-300"
              >
                <option value="all">Tous les prix</option>
                <option value="0-25">Moins de 25€</option>
                <option value="25-50">25€ - 50€</option>
                <option value="50-100">50€ - 100€</option>
                <option value="100+">Plus de 100€</option>
              </select>
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <svg
                  className="w-4 h-4 text-neutral-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>

            {/* Sélecteur de tri premium */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full h-12 rounded-2xl border border-neutral-200 bg-white/50 backdrop-blur-sm focus:border-matcha-400 focus:outline-none focus:ring-2 focus:ring-matcha-400/20 px-4 appearance-none cursor-pointer transition-all duration-300"
              >
                <option value="newest">Plus récents</option>
                <option value="price-asc">Prix croissant</option>
                <option value="price-desc">Prix décroissant</option>
                <option value="name">Nom A-Z</option>
                <option value="popular">Populaires</option>
              </select>
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <svg
                  className="w-4 h-4 text-neutral-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Résultats Premium */}
      <div className="container mx-auto px-4">
        {error ? (
          <div className="text-center py-24">
            <div className="max-w-md mx-auto">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <div className="w-8 h-8 text-red-600">⚠</div>
              </div>
              <h3 className="text-2xl font-bold text-neutral-900 mb-4 font-[family-name:var(--font-playfair)]">
                Erreur de chargement
              </h3>
              <p className="text-red-600 mb-6">{error}</p>
              <button
                onClick={fetchProducts}
                className="btn-premium-outline border-red-300 text-red-700 hover:bg-red-50 px-6 py-3"
              >
                Réessayer
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Informations sur les résultats Premium */}
            {pagination && (
              <div className="flex flex-col sm:flex-row justify-between items-center mb-8 bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/50">
                <div className="text-neutral-700 mb-4 sm:mb-0">
                  <span className="text-2xl font-bold text-matcha-600">
                    {pagination.total}
                  </span>
                  <span className="ml-2 text-neutral-600">
                    produit{pagination.total > 1 ? "s" : ""} premium trouvé
                    {pagination.total > 1 ? "s" : ""}
                  </span>
                </div>
                <div className="text-sm text-neutral-500 bg-white/50 px-4 py-2 rounded-full">
                  Page {pagination.page} sur {pagination.pages}
                </div>
              </div>
            )}

            {/* Grille des produits Premium */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 pb-16">
              {products.map((product, index) => {
                console.log(
                  "🎨 Rendu produit:",
                  product.name,
                  "inStock:",
                  product.inStock
                );
                return (
                  <div
                    key={product.id}
                    className="group relative bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-premium hover:shadow-premium-lg transition-all duration-500 hover:-translate-y-2 border border-white/50"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {/* Badge Stock */}
                    <div className="absolute top-6 right-6 z-20">
                      <div
                        className={`text-xs font-bold px-3 py-1 rounded-full shadow-premium ${
                          product.inStock
                            ? "bg-gradient-to-r from-green-400 to-green-600 text-white"
                            : "bg-gradient-to-r from-red-400 to-red-600 text-white"
                        }`}
                      >
                        {product.inStock ? "✓ STOCK" : "✗ RUPTURE"}
                      </div>
                    </div>

                    {/* Image Container Premium */}
                    <div className="relative mb-6 overflow-hidden rounded-2xl bg-gradient-to-br from-matcha-50 to-neutral-50">
                      <div className="aspect-square">
                        <ProductImage
                          src={product.imageUrl}
                          alt={product.name}
                          width={300}
                          height={300}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                      </div>

                      {/* Overlay gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>

                    {/* Content Premium */}
                    <div className="space-y-4">
                      {/* Category Badge */}
                      <div className="inline-flex items-center bg-matcha-100 text-matcha-700 text-xs font-semibold px-3 py-1 rounded-full">
                        {product.category.name}
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-bold text-neutral-900 group-hover:text-matcha-600 transition-colors line-clamp-2 font-[family-name:var(--font-playfair)]">
                        {product.name}
                      </h3>

                      {/* Description */}
                      <p className="text-neutral-600 text-sm line-clamp-2 leading-relaxed">
                        {product.description}
                      </p>

                      {/* Price */}
                      <div className="flex items-center justify-between pt-2">
                        <div className="space-y-1">
                          <div className="text-2xl font-bold text-matcha-600">
                            {product.price}€
                          </div>
                          <div className="text-xs text-neutral-500">
                            Prix TTC
                          </div>
                        </div>
                      </div>

                      {/* Action Button Premium */}
                      <button
                        onClick={() => {
                          console.log("🔥 BOUTON CLIQUÉ POUR:", product.name);
                          handleAddToCart(product);
                        }}
                        disabled={!product.inStock}
                        className="btn-premium-primary w-full mt-6"
                      >
                        {product.inStock ? (
                          <span className="flex items-center justify-center space-x-2">
                            <span>Ajouter au Panier</span>
                            <span className="opacity-80">→</span>
                          </span>
                        ) : (
                          <span>Indisponible</span>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Pagination Premium */}
            {pagination && pagination.pages > 1 && (
              <div className="flex justify-center items-center gap-3 mt-16">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="btn-premium-outline px-6 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  ← Précédent
                </button>

                <div className="flex gap-2">
                  {[...Array(pagination.pages)].map((_, i) => {
                    const page = i + 1;
                    return (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={
                          currentPage === page
                            ? "btn-premium-primary w-12 h-12"
                            : "btn-premium-outline w-12 h-12"
                        }
                      >
                        {page}
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={() =>
                    setCurrentPage(Math.min(pagination.pages, currentPage + 1))
                  }
                  disabled={currentPage === pagination.pages}
                  className="btn-premium-outline px-6 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Suivant →
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Modal d'ajout au panier */}
      <AddToCartModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </div>
  );
}
