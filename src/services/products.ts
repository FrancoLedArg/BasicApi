import { eq } from "drizzle-orm";
import { db } from "@/lib/db";

// Schema
import { products } from "@/lib/db/schema";

export const findAll = async (limit: number, offset: number) => {
  const products = await db.query.products.findMany({
    limit,
    offset,
    with: {
      categories: true,
    },
  });

  if (!products) {
    throw new Error("Database Error");
  }

  return products;
};

export const findById = async (id: string) => {
  const product = await db.query.products.findFirst({
    where: eq(products.id, id),
    with: {
      categories: true,
    },
  });

  if (!product) {
    throw new Error("Database Error");
  }

  return product;
};

export const insert = async (data: any) => {
  const { name, description, price } = data;

  const [newProduct] = await db
    .insert(products)
    .values({
      name,
      description,
      price,
    })
    .returning();

  if (!newProduct) {
    throw new Error("Database Error");
  }
};

export const update = async (id: string, data: any) => {
  const [updatedProduct] = await db
    .update(products)
    .set(data)
    .where(eq(products.id, id))
    .returning();

  if (!updatedProduct) {
    throw new Error("Database Error");
  }

  return updatedProduct;
};

export const remove = async (id: string) => {
  const deletedProduct = await db
    .delete(products)
    .where(eq(products.id, id))
    .returning();

  if (!deletedProduct) {
    throw new Error("Database Error");
  }

  return deletedProduct;
};
