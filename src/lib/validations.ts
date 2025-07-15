import { z } from "zod";

// Auth schemas
export const registerSchema = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.string().email("Adresse email invalide"),
  password: z
    .string()
    .min(8, "Le mot de passe doit contenir au moins 8 caractères"),
});

export const loginSchema = z.object({
  email: z.string().email("Adresse email invalide"),
  password: z.string().min(1, "Le mot de passe est requis"),
});

// Product schemas
export const productSchema = z.object({
  name: z.string().min(1, "Le nom du produit est requis"),
  description: z.string().optional(),
  price: z.number().positive("Le prix doit être positif"),
  stock: z.number().int().min(0, "Le stock ne peut pas être négatif"),
  categoryId: z.string().min(1, "La catégorie est requise"),
  images: z.array(z.string().url("URL d'image invalide")),
  featured: z.boolean().optional(),
});

// Category schemas
export const categorySchema = z.object({
  name: z.string().min(1, "Le nom de la catégorie est requis"),
  description: z.string().optional(),
  image: z.string().url("URL d'image invalide").optional(),
});

// Cart schemas
export const addToCartSchema = z.object({
  productId: z.string().min(1, "ID du produit requis"),
  quantity: z.number().int().positive("La quantité doit être positive"),
});

// Order schemas
export const createOrderSchema = z.object({
  addressId: z.string().min(1, "Adresse requise"),
  items: z.array(
    z.object({
      productId: z.string().min(1, "ID du produit requis"),
      quantity: z.number().int().positive("La quantité doit être positive"),
      price: z.number().positive("Le prix doit être positif"),
    })
  ),
});

// Address schemas
export const addressSchema = z.object({
  street: z.string().min(1, "L'adresse est requise"),
  city: z.string().min(1, "La ville est requise"),
  postalCode: z.string().min(1, "Le code postal est requis"),
  country: z.string().min(1, "Le pays est requis"),
  isDefault: z.boolean().optional(),
});

export type RegisterData = z.infer<typeof registerSchema>;
export type LoginData = z.infer<typeof loginSchema>;
export type ProductData = z.infer<typeof productSchema>;
export type CategoryData = z.infer<typeof categorySchema>;
export type AddToCartData = z.infer<typeof addToCartSchema>;
export type CreateOrderData = z.infer<typeof createOrderSchema>;
export type AddressData = z.infer<typeof addressSchema>;
