import "module-alias/register";
import express from "express";
import cors from "cors";
import { config } from "@/config/env";

// Routes
import usersRouter from "@/routers/users";
import productsRouter from "@/routers/products";
import productCategoriesRouter from "@/routers/productCategories";
import categoriesRouter from "@/routers/categories";
import cartsRouter from "@/routers/carts";
import cartProductsRouter from "@/routers/cartProducts";
import ordersRouter from "@/routers/orders";
import orderProductsRouter from "@/routers/orderProducts";

const app = express();

app.disable("x-powered-by"); // Disable x-powered-by header

app.use(cors());
app.use(express.json());

// Routers
app.use("/api/users", usersRouter);
app.use("/api/products", productsRouter);
app.use("/api/productCategories", productCategoriesRouter);
app.use("/api/categories", categoriesRouter);
app.use("/api/carts", cartsRouter);
app.use("/api/cartProducts", cartProductsRouter);
app.use("/api/orders", ordersRouter);
app.use("/api/orderProducts", orderProductsRouter);

app.listen(config.PORT, () => {
  console.log(`Running on Port ${config.PORT}`);
});
