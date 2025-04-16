import { Request, Response, NextFunction } from "express";

// Utils
import {
  createAccessToken,
  verifyAccessToken,
  verifyRefreshToken,
} from "@/utils/tokens";
import { config } from "@/config/env";

export const authHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { accessToken, refreshToken } = req.cookies;

    // If there is no token, user unauthenticated
    if (!accessToken && !refreshToken) {
      throw new Error("Unauthenticated");
    }

    const accessPayload = verifyAccessToken(accessToken);

    if (!accessPayload) {
      const refreshPayload = verifyRefreshToken(refreshToken);

      if (!refreshPayload) {
        throw new Error("Unauthenticated");
      }

      const newAccessToken = createAccessToken(refreshPayload.id);

      res.cookie("accessToken", newAccessToken, {
        httpOnly: true,
        sameSite: "strict",
        secure: config.NODE_ENV === "production",
        maxAge: 1000 * 60 * 15, // 15 min
      });
    }

    next();
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ success: false, message: error.message });
      return;
    }

    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
