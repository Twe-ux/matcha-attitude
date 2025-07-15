import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function checkDatabase() {
  try {
    console.log("🔍 Vérification de la base de données...\n");

    // Vérifier les utilisateurs
    const userCount = await prisma.user.count();
    console.log(`👥 Utilisateurs: ${userCount}`);

    // Vérifier les catégories
    const categoryCount = await prisma.category.count();
    console.log(`📂 Catégories: ${categoryCount}`);

    // Vérifier les produits
    const productCount = await prisma.product.count();
    console.log(`📦 Produits: ${productCount}`);

    // Vérifier les articles du panier
    const cartItemCount = await prisma.cartItem.count();
    console.log(`🛒 Articles dans le panier: ${cartItemCount}`);

    // Vérifier les commandes
    const orderCount = await prisma.order.count();
    console.log(`📋 Commandes: ${orderCount}`);

    // Vérifier les adresses
    const addressCount = await prisma.address.count();
    console.log(`📍 Adresses: ${addressCount}`);

    console.log("\n✅ Base de données MongoDB Atlas opérationnelle !");

    // Afficher quelques produits
    console.log("\n📦 Quelques produits disponibles:");
    const products = await prisma.product.findMany({
      take: 3,
      include: {
        category: true,
      },
    });

    products.forEach((product) => {
      console.log(
        `  • ${product.name} - ${product.price}€ (${product.category.name})`
      );
    });
  } catch (error) {
    console.error("❌ Erreur lors de la vérification:", error);
  } finally {
    await prisma.$disconnect();
  }
}

checkDatabase();
