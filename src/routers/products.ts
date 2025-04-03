import { Router } from "express";
import { z } from "zod";

// Middlewares
import { validateSchema } from "@/middlewares/validatieSchema";

// Validation Schemas
import {
  productFilterSchema,
  getProductSchema,
  createProductSchema,
  updateProductSchema,
} from "@/lib/validation/products";

// Controllers
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "@/controllers/products";

const router = Router();

router.get(
  "/",
  validateSchema(z.object({ query: productFilterSchema })),
  // I need to find a way for this query validation system not to break typescript...

  // @ts-ignore
  getProducts,
);

router.get(
  "/:id",
  validateSchema(z.object({ params: getProductSchema })),
  getProductById,
);

router.post(
  "/",
  validateSchema(z.object({ body: createProductSchema })),
  createProduct,
);

router.patch(
  "/:id",
  validateSchema(
    z.object({
      params: getProductSchema,
      body: updateProductSchema,
    }),
  ),
  updateProduct,
);

router.delete(
  "/:id",
  validateSchema(z.object({ params: getProductSchema })),
  deleteProduct,
);

export default router;
