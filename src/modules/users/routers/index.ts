import { Router } from "express";

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
} from "@/modules/users/controllers";

const router = Router();

router.get("/", getUsers);
router.get("/:id", validateSchema(getUserSchema), getUserById);
router.post("/", validateSchema(createUserSchema), createUser);
router.patch("/:id", validateSchema(updateUserSchema), updateUser);
router.delete("/:id", validateSchema(getUserSchema), deleteUser);

export default router;
