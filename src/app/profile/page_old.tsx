"use client";

import AddressModal from "@/components/AddressModal";
import {
  Edit2,
  Mail,
  MapPin,
  Plus,
  Save,
  ShoppingBag,
  Trash2,
  User,
  X,
  Crown,
  Calendar,
  Package,
  Heart
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
      console.error("Erreur lors de la mise à jour:", error);
    }
  };

  const handleSaveAddress = async (addressData: Omit<Address, "id">) => {
    try {
      const url = editingAddress
        ? `/api/profile/addresses/${editingAddress.id}`
        : "/api/profile/addresses";

      const method = editingAddress ? "PATCH" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(addressData),
      });

      if (response.ok) {
        // Recharger le profil pour mettre à jour les adresses
        await fetchProfile();
        setShowAddressModal(false);
        setEditingAddress(null);
      }
    } catch (error) {
      console.error("Erreur lors de la sauvegarde de l'adresse:", error);
    }
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
        // Recharger le profil pour mettre à jour les adresses
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
            <p className="text-neutral-600">Préparation de votre espace personnel...</p>
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
              Votre espace personnel d&apos;exception pour une expérience matcha sur-mesure
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Informations personnelles Premium */}
            <div className="lg:col-span-2">
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
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setEditing(true)}
                    >
                      <Edit2 className="h-4 w-4 mr-2" />
                      Modifier
                    </Button>
                  ) : (
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setEditing(false);
                          setEditForm({
                            name: profile.name,
                            email: profile.email,
                          });
                        }}
                      >
                        <X className="h-4 w-4 mr-2" />
                        Annuler
                      </Button>
                      <Button
                        size="sm"
                        onClick={handleUpdateProfile}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <Save className="h-4 w-4 mr-2" />
                        Sauvegarder
                      </Button>
                    </div>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {editing ? (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nom complet
                      </label>
                      <Input
                        value={editForm.name}
                        onChange={(e) =>
                          setEditForm({ ...editForm, name: e.target.value })
                        }
                        placeholder="Votre nom complet"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <Input
                        type="email"
                        value={editForm.email}
                        onChange={(e) =>
                          setEditForm({ ...editForm, email: e.target.value })
                        }
                        placeholder="votre@email.com"
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-center space-x-3">
                      <User className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="font-medium text-gray-900">
                          {profile.name}
                        </p>
                        <p className="text-sm text-gray-500">Nom complet</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Mail className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="font-medium text-gray-900">
                          {profile.email}
                        </p>
                        <p className="text-sm text-gray-500">Adresse email</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-5 h-5 flex items-center justify-center">
                        <Badge
                          className={
                            profile.role === "ADMIN"
                              ? "bg-red-100 text-red-800"
                              : "bg-green-100 text-green-800"
                          }
                        >
                          {profile.role}
                        </Badge>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Rôle</p>
                      </div>
                    </div>
                    <div className="text-sm text-gray-500">
                      Membre depuis le{" "}
                      {new Date(profile.createdAt).toLocaleDateString("fr-FR", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Adresses */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center">
                    <MapPin className="h-5 w-5 mr-2" />
                    Mes Adresses
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowAddressModal(true)}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Ajouter
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {profile.addresses && profile.addresses.length > 0 ? (
                  <div className="space-y-4">
                    {profile.addresses.map((address) => (
                      <div key={address.id} className="p-4 border rounded-lg">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <p className="font-medium text-gray-900">
                                Adresse
                              </p>
                              {address.isDefault && (
                                <Badge className="bg-green-100 text-green-800">
                                  Par défaut
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-gray-600">
                              {address.street}
                              <br />
                              {address.postalCode} {address.city}
                              <br />
                              {address.country}
                            </p>
                          </div>
                          <div className="flex space-x-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                setEditingAddress(address);
                                setShowAddressModal(true);
                              }}
                            >
                              <Edit2 className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-red-600 hover:text-red-700"
                              onClick={() => handleDeleteAddress(address.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <MapPin className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-600">Aucune adresse enregistrée</p>
                    <p className="text-sm text-gray-500">
                      Ajoutez une adresse de livraison
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Statistiques */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <ShoppingBag className="h-5 w-5 mr-2" />
                  Mon Activité
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {profile._count.orders || 0}
                  </div>
                  <p className="text-sm text-gray-600">Commandes passées</p>
                </div>

                <Separator />

                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {profile._count.cartItems || 0}
                  </div>
                  <p className="text-sm text-gray-600">
                    Articles dans le panier
                  </p>
                </div>

                <Separator />

                <div className="space-y-2">
                  <Button className="w-full" variant="outline">
                    Voir mes commandes
                  </Button>
                  <Button className="w-full" variant="outline">
                    Voir mon panier
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Préférences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">
                    Notifications email
                  </span>
                  <input type="checkbox" className="rounded" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Newsletter</span>
                  <input type="checkbox" className="rounded" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">
                    Offres promotionnelles
                  </span>
                  <input type="checkbox" className="rounded" defaultChecked />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Modal d'adresse */}
      <AddressModal
        isOpen={showAddressModal}
        onClose={() => {
          setShowAddressModal(false);
          setEditingAddress(null);
        }}
        onSave={handleSaveAddress}
        address={editingAddress}
        title={editingAddress ? "Modifier l'adresse" : "Ajouter une adresse"}
      />
    </div>
  );
}
