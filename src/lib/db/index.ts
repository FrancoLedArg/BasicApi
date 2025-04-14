import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

// Schema
import * as schema from "./schema";

// Env
import { config } from "@/config/env";

const URI = `postgresql://${config.DB_USER}:${config.DB_PASSWORD}@${config.DB_HOST}:${config.DB_PORT}/${config.DB_NAME}`;

const pool = new Pool({ connectionString: URI });

export const db = drizzle(pool, { schema });
