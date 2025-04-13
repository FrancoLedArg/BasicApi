import passport from "passport";

// Strategies
import { LocalStrategy } from "@/lib/auth/strategies/local";

passport.use(LocalStrategy);
