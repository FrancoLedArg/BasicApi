import { eq } from "drizzle-orm";
import { db } from "@/lib/db";

// Schema
import { categories } from "@/lib/db/schema";

export const findAll = async (limit: number, offset: number) => {
  const categories = await db.query.categories.findMany({
    limit,
    offset,
  });

  if (!categories) {
    throw new Error("Database Error");
  }

  return categories;
};

export const findById = async (id: string) => {
  const category = await db.query.categories.findFirst({
    where: eq(categories.id, id),
  });

  if (!category) {
    throw new Error("Database Error");
  }

  return category;
};

export const insert = async (data: any) => {
  const { name, description } = data;

  const [newCategory] = await db
    .insert(categories)
    .values({
      name,
      description,
    })
    .returning();

  if (!newCategory) {
    throw new Error("Database Error");
  }
};

export const update = async (id: string, data: any) => {
  const [updatedCategory] = await db
    .update(categories)
    .set(data)
    .where(eq(categories.id, id))
    .returning();

  if (!updatedCategory) {
    throw new Error("Database Error");
  }

  return updatedCategory;
};

export const remove = async (id: string) => {
  const deletedCategory = await db
    .delete(categories)
    .where(eq(categories.id, id))
    .returning();

  if (!deletedCategory) {
    throw new Error("Database Error");
  }

  return deletedCategory;
};
