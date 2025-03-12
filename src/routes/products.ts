import { Router } from "express";

// Controllers
import { getProducts } from "@/controllers/products";

const router = Router();

router.get("/", getProducts);
