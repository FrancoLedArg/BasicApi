import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

// Schema
import * as schema from "./schema";

// Env
import { config } from "@/config/env";

const pool = new Pool({ connectionString: config.DB_URI });

export const db = drizzle(pool, { schema });
