import { Request, Response } from "express";

// Utils
import { verifyRefreshToken } from "@/utils/tokens";

// Env
import { config } from "@/config/env";

export const signout = async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.cookies;

    const token = verifyRefreshToken(refreshToken);
    if (!token) {
      throw new Error("Unahtenticated");
    }

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: config.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
    });

    res.status(200).json({
      success: true,
      message: "Logged out successfully.",
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
      return;
    }

    res.status(500).json({ message: "Internal server error." });
  }
};
