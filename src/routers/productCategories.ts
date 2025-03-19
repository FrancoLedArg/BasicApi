import { Router } from "express";

// Controllers
import {
  createProductCategory,
  deleteProductCategory,
} from "@/controllers/productCategories";

const router = Router();

router.post("/", createProductCategory);
router.delete("/:product_id/:cateogory_id", deleteProductCategory);

export default router;
