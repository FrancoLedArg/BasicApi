import { db } from "@/lib/db";

export const findManyById = async (categoriesArray: string[]) => {
  const category = await db.query.categories.findMany({
    where: (category, { inArray }) => inArray(category.id, categoriesArray),
  });

  return category;
};
