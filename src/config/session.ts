import session from "express-session";
import connectPgSimple from "connect-pg-simple";

// Env
import { config } from "@/config/env";

const PgSession = connectPgSimple(session);

export const sessionConfig = session({
  store: new PgSession({
    conString: config.DB_URI,
    tableName: "sessions",
  }),
  secret: config.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    secure: config.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 1000 * 60 * 60 * 24, // 1 day
  },
});
