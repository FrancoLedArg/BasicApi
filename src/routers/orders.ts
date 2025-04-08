import { Router } from "express";
import { z } from "zod";

// Middleware
import { validateSchema } from "@/middlewares/validatieSchema";

// Validation Schemas
import {
  getOrderSchema,
  createOrderSchema,
  updateOrderSchema,
} from "@/lib/validation/orders";

// Controllers
import {
  getOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
} from "@/controllers/orders";

const router = Router();

router.get("/", getOrders);

router.get(
  "/:id",
  validateSchema(z.object({ params: getOrderSchema })),
  getOrderById,
);

router.post("/", createOrder);

router.patch("/:id", updateOrder);

router.delete("/:id", deleteOrder);

export default router;
