import { Router } from "express";
import passport from "passport";

/*
// Middlewares
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
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "@/controllers/users";

const router = Router();

router.post(
  "/signin",
  (req, res, next) => {
    console.log("✅ HIT /api/auth/signin");
    next();
  },
  passport.authenticate("local", { session: false }),
);

export default router;
