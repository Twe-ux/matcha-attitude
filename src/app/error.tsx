"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-matcha-50 via-white to-neutral-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-40 h-40 bg-red-200/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-orange-300/30 rounded-full blur-2xl animate-float-delayed"></div>
        <div className="absolute top-1/2 left-10 w-24 h-24 bg-yellow-400/20 rounded-full blur-2xl animate-float-slow"></div>
      </div>

      <div className="relative flex items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          {/* Icon Premium */}
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-red-400 to-red-600 rounded-3xl shadow-premium mb-8 animate-fade-in-down">
            <span className="text-white text-4xl">⚠️</span>
          </div>

          {/* Message */}
          <div className="mb-12 animate-fade-in-up">
            <h1 className="text-4xl md:text-5xl font-bold text-red-700 mb-4 font-[family-name:var(--font-playfair)]">
              Oups ! Une Erreur
            </h1>
            <p className="text-xl text-neutral-600 leading-relaxed mb-6">
              Il semble qu&apos;une perturbation ait troublé la sérénité de
              votre expérience matcha.
              <br />
              Nos maîtres du thé travaillent à rétablir l&apos;harmonie.
            </p>

            {error.message && (
              <div className="bg-red-50 border border-red-200 rounded-2xl p-4 mb-6">
                <p className="text-red-600 text-sm font-medium">
                  Détails techniques : {error.message}
                </p>
              </div>
            )}
          </div>

          {/* Actions */}
          <div
            className="space-y-4 animate-fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            <button
              onClick={reset}
              className="btn-premium-primary text-lg px-8 py-4 rounded-2xl"
            >
              <span className="flex items-center space-x-2">
                <span>Réessayer</span>
                <span>🔄</span>
              </span>
            </button>

            <div className="mt-6">
              <Link href="/">
                <button className="btn-premium-outline text-lg px-8 py-4 rounded-2xl">
                  <span className="flex items-center space-x-2">
                    <span>Retour à l&apos;Accueil</span>
                    <span>🏠</span>
                  </span>
                </button>
              </Link>
            </div>
          </div>

          {/* Support */}
          <div
            className="mt-16 bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/50 animate-fade-in-up"
            style={{ animationDelay: "0.4s" }}
          >
            <p className="text-sm text-neutral-600">
              <strong>Besoin d&apos;aide ?</strong> Contactez notre équipe
              support premium.
              <br />
              Nous restaurerons votre zen matcha en un instant ! 🍵
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
