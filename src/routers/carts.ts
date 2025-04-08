import { Router } from "express";
import { z } from "zod";

// Middleware
import { validateSchema } from "@/middlewares/validatieSchema";

// Validation Schemas
import {
  getCartSchema,
  createCartSchema,
  updateCartSchema,
} from "@/lib/validation/carts";

// Controllers
import {
  getCarts,
  getCartById,
  createCart,
  deleteCart,
} from "@/controllers/carts";

const router = Router();

router.get("/", getCarts);

router.get(
  "/:id",
  validateSchema(z.object({ params: getCartSchema })),
  getCartById,
);

router.post(
  "/",
  validateSchema(z.object({ body: createCartSchema })),
  createCart,
);

router.post(
  "/:id/products",
  validateSchema(z.object({ body: createCartSchema })),
  createCart,
);

router.patch(
  ":cart_id/products/:product_id",
  validateSchema(z.object({ params: getCartSchema, body: createCartSchema })),
  createCart,
);

router.delete(
  "/:cart_id/products/:product_id",
  validateSchema(z.object({ params: getCartSchema, body: createCartSchema })),
  createCart,
);

router.delete(
  "/:id/products",
  validateSchema(z.object({ params: getCartSchema })),
  deleteCart,
);

export default router;
