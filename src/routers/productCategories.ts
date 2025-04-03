import { Router } from "express";
import { z } from "zod";

// Middlewares
import { validateSchema } from "@/middlewares/validatieSchema";

// Validation Schemas
import { productCategorySchema } from "@/lib/validation/productCategories";

// Controllers
import {
  createProductCategory,
  deleteProductCategory,
} from "@/controllers/productCategories";

const router = Router();

router.post(
  "/",
  validateSchema(z.object({ body: productCategorySchema })),
  createProductCategory,
);

router.delete(
  "/:product_id/:cateogory_id",
  validateSchema(z.object({ params: productCategorySchema })),
  deleteProductCategory,
);

export default router;
