import { prisma } from "@/lib/prisma";

async function createTestOrders() {
  try {
    // Trouver un utilisateur test
    const user = await prisma.user.findFirst({
      where: {
        email: "user@matcha.com",
      },
    });

    if (!user) {
      console.log("Utilisateur user@matcha.com non trouvé");
      return;
    }

    // Trouver une adresse de l'utilisateur
    let address = await prisma.address.findFirst({
      where: {
        userId: user.id,
      },
    });

    // Si pas d'adresse, en créer une
    if (!address) {
      address = await prisma.address.create({
        data: {
          userId: user.id,
          street: "123 Rue de la Paix",
          city: "Paris",
          postalCode: "75001",
          country: "France",
          isDefault: true,
        },
      });
    }

    // Trouver quelques produits
    const products = await prisma.product.findMany({
      take: 3,
    });

    if (products.length === 0) {
      console.log("Aucun produit trouvé");
      return;
    }

    // Créer 3 commandes de test
    for (let i = 0; i < 3; i++) {
      const order = await prisma.order.create({
        data: {
          userId: user.id,
          addressId: address.id,
          total: 150.0 + i * 50,
          status: i === 0 ? "DELIVERED" : i === 1 ? "SHIPPED" : "CONFIRMED",
          createdAt: new Date(Date.now() - i * 7 * 24 * 60 * 60 * 1000), // i semaines ago
        },
      });

      // Ajouter des articles à la commande
      for (let j = 0; j < Math.min(2 + i, products.length); j++) {
        await prisma.orderItem.create({
          data: {
            orderId: order.id,
            productId: products[j].id,
            quantity: j + 1,
            price: products[j].price,
          },
        });
      }
    }

    console.log("Commandes de test créées avec succès !");
  } catch (error) {
    console.error("Erreur lors de la création des commandes de test:", error);
  } finally {
    await prisma.$disconnect();
  }
}

createTestOrders();
