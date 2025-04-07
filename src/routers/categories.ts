import { Router } from "express";
import { z } from "zod";

// Middlewares
import { validateSchema } from "@/middlewares/validatieSchema";

// Validation Schemas
import {
  getCategorySchema,
  createCategorySchema,
  updateCategorySchema,
} from "@/lib/validation/categories";

// Controllers
import {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} from "@/controllers/categories";

const router = Router();

router.get("/", getCategories);

router.get(
  "/:id",
  validateSchema(z.object({ params: getCategorySchema })),
  getCategoryById,
);

router.get(
  "/:id/products",
  validateSchema(z.object({ params: getCategorySchema })),
  getCategoryById,
);

router.post(
  "/",
  validateSchema(z.object({ body: createCategorySchema })),
  createCategory,
);

router.patch(
  "/:id",
  validateSchema(
    z.object({
      params: getCategorySchema,
      body: updateCategorySchema,
    }),
  ),
  updateCategory,
);

router.delete(
  "/:id",
  validateSchema(z.object({ params: getCategorySchema })),
  deleteCategory,
);

export default router;
