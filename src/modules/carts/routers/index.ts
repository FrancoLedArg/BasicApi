import { Router } from "express";

// Middleware
import { authHandler } from "@/middlewares/authHandler";
import { validateSchema } from "@/middlewares/validatieSchema";

// Validation Schemas
import {
  addProductSchema,
  removeProductSchema,
  updateQuantitySchema,
} from "@/lib/validation/carts";

// Controllers
import {
  getCart,
  addProduct,
  updateQuantity,
  removeProduct,
  clearCart,
} from "@/modules/carts/controllers";

const router = Router();

router.get("/", authHandler(), getCart);

router.post(
  "/products",
  authHandler(),
  validateSchema(addProductSchema),
  addProduct,
);

router.patch(
  "/products/:product_id",
  authHandler(),
  validateSchema(updateQuantitySchema),
  updateQuantity,
);

router.delete("/", authHandler(), clearCart);

router.delete(
  "/products/:product_id",
  authHandler(),
  validateSchema(removeProductSchema),
  removeProduct,
);

export default router;
