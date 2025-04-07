import { eq } from "drizzle-orm";
import { db } from "@/lib/db";

// Schema
import { categories } from "@/lib/db/schema";

// Validation Types
import {
  GetCategoryDTO,
  CreateCategoryDTO,
  UpdateCategoryDTO,
} from "@/lib/validation/categories";

export const findAll = async (limit: number, offset: number) => {
  const categories = await db.query.categories.findMany({
    limit,
    offset,
    with: {
      products: true,
    },
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
    throw new Error("Category not found.");
  }

  return category;
};

export const findProducts = async (id: string) => {
  const category = await db.query.categories.findFirst({
    where: eq(categories.id, id),
    with: {
      products: true,
    },
  });

  if (!category) {
    throw new Error("Category not found.");
  }

  return category.products;
};

export const insert = async (data: CreateCategoryDTO) => {
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

export const update = async (id: string, data: UpdateCategoryDTO) => {
  const { name, description } = data;

  const category = await findById(id);

  const [updatedCategory] = await db
    .update(categories)
    .set({
      name,
      description,
      updated_at: new Date(),
    })
    .where(eq(categories.id, category.id))
    .returning();

  if (!updatedCategory) {
    throw new Error("Database Error");
  }

  return updatedCategory;
};

export const remove = async (id: string) => {
  const category = await findById(id);

  const deletedCategory = await db
    .delete(categories)
    .where(eq(categories.id, category.id))
    .returning();

  if (!deletedCategory) {
    throw new Error("Database Error");
  }

  return deletedCategory;
};
