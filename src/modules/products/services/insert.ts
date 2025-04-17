import { db } from "@/lib/db";

// Schema
import { products } from "@/lib/db/schema";

// DTO
import { CreateProductDTO } from "@/lib/validation/products";

export const insert = async (product: CreateProductDTO["body"]) => {
  const { name, description, price, stock } = product;

  const [newProduct] = await db
    .insert(products)
    .values({
      name,
      description,
      price,
      stock,
    })
    .returning();

  return newProduct;
};
