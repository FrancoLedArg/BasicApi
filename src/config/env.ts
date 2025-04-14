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
