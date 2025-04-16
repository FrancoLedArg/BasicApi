import { z } from "zod";

export const signupSchema = z.object({
  body: z.object({
    email: z.string().email("Invalid email").max(255),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters.")
      .max(32, "Password must be at most 32 characters.")
      .regex(/^[a-zA-Z0-9]+$/, "Password can only contain letters and numbers.")
      .refine((val) => /[A-Z]/.test(val), {
        message: "Password must contain at least one uppercase letter.",
      })
      .refine((val) => /[0-9]/.test(val), {
        message: "Password must contain at least one number.",
      }),
  }),
});

// Even if both of this are the same right now they will not be in the future

export const signinSchema = z.object({
  body: z.object({
    email: z.string().email("Invalid email").max(255),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters.")
      .max(32, "Password must be at most 32 characters.")
      .regex(/^[a-zA-Z0-9]+$/, "Password can only contain letters and numbers.")
      .refine((val) => /[A-Z]/.test(val), {
        message: "Password must contain at least one uppercase letter.",
      })
      .refine((val) => /[0-9]/.test(val), {
        message: "Password must contain at least one number.",
      }),
  }),
});

export type SignupType = z.infer<typeof signupSchema>;
export type SigninType = z.infer<typeof signinSchema>;
