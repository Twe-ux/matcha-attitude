import {
  Address,
  CartItem,
  Category,
  Order,
  OrderItem,
  OrderStatus,
  Product,
  Role,
  User,
} from "@prisma/client";

export type {
  Address,
  CartItem,
  Category,
  Order,
  OrderItem,
  OrderStatus,
  Product,
  Role,
  User,
};

export interface ProductWithCategory extends Product {
  category: Category;
}

export interface OrderWithItems extends Order {
  items: (OrderItem & {
    product: Product;
  })[];
  user: User;
  address: Address;
}

export interface CartItemWithProduct extends CartItem {
  product: Product;
}

export interface CreateProductData {
  name: string;
  description?: string;
  price: number;
  stock: number;
  categoryId: string;
  images: string[];
  featured?: boolean;
}

export interface CreateUserData {
  email: string;
  name?: string;
  password: string;
  role?: Role;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface CreateOrderData {
  userId: string;
  addressId: string;
  items: {
    productId: string;
    quantity: number;
    price: number;
  }[];
  total: number;
}
