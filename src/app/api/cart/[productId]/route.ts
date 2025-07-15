import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// Schema de validation pour la quantité
const updateQuantitySchema = z.object({
  quantity: z.number().int().min(0).max(99),
});

// GET /api/cart/[productId] - Récupérer un item spécifique du panier
export async function GET(
  request: NextRequest,
  { params }: { params: { productId: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
    }

    const productId = params.productId;

    if (!productId) {
      return NextResponse.json(
        { error: "ID du produit requis" },
        { status: 400 }
      );
    }

    // Vérifier si le produit existe
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      return NextResponse.json(
        { error: "Produit non trouvé" },
        { status: 404 }
      );
    }

    // Récupérer l'item du panier
    const cartItem = await prisma.cartItem.findFirst({
      where: {
        userId: session.user.id,
        productId: productId,
      },
      include: {
        product: {
          select: {
            id: true,
            name: true,
            price: true,
            images: true,
            stock: true,
          },
        },
      },
    });

    if (!cartItem) {
      return NextResponse.json(
        { error: "Produit non trouvé dans le panier" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      cartItem,
    });
  } catch (error) {
    console.error("Erreur lors de la récupération de l'item du panier:", error);
    return NextResponse.json(
      { error: "Erreur serveur interne" },
      { status: 500 }
    );
  }
}

// PATCH /api/cart/[productId] - Mettre à jour la quantité d'un produit dans le panier
export async function PATCH(
  request: NextRequest,
  { params }: { params: { productId: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
    }

    const productId = params.productId;

    if (!productId) {
      return NextResponse.json(
        { error: "ID du produit requis" },
        { status: 400 }
      );
    }

    const body = await request.json();
    const validatedData = updateQuantitySchema.parse(body);

    // Vérifier si le produit existe et a assez de stock
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      return NextResponse.json(
        { error: "Produit non trouvé" },
        { status: 404 }
      );
    }

    if (validatedData.quantity > product.stock) {
      return NextResponse.json(
        { error: `Stock insuffisant. Stock disponible: ${product.stock}` },
        { status: 400 }
      );
    }

    // Si quantité = 0, supprimer l'item
    if (validatedData.quantity === 0) {
      await prisma.cartItem.deleteMany({
        where: {
          userId: session.user.id,
          productId: productId,
        },
      });

      return NextResponse.json({
        success: true,
        message: "Produit retiré du panier",
      });
    }

    // Mettre à jour ou créer l'item du panier
    const existingCartItem = await prisma.cartItem.findFirst({
      where: {
        userId: session.user.id,
        productId: productId,
      },
    });

    let cartItem;
    if (existingCartItem) {
      // Mettre à jour l'item existant
      cartItem = await prisma.cartItem.update({
        where: { id: existingCartItem.id },
        data: { quantity: validatedData.quantity },
        include: {
          product: {
            select: {
              id: true,
              name: true,
              price: true,
              images: true,
              stock: true,
            },
          },
        },
      });
    } else {
      // Créer un nouvel item
      cartItem = await prisma.cartItem.create({
        data: {
          userId: session.user.id,
          productId: productId,
          quantity: validatedData.quantity,
        },
        include: {
          product: {
            select: {
              id: true,
              name: true,
              price: true,
              images: true,
              stock: true,
            },
          },
        },
      });
    }

    return NextResponse.json({
      success: true,
      cartItem,
      message: "Quantité mise à jour avec succès",
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Données invalides", details: error.issues },
        { status: 400 }
      );
    }

    console.error("Erreur lors de la mise à jour du panier:", error);
    return NextResponse.json(
      { error: "Erreur serveur interne" },
      { status: 500 }
    );
  }
}

// DELETE /api/cart/[productId] - Supprimer un produit du panier
export async function DELETE(
  request: NextRequest,
  { params }: { params: { productId: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
    }

    const productId = params.productId;

    if (!productId) {
      return NextResponse.json(
        { error: "ID du produit requis" },
        { status: 400 }
      );
    }

    // Vérifier si l'item existe dans le panier
    const existingItem = await prisma.cartItem.findFirst({
      where: {
        userId: session.user.id,
        productId: productId,
      },
    });

    if (!existingItem) {
      return NextResponse.json(
        { error: "Produit non trouvé dans le panier" },
        { status: 404 }
      );
    }

    // Supprimer l'item du panier
    await prisma.cartItem.deleteMany({
      where: {
        userId: session.user.id,
        productId: productId,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Produit supprimé du panier avec succès",
    });
  } catch (error) {
    console.error("Erreur lors de la suppression du produit du panier:", error);
    return NextResponse.json(
      { error: "Erreur serveur interne" },
      { status: 500 }
    );
  }
}
