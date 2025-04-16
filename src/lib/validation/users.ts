import { z } from "zod";

/*
export const userFilterSchema = z
  .object({
    limit: z
      .string()
      .default("0")
      .refine((val) => !isNaN(Number(val)), { message: "Invalid limit value" })
      .transform((val) => Number(val))
      .pipe(z.number().int().nonnegative()),
    offset: z
      .string()
      .default("10")
      .refine((val) => !isNaN(Number(val)), { message: "Invalid offset value" })
      .transform((val) => Number(val))
      .pipe(z.number().int().nonnegative()),
  })
  .strict();
*/

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
  created_at: z.date().default(() => new Date()),
  updated_at: z.date().default(() => new Date()),
});

export const getUserSchema = userSchema.pick({ id: true });

export const createUserSchema = userSchema.omit({
  id: true,
  created_at: true,
  updated_at: true,
});

export const updateUserSchema = createUserSchema.partial();

export type UserFilterDTO = z.infer<typeof userFilterSchema>;
export type GetUserDTO = z.infer<typeof getUserSchema>;
export type CreateUserDTO = z.infer<typeof createUserSchema>;
export type UpdateUserDTO = z.infer<typeof updateUserSchema>;
