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
  categories: many(productCategories),
  orders: many(orderProducts),
}));

// Product Categories
export const productCategories = pgTable(
  "product_categories",
  {
    product_id: uuid("product_id")
      .references(() => products.id, { onDelete: "cascade" })
      .notNull(),
    category_id: uuid("category_id")
      .references(() => categories.id, { onDelete: "cascade" })
      .notNull(),
    created_at: timestamp("created_at").defaultNow().notNull(),
    updated_at: timestamp("updated_at").defaultNow().notNull(),
  },
  (t) => [primaryKey({ columns: [t.product_id, t.category_id] })],
);

export const productCategoryRelations = relations(
  productCategories,
  ({ one }) => ({
    product: one(products, {
      fields: [productCategories.product_id],
      references: [products.id],
    }),
    category: one(categories, {
      fields: [productCategories.category_id],
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

export const categorieRelations = relations(categories, ({ many }) => ({
  products: many(productCategories),
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
    cart_id: uuid("cart_id")
      .references(() => orders.id)
      .notNull(),
    item_id: uuid("item_id")
      .references(() => products.id)
      .notNull(),
    quantity: integer("quantity").notNull(),
    created_at: timestamp("created_at").defaultNow().notNull(),
    updated_at: timestamp("updated_at").defaultNow().notNull(),
  },
  (t) => [primaryKey({ columns: [t.cart_id, t.item_id] })],
);

export const cartItemRelations = relations(cart_items, ({ one }) => ({
  carts: one(carts, {
    fields: [cart_items.cart_id],
    references: [carts.id],
  }),
  item: one(products, {
    fields: [cart_items.item_id],
    references: [products.id],
  }),
}));

// Orders
export const orderStatusEnum = pgEnum("status", [
  "pending",
  "paid",
  "shipped",
  "delivered",
]);

export const orders = pgTable("orders", {
  id: uuid("id").primaryKey().defaultRandom(),
  user_id: uuid("user_id")
    .references(() => users.id, { onDelete: "set default" })
    .notNull()
    .default("00000000-0000-0000-0000-000000000000"),
  status: orderStatusEnum().notNull().default("pending"),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
});

export const orderRelations = relations(orders, ({ one, many }) => ({
  user: one(users, {
    fields: [orders.user_id],
    references: [users.id],
  }),
  products: many(orderProducts),
  payment: one(payments),
}));

// Order Items
export const orderProducts = pgTable(
  "order_products",
  {
    product_id: uuid("product_id")
      .references(() => products.id, { onDelete: "cascade" })
      .notNull(),
    order_id: uuid("order_id")
      .references(() => orders.id, { onDelete: "cascade" })
      .notNull(),
    quantity: integer("quantity").notNull().default(1),
    created_at: timestamp("created_at").notNull().defaultNow(),
    updated_at: timestamp("updated_at").notNull().defaultNow(),
  },
  (t) => [primaryKey({ columns: [t.product_id, t.order_id] })],
);

export const orderProductRelations = relations(orderProducts, ({ one }) => ({
  product: one(products, {
    fields: [orderProducts.product_id],
    references: [products.id],
  }),
  order: one(orders, {
    fields: [orderProducts.order_id],
    references: [orders.id],
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
