import "module-alias/register";
import express from "express";
import cors from "cors";
import { config } from "@/config/env";

// Routes
import productsRouter from "@/routes/products";

const app = express();

// Routers
app.use("/api/products", productsRouter);

app.listen(config.PORT, () => {
  console.log(`Running on Port ${config.PORT}`);
});
