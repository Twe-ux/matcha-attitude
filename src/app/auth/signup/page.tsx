"use client";

import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Validation côté client
    if (formData.password !== formData.confirmPassword) {
      setError("Les mots de passe ne correspondent pas");
      setLoading(false);
      return;
    }

    if (formData.password.length < 8) {
      setError("Le mot de passe doit contenir au moins 8 caractères");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Une erreur est survenue");
      } else {
        // Rediriger vers la page de connexion avec un message de succès
        router.push("/auth/signin?message=Compte créé avec succès");
      }
    } catch (err) {
      console.error("Erreur d'inscription:", err);
      setError("Une erreur est survenue lors de l'inscription");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-matcha-50 via-white to-neutral-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 right-10 w-32 h-32 bg-matcha-300/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-40 left-20 w-40 h-40 bg-gold-400/20 rounded-full blur-3xl animate-float-delayed"></div>
        <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-matcha-200/30 rounded-full blur-2xl animate-float-slow"></div>
      </div>

      <div className="relative flex items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          {/* Header Premium */}
          <div className="text-center mb-8 animate-fade-in-down">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-matcha-400 to-matcha-600 rounded-3xl shadow-premium mb-6">
              <span className="text-white text-2xl">✨</span>
            </div>
            <h2 className="text-4xl font-bold text-matcha-800 font-[family-name:var(--font-playfair)] mb-2">
              Rejoignez-nous
            </h2>
            <p className="text-neutral-600 text-lg">
              Créez votre compte premium matcha
            </p>
          </div>

          {/* Form Card Premium */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-premium border border-white/50 animate-fade-in-up">
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-2xl p-4 animate-scale-in">
                  <p className="text-red-600 text-sm font-medium">{error}</p>
                </div>
              )}

              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="block text-sm font-semibold text-matcha-700"
                >
                  Nom Complet
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Votre nom"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  className="w-full px-4 py-3 bg-white/50 border border-neutral-200 rounded-2xl focus:outline-none focus:border-matcha-400 focus:ring-4 focus:ring-matcha-400/20 transition-all duration-300 disabled:opacity-50"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-matcha-700"
                >
                  Adresse Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="votre@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  className="w-full px-4 py-3 bg-white/50 border border-neutral-200 rounded-2xl focus:outline-none focus:border-matcha-400 focus:ring-4 focus:ring-matcha-400/20 transition-all duration-300 disabled:opacity-50"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="block text-sm font-semibold text-matcha-700"
                >
                  Mot de Passe
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  minLength={8}
                  className="w-full px-4 py-3 bg-white/50 border border-neutral-200 rounded-2xl focus:outline-none focus:border-matcha-400 focus:ring-4 focus:ring-matcha-400/20 transition-all duration-300 disabled:opacity-50"
                />
                <p className="text-xs text-neutral-500 flex items-center space-x-1">
                  <span className="text-matcha-500">ℹ</span>
                  <span>Au moins 8 caractères requis</span>
                </p>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-semibold text-matcha-700"
                >
                  Confirmer le Mot de Passe
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  className="w-full px-4 py-3 bg-white/50 border border-neutral-200 rounded-2xl focus:outline-none focus:border-matcha-400 focus:ring-4 focus:ring-matcha-400/20 transition-all duration-300 disabled:opacity-50"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-premium-primary w-full py-4 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center justify-center space-x-2">
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>Création...</span>
                  </span>
                ) : (
                  <span className="flex items-center justify-center space-x-2">
                    <span>Créer mon Compte Premium</span>
                    <span>✨</span>
                  </span>
                )}
              </button>
            </form>

            {/* Links */}
            <div className="mt-8 space-y-4 text-center">
              <p className="text-neutral-600">
                Déjà membre ?{" "}
                <Link
                  href="/auth/signin"
                  className="text-matcha-600 hover:text-matcha-700 font-semibold hover:underline transition-colors"
                >
                  Se connecter
                </Link>
              </p>

              <div className="flex items-center justify-center space-x-4 text-sm text-neutral-500">
                <span className="flex items-center space-x-1">
                  <span className="text-green-500">✓</span>
                  <span>Gratuit</span>
                </span>
                <span className="flex items-center space-x-1">
                  <span className="text-green-500">✓</span>
                  <span>Instantané</span>
                </span>
                <span className="flex items-center space-x-1">
                  <span className="text-green-500">✓</span>
                  <span>Premium</span>
                </span>
              </div>
            </div>
          </div>

          {/* Back to Home */}
          <div
            className="text-center mt-8 animate-fade-in-up"
            style={{ animationDelay: "0.3s" }}
          >
            <Link
              href="/"
              className="text-neutral-500 hover:text-matcha-600 transition-colors text-sm"
            >
              ← Retour à l&apos;accueil
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
