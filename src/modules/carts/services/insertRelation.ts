import { db } from "@/lib/db";
import { eq } from "drizzle-orm";

// Schemas
import { products, carts, cartProducts } from "@/lib/db/schema";

export const insertRelation = async (data: any) => {
  const relation = await db.transaction(async (tx) => {
    // Does the product exist?
    const { product_id } = data;

    const existingProduct = tx.query.products.findFirst({
      where: eq(products.id, product_id),
    });

    if (!existingProduct) {
      throw new Error("Product not found");
    }

    //
    return { name: "Jeje xd" };
  });

  if (!relation) {
    throw new Error("Error adding product");
  }

  return relation;
};
