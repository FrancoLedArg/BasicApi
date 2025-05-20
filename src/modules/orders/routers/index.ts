import { Router } from "express";

// Middleware
import { authHandler } from "@/middlewares/authHandler";
import { validateSchema } from "@/middlewares/validatieSchema";

// Validation Schemas
import { getOrderSchema, updateOrderSchema } from "@/lib/validation/orders";

// Controllers
import {
  getOrders,
  getOrderById,
  getOrdersByUser,
  createOrder,
  updateOrder,
  deleteOrder,
} from "@/modules/orders/controllers";

const router = Router();

router.get("/", authHandler(), getOrders);

router.get("/:id", authHandler(), validateSchema(getOrderSchema), getOrderById);

router.get(
  "/user/:id",
  authHandler(),
  validateSchema(getOrderSchema),
  getOrdersByUser,
);

router.post("/", authHandler(), createOrder);

router.patch(
  "/:id",
  authHandler(),
  validateSchema(updateOrderSchema),
  updateOrder,
);

router.delete(
  "/:id",
  authHandler(),
  validateSchema(getOrderSchema),
  deleteOrder,
);

export default router;
