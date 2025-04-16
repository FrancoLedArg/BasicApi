import { z } from "zod";

const emailSchema = z
  .string()
  .trim()
  .email({ message: "Invalid email." })
  .max(255, { message: "Email must be at most 255 characters." });

const passwordSchema = z
  .string()
  .min(8, { message: "Password must be at least 8 characters." })
  .max(32, { message: "Password must be at most 32 characters." })
  .regex(/^[a-zA-Z0-9]+$/, {
    message: "Password can only contain letters and numbers.",
  })
  .refine((val) => /[A-Z]/.test(val), {
    message: "Password must contain at least one uppercase letter.",
  })
  .refine((val) => /[0-9]/.test(val), {
    message: "Password must contain at least one number.",
  });

export const getUserSchema = z.object({
  params: z.object({
    id: z.string().uuid({ message: "Invalid ID format." }),
  }),
});

export const createUserSchema = z.object({
  body: z.object({
    email: emailSchema,
    password: passwordSchema,
  }),
});

export const updateUserSchema = z.object({
  params: z.object({
    id: z.string().uuid({ message: "Invalid ID format." }),
  }),
  body: z.object({
    email: emailSchema.optional(),
    password: passwordSchema.optional(),
  }),
});

export type GetUserDTO = z.infer<typeof getUserSchema>;
export type CreateUserDTO = z.infer<typeof createUserSchema>;
export type UpdateUserDTO = z.infer<typeof updateUserSchema>;
