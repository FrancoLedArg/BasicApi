import { Request, Response } from "express";

// Services
import { insert } from "@/modules/users/services";

// DTOs
import { CreateUserDTO } from "@/lib/validation/users";

export const createUser = async (
  req: Request<unknown, unknown, CreateUserDTO["body"]>,
  res: Response,
) => {
  try {
    const { email, password } = req.body;

    const newUser = await insert(email, password);

    res.status(200).json({
      success: true,
      message: "I'm another endpoint",
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
