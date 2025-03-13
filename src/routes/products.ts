import { Router } from "express";

// Controllers
import { getProducts, getProductById } from "@/controllers/products";

const router = Router();

router.get("/", getProducts);
router.get("/:id", getProductById);

export default router;
