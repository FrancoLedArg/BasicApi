import { Router } from "express";
import { z } from "zod";

// Middlewares
import { validateSchema } from "@/middlewares/validatieSchema";

// Validation Schemas
import {
  getUserSchema,
  createUserSchema,
  updateUserSchema,
} from "@/lib/validation/users";

// Controllers
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "@/controllers/users";

const router = Router();

router.get("/", getUsers);
router.get(
  "/:id",
  validateSchema(z.object({ params: getUserSchema })),
  getUserById,
);
router.post("/", createUser);
router.patch("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
