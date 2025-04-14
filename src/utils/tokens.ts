import jwt from "jsonwebtoken";
import { config } from "@/config/env";

// Types
import { MyJwtPayload } from "@/types/jwt";

export function createAccessToken(id: string) {
  return jwt.sign({ id }, config.JWT_ACCESS_SECRET, {
    expiresIn: "15m",
  });
}

export function createRefreshToken(id: string) {
  return jwt.sign({ id }, config.JWT_REFRESH_SECRET, {
    expiresIn: "15m",
  });
}

export function verifyAccessToken(token: string) {
  const payload = jwt.verify(token, config.JWT_ACCESS_SECRET);

  return payload as MyJwtPayload;
}

export function verifyRefreshToken(token: string) {
  const payload = jwt.verify(token, config.JWT_REFRESH_SECRET);

  return payload as MyJwtPayload;
}
