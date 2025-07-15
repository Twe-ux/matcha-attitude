"use client";

import { useCart } from "@/contexts/CartContext";
import {
  ChevronDown,
  Leaf,
  LogOut,
  Menu,
  Package,
  Search,
  Settings,
  Shield,
  ShoppingBag,
  ShoppingCart,
  User,
  Users,
  X,
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function NavbarPremium() {
  const { data: session } = useSession();
  const { itemsCount } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Fermer le menu utilisateur quand on clique ailleurs
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setIsUserMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSignOut = () => {
    signOut({ callbackUrl: "/" });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass backdrop-blur-xl border-0 border-b border-white/20">
      <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/90 to-matcha-50/95"></div>

      <nav className="relative container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo Premium */}
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="relative">
            <div className="w-10 h-10 bg-gradient-primary rounded-xl shadow-premium flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Leaf className="w-6 h-6 text-white" />
            </div>
            <div className="absolute -inset-1 bg-gradient-primary rounded-xl opacity-20 group-hover:opacity-40 transition-opacity blur-md"></div>
          </div>
          <div className="hidden sm:block">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-matcha-600 to-matcha-800 bg-clip-text text-transparent font-[family-name:var(--font-playfair)]">
              Matcha
            </h1>
            <p className="text-xs text-neutral-500 -mt-1 tracking-wider">
              PREMIUM
            </p>
          </div>
        </Link>

        {/* Navigation Desktop */}
        <div className="hidden md:flex items-center space-x-8">
          <Link href="/" className="nav-link group relative">
            <span className="relative z-10 text-neutral-700 group-hover:text-matcha-600 transition-colors font-medium">
              Accueil
            </span>
            <div className="absolute inset-x-0 -bottom-1 h-0.5 bg-gradient-to-r from-matcha-400 to-matcha-600 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
          </Link>

          <Link href="/products" className="nav-link group relative">
            <span className="relative z-10 text-neutral-700 group-hover:text-matcha-600 transition-colors font-medium">
              Produits
            </span>
            <div className="absolute inset-x-0 -bottom-1 h-0.5 bg-gradient-to-r from-matcha-400 to-matcha-600 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
          </Link>

          <Link href="/about" className="nav-link group relative">
            <span className="relative z-10 text-neutral-700 group-hover:text-matcha-600 transition-colors font-medium">
              À propos
            </span>
            <div className="absolute inset-x-0 -bottom-1 h-0.5 bg-gradient-to-r from-matcha-400 to-matcha-600 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
          </Link>
        </div>

        {/* Actions Premium */}
        <div className="flex items-center space-x-3">
          {/* Recherche */}
          <button className="hidden sm:flex w-9 h-9 hover:bg-matcha-50 hover:text-matcha-600 transition-colors rounded-xl items-center justify-center">
            <Search className="w-5 h-5" />
          </button>

          {/* Panier Premium */}
          <Link href="/cart">
            <button className="relative w-9 h-9 hover:bg-matcha-50 hover:text-matcha-600 transition-colors rounded-xl group flex items-center justify-center">
              <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform" />
              {itemsCount > 0 && (
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-matcha-500 to-matcha-600 text-white text-xs font-bold rounded-full flex items-center justify-center shadow-premium animate-pulse-soft">
                  {itemsCount}
                </div>
              )}
            </button>
          </Link>

          {/* Menu Utilisateur Premium */}
          {session ? (
            <div className="hidden sm:block relative" ref={userMenuRef}>
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className={`flex items-center space-x-2 w-auto h-9 px-3 transition-all duration-300 rounded-xl group ${
                  session.user?.role === "ADMIN"
                    ? "bg-gradient-to-r from-matcha-500/10 to-matcha-600/10 hover:from-matcha-500/20 hover:to-matcha-600/20 border border-matcha-300/30"
                    : "hover:bg-matcha-50 hover:text-matcha-600"
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-lg flex items-center justify-center ${
                    session.user?.role === "ADMIN"
                      ? "bg-gradient-to-r from-matcha-500 to-matcha-600 shadow-lg"
                      : "bg-gradient-primary"
                  }`}
                >
                  {session.user?.role === "ADMIN" ? (
                    <Shield className="w-4 h-4 text-white" />
                  ) : (
                    <User className="w-4 h-4 text-white" />
                  )}
                </div>
                <div className="flex flex-col items-start">
                  <span
                    className={`text-sm font-medium transition-colors ${
                      session.user?.role === "ADMIN"
                        ? "text-matcha-700 group-hover:text-matcha-800"
                        : "text-neutral-700 group-hover:text-matcha-600"
                    }`}
                  >
                    {session.user?.name?.split(" ")[0]}
                  </span>
                  {session.user?.role === "ADMIN" && (
                    <span className="text-xs text-matcha-500 font-medium">
                      Admin
                    </span>
                  )}
                </div>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    isUserMenuOpen ? "rotate-180" : ""
                  } ${
                    session.user?.role === "ADMIN"
                      ? "text-matcha-600"
                      : "text-neutral-500"
                  }`}
                />
              </button>

              {/* Menu déroulant Premium */}
              {isUserMenuOpen && (
                <div
                  className={`absolute right-0 mt-2 w-72 backdrop-blur-xl rounded-3xl shadow-premium-lg border py-3 animate-fade-in-down ${
                    session.user?.role === "ADMIN"
                      ? "bg-white border-matcha-200"
                      : "bg-white border-gray-200"
                  }`}
                >
                  {/* Info utilisateur */}
                  <div
                    className={`px-5 py-4 border-b ${
                      session.user?.role === "ADMIN"
                        ? "border-matcha-200"
                        : "border-gray-200"
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <div
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg ${
                          session.user?.role === "ADMIN"
                            ? "bg-gradient-to-r from-matcha-500 to-matcha-600"
                            : "bg-gradient-primary"
                        }`}
                      >
                        {session.user?.role === "ADMIN" ? (
                          <Shield className="w-6 h-6 text-white" />
                        ) : (
                          <User className="w-6 h-6 text-white" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-matcha-800 text-lg">
                          {session.user?.name}
                        </p>
                        <p className="text-sm text-neutral-600">
                          {session.user?.email}
                        </p>
                        {session.user?.role === "ADMIN" && (
                          <div className="flex items-center space-x-1 mt-2">
                            <span className="inline-flex items-center space-x-1 bg-gradient-to-r from-matcha-500 to-matcha-600 text-white text-xs px-3 py-1 rounded-full shadow-lg">
                              <Shield className="w-3 h-3" />
                              <span className="font-medium">
                                Administrateur Premium
                              </span>
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Menu items */}
                  <div className="py-3">
                    {session.user?.role === "ADMIN" && (
                      <>
                        <div className="px-5 mb-3">
                          <div className="flex items-center space-x-2 mb-2">
                            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-matcha-300/50 to-transparent"></div>
                            <span className="text-xs font-medium text-matcha-600 uppercase tracking-wider">
                              Administration
                            </span>
                            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-matcha-300/50 to-transparent"></div>
                          </div>
                        </div>

                        {/* Dashboard Admin Premium - Ultra mis en évidence */}
                        <div className="px-3 mb-4">
                          <Link
                            href="/admin"
                            className="flex items-center space-x-4 px-5 py-4 bg-gradient-to-r from-matcha-500 to-matcha-600 text-white hover:from-matcha-600 hover:to-matcha-700 rounded-2xl transition-all duration-300 shadow-premium hover:shadow-premium-lg transform hover:scale-105 group"
                            onClick={() => setIsUserMenuOpen(false)}
                          >
                            <div className="w-8 h-8 bg-white/20 rounded-xl flex items-center justify-center group-hover:bg-white/30 transition-colors">
                              <Shield className="w-5 h-5" />
                            </div>
                            <div className="flex-1">
                              <div className="font-bold text-lg">
                                Dashboard Admin
                              </div>
                              <div className="text-xs text-white/90">
                                Centre de contrôle premium
                              </div>
                            </div>
                            <div className="w-2 h-2 bg-white/60 rounded-full animate-pulse"></div>
                          </Link>
                        </div>

                        {/* Liens administrateur premium */}
                        <div className="space-y-1 px-3">
                          <Link
                            href="/admin/products"
                            className="flex items-center space-x-3 px-4 py-3 text-matcha-700 hover:bg-matcha-100/80 hover:text-matcha-800 transition-all duration-200 rounded-xl group"
                            onClick={() => setIsUserMenuOpen(false)}
                          >
                            <div className="w-6 h-6 bg-matcha-100 rounded-lg flex items-center justify-center group-hover:bg-matcha-200 transition-colors">
                              <Package className="w-4 h-4 text-matcha-600" />
                            </div>
                            <span className="font-medium">
                              Gestion Produits
                            </span>
                          </Link>

                          <Link
                            href="/admin/orders"
                            className="flex items-center space-x-3 px-4 py-3 text-matcha-700 hover:bg-matcha-100/80 hover:text-matcha-800 transition-all duration-200 rounded-xl group"
                            onClick={() => setIsUserMenuOpen(false)}
                          >
                            <div className="w-6 h-6 bg-matcha-100 rounded-lg flex items-center justify-center group-hover:bg-matcha-200 transition-colors">
                              <ShoppingCart className="w-4 h-4 text-matcha-600" />
                            </div>
                            <span className="font-medium">Commandes</span>
                          </Link>

                          <Link
                            href="/admin/users"
                            className="flex items-center space-x-3 px-4 py-3 text-matcha-700 hover:bg-matcha-100/80 hover:text-matcha-800 transition-all duration-200 rounded-xl group"
                            onClick={() => setIsUserMenuOpen(false)}
                          >
                            <div className="w-6 h-6 bg-matcha-100 rounded-lg flex items-center justify-center group-hover:bg-matcha-200 transition-colors">
                              <Users className="w-4 h-4 text-matcha-600" />
                            </div>
                            <span className="font-medium">Utilisateurs</span>
                          </Link>

                          <Link
                            href="/admin/settings"
                            className="flex items-center space-x-3 px-4 py-3 text-matcha-700 hover:bg-matcha-100/80 hover:text-matcha-800 transition-all duration-200 rounded-xl group"
                            onClick={() => setIsUserMenuOpen(false)}
                          >
                            <div className="w-6 h-6 bg-matcha-100 rounded-lg flex items-center justify-center group-hover:bg-matcha-200 transition-colors">
                              <Settings className="w-4 h-4 text-matcha-600" />
                            </div>
                            <span className="font-medium">Paramètres</span>
                          </Link>
                        </div>

                        <div className="px-5 my-4">
                          <div className="flex items-center space-x-2">
                            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-neutral-200 to-transparent"></div>
                            <span className="text-xs font-medium text-neutral-500 uppercase tracking-wider">
                              Mon Compte
                            </span>
                            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-neutral-200 to-transparent"></div>
                          </div>
                        </div>
                      </>
                    )}

                    <div className="space-y-1 px-3">
                      <Link
                        href="/profile"
                        className="flex items-center space-x-3 px-4 py-3 text-neutral-700 hover:bg-neutral-100 hover:text-neutral-800 transition-all duration-200 rounded-xl"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <User className="w-4 h-4" />
                        <span className="font-medium">Mon Profil</span>
                      </Link>

                      <Link
                        href="/orders"
                        className="flex items-center space-x-3 px-4 py-3 text-neutral-700 hover:bg-neutral-100 hover:text-neutral-800 transition-all duration-200 rounded-xl"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <Package className="w-4 h-4" />
                        <span className="font-medium">Mes Commandes</span>
                      </Link>
                    </div>

                    <div className="px-5 my-4">
                      <div className="h-px bg-neutral-200"></div>
                    </div>

                    <div className="px-3">
                      <button
                        onClick={handleSignOut}
                        className="flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 hover:text-red-700 transition-all duration-200 rounded-xl w-full text-left group"
                      >
                        <LogOut className="w-4 h-4" />
                        <span className="font-medium">Déconnexion</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="hidden sm:flex items-center space-x-2">
              <Link href="/auth/signin">
                <button className="text-neutral-600 hover:text-matcha-600 font-medium px-4 py-2 rounded-xl hover:bg-matcha-50 transition-colors">
                  Connexion
                </button>
              </Link>
              <Link href="/auth/signup">
                <button className="btn-premium-primary px-4 py-2 text-sm">
                  Inscription
                </button>
              </Link>
            </div>
          )}

          {/* Menu Mobile */}
          <button
            className="md:hidden w-9 h-9 hover:bg-matcha-50 hover:text-matcha-600 transition-colors rounded-xl flex items-center justify-center"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </nav>

      {/* Menu Mobile Premium */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 glass-dark bg-white/95 backdrop-blur-xl border-t border-white/20 shadow-premium-lg">
          <div className="container mx-auto px-4 py-6 space-y-4">
            <Link
              href="/"
              className="block py-3 px-4 text-neutral-700 hover:text-matcha-600 hover:bg-matcha-50 rounded-xl transition-colors font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Accueil
            </Link>
            <Link
              href="/products"
              className="block py-3 px-4 text-neutral-700 hover:text-matcha-600 hover:bg-matcha-50 rounded-xl transition-colors font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Produits
            </Link>
            <Link
              href="/about"
              className="block py-3 px-4 text-neutral-700 hover:text-matcha-600 hover:bg-matcha-50 rounded-xl transition-colors font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              À propos
            </Link>

            <hr className="border-neutral-200" />

            {session ? (
              <div className="space-y-3">
                {/* Info utilisateur mobile */}
                <div
                  className={`flex items-center space-x-4 px-5 py-4 rounded-2xl ${
                    session.user?.role === "ADMIN"
                      ? "bg-gradient-to-r from-matcha-50/80 via-matcha-100/50 to-matcha-50/80 border border-matcha-200/40"
                      : "bg-matcha-50/50"
                  }`}
                >
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg ${
                      session.user?.role === "ADMIN"
                        ? "bg-gradient-to-r from-matcha-500 to-matcha-600"
                        : "bg-gradient-primary"
                    }`}
                  >
                    {session.user?.role === "ADMIN" ? (
                      <Shield className="w-6 h-6 text-white" />
                    ) : (
                      <User className="w-6 h-6 text-white" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-matcha-800 text-lg">
                      {session.user?.name}
                    </p>
                    <p className="text-sm text-neutral-600">
                      {session.user?.email}
                    </p>
                    {session.user?.role === "ADMIN" && (
                      <div className="flex items-center space-x-1 mt-2">
                        <span className="inline-flex items-center space-x-1 bg-gradient-to-r from-matcha-500 to-matcha-600 text-white text-xs px-3 py-1 rounded-full shadow-lg">
                          <Shield className="w-3 h-3" />
                          <span className="font-medium">Admin Premium</span>
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <Link
                  href="/profile"
                  className="flex items-center space-x-3 py-3 px-4 text-neutral-700 hover:text-matcha-600 hover:bg-matcha-50 rounded-xl transition-colors font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <User className="w-5 h-5" />
                  <span>Mon profil</span>
                </Link>

                <Link
                  href="/orders"
                  className="flex items-center space-x-3 py-3 px-4 text-neutral-700 hover:text-matcha-600 hover:bg-matcha-50 rounded-xl transition-colors font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Package className="w-5 h-5" />
                  <span>Mes commandes</span>
                </Link>

                {session.user?.role === "ADMIN" && (
                  <>
                    <div className="my-6">
                      <div className="flex items-center space-x-2 mb-4">
                        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-matcha-300/50 to-transparent"></div>
                        <span className="text-sm font-bold text-matcha-600 uppercase tracking-wider">
                          Administration Premium
                        </span>
                        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-matcha-300/50 to-transparent"></div>
                      </div>
                    </div>

                    {/* Dashboard Admin Mobile Ultra Premium */}
                    <div className="mb-6">
                      <Link
                        href="/admin"
                        className="flex items-center space-x-4 mx-2 px-5 py-5 bg-gradient-to-r from-matcha-500 to-matcha-600 text-white hover:from-matcha-600 hover:to-matcha-700 rounded-3xl transition-all duration-300 shadow-premium hover:shadow-premium-lg transform hover:scale-105 group"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center group-hover:bg-white/30 transition-colors shadow-lg">
                          <Shield className="w-7 h-7" />
                        </div>
                        <div className="flex-1">
                          <div className="font-bold text-xl">
                            Dashboard Admin
                          </div>
                          <div className="text-sm text-white/90">
                            Centre de contrôle premium
                          </div>
                        </div>
                        <div className="w-3 h-3 bg-white/60 rounded-full animate-pulse"></div>
                      </Link>
                    </div>

                    {/* Accès rapides admin premium */}
                    <div className="grid grid-cols-2 gap-3 mb-6">
                      <Link
                        href="/admin/products"
                        className="flex flex-col items-center space-y-2 py-4 px-3 bg-matcha-100/80 hover:bg-matcha-200/80 text-matcha-700 hover:text-matcha-800 rounded-2xl transition-all duration-200 group"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <div className="w-10 h-10 bg-matcha-200 rounded-xl flex items-center justify-center group-hover:bg-matcha-300 transition-colors">
                          <Package className="w-5 h-5 text-matcha-600" />
                        </div>
                        <span className="text-sm font-medium text-center">
                          Produits
                        </span>
                      </Link>

                      <Link
                        href="/admin/orders"
                        className="flex flex-col items-center space-y-2 py-4 px-3 bg-matcha-100/80 hover:bg-matcha-200/80 text-matcha-700 hover:text-matcha-800 rounded-2xl transition-all duration-200 group"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <div className="w-10 h-10 bg-matcha-200 rounded-xl flex items-center justify-center group-hover:bg-matcha-300 transition-colors">
                          <ShoppingCart className="w-5 h-5 text-matcha-600" />
                        </div>
                        <span className="text-sm font-medium text-center">
                          Commandes
                        </span>
                      </Link>

                      <Link
                        href="/admin/users"
                        className="flex flex-col items-center space-y-2 py-4 px-3 bg-matcha-100/80 hover:bg-matcha-200/80 text-matcha-700 hover:text-matcha-800 rounded-2xl transition-all duration-200 group"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <div className="w-10 h-10 bg-matcha-200 rounded-xl flex items-center justify-center group-hover:bg-matcha-300 transition-colors">
                          <Users className="w-5 h-5 text-matcha-600" />
                        </div>
                        <span className="text-sm font-medium text-center">
                          Utilisateurs
                        </span>
                      </Link>

                      <Link
                        href="/admin/settings"
                        className="flex flex-col items-center space-y-2 py-4 px-3 bg-matcha-100/80 hover:bg-matcha-200/80 text-matcha-700 hover:text-matcha-800 rounded-2xl transition-all duration-200 group"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <div className="w-10 h-10 bg-matcha-200 rounded-xl flex items-center justify-center group-hover:bg-matcha-300 transition-colors">
                          <Settings className="w-5 h-5 text-matcha-600" />
                        </div>
                        <span className="text-sm font-medium text-center">
                          Paramètres
                        </span>
                      </Link>
                    </div>

                    <div className="my-6">
                      <div className="flex items-center space-x-2">
                        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-neutral-200 to-transparent"></div>
                        <span className="text-sm font-medium text-neutral-500 uppercase tracking-wider">
                          Mon Compte
                        </span>
                        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-neutral-200 to-transparent"></div>
                      </div>
                    </div>
                  </>
                )}

                <hr className="border-neutral-200" />
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    handleSignOut();
                  }}
                  className="flex items-center space-x-3 py-3 px-4 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-xl transition-colors font-medium w-full text-left"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Déconnexion</span>
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <Link
                  href="/auth/signin"
                  className="block py-3 px-4 text-neutral-700 hover:text-matcha-600 hover:bg-matcha-50 rounded-xl transition-colors font-medium text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Connexion
                </Link>
                <Link
                  href="/auth/signup"
                  className="block py-3 px-4 bg-gradient-primary text-white font-medium rounded-xl text-center shadow-premium hover:shadow-premium-lg transform hover:scale-105 transition-all duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Inscription
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
