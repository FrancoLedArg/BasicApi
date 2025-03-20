import { Router } from "express";

// Controllers
import {
  createOrderProduct,
  updateOrderProduct,
  deleteOrderProduct,
} from "@/controllers/orderProducts";

const router = Router();

router.post("/", createOrderProduct);
router.patch("/:id", updateOrderProduct);
router.delete("/:id", deleteOrderProduct);

export default router;
