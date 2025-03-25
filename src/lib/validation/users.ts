import { z } from "zod";

export const userSchema = z.object({
  id: z.string().uuid("Invalid ID"),
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
  created_at: z.date(),
  updated_at: z.date(),
});

export const getUserSchema = userSchema.pick({ id: true });

export const createUserSchema = userSchema.omit({
  id: true,
  created_at: true,
  updated_at: true,
});

export const updateUserSchema = createUserSchema.partial();

export type GetUserDTO = z.infer<typeof getUserSchema>;
export type CreateUserDTO = z.infer<typeof createUserSchema>;
export type UpdateUserDTO = z.infer<typeof updateUserSchema>;
