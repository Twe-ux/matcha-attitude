"use client";

import { Loader2 } from "lucide-react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Email ou mot de passe incorrect");
      } else {
        // Rediriger vers la page d'accueil après connexion réussie
        router.push("/");
        router.refresh();
      }
    } catch (err) {
      console.error("Erreur de connexion:", err);
      setError("Une erreur est survenue lors de la connexion");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-matcha-50 via-white to-neutral-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-40 h-40 bg-matcha-200/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-matcha-300/30 rounded-full blur-2xl animate-float-delayed"></div>
        <div className="absolute top-1/2 left-10 w-24 h-24 bg-gold-400/20 rounded-full blur-2xl animate-float-slow"></div>
      </div>

      <div className="relative flex items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          {/* Header Premium */}
          <div className="text-center mb-8 animate-fade-in-down">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-matcha-400 to-matcha-600 rounded-3xl shadow-premium mb-6">
              <span className="text-white text-2xl">🍃</span>
            </div>
            <h2 className="text-4xl font-bold text-matcha-800 font-[family-name:var(--font-playfair)] mb-2">
              Connexion Premium
            </h2>
            <p className="text-neutral-600 text-lg">
              Accédez à votre espace matcha d&apos;exception
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
                  htmlFor="email"
                  className="block text-sm font-semibold text-matcha-700"
                >
                  Adresse Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="votre@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
                    <span>Connexion...</span>
                  </span>
                ) : (
                  <span className="flex items-center justify-center space-x-2">
                    <span>Se Connecter</span>
                    <span>→</span>
                  </span>
                )}
              </button>
            </form>

            {/* Links */}
            <div className="mt-8 space-y-4 text-center">
              <p className="text-neutral-600">
                Pas encore de compte ?{" "}
                <Link
                  href="/auth/signup"
                  className="text-matcha-600 hover:text-matcha-700 font-semibold hover:underline transition-colors"
                >
                  Créer un compte premium
                </Link>
              </p>

              <div className="flex items-center justify-center space-x-4 text-sm text-neutral-500">
                <span className="flex items-center space-x-1">
                  <span className="text-green-500">✓</span>
                  <span>Sécurisé</span>
                </span>
                <span className="flex items-center space-x-1">
                  <span className="text-green-500">✓</span>
                  <span>Rapide</span>
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
