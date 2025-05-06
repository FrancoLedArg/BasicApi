import passport from "passport";
import { Strategy } from "passport-local";
import { compare } from "bcrypt";

// Db
import { db } from "../db";
import { eq } from "drizzle-orm";

// Service
import { users } from "@/lib/db/schema";

passport.serializeUser((user: Express.User, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await db.query.users.findFirst({
      where: eq(users.id, id),
      with: {
        cart: true,
      },
    });

    if (!user) throw new Error("User not found");

    done(null, user);
  } catch (error) {
    done(error, false);
  }
});

export default passport.use(
  new Strategy(
    { usernameField: "email", passwordField: "password" },
    async (email, password, done) => {
      try {
        const user = await db.query.users.findFirst({
          where: eq(users.email, email),
          with: {
            cart: true,
          },
        });

        if (!user) return done(null, false, { message: "BAD CREDENTIALS" });

        const isPasswordValid = await compare(password, user.password);
        if (!isPasswordValid)
          return done(null, false, { message: "BAD CREDENTIALS" });

        done(null, user);
      } catch (error) {
        done(error, false, { message: "Unauthorized" });
      }
    },
  ),
);
