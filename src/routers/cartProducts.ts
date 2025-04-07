import { Router } from "express";
import { z } from "zod";

// Middlewares
import { validateSchema } from "@/middlewares/validatieSchema";

// Validation Schemas
import {
  getCartProductSchema,
  createCartProductSchema,
  updateCartProductSchema,
} from "@/lib/validation/cartProducts";

// Controllers
import {
  createCartProduct,
  updateCartProduct,
  deleteCartProduct,
} from "@/controllers/cartProducts";

const router = Router();

router.post(
  "/",
  validateSchema(z.object({ body: createCartProductSchema })),
  createCartProduct,
);

router.patch(
  "/:id",
  validateSchema(
    z.object({
      params: getCartProductSchema,
      body: updateCartProductSchema,
    }),
  ),
  updateCartProduct,
);

router.delete(
  "/:id",
  validateSchema(z.object({ params: getCartProductSchema })),
  deleteCartProduct,
);

export default router;
