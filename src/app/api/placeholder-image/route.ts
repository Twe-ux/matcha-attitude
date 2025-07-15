import { NextResponse } from "next/server";

export async function GET() {
  // SVG placeholder pour les produits matcha
  const svg = `
    <svg width="300" height="250" viewBox="0 0 300 250" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Fond -->
      <rect width="300" height="250" fill="#F8F9FA"/>
      
      <!-- Dégradé vert matcha -->
      <defs>
        <linearGradient id="matchaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#E8F5E8;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#D1E7DD;stop-opacity:1" />
        </linearGradient>
      </defs>
      
      <!-- Cercle principal -->
      <circle cx="150" cy="100" r="40" fill="url(#matchaGradient)" stroke="#198754" stroke-width="2"/>
      
      <!-- Feuille stylisée -->
      <path d="M130 80 C140 70, 160 70, 170 80 C165 90, 155 95, 150 100 C145 95, 135 90, 130 80 Z" fill="#198754" opacity="0.7"/>
      
      <!-- Texte -->
      <text x="150" y="170" font-family="Arial, sans-serif" font-size="14" fill="#6C757D" text-anchor="middle" font-weight="500">
        Produit Matcha
      </text>
      
      <!-- Sous-texte -->
      <text x="150" y="190" font-family="Arial, sans-serif" font-size="11" fill="#ADB5BD" text-anchor="middle">
        Image non disponible
      </text>
    </svg>
  `.trim();

  return new NextResponse(svg, {
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "public, max-age=86400", // Cache 24h
    },
  });
}
