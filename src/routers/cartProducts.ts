import { Router } from "express";

// Controllers
import {
  createCartProduct,
  updateCartProduct,
  deleteCartProduct,
} from "@/controllers/cartProducts";

const router = Router();

router.post("/", createCartProduct);
router.patch("/:id", updateCartProduct);
router.delete("/:id", deleteCartProduct);

export default router;
