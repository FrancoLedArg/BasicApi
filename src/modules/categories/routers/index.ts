import { Router } from "express";

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
  addProducts,
  removeProducts,
} from "@/modules/categories/controllers";

const router = Router();

router.get("/", getCategories);
router.get("/:id", validateSchema(getCategorySchema), getCategoryById);
router.post("/", validateSchema(createCategorySchema), createCategory);
router.post(
  "/:id/products",
  validateSchema(getCategorySchema),
  getCategoryById,
);
router.patch("/:id", validateSchema(updateCategorySchema), updateCategory);
router.delete("/:id", validateSchema(getCategorySchema), deleteCategory);
router.delete(
  "/:id/products",
  validateSchema(getCategorySchema),
  deleteCategory,
);

export default router;
