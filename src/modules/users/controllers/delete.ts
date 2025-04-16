import { Request, Response } from "express";

// Services
import { remove } from "@/modules/users/services";

// DTOs
import { GetUserDTO } from "@/lib/validation/users";

export const deleteUser = async (
  req: Request<GetUserDTO["params"]>,
  res: Response,
) => {
  try {
    const { id } = req.params;

    const deletedUser = await remove(id);

    res.status(200).json({
      success: true,
      message: "I'm another endpoint",
      data: deletedUser,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(404).json({ success: false, message: error.message });
      return;
    }

    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
