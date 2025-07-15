# Instructions Copilot pour le site e-commerce Matcha

<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

## Contexte du projet

Il s'agit d'un site de vente en ligne (e-commerce) développé avec :

- **Frontend** : Next.js 15 avec TypeScript, Tailwind CSS, shadcn/ui
- **Backend** : API Routes Next.js
- **Base de données** : Prisma avec PostgreSQL
- **Authentification** : NextAuth.js avec JWT et sessions sécurisées
- **Paiements** : Stripe pour les transactions en ligne
- **Sécurité** : Validation des données, protection CSRF, hashage des mots de passe

## Fonctionnalités principales

1. **Gestion des produits** : CRUD complet avec images, descriptions, prix, catégories
2. **Système de comptes** : Inscription, connexion, profils utilisateurs
3. **Panier d'achat** : Ajout/suppression de produits, calcul automatique
4. **Paiements sécurisés** : Intégration Stripe avec webhooks
5. **Historique des commandes** : Suivi des transactions pour chaque utilisateur
6. **Interface d'administration** : Gestion des produits et commandes

## Standards de développement

- Utiliser TypeScript strict avec des types appropriés
- Suivre les conventions Next.js App Router
- Implémenter la validation côté client et serveur avec Zod
- Utiliser les composants shadcn/ui pour l'interface
- Appliquer les principes de sécurité web (OWASP)
- Optimiser les performances et l'accessibilité
- Gérer les erreurs de manière appropriée
- Utiliser des variables d'environnement pour les secrets

## Architecture recommandée

- `/src/app` : Pages et API routes
- `/src/components` : Composants réutilisables
- `/src/lib` : Utilitaires et configurations
- `/src/types` : Définitions TypeScript
- `/prisma` : Schéma et migrations de base de données
