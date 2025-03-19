import { Router } from "express";

// Controllers
import {
  createOrderItem,
  updateOrderItem,
  deleteOrderItem,
} from "@/controllers/orderItems";

const router = Router();

router.post("/", createOrderItem);
router.patch("/:id", updateOrderItem);
router.delete("/:id", deleteOrderItem);

export default router;
