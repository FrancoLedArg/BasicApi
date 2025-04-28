import { eq } from "drizzle-orm";
import { db } from "@/lib/db";

// Schema
import { products } from "@/lib/db/schema";

// Services
import { findById } from "@/modules/products/services";

export const remove = async (id: string) => {
  const deletedProduct = await db.transaction(async (tx) => {
    const existingProduct = await findById(id);

    if (!existingProduct) {
      throw new Error("Product not found");
    }

    const [deletedExistingProduct] = await tx
      .delete(products)
      .where(eq(products.id, id))
      .returning();

    if (!deletedExistingProduct) {
      throw new Error("Error deleting product");
    }

    return deletedExistingProduct;
  });

  return deletedProduct;
};
