"use client";

import AddToCartModal from "@/components/AddToCartModal";
import ProductImage from "@/components/ProductImage";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  categoryId: string;
  featured: boolean;
  inStock: boolean;
  category: {
    id: string;
    name: string;
    description: string;
  };
}

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Récupérer les produits en vedette
    const fetchFeaturedProducts = async () => {
      try {
        const response = await fetch("/api/products?featured=true&limit=3");
        if (response.ok) {
          const data = await response.json();
          setFeaturedProducts(data.products);
        }
      } catch (error) {
        console.error(
          "Erreur lors du chargement des produits featured:",
          error
        );
      }
    };

    fetchFeaturedProducts();
  }, []);

  const handleAddToCart = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section Premium Enhanced */}
      <section className="relative overflow-hidden bg-gradient-to-br from-matcha-50 via-white to-neutral-50 min-h-screen flex items-center">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-gradient-to-r from-matcha-100/30 to-transparent"></div>
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 25% 25%, rgba(92, 184, 92, 0.1) 0%, transparent 50%),
                             radial-gradient(circle at 75% 75%, rgba(45, 90, 45, 0.1) 0%, transparent 50%)`,
            }}
          ></div>
        </div>

        {/* Éléments décoratifs flottants améliorés */}
        <div className="absolute top-20 left-10 w-40 h-40 bg-gradient-to-br from-matcha-300/40 to-matcha-500/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-gradient-to-br from-gold-400/30 to-gold-600/20 rounded-full blur-2xl animate-float-delayed"></div>
        <div className="absolute bottom-32 left-1/4 w-48 h-48 bg-gradient-to-br from-matcha-200/30 to-matcha-400/20 rounded-full blur-3xl animate-float-slow"></div>
        <div className="absolute top-1/2 right-10 w-24 h-24 bg-gradient-to-br from-neutral-300/40 to-matcha-300/30 rounded-full blur-2xl animate-float"></div>

        {/* Particules flottantes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-matcha-400/30 rounded-full animate-float"
              style={{
                left: `${15 + i * 15}%`,
                top: `${20 + i * 12}%`,
                animationDelay: `${i * 0.8}s`,
                animationDuration: `${4 + i}s`,
              }}
            ></div>
          ))}
        </div>

        <div className="relative container mx-auto px-4 py-24 text-center">
          <div className="max-w-5xl mx-auto">
            {/* Badge premium animé */}
            <div className="inline-flex items-center space-x-3 bg-white/90 backdrop-blur-md border border-matcha-200/50 rounded-full px-8 py-3 mb-12 shadow-premium animate-fade-in-down">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-matcha-500 rounded-full animate-pulse"></div>
                <div
                  className="w-2 h-2 bg-gold-500 rounded-full animate-pulse"
                  style={{ animationDelay: "0.2s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-matcha-600 rounded-full animate-pulse"
                  style={{ animationDelay: "0.4s" }}
                ></div>
              </div>
              <span className="text-sm font-semibold text-matcha-700 tracking-wider uppercase">
                Authentique • Premium • Artisanal
              </span>
              <div className="w-6 h-6 bg-gold-500/20 rounded-full flex items-center justify-center">
                <span className="text-gold-600 text-xs">✨</span>
              </div>
            </div>

            {/* Titre principal avec effet premium */}
            <h1 className="text-6xl md:text-8xl font-bold mb-8 font-[family-name:var(--font-playfair)] animate-fade-in-up">
              <span className="inline-block bg-gradient-to-r from-matcha-600 via-matcha-500 to-matcha-700 bg-clip-text text-transparent">
                L&apos;Art du
              </span>
              <br />
              <span className="inline-block bg-gradient-to-r from-neutral-800 via-matcha-600 to-neutral-900 bg-clip-text text-transparent relative">
                Matcha Premium
                {/* Underline décoratif */}
                <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-gold-500 to-transparent rounded-full animate-scale-in"></div>
              </span>
            </h1>

            {/* Description enrichie */}
            <div
              className="animate-fade-in-up"
              style={{ animationDelay: "0.3s" }}
            >
              <p className="text-xl md:text-2xl text-neutral-600 mb-6 max-w-4xl mx-auto leading-relaxed">
                Découvrez notre collection exclusive de thés matcha japonais
                authentiques,
              </p>
              <p className="text-lg md:text-xl text-neutral-500 mb-12 max-w-3xl mx-auto leading-relaxed">
                <span className="text-matcha-600 font-semibold">
                  cultivés dans les jardins sacrés d&apos;Uji depuis 800 ans
                </span>
                , et transformez chaque moment en une cérémonie raffinée
                d&apos;exception.
              </p>
            </div>

            {/* Boutons avec animations */}
            <div
              className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16 animate-fade-in-up"
              style={{ animationDelay: "0.6s" }}
            >
              <Link href="/products">
                <button className="btn-premium-primary text-lg px-10 py-5 rounded-2xl shadow-premium-lg hover:shadow-premium-lg hover:scale-105 transition-all duration-300 group">
                  <span className="flex items-center space-x-3">
                    <span>Explorer la Collection</span>
                    <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center group-hover:translate-x-1 transition-transform">
                      <span>→</span>
                    </div>
                  </span>
                </button>
              </Link>

              <Link href="/auth/signup">
                <button className="btn-premium-outline text-lg px-10 py-5 rounded-2xl hover:scale-105 transition-all duration-300">
                  <span className="flex items-center space-x-2">
                    <span>Créer un Compte</span>
                    <span>✨</span>
                  </span>
                </button>
              </Link>
            </div>

            {/* Indicateurs de confiance */}
            <div
              className="flex flex-wrap justify-center items-center space-x-8 text-sm text-neutral-500 animate-fade-in-up"
              style={{ animationDelay: "0.9s" }}
            >
              <div className="flex items-center space-x-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full">
                <span className="text-green-500">✓</span>
                <span>Livraison 24h</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full">
                <span className="text-green-500">✓</span>
                <span>Bio Certifié</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full">
                <span className="text-green-500">✓</span>
                <span>Paiement Sécurisé</span>
              </div>
            </div>
          </div>
        </div>

        {/* Vague décorative améliorée */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1200 120" fill="none" className="w-full h-24">
            <defs>
              <linearGradient
                id="waveGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop
                  offset="0%"
                  style={{ stopColor: "white", stopOpacity: 0.8 }}
                />
                <stop
                  offset="50%"
                  style={{ stopColor: "white", stopOpacity: 1 }}
                />
                <stop
                  offset="100%"
                  style={{ stopColor: "white", stopOpacity: 0.8 }}
                />
              </linearGradient>
            </defs>
            <path
              d="M0,60 C300,100 900,20 1200,60 L1200,120 L0,120 Z"
              fill="url(#waveGradient)"
            />
            <path
              d="M0,80 C300,120 900,40 1200,80 L1200,120 L0,120 Z"
              fill="white"
              opacity="0.5"
            />
          </svg>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-matcha-400 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-matcha-400 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Featured Products Section Premium */}
      <section className="py-24 bg-white relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-matcha-50 rounded-full px-4 py-2 mb-6">
              <div className="w-1.5 h-1.5 bg-matcha-500 rounded-full"></div>
              <span className="text-sm font-medium text-matcha-700 tracking-wider uppercase">
                Collection
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6 font-[family-name:var(--font-playfair)]">
              Produits d&apos;Exception
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
              Chaque produit de notre collection est soigneusement sélectionné
              pour vous offrir une expérience authentique et raffinée du thé
              matcha japonais.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.length > 0
              ? featuredProducts.map((product, index) => (
                  <div
                    key={product.id}
                    className="group relative bg-white rounded-3xl p-6 shadow-premium hover:shadow-premium-lg transition-all duration-500 hover:-translate-y-2 border border-neutral-100"
                    style={{ animationDelay: `${index * 150}ms` }}
                  >
                    {/* Badge Premium */}
                    <div className="absolute top-6 right-6 z-20">
                      <div className="bg-gradient-to-r from-gold-400 to-gold-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-premium animate-pulse-soft">
                        ★ PREMIUM
                      </div>
                    </div>

                    {/* Image Container */}
                    <div className="relative mb-6 overflow-hidden rounded-2xl bg-gradient-to-br from-matcha-50 to-neutral-50">
                      <div className="aspect-square">
                        <ProductImage
                          src={product.imageUrl}
                          alt={product.name}
                          width={400}
                          height={400}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                      </div>

                      {/* Overlay gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>

                    {/* Content */}
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

                      {/* Price & Stock */}
                      <div className="flex items-center justify-between pt-2">
                        <div className="space-y-1">
                          <div className="text-2xl font-bold text-matcha-600">
                            {product.price}€
                          </div>
                          <div className="text-xs text-neutral-500">
                            Prix TTC
                          </div>
                        </div>

                        <div
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            product.inStock
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {product.inStock ? "✓ En stock" : "✗ Rupture"}
                        </div>
                      </div>

                      {/* Action Button */}
                      <button
                        onClick={() => handleAddToCart(product)}
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
                ))
              : // Skeleton Loading Premium
                Array.from({ length: 3 }).map((_, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-3xl p-6 shadow-premium border border-neutral-100"
                  >
                    <div className="space-y-4">
                      <div className="aspect-square bg-gradient-to-br from-matcha-50 to-neutral-100 rounded-2xl animate-pulse"></div>
                      <div className="h-4 bg-matcha-100 rounded-full w-20 animate-pulse"></div>
                      <div className="h-6 bg-neutral-200 rounded-xl w-full animate-pulse"></div>
                      <div className="h-4 bg-neutral-100 rounded-lg w-3/4 animate-pulse"></div>
                      <div className="flex justify-between items-center pt-2">
                        <div className="h-8 bg-matcha-200 rounded-xl w-16 animate-pulse"></div>
                        <div className="h-6 bg-green-100 rounded-full w-20 animate-pulse"></div>
                      </div>
                      <div className="h-12 bg-gradient-to-r from-matcha-200 to-matcha-300 rounded-2xl w-full animate-pulse"></div>
                    </div>
                  </div>
                ))}
          </div>

          {/* CTA Section */}
          <div className="text-center mt-16">
            <Link href="/products">
              <button className="btn-premium-outline text-lg px-8 py-4">
                Voir Toute la Collection
                <span className="ml-2">→</span>
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section Premium */}
      <section className="relative py-24 bg-gradient-to-br from-matcha-50 via-white to-neutral-50 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-20 w-40 h-40 bg-matcha-200/20 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 right-20 w-32 h-32 bg-matcha-300/30 rounded-full blur-2xl animate-float-delayed"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-matcha-100/20 rounded-full blur-3xl"></div>
        </div>

        <div className="relative container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-matcha-800 mb-6 font-[family-name:var(--font-playfair)]">
              L&apos;Excellence Matcha
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
              Découvrez pourquoi nos clients font confiance à notre expertise
              pour leur expérience matcha d&apos;exception
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            {/* Feature 1 */}
            <div className="group text-center">
              <div className="relative mb-8">
                <div className="w-24 h-24 bg-gradient-to-br from-matcha-400 to-matcha-600 rounded-3xl flex items-center justify-center mx-auto shadow-premium group-hover:shadow-premium-lg transition-all duration-500 group-hover:-translate-y-2 group-hover:scale-110">
                  <span className="text-white text-3xl">🌿</span>
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-gold-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">✓</span>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-matcha-800 mb-4 font-[family-name:var(--font-playfair)]">
                Qualité Artisanale
              </h3>
              <p className="text-neutral-600 leading-relaxed text-lg">
                Chaque produit est sélectionné dans les jardins d&apos;Uji,
                berceau historique du matcha premium depuis plus de 800 ans.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group text-center">
              <div className="relative mb-8">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-blue-600 rounded-3xl flex items-center justify-center mx-auto shadow-premium group-hover:shadow-premium-lg transition-all duration-500 group-hover:-translate-y-2 group-hover:scale-110">
                  <span className="text-white text-3xl">⚡</span>
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-gold-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">✓</span>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-matcha-800 mb-4 font-[family-name:var(--font-playfair)]">
                Expédition Express
              </h3>
              <p className="text-neutral-600 leading-relaxed text-lg">
                Livraison gratuite premium dès 50€. Vos trésors matcha arrivent
                sous 24h dans un emballage éco-responsable soigné.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group text-center">
              <div className="relative mb-8">
                <div className="w-24 h-24 bg-gradient-to-br from-purple-400 to-purple-600 rounded-3xl flex items-center justify-center mx-auto shadow-premium group-hover:shadow-premium-lg transition-all duration-500 group-hover:-translate-y-2 group-hover:scale-110">
                  <span className="text-white text-3xl">🔒</span>
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-gold-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">✓</span>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-matcha-800 mb-4 font-[family-name:var(--font-playfair)]">
                Sécurité Absolue
              </h3>
              <p className="text-neutral-600 leading-relaxed text-lg">
                Paiements cryptés Stripe niveau bancaire. Satisfaction garantie
                ou remboursé sous 30 jours, sans questions.
              </p>
            </div>
          </div>

          {/* Testimonial Premium */}
          <div className="mt-20 text-center">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-12 shadow-premium border border-white/50 max-w-4xl mx-auto">
              <div className="flex justify-center mb-6">
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-gold-500 text-2xl">
                      ★
                    </span>
                  ))}
                </div>
              </div>
              <blockquote className="text-2xl text-neutral-700 font-medium italic mb-6 leading-relaxed">
                &ldquo;Une expérience gustative transcendante. Le matcha le plus
                pur que j&apos;aie jamais goûté, livré avec un service client
                exceptionnel.&rdquo;
              </blockquote>
              <div className="flex items-center justify-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-matcha-400 to-matcha-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">MC</span>
                </div>
                <div className="text-left">
                  <div className="font-semibold text-matcha-800">
                    Marie Chen
                  </div>
                  <div className="text-sm text-neutral-500">
                    Maître de thé certifiée
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Premium */}
      <footer className="relative bg-gradient-to-br from-matcha-800 via-matcha-900 to-neutral-900 text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute top-0 left-0 w-full h-full bg-repeat opacity-50"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
            }}
          ></div>
        </div>

        <div className="relative">
          {/* Footer Top */}
          <div className="container mx-auto px-4 py-20">
            <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-12">
              {/* Brand Section */}
              <div className="lg:col-span-1">
                <div className="mb-8">
                  <h3 className="text-3xl font-bold mb-4 font-[family-name:var(--font-playfair)]">
                    Matcha Premium
                  </h3>
                  <p className="text-white/80 leading-relaxed text-lg">
                    L&apos;art du matcha authentique depuis les jardins sacrés
                    d&apos;Uji. Une expérience sensorielle d&apos;exception pour
                    les connaisseurs.
                  </p>
                </div>

                {/* Social Links */}
                <div className="flex space-x-4">
                  <a
                    href="#"
                    className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center hover:bg-white/20 transition-all duration-300 hover:scale-110"
                  >
                    <span className="text-xl">📱</span>
                  </a>
                  <a
                    href="#"
                    className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center hover:bg-white/20 transition-all duration-300 hover:scale-110"
                  >
                    <span className="text-xl">📧</span>
                  </a>
                  <a
                    href="#"
                    className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center hover:bg-white/20 transition-all duration-300 hover:scale-110"
                  >
                    <span className="text-xl">🌐</span>
                  </a>
                </div>
              </div>

              {/* Products */}
              <div>
                <h4 className="text-xl font-bold mb-6 text-white">
                  Nos Produits
                </h4>
                <ul className="space-y-4">
                  <li>
                    <Link
                      href="/products"
                      className="text-white/80 hover:text-white transition-colors duration-200 hover:underline"
                    >
                      Matcha Ceremonial
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/products"
                      className="text-white/80 hover:text-white transition-colors duration-200 hover:underline"
                    >
                      Matcha Culinaire
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/products"
                      className="text-white/80 hover:text-white transition-colors duration-200 hover:underline"
                    >
                      Accessoires
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/products"
                      className="text-white/80 hover:text-white transition-colors duration-200 hover:underline"
                    >
                      Coffrets Cadeaux
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/products"
                      className="text-white/80 hover:text-white transition-colors duration-200 hover:underline"
                    >
                      Nouveautés
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Support */}
              <div>
                <h4 className="text-xl font-bold mb-6 text-white">
                  Support Client
                </h4>
                <ul className="space-y-4">
                  <li>
                    <a
                      href="#"
                      className="text-white/80 hover:text-white transition-colors duration-200 hover:underline"
                    >
                      Guide du Matcha
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-white/80 hover:text-white transition-colors duration-200 hover:underline"
                    >
                      Livraisons
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-white/80 hover:text-white transition-colors duration-200 hover:underline"
                    >
                      Retours
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-white/80 hover:text-white transition-colors duration-200 hover:underline"
                    >
                      FAQ
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-white/80 hover:text-white transition-colors duration-200 hover:underline"
                    >
                      Contact
                    </a>
                  </li>
                </ul>
              </div>

              {/* Newsletter */}
              <div>
                <h4 className="text-xl font-bold mb-6 text-white">
                  Newsletter Premium
                </h4>
                <p className="text-white/80 mb-6">
                  Recevez nos secrets matcha et offres exclusives
                </p>
                <div className="flex flex-col space-y-4">
                  <input
                    type="email"
                    placeholder="votre@email.com"
                    className="px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:border-white/40 focus:bg-white/20 transition-all duration-300"
                  />
                  <button className="btn-premium-primary py-3">
                    S&apos;abonner ✨
                  </button>
                </div>

                {/* Trust Badges */}
                <div className="mt-8 flex flex-wrap gap-4">
                  <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm text-white/80">
                    🔒 SSL Sécurisé
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm text-white/80">
                    ✅ Bio Certifié
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="border-t border-white/20">
            <div className="container mx-auto px-4 py-8">
              <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                <div className="text-white/60 text-center md:text-left">
                  © 2025 Matcha Premium. Tous droits réservés.
                  <span className="hidden md:inline"> | </span>
                  <br className="md:hidden" />
                  Crafted with 💚 in France
                </div>

                <div className="flex flex-wrap justify-center md:justify-end space-x-6 text-sm">
                  <a
                    href="#"
                    className="text-white/60 hover:text-white transition-colors duration-200"
                  >
                    Mentions Légales
                  </a>
                  <a
                    href="#"
                    className="text-white/60 hover:text-white transition-colors duration-200"
                  >
                    Confidentialité
                  </a>
                  <a
                    href="#"
                    className="text-white/60 hover:text-white transition-colors duration-200"
                  >
                    CGV
                  </a>
                  <a
                    href="#"
                    className="text-white/60 hover:text-white transition-colors duration-200"
                  >
                    Cookies
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Modal d'ajout au panier */}
      <AddToCartModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </div>
  );
}
