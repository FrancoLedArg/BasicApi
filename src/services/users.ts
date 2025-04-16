import { eq } from "drizzle-orm";
import { db } from "@/lib/db";

// Schema
import { users } from "@/lib/db/schema";

// Validation Types
import {
  UserFilterDTO,
  CreateUserDTO,
  UpdateUserDTO,
} from "@/lib/validation/users";

// Utils
import { hashPassword } from "@/utils/hashPassword";

export const findAll = async (query: UserFilterDTO) => {
  const { limit, offset } = query;

  const users = await db.query.users.findMany({
    limit,
    offset,
  });

  return users;
};

export const findById = async (id: string) => {
  const user = await db.query.users.findFirst({
    where: eq(users.id, id),
  });

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};

export const findByEmail = async (email: string) => {
  const user = await db.query.users.findFirst({
    where: eq(users.email, email),
  });

  return user;
};

export const insert = async (body: CreateUserDTO) => {
  const { email, password } = body;

  const hash = await hashPassword(password);

  const [newUser] = await db
    .insert(users)
    .values({
      email,
      password: hash,
    })
    .returning();

  if (!newUser) {
    throw new Error("Database Error");
  }

  // I need to figure out a better way to remove the password from here so i can return this safely

  // @ts-ignore
  delete newUser.password;

  return newUser;
};

export const update = async (id: string, body: UpdateUserDTO) => {
  const { email, password } = body;

  const [updatedUser] = await db
    .update(users)
    .set({
      email,
      password,
    })
    .where(eq(users.id, id))
    .returning();

  if (!updatedUser) {
    throw new Error("Database Error");
  }

  return updatedUser;
};

export const remove = async (id: string) => {
  const deletedUser = await db
    .delete(users)
    .where(eq(users.id, id))
    .returning();

  if (!deletedUser) {
    throw new Error("Database Error");
  }

  return deletedUser;
};
