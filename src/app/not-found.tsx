import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-matcha-50 via-white to-neutral-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-40 h-40 bg-matcha-200/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-matcha-300/30 rounded-full blur-2xl animate-float-delayed"></div>
        <div className="absolute top-1/2 left-10 w-24 h-24 bg-gold-400/20 rounded-full blur-2xl animate-float-slow"></div>
      </div>

      <div className="relative flex items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          {/* Icon Premium */}
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-matcha-400 to-matcha-600 rounded-3xl shadow-premium mb-8 animate-fade-in-down">
            <span className="text-white text-4xl">🌿</span>
          </div>

          {/* 404 Number */}
          <div className="mb-8 animate-fade-in-up">
            <h1 className="text-8xl md:text-9xl font-bold bg-gradient-to-r from-matcha-600 via-matcha-500 to-matcha-700 bg-clip-text text-transparent font-[family-name:var(--font-playfair)]">
              404
            </h1>
          </div>

          {/* Message */}
          <div
            className="mb-12 animate-fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-matcha-800 mb-4 font-[family-name:var(--font-playfair)]">
              Page Introuvable
            </h2>
            <p className="text-xl text-neutral-600 leading-relaxed">
              Cette page semble s&apos;être volatilisée comme les arômes
              d&apos;un thé matcha...
              <br />
              Peut-être est-elle partie méditer dans les jardins d&apos;Uji ?
            </p>
          </div>

          {/* Actions */}
          <div
            className="space-y-4 animate-fade-in-up"
            style={{ animationDelay: "0.4s" }}
          >
            <Link href="/">
              <button className="btn-premium-primary text-lg px-8 py-4 rounded-2xl">
                <span className="flex items-center space-x-2">
                  <span>Retour à l&apos;Accueil</span>
                  <span>🏠</span>
                </span>
              </button>
            </Link>

            <div className="mt-6">
              <Link href="/products">
                <button className="btn-premium-outline text-lg px-8 py-4 rounded-2xl">
                  <span className="flex items-center space-x-2">
                    <span>Explorer nos Produits</span>
                    <span>🍃</span>
                  </span>
                </button>
              </Link>
            </div>
          </div>

          {/* Fun fact */}
          <div
            className="mt-16 bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/50 animate-fade-in-up"
            style={{ animationDelay: "0.6s" }}
          >
            <p className="text-sm text-neutral-600 italic">
              💡 <strong>Le saviez-vous ?</strong> Le thé matcha était
              traditionnellement utilisé lors des cérémonies zen pour atteindre
              un état de méditation profonde.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
