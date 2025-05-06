import { Router } from "express";
import passport from "passport";

// Middlewares
// import { authHandler } from "@/middlewares/authHandler";
import { validateSchema } from "@/middlewares/validatieSchema";

// Validation Schemas
import { signupSchema, signinSchema } from "@/lib/validation/auth";

// Controllers
import { status, signup, signin, signout } from "@/modules/auth/controllers";

const router = Router();

router.get("/status", status);
router.post("/signup", validateSchema(signupSchema), signup);
router.post(
  "/signin",
  validateSchema(signinSchema),
  passport.authenticate("local", {
    failureMessage: "BAD CREDENTIALS",
  }),
  signin,
);
router.post("/signout", signout);

export default router;
