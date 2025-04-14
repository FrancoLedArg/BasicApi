import { Request, Response } from "express";

// Services
import { findByEmail, insert } from "@/services/users";

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

export const signup = async (req: Request, res: Response) => {
  try {
    const user = await findByEmail(req.body.email);

    if (user) {
      throw new Error("User already exists.");
    }

    const newUser = await insert(req.body);

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

export const signin = async (req: Request, res: Response) => {
  try {
    if (req.cookies.accessToken || req.cookies.refreshToken) {
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

    const accessToken = createAccessToken(user.id);
    const refreshToken = createRefreshToken(user.id);

    // Set Cookies
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: config.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 1000 * 60 * 15, // 15 minutes
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
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

export const refresh = async (req: Request, res: Response) => {
  try {
    const token = req.cookies.refreshToken;
    if (!token) {
      throw new Error("Unauthorized");
    }

    const payload = verifyRefreshToken(token);

    const newAccessToken = createAccessToken(payload.id);

    // Set Cookies
    res.cookie("accessToken", newAccessToken, {
      httpOnly: true,
      secure: config.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 1000 * 60 * 15, // 15 minutes
    });

    res.status(200).json({
      success: true,
      message: "Token refreshed",
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(404).json({ success: false, message: error.message });
      return;
    }

    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
