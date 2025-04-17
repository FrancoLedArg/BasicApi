import { Request, Response } from "express";

// Services
import { findByEmail, insert } from "@/modules/users/services";

// Types
import { SignupType } from "@/lib/validation/auth";

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
