import { Router } from "express";

// Middlewares
import { validateSchema } from "@/middlewares/validatieSchema";

// Validation Schemas
import {
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
} from "@/modules/products/controllers";

const router = Router();

router.get("/", getProducts);
router.get("/:id", validateSchema(getProductSchema), getProductById);
router.post("/", validateSchema(createProductSchema), createProduct);
router.patch("/:id", validateSchema(updateProductSchema), updateProduct);
router.delete("/:id", validateSchema(getProductSchema), deleteProduct);

export default router;
