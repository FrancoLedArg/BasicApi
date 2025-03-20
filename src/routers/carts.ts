import { Router } from "express";

// Controllers
import {
  getCarts,
  getCartById,
  createCart,
  updateCart,
  deleteCart,
} from "@/controllers/carts";

const router = Router();

router.get("/", getCarts);
router.get("/:id", getCartById);
router.post("/", createCart);
router.patch("/:id", updateCart);
router.delete("/:id", deleteCart);

export default router;
