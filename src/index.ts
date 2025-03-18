import "module-alias/register";
import express from "express";
import cors from "cors";
import { config } from "@/config/env";

// Routes
import usersRouter from "@/routers/users.router";
import productsRouter from "@/routers/products.router";

const app = express();

app.disable("x-powered-by"); // Disable x-powered-by header

app.use(cors());
app.use(express.json());

// Routers
app.use("/api/users", usersRouter);
app.use("/api/products", productsRouter);

app.listen(config.PORT, () => {
  console.log(`Running on Port ${config.PORT}`);
});
