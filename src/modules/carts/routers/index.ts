import { Router } from "express";

// Middleware
import { validateSchema } from "@/middlewares/validatieSchema";

// Validation Schemas
import { addProductSchema } from "@/lib/validation/carts";

// Controllers
import { addProduct } from "@/modules/carts/controllers";

const router = Router();

// router.get("/", getCarts);
// router.get("/:id", validateSchema(getCartSchema), getCartById);
router.post("/", validateSchema(addProductSchema), addProduct);
// router.patch(":id", validateSchema(updateCartSchema), createCart);
// router.delete("/:id", validateSchema(getCartSchema), deleteCart);

export default router;
