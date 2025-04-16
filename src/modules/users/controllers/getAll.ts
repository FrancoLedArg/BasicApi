import { /*Request*/ Response } from "express";

// Services
import { findAll } from "@/modules/users/services";

export const getUsers = async (/*req: Request*/ res: Response) => {
  try {
    const users = await findAll();

    if (!users) {
      throw new Error("Users not found");
    }

    res.status(200).json({
      success: true,
      message: "I'm an endpoint",
      data: users,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(404).json({ success: false, message: error.message });
      return;
    }

    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
