// Drizzle
import {
  pgEnum,
  pgTable,
  varchar,
  integer,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// Users
export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
});

// Products
export const products = pgTable("products", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull().unique(),
  price: integer("price").notNull(),
  stock: integer("stock").notNull().default(0),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
});

// Categories

// Orders

// Order Items

// Carts

// Cart items

// Payments

// Shipping Adresses

// Reviews

/*
export const roleEnum = pgEnum("role", ["user", "expert", "admin"]);
export const accountTypeEnum = pgEnum("account_type", ["user", "business"]);
export const accountStatusEnum = pgEnum("account_status", [
  "active",
  "inactive",
  "suspended",
]);

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  role: roleEnum("role").default("user").notNull(),
  account_type: accountTypeEnum("account_type").notNull(),
  account_status: accountStatusEnum("account_status")
    .default("active")
    .notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
});

export const userRelations = relations(users, ({ one }) => ({
  profile: one(userProfiles, {
    fields: [users.id],
    references: [userProfiles.user_id],
  }),
}));
*/
