import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { addToCartSchema } from "@/lib/validations";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

// GET /api/cart - Récupérer le panier de l'utilisateur
export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
    }

    // Récupérer les articles du panier avec Prisma
    const cartItems = await prisma.cartItem.findMany({
      where: {
        userId: session.user.id,
      },
      include: {
        product: {
          include: {
            category: true,
          },
        },
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    const total = cartItems.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );

    return NextResponse.json({
      items: cartItems,
      total: parseFloat(total.toFixed(2)),
      itemCount: cartItems.reduce((sum, item) => sum + item.quantity, 0),
    });
  } catch (error) {
    console.error("Erreur lors de la récupération du panier:", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}

// POST /api/cart - Ajouter un produit au panier
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
    }

    const body = await request.json();
    const validatedData = addToCartSchema.parse(body);

    // Vérifier que le produit existe
    const product = await prisma.product.findUnique({
      where: { id: validatedData.productId },
      include: { category: true },
    });

    if (!product) {
      return NextResponse.json(
        { error: "Produit introuvable" },
        { status: 404 }
      );
    }

    if (product.stock <= 0) {
      return NextResponse.json(
        { error: "Produit en rupture de stock" },
        { status: 400 }
      );
    }

    // Vérifier si le produit est déjà dans le panier
    const existingCartItem = await prisma.cartItem.findFirst({
      where: {
        userId: session.user.id,
        productId: validatedData.productId,
      },
    });

    let cartItem;

    if (existingCartItem) {
      // Mettre à jour la quantité
      cartItem = await prisma.cartItem.update({
        where: {
          id: existingCartItem.id,
        },
        data: {
          quantity: existingCartItem.quantity + validatedData.quantity,
        },
        include: {
          product: {
            include: { category: true },
          },
        },
      });
    } else {
      // Créer un nouvel article dans le panier
      cartItem = await prisma.cartItem.create({
        data: {
          userId: session.user.id,
          productId: validatedData.productId,
          quantity: validatedData.quantity,
        },
        include: {
          product: {
            include: { category: true },
          },
        },
      });
    }

    return NextResponse.json(
      {
        message: "Produit ajouté au panier",
        cartItem,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erreur lors de l'ajout au panier:", error);

    if (error instanceof Error && error.name === "ZodError") {
      return NextResponse.json({ error: "Données invalides" }, { status: 400 });
    }

    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}

// DELETE /api/cart - Vider complètement le panier
export async function DELETE() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
    }

    // Supprimer tous les articles du panier de l'utilisateur
    await prisma.cartItem.deleteMany({
      where: {
        userId: session.user.id,
      },
    });

    return NextResponse.json({
      message: "Panier vidé avec succès",
    });
  } catch (error) {
    console.error("Erreur lors du vidage du panier:", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}
