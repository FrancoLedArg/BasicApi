import { Router } from "express";
import { z } from "zod";

// Middlewares
import { validateSchema } from "@/middlewares/validatieSchema";

// Validation Schemas
import {
  getUserSchema,
  createUserSchema,
  updateUserSchema,
  userFilterSchema,
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

router.get(
  "/",
  validateSchema(z.object({ query: userFilterSchema })),

  // I need to find a way for this query validation system not to break typescript...

  // @ts-ignore
  getUsers,
);

router.get(
  "/:id",
  validateSchema(z.object({ params: getUserSchema })),
  getUserById,
);

router.post(
  "/",
  validateSchema(z.object({ body: createUserSchema })),
  createUser,
);

router.patch(
  "/:id",
  validateSchema(
    z.object({
      params: getUserSchema,
      body: updateUserSchema,
    }),
  ),
  updateUser,
);

router.delete(
  "/:id",
  validateSchema(z.object({ params: getUserSchema })),
  deleteUser,
);

export default router;
