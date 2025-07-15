"use client";

import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Crown,
  LayoutDashboard,
  LogOut,
  Menu,
  Package,
  Settings,
  Shield,
  ShoppingCart,
  Sparkles,
  Users,
  X,
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const navigation = [
  {
    name: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
    color: "from-matcha-500 to-matcha-600",
  },
  {
    name: "Produits",
    href: "/admin/products",
    icon: Package,
    color: "from-blue-500 to-blue-600",
  },
  {
    name: "Catégories",
    href: "/admin/categories",
    icon: Package,
    color: "from-purple-500 to-purple-600",
  },
  {
    name: "Commandes",
    href: "/admin/orders",
    icon: ShoppingCart,
    color: "from-orange-500 to-orange-600",
  },
  {
    name: "Utilisateurs",
    href: "/admin/users",
    icon: Users,
    color: "from-cyan-500 to-cyan-600",
  },
  {
    name: "Paramètres",
    href: "/admin/settings",
    icon: Settings,
    color: "from-gray-500 to-gray-600",
  },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();

  // Redirection si pas admin
  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Chargement...
      </div>
    );
  }

  if (!session || session.user.role !== "ADMIN") {
    router.push("/auth/signin");
    return null;
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-matcha-50 via-white to-neutral-50">
      {/* Background Premium */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-40 h-40 bg-matcha-200/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-matcha-300/15 rounded-full blur-2xl animate-float-delayed"></div>
      </div>

      {/* Sidebar mobile */}
      <div
        className={`${
          sidebarOpen ? "block" : "hidden"
        } fixed inset-0 z-40 lg:hidden`}
      >
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
        <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white/95 backdrop-blur-xl border-r border-matcha-200/30 shadow-premium-lg">
          <div className="absolute top-0 right-0 -mr-12 pt-2">
            <button
              className="ml-1 flex items-center justify-center h-10 w-10 rounded-full bg-white/20 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-matcha-500 hover:bg-white/30 transition-all"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-5 w-5 text-white" />
            </button>
          </div>
          <SidebarContent session={session} />
        </div>
      </div>

      {/* Sidebar desktop */}
      <div className="hidden lg:flex lg:flex-shrink-0">
        <div className="flex flex-col w-72">
          <SidebarContent session={session} />
        </div>
      </div>

      {/* Contenu principal */}
      <div className="flex flex-col flex-1 relative">
        <div className="relative z-10 flex-shrink-0 flex h-20 bg-white border-b border-matcha-200 shadow-premium">
          <button
            className="px-6 border-r border-matcha-200 text-matcha-600 hover:text-matcha-700 hover:bg-matcha-50 focus:outline-none focus:ring-2 focus:ring-matcha-500 lg:hidden transition-all rounded-none"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>

          <div className="flex-1 flex justify-between px-6">
            <div className="flex-1 flex items-center">
              <Link
                href="/"
                className="flex items-center text-sm text-matcha-600 hover:text-matcha-700 font-medium px-4 py-2 rounded-xl hover:bg-matcha-50 transition-all group"
              >
                <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                Retour au site
              </Link>
            </div>
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-matcha-500 to-matcha-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Shield className="h-5 w-5 text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-matcha-800">
                    {session.user.name}
                  </span>
                  <span className="text-xs text-matcha-600 font-medium">
                    Administrateur Premium
                  </span>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => signOut({ callbackUrl: "/" })}
                className="text-red-600 hover:text-red-700 hover:bg-red-50 px-4 py-2 rounded-xl transition-all"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Déconnexion
              </Button>
            </div>
          </div>
        </div>

        <main className="flex-1 p-8 relative bg-white">{children}</main>
      </div>
    </div>
  );
}

function SidebarContent({
  session,
}: {
  session: { user: { name?: string | null } };
}) {
  const router = useRouter();

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-matcha-800 via-matcha-900 to-gray-900 shadow-premium-lg">
      {/* Header Premium */}
      <div className="flex items-center h-20 flex-shrink-0 px-6 bg-gradient-to-r from-matcha-900 to-gray-900 border-b border-matcha-700/30">
        <Link href="/admin" className="flex items-center space-x-3 group">
          <div className="w-10 h-10 bg-gradient-to-r from-matcha-400 to-matcha-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
            <Crown className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-white font-bold text-xl font-[family-name:var(--font-playfair)]">
              Matcha Admin
            </h1>
            <p className="text-matcha-300 text-xs tracking-wider">PREMIUM</p>
          </div>
        </Link>
      </div>

      {/* Profil Admin Premium */}
      <div className="px-6 py-6 border-b border-matcha-700/30">
        <div className="flex items-center space-x-4 p-4 bg-matcha-700/30 rounded-2xl backdrop-blur-sm">
          <div className="w-12 h-12 bg-gradient-to-r from-matcha-400 to-matcha-500 rounded-2xl flex items-center justify-center shadow-lg">
            <Shield className="h-6 w-6 text-white" />
          </div>
          <div className="flex-1">
            <p className="text-white font-bold text-lg">
              {session?.user?.name}
            </p>
            <div className="flex items-center space-x-1 mt-1">
              <Sparkles className="h-3 w-3 text-matcha-300" />
              <span className="text-matcha-300 text-sm font-medium">
                Admin Premium
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Premium */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        <nav className="flex-1 px-4 py-6 space-y-2">
          {navigation.map((item) => {
            const isActive = router
              ? window.location.pathname === item.href
              : false;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`group flex items-center px-4 py-4 text-sm font-medium rounded-2xl transition-all duration-300 hover:scale-105 ${
                  isActive
                    ? "bg-gradient-to-r from-matcha-500 to-matcha-600 text-white shadow-premium"
                    : "text-matcha-200 hover:bg-matcha-700/50 hover:text-white"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center mr-4 transition-all ${
                    isActive
                      ? "bg-white/20 shadow-lg"
                      : `bg-gradient-to-r ${item.color} opacity-80 group-hover:opacity-100`
                  }`}
                >
                  <item.icon className="h-5 w-5 text-white" />
                </div>
                <span className="flex-1">{item.name}</span>
                {isActive && (
                  <div className="w-2 h-2 bg-white/80 rounded-full animate-pulse"></div>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Statistiques rapides */}
        <div className="px-4 py-6 border-t border-matcha-700/30">
          <div className="bg-matcha-700/30 rounded-2xl p-4 backdrop-blur-sm">
            <h3 className="text-matcha-200 text-sm font-medium mb-3 flex items-center">
              <Sparkles className="h-4 w-4 mr-2" />
              Aperçu Rapide
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between text-xs">
                <span className="text-matcha-300">Ventes aujourd&apos;hui</span>
                <span className="text-white font-medium">+12%</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-matcha-300">Nouvelles commandes</span>
                <span className="text-white font-medium">8</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-matcha-300">Satisfaction</span>
                <span className="text-green-400 font-medium">98%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
