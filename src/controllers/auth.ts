import { Request, Response } from "express";

// Services
import { findByEmail, insert } from "@/services/users";

// Types
import { SignupType, SigninType } from "@/lib/validation/auth";

// Utils
import {
  createAccessToken,
  createRefreshToken,
  verifyRefreshToken,
} from "@/utils/tokens";

// Env
import { config } from "@/config/env";

// Bcrypt
import bcrypt from "bcrypt";

export const signup = async (
  req: Request<unknown, unknown, SignupType["body"]>,
  res: Response,
) => {
  try {
    const { email, password } = req.body;

    const user = await findByEmail(email);

    if (user) {
      throw new Error("User already exists.");
    }

    const newUser = await insert(email, password);

    res.status(200).json({
      success: true,
      message: "Successfully signed up.",
      data: newUser,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(404).json({ success: false, message: error.message });
      return;
    }

    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const signin = async (
  req: Request<unknown, unknown, SigninType["body"]>,
  res: Response,
) => {
  try {
    const { accessToken, refreshToken } = req.cookies;

    if (accessToken || refreshToken) {
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
