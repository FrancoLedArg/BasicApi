import { Request, Response, NextFunction } from "express";

// Utils
import { verifyAccessToken } from "@/utils/tokens";

export const authHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { accessToken, refreshToken } = req.cookies;

    // If there is no token, user unauthenticated
    if (!accessToken && !refreshToken) {
      throw new Error("There is no tokens");
    }

    const payload = verifyAccessToken(accessToken);
    console.log(payload);
    if (!payload) {
      throw new Error("Needs refreshing");
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
