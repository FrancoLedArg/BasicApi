import { Router } from "express";
import passport from "passport";

// Middlewares
import { authHandler } from "@/middlewares/authHandler";
/*
import { validateSchema } from "@/middlewares/validatieSchema";

// Validation Schemas
import {
  getUserSchema,
  createUserSchema,
  updateUserSchema,
  userFilterSchema,
} from "@/lib/validation/users";
 */

// Controllers
import { signup, signin } from "@/controllers/auth";

const router = Router();

router.post("/signup", signup);

router.post("/signin", signin);

router.post("/test", authHandler, (req, res) => {
  res.status(200).json({ message: "All good" });
});

export default router;
