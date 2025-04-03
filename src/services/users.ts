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

export const findAll = async (query: UserFilterDTO) => {
  const { limit, offset } = query;

  const users = await db.query.users.findMany({
    limit,
    offset,
  });

  if (!users) {
    throw new Error("Database Error");
  }

  return users;
};

export const findById = async (id: string) => {
  const user = await db.query.users.findFirst({
    where: eq(users.id, id),
  });

  if (!user) {
    throw new Error("Database Error");
  }

  return user;
};

export const insert = async (body: CreateUserDTO) => {
  const { email, password } = body;

  const [newUser] = await db
    .insert(users)
    .values({
      email,
      password,
    })
    .returning();

  if (!newUser) {
    throw new Error("Database Error");
  }
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
