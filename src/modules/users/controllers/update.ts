import { Request, Response } from "express";

// Services
import { update } from "@/modules/users/services";

// DTOs
import { UpdateUserDTO } from "@/lib/validation/users";

export const updateUser = async (
  req: Request<UpdateUserDTO["params"], unknown, UpdateUserDTO["body"]>,
  res: Response,
) => {
  try {
    const { id } = req.params;
    const changes = req.body;

    const updatedUser = await update(id, changes);

    res.status(200).json({
      success: true,
      message: "I'm another endpoint",
      data: updatedUser,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(404).json({ success: false, message: error.message });
      return;
    }

    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
