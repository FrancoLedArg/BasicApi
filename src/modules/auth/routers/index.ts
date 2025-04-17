import { Router } from "express";

// Middlewares
import { authHandler } from "@/middlewares/authHandler";
import { validateSchema } from "@/middlewares/validatieSchema";

// Validation Schemas
import { signupSchema, signinSchema } from "@/lib/validation/auth";

// Controllers
import { signup, signin, signout } from "@/modules/auth/controllers";

const router = Router();

router.post("/signup", /*authHandler*/ validateSchema(signupSchema), signup);
router.post("/signin", /*authHandler*/ validateSchema(signinSchema), signin);
router.post("/signout", authHandler, signout);

export default router;
