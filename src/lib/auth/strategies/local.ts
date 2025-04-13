import { Strategy } from "passport-local";

// Db
import { db } from "@/lib/db";
import { eq } from "drizzle-orm";

// Schema
import { users } from "@/lib/db/schema";

// Utils
import { verifyPassword } from "@/utils/verifyPassword";

export const LocalStrategy = new Strategy(
  { usernameField: "email", passwordField: "password" },
  async (email, password, done) => {
    try {
      const user = await db.query.users.findFirst({
        where: eq(users.email, email),
      });

      if (!user) {
        return done(null, false, { message: "Bad Credentials." });
      }

      const isPasswordValid = await verifyPassword(password, user.password);

      if (!isPasswordValid) {
        return done(null, false, { message: "Bad Credentials." });
      }

      return done(null, user);
    } catch (error) {
      console.log("There is an error");

      return done(error, false, { message: "Unauthorized." });
    }
  },
);
