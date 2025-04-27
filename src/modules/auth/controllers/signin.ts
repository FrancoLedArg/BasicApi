import { Request, Response } from "express";

// Services
import { findByEmail } from "@/modules/users/services";

// Types
import { SigninType } from "@/lib/validation/auth";

// Utils
import { createAccessToken, createRefreshToken } from "@/utils/tokens";

// Env
import { config } from "@/config/env";

// Bcrypt
import bcrypt from "bcrypt";

export const signin = async (
  req: Request<unknown, unknown, SigninType["body"]>,
  res: Response,
) => {
  try {
    const { accessToken, refreshToken } = req.cookies;

    if (accessToken && refreshToken) {
      throw new Error("Already authenticated");
    }

    const { email, password } = req.body;

    const user = await findByEmail(email);
    if (!user) {
      throw new Error("User not found");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Bad Credentials");
    }

    const newAccessToken = createAccessToken(user.id);
    const newFefreshToken = createRefreshToken(user.id);

    // Set Cookies
    res.cookie("accessToken", newAccessToken, {
      httpOnly: true,
      secure: config.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 1000 * 60 * 15, // 15 minutes
    });

    res.cookie("refreshToken", newFefreshToken, {
      httpOnly: true,
      secure: config.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    });

    res.status(200).json({
      success: true,
      message: "Successfully signed in.",
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(404).json({ success: false, message: error.message });
      return;
    }

    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
