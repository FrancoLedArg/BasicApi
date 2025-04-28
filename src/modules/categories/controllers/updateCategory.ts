import { Request, Response } from "express";

// Services
import { update } from "@/modules/categories/services";

// DTOs
import { UpdateCategoryDTO } from "@/lib/validation/categories";

export const updateCategory = async (
  req: Request<UpdateCategoryDTO["params"], unknown, UpdateCategoryDTO["body"]>,
  res: Response,
) => {
  try {
    const { id } = req.params;
    const changes = req.body;

    const updatedCategory = await update(id, changes);

    res.status(200).json({
      success: true,
      message: "I'm another endpoint",
      data: updatedCategory,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(404).json({ success: false, message: error.message });
      return;
    }

    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
