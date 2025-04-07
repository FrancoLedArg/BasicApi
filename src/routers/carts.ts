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

router.delete(
  "/:id",
  validateSchema(z.object({ params: getCartSchema })),
  deleteCart,
);

export default router;
