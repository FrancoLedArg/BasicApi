-- More details about the project

## Porpuse of the API

This API provides a robust foundation for building and managing an e-commerce platform. It serves two main user groups:

1. Customers (End Users)

Customers interact with the API to browse products, manage their shopping carts, and complete purchases. Their main goals include:

- Browsing & Searching Products: Find products using categories, filters and search queries.
- Adding to Cart & Wishlist: Save items for later or add them to the shopping cart.
- Checkout & Payments: Securely place orders and complete payments.
- Order Tracking & History: View past orders, track shipments, and request returns.
- User Authentication & Profiles: Create accounts, manage profiles, and save payment/shipping details.

2. Store Owners & Managers (Admins)

Admins use the API to manage products, orders, and users. Their primary objectives are:

- Product Management: Add, update, or remove products and categories.
- Order Processing: View, update, or cancel orders.
- User & Role Management: Manage customer accounts, assign roles (admin, customer support, etc.).
- Analytics & Reports: Generate reports on sales, revenue, and customer behavior.
- Inventory Management: Track stock levels and prevent overselling.

-- More details about the project

import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
NODE_ENV: z.enum(["development", "production"]),
API_KEY: z.string(),
PORT: z.string(),
DB_USER: z.string(),
DB_PASSWORD: z.string(),
DB_HOST: z.string(),
DB_PORT: z.string(),
DB_NAME: z.string(),
JWT_ACCESS_SECRET: z.string(),
JWT_REFRESH_SECRET: z.string(),
});

const parsedEnv = envSchema.parse(process.env);

if (!parsedEnv) {
throw new Error("Invalid ENV variables");
}

export const config = parsedEnv;

`postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
