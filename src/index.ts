import "module-alias/register";
import express from "express";
import cors from "cors";
import { config } from "@/config/env";
import { sessionConfig } from "@/config/session";

// Passport
import passport from "passport";
import "@/lib/strategies/localStrategy";

// Env

// Middlewares
// import { checkApiKey } from "@/middlewares/checkApiKey";

// Routes
import authRouter from "@/modules/auth/routers";
import usersRouter from "@/modules/users/routers";
import productsRouter from "@/modules/products/routers";
import categoriesRouter from "@/modules/categories/routers";
/*
import cartsRouter from "@/routers/carts";
import cartProductsRouter from "@/routers/cartProducts";
import ordersRouter from "@/routers/orders";
import orderProductsRouter from "@/routers/orderProducts";
import paymentsRouter from "@/routers/payments";
*/

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

// Auth
app.use(sessionConfig);
app.use(passport.initialize());
app.use(passport.session());
// app.use(checkApiKey);

// Routers
app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);
app.use("/api/products", productsRouter);
app.use("/api/categories", categoriesRouter);

/*
app.use("/api/carts", cartsRouter);
app.use("/api/cartProducts", cartProductsRouter);
app.use("/api/orders", ordersRouter);
app.use("/api/orderProducts", orderProductsRouter);
app.use("/api/payments", paymentsRouter);
*/

app.listen(config.PORT, () => {
  console.log(`Running on Port ${config.PORT}`);
});
