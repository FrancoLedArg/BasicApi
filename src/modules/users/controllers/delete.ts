import { Request, Response } from "express";

// Services
import { findById, remove } from "@/modules/users/services";

// DTOs
import { GetUserDTO } from "@/lib/validation/users";

export const deleteUser = async (
  req: Request<GetUserDTO["params"]>,
  res: Response,
) => {
  try {
    const { id } = req.params;

    const user = await findById(id);
    if (!user) {
      throw new Error("User not found.");
    }

    const deletedUser = await remove(id);
    if (!deletedUser) {
      throw new Error("Failed to delete user.");
    }

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
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
