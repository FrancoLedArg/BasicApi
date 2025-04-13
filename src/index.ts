import "module-alias/register";
import express from "express";
import cors from "cors";
import { config } from "@/config/env";

// Middlewares
import { checkApiKey } from "@/middlewares/checkApiKey";

// Passport
import passport from "passport";
import "@/lib/auth/index";

// Routes
import authRouter from "@/routers/auth";
import usersRouter from "@/routers/users";
import productsRouter from "@/routers/products";
import productCategoriesRouter from "@/routers/productCategories";
import categoriesRouter from "@/routers/categories";
import cartsRouter from "@/routers/carts";
import cartProductsRouter from "@/routers/cartProducts";
import ordersRouter from "@/routers/orders";
import orderProductsRouter from "@/routers/orderProducts";
import paymentsRouter from "@/routers/payments";

const app = express();

app.disable("x-powered-by"); // Disable x-powered-by header

/*
We can make a whitelist for cors

const whitelist = ["http://localhost:8080", "https://myapp.com"];

app.use(
  cors({
    origin: (origin, callback) => {
      if (whitelist.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Unauthorized"));
      }
    },
  }),
);
*/

app.use(cors());
app.use(express.json());
app.use(passport.initialize());

// Auth (API_KEY)
app.use(checkApiKey);

// Routers
app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);
app.use("/api/products", productsRouter);
app.use("/api/productCategories", productCategoriesRouter);
app.use("/api/categories", categoriesRouter);
app.use("/api/carts", cartsRouter);
app.use("/api/cartProducts", cartProductsRouter);
app.use("/api/orders", ordersRouter);
app.use("/api/orderProducts", orderProductsRouter);
app.use("/api/payments", paymentsRouter);

app.listen(config.PORT, () => {
  console.log(`Running on Port ${config.PORT}`);
});
