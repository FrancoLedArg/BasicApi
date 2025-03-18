// Drizzle
import {
  pgEnum,
  pgTable,
  varchar,
  integer,
  timestamp,
  uuid,
  primaryKey,
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

export const userRelations = relations(users, ({ many }) => ({
  orders: many(orders),
  payments: many(payments),
}));

// Products
export const products = pgTable("products", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull().unique(),
  description: varchar("description", { length: 255 }).notNull(),
  price: varchar("price", { length: 255 }).notNull(),
  stock: integer("stock").notNull().default(0),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
});

export const productRelations = relations(products, ({ many }) => ({
  categories: many(product_categories),
  orders: many(order_items),
}));

// Product Categories
const product_categories = pgTable(
  "product_categories",
  {
    product_id: uuid("product_id")
      .references(() => products.id)
      .notNull(),
    category_id: uuid("category_id")
      .references(() => categories.id)
      .notNull(),
    created_at: timestamp("created_at").defaultNow().notNull(),
    updated_at: timestamp("updated_at").defaultNow().notNull(),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.product_id, t.category_id] }),
  }),
);

export const productCategoryRelations = relations(
  product_categories,
  ({ one }) => ({
    product: one(products, {
      fields: [product_categories.product_id],
      references: [products.id],
    }),
    category: one(categories, {
      fields: [product_categories.category_id],
      references: [categories.id],
    }),
  }),
);

// Categories
export const categories = pgTable("categories", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull().unique(),
  description: varchar("description", { length: 255 }).notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
});

export const categorieRelations = relations(products, ({ many }) => ({
  products: many(product_categories),
}));

// Orders
export const orders = pgTable("orders", {
  id: uuid("id").primaryKey().defaultRandom(),
  user_id: uuid("user_id")
    .references(() => users.id)
    .notNull(),
  total_ammount: integer("total_ammount").notNull(),
  status: integer("stock").notNull().default(0),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
});

export const orderRelations = relations(orders, ({ one, many }) => ({
  user: one(users, {
    fields: [orders.user_id],
    references: [users.id],
  }),
  items: many(order_items),
  payment: one(payments),
}));

// Order Items
export const order_items = pgTable(
  "order_items",
  {
    order_id: uuid("order_id")
      .references(() => orders.id)
      .notNull(),
    item_id: uuid("item_id")
      .references(() => products.id)
      .notNull(),
    quantity: integer("quantity").notNull(),
    created_at: timestamp("created_at").defaultNow().notNull(),
    updated_at: timestamp("updated_at").defaultNow().notNull(),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.order_id, t.item_id] }),
  }),
);

export const orderItemRelations = relations(order_items, ({ one }) => ({
  order: one(orders, {
    fields: [order_items.order_id],
    references: [orders.id],
  }),
  item: one(products, {
    fields: [order_items.item_id],
    references: [products.id],
  }),
}));

// Carts
export const carts = pgTable("carts", {
  id: uuid("id").primaryKey().defaultRandom(),
  user_id: uuid("user_id")
    .references(() => users.id)
    .notNull(),
  // Items
  total_ammount: integer("total_ammount").notNull(),
  status: integer("stock").notNull().default(0),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
});

export const cartRelations = relations(carts, ({ one, many }) => ({
  user: one(users, {
    fields: [carts.user_id],
    references: [users.id],
  }),
  items: many(cart_items),
}));

// Cart items
export const cart_items = pgTable(
  "cart_items",
  {
    order_id: uuid("order_id")
      .references(() => orders.id)
      .notNull(),
    item_id: uuid("item_id")
      .references(() => products.id)
      .notNull(),
    quantity: integer("quantity").notNull(),
    created_at: timestamp("created_at").defaultNow().notNull(),
    updated_at: timestamp("updated_at").defaultNow().notNull(),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.order_id, t.item_id] }),
  }),
);

export const cartItemRelations = relations(cart_items, ({ one }) => ({
  order: one(orders, {
    fields: [cart_items.order_id],
    references: [orders.id],
  }),
  item: one(products, {
    fields: [cart_items.item_id],
    references: [products.id],
  }),
}));

// Payments
export const payments = pgTable("payments", {
  id: uuid("id").primaryKey().defaultRandom(),
  user_id: uuid("user_id")
    .references(() => users.id)
    .notNull(),
  order_id: uuid("order_id")
    .references(() => orders.id)
    .notNull(),
  payment_method: integer("payment_method").notNull(),
  payment_status: integer("payment_status").notNull(),
  transaction_id: integer("stock").notNull().default(0),
  created_at: timestamp("created_at").defaultNow().notNull(),
});

export const paymentRelations = relations(payments, ({ one }) => ({
  user: one(users, {
    fields: [payments.user_id],
    references: [users.id],
  }),
  order: one(orders, {
    fields: [payments.order_id],
    references: [orders.id],
  }),
}));
