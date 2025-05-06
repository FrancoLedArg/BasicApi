import { Request, Response } from "express";

// Services
import { insert } from "@/modules/users/services";

// Types
import { SignupDTO } from "@/lib/validation/auth";

export const signup = async (
  req: Request<unknown, unknown, SignupDTO["body"]>,
  res: Response,
) => {
  try {
    const session = req.user;
    const { email, password } = req.body;

    if (session) {
      throw new Error("Already authenticated");
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
