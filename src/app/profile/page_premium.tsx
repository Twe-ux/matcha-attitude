"use client";

import AddressModal from "@/components/AddressModal";
import {
  Calendar,
  Crown,
  Edit2,
  Heart,
  Mail,
  MapPin,
  Package,
  Plus,
  Save,
  Shield,
  ShoppingBag,
  Star,
  Trash2,
  User,
  X,
} from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Address {
  id: string;
  street: string;
  city: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
}

interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
  addresses: Address[];
  _count: {
    orders: number;
    cartItems: number;
  };
}

export default function ProfilePage() {
  const { data: session, status, update } = useSession();
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: "",
    email: "",
  });
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
      return;
    }

    if (session?.user) {
      fetchProfile();
    }
  }, [session, status, router]);

  const fetchProfile = async () => {
    try {
      const response = await fetch("/api/profile");
      if (response.ok) {
        const data = await response.json();
        setProfile(data.user);
        setEditForm({
          name: data.user.name,
          email: data.user.email,
        });
      }
    } catch (error) {
      console.error("Erreur lors du chargement du profil:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async () => {
    try {
      const response = await fetch("/api/profile", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editForm),
      });

      if (response.ok) {
        const data = await response.json();
        setProfile(data.user);
        setEditing(false);
        // Mettre à jour la session
        await update({
          ...session,
          user: {
            ...session?.user,
            name: data.user.name,
            email: data.user.email,
          },
        });
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour du profil:", error);
    }
  };

  const handleAddressSuccess = () => {
    fetchProfile();
    setShowAddressModal(false);
    setEditingAddress(null);
  };

  const handleEditAddress = (address: Address) => {
    setEditingAddress(address);
    setShowAddressModal(true);
  };

  const handleDeleteAddress = async (addressId: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cette adresse ?")) {
      return;
    }

    try {
      const response = await fetch(`/api/profile/addresses/${addressId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        await fetchProfile();
      }
    } catch (error) {
      console.error("Erreur lors de la suppression de l'adresse:", error);
    }
  };

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-matcha-50 via-white to-neutral-50">
        <div className="container mx-auto px-4 py-24">
          <div className="text-center">
            <div className="relative mx-auto w-24 h-24 mb-8">
              <div className="absolute inset-0 rounded-full bg-gradient-primary opacity-20 animate-ping"></div>
              <div className="relative w-24 h-24 rounded-full bg-gradient-primary flex items-center justify-center animate-pulse">
                <User className="h-10 w-10 text-white" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-matcha-700 mb-2 font-[family-name:var(--font-playfair)]">
              Chargement de votre Profil Premium
            </h3>
            <p className="text-neutral-600">
              Préparation de votre espace personnel...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-matcha-50 via-white to-neutral-50">
        <div className="container mx-auto px-4 py-24">
          <div className="text-center max-w-lg mx-auto">
            <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <X className="h-12 w-12 text-red-600" />
            </div>
            <h3 className="text-2xl font-bold text-red-700 mb-4 font-[family-name:var(--font-playfair)]">
              Erreur de Chargement
            </h3>
            <p className="text-neutral-600 mb-8">
              Impossible de charger votre profil. Veuillez réessayer.
            </p>
            <button
              onClick={fetchProfile}
              className="btn-premium-primary px-8 py-3"
            >
              Réessayer
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-matcha-50 via-white to-neutral-50 relative overflow-hidden">
      {/* Background Premium */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-40 h-40 bg-matcha-200/30 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-matcha-300/20 rounded-full blur-2xl animate-float-delayed"></div>
        <div className="absolute top-1/2 left-10 w-24 h-24 bg-matcha-100/40 rounded-full blur-2xl animate-float-slow"></div>
      </div>

      <div className="relative container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Header Premium */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-primary rounded-3xl shadow-premium mb-6 animate-fade-in-down">
              <Crown className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-5xl font-bold text-matcha-800 mb-4 font-[family-name:var(--font-playfair)]">
              Mon Profil Premium
            </h1>
            <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
              Votre espace personnel d&apos;exception pour une expérience matcha
              sur-mesure
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Informations personnelles Premium */}
            <div className="lg:col-span-2 space-y-8">
              {/* Carte Profil */}
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-premium border border-white/50 animate-fade-in-up">
                <div className="p-8">
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-primary rounded-2xl flex items-center justify-center">
                        <User className="h-6 w-6 text-white" />
                      </div>
                      <h2 className="text-2xl font-bold text-matcha-800 font-[family-name:var(--font-playfair)]">
                        Informations Personnelles
                      </h2>
                    </div>

                    {!editing ? (
                      <button
                        onClick={() => setEditing(true)}
                        className="btn-premium-outline px-4 py-2 text-sm"
                      >
                        <Edit2 className="h-4 w-4 mr-2" />
                        Modifier
                      </button>
                    ) : (
                      <div className="flex space-x-3">
                        <button
                          onClick={() => {
                            setEditing(false);
                            setEditForm({
                              name: profile.name,
                              email: profile.email,
                            });
                          }}
                          className="btn-premium-outline px-4 py-2 text-sm border-red-200 text-red-600 hover:bg-red-50"
                        >
                          <X className="h-4 w-4 mr-2" />
                          Annuler
                        </button>
                        <button
                          onClick={handleUpdateProfile}
                          className="btn-premium-primary px-4 py-2 text-sm"
                        >
                          <Save className="h-4 w-4 mr-2" />
                          Sauvegarder
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="space-y-6">
                    {editing ? (
                      <>
                        <div>
                          <label className="block text-sm font-medium text-matcha-700 mb-2">
                            Nom complet
                          </label>
                          <input
                            value={editForm.name}
                            onChange={(e) =>
                              setEditForm({ ...editForm, name: e.target.value })
                            }
                            placeholder="Votre nom complet"
                            className="w-full h-12 px-4 border border-neutral-200 rounded-2xl bg-white/50 backdrop-blur-sm focus:border-matcha-400 focus:outline-none focus:ring-2 focus:ring-matcha-400/20 transition-all duration-300"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-matcha-700 mb-2">
                            Email
                          </label>
                          <input
                            type="email"
                            value={editForm.email}
                            onChange={(e) =>
                              setEditForm({
                                ...editForm,
                                email: e.target.value,
                              })
                            }
                            placeholder="votre@email.com"
                            className="w-full h-12 px-4 border border-neutral-200 rounded-2xl bg-white/50 backdrop-blur-sm focus:border-matcha-400 focus:outline-none focus:ring-2 focus:ring-matcha-400/20 transition-all duration-300"
                          />
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex items-center space-x-4 p-4 bg-matcha-50/50 rounded-2xl">
                          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                            <User className="h-5 w-5 text-matcha-600" />
                          </div>
                          <div>
                            <p className="text-sm text-neutral-500">
                              Nom complet
                            </p>
                            <p className="text-lg font-semibold text-matcha-800">
                              {profile.name}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-4 p-4 bg-matcha-50/50 rounded-2xl">
                          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                            <Mail className="h-5 w-5 text-matcha-600" />
                          </div>
                          <div>
                            <p className="text-sm text-neutral-500">Email</p>
                            <p className="text-lg font-semibold text-matcha-800">
                              {profile.email}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-4 p-4 bg-matcha-50/50 rounded-2xl">
                          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                            <Shield className="h-5 w-5 text-matcha-600" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm text-neutral-500">Statut</p>
                            <div className="flex items-center space-x-2">
                              <span className="text-lg font-semibold text-matcha-800 capitalize">
                                {profile.role}
                              </span>
                              {profile.role === "ADMIN" && (
                                <span className="bg-gradient-primary text-white text-xs px-3 py-1 rounded-full font-medium">
                                  ✨ Admin
                                </span>
                              )}
                              {profile.role === "USER" && (
                                <span className="bg-matcha-100 text-matcha-700 text-xs px-3 py-1 rounded-full font-medium">
                                  Premium
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-4 p-4 bg-matcha-50/50 rounded-2xl">
                          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                            <Calendar className="h-5 w-5 text-matcha-600" />
                          </div>
                          <div>
                            <p className="text-sm text-neutral-500">
                              Membre depuis
                            </p>
                            <p className="text-lg font-semibold text-matcha-800">
                              {new Date(profile.createdAt).toLocaleDateString(
                                "fr-FR",
                                {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                }
                              )}
                            </p>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Section Adresses */}
              <div
                className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-premium border border-white/50 animate-fade-in-up"
                style={{ animationDelay: "0.1s" }}
              >
                <div className="p-8">
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-primary rounded-2xl flex items-center justify-center">
                        <MapPin className="h-6 w-6 text-white" />
                      </div>
                      <h2 className="text-2xl font-bold text-matcha-800 font-[family-name:var(--font-playfair)]">
                        Mes Adresses
                      </h2>
                    </div>
                    <button
                      onClick={() => setShowAddressModal(true)}
                      className="btn-premium-primary px-4 py-2 text-sm"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Ajouter une adresse
                    </button>
                  </div>

                  {profile.addresses.length === 0 ? (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 bg-matcha-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <MapPin className="h-8 w-8 text-matcha-600" />
                      </div>
                      <h3 className="text-lg font-semibold text-matcha-800 mb-2">
                        Aucune adresse enregistrée
                      </h3>
                      <p className="text-neutral-600 mb-6">
                        Ajoutez une adresse pour faciliter vos commandes
                        futures.
                      </p>
                      <button
                        onClick={() => setShowAddressModal(true)}
                        className="btn-premium-outline px-6 py-3"
                      >
                        Ajouter ma première adresse
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {profile.addresses.map((address) => (
                        <div
                          key={address.id}
                          className="p-6 bg-matcha-50/50 rounded-2xl border border-matcha-100 hover:border-matcha-200 transition-all duration-300 group"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-2">
                                <MapPin className="h-4 w-4 text-matcha-600" />
                                <span className="font-medium text-matcha-800">
                                  {address.street}
                                </span>
                                {address.isDefault && (
                                  <span className="bg-gradient-primary text-white text-xs px-2 py-1 rounded-full font-medium">
                                    Par défaut
                                  </span>
                                )}
                              </div>
                              <p className="text-neutral-600 ml-6">
                                {address.postalCode} {address.city},{" "}
                                {address.country}
                              </p>
                            </div>
                            <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <button
                                onClick={() => handleEditAddress(address)}
                                className="p-2 text-matcha-600 hover:bg-matcha-100 rounded-lg transition-colors"
                              >
                                <Edit2 className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteAddress(address.id)}
                                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Sidebar Premium */}
            <div className="space-y-8">
              {/* Statistiques Premium */}
              <div
                className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-premium border border-white/50 animate-fade-in-up"
                style={{ animationDelay: "0.2s" }}
              >
                <div className="p-8">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center">
                      <Star className="h-5 w-5 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-matcha-800 font-[family-name:var(--font-playfair)]">
                      Votre Activité
                    </h3>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-matcha-50/50 rounded-2xl">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                          <Package className="h-4 w-4 text-white" />
                        </div>
                        <span className="text-matcha-700 font-medium">
                          Commandes
                        </span>
                      </div>
                      <span className="text-2xl font-bold text-matcha-800">
                        {profile._count.orders}
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-matcha-50/50 rounded-2xl">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                          <ShoppingBag className="h-4 w-4 text-white" />
                        </div>
                        <span className="text-matcha-700 font-medium">
                          Panier actuel
                        </span>
                      </div>
                      <span className="text-2xl font-bold text-matcha-800">
                        {profile._count.cartItems}
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-matcha-50/50 rounded-2xl">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                          <Heart className="h-4 w-4 text-white" />
                        </div>
                        <span className="text-matcha-700 font-medium">
                          Statut
                        </span>
                      </div>
                      <span className="text-sm font-medium bg-gradient-primary text-white px-3 py-1 rounded-full">
                        Premium
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions rapides */}
              <div
                className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-premium border border-white/50 animate-fade-in-up"
                style={{ animationDelay: "0.3s" }}
              >
                <div className="p-8">
                  <h3 className="text-xl font-bold text-matcha-800 mb-6 font-[family-name:var(--font-playfair)]">
                    Actions Rapides
                  </h3>

                  <div className="space-y-3">
                    <button
                      onClick={() => router.push("/orders")}
                      className="w-full btn-premium-outline text-left p-4 flex items-center space-x-3 hover:scale-105 transition-transform duration-300"
                    >
                      <Package className="h-5 w-5" />
                      <span>Mes Commandes</span>
                    </button>

                    <button
                      onClick={() => router.push("/cart")}
                      className="w-full btn-premium-outline text-left p-4 flex items-center space-x-3 hover:scale-105 transition-transform duration-300"
                    >
                      <ShoppingBag className="h-5 w-5" />
                      <span>Mon Panier</span>
                    </button>

                    <button
                      onClick={() => router.push("/products")}
                      className="w-full btn-premium-primary text-left p-4 flex items-center space-x-3 hover:scale-105 transition-transform duration-300"
                    >
                      <Star className="h-5 w-5" />
                      <span>Découvrir nos Produits</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal pour les adresses */}
      {showAddressModal && (
        <AddressModal
          isOpen={showAddressModal}
          onClose={() => {
            setShowAddressModal(false);
            setEditingAddress(null);
          }}
          onSuccess={handleAddressSuccess}
          address={editingAddress}
        />
      )}
    </div>
  );
}
