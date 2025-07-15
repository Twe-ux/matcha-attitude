import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const addressSchema = z.object({
  street: z.string().min(1, "L'adresse est requise"),
  city: z.string().min(1, "La ville est requise"),
  postalCode: z.string().min(1, "Le code postal est requis"),
  country: z.string().min(1, "Le pays est requis"),
  isDefault: z.boolean().optional().default(false),
});

// PATCH /api/profile/addresses/[id] - Modifier une adresse
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const validatedData = addressSchema.parse(body);

    // Vérifier que l'adresse appartient à l'utilisateur
    const existingAddress = await prisma.address.findUnique({
      where: { id },
    });

    if (!existingAddress || existingAddress.userId !== session.user.id) {
      return NextResponse.json(
        { error: "Adresse introuvable" },
        { status: 404 }
      );
    }

    // Si cette adresse est définie comme par défaut,
    // retirer le statut par défaut des autres adresses
    if (validatedData.isDefault && !existingAddress.isDefault) {
      await prisma.address.updateMany({
        where: {
          userId: session.user.id,
          isDefault: true,
          NOT: { id },
        },
        data: {
          isDefault: false,
        },
      });
    }

    // Mettre à jour l'adresse
    const updatedAddress = await prisma.address.update({
      where: { id },
      data: validatedData,
    });

    return NextResponse.json({
      message: "Adresse mise à jour avec succès",
      address: updatedAddress,
    });
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'adresse:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Données invalides", details: error.issues },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}

// DELETE /api/profile/addresses/[id] - Supprimer une adresse
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
    }

    const { id } = await params;

    // Vérifier que l'adresse appartient à l'utilisateur
    const existingAddress = await prisma.address.findUnique({
      where: { id },
    });

    if (!existingAddress || existingAddress.userId !== session.user.id) {
      return NextResponse.json(
        { error: "Adresse introuvable" },
        { status: 404 }
      );
    }

    // Supprimer l'adresse
    await prisma.address.delete({
      where: { id },
    });

    return NextResponse.json({
      message: "Adresse supprimée avec succès",
    });
  } catch (error) {
    console.error("Erreur lors de la suppression de l'adresse:", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}
