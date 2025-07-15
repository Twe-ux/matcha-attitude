# Matcha - Site E-commerce

Matcha est un site de vente en ligne moderne développé avec Next.js 15, TypeScript, et shadcn/ui. Il offre une solution complète pour la vente de produits avec gestion des utilisateurs, panier d'achat, et paiements sécurisés.

## 🚀 Fonctionnalités

### ✅ Déjà implémentées

- **Interface utilisateur moderne** avec Next.js 15 et shadcn/ui
- **Authentification sécurisée** avec NextAuth.js
- **Base de données** avec Prisma et PostgreSQL
- **Navigation responsive** avec barre de navigation
- **Validation des données** avec Zod
- **API RESTful** pour les produits, panier, et authentification

### 🚧 En cours de développement

- **Système de panier** complet
- **Intégration Stripe** pour les paiements
- **Interface d'administration** pour gérer les produits
- **Historique des commandes** pour les utilisateurs
- **Gestion des adresses** de livraison

## 🛠️ Technologies utilisées

- **Frontend:** Next.js 15, TypeScript, Tailwind CSS, shadcn/ui
- **Backend:** API Routes Next.js, NextAuth.js
- **Base de données:** Prisma ORM, PostgreSQL
- **Paiements:** Stripe (en cours)
- **Validation:** Zod
- **Icons:** Lucide React

## 📁 Structure du projet

```
src/
├── app/                 # Pages et API routes (App Router)
│   ├── api/            # API endpoints
│   ├── auth/           # Pages d'authentification
│   └── layout.tsx      # Layout principal
├── components/         # Composants réutilisables
│   ├── ui/            # Composants shadcn/ui
│   └── navbar.tsx     # Barre de navigation
├── lib/               # Utilitaires et configurations
│   ├── auth.ts        # Configuration NextAuth
│   ├── prisma.ts      # Client Prisma
│   └── validations.ts # Schémas Zod
└── types/             # Types TypeScript
```

## 🚀 Installation et développement

1. **Cloner le projet**

```bash
git clone <repository-url>
cd matcha
```

2. **Installer les dépendances**

```bash
npm install
```

3. **Configurer les variables d'environnement**

```bash
cp .env.example .env
# Modifier le fichier .env avec vos configurations
```

4. **Configurer la base de données**

```bash
npx prisma migrate dev --name init
npx prisma generate
```

5. **Démarrer le serveur de développement**

```bash
npm run dev
```

Le site sera accessible sur [http://localhost:3000](http://localhost:3000)

## 🗄️ Base de données

Le schéma de la base de données comprend :

- **Users** : Gestion des utilisateurs avec rôles (USER/ADMIN)
- **Products** : Catalogue de produits avec catégories
- **Categories** : Classification des produits
- **CartItems** : Panier d'achat par utilisateur
- **Orders** : Commandes avec statuts
- **OrderItems** : Détails des articles commandés
- **Addresses** : Adresses de livraison des utilisateurs

## 🔐 Sécurité

- Mots de passe hashés avec bcryptjs
- Authentification JWT avec NextAuth.js
- Validation des données côté serveur avec Zod
- Protection des routes API selon les rôles utilisateur

## 📝 API Endpoints

### Authentification

- `POST /api/auth/register` - Inscription
- `POST /api/auth/signin` - Connexion (NextAuth)

### Produits

- `GET /api/products` - Liste des produits (avec pagination, filtres)
- `POST /api/products` - Créer un produit (admin uniquement)

### Panier

- `GET /api/cart` - Récupérer le panier
- `POST /api/cart` - Ajouter au panier

## 🎨 Interface utilisateur

L'interface utilise un design moderne avec :

- Palette de couleurs verte (thème matcha)
- Composants responsive de shadcn/ui
- Navigation intuitive avec panier et compte utilisateur
- Design mobile-first

## 📄 Licence

Ce projet est sous licence MIT.
