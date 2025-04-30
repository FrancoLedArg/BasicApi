import { defineConfig } from "drizzle-kit";
import { config } from "./env";

export default defineConfig({
  schema: "./src/lib/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: config.DB_URI,
  },
});
